# Django Forms
from django import forms
from .models import ContactMessage, Donation


class ContactForm(forms.ModelForm):
    """Форма обратной связи"""
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B0000] focus:outline-none',
                'placeholder': 'Введите ваше имя',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B0000] focus:outline-none',
                'placeholder': 'ваш@email.com',
                'required': True
            }),
            'message': forms.Textarea(attrs={
                'class': 'block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B0000] focus:outline-none resize-none',
                'placeholder': 'Напишите ваше сообщение...',
                'rows': 6,
                'required': True
            }),
        }


class DonationForm(forms.Form):
    """Форма пожертвования"""
    amount = forms.DecimalField(
        label='Сумма',
        max_digits=10,
        decimal_places=2,
        min_value=1,
        widget=forms.NumberInput(attrs={
            'class': 'w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B0000] focus:outline-none',
            'placeholder': 'Введите сумму',
            'required': True
        })
    )
    email = forms.EmailField(
        label='Email (необязательно)',
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#8B0000] focus:outline-none',
            'placeholder': 'ваш@email.com'
        })
    )
