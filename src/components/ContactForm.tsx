"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "./LanguageProvider";
import { t } from "@/i18n";

export function ContactForm() {
  const { locale } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      if (data.debugId) {
        console.log("Contact form debugId:", data.debugId);
      }

      const isSuccessResponse = response.ok && (data.ok === true || data.success === true);

      if (!isSuccessResponse) {
        const errorMessage = data.error || data.message || t("contact.error", locale);
        console.error("Contact form error:", errorMessage, "debugId:", data.debugId);
        throw new Error(errorMessage);
      }

      setError(null);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "", company: "" });
      return;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t("contact.error", locale);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    const email = "info@charlieautomates.co";
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 p-8 md:p-10">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("contact.received", locale)}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("contact.receivedMessage", locale)}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {t("contact.backToAboutLink", locale)}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          {t("contact.name", locale)}
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          {t("contact.email", locale)}
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          {t("contact.company", locale)} <span className="text-zinc-400 dark:text-zinc-600">{t("contact.companyOptional", locale)}</span>
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
          {t("contact.message", locale)}
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/50 resize-none"
        />
        <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-500">
          {t("contact.messageHelper", locale)}
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2.5 rounded-lg border border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t("contact.sending", locale) : t("contact.send", locale)}
      </button>

      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
          {t("contact.preferAsync", locale)}{" "}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
          >
            info@charlieautomates.co
          </button>{" "}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {emailCopied ? t("contact.copied", locale) : t("contact.copy", locale)}
          </button>
        </p>
      </div>
    </form>
  );
}
