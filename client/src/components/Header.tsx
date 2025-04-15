import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { navItems } from "../lib/constants";
import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Get the correct label based on the current language
  const getNavLabel = (item: typeof navItems[0]) => {
    switch (language) {
      case "fr":
        return item.labelFr;
      case "ar":
        return item.labelAr;
      default:
        return item.label;
    }
  };

  return (
    <header
      className={`fixed w-full bg-background/90 backdrop-blur-sm z-50 transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold text-primary transition-all hover:text-secondary"
          >
            <span className="font-mono">Mateen</span>
          </a>

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                onClick={closeMenu}
              >
                {getNavLabel(item)}
              </a>
            ))}

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background shadow-md">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block py-2 font-medium text-foreground hover:text-primary transition-all"
                onClick={closeMenu}
              >
                {getNavLabel(item)}
              </a>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <LanguageSwitcher isMobile />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
