/**
 * Универсальная отправка заявок с любой формы сайта.
 *
 * Сайт собирается как статический экспорт (output: "export"), поэтому
 * собственного бэкенда у нас нет. Заявки отправляются прямо из браузера
 * на API `Formsubmit.co` — это бесплатный сервис, который пересылает форму
 * на указанные e-mail (без регистрации, без ключей; нужна только разовая
 * активация e-mail при первой заявке — клик по ссылке из письма).
 *
 * Если сеть упала — открываем `mailto:` как fallback, чтобы заявка
 * не была потеряна.
 */

const FORMSUBMIT_BASE = "https://formsubmit.co/ajax";

/** Основной адрес, на который шлётся заявка (на нём же висит активация Formsubmit). */
const PRIMARY_RECIPIENT =
  process.env.NEXT_PUBLIC_LEAD_PRIMARY || "seo@art-web.ru";

/** Адреса в копии (через запятую). */
const CC_RECIPIENTS =
  process.env.NEXT_PUBLIC_LEAD_CC || "admin@art-web.ru";

export const LEAD_RECIPIENTS = [
  PRIMARY_RECIPIENT,
  ...CC_RECIPIENTS.split(",").map((s) => s.trim()).filter(Boolean),
];

export type LeadResult =
  | { ok: true }
  | { ok: false; error: string; fallback?: "mailto" };

type LeadPayload = ReturnType<typeof formDataToJson>;

function formDataToJson(formData: FormData, source: string) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    site: String(formData.get("site") ?? "").trim(),
    budget: String(formData.get("budget") ?? "").trim(),
    goal: String(formData.get("goal") ?? "").trim(),
    timeline: String(formData.get("timeline") ?? "").trim(),
    details: String(formData.get("details") ?? "").trim(),
    website: String(formData.get("website") ?? "").trim(),
    source,
  };
}

function buildPlainText(p: LeadPayload): string {
  return [
    `Источник: ${p.source}`,
    "",
    `Имя: ${p.name}`,
    `Email: ${p.email}`,
    `Сайт/бренд: ${p.site || "—"}`,
    `Бюджет: ${p.budget || "—"}`,
    `Цель: ${p.goal || "—"}`,
    `Сроки: ${p.timeline || "—"}`,
    "",
    "Описание проекта:",
    p.details || "—",
  ].join("\n");
}

function buildMailtoUrl(payload: LeadPayload): string {
  const subject = `Новая заявка (${payload.source})`;
  return `mailto:${LEAD_RECIPIENTS.join(",")}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(buildPlainText(payload))}`;
}

function fallbackToMailto(payload: LeadPayload, message: string): LeadResult {
  if (typeof window !== "undefined") {
    window.location.href = buildMailtoUrl(payload);
  }
  return { ok: false, error: message, fallback: "mailto" };
}

/**
 * Отправляет заявку через Formsubmit.co. При сбое сети —
 * открывает почтовый клиент пользователя как fallback.
 */
export async function sendLeadRequest(
  formData: FormData,
  source: string
): Promise<LeadResult> {
  const payload = formDataToJson(formData, source);
  const endpoint = `${FORMSUBMIT_BASE}/${encodeURIComponent(PRIMARY_RECIPIENT)}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Новая заявка (${source})`,
        _template: "table",
        _captcha: "false",
        _cc: CC_RECIPIENTS,
        _replyto: payload.email,
        _honey: payload.website,
        Источник: source,
        Имя: payload.name,
        Email: payload.email,
        "Сайт или бренд": payload.site || "—",
        Бюджет: payload.budget || "—",
        Цель: payload.goal || "—",
        Сроки: payload.timeline || "—",
        "Описание проекта": payload.details || "—",
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      success?: boolean | string;
      message?: string;
    };
    const success =
      data.success === true || data.success === "true" || response.ok;

    if (success) {
      return { ok: true };
    }

    return {
      ok: false,
      error:
        data.message ||
        "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.",
    };
  } catch (err) {
    console.error("[sendLeadRequest] network error:", err);
    return fallbackToMailto(
      payload,
      "Нет связи с сервером — открыли ваш почтовый клиент"
    );
  }
}

/** @deprecated используйте `sendLeadRequest` — оставлено для обратной совместимости. */
export function sendLeadRequestByEmail(formData: FormData, source: string) {
  const payload = formDataToJson(formData, source);
  if (typeof window !== "undefined") {
    window.location.href = buildMailtoUrl(payload);
  }
}
