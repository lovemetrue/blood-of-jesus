import json
import uuid
import logging
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from .models import ContactMessage, Donation, Material
from .forms import DonationForm

logger = logging.getLogger(__name__)


def create_yookassa_payment(amount, donation_id, description, email=None, idempotency_key=None, payment_method='card'):
    """
    Создание платежа в ЮKassa
    
    Args:
        amount: Сумма пожертвования
        donation_id: ID пожертвования в БД
        description: Описание платежа
        email: Email плательщика (опционально)
        idempotency_key: Ключ идемпотентности (опционально)
        payment_method: Способ оплаты ('card' или 'sbp')
    
    Returns:
        Payment объект от ЮKassa
    """
    from yookassa import Payment, Configuration
    
    # Проверка наличия настроек
    if not settings.YOOKASSA_SHOP_ID or not settings.YOOKASSA_SECRET_KEY:
        raise ValueError('YooKassa credentials not configured')
    
    Configuration.account_id = settings.YOOKASSA_SHOP_ID
    Configuration.secret_key = settings.YOOKASSA_SECRET_KEY
    
    # Установка таймаута для запросов к API (30 секунд)
    Configuration.timeout = 30

    # Формирование данных для платежа
    payment_data = {
        "amount": {
            "value": f"{amount:.2f}",
            "currency": "RUB"
        },
        "capture": True,
        "description": description,
        "metadata": {
            "donation_id": str(donation_id)
        }
    }
    
    # Настройка способа оплаты и подтверждения
    if payment_method == 'sbp':
        # Для СБП согласно документации: https://yookassa.ru/developers/payment-acceptance/integration-scenarios/manual-integration/other/sbp
        # Нужно передать payment_method_data с type="sbp" и confirmation с type="redirect"
        payment_data["payment_method_data"] = {
            "type": "sbp"
        }
        payment_data["confirmation"] = {
            "type": "redirect",
            "return_url": f"{settings.SITE_URL}/payment/success"
        }
        logger.info('Creating SBP payment: amount=%s, donation_id=%s', amount, donation_id)
    else:
        # Для банковской карты используем redirect
        payment_data["confirmation"] = {
            "type": "redirect",
            "return_url": f"{settings.SITE_URL}/payment/success"
        }
        logger.info('Creating card payment: amount=%s, donation_id=%s', amount, donation_id)
    
    # Добавление чека (если есть email)
    if email:
        payment_data["receipt"] = {
            "customer": {"email": email},
            "items": [{
                "description": "Пожертвование на служение «Кровь Иисуса»",
                "quantity": "1.00",
                "amount": {
                    "value": f"{amount:.2f}",
                    "currency": "RUB"
                },
                "vat_code": 1  # НДС не облагается
            }]
        }
    
    # Использование переданного ключа идемпотентности или генерация нового
    key = idempotency_key if idempotency_key else uuid.uuid4()
    
    # Логирование запроса для отладки (без секретных данных)
    logger.info('YooKassa payment request: payment_method=%s, amount=%s, has_receipt=%s', 
                payment_method, amount, bool(email))
    logger.debug('Payment data: %s', json.dumps(payment_data, ensure_ascii=False, indent=2))
    
    try:
        payment = Payment.create(payment_data, key)
        logger.info('YooKassa payment created successfully: payment_id=%s', payment.id)
        return payment
    except Exception as e:
        logger.error('Failed to create YooKassa payment: %s', str(e))
        logger.error('Payment data that caused error: %s', json.dumps(payment_data, ensure_ascii=False, indent=2))
        raise


@require_http_methods(["POST"])
def create_donation(request):
    form = DonationForm(request.POST)
    if form.is_valid():
        amount = form.cleaned_data['amount']
        email = form.cleaned_data.get('email', '')
        donation = Donation.objects.create(amount=amount, email=email or None, status='pending')
        try:
            payment = create_yookassa_payment(
                amount=amount,
                donation_id=donation.id,
                description='Пожертвование на служение',
                email=email
            )
            donation.payment_id = payment.id
            donation.save()
            return JsonResponse({'success': True, 'redirect_url': payment.confirmation.confirmation_url})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
    return JsonResponse({'success': False, 'errors': form.errors}, status=400)


from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@require_http_methods(["POST"])
def donation_callback(request):
    try:
        data = json.loads(request.body)
        event = data.get('event')
        payment_object = data.get('object')

        if event == 'payment.succeeded':
            payment_id = payment_object.get('id')
            try:
                donation = Donation.objects.get(payment_id=payment_id)
                donation.status = 'completed'
                donation.save()
                if donation.email:
                    send_mail(
                        subject='Спасибо за ваше пожертвование!',
                        message=f'Благодарим за пожертвование {donation.amount} руб.',
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[donation.email],
                        fail_silently=True,
                    )
            except Donation.DoesNotExist:
                pass
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
        return JsonResponse({'status': 'error'}, status=400)


def donation_success(request):
    return JsonResponse({'success': True, 'message': 'Благодарим за пожертвование!'})


def download_material(request, material_id):
    try:
        material = Material.objects.get(id=material_id, is_active=True)
        material.download_count += 1
        material.save()
        from django.http import FileResponse
        return FileResponse(material.file.open('rb'), as_attachment=True, filename=material.file.name.split('/')[-1])
    except Material.DoesNotExist:
        return JsonResponse({'error': 'Not found'}, status=404)
