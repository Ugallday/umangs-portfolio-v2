import { SiteShell } from "@/features/portfolio/shell";
import { HeroSection, HubSection, StackSection } from "@/features/portfolio/sections";
import { FeaturedProjects } from "@/features/projects/featured-project";
import { getProject } from "@/features/projects";

export const revalidate = 3600;

/**
 * The homepage leads with the flagship, then the engineering artifact inside
 * it. NSA Travels is the story — a working business rebuilt in software — and
 * the VAT ledger is the system that story produced. Travora sits on /projects
 * with the rest of the supporting work rather than competing for the hero.
 */
const FEATURED_SLUGS = ["nsa-travels", "vat-billing-system"] as const;

export default async function HomePage(): Promise<React.JSX.Element> {
  const featured = await Promise.all(FEATURED_SLUGS.map((slug) => getProject(slug)));

  const missing = FEATURED_SLUGS.filter((_slug, index) => featured[index] === null);
  if (missing.length > 0) {
    throw new Error(`Featured projects are required to render the homepage: ${missing.join(", ")}`);
  }

  const projects = featured.filter((project) => project !== null);

  return (
    <SiteShell>
      <HeroSection />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <FeaturedProjects projects={projects} />
        <StackSection />
        <HubSection />
      </div>
    </SiteShell>
  );
}
