"use client";

import { useI18n } from "./LanguageProvider";
import type { Locale } from "@/i18n";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  "pt-BR": "PT-BR",
  es: "ES",
};

export function LanguageSelect() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="
          appearance-none
          bg-transparent
          border border-zinc-300 dark:border-zinc-700
          rounded-md
          px-3 py-1.5
          text-sm
          text-zinc-700 dark:text-zinc-300
          hover:border-zinc-400 dark:hover:border-zinc-600
          focus:outline-none focus:ring-2 focus:ring-zinc-500/50
          cursor-pointer
          transition-colors
        "
        aria-label="Select language"
      >
        {Object.entries(localeLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
