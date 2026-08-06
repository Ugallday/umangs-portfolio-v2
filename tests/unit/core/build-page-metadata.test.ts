import { describe, expect, it } from "vitest";

import { buildPageMetadata } from "@/core/domain/seo/build-page-metadata";

const base = {
  title: "Projects",
  description: "Everything I have shipped, grouped by stage.",
  path: "/projects",
  siteUrl: "https://example.com",
  siteName: "The Origami Engineer",
};

describe("buildPageMetadata", () => {
  it("resolves the canonical URL against the site origin", () => {
    expect(buildPageMetadata(base).canonicalUrl).toBe("https://example.com/projects");
  });

  it("reuses the canonical URL as the Open Graph URL so the two cannot drift", () => {
    const result = buildPageMetadata(base);
    expect(result.openGraph.url).toBe(result.canonicalUrl);
  });

  it("falls back to the generated /api/og image when none is supplied", () => {
    expect(buildPageMetadata(base).openGraph.images).toEqual(["https://example.com/api/og"]);
  });

  it("prefers an explicit ogImage over the generated fallback", () => {
    const result = buildPageMetadata({ ...base, ogImage: "https://cdn.example.com/card.png" });
    expect(result.openGraph.images).toEqual(["https://cdn.example.com/card.png"]);
  });

  /**
   * A trailing-slash site URL and a leading-slash path is the combination most
   * likely to produce "https://example.com//projects" if the implementation
   * ever moves from URL() to string concatenation.
   */
  it("does not double the slash when the site URL has a trailing slash", () => {
    const result = buildPageMetadata({ ...base, siteUrl: "https://example.com/" });
    expect(result.canonicalUrl).toBe("https://example.com/projects");
  });

  it("carries title and description through to Open Graph unchanged", () => {
    const result = buildPageMetadata(base);
    expect(result.openGraph.title).toBe(base.title);
    expect(result.openGraph.description).toBe(base.description);
    expect(result.openGraph.siteName).toBe(base.siteName);
  });
});
