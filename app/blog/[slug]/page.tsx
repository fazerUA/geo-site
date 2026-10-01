import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { formatBlogDate } from "@/lib/blog";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog/server";
import SiteTopNav from "@/components/landing/site-top-nav";
import { BlogPinnedBadge } from "@/components/blog/pinned-badge";
import { blogPageContent } from "@/content/blog/page-content";
import { BlogTags } from "@/components/blog/blog-tags";
import { BlogAuthor } from "@/components/blog/blog-author";
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts";
import { BlogBreadcrumbs } from "@/components/blog/blog-breadcrumbs";
import { BlogSources } from "@/components/blog/blog-sources";
import { ImageLightbox } from "@/components/blog/image-lightbox";
import { JsonLdScript } from "@/components/schema/json-ld-script";
import { buildBlogPostingSchema, buildBlogSchema } from "@/lib/schema/site-schema";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb-schema";
import { buildPageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo/metadata-helpers";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Статья не найдена",
      description: "Запрашиваемая запись блога не существует.",
    };
  }

  return buildPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}/`,
    image: post.image || DEFAULT_OG_IMAGE,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.dateModified,
    authors: [post.author],
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Главная", path: "/" },
    { name: "Блог", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` },
  ];
  const relatedPosts = getRelatedBlogPosts(slug);

  return (
    <main className="blog-main px-4 py-10 sm:px-6 lg:px-8">
      <JsonLdScript
        data={[
          buildBlogSchema(),
          buildBlogPostingSchema(post),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
        <article className="mx-auto max-w-3xl">
          <BlogBreadcrumbs items={breadcrumbs} />
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {post.pinned && <BlogPinnedBadge label={blogPageContent.pinnedLabel} />}
            <time
              className="blog-post-meta text-xs uppercase tracking-[0.2em]"
              dateTime={post.date}
            >
              Опубликовано {formatBlogDate(post.date)}
            </time>
          </div>
          <Link href="/blog" className="blog-ghost-link">
            Ко всем записям
          </Link>
        </div>

        <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">{post.title}</h1>

        {post.tags.length > 0 && (
          <div className="mt-5">
            <BlogTags tags={post.tags} />
          </div>
        )}

        <div className="blog-prose mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              a: ({ children, href }) => {
                const url = String(href ?? "");
                const isInternal = url.startsWith("/") || url.startsWith("#");

                if (isInternal) {
                  return <Link href={url}>{children}</Link>;
                }

                return (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },
              strong: ({ children }) => <strong>{children}</strong>,
              blockquote: ({ children }) => <blockquote>{children}</blockquote>,
              img: ({ src, alt }) => (
                <ImageLightbox src={String(src ?? "")} alt={String(alt ?? "")} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <BlogRelatedPosts posts={relatedPosts} />

        <BlogAuthor authorName={post.author} />

        <BlogSources sources={post.sources} />

        {post.tags.length > 0 && (
          <section
            className="blog-tags-cloud mt-10"
            aria-label={blogPageContent.tagsEyebrow}
          >
            <p className="blog-eyebrow mb-3 text-xs uppercase tracking-[0.28em]">
              {blogPageContent.tagsEyebrow}
            </p>
            <BlogTags tags={post.tags} />
          </section>
        )}

        <div className="mt-10 flex justify-end">
          <Link href="/blog" className="blog-ghost-link">
            Ко всем записям
          </Link>
        </div>
        </article>
      </div>
    </main>
  );
}
