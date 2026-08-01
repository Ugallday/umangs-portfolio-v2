"use client";

import { type ReactNode, useMemo } from "react";

import { AnalyticsProvider } from "@/components/layout/analytics-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { VercelAnalyticsService } from "@/core/infrastructure/services/vercel-analytics.service";

/**
 * Providers
 *
 * This is the composition root: the single place where contracts
 * (AnalyticsContract, etc.) are bound to concrete implementations. To swap
 * Vercel Analytics for PostHog, or run both, this file changes — nothing
 * in features/ or components/ does.
 */
export function Providers({ children }: { children: ReactNode }): React.JSX.Element {
  const analyticsService = useMemo(() => new VercelAnalyticsService(), []);

  return (
    <ThemeProvider>
      <AnalyticsProvider service={analyticsService}>{children}</AnalyticsProvider>
    </ThemeProvider>
  );
}
