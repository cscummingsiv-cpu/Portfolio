import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-black/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/about" className="font-medium tracking-tight">
            Charlie Cummings
          </Link>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-5 text-sm text-zinc-600 dark:text-zinc-300">
              <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                About
              </Link>
              <Link href="/projects" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                Projects
              </Link>
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>

      <footer className="border-t border-zinc-200/60 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
          <span>© {new Date().getFullYear()} Charlie Cummings</span>
        </div>
      </footer>
    </div>
  );
}
