export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  dateModified: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  pinned: boolean;
  tags: string[];
  image?: string;
  author: string;
  sources: BlogSource[];
};

export type BlogSource = {
  title: string;
  url: string;
};

export type BlogTagEntry = {
  tag: string;
  slug: string;
  count: number;
};

export function normalizeBlogTag(tag: string): string {
  return tag.trim().replace(/^#+/, "");
}

export function formatBlogTag(tag: string): string {
  const normalized = normalizeBlogTag(tag);
  return normalized ? `#${normalized}` : "";
}

export function tagToSlug(tag: string): string {
  const normalized = normalizeBlogTag(tag);
  return encodeURIComponent(normalized.replace(/\s+/g, "-").toLowerCase());
}

/** Формат даты для блога: день-месяц-год (12-05-2026). */
export function formatBlogDate(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return date;
  }

  const [, year, month, day] = match;
  return `${day}-${month}-${year}`;
}

export function extractFirstImageFromMarkdown(content: string): string | undefined {
  const markdownImage = content.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  if (markdownImage?.[1]) {
    return markdownImage[1];
  }

  const htmlImage = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return htmlImage?.[1];
}

export function resolvePostImage(input: {
  image?: string;
  content: string;
}): string | undefined {
  const fromFrontmatter = input.image?.trim();
  if (fromFrontmatter) {
    return fromFrontmatter;
  }

  return extractFirstImageFromMarkdown(input.content);
}
