import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md shadow-lg border-b border-red-900/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center hover:opacity-80 transition-opacity"
              aria-label="На главную"
            >
              <img
                src={logo}
                alt="Кровь и вода"
                className="h-12 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-300 hover:text-[#DC143C] transition-colors"
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection("materials")}
              className="text-gray-300 hover:text-[#DC143C] transition-colors"
            >
              Материалы
            </button>
            <button
              onClick={() => scrollToSection("donations")}
              className="text-gray-300 hover:text-[#DC143C] transition-colors"
            >
              Пожертвования
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-[#DC143C] transition-colors"
            >
              Контакты
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-800"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#DC143C]" />
            ) : (
              <Menu className="h-6 w-6 text-[#DC143C]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection("materials")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
            >
              Материалы
            </button>
            <button
              onClick={() => scrollToSection("donations")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
            >
              Пожертвования
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
            >
              Контакты
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
