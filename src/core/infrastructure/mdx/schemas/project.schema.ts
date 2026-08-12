import { z } from "zod";

const projectLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const projectSectionSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  body: z.string().min(1),
  bullets: z.array(z.string()).default([]),
});

/**
 * Optional headline figures. Defaulted to an empty array so an existing project
 * file stays valid without one — a project either has numbers worth leading
 * with or it doesn't, and inventing them to fill the shape would be worse.
 */
const projectMetricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

const projectVisualSchema = z.object({
  eyebrow: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

export const projectFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1).max(280),
  phase: z.enum(["flagship", "case-study", "in-progress", "concept", "academic"]),
  period: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().min(1),
  techStack: z.array(z.string()).min(1),
  metrics: z.array(projectMetricSchema).default([]),
  links: z.array(projectLinkSchema).default([]),
  visual: projectVisualSchema,
  sections: z.array(projectSectionSchema).min(1),
  order: z.number().int().nonnegative(),
  status: z.enum(["draft", "published"]),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
