import fs from "node:fs";
import path from "node:path";

import { defaultBlogAuthor } from "@/content/site/author";

export type ResolvedFrontmatter = {
  title: string;
  date: string;
  updated?: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  pinned: boolean;
  tags: string;
  image?: string;
  author: string;
  sources?: string;
};

export type BlogFrontmatterInput = {
  title?: string;
  date?: string;
  updated?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  pinned?: string;
  tags?: string;
  image?: string;
  author?: string;
  sources?: string;
};

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export function formatIsoDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function slugifyTitle(title: string): string {
  const transliterated = title
    .trim()
    .toLowerCase()
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("");

  const slug = transliterated
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "post";
}

function getFileDateIso(filePath: string): string | undefined {
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const { mtime } = fs.statSync(filePath);
  return formatIsoDate(mtime);
}

export function resolveFrontmatter(
  data: BlogFrontmatterInput,
  slug: string,
  filePath?: string
): ResolvedFrontmatter {
  const title = data.title?.trim();
  if (!title) {
    throw new Error(
      `Проверьте frontmatter в статье "${slug}.md": обязательно поле title.`
    );
  }

  const excerpt = data.excerpt?.trim() || title;
  const date =
    data.date?.trim() ||
    (filePath ? getFileDateIso(filePath) : undefined) ||
    formatIsoDate();

  const updated = data.updated?.trim() || undefined;

  return {
    title,
    date,
    updated,
    excerpt,
    metaTitle: data.metaTitle?.trim() || title,
    metaDescription: data.metaDescription?.trim() || excerpt,
    pinned: data.pinned === "true",
    tags: data.tags?.trim() || "",
    image: data.image?.trim() || undefined,
    author: data.author?.trim() || defaultBlogAuthor.name,
    sources: data.sources?.trim() || undefined,
  };
}

export function escapeYamlValue(value: string): string {
  if (/[:#\n"'&<>]|^\s|\s$/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }

  return value;
}

export function normalizeImagePath(filename: string): string | undefined {
  const value = filename.trim().replace(/^["']|["']$/g, "");
  if (!value) {
    return undefined;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/img/")) {
    return value;
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (value.startsWith("img/")) {
    return `/${value}`;
  }

  return `/img/${value.replace(/^\/+/, "")}`;
}

/** Путь обложки по slug — используется при генерации картинки после текста статьи. */
export function suggestPostCoverPath(slug: string): string {
  return `/img/${slug}.webp`;
}

export function buildPostFileContent(input: {
  title: string;
  excerpt: string;
  date?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags: string;
  author: string;
  imageFilename?: string;
  sources: string;
  body?: string;
}): string {
  const imagePath = normalizeImagePath(input.imageFilename || "");

  const resolved = resolveFrontmatter(
    {
      title: input.title,
      excerpt: input.excerpt,
      date: input.date,
      metaTitle: input.metaTitle,
      metaDescription: input.metaDescription,
      tags: input.tags,
      author: input.author,
      image: imagePath,
      sources: input.sources,
    },
    "draft"
  );

  const lines = [
    "---",
    `title: ${escapeYamlValue(resolved.title)}`,
    `date: ${escapeYamlValue(resolved.date)}`,
    `excerpt: ${escapeYamlValue(resolved.excerpt)}`,
    `metaTitle: ${escapeYamlValue(resolved.metaTitle)}`,
    `metaDescription: ${escapeYamlValue(resolved.metaDescription)}`,
    `tags: ${resolved.tags}`,
    `author: ${escapeYamlValue(resolved.author)}`,
    `sources: ${resolved.sources}`,
  ];

  if (resolved.image) {
    lines.push(`image: ${escapeYamlValue(resolved.image)}`);
  }

  lines.push("---", "");

  if (resolved.image) {
    lines.push(`![](${resolved.image})`, "");
  }

  const body = input.body?.trim();
  lines.push(body || "Текст статьи…", "");

  return lines.join("\n");
}

export function pickUniqueSlug(baseSlug: string, blogDir: string): string {
  let slug = baseSlug;
  let index = 2;

  while (fs.existsSync(path.join(blogDir, `${slug}.md`))) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  return slug;
}
