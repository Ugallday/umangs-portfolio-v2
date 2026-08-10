# ADR-0003: Package-Ready Layering Without a Monorepo

**Status:** Accepted

## Context

The goal was for `core/` to be genuinely extractable — liftable into its own
package without a rewrite — because that is the only honest test of whether
the layering is real rather than decorative. A layered folder structure that
nothing enforces degrades within weeks: one `import { siteConfig }` inside a
domain entity, one `useState` in a use case, and the boundary is gone.

The obvious way to guarantee extractability is an actual monorepo — pnpm or
npm workspaces, `packages/core` with its own `package.json`. For a
single-author portfolio that means a second install graph, a build order, and
path indirection, all to enforce something a linter can enforce.

## Decision

Keep one package and one `src/` tree, and enforce the dependency direction at
lint time instead. `eslint-plugin-boundaries` in `eslint.config.mjs` declares
each directory as an element type and states, explicitly, which types each may
import from. The default is `disallow`, so a new element type is forbidden
until someone writes down what it is allowed to reach.

The permitted direction is inward only:

```
app  →  features  →  components  →  core-utils
              ↘   core-application  →  core-domain, core-contracts
              ↘   core-infrastructure → core-domain, core-contracts, core-utils
core-domain, core-utils  →  (nothing)
```

Two rules carry most of the weight:

- **`features` may not import `features`.** Elements capture the feature name,
  so `features/writing` cannot reach into `features/portfolio`; `app/` composes
  them instead. This is why `app/writing/[slug]/page.tsx` imports `SiteShell`
  from the portfolio feature and `PostDetail` from the writing feature, rather
  than the writing feature importing the shell itself.
- **`core/**` may never import `react` or `next`**, enforced separately by a
  `no-restricted-imports` rule scoped to `src/core/**/*.ts`. This is the rule
  that actually keeps `core/` extractable, and it is why `buildPageMetadata`
  returns a plain object that `features/portfolio/page-metadata.ts` maps onto
  Next's `Metadata` type at the call site.

## Consequences

- `npm run lint` fails on an illegal import. It is a gate, not a convention.
- Extraction stays a mechanical move: `core/` has no framework imports and no
  upward dependencies, so it can become a package when there is a second
  consumer to justify one.
- The cost is duplication at the seams. `features/writing/writing-index.tsx`
  restates a dozen lines of `SectionShell`'s layout rather than importing it
  across a feature boundary. That is the right trade at two features; the
  moment a third needs it, the fix is to promote the shell into `components/`,
  which every feature may import.
- No workspace tooling, no build order, no cross-package versioning.
