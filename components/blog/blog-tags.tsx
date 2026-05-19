import Link from "next/link";
import { formatBlogTag, tagToSlug } from "@/lib/blog";

type Props = {
  tags: string[];
  className?: string;
};

export function BlogTags({ tags, className = "" }: Props) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={`blog-tags ${className}`.trim()}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/blog/tag/${tagToSlug(tag)}/`} className="blog-tag">
            {formatBlogTag(tag)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
