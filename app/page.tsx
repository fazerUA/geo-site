import BashLanding from "@/components/landing/bash-landing";
import type { Metadata } from "next";
import { homePageContent } from "@/content/home/page-content";

export const metadata: Metadata = {
  title: homePageContent.metaTitle,
  description: homePageContent.metaDescription,
};

export default function Page() {
  return <BashLanding />;
}
