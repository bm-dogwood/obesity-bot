import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule mt-32">
      <div className="overflow-hidden border-b border-rule py-3">
        <div className="marquee font-display italic text-2xl text-muted-ink whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-12">
              An Atlas of Adiposity &mdash; Vol. 04 &mdash; Aggregated from CDC,
              FDA, NIH, WHO &mdash;
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-8 px-6 md:px-10 py-12">
        <div className="md:col-span-4">
          <div className="font-display text-3xl tracking-tight">
            Obesity
            <span className="text-amber font-mono text-sm align-super">
              .bot
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-ink leading-relaxed max-w-[36ch]">
            An independent reference desk on the science, treatment, and
            economics of weight. Aggregated from public datasets. Not medical
            advice.
          </p>
        </div>
        <div className="md:col-span-2 md:col-start-6">
          <div className="label-mono mb-4">Sections</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/bmi" className="link-hover">
                BMI Tool
              </Link>
            </li>
            <li>
              <Link href="/treatments" className="link-hover">
                Interventions
              </Link>
            </li>
            <li>
              <Link href="/providers" className="link-hover">
                Providers
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="label-mono mb-4">Reference</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/insurance" className="link-hover">
                Coverage
              </Link>
            </li>
            <li>
              <Link href="/statistics" className="link-hover">
                State Atlas
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3 md:col-start-10 font-mono text-[10px] uppercase tracking-widest text-muted-ink space-y-2">
          <div>ISSN 2999-0042</div>
          <div className="text-amber">Telemetry &mdash; Active</div>
          <div>&copy; 2025 OBESITY.BOT</div>
        </div>
      </div>
    </footer>
  );
}
