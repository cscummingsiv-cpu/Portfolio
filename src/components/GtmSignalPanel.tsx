"use client";

import { useState } from "react";

type Tab = "ROI" | "Workflow";

const workflowSteps = [
  {
    id: "source",
    label: "Source",
    description: "Ingest from CRM, marketing tools, and APIs",
    detail: "What I build here: Automated webhooks, scheduled syncs, and data normalization pipelines that ensure clean, deduplicated records.",
  },
  {
    id: "enrich",
    label: "Enrich",
    description: "Append firmographic data and intent signals",
    detail: "What I build here: ML models that score intent, append technographic data, and calculate fit from historical patterns.",
  },
  {
    id: "decide",
    label: "Decide",
    description: "Apply routing rules and scoring thresholds",
    detail: "What I build here: Dynamic routing logic that prioritizes leads by opportunity size and flags high-value accounts for fast-track.",
  },
  {
    id: "route",
    label: "Route",
    description: "Assign to appropriate rep or trigger nurture",
    detail: "What I build here: CRM task creation, team notifications, and automated nurture sequences based on score tiers.",
  },
  {
    id: "measure",
    label: "Measure",
    description: "Track conversion rates and pipeline velocity",
    detail: "What I build here: Dashboards that monitor time-to-close, conversion by source, and anomaly detection for routing optimization.",
  },
];

export function GtmSignalPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("ROI");
  const [hoursSaved, setHoursSaved] = useState(200);
  const [hourlyRate, setHourlyRate] = useState(85);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  // Calculate ROI
  const monthlySavings = hoursSaved * hourlyRate * 4.33;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="relative rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 overflow-hidden">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

      {/* Subtle radial highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-100/30 dark:bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative p-8 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Static Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                GTM systems, not slides.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                I build automation and decisioning systems for revenue teams—routing, enrichment, measurement, and iteration loops that move pipeline.
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3 mt-0.5 text-zinc-400 dark:text-zinc-600">•</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Automations that remove pipeline friction (routing, enrichment, alerts)
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-0.5 text-zinc-400 dark:text-zinc-600">•</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Measurement baked in (dashboards, QA checks, anomaly detection)
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-0.5 text-zinc-400 dark:text-zinc-600">•</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Fast iteration loops (ship → observe → tune)
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {["n8n", "SQL / BigQuery", "Salesforce", "LLMs"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Signal Module */}
          <div className="space-y-4">
            {/* Segmented Control Tabs */}
            <div
              role="tablist"
              className="relative inline-flex p-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100/50 dark:bg-zinc-900/50"
            >
              {(["ROI", "Workflow"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 z-10
                    ${
                      activeTab === tab
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ROI Tab */}
            {activeTab === "ROI" && (
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <label className="sr-only">Hours per week</label>
                    <input
                      type="number"
                      value={hoursSaved}
                      onChange={(e) => setHoursSaved(Number(e.target.value))}
                      placeholder="200"
                      className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                    />
                    <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-500">hrs / wk</span>
                  </div>
                  <div className="flex-1">
                    <label className="sr-only">Dollars per hour</label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      placeholder="85"
                      className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                    />
                    <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-500">$/hr</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Monthly impact</div>
                    <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">Annualized impact</div>
                    <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-500">Assumes 4.33 weeks / month</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Automation pays back immediately when it removes recurring manual work.
                </p>
              </div>
            )}

            {/* Workflow Tab */}
            {activeTab === "Workflow" && (
              <div className="space-y-2 pt-2">
                {workflowSteps.map((step, idx) => (
                  <div key={step.id}>
                    <button
                      onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                      className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-600 dark:group-hover:bg-zinc-400 transition-colors" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 mb-0.5">
                          {step.label}
                        </div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">{step.description}</div>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            expandedStep === step.id ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="text-xs text-zinc-500 dark:text-zinc-500 italic">
                            {step.detail}
                          </div>
                        </div>
                      </div>
                    </button>
                    {idx < workflowSteps.length - 1 && (
                      <div className="ml-2.5 w-px h-3 bg-zinc-200 dark:bg-zinc-800" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
