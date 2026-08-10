import type { Metadata } from "next";

import { SectionPage } from "@/features/portfolio/section-page";
import { buildSectionMetadata } from "@/features/portfolio/page-metadata";
import { getPosts, WritingIndex } from "@/features/writing";

export const revalidate = 3600;

export const metadata: Metadata = buildSectionMetadata({
  title: "Writing",
  description:
    "Notes on things that broke, decisions with trade-offs, measurements I produced, and the parts of travel and accounting that software usually gets wrong.",
  path: "/writing",
});

export default async function WritingPage(): Promise<React.JSX.Element> {
  const posts = await getPosts();

  return (
    <SectionPage>
      <WritingIndex posts={posts} />
    </SectionPage>
  );
}
