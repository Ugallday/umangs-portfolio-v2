"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * useReducedMotion
 *
 * Every motion primitive in components/motion/ (FoldReveal, CreaseHover,
 * PageFold, TimelineExpand) reads this hook and substitutes
 * `--duration-instant` for `--duration-fold` / `--duration-page` when true.
 * Individual feature authors never have to remember to handle this — it is
 * enforced at the primitive layer, per docs/architecture/accessibility-strategy.md.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
