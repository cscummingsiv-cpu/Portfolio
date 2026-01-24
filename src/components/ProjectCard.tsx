import Link from "next/link";
import type { Project } from "@/lib/projects.server";
import { CategoryLabel } from "./CategoryLabel";

export function ProjectCard({ project }: { project: Project }) {
  const fm = project.frontmatter;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block cursor-pointer"
      aria-label={`View project: ${fm.title}`}
    >
      <article className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm bg-white dark:bg-zinc-900/50 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:shadow-md dark:group-hover:shadow-zinc-900/50 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-zinc-500/50 group-focus-visible:ring-offset-2">
        {/* 3D depth effect - subtle inner highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Shine sweep effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-in-out pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {fm.title}
            </h3>
            {fm.category && (
              <span className="shrink-0 px-2.5 py-1 text-xs font-medium rounded-full border border-zinc-300/50 dark:border-zinc-600/50 bg-zinc-50/50 dark:bg-zinc-800/50">
                <CategoryLabel category={fm.category} />
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">{fm.description}</p>
        </div>
      </article>
    </Link>
  );
}


