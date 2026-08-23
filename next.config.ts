import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    // Nonce-based CSP is applied per-request in middleware.ts (Phase 3.1);
    // this is the static fallback for routes middleware does not touch.
    value: [
      "default-src 'self'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self' vitals.vercel-insights.com",
      "frame-src https://www.youtube-nocookie.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Every response was advertising "X-Powered-By: Next.js". It tells an
  // attacker which framework's advisories to go and read, and it buys nothing.
  poweredByHeader: false,

  // Already the default, stated because it is a security property rather than
  // a preference: shipping browser source maps would publish the readable
  // source, comments and all, next to the minified bundle.
  productionBrowserSourceMaps: false,

  // No `images.remotePatterns`. Every image on the site is imported from
  // src/assets and optimised at build time; the Cloudinary pattern that used
  // to sit here authorised a remote host nothing ever loaded from.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // /experience, /education and /philosophy were three routes telling one
  // story; they are now /background. Anything already linking to the old URLs
  // — a CV, an application form, a search index — should land on the page that
  // absorbed them rather than a 404. Permanent, because the merge is not
  // provisional.
  async redirects() {
    return [
      { source: "/experience", destination: "/background", permanent: true },
      { source: "/education", destination: "/background", permanent: true },
      { source: "/philosophy", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
