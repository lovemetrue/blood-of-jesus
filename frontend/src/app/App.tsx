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
    // Проверяем URL для открытия страницы документов
    if (window.location.pathname === '/documents' || window.location.hash === '#documents') {
      setShowDocuments(true);
    }
    
    // Проверяем URL для страницы пожертвований
    if (window.location.pathname === '/donations' || window.location.hash === '#donations') {
      setShowDonations(true);
    }
    
    // Проверяем URL для страницы успешной оплаты
    if (window.location.pathname === '/payment/success' || window.location.search.includes('donation=success')) {
      setShowPaymentSuccess(true);
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

  // Обработчик клика на ссылку документов
  useEffect(() => {
    const handleDocumentLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="/documents"]');
      if (link) {
        e.preventDefault();
        setShowDocuments(true);
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