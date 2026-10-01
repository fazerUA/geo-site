import { createBlogPostInteractive } from "@/lib/blog/create-post";

createBlogPostInteractive().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
