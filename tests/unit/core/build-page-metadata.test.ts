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

  /**
   * Each route's card carries its own title, so a shared case study and a
   * shared /now no longer produce one identical image.
   */
  it("falls back to a generated /api/og image carrying the page title", () => {
    expect(buildPageMetadata(base).openGraph.images).toEqual([
      "https://example.com/api/og?title=Projects",
    ]);
  });

  /**
   * The home page is the exception: its title is the long SEO string, which
   * reads badly at card size, so the route falls back to the hero line.
   */
  it("omits the title parameter on the home page", () => {
    const result = buildPageMetadata({ ...base, path: "/", title: "Aalok Bhandari | Portfolio" });
    expect(result.openGraph.images).toEqual(["https://example.com/api/og"]);
  });

  it("encodes a title containing characters that would break the query string", () => {
    const result = buildPageMetadata({ ...base, title: "Ledgers, sync & correctness" });
    expect(result.openGraph.images[0]).toBe(
      "https://example.com/api/og?title=Ledgers%2C+sync+%26+correctness",
    );
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
