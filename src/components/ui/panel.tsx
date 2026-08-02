import { cn } from "@/core/utils/cn";

/**
 * The one card/panel surface.
 *
 * Radius was previously spread across five values — 3xl, 2xl, 2rem, 1.75rem
 * and 1.5rem — for what is visually the same object, and padding across three
 * variants. Both scales live here now.
 */
export type PanelPadding = "none" | "md" | "lg";

const PADDING: Record<PanelPadding, string> = {
  none: "",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

/** Outer panels; nested surfaces inside a panel step down to `rounded-2xl`. */
export const PANEL_RADIUS = "rounded-3xl";

export function panelClass({
  padding = "md",
  interactive = false,
  className,
}: {
  readonly padding?: PanelPadding;
  readonly interactive?: boolean;
  readonly className?: string;
} = {}): string {
  return cn("fold-panel", PANEL_RADIUS, interactive && "fold-hover", PADDING[padding], className);
}
