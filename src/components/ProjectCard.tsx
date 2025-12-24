import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const fm = project.frontmatter;

  return (
    <div className="rounded-2xl border border-zinc-200 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-base font-semibold tracking-tight">
        <Link href={`/projects/${project.slug}`} className="hover:underline">
          {fm.title}
        </Link>
      </h3>
<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{fm.description}</p>
    </div>
  );
}


