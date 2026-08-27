import { IBM_Plex_Mono, Inter } from "next/font/google";

/**
 * Two faces, two jobs - Inter for both headings and body, IBM Plex Mono for
 * tabular figures and identifiers.
 *
 * Inter is a clean, neutral grotesque close in spirit to the system sans
 * (San Francisco) that drives an Apple-style minimal look: no drawn or
 * "engineered" personality, just legible type that gets out of the way.
 * Weight alone (600-700 for headings, 400-500 for body) carries the
 * hierarchy, rather than a second family or a condensed width axis.
 *
 * Self-hosted by next/font at build time - nothing is fetched at runtime.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Named `--font-serif` for continuity with the token file, though the role it
 * fills is monospace: schema identifiers, column types, and figures that need
 * to line up.
 */
export const fontSerif = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontSerif.variable}`;
