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

/**
 * The generated share card, carrying the page's own title.
 *
 * Every route used to point at a bare `/api/og`, so a shared case study, a
 * shared /now and the home page all produced one identical image. Passing the
 * title makes each shared link legible on its own.
 *
 * The home page is the deliberate exception: its title is the long SEO string
 * ("… | Software Engineering Portfolio"), which reads badly set at card size.
 * Omitting the parameter lets the route fall back to the hero line instead.
 */
function generatedOgImage(input: PageMetadataInput): string {
  const url = new URL("/api/og", input.siteUrl);
  if (input.path !== "/") {
    url.searchParams.set("title", input.title);
  }
  return url.toString();
}

export function buildPageMetadata(input: PageMetadataInput): PageMetadataResult {
  const canonicalUrl = new URL(input.path, input.siteUrl).toString();
  const ogImage = input.ogImage ?? generatedOgImage(input);

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
