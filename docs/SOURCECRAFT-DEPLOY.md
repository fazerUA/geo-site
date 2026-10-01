# Деплой art-web-geo.ru через Sourcecraft (как light-carton)

При **push в `main`**: lint → `npm run build` → **rsync** папки `out/` на Beget по SSH.

Конфиг: `.sourcecraft/ci.yaml` + `.sourcecraft/.gitlab-ci.yaml`.

## Секреты в Sourcecraft

Репозиторий → **Settings → Secrets** (те же имена, что у light-carton; значения — для **art-web-geo**):

| Secret | Описание |
|--------|----------|
| `SSH_PRIVATE_KEY` | Приватный ключ **ed25519** в **base64** (одной строкой, без переносов) |
| `SSH_KNOWN_HOSTS` | Строка из `ssh-keyscan` для хоста Beget |
| `SSH_USER` | SSH-пользователь Beget |
| `SSH_HOST` | Хост SSH Beget (например `ваш-login.beget.tech`) |
| `DEPLOY_PATH` | **Каталог сайта art-web-geo на сервере** — не путь light-carton. Пример: `/home/l/login/domains/art-web-geo.ru/public_html` |

`DEPLOY_PATH` возьмите из панели Beget для домена **art-web-geo.ru** (SSH/FTP → домашняя директория сайта).

### Ключ для CI

На Beget добавьте **публичный** ключ в SSH-доступ. Приватный:

```powershell
# Windows: base64 одной строкой для секрета SSH_PRIVATE_KEY
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$env:USERPROFILE\.ssh\id_ed25519"))
```

```bash
# known_hosts
ssh-keyscan -t ed25519 ВАШ_SSH_HOST
```

## Pull Request

В PR в `main` запускается только **verify** (lint), без деплоя.

## Ручная выкладка

Если CI не используете: `docs/MANUAL-DEPLOY.md` или локально `npm run deploy:ftp` (FTP, отдельные переменные).
