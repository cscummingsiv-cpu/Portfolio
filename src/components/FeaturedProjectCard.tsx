import Link from "next/link";
import type { Project } from "@/lib/projects";

// Extract metrics from Outcome text (same logic as project detail page)
function extractMetrics(outcome: string): Array<{ label: string; value: string }> {
  const metrics: Array<{ label: string; value: string }> = [];
  
  // Extract "50+ hours per week" and format as "50+ hours/week"
  const hoursMatch = outcome.match(/(\d+\+?\s*(?:hours?|hrs?)\s*(?:per\s*)?(?:week|month|day)?)/i);
  if (hoursMatch) {
    const hoursValue = hoursMatch[1].replace(/\s+per\s+/i, '/').replace(/\s+/g, '');
    metrics.push({ label: "Time Saved", value: hoursValue });
  }
  
  // Extract cost savings - look for "$5000 per month" format
  const costMatch = outcome.match(/(\$[\d,]+)\s*(?:per\s*)?(?:month|year|week)/i);
  if (costMatch) {
    const costValue = `${costMatch[1]} per month`;
    metrics.push({ label: "Cost Savings", value: costValue });
  } else {
    // Fallback: look for "thousands" or similar
    const thousandsMatch = outcome.match(/(thousands?|millions?)\s*(?:of\s*)?(?:dollars?)?/i);
    if (thousandsMatch) {
      metrics.push({ label: "Cost Savings", value: thousandsMatch[1] });
    }
  }
  
  return metrics.slice(0, 2);
}

// Extract outcome summary (first sentence of Outcome section)
function extractOutcomeSummary(content: string): string {
  const outcomeMatch = content.match(/##\s+Outcome\s*\n\n(.*?)(?=\n\n|$)/is);
  if (outcomeMatch) {
    const outcomeText = outcomeMatch[1].trim();
    // Get first sentence, removing markdown bold
    const firstSentence = outcomeText
      .replace(/\*\*/g, '')
      .split(/[.!?]+/)[0]
      .trim();
    return firstSentence || outcomeText.split('\n')[0].trim();
  }
  return "";
}

export function FeaturedProjectCard({ project }: { project: Project }) {
  const fm = project.frontmatter;
  
  // Parse content to extract outcome section
  const outcomeMatch = project.content.match(/##\s+Outcome\s*\n\n(.*?)(?=\n\n##|$)/is);
  const outcomeText = outcomeMatch ? outcomeMatch[1].trim() : "";
  const metrics = extractMetrics(outcomeText);
  const outcomeSummary = extractOutcomeSummary(project.content) || fm.description;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md hover:-translate-y-1 cursor-pointer group"
    >
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
          {fm.title}
        </h3>

        {/* Outcome Summary */}
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {outcomeSummary}
        </p>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="flex flex-wrap gap-6">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {metric.value}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {fm.stack && fm.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {fm.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-400 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
