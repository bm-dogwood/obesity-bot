// app/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroImg from "@/public/hero.jpeg";
import topographyImg from "@/public/topography.jpeg";
import medicationImg from "@/public/medication.jpeg";
import cellularImg from "@/public/cell.jpeg";

// Metadata for the page
export const metadata = {
  title: "OBESITY.BOT — An Atlas of Adiposity",
  description:
    "Independent reference desk on the science, treatment, and economics of obesity. BMI calculator, GLP-1 drug pricing, provider directory, CDC state atlas.",
  openGraph: {
    title: "OBESITY.BOT — An Atlas of Adiposity",
    description:
      "BMI tools, GLP-1 drug data, providers, insurance, and CDC statistics, in one editorial reference.",
  },
};

const featureIndex = [
  {
    n: "01",
    href: "/bmi",
    kicker: "Diagnostic",
    title: "Body Mass Index Calculator",
    desc: "Compute your BMI alongside waist-to-height ratio, with categorical risk stratification across CDC and WHO frameworks.",
  },
  {
    n: "02",
    href: "/treatments",
    kicker: "Intervention",
    title: "Treatment Comparison Desk",
    desc: "Side-by-side analysis of dietary protocols, bariatric surgery, and GLP-1 receptor agonists. Efficacy, cost, side-effect profile.",
  },
  {
    n: "03",
    href: "/providers",
    kicker: "Geography",
    title: "Provider Finder",
    desc: "Locate accredited bariatric centers, endocrinologists, and obesity-medicine specialists by zip code radius search.",
  },
  {
    n: "04",
    href: "/insurance",
    kicker: "Economics",
    title: "Coverage Guide",
    desc: "What Medicare, Medicaid, and major commercial plans cover for weight-loss medication and bariatric procedures.",
  },
  {
    n: "05",
    href: "/statistics",
    kicker: "Atlas",
    title: "State Prevalence Atlas",
    desc: "CDC adult obesity rates across 50 states and territories, with longitudinal context and disparity analysis.",
  },
];

const tickerData = [
  { label: "US ADULT OBESITY", value: "41.9%" },
  { label: "GLP-1 RX / WK", value: "1.7M" },
  { label: "AVG. WEGOVY MO.", value: "$1,349" },
  { label: "BARIATRIC PROCS / YR", value: "262K" },
  { label: "CDC STATES > 35%", value: "23" },
  { label: "GLOBAL OBESITY", value: "890M" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-charcoal text-paper">
      <SiteHeader />

      {/* Live ticker */}
      <div className="border-b border-rule overflow-hidden bg-ash/30">
        <div className="marquee py-3 font-mono text-[11px] uppercase tracking-widest">
          {[...tickerData, ...tickerData, ...tickerData].map((t, i) => (
            <span
              key={i}
              className="px-8 inline-flex items-center gap-3 whitespace-nowrap"
            >
              <span className="size-1 bg-amber rounded-full" />
              <span className="text-muted-ink">{t.label}</span>
              <span className="text-paper font-bold tabular-nums">
                {t.value}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO — Editorial Broadsheet */}
      <section className="grid grid-cols-12 border-b border-rule">
        {/* Left metadata */}
        <aside className="hidden md:flex col-span-2 border-r border-rule p-6 lg:p-8 flex-col justify-between min-h-[600px]">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-8">
            <div>
              <span className="block text-rule mb-1">Edition</span>
              <p className="text-paper">Vol. 04 &mdash; No. 11</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Filed</span>
              <p className="text-amber tabular-nums">2025.04.27</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Sources</span>
              <p className="leading-relaxed text-muted-ink">
                CDC WONDER
                <br />
                FDA Drug API
                <br />
                NIH NHANES
                <br />
                GoodRx Index
              </p>
            </div>
            <div>
              <span className="block text-rule mb-1">Status</span>
              <p className="text-paper">Aggregating</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="size-2.5 bg-amber rounded-full pulse-dot" />
            <p className="font-mono text-[10px] text-muted-ink uppercase tracking-widest">
              Telemetry Active
            </p>
          </div>
        </aside>

        {/* Center headline */}
        <article className="col-span-12 md:col-span-7 border-r border-rule p-6 md:p-12 lg:p-16 flex flex-col">
          <div className="space-y-10 mb-16">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber flex items-center gap-3">
              <span className="size-1.5 bg-amber rounded-full pulse-dot" />
              Front Matter &mdash; April Dispatch
            </div>
            <h1 className="font-display text-[3.5rem] sm:text-7xl lg:text-[8rem] leading-[0.85] font-medium tracking-tighter text-balance">
              The Anatomy
              <br />
              <span className="text-muted-ink font-light italic">
                of an
              </span>{" "}
              Epidemic.
            </h1>
            <p className="font-display text-xl md:text-2xl text-muted-ink max-w-[48ch] leading-relaxed text-pretty">
              An independent reading of the global metabolic crisis &mdash; the
              diagnostics, the pharmacology, the geography, and the bill.
              Continuously aggregated from public datasets and clinical
              literature.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/bmi"
                className="font-mono text-xs uppercase tracking-[0.2em] bg-amber text-charcoal px-6 py-4 hover:bg-paper transition-colors"
              >
                Begin with the BMI Tool &rarr;
              </Link>
              <Link
                href="/statistics"
                className="font-mono text-xs uppercase tracking-[0.2em] border border-rule text-paper px-6 py-4 hover:border-amber hover:text-amber transition-colors"
              >
                Open the State Atlas
              </Link>
            </div>
          </div>

          {/* Stat callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-rule pt-10 mt-auto">
            <div>
              <span className="font-mono text-[11px] text-amber uppercase tracking-widest block mb-4 border-b border-rule pb-2">
                Active GLP-1 Prescriptions / Year
              </span>
              <p className="font-display text-5xl md:text-6xl tabular-nums tracking-tight">
                88,420,902
              </p>
              <p className="text-sm text-muted-ink mt-3 max-w-[34ch] leading-relaxed">
                Real-time analysis of scripts written across U.S. tier-1
                healthcare networks.
              </p>
            </div>
            <div className="md:border-l border-rule md:pl-12">
              <span className="font-mono text-[11px] text-amber uppercase tracking-widest block mb-4 border-b border-rule pb-2">
                Projected BMI Variance
              </span>
              <p className="font-display text-5xl md:text-6xl tabular-nums tracking-tight">
                +4.73<span className="text-3xl text-muted-ink">%</span>
              </p>
              <p className="text-sm text-muted-ink mt-3 max-w-[34ch] leading-relaxed">
                Projected median U.S. adult BMI shift by 2030 absent systemic
                intervention.
              </p>
            </div>
          </div>
        </article>

        {/* Right column */}
        <aside className="col-span-12 md:col-span-3 flex flex-col">
          <div className="w-full aspect-[4/5] bg-ash relative overflow-hidden border-b border-rule">
            <img
              src={heroImg.src}
              alt="Editorial study of mass and shadow"
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
              width={1280}
              height={1600}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 to-charcoal/90" />
            <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-paper/70">
              <span>FIG. 01</span>
              <span>STILL LIFE</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-mono text-[10px] text-paper uppercase tracking-widest border-b border-paper/20 pb-3 mb-3">
                A Singular Mass &mdash; Untitled
              </p>
              <p className="text-xs text-paper/70 leading-relaxed">
                A meditation on the object of study before its quantification.
              </p>
            </div>
          </div>
          <div className="p-6 md:p-8 flex-grow">
            <h3 className="font-display text-2xl italic mb-6">
              Latest Dispatches
            </h3>
            <ul className="space-y-6 border-t border-rule pt-6">
              {[
                {
                  tag: "Analysis",
                  title:
                    "The Economics of Semaglutide: who bears the cost of the cure?",
                },
                {
                  tag: "Data Release",
                  title: "Regional Disparities in Pediatric Metabolic Syndrome",
                },
                {
                  tag: "Method",
                  title:
                    "Why BMI Is a Blunt Instrument &mdash; and What to Use Beside It",
                },
              ].map((d, i) => (
                <li key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-[10px] text-amber uppercase tracking-wider">
                      {d.tag}
                    </p>
                    <span className="text-rule group-hover:text-amber transition-colors">
                      &rarr;
                    </span>
                  </div>
                  <p className="text-sm text-paper group-hover:text-muted-ink transition-colors leading-snug text-balance">
                    {d.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* CONTENTS — feature index */}
      <section className="px-6 md:px-10 py-20 md:py-32 border-b border-rule">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="label-mono mb-4">§ I &mdash; Contents</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-none">
              The Reading
              <br />
              <span className="italic text-muted-ink">List.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
            <p className="text-base text-muted-ink leading-relaxed max-w-[52ch]">
              Five reference desks, each engineered as a standalone reading.
              Begin anywhere. The platform is non-linear by design &mdash; the
              epidemic does not unfold in chapters.
            </p>
          </div>
        </div>

        <div className="border-t border-rule">
          {featureIndex.map((f) => (
            <Link
              key={f.n}
              href={f.href}
              className="group grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-rule items-baseline hover:bg-ash/30 transition-colors px-2 -mx-2"
            >
              <div className="col-span-2 md:col-span-1 font-mono text-sm text-amber tabular-nums">
                {f.n}
              </div>
              <div className="col-span-10 md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-muted-ink">
                {f.kicker}
              </div>
              <div className="col-span-12 md:col-span-6">
                <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-tight group-hover:text-amber transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm md:text-base text-muted-ink mt-3 max-w-[58ch] leading-relaxed">
                  {f.desc}
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 flex md:justify-end items-baseline">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper group-hover:text-amber transition-colors">
                  Open &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EXHIBIT — Pharmacology */}
      <section className="grid grid-cols-12 border-b border-rule">
        <div className="col-span-12 md:col-span-5 p-6 md:p-12 lg:p-16 border-r border-rule flex flex-col justify-between">
          <div>
            <div className="label-mono mb-6">§ II &mdash; Exhibit A</div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-none mb-8">
              Pharmacological
              <br />
              <span className="italic text-muted-ink font-light">
                disruption.
              </span>
            </h2>
            <p className="text-base text-muted-ink leading-relaxed max-w-[44ch]">
              GLP-1 receptor agonists do not negotiate with willpower. They
              rewire the satiety signal at the hypothalamic root, and slow
              gastric emptying as a peripheral reinforcement. The pharmacology
              is precise; the consequences are still being written.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-rule">
            <div>
              <div className="font-display text-5xl tabular-nums tracking-tight text-amber">
                14.9%
              </div>
              <div className="label-mono mt-2">Semaglutide Δ</div>
            </div>
            <div>
              <div className="font-display text-5xl tabular-nums tracking-tight text-amber">
                20.9%
              </div>
              <div className="label-mono mt-2">Tirzepatide Δ</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 relative min-h-[480px] md:min-h-[640px] overflow-hidden">
          <img
            src={medicationImg.src}
            alt="Macro photograph of a GLP-1 injector pen on a charcoal surface"
            className="absolute inset-0 w-full h-full object-cover"
            width={1280}
            height={960}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/40" />
          <div className="absolute top-6 left-6 right-6 flex justify-between font-mono text-[10px] uppercase tracking-widest text-paper/80">
            <span>FIG. 02 &mdash; INJECTOR</span>
            <span>SCALE 1:1</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <p className="font-display italic text-xl md:text-3xl text-paper max-w-[24ch] leading-tight">
              "An object whose ten milligrams contain a generation."
            </p>
            <Link
              href="/treatments"
              className="font-mono text-xs uppercase tracking-[0.2em] border border-paper/40 text-paper px-5 py-3 hover:border-amber hover:text-amber transition-colors whitespace-nowrap"
            >
              Read &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* EXHIBIT — Topography */}
      <section className="grid grid-cols-12 border-b border-rule">
        <div className="col-span-12 md:col-span-7 relative min-h-[480px] md:min-h-[640px] overflow-hidden border-r border-rule order-2 md:order-1 bg-charcoal">
          <img
            src={topographyImg.src}
            alt="Topographic abstract of obesity prevalence"
            className="absolute inset-0 w-full h-full object-contain"
            width={1024}
            height={1280}
            loading="lazy"
          />
          <div className="absolute top-6 left-6 right-6 flex justify-between font-mono text-[10px] uppercase tracking-widest text-paper/70">
            <span>FIG. 03 &mdash; PREVALENCE TOPOGRAPHY</span>
            <span>CDC 2017&ndash;2024</span>
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-paper/70 border-t border-paper/20 pt-3">
            Higher elevation = greater prevalence
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 p-6 md:p-12 lg:p-16 flex flex-col justify-between order-1 md:order-2">
          <div>
            <div className="label-mono mb-6">§ III &mdash; Exhibit B</div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-none mb-8">
              An uneven
              <br />
              <span className="italic text-muted-ink font-light">terrain.</span>
            </h2>
            <p className="text-base text-muted-ink leading-relaxed max-w-[44ch]">
              The map of American obesity is not flat. It rises sharply in the
              South and the rural Midwest, where 23 states now report adult
              prevalence above 35%. Income, infrastructure, and food geography
              draw the contour lines.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-rule grid grid-cols-3 gap-4">
            {[
              { v: "23", l: "States > 35%" },
              { v: "0", l: "States < 20%" },
              { v: "9.2x", l: "Disparity ratio" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl tabular-nums tracking-tight">
                  {s.v}
                </div>
                <div className="label-mono mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="px-6 md:px-10 py-24 md:py-40 border-b border-rule grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-2">
          <div className="label-mono">§ IV &mdash; Note</div>
        </div>
        <blockquote className="col-span-12 md:col-span-9 font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-pretty text-paper">
          "Obesity is not a moral failing. It is a predictable biological
          response to an engineered caloric environment.
          <span className="text-muted-ink italic">
            {" "}
            The remedy is therefore engineering, not shame."
          </span>
        </blockquote>
        <div className="col-span-12 md:col-span-1" />
        <div className="col-span-12 md:col-span-9 md:col-start-3 mt-8 font-mono text-[11px] uppercase tracking-widest text-amber border-t border-rule pt-4">
          &mdash; Editorial, OBESITY.BOT &mdash; Vol. 04
        </div>
      </section>

      {/* CELLULAR */}
      <section className="grid grid-cols-12 border-b border-rule">
        <div className="col-span-12 md:col-span-4 p-6 md:p-12 lg:p-16 border-r border-rule">
          <div className="label-mono mb-6">§ V &mdash; Closing</div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tighter leading-none mb-8">
            The cell does
            <br />
            <span className="italic text-muted-ink font-light">not lie.</span>
          </h2>
          <p className="text-base text-muted-ink leading-relaxed max-w-[40ch] mb-10">
            At the cellular level, adipose tissue is an endocrine organ. It
            speaks &mdash; in leptin, in inflammation, in insulin resistance.
            The platform you are reading is an attempt to translate.
          </p>
          <Link
            href="/treatments"
            className="font-mono text-xs uppercase tracking-[0.2em] bg-amber text-charcoal px-6 py-4 hover:bg-paper transition-colors inline-block"
          >
            Continue to interventions &rarr;
          </Link>
        </div>
        <div className="col-span-12 md:col-span-8 relative min-h-[420px] md:min-h-[640px] overflow-hidden bg-ash">
          <img
            src={cellularImg.src}
            alt="Microscopic abstract of adipose cellular structure"
            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity"
            width={1024}
            height={1024}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/70" />
          <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-paper/80">
            FIG. 04 &mdash; ADIPOCYTE FIELD &mdash; 400×
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
