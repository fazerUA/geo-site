# Directus (опционально)

> **Сейчас:** контент в git, сборка и заливка `out/` вручную — см. **`docs/MANUAL-DEPLOY.md`**.

# Directus + автодеплой art-web-geo.ru

## Как это работает

1. Копирайтер правит контент в **Directus** и ставит **status = published**.
2. **Sourcecraft CI** (по расписанию каждые 5–10 мин и/или по push/webhook):
   - `npm run cms:sync` — тянет опубликованные записи в `.cms-data/snapshot.json`
   - `npm run build` — статический `out/` (Next.js export)
   - `npm run deploy:ftp` — заливает `out/` на Beget
3. Через несколько минут сайт обновлён **без ручной сборки на вашем ПК**.

Локально без Directus всё как раньше: sync берёт данные из `content/` в репозитории.

## 1. Directus

- [Directus Cloud](https://directus.io/) или `docker compose -f directus/docker-compose.yml up` (см. `directus/README.md`).
- Создайте коллекции и **Static Token** для CI (роль: read published items).
- Импорт текущего контента: `npx tsx scripts/migrate-to-directus.ts`.

## 2. Секреты в Sourcecraft

В настройках репозитория → Secrets:

| Secret | Описание |
|--------|----------|
| `DIRECTUS_URL` | `https://xxxx.directus.app` |
| `DIRECTUS_TOKEN` | Static token |
| `FTP_HOST` | FTP Beget |
| `FTP_USER` | |
| `FTP_PASSWORD` | |
| `FTP_REMOTE_DIR` | Каталог сайта на хостинге, например `/art-web-geo.ru/public_html` |
| `FTP_SECURE` | `false` или `true` (FTPS) |

## 3. CI

Файл `.sourcecraft/ci.yaml` уже настроен: sync → build → FTP.

Расписание **cron** подхватывает публикации даже без webhook. Для быстрого отклика добавьте Flow в Directus (см. ниже).

## 4. Запуск CI вручную (API SourceCraft)

Если нужен деплой сразу после публикации, можно вызвать workflow `deploy-site` через [REST API SourceCraft](https://sourcecraft.dev/portal/docs/en/sourcecraft/operations/api) (PAT + POST `/cicd/runs`). Этот URL же можно повесить на Webhook в Directus Flow.

## 5. Flow в Directus (опционально, быстрее чем cron)

**Settings → Flows → Create**

- Trigger: **Event** — `items.create` и `items.update` для `blog_posts`, `pricing_plans`, `faq_items`, `case_items`.
- Condition: `$trigger.payload.status` equals `published` (или проверка в Filter).
- Operation: **Webhook** → URL запуска CI Sourcecraft (если доступен в вашем тарифе) **или** сервис вроде [hookdeck](https://hookdeck.com) → пустой commit в `main` через API.

Если webhook недоступен — достаточно cron **каждые 5 минут** в CI.

## 6. Роли для копирайтера

- Роль **Editor**: create/update своих коллекций, без доступа к Settings.
- Поля **status**: draft до проверки, **published** — попадёт на сайт после следующего CI.

## 7. Проверка локально

```bash
set DIRECTUS_URL=...
set DIRECTUS_TOKEN=...
npm run cms:sync
npm run build
```

Откройте `out/` или `npm run dev` (перед dev один раз `npm run cms:sync`).

## 8. Обложки блога

- Вариант A: в Directus поле **image** (файл) + Public read на assets Directus.
- Вариант B: markdown с `![](/img/slug.webp)` — файл кладёте в `public/img/` в репо (редко) или отдельным шагом CI позже.
