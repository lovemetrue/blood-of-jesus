# Django Views для проекта освобождения
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage, Donation, Material
from .forms import ContactForm, DonationForm
import uuid
import hashlib
import requests


def home(request):
    """Главная страница с всеми секциями"""
    materials = Material.objects.filter(is_active=True)[:6]
    context = {
        'materials': materials,
    }
    return render(request, 'home.html', context)


@require_http_methods(["POST"])
def contact_submit(request):
    """Обработка формы обратной связи"""
    form = ContactForm(request.POST)
    
    if form.is_valid():
        # Сохранение сообщения в БД
        contact_message = form.save()
        
        # Отправка email уведомления администратору
        try:
            send_mail(
                subject=f'Новое сообщение от {contact_message.name}',
                message=f'От: {contact_message.name}\nEmail: {contact_message.email}\n\nСообщение:\n{contact_message.message}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Ошибка отправки email: {e}")
        
        # Отправка подтверждения пользователю
        try:
            send_mail(
                subject='Ваше сообщение получено',
                message=f'Здравствуйте, {contact_message.name}!\n\nМы получили ваше сообщение и свяжемся с вами в ближайшее время.\n\nБлагословений вам!',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[contact_message.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Ошибка отправки подтверждения: {e}")
        
        messages.success(request, 'Спасибо! Ваше сообщение отправлено.')
        return redirect('home')
    
    messages.error(request, 'Пожалуйста, исправьте ошибки в форме.')
    return redirect('home')


@require_http_methods(["POST"])
def create_donation(request):
    """Создание платежа через ЮKassa"""
    form = DonationForm(request.POST)
    
    if form.is_valid():
        amount = form.cleaned_data['amount']
        email = form.cleaned_data.get('email', '')
        
        # Создание записи пожертвования
        donation = Donation.objects.create(
            amount=amount,
            email=email,
            status='pending'
        )
        
        # Создание платежа в ЮKassa
        try:
            payment = create_yookassa_payment(
                amount=amount,
                donation_id=donation.id,
                description='Пожертвование на служение',
                email=email
            )
            
            donation.payment_id = payment['id']
            donation.save()
            
            # Перенаправление на страницу оплаты ЮKassa
            return redirect(payment['confirmation']['confirmation_url'])
            
        except Exception as e:
            print(f"Ошибка создания платежа: {e}")
            messages.error(request, 'Произошла ошибка при создании платежа. Попробуйте позже.')
            return redirect('home')
    
    messages.error(request, 'Пожалуйста, укажите корректную сумму.')
    return redirect('home')


def donation_callback(request):
    """Webhook для обработки уведомлений от ЮKassa"""
    import json
    
    # Получение данных от ЮKassa
    try:
        data = json.loads(request.body)
        event = data.get('event')
        payment_object = data.get('object')
        
        if event == 'payment.succeeded':
            payment_id = payment_object.get('id')
            
            # Обновление статуса пожертвования
            try:
                donation = Donation.objects.get(payment_id=payment_id)
                donation.status = 'completed'
                donation.save()
                
                # Отправка благодарственного письма
                if donation.email:
                    send_mail(
                        subject='Спасибо за ваше пожертвование!',
                        message=f'Благодарим вас за пожертвование в размере {donation.amount} руб.\n\nДа благословит вас Господь!',
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[donation.email],
                        fail_silently=True,
                    )
            except Donation.DoesNotExist:
                print(f"Donation with payment_id {payment_id} not found")
        
        elif event == 'payment.canceled':
            payment_id = payment_object.get('id')
            try:
                donation = Donation.objects.get(payment_id=payment_id)
                donation.status = 'canceled'
                donation.save()
            except Donation.DoesNotExist:
                pass
        
        return JsonResponse({'status': 'ok'})
        
    except Exception as e:
        print(f"Ошибка обработки webhook: {e}")
        return JsonResponse({'status': 'error'}, status=400)


def create_yookassa_payment(amount, donation_id, description, email=None):
    """Создание платежа в ЮKassa через API"""
    from yookassa import Payment, Configuration
    
    # Конфигурация ЮKassa (из settings.py)
    Configuration.account_id = settings.YOOKASSA_SHOP_ID
    Configuration.secret_key = settings.YOOKASSA_SECRET_KEY
    
    # Создание платежа
    payment = Payment.create({
        "amount": {
            "value": str(amount),
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": f"{settings.SITE_URL}/donations/success/"
        },
        "capture": True,
        "description": description,
        "metadata": {
            "donation_id": donation_id
        },
        "receipt": {
            "customer": {
                "email": email or "noreply@example.com"
            },
            "items": [
                {
                    "description": "Пожертвование на служение",
                    "quantity": "1.00",
                    "amount": {
                        "value": str(amount),
                        "currency": "RUB"
                    },
                    "vat_code": 1
                }
            ]
        }
    }, uuid.uuid4())
    
    return payment


def download_material(request, material_id):
    """Скачивание материала"""
    try:
        material = Material.objects.get(id=material_id, is_active=True)
        material.download_count += 1
        material.save()
        
        # Здесь можно добавить логику для защищенного скачивания
        # Например, через X-Sendfile или redirect на S3
        
        messages.success(request, f'Материал "{material.title}" загружен.')
        return redirect('home')
        
    except Material.DoesNotExist:
        messages.error(request, 'Материал не найден.')
        return redirect('home')


def donation_success(request):
    """Страница успешного пожертвования"""
    return render(request, 'donation_success.html')
