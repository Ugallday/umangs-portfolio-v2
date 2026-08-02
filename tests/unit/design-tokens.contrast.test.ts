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
  textPrimary: "#16130f",
  textSecondary: "#4a443c",
};

const darkTheme = {
  surfaceBase: "#0a0a0b",
  textPrimary: "#f2f2f0",
  textSecondary: "#cac6be",
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
});
