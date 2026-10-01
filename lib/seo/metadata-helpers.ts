import type { Metadata } from "next";
import { SITE_URL } from "@/content/site/organization";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/img/original.webp`;

export function resolveAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: PageMetaInput): Metadata {
  const url = resolveAbsoluteUrl(path);
  const imageUrl = resolveAbsoluteUrl(image);
  const isArticle = type === "article";

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "GEO+SEO от Art-Web.ru",
      locale: "ru_RU",
      type,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
      ...(isArticle && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
