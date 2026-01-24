import { en } from "./en";
import { ptBR } from "./pt-BR";
import { es } from "./es";

export type Locale = "en" | "pt-BR" | "es";

export const locales: Locale[] = ["en", "pt-BR", "es"];
export const defaultLocale: Locale = "en";

export const dictionaries = {
  en,
  "pt-BR": ptBR,
  es,
} as const;

// Helper function to get nested value from object
function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let value = obj;
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return "";
  }
  return typeof value === "string" ? value : "";
}

// Translation function
export function t(key: string, locale: Locale = defaultLocale): string {
  const dict = dictionaries[locale] || dictionaries[defaultLocale];
  const value = getNestedValue(dict, key);
  
  // Fallback to English if key not found
  if (!value && locale !== defaultLocale) {
    return getNestedValue(dictionaries[defaultLocale], key) || key;
  }
  
  return value || key;
}

// Replace placeholders in strings (e.g., {year} -> 2025)
export function tWithParams(key: string, params: Record<string, string | number>, locale: Locale = defaultLocale): string {
  let text = t(key, locale);
  for (const [param, value] of Object.entries(params)) {
    text = text.replace(`{${param}}`, String(value));
  }
  return text;
}
