import { describe, expect, it } from "vitest";

import { brandGlyphs, getBrandGlyph } from "@/components/ui/brand-glyphs";
import { resolveTechGlyph } from "@/components/ui/tech-logos";

describe("resolveTechGlyph", () => {
  it("resolves a plain product name", () => {
    expect(resolveTechGlyph("React")).toBe("react");
    expect(resolveTechGlyph("PostgreSQL")).toBe("postgresql");
    expect(resolveTechGlyph("Figma")).toBe("figma");
  });

  it("resolves a name carrying a version or qualifier", () => {
    expect(resolveTechGlyph("React 19")).toBe("react");
    expect(resolveTechGlyph("Vite 7")).toBe("vite");
    expect(resolveTechGlyph("Supabase (Auth + RLS)")).toBe("supabase");
    expect(resolveTechGlyph("Docker (Learning)")).toBe("docker");
  });

  it("is case insensitive", () => {
    expect(resolveTechGlyph("tailwind css")).toBe("tailwind");
    expect(resolveTechGlyph("NOTION")).toBe("notion");
  });

  // The ordering hazards the rule list exists to defend against. Each of these
  // pairs would collapse onto one glyph if the rules were reordered.
  it("does not let a broader rule swallow a narrower one", () => {
    expect(resolveTechGlyph("JavaScript")).toBe("javascript");
    expect(resolveTechGlyph("JavaScript (ES modules)")).toBe("javascript");
    expect(resolveTechGlyph("Java")).toBe("java");

    expect(resolveTechGlyph("GitHub Copilot")).toBe("copilot");
    expect(resolveTechGlyph("GitHub")).toBe("github");
    expect(resolveTechGlyph("Git")).toBe("git");

    expect(resolveTechGlyph("Next.js")).toBe("nextjs");
    expect(resolveTechGlyph("Node.js")).toBe("nodejs");
    expect(resolveTechGlyph("React")).toBe("react");

    expect(resolveTechGlyph("C++")).toBe("cpp");
    expect(resolveTechGlyph("C")).toBe("c");
  });

  it("returns undefined for a technology with no vendored mark", () => {
    expect(resolveTechGlyph("SQL")).toBeUndefined();
    expect(resolveTechGlyph("VS Code")).toBeUndefined();
    expect(resolveTechGlyph("Canva")).toBeUndefined();
    expect(resolveTechGlyph("REST APIs")).toBeUndefined();
  });

  it("resolves every game shown on the gaming page", () => {
    expect(resolveTechGlyph("Dota 2")).toBe("dota2");
    expect(resolveTechGlyph("Valorant")).toBe("valorant");
    expect(resolveTechGlyph("PUBG")).toBe("pubg");
  });

  it("only ever names a glyph that exists", () => {
    const labels = [
      "React 19",
      "Java",
      "JavaScript",
      "Dota 2",
      "GitHub Copilot",
      "Three.js",
      "Framer Motion",
    ];

    for (const label of labels) {
      const id = resolveTechGlyph(label);
      expect(id).toBeDefined();
      expect(getBrandGlyph(id as string)).toBeDefined();
    }
  });
});

describe("brandGlyphs", () => {
  it("gives every glyph a title, a hex colour and path data", () => {
    for (const [id, glyph] of Object.entries(brandGlyphs)) {
      expect(glyph.title, id).toBeTruthy();
      expect(glyph.hex, id).toMatch(/^#[0-9a-f]{6}$/);
      expect(glyph.path.length, id).toBeGreaterThan(10);
    }
  });

  it("returns undefined for an unknown id rather than throwing", () => {
    expect(getBrandGlyph("not-a-real-brand")).toBeUndefined();
  });
});
