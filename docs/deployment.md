# CI/CD deployment

## Что добавлено в репозиторий

- `.github/workflows/deploy-production.yml` деплоит `master` в production.
- `.github/workflows/deploy-development.yml` деплоит `develop` в development.

Оба workflow сначала запускают `npm ci` и `npm run build` на GitHub runner. Если сборка прошла, workflow подключается по SSH к серверу, обновляет нужную папку, собирает проект на сервере и перезапускает нужный PM2-процесс.

## Принятая схема окружений

Production:

- Git branch: `master`
- Server path: `/var/www/gsu-nuxt`
- PM2 process: `gsu-nuxt`
- Nitro port: `3000`

Development:

- Git branch: `develop`
- Server path: `/var/www/gsu-nuxt-dev`
- PM2 process: `gsu-nuxt-dev`
- Nitro port: `3001`

Если фактические PM2 names или порты другие, поменяйте значения в GitHub Environment Variables, а не YAML.

## GitHub: что настроить

### 1. Создать ветку `develop`

```bash
git checkout master
git pull
git checkout -b develop
git push -u origin develop
```

### 2. Создать Environments

В GitHub repository settings:

- `Settings` -> `Environments` -> `New environment`
- создать `production`
- создать `development`

Для `production` желательно включить required reviewers, чтобы production deploy требовал ручного подтверждения.

### 3. Добавить Environment secrets

В оба environment добавить:

- `SERVER_HOST`: IP или hostname сервера
- `SERVER_USER`: пользователь для SSH
- `SERVER_SSH_PRIVATE_KEY`: приватный SSH-ключ, которым GitHub Actions подключается к серверу

Важно: это ключ для доступа Actions к серверу. Это не обязательно тот же ключ, которым сервер ходит в GitHub за репозиторием.

### 4. Добавить Environment variables

Для `production`:

- `SERVER_PORT`: `22`
- `APP_PATH`: `/var/www/gsu-nuxt`
- `GIT_REMOTE`: `upstream2`
- `PM2_APP_NAME`: `gsu-nuxt`
- `NITRO_PORT`: `3000`
- `NUXT_PUBLIC_SITE_URL`: production URL, например `https://gsu.terexov.ru`

Для `development`:

- `SERVER_PORT`: `22`
- `APP_PATH`: `/var/www/gsu-nuxt-dev`
- `GIT_REMOTE`: `upstream2`
- `PM2_APP_NAME`: `gsu-nuxt-dev`
- `NITRO_PORT`: `3001`
- `NUXT_PUBLIC_SITE_URL`: dev URL, например `https://dev.gsu.terexov.ru`

## Server: что настроить

### 1. Проверить текущую production-конфигурацию

Выполнить на сервере и сохранить вывод:

```bash
pm2 list
pm2 show gsu-nuxt
cd /var/www/gsu-nuxt
git remote -v
git branch --show-current
node -v
npm -v
pm2 -v
```

Если production PM2 process называется не `gsu-nuxt`, используйте фактическое имя в переменной `PM2_APP_NAME`.

### 2. Создать папку development-контура

```bash
sudo mkdir -p /var/www/gsu-nuxt-dev
sudo chown -R "$USER":"$USER" /var/www/gsu-nuxt-dev
```

Получить URL репозитория из production-клона:

```bash
cd /var/www/gsu-nuxt
git remote get-url upstream2
```

Склонировать development:

```bash
cd /var/www
git clone -b develop "$(cd /var/www/gsu-nuxt && git remote get-url upstream2)" gsu-nuxt-dev
cd /var/www/gsu-nuxt-dev
git remote rename origin upstream2
npm ci
npm run build
```

Если серверный ключ `~/.ssh/id_rsa` уже имеет доступ к репозиторию, отдельные настройки GitHub deploy key для dev-клона не нужны.

### 3. Создать PM2 process для development

```bash
cd /var/www/gsu-nuxt-dev
NUXT_PUBLIC_SITE_URL="https://dev.gsu.terexov.ru" NITRO_PORT=3001 PORT=3001 pm2 start .output/server/index.mjs --name gsu-nuxt-dev
pm2 save
```

Production process должен быть запущен аналогично на своем порту:

```bash
cd /var/www/gsu-nuxt
NUXT_PUBLIC_SITE_URL="https://gsu.terexov.ru" NITRO_PORT=3000 PORT=3000 pm2 start .output/server/index.mjs --name gsu-nuxt
pm2 save
```

Если production process уже существует, не создавайте дубль. Используйте:

```bash
pm2 show gsu-nuxt
```

### 4. Настроить nginx для development

Сначала посмотреть текущие настройки:

```bash
sudo nginx -T | grep -nE "server_name|proxy_pass|gsu|3000|3001|listen"
ls -la /etc/nginx/sites-enabled /etc/nginx/conf.d
```

Нужна отдельная server-секция для dev-домена, проксирующая на `127.0.0.1:3001`.

Пример:

```nginx
server {
    listen 80;
    server_name dev.gsu.terexov.ru;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Проверка и reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Для HTTPS выпустить сертификат тем же способом, который уже используется на production. Если используется certbot:

```bash
sudo certbot --nginx -d dev.gsu.terexov.ru
```

## Что нужно уточнить по серверу

Чтобы точно подогнать переменные GitHub и nginx/PM2 без догадок, пришлите вывод:

```bash
pm2 list
pm2 show gsu-nuxt
sudo nginx -T | grep -nE "server_name|proxy_pass|gsu|3000|3001|listen"
cd /var/www/gsu-nuxt && git remote -v && git branch --show-current
node -v && npm -v && pm2 -v
```

Если dev-домен уже выбран, пришлите его тоже. Если не выбран, используйте временно поддомен вида `dev.<production-domain>`.
