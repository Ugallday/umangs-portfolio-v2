import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { actionClass } from "@/components/ui/action";
import { Pill } from "@/components/ui/pill";
import type { PostEntity } from "@/core/domain/entities/post.entity";
import { formatPostDate } from "@/features/writing/format-post-date";

export function PostDetail({ post }: { readonly post: PostEntity }): React.JSX.Element {
  return (
    <article className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
      <header className="relative">
        <FoldReveal>
          <div className="flex max-w-3xl flex-col gap-6">
            <div className="text-text-muted flex flex-wrap items-center gap-3 text-xs tracking-[0.08em] uppercase">
              <time dateTime={post.publishedOn}>{formatPostDate(post.publishedOn)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="text-text-primary text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-text-secondary text-lg leading-8">{post.summary}</p>
            <div className="flex flex-wrap gap-2">
              {post.topics.map((topic) => (
                <Pill key={topic}>{topic}</Pill>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/writing" className={actionClass({ variant: "secondary" })}>
                Back to writing
              </Link>
            </div>
          </div>
        </FoldReveal>
      </header>

      {/* A measure, not the full width. Long prose set across a 7xl container
          is unreadable however good the type is. */}
      <div className="mt-16 grid max-w-3xl gap-5">
        {post.sections.map((section, index) => (
          <FoldReveal key={section.id} delayMs={index * 50}>
            <section id={section.id} className="scroll-mt-24">
              <h2 className="text-text-primary text-2xl font-semibold tracking-tight text-balance">
                {section.heading}
              </h2>
              <div className="mt-4 grid gap-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-text-secondary text-base leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </FoldReveal>
        ))}
      </div>
    </article>
  );
}
