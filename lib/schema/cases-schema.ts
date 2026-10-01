import { casesItems } from "@/content/landing/cases-items";
import { SITE_URL } from "@/content/site/organization";

export function buildCasesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#cases`,
    name: "Примеры наших проектов",
    description: "Реальные результаты наших клиентов: задачи, решения и измеримые цифры.",
    itemListElement: casesItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: item.title,
        description: item.text,
        articleSection: "Кейс",
        keywords: ["продвижение сайта", "SEO", "GEO", "результаты клиентов"],
        about: {
          "@type": "Thing",
          name: item.niche,
        },
      },
    })),
  };
}
