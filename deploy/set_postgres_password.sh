#!/bin/bash
# Скрипт для установки пароля PostgreSQL в контейнере
# Использование: ./set_postgres_password.sh

set -e

CONTAINER_NAME="bloodofjesus-db"
POSTGRES_USER="liberation_user"
NEW_PASSWORD="jzkIDRd+7nDouxe8Hf4xzcpwioWJb6VD"

echo "=== Установка пароля для PostgreSQL ==="
echo "Контейнер: $CONTAINER_NAME"
echo "Пользователь: $POSTGRES_USER"

# Проверяем, запущен ли контейнер
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo "ОШИБКА: Контейнер $CONTAINER_NAME не запущен"
    exit 1
fi

# Устанавливаем пароль через psql
echo "Установка пароля..."
docker exec -i "$CONTAINER_NAME" psql -U postgres << EOF
ALTER USER $POSTGRES_USER WITH PASSWORD '$NEW_PASSWORD';
\q
EOF

if [ $? -eq 0 ]; then
    echo "✓ Пароль успешно установлен для пользователя $POSTGRES_USER"
else
    echo "✗ Ошибка при установке пароля"
    exit 1
fi

# Проверяем подключение с новым паролем
echo "Проверка подключения с новым паролем..."
PGPASSWORD="$NEW_PASSWORD" docker exec -i "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d liberation_db -c "SELECT version();" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✓ Подключение с новым паролем успешно"
else
    echo "⚠ Предупреждение: не удалось проверить подключение (возможно, нужно обновить .env файл)"
fi

echo "=== Готово ==="
