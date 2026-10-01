# Ручная сборка и выкладка art-web-geo.ru (без Directus)

Редактор правит файлы в репозитории. Вы собираете статику локально и заливаете **`out/`** на Beget.

## Где лежит контент

| Что на сайте | Файлы |
|--------------|--------|
| Статьи блога | `content/blog/*.md` |
| Тарифы | `content/landing/pricing-plans.ts` |
| FAQ | `content/landing/faq-items.ts` |
| Кейсы | `content/landing/cases-items.ts` |
| О компании, SEO-тексты страниц | `content/about/`, `content/site/` и др. |
| Обложки статей | `public/img/` (например `slug.webp`) |

После правок лендинга (прайс, FAQ, кейсы) при следующем `npm run build` скрипт `cms:sync` перегенерирует `lib/generated/landing.snapshot.ts` из этих файлов.

## Новая статья блога

```powershell
cd C:\Users\ПриветАндрей\Desktop\geo
npm run new:post
```

Скрипт спросит заголовок, excerpt, теги, автора, источники и создаст `content/blog/<slug>.md`.

Обложку добавьте позже: файл `public/img/<slug>.webp`, в frontmatter и в начале markdown — `image:` и `![](/img/<slug>.webp)`.

## Ваш цикл после правок (владелец сайта)

1. Получить изменения из git (если редактор пушил в Sourcecraft):

   ```powershell
   git pull origin main
   ```

2. Собрать сайт (**Directus не нужен** — не задавайте `DIRECTUS_URL`):

   ```powershell
   npm run build
   ```

3. Залить на хостинг **всё содержимое** папки `out/` в каталог сайта (FTP или файловый менеджер Beget): HTML, `blog/`, `img/`, `sitemap.xml`, `llms.txt`, `_next/` и т.д.

4. Проверить в браузере: главная, `/blog/`, изменённая страница.

## Админка для редактора (Decap)

**https://art-web-geo.ru/admin/** — пароль на Beget (`.htaccess`) + Decap для статей блога. Настройка: **`docs/DECAP-ADMIN.md`**.

## Редактор без git напрямую

- Decap (см. выше) или доступ к Sourcecraft / правки текстом.
- Для `.md` удобны VS Code / Cursor или веб-редактор Sourcecraft.
- Для `.ts` (прайс, FAQ) — аккуратнее с кавычками и запятыми; при сомнении правит разработчик.

## Directus (позже, по желанию)

Интеграция в коде уже есть: см. `docs/DIRECTUS-DEPLOY.md`. Пока переменные Directus **не заданы**, сборка всегда берёт контент из файлов в git.

## CI Sourcecraft (автодеплой)

При push в **`main`**: lint → сборка → **rsync `out/` на Beget по SSH** (как в проекте light-carton).

Настройка секретов и **`DEPLOY_PATH`** для art-web-geo: **`docs/SOURCECRAFT-DEPLOY.md`**.

Если секреты не заданы, pipeline упадёт на шаге deploy — тогда заливайте `out/` вручную (шаги выше).
