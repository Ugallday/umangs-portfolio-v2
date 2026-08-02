/**
 * WCAG 2.1 relative luminance / contrast ratio calculation.
 * Pure, framework-independent — used to test design tokens directly
 * (tests/unit/design-tokens.contrast.test.ts) so contrast is a CI-enforced
 * property of the token file, not documentation.
 */
function hexToRgb(hex: string): readonly [number, number, number] {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return [r, g, b];
}

function relativeLuminance([r, g, b]: readonly [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const luminanceA = relativeLuminance(hexToRgb(hexA));
  const luminanceB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

export const WCAG_AA_BODY_TEXT_MINIMUM = 4.5;
export const WCAG_AA_LARGE_TEXT_MINIMUM = 3.0;
