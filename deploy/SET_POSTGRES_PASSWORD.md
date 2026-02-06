# Установка пароля PostgreSQL

## Команда для выполнения на сервере:

```bash
ssh root@85.198.81.59
# Пароль: a4#gL+8G+E-eFZ

cd /www/blood-of-jesus

# Установка пароля для пользователя liberation_user
docker exec -i bloodofjesus-db psql -U postgres -c "ALTER USER liberation_user WITH PASSWORD 'jzkIDRd+7nDouxe8Hf4xzcpwioWJb6VD';"

# Проверка подключения с новым паролем
PGPASSWORD='jzkIDRd+7nDouxe8Hf4xzcpwioWJb6VD' docker exec -i bloodofjesus-db psql -U liberation_user -d liberation_db -c "SELECT version();"

# Обновление .env файла
sed -i '/^POSTGRES_PASSWORD=/d' .env
echo "POSTGRES_PASSWORD=jzkIDRd+7nDouxe8Hf4xzcpwioWJb6VD" >> .env

# Проверка
grep POSTGRES_PASSWORD .env
```

## Альтернативный способ (если контейнер не запущен):

```bash
cd /www/blood-of-jesus

# Запустить контейнеры
docker compose -f docker-compose.prod.yml up -d db

# Подождать пока БД запустится
sleep 5

# Установить пароль
docker exec -i bloodofjesus-db psql -U postgres -c "ALTER USER liberation_user WITH PASSWORD 'jzkIDRd+7nDouxe8Hf4xzcpwioWJb6VD';"
```
