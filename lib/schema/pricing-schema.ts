import { pricingPlans } from "@/lib/content/landing";
import { SITE_URL } from "@/content/site/organization";

export function buildPricingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#pricing`,
    name: "Тарифы на продвижение",
    description:
      "Выберите подходящий формат сотрудничества для роста заявок и выручки.",
    itemListElement: pricingPlans.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: plan.name,
        description: plan.features.join(". "),
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: plan.price.toLowerCase().includes("индивидуально")
            ? "0"
            : String(plan.priceValue || "0"),
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        },
      },
    })),
  };
}
