"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects.server";
import type { Locale } from "@/i18n";
import { t } from "@/i18n";
import { CategoryLabel } from "./CategoryLabel";

// Extract revenue impact (short, concrete outcome) from Outcome text
function extractRevenueImpact(outcome: string): string {
  // Look for dollar amounts first (most concrete)
  const dollarMatch = outcome.match(/(\$[\d,]+(?:\+)?)\s*(?:per\s*)?(?:month|year|week|annually)/i);
  if (dollarMatch) {
    const period = outcome.match(/(?:per\s*)?(month|year|week|annually)/i)?.[1] || 'month';
    return `${dollarMatch[1]} per ${period}`;
  }
  
  // Look for percentage increases
  const percentMatch = outcome.match(/(\d+%)\s*(?:increase|growth|improvement|boost)/i);
  if (percentMatch) {
    return `${percentMatch[1]} increase`;
  }
  
  // Look for time savings that imply revenue impact
  const hoursMatch = outcome.match(/(\d+)\+?\s*(?:hours?|hrs?)\s*(?:per\s*)?(?:week|month)/i);
  if (hoursMatch) {
    return `${hoursMatch[1]}+ hours saved`;
  }
  
  // Fallback: first sentence of outcome
  const firstSentence = outcome.split(/[.!?]+/)[0].trim();
  if (firstSentence.length > 0 && firstSentence.length < 80) {
    return firstSentence;
  }
  
  return "";
}

// Extract metrics from Outcome text (same logic as project detail page)
function extractMetrics(outcome: string, locale: string = "en"): Array<{ label: string; value: string; labelKey: string }> {
  const metrics: Array<{ label: string; value: string; labelKey: string }> = [];
  
  // Check for workflows pattern (e.g., "60+ workflows")
  const workflowsMatch = outcome.match(/(\d+\+?)\s*workflows?\s*(?:orchestrated)?/i);
  if (workflowsMatch) {
    metrics.push({ label: "Workflows Orchestrated", value: `${workflowsMatch[1]} workflows`, labelKey: "workflowsOrchestrated" });
  }
  
  // Check for large revenue/projected lift (e.g., "$20M+ projected lift")
  const revenueLiftMatch = outcome.match(/(\$\d+M\+?)\s*(?:projected\s*lift|in\s*annual\s*revenue|revenue\s*lift)/i);
  if (revenueLiftMatch && metrics.length < 2) {
    metrics.push({ label: "Projected Revenue Lift", value: `${revenueLiftMatch[1]} / year`, labelKey: "projectedRevenue" });
  }
  
  // First, prioritize "hours per week" or "hours/week" pattern
  const hoursPerWeekMatch = outcome.match(/(\d+)\+?\s*(?:hours?|hrs?)\s*(?:\/|per\s+)(?:week|month|day)/i);
  if (hoursPerWeekMatch && metrics.length < 2) {
    const number = hoursPerWeekMatch[1];
    const hasPlus = outcome.match(/(\d+)\+?\s*(?:hours?|hrs?)\s*(?:\/|per\s+)(?:week|month|day)/i)?.[0].includes('+');
    const period = hoursPerWeekMatch[0].match(/(week|month|day)/i)?.[1] || 'week';
    metrics.push({ label: "Time Saved", value: `${number}${hasPlus ? '+' : ''} hours/${period}`, labelKey: "timeSaved" });
  } else if (metrics.length < 2) {
    // Fallback: Extract other hours patterns (but avoid ranges like "24–48")
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
      metrics.push({ label: "Time Saved", value: hoursValue, labelKey: "timeSaved" });
    }
  }
  
  // Extract cost savings - look for "$5000 per month" format (only if we don't have revenue lift)
  if (metrics.length < 2) {
    const costMatch = outcome.match(/(\$[\d,]+)\s*(?:per\s*)?(?:month|year|week)/i);
    if (costMatch) {
      const costValue = `${costMatch[1]} per month`;
      metrics.push({ label: "Cost Savings", value: costValue, labelKey: "costSavings" });
    } else {
      // Fallback: look for "thousands" or similar
      const thousandsMatch = outcome.match(/(thousands?|millions?)\s*(?:of\s*)?(?:dollars?)?/i);
      if (thousandsMatch) {
        metrics.push({ label: "Cost Savings", value: thousandsMatch[1], labelKey: "costSavings" });
      }
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

export function FeaturedProjectCard({ 
  project, 
  locale 
}: { 
  project: Project;
  locale: Locale;
}) {
  const fm = project.frontmatter;
  
  // Parse content to extract outcome section
  const outcomeMatch = project.content.match(/##\s+Outcome\s*\n\n([\s\S]*?)(?=\n\n##|$)/i);
  const outcomeText = outcomeMatch ? outcomeMatch[1].trim() : "";
  const revenueImpact = extractRevenueImpact(outcomeText);
  const metrics = extractMetrics(outcomeText, locale);
  
  // Use frontmatter description for card copy (cleaner, more controlled)
  const outcomeSummary = fm.description;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="
        group relative block h-full overflow-hidden cursor-pointer rounded-2xl
        border border-zinc-200/60 dark:border-zinc-800/60
        bg-gradient-to-br from-white via-white to-zinc-50/50
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950/80
        shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_0_0_1px_rgb(0_0_0_/_0.05)]
        dark:shadow-[0_1px_3px_0_rgb(0_0_0_/_0.3),0_4px_6px_-1px_rgb(0_0_0_/_0.2),0_0_0_1px_rgb(255_255_255_/_0.05)]
        transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:scale-[1.02]
        hover:shadow-[0_10px_25px_-5px_rgb(0_0_0_/_0.15),0_20px_40px_-10px_rgb(0_0_0_/_0.1),0_0_0_1px_rgb(0_0_0_/_0.1)]
        dark:hover:shadow-[0_10px_25px_-5px_rgb(0_0_0_/_0.5),0_20px_40px_-10px_rgb(0_0_0_/_0.4),0_0_0_1px_rgb(255_255_255_/_0.1)]
        hover:border-zinc-300/80 dark:hover:border-zinc-700/80
        active:translate-y-0 active:scale-[1.01]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60 focus-visible:ring-offset-2
      "
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D depth effect - subtle inner highlight */}
      <div className="
        absolute inset-0 rounded-2xl
        bg-gradient-to-br from-white/40 via-transparent to-transparent
        dark:from-white/5 dark:via-transparent dark:to-transparent
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        pointer-events-none
      " />
      
      {/* Subtle shine effect on hover */}
      <div className="
        absolute inset-0 rounded-2xl
        bg-gradient-to-br from-transparent via-white/20 to-transparent
        dark:via-white/5
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        pointer-events-none
        -translate-x-full group-hover:translate-x-full
        transition-transform duration-1000 ease-in-out
      " />

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col z-10">
        {/* Header Row - Title + Category + CTA */}
        <div className="flex items-start justify-between mb-3 pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-col gap-1.5 min-w-0">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300 truncate">
              {fm.title}
            </h3>
            {fm.category && (
              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full border border-zinc-300/50 dark:border-zinc-600/50 bg-zinc-50/50 dark:bg-zinc-800/50 w-fit">
                <CategoryLabel category={fm.category} />
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-all duration-300 group-hover:translate-x-0.5 whitespace-nowrap shrink-0 ml-3 mt-0.5">
            {t("projects.viewProject", locale)}
          </span>
        </div>

        <div className="space-y-4 flex-1 flex flex-col">
          {/* Outcome Summary */}
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 flex-shrink-0 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
            {outcomeSummary}
          </p>

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="flex flex-wrap gap-6 flex-shrink-0">
              {metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col transform group-hover:scale-105 transition-transform duration-300">
                  <div className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {t(`projects.${metric.labelKey}`, locale) || metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack - pushed to bottom */}
          {fm.stack && fm.stack.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center pt-2 mt-auto">
              {fm.stack.map((tech) => (
                <span
                  key={tech}
                  className="
                    rounded-full border border-zinc-200 dark:border-zinc-800
                    px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-400
                    bg-white/50 dark:bg-zinc-900/50
                    backdrop-blur-sm
                    transition-all duration-300
                    group-hover:border-zinc-300 dark:group-hover:border-zinc-700
                    group-hover:text-zinc-900 dark:group-hover:text-zinc-200
                    group-hover:bg-white/80 dark:group-hover:bg-zinc-800/80
                    group-hover:shadow-sm
                    group-hover:scale-105
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
