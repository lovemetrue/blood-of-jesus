# Deployment Guide - Развертывание на Production

## Вариант 1: Развертывание на VPS (Ubuntu)

### 1. Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Python и зависимостей
sudo apt install python3-pip python3-venv nginx postgresql postgresql-contrib -y

# Установка Gunicorn
pip3 install gunicorn
```

### 2. Настройка PostgreSQL

```bash
# Вход в PostgreSQL
sudo -u postgres psql

# Создание базы данных и пользователя
CREATE DATABASE liberation_db;
CREATE USER liberation_user WITH PASSWORD 'strong_password';
ALTER ROLE liberation_user SET client_encoding TO 'utf8';
ALTER ROLE liberation_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE liberation_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE liberation_db TO liberation_user;
\q
```

### 3. Развертывание приложения

```bash
# Создание директории
sudo mkdir -p /var/www/liberation_ministry
cd /var/www/liberation_ministry

# Клонирование проекта
git clone your-repo-url .

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt
pip install gunicorn psycopg2-binary

# Настройка .env файла
nano .env
```

### 4. Настройка Gunicorn

Создайте файл `/etc/systemd/system/liberation.service`:

```ini
[Unit]
Description=Liberation Ministry Gunicorn
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/liberation_ministry
Environment="PATH=/var/www/liberation_ministry/venv/bin"
ExecStart=/var/www/liberation_ministry/venv/bin/gunicorn \
    --workers 3 \
    --bind unix:/var/www/liberation_ministry/liberation.sock \
    liberation_ministry.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
# Запуск сервиса
sudo systemctl start liberation
sudo systemctl enable liberation
sudo systemctl status liberation
```

### 5. Настройка Nginx

Создайте файл `/etc/nginx/sites-available/liberation`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        alias /var/www/liberation_ministry/staticfiles/;
    }
    
    location /media/ {
        alias /var/www/liberation_ministry/media/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/liberation_ministry/liberation.sock;
    }
}
```

```bash
# Активация конфигурации
sudo ln -s /etc/nginx/sites-available/liberation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL сертификат (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение сертификата
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Автообновление
sudo certbot renew --dry-run
```

### 7. Финальные настройки Django

```bash
# Сбор статики
python manage.py collectstatic --no-input

# Миграции
python manage.py migrate

# Создание суперпользователя
python manage.py createsuperuser
```

---

## Вариант 2: Развертывание на Heroku

### 1. Подготовка проекта

Создайте `Procfile`:

```
web: gunicorn liberation_ministry.wsgi --log-file -
```

Создайте `runtime.txt`:

```
python-3.11.5
```

Обновите `requirements.txt`:

```bash
pip freeze > requirements.txt
```

### 2. Установка Heroku CLI

```bash
# Установка
curl https://cli-assets.heroku.com/install.sh | sh

# Логин
heroku login
```

### 3. Создание приложения

```bash
# Создание приложения
heroku create liberation-ministry

# Добавление PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Настройка переменных окружения
heroku config:set SECRET_KEY='your-secret-key'
heroku config:set DEBUG=False
heroku config:set YOOKASSA_SHOP_ID='your-shop-id'
heroku config:set YOOKASSA_SECRET_KEY='your-secret-key'
```

### 4. Развертывание

```bash
# Инициализация git (если не сделано)
git init
git add .
git commit -m "Initial commit"

# Деплой
git push heroku main

# Миграции
heroku run python manage.py migrate

# Создание суперпользователя
heroku run python manage.py createsuperuser

# Сбор статики (если настроено)
heroku run python manage.py collectstatic --no-input
```

---

## Вариант 3: Развертывание на Docker

### 1. Dockerfile

```dockerfile
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Установка зависимостей системы
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Установка зависимостей Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование проекта
COPY . .

# Сбор статики
RUN python manage.py collectstatic --no-input

# Запуск
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "liberation_ministry.wsgi:application"]
```

### 2. docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: liberation_db
      POSTGRES_USER: liberation_user
      POSTGRES_PASSWORD: strong_password

  web:
    build: .
    command: gunicorn liberation_ministry.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/app
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db

  nginx:
    image: nginx:latest
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - static_volume:/app/staticfiles
      - media_volume:/app/media
    ports:
      - "80:80"
    depends_on:
      - web

volumes:
  postgres_data:
  static_volume:
  media_volume:
```

### 3. Запуск

```bash
# Сборка и запуск
docker-compose up -d --build

# Миграции
docker-compose exec web python manage.py migrate

# Создание суперпользователя
docker-compose exec web python manage.py createsuperuser
```

---

## Production Checklist

- [ ] DEBUG = False в production
- [ ] Уникальный SECRET_KEY
- [ ] Настроен ALLOWED_HOSTS
- [ ] Используется PostgreSQL/MySQL (не SQLite)
- [ ] Настроен HTTPS/SSL
- [ ] Настроена отправка email
- [ ] Настроен сбор статики
- [ ] Настроены backup базы данных
- [ ] Настроен мониторинг ошибок (Sentry)
- [ ] Настроены логи
- [ ] Протестированы все формы
- [ ] Проверена интеграция с ЮKassa
- [ ] Настроены webhook ЮKassa
- [ ] Проверена безопасность (SQL injection, XSS, CSRF)

---

## Мониторинг и логирование

### Установка Sentry (опционально)

```bash
pip install sentry-sdk
```

В `settings.py`:

```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)
```

### Логирование

В `settings.py`:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/liberation/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```
