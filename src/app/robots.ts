import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * `metadata.robots` in layout.tsx sets the per-page meta tag; it does not
 * produce a /robots.txt, and a crawler has no way to find the sitemap without
 * one. This is the file that points at it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Generated share cards, not content. Indexing them wastes crawl
        // budget on 1200x630 PNGs that nobody searches for.
        disallow: "/api/",
      },
    ],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: new URL(siteConfig.url).host,
  };
}
