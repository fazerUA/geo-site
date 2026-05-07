import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import SiteTopNav from "@/components/landing/site-top-nav";

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
    <main className="min-h-screen bg-[#0f0d0b] px-4 py-10 text-[#f7eedf] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
      </div>
      <article className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8f7a5b]">{post.date}</p>
          <Link
            href="/blog"
            className="rounded-full border border-[#6a4f2a] px-4 py-2 text-sm text-[#f0ddbe] transition hover:bg-[#221a13]"
          >
            Ко всем записям
          </Link>
        </div>

        <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">{post.title}</h1>

        <div className="mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ children }) => (
                <h2 className="mt-8 text-2xl font-semibold text-[#f7eedf]">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-6 text-xl font-semibold text-[#f7eedf]">{children}</h3>
              ),
              p: ({ children }) => <p className="mt-4 leading-8 text-[#c5b295]">{children}</p>,
              ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>,
              ol: ({ children }) => (
                <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>
              ),
              li: ({ children }) => <li className="leading-8 text-[#c5b295]">{children}</li>,
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-[#e2c28f] underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong className="text-[#f7eedf]">{children}</strong>,
              blockquote: ({ children }) => (
                <blockquote className="mt-4 border-l-2 border-[#6a4f2a] pl-4 italic text-[#d8c3a0]">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/blog"
            className="rounded-full border border-[#6a4f2a] px-4 py-2 text-sm text-[#f0ddbe] transition hover:bg-[#221a13]"
          >
            Ко всем записям
          </Link>
        </div>
      </article>
    </main>
  );
}
