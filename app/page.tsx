import BashLanding from "@/components/landing/bash-landing";
import { homePageContent } from "@/content/home/page-content";
import { JsonLdScript } from "@/components/schema/json-ld-script";
import { buildCasesSchema } from "@/lib/schema/cases-schema";
import { buildFaqPageSchema } from "@/lib/schema/faq-schema";
import { buildPricingSchema } from "@/lib/schema/pricing-schema";
import { buildPageMetadata } from "@/lib/seo/metadata-helpers";

export const metadata = buildPageMetadata({
  title: homePageContent.metaTitle,
  description: homePageContent.metaDescription,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLdScript
        data={[buildFaqPageSchema(), buildPricingSchema(), buildCasesSchema()]}
      />
      <BashLanding />
    </>
  );
}
