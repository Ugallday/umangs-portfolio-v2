import { SiteShell } from "@/features/portfolio/shell";
import { HeroSection, HubSection } from "@/features/portfolio/sections";
import { FeaturedProject } from "@/features/projects/featured-project";
import { getProject } from "@/features/projects";

export const revalidate = 3600;

/** The project the homepage leads with, below the hero. */
const FEATURED_SLUG = "vat-billing-system";

export default async function HomePage(): Promise<React.JSX.Element> {
  const featured = await getProject(FEATURED_SLUG);

  if (!featured) {
    throw new Error(`Featured project "${FEATURED_SLUG}" is required to render the homepage.`);
  }

  return (
    <SiteShell>
      <HeroSection />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <FeaturedProject project={featured} />
        <HubSection />
      </div>
    </SiteShell>
  );
}
