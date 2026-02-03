"""
Утилиты для работы с кэшем Valkey
"""
from django.core.cache import cache


def invalidate_materials_cache():
    """Инвалидирует кэш списка материалов"""
    cache.delete('materials_list_active')


def get_or_set_cache(key, callable_func, timeout=300):
    """
    Получить значение из кэша или установить его, вызвав функцию
    
    Args:
        key: ключ кэша
        callable_func: функция, которая вернет значение, если его нет в кэше
        timeout: время жизни кэша в секундах (по умолчанию 5 минут)
    
    Returns:
        Значение из кэша или результат выполнения функции
    """
    value = cache.get(key)
    if value is None:
        value = callable_func()
        cache.set(key, value, timeout)
    return value


def cache_key_maker(prefix, *args, **kwargs):
    """
    Создает ключ кэша из префикса и аргументов
    
    Args:
        prefix: префикс ключа
        *args: позиционные аргументы
        **kwargs: именованные аргументы (сортируются для консистентности)
    
    Returns:
        Строка ключа кэша
    """
    parts = [prefix]
    if args:
        parts.extend(str(arg) for arg in args)
    if kwargs:
        sorted_kwargs = sorted(kwargs.items())
        parts.extend(f"{k}:{v}" for k, v in sorted_kwargs)
    return ":".join(parts)
