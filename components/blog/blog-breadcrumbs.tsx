import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb-schema";

type Props = {
  items: BreadcrumbItem[];
};

export function BlogBreadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="blog-post-meta" aria-hidden="true">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span className="blog-lead">{item.name}</span>
              ) : (
                <Link href={item.path} className="blog-read-more hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
