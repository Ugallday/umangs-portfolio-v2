# Performance Budget

These are hard targets, not aspirations. The `/engineering` dashboard (Phase 4+)
reads real values from Vercel Speed Insights and Lighthouse CI and displays
them against this budget — so a regression is visible on the site itself,
not just in this document.

| Metric                            | Budget           | Measured via                              |
| --------------------------------- | ---------------- | ----------------------------------------- |
| Initial JS (route-level, gzipped) | ≤ 130 KB         | `next build` output / bundle analyzer     |
| Largest Contentful Paint (p75)    | ≤ 2.0s           | Vercel Speed Insights                     |
| Interaction to Next Paint (p75)   | ≤ 200ms          | Vercel Speed Insights                     |
| Cumulative Layout Shift (p75)     | ≤ 0.05           | Vercel Speed Insights                     |
| Lighthouse Performance            | ≥ 95             | Lighthouse CI (GitHub Action, PR comment) |
| Lighthouse Accessibility          | 100              | Lighthouse CI                             |
| Lighthouse SEO                    | 100              | Lighthouse CI                             |
| Unit test coverage — `core/`      | ≥ 90% statements | `vitest run --coverage` (CI gate)         |

## Enforcement

- Coverage thresholds are enforced in `vitest.config.ts` — a PR that drops
  `core/` coverage below 90% fails CI, it does not just get flagged.
- Lighthouse CI is added as a GitHub Action once the homepage exists
  (Phase 4), with `assert` thresholds matching this table so a regression
  blocks merge rather than being caught after deploy.
- Bundle size is checked via `next build`'s route-level output; a budget
  check script (`scripts/check-bundle-budget.ts`) is added in the same PR
  that introduces the first heavy dependency (React Three Fiber on the
  homepage), so the budget has teeth from the moment it matters.
