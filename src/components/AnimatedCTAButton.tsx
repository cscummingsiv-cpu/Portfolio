"use client";

export function AnimatedCTAButton() {
  const handleClick = () => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      <div className="relative pointer-events-auto">
        {/* Ambient halo - pulses with breathing animation */}
        <div className="absolute inset-0 -z-10 rounded-full blur-3xl bg-zinc-400/40 dark:bg-white/20 animate-ctaHalo" />
        
        <button
          onClick={handleClick}
          className="relative rounded-full border-2 border-zinc-400/60 dark:border-zinc-600/60 bg-gradient-to-b from-white via-white to-zinc-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-black shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9),0_0_50px_rgba(255,255,255,0.12)] ring-2 ring-black/5 dark:ring-white/10 px-12 md:px-14 py-5 h-[88px] text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,1),0_0_60px_rgba(255,255,255,0.18)] hover:ring-black/10 dark:hover:ring-white/15 hover:text-zinc-950 dark:hover:text-zinc-100 active:translate-y-[1px] active:scale-[1.01] active:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] dark:active:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out animate-ctaBreathe"
        >
          {/* Inner highlight sheen */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent dark:from-white/10 dark:via-white/0 pointer-events-none" />
          
          <span className="relative z-10 flex items-center gap-2">
            Automate With Me
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

