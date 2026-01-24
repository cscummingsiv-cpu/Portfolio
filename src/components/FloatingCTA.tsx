"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const ctaContent = (
    <div
      ref={menuRef}
      className="fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 z-[9999] pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {isOpen && (
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[240px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-950 dark:to-zinc-900 shadow-xl dark:shadow-zinc-900/70 ring-1 ring-white/10 dark:ring-white/5 p-3 space-y-2 pointer-events-auto">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full px-5 py-3.5 rounded-xl text-base font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-150 ease-out text-left"
          >
            Contact Me
          </Link>
          <a
            href="https://www.linkedin.com/in/charlie-cummings-6a7a6a6a/"
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setIsOpen(false)}
            className="block w-full px-5 py-3.5 rounded-xl text-base font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-150 ease-out text-left"
          >
            Connect on LinkedIn
          </a>
        </div>
      )}
      
      <div className="relative pointer-events-auto">
        {/* Ambient halo - pulses with breathing animation */}
        <div className={`absolute inset-0 -z-10 rounded-full blur-3xl bg-zinc-400/30 dark:bg-white/15 ${
          !isOpen ? "animate-ctaHalo" : ""
        }`} />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative rounded-full border-2 border-zinc-400/60 dark:border-zinc-600/60 bg-gradient-to-b from-white via-white to-zinc-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.1)] ring-2 ring-black/5 dark:ring-white/10 px-12 md:px-14 py-5 h-[88px] text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_28px_70px_-16px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_28px_70px_-16px_rgba(0,0,0,0.95),0_0_55px_rgba(255,255,255,0.15)] hover:ring-black/10 dark:hover:ring-white/15 hover:text-zinc-950 dark:hover:text-zinc-100 active:translate-y-[1px] active:scale-[1.01] active:shadow-[0_18px_45px_-12px_rgba(0,0,0,0.2)] dark:active:shadow-[0_18px_45px_-12px_rgba(0,0,0,0.75),0_0_35px_rgba(255,255,255,0.08)] transition-all duration-300 ease-in-out ${
            !isOpen ? "animate-ctaBreathe" : ""
          }`}
        >
          {/* Inner highlight sheen */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent dark:from-white/10 dark:via-white/0 pointer-events-none" />
          
          <span className="relative z-10 flex items-center gap-2">
            Automate With Me
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );

  return createPortal(ctaContent, document.body);
}
