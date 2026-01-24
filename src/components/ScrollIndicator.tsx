"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./LanguageProvider";
import { t } from "@/i18n";

export function ScrollIndicator({ targetId }: { targetId: string }) {
  const { locale } = useI18n();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById(targetId);
      if (target) {
        const rect = target.getBoundingClientRect();
        setIsVisible(rect.top > window.innerHeight * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetId]);

  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center gap-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-500/30 rounded-lg px-6 py-4"
      aria-label="Scroll to featured projects"
    >
      {/* Animated underline on hover */}
      <span className="relative text-xl font-bold tracking-wide transition-all duration-500 ease-out group-hover:-translate-y-[3px]">
        <span className="relative z-10 text-white dark:text-zinc-50" style={{
          textShadow: `
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(255, 255, 255, 0.6),
            0 0 30px rgba(255, 255, 255, 0.4),
            0 0 40px rgba(255, 255, 255, 0.2),
            0 2px 4px rgba(0, 0, 0, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.2)
          `
        }}>
          {t("about.scrollIndicator", locale)}
        </span>
        {/* 3D glow layers behind text */}
        <span 
          className="absolute inset-0 z-0 text-white dark:text-zinc-50 blur-[2px] opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
          aria-hidden="true"
          style={{
            textShadow: `
              0 0 15px rgba(255, 255, 255, 0.9),
              0 0 30px rgba(255, 255, 255, 0.7),
              0 0 45px rgba(255, 255, 255, 0.5)
            `
          }}
        >
          {t("about.scrollIndicator", locale)}
        </span>
        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-400 dark:from-zinc-500 dark:via-zinc-400 dark:to-zinc-500 group-hover:w-full transition-all duration-700 ease-out" />
      </span>
      
      <div className="flex flex-col items-center">
        <svg className="w-7 h-7 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 group-hover:opacity-90 transition-all duration-500 ease-out animate-arrowFloat" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <svg className="w-7 h-7 -mt-2 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 group-hover:opacity-90 transition-all duration-500 ease-out animate-arrowFloat" style={{ animationDelay: "0.2s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </button>
  );
}
