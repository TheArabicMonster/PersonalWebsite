import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function MobileLanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-language-dropdown") && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Languages with flags
  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  // Function that creates a link with language parameter
  const createLanguageLink = (langCode: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", langCode);
    return url.toString();
  };

  // Find current language
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <div className="mobile-language-dropdown relative z-50">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center space-x-1 relative z-50"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <Globe className="h-4 w-4 mr-1" />
        <span>{currentLanguage.flag}</span>
        <span className="uppercase">{language}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-1 bg-background shadow-lg rounded-md border border-border p-1 w-36"
          >
            <div className="flex justify-between items-center p-1 border-b border-border">
              <span className="text-xs font-medium text-muted-foreground">
                {language === "fr" ? "Langue" : language === "ar" ? "اللغة" : "Language"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex flex-col p-1 space-y-1 pt-2">
              {languages.map((lang) => (
                <a
                  key={lang.code}
                  href={createLanguageLink(lang.code)}
                  className={`flex items-center space-x-2 p-2 rounded-sm no-underline transition-colors ${
                    lang.code === language
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-sm">{lang.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}