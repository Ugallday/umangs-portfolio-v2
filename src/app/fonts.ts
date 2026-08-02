import { Geist, Geist_Mono } from "next/font/google";

/**
 * Font choices map directly onto the tokens declared in
 * src/styles/tokens.css (--font-sans, --font-display, --font-serif).
 * Using next/font/google gives self-hosting + automatic subsetting +
 * zero layout shift (size-adjust is computed automatically), which is
 * why this replaces a manual @font-face setup.
 *
 */
export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const fontSerif = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontSerif.variable}`;
