"use client";

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const phases: Phase[] = [
  {
    id: "ingest",
    title: "Ingest",
    description: "Captures content requests from multiple sources into a single queue",
    icon: "📥",
  },
  {
    id: "normalize",
    title: "Normalize",
    description: "Applies consistent structure so any workflow can process any input",
    icon: "🔄",
  },
  {
    id: "detect",
    title: "Detect",
    description: "Flags bottlenecks before they block publication",
    icon: "🔍",
  },
  {
    id: "enrich",
    title: "Enrich",
    description: "Adds AI-generated metadata to accelerate editorial decisions",
    icon: "🤖",
  },
  {
    id: "route",
    title: "Route",
    description: "Pushes ready content to the right destination automatically",
    icon: "⚡",
  },
];

export function EditorialPhases() {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-12 left-0 right-0 h-0.5 bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 relative">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className="
                group relative rounded-2xl overflow-hidden
                border border-zinc-200/60 dark:border-zinc-800/60
                bg-gradient-to-br from-white via-white to-zinc-50/50
                dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950/80
                shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_0_0_1px_rgb(0_0_0_/_0.05)]
                dark:shadow-[0_1px_3px_0_rgb(0_0_0_/_0.3),0_4px_6px_-1px_rgb(0_0_0_/_0.2),0_0_0_1px_rgb(255_255_255_/_0.05)]
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:scale-[1.02]
                hover:shadow-[0_10px_25px_-5px_rgb(0_0_0_/_0.15),0_20px_40px_-10px_rgb(0_0_0_/_0.1),0_0_0_1px_rgb(0_0_0_/_0.1)]
                dark:hover:shadow-[0_10px_25px_-5px_rgb(0_0_0_/_0.5),0_20px_40px_-10px_rgb(0_0_0_/_0.4),0_0_0_1px_rgb(255_255_255_/_0.1)]
                hover:border-zinc-300/80 dark:hover:border-zinc-700/80
              "
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="
                absolute inset-0 rounded-2xl
                bg-gradient-to-br from-white/40 via-transparent to-transparent
                dark:from-white/5 dark:via-transparent dark:to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                pointer-events-none
              " />

              <div className="w-full text-left p-6 relative z-10">
                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {phase.icon}
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
                  {phase.description}
                </p>
              </div>

              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20 pointer-events-none">
                  <svg className="w-5 h-5 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
