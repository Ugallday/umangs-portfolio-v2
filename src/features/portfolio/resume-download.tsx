import { Download } from "lucide-react";

import { actionClass } from "@/components/ui/action";

/**
 * The download control.
 *
 * Was a button calling `window.print()`. That produced a good document but
 * never a clean one — the browser paints the date, the page title, the URL and
 * a page count into the sheet's margin box, and nothing a website can do turns
 * them off. It now links to /resume.pdf, which is drawn rather than printed and
 * therefore carries no browser furniture at all.
 *
 * The reason the old approach existed is intact: that route renders from the
 * same content module this page reads, so the file is still never a stale
 * export sitting in `public/`.
 *
 * A plain anchor, so it works before hydration and on a middle-click — the
 * previous version needed JavaScript to do anything at all. It no longer hides
 * itself from print, because printing the page is now a fallback rather than
 * the intended path, and a reader who does print it should still see where the
 * real file lives.
 */
export function ResumeDownload(): React.JSX.Element {
  return (
    <a href="/resume.pdf" className={actionClass({ size: "md" })}>
      <Download className="mr-2 inline h-4 w-4" aria-hidden="true" />
      Download as PDF
    </a>
  );
}
