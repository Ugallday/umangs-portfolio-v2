import type { BrandGlyphId } from "@/components/ui/brand-glyphs";

/**
 * Resolves a technology's display name to its vendored mark.
 *
 * Matched by rule rather than by an exact lookup table, because the same
 * technology is written several different ways across the site — "React",
 * "React 19", "Next.js", "Supabase (Auth + RLS)" — and a table keyed on the
 * exact string silently loses the mark every time a label is reworded.
 *
 * Order is load-bearing: the first rule that matches wins, so the narrower
 * pattern always precedes the one it would otherwise be swallowed by
 * (JavaScript before Java, Copilot before GitHub, GitHub before Git).
 */
const RULES: readonly (readonly [RegExp, BrandGlyphId])[] = [
  [/javascript/i, "javascript"],
  [/typescript/i, "typescript"],
  [/^java\b/i, "java"],
  [/^c\+\+/i, "cpp"],
  [/^c$/i, "c"],
  [/php/i, "php"],
  [/^html/i, "html"],
  [/^css/i, "css"],
  [/python/i, "python"],
  [/bootstrap/i, "bootstrap"],
  [/next\.?js/i, "nextjs"],
  [/node\.?js/i, "nodejs"],
  [/^react/i, "react"],
  [/express/i, "express"],
  [/mysql/i, "mysql"],
  [/postgre/i, "postgresql"],
  [/sqlite/i, "sqlite"],
  [/copilot/i, "copilot"],
  [/github/i, "github"],
  [/^git\b/i, "git"],
  [/figma/i, "figma"],
  [/supabase/i, "supabase"],
  [/firebase/i, "firebase"],
  [/vercel/i, "vercel"],
  [/netlify/i, "netlify"],
  [/tailwind/i, "tailwind"],
  [/vite/i, "vite"],
  [/radix/i, "radix"],
  [/framer/i, "framer"],
  [/three\.?js/i, "three"],
  [/notion/i, "notion"],
  [/gemini/i, "gemini"],
  [/claude/i, "claude"],
  [/postman/i, "postman"],
  [/docker/i, "docker"],
  [/valorant/i, "valorant"],
  [/pubg/i, "pubg"],
  [/dota/i, "dota2"],
  [/steam/i, "steam"],
  [/riot/i, "riot"],
];

export function resolveTechGlyph(label: string): BrandGlyphId | undefined {
  return RULES.find(([pattern]) => pattern.test(label))?.[1];
}
