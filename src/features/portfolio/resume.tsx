import Link from "next/link";

import { siteConfig } from "@/config/site";
import {
  resumeDownloadNote,
  resumeEducation,
  resumeProjects,
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
 * Set to the site's own type and rhythm rather than a generic résumé template,
 * and laid out in a single measure so the print stylesheet can turn it into A4
 * without rearranging anything. Panels and rules do the work that a template's
 * boxes and shading would.
 */
function Row({
  heading,
  meta,
  children,
}: {
  readonly heading: string;
  readonly meta: string;
  readonly children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="border-border-subtle border-t pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-text-primary text-base font-semibold tracking-tight">{heading}</h3>
        <p className="text-text-muted font-serif text-xs tracking-[0.18em] uppercase">{meta}</p>
      </div>
      {children}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section className="mt-10">
      <h2 className="text-text-muted text-xs font-medium tracking-[0.32em] uppercase">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { readonly items: readonly string[] }): React.JSX.Element {
  return (
    <ul className="text-text-secondary mt-3 grid gap-2 text-sm leading-7">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="bg-accent-default mt-3 h-1 w-1 shrink-0 rounded-full" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A URL as you would print it on paper: no scheme, no `www.`, no trailing
 * slash. Derived rather than written out, because a CV that spells its own
 * links as literal strings is how the site ends up advertising one LinkedIn
 * and GitHub another — the exact drift this document is meant to settle.
 */
function displayUrl(href: string): string {
  return href
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

export function Resume(): React.JSX.Element {
  const contacts = [
    { label: "Email", value: siteConfig.socials.email, href: `mailto:${siteConfig.socials.email}` },
    { label: "WhatsApp", value: `+${siteConfig.whatsapp.number}`, href: siteConfig.whatsapp.href },
    { label: "Site", value: displayUrl(siteConfig.url), href: siteConfig.url },
    {
      label: "GitHub",
      value: displayUrl(siteConfig.socials.github),
      href: siteConfig.socials.github,
    },
    {
      label: "LinkedIn",
      value: displayUrl(siteConfig.socials.linkedin),
      href: siteConfig.socials.linkedin,
    },
  ];

  return (
    <article className="mx-auto w-full max-w-3xl">
      <header>
        <h1 className="text-text-primary text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="text-accent-default mt-3 text-base leading-7">{resumeTitle}</p>

        <ul className="text-text-secondary mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {contacts.map((contact) => (
            <li key={contact.label}>
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

        <p className="text-text-secondary mt-6 text-base leading-8">{resumeSummary}</p>

        <div className="mt-7 flex flex-wrap items-center gap-4" data-print-hide>
          <ResumeDownload />
          <p className="text-text-muted max-w-md text-xs leading-5">{resumeDownloadNote}</p>
        </div>
      </header>

      <Section title="Experience">
        {resumeRoles.map((role) => (
          <Row key={`${role.organization}-${role.period}`} heading={role.title} meta={role.period}>
            <p className="text-text-secondary mt-1 text-sm">
              {role.organization} · {role.location}
            </p>
            <Bullets items={role.bullets} />
          </Row>
        ))}
      </Section>

      <Section title="Selected projects">
        {resumeProjects.map((project) => (
          <Row key={project.slug} heading={project.name} meta={project.period}>
            <p className="text-text-muted mt-1 text-sm">
              Case study:{" "}
              <Link
                href={`/projects/${project.slug}`}
                className="text-accent-default hover:text-accent-hover transition"
              >
                {displayUrl(siteConfig.url)}/projects/{project.slug}
              </Link>
            </p>
            <Bullets items={project.bullets} />
          </Row>
        ))}
      </Section>

      <Section title="Education">
        {resumeEducation.map((entry) => (
          <Row key={entry.qualification} heading={entry.qualification} meta={entry.period}>
            <p className="text-text-secondary mt-1 text-sm leading-6">{entry.institution}</p>
            <p className="text-text-muted mt-1 text-sm leading-6">{entry.result}</p>
          </Row>
        ))}
      </Section>

      <Section title="Industry training">
        <div className="border-border-subtle grid gap-3 border-t pt-5 sm:grid-cols-2">
          {trainings.map((training) => (
            <div key={`${training.title}-${training.period}`}>
              <p className="text-text-primary text-sm font-medium">{training.title}</p>
              <p className="text-text-muted mt-1 text-sm leading-6">
                {training.provider} · {training.period}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Technical">
        <div className="border-border-subtle grid gap-4 border-t pt-5">
          {skillGroups.map((group) => (
            <div key={group.title} className="grid gap-1 sm:grid-cols-[minmax(0,14rem)_1fr]">
              <p className="text-text-muted text-sm">{group.title}</p>
              <p className="text-text-secondary text-sm leading-7">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Section>
    </article>
  );
}
