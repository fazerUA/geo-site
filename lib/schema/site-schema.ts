import { organizationContent, SITE_URL } from "@/content/site/organization";
import { getBlogAuthor, siteFounder } from "@/content/site/author";
import type { BlogPost } from "@/lib/blog";

export const BLOG_SCHEMA_ID = `${SITE_URL}/blog/#blog`;

function resolveAbsoluteAsset(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function estimateWordCount(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>|`-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) {
    return 0;
  }

  return plain.split(/\s+/).filter(Boolean).length;
}

export function buildBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_SCHEMA_ID,
    name: "Блог GEO+SEO Art-Web",
    description:
      "Статьи, кейсы и руководства по SEO, GEO и продвижению в нейросетях и AI-поиске.",
    url: `${SITE_URL}/blog/`,
    inLanguage: "ru-RU",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: organizationContent.brandName,
    legalName: organizationContent.legalName,
    description: organizationContent.description,
    url: organizationContent.url,
    logo: organizationContent.logo,
    image: organizationContent.logo,
    email: organizationContent.email.join(", "),
    taxID: organizationContent.taxId,
    areaServed: organizationContent.areaServed,
    sameAs: organizationContent.sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: organizationContent.address.streetAddress,
      addressLocality: organizationContent.address.addressLocality,
      addressRegion: organizationContent.address.addressRegion,
      postalCode: organizationContent.address.postalCode,
      addressCountry: organizationContent.address.addressCountry,
    },
    founder: {
      "@type": "Person",
      "@id": siteFounder.url,
      name: siteFounder.name,
      jobTitle: siteFounder.jobTitle,
      url: siteFounder.url,
      sameAs: siteFounder.sameAs,
      knowsAbout: siteFounder.knowsAbout,
    },
  };
}

export function buildPersonSchemaForMember(input: {
  name: string;
  jobTitle: string;
  description: string;
  id: string;
  sameAs?: string[];
  knowsAbout?: string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about/#${input.id}`,
    name: input.name,
    jobTitle: input.jobTitle,
    url: `${SITE_URL}/about/#${input.id}`,
    worksFor: {
      "@id": `${SITE_URL}/#organization`,
    },
    description: input.description,
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
    ...(input.knowsAbout?.length ? { knowsAbout: input.knowsAbout } : {}),
    ...(input.image ? { image: input.image } : {}),
  };
}

export function buildBlogPostingSchema(post: BlogPost) {
  const authorProfile = getBlogAuthor(post.author);
  const url = `${SITE_URL}/blog/${post.slug}/`;
  const image = post.image ? resolveAbsoluteAsset(post.image) : undefined;
  const wordCount = estimateWordCount(post.content);
  const founderExtras =
    authorProfile.name === siteFounder.name
      ? {
          sameAs: siteFounder.sameAs,
          knowsAbout: siteFounder.knowsAbout,
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: post.title,
    description: post.metaDescription,
    abstract: post.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: {
      "@id": BLOG_SCHEMA_ID,
    },
    author: {
      "@type": "Person",
      "@id": authorProfile.url,
      name: authorProfile.name,
      url: authorProfile.url,
      jobTitle: authorProfile.jobTitle,
      image: resolveAbsoluteAsset(authorProfile.photo),
      ...founderExtras,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    ...(image ? { image: [image] } : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
    ...(wordCount > 0 ? { wordCount } : {}),
    ...(post.sources.length > 0
      ? {
          citation: post.sources.map((source) => ({
            "@type": "WebPage",
            name: source.title,
            url: source.url,
          })),
        }
      : {}),
    articleSection: "Блог",
    inLanguage: "ru-RU",
  };
}
