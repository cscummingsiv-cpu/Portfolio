"use client";

import React, { createContext, useContext, useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

// Provide a default context value to prevent errors during initial render
const defaultContextValue: LanguageContextType = {
  locale: "en",
  setLocale: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Initialize locale from cookie or localStorage
  useEffect(() => {
    setMounted(true);
    
    // Try to get from cookie first (for SSR compatibility)
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] as Locale | undefined;
    
    if (cookieLocale && ["en", "pt-BR", "es"].includes(cookieLocale)) {
      setLocaleState(cookieLocale);
      return;
    }
    
    // Fallback to localStorage
    const storedLocale = localStorage.getItem("locale") as Locale | null;
    if (storedLocale && ["en", "pt-BR", "es"].includes(storedLocale)) {
      setLocaleState(storedLocale);
      // Sync to cookie
      document.cookie = `locale=${storedLocale}; path=/; max-age=31536000`; // 1 year
      return;
    }
    
    // Default to 'en'
    setLocaleState("en");
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    
    // Set cookie with explicit SameSite and Secure attributes for better reliability
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`; // 1 year
    
    // Update html lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }

    // Use startTransition to ensure cookie is set before refresh
    startTransition(() => {
      // Small delay to ensure cookie is set before server reads it
      setTimeout(() => {
        router.refresh();
      }, 0);
    });
  };

  // Update html lang attribute when locale changes
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  // Always provide the context, even before mounted
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  // Context is always defined now (has default value), but we can still check for safety
  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return context;
}



