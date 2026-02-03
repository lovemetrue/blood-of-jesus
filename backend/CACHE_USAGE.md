# Использование Valkey для кэширования

## Обзор

Проект использует **Valkey** (совместимый с Redis) для кэширования данных и ускорения работы приложения.

## Конфигурация

### Переменные окружения

В `.env` файле можно настроить:

```bash
# Valkey/Redis настройки (опционально, есть значения по умолчанию)
VALKEY_HOST=valkey  # Для docker-compose, для prod: 127.0.0.1
VALKEY_PORT=6379
```

### Настройки в settings.py

Кэш настроен в `CACHES`:
- **Backend**: `django_redis.cache.RedisCache`
- **Timeout по умолчанию**: 5 минут (300 секунд)
- **Префикс ключей**: `bloodofjesus`
- **Сжатие**: включено (zlib)
- **Игнорирование ошибок**: включено (приложение не упадет, если Valkey недоступен)

## Использование

### 1. Базовое использование

```python
from django.core.cache import cache

# Сохранить в кэш
cache.set('my_key', 'my_value', timeout=300)  # 5 минут

# Получить из кэша
value = cache.get('my_key')

# Удалить из кэша
cache.delete('my_key')

# Проверить существование
if cache.has_key('my_key'):
    value = cache.get('my_key')
```

### 2. Использование утилит (рекомендуется)

```python
from main.cache_utils import get_or_set_cache, invalidate_materials_cache

# Получить или установить значение
def fetch_expensive_data():
    # Дорогая операция (запрос к БД, внешний API и т.д.)
    return expensive_operation()

data = get_or_set_cache('expensive_data', fetch_expensive_data, timeout=3600)

# Инвалидировать кэш материалов
invalidate_materials_cache()
```

### 3. Декоратор для кэширования view

```python
from django.views.decorators.cache import cache_page

@cache_page(60 * 60)  # Кэшировать на 1 час
def my_view(request):
    return JsonResponse({'data': 'cached'})
```

### 4. Создание ключей кэша

```python
from main.cache_utils import cache_key_maker

# Создать ключ с префиксом и параметрами
key = cache_key_maker('user_profile', user_id=123, lang='ru')
# Результат: "user_profile:lang:ru:user_id:123"
```

## Примеры использования в проекте

### Кэширование списка материалов

API endpoint `/api/materials/` автоматически кэширует список материалов на 1 час. Кэш автоматически инвалидируется при:
- Создании нового материала
- Обновлении существующего материала
- Удалении материала

### Кэширование сессий

Сессии Django хранятся в Valkey (настроено в `SESSION_ENGINE`), что ускоряет работу с сессиями.

## Мониторинг и отладка

### Проверка статуса Valkey

```bash
# В контейнере
docker exec bloodofjesus-valkey valkey-cli ping
# Должно вернуть: PONG

# Проверить статистику
docker exec bloodofjesus-valkey valkey-cli info stats

# Посмотреть все ключи (осторожно на production!)
docker exec bloodofjesus-valkey valkey-cli keys "*"
```

### Очистка кэша

```python
from django.core.cache import cache

# Очистить весь кэш
cache.clear()

# Очистить конкретный ключ
cache.delete('materials_list_active')
```

### Логирование

Если Valkey недоступен, Django продолжит работу без кэша (благодаря `IGNORE_EXCEPTIONS: True`). Проверьте логи Django для диагностики проблем.

## Производительность

### Рекомендации

1. **Кэшируйте часто запрашиваемые данные**: списки материалов, статические конфигурации
2. **Устанавливайте разумные timeout**: не слишком короткие (чтобы не перегружать БД) и не слишком длинные (чтобы данные не устаревали)
3. **Используйте префиксы**: для организации ключей и легкой очистки групп данных
4. **Мониторьте использование памяти**: Valkey имеет лимит 256MB (настроено в docker-compose)

### Типичные timeout

- **Списки материалов**: 1 час (3600 сек)
- **Статические данные**: 24 часа (86400 сек)
- **Пользовательские данные**: 5-15 минут (300-900 сек)
- **Временные данные**: 1-5 минут (60-300 сек)

## Troubleshooting

### Проблема: Кэш не работает

1. Проверьте, что контейнер Valkey запущен: `docker ps | grep valkey`
2. Проверьте подключение: `docker exec bloodofjesus-valkey valkey-cli ping`
3. Проверьте переменные окружения `VALKEY_HOST` и `VALKEY_PORT`
4. Проверьте логи Django на наличие ошибок подключения

### Проблема: Устаревшие данные в кэше

Используйте сигналы Django для автоматической инвалидации кэша при изменении данных (см. `main/signals.py`).

### Проблема: Нехватка памяти

Увеличьте `maxmemory` в docker-compose.yml или оптимизируйте использование кэша (уменьшите timeout, удалите неиспользуемые ключи).
