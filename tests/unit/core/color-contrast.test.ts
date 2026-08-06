import { describe, expect, it } from "vitest";

import {
  contrastRatio,
  WCAG_AA_BODY_TEXT_MINIMUM,
  WCAG_AA_LARGE_TEXT_MINIMUM,
} from "@/core/utils/color-contrast";

/**
 * design-tokens.contrast.test.ts asserts the palette clears AA. This file
 * tests the ratio function itself, so a bug in the maths cannot quietly make
 * the token assertions pass.
 */
describe("contrastRatio", () => {
  // 21:1 and 1:1 are the theoretical bounds of the WCAG formula.
  it("returns 21 for black against white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
  });

  it("returns 1 for a color against itself", () => {
    expect(contrastRatio("#8a5c14", "#8a5c14")).toBeCloseTo(1, 5);
  });

  it("is symmetric — argument order does not change the ratio", () => {
    expect(contrastRatio("#16130f", "#faf8f5")).toBeCloseTo(
      contrastRatio("#faf8f5", "#16130f"),
      10,
    );
  });

  it("expands three-digit shorthand to the same value as its six-digit form", () => {
    expect(contrastRatio("#fff", "#000")).toBeCloseTo(contrastRatio("#ffffff", "#000000"), 10);
    expect(contrastRatio("#abc", "#000")).toBeCloseTo(contrastRatio("#aabbcc", "#000000"), 10);
  });

  it("accepts hex values with or without the leading hash", () => {
    expect(contrastRatio("ffffff", "000000")).toBeCloseTo(21, 5);
  });

  it("exposes the two AA thresholds it is measured against", () => {
    expect(WCAG_AA_BODY_TEXT_MINIMUM).toBe(4.5);
    expect(WCAG_AA_LARGE_TEXT_MINIMUM).toBe(3);
  });
});
