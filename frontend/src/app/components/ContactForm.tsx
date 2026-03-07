import { Send, Mail, User, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';

const API_CONTACT_URL = '/api/contact/';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setSubmitError('');
    setIsSubmitting(true);
    try {
      const res = await fetch(API_CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.errors ? Object.values(data.errors).flat().join(' ') : data.error || 'Не удалось отправить сообщение.';
        setSubmitError(msg);
        setSubmitStatus('error');
        return;
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSubmitError('Ошибка сети. Попробуйте позже или напишите на jesusthehealer@yandex.ru');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 id="contact-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            Свяжитесь с нами
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Мы готовы помочь вам на пути к духовной свободе. Напишите нам, и мы обязательно ответим
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" aria-label="Форма обратной связи">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Ваше имя
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="Введите ваше имя"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="ваш@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Телефон
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Сообщение
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none resize-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="Напишите ваше сообщение..."
                />
              </div>
            </div>

            {submitStatus === 'success' && (
              <p className="text-green-400 text-sm sm:text-base">
                Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
              </p>
            )}
            {submitStatus === 'error' && submitError && (
              <p className="text-red-400 text-sm sm:text-base">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg hover:shadow-xl shadow-red-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
