import { Heart, CreditCard, Banknote } from 'lucide-react';
import { useState } from 'react';

const API_BASE = '';

export function DonationSection() {
  const [amount, setAmount] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDonation = async (e: React.FormEvent, useCard = true) => {
    e.preventDefault();
    const amt = typeof amount === 'number' ? amount : parseFloat(String(amount));
    if (!amt || amt < 1) {
      setError('Укажите сумму пожертвования');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/donations/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amt, email: email || undefined }),
      });
      const data = await res.json();
      if (data.success && data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        setError(data.error || data.errors?.amount?.[0] || 'Ошибка при создании платежа');
      }
    } catch {
      setError('Ошибка соединения. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donations" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent" aria-labelledby="donations-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#DC143C] rounded-full mb-6 shadow-lg shadow-red-900/50" aria-hidden="true">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 id="donations-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Поддержать служение
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ваши пожертвования помогают распространять Евангелие свободы и исцеления для тех, кто в этом нуждается
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-red-900/10 p-8 sm:p-12 border-2 border-gray-800">
          <form onSubmit={(e) => handleDonation(e, true)} aria-label="Форма пожертвований">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" role="group" aria-label="Быстрый выбор суммы">
              {[500, 1000, 2000, 5000].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => { setAmount(a); setError(''); }}
                  className={`px-6 py-4 border-2 rounded-lg transition-all text-white ${amount === a ? 'border-[#DC143C] bg-red-950/30' : 'border-gray-700 hover:border-[#DC143C] hover:bg-red-950/30'}`}
                >
                  <span className="text-lg font-semibold">{a} ₽</span>
                </button>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Другая сумма"
                value={amount === '' ? '' : amount}
                onChange={(e) => { setAmount(e.target.value ? Number(e.target.value) : ''); setError(''); }}
                className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Email (необязательно, для чека)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
              />
            </div>

            {error && <p className="text-red-400 text-center mb-4">{error}</p>}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30 disabled:opacity-70"
              >
                <CreditCard className="w-5 h-5" />
                {loading ? 'Создание платежа...' : 'Пожертвовать картой'}
              </button>
              
              <button
                type="button"
                onClick={(e) => handleDonation(e, false)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-transparent border-2 border-[#DC143C] text-[#DC143C] rounded-lg hover:bg-red-950/30 transition-colors disabled:opacity-70"
              >
                <Banknote className="w-5 h-5" />
                Другие способы
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-6">
              Все пожертвования используются для распространения Благой вести и помощи нуждающимся
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}