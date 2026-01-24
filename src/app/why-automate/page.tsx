"use client";

import { Shell } from "@/components/Shell";
import { GtmSignalPanel } from "@/components/GtmSignalPanel";
import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";
import { t } from "@/i18n";

export default function WhyAutomatePage() {
  const { locale } = useI18n();

  return (
    <Shell>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="mb-8">
          <Link
            href="/about"
            className="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
          >
            {t("whyAutomate.backToAbout", locale)}
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("whyAutomate.title", locale)}
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            {t("whyAutomate.subtitle", locale)}
          </p>
        </div>

        <GtmSignalPanel />
      </div>
    </Shell>
  );
}
