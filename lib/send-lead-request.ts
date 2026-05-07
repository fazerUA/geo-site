const LEAD_RECIPIENTS = ["seo@art-web.ru", "admin@art-web.ru"];

export function sendLeadRequestByEmail(formData: FormData, source: string) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const site = String(formData.get("site") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const goal = String(formData.get("goal") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();

  const subject = `Новая заявка (${source})`;
  const body = [
    `Источник: ${source}`,
    "",
    `Имя: ${name}`,
    `Email: ${email}`,
    `Сайт/бренд: ${site}`,
    `Бюджет: ${budget}`,
    `Цель: ${goal}`,
    `Сроки: ${timeline}`,
    "",
    "Описание проекта:",
    details,
  ].join("\n");

  const mailtoUrl = `mailto:${LEAD_RECIPIENTS.join(",")}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;
}
