import { Send, Mail, User, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Спасибо, ${formData.name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.`);
    setFormData({ name: '', email: '', phone: '', message: '' });
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

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg hover:shadow-xl shadow-red-900/30"
            >
              <Send className="w-5 h-5" />
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}