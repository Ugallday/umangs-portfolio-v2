# Site audit — 10 August 2026

Full sweep of the repo after the copy pass and the `/now` + `/writing` work.
Everything below was verified against the actual files, not inferred. Grouped
by whether it contradicts something already shipped, is missing, is dead
weight, or is simply wrong.

---

## A. Contradicts what was just shipped — fix first

### A1. The share card still sells the old positioning

`src/app/api/og/route.tsx` renders:

> I didn't wait for an internship. I found a business that needed fixing.
> Systems fixer · BSc CSIT · Travel operations

The hero now says _"I build software that has to be correct."_ The OG card is
the single most-shared representation of the site — every LinkedIn post,
WhatsApp message and Slack paste renders it, and most people see it **before**
they see the page. Right now it contradicts the page it links to.

Worse, the file's own comment claims it is "generated rather than a static
asset so it can never drift out of sync with siteConfig". The headline is
hardcoded, so it drifted anyway. Either pull the headline from `content.ts` or
delete the claim.

### A2. The web manifest carries the pre-rewrite description

`public/site.webmanifest` still says:

> ...specializing in software engineering, digital transformation, AI-assisted
> development, and practical software systems.

`siteConfig.description` was rewritten; this copy of it was not. It is what
shows when the site is installed or added to a home screen, and it re-asserts
the "AI" claim that item 5 of the plan deliberately removed.

### A3. The README route table describes a site that no longer exists

It lists `/experience`, `/education` and `/philosophy` — all three now
redirect elsewhere — and is missing `/background`, `/workflow`, `/gaming`,
`/now`, `/writing` and `/writing/[slug]`.

### A4. README says the domain is not connected

> **Live:** _domain not yet connected_

`siteConfig.url` is `https://www.aalokbhandari.com.np` and the site deploys
from `main`. Verify and replace with the real link — this is the first line a
GitHub visitor reads.

---

## B. Missing, cheap, and disproportionately valuable

### B1. There is no sitemap

No `src/app/sitemap.ts` anywhere. Nothing tells a crawler the route set
exists. This matters more now than last week, because `/now` and `/writing`
are new and unlinked from anywhere external. Next's App Router makes this a
~20-line file generated from `siteConfig.nav` plus the MDX collections, so it
can never go stale by hand.

### B2. There is no `robots.txt`

`metadata.robots` in `layout.tsx` sets the per-page meta tag, which is not the
same thing. There is no `/robots.txt` route and therefore no `Sitemap:` line
pointing crawlers at B1.

### B3. Every page shares one identical OG image

`buildPageMetadata` always points `openGraph.images` at `/api/og` with no
parameters. A shared VAT case study, a shared `/now`, and the homepage all
produce the same card. `/api/og?title=…&eyebrow=…` is a small change and makes
every shared link legible on its own.

Related: the OG images declare no `width`, `height` or `alt`. Some crawlers
want the dimensions before they will render a large card.

### B4. There is no CV or résumé anywhere

Both `README.md` and `TODO.md` reference `public/resume.pdf` "for the Download
Resume button". Neither the file nor the button exists — I checked; there is
no `resume` string anywhere in `src/` or `content/`.

For the audience the plan names — admissions committees — this is the single
most-requested artifact on the whole site, and it is the one thing that is
completely absent.

---

## C. Dead weight — remove

### C1. Unused dependencies

Confirmed zero references anywhere in `src/`:

| Package                                                            | Note                                 |
| ------------------------------------------------------------------ | ------------------------------------ |
| `resend`                                                           | contact form that was never built    |
| `react-hook-form` + `@hookform/resolvers`                          | same                                 |
| `cmdk`                                                             | command palette that was never built |
| `class-variance-authority`                                         | `actionClass` is hand-rolled         |
| `@radix-ui/react-dialog` / `-dropdown-menu` / `-tooltip` / `-tabs` | four packages, none imported         |

That is eight packages of install time, bundle risk and Dependabot noise.

**The README's note on this is now partly wrong** — it also lists React Three
Fiber and Radix as unused. R3F, `three` and `@react-three/drei` _are_ used
(`components/three/`, `features/projects/schema/schema-scene.tsx`), and
`reading-time` became used this week by the writing pipeline. Only the table
above is genuinely dead.

### C2. A dead component and dead data

- `src/components/motion/rotating-words.tsx` — `RotatingWords` is exported and
  imported by nothing.
- `heroRotatingPrefix` and `heroRotatingWords` in `content.ts` — zero
  consumers. They were already unused before the hero rewrite; now they also
  describe a hero that no longer exists.

### C3. Cloudinary is allowlisted in four places and used in none

- `middleware.ts` → `script-src … https://*.cloudinary.com`
- `middleware.ts` → `img-src 'self' res.cloudinary.com data:`
- `next.config.ts` → static CSP `img-src … res.cloudinary.com`
- `next.config.ts` → `images.remotePatterns` for `res.cloudinary.com`

A CSP allowlist entry for a host you do not use is pure attack surface. The
`script-src` entry is the one that actually matters: it permits arbitrary
script execution from any `*.cloudinary.com` subdomain.

### C4. `.env.example` advertises features that do not exist

`RESEND_API_KEY` and three `CLOUDINARY_*` vars, for a contact form and a media
pipeline that were never built. Anyone cloning the repo is told to go get
credentials they will never use.

### C5. The analytics abstraction has no call sites

`AnalyticsContract`, `AnalyticsProvider`, `VercelAnalyticsService`,
`useAnalytics` and `app/providers.tsx` form a complete dependency-inversion
stack — and **nothing anywhere calls `trackEvent`**. The analytics that
actually run are `<Analytics />` and `<SpeedInsights />` in `layout.tsx`,
which bypass the abstraction entirely.

`docs/adr/0004` presents this as a load-bearing decision. A technical reader
who follows the ADR into the code finds an interface with one implementation
and no consumer. Either track one real event (case study opened, live-app link
clicked — genuinely useful data) or say in the ADR that it is a demonstration.

---

## D. Broken internal references

Four documents are cited by path and do not exist:

| Cited from                                                      | Missing file                                               |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| `core/contracts/repositories/project-repository.contract.ts:11` | `docs/adr/0002-mdx-typed-collections.md`                   |
| `eslint.config.mjs:10`                                          | `docs/adr/0003-package-ready-layering-without-monorepo.md` |
| `docs/coding-standards.md:16`                                   | `docs/architecture/system-design.md`                       |
| `docs/architecture/accessibility-strategy.md:31`                | `docs/architecture/design-system.md`                       |

`TODO.md` already flags two of these. The plan's own argument about canonical
links applies exactly: individually trivial, collectively the thing that makes
a reader wonder what else was not checked — and this is the repo a senior
engineer will actually open.

---

## E. Content accuracy

### E1. The academic status may be a year out of date

`education.bachelor.detail` says _"8th semester, 2022 batch"_, and semester
VIII lists _"Internship"_ as current. It is August 2026; a 2022-batch four-year
BSc CSIT should be finished or within weeks of it. This string renders on both
`/about` and `/background` via `currentStatusSummary`. **Verify — if the degree
is complete, saying so is strictly stronger than "8th semester".**

### E2. Three projects are still tagged `case-study`

`vat-billing-system`, `travora` **and** `nsa-travels` all carry
`phase: case-study`, so `/projects` shows three identical "case-study" pills.
The homepage now says one flagship plus supporting work; the projects index
still says three peers. Consider demoting `nsa-travels` (it is context for the
flagship, not a separate engineering artifact) or adding a distinct phase.

### E3. A Twitter handle is advertised with no Twitter presence

`siteConfig.author.twitter` is `@alokbndry10` and feeds `twitter.creator` on
every page. There is no X/Twitter entry in `socials` or on the contact page.
Either the account is real — in which case it belongs in the canonical link
set from item 3 — or the site is publishing a handle nobody maintains.

### E4. Workshop dates are stated twice

`background.tsx` hardcodes _"UI/UX (2023) · WordPress (2024) · Quality
Assurance (2026)"_ while the `timeline` entry for 2023–2026 describes the same
workshops. Two copies of one fact, which is the defect the VAT case study's
own reflection section warns about.

### E5. Focus pills sit under the wrong heading

`ProjectsSection` renders `currentFocus.slice(0, 3)` as pills inside the
"Academic practicals" card. The focus list is about current engineering
priorities and has nothing to do with coursework. Pre-existing, but the
rewritten focus entries are full sentences now and read badly as pills.

---

## F. Testing — the gap the plan already named

- E2E is three smoke tests (`tests/e2e/foundation.spec.ts`): one h1 on `/`, the
  skip link, and the 404. Nothing opens `/now`, `/writing`, `/projects/[slug]`
  or the nav.
- The README states plainly that Playwright and Lighthouse **have never been
  run against the current build**. That is honest, and it is also the thing
  the plan's gap table calls "CI running on every push".
- The one-h1-per-page rule is asserted for the homepage only.

Cheap win: parameterise the existing h1 test over `siteConfig.nav` so every
route is smoke-tested for free, and it can never miss a route added later.

---

## Suggested order

1. **A1–A4** — four copy fixes; the OG card is the highest-leverage single
   change on this list.
2. **B1 + B2** — sitemap and robots, one small file each.
3. **C3** — drop the Cloudinary CSP entries; smallest real security win here.
4. **D** — write the four missing docs or remove the four references.
5. **C1, C2, C4, C5** — dead code and dependency cleanup.
6. **B4** — the résumé. Blocked on you, not on code.
7. **E1–E5** — content accuracy; E1 needs your answer.
8. **F** — parameterised route smoke tests.
