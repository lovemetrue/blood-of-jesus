import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { MaterialsGrid } from "@/app/components/MaterialsGrid";
import { ContactForm } from "@/app/components/ContactForm";
import { DocumentsPage } from "@/app/components/DocumentsPage";
import { DonationPage } from "@/app/components/DonationPage";
import { PaymentSuccess } from "@/app/components/PaymentSuccess";
import { Footer } from "@/app/components/Footer";
import { FloatingCross } from "@/app/components/FloatingCross";
import { SEOHead } from "@/app/components/SEOHead";
import { useEffect, useState } from "react";

export default function App() {
  const [showDocuments, setShowDocuments] = useState(false);
  const [showDonations, setShowDonations] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    // Нормализуем URL при загрузке (убираем trailing slash, кроме корня)
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && currentPath.endsWith('/')) {
      const normalizedPath = currentPath.slice(0, -1);
      window.history.replaceState({}, '', normalizedPath + window.location.search + window.location.hash);
    }
    
    // Проверяем URL для открытия страницы документов
    // Нормализуем pathname (убираем trailing slash)
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    const hash = window.location.hash;
    const search = window.location.search;
    
    if (pathname === '/documents' || hash === '#documents') {
      setShowDocuments(true);
      setShowDonations(false);
      setShowPaymentSuccess(false);
    } else if (pathname === '/donations' || hash === '#donations') {
      setShowDonations(true);
      setShowDocuments(false);
      setShowPaymentSuccess(false);
    } else if (pathname === '/payment/success' || search.includes('donation=success')) {
      setShowPaymentSuccess(true);
      setShowDocuments(false);
      setShowDonations(false);
    } else {
      // Сбрасываем все состояния при переходе на главную
      setShowDocuments(false);
      setShowDonations(false);
      setShowPaymentSuccess(false);
    }

    // Русскоязычные сообщения валидации для обязательных полей
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    inputs.forEach((input) => {
      (input as HTMLInputElement).addEventListener('invalid', function(e) {
        e.preventDefault();
        if (!(e.target as HTMLInputElement).validity.valid) {
          if ((e.target as HTMLInputElement).validity.valueMissing) {
            (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, заполните это поле');
          } else if ((e.target as HTMLInputElement).validity.typeMismatch && (e.target as HTMLInputElement).type === 'email') {
            (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, введите корректный email адрес');
          }
        }
      });
      
      (input as HTMLInputElement).addEventListener('input', function() {
        (this as HTMLInputElement).setCustomValidity('');
      });
    });
  }, []);

  // Обработчик изменений истории браузера (назад/вперед)
  useEffect(() => {
    const handlePopState = () => {
      // Нормализуем pathname (убираем trailing slash)
      const pathname = window.location.pathname.replace(/\/$/, '') || '/';
      const hash = window.location.hash;
      const search = window.location.search;
      
      if (pathname === '/documents' || hash === '#documents') {
        setShowDocuments(true);
        setShowDonations(false);
        setShowPaymentSuccess(false);
      } else if (pathname === '/donations' || hash === '#donations') {
        setShowDonations(true);
        setShowDocuments(false);
        setShowPaymentSuccess(false);
      } else if (pathname === '/payment/success' || search.includes('donation=success')) {
        setShowPaymentSuccess(true);
        setShowDocuments(false);
        setShowDonations(false);
      } else {
        setShowDocuments(false);
        setShowDonations(false);
        setShowPaymentSuccess(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Обработчик клика на ссылку документов
  useEffect(() => {
    const handleDocumentLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="/documents"]');
      if (link) {
        e.preventDefault();
        setShowDocuments(true);
        setShowDonations(false);
        setShowPaymentSuccess(false);
        window.history.pushState({}, '', '/documents');
      }
    };

    // Обработчик клика на ссылку пожертвований
    const handleDonationLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="/donations"], button[data-donation-link]');
      if (link) {
        e.preventDefault();
        setShowDonations(true);
        setShowDocuments(false);
        setShowPaymentSuccess(false);
        window.history.pushState({}, '', '/donations');
      }
    };

    document.addEventListener('click', handleDocumentLink);
    document.addEventListener('click', handleDonationLink);
    return () => {
      document.removeEventListener('click', handleDocumentLink);
      document.removeEventListener('click', handleDonationLink);
    };
  }, []);

  if (showPaymentSuccess) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <FloatingCross />
          <div className="relative z-10">
            <Header />
            <PaymentSuccess onBack={() => {
              setShowPaymentSuccess(false);
              window.history.pushState({}, '', '/');
            }} />
            <Footer />
          </div>
        </div>
      </>
    );
  }

  if (showDonations) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <FloatingCross />
          <div className="relative z-10">
            <Header />
            <DonationPage onBack={() => {
              setShowDonations(false);
              window.history.pushState({}, '', '/');
            }} />
            <Footer />
          </div>
        </div>
      </>
    );
  }

  if (showDocuments) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <FloatingCross />
          <div className="relative z-10">
            <Header />
            <DocumentsPage onBack={() => {
              setShowDocuments(false);
              window.history.pushState({}, '', '/');
            }} />
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <FloatingCross />
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <MaterialsGrid />
            <ContactForm />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}