"use client";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";

type Props = {
  darkMode?: boolean;
};

export default function CasesSection({ darkMode = true }: Props) {
  const theme = darkMode
    ? {
        sectionText: "text-[#f7eedf]",
        subtext: "text-[#c5b295]",
        card: "border-[#322617] bg-[#17120f]",
        badge: "bg-[#2a2015] text-[#e4c694] hover:bg-[#2a2015]",
      }
    : {
        sectionText: "text-[#201910]",
        subtext: "text-[#574431]",
        card: "border-[#d7c4a0] bg-[#fff9ee]",
        badge: "bg-[#f0dfb4] text-[#5d4828] hover:bg-[#f0dfb4]",
      };

  const cases = [
    {
      title: "Как мы увеличили заявки для сервисной компании",
      niche: "Услуги для бизнеса",
      result: "+160% посетителей из поиска за полгода",
      text: "Клиент получал заявки неравномерно. Мы разобрались, как ищут их услуги, переделали главные страницы сайта и сделали так, чтобы поток клиентов из поиска стал стабильным.",
    },
    {
      title: "Как нейросети стали рекомендовать IT-продукт",
      niche: "SaaS / IT-продукт",
      result: "Бренд чаще появляется в ответах нейросетей",
      text: "Чётко описали, чем занимается компания, добавили реальные примеры работ и экспертные статьи. Теперь нейросети чаще предлагают этот бренд пользователям.",
    },
    {
      title: "Как мы исправили сайт после неудачного продвижения",
      niche: "Интернет-магазин",
      result: "Больше целевых посетителей на важных страницах",
      text: "Сайт публиковал случайные статьи и плохо индексировался поисковиками. Мы навели технический порядок, ускорили загрузку и создали понятную структуру. В итоге посетители стали чаще оставлять заявки и покупать.",
    },
  ];

  // Генерация JSON-LD микроразметки для кейсов
  const casesSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Примеры наших проектов",
      "description": "Реальные результаты наших клиентов: задачи, решения и измеримые цифры.",
      "itemListElement": cases.map((item, index) => ({
        "@type": "Article",
        "position": index + 1,
        "headline": item.title,
        "description": item.text,
        "articleSection": "Кейс",
        "keywords": ["продвижение сайта", "SEO", "результаты клиентов"],
        "about": {
          "@type": "Thing",
          "name": item.niche,
        },
      })),
    }),
    []
  );

  return (
    <section className="pb-16" id="cases">
      {/* Микроразметка для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(casesSchema) }}
      />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className={`text-xs uppercase tracking-[0.28em] ${theme.subtext}`}>
            наши работы
          </div>
          <h2 className={`mt-2 font-serif text-3xl font-semibold ${theme.sectionText}`}>
            Реальные результаты наших клиентов
          </h2>
          <p className={`mt-3 max-w-2xl text-sm leading-7 ${theme.subtext}`}>
            Показываем, как мы работаем на практике: какая была задача, что именно сделали и
            какие цифры получили в итоге.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {cases.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 + index * 0.06 }}
            whileHover={{ y: -7 }}
          >
            <Card
              className={`h-full rounded-[28px] shadow-[0_14px_35px_rgba(68,49,25,0.10)] ${theme.card}`}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Badge className={`rounded-full ${theme.badge}`}>{item.niche}</Badge>
                  <TrendingUp className="h-4 w-4" />
                </div>

                <h3 className={`text-xl font-semibold ${theme.sectionText}`}>
                  {item.title}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${theme.subtext}`}>{item.text}</p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className={`text-xs uppercase tracking-[0.22em] ${theme.subtext}`}>
                    главный результат
                  </div>
                  <div className={`mt-2 text-lg font-semibold ${theme.sectionText}`}>
                    {item.result}
                  </div>
                </div>

                <button
                  type="button"
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${theme.sectionText}`}
                >
                  Подробнее о проекте <ArrowUpRight className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}