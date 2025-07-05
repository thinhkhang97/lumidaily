"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    // This won't run during SSR
  }, []);

  // This script runs on the client before React hydration
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Check localStorage first
            const savedTheme = localStorage.getItem('dark-mode');
            let isDark = false;
            
            if (savedTheme !== null) {
              isDark = JSON.parse(savedTheme);
            } else {
              // Fall back to system preference
              isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            
            // Apply theme immediately
            if (isDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          })();
        `,
      }}
    />
  );
}
