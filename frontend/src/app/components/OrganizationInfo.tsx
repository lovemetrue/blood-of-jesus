import { Building2, FileText, Mail, Phone, MapPin } from "lucide-react";

export function OrganizationInfo() {
  return (
    <section id="organization" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full mb-4 sm:mb-6 shadow-lg shadow-red-900/50">
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Реквизиты для оплаты
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Полная информация для перевода пожертвований и контактные данные
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800 space-y-6 sm:space-y-8">
          {/* Получатель */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#DC143C]" />
              Получатель платежей
            </h3>
            <p className="text-gray-300 text-base sm:text-lg">
              Панов Дмитрий Александрович
            </p>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Самозанятый
            </p>
            <p className="text-gray-300 text-base sm:text-lg mt-3">
              <span className="text-gray-400">ИНН самозанятого:</span> <span className="text-white font-semibold">773273875610</span>
            </p>
          </div>

          {/* Реквизиты */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#DC143C]" />
              Банковские реквизиты
            </h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">ИНН банка:</span> <span className="text-white">7707083893</span></p>
              <p><span className="text-gray-400">ОГРН:</span> <span className="text-white">1027700132195</span></p>
              <p><span className="text-gray-400">КПП:</span> <span className="text-white">301502001</span></p>
              <p><span className="text-gray-400">ОКПО:</span> <span className="text-white">09104505</span></p>
              <p className="mt-3"><span className="text-gray-400">Банк:</span> <span className="text-white">АСТРАХАНСКОЕ ОТДЕЛЕНИЕ N8625 ПАО СБЕРБАНК</span></p>
              <p><span className="text-gray-400">БИК:</span> <span className="text-white">041203602</span></p>
              <p><span className="text-gray-400">Корр. счет:</span> <span className="text-white">30101810500000000602</span></p>
              <p><span className="text-gray-400">Расчетный счет:</span> <span className="text-white">40817810205001506701</span></p>
              <p><span className="text-gray-400">SWIFT-код:</span> <span className="text-white">SABRRUMMSE1</span></p>
              <p className="mt-3"><span className="text-gray-400">Валюта:</span> <span className="text-white">Российский рубль (RUB)</span></p>
            </div>
          </div>

          {/* Адреса банка */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Адреса банка
            </h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">Почтовый адрес банка:</span></p>
              <p className="text-white">414000, АСТРАХАНЬ, УЛ. КИРОВА, 41</p>
              <p className="mt-3"><span className="text-gray-400">Почтовый адрес доп.офиса:</span></p>
              <p className="text-white">414057, Г.АСТРАХАНЬ, СОВЕТСКИЙ Р-Н, ПР-Д ВОРОБЬЕВА, 12, ЛИТЕР А</p>
            </div>
          </div>

          {/* Контактная информация */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Контактная информация
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#DC143C] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Почтовый адрес доп.офиса банка:</p>
                  <p className="text-gray-300">414057, Г.АСТРАХАНЬ, СОВЕТСКИЙ Р-Н, ПР-Д ВОРОБЬЕВА, 12, ЛИТЕР А</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#DC143C] flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Телефон:</p>
                  <a href="tel:+79944178986" className="text-gray-300 hover:text-[#DC143C] transition-colors">
                    +7 994 417 89 86
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#DC143C] flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Электронная почта:</p>
                  <a href="mailto:jesusthehealer@yandex.ru" className="text-gray-300 hover:text-[#DC143C] transition-colors">
                    jesusthehealer@yandex.ru
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Цели пожертвований */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Цели сбора пожертвований
            </h3>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Распространение Евангелия и духовное просвещение</li>
              <li>Проведение служений духовного освобождения и исцеления</li>
              <li>Поддержка нуждающихся и помощь в кризисных ситуациях</li>
              <li>Поддержка служителей и развитие Тела Христа</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
