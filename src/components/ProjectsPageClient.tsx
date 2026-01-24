"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/lib/projects.server";
import { ProjectCard } from "./ProjectCard";
import { CategoryLabel, getCategoryAccentColor } from "./CategoryLabel";

const CATEGORIES = ["All", "Content Systems", "Revenue & GTM", "Decisioning", "Ops"] as const;
type Category = (typeof CATEGORIES)[number];

interface ProjectsPageClientProps {
  projects: Project[];
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  // Determine which categories actually have projects
  const categoriesWithProjects = useMemo(() => {
    const usedCategories = new Set(
      projects.map((p) => p.frontmatter.category).filter(Boolean)
    );
    return CATEGORIES.filter(
      (cat) => cat === "All" || usedCategories.has(cat)
    );
  }, [projects]);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.frontmatter.category === selectedCategory
    );
  }, [projects, selectedCategory]);

  return (
    <>
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categoriesWithProjects.map((category) => {
          const isActive = selectedCategory === category;
          const count = category === "All" 
            ? projects.length 
            : projects.filter((p) => p.frontmatter.category === category).length;
          const accentColor = category !== "All" ? getCategoryAccentColor(category) : undefined;
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                border border-zinc-300/50 dark:border-zinc-600/50
                transition-all duration-200 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/50 focus-visible:ring-offset-2
                ${isActive
                  ? "bg-zinc-100/50 dark:bg-zinc-800/50 border-zinc-400/60 dark:border-zinc-500/60"
                  : "bg-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 hover:border-zinc-400/50 dark:hover:border-zinc-500/50"
                }
              `}
              style={{
                boxShadow: isActive && accentColor
                  ? `0 0 20px ${accentColor}20, 0 0 10px ${accentColor}15`
                  : isActive
                  ? "0 0 12px rgba(161,161,170,0.2)"
                  : undefined,
              }}
            >
              {category === "All" ? (
                <span className={isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}>
                  All
                  <span className="ml-1.5 text-zinc-400 dark:text-zinc-500">
                    ({count})
                  </span>
                </span>
              ) : (
                <CategoryLabel category={category} />
              )}
            </button>
          );
        })}
      </div>

      {/* Project Cards */}
      <div className="grid gap-4 pb-32">
        {filteredProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        
        {filteredProjects.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
            No projects found in this category.
          </p>
        )}
      </div>
    </>
  );
}

