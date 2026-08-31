"use client";

import { cn } from "@/core/utils/cn";

/**
 * Adapted from a shadcn-style community snippet. The original imported the
 * full shadcn Button primitive (cva variants, Radix Slot/asChild) plus two
 * extra dependencies (@radix-ui/react-slot, class-variance-authority) for
 * what is, in the end, one button with one visual treatment - this project
 * has no shadcn Button and didn't need the abstraction, so the same hover
 * interaction is implemented directly as a plain styled button instead.
 * Colors use this project's own design tokens (`bg-accent-default` etc.)
 * rather than the shadcn ones referenced in the original (`bg-primary`,
 * `bg-background`), which don't exist here.
 *
 * The interaction itself is unchanged: a pill button whose icon disc slides
 * from the right edge to the left and rotates 45deg on hover, with the
 * padding animating in step so the disc never overlaps the label.
 *
 * One thing the port did initially miss: the original relied on shadcn
 * Button's own `inline-flex items-center` base class to vertically center
 * the disc (an absolutely-positioned child with no `top` set inherits
 * flex alignment from its container, per the CSS Flexbox spec). Dropping
 * the shadcn Button dropped that flex context too, leaving the disc
 * uncentered and clipped by the pill's own rounded corner. Fixed two ways
 * here - `items-center` restored on the button, and an explicit `top-1`
 * on the disc so its position isn't implicit on either mechanism.
 */
export function ButtonWithIcon({
  label,
  icon,
  className,
  discClassName,
  ...props
}: {
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly className?: string;
  /** Overrides the inner disc's own colors - it needs contrast against
   *  whatever the outer button's background ends up being, which a caller
   *  overriding `className` alone can't reach (it's a separate element). */
  readonly discClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>): React.JSX.Element {
  return (
    <button
      type="button"
      className={cn(
        "bg-accent-default text-text-on-accent hover:bg-accent-hover",
        "group relative flex h-12 w-fit cursor-pointer items-center overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium",
        "transition-all duration-500 hover:ps-14 hover:pe-6",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-all duration-500">{label}</span>
      <div
        className={cn(
          "bg-surface-base text-text-primary absolute top-1 right-1 flex h-10 w-10 items-center justify-center rounded-full",
          "transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          discClassName,
        )}
      >
        {icon}
      </div>
    </button>
  );
}
