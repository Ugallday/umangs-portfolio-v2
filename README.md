# The Origami Engineer

> An engineering portfolio platform — not a brochure. Every section is built
> to teach something: how the system is architected, why each decision was
> made, and what was learned building it.

[![CI](https://github.com/your-handle/origami-engineer/actions/workflows/ci.yml/badge.svg)](https://github.com/your-handle/origami-engineer/actions/workflows/ci.yml)
[![Deployed on Vercel](https://img.shields.io/badge/deployed-vercel-000000?logo=vercel)](https://theorigamiengineer.dev)
![License](https://img.shields.io/badge/license-MIT-blue)

**Live:** [theorigamiengineer.dev](https://theorigamiengineer.dev)

---

## What this is

A personal engineering portfolio built with the same rigor as production
software: a layered, framework-independent core; typed content pipelines
instead of hardcoded pages; CI-enforced accessibility and test coverage;
and every non-trivial architectural decision recorded as an ADR rather than
left implicit.

The visual language — **The Origami Engineer** — treats every surface as
folded paper: elevation comes from stacked layers, not floating shadows;
motion is always a fold, crease, or unfold, never a generic fade or slide.

## Features

- **Case studies as products, not job history** — the flagship NSA Travels
  case study documents a real product transformation: requirements,
  architecture, staff training, deployment, and measured business impact.
- **Typed MDX content collections** — adding one `.mdx` file under
  `content/projects/` generates a full project page. Malformed frontmatter
  fails the build via Zod validation, not a broken page in production.
- **Repository pattern with a swappable data layer** — content currently
  reads from MDX; the domain and application layers depend only on
  interfaces (`core/contracts/repositories/`), so migrating to Supabase
  later touches one file, not the application.
- **Engineering dashboard** (`/engineering`) — live Core Web Vitals,
  bundle size, test coverage, and deployment status, not just claimed in
  a README.
- **Accessibility as an enforced property** — WCAG AA contrast is asserted
  by a unit test against the actual design tokens, not audited once by
  hand.

## Architecture

```
Presentation   app/ (routing)  →  features/ (UI + orchestration)
Design System  components/ (atoms, molecules — no business logic)
Business Logic core/domain/ + core/application/  (framework-independent)
Contracts      core/contracts/  (interfaces — the dependency-inversion seam)
Infrastructure core/infrastructure/  (MDX today, Supabase-ready)
```

Dependency direction always points inward, enforced at lint-time by
`eslint-plugin-boundaries` in `eslint.config.mjs` — a PR that violates the
layering fails CI, it isn't just a convention in a doc.

Full write-up: [`docs/architecture/system-design.md`](docs/architecture/system-design.md)
· Decision history: [`docs/adr/`](docs/adr/)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, React Server Components) |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS v4, CSS-variable-driven design tokens |
| Content | MDX + Zod-validated frontmatter |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Media | Cloudinary |
| 3D | React Three Fiber + Drei (hero object only) |
| Analytics | Vercel Analytics + Speed Insights |
| Testing | Vitest (unit) + Playwright (E2E) |
| CI/CD | GitHub Actions → Vercel |

Every one of these choices is justified in [`docs/adr/`](docs/adr/), including
the ones I *didn't* make — see [ADR-0001](docs/adr/0001-single-app-over-turborepo.md)
for why this is a single app, not a Turborepo, despite the codebase being
structured so migration would be straightforward if that ever changes.

## Folder structure

```
src/
├── app/              # routing & composition only
├── features/          # one folder per domain, public API via index.ts
├── components/        # design system — atoms & molecules
├── core/
│   ├── domain/         # entities, value objects — zero I/O, zero framework
│   ├── application/    # use cases — orchestrate domain via contracts
│   ├── contracts/       # interfaces (repositories, services)
│   ├── infrastructure/ # implementations (MDX repos, Vercel Analytics, ...)
│   └── utils/           # generic, framework-free helpers
├── config/            # single source of truth: nav, site metadata
└── styles/            # design tokens (CSS custom properties)
content/               # MDX source of truth for all typed collections
docs/
├── architecture/       # system design, security, a11y, performance budget
└── adr/                 # every non-trivial decision, numbered and dated
tests/
├── unit/                # Vitest
└── e2e/                  # Playwright
```

## Development

```bash
git clone https://github.com/your-handle/origami-engineer.git
cd origami-engineer
npm install
cp .env.example .env.local   # fill in Resend / Cloudinary keys
npm run dev
```

```bash
npm run validate    # typecheck + lint + format check + unit tests — the CI gate, locally
npm run test:e2e    # Playwright, requires a production build
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org/),
enforced by commitlint on a Husky `commit-msg` hook. See
[`docs/coding-standards.md`](docs/coding-standards.md) and
[`CONTRIBUTING.md`](CONTRIBUTING.md).

## Performance targets

See [`docs/architecture/performance-budget.md`](docs/architecture/performance-budget.md)
for the full table (LCP, INP, CLS, bundle size, coverage thresholds) — these
are CI-enforced gates, not aspirational numbers.

## License

MIT — see [`LICENSE`](LICENSE).
