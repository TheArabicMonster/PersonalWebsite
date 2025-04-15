import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Fonction pour obtenir les paramètres de l'URL
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    lang: params.get("lang"),
  };
}

// Fonction pour initialiser la langue en fonction des paramètres d'URL ou localStorage
const initializeLanguage = () => {
  const { lang } = getUrlParams();
  
  // Si un paramètre de langue est présent dans l'URL, on l'utilise et on le sauvegarde
  if (lang === "en" || lang === "fr" || lang === "ar") {
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    // Nettoyer l'URL après avoir utilisé le paramètre
    if (window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.delete("lang");
      window.history.replaceState({}, document.title, url.toString());
    }
  }
  
  // Sinon on utilise la langue sauvegardée ou l'anglais par défaut
  else {
    const savedLang = localStorage.getItem("language");
    if (savedLang === "en" || savedLang === "fr" || savedLang === "ar") {
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
      localStorage.setItem("language", "en");
    }
  }
};

// Initialize theme from localStorage or system preference before React loads
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.style.colorScheme = "dark";
  } else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.style.colorScheme = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
    localStorage.setItem("theme", "light");
  }
};

// Initialisation avant le rendu de React
initializeLanguage();
initializeTheme();

// Root component that applies theme on mount
const Root = () => {
  useEffect(() => {
    // Re-apply theme after hydration to ensure consistency
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Ensure we have a root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<Root />);
