"""
Сигналы Django для инвалидации кэша при изменении моделей
"""
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Material
from .cache_utils import invalidate_materials_cache


@receiver(post_save, sender=Material)
def material_saved(sender, instance, **kwargs):
    """Инвалидирует кэш материалов при сохранении"""
    invalidate_materials_cache()


@receiver(post_delete, sender=Material)
def material_deleted(sender, instance, **kwargs):
    """Инвалидирует кэш материалов при удалении"""
    invalidate_materials_cache()
