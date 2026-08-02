import Image from "next/image";
import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { ScrollProgressTrack } from "@/components/motion/scroll-progress-track";
import { siteConfig } from "@/config/site";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import {
  aboutOpeningParagraph,
  academicPerformanceSummary,
  aiAcceleratesSummary,
  aiWorkflowLead,
  aiWorkflowStory,
  contactLinks,
  coreStory,
  currentFocus,
  currentStatusSummary,
  curriculum,
  engineeringJudgmentSummary,
  footerClosingStatement,
  heroHeadline,
  heroSubheadline,
  hubEntries,
  philosophy,
  skillGroups,
  timeline,
  toolkitGroups,
  toolkitLead,
  trainings,
  workflowPractices,
} from "@/features/portfolio/content";
import portraitImage from "@/assets/portrait.png";
import { actionClass } from "@/components/ui/action";
import { Pill } from "@/components/ui/pill";

/**
 * Sections render both as part of a page and as the sole content of their own
 * route. `headingLevel` lets the standalone route own the page's single <h1>
 * without duplicating the markup.
 */
export type SectionHeadingLevel = "h1" | "h2";

function SectionShell({
  eyebrow,
  title,
  description,
  id,
  headingLevel = "h2",
  standalone = false,
  children,
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly id: string;
  readonly headingLevel?: SectionHeadingLevel;
  readonly standalone?: boolean;
  readonly children: React.ReactNode;
}): React.JSX.Element {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      // Standalone routes get their vertical rhythm from SectionPage's
      // container; adding padding here too stacked ~7rem above the heading.
      className={standalone ? "" : "border-border-subtle scroll-mt-24 border-t py-20 sm:py-24"}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.32em] uppercase">
            {eyebrow}
          </p>
          <Heading className="text-text-primary max-w-xs text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </Heading>
        </div>
        <div className="space-y-8">
          <p className="text-text-secondary max-w-2xl text-base leading-8 sm:text-lg">
            {description}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

/**
 * Cards sit one level below their section's title. On a standalone route the
 * title is the page <h1>, so cards are <h2>; inside the homepage the title is
 * an <h2>, so cards are <h3>. Without this the markup jumped h1 -> h3.
 */
export type CardHeadingLevel = "h2" | "h3";

function cardLevel(headingLevel: SectionHeadingLevel | undefined): CardHeadingLevel {
  return headingLevel === "h1" ? "h2" : "h3";
}

/** Every section accepts these so a route can promote it to a standalone page. */
export interface SectionProps {
  readonly headingLevel?: SectionHeadingLevel;
  readonly standalone?: boolean;
}

function FoldCard({
  title,
  body,
  note,
  meta,
  as: Heading = "h3",
}: {
  readonly title: string;
  readonly body: string;
  readonly note?: string;
  readonly meta?: string;
  readonly as?: CardHeadingLevel;
}): React.JSX.Element {
  return (
    <article className="fold-panel fold-hover rounded-3xl p-5 sm:p-6">
      {meta ? <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{meta}</p> : null}
      <Heading className="text-text-primary mt-3 text-lg font-semibold tracking-tight">
        {title}
      </Heading>
      <p className="text-text-secondary mt-3 leading-7">{body}</p>
      {note ? <p className="text-text-muted mt-4 text-sm leading-6">{note}</p> : null}
    </article>
  );
}

function ProjectCard({
  project,
  as: Heading = "h3",
}: {
  readonly project: ProjectEntity;
  readonly as?: CardHeadingLevel;
}): React.JSX.Element {
  return (
    <article className="fold-panel fold-hover flex h-full flex-col rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <Pill>{project.phase}</Pill>
        <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{project.period}</p>
      </div>
      <Heading className="text-text-primary mt-4 text-xl font-semibold tracking-tight">
        {project.title}
      </Heading>
      <p className="text-text-secondary mt-3 text-sm leading-7">{project.summary}</p>
      <div className="border-border-subtle bg-surface-overlay mt-5 rounded-2xl border p-4">
        <p className="text-text-muted text-xs tracking-[0.22em] uppercase">
          {project.visual.eyebrow}
        </p>
        <p className="text-text-primary mt-2 text-sm font-medium">{project.visual.label}</p>
        <p className="text-text-secondary mt-2 text-sm leading-6">{project.visual.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((item) => (
          <Pill key={item}>{item}</Pill>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/projects/${project.slug}`} className={actionClass()}>
          Read case study
        </Link>
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className={actionClass({ variant: "secondary" })}
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

function TimelineCard({
  item,
  index,
  as: Heading = "h3",
}: {
  readonly item: (typeof timeline)[number];
  readonly index: number;
  readonly as?: CardHeadingLevel;
}): React.JSX.Element {
  return (
    <details className="group fold-panel fold-hover rounded-3xl p-5 sm:p-6" open={index === 0}>
      <summary className="cursor-pointer list-none">
        <div className="flex items-start gap-4">
          <div className="bg-accent-default mt-1 h-3 w-3 rounded-full" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{item.year}</p>
            <Heading className="text-text-primary mt-2 text-lg font-semibold tracking-tight">
              {item.title}
            </Heading>
          </div>
          <span className="text-text-muted text-xs tracking-[0.24em] uppercase transition group-open:rotate-180">
            Fold
          </span>
        </div>
      </summary>
      <div className="border-border-subtle mt-4 border-l pl-7">
        <p className="text-text-secondary max-w-2xl leading-7">{item.body}</p>
      </div>
    </details>
  );
}

function TimelineList({ as }: { readonly as: CardHeadingLevel }): React.JSX.Element {
  return (
    <ScrollProgressTrack>
      <div className="grid gap-4">
        {/* Keyed by title, not year — two entries legitimately share "2022-present". */}
        {timeline.map((item, index) => (
          <TimelineCard key={item.title} item={item} index={index} as={as} />
        ))}
      </div>
    </ScrollProgressTrack>
  );
}

function SemesterCard({
  node,
  index,
  as: Heading = "h3",
}: {
  readonly node: (typeof curriculum)[number];
  readonly index: number;
  readonly as?: CardHeadingLevel;
}): React.JSX.Element {
  return (
    <details className="group fold-panel fold-hover rounded-3xl p-5 sm:p-6" open={index === 3}>
      <summary className="cursor-pointer list-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{node.semester}</p>
            <Heading className="text-text-primary mt-2 text-lg font-semibold tracking-tight">
              {node.emphasis}
            </Heading>
          </div>
          <span className="text-text-muted text-xs tracking-[0.24em] uppercase transition group-open:rotate-180">
            Fold
          </span>
        </div>
      </summary>
      <div className="border-border-subtle mt-5 space-y-5 border-t pt-5">
        <div className="flex flex-wrap gap-2">
          {node.courses.map((course) => (
            <Pill key={course.name} className="font-normal">
              {course.name}
            </Pill>
          ))}
        </div>
        <p className="text-text-secondary max-w-2xl text-sm leading-7">{node.outcome}</p>
        <div className="space-y-3">
          {node.courses
            .filter((course) => course.link)
            .map((course) => (
              <div key={course.name} className="text-text-muted text-sm leading-6">
                <span className="text-text-secondary font-medium">{course.name}</span>
                {course.link ? ` → ${course.link}` : null}
              </div>
            ))}
        </div>
      </div>
    </details>
  );
}

/**
 * Same shape as FoldCard, plus the tool pills. Kept separate rather than adding
 * a `children` escape hatch to FoldCard, which is deliberately a text-only card.
 */
function ToolkitCard({
  group,
  as: Heading = "h3",
}: {
  readonly group: (typeof toolkitGroups)[number];
  readonly as?: CardHeadingLevel;
}): React.JSX.Element {
  return (
    <article className="fold-panel fold-hover flex h-full flex-col rounded-3xl p-5 sm:p-6">
      <Heading className="text-text-primary text-lg font-semibold tracking-tight">
        {group.title}
      </Heading>
      <p className="text-text-secondary mt-3 leading-7">{group.note}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.tools.map((tool) => (
          <Pill key={tool}>{tool}</Pill>
        ))}
      </div>
    </article>
  );
}

export function HeroSection(): React.JSX.Element {
  return (
    <section className="border-border-subtle relative overflow-hidden border-b">
      {/* Inset so the drift never exposes an unpainted edge. */}
      <div
        aria-hidden="true"
        className="ambient-drift absolute -inset-[6%] -z-10 bg-[radial-gradient(circle_at_top_left,rgba(217,162,92,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%)]"
      />
      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl gap-12 px-6 py-8 lg:px-8 lg:py-10 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
        <div className="flex flex-col justify-between gap-10 pt-6 pb-8 xl:pt-12 xl:pb-14">
          {/* A meta row, not a banner — a second <header> here muddies the
              landmark structure alongside the real site header. */}
          <div className="text-text-muted flex items-center justify-between gap-4 text-xs tracking-[0.3em] uppercase">
            <span>{siteConfig.shortName}</span>
            <span>{siteConfig.location}</span>
          </div>
          <div className="max-w-4xl space-y-8">
            <FoldReveal>
              <p className="text-text-muted text-xs tracking-[0.3em] uppercase">
                Systems fixer • BSc CSIT • Travel operations
              </p>
            </FoldReveal>
            <FoldReveal delayMs={40}>
              <h1 className="text-text-primary max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.75rem] xl:leading-[0.95]">
                {heroHeadline}
              </h1>
            </FoldReveal>
            <FoldReveal delayMs={80}>
              <p className="text-text-secondary max-w-2xl text-lg leading-8 sm:text-xl">
                {heroSubheadline}
              </p>
            </FoldReveal>
            <FoldReveal delayMs={120}>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className={actionClass({ size: "md" })}>
                  Explore the work
                </Link>
                <Link href="/about" className={actionClass({ variant: "secondary", size: "md" })}>
                  Read the story
                </Link>
              </div>
            </FoldReveal>
          </div>
          <FoldReveal delayMs={160}>
            <div className="border-border-subtle text-text-secondary grid gap-3 border-t pt-6 text-sm sm:grid-cols-3">
              <div>
                <p className="text-text-muted">Now</p>
                <p className="mt-1">Preparing US MS CS applications</p>
              </div>
              <div>
                <p className="text-text-muted">Focus</p>
                <p className="mt-1">Applied AI, cloud, architecture</p>
              </div>
              <div>
                <p className="text-text-muted">Working on</p>
                <p className="mt-1">Transport records and hospitality concepts</p>
              </div>
            </div>
          </FoldReveal>
        </div>

        <FoldReveal delayMs={80} className="xl:pt-12 xl:pb-14">
          <aside className="fold-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(217,162,92,0.14),transparent_28%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-text-muted text-xs tracking-[0.3em] uppercase">
                  {siteConfig.name}
                </p>
                <span className="border-border-default text-text-muted rounded-full border px-3 py-1 text-xs">
                  {siteConfig.location}
                </span>
              </div>
              <div className="border-border-subtle relative aspect-[4/5] overflow-hidden rounded-3xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_50%_30%,rgba(217,162,92,0.18),transparent_30%),linear-gradient(180deg,#1b1c20,#0b0b0c)] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src={portraitImage}
                  alt="Aalok Bhandari portrait"
                  fill
                  priority
                  sizes="(min-width: 1280px) 34vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="text-text-secondary grid gap-3 text-sm sm:grid-cols-2">
                <div className="border-border-subtle bg-surface-overlay rounded-2xl border p-4">
                  <p className="text-text-muted text-xs tracking-[0.24em] uppercase">GitHub</p>
                  <a
                    href={siteConfig.socials.github}
                    className="text-text-primary decoration-border-strong mt-2 block break-all underline decoration-1 underline-offset-4"
                  >
                    {siteConfig.socials.github}
                  </a>
                </div>
                <div className="border-border-subtle bg-surface-overlay rounded-2xl border p-4">
                  <p className="text-text-muted text-xs tracking-[0.24em] uppercase">LinkedIn</p>
                  <a
                    href={siteConfig.socials.linkedin}
                    className="text-text-primary decoration-border-strong mt-2 block break-all underline decoration-1 underline-offset-4"
                  >
                    {siteConfig.socials.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </FoldReveal>
      </div>
    </section>
  );
}

/** The homepage's only body content: one card per route. */
export function HubSection(): React.JSX.Element {
  return (
    <section className="border-border-subtle border-t py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.32em] uppercase">
            Where to go
          </p>
          <h2 className="text-text-primary max-w-xs text-3xl font-semibold tracking-tight sm:text-4xl">
            The whole story, one page at a time.
          </h2>
        </div>
        <nav aria-label="Portfolio sections" className="grid gap-4 sm:grid-cols-2">
          {hubEntries.map((entry, index) => (
            <FoldReveal key={entry.href} delayMs={index * 40}>
              <Link
                href={entry.href}
                className="fold-panel fold-hover group flex h-full flex-col rounded-3xl p-5 sm:p-6"
              >
                <span className="text-text-primary text-lg font-semibold tracking-tight">
                  {entry.label}
                </span>
                <span className="text-text-secondary mt-3 text-sm leading-7">{entry.blurb}</span>
                <span
                  className="text-accent-default mt-5 text-sm transition group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  Open →
                </span>
              </Link>
            </FoldReveal>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function AboutSection({ headingLevel, standalone }: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="A small business became my first real project."
      description={aboutOpeningParagraph}
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5">
        {coreStory.map((paragraph) => (
          <FoldReveal key={paragraph}>
            <p className="text-text-secondary max-w-3xl text-base leading-8 sm:text-lg">
              {paragraph}
            </p>
          </FoldReveal>
        ))}
      </div>
      <FoldReveal delayMs={90}>
        <div className="mt-8">
          <p className="text-text-muted mb-4 text-xs tracking-[0.24em] uppercase">Timeline</p>
          <TimelineList as={sub} />
        </div>
      </FoldReveal>
      <FoldReveal delayMs={100}>
        <div className="border-border-subtle bg-surface-overlay mt-6 grid gap-4 rounded-3xl border p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Current status</p>
            <p className="text-text-secondary mt-2 text-sm leading-7">{currentStatusSummary}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
              Academic performance
            </p>
            <p className="text-text-secondary mt-2 text-sm leading-7">
              {academicPerformanceSummary}
            </p>
          </div>
        </div>
      </FoldReveal>
    </SectionShell>
  );
}

export function ExperienceSection({
  project,
  headingLevel,
  standalone,
}: SectionProps & {
  readonly project: ProjectEntity;
}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="NSA Travels is the story this portfolio is built around."
      description="A two-person travel agency running on paper became the live system I used to learn how software should actually behave when a business depends on it every day."
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <FoldCard
          as={sub}
          meta="Before"
          title="The manual state"
          body="Bookkeeping lived in Excel sheets and paper ledgers. Customer records were scattered. Ticket tracking was manual. There was no cloud backup, so the business had one fragile path for its records."
        />
        <FoldCard
          as={sub}
          meta="After"
          title="What changed"
          body="A custom accounting app, cloud storage and backup, customer and B2B records, a public company site, and a workflow that lets a small team handle more without proportionally more manual effort."
        />
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <FoldCard
          as={sub}
          meta="Role"
          title="Technology lead and operations support"
          body="Not a formal developer role. A self-directed one: find what's broken, build the fix, and keep the business moving while studying full time."
          note="The company grew from 2 people to a small structured team with accounts, a manager, operations staff, and me on the technology side."
        />
        <FoldCard
          as={sub}
          meta="Why it matters"
          title="My first real product environment"
          body="The family business gave me direct access to a real workflow. That access mattered more than a title or a hypothetical problem ever could have."
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <FoldCard
          as={sub}
          meta="Flagship case study"
          title={project.title}
          body={project.summary}
          note="Open the full case study for the whole sequence: hook, background, problem, what I built, artifacts, outcome, reflection, and what comes next."
        />
        <div className="grid gap-4">
          <div className="fold-panel rounded-3xl p-5 sm:p-6">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Key built systems</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </div>
          <div className="fold-panel rounded-3xl p-5 sm:p-6">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Links</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/projects/${project.slug}`} className={actionClass()}>
                Read the case study
              </Link>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className={actionClass({ variant: "secondary" })}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function ProjectsSection({
  projects,
  headingLevel,
  standalone,
}: SectionProps & {
  readonly projects: readonly ProjectEntity[];
}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="One flagship case study, three forward-looking directions, and the academic work that supports them."
      description="I've framed these by stage on purpose: shipped case study, in-progress concept, future concept, and practical coursework. I'm not presenting anything as more finished than it is."
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} as={sub} />
        ))}
      </div>
      <div className="border-border-subtle bg-surface-overlay mt-8 rounded-3xl border p-5 sm:p-6">
        <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Academic practicals</p>
        <p className="text-text-secondary mt-3 max-w-2xl text-sm leading-7">
          I keep course practicals and lab work in the same portfolio because they show the same
          pattern I use everywhere: find the problem, structure the system, and make the workflow
          easier to use.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {currentFocus.slice(0, 3).map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function EducationSection({
  headingLevel,
  standalone,
}: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  const TrainingHeading = sub;
  return (
    <SectionShell
      id="education"
      eyebrow="Education"
      title="The curriculum map matters because it shows where my systems thinking came from."
      description="I'm not showing the degree as a list of subjects. I'm showing it as a path: which course fed what kind of work later, and where the real connections are grounded."
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {curriculum.map((node, index) => (
          <SemesterCard key={node.semester} node={node} index={index} as={sub} />
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <div className="fold-panel rounded-3xl p-5 sm:p-6">
          <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
            Training and certifications
          </p>
          <div className="mt-5 grid gap-4">
            {trainings.map((training) => (
              <article
                key={`${training.title}-${training.period}`}
                className="border-border-subtle bg-surface-base rounded-2xl border p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <TrainingHeading className="text-text-primary text-base font-semibold">
                      {training.title}
                    </TrainingHeading>
                    <p className="text-text-muted mt-1 text-sm">{training.provider}</p>
                  </div>
                  <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
                    {training.period}
                  </p>
                </div>
                <p className="text-text-secondary mt-3 text-sm leading-6">
                  {training.whyItMatters}
                </p>
                <p className="text-text-muted mt-2 text-sm leading-6">
                  Connects to: {training.connectsTo}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="fold-panel rounded-3xl p-5 sm:p-6">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
              What I’m learning now
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentFocus.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </div>
          <div className="fold-panel rounded-3xl p-5 sm:p-6">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
              University workshops
            </p>
            <div className="text-text-secondary mt-4 space-y-3 text-sm leading-7">
              <p>UI/UX Workshop — 2023</p>
              <p>WordPress Workshop — 2024</p>
              <p>Quality Assurance Workshop — 2026</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function SkillsSection({ headingLevel, standalone }: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Grouped by what they actually let me do."
      description="No skill bars. No fake percentages. Just the languages, frameworks, databases, tools, cloud systems, and working concepts I can actually apply."
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          // `meta` was also group.title, so every group name rendered twice.
          <FoldCard as={sub} key={group.title} title={group.title} body={group.items.join(" • ")} />
        ))}
      </div>
    </SectionShell>
  );
}

export function AiWorkflowSection({
  headingLevel,
  standalone,
}: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="workflow"
      eyebrow="Workflow"
      title="AI-Augmented Engineering Workflow"
      description={aiWorkflowLead}
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5">
        {aiWorkflowStory.map((paragraph) => (
          <FoldReveal key={paragraph}>
            <p className="text-text-secondary max-w-3xl text-base leading-8 sm:text-lg">
              {paragraph}
            </p>
          </FoldReveal>
        ))}
      </div>
      <FoldReveal delayMs={90}>
        <div className="mt-8">
          <p className="text-text-muted mb-4 text-xs tracking-[0.24em] uppercase">
            Where I apply it
          </p>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {workflowPractices.map((practice) => (
              <FoldCard as={sub} key={practice.title} title={practice.title} body={practice.body} />
            ))}
          </div>
        </div>
      </FoldReveal>
      <FoldReveal delayMs={100}>
        <div className="border-border-subtle bg-surface-overlay mt-6 grid gap-4 rounded-3xl border p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">
              What AI accelerates
            </p>
            <p className="text-text-secondary mt-2 text-sm leading-7">{aiAcceleratesSummary}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">What stays mine</p>
            <p className="text-text-secondary mt-2 text-sm leading-7">
              {engineeringJudgmentSummary}
            </p>
          </div>
        </div>
      </FoldReveal>
    </SectionShell>
  );
}

export function ToolkitSection({ headingLevel, standalone }: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="toolkit"
      eyebrow="Toolkit"
      title="Modern Engineering Toolkit"
      description={toolkitLead}
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {toolkitGroups.map((group) => (
          <ToolkitCard key={group.title} group={group} as={sub} />
        ))}
      </div>
    </SectionShell>
  );
}

export function PhilosophySection({
  headingLevel,
  standalone,
}: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="philosophy"
      eyebrow="Philosophy"
      title="I start with the problem, not the stack."
      description="These are the principles that show up again and again in my work, whether the project is travel operations, coursework, or a future product concept."
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {philosophy.map((principle) => (
          <FoldCard
            as={sub}
            key={principle.quote}
            title={principle.quote}
            body={principle.explanation}
          />
        ))}
      </div>
    </SectionShell>
  );
}

export function ContactSection({ headingLevel, standalone }: SectionProps = {}): React.JSX.Element {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Reach out if you want to talk systems, travel, or applied product work in Nepal."
      description="The closing line below is the honest one: this is my first chapter, not the finished book."
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="fold-panel rounded-3xl p-5 sm:p-6">
          <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Contact links</p>
          <div className="mt-5 grid gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="border-border-subtle bg-surface-base hover:border-border-default rounded-2xl border p-4 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-text-primary font-medium">{link.label}</p>
                    <p className="text-text-muted mt-1 text-sm leading-6">{link.description}</p>
                  </div>
                  <span className="text-accent-default text-sm">Open</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="fold-panel rounded-3xl p-5 sm:p-6">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">Closing statement</p>
            <p className="text-text-secondary mt-3 text-lg leading-8">{footerClosingStatement}</p>
          </div>
          <div className="fold-panel rounded-3xl p-5 sm:p-6">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">What I'm building</p>
            <ul className="text-text-secondary mt-4 grid gap-2 text-sm leading-7">
              {currentFocus.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="bg-accent-default mt-2 h-1.5 w-1.5 rounded-full"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
