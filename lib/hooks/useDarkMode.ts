import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Check localStorage first, then system preference
      const saved = localStorage.getItem("dark-mode");
      let initialDarkMode = false;

      if (saved !== null) {
        initialDarkMode = JSON.parse(saved);
      } else {
        initialDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      }

      setIsDarkMode(initialDarkMode);
      setIsInitialized(true);

      // Apply initial dark mode class
      if (initialDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    // Only apply changes after initialization
    if (isInitialized && typeof window !== "undefined") {
      // Save to localStorage
      localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));

      // Apply dark mode class to document
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode, isInitialized]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    isInitialized,
  };
}
