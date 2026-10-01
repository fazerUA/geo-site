/**
 * Однократный импорт контента из репозитория в Directus.
 * DIRECTUS_URL + DIRECTUS_TOKEN (роль с правами create/update на коллекции).
 *
 * npx tsx scripts/migrate-to-directus.ts
 */
import { casesItems } from "@/content/landing/cases-items";
import { faqItems } from "@/content/landing/faq-items";
import { pricingPlans } from "@/content/landing/pricing-plans";
import { getAllBlogPostsFromFiles } from "@/lib/blog/file-posts";
import { getDirectusConfig } from "@/lib/cms/directus-client";

async function directusPost(path: string, body: unknown): Promise<void> {
  const config = getDirectusConfig();
  if (!config) {
    throw new Error("Set DIRECTUS_URL and DIRECTUS_TOKEN");
  }

  const response = await fetch(`${config.url}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`POST ${path} → ${response.status}: ${text.slice(0, 400)}`);
  }
}

async function upsertBySlug(
  collection: string,
  slug: string,
  payload: Record<string, unknown>
): Promise<void> {
  const config = getDirectusConfig();
  if (!config) {
    return;
  }

  const search = new URLSearchParams({
    filter: JSON.stringify({ slug: { _eq: slug } }),
    limit: "1",
    fields: "id",
  });

  const existing = await fetch(`${config.url}/items/${collection}?${search}`, {
    headers: { Authorization: `Bearer ${config.token}` },
  });

  if (!existing.ok) {
    throw new Error(`Lookup ${collection}/${slug}: ${existing.status}`);
  }

  const json = (await existing.json()) as { data: { id: number }[] };

  if (json.data[0]?.id) {
    const id = json.data[0].id;
    const patch = await fetch(`${config.url}/items/${collection}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!patch.ok) {
      throw new Error(`PATCH ${collection}/${id}: ${patch.status}`);
    }

    console.log(`  updated ${collection}: ${slug}`);
    return;
  }

  await directusPost(`/items/${collection}`, payload);
  console.log(`  created ${collection}: ${slug}`);
}

async function main(): Promise<void> {
  if (!getDirectusConfig()) {
    throw new Error("DIRECTUS_URL and DIRECTUS_TOKEN required");
  }

  console.log("Importing blog posts…");
  const posts = getAllBlogPostsFromFiles();
  for (const post of posts) {
    await upsertBySlug("blog_posts", post.slug, {
      status: "published",
      slug: post.slug,
      title: post.title,
      date: post.date,
      date_modified: post.dateModified,
      excerpt: post.excerpt,
      meta_title: post.metaTitle,
      meta_description: post.metaDescription,
      content: post.content,
      pinned: post.pinned,
      tags: post.tags,
      author: post.author,
      sources: post.sources,
    });
  }

  console.log("Importing pricing…");
  for (let i = 0; i < pricingPlans.length; i++) {
    const plan = pricingPlans[i];
    const slug = plan.name.toLowerCase().replace(/\s+/g, "-");
    await upsertBySlug("pricing_plans", slug, {
      status: "published",
      slug,
      sort: i + 1,
      name: plan.name,
      price: plan.price,
      price_value: plan.priceValue,
      label: plan.label,
      featured: plan.featured,
      features: plan.features,
    });
  }

  console.log("Importing FAQ…");
  for (let i = 0; i < faqItems.length; i++) {
    const item = faqItems[i];
    const slug = `faq-${i + 1}`;
    await upsertBySlug("faq_items", slug, {
      status: "published",
      slug,
      sort: i + 1,
      q: item.q,
      a: item.a,
    });
  }

  console.log("Importing cases…");
  for (let i = 0; i < casesItems.length; i++) {
    const item = casesItems[i];
    const slug = `case-${i + 1}`;
    await upsertBySlug("case_items", slug, {
      status: "published",
      slug,
      sort: i + 1,
      title: item.title,
      niche: item.niche,
      result: item.result,
      text: item.text,
      project_url: item.projectUrl ?? null,
      modal_images: item.modalImages ?? null,
    });
  }

  console.log("Migration finished.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
