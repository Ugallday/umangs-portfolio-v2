"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * Mount point for the hero's ambient 3D layer.
 *
 * It never renders on the server, so it cannot delay the hero's paint, and it
 * is inert to both the pointer and assistive technology.
 *
 * Under reduced motion it renders but holds still, rather than disappearing.
 * Removing it entirely deleted a visible part of the design for anyone whose
 * OS asks for less motion — which on Windows is just "animations off" — when
 * what that preference actually asks for is stillness.
 */

const FoldFieldScene = dynamic(() => import("@/components/three/fold-field-scene"), {
  ssr: false,
});

export function FoldField({
  className = "opacity-70",
}: {
  /** Overrides the layer's opacity where it sits behind denser text. */
  readonly className?: string;
} = {}): React.JSX.Element | null {
  const prefersReducedMotion = useReducedMotion();
  const [colors, setColors] = useState<{ accent: string; paper: string } | null>(null);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setColors({
      accent: styles.getPropertyValue("--accent-default").trim() || "#d9a25c",
      paper: styles.getPropertyValue("--text-muted").trim() || "#8f887f",
    });
  }, []);

  if (!colors) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 hidden md:block ${className}`}
    >
      <FoldFieldScene
        accentColor={colors.accent}
        paperColor={colors.paper}
        animate={!prefersReducedMotion}
      />
    </div>
  );
}
