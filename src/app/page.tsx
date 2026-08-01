import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getProjects } from "@/features/projects/api";

export const revalidate = 3600;

export default async function HomePage(): Promise<React.JSX.Element> {
  const projects = await getProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-16 lg:px-8">
      <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">
            {siteConfig.shortName}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
            >
              View projects
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-100"
            >
              About the engineer
            </Link>
          </div>
        </div>

        <aside className="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
            Featured work
          </h2>
          <div className="mt-6 space-y-4">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <article key={project.slug} className="rounded-2xl border border-stone-200 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{project.status}</p>
                  <h3 className="mt-2 text-lg font-semibold text-stone-950">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{project.summary}</p>
                </article>
              ))
            ) : (
              <p className="text-sm leading-6 text-stone-600">
                No published projects are available yet. Add MDX entries in <code>content/projects</code> to populate this section.
              </p>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
