import { Button } from "@/components/ui/button";

export default function DirectLanguageSwitcher({ isMobile = false }) {
  // Définition des langues disponibles avec leurs drapeaux
  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  // Fonction qui crée un lien de redirection avec le paramètre de langue
  const createLanguageLink = (langCode: string) => {
    // Construire l'URL avec le paramètre de langue
    const url = new URL(window.location.href);
    url.searchParams.set("lang", langCode);
    return url.toString();
  };

  // Affichage pour mobile : boutons côte à côte
  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <a 
            key={lang.code}
            href={createLanguageLink(lang.code)}
            className="no-underline"
          >
            <Button
              variant="outline"
              size="sm"
              className="min-w-[60px]"
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.code.toUpperCase()}
            </Button>
          </a>
        ))}
      </div>
    );
  }
  
  // Affichage standard
  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <a 
          key={lang.code}
          href={createLanguageLink(lang.code)}
          className="no-underline"
        >
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1"
          >
            <span>{lang.flag}</span>
            <span>{lang.code.toUpperCase()}</span>
          </Button>
        </a>
      ))}
    </div>
  );
}