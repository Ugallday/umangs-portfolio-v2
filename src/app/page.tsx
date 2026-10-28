import { SiteShell } from "@/features/portfolio/shell";
import { AtlasHome } from "@/features/portfolio/atlas-home";
import { getProject } from "@/features/projects";

export const revalidate = 3600;

/**
 * The three projects the homepage leads with, below the hero, in this order.
 *
 * Ordered by date, most recent first - matching /projects and the résumé.
 * ObfuScope leads (started Jul 2026), then the UTA fleet warehouse and EV
 * automation, both ongoing since roughly mid-2026.
 */
const FEATURED_SLUGS = [
  "obfuscope",
  "uta-fleet-availability-warehouse",
  "ev-fleet-automation",
] as const;

export default async function HomePage(): Promise<React.JSX.Element> {
  const featured = await Promise.all(FEATURED_SLUGS.map((slug) => getProject(slug)));

  const missing = FEATURED_SLUGS.filter((_slug, index) => featured[index] === null);
  if (missing.length > 0) {
    throw new Error(`Featured projects are required to render the homepage: ${missing.join(", ")}`);
  }

  const projects = featured.filter((project) => project !== null);

  return (
    <SiteShell>
      <AtlasHome projects={projects} />
    </SiteShell>
  );
}
