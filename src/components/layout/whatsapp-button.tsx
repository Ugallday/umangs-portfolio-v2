"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { WhatsAppGlyph } from "@/components/ui/whatsapp-glyph";
import { siteConfig } from "@/config/site";

/**
 * Fixed contact affordance, present on every route.
 *
 * Sized and positioned to clear the mobile safe area so it never sits on top
 * of content or the browser chrome. The entrance is a short delayed fade so
 * it doesn't compete with the hero on first paint.
 */
export function WhatsAppButton(): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
      return;
    }

    const timer = window.setTimeout(() => setHasEntered(true), 900);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <a
      href={siteConfig.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Aalok on WhatsApp"
      className="border-border-default bg-surface-overlay text-text-primary hover:border-border-strong fixed right-5 bottom-5 z-50 inline-flex h-13 w-13 items-center justify-center rounded-full border shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:scale-105 sm:right-7 sm:bottom-7"
      style={{
        // Keeps the button above the iOS home indicator / Android gesture bar.
        marginBottom: "env(safe-area-inset-bottom, 0px)",
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
        transition: prefersReducedMotion
          ? undefined
          : "opacity 380ms var(--ease-fold), transform 380ms var(--ease-fold)",
      }}
    >
      <WhatsAppGlyph className="h-6 w-6" />
    </a>
  );
}
