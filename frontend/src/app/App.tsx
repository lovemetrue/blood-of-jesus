import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { MaterialsGrid } from "@/app/components/MaterialsGrid";
import { DonationSection } from "@/app/components/DonationSection";
import { ContactForm } from "@/app/components/ContactForm";
import { Footer } from "@/app/components/Footer";
import { FloatingCross } from "@/app/components/FloatingCross";
import { SEOHead } from "@/app/components/SEOHead";
import { useEffect, useState } from "react";

export default function App() {
  const [donationSuccess, setDonationSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('donation') === 'success') {
      setDonationSuccess(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
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

  return (
    <>
      <SEOHead />
      {donationSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          Благодарим за пожертвование! Да благословит вас Господь.
          <button onClick={() => setDonationSuccess(false)} className="ml-4 underline">Закрыть</button>
        </div>
      )}
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