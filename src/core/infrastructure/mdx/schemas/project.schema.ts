import { z } from "zod";

export const projectFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1).max(280),
  problem: z.string().min(1),
  solution: z.string().min(1),
  architectureNotes: z.string().min(1),
  techStack: z.array(z.string()).min(1),
  challenges: z.array(z.string()).default([]),
  lessonsLearned: z.array(z.string()).default([]),
  futureWork: z.array(z.string()).default([]),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  coverImage: z.string().min(1),
  gallery: z.array(z.string()).default([]),
  videoUrl: z.string().url().optional(),
  order: z.number().int().nonnegative(),
  status: z.enum(["draft", "published"]),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
