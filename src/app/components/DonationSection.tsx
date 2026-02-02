import { Heart, CreditCard, Banknote } from 'lucide-react';

export function DonationSection() {
  const handleDonation = (amount?: number) => {
    if (amount) {
      alert(`Спасибо за ваше пожертвование в размере ${amount} руб!`);
    } else {
      alert('Спасибо за ваше пожертвование!');
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
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800">
          <form aria-label="Форма пожертвований">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8" role="group" aria-label="Быстрый выбор суммы">
              {[500, 1000, 2000, 5000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleDonation(amount)}
                  className="px-3 sm:px-6 py-3 sm:py-4 border-2 border-gray-700 rounded-lg hover:border-[#DC143C] hover:bg-red-950/30 transition-all text-white"
                >
                  <span className="text-sm sm:text-lg font-semibold">{amount} ₽</span>
                </button>
              ))}
            </div>

            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Другая сумма"
                  className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => handleDonation()}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30"
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                Пожертвовать картой
              </button>
              
              <button
                onClick={() => handleDonation()}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-transparent border-2 border-[#DC143C] text-[#DC143C] rounded-lg hover:bg-red-950/30 transition-colors"
              >
                <Banknote className="w-4 h-4 sm:w-5 sm:h-5" />
                Другие способы
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