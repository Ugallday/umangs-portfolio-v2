import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/core/domain/seo/build-page-metadata";

/**
 * Maps the framework-independent metadata result onto Next's `Metadata`.
 * Every routed section page needs the same shape, so the mapping lives here
 * rather than being copy-pasted into each route.
 */
export function buildSectionMetadata({
  title,
  description,
  path,
}: {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}): Metadata {
  const pageMetadata = buildPageMetadata({
    title,
    description,
    path,
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
  });

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    alternates: { canonical: pageMetadata.canonicalUrl },
    openGraph: {
      type: "website",
      title: pageMetadata.openGraph.title,
      description: pageMetadata.openGraph.description,
      url: pageMetadata.openGraph.url,
      siteName: pageMetadata.openGraph.siteName,
      images: [...pageMetadata.openGraph.images],
    },
  };
}
