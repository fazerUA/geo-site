import type { Metadata } from "next";
import Link from "next/link";
import SiteTopNav from "@/components/landing/site-top-nav";
import { privacyPageContent } from "@/content/legal/privacy-content";
import { buildPageMetadata } from "@/lib/seo/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  title: privacyPageContent.metaTitle,
  description: privacyPageContent.metaDescription,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <main className="blog-main px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
        <div className="mx-auto max-w-3xl">
          <p className="blog-eyebrow text-xs uppercase tracking-[0.28em]">
            {privacyPageContent.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            {privacyPageContent.heading}
          </h1>
          <p className="blog-post-meta mt-4 text-xs uppercase tracking-[0.2em]">
            Обновлено {privacyPageContent.updatedAt}
          </p>

          <div className="blog-prose mt-8 space-y-8">
            {privacyPageContent.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-2xl font-semibold">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="blog-lead mt-3 text-sm leading-7">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/" className="blog-ghost-link">
              На главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
