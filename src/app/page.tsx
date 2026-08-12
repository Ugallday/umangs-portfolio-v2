import { SiteShell } from "@/features/portfolio/shell";
import { HeroSection, HubSection, StackSection } from "@/features/portfolio/sections";
import { FeaturedProjects } from "@/features/projects/featured-project";
import { getProject } from "@/features/projects";

export const revalidate = 3600;

/**
 * The two projects the homepage leads with, below the hero, in this order.
 *
 * Both are systems rather than clients: the VAT ledger, and Travora. The NSA
 * Travels case study is the narrative around the ledger and is reachable from
 * it and from /projects — leading with it here made the homepage tell the same
 * story twice.
 */
const FEATURED_SLUGS = ["vat-billing-system", "travora"] as const;

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
