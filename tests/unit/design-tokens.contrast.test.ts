import { describe, expect, it } from "vitest";

import { contrastRatio, WCAG_AA_BODY_TEXT_MINIMUM } from "@/core/utils/color-contrast";

/**
 * These hex values mirror src/styles/tokens.css primitives. They are
 * duplicated here deliberately (rather than parsed from the CSS file) to
 * keep this test fast and dependency-free; if tokens.css changes, this
 * test must be updated in the same PR — a reviewer catching a drift here
 * is exactly the point.
 */
const lightTheme = {
  surfaceBase: "#faf8f5",
  surfaceRaised: "#ffffff",
  textPrimary: "#16130f",
  textSecondary: "#4a443c",
  textMuted: "#726a60",
  accentDefault: "#8a5c14",
  textOnAccent: "#faf8f5",
};

const darkTheme = {
  surfaceBase: "#0a0a0b",
  surfaceRaised: "#111113",
  textPrimary: "#f2f2f0",
  textSecondary: "#cac6be",
  textMuted: "#8f887f",
  accentDefault: "#d9a25c",
  textOnAccent: "#0a0a0b",
};

describe("design token color contrast (WCAG AA)", () => {
  it("light theme: primary text on base surface meets AA for body text", () => {
    const ratio = contrastRatio(lightTheme.textPrimary, lightTheme.surfaceBase);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_BODY_TEXT_MINIMUM);
  });

  it("light theme: secondary text on base surface meets AA for body text", () => {
    const ratio = contrastRatio(lightTheme.textSecondary, lightTheme.surfaceBase);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_BODY_TEXT_MINIMUM);
  });

  it("dark theme: primary text on base surface meets AA for body text", () => {
    const ratio = contrastRatio(darkTheme.textPrimary, darkTheme.surfaceBase);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_BODY_TEXT_MINIMUM);
  });

  it("dark theme: secondary text on base surface meets AA for body text", () => {
    const ratio = contrastRatio(darkTheme.textSecondary, darkTheme.surfaceBase);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_BODY_TEXT_MINIMUM);
  });

  /**
   * Muted text carries eyebrows, captions, and timeline years — it is the pair
   * most likely to drift under AA, and it was previously untested. Light muted
   * measured 4.47:1 before being darkened.
   */
  describe.each([
    ["light", lightTheme],
    ["dark", darkTheme],
  ])("%s theme", (_name, theme) => {
    it("muted text meets AA on the base surface", () => {
      expect(contrastRatio(theme.textMuted, theme.surfaceBase)).toBeGreaterThanOrEqual(
        WCAG_AA_BODY_TEXT_MINIMUM,
      );
    });

    it("muted text meets AA on the raised surface", () => {
      expect(contrastRatio(theme.textMuted, theme.surfaceRaised)).toBeGreaterThanOrEqual(
        WCAG_AA_BODY_TEXT_MINIMUM,
      );
    });

    // The accent is used as link text, as a button fill, and as the focus ring,
    // so it has to clear AA in both directions.
    it("accent meets AA as text on the base surface", () => {
      expect(contrastRatio(theme.accentDefault, theme.surfaceBase)).toBeGreaterThanOrEqual(
        WCAG_AA_BODY_TEXT_MINIMUM,
      );
    });

    it("accent meets AA as a fill behind on-accent text", () => {
      expect(contrastRatio(theme.textOnAccent, theme.accentDefault)).toBeGreaterThanOrEqual(
        WCAG_AA_BODY_TEXT_MINIMUM,
      );
    });
  });
});
