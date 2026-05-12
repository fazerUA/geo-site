"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { useSiteTheme } from "@/components/site-theme-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import {
  Moon,
  Sun,
  Search,
  LineChart,
  ChevronRight,
  MessageSquareQuote,
  Sparkles,
  Globe2,
  ShieldCheck,
  Layers3,
  Radar,
  TerminalSquare,
  Send,
  MessageCircle,
} from "lucide-react";

import CasesSection from "@/components/landing/cases-section";
import PricingSection from "@/components/landing/pricing-section";
import FaqSection from "@/components/landing/faq-section";
import LeadFormSection from "@/components/landing/lead-form-section";
import { workIncludesContent } from "@/components/landing/work-includes-content";

type Theme = {
  page: string;
  overlay: string;
  shell: string;
  shellText: string;
  heroAccent: string;
  subtext: string;
  card: string;
  cardSoft: string;
  cardWarm: string;
  previewTop: string;
  previewBody: string;
  badge: string;
  badgeSoft: string;
  buttonPrimary: string;
  buttonSecondary: string;
  statCard: string;
  featureCard: string;
  darkPanel: string;
  darkPanelText: string;
  goldPanel: string;
  goldPanelText: string;
  footerCTA: string;
  footerText: string;
  muted: string;
};

export default function BashLanding() {
  const { isDark: darkMode, toggleTheme } = useSiteTheme();
  const [isWorkIncludesOpen, setIsWorkIncludesOpen] = useState(false);
  const normalizedWorkIncludesContent = useMemo(
    () =>
      workIncludesContent.content
        .replace(/^\s*\.\s*$/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim(),
    []
  );

  const theme = useMemo<Theme>(
    () =>
      darkMode
        ? {
            page: "bg-[#0f0d0b] text-[#f7eedf]",
            overlay:
              "bg-[radial-gradient(circle_at_top,rgba(181,129,55,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(212,181,120,0.10),transparent_26%),linear-gradient(to_bottom,rgba(255,255,255,0.02),rgba(255,255,255,0))]",
            shell: "border-[#3a2d1b] bg-[#16120f]/88",
            shellText: "text-[#d8c3a0]",
            heroAccent: "text-[#e2b66d]",
            subtext: "text-[#c5b295]",
            card: "border-[#322617] bg-[#17120e]",
            cardSoft: "border-[#3a2d1b] bg-[#1d1712]",
            cardWarm:
              "border-[#584221] bg-[linear-gradient(180deg,#231b13_0%,#18120d_100%)]",
            previewTop: "border-[#45331f] bg-[#21180f]",
            previewBody: "bg-[#16120e]",
            badge:
              "border-[#5b4323] bg-[#2a2015] text-[#e2c28f] hover:bg-[#2a2015]",
            badgeSoft: "bg-[#2a2015] text-[#e4c694] hover:bg-[#2a2015]",
            buttonPrimary:
              "h-12 rounded-full border border-[#f6e5bf] bg-[linear-gradient(135deg,#fdf0cd_0%,#f2d79d_45%,#d9af68_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#24180c] shadow-[0_10px_30px_rgba(222,173,96,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(222,173,96,0.48)] active:translate-y-0",
            buttonSecondary:
              "h-12 rounded-full border border-[#f6e5bf] bg-[linear-gradient(135deg,#fdf0cd_0%,#f2d79d_45%,#d9af68_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#24180c] shadow-[0_10px_30px_rgba(222,173,96,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(222,173,96,0.48)] active:translate-y-0",
            statCard: "border-[#342819] bg-[#15110d]/95",
            featureCard: "border-[#322617] bg-[#17120f]",
            darkPanel: "border-[#4b3922] bg-[#1f1711] text-[#f8efdf]",
            darkPanelText: "text-[#e4d6bf]",
            goldPanel:
              "border-[#5e4724] bg-[linear-gradient(135deg,#2a2016_0%,#3a2b19_45%,#6d4f24_100%)]",
            goldPanelText: "text-[#f8f0e1]",
            footerCTA:
              "border-[#5c4421] bg-[linear-gradient(135deg,#2f2418_0%,#5e4320_52%,#b98743_100%)]",
            footerText: "text-[#f8efdf]",
            muted: "text-[#8f7a5b]",
          }
        : {
            page: "bg-[#f6f1e3] text-[#201910]",
            overlay:
              "bg-[radial-gradient(circle_at_top,rgba(120,90,45,0.12),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.45),rgba(255,255,255,0))]",
            shell: "border-[#c9b892] bg-[#fbf8ef]/90",
            shellText: "text-[#6d583a]",
            heroAccent: "text-[#7b5b2f]",
            subtext: "text-[#574431]",
            card: "border-[#d7c6a4] bg-[#fffaf1]",
            cardSoft: "border-[#d6c39f] bg-[#fff9ee]",
            cardWarm:
              "border-[#cdb993] bg-[linear-gradient(180deg,#fffaf1_0%,#f7efdd_100%)]",
            previewTop: "border-[#eadfc8] bg-[#f3e6c5]",
            previewBody: "bg-[#fffaf1]",
            badge:
              "border-[#c1a978] bg-[#f2e4bf] text-[#5f4828] hover:bg-[#f2e4bf]",
            badgeSoft: "bg-[#f0dfb4] text-[#5d4828] hover:bg-[#f0dfb4]",
            buttonPrimary:
              "h-12 rounded-full border border-[#2a2016] bg-[linear-gradient(135deg,#2a2016_0%,#3a2b19_48%,#5b4020_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#fbf7ee] shadow-[0_10px_24px_rgba(41,30,18,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(41,30,18,0.34)] active:translate-y-0",
            buttonSecondary:
              "h-12 rounded-full border border-[#2a2016] bg-[linear-gradient(135deg,#2a2016_0%,#3a2b19_48%,#5b4020_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#fbf7ee] shadow-[0_10px_24px_rgba(41,30,18,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(41,30,18,0.34)] active:translate-y-0",
            statCard: "border-[#d7c6a4] bg-[#fffaf1]/90",
            featureCard: "border-[#d7c4a0] bg-[#fff9ee]",
            darkPanel: "border-[#cdb892] bg-[#2c2117] text-[#f6efe2]",
            darkPanelText: "text-[#e2d5bf]",
            goldPanel: "border-[#d6c39f] bg-[#fffaf1]",
            goldPanelText: "text-[#24190e]",
            footerCTA:
              "border-[#c9b387] bg-[linear-gradient(135deg,#f1e2b8_0%,#ead2a3_45%,#d8b06c_100%)]",
            footerText: "text-[#24190e]",
            muted: "text-[#866845]",
          },
    [darkMode]
  );

  const proofCards = [
    {
      id: "01",
      title: "Продуманная система, а не хаотичные правки",
      text: "Вместо случайных изменений строим чёткий план: анализируем, что ищут клиенты, создаём нужные страницы и пишем тексты, которые приводят реальных покупателей.",
      icon: Search,
    },
    {
      id: "02",
      title: "Вас будут находить через нейросети",
      text: "Настраиваем сайт и информацию о компании так, чтобы нейросети (ChatGPT, Алиса и др.) предлагали ваши услуги пользователям.",
      icon: Globe2,
    },
    {
      id: "03",
      title: "Отчёты на понятном языке",
      text: "Показываем в отчётах, как продвижение влияет на продажи. Только важные цифры, без сложных графиков и лишней информации.",
      icon: LineChart,
    },
  ];

  const offers = [
    {
      title: "Техническое SEO",
      text: "Ускоряем загрузку страниц, исправляем ошибки, убираем дубли и делаем так, чтобы поисковики легко читали ваш сайт.",
    },
    {
      title: "Контент и структура сайта",
      text: "Пишем полезные статьи и создаём страницы, которые отвечают на вопросы ваших клиентов и подталкивают их к покупке.",
    },
    {
      title: "Продвижение в нейросетях",
      text: "Делаем ваш бренд понятным для современных поисковых систем с искусственным интеллектом, чтобы они чаще рекомендовали именно вас.",
    },
    {
      title: "Доверие к вашему бренду",
      text: "Добавляем на сайт кейсы, отзывы и полезную информацию, чтобы клиенты и поисковики видели в вас надёжного специалиста.",
    },
  ];

  const chatPreview = [
    {
      id: "#seo-1842",
      meta: "про поиск",
      text: "Клиент искал информацию, но мы поняли, что ему нужна конкретная услуга. Настроили сайт так, чтобы статья сразу вела к форме заявки",
    },
    {
      id: "#geo-7710",
      meta: "про нейросети",
      text: "Чтобы AI-ассистенты рекомендовали ваш бренд, мы чётко описали ваши услуги и добавили экспертные отзывы на сайт.",
    },
    {
      id: "#sales-9021",
      meta: "про продажи",
      text: "Когда на сайте понятные предложения и есть доказательства качества, клиенты охотнее оставляют заявки. Мы выстраиваем именно такую логику.",
    },
  ];

  const nav = [
    { label: "SEO", href: "#seo" },
    { label: "GEO", href: "#geo" },
    { label: "Кейсы", href: "#cases" },
    { label: "Блог", href: "/blog" },
    { label: "Тарифы", href: "#pricing" },
    { label: "Вопросы", href: "#faq" },
    { label: "Контакты", href: "#contact" },
  ];

  const messengerLinks = [
    {
      label: "Telegram",
      href: "https://t.me/example_username",
      icon: Send,
    },
    {
      label: "Max",
      href: "https://max.com/example_profile",
      icon: MessageCircle,
    },
  ];
  const messengerFooterClass = darkMode
    ? "group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#f6e5bf] bg-[linear-gradient(135deg,#fdf0cd_0%,#f2d79d_45%,#d9af68_100%)] text-[#24180c] shadow-[0_12px_30px_rgba(222,173,96,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(222,173,96,0.46)]"
    : "group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#2a2016] bg-[linear-gradient(135deg,#2a2016_0%,#3a2b19_48%,#5b4020_100%)] text-[#fbf7ee] shadow-[0_10px_24px_rgba(41,30,18,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(41,30,18,0.42)]";

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${theme.page}`}
    >
      <div className={`absolute inset-0 ${theme.overlay}`} />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className={`rounded-3xl border px-5 py-4 shadow-[0_12px_40px_rgba(65,45,20,0.10)] backdrop-blur ${theme.shell}`}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.06 }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#b79a67] bg-[#efe1b8] shadow-inner"
                >
                  <TerminalSquare className="h-5 w-5 text-[#5b4424]" />
                </motion.div>

                <div>
                  <div
                    className={`text-xs uppercase tracking-[0.28em] ${theme.shellText}`}
                  >
                    продвижение в поиске и нейросетях
                  </div>
                  <div className="font-serif text-2xl font-semibold">
                    GEO+SEO от Art-Web.ru    
                  </div>
                </div>
              </Link>

              <nav className="flex flex-wrap items-center gap-3 text-sm">
                {nav.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.04 }}
                    whileHover={{ y: -2 }}
                    className={`rounded-full px-3 py-2 transition ${theme.subtext} hover:bg-white/5 hover:text-white`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  onClick={toggleTheme}
                  className={theme.buttonSecondary}
                >
                  {darkMode ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  {darkMode ? "Светлая тема" : "Тёмная тема"}
                </Button>

              </div>
            </div>
          </motion.div>
        </header>

        <section
          id="seo"
          className="grid scroll-mt-28 items-center gap-8 pb-16 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:pb-24 lg:pt-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-3xl"
          >
            <Badge className={`mb-4 rounded-full px-4 py-1 ${theme.badge}`}>
              SEO + GEO для роста заявок и выручки
            </Badge>

            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-7xl">
              Делаем так, чтоб ваш сайт
              <span className={`block ${theme.heroAccent}`}>
                находили клиенты и оставляли заявки.
              </span>
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-8 md:text-xl ${theme.subtext}`}
            >
              Настраиваем сайт так, чтобы он был на первых строчках Яндекса/Google и появлялся в ответах нейросетей. 
              Результат - больше звонков, заявок и продаж.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              

              <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  variant="default"
                  onClick={() => setIsWorkIncludesOpen(true)}
                  className={theme.buttonSecondary}
                >
                  Что входит в работу
                </Button>
              </motion.div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.05 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0], opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full bg-[#e4c98c]/20 blur-3xl lg:block"
            />
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 bottom-10 hidden h-36 w-36 rounded-full bg-[#a67b3d]/20 blur-3xl lg:block"
            />

            <Card
              className={`overflow-hidden rounded-[32px] shadow-[0_24px_70px_rgba(56,39,20,0.18)] ${theme.cardWarm}`}
            >
              <CardContent className="p-0">
                <div className={`border-b px-5 py-4 ${theme.previewTop}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className={`text-xs uppercase tracking-[0.25em] ${theme.muted}`}>
                        фрагмент стратегии
                      </div>
                      <div className="mt-1 font-mono text-sm">
                        примеры из нашей практики
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 text-sm ${theme.subtext}`}>
                      <Radar className="h-4 w-4" />
                      <span>позиционирование, которое продаёт</span>
                    </div>
                  </div>
                </div>

                <div className={`space-y-4 p-5 md:p-6 ${theme.previewBody}`}>
                  {chatPreview.map((quote, index) => (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, y: 24, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.55, delay: 0.18 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className={`rounded-3xl border p-4 shadow-[0_10px_20px_rgba(70,50,25,0.08)] ${theme.cardSoft}`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className={`font-mono text-sm ${theme.subtext}`}>
                          {quote.id}
                        </div>
                        <Badge className={`rounded-full ${theme.badgeSoft}`}>
                          {quote.meta}
                        </Badge>
                      </div>
                      <p className="font-mono text-[15px] leading-7">{quote.text}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section className="grid gap-4 pb-16 md:grid-cols-3">
          {proofCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.14 + index * 0.08 }}
                whileHover={{ y: -8, rotateX: 2 }}
              >
                <Card
                  className={`h-full rounded-[28px] shadow-[0_14px_35px_rgba(68,49,25,0.10)] ${theme.featureCard}`}
                >
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.08 }}
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ceb07c] bg-[#f2e4bf]"
                    >
                      <Icon className="h-5 w-5 text-[#654a24]" />
                    </motion.div>

                    <div className={`mb-2 text-xs uppercase tracking-[0.26em] ${theme.muted}`}>
                      {item.id}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className={`mt-3 text-sm leading-7 ${theme.subtext}`}>{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </section>

        <section className="grid gap-6 pb-16 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            whileHover={{ y: -6 }}
          >
            <Card
              className={`rounded-[32px] shadow-[0_20px_60px_rgba(38,27,16,0.24)] ${theme.darkPanel}`}
            >
              <CardContent className="p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.3em] text-[#ceb98e]">
                  Что вы получаете
                </div>
                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight">
                Продвижение, которое приносит заявки стабильно, а не случайно.
                </h2>
                <p className={`mt-5 max-w-xl text-base leading-8 ${theme.darkPanelText}`}>
                Мы не просто «делаем сайт». 
                Находим, где вы теряете клиентов, улучшаем важные страницы и 
                помогаем поисковикам правильно показывать ваш бизнес.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Делаем логичную структуру сайта, по которой клиенты легко находят нужную услугу", 
                    "Помогаем нейросетям и поисковикам чаще показывать вашу компанию", 
                    "Пишем тексты и создаём страницы, которые убеждают посетителя оставить заявку", 
                    "Показываем понятные отчёты: сколько показов вашего бренда было за отчётный период времени",
                  ].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <Sparkles className="mt-0.5 h-4 w-4 text-[#e5c98a]" />
                      <span className="text-sm leading-7">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            whileHover={{ y: -6 }}
          >
            <Card
              className={`rounded-[32px] shadow-[0_18px_50px_rgba(61,43,20,0.12)] ${theme.goldPanel}`}
            >
              <CardContent className="p-8 md:p-10">
                <div className={`mb-4 text-xs uppercase tracking-[0.28em] ${theme.muted}`}>
                  стек услуг
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {offers.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.12 + index * 0.06 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-3xl border p-5 ${theme.card}`}
                    >
                      <h3 className={`text-lg font-semibold ${theme.goldPanelText}`}>
                        {item.title}
                      </h3>
                      <p className={`mt-2 text-sm leading-7 ${theme.subtext}`}>
                        {item.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="geo" className="scroll-mt-28 pb-16">
          <div className="mb-5 flex items-center gap-3">
            <MessageSquareQuote className="h-5 w-5" />
            <h2 className="font-serif text-3xl font-semibold">Почему важно продвигаться и в поиске, и в нейросетях</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Search,
                title: "Когда клиент уже ищет",
                text: "Ловим момент, когда человек готов выбрать исполнителя, и показываем ему ваш сайт..",
              },
              {
                icon: Globe2,
                title: "Понятное описание бизнеса",
                text: "Чётко объясняем поисковикам и нейросетям, чем вы занимаетесь, чтобы они правильно вас рекомендовали.",
              },
              {
                icon: Layers3,
                title: "Правильный контент на всех этапах",
                text: "Соединяем продающие страницы, полезные статьи и ответы на вопросы клиентов в одну понятную цепочку.",
              },
              {
                icon: ShieldCheck,
                title: "Доказательства вашей надёжности",
                text: "Размещаем реальные примеры работ и отзывы, чтобы у клиентов не оставалось сомнений.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 + index * 0.06 }}
                  whileHover={{ y: -7 }}
                >
                  <Card className={`h-full rounded-[28px] ${theme.featureCard}`}>
                    <CardContent className="p-6">
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                      <p className={`mt-2 text-sm leading-7 ${theme.subtext}`}>
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div id="cases" className="scroll-mt-28">
          <CasesSection darkMode={darkMode} />
        </div>
        <div id="pricing" className="scroll-mt-28">
          <PricingSection darkMode={darkMode} />
        </div>
        <div id="faq" className="scroll-mt-28">
          <FaqSection darkMode={darkMode} />
        </div>
        <div id="contact" className="scroll-mt-28">
          <LeadFormSection darkMode={darkMode} />
        </div>

        <section className="pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card
              className={`overflow-hidden rounded-[36px] shadow-[0_25px_70px_rgba(88,61,24,0.18)] ${theme.footerCTA}`}
            >
              <CardContent className="flex flex-col gap-6 p-8 md:p-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="text-xs uppercase tracking-[0.28em] text-[#f0ddb9]">
                    Что делать дальше
                  </div>
                  <h2
                    className={`mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl ${theme.footerText}`}
                  >
                    Хотите, чтобы поиск и нейросети стабильно приводили вам клиентов?
                  </h2>
                  <p
                    className={`mt-4 text-base leading-8 ${
                      darkMode ? "text-[#f1e7d7]" : "text-[#4d3920]"
                    }`}
                  >
                    На коротком созвоне бесплатно разберём ваш бизнес, 
                    найдём слабые места и составим пошаговый план продвижения на 3 месяца.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                    {messengerLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          title={item.label}
                          className={messengerFooterClass}
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-[-2px] rounded-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.42),transparent_36%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.18),transparent_40%)] opacity-70 blur-[1.5px] transition-opacity duration-300 group-hover:opacity-95"
                          />
                          <span className="relative z-[1] inline-flex items-center">
                            <Icon className="h-4 w-4" />
                          </span>
                        </a>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {isWorkIncludesOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-6 sm:items-center"
            onClick={() => setIsWorkIncludesOpen(false)}
            role="presentation"
          >
            <Card
              className={`my-auto flex max-h-[85vh] w-full max-w-2xl flex-col rounded-3xl border shadow-[0_24px_70px_rgba(56,39,20,0.28)] ${theme.card}`}
              onClick={(event) => event.stopPropagation()}
            >
              <CardContent className="flex min-h-0 flex-1 flex-col p-6 md:p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold md:text-3xl">
                    {workIncludesContent.title}
                  </h3>
                  <Button
                    variant="default"
                    className={theme.buttonSecondary}
                    onClick={() => setIsWorkIncludesOpen(false)}
                  >
                    Закрыть
                  </Button>
                </div>
                <div
                  className={`min-h-0 flex-1 overflow-y-auto pr-1 text-base leading-7 ${theme.subtext}`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ ...props }) => (
                        <h1 className="mb-4 mt-8 font-serif text-3xl font-semibold" {...props} />
                      ),
                      h2: ({ ...props }) => (
                        <h2 className="mb-3 mt-7 font-serif text-2xl font-semibold" {...props} />
                      ),
                      h3: ({ ...props }) => (
                        <h3 className="mb-3 mt-6 font-serif text-xl font-semibold" {...props} />
                      ),
                      p: ({ ...props }) => <p className="my-4" {...props} />,
                      ul: ({ ...props }) => <ul className="my-4 list-disc pl-6" {...props} />,
                      ol: ({ ...props }) => (
                        <ol className="my-4 list-decimal pl-6" {...props} />
                      ),
                      li: ({ ...props }) => <li className="my-1" {...props} />,
                      blockquote: ({ ...props }) => (
                        <blockquote className="my-4 border-l-2 pl-4" {...props} />
                      ),
                      br: () => <span className="block h-3" aria-hidden="true" />,
                      strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
                      em: ({ ...props }) => <em className="italic" {...props} />,
                    }}
                  >
                    {normalizedWorkIncludesContent}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
}
