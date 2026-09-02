"""Проверки конфигурации, которые ловятся `manage.py check --deploy`.

Смысл: «письма с формы не приходят» почти всегда означает не баг в коде, а
незаданные переменные окружения. Пусть об этом говорит сама проверка при
деплое, а не отсутствие писем через неделю.
"""
from django.conf import settings
from django.core.checks import Warning as CheckWarning, register

CONSOLE_BACKEND = 'django.core.mail.backends.console.EmailBackend'


@register('email')
def check_email_delivery_configured(app_configs, **kwargs):
    """При DEBUG=False почта должна уметь реально отправляться."""
    if settings.DEBUG:
        return []

    issues = []

    if settings.EMAIL_BACKEND.endswith('console.EmailBackend'):
        issues.append(CheckWarning(
            'EMAIL_BACKEND — консольная заглушка, письма никуда не уходят.',
            hint=(
                'В .env задайте EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend '
                'и остальные EMAIL_* (host, port, user, пароль приложения), затем '
                'перезапустите backend. Проверить: '
                'manage.py send_test_contact_email <ваш-email>'
            ),
            id='email.W001',
        ))
    elif not settings.EMAIL_HOST_PASSWORD:
        issues.append(CheckWarning(
            'EMAIL_HOST_PASSWORD пуст — SMTP-авторизация не пройдёт.',
            hint='Нужен пароль приложения Яндекс 360, а не пароль от аккаунта.',
            id='email.W002',
        ))

    if settings.EMAIL_USE_SSL and settings.EMAIL_USE_TLS:
        issues.append(CheckWarning(
            'EMAIL_USE_SSL и EMAIL_USE_TLS включены одновременно — Django это отвергнет.',
            hint='Порт 465 — только SSL; порт 587 — только TLS.',
            id='email.W003',
        ))

    if not (
        getattr(settings, 'CONTACT_NOTIFY_EMAIL', '')
        or getattr(settings, 'ADMIN_EMAIL', '')
        or getattr(settings, 'CONTACT_REPLY_ADDRESS', '')
    ):
        issues.append(CheckWarning(
            'Не задан адрес для уведомлений о заявках с формы обратной связи.',
            hint='Задайте CONTACT_NOTIFY_EMAIL в .env.',
            id='email.W004',
        ))

    return issues
