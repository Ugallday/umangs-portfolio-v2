/**
 * PageMetadataInput / buildPageMetadata
 *
 * Pure function producing a plain object shape compatible with Next.js's
 * `Metadata` type, without importing "next" — the mapping onto the actual
 * `Metadata` type happens at the call site in app/layout.tsx. This keeps
 * SEO composition rules (title templating, canonical construction, OG
 * fallback behavior) testable with Vitest as ordinary functions.
 */
export interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly siteUrl: string;
  readonly siteName: string;
  readonly ogImage?: string;
}

export interface PageMetadataResult {
  readonly title: string;
  readonly description: string;
  readonly canonicalUrl: string;
  readonly openGraph: {
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly siteName: string;
    readonly images: readonly string[];
  };
}

export function buildPageMetadata(input: PageMetadataInput): PageMetadataResult {
  const canonicalUrl = new URL(input.path, input.siteUrl).toString();
  const ogImage = input.ogImage ?? new URL("/api/og", input.siteUrl).toString();

  return {
    title: input.title,
    description: input.description,
    canonicalUrl,
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonicalUrl,
      siteName: input.siteName,
      images: [ogImage],
    },
  };
}
