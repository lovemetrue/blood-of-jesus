import { MapPin, Globe, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export function LocationPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    // Структурированные данные для SEO (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Служение освобождения и исцеления",
      "description": "Служение духовного освобождения, изгнания демонов и исцеления души через веру и власть в Иисусе Христе",
      "url": "https://bloodofjesus.ru",
      "telephone": "+79944178986",
      "email": "jesusthehealer@yandex.ru",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Санкт-Петербург",
        "addressCountry": "RU",
        "addressRegion": "Санкт-Петербург"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Россия"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "59.9343",
        "longitude": "30.3351"
      },
      "sameAs": [
        "https://www.youtube.com/@BloodandWaterRU",
        "https://t.me/lifespeakingteam"
      ]
    };

    // Добавляем структурированные данные в head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'location-structured-data';
    
    // Удаляем старый скрипт, если есть
    const oldScript = document.getElementById('location-structured-data');
    if (oldScript) {
      oldScript.remove();
    }
    
    document.head.appendChild(script);

    // Добавляем мета-теги для геолокации
    const metaTags = [
      { name: 'geo.region', content: 'RU-SPE' },
      { name: 'geo.placename', content: 'Санкт-Петербург' },
      { name: 'geo.position', content: '59.9343;30.3351' },
      { name: 'ICBM', content: '59.9343, 30.3351' }
    ];

    metaTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    return () => {
      // Очистка при размонтировании
      const scriptToRemove = document.getElementById('location-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

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
            География служения
          </h1>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800 space-y-8">
          {/* Основная локация */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full mb-4 sm:mb-6 shadow-lg shadow-red-900/50">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Санкт-Петербург, Россия
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Основная локация нашего служения находится в Санкт-Петербурге
            </p>
          </div>

          {/* География служения */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#DC143C]/20 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#DC143C]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                  Вся Россия
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                  Наше служение распространяется на всю территорию Российской Федерации. 
                  Мы предоставляем духовную поддержку, молитвенное служение и материалы 
                  для всех жителей России, независимо от их географического расположения.
                </p>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Через онлайн-платформы, видеоконференции и цифровые материалы мы 
                  достигаем верующих по всей стране, помогая им осознать свою власть, обрести свободу и 
                  исцеление во Христе.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#DC143C]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#DC143C]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                  Санкт-Петербург
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                  Санкт-Петербург является основным центром нашего служения. Здесь 
                  проводятся очные служения, молитвенные встречи и личные консультации 
                  для тех, кто нуждается в духовном освобождении и исцелении.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
                  <p className="text-gray-300 text-sm sm:text-base mb-2">
                    <span className="text-gray-400">Адрес:</span> Санкт-Петербург, Россия
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base mb-2">
                    <span className="text-gray-400">Телефон:</span>{' '}
                    <a href="tel:+79944178986" className="text-[#DC143C] hover:text-[#FF1744] transition-colors">
                      +7 994 417 89 86
                    </a>
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base">
                    <span className="text-gray-400">Email:</span>{' '}
                    <a href="mailto:jesusthehealer@yandex.ru" className="text-[#DC143C] hover:text-[#FF1744] transition-colors">
                      jesusthehealer@yandex.ru
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO контент */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Служение по всей России и в Санкт-Петербурге
            </h3>
            <div className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                Наше служение духовного освобождения и исцеления доступно для всех жителей 
                России. Мы предоставляем помощь в изгнании демонов, духовном освобождении 
                и исцелении души через веру и власть в Иисусе Христе.
              </p>
              <p>
                Основная локация служения находится в Санкт-Петербурге, где проводятся 
                очные встречи и служения. Однако благодаря современным технологиям мы 
                можем помочь верующим по всей России через онлайн-платформы, видеоконференции 
                и цифровые материалы.
              </p>
              <p>
                Если вы находитесь в Санкт-Петербурге, вы можете связаться с нами для 
                личной встречи или участия в очных служениях. Если вы находитесь в другом 
                городе России, мы готовы помочь вам через онлайн-формат.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
