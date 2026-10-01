import fs from "node:fs";
import path from "node:path";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { blogAuthorOptions, defaultBlogAuthor } from "@/content/site/author";
import {
  buildPostFileContent,
  formatIsoDate,
  pickUniqueSlug,
  slugifyTitle,
  suggestPostCoverPath,
} from "@/lib/blog/frontmatter-helpers";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function ask(
  rl: readline.Interface,
  question: string,
  defaultValue?: string
): Promise<string> {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  return answer || defaultValue || "";
}

async function askRequired(
  rl: readline.Interface,
  question: string,
  hint?: string
): Promise<string> {
  while (true) {
    if (hint) {
      console.log(hint);
    }
    const answer = (await rl.question(`${question}: `)).trim();
    if (answer) {
      return answer;
    }
    console.log("Поле обязательно. Заполните его.\n");
  }
}

function resolveAuthorChoice(raw: string): string {
  const trimmed = raw.trim();
  const asNumber = Number.parseInt(trimmed, 10);

  if (
    Number.isFinite(asNumber) &&
    asNumber >= 1 &&
    asNumber <= blogAuthorOptions.length
  ) {
    return blogAuthorOptions[asNumber - 1];
  }

  const matched = blogAuthorOptions.find(
    (name) => name.toLowerCase() === trimmed.toLowerCase()
  );

  return matched || trimmed;
}

async function askAuthor(rl: readline.Interface): Promise<string> {
  console.log("\nАвтор (обязательно):");
  blogAuthorOptions.forEach((name, index) => {
    console.log(`  ${index + 1}. ${name}`);
  });

  while (true) {
    const answer = await ask(
      rl,
      "Номер или имя автора",
      defaultBlogAuthor.name
    );
    const author = resolveAuthorChoice(answer);

    if (blogAuthorOptions.includes(author)) {
      return author;
    }

    console.log(
      `Выберите автора из списка (${blogAuthorOptions.join(", ")}).\n`
    );
  }
}

function isValidSourceLine(line: string): boolean {
  const [title, url] = line.split("|").map((part) => part.trim());
  return Boolean(title && url && url.startsWith("http"));
}

async function askSources(rl: readline.Interface): Promise<string> {
  console.log(
    "\nИсточники (минимум 1, обязательно) — для блока «Источники» и citation в JSON-LD."
  );
  console.log("Формат строки: Название|https://ссылка");
  console.log("Пустая строка после первого источника — конец ввода.\n");

  const lines: string[] = [];

  while (true) {
    const prompt =
      lines.length === 0
        ? "Источник 1"
        : "Следующий источник (Enter — закончить)";
    const line = (await rl.question(`${prompt}: `)).trim();

    if (!line) {
      if (lines.length === 0) {
        console.log("Нужен хотя бы один источник.\n");
        continue;
      }
      break;
    }

    if (!isValidSourceLine(line)) {
      console.log(
        "Неверный формат. Пример: Google Search Essentials|https://developers.google.com/search/docs/essentials\n"
      );
      continue;
    }

    lines.push(line);
  }

  return lines.join(", ");
}

async function askBody(rl: readline.Interface): Promise<string> {
  console.log(
    "\nТекст статьи (Markdown). Вставьте текст и нажмите Enter на пустой строке."
  );
  console.log("Чтобы дописать позже в файле — сразу нажмите Enter.\n");

  const lines: string[] = [];

  while (true) {
    const line = await rl.question("");
    if (line.trim() === "") {
      if (lines.length === 0) {
        return "";
      }
      break;
    }
    lines.push(line);
  }

  return lines.join("\n").trim();
}

export async function createBlogPostInteractive(): Promise<string> {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  const rl = readline.createInterface({ input, output });

  try {
    console.log("\nНовая статья блога");
    console.log(
      "Обязательные поля: title, excerpt, tags, author, sources. Обложку сгенерируем по тексту после сохранения.\n"
    );

    const title = await askRequired(rl, "Заголовок (title)");
    const excerpt = await askRequired(
      rl,
      "Краткое описание для списка статей (excerpt)"
    );

    const metaTitle = await ask(rl, "SEO-заголовок (metaTitle)", title);
    const metaDescription = await ask(
      rl,
      "SEO-описание (metaDescription)",
      excerpt
    );

    const tags = await askRequired(
      rl,
      "Теги через запятую (tags)",
      "Пример: GEO, SEO, нейросети"
    );

    const author = await askAuthor(rl);
    const sources = await askSources(rl);

    const slugInput = await ask(
      rl,
      "URL slug (латиница, необязательно)",
      slugifyTitle(title)
    );

    const body = await askBody(rl);

    const slug = pickUniqueSlug(slugifyTitle(slugInput || title), BLOG_DIR);
    const date = formatIsoDate();
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    const plannedCover = suggestPostCoverPath(slug);
    const content = buildPostFileContent({
      title,
      excerpt,
      date,
      metaTitle,
      metaDescription,
      tags,
      author,
      sources,
      body: body || undefined,
    });

    fs.writeFileSync(filePath, content, "utf8");

    console.log(`\nГотово: content/blog/${slug}.md`);
    console.log(`Дата публикации: ${date}`);
    console.log(
      `Обложка: после текста попросите сгенерировать картинку — будет ${plannedCover}`
    );
    console.log(
      "После правок текста при необходимости добавьте в frontmatter: updated: YYYY-MM-DD"
    );

    if (body) {
      console.log("Текст статьи сохранён в файл.");
    } else {
      console.log(
        "Текст статьи не введён — откройте файл и замените «Текст статьи…» на свой Markdown."
      );
    }

    console.log("Проверка: npm run dev → /blog/" + slug + "/\n");

    return filePath;
  } finally {
    rl.close();
  }
}
