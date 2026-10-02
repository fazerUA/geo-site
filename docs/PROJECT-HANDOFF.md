# Handoff: art-web-geo.ru (geo)

Краткий контекст для продолжения работы на другой машине или в новом чате Cursor. Детали — в связанных доках.

**Обновлено:** 2026-10-02

---

## Проект

| | |
|--|--|
| **Сайт** | https://art-web-geo.ru |
| **Стек** | Next.js 15, `output: "export"`, статика в **`out/`** |
| **Хостинг** | Beget shared, заливка **FTP** (логин FTP: `artwebler_office`, каталог ~ `art-web-geo.ru/public_html`) |
| **Git origin** | Sourcecraft: `https://git@git.sourcecraft.dev/fzrua/art-web-geo.git` |
| **Git github** | Decap CMS: `https://github.com/fazerUA/geo-site.git`, ветка **`main`** |

CI deploy (Sourcecraft SSH/rsync) описан в `docs/SOURCECRAFT-DEPLOY.md`; **основной путь сейчас — ручной** `npm run build` + FTP → `docs/MANUAL-DEPLOY.md`.

Directus в коде есть (`lib/cms/`, `scripts/sync-cms.ts`), но **без env** сборка берёт контент из **файлов в репо**.

---

## Контент

| Раздел | Где править |
|--------|-------------|
| Блог | `content/blog/*.md` |
| Тарифы, FAQ, кейсы (лендинг) | `content/cms/*.json` → импорт через `content/landing/*.ts` |
| Hero, «О нас», legal | `content/home/`, `content/about/`, `content/legal/` — **не в Decap** |
| Обложки | `public/img/` |

При `npm run build` выполняется `prebuild`: `cms:sync` → `lib/generated/landing.snapshot.ts`.

---

## Decap CMS (`/admin/`)

| | |
|--|--|
| **Конфиг** | `public/admin/config.yml` |
| **UI** | `app/admin/page.tsx` (iframe) → `public/admin/cms.html` |
| **Локально** | Терминал 1: `npm run dev` · Терминал 2: **`npm run cms:proxy`** → `http://localhost:3000/admin/` |
| **Live на Beget** | Те же файлы из `out/admin/`; **`local_backend` на проде не используется** |

**Коллекции:** «Лендинг (главная)» (тарифы, FAQ, кейсы) + «Блог».

Вложенные списки в config: у `field` обязательно `name` (`item`, `path`); нормализация в `lib/cms/normalize-decap-string-list.ts`.

### Решения по live-админке (2026-10)

1. **Netlify OAuth (`api.netlify.com`) на Beget не работает** → 404. Нужен свой **OAuth-proxy** (рекомендация: Cloudflare Workers + [decap-proxy](https://github.com/sterlingwes/decap-proxy)) и в config:
   ```yaml
   base_url: https://….workers.dev
   auth_endpoint: auth
   ```
   Пошагово: **`docs/DECAP-GITHUB-OAUTH.md`**.

2. **Этап 2 (OAuth) отложен.** Согласованный workflow без live-save:
   - редактор правит **локально** (`dev` + `cms:proxy`) → **git commit/push**;
   - владелец: **`git pull`** → **`npm run build`** → заливка **`out/`** на Beget.

3. **`.htpasswd` / Basic Auth** на каталог `admin` — только **скрыть URL**, не заменяет GitHub OAuth. Настройка: `docs/DECAP-ADMIN.md`, шаблон `public/admin/.htaccess.example`. Раньше был **500** из‑за неверного `AuthUserFile`; с полным аккаунтом Beget удобнее «Защита паролем» на каталог в панели.

---

## Команды (владелец)

```powershell
npm run dev
npm run cms:proxy
npm run build          # перед FTP
git pull origin main
git pull github main   # после правок редактора через Decap→GitHub (когда включат OAuth)
git push origin main
git push github main
```

---

## Открытые задачи

- [ ] Закоммитить и запушить незакоммиченное (если ещё локально): `docs/DECAP-GITHUB-OAUTH.md`, правки `docs/DECAP-ADMIN.md`, `public/admin/config.yml`
- [ ] Убедиться, что на Beget залита актуальная `out/` с `admin/cms.html`, `admin/config.yml`
- [ ] (Опционально) OAuth-proxy + `base_url` → save с **https://art-web-geo.ru/admin/**
- [ ] (Опционально) пароль на `/admin` в панели Beget
- [ ] (Позже) CI deploy Sourcecraft при готовых SSH-секретах и `DEPLOY_PATH`
- [ ] (Позже) инструкция для редактора: локальный Decap + git push

---

## Документация

| Файл | Назначение |
|------|------------|
| **`docs/PROJECT-HANDOFF.md`** | этот файл |
| `docs/MANUAL-DEPLOY.md` | сборка и FTP |
| `docs/DECAP-ADMIN.md` | админка локально и на Beget |
| `docs/DECAP-GITHUB-OAUTH.md` | GitHub OAuth без Netlify |
| `docs/SOURCECRAFT-DEPLOY.md` | CI/rsync |

---

## Cursor

В новом чате на рабочем ПК: **`@docs/PROJECT-HANDOFF.md`** или коротко «прочитай handoff и продолжим с …».

После крупных решений обновляйте этот файл и делайте commit.
