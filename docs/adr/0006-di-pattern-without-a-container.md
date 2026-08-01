# ADR-0006: Dependency Injection Pattern Without a DI Container

**Status:** Accepted

## Context
The architecture requires business logic (`core/application`, `core/domain`)
to depend on interfaces (`core/contracts`), not concrete implementations
(`core/infrastructure`), so data sources and vendor services can be swapped
without rewriting call sites. A full DI framework (InversifyJS, tsyringe)
would enforce this with a container and decorators.

## Decision
Use plain composition instead of a DI container: use cases are functions
that take their dependencies as arguments; feature `api.ts` files are the
single place a concrete implementation is instantiated and passed in;
React-facing services (analytics, error tracking) are bound once in the
`app/providers.tsx` composition root via Context.

## Consequences
- The dependency-inversion benefit (swappable implementations, testable
  use cases) is fully achieved.
- No container, no decorator metadata, no reflection — less machinery for
  a codebase of this size to carry, and no library the future me has to
  learn to read the code.
- If the number of services/repositories grows large enough that manual
  wiring in `providers.tsx` and each feature's `api.ts` becomes unwieldy,
  a container is a straightforward addition later — the contracts already
  exist, so adopting one would touch only the wiring, not the business
  logic. That threshold has not been reached with ~5 contracts today.
