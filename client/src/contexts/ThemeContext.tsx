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
        return savedTheme;
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

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    try {
      // Apply theme to html element
      const html = document.documentElement;
      
      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      
      // Save theme preference
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
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
  // This should no longer throw an error since we provided default values
  return context;
}
