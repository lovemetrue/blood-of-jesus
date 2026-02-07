import { Youtube, Send, Mail, Phone, MapPin, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-red-900/20 text-white py-12 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Служение: «Кровь Христа»
            </h3>
            <p className="text-red-100 leading-relaxed text-sm mb-4">
              Освобождение и восстановления через любовь Иисуса Христа.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@BloodandWaterRU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/lifespeakingteam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Навигация в футере">
            <h4 className="text-lg font-semibold mb-4">
              Навигация
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-red-100 hover:text-white transition-colors text-sm">
                  Главная
                </a>
              </li>
              <li>
                <a href="/#materials" className="text-red-100 hover:text-white transition-colors text-sm">
                  Материалы
                </a>
              </li>
              <li>
                <a href="/donations" className="text-red-100 hover:text-white transition-colors text-sm">
                  Пожертвования
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-red-100 hover:text-white transition-colors text-sm">
                  Контакты
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              Контакты
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#DC143C] mt-0.5 flex-shrink-0" />
                <a href="tel:+79944178986" className="text-red-100 hover:text-white transition-colors">
                  +7 994 417 89 86
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#DC143C] mt-0.5 flex-shrink-0" />
                <a href="mailto:jesusthehealer@yandex.ru" className="text-red-100 hover:text-white transition-colors">
                  jesusthehealer@yandex.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DC143C] mt-0.5 flex-shrink-0" />
                <span className="text-red-100">
                  Санкт-Петербург
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              Документы
            </h4>
            <a
              href="/documents"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/documents';
              }}
              className="text-red-100 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Реквизиты и договор оферты
            </a>
          </div>
        </div>

        <div className="border-t border-red-800 pt-8">
          <div className="text-center text-red-100">
            <p className="mb-2">
              "И познаете истину, и истина сделает вас свободными" - Иоанна 8:32
            </p>
            <p className="text-sm">
              © 2026 Освобождение во Христе. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}