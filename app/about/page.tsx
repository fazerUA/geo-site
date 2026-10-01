import Link from "next/link";
import SiteTopNav from "@/components/landing/site-top-nav";
import { JsonLdScript } from "@/components/schema/json-ld-script";
import { aboutPageContent } from "@/content/about/page-content";
import { buildPersonSchemaForMember } from "@/lib/schema/site-schema";
import { buildPageMetadata } from "@/lib/seo/metadata-helpers";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb-schema";
import { BlogBreadcrumbs } from "@/components/blog/blog-breadcrumbs";
import { SpecialistContacts } from "@/components/about/specialist-contacts";
import { SpecialistPhoto } from "@/components/about/specialist-photo";
import { SITE_URL } from "@/content/site/organization";

export const metadata = buildPageMetadata({
  title: aboutPageContent.metaTitle,
  description: aboutPageContent.metaDescription,
  path: "/about/",
});

function specialistSchemaDescription(
  specialist: (typeof aboutPageContent.specialists)[number]
): string {
  if (specialist.intro) {
    return specialist.intro.split("\n\n")[0];
  }

  return specialist.highlights.join(". ");
}

function specialistSameAs(specialist: (typeof aboutPageContent.specialists)[number]) {
  const messengerLinks = specialist.messengers.flatMap((messenger) =>
    messenger.links.map((link) => link.href)
  );

  return [...(specialist.sameAs ?? []), ...messengerLinks];
}

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Главная", path: "/" },
    { name: "О команде", path: "/about/" },
  ];

  return (
    <main className="blog-main px-4 py-10 sm:px-6 lg:px-8">
      <JsonLdScript
        data={[
          ...aboutPageContent.specialists.map((specialist) =>
            buildPersonSchemaForMember({
              name: specialist.name,
              jobTitle: specialist.role,
              description: specialistSchemaDescription(specialist),
              id: specialist.id,
              sameAs: specialistSameAs(specialist),
              knowsAbout: specialist.knowsAbout,
              image: `${SITE_URL}${specialist.photo}`,
            })
          ),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <div className="mx-auto max-w-7xl">
        <SiteTopNav />
        <div className="mx-auto max-w-3xl">
          <BlogBreadcrumbs items={breadcrumbs} />

          <p className="blog-eyebrow text-xs uppercase tracking-[0.28em]">
            {aboutPageContent.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            {aboutPageContent.pageHeading}
          </h1>
          <p className="blog-lead mt-6 text-base leading-8">{aboutPageContent.pageIntro}</p>

          <div className="mt-12 space-y-8">
            {aboutPageContent.specialists.map((specialist) => (
              <section
                key={specialist.id}
                aria-labelledby={`specialist-${specialist.id}`}
                className="about-specialist-card"
              >
                <div className="about-specialist-header">
                  <SpecialistPhoto
                    src={specialist.photo}
                    alt={specialist.photoAlt ?? specialist.name}
                  />
                  <div className="about-specialist-intro">
                    <h2
                      id={`specialist-${specialist.id}`}
                      className="font-serif text-3xl font-semibold"
                    >
                      {specialist.name}
                    </h2>
                    <p className="blog-lead mt-3 text-lg">{specialist.role}</p>
                    <SpecialistContacts messengers={specialist.messengers} />
                  </div>
                </div>

                {specialist.intro ? (
                  <div className="blog-lead mt-6 space-y-4 text-base leading-8">
                    {specialist.intro.split("\n\n").map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                <ul className="mt-6 space-y-3">
                  {specialist.highlights.map((item) => (
                    <li
                      key={item}
                      className="blog-lead flex items-start gap-3 text-sm leading-7"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#d9b06f]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <h3 className="font-serif text-2xl font-semibold">{specialist.focusTitle}</h3>
                  <div className="mt-6 space-y-4">
                    {specialist.focusItems.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[24px] border border-[var(--blog-card-border)] bg-[var(--blog-card-bg)] p-5"
                      >
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="blog-lead mt-2 text-sm leading-7">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <p className="blog-lead mt-12 text-sm leading-7">{aboutPageContent.legalNote}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={aboutPageContent.ctaHref} className="blog-ghost-link">
              {aboutPageContent.ctaLabel}
            </Link>
            <Link href="/blog/" className="blog-ghost-link">
              {aboutPageContent.blogLabel}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
