import fs from "node:fs";
import path from "node:path";

import type { CmsCaseItem, CmsFaqItem, CmsPricingPlan } from "./types";

const LANDING_MODULE = path.join(process.cwd(), "lib", "generated", "landing.snapshot.ts");

export function writeLandingSnapshotModule(input: {
  pricingPlans: CmsPricingPlan[];
  faqItems: CmsFaqItem[];
  caseItems: CmsCaseItem[];
}): void {
  const body = `/** Автогенерация: npm run cms:sync. Не правьте вручную. */
import type { CaseItem } from "@/content/landing/cases-items";

export const pricingPlans = ${JSON.stringify(input.pricingPlans, null, 2)};

export const faqItems = ${JSON.stringify(input.faqItems, null, 2)};

export const casesItems: CaseItem[] = ${JSON.stringify(input.caseItems, null, 2)};
`;

  fs.mkdirSync(path.dirname(LANDING_MODULE), { recursive: true });
  fs.writeFileSync(LANDING_MODULE, body, "utf8");
}
