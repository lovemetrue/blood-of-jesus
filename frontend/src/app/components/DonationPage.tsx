import { Heart, CreditCard, Loader2, AlertCircle, ArrowLeft, QrCode } from 'lucide-react';
import { useState } from 'react';

export function DonationPage({ onBack }: { onBack: () => void }) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setError(null);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    setError(null);
  };

  const handleDonation = async (paymentMethod: 'card' | 'sbp' = 'card', e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Определяем сумму пожертвования
    const amount = selectedAmount || (customAmount ? parseFloat(customAmount) : null);
    
    if (!amount || amount < 1) {
      setError('Пожалуйста, выберите или введите сумму пожертвования (минимум 1 рубль)');
      return;
    }

    if (amount > 1000000) {
      setError('Максимальная сумма пожертвования составляет 1 000 000 рублей');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Добавляем таймаут для запроса (30 секунд)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('/api/donations/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          email: email || undefined,
          payment_method: paymentMethod,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось создать платеж');
      }

      if (data.success && data.redirect_url) {
        // Для всех способов оплаты (включая СБП) используем redirect
        // QR-код для СБП будет отображаться на странице ЮKassa
        window.location.href = data.redirect_url;
      } else {
        throw new Error('Не получена ссылка для оплаты');
      }
    } catch (err) {
      let errorMessage = 'Произошла ошибка. Попробуйте позже.';
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Превышено время ожидания ответа. Проверьте подключение к интернету и попробуйте снова.';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Кнопка назад */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-[#DC143C] transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Вернуться на главную</span>
        </button>

        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full mb-4 sm:mb-6 shadow-lg shadow-red-900/50" aria-hidden="true">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            Поддержать служение
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Ваши пожертвования помогают распространять Евангелие царства, свободы и исцеления, а так же:
          </p>
          <div className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto px-2">
            <p className="mb-2 text-center">Пожертвования используются на следующие цели:</p>
            <ul className="list-disc list-outside space-y-1 mx-auto w-fit text-left pl-5">
              <li>Проводить служения освобождения и исцеления души</li>
              <li>Поддерживать нуждающихся и оказывать помощь в кризисных ситуациях</li>
              <li>Поддерживать служителей и развивать Тела Христа</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800">
          <form onSubmit={(e) => handleDonation('card', e)} aria-label="Форма пожертвований">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8" role="group" aria-label="Быстрый выбор суммы">
              {[500, 1000, 2000, 5000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`px-3 sm:px-6 py-3 sm:py-4 border-2 rounded-lg transition-all text-white ${
                    selectedAmount === amount
                      ? 'border-[#DC143C] bg-red-950/50'
                      : 'border-gray-700 hover:border-[#DC143C] hover:bg-red-950/30'
                  }`}
                >
                  <span className="text-sm sm:text-lg font-semibold">{amount} ₽</span>
                </button>
              ))}
            </div>

            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="1000000"
                  step="1"
                  placeholder="Другая сумма"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                />
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email (необязательно, для отправки чека)"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 sm:p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-start gap-2 sm:gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Обработка...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Пожертвовать картой
                  </>
                )}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/50 text-gray-400">или</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDonation('sbp')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-transparent border-2 border-[#DC143C] text-[#DC143C] rounded-lg hover:bg-red-950/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Обработка...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                    Оплатить через СБП
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center mt-4 sm:mt-6">
              Все пожертвования используются для распространения Благой вести и помощи нуждающимся
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
