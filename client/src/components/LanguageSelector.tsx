import { useState } from "react";
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
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const displayLanguage = language.toUpperCase();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  const getCurrentLanguageInfo = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

  const handleSelect = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
      setIsOpen(false);
      
      const langInfo = languages.find(l => l.code === lang);
      if (langInfo) {
        // Show toast to confirm language change
        let message = "";
        if (lang === "en") {
          message = "Language changed to English";
        } else if (lang === "fr") {
          message = "Langue changée en Français";
        } else if (lang === "ar") {
          message = "تم تغيير اللغة إلى العربية";
        }
        
        toast({
          title: langInfo.flag,
          description: message,
          duration: 2000,
        });
      }
    }
  };

  if (isMobile) {
    return (
      <div className="flex space-x-3">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => handleSelect(lang.code)}
            className={language === lang.code ? "bg-primary" : ""}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }

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
      <DropdownMenuContent align="end" className="w-32">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`cursor-pointer flex items-center ${language === lang.code ? 'bg-primary/10 text-primary font-medium' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
