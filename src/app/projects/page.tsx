import { Shell } from "@/components/Shell";
import { ProjectsPageClient } from "@/components/ProjectsPageClient";
import { getAllProjects } from "@/lib/projects.server";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/i18n";

export default async function ProjectsPage() {
  const locale = await getLocale();
  const projects = getAllProjects(locale);

  return (
    <Shell>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t("projects.title", locale)}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {t("projects.subtitle", locale)}
        </p>
      </div>

      <ProjectsPageClient projects={projects} />
    </Shell>
  );
}
