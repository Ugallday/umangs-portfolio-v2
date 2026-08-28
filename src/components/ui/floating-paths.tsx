"use client";

import { motion } from "motion/react";

import { cn } from "@/core/utils/cn";

/**
 * Adapted from a shadcn-style community snippet. Two changes from the
 * original: `cn` comes from this project's actual utils path (there is no
 * `@/lib/utils` alias here), and color is set via the `text-text-primary`
 * design token instead of hardcoded `text-slate-950 dark:text-white` -
 * this project themes through a `[data-theme]` attribute and CSS variables,
 * not Tailwind's `dark:` class variant, so the original color classes would
 * never actually respond to a theme change here.
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
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${
      189 + i * 6
    } -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${
      616 - i * 5 * position
    } ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${
      875 - i * 6
    }`,
    width: 0.5 + i * 0.03,
  }));

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
                duration: 20 + Math.random() * 10,
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
