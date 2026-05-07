import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import SiteTopNav from "@/components/landing/site-top-nav";
import Link from "next/link";
import { blogPageContent } from "@/content/blog/page-content";

export const metadata: Metadata = {
  title: blogPageContent.metaTitle,
  description: blogPageContent.metaDescription,
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-[#0f0d0b] px-4 py-10 text-[#f7eedf] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
        <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d8c3a0]">
            {blogPageContent.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            {blogPageContent.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#c5b295]">
            {blogPageContent.description}
            <code> {blogPageContent.contentDirectory}</code> {blogPageContent.descriptionSuffix}
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="rounded-3xl border border-[#3a2d1b] bg-[#17120e] p-6 text-[#c5b295]">
            {blogPageContent.emptyState} <code>{blogPageContent.contentDirectory}</code>
            {blogPageContent.emptyStateSuffix}
          </div>
        ) : (
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-3xl border border-[#3a2d1b] bg-[#17120e] p-6 shadow-[0_10px_30px_rgba(70,50,25,0.08)] transition hover:-translate-y-0.5 hover:border-[#5b4323]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#8f7a5b]">{post.date}</p>
                <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
                <p className="mt-3 leading-7 text-[#c5b295]">{post.excerpt}</p>
                <p className="mt-4 text-sm text-[#e2c28f]">{blogPageContent.readMoreLabel}</p>
              </Link>
            ))}
          </div>
        )}
        </div>
      </div>
    </main>
  );
}
