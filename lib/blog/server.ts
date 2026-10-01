import { loadBlogPosts } from "@/lib/cms/load-data";

import type { BlogPost, BlogTagEntry } from "@/lib/blog";
import { tagToSlug } from "@/lib/blog";

export function getAllBlogPosts(): BlogPost[] {
  return loadBlogPosts();
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

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) {
    return [];
  }

  const candidates = getAllBlogPosts().filter((post) => post.slug !== currentSlug);
  const currentTags = new Set(current.tags.map((tag) => tag.toLowerCase()));

  const scored = candidates
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => currentTags.has(tag.toLowerCase())).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    });

  const related = scored.filter((entry) => entry.score > 0).map((entry) => entry.post);

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const used = new Set(related.map((post) => post.slug));
  for (const post of candidates) {
    if (related.length >= limit) {
      break;
    }

    if (!used.has(post.slug)) {
      related.push(post);
      used.add(post.slug);
    }
  }

  return related.slice(0, limit);
}
