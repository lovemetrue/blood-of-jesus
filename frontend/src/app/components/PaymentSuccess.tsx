import { CheckCircle, ArrowLeft, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PaymentSuccess({ onBack }: { onBack: () => void }) {
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    // Получаем payment_id из URL параметров, если есть
    const params = new URLSearchParams(window.location.search);
    const id = params.get('payment_id');
    if (id) {
      setPaymentId(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-8 sm:p-12 border-2 border-gray-800 text-center">
          {/* Иконка успеха */}
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-500/20 rounded-full mb-6 sm:mb-8">
            <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-green-400" />
          </div>

          {/* Заголовок */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Спасибо за ваше пожертвование!
          </h1>

          {/* Сообщение */}
          <div className="space-y-4 mb-8 sm:mb-10">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Ваше пожертвование успешно обработано. Мы очень благодарны за вашу поддержку!
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Ваши пожертвования помогают нам распространять Евангелие свободы и исцеления для тех, кто в этом нуждается.
            </p>
            {paymentId && (
              <p className="text-xs sm:text-sm text-gray-500 mt-4">
                ID платежа: {paymentId}
              </p>
            )}
          </div>

          {/* Иконка сердца */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#DC143C]/20 rounded-full">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#DC143C]" />
            </div>
          </div>

          {/* Кнопка возврата */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30 text-sm sm:text-base font-medium"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
}
