# Security

## Content Security Policy

Nonce-based, generated per-request in `src/middleware.ts`. `script-src` allows
only `'self'` plus the per-request nonce with `'strict-dynamic'` — no
`unsafe-inline` for scripts. `style-src` permits `unsafe-inline` as a
deliberate, scoped exception: Tailwind's compiled output and the theme
flash-prevention script's associated styles rely on it, and style-injection
XSS risk is materially lower than script-injection risk. `next.config.ts`
carries a static fallback CSP for response types middleware doesn't touch.

## Security Headers

Set globally in `next.config.ts`: `X-Content-Type-Options: nosniff`,
`X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy` denying camera/microphone/geolocation (none are used).

## Rate Limiting

`/api/contact` is the only mutating public endpoint. Rate-limited at the
Edge via a sliding-window check keyed on IP (implementation added alongside
the contact feature in Phase 4, using Vercel Edge Middleware — documented
here as a requirement so the feature can't ship without it).

## CSRF

Server Actions are used for the contact form rather than a public JSON API.
Next.js Server Actions include built-in origin verification (the request's
`Origin` header must match the deployment's host), which is sufficient
protection for a same-origin form submission — a separate CSRF token is not
needed unless a public API route is added later that accepts state-changing
requests from third-party origins.

## XSS Prevention

- No `dangerouslySetInnerHTML` in the codebase except the theme
  flash-prevention script in `app/layout.tsx`, which is a fixed, three-line,
  nonce-scoped string with zero user input — not a rendering path for any
  dynamic content.
- MDX content is authored by the site owner only (not user-submitted), and
  is compiled at build time, not rendered from a runtime string.
- All user input (contact form) is validated with Zod at the Server Action
  boundary before any further processing.

## Input Validation

Every Server Action and API route validates its input against a Zod schema
before doing anything else with it. This is the same pattern used for MDX
frontmatter (`core/infrastructure/mdx/schemas/`) applied to user input —
one validation discipline across the whole application, not two.
