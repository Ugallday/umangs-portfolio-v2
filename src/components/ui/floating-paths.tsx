"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import { cn } from "@/core/utils/cn";

/**
 * Adapted from a shadcn-style community snippet. Three changes from the
 * original:
 *  - `cn` comes from this project's actual utils path (there is no
 *    `@/lib/utils` alias here).
 *  - Color is set via the `text-text-primary` design token instead of
 *    hardcoded `text-slate-950 dark:text-white` - this project themes
 *    through a `[data-theme]` attribute and CSS variables, not Tailwind's
 *    `dark:` class variant, so the original color classes would never
 *    actually respond to a theme change here.
 *  - The per-path animation duration (`20 + Math.random() * 10`) is
 *    memoized instead of computed inline during render. The original called
 *    `Math.random()` fresh on every render, so any re-render of this
 *    component - a parent re-render, a theme toggle, anything - handed
 *    Motion a brand-new `transition` object per path and caused it to
 *    retarget mid-animation, which is visible as a flicker/jump. Computing
 *    it once via `useMemo` keeps the same duration for the component's
 *    whole mounted lifetime.
 */
export function FloatingPathsBackground({
  position,
  children,
  className,
}: {
  position: number;
  className?: string;
  children: React.ReactNode;
}) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${
          189 + i * 6
        } -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${
          616 - i * 5 * position
        } ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${
          875 - i * 6
        }`,
        width: 0.5 + i * 0.03,
        duration: 20 + Math.random() * 10,
      })),
    [position],
  );

  return (
    <div className={cn("relative w-full", className)}>
      <div className="pointer-events-none absolute inset-0">
        <svg className="text-text-primary h-full w-full" viewBox="0 0 696 316" fill="none">
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + path.id * 0.03}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
                opacity: [0.3, 0.6, 0.3],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: path.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}
