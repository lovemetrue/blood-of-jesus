import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { MaterialsGrid } from "@/app/components/MaterialsGrid";
import { ContactForm } from "@/app/components/ContactForm";
import { DocumentsPage } from "@/app/components/DocumentsPage";
// TODO: Раскомментировать когда добавим пожертвования
// import { DonationPage } from "@/app/components/DonationPage";
import { PaymentSuccess } from "@/app/components/PaymentSuccess";
import { CursesPage } from "@/app/components/CursesPage";
import { HeritagePage } from "@/app/components/HeritagePage";
import { CovenantSalvationPage } from "@/app/components/CovenantSalvationPage";
import { CovenantDedicationPage } from "@/app/components/CovenantDedicationPage";
import { CovenantGivingPage } from "@/app/components/CovenantGivingPage";
import { FaithPromisesPage } from "@/app/components/FaithPromisesPage";
import { LoveGodPage } from "@/app/components/LoveGodPage";
import { LoveSelfPage } from "@/app/components/LoveSelfPage";
import { LoveNeighborPage } from "@/app/components/LoveNeighborPage";
import { PlaceholderPage } from "@/app/components/PlaceholderPage";
import { Footer } from "@/app/components/Footer";
import { FloatingCross } from "@/app/components/FloatingCross";
import { SEOHead } from "@/app/components/SEOHead";
import { isMenuContentRoute } from "@/app/routes";
import { useEffect, useState } from "react";

const goHome = () => window.history.pushState({}, "", "/");

export default function App() {
  const [showDocuments, setShowDocuments] = useState(false);
  // TODO: Раскомментировать когда добавим пожертвования
  // const [showDonations, setShowDonations] = useState(false);
  const showDonations = false; // Временно отключено
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [contentPagePath, setContentPagePath] = useState<string | null>(null);

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
      // TODO: Раскомментировать когда добавим пожертвования
      // setShowDonations(false);
      setShowPaymentSuccess(false);
      setContentPagePath(null);
    } else if (pathname === '/donations' || hash === '#donations') {
      // TODO: Раскомментировать когда добавим пожертвования
      // setShowDonations(true);
      // setShowDocuments(false);
      // setShowPaymentSuccess(false);
      // setContentPagePath(null);
      // Временно перенаправляем на главную
      window.location.href = '/';
    } else if (pathname === '/payment/success' || search.includes('donation=success')) {
      setShowPaymentSuccess(true);
      setShowDocuments(false);
      // TODO: Раскомментировать когда добавим пожертвования
      // setShowDonations(false);
      setContentPagePath(null);
    } else if (isMenuContentRoute(pathname)) {
      setContentPagePath(pathname);
      setShowDocuments(false);
      // TODO: Раскомментировать когда добавим пожертвования
      // setShowDonations(false);
      setShowPaymentSuccess(false);
    } else {
      setShowDocuments(false);
      // TODO: Раскомментировать когда добавим пожертвования
      // setShowDonations(false);
      setShowPaymentSuccess(false);
      setContentPagePath(null);
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

  // Прокрутка к секции при переходе по ссылке с хешем (/#materials, /#contact)
  useEffect(() => {
    if (showDocuments || showDonations || showPaymentSuccess || contentPagePath) return;
    const hash = window.location.hash.slice(1);
    if (hash === 'materials' || hash === 'contact' || hash === 'home') {
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showDocuments, showDonations, showPaymentSuccess, contentPagePath]);

  // Обработчик изменений истории браузера (назад/вперед)
  useEffect(() => {
    const handlePopState = () => {
      // Нормализуем pathname (убираем trailing slash)
      const pathname = window.location.pathname.replace(/\/$/, '') || '/';
      const hash = window.location.hash;
      const search = window.location.search;
      
      if (pathname === '/documents' || hash === '#documents') {
        setShowDocuments(true);
        // TODO: Раскомментировать когда добавим пожертвования
        // setShowDonations(false);
        setShowPaymentSuccess(false);
        setContentPagePath(null);
      } else if (pathname === '/donations' || hash === '#donations') {
        // TODO: Раскомментировать когда добавим пожертвования
        // setShowDonations(true);
        // setShowDocuments(false);
        // setShowPaymentSuccess(false);
        // setContentPagePath(null);
        // Временно перенаправляем на главную
        window.location.href = '/';
      } else if (pathname === '/payment/success' || search.includes('donation=success')) {
        setShowPaymentSuccess(true);
        setShowDocuments(false);
        // TODO: Раскомментировать когда добавим пожертвования
        // setShowDonations(false);
        setContentPagePath(null);
      } else if (isMenuContentRoute(pathname)) {
        setContentPagePath(pathname);
        setShowDocuments(false);
        // TODO: Раскомментировать когда добавим пожертвования
        // setShowDonations(false);
        setShowPaymentSuccess(false);
      } else {
        setShowDocuments(false);
        // TODO: Раскомментировать когда добавим пожертвования
        // setShowDonations(false);
        setShowPaymentSuccess(false);
        setContentPagePath(null);
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
        // TODO: Раскомментировать когда добавим пожертвования
        // setShowDonations(false);
        setShowPaymentSuccess(false);
        setContentPagePath(null);
        window.history.pushState({}, '', '/documents');
      }
    };

    // TODO: Раскомментировать когда добавим пожертвования
    // const handleDonationLink = (e: MouseEvent) => {
    //   const target = e.target as HTMLElement;
    //   const link = target.closest('a[href="/donations"], button[data-donation-link]');
    //   if (link) {
    //     e.preventDefault();
    //     setShowDonations(true);
    //     setShowDocuments(false);
    //     setShowPaymentSuccess(false);
    //     setContentPagePath(null);
    //     window.history.pushState({}, '', '/donations');
    //   }
    // };

    const handleMenuContentLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/love/"], a[href^="/faith/"], a[href^="/covenant/"], a[href^="/freedom/"]');
      if (link) {
        const href = (link as HTMLAnchorElement).getAttribute('href');
        if (href && isMenuContentRoute(href)) {
          e.preventDefault();
          setContentPagePath(href);
          setShowDocuments(false);
          // TODO: Раскомментировать когда добавим пожертвования
          // setShowDonations(false);
          setShowPaymentSuccess(false);
          window.history.pushState({}, '', href);
        }
      }
    };

    document.addEventListener('click', handleDocumentLink);
    // TODO: Раскомментировать когда добавим пожертвования
    // document.addEventListener('click', handleDonationLink);
    document.addEventListener('click', handleMenuContentLink);
    return () => {
      document.removeEventListener('click', handleDocumentLink);
      // TODO: Раскомментировать когда добавим пожертвования
      // document.removeEventListener('click', handleDonationLink);
      document.removeEventListener('click', handleMenuContentLink);
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

  // TODO: Раскомментировать когда добавим пожертвования
  // if (showDonations) {
  //   return (
  //     <>
  //       <SEOHead />
  //       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
  //         <FloatingCross />
  //         <div className="relative z-10">
  //           <Header />
  //           <DonationPage onBack={() => {
  //             setShowDonations(false);
  //             window.history.pushState({}, '', '/');
  //           }} />
  //           <Footer />
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

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

  const renderContentPage = () => {
    if (!contentPagePath) return null;
    const onBack = () => {
      setContentPagePath(null);
      goHome();
      window.dispatchEvent(new PopStateEvent("popstate"));
    };
    switch (contentPagePath) {
      case "/faith/inheritance":
        return <HeritagePage onBack={onBack} />;
      case "/covenant/salvation":
        return <CovenantSalvationPage onBack={onBack} />;
      case "/covenant/dedication":
        return <CovenantDedicationPage onBack={onBack} />;
      case "/covenant/giving":
        return <CovenantGivingPage onBack={onBack} />;
      case "/freedom/curses":
        return <CursesPage onBack={onBack} />;
      case "/love/god":
        return <LoveGodPage onBack={onBack} />;
      case "/love/self":
        return <LoveSelfPage onBack={onBack} />;
      case "/love/neighbor":
        return <LoveNeighborPage onBack={onBack} />;
      case "/faith/promises":
        return <FaithPromisesPage onBack={onBack} />;
      case "/faith/expectations":
        return <PlaceholderPage title="В ожидания Бога" onBack={onBack} />;
      case "/freedom/rejection":
        return <PlaceholderPage title="От отверженности и страха" onBack={onBack} />;
      case "/freedom/church-trauma":
        return <PlaceholderPage title="От церковных травм" onBack={onBack} />;
      case "/freedom/demonic":
        return <PlaceholderPage title="От демонического угнетения" onBack={onBack} />;
      case "/freedom/sin":
        return <PlaceholderPage title="От рабства греха" onBack={onBack} />;
      default:
        return null;
    }
  };

  if (contentPagePath && renderContentPage()) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <FloatingCross />
          <div className="relative z-10">
            <Header />
            {renderContentPage()}
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