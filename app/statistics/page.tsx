// app/statistics/page.tsx
"use client";

import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// CDC BRFSS adult obesity prevalence (approx 2022-2023)
const states: {
  name: string;
  abbr: string;
  rate: number;
  region: string;
}[] = [
  { name: "West Virginia", abbr: "WV", rate: 41.0, region: "South" },
  { name: "Louisiana", abbr: "LA", rate: 40.1, region: "South" },
  { name: "Oklahoma", abbr: "OK", rate: 40.0, region: "South" },
  { name: "Mississippi", abbr: "MS", rate: 39.5, region: "South" },
  { name: "Arkansas", abbr: "AR", rate: 38.7, region: "South" },
  { name: "Tennessee", abbr: "TN", rate: 38.7, region: "South" },
  { name: "Alabama", abbr: "AL", rate: 38.3, region: "South" },
  { name: "Kentucky", abbr: "KY", rate: 37.7, region: "South" },
  { name: "South Carolina", abbr: "SC", rate: 37.1, region: "South" },
  { name: "Iowa", abbr: "IA", rate: 36.5, region: "Midwest" },
  { name: "Indiana", abbr: "IN", rate: 36.4, region: "Midwest" },
  { name: "Missouri", abbr: "MO", rate: 36.4, region: "Midwest" },
  { name: "Ohio", abbr: "OH", rate: 36.0, region: "Midwest" },
  { name: "Kansas", abbr: "KS", rate: 35.9, region: "Midwest" },
  { name: "Nebraska", abbr: "NE", rate: 35.9, region: "Midwest" },
  { name: "Texas", abbr: "TX", rate: 35.5, region: "South" },
  { name: "Michigan", abbr: "MI", rate: 35.3, region: "Midwest" },
  { name: "Wisconsin", abbr: "WI", rate: 35.0, region: "Midwest" },
  { name: "Georgia", abbr: "GA", rate: 35.0, region: "South" },
  { name: "North Carolina", abbr: "NC", rate: 34.9, region: "South" },
  { name: "Illinois", abbr: "IL", rate: 34.4, region: "Midwest" },
  { name: "Minnesota", abbr: "MN", rate: 33.6, region: "Midwest" },
  { name: "Pennsylvania", abbr: "PA", rate: 33.4, region: "Northeast" },
  { name: "Virginia", abbr: "VA", rate: 33.4, region: "South" },
  { name: "Maine", abbr: "ME", rate: 32.6, region: "Northeast" },
  { name: "Arizona", abbr: "AZ", rate: 32.5, region: "West" },
  { name: "New Mexico", abbr: "NM", rate: 32.4, region: "West" },
  { name: "Oregon", abbr: "OR", rate: 31.7, region: "West" },
  { name: "Washington", abbr: "WA", rate: 30.8, region: "West" },
  { name: "Florida", abbr: "FL", rate: 30.7, region: "South" },
  { name: "New York", abbr: "NY", rate: 30.0, region: "Northeast" },
  { name: "Nevada", abbr: "NV", rate: 30.6, region: "West" },
  { name: "Maryland", abbr: "MD", rate: 32.5, region: "South" },
  { name: "Delaware", abbr: "DE", rate: 35.5, region: "South" },
  { name: "New Jersey", abbr: "NJ", rate: 30.4, region: "Northeast" },
  { name: "Connecticut", abbr: "CT", rate: 30.0, region: "Northeast" },
  { name: "Rhode Island", abbr: "RI", rate: 31.6, region: "Northeast" },
  { name: "New Hampshire", abbr: "NH", rate: 31.5, region: "Northeast" },
  { name: "Vermont", abbr: "VT", rate: 28.9, region: "Northeast" },
  { name: "Massachusetts", abbr: "MA", rate: 27.2, region: "Northeast" },
  { name: "California", abbr: "CA", rate: 28.1, region: "West" },
  { name: "Utah", abbr: "UT", rate: 30.1, region: "West" },
  { name: "Idaho", abbr: "ID", rate: 32.2, region: "West" },
  { name: "Montana", abbr: "MT", rate: 30.5, region: "West" },
  { name: "Wyoming", abbr: "WY", rate: 32.6, region: "West" },
  { name: "North Dakota", abbr: "ND", rate: 35.4, region: "Midwest" },
  { name: "South Dakota", abbr: "SD", rate: 35.6, region: "Midwest" },
  { name: "Alaska", abbr: "AK", rate: 32.2, region: "West" },
  { name: "Hawaii", abbr: "HI", rate: 25.9, region: "West" },
  { name: "Colorado", abbr: "CO", rate: 25.0, region: "West" },
  { name: "DC", abbr: "DC", rate: 24.7, region: "South" },
];

const regions = ["All", "South", "Midwest", "Northeast", "West"] as const;
type Sort = "rate-desc" | "rate-asc" | "name";

export default function StatsPage() {
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [sort, setSort] = useState<Sort>("rate-desc");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let r = states.filter((s) => region === "All" || s.region === region);
    if (sort === "rate-desc") r = [...r].sort((a, b) => b.rate - a.rate);
    if (sort === "rate-asc") r = [...r].sort((a, b) => a.rate - b.rate);
    if (sort === "name")
      r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [region, sort]);

  const max = Math.max(...states.map((s) => s.rate));
  const min = Math.min(...states.map((s) => s.rate));
  const mean = states.reduce((a, b) => a + b.rate, 0) / states.length;

  return (
    <div className="min-h-screen bg-charcoal text-paper">
      <SiteHeader />

      <section className="grid grid-cols-12 border-b border-rule">
        <aside className="hidden md:flex col-span-2 border-r border-rule p-8 flex-col justify-between min-h-[360px]">
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-6 text-muted-ink">
            <div>
              <span className="block text-rule mb-1">Section</span>
              <p className="text-amber">§ 05</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Desk</span>
              <p className="text-paper">Atlas</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Source</span>
              <p>CDC BRFSS</p>
            </div>
            <div>
              <span className="block text-rule mb-1">Year</span>
              <p className="text-amber">2023</p>
            </div>
          </div>
          <div className="size-2.5 bg-amber rounded-full pulse-dot" />
        </aside>
        <div className="col-span-12 md:col-span-10 p-6 md:p-12 lg:p-16">
          <div className="label-mono mb-6">
            Reference Desk &mdash; State Atlas
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-balance max-w-[14ch]">
            Fifty <span className="italic text-muted-ink">elevations.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-ink max-w-[58ch] leading-relaxed">
            Adult obesity prevalence (BMI ≥ 30) by U.S. state, drawn from the
            CDC&apos;s Behavioral Risk Factor Surveillance System. The terrain
            is steep, and unevenly so.
          </p>
        </div>
      </section>

      {/* Summary strip */}
      <section className="border-b border-rule grid grid-cols-2 md:grid-cols-4 divide-x divide-rule">
        {[
          {
            v: `${max.toFixed(1)}%`,
            l: "Highest (West Virginia)",
          },
          { v: `${min.toFixed(1)}%`, l: "Lowest (DC)" },
          { v: `${mean.toFixed(1)}%`, l: "Mean across states" },
          {
            v: states.filter((s) => s.rate >= 35).length.toString(),
            l: "States ≥ 35%",
          },
        ].map((s) => (
          <div key={s.l} className="p-6 md:p-10">
            <div className="font-display text-4xl md:text-5xl tabular-nums tracking-tight text-amber">
              {s.v}
            </div>
            <div className="label-mono mt-2">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Controls */}
      <div className="border-b border-rule px-6 md:px-10 py-4 flex flex-wrap items-center gap-3 md:gap-6">
        <span className="label-mono mr-2">Region</span>
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-colors ${
              region === r
                ? "border-amber text-amber"
                : "border-rule text-muted-ink hover:text-paper hover:border-paper"
            }`}
          >
            {r}
          </button>
        ))}
        <span className="label-mono ml-auto mr-2 hidden md:inline">Sort</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="bg-transparent border border-rule font-mono text-[10px] uppercase tracking-widest text-paper px-3 py-1.5 hover:border-amber transition-colors"
        >
          <option value="rate-desc">Highest first</option>
          <option value="rate-asc">Lowest first</option>
          <option value="name">A → Z</option>
        </select>
      </div>

      {/* Bar chart visualization */}
      <section className="px-6 md:px-10 py-12">
        <div className="label-mono mb-8">Fig. 05 &mdash; Prevalence Bars</div>
        <div className="space-y-1">
          {filtered.map((s) => {
            const pct = (s.rate / 50) * 100;
            const isHi = s.rate >= 35;
            const isHover = hovered === s.abbr;
            return (
              <div
                key={s.abbr}
                onMouseEnter={() => setHovered(s.abbr)}
                onMouseLeave={() => setHovered(null)}
                className="grid grid-cols-12 gap-2 md:gap-4 items-center group cursor-default"
              >
                <div className="col-span-3 md:col-span-2 font-mono text-xs text-muted-ink group-hover:text-paper transition-colors flex items-center gap-2">
                  <span className="text-amber tabular-nums">{s.abbr}</span>
                  <span className="hidden md:inline truncate">{s.name}</span>
                </div>
                <div className="col-span-7 md:col-span-9 relative h-7 bg-ash/30">
                  <div
                    className="absolute inset-y-0 left-0 transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: isHover
                        ? "var(--color-amber)"
                        : isHi
                        ? "var(--color-amber-deep)"
                        : "var(--color-muted-ink)",
                    }}
                  />
                  <div
                    className="absolute inset-y-0 left-[70%] w-px bg-rule"
                    title="35% threshold"
                  />
                </div>
                <div className="col-span-2 md:col-span-1 text-right font-mono text-xs tabular-nums text-paper">
                  {s.rate.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-rule font-mono text-[10px] uppercase tracking-widest text-muted-ink">
          <span className="flex items-center gap-2">
            <span className="size-2 bg-muted-ink" /> Below 35%
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2 bg-amber-deep" /> 35% or higher
          </span>
          <span className="flex items-center gap-2">
            <span className="w-px h-3 bg-rule" /> CDC threshold
          </span>
          <span className="ml-auto">Source: CDC BRFSS, 2023</span>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
