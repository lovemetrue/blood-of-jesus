from django.contrib import admin
from .models import ContactMessage, Donation, Material


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'created_at', 'is_processed']
    list_filter = ['is_processed', 'created_at']
    search_fields = ['name', 'email', 'message']


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['amount', 'email', 'status', 'created_at', 'completed_at']
    list_filter = ['status', 'created_at']


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ['title', 'material_type', 'download_count', 'is_active', 'created_at']
    list_filter = ['material_type', 'is_active']
