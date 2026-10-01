import fs from "node:fs";

import type { BlogPost } from "@/lib/blog";
import { getAllBlogPostsFromFiles } from "@/lib/blog/file-posts";

import { cmsDataPath } from "./paths";

function readBlogPostsFromSnapshot(): BlogPost[] | null {
  const snapshotPath = cmsDataPath("snapshot.json");
  if (!fs.existsSync(snapshotPath)) {
    return null;
  }

  try {
    const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8")) as {
      blogPosts?: BlogPost[];
    };

    if (snapshot.blogPosts?.length) {
      return snapshot.blogPosts;
    }
  } catch {
    return null;
  }

  return null;
}

/** Только для серверной сборки (blog, sitemap, llms). */
export function loadBlogPosts(): BlogPost[] {
  return readBlogPostsFromSnapshot() ?? getAllBlogPostsFromFiles();
}
