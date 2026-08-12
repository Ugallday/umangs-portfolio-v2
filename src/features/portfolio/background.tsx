import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { ScrollProgressTrack } from "@/components/motion/scroll-progress-track";
import { actionClass } from "@/components/ui/action";
import { FoldToggle } from "@/components/ui/fold-toggle";
import { InstitutionLogo } from "@/components/ui/institution-logo";
import { Pill } from "@/components/ui/pill";
import { TechBadge } from "@/components/ui/tech-badge";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import {
  academicPerformanceSummary,
  backgroundLead,
  backgroundSpineLead,
  currentStatusSummary,
  curriculum,
  timeline,
  trainings,
} from "@/features/portfolio/content";
import { institutionLogos } from "@/features/portfolio/institution-logos";

/**
 * Experience and education, merged.
 *
 * They were two routes telling one story badly. /education listed eight
 * semesters and noted, in passing, which courses fed real work; /experience
 * described that work without saying where any of it was learned. A reader had
 * to hold both pages in their head to see the only interesting thing about
 * either — that the degree and the company ran at the same time and kept
 * handing things to each other.
 *
 * So the middle of this page is a spine with a lane on each side: the semester
 * on the left, what it turned into on the right, joined at a node. That
 * relationship is not invented for the layout — it is the `link` already
 * carried on each course in the curriculum data.
 */
export function BackgroundSection({
  project,
}: {
  readonly project: ProjectEntity;
}): React.JSX.Element {
  return (
    <div className="space-y-20 sm:space-y-24">
      <header className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.1em] uppercase">
            Background
          </p>
          <h1 className="text-text-primary text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Where I learned it and where I used it, on one timeline.
          </h1>
        </div>
        <div className="space-y-8">
          <p className="text-text-secondary max-w-2xl text-base leading-8 sm:text-lg">
            {backgroundLead}
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="fold-panel fold-hover rounded-3xl p-5 sm:p-6">
              <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Before</p>
              <h2 className="text-text-primary mt-3 text-lg font-semibold tracking-tight">
                The manual state
              </h2>
              <p className="text-text-secondary mt-3 leading-7">
                Bookkeeping lived in Excel sheets and paper ledgers. Customer records were
                scattered, ticket tracking was manual, and there was no cloud backup — one fragile
                path for every record the business had.
              </p>
            </article>
            <article className="fold-panel fold-hover rounded-3xl p-5 sm:p-6">
              <p className="text-text-muted text-xs tracking-[0.08em] uppercase">After</p>
              <h2 className="text-text-primary mt-3 text-lg font-semibold tracking-tight">
                What changed
              </h2>
              <p className="text-text-secondary mt-3 leading-7">
                A custom accounting system, cloud storage and backup, customer and B2B records, a
                public company site, and a workflow that lets a small team handle more without
                proportionally more effort.
              </p>
            </article>
          </div>
        </div>
      </header>

      <CurriculumSpine />

      <section className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.1em] uppercase">
            The record
          </p>
          <h2 className="text-text-primary text-3xl font-semibold tracking-tight text-balance">
            Everything, in the order it happened.
          </h2>
        </div>
        <div>
          <ScrollProgressTrack>
            <div className="grid gap-4">
              {timeline.map((item, index) => (
                <details
                  key={item.title}
                  className="group fold-panel fold-hover rounded-3xl p-5 sm:p-6"
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent-default mt-1 h-3 w-3 rounded-full" aria-hidden />
                      <div className="flex-1">
                        <p className="text-text-muted text-xs tracking-[0.08em] uppercase">
                          {item.year}
                        </p>
                        <h3 className="text-text-primary mt-2 text-lg font-semibold tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      {item.logo ? (
                        <InstitutionLogo
                          src={institutionLogos[item.logo].src}
                          alt={institutionLogos[item.logo].alt}
                        />
                      ) : null}
                      <FoldToggle />
                    </div>
                  </summary>
                  <div className="border-border-subtle mt-4 border-l pl-7">
                    <p className="text-text-secondary max-w-2xl leading-7">{item.body}</p>
                  </div>
                </details>
              ))}
            </div>
          </ScrollProgressTrack>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.1em] uppercase">Training</p>
          <h2 className="text-text-primary text-3xl font-semibold tracking-tight text-balance">
            Industry certifications, earned while the systems were being built.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {trainings.map((training) => (
            <article
              key={`${training.title}-${training.period}`}
              className="fold-panel fold-hover rounded-2xl p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-text-primary text-base font-semibold">{training.title}</h3>
                  <p className="text-text-muted mt-1 text-sm">{training.provider}</p>
                </div>
                <p className="text-text-muted text-xs tracking-[0.08em] uppercase">
                  {training.period}
                </p>
              </div>
              <p className="text-text-secondary mt-3 text-sm leading-6">{training.whyItMatters}</p>
              {/* The whole page argues that each thing fed something else, so a
                  training card that stops at "why it matters" stops one line
                  short of the point. `connectsTo` is what the certificate was
                  actually for. */}
              <p className="text-text-muted mt-2 text-sm leading-6">
                Connects to: {training.connectsTo}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="fold-panel rounded-3xl p-5 sm:p-6">
          <p className="text-text-muted text-xs tracking-[0.08em] uppercase">
            What it all fed into
          </p>
          <h2 className="text-text-primary mt-3 text-xl font-semibold tracking-tight">
            {project.title}
          </h2>
          <p className="text-text-secondary mt-3 leading-7">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 6).map((item) => (
              <TechBadge key={item} label={item} />
            ))}
          </div>
          <div className="mt-6">
            <Link href={`/projects/${project.slug}`} className={actionClass()}>
              Read the case study
            </Link>
          </div>
        </div>
        <div className="border-border-subtle bg-surface-overlay grid gap-5 rounded-3xl border p-5 sm:p-6">
          <div>
            <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Current status</p>
            <p className="text-text-secondary mt-2 text-sm leading-7">{currentStatusSummary}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs tracking-[0.08em] uppercase">
              Academic performance
            </p>
            <p className="text-text-secondary mt-2 text-sm leading-7">
              {academicPerformanceSummary}
            </p>
          </div>
          <div>
            <p className="text-text-muted text-xs tracking-[0.08em] uppercase">Workshops</p>
            <p className="text-text-secondary mt-2 text-sm leading-7">
              UI/UX (2023) · WordPress (2024) · Quality Assurance (2026)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * The spine. Semesters run down the left, what each one fed runs down the
 * right, and the node between them is only filled in where a course actually
 * links to something — an honest gap is better than a manufactured connection.
 */
function CurriculumSpine(): React.JSX.Element {
  return (
    <section>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.1em] uppercase">
            Course to consequence
          </p>
          <h2 className="text-text-primary text-3xl font-semibold tracking-tight text-balance">
            Eight semesters, and what each one turned into.
          </h2>
          <p className="text-text-muted text-sm leading-7">{backgroundSpineLead}</p>
        </div>

        <ol className="grid gap-3">
          {curriculum.map((node, index) => {
            const applied = node.courses.filter((course) => course.link);

            return (
              <FoldReveal key={node.semester} delayMs={index * 30}>
                <li className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.9fr)] lg:gap-x-6">
                  <div className="fold-panel rounded-2xl p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-text-muted font-serif text-xs tracking-[0.07em] uppercase">
                        {node.semester}
                      </p>
                      <span className="text-text-muted/60 font-serif text-xs tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-text-primary mt-2 text-base font-semibold tracking-tight">
                      {node.emphasis}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {node.courses.map((course) => (
                        <Pill key={course.name} className="font-normal">
                          {course.name}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  {/* The spine itself. On a narrow screen there are no two
                      columns for a rule to run between, so it disappears
                      rather than becoming a stray mark. */}
                  <div className="hidden lg:flex lg:w-6 lg:flex-col lg:items-center">
                    <span className="border-border-subtle w-px flex-1 border-l" aria-hidden />
                    <span
                      className={
                        applied.length > 0
                          ? "bg-accent-default my-2 h-2 w-2 shrink-0 rounded-full"
                          : "border-border-strong my-2 h-2 w-2 shrink-0 rounded-full border"
                      }
                      aria-hidden
                    />
                    <span className="border-border-subtle w-px flex-1 border-l" aria-hidden />
                  </div>

                  <div className="border-border-subtle bg-surface-overlay rounded-2xl border p-5">
                    <p className="text-text-secondary text-sm leading-7">{node.outcome}</p>
                    {applied.length > 0 ? (
                      <ul className="mt-4 grid gap-2">
                        {applied.map((course) => (
                          <li key={course.name} className="text-sm leading-6">
                            <span className="text-accent-default font-serif text-xs">
                              {course.name}
                            </span>
                            <span className="text-text-muted"> → {course.link}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              </FoldReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
