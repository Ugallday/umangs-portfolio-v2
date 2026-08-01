/**
 * Public API of the projects feature. app/ imports from here only —
 * never reaches into features/projects/components/* or api.ts directly.
 * Enforced by the "features" boundary rule in eslint.config.mjs, which
 * still permits app -> features but nothing deeper without going through
 * this barrel by convention (see docs/coding-standards.md).
 */
export { getProject, getProjects } from "@/features/projects/api";
export type { ProjectEntity } from "@/core/domain/entities/project.entity";
