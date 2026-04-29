import Link from "next/link";

const nav = [
  { href: "/" as const, label: "Index" },
  { href: "/bmi" as const, label: "BMI Tool" },
  { href: "/treatments" as const, label: "Interventions" },
  { href: "/providers" as const, label: "Providers" },
  { href: "/insurance" as const, label: "Coverage" },
  { href: "/statistics" as const, label: "Atlas" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-charcoal/85 backdrop-blur border-b border-rule">
      <div className="flex justify-between items-center px-6 md:px-10 py-4">
        <Link href="/" className="flex items-baseline gap-1 group">
          <span className="font-display text-2xl md:text-3xl font-medium tracking-tight text-paper">
            Obesity
          </span>
          <span className="font-mono text-[10px] text-amber font-bold uppercase tracking-widest">
            .bot
          </span>
          <span className="hidden md:inline-block ml-3 size-1.5 rounded-full bg-amber pulse-dot" />
        </Link>
        <nav className="hidden md:flex gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-ink">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-hover hover:text-paper transition-colors"
              {...(item.href === "/" ? { "aria-current": "page" } : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden font-mono text-[10px] text-muted-ink">
          VOL.04
        </div>
      </div>
      <div className="md:hidden flex gap-4 px-6 py-3 border-t border-rule overflow-x-auto font-mono text-[10px] uppercase tracking-widest text-muted-ink">
        {nav.slice(1).map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
