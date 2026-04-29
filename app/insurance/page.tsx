// app/insurance/page.tsx
"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type Plan = {
  payer: string;
  type: string;
  glp1: "Covered" | "Restricted" | "Not Covered";
  bariatric: "Covered" | "Restricted" | "Not Covered";
  priorAuth: boolean;
  bmiThreshold: string;
  notes: string;
};

const plans: Plan[] = [
  {
    payer: "Medicare Part D",
    type: "Federal",
    glp1: "Restricted",
    bariatric: "Covered",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 35",
    notes:
      "Wegovy now covered for cardiovascular indication only (Mar 2024). Bariatric surgery covered with comorbidity.",
  },
  {
    payer: "Medicaid (varies by state)",
    type: "Federal/State",
    glp1: "Restricted",
    bariatric: "Restricted",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 35",
    notes:
      "16 states cover GLP-1 for obesity as of 2024. Bariatric coverage near-universal with comorbidity.",
  },
  {
    payer: "Blue Cross Blue Shield",
    type: "Commercial",
    glp1: "Restricted",
    bariatric: "Covered",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 30 + comorbidity",
    notes:
      "Plan-by-plan variation. Most require 6mo documented lifestyle attempt before pharma.",
  },
  {
    payer: "UnitedHealthcare",
    type: "Commercial",
    glp1: "Restricted",
    bariatric: "Covered",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 30 + comorbidity",
    notes: "Step therapy required: phentermine before GLP-1 in many plans.",
  },
  {
    payer: "Aetna",
    type: "Commercial",
    glp1: "Covered",
    bariatric: "Covered",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 30 + comorbidity",
    notes:
      "More permissive on GLP-1 than peers. Bariatric requires multidisciplinary eval.",
  },
  {
    payer: "Kaiser Permanente",
    type: "Integrated",
    glp1: "Restricted",
    bariatric: "Covered",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 35",
    notes:
      "Internal protocols; GLP-1 reserved for diabetes or BMI ≥ 35 with comorbidity.",
  },
  {
    payer: "Cigna",
    type: "Commercial",
    glp1: "Restricted",
    bariatric: "Covered",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 30 + comorbidity",
    notes:
      "Coverage expanding for employer groups; individual plans more restrictive.",
  },
  {
    payer: "VA Health System",
    type: "Federal",
    glp1: "Covered",
    bariatric: "Covered",
    priorAuth: true,
    bmiThreshold: "BMI ≥ 30",
    notes:
      "Most permissive coverage in U.S.; MOVE! program prerequisite for bariatric.",
  },
];

function CovBadge({ v }: { v: "Covered" | "Restricted" | "Not Covered" }) {
  const cfg = {
    Covered: { dot: "bg-amber", text: "text-amber" },
    Restricted: { dot: "bg-paper", text: "text-paper" },
    "Not Covered": { dot: "bg-rule", text: "text-muted-ink" },
  }[v];

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
      <span className={`size-1.5 rounded-full ${cfg.dot}`} />
      <span className={cfg.text}>{v}</span>
    </span>
  );
}

export default function InsurancePage() {
  const [openRow, setOpenRow] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-charcoal text-paper">
      <SiteHeader />

      <section className="grid grid-cols-12 border-b border-rule">
        <aside className="hidden md:flex col-span-2 border-r border-rule p-8 flex-col justify-between min-h-[360px]">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-6 text-muted-ink">
            <div>
              <span className="block text-rule mb-1">Section</span>
              <p className="text-amber">§ 04</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Desk</span>
              <p className="text-paper">Economics</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Indexed</span>
              <p>{plans.length} payers</p>
            </div>
          </div>
          <div className="size-2.5 bg-amber rounded-full pulse-dot" />
        </aside>

        <div className="col-span-12 md:col-span-10 p-6 md:p-12 lg:p-16">
          <div className="label-mono mb-6">Reference Desk &mdash; Coverage</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-balance max-w-[18ch]">
            Who pays. <span className="italic text-muted-ink">For what.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-ink max-w-[58ch] leading-relaxed">
            A coverage matrix for the eight major U.S. payers. The economics of
            obesity treatment are decided by prior authorization, BMI
            thresholds, and step-therapy gates &mdash; not by medical need
            alone.
          </p>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-rule grid grid-cols-2 md:grid-cols-4 divide-x divide-rule">
        {[
          { v: "$1,349", l: "Avg. Wegovy / month, retail" },
          { v: "16", l: "Medicaid states covering GLP-1" },
          { v: "78%", l: "Plans requiring prior auth" },
          { v: "6mo", l: "Typical lifestyle prereq." },
        ].map((s) => (
          <div key={s.l} className="p-6 md:p-10">
            <div className="font-display text-4xl md:text-5xl tabular-nums tracking-tight text-amber">
              {s.v}
            </div>
            <div className="label-mono mt-2">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Coverage table */}
      <section className="px-6 md:px-10 py-12">
        <div className="hidden md:grid grid-cols-12 gap-4 label-mono pb-4 border-b border-rule">
          <div className="col-span-4">Payer</div>
          <div className="col-span-2">GLP-1</div>
          <div className="col-span-2">Bariatric</div>
          <div className="col-span-2">Threshold</div>
          <div className="col-span-2 text-right">Prior Auth</div>
        </div>

        <div className="divide-y divide-rule">
          {plans.map((p, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenRow(openRow === i ? null : i)}
                className="w-full grid grid-cols-12 gap-4 py-6 text-left items-baseline hover:bg-ash/30 transition-colors px-2 -mx-2"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-ink mb-1">
                    {p.type}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                    {p.payer}
                  </h3>
                </div>
                <div className="col-span-6 md:col-span-2">
                  <CovBadge v={p.glp1} />
                </div>
                <div className="col-span-6 md:col-span-2">
                  <CovBadge v={p.bariatric} />
                </div>
                <div className="col-span-6 md:col-span-2 font-mono text-xs text-paper">
                  {p.bmiThreshold}
                </div>
                <div className="col-span-6 md:col-span-2 md:text-right font-mono text-[11px] uppercase tracking-widest text-muted-ink">
                  {p.priorAuth ? "Required" : "None"}{" "}
                  <span className="text-amber ml-2">
                    {openRow === i ? "−" : "+"}
                  </span>
                </div>
              </button>

              {openRow === i && (
                <div className="grid grid-cols-12 gap-4 pb-8 px-2 -mx-2 bg-ash/20 -mt-2">
                  <div className="col-span-12 md:col-span-4 md:col-start-1 p-4">
                    <div className="label-mono mb-2">Notes</div>
                    <p className="text-sm text-paper leading-relaxed">
                      {p.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-12 gap-8 border-t border-rule pt-8">
          <div className="col-span-12 md:col-span-3 label-mono">Glossary</div>
          <div className="col-span-12 md:col-span-9 grid md:grid-cols-3 gap-6 text-sm leading-relaxed text-muted-ink">
            <p>
              <span className="text-paper">Prior Auth.</span> Carrier approval
              required before dispensing.
            </p>
            <p>
              <span className="text-paper">Step Therapy.</span> Cheaper drug
              must fail before GLP-1 is approved.
            </p>
            <p>
              <span className="text-paper">Comorbidity.</span> Diabetes,
              hypertension, sleep apnea, dyslipidemia.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
