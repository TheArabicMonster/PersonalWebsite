import { useTheme } from "../contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from "../contexts/LanguageContext";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleToggleTheme = () => {
    toggleTheme();
    
    // Show toast to confirm theme change
    const newTheme = theme === "light" ? "dark" : "light";
    let message = "";
    
    if (language === "fr") {
      message = newTheme === "dark" ? "Thème sombre activé" : "Thème clair activé";
    } else if (language === "ar") {
      message = newTheme === "dark" ? "تم تفعيل الوضع الداكن" : "تم تفعيل الوضع الفاتح";
    } else {
      message = newTheme === "dark" ? "Dark theme enabled" : "Light theme enabled";
    }
    
    toast({
      title: newTheme === "dark" ? "🌙" : "☀️",
      description: message,
      duration: 2000,
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={handleToggleTheme}
      className={`${className} transition-all duration-200 hover:bg-primary/10 hover:text-primary`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
