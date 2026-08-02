import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";

import { fontVariables } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/core/domain/seo/build-page-metadata";
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
    images: [...pageMetadata.openGraph.images],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.author.twitter,
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
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

// Runs before hydration to set data-theme synchronously, preventing a
// flash of the wrong theme. This is the one deliberate exception to
// "no inline scripts" — justified and scoped to three lines, and covered
// by the CSP nonce strategy in docs/architecture/security.md.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem("origami-engineer-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
