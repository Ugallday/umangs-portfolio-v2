import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { themeInitScript, themeInitScriptCspHash } from "@/config/theme-init-script";

/**
 * The theme script is authorised in the CSP by hash rather than by nonce (see
 * the module's own comment for why). If the script source is edited and the
 * hash is not regenerated, the browser silently refuses to execute it and
 * every visitor gets a flash of the wrong theme before hydration — a failure
 * that is invisible in development, where it looks merely like a fast flicker.
 *
 * This test is the thing that makes that impossible to ship.
 */
describe("theme init script CSP hash", () => {
  it("matches the script it authorises", () => {
    const digest = createHash("sha256").update(themeInitScript, "utf8").digest("base64");

    expect(themeInitScriptCspHash).toBe(`sha256-${digest}`);
  });

  it("still sets the theme attribute and defaults to dark", () => {
    expect(themeInitScript).toContain("document.documentElement.dataset.theme");
    expect(themeInitScript).toContain('stored : "dark"');
  });
});
