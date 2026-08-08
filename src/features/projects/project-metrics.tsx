import type { ProjectMetric } from "@/core/domain/entities/project.entity";
import { cn } from "@/core/utils/cn";

/**
 * The headline figures for a project, if it has any. Renders nothing when the
 * list is empty, so a project without measured results skips the strip instead
 * of showing an apologetic placeholder.
 *
 * The figure is the `<dt>` and its explanation is the `<dd>`, which is the
 * order they are read in and the order they are shown in. The previous version
 * put the label first in the markup and flipped it visually with
 * `flex-col-reverse`; that looked right and was wrong everywhere else. Copying
 * the strip, or hearing it read out, paired every figure with the *next*
 * metric's label — "420 ms / headless assertions across three suites". Making
 * a number the term reads well too: "420 ms — to import a 29,825-row day book".
 *
 * Cells are separated by a one-pixel gap over a border-coloured backing rather
 * than by four individual borders, so the dividers stay hairline and shared
 * instead of doubling up between neighbours.
 */
export function ProjectMetrics({
  metrics,
  className,
}: {
  readonly metrics: readonly ProjectMetric[];
  readonly className?: string;
}): React.JSX.Element | null {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <dl
      className={cn(
        "border-border-subtle bg-border-subtle grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-surface-overlay p-4 sm:p-5">
          <dt className="text-text-primary font-display text-2xl leading-none font-semibold tracking-tight tabular-nums sm:text-3xl">
            {metric.value}
          </dt>
          <dd className="text-text-muted mt-3 text-sm leading-6">{metric.label}</dd>
        </div>
      ))}
    </dl>
  );
}
