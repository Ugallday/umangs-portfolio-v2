import Image from "next/image";

import type { ProjectDiagram } from "@/features/projects/diagrams";

/**
 * Renders a project's architecture or data-flow diagram. Shared by the case
 * study page and the homepage feature so the two cannot drift into two
 * different diagram treatments.
 *
 * Inline drawings paint from the site's tokens, so they carry no alt attribute
 * of their own — the figure supplies the description instead, and the SVG is
 * hidden from assistive technology to avoid announcing it twice.
 */
export function DiagramPanel({ diagram }: { readonly diagram: ProjectDiagram }): React.JSX.Element {
  const { art } = diagram;

  return (
    <figure className="fold-panel rounded-3xl p-6 sm:p-8">
      <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Diagram</p>
      {/* Diagrams are authored wide; the wrapper scrolls rather than letting
          the page body scroll horizontally on narrow viewports. */}
      <div className="border-border-subtle bg-surface-overlay mt-4 overflow-x-auto rounded-2xl border p-3 sm:p-4">
        {art.kind === "image" ? (
          <Image
            src={art.src}
            alt={diagram.alt}
            className="mx-auto h-auto w-full max-w-3xl"
            sizes="(min-width: 1024px) 48rem, 100vw"
          />
        ) : (
          <div role="img" aria-label={diagram.alt} className="mx-auto w-full sm:min-w-[44rem]">
            <art.Art />
          </div>
        )}
      </div>
      <figcaption className="text-text-muted mt-4 text-sm leading-6">{diagram.caption}</figcaption>
    </figure>
  );
}
