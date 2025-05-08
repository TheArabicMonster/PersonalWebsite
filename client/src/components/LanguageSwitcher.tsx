import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useLanguage, type Language } from "../contexts/LanguageContext";

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  // Utiliser le contexte de langue
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  // Définition des langues disponibles
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  // Gérer la sélection d'une langue
  const handleSelectLanguage = (lang: Language) => {
    if (lang !== language) {
      try {
        // 1. Appliquer le changement directement pour les attributs DOM
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        localStorage.setItem("language", lang);
      
        // 2. Changer le contexte React
        setLanguage(lang);
        
        // 3. Afficher le toast avec la fonction t() pour une traduction cohérente
        const langInfo = languages.find(l => l.code === lang);
        if (langInfo) {
          toast({
            title: langInfo.flag,
            description: t(`language.changed.${lang}`),
            duration: 2000,
          });
        }
        
        // Plus de rechargement de page
      } catch (error) {
        console.error("Error changing language:", error);
        toast({
          title: "Error",
          description: "Failed to change language. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Affichage pour mobile : boutons côte à côte
  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => handleSelectLanguage(lang.code)}
            className={`${language === lang.code ? "bg-primary" : ""} min-w-[60px]`}
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
          variant={language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => handleSelectLanguage(lang.code)}
          className={`${
            language === lang.code ? "bg-primary" : ""
          } flex items-center space-x-1`}
        >
          <span>{lang.flag}</span>
          <span>{lang.code.toUpperCase()}</span>
        </Button>
      ))}
    </div>
  );
}