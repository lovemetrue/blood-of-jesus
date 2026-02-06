import { Heart, CreditCard, Banknote, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError(null);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    setError(null);
  };

  const handleDonation = async (e?: React.FormEvent) => {
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
      const response = await fetch('/api/donations/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          email: email || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось создать платеж');
      }

      if (data.success && data.redirect_url) {
        // Редирект на страницу оплаты ЮKassa
        window.location.href = data.redirect_url;
      } else {
        throw new Error('Не получена ссылка для оплаты');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка. Попробуйте позже.';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <section id="donations" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent" aria-labelledby="donations-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full mb-4 sm:mb-6 shadow-lg shadow-red-900/50" aria-hidden="true">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 id="donations-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            Поддержать служение
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Ваши пожертвования помогают распространять Евангелие свободы и исцеления для тех, кто в этом нуждается
          </p>
          <div className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto px-2">
            <p className="mb-2">Пожертвования используются на следующие цели:</p>
            <ul className="list-disc list-outside space-y-1 text-left pl-5">
              <li>Распространение Евангелия и духовное просвещение</li>
              <li>Проведение служений духовного освобождения и исцеления</li>
              <li>Поддержка нуждающихся и помощь в кризисных ситуациях</li>
              <li>Поддержка служителей и развитие Тела Христа</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800">
          <form onSubmit={handleDonation} aria-label="Форма пожертвований">
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
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center mt-4 sm:mt-6">
              Все пожертвования используются для распространения Благой вести и помощи нуждающимся
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}