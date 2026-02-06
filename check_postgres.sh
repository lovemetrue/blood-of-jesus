#!/bin/bash
# Скрипт для проверки конфигурации PostgreSQL на сервере
# Выполните на сервере: bash check_postgres.sh

echo "=== Проверка конфигурации PostgreSQL ==="
echo ""

# Проверка .env файла
if [ -f .env ]; then
    echo "1. Переменные из .env файла:"
    grep -E "^(POSTGRES_DB|POSTGRES_USER|POSTGRES_PASSWORD)=" .env || echo "   Не найдено переменных PostgreSQL"
    echo ""
else
    echo "1. .env файл не найден"
    echo ""
fi

# Проверка docker-compose.prod.yml
if [ -f docker-compose.prod.yml ]; then
    echo "2. Переменные из docker-compose.prod.yml:"
    grep -A 5 "POSTGRES" docker-compose.prod.yml || echo "   Не найдено переменных PostgreSQL"
    echo ""
fi

# Проверка запущенных контейнеров
echo "3. Запущенные контейнеры PostgreSQL:"
docker ps --filter "name=postgres" --format "table {{.Names}}\t{{.Status}}" || echo "   Контейнеры PostgreSQL не найдены"
echo ""

# Проверка переменных окружения в контейнере БД
DB_CONTAINER=$(docker ps --filter "name=db" --format "{{.Names}}" | head -1)
if [ -n "$DB_CONTAINER" ]; then
    echo "4. Переменные окружения в контейнере БД ($DB_CONTAINER):"
    docker exec $DB_CONTAINER env | grep -E "^(POSTGRES_|PG)" || echo "   Не удалось получить переменные"
    echo ""
fi

# Проверка подключения к БД
echo "5. Попытка подключения к PostgreSQL:"
if [ -f .env ]; then
    source .env
    if [ -n "$POSTGRES_DB" ] && [ -n "$POSTGRES_USER" ] && [ -n "$POSTGRES_PASSWORD" ]; then
        echo "   DB: $POSTGRES_DB"
        echo "   User: $POSTGRES_USER"
        echo "   Password: ${POSTGRES_PASSWORD:0:5}..."
        
        # Попытка подключения через psql в контейнере
        if [ -n "$DB_CONTAINER" ]; then
            echo "   Проверка подключения..."
            docker exec $DB_CONTAINER psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT version();" 2>&1 | head -3 || echo "   Ошибка подключения"
        fi
    else
        echo "   Не все переменные PostgreSQL заданы в .env"
    fi
else
    echo "   .env файл не найден"
fi

echo ""
echo "=== Готово ==="
