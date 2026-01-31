# Django URLs
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('contact/submit/', views.contact_submit, name='contact_submit'),
    path('donations/create/', views.create_donation, name='create_donation'),
    path('donations/callback/', views.donation_callback, name='donation_callback'),
    path('donations/success/', views.donation_success, name='donation_success'),
    path('materials/download/<int:material_id>/', views.download_material, name='download_material'),
]
