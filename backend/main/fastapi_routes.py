"""FastAPI routes - расширяемые async API"""
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok", "service": "bloodofjesus-api"}


@router.get("/materials")
async def materials_async():
    """Async API для материалов - можно расширить"""
    import django
    django.setup()
    from main.models import Material
    materials = list(
        Material.objects.filter(is_active=True).values(
            'id', 'title', 'description', 'material_type', 'icon_name'
        )
    )
    return {"materials": materials}
