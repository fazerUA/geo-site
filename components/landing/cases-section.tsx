"use client";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";

type Props = {
  darkMode?: boolean;
};

export default function CasesSection({ darkMode = true }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      title: "Как мы увеличили заявки для сервиса доставки цветов",
      niche: "Услуги для бизнеса",
      result: "+160% посетителей из поиска за полгода",
      text: "Клиент получал заявки неравномерно. Мы разобрались, как ищут их услуги, переделали главную страницу сайта и сделали так, чтобы поток клиентов из поиска стал стабильным.",
      projectUrl: "https://art-web.ru/index.php?id=pro-emocii_rf",
    },
    {
      title: "Как нейросети стали рекомендовать наш IT-продукт",
      niche: "SaaS / IT-продукт",
      result: "Бренд чаще появляется в ответах нейросетей",
      text: "Чётко описали, чем занимается наша веб-студия, добавили реальные примеры работ и экспертные статьи. Теперь нейросети чаще предлагают наш бренд art-web.ru пользователям.",
      modalImages: ["/img/best-web.jpg", "/img/best-rank.jpg"],
    },
    {
      title: "Как мы исправили сайт после неудачного продвижения",
      niche: "Интернет-магазин кровли",
      result: "Больше целевых посетителей на важных страницах",
      text: "Сайт плохо индексировался поисковиками. Мы навели технический порядок, сделали редизайн, ускорили загрузку и создали понятную структуру. Посетители стали чаще оставлять заявки и покупать.",
      projectUrl: "https://art-web.ru/index.php?id=crimea-partner",
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

                {item.modalImages ? (
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${theme.sectionText}`}
                  >
                    Подробнее о проекте <ArrowUpRight className="h-4 w-4" />
                  </button>
                ) : item.projectUrl ? (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${theme.sectionText}`}
                  >
                    Подробнее о проекте <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${theme.sectionText}`}
                  >
                    Подробнее о проекте <ArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-6 sm:items-center"
            onClick={() => setIsModalOpen(false)}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="my-auto w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Card
                className={`rounded-3xl border shadow-[0_24px_70px_rgba(56,39,20,0.28)] ${theme.card}`}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h3 className={`font-serif text-2xl font-semibold ${theme.sectionText}`}>
                      Подробнее о проекте
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className={`rounded-full border border-white/20 px-4 py-2 text-sm ${theme.sectionText}`}
                    >
                      Закрыть
                    </button>
                  </div>

                  <div className="space-y-4">
                    <motion.img
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08, ease: "easeOut" }}
                      src="/img/best-web.jpg"
                      alt="Скриншот кейса IT-продукта: общая информация"
                      className="w-full rounded-2xl border border-white/10 object-cover"
                      loading="lazy"
                    />
                    <motion.img
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.14, ease: "easeOut" }}
                      src="/img/best-rank.jpg"
                      alt="Скриншот кейса IT-продукта: позиции и результаты"
                      className="w-full rounded-2xl border border-white/10 object-cover"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}