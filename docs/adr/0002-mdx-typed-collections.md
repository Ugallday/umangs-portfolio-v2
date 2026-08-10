# ADR-0002: Typed MDX Collections as the Content Source

**Status:** Accepted

## Context

Every substantial page on this site — case studies, and now written posts —
is structured content: a title, a summary, a set of sections, some figures.
Three options were available.

1. **Hardcode each page as a React component.** Adding a case study means
   writing JSX. Content and layout drift apart, and no two pages end up with
   the same shape.
2. **A headless CMS or database.** Correct for a team; disproportionate for a
   single author, and it makes the content unavailable offline and unreviewable
   in a pull request.
3. **Files on disk, validated on read.**

## Decision

Content lives as MDX files under `content/`, one directory per collection
(`content/projects/`, `content/writing/`). Frontmatter is the content — a Zod
schema per collection (`core/infrastructure/mdx/schemas/`) parses it into a
domain entity, and the parse is not optional. A file that violates its schema
throws at read time, which during `next build` means the build fails.

Prose lives in typed frontmatter fields rather than in a rendered MDX body.
That is the part most likely to surprise a reader expecting a conventional
blog: `content/writing/*.mdx` carries `sections[].paragraphs[]`, and the MDX
body below the frontmatter is a note to the author, not page content.

## Consequences

- **A malformed file cannot reach production as a broken page.** It fails
  the build instead. `MdxProjectRepository.findAllPublished` parses before it
  filters, so a draft with bad frontmatter still fails CI rather than lying in
  wait until the day it is published.
- **The content model is one schema, not a convention.** Adding an optional
  field with a Zod `.default()` keeps every existing file valid — that is how
  `metrics` was added to projects without touching seven other MDX files.
- **No MDX runtime in the bundle.** Nothing renders arbitrary MDX, so there is
  no `next-mdx-remote` or `@next/mdx` dependency and no evaluation of file
  content at request time. The cost is that a post cannot embed a component.
  When one genuinely needs to, that is the moment to add the runtime — adding
  it in advance would be paying for a capability nothing uses.
- **Content is reviewable as a diff** and versioned with the code that renders
  it.
- **Migrating off files touches one class.** The repositories in
  `core/infrastructure/repositories/` are the only code that knows content
  lives on disk; everything above them depends on
  `core/contracts/repositories/*.contract.ts`. See ADR-0006 for how the
  concrete implementation is bound.
