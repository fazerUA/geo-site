import Link from "next/link";
import { TerminalSquare } from "lucide-react";

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
  return (
    <header className="sticky top-4 z-40 mb-8">
      <div className="rounded-3xl border border-[#3a2d1b] bg-[#16120f]/88 px-5 py-4 shadow-[0_12px_40px_rgba(65,45,20,0.10)] backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#b79a67] bg-[#efe1b8] shadow-inner">
              <TerminalSquare className="h-5 w-5 text-[#5b4424]" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#d8c3a0]">
                продвижение в поиске и нейросетях
              </div>
              <div className="font-serif text-2xl font-semibold text-[#f7eedf]">
                GEO+SEO от Art-Web.ru
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2 text-[#c5b295] transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
