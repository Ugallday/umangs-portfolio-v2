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

export interface ProjectVisual {
  readonly eyebrow: string;
  readonly label: string;
  readonly description: string;
}

export type ProjectPhase = "case-study" | "in-progress" | "concept" | "academic";

export interface ProjectEntity {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly phase: ProjectPhase;
  readonly period: string;
  readonly role: string;
  readonly organization: string;
  readonly techStack: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly visual: ProjectVisual;
  readonly sections: readonly ProjectSection[];
  readonly order: number;
  readonly status: "draft" | "published";
}
