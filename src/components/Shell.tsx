"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useI18n } from "./LanguageProvider";
import { t, tWithParams } from "@/i18n";
import { FloatingCTA } from "./FloatingCTA";

export function Shell({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  const pathname = usePathname();
  
  // Show CTA on /, /about, and /projects/*, hide on /contact
  const showCTA = pathname === "/" || pathname === "/about" || pathname?.startsWith("/projects");

  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-black/70">
        <div className="mx-auto flex max-w-7xl xl:max-w-[1400px] items-center justify-between px-8 xl:px-12 py-4">
          <Link href="/" className="font-medium tracking-tight">
            {t("nav.home", locale)}
          </Link>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-5 text-sm text-zinc-600 dark:text-zinc-300">
              <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                {t("nav.about", locale)}
              </Link>
              <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                {t("nav.projects", locale)}
              </Link>
            </nav>

            <LanguageSelect />
            {/* ThemeToggle hidden - dark mode enforced. Uncomment to re-enable. */}
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl xl:max-w-[1400px] px-8 xl:px-12 py-12">{children}</main>

      <footer className="border-t border-zinc-200/60 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
          <span>{tWithParams("footer.copyright", { year: new Date().getFullYear() }, locale)}</span>
        </div>
      </footer>

      {showCTA && <FloatingCTA />}
    </div>
  );
}
