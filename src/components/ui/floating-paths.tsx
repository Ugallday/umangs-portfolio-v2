"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import { cn } from "@/core/utils/cn";

/**
 * Adapted from a shadcn-style community snippet. Changes from the original:
 *  - `cn` comes from this project's actual utils path (there is no
 *    `@/lib/utils` alias here).
 *  - Color is set via the `text-text-primary` design token instead of
 *    hardcoded `text-slate-950 dark:text-white` - this project themes
 *    through a `[data-theme]` attribute and CSS variables, not Tailwind's
 *    `dark:` class variant, so the original color classes would never
 *    actually respond to a theme change here.
 *  - The per-path animation duration (`20 + Math.random() * 10`) is
 *    memoized instead of computed inline during render, so a re-render
 *    doesn't hand Motion a new random duration and cause it to retarget
 *    mid-animation.
 *  - Animating only `opacity`, not `pathLength`/`pathOffset`. Those two
 *    require Motion to recompute each path's stroke-dasharray/dashoffset in
 *    JS on every frame - not GPU-compositable the way opacity is - which
 *    got visibly expensive across 36 simultaneous paths on a desktop-sized
 *    viewport specifically (more pixels to rasterize per frame than on a
 *    phone screen), causing real stutter/flicker on desktop Chrome/Edge
 *    while the same code ran fine on mobile. Cut the path count too, since
 *    36 concurrent animated elements was the other lever on the same cost.
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
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${
          189 + i * 6
        } -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${
          616 - i * 5 * position
        } ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${
          875 - i * 6
        }`,
        width: 0.5 + i * 0.05,
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
              strokeOpacity={0.15 + path.id * 0.04}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{
                duration: path.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}
