import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Fonction pour obtenir les paramètres de l'URL
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    lang: params.get("lang"),
  };
}

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
          <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Ensure we have a root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<Root />);
