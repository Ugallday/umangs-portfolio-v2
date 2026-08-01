/**
 * AnalyticsContract
 *
 * The application NEVER imports an analytics SDK directly. Every call site
 * (features/, components/) depends on this interface. Swapping providers
 * (Vercel Analytics -> PostHog, or adding both) means writing one new
 * implementation of this contract in core/infrastructure/services/ —
 * nothing above this layer changes.
 *
 * See docs/adr/0004-analytics-behind-a-contract.md for the reasoning.
 */
export interface AnalyticsEventProperties {
  readonly [key: string]: string | number | boolean | null | undefined;
}

export interface AnalyticsContract {
  /** Fire a named product event with optional structured properties. */
  trackEvent(name: string, properties?: AnalyticsEventProperties): void;

  /** Record a page view. Called once per route change. */
  trackPageView(path: string): void;
}
