import { track } from "@vercel/analytics";

import type {
  AnalyticsContract,
  AnalyticsEventProperties,
} from "@/core/contracts/services/analytics.contract";

/**
 * VercelAnalyticsService
 *
 * Implements AnalyticsContract using @vercel/analytics. This is the only
 * file permitted to import that package — enforced by convention here and
 * by the "no vendor imports outside infrastructure/" review checklist in
 * docs/coding-standards.md (a lint rule for this specific case is lower
 * value than the boundaries rule already covering core/*, so it's a
 * documented review convention rather than an automated one).
 */
export class VercelAnalyticsService implements AnalyticsContract {
  trackEvent(name: string, properties?: AnalyticsEventProperties): void {
    track(name, properties);
  }

  trackPageView(path: string): void {
    track("page_view", { path });
  }
}
