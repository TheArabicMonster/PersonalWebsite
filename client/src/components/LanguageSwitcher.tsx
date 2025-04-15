import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useToast } from "../hooks/use-toast";

// Types
type Language = "en" | "fr" | "ar";

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  // État local pour suivre la langue actuelle
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const { toast } = useToast();

  // Charger la langue initiale au montage
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang === "en" || savedLang === "fr" || savedLang === "ar") {
      setCurrentLang(savedLang as Language);
    }
  }, []);

  // Définition des langues disponibles
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  // Fonction pour appliquer le changement de langue
  const applyLanguage = (lang: Language) => {
    // 1. Mettre à jour l'état local
    setCurrentLang(lang);
    
    // 2. Sauvegarder dans localStorage
    localStorage.setItem("language", lang);
    
    // 3. Appliquer le changement au document
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    // 4. Forcer le rechargement de la page pour appliquer toutes les traductions
    window.location.reload();
  };

  // Gérer la sélection d'une langue
  const handleSelectLanguage = (lang: Language) => {
    if (lang !== currentLang) {
      // Préparer le message du toast selon la langue sélectionnée
      let message = "";
      if (lang === "en") {
        message = "Language changed to English";
      } else if (lang === "fr") {
        message = "Langue changée en Français";
      } else if (lang === "ar") {
        message = "تم تغيير اللغة إلى العربية";
      }
      
      // Afficher le toast
      const langInfo = languages.find(l => l.code === lang);
      toast({
        title: langInfo?.flag || "",
        description: message,
        duration: 2000,
      });
      
      // Appliquer le changement de langue
      applyLanguage(lang);
    }
  };

  // Affichage pour mobile : boutons côte à côte
  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLang === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => handleSelectLanguage(lang.code)}
            className={`${currentLang === lang.code ? "bg-primary" : ""} min-w-[60px]`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }
  
  // Affichage standard : boutons côte à côte avec drapeau
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4" />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLang === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => handleSelectLanguage(lang.code)}
          className={`${
            currentLang === lang.code ? "bg-primary" : ""
          } flex items-center space-x-1`}
        >
          <span>{lang.flag}</span>
          <span>{lang.code.toUpperCase()}</span>
        </Button>
      ))}
    </div>
  );
}