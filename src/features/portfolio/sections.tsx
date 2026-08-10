import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

import { FoldReveal } from "@/components/motion/fold-reveal";
import { ScrollProgressTrack } from "@/components/motion/scroll-progress-track";
import { TypingHeadline } from "@/components/motion/typing-headline";
import { MarqueeColumn } from "@/components/motion/marquee-columns";
import { FoldField } from "@/components/three/fold-field";
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
  engineeringJudgmentSummary,
  footerClosingStatement,
  games,
  gamingCloser,
  gamingLead,
  gamingProfile,
  gamingStory,
  heroHeadline,
  heroProofPoints,
  heroSubheadline,
  hubEntries,
  nowEntries,
  nowLead,
  nowUpdated,
  shippedStackTitle,
  skillGroups,
  stackLead,
  timeline,
  toolkitGroups,
  toolkitLead,
  workflowPractices,
} from "@/features/portfolio/content";
import portraitImage from "@/assets/portrait.png";
import { actionClass } from "@/components/ui/action";
import { BrandMark } from "@/components/ui/brand-mark";
import { InstitutionLogo } from "@/components/ui/institution-logo";
import { institutionLogos } from "@/features/portfolio/institution-logos";
import { FoldToggle } from "@/components/ui/fold-toggle";
import { Pill } from "@/components/ui/pill";
import { SocialLink } from "@/components/ui/social-link";
import { TechBadge } from "@/components/ui/tech-badge";
import { WorkflowModel } from "@/features/portfolio/workflow-model";

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
          <TechBadge key={item} label={item} />
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
          <TechBadge key={tool} label={tool} />
        ))}
      </div>
    </article>
  );
}

/**
 * Adds an accent bloom to the shared SocialLink treatment. Applied only in the
 * hero card, where the icons sit against the card's own gradient and need a
 * little more lift than the footer row does — the footer keeps the plain
 * scale-and-border hover it already had.
 */
const socialGlowClass =
  "hover:shadow-[0_0_18px_-4px_color-mix(in_srgb,var(--accent-default)_55%,transparent)] " +
  "focus-visible:shadow-[0_0_18px_-4px_color-mix(in_srgb,var(--accent-default)_55%,transparent)]";

/** Matches the footer's icon sizing so the two placements read as one system. */
const HERO_SOCIAL_ICON = "h-[18px] w-[18px]";

const heroSocials = [
  {
    label: "GitHub",
    href: siteConfig.socials.github,
    icon: <Github className={HERO_SOCIAL_ICON} aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    icon: <Linkedin className={HERO_SOCIAL_ICON} aria-hidden="true" />,
  },
] as const;

export function HeroSection(): React.JSX.Element {
  return (
    <section className="border-border-subtle relative overflow-hidden border-b">
      {/* Inset so the drift never exposes an unpainted edge. */}
      <div
        aria-hidden="true"
        className="ambient-drift absolute -inset-[6%] -z-20 bg-[radial-gradient(circle_at_top_left,rgba(217,162,92,0.16),transparent_26%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%)]"
      />
      {/* Sits between the gradient wash and the content, so the folds read as
          depth behind the hero rather than as objects competing with it. */}
      <FoldField />
      {/* items-center, not items-end: bottom-aligning two columns of different
          heights left the shorter one hanging off the baseline. Centring them
          balances the pair without touching either column's own spacing. */}
      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl gap-12 px-6 py-8 lg:px-8 lg:py-10 xl:grid-cols-[1.25fr_0.75fr] xl:items-center">
        <div className="flex flex-col justify-between gap-10 pt-6 pb-8 xl:pt-12 xl:pb-14">
          {/* A meta row, not a banner — a second <header> here muddies the
              landmark structure alongside the real site header. */}
          <div className="text-text-muted flex items-center justify-between gap-4 text-xs tracking-[0.3em] uppercase">
            <span>{siteConfig.shortName}</span>
            <span>{siteConfig.location}</span>
          </div>
          <div className="max-w-4xl space-y-8">
            <FoldReveal delayMs={40}>
              <TypingHeadline
                text={heroHeadline}
                className="text-text-primary max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.75rem] xl:leading-[0.95]"
              />
            </FoldReveal>
            <FoldReveal delayMs={80}>
              <p className="text-text-secondary max-w-2xl text-lg leading-8 sm:text-xl">
                {heroSubheadline}
              </p>
            </FoldReveal>
            <FoldReveal delayMs={100}>
              <p className="text-text-muted max-w-2xl text-xs tracking-[0.24em] uppercase">
                {heroProofPoints.join(" · ")}
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
                <p className="mt-1">Correctness, PostgreSQL, systems that run offline</p>
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
                {heroSocials.map(({ label, href, icon }) => (
                  <div
                    key={label}
                    className="border-border-subtle bg-surface-overlay flex items-center justify-between gap-3 rounded-2xl border p-4"
                  >
                    <p className="text-text-muted text-xs tracking-[0.24em] uppercase">{label}</p>
                    <SocialLink href={href} label={label} className={socialGlowClass}>
                      {icon}
                    </SocialLink>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </FoldReveal>
      </div>
    </section>
  );
}

/**
 * The stack, moving.
 *
 * Three columns at different speeds, masked top and bottom so items enter and
 * leave rather than popping. It is decorative — every technology here is also
 * listed statically on /skills — so the whole band is hidden from assistive
 * technology instead of read out three times over in a random order.
 */
export function StackSection(): React.JSX.Element {
  // One list, offset per column. The band used to draw from three separate
  // groups; now that the stack is eight defended items rather than forty,
  // there is only one honest list to draw from — so each column starts at a
  // different point in it instead of the band padding itself out with
  // technologies I no longer claim.
  const shipped = skillGroups.find((group) => group.title === shippedStackTitle)?.items ?? [];
  const rotate = (offset: number): readonly string[] => [
    ...shipped.slice(offset),
    ...shipped.slice(0, offset),
  ];
  const columns = [shipped, rotate(3), rotate(6)];

  return (
    <section className="border-border-subtle border-t py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
          <p className="text-text-muted text-xs font-medium tracking-[0.32em] uppercase">
            The stack
          </p>
          <h2 className="text-text-primary text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Everything here is something I have shipped with.
          </h2>
          <p className="text-text-muted text-sm leading-7">{stackLead}</p>
          <Link href="/skills" className={actionClass({ variant: "secondary" })}>
            See the full list
          </Link>
        </div>

        <div
          aria-hidden="true"
          className="grid max-h-[24rem] grid-cols-2 gap-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] sm:grid-cols-3"
        >
          <MarqueeColumn items={columns[0] ?? []} durationSeconds={34} />
          <MarqueeColumn items={columns[1] ?? []} durationSeconds={44} />
          <MarqueeColumn
            items={columns[2] ?? []}
            durationSeconds={38}
            className="hidden sm:block"
          />
        </div>
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

export function NowSection({ headingLevel, standalone }: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="now"
      eyebrow={`Now · updated ${nowUpdated}`}
      title="What I'm actually doing this month."
      description={nowLead}
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5">
        {nowEntries.map((entry, index) => {
          const Heading = sub;
          return (
            <FoldReveal key={entry.label} delayMs={index * 40}>
              <article className="fold-panel rounded-3xl p-5 sm:p-6">
                <Heading className="text-text-primary text-lg font-semibold tracking-tight">
                  {entry.label}
                </Heading>
                <ul className="text-text-secondary mt-4 grid gap-3 leading-7">
                  {entry.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="bg-accent-default mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                        aria-hidden="true"
                      />
                      <span className="max-w-3xl">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FoldReveal>
          );
        })}
      </div>
    </SectionShell>
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
      title="One flagship system, the supporting work, and the coursework behind both."
      description="The VAT ledger is the flagship: a real business keeps its books on it. Everything after it is framed by stage on purpose — supporting project work, in-progress concept, future concept, and practical coursework. I'm not presenting anything as more finished than it is."
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

export function SkillsSection({ headingLevel, standalone }: SectionProps = {}): React.JSX.Element {
  const sub = cardLevel(headingLevel);
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Eight things, not forty."
      description="No skill bars, no fake percentages, and no long tail of things I touched once. The first group is what I would be happy to be questioned on for an hour. The second is what I am learning properly and am not claiming yet."
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Heading = sub;
          return (
            <FoldReveal key={group.title} delayMs={index * 40}>
              <article className="fold-panel fold-hover flex h-full flex-col rounded-3xl p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <Heading className="text-text-primary text-lg font-semibold tracking-tight">
                    {group.title}
                  </Heading>
                  <span className="text-text-muted font-serif text-xs tabular-nums">
                    {group.items.length}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) =>
                    group.kind === "tech" ? (
                      <TechBadge key={item} label={item} />
                    ) : (
                      <Pill key={item}>{item}</Pill>
                    ),
                  )}
                </div>
              </article>
            </FoldReveal>
          );
        })}
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
      <FoldReveal delayMs={80}>
        <WorkflowModel as={sub} />
      </FoldReveal>
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

export function GamingSection({ headingLevel, standalone }: SectionProps = {}): React.JSX.Element {
  const CardHeading = cardLevel(headingLevel);
  return (
    <SectionShell
      id="gaming"
      eyebrow="Gaming"
      title="The other system I have spent thousands of hours reading."
      description={gamingLead}
      {...(headingLevel ? { headingLevel } : {})}
      {...(standalone ? { standalone } : {})}
    >
      <div className="grid gap-5">
        {gamingStory.map((paragraph) => (
          <FoldReveal key={paragraph}>
            <p className="text-text-secondary max-w-3xl text-base leading-8 sm:text-lg">
              {paragraph}
            </p>
          </FoldReveal>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {games.map((game, index) => (
          <FoldReveal key={game.name} delayMs={index * 60}>
            <article className="fold-panel fold-hover group flex h-full flex-col rounded-3xl p-5 sm:p-6">
              <BrandMark label={game.name} />
              <CardHeading className="text-text-primary mt-5 text-lg font-semibold tracking-tight">
                {game.name}
              </CardHeading>
              <p className="text-accent-default mt-4 text-3xl font-semibold tracking-tight tabular-nums">
                {game.figure}
              </p>
              <p className="text-text-muted mt-1 text-xs tracking-[0.2em] uppercase">
                {game.figureLabel}
              </p>
              <p className="text-text-secondary mt-5 text-sm leading-7">{game.body}</p>
            </article>
          </FoldReveal>
        ))}
      </div>

      <FoldReveal delayMs={100}>
        <div className="border-border-subtle flex flex-wrap items-center justify-between gap-6 border-t pt-6">
          <p className="text-text-muted max-w-xl text-sm leading-7">{gamingCloser}</p>
          <a
            href={gamingProfile.href}
            target="_blank"
            rel="noreferrer"
            className="fold-panel fold-hover group flex items-center gap-4 rounded-2xl p-4 pr-6"
          >
            <BrandMark label={gamingProfile.label} />
            <span>
              <span className="text-text-primary block text-sm font-medium">
                {gamingProfile.label}
              </span>
              <span className="text-text-muted block text-xs leading-5">{gamingProfile.note}</span>
            </span>
          </a>
        </div>
      </FoldReveal>
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
