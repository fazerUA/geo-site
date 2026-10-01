import Link from "next/link";
import { getBlogAuthor } from "@/content/site/author";

type BlogAuthorProps = {
  authorName?: string;
};

export function BlogAuthor({ authorName }: BlogAuthorProps) {
  const author = getBlogAuthor(authorName);

  return (
    <aside className="blog-author-card mt-10 rounded-[24px] border border-[var(--blog-card-border)] bg-[var(--blog-card-bg)] p-6">
      <p className="blog-eyebrow text-xs uppercase tracking-[0.28em]">Автор</p>
      <div className="blog-author-header mt-3">
        <img
          src={author.photo}
          alt={author.photoAlt ?? author.name}
          width={56}
          height={56}
          className="blog-author-photo"
        />
        <div className="blog-author-intro">
          <p className="text-lg font-semibold">{author.name}</p>
          <p className="blog-lead mt-1 text-sm">{author.jobTitle}</p>
        </div>
      </div>
      <p className="blog-lead mt-3 text-sm leading-7">{author.bio}</p>
      <Link href={`/about/#${author.id}`} className="blog-read-more mt-4 inline-block text-sm">
        Подробнее об эксперте
      </Link>
    </aside>
  );
}
