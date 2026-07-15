export interface DensityTierItem {
  category: string;
  range: string;
  reason: string;
  examples: string[];
  /** Illustrative relative dot-fill (0-1) — a visual comparison aid, not a literal data scale. */
  fillRatio: number;
}

const DOT_TOTAL = 48;

const TIER_TINT = [
  { dot: "bg-red-400", ring: "border-red-400/30", bg: "bg-red-500/5" },
  { dot: "bg-amber-400", ring: "border-amber-400/30", bg: "bg-amber-400/5" },
  { dot: "bg-primary", ring: "border-primary/30", bg: "bg-primary/5" },
];

export function DensityTierComparison({ tiers }: { tiers: DensityTierItem[] }) {
  return (
    <div className="space-y-4">
      {tiers.map((tier, i) => {
        const tint = TIER_TINT[i] ?? TIER_TINT[TIER_TINT.length - 1];
        const filled = Math.round(DOT_TOTAL * tier.fillRatio);
        return (
          <div
            key={tier.category}
            className={`rounded-2xl border ${tint.ring} ${tint.bg} p-4 sm:p-5`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="grid shrink-0 grid-cols-8 gap-1.5 rounded-xl border border-border/60 bg-card/60 p-3">
                {Array.from({ length: DOT_TOTAL }).map((_, d) => (
                  <span
                    key={d}
                    className={`h-2 w-2 rounded-full ${d < filled ? tint.dot : "bg-border/50"}`}
                  />
                ))}
              </div>
              <div className="flex-1">
                <h5 className="font-display text-[13.5px] font-bold text-foreground">
                  {tier.category}
                </h5>
                <p className="mt-0.5 text-xs font-semibold text-muted-foreground">{tier.range}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tier.reason}</p>
                {tier.examples.length > 0 && (
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    <b className="text-foreground">Contoh:</b> {tier.examples.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <p className="text-[10.5px] italic text-muted-foreground">
        Nota: Kepadatan titik adalah ilustrasi perbandingan relatif, bukan skala tepat.
      </p>
    </div>
  );
}
