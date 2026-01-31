# Подробное руководство по интеграции ЮKassa

## Шаг 1: Регистрация в ЮKassa

1. Перейдите на https://yookassa.ru/
2. Зарегистрируйтесь и создайте магазин
3. Пройдите модерацию (потребуются документы)

## Шаг 2: Получение API ключей

1. Войдите в личный кабинет ЮKassa
2. Перейдите в раздел "Настройки" → "Данные для API"
3. Скопируйте:
   - **shopId** (идентификатор магазина)
   - **Секретный ключ** (secret key)

## Шаг 3: Установка библиотеки

```bash
pip install yookassa
```

## Шаг 4: Настройка Django

Добавьте в `settings.py`:

```python
# ЮKassa настройки
YOOKASSA_SHOP_ID = 'your_shop_id'
YOOKASSA_SECRET_KEY = 'your_secret_key'
SITE_URL = 'https://yourdomain.com'  # Ваш домен
```

## Шаг 5: Настройка Webhook

1. В личном кабинете ЮKassa перейдите в "Настройки" → "Уведомления"
2. Укажите URL для HTTP-уведомлений:
   ```
   https://yourdomain.com/donations/callback/
   ```
3. Выберите события для отправки уведомлений:
   - `payment.succeeded` - успешный платеж
   - `payment.canceled` - отмененный платеж
4. Сохраните настройки

## Шаг 6: Тестирование

ЮKassa предоставляет тестовую среду:

1. В личном кабинете переключитесь на тестовый режим
2. Используйте тестовые данные карт:
   - **Успешная оплата:** 5555 5555 5555 4477
   - **Отклоненная оплата:** 5555 5555 5555 5559
   - **Срок действия:** любая будущая дата (например, 12/24)
   - **CVC:** любые 3 цифры (например, 123)
   - **3-D Secure код:** любая строка

## Шаг 7: Безопасность

### Проверка подписи уведомлений

Для дополнительной безопасности webhook, добавьте проверку:

```python
from yookassa.domain.notification import WebhookNotificationFactory

def donation_callback(request):
    try:
        # Создание объекта уведомления из JSON
        notification_object = WebhookNotificationFactory().create(request.body)
        payment = notification_object.object
        
        if notification_object.event == WebhookNotificationEventType.PAYMENT_SUCCEEDED:
            # Обработка успешного платежа
            donation = Donation.objects.get(payment_id=payment.id)
            donation.status = 'completed'
            donation.save()
            
        return JsonResponse({'status': 'ok'})
    except Exception as e:
        return JsonResponse({'status': 'error'}, status=400)
```

## Шаг 8: Чеки (54-ФЗ)

Для соответствия 54-ФЗ (онлайн-кассы), обязательно передавайте данные чека:

```python
"receipt": {
    "customer": {
        "email": "donor@example.com"  # Email обязателен
    },
    "items": [
        {
            "description": "Пожертвование на служение",
            "quantity": "1.00",
            "amount": {
                "value": "1000.00",
                "currency": "RUB"
            },
            "vat_code": 1  # НДС не облагается
        }
    ]
}
```

## Шаг 9: Типы налогообложения для НКО

Для некоммерческих организаций используйте:
- **vat_code: 1** - без НДС

## Шаг 10: Возврат средств (если нужно)

```python
from yookassa import Refund

refund = Refund.create({
    "amount": {
        "value": "100.00",
        "currency": "RUB"
    },
    "payment_id": "payment_id_here"
}, uuid.uuid4())
```

## Ошибки и их решение

### Ошибка: Unauthorized (401)
- Проверьте правильность shopId и secret key
- Убедитесь, что используете Basic Auth

### Ошибка: Bad Request (400)
- Проверьте формат данных
- Убедитесь, что сумма больше минимальной (обычно 1 рубль)

### Webhook не работает
- Убедитесь, что URL доступен из интернета
- Проверьте, что URL использует HTTPS
- Проверьте логи Django на наличие ошибок

## Пример полной интеграции

См. файл `views.py` с функциями:
- `create_donation()` - создание платежа
- `donation_callback()` - обработка webhook
- `create_yookassa_payment()` - взаимодействие с API

## Документация ЮKassa

Полная документация: https://yookassa.ru/developers

## Production чеклист

- [ ] Получены боевые API ключи
- [ ] Настроен HTTPS
- [ ] Настроены webhook уведомления
- [ ] Настроена отправка чеков (54-ФЗ)
- [ ] Протестированы все сценарии оплаты
- [ ] Настроена обработка ошибок
- [ ] Настроено логирование транзакций
- [ ] Проверена безопасность webhook
