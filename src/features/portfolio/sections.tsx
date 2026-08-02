import Image from "next/image";
import Link from "next/link";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { siteConfig } from "@/config/site";
import type { ProjectEntity } from "@/core/domain/entities/project.entity";
import {
  aboutOpeningParagraph,
  academicPerformanceSummary,
  contactLinks,
  coreStory,
  currentFocus,
  currentStatusSummary,
  curriculum,
  footerClosingStatement,
  heroHeadline,
  heroSubheadline,
  hubEntries,
  philosophy,
  skillGroups,
  timeline,
  trainings,
} from "@/features/portfolio/content";
import portraitImage from "@/assets/portrait.png";

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
      className={
        standalone ? "py-12 sm:py-16" : "border-border-subtle scroll-mt-24 border-t py-20 sm:py-24"
      }
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

/** Every section accepts these so a route can promote it to a standalone page. */
export interface SectionProps {
  readonly headingLevel?: SectionHeadingLevel;
  readonly standalone?: boolean;
}

function Pill({ children }: { readonly children: React.ReactNode }): React.JSX.Element {
  return (
    <span className="border-border-default text-text-secondary inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function FoldCard({
  title,
  body,
  note,
  meta,
}: {
  readonly title: string;
  readonly body: string;
  readonly note?: string;
  readonly meta?: string;
}): React.JSX.Element {
  return (
    <article className="fold-panel fold-hover rounded-3xl p-5 sm:p-6">
      {meta ? <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{meta}</p> : null}
      <h3 className="text-text-primary mt-3 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="text-text-secondary mt-3 leading-7">{body}</p>
      {note ? <p className="text-text-muted mt-4 text-sm leading-6">{note}</p> : null}
    </article>
  );
}

function ProjectCard({ project }: { readonly project: ProjectEntity }): React.JSX.Element {
  return (
    <article className="fold-panel fold-hover flex h-full flex-col rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <Pill>{project.phase}</Pill>
        <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{project.period}</p>
      </div>
      <h3 className="text-text-primary mt-4 text-xl font-semibold tracking-tight">
        {project.title}
      </h3>
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
        <Link
          href={`/projects/${project.slug}`}
          className="bg-accent-default text-text-on-accent hover:bg-accent-hover inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition"
        >
          Read case study
        </Link>
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition"
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
}: {
  readonly item: (typeof timeline)[number];
  readonly index: number;
}): React.JSX.Element {
  return (
    <details className="group fold-panel fold-hover rounded-3xl p-5 sm:p-6" open={index === 0}>
      <summary className="cursor-pointer list-none">
        <div className="flex items-start gap-4">
          <div className="bg-accent-default mt-1 h-3 w-3 rounded-full" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{item.year}</p>
            <h3 className="text-text-primary mt-2 text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
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

function TimelineList(): React.JSX.Element {
  return (
    <div className="grid gap-4">
      {/* Keyed by title, not year — two entries legitimately share "2022-present". */}
      {timeline.map((item, index) => (
        <TimelineCard key={item.title} item={item} index={index} />
      ))}
    </div>
  );
}

function SemesterCard({
  node,
  index,
}: {
  readonly node: (typeof curriculum)[number];
  readonly index: number;
}): React.JSX.Element {
  return (
    <details className="group fold-panel fold-hover rounded-3xl p-5 sm:p-6" open={index === 3}>
      <summary className="cursor-pointer list-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{node.semester}</p>
            <h3 className="text-text-primary mt-2 text-lg font-semibold tracking-tight">
              {node.emphasis}
            </h3>
          </div>
          <span className="text-text-muted text-xs tracking-[0.24em] uppercase transition group-open:rotate-180">
            Fold
          </span>
        </div>
      </summary>
      <div className="border-border-subtle mt-5 space-y-5 border-t pt-5">
        <div className="flex flex-wrap gap-2">
          {node.courses.map((course) => (
            <span
              key={course.name}
              className="border-border-default text-text-secondary rounded-full border px-3 py-1 text-xs"
            >
              {course.name}
            </span>
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

export function HeroSection(): React.JSX.Element {
  return (
    <section className="border-border-subtle relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(217,162,92,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%)]" />
      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl gap-12 px-6 py-8 lg:px-8 lg:py-10 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
        <div className="flex flex-col justify-between gap-10 pt-6 pb-8 xl:pt-12 xl:pb-14">
          <header className="text-text-muted flex items-center justify-between gap-4 text-xs tracking-[0.3em] uppercase">
            <span>{siteConfig.shortName}</span>
            <span>{siteConfig.location}</span>
          </header>
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
                <Link
                  href="/projects"
                  className="bg-accent-default text-text-on-accent hover:bg-accent-hover inline-flex items-center rounded-full px-5 py-3 text-sm font-medium transition"
                >
                  Explore the work
                </Link>
                <Link
                  href="/about"
                  className="border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium transition"
                >
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
          <aside className="fold-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
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
              <div className="border-border-subtle relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_50%_30%,rgba(217,162,92,0.18),transparent_30%),linear-gradient(180deg,#1b1c20,#0b0b0c)] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
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
          <TimelineList />
        </div>
      </FoldReveal>
      <FoldReveal delayMs={100}>
        <div className="border-border-subtle bg-surface-overlay mt-6 grid gap-4 rounded-[1.75rem] border p-5 sm:grid-cols-2 sm:p-6">
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
          meta="Before"
          title="The manual state"
          body="Bookkeeping lived in Excel sheets and paper ledgers. Customer records were scattered. Ticket tracking was manual. There was no cloud backup, so the business had one fragile path for its records."
        />
        <FoldCard
          meta="After"
          title="What changed"
          body="A custom accounting app, cloud storage and backup, customer and B2B records, a public company site, and a workflow that lets a small team handle more without proportionally more manual effort."
        />
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <FoldCard
          meta="Role"
          title="Technology lead and operations support"
          body="Not a formal developer role. A self-directed one: find what's broken, build the fix, and keep the business moving while studying full time."
          note="The company grew from 2 people to a small structured team with accounts, a manager, operations staff, and me on the technology side."
        />
        <FoldCard
          meta="Why it matters"
          title="My first real product environment"
          body="The family business gave me direct access to a real workflow. That access mattered more than a title or a hypothetical problem ever could have."
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <FoldCard
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
              <Link
                href={`/projects/${project.slug}`}
                className="bg-accent-default text-text-on-accent hover:bg-accent-hover inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition"
              >
                Read the case study
              </Link>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition"
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
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="border-border-subtle bg-surface-overlay mt-8 rounded-[1.75rem] border p-5 sm:p-6">
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
          <SemesterCard key={node.semester} node={node} index={index} />
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
                    <h3 className="text-text-primary text-base font-semibold">{training.title}</h3>
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
          <FoldCard
            key={group.title}
            meta={group.title}
            title={group.title}
            body={group.items.join(" • ")}
          />
        ))}
      </div>
    </SectionShell>
  );
}

export function PhilosophySection({
  headingLevel,
  standalone,
}: SectionProps = {}): React.JSX.Element {
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
          <FoldCard key={principle.quote} title={principle.quote} body={principle.explanation} />
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
