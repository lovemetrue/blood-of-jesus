import { Youtube, Send, Mail, Phone, MapPin, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-red-900/20 text-white py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 xl:px-16" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-3">
              Служение: «Кровь Христа»
            </h3>
            <p className="text-red-100 leading-relaxed text-xs mb-3">
              Освобождение и восстановления через любовь Иисуса Христа.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@BloodandWaterRU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/lifespeakingteam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Навигация в футере">
            <h4 className="text-base font-semibold mb-3">
              Навигация
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href="/" className="text-red-100 hover:text-white transition-colors text-xs">
                  Главная
                </a>
              </li>
              <li>
                <a href="/materials/guides" className="text-red-100 hover:text-white transition-colors text-xs">
                  Материалы
                </a>
              </li>
              {/* TODO: Раскомментировать когда добавим пожертвования */}
              {/* <li>
                <a href="/donations" className="text-red-100 hover:text-white transition-colors text-xs">
                  Пожертвования
                </a>
              </li> */}
              <li>
                <a href="/contacts" className="text-red-100 hover:text-white transition-colors text-xs">
                  Контакты
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="text-base font-semibold mb-3">
              Контакты
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-start gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                <a href="tel:+79944178986" className="text-red-100 hover:text-white transition-colors">
                  +7 994 417 89 86
                </a>
              </li>
              <li className="flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                <a href="mailto:jesusthehealer@yandex.ru" className="text-red-100 hover:text-white transition-colors">
                  jesusthehealer@yandex.ru
                </a>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#DC143C] mt-0.5 flex-shrink-0" />
                <span className="text-red-100">
                  Санкт-Петербург
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3">
              Документы
            </h4>
            <a
              href="/documents"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/documents';
              }}
              className="text-red-100 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Реквизиты и договор оферты
            </a>
          </div>
        </div>

        <div className="border-t border-red-800 pt-10">
          <div className="text-center text-red-100">
            <p className="mb-1.5 text-xs">
              "И познаете истину, и истина сделает вас свободными" - Иоанна 8:32
            </p>
            <p className="text-xs">
              © 2026 Освобождение во Христе. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}