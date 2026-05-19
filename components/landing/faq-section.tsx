"use client";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = {
  darkMode?: boolean;
};

export default function FaqSection({ darkMode = true }: Props) {
  const theme = darkMode
    ? {
        sectionText: "text-[#f7eedf]",
        subtext: "text-[#c5b295]",
        card: "border-[#322617] bg-[#17120f]",
      }
    : {
        sectionText: "text-[#201910]",
        subtext: "text-[#574431]",
        card: "border-[#d7c4a0] bg-[#fff9ee]",
      };

  const items = [
    {
      q: "Что происходит после того, как я оставлю заявку?",
      a: "Сначала коротко созвонимся, обсудим ваши цели и посмотрим текущие показатели сайта. После этого составим пошаговый план на 1–3 месяца. Вы сразу будете знать, какие задачи мы берём в работу и какой результат ожидать.",
    },
    {
      q: "Зачем продвигаться и в поиске, и через нейросети?",
      a: "Обычный поиск приводит клиентов, которые уже ищут вашу услугу. Нейросети (ChatGPT, Алиса и др.) помогают вашему бренду появляться в рекомендациях даже тем, кто только формирует запрос. Вместе это даёт больше обращений и укрепляет доверие к компании.",
    },
    {
      q: "Когда появятся первые заявки?",
      a: "Первые изменения обычно заметны через 1–2 месяца: сайт начинает чаще появляться в поиске, а посетители становятся более целевыми. Стабильный поток заявок формируется постепенно, по мере того как мы добавляем контент и улучшаем структуру сайта.",
    },
    {
      q: "Как я буду видеть прогресс работы?",
      a: "Мы отправляем простые отчёты с понятными цифрами: сколько людей зашло на сайт, сколько оставило заявок и как изменились позиции. На регулярных встречах обсуждаем только то, что действительно помогает увеличивать продажи, без лишней технической информации.",
    },
  ];

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  }), []);

  return (
    <section className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-6 max-w-2xl">
        <div className={`text-xs uppercase tracking-[0.28em] ${theme.subtext}`}>
          частые вопросы
        </div>
        <h2 className={`mt-2 font-serif text-3xl font-semibold ${theme.sectionText}`}>
          Ответы на популярные вопросы
        </h2>
        <p className={`mt-3 text-sm leading-7 ${theme.subtext}`}>
          Собрали главные вопросы, которые обычно возникают перед началом: как всё устроено,
          какие сроки, когда ждать первых клиентов и как мы отчитываемся.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 + index * 0.05 }}
          >
            <Card
              className={`rounded-[26px] shadow-[0_12px_30px_rgba(68,49,25,0.08)] ${theme.card}`}
            >
              <CardContent className="px-6 py-5">
                <h3 className={`text-lg font-semibold ${theme.sectionText}`}>
                  {item.q}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${theme.subtext}`}>
                  {item.a}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
