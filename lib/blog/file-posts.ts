import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import {
  formatIsoDate,
  resolveFrontmatter,
  type BlogFrontmatterInput,
} from "@/lib/blog/frontmatter-helpers";
import type { BlogPost, BlogSource } from "@/lib/blog";

type BlogFrontmatter = BlogFrontmatterInput;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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
    .map((part) => part.trim().replace(/^#+/, ""))
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

function parseSources(raw?: string): BlogSource[] {
  if (!raw?.trim()) {
    return [];
  }

  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((entry) => {
      const [title, url] = entry.split("|").map((piece) => piece.trim());
      if (title && url) {
        return { title, url };
      }

      return { title: url || title, url: url || title };
    })
    .filter((source) => source.url.startsWith("http"));
}

function frontmatterValueToString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (value instanceof Date) {
    return formatIsoDate(value);
  }

  return String(value);
}

function parseFrontmatter(rawFile: string): { data: BlogFrontmatter; content: string } {
  const { data: rawData, content } = matter(rawFile.replace(/\r\n/g, "\n"));
  const data: BlogFrontmatter = {};

  for (const [key, value] of Object.entries(rawData)) {
    const normalized = frontmatterValueToString(value);
    if (normalized !== undefined) {
      data[key as keyof BlogFrontmatter] = normalized;
    }
  }

  return { data, content: content.trim() };
}

function stripReadAlsoSection(content: string): string {
  return content.replace(/\n##\s*Читайте также[\s\S]*$/iu, "").trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeBlogContent(content: string, title: string): string {
  let result = content.trim();
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    return result;
  }

  const titlePattern = new RegExp(
    `^#\\s+${escapeRegExp(normalizedTitle)}\\s*(?:\\n|$)`,
    "u"
  );
  result = result.replace(titlePattern, "").trimStart();

  const coverAltPattern = new RegExp(
    `!\\[${escapeRegExp(normalizedTitle)}\\]\\(([^)]+)\\)`,
    "gu"
  );
  result = result.replace(coverAltPattern, "![]($1)");

  return result;
}

function resolvePostImage(input: { image?: string; content: string }): string | undefined {
  const fromFrontmatter = input.image?.trim();
  if (fromFrontmatter) {
    return fromFrontmatter;
  }

  const markdownImage = input.content.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  if (markdownImage?.[1]) {
    return markdownImage[1];
  }

  const htmlImage = input.content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return htmlImage?.[1];
}

export function getAllBlogPostsFromFiles(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(BLOG_DIR, fileName);
    const rawFile = fs.readFileSync(fullPath, "utf8");
    const { data, content: rawContent } = parseFrontmatter(rawFile);
    const frontmatter = data as BlogFrontmatter;

    const resolved = resolveFrontmatter(frontmatter, slug, fullPath);
    const content = normalizeBlogContent(
      stripReadAlsoSection(rawContent.trim()),
      resolved.title
    );

    return {
      slug,
      title: resolved.title,
      date: resolved.date,
      dateModified: resolved.updated || resolved.date,
      excerpt: resolved.excerpt,
      metaTitle: resolved.metaTitle,
      metaDescription: resolved.metaDescription,
      content,
      pinned: resolved.pinned,
      tags: parseTags(resolved.tags),
      image: resolvePostImage({ image: resolved.image, content }),
      author: resolved.author,
      sources: parseSources(resolved.sources),
    };
  });

  return posts.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
