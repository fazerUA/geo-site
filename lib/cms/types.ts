import type { BlogPost } from "@/lib/blog";

export type CmsPricingPlan = {
  name: string;
  price: string;
  priceValue: number;
  label: string;
  featured: boolean;
  features: string[];
};

export type CmsFaqItem = {
  q: string;
  a: string;
};

export type CmsCaseItem = {
  title: string;
  niche: string;
  result: string;
  text: string;
  projectUrl?: string;
  modalImages?: string[];
};

export type CmsSnapshot = {
  syncedAt: string;
  source: "directus" | "files";
  blogPosts: BlogPost[];
  pricingPlans: CmsPricingPlan[];
  faqItems: CmsFaqItem[];
  caseItems: CmsCaseItem[];
};
