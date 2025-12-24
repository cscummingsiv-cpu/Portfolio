import { Shell } from "@/components/Shell";
import Image from "next/image";
import Link from "next/link";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function AboutPage() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.frontmatter.featured).slice(0, 3);
  const allFeatured = projects.filter((p) => p.frontmatter.featured);

  return (
    <Shell>
      <div className="space-y-12">
        {/* HERO SECTION */}
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="space-y-3">
            {/* Hero Headline */}
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Hi, I'm Charlie.
            </h1>

            {/* Subhead */}
            <p className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 pt-1">
              I turn messy ops into reliable growth engines.
            </p>

            {/* Tooling Line */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 pt-1">
              Automation · AI Workflows · Data & GTM Ops
            </p>

            {/* Impact Metrics Row */}
            <div className="relative pt-2 pb-2 border-t border-zinc-200/50 dark:border-zinc-800/50 mt-2">
              <div className="flex flex-wrap gap-8 items-baseline">
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    200+ hours/week
                  </div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    saved
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    $20,000/month
                  </div>
                  <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    in measurable ROI
                  </div>
                </div>
              </div>
            </div>

            {/* Descriptive Paragraph - directly below metrics */}
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 pt-3">
              I turn complex operational challenges into scalable automation systems. By combining n8n orchestration, AI-powered workflows, and custom integrations, I move from concept → prototype → production system quickly, with a focus on measurable outcomes and team adoption.
            </p>
          </div>

          {/* PHOTO CARD */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
              <div className="group relative overflow-hidden rounded-2xl">
                {/* B/W base */}
                <Image
                  src="/headshot-bw.jpeg"
                  alt="Charlie Cummings"
                  width={900}
                  height={1100}
                  className="h-auto w-full object-cover"
                  priority
                />

                {/* Color on hover */}
                <Image
                  src="/headshot-color.jpeg"
                  alt=""
                  width={900}
                  height={1100}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 space-y-3 px-1">
                <div>
                  <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Charlie Cummings
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Automation & AI Operator
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Brooklyn / NYC</p>
                  <Link
                    href="mailto:you@domain.com"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
                  >
                    Get in touch →
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* FEATURED PROJECTS */}
        {featured.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-semibold tracking-tight">
              Featured Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <FeaturedProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* SELECTED WORK */}
        {allFeatured.length > 0 && (
          <section>
            <div className="mb-5 flex items-end justify-between">
              <h2 className="text-xl font-semibold tracking-tight">
                Selected work
              </h2>

              <Link
                href="/projects"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline"
              >
                All projects →
              </Link>
            </div>

            <div className="grid gap-4">
              {allFeatured.slice(0, 5).map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
}
