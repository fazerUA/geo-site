import source from "@/content/cms/cases-items.json";
import { normalizeDecapStringList } from "@/lib/cms/normalize-decap-string-list";

export type CaseItem = {
  title: string;
  niche: string;
  result: string;
  text: string;
  projectUrl?: string;
  modalImages?: string[];
};

export const casesItems: CaseItem[] = source.casesItems.map((item) => {
  const modalImages = normalizeDecapStringList(item.modalImages);
  return {
    ...item,
    ...(modalImages.length > 0 ? { modalImages } : {}),
  };
});
