# Структура Django проекта

## Полная структура файлов

```
liberation_ministry/              # Корневая директория проекта
│
├── manage.py                     # Django management script
│
├── liberation_ministry/          # Основная директория проекта
│   ├── __init__.py
│   ├── settings.py              # Настройки проекта
│   ├── urls.py                  # Главный URL конфигуратор
│   ├── wsgi.py                  # WSGI конфигурация
│   └── asgi.py                  # ASGI конфигурация
│
├── main/                         # Главное приложение
│   ├── __init__.py
│   ├── admin.py                 # Админ-панель (из django-examples/admin.py)
│   ├── apps.py
│   ├── models.py                # Модели БД (из django-examples/models.py)
│   ├── views.py                 # Views (из django-examples/views.py)
│   ├── forms.py                 # Формы (из django-examples/forms.py)
│   ├── urls.py                  # URL маршруты (из django-examples/urls.py)
│   ├── migrations/
│   │   └── __init__.py
│   └── tests.py
│
├── templates/                    # HTML шаблоны
│   ├── home.html                # Главная страница (из templates/home.html)
│   └── donation_success.html    # Успешное пожертвование
│
├── static/                       # Статические файлы
│   ├── css/
│   │   └── custom.css
│   ├── js/
│   │   └── main.js
│   └── images/
│
├── media/                        # Загружаемые файлы
│   └── materials/               # Материалы для скачивания
│
├── requirements.txt             # Python зависимости
├── .env                         # Переменные окружения (не коммитить!)
├── .gitignore
└── README.md
```

## Команды для создания проекта

```bash
# 1. Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows

# 2. Установка Django
pip install django

# 3. Создание проекта
django-admin startproject liberation_ministry
cd liberation_ministry

# 4. Создание приложения
python manage.py startapp main

# 5. Установка зависимостей
pip install -r requirements.txt
```

## Настройка settings.py

```python
# liberation_ministry/settings.py

import os
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='your-secret-key-here')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=lambda v: [s.strip() for s in v.split(',')])

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',  # Наше приложение
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'liberation_ministry.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'liberation_ministry.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Email настройки
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='noreply@example.com')
ADMIN_EMAIL = config('ADMIN_EMAIL', default='admin@example.com')

# ЮKassa настройки
YOOKASSA_SHOP_ID = config('YOOKASSA_SHOP_ID', default='')
YOOKASSA_SECRET_KEY = config('YOOKASSA_SECRET_KEY', default='')
SITE_URL = config('SITE_URL', default='http://localhost:8000')

# CSRF для webhook
CSRF_TRUSTED_ORIGINS = ['https://yookassa.ru']
```

## Настройка главного urls.py

```python
# liberation_ministry/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
]

# Serving media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

## Файл .env (пример)

```bash
# .env - НЕ КОММИТИТЬ В GIT!

# Django
SECRET_KEY=your-very-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# Database (для PostgreSQL)
# DATABASE_URL=postgresql://user:password@localhost:5432/liberation_db

# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
ADMIN_EMAIL=admin@example.com

# ЮKassa
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
SITE_URL=https://yourdomain.com
```

## .gitignore

```
# Python
*.py[cod]
__pycache__/
*.so
*.egg
*.egg-info/
dist/
build/

# Django
*.log
db.sqlite3
db.sqlite3-journal
/media
/staticfiles

# Environment
.env
venv/
env/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## Миграции и первый запуск

```bash
# Создание миграций
python manage.py makemigrations

# Применение миграций
python manage.py migrate

# Создание суперпользователя
python manage.py createsuperuser

# Сбор статики
python manage.py collectstatic

# Запуск сервера
python manage.py runserver
```

Теперь откройте http://127.0.0.1:8000/ в браузере!
