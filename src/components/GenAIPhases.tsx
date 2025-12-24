"use client";

import { useState } from "react";

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string;
  expandedContent: string;
}

const phases: Phase[] = [
  {
    id: "ui",
    title: "User Interface",
    description: "Chat-style interface for natural language queries.",
    icon: "💬",
    expandedContent: "User submits a natural language question via UI (Chat-style interface).",
  },
  {
    id: "router",
    title: "Router / Message Broker",
    description: "Evaluates intent and routes requests to appropriate agents.",
    icon: "🔀",
    expandedContent: "Router / message broker evaluates intent.",
  },
  {
    id: "validator",
    title: "Prompt Validator",
    description: "Validates request before processing.",
    icon: "✅",
    expandedContent: "Prompt-evaluator agent validates request.",
  },
  {
    id: "sql",
    title: "SQL Generation",
    description: "Converts natural language to executable SQL.",
    icon: "🔧",
    expandedContent: "SQL-generation agent converts prompt → executable SQL.",
  },
  {
    id: "execution",
    title: "Query Execution",
    description: "Executes SQL securely against Snowflake.",
    icon: "⚡",
    expandedContent: "Query executes against Snowflake.",
  },
  {
    id: "visualization",
    title: "Visualization",
    description: "Renders tables or charts from results.",
    icon: "📊",
    expandedContent: "Visualization agent renders tables or charts.",
  },
];

export function GenAIPhases() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const handlePhaseClick = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-12 left-0 right-0 h-0.5 bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-2 relative">
          {phases.map((phase, index) => {
            const isExpanded = expandedPhase === phase.id;
            
            return (
              <div
                key={phase.id}
                className={`relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 ${
                  isExpanded
                    ? "border-zinc-300 dark:border-zinc-700 shadow-lg z-10"
                    : "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => handlePhaseClick(phase.id)}
                  className="w-full text-left p-6"
                >
                  {/* Phase number indicator */}
                  <div className="absolute -top-3 left-6 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 text-xs font-semibold text-white dark:text-zinc-900">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-3">{phase.icon}</div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                    {phase.description}
                  </p>

                  {/* More link */}
                  <div className="flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                    <span>{isExpanded ? "Less" : "More"}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Expanded content with smooth height animation */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {phase.expandedContent}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow connector (hidden on last item) */}
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20 pointer-events-none">
                    <svg
                      className="w-6 h-6 text-zinc-300 dark:text-zinc-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
