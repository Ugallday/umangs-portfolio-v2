# Umang Gupta — Portfolio

> A data-focused engineering portfolio — not a brochure. Every section is
> built to teach something: how the systems were architected, why each
> decision was made, and what was learned building it.

[![Deployed on Vercel](https://img.shields.io/badge/deployed-vercel-000000?logo=vercel)](https://vercel.com)
![License](https://img.shields.io/badge/license-MIT-blue)

**Live:** [www.umanggupta.com.np](https://www.umanggupta.com.np)
**Author:** [Umang Gupta](https://www.linkedin.com/in/umangupta1) · [GitHub](https://github.com/Ugallday)

---

## What this is

A personal engineering portfolio built with the same rigor as production
software: a layered, framework-independent core; typed content pipelines
instead of hardcoded pages; lint-enforced architectural boundaries; and
accessibility asserted by tests rather than by claim.

Clean, minimal visual language — restrained, no unnecessary motion or
ornamentation. Elevation comes from typography and spacing, not decoration.

The copy is written in first person throughout. The flagship case study is
the **UTA Fleet Availability Data Warehouse**, built during a Data Analysis
and Research internship at the Utah Transit Authority: a star-schema data
warehouse with SSIS handling ETL and Power BI/DAX powering the operational
dashboard. Alongside it sit an **EV fleet automation** pipeline (Python and
Playwright pulling electric-bus and charger data from two vendor platforms),
**ObfuScope** — a research paper on fingerprinting malware obfuscation
toolchains, submitted to ACM Transactions on Privacy and Security — and a set
of personal data projects.

## Features

- **Typed MDX content collections** — adding one `.mdx` file under
  `content/projects/` generates a full project page. Malformed frontmatter
  fails the build via Zod validation, not a broken page in production.
- **Repository pattern with a swappable data layer** — content currently
  reads from MDX; the domain and application layers depend only on
  interfaces (`core/contracts/repositories/`), so migrating to a database
  later touches one file, not the application.
- **Architectural boundaries enforced at lint time** — `eslint-plugin-boundaries`
  fails the build on an illegal import direction. It's a gate, not a convention.
- **Accessibility as an enforced property** — WCAG AA contrast is asserted
  by a unit test against the actual design tokens, not audited once by hand.
- **Per-request nonce CSP** — set in `src/middleware.ts`, with a static
  fallback in `next.config.ts`.

## Routes

Each section is its own route; the homepage is a short hub that links to them.

| Route              | Contents                                                    |
| ------------------ | ----------------------------------------------------------- |
| `/`                | Hero + flagship project + hub linking to every section      |
| `/now`             | Dated monthly snapshot: building, next, not doing           |
| `/about`           | The story, plus the full timeline                           |
| `/background`      | Degree and agency on one timeline; curriculum, trainings    |
| `/projects`        | All projects, grouped by stage                              |
| `/projects/[slug]` | Case study, with its architecture/DFD diagram               |
| `/writing`         | Post index — honest empty state until the first is finished |
| `/writing/[slug]`  | A post; drafts 404 rather than resolving                    |
| `/skills`          | Eight defended items plus an explicit learning tier         |
| `/workflow`        | AI-augmented workflow, the stage model, and the toolkit     |
| `/gaming`          | Personal; reachable from the footer, not the primary nav    |
| `/contact`         | Contact channels                                            |
| _404_              | Custom not-found page with section links                    |

`/experience` and `/education` permanently redirect to `/background`;
`/philosophy` redirects to `/about`. See `redirects()` in `next.config.ts`.

`app/sitemap.ts` and `app/robots.ts` are generated from `config/site.ts` and
the MDX collections, so a new route is in the sitemap the day it is added.

A floating WhatsApp button, a light/dark theme toggle, and a mobile disclosure
menu are present on every route. Route changes animate via `app/template.tsx`.

> **Note:** `npm run test:e2e` and Lighthouse both need a browser installed
> (`npx playwright install`). Neither has been run against the current build —
> no Lighthouse scores are recorded for it.

## Architecture

```
Presentation   app/ (routing)  →  features/ (UI + orchestration)
Design System  components/ (atoms, molecules — no business logic)
Business Logic core/domain/ + core/application/  (framework-independent)
Contracts      core/contracts/  (interfaces — the dependency-inversion seam)
Infrastructure core/infrastructure/  (MDX today, database-ready)
```

Dependency direction always points inward, enforced at lint-time by
`eslint-plugin-boundaries` in `eslint.config.mjs`. `core/**` may never import
React or Next — that restriction is a separate lint rule, and it's what keeps
the core genuinely extractable.

Decision history: [`docs/adr/`](docs/adr/)

## Tech stack

| Layer     | Choice                                             |
| --------- | -------------------------------------------------- |
| Framework | Next.js (App Router, React Server Components)      |
| Language  | TypeScript (strict, no `any`)                      |
| Styling   | Tailwind CSS v4, CSS-variable-driven design tokens |
| Content   | MDX + Zod-validated frontmatter                    |
| Analytics | Vercel Analytics + Speed Insights                  |
| Testing   | Vitest (unit) + Playwright (E2E)                   |
| CI/CD     | GitHub Actions → Vercel                            |

> **Note:** the unused dependencies this section used to list — Resend, React
> Hook Form, cmdk, class-variance-authority and four Radix packages — were
> removed in the August 2026 cleanup, along with the Cloudinary CSP and image
> allowlists that authorised a host nothing loaded from. React Three Fiber and
> `reading-time` were on that list by mistake; both are in use.

## Folder structure

```
src/
├── app/               # routing & composition only
├── features/          # one folder per domain, public API via index.ts
├── components/        # design system + layout chrome
├── core/
│   ├── domain/        # entities, value objects — zero I/O, zero framework
│   ├── application/   # use cases — orchestrate domain via contracts
│   ├── contracts/     # interfaces (repositories, services)
│   ├── infrastructure/# implementations (MDX repos, Vercel Analytics, ...)
│   └── utils/         # generic, framework-free helpers
├── assets/            # portrait + project diagrams (imported, not public/)
├── config/            # single source of truth: nav, site metadata, socials
└── styles/            # design tokens (CSS custom properties)
content/               # MDX source of truth for all typed collections
docs/
├── architecture/      # security, a11y, performance budget
└── adr/               # numbered decision records
tests/
├── unit/              # Vitest
└── e2e/               # Playwright
```

## Development

```bash
git clone https://github.com/Ugallday/umangs-portfolio-v2.git
cd umangs-portfolio-v2
npm install
cp .env.example .env.local
npm run dev
```

```bash
npm run validate    # typecheck + lint + format check + unit tests — the CI gate, locally
npm run build       # production build
npm run test:e2e    # Playwright; run `npx playwright install` first
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org/),
enforced by commitlint on a Husky `commit-msg` hook. See
[`docs/coding-standards.md`](docs/coding-standards.md) and
[`CONTRIBUTING.md`](CONTRIBUTING.md).

## Assets still needed

These are referenced by planned work and not yet in the repo:

- `public/resume.pdf` — for the Download Resume button
- Dashboard/report screenshots (UTA fleet availability dashboard, EV
  automation output) and any personal-project screenshots, where sharable

The Open Graph card is generated at `/api/og`, so it needs no exported asset.

## Performance targets

See [`docs/architecture/performance-budget.md`](docs/architecture/performance-budget.md)
for the full table (LCP, INP, CLS, bundle size, coverage thresholds).

## License

MIT — see [`LICENSE`](LICENSE).
