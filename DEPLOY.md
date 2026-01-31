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

## Настройка DNS

Добавьте A-записи для bloodofjesus.ru и www.bloodofjesus.ru на IP: 85.198.81.59

## Webhook ЮKassa

В личном кабинете ЮKassa укажите URL для уведомлений:
`https://bloodofjesus.ru/donations/callback/`
