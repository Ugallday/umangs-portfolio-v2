import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { Pill } from "@/components/ui/pill";
import type { PostEntity } from "@/core/domain/entities/post.entity";
import { formatPostDate } from "@/features/writing/format-post-date";
import {
  writingEmptyState,
  writingLead,
  writingTopics,
  writingTopicsIntro,
} from "@/features/writing/content";

/**
 * The writing index.
 *
 * Layout deliberately matches SectionShell in features/portfolio — a narrow
 * title rail beside the content — but is written out here rather than
 * imported, because the boundaries rule forbids one feature reaching into
 * another. Duplicating twelve lines of layout is the cost of that rule; the
 * alternative is promoting SectionShell into components/, which would be the
 * right move the moment a third feature needs it.
 */
export function WritingIndex({
  posts,
}: {
  readonly posts: readonly PostEntity[];
}): React.JSX.Element {
  return (
    <section id="writing">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.1em] uppercase">Writing</p>
          <h1 className="text-text-primary max-w-xs text-3xl font-semibold tracking-tight sm:text-4xl">
            Where the claims get shown their working.
          </h1>
        </div>

        <div className="space-y-8">
          <p className="text-text-secondary max-w-2xl text-base leading-8 sm:text-lg">
            {writingLead}
          </p>

          {posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post, index) => (
                <FoldReveal key={post.slug} delayMs={index * 40}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="fold-panel fold-hover group flex h-full flex-col rounded-3xl p-5 sm:p-6"
                  >
                    <div className="text-text-muted flex flex-wrap items-center gap-3 text-xs tracking-[0.08em] uppercase">
                      <time dateTime={post.publishedOn}>{formatPostDate(post.publishedOn)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingMinutes} min read</span>
                    </div>
                    <h2 className="text-text-primary mt-3 text-xl font-semibold tracking-tight text-balance">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary mt-3 text-sm leading-7">{post.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.topics.map((topic) => (
                        <Pill key={topic}>{topic}</Pill>
                      ))}
                    </div>
                    <span
                      className="text-accent-default mt-5 text-sm transition group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      Read →
                    </span>
                  </Link>
                </FoldReveal>
              ))}
            </div>
          ) : (
            <FoldReveal>
              <div className="fold-panel rounded-3xl p-5 sm:p-6">
                <h2 className="text-text-primary text-xl font-semibold tracking-tight">
                  {writingEmptyState.heading}
                </h2>
                <p className="text-text-secondary mt-3 max-w-2xl leading-7">
                  {writingEmptyState.body}
                </p>
                <div className="border-border-subtle bg-surface-overlay mt-6 rounded-2xl border p-4 sm:p-5">
                  <p className="text-text-muted text-xs tracking-[0.08em] uppercase">
                    {writingEmptyState.nextUpLabel}
                  </p>
                  <p className="text-text-primary mt-2 text-base leading-7 font-medium text-balance">
                    {writingEmptyState.nextUpTitle}
                  </p>
                  <p className="text-text-secondary mt-2 text-sm leading-6">
                    {writingEmptyState.nextUpBody}
                  </p>
                </div>
              </div>
            </FoldReveal>
          )}

          <FoldReveal delayMs={60}>
            <div className="border-border-subtle border-t pt-6">
              <p className="text-text-muted text-xs tracking-[0.08em] uppercase">
                {writingTopicsIntro}
              </p>
              <ul className="text-text-secondary mt-4 grid gap-2 text-sm leading-7">
                {writingTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3">
                    <span
                      className="bg-accent-default mt-2 h-1.5 w-1.5 rounded-full"
                      aria-hidden="true"
                    />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FoldReveal>
        </div>
      </div>
    </section>
  );
}
