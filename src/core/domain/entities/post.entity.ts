/**
 * A written post.
 *
 * Deliberately shaped like ProjectEntity rather than like a generic blog:
 * prose lives in typed frontmatter sections, not in a rendered MDX body. That
 * keeps the whole content model validated by one Zod schema at read time and
 * avoids pulling an MDX runtime into the bundle for what is, so far, plain
 * paragraphs. If a post ever genuinely needs embedded components, that is the
 * moment to add the runtime — not before.
 */
export interface PostSection {
  readonly id: string;
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface PostEntity {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  /** ISO `YYYY-MM-DD`. The list sorts on this, newest first. */
  readonly publishedOn: string;
  readonly topics: readonly string[];
  readonly sections: readonly PostSection[];
  readonly status: "draft" | "published";
  /** Derived from the prose at read time, never written into frontmatter. */
  readonly readingMinutes: number;
}
