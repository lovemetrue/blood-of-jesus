"""Проверка отправки уведомлений о заявке — с настоящим отчётом об ошибках.

    python manage.py send_test_contact_email legkodogatca@gmail.com

Печатает разобранную почтовую конфигурацию, пробует поднять SMTP-соединение,
отправляет два письма (админу и автоответ) и завершается с кодом 1, если хоть
одно не ушло. Прошлая версия печатала «Готово. Проверьте почту» всегда — даже
когда SMTP был недоступен, а письма не отправлялись; проверять этим было нечего.
"""
from django.conf import settings
from django.core.mail import get_connection
from django.core.management.base import BaseCommand, CommandError

from main.api_views import _send_contact_notifications
from main.models import ContactMessage


class Command(BaseCommand):
    help = 'Проверяет отправку уведомлений о заявке на указанный email и сообщает, что именно не сработало.'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Email получателя автоответа (и в уведомлении админу)')

    def handle(self, *args, **options):
        email = options['email']

        notify_to = (
            getattr(settings, 'CONTACT_NOTIFY_EMAIL', '')
            or getattr(settings, 'ADMIN_EMAIL', '')
            or getattr(settings, 'CONTACT_REPLY_ADDRESS', '')
        )
        self.stdout.write('Почтовая конфигурация:')
        for key, value in (
            ('EMAIL_BACKEND', settings.EMAIL_BACKEND),
            ('EMAIL_HOST', settings.EMAIL_HOST),
            ('EMAIL_PORT', settings.EMAIL_PORT),
            ('EMAIL_USE_TLS', settings.EMAIL_USE_TLS),
            ('EMAIL_USE_SSL', settings.EMAIL_USE_SSL),
            ('EMAIL_HOST_USER', settings.EMAIL_HOST_USER or '(пусто)'),
            ('EMAIL_HOST_PASSWORD', '(задан)' if settings.EMAIL_HOST_PASSWORD else '(ПУСТО)'),
            ('EMAIL_TIMEOUT', getattr(settings, 'EMAIL_TIMEOUT', None)),
            ('DEFAULT_FROM_EMAIL', settings.DEFAULT_FROM_EMAIL),
            ('уведомления админу на', notify_to or '(ПУСТО)'),
        ):
            self.stdout.write(f'  {key} = {value}')

        if settings.EMAIL_BACKEND.endswith('console.EmailBackend'):
            self.stdout.write(
                self.style.ERROR(
                    '\nEMAIL_BACKEND = console.EmailBackend — это заглушка: письма печатаются '
                    'в stdout и никуда не уходят. Это самая частая причина «письма не приходят».\n'
                    'Задайте в .env рядом с docker-compose.prod.yml:\n'
                    '  EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend\n'
                    '  EMAIL_HOST=smtp.yandex.ru\n'
                    '  EMAIL_PORT=465\n'
                    '  EMAIL_USE_SSL=True\n'
                    '  EMAIL_USE_TLS=False\n'
                    '  EMAIL_HOST_USER=jesusthehealer@yandex.ru\n'
                    '  EMAIL_HOST_PASSWORD=<пароль приложения Яндекс 360>\n'
                    '  DEFAULT_FROM_EMAIL=jesusthehealer@yandex.ru\n'
                    'и перезапустите backend.'
                )
            )
            raise CommandError('Отправка невозможна: настроен консольный бэкенд.')

        if not settings.EMAIL_HOST_PASSWORD:
            self.stdout.write(self.style.WARNING(
                '\nEMAIL_HOST_PASSWORD пуст — Яндекс отклонит авторизацию. '
                'Нужен именно «пароль приложения», а не пароль от аккаунта.'
            ))

        # Шаг 1: соединение и авторизация отдельно от отправки — так видно,
        # проблема в сети/порту или уже в самом письме.
        self.stdout.write(f'\nПробую подключиться к {settings.EMAIL_HOST}:{settings.EMAIL_PORT} ...')
        connection = get_connection(fail_silently=False)
        try:
            connection.open()
        except Exception as e:
            raise CommandError(
                f'Не удалось подключиться/авторизоваться: {type(e).__name__}: {e}\n'
                'Что проверить:\n'
                '  * доступен ли SMTP-порт с сервера: nc -vz '
                f'{settings.EMAIL_HOST} {settings.EMAIL_PORT}\n'
                '  * у backend в docker-compose.prod.yml стоит network_mode: host — '
                'провайдер блокирует IPv4 к Яндексу, нужен IPv6;\n'
                '  * пара EMAIL_USE_SSL/EMAIL_USE_TLS соответствует порту '
                '(465 — SSL, 587 — TLS);\n'
                '  * пароль приложения не отозван в Яндекс 360.'
            ) from e
        else:
            self.stdout.write(self.style.SUCCESS('  соединение и авторизация — ок'))
            connection.close()

        # Шаг 2: сами письма. Объект не сохраняется в БД — только для вызова.
        contact = ContactMessage(
            name='Тест рассылки',
            email=email,
            phone='+79001234567',
            message='Проверка отправки перед пушем в CI.',
        )
        self.stdout.write(f'\nОтправляю: уведомление админу + автоответ на {email} ...')
        results = _send_contact_notifications(contact)

        failed = []
        for recipient, error in results:
            if error:
                failed.append((recipient, error))
                self.stdout.write(self.style.ERROR(f'  {recipient}: {error}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'  {recipient}: отправлено'))

        if failed:
            raise CommandError(f'Не отправлено писем: {len(failed)} из {len(results)}.')

        self.stdout.write(self.style.SUCCESS('\nВсе письма отправлены. Проверьте почту (и спам).'))
