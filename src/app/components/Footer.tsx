import { Youtube, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-red-900/20 text-white py-12 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Служение освобождения
            </h3>
            <p className="text-red-100 leading-relaxed">
              Освобождение и восстановления через любовь Иисуса
              Христа.
            </p>
          </div>

          <nav aria-label="Навигация в футере">
            <h4 className="text-lg font-semibold mb-4">
              Навигация
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("home")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-red-100 hover:text-white transition-colors"
                >
                  Главная
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("materials")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-red-100 hover:text-white transition-colors"
                >
                  Материалы
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("donations")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-red-100 hover:text-white transition-colors"
                >
                  Пожертвования
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-red-100 hover:text-white transition-colors"
                >
                  Контакты
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              Мы в соцсетях
            </h4>
            <div className="flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-red-800 pt-8">
          <div className="text-center text-red-100">
            <p className="mb-2">
              "И познаете истину, и истина сделает вас
              свободными" - Иоанна 8:32
            </p>
            <p className="text-sm">
              © 2026 Освобождение во Христе. Все права
              защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}