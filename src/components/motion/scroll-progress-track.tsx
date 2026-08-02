"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * Vertical rail whose fill tracks how far the reader has scrolled through the
 * wrapped content — used by the timeline.
 *
 * Scroll work is rAF-throttled and reads layout once per frame, so it stays off
 * the critical path. Under reduced motion no listener is attached at all and
 * the rail simply renders full.
 */
export function ScrollProgressTrack({
  children,
}: {
  readonly children: React.ReactNode;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const measure = (): void => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      // 0 when the top edge reaches the viewport middle, 1 once the bottom
      // edge passes it — so the rail fills as the section is read.
      const anchor = window.innerHeight * 0.5;
      const travelled = anchor - rect.top;
      setProgress(Math.min(1, Math.max(0, travelled / Math.max(rect.height, 1))));
    };

    const onScroll = (): void => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className="relative pl-6 sm:pl-8">
      <div
        aria-hidden="true"
        className="bg-border-subtle absolute top-2 bottom-2 left-2 w-px sm:left-3"
      >
        <div
          className="bg-accent-default w-px origin-top"
          style={{
            height: `${progress * 100}%`,
            transition: prefersReducedMotion ? undefined : "height 120ms linear",
          }}
        />
      </div>
      {children}
    </div>
  );
}
