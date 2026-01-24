"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export function AboutFloatingCTA() {
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
      className="fixed left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 z-[9999] pointer-events-none"
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
        {/* Glow halo */}
        <div className="absolute inset-0 -z-10 rounded-full blur-2xl bg-white/20 dark:bg-white/10 animate-ctaGlow" />
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative rounded-full border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white via-white to-zinc-50 dark:from-zinc-900/70 dark:via-zinc-900/70 dark:to-zinc-950 shadow-2xl dark:shadow-zinc-900/90 ring-1 ring-white/15 dark:ring-white/15 px-10 md:px-12 py-4 h-[76px] text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:-translate-y-[2px] hover:shadow-2xl hover:ring-white/25 dark:hover:ring-white/20 hover:text-zinc-950 dark:hover:text-zinc-100 active:translate-y-[1px] active:shadow-xl dark:active:shadow-zinc-900/60 transition-all duration-150 ease-out ${
            !isOpen ? "animate-ctaBreathe" : ""
          }`}
        >
          <span className="relative z-10">Automate With Me</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/12 to-white/0 pointer-events-none" />
        </button>
      </div>
    </div>
  );

  return createPortal(ctaContent, document.body);
}
