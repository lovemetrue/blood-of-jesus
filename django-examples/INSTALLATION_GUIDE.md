# Руководство по установке Django проекта

## 1. Установка зависимостей

```bash
pip install -r requirements.txt
```

## 2. Настройка settings.py

Добавьте содержимое из `settings_additions.py` в ваш `settings.py`

## 3. Создание базы данных

```bash
python manage.py makemigrations
python manage.py migrate
```

## 4. Создание суперпользователя

```bash
python manage.py createsuperuser
```

## 5. Сбор статических файлов

```bash
python manage.py collectstatic
```

## 6. Запуск сервера разработки

```bash
python manage.py runserver
```

## 7. Настройка ЮKassa

1. Зарегистрируйтесь на https://yookassa.ru/
2. Создайте магазин
3. Получите `SHOP_ID` и `SECRET_KEY` в личном кабинете
4. Добавьте эти данные в `settings.py`
5. Настройте webhook URL: `https://yourdomain.com/donations/callback/`
6. В настройках магазина ЮKassa включите уведомления для событий:
   - `payment.succeeded`
   - `payment.canceled`

## 8. Настройка Email

Для Gmail:
1. Включите двухфакторную аутентификацию
2. Создайте пароль приложения: https://myaccount.google.com/apppasswords
3. Используйте этот пароль в настройке `EMAIL_HOST_PASSWORD`

## 9. Production настройки

В продакшене:
- Используйте реальную базу данных (PostgreSQL/MySQL)
- Настройте `DEBUG = False`
- Используйте безопасный `SECRET_KEY`
- Настройте `ALLOWED_HOSTS`
- Используйте HTTPS
- Настройте правильный веб-сервер (Gunicorn + Nginx)

## 10. Структура проекта

```
your_project/
├── manage.py
├── your_app/
│   ├── models.py          # Копируйте из django-examples/models.py
│   ├── views.py           # Копируйте из django-examples/views.py
│   ├── forms.py           # Копируйте из django-examples/forms.py
│   ├── urls.py            # Копируйте из django-examples/urls.py
│   ├── admin.py           # Копируйте из django-examples/admin.py
│   └── templates/
│       └── home.html      # Используйте шаблон из templates/home.html
├── static/
│   └── css/
│       └── tailwind.css   # Tailwind CSS
└── media/
    └── materials/         # Загруженные материалы
```

## 11. Tailwind CSS настройка

Если используете Django с Tailwind, установите:

```bash
pip install django-tailwind
```

Или используйте CDN в шаблоне:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Для production рекомендуется настроить Tailwind через Node.js.
