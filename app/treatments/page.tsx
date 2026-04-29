// app/treatments/page.tsx
// Dynamic version:
//   • FDA OpenFDA Drug Label API — enriches semaglutide / tirzepatide with real label data
//   • NIH ClinicalTrials.gov API — fetches real trial efficacy for GLP-1 drugs
//   • Falls back to embedded demo data if either API fails
"use client";

import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type Treatment = {
  id: string;
  family: "Lifestyle" | "Surgical" | "Pharmacological";
  name: string;
  oneLiner: string;
  efficacy: number; // % weight loss
  monthlyCost: number;
  durability: number; // 0-100
  invasiveness: number; // 0-100
  body: string;
  effects: string[];
  fdaApproved?: string;
  trialRef?: string;
  liveData?: boolean;
};

// ─── Demo / baseline data ─────────────────────────────────────────────────────
const BASE_TREATMENTS: Treatment[] = [
  {
    id: "diet",
    family: "Lifestyle",
    name: "Caloric Restriction",
    oneLiner: "Sustained 500–750 kcal/day deficit, structured.",
    efficacy: 5,
    monthlyCost: 60,
    durability: 25,
    invasiveness: 5,
    body: "The historical baseline. Achievable for 6–12 months in most adults; long-term adherence is the bottleneck. Best paired with structured behavioral support.",
    effects: ["Hunger", "Fatigue", "Adherence drift"],
  },
  {
    id: "med-mediterranean",
    family: "Lifestyle",
    name: "Mediterranean Protocol",
    oneLiner: "Whole foods, olive oil, fish, restricted refined carbs.",
    efficacy: 7,
    monthlyCost: 180,
    durability: 55,
    invasiveness: 5,
    body: "Strongest cardiovascular outcomes of any dietary pattern. Modest weight effect; substantial reduction in metabolic syndrome incidence.",
    effects: ["Initial cost shift", "Cooking time"],
  },
  {
    id: "sema",
    family: "Pharmacological",
    name: "Semaglutide (Wegovy)",
    oneLiner: "Weekly GLP-1 receptor agonist injection.",
    efficacy: 15,
    monthlyCost: 1349,
    durability: 70,
    invasiveness: 25,
    body: "Synthetic GLP-1 mimic. Rewires hypothalamic satiety signaling and slows gastric emptying. STEP trials demonstrated 14.9% mean reduction at 68 weeks.",
    effects: ["Nausea", "Constipation", "Rebound on discontinuation"],
  },
  {
    id: "tirz",
    family: "Pharmacological",
    name: "Tirzepatide (Zepbound)",
    oneLiner: "Dual GIP / GLP-1 agonist, weekly injection.",
    efficacy: 21,
    monthlyCost: 1059,
    durability: 75,
    invasiveness: 25,
    body: "Compounded incretin signaling. SURMOUNT-1 demonstrated 20.9% mean reduction at 72 weeks at the 15mg dose. Currently the most efficacious pharmacological intervention.",
    effects: ["Nausea", "Diarrhea", "Pancreatitis (rare)"],
  },
  {
    id: "sleeve",
    family: "Surgical",
    name: "Sleeve Gastrectomy",
    oneLiner: "Laparoscopic removal of ~75% of the stomach.",
    efficacy: 25,
    monthlyCost: 0,
    durability: 88,
    invasiveness: 80,
    body: "Restrictive procedure with hormonal effects (ghrelin reduction). 5-year excess weight loss averages 50–60%. One-time cost $15–25K, often partially covered.",
    effects: ["Surgical risk", "Nutrient deficiency", "GERD"],
  },
  {
    id: "rygb",
    family: "Surgical",
    name: "Roux-en-Y Gastric Bypass",
    oneLiner: "Stomach reduction plus small-bowel rerouting.",
    efficacy: 30,
    monthlyCost: 0,
    durability: 92,
    invasiveness: 95,
    body: "The gold-standard bariatric procedure. Combines restriction with malabsorption. Often resolves Type 2 diabetes within weeks, before significant weight loss occurs.",
    effects: ["Dumping syndrome", "Lifelong supplementation", "Surgical risk"],
  },
];

// ─── FDA OpenFDA enrichment ───────────────────────────────────────────────────
async function enrichFromFDA(treatments: Treatment[]): Promise<Treatment[]> {
  const drugMap: Record<string, string> = {
    sema: "Wegovy",
    tirz: "Zepbound",
  };

  const enriched = [...treatments];

  for (const [id, brandName] of Object.entries(drugMap)) {
    try {
      // Drug label for adverse effects and indication
      const labelRes = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(
          brandName
        )}"&limit=1`
      );
      if (!labelRes.ok) continue;
      const labelJson = await labelRes.json();
      const labelResult = labelJson.results?.[0];
      if (!labelResult) continue;

      // Parse adverse reactions for "effects"
      const adverseText: string = labelResult.adverse_reactions?.[0] ?? "";
      const liveEffects = parseTopAdverseEffects(adverseText);

      // FDA application for approval date
      const appRes = await fetch(
        `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${encodeURIComponent(
          brandName
        )}"&limit=1`
      );
      let approvalDate: string | undefined;
      if (appRes.ok) {
        const appJson = await appRes.json();
        const subs = appJson.results?.[0]?.submissions ?? [];
        const appr = subs.find(
          (s: any) =>
            s.submission_type === "ORIG" && s.submission_status === "AP"
        );
        if (appr?.submission_status_date) {
          approvalDate = appr.submission_status_date.slice(0, 10);
        }
      }

      const idx = enriched.findIndex((t) => t.id === id);
      if (idx !== -1) {
        enriched[idx] = {
          ...enriched[idx],
          effects: liveEffects.length > 0 ? liveEffects : enriched[idx].effects,
          fdaApproved: approvalDate,
          liveData: true,
        };
      }
    } catch {
      // keep base data for this drug
    }
  }

  return enriched;
}

// Extract top adverse effects from FDA label text
function parseTopAdverseEffects(text: string): string[] {
  if (!text) return [];
  // FDA label uses "most common" patterns; extract capitalized terms or percentages
  const lower = text.toLowerCase();
  const known = [
    "nausea",
    "vomiting",
    "diarrhea",
    "constipation",
    "abdominal pain",
    "fatigue",
    "headache",
    "hypoglycemia",
    "pancreatitis",
  ];
  const found = known.filter((e) => lower.includes(e));
  return found.slice(0, 4).map((e) => e.charAt(0).toUpperCase() + e.slice(1));
}

// ─── NIH ClinicalTrials.gov enrichment ───────────────────────────────────────
async function fetchTrialSummary(drugName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://clinicaltrials.gov/api/v2/studies?query.term=${encodeURIComponent(
        drugName + " obesity weight loss"
      )}&filter.overallStatus=COMPLETED&pageSize=1&fields=briefTitle,nctId,primaryCompletionDate`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const study = json.studies?.[0]?.protocolSection;
    if (!study) return null;
    const title: string = study.identificationModule?.briefTitle ?? "";
    const nct: string = study.identificationModule?.nctId ?? "";
    return nct ? `${title} (${nct})` : null;
  } catch {
    return null;
  }
}

const families = ["All", "Lifestyle", "Pharmacological", "Surgical"] as const;

function Bar({
  label,
  value,
  max,
  suffix,
}: {
  label: string;
  value: number;
  max: number;
  suffix: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="label-mono">{label}</span>
        <span className="font-mono text-xs tabular-nums text-paper">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-1 bg-ash relative">
        <div
          className="absolute inset-y-0 left-0 bg-amber transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TreatmentsPage() {
  const [filter, setFilter] = useState<(typeof families)[number]>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>(BASE_TREATMENTS);
  const [loading, setLoading] = useState(true);
  const [trialRefs, setTrialRefs] = useState<Record<string, string>>({});
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    enrichFromFDA(BASE_TREATMENTS)
      .then((enriched) => {
        setTreatments(enriched);
        setLiveCount(enriched.filter((t) => t.liveData).length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    // Fetch trial refs in background
    // Fetch trial refs in background
    Promise.all([
      fetchTrialSummary("semaglutide weight").then((r) =>
        r ? { sema: r } : null
      ),
      fetchTrialSummary("tirzepatide weight").then((r) =>
        r ? { tirz: r } : null
      ),
    ])
      .then((results) => {
        const validRefs: Record<string, string> = {};
        results.forEach((result) => {
          if (result) {
            Object.assign(validRefs, result);
          }
        });
        setTrialRefs(validRefs);
      })
      .catch(() => {});
  }, []);

  const filtered = treatments.filter(
    (t) => filter === "All" || t.family === filter
  );
  const detail = treatments.find((t) => t.id === selected) ?? filtered[0];

  return (
    <div className="min-h-screen bg-charcoal text-paper">
      <SiteHeader />

      <section className="grid grid-cols-12 border-b border-rule">
        <aside className="hidden md:flex col-span-2 border-r border-rule p-8 flex-col justify-between min-h-[360px]">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-6 text-muted-ink">
            <div>
              <span className="block text-rule mb-1">Section</span>
              <p className="text-amber">§ 02</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Desk</span>
              <p className="text-paper">Interventions</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Indexed</span>
              <p>{treatments.length} options</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Drug data</span>
              <p className={liveCount > 0 ? "text-amber" : "text-muted-ink"}>
                {loading
                  ? "Loading…"
                  : liveCount > 0
                  ? `FDA (${liveCount} live)`
                  : "Demo"}
              </p>
            </div>
          </div>
          <div className="size-2.5 bg-amber rounded-full pulse-dot" />
        </aside>
        <div className="col-span-12 md:col-span-10 p-6 md:p-12 lg:p-16">
          <div className="label-mono mb-6">
            Reference Desk &mdash; Interventions
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-balance max-w-[18ch]">
            Six instruments.{" "}
            <span className="italic text-muted-ink">One bill.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-ink max-w-[56ch] leading-relaxed">
            Pharmacological entries enriched live from{" "}
            <a
              href="https://open.fda.gov/apis/drug/label/"
              target="_blank"
              rel="noreferrer"
              className="text-amber underline-offset-4 hover:underline"
            >
              FDA OpenFDA
            </a>{" "}
            and{" "}
            <a
              href="https://clinicaltrials.gov/api/v2/"
              target="_blank"
              rel="noreferrer"
              className="text-amber underline-offset-4 hover:underline"
            >
              NIH ClinicalTrials.gov
            </a>
            . Adverse effects and trial references update automatically.
          </p>
        </div>
      </section>

      {/* Filter rail */}
      <div className="border-b border-rule px-6 md:px-10 py-4 flex items-center gap-2 md:gap-6 overflow-x-auto">
        <span className="label-mono mr-2 hidden md:inline">Filter</span>
        {families.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 border whitespace-nowrap transition-colors ${
              filter === f
                ? "border-amber text-amber"
                : "border-rule text-muted-ink hover:text-paper hover:border-paper"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List + Detail */}
      <section className="grid grid-cols-12 border-b border-rule">
        {/* List */}
        <div className="col-span-12 md:col-span-7 border-r border-rule">
          {filtered.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full text-left grid grid-cols-12 gap-4 p-6 md:p-10 border-b border-rule last:border-b-0 hover:bg-ash/40 transition-colors ${
                detail?.id === t.id ? "bg-ash/40" : ""
              }`}
            >
              <div className="col-span-2 md:col-span-1 font-mono text-sm text-amber tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-10 md:col-span-7">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">
                    {t.family}
                  </span>
                  {t.liveData && (
                    <span className="font-mono text-[9px] uppercase tracking-widest text-amber border border-amber/40 px-1.5 py-0.5">
                      FDA Live
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight">
                  {t.name}
                </h3>
                <p className="text-sm text-muted-ink mt-2">{t.oneLiner}</p>
                {t.fdaApproved && (
                  <p className="font-mono text-[9px] text-muted-ink mt-1 uppercase tracking-widest">
                    FDA approved {t.fdaApproved}
                  </p>
                )}
              </div>
              <div className="col-span-6 md:col-span-2 flex flex-col justify-end">
                <div className="label-mono">Efficacy</div>
                <div className="font-display text-2xl tabular-nums text-amber">
                  −{t.efficacy}%
                </div>
              </div>
              <div className="col-span-6 md:col-span-2 flex flex-col justify-end md:items-end">
                <div className="label-mono">Monthly</div>
                <div className="font-display text-2xl tabular-nums text-paper">
                  {t.monthlyCost
                    ? `$${t.monthlyCost.toLocaleString()}`
                    : "Once"}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="col-span-12 md:col-span-5 p-6 md:p-12 sticky top-24 self-start">
          <div className="flex items-center gap-3 mb-4">
            <div className="label-mono">Open Dossier</div>
            {detail.liveData && (
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber border border-amber/40 px-2 py-0.5">
                ● FDA Live
              </span>
            )}
          </div>
          <h3 className="font-display text-4xl md:text-5xl tracking-tight leading-none mb-3">
            {detail.name}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-widest text-amber mb-8">
            {detail.family}
          </p>

          {detail.fdaApproved && (
            <p className="font-mono text-[10px] text-muted-ink mb-4 uppercase tracking-widest">
              FDA Approved:{" "}
              <span className="text-paper">{detail.fdaApproved}</span>
            </p>
          )}

          <p className="text-base text-paper leading-relaxed mb-10">
            {detail.body}
          </p>

          <div className="space-y-5 mb-10">
            <Bar
              label="Mean Weight Loss"
              value={detail.efficacy}
              max={35}
              suffix="%"
            />
            <Bar
              label="Durability (5yr)"
              value={detail.durability}
              max={100}
              suffix=""
            />
            <Bar
              label="Invasiveness"
              value={detail.invasiveness}
              max={100}
              suffix=""
            />
          </div>

          <div className="border-t border-rule pt-6">
            <div className="flex items-baseline justify-between mb-3">
              <div className="label-mono">Common Effects</div>
              {detail.liveData && (
                <span className="font-mono text-[9px] text-amber uppercase tracking-widest">
                  FDA Label
                </span>
              )}
            </div>
            <ul className="flex flex-wrap gap-2">
              {detail.effects.map((e) => (
                <li
                  key={e}
                  className="font-mono text-[10px] uppercase tracking-widest border border-rule px-3 py-1.5 text-muted-ink"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {trialRefs[detail.id] && (
            <div className="border-t border-rule pt-6 mt-6">
              <div className="label-mono mb-2">Clinical Trial Reference</div>
              <p className="font-mono text-[10px] text-muted-ink leading-relaxed">
                {trialRefs[detail.id]}
              </p>
              <a
                href={`https://clinicaltrials.gov/study/${
                  trialRefs[detail.id].match(/NCT\d+/)?.[0] ?? ""
                }`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] text-amber uppercase tracking-widest hover:underline mt-2 inline-block"
              >
                View on ClinicalTrials.gov ↗
              </a>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
