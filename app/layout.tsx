import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
