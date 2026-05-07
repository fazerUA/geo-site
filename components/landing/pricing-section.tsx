"use client";
import { useMemo, useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { sendLeadRequestByEmail } from "@/lib/send-lead-request";

type Props = {
  darkMode?: boolean;
};

export default function PricingSection({ darkMode = true }: Props) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const handleLeadModalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendLeadRequestByEmail(new FormData(event.currentTarget), "Заявка из тарифа");
  };
  const theme = darkMode
    ? {
        sectionText: "text-[#f7eedf]",
        subtext: "text-[#c5b295]",
        card: "border-[#322617] bg-[#17120f]",
        featured: "border-[#6a4f2a] bg-[#22180f]",
        modalCard: "border-[#4b3922] bg-[#1f1711]",
        input:
          "border-[#4a3926] bg-[#16120f] text-[#f7eedf] placeholder:text-[#8f7a5b]",
        badge: "bg-[#f0d39f] text-[#1b140d] hover:bg-[#f0d39f]",
        button:
          "h-12 rounded-full border border-[#f6e5bf] bg-[linear-gradient(135deg,#fdf0cd_0%,#f2d79d_45%,#d9af68_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#24180c] shadow-[0_10px_30px_rgba(222,173,96,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(222,173,96,0.48)] active:translate-y-0",
        buttonGhost:
          "border-[#6a4f2a] bg-transparent text-[#f0ddbe] hover:bg-[#221a13]",
      }
    : {
        sectionText: "text-[#201910]",
        subtext: "text-[#574431]",
        card: "border-[#d7c4a0] bg-[#fff9ee]",
        featured: "border-[#b89a65] bg-[#fff4de]",
        modalCard: "border-[#d7c4a0] bg-[#fff9ee]",
        input:
          "border-[#ccb487] bg-[#fffdf7] text-[#201910] placeholder:text-[#8a7250]",
        badge: "bg-[#2a2016] text-[#fbf7ee] hover:bg-[#2a2016]",
        button:
          "h-12 rounded-full border border-[#2a2016] bg-[linear-gradient(135deg,#2a2016_0%,#3a2b19_48%,#5b4020_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#fbf7ee] shadow-[0_10px_24px_rgba(41,30,18,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(41,30,18,0.34)] active:translate-y-0",
        buttonGhost:
          "border-[#b89a65] bg-transparent text-[#4f3b22] hover:bg-[#f4ead0]",
      };

  const plans = [
    {
      name: "Старт",
      price: "₽25000 / месяц",
      priceValue: 25000, // Для корректной микроразметки. Замените на реальную цифру.
      label: "Для небольших проектов и ИП",
      featured: false,
      features: [
        "Проверка сайта и анализ текущих текстов",
        "Чёткий пошаговый план на первый месяц",
        "Настройка главных страниц, которые ищут клиенты",
        "Понятный ежемесячный отчёт о результатах",
      ],
    },
    {
      name: "Рост",
      price: "₽60000 / месяц",
      priceValue: 60000, // Замените на реальную цифру.
      label: "Выбирают чаще всего",
      featured: true,
      features: [
        "Тариф «Старт» +",
        "Комплексное продвижение в поиске и нейросетях",
        "План публикаций и создание страниц под запросы",
        "Постоянные улучшения для увеличения числа заявок",
        "Еженедельные встречи и отчёты по важным показателям",
      ],
    },
    {
      name: "Масштаб",
      price: "Индивидуально",
      priceValue: 0,
      label: "Для крупных компаний и сетей",
      featured: false,
      features: [
        "Продвижение в нескольких городах и странах",
        "Индивидуальная стратегия под ваши каналы продаж",
        "Работа над репутацией и узнаваемостью бренда",
        "Прямая работа с руководителями и директорами по маркетингу",
      ],
    },
  ];

  // Генерация JSON-LD микроразметки для тарифов
  const pricingSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Тарифы на продвижение",
      "description":
        "Выберите подходящий формат сотрудничества для роста заявок и выручки.",
      "itemListElement": plans.map((plan, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": plan.name,
        "description": plan.features.join(". "),
        "offers": {
          "@type": "Offer",
          "priceCurrency": "RUB", // Замените на USD или другую валюту при необходимости
          "price": plan.price.toLowerCase().includes("индивидуально")
            ? "0"
            : plan.priceValue || "0",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "url": "#pricing",
        },
      })),
    }),
    []
  );

  return (
    <section className="pb-16" id="pricing">
      {/* Микроразметка для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      <div className="mb-6 max-w-2xl">
        <div className={`text-xs uppercase tracking-[0.28em] ${theme.subtext}`}>
          тарифы и цены
        </div>
        <h2
          className={`mt-2 font-serif text-3xl font-semibold ${theme.sectionText}`}
        >
          Выберите подходящий формат сотрудничества
        </h2>
        <p className={`mt-3 text-sm leading-7 ${theme.subtext}`}>
          Три варианта: от быстрой настройки сайта до полного ведения продвижения.
          Подберём решение под ваши задачи и бюджет.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 + index * 0.06 }}
            whileHover={{ y: -8 }}
          >
            <Card
              className={`h-full rounded-[30px] shadow-[0_14px_35px_rgba(68,49,25,0.10)] ${
                plan.featured ? theme.featured : theme.card
              }`}
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className={`text-xl font-semibold ${theme.sectionText}`}>
                      {plan.name}
                    </div>
                    <div className={`mt-1 text-sm ${theme.subtext}`}>
                      {plan.label}
                    </div>
                  </div>

                  {plan.featured ? (
                    <Badge className={`rounded-full ${theme.badge}`}>
                      выбирают чаще всего
                    </Badge>
                  ) : null}
                </div>

                <div className={`text-3xl font-semibold ${theme.sectionText}`}>
                  {plan.price}
                </div>
                <div className={`mt-1 text-sm ${theme.subtext}`}>
                  Точный список задач и стоимость согласуем после короткого созвона или по e-mail / мессенджерам
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => {
                    if (feature.includes("Старт")) {
                      return (
                        <div key={feature} className="text-center">
                          <span className={`text-sm font-semibold leading-7 ${theme.sectionText}`}>
                            {feature}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span className={`text-sm leading-7 ${theme.subtext}`}>
                          {feature}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button className={theme.button} onClick={() => setIsLeadModalOpen(true)}>
                    Оставить заявку
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {isLeadModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-6 sm:items-center"
          onClick={() => setIsLeadModalOpen(false)}
          role="presentation"
        >
          <Card
            className={`my-auto w-full max-w-4xl rounded-[32px] border shadow-[0_24px_70px_rgba(56,39,20,0.28)] ${theme.modalCard}`}
            onClick={(event) => event.stopPropagation()}
          >
            <CardContent className="p-6 md:p-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className={`font-serif text-2xl font-semibold ${theme.sectionText}`}>
                  Оставить заявку
                </h3>
                <Button
                  variant="default"
                  className={theme.buttonGhost}
                  onClick={() => setIsLeadModalOpen(false)}
                >
                  Закрыть
                </Button>
              </div>

              <form onSubmit={handleLeadModalSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="name"
                    className={`h-12 rounded-2xl border px-4 outline-none ${theme.input}`}
                    placeholder="Ваше имя"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    className={`h-12 rounded-2xl border px-4 outline-none ${theme.input}`}
                    placeholder="Рабочая почта"
                    required
                  />
                  <input
                    name="site"
                    className={`h-12 rounded-2xl border px-4 outline-none ${theme.input}`}
                    placeholder="Сайт или бренд"
                  />
                  <input
                    name="budget"
                    className={`h-12 rounded-2xl border px-4 outline-none ${theme.input}`}
                    placeholder="Диапазон месячного бюджета"
                  />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input
                    name="goal"
                    className={`h-12 rounded-2xl border px-4 outline-none ${theme.input}`}
                    placeholder="Основная цель"
                  />
                  <input
                    name="timeline"
                    className={`h-12 rounded-2xl border px-4 outline-none ${theme.input}`}
                    placeholder="Сроки"
                  />
                </div>

                <textarea
                  name="details"
                  className={`mt-4 min-h-[150px] w-full rounded-[24px] border px-4 py-3 outline-none ${theme.input}`}
                  placeholder="Расскажите о проекте, текущей ситуации, целях, географии, рынке и формате поддержки, который вам нужен."
                  required
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className={`max-w-md text-xs leading-6 ${theme.subtext}`}>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных и
                    получение обратной связи по вашему запросу.
                  </p>
                  <Button
                    type="submit"
                    className={`${theme.button} group relative overflow-hidden`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/30"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[-2px] rounded-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.45),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.2),transparent_38%)] opacity-65 blur-[1.5px] transition-opacity duration-300 group-hover:opacity-90"
                    />
                    <span className="relative z-[1] inline-flex items-center gap-2">
                      Получить консультацию
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </section>
  );
}