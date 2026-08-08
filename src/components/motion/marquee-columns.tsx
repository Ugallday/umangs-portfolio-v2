"use client";

import { motion } from "motion/react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { TechBadge } from "@/components/ui/tech-badge";
import { cn } from "@/core/utils/cn";

/**
 * Columns of cards that scroll slowly past, at different speeds.
 *
 * Adapted from the "testimonials columns" pattern. The pattern is good; the
 * usual content for it is not — a portfolio carrying invented testimonials
 * from stock-photo strangers is claiming endorsements that do not exist, and
 * the stock avatars would be blocked by this site's image policy anyway. So it
 * runs on something real instead: the technologies actually in use, with their
 * own marks.
 *
 * The list is duplicated once and the track travels exactly half its height,
 * which is what makes the loop seamless. Under reduced motion the animation is
 * dropped and the column renders as a plain static list.
 */
export function MarqueeColumn({
  items,
  durationSeconds = 26,
  className,
}: {
  readonly items: readonly string[];
  readonly durationSeconds?: number;
  readonly className?: string;
}): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  const column = (
    <div className="flex flex-col gap-3 pb-3">
      {(prefersReducedMotion ? items : [...items, ...items]).map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="border-border-subtle bg-surface-overlay flex items-center rounded-2xl border px-3 py-2.5"
        >
          <TechBadge label={item} className="border-transparent" />
        </div>
      ))}
    </div>
  );

  if (prefersReducedMotion) {
    return <div className={className}>{column}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration: durationSeconds, repeat: Infinity, ease: "linear" }}
      >
        {column}
      </motion.div>
    </div>
  );
}
