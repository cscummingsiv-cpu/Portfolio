import Link from "next/link";
import type { Project } from "@/lib/projects";

// Extract metrics from Outcome text (same logic as project detail page)
function extractMetrics(outcome: string): Array<{ label: string; value: string }> {
  const metrics: Array<{ label: string; value: string }> = [];
  
  // Extract "50+ hours per week" and format as "50 hours/week"
  const hoursMatch = outcome.match(/(\d+)\+?\s*(?:hours?|hrs?)\s*(?:per\s*)?(?:week|month|day)?/i);
  if (hoursMatch) {
    const number = hoursMatch[1];
    const unit = hoursMatch[0].match(/(?:hours?|hrs?)/i)?.[0] || 'hours';
    const period = hoursMatch[0].match(/(?:per\s+)?(week|month|day)/i)?.[1];
    
    // Format: "50 hours/week" (remove +, keep space, replace "per" with "/")
    let hoursValue = `${number} ${unit}`;
    if (period) {
      hoursValue += `/${period}`;
    }
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
  const outcomeMatch = content.match(/##\s+Outcome\s*\n\n([\s\S]*?)(?=\n\n|$)/i);
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
  const outcomeMatch = project.content.match(/##\s+Outcome\s*\n\n([\s\S]*?)(?=\n\n##|$)/i);
  const outcomeText = outcomeMatch ? outcomeMatch[1].trim() : "";
  const metrics = extractMetrics(outcomeText);
  const outcomeSummary = extractOutcomeSummary(project.content) || fm.description;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="
        group relative block overflow-hidden cursor-pointer rounded-2xl
        border border-zinc-800/80 bg-zinc-950/40
        shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]
        transition-all duration-200
        hover:-translate-y-1 hover:border-zinc-600/80
        hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.95)]
        active:translate-y-0 active:scale-[0.99]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60
      "
    >
      {/* Hover sheen overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_35%)]" />

      {/* Top-right icon button */}
      <div className="absolute right-4 top-4">
        <span className="
          inline-flex items-center justify-center
          h-9 w-9 rounded-full
          border border-zinc-800 bg-zinc-950/60
          text-zinc-400
          transition
          group-hover:border-zinc-600 group-hover:text-zinc-100 group-hover:bg-white/5
        ">
          ↗
        </span>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-xl font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
            {fm.title}
          </h3>

          {/* Outcome Summary */}
          <p className="text-sm leading-relaxed text-zinc-400">
            {outcomeSummary}
          </p>

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-base font-semibold tracking-tight text-zinc-100">
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack + CTA */}
        <div className="mt-5 flex items-center justify-between">
          {/* Tech Stack */}
          {fm.stack && fm.stack.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              {fm.stack.map((tech) => (
                <span
                  key={tech}
                  className="
                    rounded-full border border-zinc-800 bg-zinc-950/40
                    px-2.5 py-1 text-xs text-zinc-400
                    transition
                    group-hover:border-zinc-600 group-hover:text-zinc-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          
          {/* CTA - Pill button style */}
          <div className="
            inline-flex items-center gap-2 rounded-full
            border border-zinc-800 bg-zinc-950/50
            px-3 py-1 text-xs text-zinc-300
            transition
            group-hover:border-zinc-600 group-hover:bg-white/5
          ">
            View project
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
