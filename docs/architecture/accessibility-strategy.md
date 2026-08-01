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

## Planned for Phase 4+ (flagged now so it's not forgotten)
- **Origami 3D scene (`features/origami-scene/`):** must have a fully
  keyboard-operable and screen-reader-safe fallback (the static SVG/image
  fallback already required by the progressive-enhancement strategy in
  `docs/architecture/design-system.md` §10 serves this purpose — it is not
  purely a performance fallback).
- **Gallery lightbox:** requires focus trap while open, `Escape` to close,
  arrow-key navigation between images, and returns focus to the trigger
  element on close.
- **Command palette (Cmd/Ctrl+K):** built on Radix `Dialog` primitives
  specifically because Radix ships correct focus trapping and ARIA roles
  out of the box — not custom-built.

## Semantic landmarks
Every page template uses `<header>`, `<nav>`, `<main>`, `<footer>` — never
generic `<div>` wrappers for structural regions. Enforced in code review via
the PR template checklist, and by `eslint-plugin-jsx-a11y` (already wired
into `eslint.config.mjs`) for the rules it can statically catch (missing
alt text, invalid ARIA attributes, non-interactive elements with click
handlers).
