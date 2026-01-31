from django.db import models
from django.utils import timezone


class ContactMessage(models.Model):
    name = models.CharField('Имя', max_length=200)
    email = models.EmailField('Email')
    phone = models.CharField('Телефон', max_length=50, blank=True)
    message = models.TextField('Сообщение')
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    is_processed = models.BooleanField('Обработано', default=False)

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} - {self.created_at.strftime("%d.%m.%Y %H:%M")}'


class Donation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Ожидание'),
        ('completed', 'Завершено'),
        ('canceled', 'Отменено'),
        ('failed', 'Ошибка'),
    ]

    amount = models.DecimalField('Сумма', max_digits=10, decimal_places=2)
    email = models.EmailField('Email', blank=True, null=True)
    payment_id = models.CharField('ID платежа', max_length=200, blank=True, null=True)
    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    completed_at = models.DateTimeField('Дата завершения', blank=True, null=True)

    class Meta:
        verbose_name = 'Пожертвование'
        verbose_name_plural = 'Пожертвования'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.amount} руб. - {self.get_status_display()}'

    def save(self, *args, **kwargs):
        if self.status == 'completed' and not self.completed_at:
            self.completed_at = timezone.now()
        super().save(*args, **kwargs)


class Material(models.Model):
    MATERIAL_TYPES = [
        ('pdf', 'PDF'),
        ('video', 'Видео'),
        ('audio', 'Аудио'),
        ('other', 'Другое'),
    ]

    title = models.CharField('Название', max_length=200)
    description = models.TextField('Описание')
    material_type = models.CharField('Тип', max_length=20, choices=MATERIAL_TYPES, default='pdf')
    file = models.FileField('Файл', upload_to='materials/')
    icon_name = models.CharField('Имя иконки', max_length=50, default='Book')
    is_active = models.BooleanField('Активен', default=True)
    download_count = models.IntegerField('Количество скачиваний', default=0)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)
    updated_at = models.DateTimeField('Дата обновления', auto_now=True)

    class Meta:
        verbose_name = 'Материал'
        verbose_name_plural = 'Материалы'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
