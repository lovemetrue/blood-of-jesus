import json
import logging
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import cache_page
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger(__name__)


def _send_contact_notifications(contact):
    """Отправка уведомлений при новой заявке: админу и автоответ отправителю."""
    admin_email = getattr(settings, 'CONTACT_NOTIFY_EMAIL', '') or getattr(settings, 'ADMIN_EMAIL', '')
    from_email = settings.DEFAULT_FROM_EMAIL
    if not admin_email:
        return

    # Уведомление администратору
    subject_admin = f'[bloodofjesus.ru] Новая заявка от {contact.name}'
    body_admin = (
        f'Поступила новая заявка с сайта.\n\n'
        f'Имя: {contact.name}\n'
        f'Email: {contact.email}\n'
        f'Телефон: {contact.phone or "—"}\n\n'
        f'Сообщение:\n{contact.message}\n\n'
        f'Ответьте на это письмо или зайдите в админку: {getattr(settings, "SITE_URL", "")}/admin/'
    )
    try:
        send_mail(
            subject_admin,
            body_admin,
            from_email,
            [admin_email],
            fail_silently=True,
        )
    except Exception:
        pass

    # Автоответ отправителю
    subject_reply = 'Служение «Кровь Иисуса» — благодарим за обращение'
    body_reply = (
        f'Здравствуйте, {contact.name}!\n\n'
        'Мы очень рады помогать телу Христа и благодарим вас за доверие — до скорой встречи!\n\n'
        'С уважением,\nСлужение «Кровь Иисуса»'
    )
    try:
        send_mail(
            subject_reply,
            body_reply,
            from_email,
            [contact.email],
            fail_silently=True,
        )
    except Exception:
        pass


@csrf_exempt
@require_http_methods(["POST"])
def contact_submit(request):
    """API: Обработка формы обратной связи (JSON)"""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)

    from .forms import ContactForm
    form = ContactForm(data)

    if not form.is_valid():
        return JsonResponse({'success': False, 'errors': form.errors}, status=400)

    try:
        contact = form.save()
    except Exception as e:
        logger.exception('Contact form save failed: %s', e)
        return JsonResponse({
            'success': False,
            'error': 'Не удалось сохранить сообщение. Попробуйте позже или напишите на jesusthehealer@yandex.ru',
        }, status=500)

    try:
        _send_contact_notifications(contact)
    except Exception as e:
        logger.exception('Contact notifications failed: %s', e)

    return JsonResponse({'success': True, 'message': 'Спасибо! Ваше сообщение отправлено.'})


def materials_list(request):
    """API: Список материалов (кэшируется на 1 час, автоматически инвалидируется при изменении)"""
    from .models import Material
    from .cache_utils import get_or_set_cache
    
    def fetch_materials():
        """Функция для получения материалов из БД"""
        return list(Material.objects.filter(is_active=True).values(
            'id', 'title', 'description', 'material_type', 'icon_name', 'file'
        ))
    
    # Получаем из кэша или БД (кэш на 1 час)
    materials = get_or_set_cache('materials_list_active', fetch_materials, timeout=3600)
    
    return JsonResponse({'materials': materials})


@csrf_exempt
@require_http_methods(["POST"])
def yokassa_webhook(request):
    """
    Webhook для обработки уведомлений от ЮKassa
    
    URL: /api/yokassa_webhook
    События: payment.succeeded, payment.canceled
    """
    try:
        data = json.loads(request.body)
        logger.info('Received YooKassa webhook: %s', json.dumps(data, ensure_ascii=False))
    except json.JSONDecodeError:
        logger.error('Invalid JSON in YooKassa webhook')
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    
    try:
        event = data.get('event')
        payment_object = data.get('object', {})
        
        if not event or not payment_object:
            logger.warning('Missing event or object in webhook data')
            return JsonResponse({'status': 'error', 'message': 'Missing required fields'}, status=400)
        
        payment_id = payment_object.get('id')
        if not payment_id:
            logger.warning('Missing payment_id in webhook object')
            return JsonResponse({'status': 'error', 'message': 'Missing payment_id'}, status=400)
        
        from .models import Donation
        
        # Получаем donation_id из metadata
        metadata = payment_object.get('metadata', {})
        donation_id = metadata.get('donation_id')
        
        # Пытаемся найти пожертвование по payment_id или donation_id
        donation = None
        if donation_id:
            try:
                donation = Donation.objects.get(id=donation_id)
            except Donation.DoesNotExist:
                logger.warning('Donation not found by donation_id=%s', donation_id)
        
        if not donation:
            try:
                donation = Donation.objects.get(payment_id=payment_id)
            except Donation.DoesNotExist:
                logger.warning('Donation not found by payment_id=%s', payment_id)
                # Возвращаем 200 OK, чтобы ЮKassa не повторял запрос
                return JsonResponse({'status': 'ok', 'message': 'Donation not found'})
        
        # Обработка различных событий
        if event == 'payment.succeeded':
            if donation.status != 'completed':
                donation.status = 'completed'
                donation.save()
                logger.info('Donation ID=%s marked as completed', donation.id)
                
                # Отправка email уведомления
                if donation.email:
                    try:
                        send_mail(
                            subject='Спасибо за ваше пожертвование!',
                            message=(
                                f'Здравствуйте!\n\n'
                                f'Благодарим вас за пожертвование в размере {donation.amount} руб.\n\n'
                                f'Ваше пожертвование поможет нам распространять Евангелие свободы и исцеления.\n\n'
                                f'С уважением,\nСлужение «Кровь Иисуса»'
                            ),
                            from_email=settings.DEFAULT_FROM_EMAIL,
                            recipient_list=[donation.email],
                            fail_silently=True,
                        )
                        logger.info('Thank you email sent to %s', donation.email)
                    except Exception as e:
                        logger.exception('Failed to send thank you email: %s', e)
            else:
                logger.info('Donation ID=%s already completed, skipping', donation.id)
                
        elif event == 'payment.canceled':
            if donation.status != 'canceled':
                donation.status = 'canceled'
                donation.save()
                logger.info('Donation ID=%s marked as canceled', donation.id)
                
        elif event == 'payment.waiting_for_capture':
            # Для двухстадийной оплаты (если потребуется в будущем)
            logger.info('Payment ID=%s waiting for capture', payment_id)
            
        else:
            logger.info('Unhandled webhook event: %s for payment_id=%s', event, payment_id)
        
        # Всегда возвращаем 200 OK для подтверждения получения webhook
        return JsonResponse({'status': 'ok'})
        
    except Exception as e:
        logger.exception('Error processing YooKassa webhook: %s', e)
        # Возвращаем 200 OK, чтобы ЮKassa не повторял запрос при временных ошибках
        # Логируем ошибку для последующего анализа
        return JsonResponse({'status': 'error', 'message': str(e)})


@csrf_exempt
@require_http_methods(["POST"])
def create_donation(request):
    """API: Создание пожертвования (JSON)"""
    import uuid
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        logger.error('Invalid JSON in create_donation request')
        return JsonResponse({'success': False, 'error': 'Неверный формат данных'}, status=400)

    from .forms import DonationForm
    form = DonationForm(data)

    if not form.is_valid():
        logger.warning('Donation form validation failed: %s', form.errors)
        return JsonResponse({'success': False, 'errors': form.errors}, status=400)

    try:
        from .views import create_yookassa_payment
        from .models import Donation

        amount = form.cleaned_data['amount']
        email = form.cleaned_data.get('email', '')
        payment_method = form.cleaned_data.get('payment_method', 'card')
        
        # Валидация суммы
        if amount < 1:
            return JsonResponse({
                'success': False,
                'error': 'Минимальная сумма пожертвования составляет 1 рубль'
            }, status=400)
        
        if amount > 1000000:  # Максимальная сумма 1 млн рублей
            return JsonResponse({
                'success': False,
                'error': 'Максимальная сумма пожертвования составляет 1 000 000 рублей'
            }, status=400)

        # Создание записи о пожертвовании
        donation = Donation.objects.create(
            amount=amount,
            email=email or None,
            status='pending'
        )
        
        logger.info('Created donation ID=%s, amount=%s, payment_method=%s', donation.id, amount, payment_method)
        
        # Генерация idempotency key для предотвращения дублирования
        idempotency_key = str(uuid.uuid4())
        
        # Создание платежа в ЮKassa
        try:
            payment = create_yookassa_payment(
                amount=amount,
                donation_id=donation.id,
                description='Пожертвование на служение «Кровь Иисуса»',
                email=email,
                payment_method=payment_method
            )
            
            # Сохранение ID платежа
            donation.payment_id = payment.id
            donation.save()
            
            # Получение URL для редиректа или QR-кода для оплаты
            confirmation_url = None
            qr_code_data = None
            
            if hasattr(payment, 'confirmation') and payment.confirmation:
                confirmation_url = getattr(payment.confirmation, 'confirmation_url', None)
                # Для СБП может быть QR-код в разных полях
                if hasattr(payment.confirmation, 'qr_data'):
                    qr_code_data = payment.confirmation.qr_data
                elif hasattr(payment.confirmation, 'qr_code'):
                    qr_code_data = payment.confirmation.qr_code
                # Также проверяем, может быть QR-код в самом объекте confirmation
                elif payment_method == 'sbp' and hasattr(payment.confirmation, 'data'):
                    qr_code_data = getattr(payment.confirmation.data, 'qr_data', None)
            
            # Если это СБП и есть QR-код, возвращаем его
            if payment_method == 'sbp':
                if qr_code_data:
                    logger.info('SBP payment created with QR code: payment_id=%s, donation_id=%s', payment.id, donation.id)
                    return JsonResponse({
                        'success': True,
                        'payment_method': 'sbp',
                        'qr_code': qr_code_data,
                        'payment_id': payment.id
                    })
                elif confirmation_url:
                    # Если нет QR-кода, но есть redirect URL, используем его
                    logger.info('SBP payment created with redirect URL: payment_id=%s, donation_id=%s', payment.id, donation.id)
                    return JsonResponse({
                        'success': True,
                        'redirect_url': confirmation_url,
                        'payment_id': payment.id,
                        'payment_method': 'sbp'
                    })
                else:
                    logger.error('No QR code or redirect URL for SBP payment: %s', payment)
                    return JsonResponse({
                        'success': False,
                        'error': 'Не удалось получить QR-код для оплаты через СБП. Попробуйте позже.'
                    }, status=500)
            
            # Для обычных платежей нужен redirect URL
            if not confirmation_url:
                logger.error('No confirmation_url in payment response: %s', payment)
                return JsonResponse({
                    'success': False,
                    'error': 'Не удалось получить ссылку для оплаты. Попробуйте позже.'
                }, status=500)
            
            logger.info('Payment created successfully: payment_id=%s, donation_id=%s, method=%s', 
                       payment.id, donation.id, payment_method)
            
            return JsonResponse({
                'success': True,
                'redirect_url': confirmation_url,
                'payment_id': payment.id,
                'payment_method': payment_method
            })
            
        except Exception as e:
            logger.exception('Failed to create YooKassa payment for donation ID=%s: %s', donation.id, e)
            # Обновляем статус пожертвования на ошибку
            donation.status = 'failed'
            donation.save()
            
            # Возвращаем понятное сообщение об ошибке
            error_message = 'Не удалось создать платеж. Попробуйте позже или свяжитесь с нами.'
            if 'insufficient' in str(e).lower() or 'balance' in str(e).lower():
                error_message = 'Недостаточно средств на счете. Проверьте баланс и попробуйте снова.'
            elif 'invalid' in str(e).lower():
                error_message = 'Неверные данные платежа. Проверьте введенные данные.'
            
            return JsonResponse({
                'success': False,
                'error': error_message
            }, status=500)
            
    except Exception as e:
        logger.exception('Unexpected error in create_donation: %s', e)
        return JsonResponse({
            'success': False,
            'error': 'Произошла ошибка при обработке запроса. Попробуйте позже.'
        }, status=500)
