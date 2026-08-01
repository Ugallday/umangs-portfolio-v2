export interface ProjectEntity {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly architectureNotes: string;
  readonly techStack: readonly string[];
  readonly challenges: readonly string[];
  readonly lessonsLearned: readonly string[];
  readonly futureWork: readonly string[];
  readonly repoUrl?: string;
  readonly liveUrl?: string;
  readonly coverImage: string;
  readonly gallery: readonly string[];
  readonly videoUrl?: string;
  readonly order: number;
  readonly status: "draft" | "published";
}
