# The Origami Engineer

> An engineering portfolio platform — not a brochure. Every section is built
> to teach something: how the system is architected, why each decision was
> made, and what was learned building it.

[![CI](https://github.com/aalokbhandari/origami-engineer/actions/workflows/ci.yml/badge.svg)](https://github.com/aalokbhandari/origami-engineer/actions/workflows/ci.yml)
[![Deployed on Vercel](https://img.shields.io/badge/deployed-vercel-000000?logo=vercel)](https://vercel.com)
![License](https://img.shields.io/badge/license-MIT-blue)

**Live:** _domain not yet connected_ <!-- TODO: swap in the real domain once purchased -->
**Author:** [Aalok Bhandari](https://www.linkedin.com/in/alokbndry10/) · [GitHub](https://github.com/aalokbhandari) · [Instagram](https://www.instagram.com/by.aalok/)

---

## What this is

A personal engineering portfolio built with the same rigor as production
software: a layered, framework-independent core; typed content pipelines
instead of hardcoded pages; lint-enforced architectural boundaries; and
accessibility asserted by tests rather than by claim.

The visual language — **The Origami Engineer** — treats every surface as
folded paper: elevation comes from stacked layers, not floating shadows;
motion is always a fold, crease, or unfold, never a generic fade or slide.

The copy is written in first person throughout. The flagship case study
documents the digital transformation of **Nepal South Asia International
Travels & Tours**, my family's travel agency: replacing Excel/paper
bookkeeping with a custom accounting system, adding cloud backup and a
structured customer/B2B database, and building the company's public website.

The key engineering project inside that story is the
[**VAT Billing System**](https://github.com/aalokbhandari/vat-billing-system) —
a multi-tenant, offline-first double-entry accounting system that the agency
runs its books on. It leads the homepage below the hero and has its own case
study at `/projects/vat-billing-system`.

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

| Route              | Contents                                               |
| ------------------ | ------------------------------------------------------ |
| `/`                | Hero + featured project + hub linking to every section |
| `/about`           | The story, plus the full timeline                      |
| `/experience`      | NSA Travels — before/after, role, flagship link        |
| `/projects`        | All projects, grouped by stage                         |
| `/projects/[slug]` | Case study, with its architecture/DFD diagram          |
| `/education`       | Curriculum map, trainings, workshops                   |
| `/skills`          | Grouped capabilities — no skill bars                   |
| `/philosophy`      | Working principles                                     |
| `/contact`         | Contact channels                                       |
| _404_              | Custom not-found page with section links               |

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

> **Note:** `package.json` still carries dependencies for features that are not
> wired up — Resend, React Hook Form, Cloudinary, React Three Fiber, Radix UI,
> and cmdk are installed but unused in `src/`. They should either be used or
> removed before this is treated as a finished build.

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
git clone https://github.com/aalokbhandari/origami-engineer.git
cd origami-engineer
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
- `public/logos/nsa-travels-logo.svg` — NSA Travels credibility mark
- `public/certificates/` — certificate and achievement images
- Company website / accounting app / Travora screenshots

The Open Graph card is generated at `/api/og`, so it needs no exported asset.

## Performance targets

See [`docs/architecture/performance-budget.md`](docs/architecture/performance-budget.md)
for the full table (LCP, INP, CLS, bundle size, coverage thresholds).

## License

MIT — see [`LICENSE`](LICENSE).
