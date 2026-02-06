import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export function SEOHead({
  title = 'Кровь и вода - Освобождение и исцеление через Иисуса Христа',
  description = 'Служение духовного освобождения, изгнания демонов и исцеления души через веру и власть в Иисусе Христе. Бесплатные материалы, проповеди и молитвы для вашего духовного роста.',
  keywords = 'духовное освобождение, изгнание демонов, исцеление души, Иисус Христос, молитвы освобождения, духовная война, христианское служение, вера во Христе, духовная свобода, избавление от угнетения',
  ogImage = '/og-image.png'
}: SEOHeadProps) {
  useEffect(() => {
    // Яндекс Метрика - загрузка скрипта
    const ymId = 106606875;
    const scriptUrl = `https://mc.yandex.ru/metrika/tag.js?id=${ymId}`;
    
    // Проверяем, не загружен ли уже скрипт
    let scriptExists = false;
    for (let j = 0; j < document.scripts.length; j++) {
      if ((document.scripts[j] as HTMLScriptElement).src === scriptUrl) {
        scriptExists = true;
        break;
      }
    }

    if (!scriptExists) {
      // Инициализируем функцию ym до загрузки скрипта
      (window as any).ym = (window as any).ym || function(...args: any[]) {
        ((window as any).ym.a = (window as any).ym.a || []).push(args);
      };
      (window as any).ym.l = 1 * new Date().getTime();

      // Создаем и загружаем скрипт
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = scriptUrl;
      
      // Инициализируем Метрику после загрузки скрипта
      script.onload = () => {
        if ((window as any).ym) {
          (window as any).ym(ymId, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: 'dataLayer',
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce: true,
            trackLinks: true
          });
        }
      };

      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    } else {
      // Если скрипт уже загружен, просто инициализируем
      if ((window as any).ym) {
        (window as any).ym(ymId, 'init', {
          ssr: true,
          webvisor: true,
          clickmap: true,
          ecommerce: 'dataLayer',
          referrer: document.referrer,
          url: location.href,
          accurateTrackBounce: true,
          trackLinks: true
        });
      }
    }

    // Update document title
    document.title = title;

    // Update or create meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let tag = document.querySelector(selector);
      
      if (!tag) {
        tag = document.createElement('meta');
        if (name) tag.setAttribute('name', name);
        if (property) tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    });

    // Метатег referrer для правильного определения источника переходов
    let referrerTag = document.querySelector('meta[name="referrer"]');
    if (!referrerTag) {
      referrerTag = document.createElement('meta');
      referrerTag.setAttribute('name', 'referrer');
      document.head.appendChild(referrerTag);
    }
    referrerTag.setAttribute('content', 'origin');

    // Добавляем favicon ссылки динамически
    const faviconLinks = [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicons/favicon-48x48.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ];

    faviconLinks.forEach(({ rel, type, sizes, href }) => {
      const selector = sizes 
        ? `link[rel="${rel}"][sizes="${sizes}"]`
        : `link[rel="${rel}"][type="${type}"]`;
      
      let link = document.querySelector(selector);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (type) link.setAttribute('type', type);
        if (sizes) link.setAttribute('sizes', sizes);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    });

    // Добавляем структурированные данные для локации (LocalBusiness schema)
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

    // Удаляем старый скрипт структурированных данных, если есть
    const oldScript = document.getElementById('main-structured-data');
    if (oldScript) {
      oldScript.remove();
    }

    // Добавляем структурированные данные в head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'main-structured-data';
    document.head.appendChild(script);

    // Добавляем мета-теги для геолокации
    const geoMetaTags = [
      { name: 'geo.region', content: 'RU-SPE' },
      { name: 'geo.placename', content: 'Санкт-Петербург' },
      { name: 'geo.position', content: '59.9343;30.3351' },
      { name: 'ICBM', content: '59.9343, 30.3351' }
    ];

    geoMetaTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [title, description, keywords, ogImage]);

  return (
    <>
      {/* Яндекс Метрика noscript для пользователей без JavaScript */}
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/106606875"
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
