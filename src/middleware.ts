import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { themeInitScriptCspHash } from "@/config/theme-init-script";

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
  //
  // Cloudinary used to be allowlisted here for both scripts and images. No
  // Cloudinary asset was ever referenced, so the entries only widened the
  // policy — the script-src one permitted execution from any *.cloudinary.com
  // subdomain. Removed rather than kept "in case". Re-add both when there is
  // an actual asset to serve.
  const csp = [
    "default-src 'self'",
    // The theme script is authorised by hash, not by the nonce. It is static,
    // so a hash pins its exact source rather than merely marking whatever
    // inline script carries this request's token as trusted — and it lets the
    // element render with no attribute at all, which is what stops React
    // reporting a hydration mismatch on the nonce the browser blanks out.
    // See src/config/theme-init-script.ts.
    `script-src 'self' 'nonce-${nonce}' '${themeInitScriptCspHash}' https://*.vercel-insights.com https://*.vercel.app https://*.vercel.co https://*.vercel.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self' vitals.vercel-insights.com https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    // Nothing on the site posts anywhere. Stating it means an injected form
    // cannot exfiltrate to a third-party endpoint either.
    "form-action 'self'",
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
