# Directus для art-web-geo

## Коллекции (создайте в Settings → Data Model)

Общее для всех: поле **status** — dropdown: `draft`, `published` (Interface: Select Dropdown).

### `blog_posts`

| Поле | Тип | Примечание |
|------|-----|------------|
| slug | string, unique | URL статьи |
| title | string | |
| date | date | |
| date_modified | date | optional |
| excerpt | text | |
| meta_title | string | optional |
| meta_description | text | optional |
| content | text (Markdown) | |
| pinned | boolean | |
| tags | JSON (array of strings) | |
| image | file (M2O) | optional |
| author | string | |
| sources | JSON | `[{"title":"…","url":"https://…"}]` |
| status | string | draft / published |

Права **Public** или роль CI: read `blog_posts` where status = published.

### `pricing_plans`

| Поле | Тип |
|------|-----|
| slug | string, unique |
| sort | integer |
| name, price, label | string |
| price_value | integer |
| featured | boolean |
| features | JSON (array of strings) |
| status | string |

### `faq_items`

| slug, sort, q, a, status |

### `case_items`

| slug, sort, title, niche, result, text, project_url (optional), modal_images (JSON), status |

## Первый импорт из репозитория

```bash
set DIRECTUS_URL=https://your-project.directus.app
set DIRECTUS_TOKEN=your-static-token
npx tsx scripts/migrate-to-directus.ts
```

## Flow «Опубликовать → деплой»

1. **Trigger:** Event — items.update / items.create на коллекциях контента, когда `status` = `published`.
2. **Operation:** Webhook (Request URL) — URL пайплайна Sourcecraft «Run pipeline» или ваш deploy-hook (см. `docs/DIRECTUS-DEPLOY.md`).

Обложки: загружайте файл в поле `image` или вставьте в markdown путь `/img/slug.webp` после загрузки файла на FTP вручную один раз — либо настройте Public read для `directus_files`.
