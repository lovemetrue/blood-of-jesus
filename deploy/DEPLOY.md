# Деплой bloodofjesus.ru

## Структура проекта

```
├── frontend/     # React SPA (Vite)
├── backend/      # Django + FastAPI
├── deploy/       # Скрипты деплоя
├── docker-compose.yml
└── .env.example
```

## Подготовка сервера (VPS)

1. Подключитесь по SSH:
```bash
ssh root@85.198.81.59
```

2. Скопируйте проект на сервер и запустите скрипт подготовки:
```bash
# На вашем компьютере: scp -r "Deliverance Ministry-2 2" root@85.198.81.59:/var/www/bloodofjesus
# Или git clone если проект в репозитории

ssh root@85.198.81.59
cd /var/www/bloodofjesus  # или куда скопировали
chmod +x deploy/setup-server.sh
./deploy/setup-server.sh
```

3. Склонируйте проект:
```bash
mkdir -p /var/www
cd /var/www
git clone YOUR_REPO_URL bloodofjesus
cd bloodofjesus
```

4. Создайте .env:
```bash
cp .env.example .env
nano .env  # Заполните SECRET_KEY, POSTGRES_PASSWORD, YOOKASSA_SHOP_ID, YOOKASSA_SECRET_KEY
```

5. Запустите контейнеры:
```bash
docker-compose up -d --build
```

6. Миграции и суперпользователь:
```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

7. SSL сертификат:
```bash
certbot --nginx -d bloodofjesus.ru -d www.bloodofjesus.ru
```

## Trivy (сканирование уязвимостей образов)

В `docker-compose.prod.yml` есть сервис `trivy-scan` под профилем `scan`. Он:
- сканирует образы `backend`/`frontend` (по `DOCKERHUB_IMAGE`/`IMAGE_TAG` из `.env`)
- сканирует базовые `postgres`/`valkey`
- сохраняет отчёт в папку `./trivy-reports/` на сервере

Ручной запуск:

```bash
cd /var/www/bloodofjesus
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml --profile scan run --rm trivy-scan
ls -la trivy-reports/
```

Регулярный запуск (cron, пример раз в сутки в 04:00 UTC):

```bash
crontab -e
```

Добавьте строку:

```bash
0 4 * * * cd /var/www/bloodofjesus && docker compose -f docker-compose.prod.yml --profile scan run --rm trivy-scan >> /var/log/trivy-bloodofjesus.log 2>&1
```

Если нужен «строгий» режим (падать при HIGH/CRITICAL) — в команде Trivy замените `--exit-code 0` на `--exit-code 1`.

## Настройка DNS

Добавьте A-записи для bloodofjesus.ru и www.bloodofjesus.ru на IP: 85.198.81.59

## Webhook ЮKassa

В личном кабинете ЮKassa укажите URL для уведомлений:
`https://bloodofjesus.ru/donations/callback/`
