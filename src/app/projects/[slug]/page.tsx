import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ReactNode } from "react";
import { ArchitectureCard } from "@/components/ArchitectureCard";
import { InfrastructurePhases } from "@/components/InfrastructurePhases";
import { GenAIPhases } from "@/components/GenAIPhases";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

// Helper to parse MDX content into sections
function parseMDXContent(content: string) {
  const sections: Record<string, string> = {};
  const lines = content.split("\n");
  let currentSection: string | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join("\n").trim();
      }
      // Start new section
      currentSection = line.replace("## ", "").toLowerCase();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join("\n").trim();
  }

  return sections;
}

// Extract metrics from Outcome text
function extractMetrics(outcome: string): Array<{ label: string; value: string }> {
  const metrics: Array<{ label: string; value: string }> = [];
  
  // Extract "24–48 hours to instant" or similar time reduction patterns
  const timeReductionMatch = outcome.match(/(\d+[–-]\d+\s*(?:hours?|hrs?)\s*to\s*instant|instant\s*insights?|0\s*(?:hours?|hrs?)\s*wait)/i);
  if (timeReductionMatch) {
    metrics.push({ label: "Reporting Lag", value: "24–48 hours → instant insights" });
  } else {
    // Fallback: Extract any hours pattern
    const hoursMatch = outcome.match(/(\d+\+?\s*(?:hours?|hrs?)\s*(?:per\s*)?(?:week|month|day)?)/i);
    if (hoursMatch) {
      metrics.push({ label: "Time Saved", value: hoursMatch[1] });
    }
  }
  
  // Extract "0 hours wait time" or similar
  const waitTimeMatch = outcome.match(/(0\s*(?:hours?|hrs?)\s*wait\s*time|instant\s*(?:insights?|results?))/i);
  if (waitTimeMatch) {
    metrics.push({ label: "Wait Time", value: "0 hours wait time" });
  } else {
    // Fallback: look for cost savings
    const costMatch = outcome.match(/(\$[\d,]+)\s*(?:per\s*)?(?:month|year|week)/i);
    if (costMatch) {
      metrics.push({ label: "Cost Savings", value: `${costMatch[1]} per month` });
    }
  }
  
  return metrics;
}

// Convert Approach text into numbered steps with JSX content
function extractSteps(approach: string): Array<{ number: number; content: ReactNode }> {
  const sentences = approach
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20); // Filter out very short fragments
  
  const steps: Array<{ number: number; content: ReactNode }> = [];
  let stepNum = 1;
  
  // Group related sentences into steps
  for (let i = 0; i < sentences.length && stepNum <= 4; i++) {
    const sentence = sentences[i];
    if (sentence.length > 0) {
      steps.push({ number: stepNum, content: parseMarkdownToJSX(sentence) });
      stepNum++;
    }
  }
  
  // If we didn't get enough steps, create them from the text
  if (steps.length === 0) {
    const chunks = approach.split(". ").filter((c) => c.trim().length > 0);
    chunks.slice(0, 4).forEach((chunk, idx) => {
      const trimmedChunk = chunk.trim() + ".";
      steps.push({ number: idx + 1, content: parseMarkdownToJSX(trimmedChunk) });
    });
  }
  
  return steps.slice(0, 4);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const fm = project.frontmatter;
  const sections = parseMDXContent(project.content);
  const metrics = sections.outcome ? extractMetrics(sections.outcome) : [];
  
  // Determine which phases component to use
  const PhasesComponent = slug === "genai-text-to-sql-agent" ? GenAIPhases : InfrastructurePhases;
  
  return (
    <Shell>
      <article className="prose prose-zinc max-w-none">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="mb-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {fm.title}
          </h1>
          <p className="mt-0 text-lg text-zinc-600 dark:text-zinc-400">
            {fm.description}
          </p>

          <div className="not-prose mt-6 flex flex-wrap gap-2">
            {fm.stack?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ImpactStrip - 2 Metrics */}
        {metrics.length > 0 && (
          <section className="not-prose my-12 border-y border-zinc-200 dark:border-zinc-800 py-8">
            <div className="flex justify-center gap-12 sm:gap-16">
              {metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Problem/Solution Two-Column Block */}
        {(sections.problem || sections.approach) && (
          <section className="not-prose my-12 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Problem
              </h2>
              <div className="prose prose-zinc max-w-none text-zinc-700 dark:text-zinc-300">
                <MDXRemote
                  source={sections.problem || ""}
                  components={{
                    p: (props) => (
                      <p {...props} className="my-4 leading-relaxed" />
                    ),
                    strong: (props) => (
                      <strong {...props} className="font-semibold" />
                    ),
                  }}
                />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Solution
              </h2>
              <div className="prose prose-zinc max-w-none text-zinc-700 dark:text-zinc-300">
                <MDXRemote
                  source={sections.approach || ""}
                  components={{
                    p: (props) => (
                      <p {...props} className="my-4 leading-relaxed" />
                    ),
                    strong: (props) => (
                      <strong {...props} className="font-semibold" />
                    ),
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* How it Works - Infrastructure Phases */}
        <section className="not-prose my-12">
          <h2 className="mb-8 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            How it works
          </h2>
          
          {/* Infrastructure Phases */}
          <div className="mb-6">
            <PhasesComponent />
          </div>

          {/* Technical Diagram Button */}
          <ArchitectureCard />
        </section>

        {/* Outcome - Highlighted Callout */}
        {sections.outcome && (
          <section className="not-prose my-12">
            <div className="rounded-2xl border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900 p-8">
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Outcome
              </h2>
              <div className="prose prose-zinc max-w-none text-zinc-800 dark:text-zinc-200">
                <MDXRemote
                  source={sections.outcome}
                  components={{
                    p: (props) => (
                      <p {...props} className="my-4 leading-relaxed" />
                    ),
                    strong: (props) => (
                      <strong {...props} className="font-semibold" />
                    ),
                  }}
                />
              </div>
            </div>
          </section>
        )}
      </article>
    </Shell>
  );
}
