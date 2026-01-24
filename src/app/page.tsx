import { Shell } from "@/components/Shell";
import Image from "next/image";
import Link from "next/link";
import { FeaturedProjectsCarousel } from "@/components/FeaturedProjectsCarousel";
import { getAllProjects } from "@/lib/projects.server";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/i18n";

export default async function Home() {
  const locale = await getLocale();
  const projects = getAllProjects(locale);
  const allFeatured = projects.filter((p) => p.frontmatter.featured);

  return (
    <Shell>
      <div className="space-y-14 pb-32">
        {/* HERO */}
        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 w-full max-w-full overflow-hidden">
          <div className="space-y-10 order-1 max-w-full lg:max-w-3xl relative">
            {/* Subtle depth overlay - hero text area only */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(255,255,255,0.02)_100%)] rounded-2xl pointer-events-none" />
            
            <div className="space-y-10 relative">
              <h1 className="text-2xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400 pt-2">
                {t("about.heroTitle", locale)}
              </h1>

              {/* Subhead as primary visual anchor - Two tightly coupled lines */}
              <div className="relative w-full max-w-full lg:max-w-3xl">
                {/* Ambient glow behind headline block */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(99,102,241,0.15)_0%,_rgba(99,102,241,0.05)_40%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(129,140,248,0.2)_0%,_rgba(129,140,248,0.08)_40%,_transparent_70%)] blur-2xl rounded-full scale-150 -translate-y-4" />
                
                <h2 
                  className="text-[clamp(1.75rem,8vw,4.25rem)] tracking-[-0.02em] leading-[0.95] inline-flex flex-col items-center max-w-full"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {/* Lines 1-2: Setup - first line defines width, second centered under it */}
                  <span className="headline-setup font-bold inline-flex flex-col items-center max-w-full">
                    <span className="block sm:w-max">95% of AI initiatives</span>
                    <span className="block w-full text-center text-[0.94em]">never produce revenue.</span>
                  </span>
                  
                  {/* Line 3: Conviction - Colored punchline, centered under setup */}
                  <span className="headline-punchline mt-4 font-extrabold text-center">
                    I build the other 5%.
                  </span>
                </h2>
              </div>

              <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mt-10 sm:mt-12">
                {t("about.heroSubheadSupport", locale)}
              </p>
            </div>

            {/* View Projects Scroll Cue */}
            <div className="pt-6 pb-4 flex justify-center">
              <ScrollIndicator targetId="projects" />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 order-3 lg:order-2 -mt-8 lg:mt-0">
            <div className="hidden lg:block rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-sm scale-[0.95]">
              <div className="group relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="/headshot-bw.jpeg"
                  alt={t("about.profileName", locale)}
                  width={900}
                  height={1100}
                  className="h-auto w-full object-cover"
                  priority
                />
                <Image
                  src="/headshot-color.jpeg"
                  alt=""
                  width={900}
                  height={1100}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                    {t("about.profileName", locale)}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {t("about.profileRole", locale)}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("about.profileLocation", locale)}</p>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
                  >
                    {t("about.profileGetInTouch", locale)}
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden lg:block mt-8">
              <Link
                href="/why-automate"
                className="group relative flex items-center gap-2 px-4 py-3 rounded-xl overflow-hidden cursor-pointer border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white via-white to-zinc-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950/80 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.1),0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_0_0_1px_rgb(0_0_0_/_0.05)] dark:shadow-[0_1px_3px_0_rgb(0_0_0_/_0.3),0_4px_6px_-1px_rgb(0_0_0_/_0.2),0_0_0_1px_rgb(255_255_255_/_0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_10px_25px_-5px_rgb(0_0_0_/_0.15),0_20px_40px_-10px_rgb(0_0_0_/_0.1),0_0_0_1px_rgb(0_0_0_/_0.1)] dark:hover:shadow-[0_10px_25px_-5px_rgb(0_0_0_/_0.5),0_20px_40px_-10px_rgb(0_0_0_/_0.4),0_0_0_1px_rgb(255_255_255_/_0.1)] hover:border-zinc-300/80 dark:hover:border-zinc-700/80 active:translate-y-0 active:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60 focus-visible:ring-offset-2"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <div className="flex-1 relative z-10">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                    {t("about.whyAutomateTitle", locale)}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                    {t("about.whyAutomateSubtitle", locale)}
                  </div>
                </div>
                <svg className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </aside>
        </section>

        {allFeatured.length > 0 && (
          <section id="projects" className="relative rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 scroll-mt-32 md:scroll-mt-24 order-2 lg:order-3 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-100/30 dark:bg-zinc-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative py-6 md:py-8">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 px-6 md:px-8">
                {t("about.featuredProjects", locale)}
              </h2>
              <FeaturedProjectsCarousel projects={allFeatured} locale={locale} />
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        <section className="space-y-6 max-w-2xl pt-8">
          <p className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("about.contactTitle", locale)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t("about.contactCTA", locale)}
            </Link>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("about.contactFooter", locale)}
          </p>
        </section>
      </div>
    </Shell>
  );
}
