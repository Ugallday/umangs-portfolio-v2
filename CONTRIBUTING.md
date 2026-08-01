# Contributing

This is a personal portfolio project, but it's built and reviewed like a
team codebase — the process exists so the repository itself demonstrates
engineering discipline.

## Workflow

1. Branch from `main`: `feat/short-description` or `fix/short-description`.
2. Make changes. Run `npm run validate` before committing — it's the exact
   check CI runs, so failures are caught locally, not in a PR comment.
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
   (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`) — enforced by
   commitlint on commit.
4. Open a PR using the template. Fill in the architecture checklist
   honestly — it exists to catch boundary violations before a reviewer has
   to.
5. CI must be green (typecheck, lint, format, unit test coverage, build,
   E2E) before merge.

## Adding content (projects, case studies, research, journal entries)

Add a new `.mdx` file under the relevant `content/*/` directory with
frontmatter matching that collection's Zod schema in
`core/infrastructure/mdx/schemas/`. No code changes are needed — the page
is generated automatically. If the build fails, the schema error message
will point at the exact missing or malformed field.

## Adding a new data source (e.g. moving a collection to Supabase)

1. Write a new class in `core/infrastructure/repositories/` implementing
   the relevant `*RepositoryContract`.
2. Swap the instantiation in the corresponding `features/*/api.ts`.
3. Nothing else changes — if it does, that's a sign the contract was
   under-specified and should be revisited.

## Adding a new architectural decision

Add a numbered file to `docs/adr/` following the existing format (Status,
Context, Decision, Consequences). Decisions that reverse an earlier ADR
should say so explicitly (see `docs/adr/0005-vercel-analytics-over-posthog.md`
for an example) rather than silently deleting the old one.
