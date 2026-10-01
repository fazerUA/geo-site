import fs from "node:fs";
import path from "node:path";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog/server";
import { organizationContent, SITE_URL } from "@/content/site/organization";
import { aboutPageContent } from "@/content/about/page-content";
import { pricingPlans } from "@/lib/content/landing";

const LLMS_PATH = path.join(process.cwd(), "public", "llms.txt");

function formatTagLine(tag: string, slug: string, description: string): string {
  return `- [Ярлык ${tag}](${SITE_URL}/blog/tag/${slug}/): ${description}`;
}

export function generateLlmsTxt(): string {
  const posts = getAllBlogPosts();
  const tags = getAllBlogTags();
  const planNames = pricingPlans.map((plan) => plan.name).join(", ");

  const blogLines = posts.map(
    (post) =>
      `- [${post.title}](${SITE_URL}/blog/${post.slug}/): ${post.excerpt}`
  );

  const tagDescriptions: Record<string, string> = {
    geo: "Статьи о продвижении в нейросетях и generative engine optimization.",
    seo: "Материалы по классическому поисковому продвижению и техническим аспектам.",
    faq: "Контент про блоки вопросов-ответов и их влияние на SEO.",
    "ai-видимость": "Материалы о цитируемости сайта в AI-системах.",
    продажи: "Статьи о росте продаж через SEO и GEO.",
    секреты: "Полезные лайфхаки и скрытые возможности продвижения.",
    "live-blog": "Статьи о формате «Прямой эфир» для обновления контента.",
    "black-seo": "Материалы о «серых» и «чёрных» методах продвижения.",
    ux: "Материалы о UX и поведенческих факторах на сайте.",
    нейросети: "Статьи о продвижении через нейросети и AI-поиск.",
    ошибки: "Типичные ошибки, мешающие продвижению и AI-видимости.",
    стратегия: "Стратегии объединения SEO и GEO.",
  };

  const pinnedPosts = posts.filter((post) => post.pinned);
  const teamSummary = aboutPageContent.specialists
    .map((specialist) => `${specialist.name} — ${specialist.role}`)
    .join("; ");

  const blogFact =
    pinnedPosts.length > 0
      ? `${posts.length} статей (2026), ярлыки, закреплённая запись «${pinnedPosts[0].title}»`
      : `${posts.length} статей (2026), ярлыки по темам SEO и GEO`;

  const tagLines = tags.map((entry) => {
    const key = entry.tag.toLowerCase();
    const description =
      tagDescriptions[key] || `Материалы блога с ярлыком ${entry.tag}.`;
    return formatTagLine(entry.tag, entry.slug, description);
  });

  return `# ${organizationContent.brandName}

> ${organizationContent.description} Сайт на русском языке.

## Docs

- [Главная](${SITE_URL}/): Лендинг услуг SEO и GEO — ценностное предложение, кейсы, тарифы, FAQ, форма заявки, реквизиты ИП.
- [Блог](${SITE_URL}/blog/): Статьи, кейсы и руководства по продвижению в поиске и нейросетях; ярлыки (теги) для навигации по темам.
- [О команде](${SITE_URL}/about/): ${teamSummary}.
- [Политика конфиденциальности](${SITE_URL}/privacy/): Обработка персональных данных через форму заявки.
${blogLines.join("\n")}

## Services

- [SEO](${SITE_URL}/#seo): Классическое продвижение в поиске — спрос, структура страниц, контент, техническая база, рост органического трафика и заявок.
- [GEO](${SITE_URL}/#geo): Продвижение в нейросетях и AI-поиске — понятное описание бизнеса, экспертный контент, сигналы доверия, упоминания бренда в ответах LLM.
- [Кейсы](${SITE_URL}/#cases): Примеры результатов: доставка цветов, IT-продукт в рекомендациях нейросетей, восстановление после неудачного SEO.
- [Тарифы](${SITE_URL}/#pricing): Пакеты «${planNames}» — форматы сотрудничества и заявка из модального окна.
- [FAQ](${SITE_URL}/#faq): Ответы на частые вопросы по процессу, срокам и формату работы.
- [Контакты и заявка](${SITE_URL}/#contact): Форма обратной связи; заявки уходят на ${organizationContent.email.join(", ")}.

## Resources

- [Все материалы блога](${SITE_URL}/blog/): Публикации по SEO, GEO, нейросетям, стратегии, UX и AI-видимости.
${tagLines.join("\n")}

## Key Facts

- Бренд: ${organizationContent.brandName} (Art-Web GEO)
- Юрлицо: ${organizationContent.legalName}, ${organizationContent.address.addressLocality}, ${organizationContent.address.addressRegion}
- Фокус: SEO + GEO — поиск Google/Яндекс и рекомендации в нейросетях (ChatGPT, Алиса, Perplexity и др.)
- Услуги: техническое SEO, контент и структура, GEO-продвижение, доверие к бренду, отчёты «на человеческом языке»
- Блог: ${blogFact}
- Язык: русский
- Домен: ${SITE_URL}/
- LLMs-Txt: ${SITE_URL}/llms.txt

## Contact

- Сайт: ${SITE_URL}/
- Блог: ${SITE_URL}/blog/
- Email (заявки): ${organizationContent.email.join(", ")}
- Форма на сайте: ${SITE_URL}/#contact
`;
}

export function writeLlmsFile(): void {
  fs.writeFileSync(LLMS_PATH, generateLlmsTxt(), "utf8");
}
