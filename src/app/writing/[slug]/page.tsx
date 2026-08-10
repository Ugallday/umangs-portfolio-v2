import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/core/domain/seo/build-page-metadata";
import { SiteShell } from "@/features/portfolio/shell";
import { getPost, getPosts, PostDetail } from "@/features/writing";

interface PostPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  const pageMetadata = buildPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/writing/${post.slug}`,
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
  });

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    alternates: { canonical: pageMetadata.canonicalUrl },
    openGraph: {
      type: "article",
      publishedTime: post.publishedOn,
      title: pageMetadata.openGraph.title,
      description: pageMetadata.openGraph.description,
      url: pageMetadata.openGraph.url,
      siteName: pageMetadata.openGraph.siteName,
      images: [...pageMetadata.openGraph.images],
    },
  };
}

export default async function PostPage({ params }: PostPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell>
      <PostDetail post={post} />
    </SiteShell>
  );
}
