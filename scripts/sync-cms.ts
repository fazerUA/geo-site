import fs from "node:fs";

import { casesItems } from "@/content/landing/cases-items";
import { faqItems } from "@/content/landing/faq-items";
import { pricingPlans } from "@/content/landing/pricing-plans";
import { getAllBlogPostsFromFiles } from "@/lib/blog/file-posts";
import { CMS_DATA_DIR, cmsDataPath } from "@/lib/cms/paths";
import { fetchCmsSnapshotFromDirectus } from "@/lib/cms/sync-from-directus";
import type { CmsSnapshot } from "@/lib/cms/types";
import { writeLandingSnapshotModule } from "@/lib/cms/write-landing-module";

function writeSnapshot(snapshot: CmsSnapshot): void {
  fs.mkdirSync(CMS_DATA_DIR, { recursive: true });
  fs.writeFileSync(cmsDataPath("snapshot.json"), `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  writeLandingSnapshotModule({
    pricingPlans: snapshot.pricingPlans,
    faqItems: snapshot.faqItems,
    caseItems: snapshot.caseItems,
  });
}

function snapshotFromFiles(): CmsSnapshot {
  return JSON.parse(
    JSON.stringify({
      syncedAt: new Date().toISOString(),
      source: "files",
      blogPosts: getAllBlogPostsFromFiles(),
      pricingPlans,
      faqItems,
      caseItems: casesItems,
    })
  ) as CmsSnapshot;
}

async function main(): Promise<void> {
  const fromDirectus = await fetchCmsSnapshotFromDirectus();

  if (fromDirectus) {
    writeSnapshot(fromDirectus);
    console.log(
      `[cms:sync] Directus → snapshot (${fromDirectus.blogPosts.length} posts, ${fromDirectus.pricingPlans.length} plans)`
    );
    return;
  }

  const fromFiles = snapshotFromFiles();
  writeSnapshot(fromFiles);
  console.log(
    `[cms:sync] No DIRECTUS_URL/TOKEN — snapshot from repo files (${fromFiles.blogPosts.length} posts)`
  );
}

main().catch((error) => {
  console.error("[cms:sync] failed:", error);
  process.exit(1);
});
