"use client";

import { Download } from "lucide-react";

import { actionClass } from "@/components/ui/action";

/**
 * The download control.
 *
 * `window.print()` rather than a link to a checked-in PDF. The page carries an
 * A4 print stylesheet, so "Save as PDF" in the dialogue produces the document
 * you are looking at — which means the CV can never be a stale export sitting
 * in `public/` describing a version of this site that no longer exists. Same
 * reasoning as the generated share card at /api/og.
 *
 * It hides itself from print, since a "Download" button inside a PDF is noise.
 */
export function ResumeDownload(): React.JSX.Element {
  return (
    <button
      type="button"
      data-print-hide
      onClick={() => window.print()}
      className={actionClass({ size: "md" })}
    >
      <Download className="mr-2 inline h-4 w-4" aria-hidden="true" />
      Download as PDF
    </button>
  );
}
