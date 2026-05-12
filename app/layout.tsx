import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import InsertUserMetrika from "@/components/analytics/insert-user-metrika";
import { SiteThemeProvider } from "@/components/site-theme-provider";

export const metadata: Metadata = {
  title: "SEO / GEO Growth Studio",
  description: "Premium landing page for SEO and GEO services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="geo-site-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('geo-site-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`}
        </Script>
        <SiteThemeProvider>{children}</SiteThemeProvider>
        <InsertUserMetrika />
      </body>
    </html>
  );
}
