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
  title: `${siteConfig.name} — Software Engineering Portfolio`,
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
  },
  robots: { index: true, follow: true },
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
        {/* Inline data-URL favicon to avoid missing /favicon.ico 404s on first deploy */}
        <link
          rel="icon"
          href={
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>" +
            "%3Crect width='16' height='16' fill='%23100d0a'/%3E" +
            "%3Ctext x='2' y='12' font-size='10' fill='%23faf8f5'%3EOE%3C/text%3E" +
            "%3C/svg%3E"
          }
        />
      </head>
      <body>
        <a href="#main-content" className="sr-only-focusable">
          Skip to content
        </a>
        <Providers>
          <div id="main-content">{children}</div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
