
  # Deliverance Ministry

  This is a code bundle for Deliverance Ministry. The original project is available at https://www.figma.com/design/wyXDDuiluwFGgvypHV5ITO/Deliverance-Ministry.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Локальная сборка образов (Docker, macOS)

  Все сервисы в одном файле `docker-compose.yml`. Образы собираются под **linux/amd64** (совместимо с VPS).

  1. Запустите Docker Desktop.
  2. В корне проекта создайте `.env` (или скопируйте из `.env.example`).
  3. Сборка под linux/amd64 и запуск:

  ```bash
  DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build
  docker compose up -d
  ```

  - Сайт: http://localhost:8080  
  - Бэкенд/API: http://localhost:8000  
  - Миграции: `docker compose exec backend python manage.py migrate`  
  - Суперпользователь: `docker compose exec backend python manage.py createsuperuser`
