from django.urls import path
from . import api_views

urlpatterns = [
    path('contact/', api_views.contact_submit),
    path('materials/', api_views.materials_list),
    path('donations/create/', api_views.create_donation),
]
