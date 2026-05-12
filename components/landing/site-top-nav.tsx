"use client";

import Link from "next/link";
import { Moon, Sun, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteTheme } from "@/components/site-theme-provider";

const nav = [
  { label: "SEO", href: "/#seo" },
  { label: "GEO", href: "/#geo" },
  { label: "Кейсы", href: "/#cases" },
  { label: "Блог", href: "/blog" },
  { label: "Тарифы", href: "/#pricing" },
  { label: "Вопросы", href: "/#faq" },
  { label: "Контакты", href: "/#contact" },
];

export default function SiteTopNav() {
  const { isDark, toggleTheme } = useSiteTheme();

  const shell = isDark
    ? "rounded-3xl border border-[#3a2d1b] bg-[#16120f]/88 px-5 py-4 shadow-[0_12px_40px_rgba(65,45,20,0.10)] backdrop-blur"
    : "rounded-3xl border border-[#c9b892] bg-[#fbf8ef]/90 px-5 py-4 shadow-[0_12px_40px_rgba(65,45,20,0.10)] backdrop-blur";

  const shellText = isDark ? "text-[#d8c3a0]" : "text-[#6d583a]";
  const brandTitle = isDark ? "text-[#f7eedf]" : "text-[#201910]";
  const navLink = isDark
    ? "rounded-full px-3 py-2 text-[#c5b295] transition hover:bg-white/5 hover:text-white"
    : "rounded-full px-3 py-2 text-[#574431] transition hover:bg-black/[0.06] hover:text-[#201910]";

  const themeButton = isDark
    ? "h-12 rounded-full border border-[#f6e5bf] bg-[linear-gradient(135deg,#fdf0cd_0%,#f2d79d_45%,#d9af68_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#24180c] shadow-[0_10px_30px_rgba(222,173,96,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(222,173,96,0.48)] active:translate-y-0"
    : "h-12 rounded-full border border-[#2a2016] bg-[linear-gradient(135deg,#2a2016_0%,#3a2b19_48%,#5b4020_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#fbf7ee] shadow-[0_10px_24px_rgba(41,30,18,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(41,30,18,0.34)] active:translate-y-0";

  return (
    <header className="sticky top-4 z-40 mb-8">
      <div className={shell}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#b79a67] bg-[#efe1b8] shadow-inner">
              <TerminalSquare className="h-5 w-5 text-[#5b4424]" />
            </div>

            <div>
              <div className={`text-xs uppercase tracking-[0.28em] ${shellText}`}>
                продвижение в поиске и нейросетях
              </div>
              <div className={`font-serif text-2xl font-semibold ${brandTitle}`}>
                GEO+SEO от Art-Web.ru
              </div>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 text-sm">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className={navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:justify-end">
            <Button variant="default" onClick={toggleTheme} className={themeButton}>
              {isDark ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              {isDark ? "Светлая тема" : "Тёмная тема"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
