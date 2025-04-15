import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define theme type
export type Theme = "light" | "dark";

// Define context type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create default context
const defaultContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Get initial theme with error handling
  const getInitialTheme = (): Theme => {
    try {
      // Check for saved theme preference or use system preference
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme as Theme;
      }
      
      // Use system preference as fallback
      return window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light";
    } catch (error) {
      console.error("Error determining initial theme:", error);
      return "light";
    }
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  // Apply theme immediately on mount
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, []);

  useEffect(() => {
    try {
      // Apply theme to html element
      const html = document.documentElement;
      
      // Remove both classes first to ensure clean state
      html.classList.remove("light", "dark");
      // Add the current theme class
      html.classList.add(theme);
      
      // Save theme preference
      localStorage.setItem("theme", theme);
      
      // Apply theme to the theme tag for Shadcn components
      document.documentElement.setAttribute("data-theme", theme);
      
      console.log(`Theme switched to: ${theme}`);
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log("Toggle theme called, current theme:", theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log("Setting new theme to:", newTheme);
      return newTheme;
    });
  };

  const contextValue = { 
    theme, 
    toggleTheme 
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
