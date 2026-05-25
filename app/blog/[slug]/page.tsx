import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import SiteTopNav from "@/components/landing/site-top-nav";
import { BlogPinnedBadge } from "@/components/blog/pinned-badge";
import { blogPageContent } from "@/content/blog/page-content";
import { BlogTags } from "@/components/blog/blog-tags";

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

  return {
    title: post.metaTitle,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-main px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
        <article className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {post.pinned && <BlogPinnedBadge label={blogPageContent.pinnedLabel} />}
            <p className="blog-post-meta text-xs uppercase tracking-[0.2em]">{post.date}</p>
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
              a: ({ children, href }) => (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong>{children}</strong>,
              blockquote: ({ children }) => <blockquote>{children}</blockquote>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

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
