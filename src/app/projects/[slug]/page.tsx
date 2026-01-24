import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getAllProjects, getProjectBySlug } from "@/lib/projects.server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArchitectureCard } from "@/components/ArchitectureCard";
import { InfrastructurePhases } from "@/components/InfrastructurePhases";
import { GenAIPhases } from "@/components/GenAIPhases";
import { SlackAlertPhases } from "@/components/SlackAlertPhases";
import { EditorialPhases } from "@/components/EditorialPhases";
import { SalesCallPhases } from "@/components/SalesCallPhases";
import { CategoryLabel } from "@/components/CategoryLabel";
import { mdxComponents } from "@/lib/mdxcomponents";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/i18n";

export function generateStaticParams() {
  return getAllProjects("en").map((p) => ({ slug: p.slug }));
}

// Helper to parse MDX content into sections
function parseMDXContent(content: string) {
  const sections: Record<string, string> = {};
  const lines = content.split("\n");
  let currentSection: string | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentSection) {
        sections[currentSection] = currentContent.join("\n").trim();
      }
      currentSection = line.replace("## ", "").toLowerCase();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    sections[currentSection] = currentContent.join("\n").trim();
  }

  return sections;
}

// Extract metrics from Outcome text - each metric appears ONCE
function extractMetrics(outcome: string): Array<{ label: string; value: string }> {
  const metrics: Array<{ label: string; value: string }> = [];
  
  // Output multiplier (2x, 3x)
  const multiplierMatch = outcome.match(/(\d+x)\s*(output|throughput|production)/i);
  const doubledMatch = outcome.match(/(output|production)\s*doubled/i) || outcome.match(/doubled/i);
  if (multiplierMatch) {
    metrics.push({ label: "Output", value: multiplierMatch[1] });
  } else if (doubledMatch) {
    metrics.push({ label: "Output", value: "2x" });
  }
  
  // Revenue impact ($20M+)
  const revenueMatch = outcome.match(/(\$\d+M\+?)/i);
  if (revenueMatch && metrics.length < 2) {
    metrics.push({ label: "Revenue Impact", value: revenueMatch[1] });
  }
  
  // Time saved (50+ hours/week)
  const hoursMatch = outcome.match(/(\d+\+?)\s*hours?(?:\/week| per week| weekly)/i);
  if (hoursMatch && metrics.length < 2) {
    metrics.push({ label: "Time Saved", value: `${hoursMatch[1]} hrs/week` });
  }
  
  // Speed improvement (24-48h → instant)
  const speedMatch = outcome.match(/(\d+[–-]\d+\s*h(?:ours?)?)\s*(?:→|to)\s*instant/i);
  if (speedMatch && metrics.length < 2) {
    metrics.push({ label: "Speed", value: `${speedMatch[1]} → instant` });
  }
  
  // Cost savings ($5K/month)
  const costMatch = outcome.match(/(\$[\d,]+K?)(?:\/month| monthly)/i);
  if (costMatch && metrics.length < 2) {
    metrics.push({ label: "Cost Saved", value: `${costMatch[1]}/mo` });
  }
  
  return metrics.slice(0, 2); // Max 2 metrics
}

// Extract a bold headline from the start of outcome text (e.g., "**Headline Text.**")
function extractOutcomeHeadline(outcome: string): { headline: string | null; body: string } {
  // Match bold text at the very start: **Some headline text.**
  const headlineMatch = outcome.match(/^\*\*([^*]+)\*\*\s*/);
  if (headlineMatch) {
    const headline = headlineMatch[1].trim();
    const body = outcome.slice(headlineMatch[0].length).trim();
    return { headline, body };
  }
  return { headline: null, body: outcome };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();

  const project = getProjectBySlug(slug, locale);
  if (!project) return notFound();

  const fm = project.frontmatter;
  const sections = parseMDXContent(project.content);
  const metrics = sections.outcome ? extractMetrics(sections.outcome) : [];
  const outcomeHeadline = sections.outcome ? extractOutcomeHeadline(sections.outcome) : { headline: null, body: "" };
  
  // Determine which phases component to use
  const PhasesComponent = 
    slug === "genai-text-to-sql-agent" 
      ? GenAIPhases 
      : slug === "automated-slack-alerting-reporting"
      ? SlackAlertPhases
      : slug === "editorial-automation-platform"
      ? EditorialPhases
      : slug === "sales-call-intelligence"
      ? SalesCallPhases
      : InfrastructurePhases;
  
  return (
    <Shell>
      <article className="prose prose-zinc max-w-none">
        {/* 1. PROJECT IDENTITY + CATEGORY */}
        <section className="mb-10">
          {/* Category label */}
          {fm.category && (
            <div className="not-prose mb-4">
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full border border-zinc-300/50 dark:border-zinc-600/50 bg-zinc-50/50 dark:bg-zinc-800/50">
                <CategoryLabel category={fm.category} />
              </span>
            </div>
          )}
          
          {/* Project title - glow applied directly to text via text-shadow */}
          <h1 className="header-glow mb-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {fm.title}
          </h1>
          
          <p className="mt-0 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            {fm.description}
          </p>

          <div className="not-prose mt-5 flex flex-wrap gap-2">
            {fm.stack?.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 2. PROBLEM / SOLUTION (concise, above the fold) */}
        {(sections.problem || sections.approach) && (
          <section className="not-prose my-12 grid gap-10 md:grid-cols-2">
            {sections.problem && (
              <div className="max-w-lg">
                <h2 className="label-glow mb-4 text-xs font-semibold tracking-widest uppercase">
                  {t("projects.problem", locale)}
                </h2>
                <div className="prose prose-zinc max-w-none text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
                  <MDXRemote source={sections.problem} components={mdxComponents} />
                </div>
              </div>
            )}
            {sections.approach && (
              <div className="max-w-lg">
                <h2 className="label-glow mb-4 text-xs font-semibold tracking-widest uppercase">
                  {t("projects.solution", locale)}
                </h2>
                <div className="prose prose-zinc max-w-none text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
                  <MDXRemote source={sections.approach} components={mdxComponents} />
                </div>
              </div>
            )}
          </section>
        )}

        {/* 3. OUTCOME (primary emphasis, visually dominant) */}
        {sections.outcome && (
          <section className="not-prose my-14">
            <div className="relative rounded-2xl border-2 border-zinc-900 dark:border-zinc-100 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-8 md:p-12 overflow-hidden">
              {/* Top-left directional lighting - very subtle */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(120,160,255,0.04)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(120,160,255,0.08)_0%,_transparent_60%)] pointer-events-none" />
              
              <h2 className="label-glow relative mb-6 text-xs font-semibold tracking-widest uppercase text-center">
                {t("projects.outcome", locale)}
              </h2>
              
              {/* Metrics - large, centered, with glow */}
              {metrics.length > 0 && (
                <div className="relative flex flex-wrap justify-center gap-16 md:gap-24 mb-8">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="metric-glow text-5xl md:text-6xl font-bold tracking-tight">
                        {metric.value}
                      </div>
                      <div className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Headline (when no numeric metrics but has bold headline) */}
              {metrics.length === 0 && outcomeHeadline.headline && (
                <div className="relative text-center mb-8">
                  <div className="metric-glow text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight whitespace-nowrap">
                    {outcomeHeadline.headline}
                  </div>
                </div>
              )}
              
              {/* Outcome statement */}
              <div className="relative prose prose-zinc max-w-none text-zinc-600 dark:text-zinc-400 text-center max-w-2xl mx-auto text-[15px] leading-relaxed">
                <MDXRemote 
                  source={metrics.length === 0 && outcomeHeadline.headline ? outcomeHeadline.body : sections.outcome} 
                  components={mdxComponents} 
                />
              </div>
            </div>
          </section>
        )}

        {/* 4. SYSTEM ARCHITECTURE (high-level, non-generic) */}
        <section className="not-prose my-14">
          <h2 className="label-glow mb-8 text-xs font-semibold tracking-widest uppercase">
            System Architecture
          </h2>
          
          <div className="mb-6">
            <PhasesComponent />
          </div>

          <ArchitectureCard />
        </section>
      </article>
    </Shell>
  );
}
