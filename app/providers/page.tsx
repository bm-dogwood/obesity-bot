// app/providers/page.tsx
"use client";

import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type Provider = {
  name: string;
  type:
    | "Bariatric Center"
    | "Endocrinology"
    | "Obesity Medicine"
    | "Multidisciplinary";
  city: string;
  state: string;
  zipPrefix: string;
  acc: string;
  modalities: string[];
  rating: number;
};

const providers: Provider[] = [
  {
    name: "Cleveland Clinic — Bariatric & Metabolic Institute",
    type: "Bariatric Center",
    city: "Cleveland",
    state: "OH",
    zipPrefix: "441",
    acc: "MBSAQIP",
    modalities: ["RYGB", "Sleeve", "GLP-1"],
    rating: 4.9,
  },
  {
    name: "Mass General Weight Center",
    type: "Multidisciplinary",
    city: "Boston",
    state: "MA",
    zipPrefix: "021",
    acc: "MBSAQIP",
    modalities: ["GLP-1", "Behavioral", "Surgery"],
    rating: 4.8,
  },
  {
    name: "UCLA Center for Obesity Medicine",
    type: "Obesity Medicine",
    city: "Los Angeles",
    state: "CA",
    zipPrefix: "900",
    acc: "ABOM",
    modalities: ["GLP-1", "Lifestyle"],
    rating: 4.7,
  },
  {
    name: "NYU Langone Bariatric Surgery",
    type: "Bariatric Center",
    city: "New York",
    state: "NY",
    zipPrefix: "100",
    acc: "MBSAQIP",
    modalities: ["RYGB", "Sleeve", "Revision"],
    rating: 4.6,
  },
  {
    name: "Joslin Diabetes Center — Weight Mgmt",
    type: "Endocrinology",
    city: "Boston",
    state: "MA",
    zipPrefix: "022",
    acc: "ABOM",
    modalities: ["GLP-1", "Diabetes Co-mgmt"],
    rating: 4.7,
  },
  {
    name: "Mayo Clinic Obesity Program",
    type: "Multidisciplinary",
    city: "Rochester",
    state: "MN",
    zipPrefix: "559",
    acc: "MBSAQIP",
    modalities: ["Surgery", "GLP-1", "Behavioral"],
    rating: 4.9,
  },
  {
    name: "Houston Methodist Weight Mgmt",
    type: "Bariatric Center",
    city: "Houston",
    state: "TX",
    zipPrefix: "770",
    acc: "MBSAQIP",
    modalities: ["Sleeve", "GLP-1"],
    rating: 4.5,
  },
  {
    name: "Northwestern Medicine Bariatrics",
    type: "Bariatric Center",
    city: "Chicago",
    state: "IL",
    zipPrefix: "606",
    acc: "MBSAQIP",
    modalities: ["RYGB", "Sleeve"],
    rating: 4.6,
  },
  {
    name: "Stanford Obesity Medicine Clinic",
    type: "Obesity Medicine",
    city: "Palo Alto",
    state: "CA",
    zipPrefix: "943",
    acc: "ABOM",
    modalities: ["GLP-1", "Genomic"],
    rating: 4.8,
  },
  {
    name: "Emory Bariatric Center",
    type: "Bariatric Center",
    city: "Atlanta",
    state: "GA",
    zipPrefix: "303",
    acc: "MBSAQIP",
    modalities: ["RYGB", "Sleeve", "GLP-1"],
    rating: 4.5,
  },
  {
    name: "UCSF Weight Management",
    type: "Multidisciplinary",
    city: "San Francisco",
    state: "CA",
    zipPrefix: "941",
    acc: "ABOM",
    modalities: ["GLP-1", "Surgery", "Pediatric"],
    rating: 4.7,
  },
  {
    name: "Johns Hopkins Bariatric Surgery",
    type: "Bariatric Center",
    city: "Baltimore",
    state: "MD",
    zipPrefix: "212",
    acc: "MBSAQIP",
    modalities: ["RYGB", "Revision"],
    rating: 4.6,
  },
];

const types = [
  "All",
  "Bariatric Center",
  "Endocrinology",
  "Obesity Medicine",
  "Multidisciplinary",
] as const;

export default function ProvidersPage() {
  const [zip, setZip] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");

  const results = useMemo(() => {
    return providers
      .filter((p) => type === "All" || p.type === type)
      .filter(
        (p) => !zip || p.zipPrefix.startsWith(zip.slice(0, 3)) || zip.length < 3
      )
      .sort((a, b) => {
        if (zip.length >= 3) {
          const da = Math.abs(
            parseInt(a.zipPrefix) - parseInt(zip.slice(0, 3))
          );
          const db = Math.abs(
            parseInt(b.zipPrefix) - parseInt(zip.slice(0, 3))
          );
          return da - db;
        }
        return b.rating - a.rating;
      });
  }, [zip, type]);

  return (
    <div className="min-h-screen bg-charcoal text-paper">
      <SiteHeader />

      <section className="grid grid-cols-12 border-b border-rule">
        <aside className="hidden md:flex col-span-2 border-r border-rule p-8 flex-col justify-between min-h-[360px]">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-6 text-muted-ink">
            <div>
              <span className="block text-rule mb-1">Section</span>
              <p className="text-amber">§ 03</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Desk</span>
              <p className="text-paper">Geography</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Indexed</span>
              <p>{providers.length} centers</p>
            </div>
          </div>
          <div className="size-2.5 bg-amber rounded-full pulse-dot" />
        </aside>
        <div className="col-span-12 md:col-span-10 p-6 md:p-12 lg:p-16">
          <div className="label-mono mb-6">
            Reference Desk &mdash; Geography
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-balance max-w-[16ch]">
            Where the <span className="italic text-muted-ink">qualified</span>{" "}
            practice.
          </h1>
          <p className="mt-8 text-lg text-muted-ink max-w-[56ch] leading-relaxed">
            A working index of MBSAQIP-accredited bariatric centers and
            ABOM-certified obesity-medicine practitioners. Filter by zip and
            modality.
          </p>
        </div>
      </section>

      {/* Search bar */}
      <section className="border-b border-rule grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 border-r border-rule p-6 md:p-8">
          <label className="label-mono block mb-4">Zip Code</label>
          <input
            type="text"
            value={zip}
            onChange={(e) =>
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5))
            }
            placeholder="e.g. 02114"
            className="w-full bg-transparent border-b border-amber font-display text-5xl md:text-6xl tabular-nums text-paper focus:outline-none placeholder:text-rule pb-2"
          />
          <p className="font-mono text-[10px] text-muted-ink uppercase tracking-widest mt-4">
            5-digit U.S. postal code
          </p>
        </div>
        <div className="col-span-12 md:col-span-8 p-6 md:p-8 flex flex-col justify-end">
          <label className="label-mono block mb-4">Type of Practice</label>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-colors ${
                  type === t
                    ? "border-amber text-amber"
                    : "border-rule text-muted-ink hover:text-paper hover:border-paper"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 md:px-10 py-12">
        <div className="flex justify-between items-baseline mb-8 border-b border-rule pb-4">
          <div className="label-mono">Results</div>
          <div className="font-mono text-xs tabular-nums text-paper">
            {results.length.toString().padStart(2, "0")}{" "}
            <span className="text-muted-ink">/ {providers.length}</span>
          </div>
        </div>
        {results.length === 0 ? (
          <div className="py-32 text-center">
            <div className="font-display text-3xl italic text-muted-ink">
              No record matches.
            </div>
            <p className="text-sm text-muted-ink mt-3">
              Try a different zip prefix or broaden the filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-rule border-y border-rule">
            {results.map((p, i) => (
              <article
                key={i}
                className="grid grid-cols-12 gap-4 py-8 group hover:bg-ash/30 px-2 -mx-2 transition-colors"
              >
                <div className="col-span-2 md:col-span-1 font-mono text-sm text-amber tabular-nums pt-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10 md:col-span-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-ink mb-2">
                    {p.type} &mdash; {p.acc}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-ink mt-2">
                    {p.city}, {p.state} &mdash; {p.zipPrefix}xx
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 flex flex-wrap gap-2 items-start pt-1">
                  {p.modalities.map((m) => (
                    <span
                      key={m}
                      className="font-mono text-[10px] uppercase tracking-widest border border-rule px-2.5 py-1 text-muted-ink group-hover:border-amber group-hover:text-amber transition-colors"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <div className="col-span-12 md:col-span-2 flex md:flex-col md:items-end justify-between md:justify-end gap-2">
                  <div>
                    <div className="label-mono md:text-right">Rating</div>
                    <div className="font-display text-3xl tabular-nums text-paper md:text-right">
                      {p.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-ink mt-8">
          Listings are illustrative. Verify accreditation directly with MBSAQIP
          and ABOM.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
