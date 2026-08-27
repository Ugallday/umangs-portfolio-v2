"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";

interface FoldRevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delayMs?: number;
}

export function FoldReveal({
  children,
  className = "",
  delayMs = 0,
}: FoldRevealProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          window.setTimeout(() => setIsVisible(true), delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delayMs, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      data-visible={isVisible ? "true" : "false"}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: prefersReducedMotion
          ? undefined
          : "opacity 500ms var(--ease-fold), transform 500ms var(--ease-fold)",
        willChange: prefersReducedMotion ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
