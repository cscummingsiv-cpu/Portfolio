import { Shell } from "@/components/Shell";
import Link from "next/link";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/i18n";
import { AboutNavigation } from "@/components/AboutNavigation";

export default async function AboutPage() {
  const locale = await getLocale();

  const experience = [
    {
      company: "Oats Overnight",
      title: "Director of AI",
      period: "Feb 2026–Present",
      bullets: [
        "Established the first org-wide AI function, owning strategy, adoption, enablement, measurement, and internal tooling across 12 departments",
        "Architected the foundation for a self-service AI analytics platform that eliminated 300+ hours of weekly manual reporting across 40+ users"
      ]
    },
    {
      company: "People Inc.",
      title: "Senior Staff AI Operator",
      period: "Sep 2024–Feb 2026",
      bullets: [
        "Technical lead for a 60+ workflow editorial automation platform supporting a roadmap with $20M+ in projected annual revenue lift",
        "Secured CMO sponsorship and led development of a sales intelligence platform projected to eliminate 100+ hours of weekly work and generate $5M+ annually"
      ]
    },
    {
      company: "TelevisaUnivision (via SiiRa)",
      title: "Product Operations Manager, AI Ops",
      period: "Aug 2022–Sep 2024",
      bullets: [
        "Built a multi-model AI agent integrated with Snowflake and OpenAI to deliver real-time supply insights to nontechnical users",
        "Eliminated 100+ hours of annual manual reporting"
      ]
    },
    {
      company: "GroundTruth",
      title: "Senior Manager / Manager, Supply & Data",
      period: "2019–2022",
      bullets: [
        "Identified and corrected critical flaws in the CTR optimization model, preserving $500k in monthly revenue",
        "Led technical integrations to launch CTV supply channels, generating $100k+ in incremental monthly revenue"
      ]
    }
  ];

  const corePillars = [
    {
      title: "Enterprise AI Functions",
      description: "Establish the strategy, operating model, enablement, and measurement required for AI to scale across an organization.",
      bullets: [
        "AI ownership across 12 departments",
        "40 prioritized automation opportunities"
      ]
    },
    {
      title: "AI Systems & Decisioning",
      description: "Architect production systems that make institutional knowledge reusable, validated, and accessible.",
      bullets: [
        "Self-service AI analytics",
        "Multi-agent sales and supply intelligence"
      ]
    },
    {
      title: "Adoption & Measurement",
      description: "Pair technical delivery with workflow redesign, enablement, and evidence of business impact.",
      bullets: [
        "300+ weekly hours eliminated",
        "Adoption across 40+ users"
      ]
    }
  ];

  const skills = {
    "AI & LLM": ["Claude", "Claude Code", "LLM orchestration", "AI agents", "Multi-agent systems", "RAG", "MCP"],
    "Automation & Infrastructure": ["n8n", "GitHub Actions", "Google Cloud Run", "REST APIs"],
    "Data & Analytics": ["Python", "SQL", "Snowflake", "BigQuery", "PostgreSQL", "Athena"]
  };

  return (
    <Shell>
      <div className="max-w-5xl md:grid md:grid-cols-[180px_1fr] md:gap-10 pb-32">
        <AboutNavigation />
        
        <div className="space-y-16 scroll-smooth">
          {/* About Header */}
          <section id="about" className="scroll-mt-24">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-2">
              {t("nav.about", locale)}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Brooklyn / NYC · Director of AI at Oats Overnight
            </p>
            
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                I’m a Brazilian-American AI leader and hands-on builder based in Brooklyn. At Oats Overnight, I established the company’s first org-wide AI function and now lead strategy, adoption, enablement, measurement, and internal tooling across 12 departments.
              </p>
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                My background spans analytics, business operations, product, and technical architecture. That shapes how I approach AI: start with the operating problem, build for real constraints, and measure whether the system changes how work gets done. When I’m not working, I’m usually playing tennis, cycling around the city, or walking my dog Bento.
              </p>
            </div>
          </section>

          {/* Core Pillars */}
          <section id="pillars" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight mb-8">Core Pillars</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2">
                    {pillar.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start text-sm text-zinc-700 dark:text-zinc-300">
                        <span className="mr-2 text-zinc-400 dark:text-zinc-500">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section id="experience" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight mb-8">Experience</h2>
            <div className="space-y-6">
              {experience.map((role, idx) => (
                <div
                  key={idx}
                  className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 pb-6 last:pb-0"
                >
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {role.company}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {role.title}
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500 font-medium">
                        {role.period}
                      </div>
                    </div>
                    <ul className="space-y-1.5 mt-3">
                      {role.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="mr-2 text-zinc-400 dark:text-zinc-500">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Tools */}
          <section id="skills" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">Skills & Tools</h2>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div id="projects" className="scroll-mt-24 pt-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              View Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  );
}
