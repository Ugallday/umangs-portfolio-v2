import { Fraunces, Inter, Source_Serif_4 } from "next/font/google";

/**
 * Font choices map directly onto the tokens declared in
 * src/styles/tokens.css (--font-sans, --font-display, --font-serif).
 * Using next/font/google gives self-hosting + automatic subsetting +
 * zero layout shift (size-adjust is computed automatically), which is
 * why this replaces a manual @font-face setup.
 *
 * Fraunces stands in for the "Söhne-like" display face referenced in
 * Phase 2 — a high-contrast, slightly editorial serif with the precision-
 * cut quality the origami brand calls for, and it's freely licensed.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontSerif.variable}`;
