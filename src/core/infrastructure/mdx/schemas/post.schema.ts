import { z } from "zod";

const postSectionSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
});

export const postFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1).max(280),
  /**
   * Parsed as a string, not `z.date()`. gray-matter hands YAML dates back as
   * JS Date objects in the server's own zone, which is how a post written on
   * the 1st renders as the 31st for a reader further west. Quote the value in
   * frontmatter and the date stays the date that was typed.
   */
  publishedOn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedOn must be an ISO date, quoted: "2026-08-10"'),
  topics: z.array(z.string().min(1)).min(1),
  sections: z.array(postSectionSchema).min(1),
  status: z.enum(["draft", "published"]),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
