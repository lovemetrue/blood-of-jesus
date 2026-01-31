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
  }, [title, description, keywords, ogImage]);

  return null;
}
