# ADR-0005: Vercel Analytics + Speed Insights Over PostHog

**Status:** Accepted (supersedes an earlier PostHog decision made in Phase 1
planning, before Phase 2 review)

## Context

Phase 1 planning tentatively selected PostHog for analytics. On review, the
project doesn't currently need product analytics (funnels, session replay,
feature flags) — it needs page views, Core Web Vitals, and basic event
tracking on a content-driven portfolio site.

## Decision

Use `@vercel/analytics` and `@vercel/speed-insights` instead. Both integrate
with zero additional configuration on Vercel's platform, and Speed Insights
directly feeds the Core Web Vitals numbers the `/engineering` dashboard
displays (see `docs/architecture/performance-budget.md`).

## Consequences

- One less third-party script, smaller client bundle, no cookie-consent
  complexity PostHog's default configuration would introduce.
- If product-analytics needs emerge later (e.g. feature-flagging an
  experimental page), PostHog can be added as a second implementation of
  `AnalyticsContract` (ADR-0004) without touching any call site — this
  decision was only possible to make cheaply _because_ ADR-0004 was made
  first.
