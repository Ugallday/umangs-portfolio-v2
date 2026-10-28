import Image from "next/image";
import Link from "next/link";

import type { ProjectEntity } from "@/core/domain/entities/project.entity";

const CHAPTERS = [
  [
    "01",
    "Operational intelligence",
    "A warehouse that turns fleet movement into a number people can trust.",
  ],
  [
    "02",
    "Automation in the field",
    "Two vendor systems, one dependable pipeline, no manual exports.",
  ],
  ["03", "Applied research", "Finding evidence in the shape of an obfuscated binary."],
] as const;

export function AtlasHome({
  projects,
}: {
  readonly projects: readonly ProjectEntity[];
}): React.JSX.Element {
  return (
    <div className="atlas-root overflow-hidden bg-[#090a08]">
      <section className="atlas-hero relative isolate min-h-[100svh] overflow-hidden text-[#f3f0e8]">
        <Image
          src="/atlas-hero-landscape.png"
          alt="Abstract nighttime data landscape with a glass sphere"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.25)_0%,rgba(0,0,0,.06)_32%,rgba(7,8,6,.74)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,transparent_0%,rgba(0,0,0,.13)_48%,rgba(0,0,0,.48)_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-between px-6 pt-28 pb-8 sm:px-10 sm:pt-32 lg:px-14 lg:pt-36">
          <div className="atlas-meta flex items-center justify-between gap-4 text-white/70">
            <span>Portfolio // 2026</span>
            <span>Utah, US</span>
          </div>
          <div className="mx-auto flex max-w-5xl flex-col items-center pb-[7vh] text-center">
            <p className="atlas-meta mb-6 text-[#d3ff70]">Data systems · research · evidence</p>
            <h1 className="atlas-title">
              <span>Umang</span>
              <em>Gupta</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
              I build data infrastructure that helps teams see what is actually happening — from
              live transit fleets to applied machine-learning research.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="#work" className="atlas-button atlas-button-primary">
                Explore selected work
              </Link>
              <Link href="/resume" className="atlas-button">
                Read the résumé
              </Link>
            </div>
          </div>
          <div className="atlas-meta flex items-end justify-between gap-4 text-white/60">
            <span>Scroll to read the record</span>
            <span>01 — 03</span>
          </div>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-14">
        <p className="atlas-meta text-[#d3ff70]">The thesis</p>
        <div>
          <h2 className="atlas-statement text-[#f3f0e8]">
            The work is not the dashboard. It is the decision a team can finally make because the
            data is right.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#b6bbb0] sm:text-lg">
            I work at the line where unclear operational systems become reliable reporting:
            warehouse design, ETL, automation, BI, and the research needed to know where the
            confidence ends.
          </p>
        </div>
      </section>
      <section id="work" className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 px-6 pt-20 sm:px-10 sm:pt-28 lg:flex-row lg:items-end lg:px-14">
          <div>
            <p className="atlas-meta text-[#d3ff70]">Selected systems</p>
            <h2 className="atlas-display mt-4 text-[#f3f0e8]">Work with a real consequence.</h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-[#9ea69c]">
            Three projects, each built around the gap between a messy source and a useful decision.
          </p>
        </div>
        <div className="mt-16">
          {projects.map((project, index) => (
            <ProjectChapter key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-14">
        <div>
          <p className="atlas-meta text-[#d3ff70]">In motion</p>
          <h2 className="atlas-display mt-4 text-[#f3f0e8]">
            From Nepal to Utah, through systems that matter.
          </h2>
        </div>
        <div className="border-t border-white/15">
          <PathRow
            period="2026 — now"
            text="Data Analysis & Research Intern, Utah Transit Authority"
          />
          <PathRow period="2026 — now" text="Student Data Analyst, Weber State University" />
          <PathRow
            period="Dec 2026"
            text="B.S. Computer Science, Data Analytics minor · 3.88 GPA"
          />
          <Link href="/background" className="atlas-inline-link mt-7 inline-flex">
            Read the complete path ↗
          </Link>
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#10130d]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:flex-row lg:items-end lg:px-14">
          <div>
            <p className="atlas-meta text-[#d3ff70]">Open channel</p>
            <h2 className="atlas-display mt-4 max-w-2xl text-[#f3f0e8]">
              Let’s talk about data that has to hold up in the real world.
            </h2>
          </div>
          <Link href="/contact" className="atlas-button atlas-button-primary">
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProjectChapter({
  project,
  index,
}: {
  readonly project: ProjectEntity;
  readonly index: number;
}): React.JSX.Element {
  const chapter = CHAPTERS[index] ?? CHAPTERS[0];
  return (
    <article className="border-t border-white/10 py-8 first:border-t-0 sm:py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 sm:px-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch lg:gap-12 lg:px-14">
        <div className="flex min-h-[19rem] flex-col justify-between py-2 lg:min-h-[34rem] lg:py-4">
          <div className="atlas-meta flex items-center justify-between text-[#d3ff70]">
            <span>{chapter[0]}</span>
            <span>{chapter[1]}</span>
          </div>
          <div>
            <p className="atlas-project-word text-white/18">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="atlas-project-title text-[#f3f0e8]">{project.title}</h3>
            <p className="mt-4 max-w-md text-base leading-7 text-[#b6bbb0]">{project.summary}</p>
            <Link href={`/projects/${project.slug}`} className="atlas-inline-link mt-7 inline-flex">
              Read the case study ↗
            </Link>
          </div>
        </div>
        <div className={`atlas-visual atlas-visual-${index + 1}`}>
          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
            <p className="atlas-meta text-white/65">{chapter[2]}</p>
            <div className="grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-2">
              {project.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label}>
                  <p className="font-serif text-3xl text-[#f3f0e8] sm:text-4xl">{metric.value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/60">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="atlas-data-lines" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

function PathRow({
  period,
  text,
}: {
  readonly period: string;
  readonly text: string;
}): React.JSX.Element {
  return (
    <div className="atlas-path-row">
      <span className="atlas-meta text-[#d3ff70]">{period}</span>
      <p>{text}</p>
    </div>
  );
}
