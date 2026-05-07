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
};

type BlogFrontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}
