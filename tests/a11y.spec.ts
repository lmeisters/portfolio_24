import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
    "/",
    "/pages/works",
    "/pages/about",
    "/pages/projects/pureplaylist",
    "/pages/projects/ai-image-generator",
    "/nope",
];

for (const theme of ["light", "dark"] as const) {
    test.describe(`axe (${theme} mode)`, () => {
        test.use({ colorScheme: theme });

        for (const path of PAGES) {
            test(`${path} has no violations`, async ({ page }) => {
                await page.goto(path);
                await expect(page.locator("main")).toBeVisible();
                const results = await new AxeBuilder({ page })
                    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
                    .analyze();
                expect(
                    results.violations.map((v) => ({
                        id: v.id,
                        impact: v.impact,
                        nodes: v.nodes.map((n) => n.html.slice(0, 120)),
                    }))
                ).toEqual([]);
            });
        }
    });
}

test.describe("keyboard and theme", () => {
    test("skip link is the first tab stop and moves focus to main", async ({ page }) => {
        await page.goto("/");
        await page.keyboard.press("Tab");
        const skip = page.getByRole("link", { name: "Skip to content" });
        await expect(skip).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#main$/);
    });

    test("dark mode toggle persists and applies before hydration", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("html")).not.toHaveClass(/dark/);
        const toggle = page.getByRole("button", { name: "Dark mode" });
        await expect(async () => {
            await toggle.click();
            await expect(toggle).toHaveAttribute("aria-pressed", "true", { timeout: 1000 });
        }).toPass({ timeout: 15_000 });
        await expect(page.locator("html")).toHaveClass(/dark/);
        expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

        // The inline script must set the class on the raw document, before React runs.
        await page.reload({ waitUntil: "commit" });
        await expect(page.locator("html")).toHaveClass(/dark/);
    });

    test("system dark preference is honoured without a stored choice", async ({ browser }) => {
        const context = await browser.newContext({ colorScheme: "dark" });
        const page = await context.newPage();
        await page.goto("/");
        await expect(page.locator("html")).toHaveClass(/dark/);
        await context.close();
    });

    test("video zoom dialog opens, traps focus and closes with Escape", async ({ page }) => {
        await page.goto("/pages/projects/pureplaylist");
        const enlarge = page.getByRole("button", { name: /Enlarge video: PurePlaylist demo/ });
        await enlarge.scrollIntoViewIfNeeded();
        await expect(async () => {
            await enlarge.click();
            await expect(page.getByRole("dialog")).toBeVisible({ timeout: 1000 });
        }).toPass({ timeout: 15_000 });
        await expect(page.getByRole("button", { name: "Close enlarged video" })).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toBeHidden();
        await expect(enlarge).toBeFocused();
    });

    test("copy buttons announce the result to assistive tech", async ({ page }) => {
        await page.addInitScript(() => {
            Object.defineProperty(navigator, "clipboard", {
                value: { writeText: () => Promise.resolve() },
                configurable: true,
            });
        });
        await page.goto("/");
        const button = page.getByRole("button", { name: "Copy email", exact: true }).first();
        await expect(async () => {
            await button.click();
            await expect(page.getByRole("status").filter({ hasText: "copied" }).first()).toBeVisible({ timeout: 1000 });
        }).toPass({ timeout: 15_000 });
    });
});
