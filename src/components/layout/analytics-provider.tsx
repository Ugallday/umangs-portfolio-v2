"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { AnalyticsContract } from "@/core/contracts/services/analytics.contract";

const AnalyticsContext = createContext<AnalyticsContract | null>(null);

interface AnalyticsProviderProps {
  readonly service: AnalyticsContract;
  readonly children: ReactNode;
}

/**
 * AnalyticsProvider
 *
 * The composition root (app/providers.tsx) is the ONLY place that decides
 * which AnalyticsContract implementation is in play. Every feature consumes
 * `useAnalytics()` and never knows or cares whether it's talking to Vercel
 * Analytics, PostHog, or a no-op test double.
 */
export function AnalyticsProvider({ service, children }: AnalyticsProviderProps): React.JSX.Element {
  return <AnalyticsContext.Provider value={service}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics(): AnalyticsContract {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
