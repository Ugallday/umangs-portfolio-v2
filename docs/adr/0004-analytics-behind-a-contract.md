# ADR-0004: Analytics Behind a Contract

**Status:** Accepted

## Context

The application needs page-view and event tracking. The specific provider
(Vercel Analytics today, possibly PostHog or another tool later if product
analytics needs grow beyond what Vercel provides) is an infrastructure
detail, not a business rule.

## Decision

Define `AnalyticsContract` in `core/contracts/services/`. Every call site
(`features/`, `components/`) depends on `useAnalytics()`, which resolves to
whatever implementation is bound in `app/providers.tsx` (the composition
root). No feature or component imports an analytics SDK directly.

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
