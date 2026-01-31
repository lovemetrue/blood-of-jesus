import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

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

    if form.is_valid():
        form.save()
        return JsonResponse({'success': True, 'message': 'Спасибо! Ваше сообщение отправлено.'})
    return JsonResponse({'success': False, 'errors': form.errors}, status=400)


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
