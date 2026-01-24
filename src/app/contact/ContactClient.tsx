"use client";

import { ContactForm } from "@/components/ContactForm";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";
import { t } from "@/i18n";

export function ContactClient() {
  const { locale } = useI18n();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link
          href="/about"
          className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
        >
          {t("contact.backToAbout", locale)}
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t("contact.title", locale)}
        </h1>
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
          {t("contact.subtitle", locale)}
        </p>
      </div>

      <div className="relative rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-100/30 dark:bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative p-8 md:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
