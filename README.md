# Кровь и вода — освобождение и исцеление через Иисуса Христа

Сайт служения освобождения: материалы, проповеди, заветы (спасения, посвящения, даяния), разделы о вере и свободе, форма обратной связи и пожертвования (ЮKassa).

## Стек

- **Фронтенд:** React, TypeScript, Vite, Tailwind CSS
- **Бэкенд:** Django (REST API, формы, донаты)
- **БД:** PostgreSQL
- **Деплой:** Docker, Docker Compose, CI/CD (GitHub Actions)

## Разработка (локально)

### Только фронтенд

```bash
npm install
npm run dev
```

Сайт: http://localhost:5173

### Фронтенд + бэкенд (Docker)

Все сервисы в `docker-compose.yml`. Образы собираются под **linux/amd64** (совместимо с VPS).

1. Запустите Docker Desktop.
2. В корне проекта создайте `.env` (скопируйте из `.env.example` при необходимости).
3. Сборка и запуск:

```bash
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build
docker compose up -d
```

- Сайт: http://localhost:8080  
- Бэкенд/API: http://localhost:8000  
- Миграции: `docker compose exec backend python manage.py migrate`  
- Суперпользователь: `docker compose exec backend python manage.py createsuperuser`

## Деплой

- Настройка сервера и деплой: см. [deploy/DEPLOY.md](deploy/DEPLOY.md)
- ЮKassa (вебхуки): [YOOKASSA_WEBHOOK_SETUP.md](YOOKASSA_WEBHOOK_SETUP.md)

## Лицензия и атрибуты

См. [ATTRIBUTIONS.md](ATTRIBUTIONS.md).
