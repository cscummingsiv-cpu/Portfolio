"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const effectiveTheme = useMemo(
    () => (theme === "system" ? resolvedTheme : theme),
    [theme, resolvedTheme]
  );

  if (!mounted || !effectiveTheme) return null;

  const isDark = effectiveTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
