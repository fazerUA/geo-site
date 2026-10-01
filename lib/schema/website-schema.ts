import { SITE_URL } from "@/content/site/organization";

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "GEO+SEO от Art-Web.ru",
    description:
      "Продвижение бизнеса и сайтов в классическом поиске и нейросетях: SEO, GEO, контент, AI-цитируемость.",
    inLanguage: "ru-RU",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog/tag/{search_term_string}/`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
