import { Send, Mail, User, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';

const API_BASE = '';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.errors ? Object.values(data.errors).flat().join(' ') : data.error || 'Ошибка отправки');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Ошибка соединения. Попробуйте позже.');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Мы готовы помочь вам на пути к духовной свободе. Напишите нам, и мы обязательно ответим
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-red-900/10 p-8 sm:p-12 border-2 border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Форма обратной связи">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Ваше имя
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="Введите ваше имя"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="ваш@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Телефон
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Сообщение
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </div>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-700 rounded-lg focus:border-[#DC143C] focus:outline-none resize-none bg-gray-800/50 text-white placeholder-gray-500"
                  placeholder="Напишите ваше сообщение..."
                />
              </div>
            </div>

            {status === 'success' && (
              <p className="text-green-400 text-center">Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-center">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg hover:shadow-xl shadow-red-900/30 disabled:opacity-70"
            >
              <Send className="w-5 h-5" />
              {status === 'loading' ? 'Отправка...' : 'Отправить сообщение'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}