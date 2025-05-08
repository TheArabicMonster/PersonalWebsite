import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { useToast } from "../hooks/use-toast";

export default function DirectLanguageSwitcher({ isMobile = false }) {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  // Définition des langues disponibles avec leurs drapeaux
  const languages = [
    { code: "en" as Language, label: "English", flag: "🇬🇧" },
    { code: "fr" as Language, label: "Français", flag: "🇫🇷" },
    { code: "ar" as Language, label: "العربية", flag: "🇸🇦" },
  ];

  // Fonction de changement de langue
  const handleLanguageChange = (langCode: Language) => {
    if (langCode !== language) {
      setLanguage(langCode);
      
      // Afficher un toast pour confirmer le changement
      const langInfo = languages.find(l => l.code === langCode);
      if (langInfo) {
        toast({
          title: langInfo.flag,
          description: t(`language.changed.${langCode}`),
          duration: 2000,
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
            onClick={() => handleLanguageChange(lang.code)}
            className="min-w-[60px]"
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }
  
  // Affichage standard
  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => handleLanguageChange(lang.code)}
          className="flex items-center space-x-1"
        >
          <span>{lang.flag}</span>
          <span>{lang.code.toUpperCase()}</span>
        </Button>
      ))}
    </div>
  );
}