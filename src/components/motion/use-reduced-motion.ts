"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const STORAGE_KEY = "origami-engineer-motion";

/** `system` follows the OS. The other two are an explicit choice by the visitor. */
export type MotionPreference = "system" | "full" | "reduced";

const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

function readOverride(): MotionPreference {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "full" || stored === "reduced" ? stored : "system";
}

export function setMotionPreference(preference: MotionPreference): void {
  if (preference === "system") {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, preference);
  }
  document.documentElement.dataset.motion = preference;
  notify();
}

export function getMotionPreference(): MotionPreference {
  return readOverride();
}

function subscribe(callback: () => void): () => void {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  listeners.add(callback);

  return () => {
    mediaQueryList.removeEventListener("change", callback);
    listeners.delete(callback);
  };
}

function getSnapshot(): boolean {
  const override = readOverride();
  if (override === "full") return false;
  if (override === "reduced") return true;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * useReducedMotion
 *
 * Every motion primitive reads this hook, so honouring the preference is
 * enforced at the primitive layer rather than remembered by each feature
 * author (see docs/architecture/accessibility-strategy.md).
 *
 * The OS setting is the default, and it remains the default. What is new is
 * that a visitor can override it in either direction. A machine with Windows
 * animations switched off reports `prefers-reduced-motion: reduce`, which is
 * usually a performance preference rather than a vestibular one — and it left
 * the site's whole motion design invisible with no way to ask for it. Turning
 * animation *on* now has to be a deliberate act, which is the right way round.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
