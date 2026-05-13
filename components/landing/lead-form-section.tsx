"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { sendLeadRequest } from "@/lib/send-lead-request";

type Props = {
  darkMode?: boolean;
};

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function LeadFormSection({ darkMode = true }: Props) {
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === "pending") return;

    const form = event.currentTarget;
    setStatus({ kind: "pending" });

    const result = await sendLeadRequest(
      new FormData(form),
      "Форма обратной связи"
    );

    if (result.ok) {
      setStatus({ kind: "success" });
      form.reset();
    } else {
      setStatus({ kind: "error", message: result.error });
    }
  };

  const theme = darkMode
    ? {
        sectionText: "text-[#f7eedf]",
        subtext: "text-[#c5b295]",
        card: "border-[#4b3922] bg-[#1f1711]",
        input:
          "border-[#4a3926] bg-[#16120f] text-[#f7eedf] placeholder:text-[#8f7a5b]",
        button:
          "h-12 rounded-full border border-[#f6e5bf] bg-[linear-gradient(135deg,#fdf0cd_0%,#f2d79d_45%,#d9af68_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#24180c] shadow-[0_10px_30px_rgba(222,173,96,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(222,173,96,0.48)] active:translate-y-0",
      }
    : {
        sectionText: "text-[#201910]",
        subtext: "text-[#574431]",
        card: "border-[#d7c4a0] bg-[#fff9ee]",
        input:
          "border-[#ccb487] bg-[#fffdf7] text-[#201910] placeholder:text-[#8a7250]",
        button:
          "h-12 rounded-full border border-[#2a2016] bg-[linear-gradient(135deg,#2a2016_0%,#3a2b19_48%,#5b4020_100%)] px-7 text-[15px] font-semibold tracking-[0.01em] text-[#fbf7ee] shadow-[0_10px_24px_rgba(41,30,18,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(41,30,18,0.34)] active:translate-y-0",
      };

  return (
    <section className="pb-16">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`text-xs uppercase tracking-[0.28em] ${theme.subtext}`}>
            форма заявки
          </div>
          <h2 className={`mt-2 font-serif text-3xl font-semibold ${theme.sectionText}`}>
            Обратная связь
          </h2>
          <p className={`mt-4 max-w-xl text-sm leading-7 ${theme.subtext}`}>
            Оставьте заявку, чтобы получить разбор текущей ситуации и понятный
            план роста из SEO и GEO без лишней теории.
          </p>

          <div className="mt-6 space-y-3">
            {[
              "Ответим в течение 1 рабочего дня",
              "На созвоне разберём ваш рынок и точки роста",
              "Подходит для проектов, где важен рост заявок, а не просто трафика",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d9b06f]" />
                <span className={`text-sm leading-7 ${theme.subtext}`}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          whileHover={{ y: -4 }}
        >
          <Card
            className={`rounded-[32px] shadow-[0_20px_60px_rgba(38,27,16,0.16)] ${theme.card}`}
          >
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <fieldset
                disabled={status.kind === "pending"}
                className="contents disabled:opacity-70"
              >
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

              <AnimatePresence mode="wait" initial={false}>
                {status.kind === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`mt-4 flex items-start gap-3 rounded-2xl border border-[#3b7a3b]/40 bg-[#3b7a3b]/10 px-4 py-3 text-sm leading-6 ${
                      darkMode ? "text-[#bfe5be]" : "text-[#2d5a2d]"
                    }`}
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>
                      Заявка отправлена! Ответим в течение 1 рабочего дня
                      на указанную почту.
                    </span>
                  </motion.div>
                ) : status.kind === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`mt-4 flex items-start gap-3 rounded-2xl border border-[#a35a30]/40 bg-[#a35a30]/10 px-4 py-3 text-sm leading-6 ${
                      darkMode ? "text-[#f1c69a]" : "text-[#7a4220]"
                    }`}
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{status.message}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className={`max-w-md text-xs leading-6 ${theme.subtext}`}>
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных и
                  получение обратной связи по вашему запросу.
                </p>
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.985 }}>
                  <Button
                    type="submit"
                    disabled={status.kind === "pending"}
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
                      {status.kind === "pending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Отправляем…
                        </>
                      ) : (
                        <>
                          Получить консультацию
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </div>
              </fieldset>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
