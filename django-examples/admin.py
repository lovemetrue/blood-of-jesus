# Django Admin
from django.contrib import admin
from .models import ContactMessage, Donation, Material


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at', 'is_processed']
    list_filter = ['is_processed', 'created_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Информация о сообщении', {
            'fields': ('name', 'email', 'message', 'created_at')
        }),
        ('Статус', {
            'fields': ('is_processed',)
        }),
    )


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['amount', 'email', 'status', 'created_at', 'completed_at']
    list_filter = ['status', 'created_at']
    search_fields = ['email', 'payment_id']
    readonly_fields = ['created_at', 'completed_at', 'payment_id']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Информация о пожертвовании', {
            'fields': ('amount', 'email', 'payment_id')
        }),
        ('Статус', {
            'fields': ('status', 'created_at', 'completed_at')
        }),
    )


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ['title', 'material_type', 'download_count', 'is_active', 'created_at']
    list_filter = ['material_type', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at', 'updated_at', 'download_count']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'description', 'material_type', 'icon_name')
        }),
        ('Файл', {
            'fields': ('file',)
        }),
        ('Статус', {
            'fields': ('is_active', 'download_count', 'created_at', 'updated_at')
        }),
    )
