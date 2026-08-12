"use client";

import { useEffect, useState } from "react";

import { cn } from "@/core/utils/cn";
import { sectionLabel } from "@/features/projects/section-label";

/**
 * A case study's table of contents, pinned beside the body.
 *
 * The VAT Billing study runs to thirteen sections. Without this, the only way
 * to reach "what I learned" is to scroll past everything before it, and there
 * is no way to tell how much is left — a long-form page with no index reads as
 * an undifferentiated wall.
 *
 * The numbering is real rather than decorative: a case study is written to be
 * read in order, from the overview through to what comes next.
 */
export function ProjectContents({
  sections,
}: {
  readonly sections: readonly { readonly id: string }[];
}): React.JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    // The band is the upper third of the viewport. Marking whatever is closest
    // to the top as active matches where a reader's eye actually is, and stops
    // the highlight jumping to a tall section that merely overlaps the bottom.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const first = visible[0];
        if (first) setActiveId(first.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study contents" className="hidden xl:block">
      <div className="sticky top-24">
        <p className="text-text-muted text-xs font-medium tracking-[0.1em] uppercase">Contents</p>
        <ol className="mt-5 grid gap-0.5">
          {sections.map((section, index) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-baseline gap-3 rounded-lg py-1.5 pr-2 pl-3 text-sm transition",
                    isActive
                      ? "text-text-primary bg-surface-overlay"
                      : "text-text-muted hover:text-text-secondary",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-serif text-[10px] tabular-nums transition",
                      isActive ? "text-accent-default" : "text-text-muted/70",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-6">{sectionLabel(section.id)}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
