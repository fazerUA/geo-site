import type { BlogPost } from "@/lib/blog";
import { normalizeBlogTag } from "@/lib/blog";

import {
  directusAssetUrl,
  directusGet,
  getDirectusConfig,
  type DirectusListResponse,
} from "./directus-client";
import type { CmsCaseItem, CmsFaqItem, CmsPricingPlan, CmsSnapshot } from "./types";

type DirectusBlogPost = {
  slug: string;
  title: string;
  date: string;
  date_modified?: string | null;
  excerpt: string;
  meta_title?: string | null;
  meta_description?: string | null;
  content: string;
  pinned?: boolean | null;
  tags?: string[] | null;
  image?: string | { id?: string } | null;
  author: string;
  sources?: { title: string; url: string }[] | null;
  status: string;
};

type DirectusPricingPlan = {
  sort?: number | null;
  name: string;
  price: string;
  price_value: number;
  label: string;
  featured?: boolean | null;
  features?: string[] | null;
  status: string;
};

type DirectusFaqItem = {
  sort?: number | null;
  q: string;
  a: string;
  status: string;
};

type DirectusCaseItem = {
  sort?: number | null;
  title: string;
  niche: string;
  result: string;
  text: string;
  project_url?: string | null;
  modal_images?: string[] | null;
  status: string;
};

function resolveImageField(
  image: DirectusBlogPost["image"]
): string | undefined {
  if (!image) {
    return undefined;
  }

  if (typeof image === "string") {
    return directusAssetUrl(image) ?? image;
  }

  if (image.id) {
    return directusAssetUrl(image.id);
  }

  return undefined;
}

function mapBlogPost(row: DirectusBlogPost): BlogPost {
  const tags = (row.tags ?? [])
    .map((tag) => normalizeBlogTag(String(tag)))
    .filter(Boolean);

  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    dateModified: row.date_modified || row.date,
    excerpt: row.excerpt,
    metaTitle: row.meta_title?.trim() || row.title,
    metaDescription: row.meta_description?.trim() || row.excerpt,
    content: row.content.trim(),
    pinned: Boolean(row.pinned),
    tags,
    image: resolveImageField(row.image),
    author: row.author,
    sources: (row.sources ?? []).filter((s) => s?.url?.startsWith("http")),
  };
}

function sortBySortField<T extends { sort?: number | null }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

export async function fetchCmsSnapshotFromDirectus(): Promise<CmsSnapshot | null> {
  if (!getDirectusConfig()) {
    return null;
  }

  const publishedFilter = {
    filter: JSON.stringify({ status: { _eq: "published" } }),
    sort: "sort",
    limit: "-1",
  };

  const [blogRes, pricingRes, faqRes, casesRes] = await Promise.all([
    directusGet<DirectusListResponse<DirectusBlogPost>>("/items/blog_posts", {
      ...publishedFilter,
      sort: "-pinned,date",
      fields:
        "slug,title,date,date_modified,excerpt,meta_title,meta_description,content,pinned,tags,image,author,sources,status",
    }),
    directusGet<DirectusListResponse<DirectusPricingPlan>>("/items/pricing_plans", {
      ...publishedFilter,
      fields: "sort,name,price,price_value,label,featured,features,status",
    }),
    directusGet<DirectusListResponse<DirectusFaqItem>>("/items/faq_items", {
      ...publishedFilter,
      fields: "sort,q,a,status",
    }),
    directusGet<DirectusListResponse<DirectusCaseItem>>("/items/case_items", {
      ...publishedFilter,
      fields: "sort,title,niche,result,text,project_url,modal_images,status",
    }),
  ]);

  const blogPosts = blogRes.data.map(mapBlogPost).sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const pricingPlans: CmsPricingPlan[] = sortBySortField(pricingRes.data).map((row) => ({
    name: row.name,
    price: row.price,
    priceValue: row.price_value,
    label: row.label,
    featured: Boolean(row.featured),
    features: row.features ?? [],
  }));

  const faqItems: CmsFaqItem[] = sortBySortField(faqRes.data).map((row) => ({
    q: row.q,
    a: row.a,
  }));

  const caseItems: CmsCaseItem[] = sortBySortField(casesRes.data).map((row) => ({
    title: row.title,
    niche: row.niche,
    result: row.result,
    text: row.text,
    projectUrl: row.project_url ?? undefined,
    modalImages: row.modal_images ?? undefined,
  }));

  return {
    syncedAt: new Date().toISOString(),
    source: "directus",
    blogPosts,
    pricingPlans,
    faqItems,
    caseItems,
  };
}
