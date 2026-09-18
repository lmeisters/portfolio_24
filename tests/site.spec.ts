import { test, expect, type Page } from "@playwright/test";

const PROJECT_SLUGS = ["pureplaylist", "siteselect", "terrainly", "ai-image-generator"];

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
        await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" })).toBeVisible();
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
        await expect(page.locator("canvas")).toHaveCount(1);
        expect(getErrors()).toEqual([]);
    });

    for (const slug of PROJECT_SLUGS) {
        test(`project page: ${slug}`, async ({ page }) => {
            const getErrors = watchForErrors(page);
            await page.goto(`/pages/projects/${slug}`);
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            await expect(page.getByRole("heading", { name: "Project Details" })).toBeVisible();
            await expect(page.getByText("Live demo", { exact: true })).toBeVisible();
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
        const nav = page.getByRole("navigation", { name: "Primary" });
        await page.goto("/");
        await nav.getByRole("link", { name: "Work" }).click();
        await expect(page).toHaveURL(/\/pages\/works$/);
        await expect(page.getByRole("heading", { level: 1, name: "All Projects" })).toBeVisible();
        await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");

        await nav.getByRole("link", { name: "About" }).click();
        await expect(page).toHaveURL(/\/pages\/about$/);
        await expect(page.getByRole("heading", { level: 1, name: "Thanks for stopping by" })).toBeVisible();

        await nav.getByRole("link", { name: "Home" }).click();
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByRole("heading", { level: 1, name: /Hey, I'm Linards/ })).toBeVisible();
    });

    test("project card links to project page", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: /^PurePlaylist/ }).first().click();
        await expect(page).toHaveURL(/\/pages\/projects\/pureplaylist$/);
        await expect(page.getByRole("heading", { level: 1, name: "PurePlaylist" })).toBeVisible();
    });

    test("project page links to the next project", async ({ page }) => {
        await page.goto("/pages/projects/pureplaylist");
        await page.getByRole("link", { name: /Next project: SiteSelect/ }).click();
        await expect(page).toHaveURL(/\/pages\/projects\/siteselect$/);
        await expect(page.getByRole("heading", { level: 1, name: "SiteSelect" })).toBeVisible();
    });

    test("404 page links back home", async ({ page }) => {
        await page.goto("/nope");
        await page.getByRole("link", { name: /Go back home/ }).click();
        await expect(page).toHaveURL(/\/$/);
    });
});

test.describe("interactions", () => {
    test("copy email button copies to clipboard", async ({ page }) => {
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

    test("favicon.ico and icon links resolve", async ({ page, request }) => {
        const ico = await request.get("/favicon.ico");
        expect(ico.status()).toBe(200);
        expect(ico.headers()["content-type"]).toMatch(/image\/(x-icon|vnd\.microsoft\.icon)/);

        await page.goto("/");
        const hrefs = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').evaluateAll(
            (links) => links.map((l) => (l as HTMLLinkElement).getAttribute("href")!)
        );
        expect(hrefs.length).toBeGreaterThan(0);
        for (const href of hrefs) {
            expect((await request.get(href)).status(), href).toBe(200);
        }
    });

    test("web-app meta tags are present exactly once", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator('meta[name="mobile-web-app-capable"]')).toHaveCount(1);
        await expect(page.locator('meta[name="mobile-web-app-capable"]')).toHaveAttribute("content", "yes");
        await expect(page.locator('meta[name="viewport"]')).toHaveCount(1);
        await expect(page.locator('link[rel="sitemap"], link[rel="canonical"]')).toHaveCount(0);
    });

    test("project pages have their own title and description", async ({ page }) => {
        await page.goto("/pages/projects/terrainly");
        await expect(page).toHaveTitle(/^Terrainly \| Linards Meisters$/);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /parks around Latvia/);
    });

    test("sitemap and robots are served", async ({ request }) => {
        const sitemap = await request.get("/sitemap.xml");
        expect(sitemap.status()).toBe(200);
        expect(await sitemap.text()).toContain("/pages/projects/pureplaylist");
        const robots = await request.get("/robots.txt");
        expect(await robots.text()).toContain("sitemap.xml");
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
