import { test, expect } from "@playwright/test";

import { siteConfig } from "../../src/config/site";

/**
 * Driven off siteConfig rather than a hand-written list, so a route added to
 * the nav is smoke-tested the same day. The previous version asserted the
 * single-h1 rule for the home page only, which is how /now and /writing could
 * have shipped with a broken heading order and nothing would have failed.
 */
const routes = [
  "/",
  ...siteConfig.nav.map((i) => i.href),
  ...siteConfig.footerNav.map((i) => i.href),
];

test.describe("foundation smoke tests", () => {
  for (const route of routes) {
    test(`${route} responds 200 and has exactly one h1`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("robots.txt points at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("sitemap.xml");
  });

  test("the sitemap lists every nav route", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml")).text();
    for (const item of siteConfig.nav) {
      expect(body).toContain(`${item.href}<`);
    }
  });

  /** A draft must not resolve just because somebody guessed the slug. */
  test("a draft post 404s", async ({ page }) => {
    const response = await page.goto("/writing/testing-a-double-entry-ledger");
    expect(response?.status()).toBe(404);
  });

  test("skip-to-content link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText(/skip to content/i);
  });

  test("404 page renders for an unknown route", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/fold doesn't exist/i);
  });
});
