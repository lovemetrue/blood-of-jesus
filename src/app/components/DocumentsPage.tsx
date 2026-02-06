import { Building2, FileText, Mail, Phone, MapPin, Scroll, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function DocumentsPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"requisites" | "agreement" | "location">("requisites");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header с кнопкой назад */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-[#DC143C] transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться на главную</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Документы
          </h1>
        </div>

        {/* Навигация между разделами */}
        <div className="mb-8 flex gap-4 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("requisites")}
            className={`px-6 py-3 text-base font-medium transition-all duration-200 relative ${
              activeTab === "requisites"
                ? "text-[#DC143C]"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Реквизиты
            {activeTab === "requisites" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DC143C]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("agreement")}
            className={`px-6 py-3 text-base font-medium transition-all duration-200 relative ${
              activeTab === "agreement"
                ? "text-[#DC143C]"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Договор оферты
            {activeTab === "agreement" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DC143C]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("location")}
            className={`px-6 py-3 text-base font-medium transition-all duration-200 relative ${
              activeTab === "location"
                ? "text-[#DC143C]"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Локация
            {activeTab === "location" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DC143C]" />
            )}
          </button>
        </div>

        {/* Контент разделов */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800">
          {activeTab === "requisites" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Получатель */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[#DC143C]" />
                  Получатель платежей
                </h2>
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
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#DC143C]" />
                  Банковские реквизиты
                </h2>
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
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                  Адреса банка
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-gray-400">Почтовый адрес банка:</span></p>
                  <p className="text-white">414000, АСТРАХАНЬ, УЛ. КИРОВА, 41</p>
                  <p className="mt-3"><span className="text-gray-400">Почтовый адрес доп.офиса:</span></p>
                  <p className="text-white">414057, Г.АСТРАХАНЬ, СОВЕТСКИЙ Р-Н, ПР-Д ВОРОБЬЕВА, 12, ЛИТЕР А</p>
                </div>
              </div>

              {/* Контактная информация */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                  Контактная информация
                </h2>
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
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                  Цели сбора пожертвований
                </h2>
                <ul className="space-y-2 text-gray-300 list-disc list-outside pl-5">
                  <li>Распространение Евангелия и духовное просвещение</li>
                  <li>Проведение служений духовного освобождения и исцеления</li>
                  <li>Поддержка нуждающихся и помощь в кризисных ситуациях</li>
                  <li>Поддержка служителей и развитие Тела Христа</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "agreement" && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full mb-4 sm:mb-6 shadow-lg shadow-red-900/50">
                  <Scroll className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Пользовательское соглашение
                </h2>
                <p className="text-base sm:text-lg text-gray-400">
                  Условия использования сайта и предоставления услуг
                </p>
              </div>

              <div className="text-gray-300 space-y-4 text-sm sm:text-base leading-relaxed">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#DC143C]" />
                    1. Общие положения
                  </h3>
                  <p>
                    Настоящее Пользовательское соглашение (далее — «Соглашение») определяет условия использования 
                    веб-сайта bloodofjesus.ru (далее — «Сайт») и условия предоставления услуг самозанятым 
                    Пановым Дмитрием Александровичем (далее — «Исполнитель»).
                  </p>
                  <p>
                    Используя Сайт, вы соглашаетесь с условиями настоящего Соглашения. Если вы не согласны 
                    с условиями Соглашения, пожалуйста, не используйте Сайт.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">2. Предмет соглашения</h3>
                  <p>
                    Исполнитель предоставляет пользователям доступ к информационным материалам, возможность 
                    получения духовной поддержки, участия в служениях и совершения пожертвований.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">3. Пожертвования</h3>
                  <p>
                    Пожертвования принимаются на цели распространения Евангелия, проведения служений духовного 
                    освобождения и исцеления, поддержки нуждающихся и развития служения.
                  </p>
                  <p>
                    Пожертвования являются добровольными и безвозмездными. Возврат пожертвований осуществляется 
                    в соответствии с действующим законодательством Российской Федерации.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">4. Конфиденциальность</h3>
                  <p>
                    Исполнитель обязуется не разглашать персональные данные пользователей третьим лицам, за 
                    исключением случаев, предусмотренных действующим законодательством.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">5. Интеллектуальная собственность</h3>
                  <p>
                    Все материалы, размещенные на Сайте, являются интеллектуальной собственностью Исполнителя 
                    или используются с разрешения правообладателей.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">6. Ответственность</h3>
                  <p>
                    Исполнитель не несет ответственности за действия пользователей, совершенные с использованием 
                    материалов Сайта.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">7. Изменения в соглашении</h3>
                  <p>
                    Исполнитель оставляет за собой право вносить изменения в настоящее Соглашение. Изменения 
                    вступают в силу с момента их публикации на Сайте.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">8. Контактная информация</h3>
                  <p>
                    По всем вопросам, связанным с использованием Сайта и предоставлением услуг, вы можете 
                    обращаться по контактам, указанным в разделе "Реквизиты для оплаты": 
                    телефон +7 994 417 89 86, email jesusthehealer@yandex.ru.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full mb-4 sm:mb-6 shadow-lg shadow-red-900/50">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Локация служения
                </h2>
                <p className="text-base sm:text-lg text-gray-400">
                  Где мы служим и проводим служения
                </p>
              </div>

              <div className="text-gray-300 space-y-6 text-sm sm:text-base leading-relaxed">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#DC143C]" />
                    Служение по всей России
                  </h3>
                  <p className="mb-3">
                    Служение «Кровь Иисуса» активно работает по всей территории Российской Федерации, 
                    неся Благую весть освобождения и исцеления во все регионы страны.
                  </p>
                  <p className="mb-3">
                    Мы проводим служения, помогая людям ходить во власти и свободе, утверждая истинную свободу от греха, страха, отверженности и демонического угнетения.
                  </p>
                  <p>
                    Наше служение направлено на то, чтобы каждый человек в России мог узнать о 
                    любви Иисуса Христа и обрести свободу, которую Он даровал нам через Свою жертву на кресте.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#DC143C]" />
                    Санкт-Петербург
                  </h3>
                  <p className="mb-3">
                    В Санкт-Петербурге мы проводим регулярные служения и встречи, где люди могут 
                    получить молитву, духовное наставление и поддержку.
                  </p>
                  <p className="text-white font-medium">
                    Санкт-Петербург является одним из основных центров нашего служения, где мы 
                    активно работаем над распространением Евангелия и помощью нуждающимся.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Наша миссия
                  </h3>
                  <p className="mb-3">
                    Мы верим, что каждый человек уникально создан для свободы и предназначен для победоносной жизни во Христе. 
                    Наша цель — помочь людям обрести эту свободу через:
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-2 text-gray-300">
                    <li>Проведение служений освобождения и исцеления души</li>
                    <li>Осознание и практику власти данной нам Иисусом Христом</li>
                    <li>Распространение Евангелия Царства и силы</li>
                    <li>Поддержку и наставление верующих</li>
                    <li>Помощь всем нуждающимся людям в кризисных ситуациях</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Если вы хотите узнать больше о наших служениях или нуждаетесь в молитвенной поддержке, 
                    свяжитесь с нами по контактам, указанным в разделе "Реквизиты".
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
