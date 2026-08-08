"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * Mount point for the hero's ambient 3D layer.
 *
 * Three rules keep a decorative canvas from costing anything that matters:
 * it never renders on the server, so it cannot delay the hero's paint; it does
 * not load at all when the visitor prefers reduced motion, since an
 * always-animating field has no still state worth showing; and it is inert to
 * both the pointer and assistive technology.
 */

const FoldFieldScene = dynamic(() => import("@/components/three/fold-field-scene"), {
  ssr: false,
});

export function FoldField(): React.JSX.Element | null {
  const prefersReducedMotion = useReducedMotion();
  const [colors, setColors] = useState<{ accent: string; paper: string } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const styles = getComputedStyle(document.documentElement);
    setColors({
      accent: styles.getPropertyValue("--accent-default").trim() || "#d9a25c",
      paper: styles.getPropertyValue("--text-muted").trim() || "#8f887f",
    });
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !colors) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden opacity-70 md:block"
    >
      <FoldFieldScene accentColor={colors.accent} paperColor={colors.paper} />
    </div>
  );
}
