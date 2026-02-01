# Generated manually for main app

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='Имя')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('phone', models.CharField(blank=True, max_length=50, verbose_name='Телефон')),
                ('message', models.TextField(verbose_name='Сообщение')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('is_processed', models.BooleanField(default=False, verbose_name='Обработано')),
            ],
            options={
                'verbose_name': 'Сообщение',
                'verbose_name_plural': 'Сообщения',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Сумма')),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Email')),
                ('payment_id', models.CharField(blank=True, max_length=200, null=True, verbose_name='ID платежа')),
                ('status', models.CharField(choices=[('pending', 'Ожидание'), ('completed', 'Завершено'), ('canceled', 'Отменено'), ('failed', 'Ошибка')], default='pending', max_length=20, verbose_name='Статус')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('completed_at', models.DateTimeField(blank=True, null=True, verbose_name='Дата завершения')),
            ],
            options={
                'verbose_name': 'Пожертвование',
                'verbose_name_plural': 'Пожертвования',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Название')),
                ('description', models.TextField(verbose_name='Описание')),
                ('material_type', models.CharField(choices=[('pdf', 'PDF'), ('video', 'Видео'), ('audio', 'Аудио'), ('other', 'Другое')], default='pdf', max_length=20, verbose_name='Тип')),
                ('file', models.FileField(upload_to='materials/', verbose_name='Файл')),
                ('icon_name', models.CharField(default='Book', max_length=50, verbose_name='Имя иконки')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активен')),
                ('download_count', models.IntegerField(default=0, verbose_name='Количество скачиваний')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
            ],
            options={
                'verbose_name': 'Материал',
                'verbose_name_plural': 'Материалы',
                'ordering': ['-created_at'],
            },
        ),
    ]
