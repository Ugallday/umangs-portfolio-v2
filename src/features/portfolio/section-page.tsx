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
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">{children}</div>
    </SiteShell>
  );
}
