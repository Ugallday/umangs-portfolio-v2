import type { ProjectMetric } from "@/core/domain/entities/project.entity";
import { cn } from "@/core/utils/cn";

/**
 * The headline figures for a project, if it has any. Renders nothing when the
 * list is empty, so a project without measured results simply skips the strip
 * instead of showing an apologetic placeholder.
 *
 * `flex-col-reverse` puts the number above its label on screen while keeping
 * the `<dt>` before its `<dd>` in the markup, which is what a description list
 * has to be for assistive tech.
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
    <dl className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="border-border-subtle bg-surface-overlay flex flex-col-reverse gap-2 rounded-2xl border p-4"
        >
          <dt className="text-text-muted text-sm leading-6">{metric.label}</dt>
          <dd className="text-text-primary text-3xl font-semibold tracking-tight">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
