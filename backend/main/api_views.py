import json
import logging
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings

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
    """API: Список материалов"""
    from .models import Material
    materials = Material.objects.filter(is_active=True).values(
        'id', 'title', 'description', 'material_type', 'icon_name', 'file'
    )
    return JsonResponse({'materials': list(materials)})


@csrf_exempt
@require_http_methods(["POST"])
def create_donation(request):
    """API: Создание пожертвования (JSON)"""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)

    from .forms import DonationForm
    form = DonationForm(data)

    if form.is_valid():
        from .views import create_yookassa_payment
        from .models import Donation
        from django.conf import settings

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
            redirect_url = getattr(getattr(payment, 'confirmation', None), 'confirmation_url', None) or str(payment)
            return JsonResponse({'success': True, 'redirect_url': redirect_url})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
    return JsonResponse({'success': False, 'errors': form.errors}, status=400)
