"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { Project } from "@/lib/projects.server";
import type { Locale } from "@/i18n";
import { FeaturedProjectCard } from "./FeaturedProjectCard";

interface FeaturedProjectsCarouselProps {
  projects: Project[];
  locale: Locale;
}

export function FeaturedProjectsCarousel({ projects, locale }: FeaturedProjectsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // The "active" index for visual transforms: hover takes priority
  const activeIndex = hoveredIndex ?? selectedIndex;

  // Small internal padding for the track
  const SNAP_OFFSET = 8; // px-2 = 8px

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track scroll to determine selected index (leftmost visible card)
  const updateSelectedIndex = useCallback(() => {
    if (!viewportRef.current) return;
    
    const viewport = viewportRef.current;
    const scrollLeft = viewport.scrollLeft;
    
    // Find which slide is closest to the left edge
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const slideLeft = slide.offsetLeft - SNAP_OFFSET;
      const distance = Math.abs(slideLeft - scrollLeft);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    setSelectedIndex(closestIndex);
  }, []);

  // Setup observers and listeners
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // Scroll listener
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateSelectedIndex);
    };
    viewport.addEventListener("scroll", handleScroll, { passive: true });

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      updateSelectedIndex();
    });
    resizeObserver.observe(viewport);

    // Initial selected index
    updateSelectedIndex();

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [updateSelectedIndex]);

  // Scroll to position a specific slide at the left edge
  const scrollToIndex = useCallback((index: number) => {
    if (!viewportRef.current || !slideRefs.current[index]) return;
    
    const slide = slideRefs.current[index];
    if (!slide) return;

    // Scroll so slide's left edge aligns with the start
    const scrollTarget = slide.offsetLeft - SNAP_OFFSET;

    viewportRef.current.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: isReducedMotion ? "auto" : "smooth",
    });
  }, [isReducedMotion]);

  // Navigation
  const goToPrev = useCallback(() => {
    scrollToIndex(Math.max(0, selectedIndex - 1));
  }, [selectedIndex, scrollToIndex]);

  const goToNext = useCallback(() => {
    scrollToIndex(Math.min(projects.length - 1, selectedIndex + 1));
  }, [selectedIndex, projects.length, scrollToIndex]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToPrev, goToNext]);

  // Calculate transform styles based on distance from activeIndex
  const getSlideStyle = (index: number): React.CSSProperties => {
    const distance = index - activeIndex;
    const absDistance = Math.abs(distance);

    if (isReducedMotion) {
      return {
        opacity: absDistance === 0 ? 1 : Math.max(0.55, 1 - absDistance * 0.25),
        zIndex: 30 - absDistance * 10,
        transition: "opacity 0.2s ease-out",
      };
    }

    // Active: full size, no rotation
    // ±1: scale 0.96, rotateY ±6deg, opacity 0.75
    // ±2+: scale 0.92, rotateY ±10deg, opacity 0.55
    const scale = absDistance === 0 ? 1 : Math.max(0.9, 1 - absDistance * 0.05);
    const rotateY = distance * 6;
    const opacity = absDistance === 0 ? 1 : Math.max(0.5, 1 - absDistance * 0.25);
    const zIndex = 30 - absDistance * 10;

    return {
      transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
    };
  };

  return (
    <div className="relative mx-6 md:mx-8 overflow-clip rounded-xl">
      {/* Viewport */}
      <div
        ref={viewportRef}
        className="overflow-x-auto overflow-y-visible scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x proximity",
        }}
        role="region"
        aria-label="Featured projects carousel"
        tabIndex={0}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-4 py-4 px-2"
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              ref={(el) => { slideRefs.current[index] = el; }}
              className="flex-shrink-0"
              style={{
                width: "clamp(320px, 42vw, 520px)",
                scrollSnapAlign: "start",
                transformOrigin: "center center",
                willChange: "transform, opacity",
                ...getSlideStyle(index),
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => scrollToIndex(index)}
            >
              <FeaturedProjectCard project={project} locale={locale} />
            </div>
          ))}
          {/* End spacer - allows last card to scroll to start position */}
          <div className="flex-shrink-0 w-4" aria-hidden="true" />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4" role="tablist">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 ${
              index === selectedIndex
                ? "bg-zinc-900 dark:bg-zinc-100 w-6"
                : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 w-2"
            }`}
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Project ${index + 1}`}
          />
        ))}
      </div>

      <div className="md:hidden text-center mt-2 text-xs text-zinc-500">
        Swipe to explore →
      </div>
    </div>
  );
}
