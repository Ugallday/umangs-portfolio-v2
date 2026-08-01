import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Generates a per-request nonce and attaches a strict, nonce-based CSP.
 * This is the primary CSP mechanism; the static header in next.config.ts
 * is a fallback for the handful of response types middleware does not
 * touch (e.g. some static asset responses). See docs/architecture/security.md.
 */
export function middleware(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Use a nonce for inline scripts, but allow known external script hosts
  // (Vercel analytics / speed insights) via host-based allowlisting. We
  // avoid `strict-dynamic` because several vendor SDKs inject non-nonce'd
  // <script src=...> tags which would be blocked by strict-dynamic.
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://*.vercel-insights.com https://*.vercel.app https://*.vercel.co https://*.vercel.com https://*.cloudinary.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' res.cloudinary.com data:",
    "font-src 'self' data:",
    "connect-src 'self' vitals.vercel-insights.com https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Skip static assets and image optimization routes — they carry no
     * inline scripts and don't need a nonce.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
