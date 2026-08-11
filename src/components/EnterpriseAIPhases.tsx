"use client";

const phases = [
  {
    id: "encode",
    title: "Encode",
    description: "Packages repeatable analyses as agent workflows",
    icon: "🧩",
  },
  {
    id: "context",
    title: "Ground",
    description: "Adds company definitions, metric logic, and operating context",
    icon: "🧠",
  },
  {
    id: "connect",
    title: "Connect",
    description: "Links the data and tools each analysis needs",
    icon: "🔗",
  },
  {
    id: "validate",
    title: "Check",
    description: "Tests outputs before users see them",
    icon: "✅",
  },
  {
    id: "deliver",
    title: "Answer",
    description: "Returns analysis in the team's existing tools",
    icon: "⚡",
  },
];

export function EnterpriseAIPhases() {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-12 left-0 right-0 hidden h-0.5 bg-zinc-200 dark:bg-zinc-800 md:block" />
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-2">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white via-white to-zinc-50/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-800/60 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950/80"
            >
              <div className="relative z-10 w-full p-6 text-left">
                <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110">
                  {phase.icon}
                </div>
                <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {phase.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {phase.description}
                </p>
              </div>
              {index < phases.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 md:block">
                  <svg className="h-5 w-5 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
