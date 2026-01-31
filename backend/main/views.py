import json
import uuid
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from .models import ContactMessage, Donation, Material
from .forms import DonationForm


def create_yookassa_payment(amount, donation_id, description, email=None):
    from yookassa import Payment, Configuration
    Configuration.account_id = settings.YOOKASSA_SHOP_ID
    Configuration.secret_key = settings.YOOKASSA_SECRET_KEY

    payment = Payment.create({
        "amount": {"value": str(amount), "currency": "RUB"},
        "confirmation": {
            "type": "redirect",
            "return_url": f"{settings.SITE_URL}/?donation=success"
        },
        "capture": True,
        "description": description,
        "metadata": {"donation_id": donation_id},
        "receipt": {
            "customer": {"email": email or "noreply@example.com"},
            "items": [{
                "description": "Пожертвование на служение",
                "quantity": "1.00",
                "amount": {"value": str(amount), "currency": "RUB"},
                "vat_code": 1
            }]
        }
    }, uuid.uuid4())
    return payment


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
