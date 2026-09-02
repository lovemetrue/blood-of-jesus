import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { MaterialsGuidePage } from "@/app/components/MaterialsGuidePage";
import { MaterialsPrayersPage } from "@/app/components/MaterialsPrayersPage";
import { MaterialsTestimonyPage } from "@/app/components/MaterialsTestimonyPage";
import { AboutUsSection } from "@/app/components/AboutUsSection";
import { ContactsPage } from "@/app/components/ContactsPage";
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
import { FreedomDemonicPage } from "@/app/components/FreedomDemonicPage";
import { PlaceholderPage } from "@/app/components/PlaceholderPage";
import { Footer } from "@/app/components/Footer";
import { SEOHead } from "@/app/components/SEOHead";
import { DEFAULT_KEYWORDS, getSEOForPath } from "@/app/seo";
import { isMenuContentRoute } from "@/app/routes";
import { pageTransition } from "@/app/motionVariants";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef, lazy, Suspense } from "react";

// three.js + @react-three/fiber — это ~900 КБ из бандла. В критическом пути им
// делать нечего: градиент фона уже нарисован на body из CSS, а звёздное поле
// подгружается отдельным чанком и проявляется, когда будет готово.
const Christian3DBackground = lazy(() =>
  import("@/app/components/Christian3DBackground").then((m) => ({ default: m.Christian3DBackground }))
);

const goHome = () => window.history.pushState({}, "", "/");

type Route =
  | { kind: "home" }
  | { kind: "documents" }
  | { kind: "contacts" }
  | { kind: "payment" }
  | { kind: "content"; path: string };

const HOME: Route = { kind: "home" };

/**
 * Разбирает текущий URL в маршрут. Одна функция на все три точки входа
 * (первый рендер, popstate, клики по ссылкам) — раньше эта развилка была
 * скопирована дважды и разъезжалась при правках.
 */
function resolveRoute(): Route {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const { hash, search } = window.location;

  if (pathname === "/documents" || hash === "#documents") return { kind: "documents" };
  if (pathname === "/contacts") return { kind: "contacts" };
  if (pathname === "/payment/success" || search.includes("donation=success")) return { kind: "payment" };
  if (isMenuContentRoute(pathname)) return { kind: "content", path: pathname };
  return HOME;
}

/** Пожертвования временно отключены: /donations уводим на главную. */
function isDisabledDonationRoute() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  return pathname === "/donations" || window.location.hash === "#donations";
}

/** Убирает хвостовой слэш, кроме корня. Вызывается до первого рендера. */
function normalizeUrl() {
  const path = window.location.pathname;
  if (path !== "/" && path.endsWith("/")) {
    window.history.replaceState({}, "", path.slice(0, -1) + window.location.search + window.location.hash);
  }
}

export default function App() {
  // Маршрут вычисляется синхронно в первом же рендере. Когда это делалось в
  // useEffect, любая прямая ссылка успевала отрисовать главную и только потом
  // уезжала в переход на нужный раздел — лишний кадр и лишняя анимация.
  const [route, setRoute] = useState<Route>(() => {
    if (typeof window === "undefined") return HOME;
    normalizeUrl();
    return resolveRoute();
  });
  // TODO: Раскомментировать когда добавим пожертвования
  const showDonations = false; // Временно отключено
  const showDocuments = route.kind === "documents";
  const showContacts = route.kind === "contacts";
  const showPaymentSuccess = route.kind === "payment";
  const contentPagePath = route.kind === "content" ? route.path : null;
  const contentColumnRef = useRef<HTMLDivElement>(null);
  const [contentColumnHeight, setContentColumnHeight] = useState(0);
  const [sentinelBottom, setSentinelBottom] = useState(0);
  const SENTINEL_ID = "content-end-sentinel";

  useEffect(() => {
    if (isDisabledDonationRoute()) window.location.href = "/";
  }, []);

  useEffect(() => {
    // Русскоязычные сообщения валидации. Через делегирование на document, а не
    // обходом input[required] при монтировании: формы появляются позже (форма
    // обратной связи живёт на /contacts), и разовый обход их не видел.
    // Событие invalid не всплывает — слушаем в фазе перехвата.
    const onInvalid = (e: Event) => {
      const field = e.target as HTMLInputElement | HTMLTextAreaElement | null;
      if (!field || !("validity" in field) || field.validity.valid) return;
      e.preventDefault();
      if (field.validity.valueMissing) {
        field.setCustomValidity("Пожалуйста, заполните это поле");
      } else if (field.validity.typeMismatch && (field as HTMLInputElement).type === "email") {
        field.setCustomValidity("Пожалуйста, введите корректный email адрес");
      }
    };
    const onInput = (e: Event) => {
      const field = e.target as HTMLInputElement | HTMLTextAreaElement | null;
      if (field && "setCustomValidity" in field) field.setCustomValidity("");
    };

    document.addEventListener("invalid", onInvalid, true);
    document.addEventListener("input", onInput, true);
    return () => {
      document.removeEventListener("invalid", onInvalid, true);
      document.removeEventListener("input", onInput, true);
    };
  }, []);

  // Высота обёртки фона: максимум из scrollHeight колонки и нижней границы маячка после футера
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debug = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("debug") === "1";

  useEffect(() => {
    const el = contentColumnRef.current;
    if (!el) return;
    const update = () => setContentColumnHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const t1 = setTimeout(update, 150);
    const t2 = setTimeout(update, 500);
    const t3 = setTimeout(update, 1200);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", update);
    };
  }, [showDocuments, showContacts, showPaymentSuccess, contentPagePath]);

  useEffect(() => {
    const update = () => {
      const sentinel = document.getElementById(SENTINEL_ID);
      if (!sentinel) return;
      const bottom = sentinel.getBoundingClientRect().bottom + window.scrollY;
      if (debug) {
        console.log("[BG debug] sentinel bottom:", bottom, "scrollY:", window.scrollY);
      }
      setSentinelBottom(Math.round(bottom));
    };
    const t0 = setTimeout(update, 0);
    const t1 = setTimeout(update, 200);
    const t2 = setTimeout(update, 600);
    const t3 = setTimeout(update, 1500);
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const sentinel = document.getElementById(SENTINEL_ID);
    if (sentinel) {
      update();
      const ro = new ResizeObserver(update);
      ro.observe(sentinel.parentElement ?? sentinel);
      return () => {
        ro.disconnect();
        cancelAnimationFrame(raf);
        clearTimeout(t0);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [showDocuments, showContacts, showPaymentSuccess, contentPagePath, debug]);

  const wrapperMinHeight =
    contentColumnHeight > 0 || sentinelBottom > 0
      ? `max(100vh, ${Math.max(contentColumnHeight, sentinelBottom)}px)`
      : "100vh";

  // Прокрутка к секции при переходе по ссылке с хешем (/#about, /#home)
  useEffect(() => {
    if (showDocuments || showContacts || showDonations || showPaymentSuccess || contentPagePath) return;
    const hash = window.location.hash.slice(1);
    if (hash === 'about' || hash === 'home') {
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showDocuments, showContacts, showDonations, showPaymentSuccess, contentPagePath]);

  // Обработчик изменений истории браузера (назад/вперед)
  useEffect(() => {
    const handlePopState = () => {
      if (isDisabledDonationRoute()) {
        window.location.href = "/";
        return;
      }
      setRoute(resolveRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Перехват кликов по внутренним ссылкам: один делегированный обработчик на
  // document вместо четырёх, каждый из которых заново обходил дерево через
  // closest на каждый клик по странице.
  useEffect(() => {
    const MENU_CONTENT_SELECTOR =
      'a[href^="/love/"], a[href^="/faith/"], a[href^="/covenant/"], a[href^="/freedom/"], a[href^="/materials/"]';
    const SELECTOR = [
      'a[href="/documents"]',
      'a[href="/contacts"]',
      'button[data-contacts-link]',
      'a[href="/"]',
      'a[href="/#about"]',
      'a[href="/#home"]',
      MENU_CONTENT_SELECTOR,
    ].join(', ');

    const handleClick = (e: MouseEvent) => {
      // Не перехватываем модифицированные клики и не-левую кнопку: открытие
      // в новой вкладке должно работать как обычная ссылка.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(SELECTOR);
      if (!el) return;

      const href = el.getAttribute('href') ?? (el.matches('button[data-contacts-link]') ? '/contacts' : null);
      if (!href) return;

      let next: Route;
      if (href === '/documents') next = { kind: 'documents' };
      else if (href === '/contacts') next = { kind: 'contacts' };
      else if (isMenuContentRoute(href)) next = { kind: 'content', path: href };
      else next = HOME;

      e.preventDefault();
      setRoute(next);
      window.history.pushState({}, '', href);

      const hash = href.includes('#') ? href.split('#')[1] : '';
      if (hash === 'about' || hash === 'home') {
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const pageKey = route.kind === "content" ? route.path : route.kind;

  const seo = getSEOForPath(
    route.kind === "payment"
      ? "/payment/success"
      : route.kind === "documents"
        ? "/documents"
        : route.kind === "contacts"
          ? "/contacts"
          : route.kind === "content"
            ? route.path
            : "/"
  );

  /** Возврат на главную из любого раздела. */
  const backHome = () => {
    setRoute(HOME);
    goHome();
  };

  const renderContentPage = () => {
    if (!contentPagePath) return null;
    const onBack = backHome;
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
        return <FreedomDemonicPage onBack={onBack} />;
      case "/freedom/sin":
        return <PlaceholderPage title="От рабства греха" onBack={onBack} />;
      case "/materials/guides":
        return <MaterialsGuidePage onBack={onBack} />;
      case "/materials/prayers":
        return <MaterialsPrayersPage onBack={onBack} />;
      case "/materials/testimonies":
        return <MaterialsTestimonyPage onBack={onBack} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead title={seo.title} description={seo.description} keywords={DEFAULT_KEYWORDS} />
      <div className="min-h-screen overflow-x-hidden">
        <div ref={wrapperRef} className="relative w-full" style={{ minHeight: wrapperMinHeight }}>
          {/* Фолбэк — тот же градиент, что и на body: пока грузится чанк с WebGL,
              слой фона уже на месте и ничего не мигает. */}
          <Suspense fallback={<div className="site-backdrop absolute inset-0 z-0 w-full" aria-hidden />}>
            <Christian3DBackground
              debug={debug}
              contentColumnHeight={contentColumnHeight}
              sentinelBottom={sentinelBottom}
              wrapperMinHeightPx={Math.max(contentColumnHeight, sentinelBottom)}
            />
          </Suspense>
          <div ref={contentColumnRef} className="relative z-10">
            <Header />
          {/* initial={false} — первую страницу показываем сразу, без проявления
              из opacity: 0. Анимация остаётся только на переходах между
              разделами, где она читается как намеренная. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pageKey}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              {/* Маршруты взаимоисключающие по типу Route, поэтому цепочка
                  проверок «а не показан ли другой раздел» больше не нужна. */}
              {route.kind === "payment" && <PaymentSuccess onBack={backHome} />}
              {route.kind === "documents" && <DocumentsPage onBack={backHome} />}
              {route.kind === "contacts" && <ContactsPage onBack={backHome} />}
              {route.kind === "content" && renderContentPage()}
              {route.kind === "home" && (
                <main>
                  <Hero />
                  <AboutUsSection />
                </main>
              )}
            </motion.div>
          </AnimatePresence>
            <Footer />
            <div id={SENTINEL_ID} aria-hidden className="pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
}