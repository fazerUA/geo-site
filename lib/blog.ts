import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  pinned: boolean;
  tags: string[];
};

export type BlogTagEntry = {
  tag: string;
  slug: string;
  count: number;
};

type BlogFrontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  pinned?: string;
  tags?: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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

function parseTags(raw?: string): string[] {
  if (!raw?.trim()) {
    return [];
  }

  let value = raw.trim();
  if (value.startsWith("[") && value.endsWith("]")) {
    value = value.slice(1, -1);
  }

  const seen = new Set<string>();

  return value
    .split(",")
    .map((part) => normalizeBlogTag(part))
    .filter((tag) => {
      if (!tag) {
        return false;
      }

      const key = tag.toLowerCase();
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontmatter(rawFile: string): { data: BlogFrontmatter; content: string } {
  const normalized = rawFile.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: normalized.trim() };
  }

  const [, frontmatterBlock, content] = match;
  const data: BlogFrontmatter = {};

  for (const line of frontmatterBlock.split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim() as keyof BlogFrontmatter;
    const value = stripQuotes(line.slice(separatorIndex + 1));
    data[key] = value;
  }

  return { data, content: content.trim() };
}

function validateFrontmatter(data: BlogFrontmatter, slug: string) {
  if (!data.title || !data.date || !data.excerpt || !data.metaTitle || !data.metaDescription) {
    throw new Error(
      `Проверьте frontmatter в статье "${slug}.md": обязательны title, date, excerpt, metaTitle, metaDescription.`
    );
  }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(BLOG_DIR, fileName);
    const rawFile = fs.readFileSync(fullPath, "utf8");
    const { data, content } = parseFrontmatter(rawFile);
    const frontmatter = data as BlogFrontmatter;

    validateFrontmatter(frontmatter, slug);

    return {
      slug,
      title: frontmatter.title!,
      date: frontmatter.date!,
      excerpt: frontmatter.excerpt!,
      metaTitle: frontmatter.metaTitle!,
      metaDescription: frontmatter.metaDescription!,
      content: content.trim(),
      pinned: frontmatter.pinned === "true",
      tags: parseTags(frontmatter.tags),
    };
  });

  return posts.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getAllBlogTags(): BlogTagEntry[] {
  const tagMap = new Map<string, BlogTagEntry>();

  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase();
      const existing = tagMap.get(key);

      if (existing) {
        existing.count += 1;
        continue;
      }

      tagMap.set(key, {
        tag,
        slug: tagToSlug(tag),
        count: 1,
      });
    }
  }

  return Array.from(tagMap.values()).sort((a, b) =>
    a.tag.localeCompare(b.tag, "ru")
  );
}

export function getBlogTagBySlug(tagSlug: string): BlogTagEntry | undefined {
  return getAllBlogTags().find((entry) => entry.slug === tagSlug);
}

export function getBlogPostsByTagSlug(tagSlug: string): BlogPost[] {
  const tagEntry = getBlogTagBySlug(tagSlug);

  if (!tagEntry) {
    return [];
  }

  const tagKey = tagEntry.tag.toLowerCase();

  return getAllBlogPosts().filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === tagKey)
  );
}
