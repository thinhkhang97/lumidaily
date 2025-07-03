"use client";

import { createContext, useContext } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ThemeProviderContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
