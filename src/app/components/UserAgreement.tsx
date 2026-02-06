import { FileText, Scroll } from "lucide-react";

export function UserAgreement() {
  return (
    <section id="agreement" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full mb-4 sm:mb-6 shadow-lg shadow-red-900/50">
            <Scroll className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Пользовательское соглашение
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Условия использования сайта и предоставления услуг
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800 space-y-6 sm:space-y-8">
          <div className="prose prose-invert max-w-none">
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
        </div>
      </div>
    </section>
  );
}
