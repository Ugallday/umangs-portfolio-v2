# Accessibility Strategy

Target: WCAG 2.1 AA, verified continuously — not audited once before launch.

## Enforced in code, not just documented

- **Color contrast:** `tests/unit/design-tokens.contrast.test.ts` asserts
  every text/surface token pairing meets 4.5:1 as a CI-gated unit test
  against `core/utils/color-contrast.ts`. A token change that breaks
  contrast fails the build.
- **Reduced motion:** `components/motion/use-reduced-motion.ts` is read by
  every motion primitive; individual feature authors cannot forget to
  handle it because primitives handle it once, centrally.
- **Focus management on route/error transitions:** `app/error.tsx` moves
  focus to the error heading programmatically (see the `useRef` +
  `tabIndex={-1}` pattern). The same pattern is required for the Motion-based
  page transitions built in Phase 4 — focus must move to the new page's
  `h1` after every route change, tracked as a requirement here so it's not
  optional at implementation time.
- **Skip link:** present in the root layout, first focusable element on
  every page, verified by `tests/e2e/foundation.spec.ts`.
- **Minimum tap target:** `--min-tap-target: 44px` token exists specifically
  so interactive components have a single value to reference rather than
  each picking their own padding.

## The 3D layers, as built

The scene landed as `components/three/fold-field.tsx` and
`features/projects/schema/`, not the `features/origami-scene/` this document
originally anticipated. Both are decorative and neither carries information:
the fold field is `aria-hidden`, `pointer-events-none`, desktop-only and
never server-rendered; the schema explorer sits alongside a case study that
reads completely without it. That is what satisfies the progressive-enhancement
requirement in `docs/architecture/design-system.md` §10 — an interactive layer
must have a static equivalent carrying the same information, which here is
"none", because they carry none.

If either ever becomes the only place some fact is stated, it needs a
keyboard-operable, screen-reader-safe equivalent before that ships.

## Planned, not built (flagged so it is not forgotten)

- **Gallery lightbox:** requires focus trap while open, `Escape` to close,
  arrow-key navigation between images, and returns focus to the trigger
  element on close.
- **Command palette (Cmd/Ctrl+K):** whatever this is built on must ship
  correct focus trapping and ARIA roles rather than being hand-rolled. This
  previously specified Radix `Dialog`; Radix and `cmdk` were both uninstalled
  in the August 2026 dependency cleanup because nothing imported them, so the
  primitive is an open choice again — but "not custom-built" still stands.

## Semantic landmarks

Every page template uses `<header>`, `<nav>`, `<main>`, `<footer>` — never
generic `<div>` wrappers for structural regions. Enforced in code review via
the PR template checklist, and by `eslint-plugin-jsx-a11y` (already wired
into `eslint.config.mjs`) for the rules it can statically catch (missing
alt text, invalid ARIA attributes, non-interactive elements with click
handlers).
