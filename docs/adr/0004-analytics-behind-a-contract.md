# ADR-0004: Analytics Behind a Contract

**Status:** Accepted

## Context

The application needs page-view and event tracking. The specific provider
(Vercel Analytics today, possibly PostHog or another tool later if product
analytics needs grow beyond what Vercel provides) is an infrastructure
detail, not a business rule.

## Decision

Define `AnalyticsContract` in `core/contracts/services/`. Any call site
(`features/`, `components/`) that fires an event depends on `useAnalytics()`,
which resolves to whatever implementation is bound in `app/providers.tsx` (the
composition root). No feature or component imports an analytics SDK directly.

## Current state — no consumer yet

This is worth stating plainly, because the decision above reads as though the
contract is load-bearing and it is not, yet.

`AnalyticsContract`, `AnalyticsProvider`, `VercelAnalyticsService` and
`useAnalytics()` all exist and are wired together in `app/providers.tsx`, but
**nothing in the codebase calls `trackEvent`**. The analytics that actually
run are the `<Analytics />` and `<SpeedInsights />` components in
`app/layout.tsx`, which report page views directly and bypass this contract
entirely — page views need no call site, which is why the gap went unnoticed.

So today the contract is scaffolding for custom events, not an abstraction
over something in use. The first real consumer should be an outbound-click
event on the live-app links and case-study opens, which is the only analytics
question this site actually has ("does anyone click through to the software?").
Until that exists, a reader following this ADR into the code will find an
interface with one implementation and no caller, and should not conclude they
have missed something.

## Consequences

- Swapping or adding a provider is a new file in `core/infrastructure/services/`
  plus a one-line change in `app/providers.tsx`.
- Testing components that fire analytics events requires only a fake
  `AnalyticsContract` implementation, not mocking a real SDK.
- Slight indirection overhead for a single-provider app today — accepted,
  because the alternative (importing `@vercel/analytics` throughout
  `features/`) is exactly the coupling Clean Architecture exists to avoid,
  and the cost of undoing that later is much higher than the cost of the
  interface now.
