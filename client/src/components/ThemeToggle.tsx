import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from "../contexts/LanguageContext";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  // Determine initial theme
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const { toast } = useToast();
  const { language } = useLanguage();

  // Initialize theme on component mount
  useEffect(() => {
    // Check for localStorage theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setCurrentTheme(savedTheme as "light" | "dark");
      applyTheme(savedTheme as "light" | "dark");
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setCurrentTheme("dark");
      applyTheme("dark");
    }
  }, []);

  // Function to apply theme changes to the DOM
  const applyTheme = (theme: "light" | "dark") => {
    const htmlElement = document.documentElement;
    
    if (theme === "dark") {
      htmlElement.classList.add("dark");
      htmlElement.style.colorScheme = "dark";
      htmlElement.dataset.theme = "dark";
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.style.colorScheme = "light";
      htmlElement.dataset.theme = "light";
    }
    
    // Save in localStorage
    localStorage.setItem("theme", theme);
  };

  const handleToggleTheme = () => {
    // Toggle theme
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    applyTheme(newTheme);
    
    // Prepare toast message
    let message = "";
    
    if (language === "fr") {
      message = newTheme === "dark" ? "Thème sombre activé" : "Thème clair activé";
    } else if (language === "ar") {
      message = newTheme === "dark" ? "تم تفعيل الوضع الداكن" : "تم تفعيل الوضع الفاتح";
    } else {
      message = newTheme === "dark" ? "Dark theme enabled" : "Light theme enabled";
    }
    
    // Show toast notification
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
      {currentTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
