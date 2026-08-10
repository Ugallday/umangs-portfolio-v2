import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getProjects } from "@/features/projects";
import { getPosts } from "@/features/writing";

/**
 * The sitemap is derived, never hand-maintained.
 *
 * Routes come from `siteConfig.nav` and `siteConfig.footerNav` — the same
 * arrays the header and footer render — plus the two MDX collections. A route
 * added to the nav is in the sitemap the same day; a hand-written list would
 * have silently omitted /now and /writing the week they shipped.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const absolute = (path: string): string => new URL(path, siteConfig.url).toString();
  const now = new Date();

  return [
    { url: absolute("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...[...siteConfig.nav, ...siteConfig.footerNav].map((item) => ({
      url: absolute(item.href),
      lastModified: now,
      // /now says on its face that it is rewritten monthly, so it is the one
      // route worth telling a crawler to come back for.
      changeFrequency: (item.href === "/now" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: item.href === "/projects" ? 0.9 : 0.7,
    })),
    ...projects.map((project) => ({
      url: absolute(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      // The flagship outranks the rest, matching how the site presents them.
      priority: project.order === 1 ? 0.9 : 0.6,
    })),
    ...posts.map((post) => ({
      url: absolute(`/writing/${post.slug}`),
      lastModified: new Date(`${post.publishedOn}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
