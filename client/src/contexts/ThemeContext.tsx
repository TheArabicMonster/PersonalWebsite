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
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme as Theme;
    }
    
    // Then check user's system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
    
    // Default to light
    return "light";
  });

  // Apply theme to document and localStorage
  useEffect(() => {
    // Set theme on document element
    document.documentElement.setAttribute("data-theme", theme);
    
    // Add appropriate class for Tailwind
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Store in localStorage
    localStorage.setItem("theme", theme);
    
    console.log(`Theme set to: ${theme}`);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
