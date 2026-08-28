import Image from "next/image";

import portraitImage from "@/assets/portrait.png";
import { siteConfig } from "@/config/site";
import {
  resumeDownloadNote,
  resumeEducation,
  resumeProjects,
  resumeResearch,
  resumeRoles,
  resumeSummary,
  resumeTitle,
  skillGroups,
  trainings,
} from "@/features/portfolio/content";
import { ResumeDownload } from "@/features/portfolio/resume-download";

/**
 * The CV, as a page.
 *
 * Deliberately NOT set in the site's editorial voice. The rest of the site can
 * afford letter-spaced small caps, serif date meta and amber accents; a résumé
 * cannot, because it is read by people scanning a stack of them and by parsers
 * that want a plain document. So this is the conventional single-column form —
 * bold uppercase section headings over a rule, dates flush right, real bullets,
 * tight leading — and the styling stays on the semantic tokens so the print
 * stylesheet turns it into ink on A4 without a print rule per component.
 */

/** Section heading: bold, uppercase, ruled. The résumé convention, not ours. */
function SectionHeading({ children }: { readonly children: React.ReactNode }): React.JSX.Element {
  return (
    <h2 className="text-text-primary border-border-default mt-7 border-b pb-1.5 text-[0.8125rem] font-bold uppercase">
      {children}
    </h2>
  );
}

/**
 * One entry: title flush left, dates flush right on the same baseline, an
 * optional second line for organisation and place. `gap-x-6` plus `flex-wrap`
 * means a long title wraps above its dates instead of colliding with them.
 */
function Entry({
  title,
  meta,
  subtitle,
  children,
}: {
  readonly title: string;
  readonly meta: string;
  readonly subtitle?: string;
  readonly children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="mt-4 break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6">
        <h3 className="text-text-primary text-[0.9375rem] font-bold">{title}</h3>
        <p className="text-text-secondary text-sm whitespace-nowrap">{meta}</p>
      </div>
      {subtitle ? <p className="text-text-secondary mt-0.5 text-sm italic">{subtitle}</p> : null}
      {children}
    </div>
  );
}

function Bullets({ items }: { readonly items: readonly string[] }): React.JSX.Element {
  return (
    <ul className="text-text-secondary mt-1.5 list-disc space-y-1 pl-5 text-sm leading-6 marker:text-current">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Resume(): React.JSX.Element {
  /**
   * Display text is derived from the href, never written alongside it — a CV
   * that spells its own links as literal strings is how a site ends up
   * advertising one LinkedIn while GitHub advertises another.
   */
  const displayUrl = (href: string): string =>
    href
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/$/, "");

  const contacts = [
    { value: siteConfig.socials.email, href: `mailto:${siteConfig.socials.email}` },
    { value: displayUrl(siteConfig.url), href: siteConfig.url },
    { value: displayUrl(siteConfig.socials.github), href: siteConfig.socials.github },
    { value: displayUrl(siteConfig.socials.linkedin), href: siteConfig.socials.linkedin },
  ];

  // 48rem is the right measure on screen and the wrong one on A4 — at the 14mm
  // margin the sheet gives ~182mm of column, and capping it there left the
  // document as a narrow strip down the middle of the page.
  return (
    <article className="mx-auto w-full max-w-3xl print:max-w-none">
      <header className="flex flex-wrap items-start gap-x-7 gap-y-5 sm:flex-nowrap">
        <Image
          src={portraitImage}
          alt="Umang Gupta"
          width={112}
          height={112}
          priority
          /* Hidden in print. It is the only dark mass on an otherwise white
             sheet, which is what reads as a "dark border" in the saved PDF —
             and a photograph on a CV is discouraged in the US applications
             this document is aimed at. It stays on the web page. */
          className="h-28 w-28 shrink-0 rounded-sm object-cover print:hidden"
        />

        <div className="min-w-0 flex-1">
          <h1 className="text-text-primary text-3xl font-bold tracking-tight uppercase sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="text-text-secondary mt-1 text-[0.9375rem]">{resumeTitle}</p>

          {/* One run of contacts separated by rules, the way a résumé header
              reads — not a list of labelled rows, which wastes the line. */}
          <ul className="text-text-secondary mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
            {contacts.map((contact) => (
              <li
                key={contact.value}
                className="after:text-text-muted after:mx-2.5 after:content-['|'] last:after:content-none"
              >
                <a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                  className="hover:text-text-primary transition"
                >
                  {contact.value}
                </a>
              </li>
            ))}
            <li className="text-text-muted">{siteConfig.location}</li>
          </ul>
        </div>
      </header>

      <SectionHeading>Summary</SectionHeading>
      <p className="text-text-secondary mt-3 text-sm leading-6">{resumeSummary}</p>

      <SectionHeading>Experience</SectionHeading>
      {resumeRoles.map((role) => (
        <Entry
          key={`${role.organization}-${role.period}`}
          title={role.title}
          meta={role.period}
          subtitle={`${role.organization}, ${role.location}`}
        >
          <Bullets items={role.bullets} />
        </Entry>
      ))}

      <SectionHeading>Selected projects</SectionHeading>
      {resumeProjects.map((project) => (
        <Entry
          key={project.slug}
          title={project.name}
          meta={project.period}
          subtitle={`${displayUrl(siteConfig.url)}/projects/${project.slug}`}
        >
          <Bullets items={project.bullets} />
        </Entry>
      ))}

      <SectionHeading>Research</SectionHeading>
      {resumeResearch.map((project) => (
        <Entry
          key={project.slug}
          title={project.name}
          meta={project.period}
          subtitle={`${displayUrl(siteConfig.url)}/projects/${project.slug}`}
        >
          <Bullets items={project.bullets} />
        </Entry>
      ))}

      <SectionHeading>Education</SectionHeading>
      {resumeEducation.map((entry) => (
        <Entry
          key={entry.qualification}
          title={entry.qualification}
          meta={entry.period}
          subtitle={entry.institution}
        >
          <p className="text-text-secondary mt-1.5 text-sm leading-6">{entry.result}</p>
        </Entry>
      ))}

      <SectionHeading>Industry training</SectionHeading>
      <ul className="text-text-secondary mt-3 grid gap-x-8 gap-y-1.5 text-sm leading-6 sm:grid-cols-2">
        {trainings.map((training) => (
          <li key={`${training.title}-${training.period}`} className="break-inside-avoid">
            <span className="text-text-primary font-semibold">{training.title}</span> —{" "}
            {training.provider}, {training.period}
          </li>
        ))}
      </ul>

      <SectionHeading>Technical</SectionHeading>
      <dl className="mt-3 grid gap-y-1.5 text-sm leading-6">
        {skillGroups.map((group) => (
          <div key={group.title} className="sm:grid sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-x-4">
            <dt className="text-text-primary font-semibold">{group.title}</dt>
            <dd className="text-text-secondary">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      {/* Last, and hidden on paper: a download button inside a PDF is noise. */}
      <div className="mt-9 flex flex-wrap items-center gap-4" data-print-hide>
        <ResumeDownload />
        <p className="text-text-muted max-w-md text-xs leading-5">{resumeDownloadNote}</p>
      </div>
    </article>
  );
}
