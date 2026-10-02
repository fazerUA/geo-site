# GitHub-вход Decap на Beget (без Netlify)

## Почему 404 на api.netlify.com

Decap по умолчанию открывает:

`https://api.netlify.com/auth?provider=github&site_id=art-web-geo.ru&...`

Это работает **только** для сайтов, привязанных к Netlify. У **art-web-geo.ru** на Beget такого «site_id» нет → **Page not found**.

**Решение:** свой **OAuth-proxy** (бесплатно на Cloudflare Workers) + строки `base_url` и `auth_endpoint` в `public/admin/config.yml`.

Локальная админка (`local_backend` + `npm run cms:proxy`) от этого **не страдает**.

---

## Шаг 1. GitHub OAuth App

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Заполните (URL proxy подставите после шага 2; можно создать App после деплоя worker):

   | Поле | Значение |
   |------|----------|
   | Application name | `Decap art-web-geo` (любое) |
   | Homepage URL | `https://ВАШ-PROXY.workers.dev` |
   | Authorization callback URL | `https://ВАШ-PROXY.workers.dev/callback` |

3. Сохраните **Client ID** и сгенерируйте **Client secret**.

Репозиторий CMS: **`fazerUA/geo-site`**, ветка **`main`**. Аккаунт, которым входите в Decap, должен иметь **push** в этот репо.

---

## Шаг 2. OAuth-proxy на Cloudflare Workers (рекомендуется)

Домен art-web-geo.ru **переносить на Cloudflare не обязательно** — хватит адреса `*.workers.dev`.

1. Регистрация: [Cloudflare](https://dash.cloudflare.com/sign-up).
2. В отдельной папке (не обязательно внутри geo):

   ```powershell
   git clone https://github.com/sterlingwes/decap-proxy
   cd decap-proxy
   copy wrangler.toml.sample wrangler.toml
   ```

3. В `wrangler.toml` задайте осмысленное `name = "art-web-geo-decap"` (влияет на URL `https://art-web-geo-decap.<account>.workers.dev`).

4. В терминале:

   ```powershell
   npx wrangler login
   npx wrangler secret put GITHUB_OAUTH_ID
   npx wrangler secret put GITHUB_OAUTH_SECRET
   npx wrangler deploy
   ```

5. Откройте **PROXY URL** в браузере — должно быть **Hello 👋**.
6. Вернитесь в GitHub OAuth App и пропишите Homepage + Callback на этот URL (см. шаг 1).

Подробности: [sterlingwes/decap-proxy](https://github.com/sterlingwes/decap-proxy).

### Приватный репозиторий

В `wrangler.toml` установите `GITHUB_REPO_PRIVATE = 1` (см. sample-файл в decap-proxy).

---

## Шаг 3. config.yml на сайте

В `public/admin/config.yml` в блоке `backend:` добавьте (подставьте свой PROXY URL **без** слэша в конце):

```yaml
backend:
  name: github
  repo: fazerUA/geo-site
  branch: main
  open_authoring: false
  base_url: https://art-web-geo-decap.ВАШ-ACCOUNT.workers.dev
  auth_endpoint: auth
```

`base_url` — **только домен proxy**, не `art-web-geo.ru` и не путь `/admin`.

Соберите и залейте на Beget:

```powershell
npm run build
# FTP: содержимое out/, включая admin/config.yml
```

---

## Шаг 4. Проверка на live

1. `https://art-web-geo.ru/admin/` → **Login** / GitHub.
2. Должен открыться **ваш workers.dev**, затем GitHub, затем окно Decap с доступом на запись.
3. Тестовое сохранение → коммит в `fazerUA/geo-site` на GitHub.
4. У себя: `git pull github main` → `npm run build` → FTP.

---

## Альтернатива: Vercel + netlify-cms-github-oauth-provider

Если Cloudflare не подходит:

1. [vencax/netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider)
2. Деплой на Vercel/Railway, переменные: `ORIGINS=art-web-geo.ru`, `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `REDIRECT_URL=https://ваш-oauth.vercel.app/callback`
3. В config: `base_url: https://ваш-oauth.vercel.app` (без `auth_endpoint`, если провайдер на корне `/auth` по умолчанию — при ошибке добавьте `auth_endpoint: auth`).

---

## Частые ошибки

| Симптом | Причина |
|---------|---------|
| 404 на api.netlify.com | Нет `base_url` на свой proxy |
| Белое окно после GitHub | Неверный callback URL в OAuth App |
| Repo not found | Опечатка в `repo:` или нет прав у GitHub-аккаунта |
| postMessage / origin | В vencax-провайдере `ORIGINS` должен содержать `art-web-geo.ru` |
