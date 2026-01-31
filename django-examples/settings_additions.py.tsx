# Добавьте эти настройки в ваш settings.py

# Email настройки
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # или другой SMTP сервер
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
DEFAULT_FROM_EMAIL = 'your-email@gmail.com'
ADMIN_EMAIL = 'admin@example.com'

# ЮKassa настройки
YOOKASSA_SHOP_ID = 'your_shop_id'  # ID магазина из личного кабинета ЮKassa
YOOKASSA_SECRET_KEY = 'your_secret_key'  # Секретный ключ из личного кабинета ЮKassa

# URL сайта
SITE_URL = 'https://yourdomain.com'

# Для загрузки файлов
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CSRF настройки для webhook
CSRF_TRUSTED_ORIGINS = ['https://yookassa.ru']
