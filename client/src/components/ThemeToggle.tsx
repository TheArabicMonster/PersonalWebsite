import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useTheme } from "../contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggleTheme = () => {
    toggleTheme();
    
    // Message en français
    const newTheme = theme === "light" ? "dark" : "light";
    const message = newTheme === "dark" ? "Thème sombre activé" : "Thème clair activé";
    
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
      aria-label="Changer de thème"
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
