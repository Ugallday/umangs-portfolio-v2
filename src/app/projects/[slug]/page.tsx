import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/features/portfolio/shell";
import { ProjectDetail } from "@/features/projects/project-detail";
import { getProject, getProjects } from "@/features/projects";
import { buildPageMetadata } from "@/core/domain/seo/build-page-metadata";
import { siteConfig } from "@/config/site";

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {};
  }

  const pageMetadata = buildPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
  });

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    alternates: { canonical: pageMetadata.canonicalUrl },
    openGraph: {
      type: "article",
      title: pageMetadata.openGraph.title,
      description: pageMetadata.openGraph.description,
      url: pageMetadata.openGraph.url,
      siteName: pageMetadata.openGraph.siteName,
      images: [...pageMetadata.openGraph.images],
    },
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Neighbours come from the same ordered list the projects index renders, so
  // "next" means the next one a visitor would have met there.
  const projects = await getProjects();
  const index = projects.findIndex((entry) => entry.slug === slug);

  return (
    <SiteShell>
      <ProjectDetail
        project={project}
        previous={index > 0 ? (projects[index - 1] ?? null) : null}
        next={index >= 0 ? (projects[index + 1] ?? null) : null}
      />
    </SiteShell>
  );
}
