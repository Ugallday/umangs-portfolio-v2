# Coding Standards

## Strict TypeScript
- No `any`, ever — enforced by `@typescript-eslint/no-explicit-any` as a
  hard error, not a warning.
- `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are on in
  `tsconfig.json` — array/object access is typed as possibly-`undefined`
  unless narrowed, which catches a real class of bugs at compile time.
- Prefer `type`-only imports (`import type { X }`) for types — enforced by
  `@typescript-eslint/consistent-type-imports`, keeps runtime bundles free
  of type-only code.

## Architectural boundaries
The dependency direction documented in `docs/architecture/system-design.md`
is enforced by `eslint-plugin-boundaries` in `eslint.config.mjs`:

- `core/domain` and `core/utils` may import nothing from elsewhere in the app.
- `core/application` may only import `core/domain` and `core/contracts`.
- `core/infrastructure` may only import `core/domain`, `core/contracts`, `core/utils`.
- `core/**` may never import `react` or `next` — enforced separately by a
  `no-restricted-imports` rule scoped to that directory.
- `features/*` expose everything through a single `index.ts` barrel;
  importing a feature's internal `components/` or `api.ts` from outside
  that feature is a review-blocking violation even where the linter can't
  catch every case (cross-feature imports specifically).

A PR that violates these fails CI at the `npm run lint` step — this is not
a style preference reviewers negotiate on.

## Naming
- Files: `kebab-case.ts` / `kebab-case.tsx`.
- Components: `PascalCase` export matching the file's primary export.
- Hooks: `useX`, colocated with the feature or primitive that owns them.
- Contracts: `*.contract.ts`, always an `interface`, never a `type` alias
  (interfaces support declaration merging if a contract needs extending,
  and read more clearly as "this is a seam" in file listings).

## No dead code, no TODOs
`eslint` has no `no-unused-vars` escape hatch beyond the `^_` prefix
convention for intentionally-unused parameters. A `// TODO` comment is a
review-blocking finding, not a note-to-self — if it's not ready, it doesn't
merge to `main`.

## Comments
JSDoc is required on every exported member of `core/contracts/`,
`core/application/`, and every feature's `index.ts` — these are the actual
public APIs of the system. Presentational components in `components/ui/`
are not required to carry JSDoc beyond prop types, since restating a prop's
type in prose adds noise, not signal.
