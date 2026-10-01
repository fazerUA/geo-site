import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import InsertUserMetrika from "@/components/analytics/insert-user-metrika";
import { SiteThemeProvider } from "@/components/site-theme-provider";
import { JsonLdScript } from "@/components/schema/json-ld-script";
import { homePageContent } from "@/content/home/page-content";
import { SITE_URL } from "@/content/site/organization";
import { buildOrganizationSchema } from "@/lib/schema/site-schema";
import { buildWebsiteSchema } from "@/lib/schema/website-schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homePageContent.metaTitle,
    template: "%s | GEO+SEO от Art-Web.ru",
  },
  description: homePageContent.metaDescription,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "GEO+SEO от Art-Web.ru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLdScript data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
        <Script id="geo-site-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('geo-site-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`}
        </Script>
        <SiteThemeProvider>{children}</SiteThemeProvider>
        <InsertUserMetrika />
      </body>
    </html>
  );
}
