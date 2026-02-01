"""
Тестовая отправка уведомлений о заявке (админу + автоответ на указанный email).
Использование: python manage.py send_test_contact_email legkodogatca@gmail.com
"""
from django.core.management.base import BaseCommand
from main.models import ContactMessage
from main.api_views import _send_contact_notifications


class Command(BaseCommand):
    help = 'Симулирует отправку уведомлений о заявке на указанный email (без сохранения в БД).'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Email получателя автоответа (и в уведомлении админу)')

    def handle(self, *args, **options):
        email = options['email']
        # Объект без сохранения в БД — только для вызова _send_contact_notifications
        contact = ContactMessage(
            name='Тест рассылки',
            email=email,
            phone='+79001234567',
            message='Проверка отправки перед пушем в CI.',
        )
        self.stdout.write(f'Отправка уведомлений: админу + автоответ на {email} ...')
        _send_contact_notifications(contact)
        self.stdout.write(self.style.SUCCESS('Готово. Проверьте почту (и спам).'))
