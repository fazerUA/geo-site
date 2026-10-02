# Админка Decap на art-web-geo.ru/admin

Редактор открывает **https://art-web-geo.ru/admin/** и вводит **логин/пароль** (HTTP Basic Auth на Beget). Внутри — формы статей блога; сохранение создаёт коммит в **GitHub** (`fazerUA/geo-site`).

## Что даёт .htaccess

- Закрывает `/admin/` от посторонних **до** загрузки Decap.
- Это **не** заменяет GitHub: Decap по-прежнему пишет в репозиторий через GitHub API.

## 1. Пароль на Beget (один раз)

1. SSH или файловый менеджер Beget.
2. Создайте файл паролей (путь **вне** `public_html`), например `/home/l/логин/.htpasswd`:

   ```bash
   htpasswd -c /home/l/логин/.htpasswd editor
   ```

3. В каталоге сайта создайте **`admin/.htaccess`** (шаблон: `public/admin/.htaccess.example`):

   ```apache
   AuthType Basic
   AuthName "GEO Admin"
   AuthUserFile /home/l/логин/.htpasswd
   Require valid-user
   ```

   Путь `AuthUserFile` возьмите из панели Beget (как для `DEPLOY_PATH`, но файл `.htpasswd` лежит у домашней директории).

При деплое через CI файл **`admin/.htaccess` на сервере не перезаписывается** (исключён в rsync). Настройте его один раз на хостинге.

## 2. GitHub (чтобы «Сохранить» работало на live)

Репозиторий: **`fazerUA/geo-site`**, ветка **`main`**.

На Beget **нельзя** использовать встроенный вход через `api.netlify.com` — будет **Page not found**. Нужен свой OAuth-proxy и строки в config:

```yaml
base_url: https://ваш-proxy.workers.dev
auth_endpoint: auth
```

Пошагово: **`docs/DECAP-GITHUB-OAUTH.md`** (Cloudflare Workers + GitHub OAuth App, ~15 минут).

1. Задеплойте proxy, раскомментируйте `base_url` / `auth_endpoint` в `public/admin/config.yml`.
2. `npm run build` → залейте `out/`.
3. В Decap на сайте: **Login** → GitHub (аккаунт с правом push в репо).

### Sourcecraft

Основной remote у проекта — **Sourcecraft**. После правок через Decap (коммит в GitHub):

```powershell
git pull github main
git push origin main
```

(или настройте зеркало / автосинхронизацию). Деплой на Beget — push в `origin main` и CI, либо локальный `npm run build` + заливка `out/`.

## 3. Локальная проверка (без .htaccess)

Терминал 1:

```powershell
npm run dev
```

Терминал 2 (из корня репозитория):

```powershell
npm run cms:proxy
```

Откройте **`http://localhost:3000/admin/`** (внутри — Decap на `/admin/cms.html`).

При работающем proxy правки пишутся **в локальные файлы** (`content/blog/`, `content/cms/`), в GitHub не уходят. После сохранения в Decap обновите главную в браузере (F5) — сайт читает JSON напрямую. Для prod: `git commit` → push → `npm run build` → FTP.

### Если поля только для чтения

| Ситуация | Что сделать |
|----------|-------------|
| **Локально** | Запущен ли `npm run cms:proxy`? Открывайте сайт как **`http://localhost:3000/admin/`**, не по IP LAN. В DevTools → Network при «Сохранить» должны быть запросы на **`localhost:8081`**, не на `api.github.com`. |
| **На art-web-geo.ru** | Нужен вход **GitHub** в шапке Decap (OAuth через Netlify). Без входа публичный репо только **читается**. Настройка OAuth — раздел 2 ниже. |

## 4. Обложки

- Загрузка через Decap → `public/img/` в репо.
- Или укажите в поле «Обложка» путь `/img/имя.webp` после ручной загрузки.

## 5. Что редактируется в Decap

| Раздел | Файлы |
|--------|--------|
| **Лендинг** → Тарифы, FAQ, Кейсы | `content/cms/*.json` |
| **Блог** | `content/blog/*.md` |

Тексты **«О нас»**, hero главной, юридические страницы — пока в `content/about/`, `content/home/` (не в Decap).

## Ограничения

| Ожидание | Реальность |
|----------|------------|
| Только пароль Beget, без GitHub | Сохранение в git **не** заработает без OAuth GitHub (или Git Gateway на Netlify) |
| Пароль на `/admin` | ✅ Дополнительная защита — настраивается `.htaccess` на сервере |

Если нужен **только** логин-пароль без GitHub при сохранении — смотрите **Sanity** или CMS на VPS (Directus).
