from django import forms
from .models import ContactMessage, Donation


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Введите ваше имя'}),
            'email': forms.EmailInput(attrs={'placeholder': 'ваш@email.com'}),
            'phone': forms.TextInput(attrs={'placeholder': '+7 (XXX) XXX-XX-XX'}),
            'message': forms.Textarea(attrs={'placeholder': 'Напишите ваше сообщение...', 'rows': 6}),
        }


class DonationForm(forms.Form):
    amount = forms.DecimalField(min_value=1, max_digits=10, decimal_places=2)
    email = forms.EmailField(required=False)
    payment_method = forms.ChoiceField(
        choices=[('card', 'Банковская карта'), ('sbp', 'СБП')],
        required=False,
        initial='card'
    )
