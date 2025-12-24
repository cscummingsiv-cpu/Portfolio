import { Shell } from "@/components/Shell";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Shell>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
<p className="mt-2 text-zinc-600 dark:text-zinc-400">
  A selection of systems, automations, and product work I’ve shipped.
</p>
      </div>

      <div className="grid gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Shell>
  );
}
