import { bgCard, bgPanel, groupGlow, neon } from "./neon-tokens";

export interface DensityTierItem {
  category: string;
  range: string;
  reason: string;
  examples: string[];
  /** Illustrative relative dot-fill (0-1) — a visual comparison aid, not a literal data scale. */
  fillRatio: number;
}

const DOT_TOTAL = 48;

// Shared between Chapter 8 and Chapter 11 — both pass exactly 3 tiers (Padat/Sederhana/Jarang),
// so this fixed 3-color mapping is safe for both usages.
const TIER_TINT = [
  { color: neon.red, dotClass: "bg-red-400" },
  { color: neon.amber, dotClass: "bg-amber-400" },
  { color: neon.green, dotClass: "bg-emerald-400" },
];

export function DensityTierComparison({ tiers }: { tiers: DensityTierItem[] }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        {tiers.map((tier, i) => {
          const tint = TIER_TINT[i] ?? TIER_TINT[TIER_TINT.length - 1];
          const filled = Math.round(DOT_TOTAL * tier.fillRatio);
          return (
            <div
              key={tier.category}
              className="w-full max-w-[230px] rounded-2xl p-4 text-center"
              style={{ background: bgPanel, boxShadow: groupGlow(tint.color, 20, 0.15) }}
            >
              <div className="mx-auto grid w-fit grid-cols-8 gap-1 rounded-xl p-2.5" style={{ background: bgCard }}>
                {Array.from({ length: DOT_TOTAL }).map((_, d) => (
                  <span
                    key={d}
                    className={`h-1.5 w-1.5 rounded-full ${d < filled ? tint.dotClass : "bg-border/50"}`}
                  />
                ))}
              </div>
              <h5 className="font-display mt-2.5 text-[13.5px] font-bold" style={{ color: tint.color }}>
                {tier.category}
              </h5>
              {tier.range && <p className="mt-0.5 text-xs font-semibold text-muted-foreground">{tier.range}</p>}
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tier.reason}</p>
              {tier.examples.length > 0 && (
                <p className="mt-2 text-[10px] text-muted-foreground">
                  <b className="text-foreground">Contoh:</b> {tier.examples.join(", ")}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-[10.5px] italic text-muted-foreground">
        Nota: Kepadatan titik adalah ilustrasi perbandingan relatif, bukan skala tepat.
      </p>
    </div>
  );
}
