# System design

How the site is put together, and where each kind of change belongs. The
dependency direction described here is enforced by `eslint-plugin-boundaries`
in `eslint.config.mjs` — see ADR-0003 for why it is a linter rule rather than
a monorepo.

## Layers

```
app/          routing and composition only — no business logic, no layout
features/     UI + orchestration, one folder per domain, public API via index.ts
components/   design system + layout chrome, no business logic
core/
  domain/         entities, SEO composition — zero I/O, zero framework
  application/    use cases — orchestrate the domain through contracts
  contracts/      interfaces (repositories, services) — the inversion seam
  infrastructure/ implementations (MDX repositories, Vercel Analytics)
  utils/          generic, framework-free helpers
config/       single source of truth for nav, socials, site metadata
assets/       portrait and diagrams, imported rather than served from public/
```

Dependencies point inward. `core/domain` and `core/utils` import nothing else
in the tree; `core/**` may never import React or Next.

## How a page gets its content

The path is the same for both collections. Taking a case study:

```
app/projects/[slug]/page.tsx
  └─ features/projects/index.ts        (barrel — the only entry app/ uses)
      └─ features/projects/api.ts      (the seam: instantiates the repository)
          └─ core/application/use-cases/project-use-cases.ts
              └─ core/contracts/repositories/project-repository.contract.ts
                  ▲ implemented by
                  └─ core/infrastructure/repositories/mdx-project-repository.ts
                      └─ content/projects/*.mdx  ← validated by a Zod schema
```

Only the repository knows content lives on disk. Moving to a database means
writing a second class against the same contract and changing the one line in
`api.ts` that constructs it. `features/writing` mirrors this exactly.

## Where a change belongs

| Change                     | Where                                                           |
| -------------------------- | --------------------------------------------------------------- |
| New case study or post     | a new `.mdx` file under `content/` — no code                    |
| New field on a project     | the Zod schema, then the entity, then the renderer              |
| New route                  | `app/<route>/page.tsx`, composing an existing feature section   |
| New nav item               | `config/site.ts` — the header, 404 page and sitemap all read it |
| Copy change                | `features/portfolio/content.ts`, or the MDX frontmatter         |
| Colour, spacing, elevation | `styles/tokens.css` — never a component                         |
| New data source            | a class implementing the existing repository contract           |

## Rendering and caching

Pages are React Server Components. Routes that read MDX declare
`export const revalidate = 3600`, so content is re-read hourly rather than on
every request. `/projects/[slug]` and `/writing/[slug]` supply
`generateStaticParams`, so published entries are prerendered at build time —
which is also why a draft produces no route at all.

Client components are the exception and are marked as such: the header
disclosure menu, the theme and motion toggles, the scroll and fold motion
wrappers, and the two 3D scenes.

## Cross-cutting concerns

- **Metadata.** `core/domain/seo/build-page-metadata.ts` is a pure function
  producing a framework-independent shape; `features/portfolio/page-metadata.ts`
  maps it onto Next's `Metadata`. Share cards are generated at `/api/og` and
  carry the page title. `app/sitemap.ts` and `app/robots.ts` derive from
  `config/site.ts` and the MDX collections, so neither can go stale by hand.
- **Security.** A per-request nonce CSP is set in `src/middleware.ts`, with a
  static fallback in `next.config.ts`. See `docs/architecture/security.md`.
- **Accessibility.** Contrast is asserted against the real tokens by a unit
  test. See `docs/architecture/accessibility-strategy.md`.
- **Analytics.** Behind `AnalyticsContract`. See ADR-0004, including its note
  on the contract having no consumer yet.
