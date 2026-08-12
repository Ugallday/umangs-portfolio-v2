import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";

import { siteConfig } from "@/config/site";
import { ResumeDocument } from "@/features/portfolio/resume-pdf";

/**
 * GET /resume.pdf — the CV as a file.
 *
 * Node runtime, not edge: the renderer walks the document, lays out text and
 * builds the byte stream using Node APIs the edge runtime does not provide.
 *
 * Generated per request rather than checked into `public/`, for the reason the
 * site has applied since /api/og — a file in `public/` is a copy, and copies go
 * stale. This one is drawn from the same content module the /resume page reads,
 * so the two cannot disagree.
 */
export const runtime = "nodejs";

/**
 * Cached for an hour at the edge, matching the revalidate window the rest of
 * the content routes use. The CV changes when a deploy changes it, so serving
 * a slightly warm copy costs nothing and saves rendering the document again
 * for every recruiter who opens the link.
 */
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const buffer = await renderToBuffer(React.createElement(ResumeDocument));

  /**
   * `inline`, not `attachment`. A recruiter clicking the link gets the CV in
   * the browser's PDF viewer, which has its own download button — whereas
   * `attachment` forces a file into their downloads folder before they have
   * decided they want it. The filename still applies when they do save it, and
   * it is the candidate's name rather than "document.pdf", because that is
   * what it will be called in a folder of two hundred others.
   */
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${siteConfig.name.replace(/\s+/g, "-")}-CV.pdf"`,
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
