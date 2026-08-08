import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Three faces, three jobs.
 *
 * This replaced Geist and Geist Mono, which are the framework's own defaults —
 * a portfolio that ships them is telling you it never made a type decision.
 *
 * Bricolage Grotesque carries the headings. It has genuine width and weight
 * variation and a slightly engineered, drawn quality that suits a site named
 * after folded paper, without tipping into a novelty face.
 *
 * IBM Plex Sans sets the body. It was drawn for a technical identity, it stays
 * readable at long measure, and it is warm enough to sit on the paper-toned
 * palette. IBM Plex Mono comes with it, so identifiers, figures and schema
 * column names share the body face's proportions instead of clashing with it.
 *
 * All three are self-hosted by next/font at build time. Nothing is fetched at
 * runtime, which the site's content security policy would refuse anyway.
 */
export const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
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
