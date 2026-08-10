# Design system — The Origami Engineer

The visual language treats every surface as folded paper. Elevation comes from
stacked layers and creased edges, not from floating drop shadows; motion is a
fold, crease or unfold, never a generic fade or slide.

## 1. Two-tier tokens

`src/styles/tokens.css` is the source of truth and has two tiers:

- **Primitives** — `--paper-*`, `--ink-*`, `--accent-*`. Raw values. **Never
  referenced by a component.**
- **Semantic** — `--surface-*`, `--text-*`, `--border-*`, `--accent-default`,
  `--focus-ring-color`. What components consume.

The indirection is what makes the theme swap a token-file change rather than a
component rewrite. A hex code in a component is a bug.

## 2. Palette

Dark-first and warm-neutral: paper runs `#0a0a0b` to `#f2f2f0`, and the single
accent is a restrained amber (`--accent-500: #d9a25c`). One accent, used for
emphasis and focus only. There is no secondary brand colour, deliberately —
the amber means something because nothing else competes with it.

## 3. Surfaces and borders

Three surfaces (`base`, `raised`, `overlay`) and three border weights
(`subtle`, `default`, `strong`). A panel is a surface plus a border, not a
shadow. `.fold-panel` and `.fold-hover` in `globals.css` are the shared
treatments; a new card should use them rather than restating the recipe.

## 4. The paper material

`--paper-weight-*` and `--paper-texture-opacity` carry the origami-specific
part: edge weights that read as folded stock, and a grayscale fractal noise
inlined as a data URI rather than fetched, so the texture costs no request.

## 5. Type

Three families, all self-hosted by `next/font` at build time and fetched from
nothing at runtime: Bricolage Grotesque (display), IBM Plex Sans (body), IBM
Plex Mono (figures and eyebrows). Numerals in figures are `tabular-nums` so
columns of metrics align.

## 6. Eyebrows and rhythm

Section eyebrows are uppercase, `text-xs`, letter-spaced `0.24em`–`0.32em`.
Sections sit on a `border-t` with `py-20 sm:py-24`. `SectionShell` in
`features/portfolio/sections.tsx` owns this rhythm; standalone routes suppress
its padding because `SectionPage` supplies their own.

## 7. Contrast is a test, not a claim

`tests/unit/design-tokens.contrast.test.ts` asserts WCAG AA against the actual
token values in both themes, using `core/utils/color-contrast.ts`. Changing a
token to a failing value fails CI. This is the only accessibility property the
design system enforces automatically — the rest is in
`docs/architecture/accessibility-strategy.md`.

## 8. Heading levels are a prop, not a guess

Sections render both inside the homepage and as their own route, so every
section takes `headingLevel` and derives its card level from it (`cardLevel`).
Without it the markup jumped `h1 → h3` on standalone routes.

## 9. Motion

Fold, crease, unfold. `FoldReveal` staggers entrances by 40–60 ms; marquee
columns run at different speeds so the band never pulses in unison. Every
motion component reads `useReducedMotion`, which respects both the OS setting
and the in-site toggle.

Reduced motion means **stillness, not absence**. A marquee renders as a static
list; the 3D field renders and holds. Deleting the element entirely removes a
visible part of the design for anyone whose OS asks for less motion — which on
Windows is simply "animations off".

## 10. Progressive enhancement

Everything meaningful is server-rendered HTML. Enhancement layers on top and
each one degrades to something intact:

- **The 3D fold field** (`components/three/fold-field.tsx`) is a `next/dynamic`
  import with `ssr: false`, so it cannot delay the hero's paint. It renders
  only at `md` and above, is `pointer-events-none`, and is `aria-hidden`. It
  returns `null` until it has read the theme's colours from CSS — so the page
  is complete without it, and it is decorative when present. It is never the
  carrier of information.
- **The schema explorer** (`features/projects/schema/`) is the same: the case
  study reads completely without it.
- **The stack marquee** is `aria-hidden` in its entirety, because every
  technology in it is also listed statically on `/skills`; announcing three
  scrolling columns in a random order would be worse than announcing nothing.
- **Motion toggles and theme** are set before hydration by a small inline
  script in `app/layout.tsx`, the one deliberate inline-script exception,
  scoped and covered by the CSP nonce strategy.

Any future interactive layer inherits this rule: it must have a static
equivalent that carries the same information, and that fallback is an
accessibility requirement, not only a performance one.
