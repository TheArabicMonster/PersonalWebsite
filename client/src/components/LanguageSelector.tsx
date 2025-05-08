import { useState, useEffect } from "react";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface LanguageSelectorProps {
  isMobile?: boolean;
}

export default function LanguageSelector({ isMobile = false }: LanguageSelectorProps) {
  // Utilisez useState pour suivre la langue actuelle dans le composant
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Synchroniser l'état local avec le contexte
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  const displayLanguage = currentLanguage.toUpperCase();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  // Fonction pour appliquer directement le changement de langue
  const applyLanguage = (lang: Language) => {
    // Mettre à jour le document
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    
    // Sauvegarder dans localStorage
    localStorage.setItem("language", lang);
  };

  const handleSelect = (lang: Language) => {
    if (lang !== currentLanguage) {
      // Mettre à jour l'état local
      setCurrentLanguage(lang);
      
      // Appliquer les changements directement
      applyLanguage(lang);
      
      // Mettre à jour le contexte
      setLanguage(lang);
      
      // Fermer le menu dropdown
      setIsOpen(false);
      
      // Préparer le toast
      const langInfo = languages.find(l => l.code === lang);
      if (langInfo) {
        // Utiliser la fonction de traduction pour les messages
        toast({
          title: langInfo.flag,
          description: t(`language.changed.${lang}`),
          duration: 2000,
        });
      }
    }
  };

  // Affichage mobile avec trois boutons côte à côte
  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => handleSelect(lang.code)}
            className={`${currentLanguage === lang.code ? "bg-primary" : ""} min-w-[60px]`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }

  // Affichage normal avec menu déroulant
  const currentLang = getCurrentLanguageInfo();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-1 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
        >
          <Globe className="h-4 w-4 mr-1" />
          <span>{currentLang.flag} {displayLanguage}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`cursor-pointer flex items-center ${currentLanguage === lang.code ? 'bg-primary/10 text-primary font-medium' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
