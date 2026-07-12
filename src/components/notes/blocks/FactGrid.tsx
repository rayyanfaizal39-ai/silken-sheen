export function FactGrid({ heading, facts }: { heading?: string; facts: string[] }) {
  return (
    <div>
      {heading && <h4 className="font-display mb-3 text-sm font-bold text-foreground">{heading}</h4>}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {facts.map((fact, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-3.5 text-[13px] leading-relaxed text-emerald-100"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-[11px] font-bold text-emerald-300">
              {i + 1}
            </span>
            <span>{fact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
