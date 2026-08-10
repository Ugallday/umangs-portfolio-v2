import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { PostRepositoryContract } from "@/core/contracts/repositories/post-repository.contract";
import type { PostEntity } from "@/core/domain/entities/post.entity";
import { postFrontmatterSchema } from "@/core/infrastructure/mdx/schemas/post.schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

function toEntity(frontmatter: ReturnType<typeof postFrontmatterSchema.parse>): PostEntity {
  const prose = frontmatter.sections
    .flatMap((section) => [section.heading, ...section.paragraphs])
    .join("\n\n");

  return {
    ...frontmatter,
    // Rounded up, and never zero: "0 min read" on a post that plainly has
    // words in it reads as a bug rather than as a short post.
    readingMinutes: Math.max(1, Math.ceil(readingTime(prose).minutes)),
  };
}

/**
 * MdxPostRepository
 *
 * Implements PostRepositoryContract by reading and validating
 * content/writing/*.mdx. Drafts are parsed like anything else and then
 * filtered out, so a malformed draft still fails loudly at build time instead
 * of lying in wait until the day it is published.
 */
export class MdxPostRepository implements PostRepositoryContract {
  async findBySlug(slug: string): Promise<PostEntity | null> {
    try {
      const raw = await readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
      const { data } = matter(raw);
      const post = toEntity(postFrontmatterSchema.parse(data));
      // A draft has no URL. Returning it here would publish it to anyone who
      // guessed the slug, which is the one thing "draft" is supposed to mean.
      return post.status === "published" ? post : null;
    } catch {
      return null;
    }
  }

  async findAllPublished(): Promise<readonly PostEntity[]> {
    let files: readonly string[];
    try {
      files = await readdir(CONTENT_DIR);
    } catch {
      // No content/writing directory yet is a legitimate state, not a failure.
      return [];
    }

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const raw = await readFile(path.join(CONTENT_DIR, file), "utf-8");
          const { data } = matter(raw);
          return toEntity(postFrontmatterSchema.parse(data));
        }),
    );

    return posts
      .filter((post) => post.status === "published")
      .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
  }
}
