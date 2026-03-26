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

Сайт: [http://localhost:5173](http://localhost:5173)

### Фронтенд + бэкенд (Docker)

Все сервисы в `docker-compose.yml`. Образы собираются под **linux/amd64** (совместимо с VPS).

1. Запустите Docker Desktop.
2. В корне проекта создайте `.env` (скопируйте из `.env.example` при необходимости).
3. Сборка и запуск:

```bash
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build
docker compose up -d
```

- Сайт: [http://localhost:8080](http://localhost:8080)  
- Бэкенд/API: [http://localhost:8000](http://localhost:8000)  
- Миграции: `docker compose exec backend python manage.py migrate`  
- Суперпользователь: `docker compose exec backend python manage.py createsuperuser`

## Деплой

- Настройка сервера и деплой: см. [deploy/DEPLOY.md](deploy/DEPLOY.md)

## Security: сканирование образов (Trivy)

В `docker-compose.prod.yml` есть сервис `trivy-scan` (профиль `scan`). Он сканирует прод-образы backend/frontend и базовые образы `postgres`/`valkey` на **HIGH/CRITICAL**.

Запуск (на сервере, из папки с `docker-compose.prod.yml`):

```bash
docker compose -f docker-compose.prod.yml --profile scan run --rm trivy-scan
```

Отчёты сохраняются в `./trivy-reports/` (внутри проекта) с именами вида `trivy_YYYYMMDDTHHMMSSZ.txt`.

