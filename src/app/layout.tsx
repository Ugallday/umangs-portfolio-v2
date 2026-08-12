import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";

import { fontVariables } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { siteConfig } from "@/config/site";
import { themeInitScript } from "@/config/theme-init-script";
import { buildPageMetadata } from "@/core/domain/seo/build-page-metadata";
import { heroHeadline } from "@/features/portfolio/content";
import { OG_IMAGE_DIMENSIONS } from "@/features/portfolio/page-metadata";
import "@/styles/globals.css";

const pageMetadata = buildPageMetadata({
  title: `${siteConfig.name} | Software Engineering Portfolio`,
  description: siteConfig.description,
  path: "/",
  siteUrl: siteConfig.url,
  siteName: siteConfig.name,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageMetadata.title,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: pageMetadata.description,
  alternates: { canonical: pageMetadata.canonicalUrl },
  openGraph: {
    type: "website",
    title: pageMetadata.openGraph.title,
    description: pageMetadata.openGraph.description,
    url: pageMetadata.openGraph.url,
    siteName: pageMetadata.openGraph.siteName,
    images: pageMetadata.openGraph.images.map((url) => ({
      url,
      ...OG_IMAGE_DIMENSIONS,
      alt: `${siteConfig.name} — ${heroHeadline}`,
    })),
  },
  /**
   * No `creator` — there is no X account to attribute this to.
   *
   * The card tags themselves stay: `summary_large_image` is the preview format
   * Slack, Discord and several other clients read to decide whether to render
   * the share image large, and dropping it would quietly downgrade the card
   * everywhere, not only on X. These tags name no account.
   */
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.title,
    description: pageMetadata.description,
  },
  robots: { index: true, follow: true },
  // AB monogram, generated from the site tokens (warm near-black wash, cream
  // letterforms, amber accent). Listed smallest-first: browsers take the last
  // format they support, so the SVG wins wherever it is understood.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1e9" },
    { media: "(prefers-color-scheme: dark)", color: "#101319" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  /**
   * Read, and deliberately discarded — the call itself is the point.
   *
   * Next applies the middleware's per-request nonce to its own inline scripts,
   * the `__next_f.push` chunks that carry the RSC payload. It can only do that
   * when the route is rendered per request, and reading a request header is
   * what opts the whole tree out of prerendering. Drop this call and the root
   * layout is prerendered at build time with no nonce in it, while middleware
   * still issues a fresh nonce on every response — so the CSP matches none of
   * the scripts in the document, the browser blocks all of them, and the site
   * serves a blank page. That is exactly what shipped, and it is invisible in
   * development, where every render is dynamic anyway.
   *
   * This is why the theme script is authorised by hash rather than by nonce
   * (src/config/theme-init-script.ts) but the call still has to stay.
   */
  await headers();

  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        {/* Deliberately carries no nonce. The browser blanks a script's nonce
            content attribute as soon as it is inserted, so rendering one here
            guaranteed a hydration mismatch on every load. The CSP authorises
            this script by hash instead — see src/config/theme-init-script.ts,
            which explains the trade and is covered by a test that fails if the
            source and the hash ever drift apart. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main-content" className="sr-only-focusable">
          Skip to content
        </a>
        {/* The skip link targets the <main> element rendered by SiteShell, so
            this wrapper deliberately carries no id of its own. */}
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
