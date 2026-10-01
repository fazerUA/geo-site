import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

type Props = {
  posts: BlogPost[];
};

export function BlogRelatedPosts({ posts }: Props) {
  return (
    <section className="blog-tags-cloud mt-10" aria-label="Читайте также">
      <p className="blog-eyebrow mb-3 text-xs uppercase tracking-[0.28em]">Читайте также</p>
      <ul className="blog-lead space-y-2 text-sm leading-7">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`} className="blog-read-more hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
        <li>
          Услуги{" "}
          <Link href="/#geo" className="blog-read-more hover:underline">
            GEO-продвижения
          </Link>{" "}
          и{" "}
          <Link href="/#seo" className="blog-read-more hover:underline">
            SEO
          </Link>{" "}
          на главной
        </li>
        <li>
          <Link href="/about/" className="blog-read-more hover:underline">
            О команде экспертов
          </Link>
        </li>
      </ul>
    </section>
  );
}
