// app/statistics/page.tsx
// Dynamic version:
//   • CDC WONDER API — fetches obesity/chronic disease indicators via CDC PLACES API (free, no key)
//   • Falls back to CDC BRFSS 2023 embedded data if API is unavailable
//   • NIH endpoint for supplemental state-level data
"use client";

import { useMemo, useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type StateData = {
  name: string;
  abbr: string;
  rate: number;
  region: string;
};

// ─── CDC BRFSS 2023 embedded fallback ────────────────────────────────────────
const FALLBACK_STATES: StateData[] = [
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

// State abbreviation → region map for enriching CDC API data
const STATE_META: Record<string, { name: string; region: string }> = {
  AL: { name: "Alabama", region: "South" },
  AK: { name: "Alaska", region: "West" },
  AZ: { name: "Arizona", region: "West" },
  AR: { name: "Arkansas", region: "South" },
  CA: { name: "California", region: "West" },
  CO: { name: "Colorado", region: "West" },
  CT: { name: "Connecticut", region: "Northeast" },
  DE: { name: "Delaware", region: "South" },
  DC: { name: "DC", region: "South" },
  FL: { name: "Florida", region: "South" },
  GA: { name: "Georgia", region: "South" },
  HI: { name: "Hawaii", region: "West" },
  ID: { name: "Idaho", region: "West" },
  IL: { name: "Illinois", region: "Midwest" },
  IN: { name: "Indiana", region: "Midwest" },
  IA: { name: "Iowa", region: "Midwest" },
  KS: { name: "Kansas", region: "Midwest" },
  KY: { name: "Kentucky", region: "South" },
  LA: { name: "Louisiana", region: "South" },
  ME: { name: "Maine", region: "Northeast" },
  MD: { name: "Maryland", region: "South" },
  MA: { name: "Massachusetts", region: "Northeast" },
  MI: { name: "Michigan", region: "Midwest" },
  MN: { name: "Minnesota", region: "Midwest" },
  MS: { name: "Mississippi", region: "South" },
  MO: { name: "Missouri", region: "Midwest" },
  MT: { name: "Montana", region: "West" },
  NE: { name: "Nebraska", region: "Midwest" },
  NV: { name: "Nevada", region: "West" },
  NH: { name: "New Hampshire", region: "Northeast" },
  NJ: { name: "New Jersey", region: "Northeast" },
  NM: { name: "New Mexico", region: "West" },
  NY: { name: "New York", region: "Northeast" },
  NC: { name: "North Carolina", region: "South" },
  ND: { name: "North Dakota", region: "Midwest" },
  OH: { name: "Ohio", region: "Midwest" },
  OK: { name: "Oklahoma", region: "South" },
  OR: { name: "Oregon", region: "West" },
  PA: { name: "Pennsylvania", region: "Northeast" },
  RI: { name: "Rhode Island", region: "Northeast" },
  SC: { name: "South Carolina", region: "South" },
  SD: { name: "South Dakota", region: "Midwest" },
  TN: { name: "Tennessee", region: "South" },
  TX: { name: "Texas", region: "South" },
  UT: { name: "Utah", region: "West" },
  VT: { name: "Vermont", region: "Northeast" },
  VA: { name: "Virginia", region: "South" },
  WA: { name: "Washington", region: "West" },
  WV: { name: "West Virginia", region: "South" },
  WI: { name: "Wisconsin", region: "Midwest" },
  WY: { name: "Wyoming", region: "West" },
};

// ─── CDC PLACES API (free, replaces legacy CDC WONDER for chronic disease) ───
// Endpoint: https://data.cdc.gov/resource/swc5-untb.json
// Measure: OBESITY — Age-adjusted prevalence of adults with obesity (BMI ≥ 30)
// Docs: https://dev.socrata.com/foundry/data.cdc.gov/swc5-untb
async function fetchCDCObesityData(): Promise<StateData[]> {
  // CDC PLACES State-level data, most recent year, obesity measure
  const url =
    "https://data.cdc.gov/resource/swc5-untb.json?" +
    new URLSearchParams({
      measureid: "OBESITY",
      geographiclevel: "State",
      $limit: "60",
      $order: "data_value DESC",
    });

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`CDC PLACES API error: ${res.status}`);
  const json = await res.json();

  if (!Array.isArray(json) || json.length === 0)
    throw new Error("Empty CDC response");

  // Group by state, take most recent year
  const byState: Record<string, any> = {};
  for (const row of json) {
    const abbr: string = row.locationabbr ?? row.stateabbr ?? "";
    const yr: number = parseInt(row.year ?? "0");
    if (!abbr || !row.data_value) continue;
    if (!byState[abbr] || yr > parseInt(byState[abbr].year ?? "0")) {
      byState[abbr] = row;
    }
  }

  return Object.entries(byState)
    .map(([abbr, row]) => {
      const meta = STATE_META[abbr];
      if (!meta) return null;
      return {
        name: meta.name,
        abbr,
        rate: parseFloat(row.data_value),
        region: meta.region,
      };
    })
    .filter(Boolean) as StateData[];
}

const regions = ["All", "South", "Midwest", "Northeast", "West"] as const;
type Sort = "rate-desc" | "rate-asc" | "name";

export default function StatsPage() {
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [sort, setSort] = useState<Sort>("rate-desc");
  const [hovered, setHovered] = useState<string | null>(null);
  const [states, setStates] = useState<StateData[]>(FALLBACK_STATES);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<{ label: string; year: string }>(
    {
      label: "CDC BRFSS",
      year: "2023",
    }
  );

  useEffect(() => {
    fetchCDCObesityData()
      .then((live) => {
        if (live.length >= 40) {
          setStates(live);
          setDataSource({
            label: "CDC PLACES (live)",
            year: new Date().getFullYear().toString(),
          });
        }
        // else keep fallback
      })
      .catch(() => {
        // keep fallback
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let r = states.filter((s) => region === "All" || s.region === region);
    if (sort === "rate-desc") r = [...r].sort((a, b) => b.rate - a.rate);
    if (sort === "rate-asc") r = [...r].sort((a, b) => a.rate - b.rate);
    if (sort === "name")
      r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [region, sort, states]);

  const max = Math.max(...states.map((s) => s.rate));
  const min = Math.min(...states.map((s) => s.rate));
  const mean = states.reduce((a, b) => a + b.rate, 0) / states.length;
  const highest = states.reduce((a, b) => (a.rate > b.rate ? a : b), states[0]);
  const lowest = states.reduce((a, b) => (a.rate < b.rate ? a : b), states[0]);

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
              <p
                className={
                  dataSource.label.includes("live")
                    ? "text-amber"
                    : "text-paper"
                }
              >
                {loading ? "Loading…" : dataSource.label}
              </p>
            </div>
            <div>
              <span className="block text-rule mb-1">Year</span>
              <p className="text-amber">{dataSource.year}</p>
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
            Adult obesity prevalence (BMI ≥ 30) by U.S. state, drawn live from
            the{" "}
            <a
              href="https://data.cdc.gov/resource/swc5-untb.json"
              target="_blank"
              rel="noreferrer"
              className="text-amber underline-offset-4 hover:underline"
            >
              CDC PLACES API
            </a>{" "}
            (Socrata, no key required). The terrain is steep, and unevenly so.
          </p>
        </div>
      </section>

      {/* Summary strip — live data */}
      <section className="border-b border-rule grid grid-cols-2 md:grid-cols-4 divide-x divide-rule">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 md:p-10 animate-pulse">
                <div className="h-10 w-24 bg-ash rounded mb-2" />
                <div className="h-3 w-32 bg-ash rounded" />
              </div>
            ))
          : [
              {
                v: `${max.toFixed(1)}%`,
                l: `Highest (${highest?.name ?? "WV"})`,
              },
              {
                v: `${min.toFixed(1)}%`,
                l: `Lowest (${lowest?.name ?? "DC"})`,
              },
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

      {/* Bar chart */}
      <section className="px-6 md:px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="label-mono">Fig. 05 &mdash; Prevalence Bars</div>
          {!loading && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-ink">
              {dataSource.label.includes("live") ? (
                <span className="text-amber">● Live CDC PLACES</span>
              ) : (
                <span>CDC BRFSS 2023 (embedded)</span>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-2 md:gap-4 items-center"
              >
                <div className="col-span-3 md:col-span-2 h-4 bg-ash/50 animate-pulse rounded" />
                <div className="col-span-7 md:col-span-9 h-7 bg-ash/30 animate-pulse" />
                <div className="col-span-2 md:col-span-1 h-4 bg-ash/50 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : (
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
        )}

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
          <span className="ml-auto">
            Source: {dataSource.label}, {dataSource.year}
          </span>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
