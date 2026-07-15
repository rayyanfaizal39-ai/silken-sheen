export interface SettlementPatternItem {
  name: string;
  description: string[];
  examples: string[];
}

// Relative (x, y) dot positions per pattern within a 100x60 viewBox — illustrates the real spatial layout.
const DOT_LAYOUTS: Record<string, Array<[number, number]>> = {
  Berpusat: [
    [45, 25], [55, 25], [50, 32], [42, 35], [58, 35], [48, 42], [52, 20],
  ],
  Berkelompok: [
    [20, 15], [26, 18], [22, 22],
    [70, 15], [76, 18], [72, 22],
    [20, 42], [26, 45], [22, 48],
    [70, 42], [76, 45], [72, 48],
  ],
  Berjajar: [
    [10, 30], [22, 30], [34, 30], [46, 30], [58, 30], [70, 30], [82, 30], [94, 30],
  ],
  Berselerak: [
    [12, 10], [40, 18], [75, 8], [20, 35], [60, 40], [90, 30], [8, 50], [50, 52],
  ],
};

export function SettlementPatternGrid({ patterns }: { patterns: SettlementPatternItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {patterns.map((p) => {
        const dots = DOT_LAYOUTS[p.name] ?? [];
        return (
          <div key={p.name} className="rounded-2xl border border-border bg-secondary/40 p-4">
            <h5 className="font-display text-sm font-bold text-foreground">{p.name}</h5>
            <svg viewBox="0 0 100 60" className="mt-2 h-20 w-full rounded-lg border border-border/50 bg-card/60">
              {dots.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={3.2} className="fill-primary" />
              ))}
            </svg>
            <ul className="mt-3 space-y-1.5">
              {p.description.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[12px] leading-relaxed text-muted-foreground">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  {d}
                </li>
              ))}
            </ul>
            {p.examples.length > 0 && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                <b className="text-foreground">Contoh:</b> {p.examples.join(", ")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
