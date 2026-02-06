import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { MaterialsGrid } from "@/app/components/MaterialsGrid";
import { DonationSection } from "@/app/components/DonationSection";
import { ContactForm } from "@/app/components/ContactForm";
import { DocumentsPage } from "@/app/components/DocumentsPage";
import { LocationPage } from "@/app/components/LocationPage";
import { Footer } from "@/app/components/Footer";
import { FloatingCross } from "@/app/components/FloatingCross";
import { SEOHead } from "@/app/components/SEOHead";
import { useEffect, useState } from "react";

export default function App() {
  const [showDocuments, setShowDocuments] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    // Проверяем URL для открытия страницы документов
    if (window.location.pathname === '/documents' || window.location.hash === '#documents') {
      setShowDocuments(true);
    }
    
    // Проверяем URL для открытия страницы локации
    if (window.location.pathname === '/location' || window.location.hash === '#location') {
      setShowLocation(true);
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
        setShowLocation(false);
        window.history.pushState({}, '', '/documents');
      }
    };

    document.addEventListener('click', handleDocumentLink);
    return () => document.removeEventListener('click', handleDocumentLink);
  }, []);

  // Обработчик клика на ссылку локации
  useEffect(() => {
    const handleLocationLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="/location"]');
      if (link) {
        e.preventDefault();
        setShowLocation(true);
        setShowDocuments(false);
        window.history.pushState({}, '', '/location');
      }
    };

    document.addEventListener('click', handleLocationLink);
    return () => document.removeEventListener('click', handleLocationLink);
  }, []);

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
              setShowLocation(false);
              window.history.pushState({}, '', '/');
            }} />
            <Footer />
          </div>
        </div>
      </>
    );
  }

  if (showLocation) {
    return (
      <>
        <SEOHead 
          title="География служения - Санкт-Петербург, Россия | Кровь и вода"
          description="Служение духовного освобождения и исцеления в Санкт-Петербурге и по всей России. Очные встречи в Санкт-Петербурге и онлайн-служение для всей России."
          keywords="духовное освобождение Санкт-Петербург, служение Россия, изгнание демонов Санкт-Петербург, исцеление души Россия, христианское служение Санкт-Петербург"
        />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <FloatingCross />
          <div className="relative z-10">
            <Header />
            <LocationPage onBack={() => {
              setShowLocation(false);
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
            <DonationSection />
            <ContactForm />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}