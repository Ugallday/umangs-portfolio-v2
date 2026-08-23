export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface ProjectSection {
  readonly id: string;
  readonly heading: string;
  readonly body: string;
  readonly bullets: readonly string[];
}

/** A headline figure — `value` is the number as it should read, unit and all. */
export interface ProjectMetric {
  readonly value: string;
  readonly label: string;
}

/** A recorded walkthrough. Optional — most projects have nothing to play. */
export interface ProjectVideo {
  readonly youtubeId: string;
  readonly title: string;
  readonly caption: string;
  readonly aspect: "16:9" | "4:3";
}

export interface ProjectVisual {
  readonly eyebrow: string;
  readonly label: string;
  readonly description: string;
}

/**
 * `flagship` is deliberately singular in practice: exactly one project holds
 * it. The site's positioning is one flagship plus supporting work, and three
 * projects sharing a `case-study` label contradicted that on the index page
 * while the homepage claimed otherwise.
 */
export type ProjectPhase = "flagship" | "case-study" | "in-progress" | "concept" | "academic";

export interface ProjectEntity {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly phase: ProjectPhase;
  readonly period: string;
  readonly role: string;
  readonly organization: string;
  readonly techStack: readonly string[];
  readonly metrics: readonly ProjectMetric[];
  readonly links: readonly ProjectLink[];
  readonly visual: ProjectVisual;
  readonly video?: ProjectVideo;
  readonly sections: readonly ProjectSection[];
  readonly order: number;
  readonly status: "draft" | "published";
}
