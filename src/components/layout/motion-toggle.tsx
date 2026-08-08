"use client";

import { Sparkle, SparkleIcon } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getMotionPreference,
  setMotionPreference,
  useReducedMotion,
} from "@/components/motion/use-reduced-motion";

/**
 * Lets a visitor turn the site's motion on or off regardless of the OS.
 *
 * A machine with Windows animations switched off reports
 * `prefers-reduced-motion: reduce`, which is usually a performance setting
 * rather than a medical one. The site honoured it completely — no 3D layer, no
 * drifting sheets, no marquee — leaving a large part of the design invisible
 * with no way to ask for it. The OS is still the default; this only makes the
 * default overridable.
 */
export function MotionToggle(): React.JSX.Element | null {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // The button's label depends on localStorage and a media query, so rendering
  // it on the server would guarantee a hydration mismatch.
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const next = reduced ? "full" : "reduced";

  return (
    <button
      type="button"
      onClick={() => setMotionPreference(next)}
      aria-pressed={!reduced}
      aria-label={reduced ? "Turn animation on" : "Turn animation off"}
      title={
        reduced
          ? getMotionPreference() === "system"
            ? "Your system asks for reduced motion. Turn animation on anyway."
            : "Turn animation on"
          : "Turn animation off"
      }
      className="border-border-subtle bg-surface-overlay text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
    >
      {reduced ? (
        <SparkleIcon className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Sparkle className="h-[18px] w-[18px] fill-current" aria-hidden="true" />
      )}
    </button>
  );
}
