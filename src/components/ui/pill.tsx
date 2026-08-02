import { cn } from "@/core/utils/cn";

/**
 * Tag/badge. Previously defined twice — once in features/portfolio/sections.tsx
 * and again in features/projects/project-detail.tsx — which is exactly how two
 * pages drift into different badge styling.
 */
export function Pill({
  children,
  className,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}): React.JSX.Element {
  return (
    <span
      className={cn(
        "border-border-default text-text-secondary inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
