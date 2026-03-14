import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-optimized.png";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function DropdownMenu({ label, items, isOpen, onMouseEnter, onMouseLeave }: DropdownMenuProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className="flex items-center gap-0.5 text-gray-300 hover:text-[#DC143C] transition-colors duration-200 py-1.5 px-0.5 relative group text-sm"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#DC143C]" : "group-hover:text-[#DC143C]"
          }`}
        />
        {/* Подчеркивание при hover */}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-[#DC143C] transition-all duration-200 ${
            isOpen ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </button>

      {/* Dropdown меню */}
      <div
        className={`absolute top-full left-0 mt-1.5 min-w-[180px] bg-black/95 backdrop-blur-md rounded-md shadow-2xl border border-red-900/30 overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="py-1.5">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#DC143C]/20 transition-all duration-200 relative group"
            >
              <span className="relative z-10">{item.label}</span>
              {/* Эффект подсветки слева */}
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#DC143C] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  // TODO: Раскомментировать когда добавим пожертвования
  // const isOnSubPage = pathname !== '/' && (pathname === '/donations' || pathname === '/documents' || pathname === '/payment/success' || pathname.startsWith('/love/') || pathname.startsWith('/faith/') || pathname.startsWith('/covenant/') || pathname.startsWith('/freedom/'));
  const isOnSubPage = pathname !== '/' && (pathname === '/contacts' || pathname === '/documents' || pathname === '/payment/success' || pathname.startsWith('/love/') || pathname.startsWith('/faith/') || pathname.startsWith('/covenant/') || pathname.startsWith('/freedom/'));

  const navigateToHome = () => {
    if (isOnSubPage) {
      window.location.href = '/';
      return;
    }
    document.getElementById('home')?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const scrollToSection = (id: string) => {
    if (isOnSubPage) {
      window.location.href = '/';
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const navigateToPage = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const menuItems = {
    love: [
      { label: "К Богу", onClick: () => navigateToPage("/love/god") },
      { label: "К себе", onClick: () => navigateToPage("/love/self") },
      { label: "К ближнему", onClick: () => navigateToPage("/love/neighbor") },
    ],
    faith: [
      { label: "В обетования", onClick: () => navigateToPage("/faith/promises") },
      { label: "Наследие Авраама", onClick: () => navigateToPage("/faith/inheritance") },
      { label: "В ожидания Бога", onClick: () => navigateToPage("/faith/expectations") },
    ],
    covenant: [
      { label: "Спасения", onClick: () => navigateToPage("/covenant/salvation") },
      { label: "Посвящения", onClick: () => navigateToPage("/covenant/dedication") },
      { label: "Даяния", onClick: () => navigateToPage("/covenant/giving") },
    ],
    freedom: [
      { label: "От отверженности и страха", onClick: () => navigateToPage("/freedom/rejection") },
      { label: "От церковных травм", onClick: () => navigateToPage("/freedom/church-trauma") },
      { label: "От демонического угнетения", onClick: () => navigateToPage("/freedom/demonic") },
      { label: "От рабства греха", onClick: () => navigateToPage("/freedom/sin") },
      { label: "От проклятий", onClick: () => navigateToPage("/freedom/curses") },
    ],
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md shadow-lg border-b border-red-900/20 z-50">
      <div className="max-w-[68rem] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-12 pt-1">
          <div className="flex items-center shrink-0">
            <a
              href="/"
              onClick={(e) => {
                if (!isOnSubPage) {
                  e.preventDefault();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                  setActiveDropdown(null);
                }
              }}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="На главную"
            >
              <img
                src={logo}
                alt="Кровь и вода"
                className="h-9 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-5 ml-auto">
            <button
              onClick={navigateToHome}
              className="text-gray-300 hover:text-[#DC143C] transition-colors duration-200 py-1.5 px-0.5 relative group text-sm"
            >
              <span>Главная</span>
              <span className="absolute bottom-0 left-0 h-0.5 bg-[#DC143C] w-0 group-hover:w-full transition-all duration-200" />
            </button>

            <DropdownMenu
              label="Любовь"
              items={menuItems.love}
              isOpen={activeDropdown === "love"}
              onMouseEnter={() => setActiveDropdown("love")}
              onMouseLeave={() => setActiveDropdown(null)}
            />

            <DropdownMenu
              label="Вера"
              items={menuItems.faith}
              isOpen={activeDropdown === "faith"}
              onMouseEnter={() => setActiveDropdown("faith")}
              onMouseLeave={() => setActiveDropdown(null)}
            />

            <DropdownMenu
              label="Завет"
              items={menuItems.covenant}
              isOpen={activeDropdown === "covenant"}
              onMouseEnter={() => setActiveDropdown("covenant")}
              onMouseLeave={() => setActiveDropdown(null)}
            />

            <DropdownMenu
              label="Свобода"
              items={menuItems.freedom}
              isOpen={activeDropdown === "freedom"}
              onMouseEnter={() => setActiveDropdown("freedom")}
              onMouseLeave={() => setActiveDropdown(null)}
            />

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-2 lg:gap-3 ml-3">
              <a
                href="/contacts"
                className="px-3 py-1.5 text-xs font-medium bg-[#DC143C] text-white rounded-md hover:bg-[#FF1744] transition-colors duration-200 shadow-lg shadow-red-900/30"
              >
                Контакты
              </a>
              {/* TODO: Раскомментировать когда добавим пожертвования */}
              {/* <button
                onClick={() => {
                  window.location.href = '/donations';
                }}
                data-donation-link
                className="px-4 py-2 text-sm font-medium bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors duration-200 shadow-lg shadow-red-900/30"
              >
                Пожертвования
              </button> */}
            </div>
          </nav>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-gray-800 transition-colors"
            aria-label="Меню"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-[#DC143C]" />
            ) : (
              <Menu className="h-5 w-5 text-[#DC143C]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="pb-3 space-y-0.5 pt-1.5">
            <button
              onClick={navigateToHome}
              className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#DC143C]/20 hover:text-white rounded-md transition-all duration-200"
            >
              Главная
            </button>

            {/* Любовь */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "love" ? null : "love")
                }
                className="flex items-center justify-between w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#DC143C]/20 hover:text-white rounded-md transition-all duration-200"
              >
                <span>Любовь</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "love" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === "love"
                    ? "max-h-[140px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 space-y-0.5">
                  {menuItems.love.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="block w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-[#DC143C]/10 rounded-md transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Вера */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "faith" ? null : "faith")
                }
                className="flex items-center justify-between w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#DC143C]/20 hover:text-white rounded-md transition-all duration-200"
              >
                <span>Вера</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "faith" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === "faith"
                    ? "max-h-[140px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 space-y-0.5">
                  {menuItems.faith.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="block w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-[#DC143C]/10 rounded-md transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Завет */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "covenant" ? null : "covenant")
                }
                className="flex items-center justify-between w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#DC143C]/20 hover:text-white rounded-md transition-all duration-200"
              >
                <span>Завет</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "covenant" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === "covenant"
                    ? "max-h-[140px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 space-y-0.5">
                  {menuItems.covenant.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="block w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-[#DC143C]/10 rounded-md transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Свобода */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "freedom" ? null : "freedom"
                  )
                }
                className="flex items-center justify-between w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#DC143C]/20 hover:text-white rounded-md transition-all duration-200"
              >
                <span>Свобода</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "freedom" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === "freedom"
                    ? "max-h-[245px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 space-y-0.5">
                  {menuItems.freedom.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="block w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-[#DC143C]/10 rounded-md transition-all duration-200"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Контакты и Пожертвования в мобильном меню */}
            <a
              href="/contacts"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-3 py-2 text-sm bg-[#DC143C]/20 text-white hover:bg-[#DC143C]/30 rounded-md transition-all duration-200 font-medium"
            >
              Контакты
            </a>
            {/* TODO: Раскомментировать когда добавим пожертвования */}
            {/* <button
              onClick={() => {
                window.location.href = '/donations';
              }}
              data-donation-link
              className="block w-full text-left px-4 py-3 bg-[#DC143C]/20 text-white hover:bg-[#DC143C]/30 rounded-md transition-all duration-200 font-medium"
            >
              Пожертвования
            </button> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
