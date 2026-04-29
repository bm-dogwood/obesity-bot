// app/bmi/page.tsx
"use client";

import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Metadata should be in a separate layout file or use generateMetadata
// For client components, you'll need a separate layout.tsx for metadata

type Unit = "metric" | "imperial";

function classify(bmi: number) {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      risk: "Increased",
      note: "Below the lower threshold for healthy weight.",
      color: "var(--color-muted-ink)",
    };
  if (bmi < 25)
    return {
      label: "Healthy weight",
      risk: "Average",
      note: "Within the WHO-defined healthy band.",
      color: "var(--color-paper)",
    };
  if (bmi < 30)
    return {
      label: "Overweight",
      risk: "Elevated",
      note: "Cardiometabolic risk begins to climb.",
      color: "oklch(0.78 0.13 75)",
    };
  if (bmi < 35)
    return {
      label: "Obesity Class I",
      risk: "Moderate to high",
      note: "Pharmacological intervention may be indicated.",
      color: "var(--color-amber)",
    };
  if (bmi < 40)
    return {
      label: "Obesity Class II",
      risk: "High",
      note: "Combined therapy is commonly recommended.",
      color: "oklch(0.6 0.2 35)",
    };
  return {
    label: "Obesity Class III",
    risk: "Severe",
    note: "Bariatric evaluation is typically advised.",
    color: "oklch(0.55 0.22 25)",
  };
}

const bands = [
  { from: 0, to: 18.5, name: "Under" },
  { from: 18.5, to: 25, name: "Healthy" },
  { from: 25, to: 30, name: "Over" },
  { from: 30, to: 35, name: "Class I" },
  { from: 35, to: 40, name: "Class II" },
  { from: 40, to: 50, name: "Class III" },
];

export default function BmiPage() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(75);
  const [waistCm, setWaistCm] = useState(85);
  const [age, setAge] = useState(34);

  const bmi = useMemo(() => {
    const m = heightCm / 100;
    return m > 0 ? weightKg / (m * m) : 0;
  }, [heightCm, weightKg]);

  const whtr = useMemo(
    () => (heightCm > 0 ? waistCm / heightCm : 0),
    [waistCm, heightCm]
  );
  const cls = classify(bmi);

  const markerLeft = `${Math.min(
    100,
    Math.max(0, ((bmi - 14) / (50 - 14)) * 100)
  )}%`;

  return (
    <div className="min-h-screen bg-charcoal text-paper">
      <SiteHeader />

      <section className="grid grid-cols-12 border-b border-rule">
        <aside className="hidden md:flex col-span-2 border-r border-rule p-8 flex-col justify-between min-h-[400px]">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-6 text-muted-ink">
            <div>
              <span className="block text-rule mb-1">Section</span>
              <p className="text-amber">§ 01</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Tool</span>
              <p className="text-paper">Diagnostic</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Method</span>
              <p>WHO + CDC</p>
            </div>
          </div>
          <div className="size-2.5 bg-amber rounded-full pulse-dot" />
        </aside>
        <div className="col-span-12 md:col-span-10 p-6 md:p-12 lg:p-16">
          <div className="label-mono mb-6">
            Reference Desk &mdash; Diagnostic
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-balance max-w-[16ch]">
            What the number{" "}
            <span className="italic text-muted-ink">means,</span> and what it
            doesn&apos;t.
          </h1>
          <p className="mt-8 text-lg text-muted-ink max-w-[56ch] leading-relaxed">
            BMI is a 19th-century actuarial shortcut, not a clinical truth. Used
            carefully &mdash; alongside waist-to-height ratio and context
            &mdash; it remains the standard population screen. Compute yours
            below.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="grid grid-cols-12 border-b border-rule">
        {/* Inputs */}
        <div className="col-span-12 md:col-span-5 border-r border-rule p-6 md:p-12">
          <div className="flex items-center justify-between mb-10">
            <div className="label-mono">Inputs</div>
            <div className="flex border border-rule font-mono text-[10px] uppercase tracking-widest">
              {(["metric", "imperial"] as Unit[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-4 py-2 transition-colors ${
                    unit === u
                      ? "bg-amber text-charcoal"
                      : "text-muted-ink hover:text-paper"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <Field
            label="Height"
            unitLabel={unit === "metric" ? "cm" : "in"}
            value={unit === "metric" ? heightCm : Math.round(heightCm / 2.54)}
            min={unit === "metric" ? 120 : 48}
            max={unit === "metric" ? 220 : 87}
            onChange={(v) =>
              setHeightCm(unit === "metric" ? v : Math.round(v * 2.54))
            }
          />
          <Field
            label="Weight"
            unitLabel={unit === "metric" ? "kg" : "lb"}
            value={unit === "metric" ? weightKg : Math.round(weightKg * 2.2046)}
            min={unit === "metric" ? 35 : 77}
            max={unit === "metric" ? 200 : 440}
            onChange={(v) =>
              setWeightKg(unit === "metric" ? v : Math.round(v / 2.2046))
            }
          />
          <Field
            label="Waist"
            unitLabel={unit === "metric" ? "cm" : "in"}
            value={unit === "metric" ? waistCm : Math.round(waistCm / 2.54)}
            min={unit === "metric" ? 50 : 20}
            max={unit === "metric" ? 160 : 63}
            onChange={(v) =>
              setWaistCm(unit === "metric" ? v : Math.round(v * 2.54))
            }
          />
          <Field
            label="Age"
            unitLabel="yr"
            value={age}
            min={18}
            max={90}
            onChange={setAge}
          />
        </div>

        {/* Output */}
        <div className="col-span-12 md:col-span-7 p-6 md:p-12 lg:p-16">
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <div className="label-mono mb-4">Body Mass Index</div>
              <div
                className="font-display text-7xl md:text-9xl tabular-nums tracking-tighter leading-none"
                style={{ color: cls.color }}
              >
                {bmi.toFixed(1)}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest mt-4 text-paper">
                {cls.label}
              </div>
            </div>
            <div className="border-l border-rule pl-12">
              <div className="label-mono mb-4">Waist-to-height</div>
              <div className="font-display text-5xl md:text-6xl tabular-nums tracking-tighter">
                {whtr.toFixed(2)}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest mt-4 text-muted-ink">
                {whtr < 0.5
                  ? "Within target"
                  : whtr < 0.6
                  ? "Increased"
                  : "High"}
              </div>
            </div>
          </div>

          {/* Spectrum */}
          <div className="mb-10">
            <div className="label-mono mb-4">
              Spectrum &mdash; CDC Classification
            </div>
            <div className="relative h-16 border border-rule">
              <div className="absolute inset-0 grid grid-cols-6">
                {bands.map((b, i) => (
                  <div
                    key={i}
                    className="border-r border-rule last:border-r-0 flex flex-col justify-end p-2"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-widest text-muted-ink">
                      {b.name}
                    </div>
                    <div className="font-mono text-[9px] tabular-nums text-rule">
                      {b.from}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="absolute top-0 bottom-0 w-px bg-amber transition-all duration-300"
                style={{ left: markerLeft }}
              >
                <div className="absolute -top-3 -translate-x-1/2 size-3 rotate-45 bg-amber" />
                <div className="absolute -bottom-6 -translate-x-1/2 font-mono text-[10px] text-amber tabular-nums">
                  {bmi.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-rule pt-8">
            <div className="label-mono mb-3">Risk Reading</div>
            <p className="font-display text-2xl md:text-3xl leading-snug text-pretty">
              <span className="text-amber">{cls.risk}.</span>{" "}
              <span className="text-paper">{cls.note}</span>
            </p>
            <p className="text-sm text-muted-ink mt-6 max-w-[60ch] leading-relaxed">
              BMI does not distinguish lean mass from adipose tissue. Athletes
              routinely register &quot;overweight&quot; by BMI alone. Combine
              with waist-to-height ratio (target {"< 0.5"}), metabolic panel,
              and a clinician&apos;s reading.
            </p>
          </div>
        </div>
      </section>

      {/* Method footer */}
      <section className="px-6 md:px-10 py-20 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3 label-mono">
          Method &mdash; Notes
        </div>
        <div className="col-span-12 md:col-span-9 grid md:grid-cols-3 gap-8 text-sm leading-relaxed text-muted-ink">
          <p>
            <span className="text-paper">Formula.</span> BMI = kg / m².
            Identical to Quetelet&apos;s 1832 index.
          </p>
          <p>
            <span className="text-paper">Limitations.</span> Insensitive to body
            composition, age, ethnicity, frame.
          </p>
          <p>
            <span className="text-paper">Better used with.</span> Waist
            circumference, A1C, lipid panel, blood pressure.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  unitLabel,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  unitLabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-8 border-b border-rule pb-6 last:border-b-0">
      <div className="flex justify-between items-baseline mb-3">
        <label className="label-mono">{label}</label>
        <div className="flex items-baseline gap-2">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-transparent border-b border-amber font-display text-3xl tabular-nums w-24 text-right text-paper focus:outline-none"
          />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-ink">
            {unitLabel}
          </span>
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-amber"
      />
    </div>
  );
}
