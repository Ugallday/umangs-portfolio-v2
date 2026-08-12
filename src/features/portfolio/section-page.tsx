import { SiteShell } from "@/features/portfolio/shell";

/**
 * Container for a section promoted to its own route. The section itself
 * supplies the page's single <h1> via `headingLevel="h1"`.
 */
export function SectionPage({
  children,
}: {
  readonly children: React.ReactNode;
}): React.JSX.Element {
  return (
    <SiteShell>
      {/* In print the @page margin IS the margin. Carrying this container's own
          padding into the PDF doubles it up around the content and pushes the
          page onto a second sheet for the sake of whitespace nobody asked for. */}
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20 print:max-w-none print:p-0">
        {children}
      </div>
    </SiteShell>
  );
}
