import Link from "next/link";
import { formatBlogDate } from "@/lib/blog";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog/server";
import SiteTopNav from "@/components/landing/site-top-nav";
import { blogPageContent } from "@/content/blog/page-content";
import { BlogPinnedBadge } from "@/components/blog/pinned-badge";
import { BlogTags } from "@/components/blog/blog-tags";
import { buildPageMetadata } from "@/lib/seo/metadata-helpers";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb-schema";
import { buildBlogSchema } from "@/lib/schema/site-schema";
import { JsonLdScript } from "@/components/schema/json-ld-script";
import { BlogBreadcrumbs } from "@/components/blog/blog-breadcrumbs";

export const metadata = buildPageMetadata({
  title: blogPageContent.metaTitle,
  description: blogPageContent.metaDescription,
  path: "/blog/",
});

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const allTags = getAllBlogTags();

  return (
    <main className="blog-main px-4 py-10 sm:px-6 lg:px-8">
      <JsonLdScript
        data={[
          buildBlogSchema(),
          buildBreadcrumbSchema([
            { name: "Главная", path: "/" },
            { name: "Блог", path: "/blog/" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
        <div className="mx-auto max-w-4xl">
          <BlogBreadcrumbs
            items={[
              { name: "Главная", path: "/" },
              { name: "Блог", path: "/blog/" },
            ]}
          />          <div className="mb-8">
            <p className="blog-eyebrow text-xs uppercase tracking-[0.28em]">
              {blogPageContent.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              {blogPageContent.heading}
            </h1>
            <p className="blog-lead mt-4 max-w-2xl text-base leading-7">
              {blogPageContent.description}
              <code className="blog-inline-code"> {blogPageContent.contentDirectory}</code>{" "}
              {blogPageContent.descriptionSuffix}
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="blog-empty-card">
              {blogPageContent.emptyState}{" "}
              <code className="blog-inline-code">{blogPageContent.contentDirectory}</code>
              {blogPageContent.emptyStateSuffix}
            </div>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className={`blog-post-card${post.pinned ? " blog-post-card--pinned" : ""}`}
                >
                  {post.pinned ? (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <BlogPinnedBadge label={blogPageContent.pinnedLabel} />
                      <p className="blog-post-meta text-xs uppercase tracking-[0.2em]">{formatBlogDate(post.date)}</p>
                    </div>
                  ) : (
                    <p className="blog-post-meta text-xs uppercase tracking-[0.2em]">{formatBlogDate(post.date)}</p>
                  )}
                  <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
                  <p className="blog-lead mt-3 leading-7">{post.excerpt}</p>
                  <p className="blog-read-more mt-4 text-sm">{blogPageContent.readMoreLabel}</p>
                </Link>
              ))}
            </div>
          )}

          {allTags.length > 0 && (
            <section
              className="blog-tags-cloud mt-10"
              aria-label={blogPageContent.tagsEyebrow}
            >
              <p className="blog-eyebrow mb-3 text-xs uppercase tracking-[0.28em]">
                {blogPageContent.tagsEyebrow}
              </p>
              <BlogTags tags={allTags.map((entry) => entry.tag)} />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
