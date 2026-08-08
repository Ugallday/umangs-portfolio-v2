"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * A single line whose last word cycles.
 *
 * Adapted from the common "animated hero" pattern, with two changes that
 * matter. The words are things I have actually built rather than adjectives —
 * a headline that rotates through "amazing / wonderful / smart" tells a reader
 * nothing, and a recruiter reads it as filler. And it uses `motion/react`,
 * already in the project, rather than pulling in a second animation library.
 *
 * Under reduced motion the words are listed instead of cycled, so nothing is
 * hidden behind an animation that never plays.
 */
export function RotatingWords({
  prefix,
  words,
  intervalMs = 2200,
  className,
}: {
  readonly prefix: string;
  readonly words: readonly string[];
  readonly intervalMs?: number;
  readonly className?: string;
}): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || words.length < 2) return;

    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [intervalMs, prefersReducedMotion, words.length]);

  if (prefersReducedMotion) {
    return (
      <p className={className}>
        {prefix} {words.join(" · ")}
      </p>
    );
  }

  return (
    <p className={className}>
      {prefix}{" "}
      {/* The track is sized by the longest word so the line never reflows as
          the words swap — a shrinking container would nudge everything after
          it on every tick. */}
      <span className="relative inline-grid overflow-hidden align-bottom">
        {words.map((word, wordIndex) => (
          <motion.span
            key={word}
            aria-hidden={wordIndex === index ? undefined : "true"}
            className="text-accent-default col-start-1 row-start-1 whitespace-nowrap"
            initial={false}
            animate={
              wordIndex === index
                ? { y: "0%", opacity: 1 }
                : { y: wordIndex < index ? "-110%" : "110%", opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </p>
  );
}
