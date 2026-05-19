import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatBlogTag,
  getAllBlogTags,
  getBlogPostsByTagSlug,
  getBlogTagBySlug,
} from "@/lib/blog";
import SiteTopNav from "@/components/landing/site-top-nav";
import { BlogPinnedBadge } from "@/components/blog/pinned-badge";
import { blogPageContent } from "@/content/blog/page-content";

type BlogTagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllBlogTags().map((entry) => ({ tag: entry.slug }));
}

export async function generateMetadata({ params }: BlogTagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tagEntry = getBlogTagBySlug(tagSlug);

  if (!tagEntry) {
    return {
      title: "Ярлык не найден",
      description: "Записи с таким ярлыком не найдены.",
    };
  }

  const label = formatBlogTag(tagEntry.tag);

  return {
    title: `${blogPageContent.tagPageHeadingPrefix} ${label}`,
    description: `Статьи блога с ярлыком ${label}.`,
  };
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag: tagSlug } = await params;
  const tagEntry = getBlogTagBySlug(tagSlug);

  if (!tagEntry) {
    notFound();
  }

  const posts = getBlogPostsByTagSlug(tagSlug);
  const label = formatBlogTag(tagEntry.tag);

  return (
    <main className="blog-main px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="blog-eyebrow text-xs uppercase tracking-[0.28em]">
              {blogPageContent.tagPageEyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              {blogPageContent.tagPageHeadingPrefix} {label}
            </h1>
            <p className="blog-lead mt-4 text-base leading-7">
              {posts.length}{" "}
              {posts.length === 1 ? "запись" : posts.length < 5 ? "записи" : "записей"}
            </p>
            <Link href="/blog/" className="blog-ghost-link mt-6 inline-flex">
              {blogPageContent.allPostsLink}
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="blog-empty-card">{blogPageContent.tagPageEmpty}</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className={`blog-post-card${post.pinned ? " blog-post-card--pinned" : ""}`}
                >
                  {post.pinned ? (
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <BlogPinnedBadge label={blogPageContent.pinnedLabel} />
                      <p className="blog-post-meta text-xs uppercase tracking-[0.2em]">{post.date}</p>
                    </div>
                  ) : (
                    <p className="blog-post-meta text-xs uppercase tracking-[0.2em]">{post.date}</p>
                  )}
                  <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
                  <p className="blog-lead mt-3 leading-7">{post.excerpt}</p>
                  <p className="blog-read-more mt-4 text-sm">{blogPageContent.readMoreLabel}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
