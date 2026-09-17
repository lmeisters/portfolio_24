import { test, expect, type Page } from "@playwright/test";

const PROJECT_SLUGS = ["pureplaylist", "siteselect", "terrainly", "ai-image-generator"];

/**
 * Collects console errors and failed requests so every test can assert the
 * page loaded without runtime problems. The GA script is ignored because its
 * id comes from an env var that is not set outside Vercel.
 */
function watchForErrors(page: Page) {
    const errors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
    });
    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
    page.on("response", (res) => {
        const url = res.url();
        if (res.status() >= 400 && !url.includes("googletagmanager")) {
            errors.push(`http ${res.status()}: ${url}`);
        }
    });
    return () => errors.filter((e) => !e.includes("googletagmanager"));
}

test.describe("pages render", () => {
    test("home", async ({ page }) => {
        const getErrors = watchForErrors(page);
        await page.goto("/");
        await expect(page.getByRole("heading", { level: 1, name: /Hey, I'm Linards/ })).toBeVisible();
        await expect(page.getByRole("heading", { name: "My latest works" })).toBeVisible();
        await expect(page.getByRole("link", { name: "View my works" })).toBeVisible();
        expect(getErrors()).toEqual([]);
    });

    test("works", async ({ page }) => {
        const getErrors = watchForErrors(page);
        await page.goto("/pages/works");
        await expect(page.getByRole("heading", { level: 1, name: "All Projects" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "PurePlaylist" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "Terrainly" })).toBeVisible();
        expect(getErrors()).toEqual([]);
    });

    test("about", async ({ page }) => {
        const getErrors = watchForErrors(page);
        await page.goto("/pages/about");
        await expect(page.getByRole("heading", { level: 1, name: "Thanks for stopping by" })).toBeVisible();
        for (const section of ["About Me", "My Skills", "Education", "Experience", "Courses"]) {
            await expect(page.getByRole("heading", { name: section })).toBeVisible();
        }
        // The matter-js physics simulation mounts a canvas.
        await expect(page.locator("canvas")).toHaveCount(1);
        expect(getErrors()).toEqual([]);
    });

    for (const slug of PROJECT_SLUGS) {
        test(`project page: ${slug}`, async ({ page }) => {
            const getErrors = watchForErrors(page);
            await page.goto(`/pages/projects/${slug}`);
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("heading", { name: "Project Details" })).toBeVisible();
            await expect(page.getByText("Live Demo")).toBeVisible();
            expect(getErrors()).toEqual([]);
        });
    }

    test("unknown project slug shows 404", async ({ page }) => {
        const response = await page.goto("/pages/projects/does-not-exist");
        expect(response?.status()).toBe(404);
        await expect(page.getByText("Page Not Found")).toBeVisible();
        await expect(page.getByRole("link", { name: /Go back home/ })).toBeVisible();
    });

    test("unknown route shows 404", async ({ page }) => {
        const response = await page.goto("/nope");
        expect(response?.status()).toBe(404);
        await expect(page.getByText("Page Not Found")).toBeVisible();
    });
});

test.describe("navigation", () => {
    test("floating navbar links between pages", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: "View my works" }).click();
        await expect(page).toHaveURL(/\/pages\/works$/);
        await expect(page.getByRole("heading", { level: 1, name: "All Projects" })).toBeVisible();

        await page.getByRole("link", { name: "Learn more about me" }).click();
        await expect(page).toHaveURL(/\/pages\/about$/);
        await expect(page.getByRole("heading", { level: 1, name: "Thanks for stopping by" })).toBeVisible();

        await page.getByRole("link", { name: "Go to Home page" }).click();
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByRole("heading", { level: 1, name: /Hey, I'm Linards/ })).toBeVisible();
    });

    test("project card links to project page", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /PurePlaylist logo/ }).first().click();
        await expect(page).toHaveURL(/\/pages\/projects\/pureplaylist$/);
        await expect(page.getByRole("heading", { level: 1, name: "PurePlaylist" })).toBeVisible();
    });

    test("404 page links back home", async ({ page }) => {
        await page.goto("/nope");
        await page.getByRole("link", { name: /Go back home/ }).click();
        await expect(page).toHaveURL(/\/$/);
    });
});

test.describe("interactions", () => {
    test("copy email button copies to clipboard", async ({ page }) => {
        // Stub the clipboard: the real one is a single OS resource and parallel
        // workers race for it, which makes writeText() reject intermittently.
        await page.addInitScript(() => {
            (window as any).__copied = [];
            Object.defineProperty(navigator, "clipboard", {
                value: {
                    writeText: (text: string) => {
                        (window as any).__copied.push(text);
                        return Promise.resolve();
                    },
                },
                configurable: true,
            });
        });
        await page.goto("/");
        // The hero and the contact section each render one; click the hero's.
        // A click that lands before React has hydrated is a no-op, so retry
        // until the button reacts.
        const button = page.getByRole("button", { name: "Copy email", exact: true }).first();
        await expect(async () => {
            await button.click();
            await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible({ timeout: 1000 });
        }).toPass({ timeout: 15_000 });
        const copied = await page.evaluate(() => (window as any).__copied as string[]);
        expect(copied).toHaveLength(1);
        expect(copied[0]).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    });
});

test.describe("metadata", () => {
    test("home has title, description and open graph tags", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/Linards Meisters/);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /.+/);
    });

    test("images are optimised via next/image", async ({ page }) => {
        const optimised: string[] = [];
        page.on("response", (res) => {
            if (res.url().includes("/_next/image")) optimised.push(`${res.status()} ${res.url()}`);
        });
        await page.goto("/pages/works");
        await page.waitForLoadState("networkidle");
        expect(optimised.length).toBeGreaterThan(0);
        expect(optimised.filter((r) => !r.startsWith("200"))).toEqual([]);
    });
});
