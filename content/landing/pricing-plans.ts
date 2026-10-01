import source from "@/content/cms/pricing-plans.json";
import { normalizeDecapStringList } from "@/lib/cms/normalize-decap-string-list";

export const pricingPlans = source.pricingPlans.map((plan) => ({
  ...plan,
  features: normalizeDecapStringList(plan.features),
}));
