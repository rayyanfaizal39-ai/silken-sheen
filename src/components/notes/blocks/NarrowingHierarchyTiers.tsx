import { groupGlow, hexToRgba, neon, type NeonColor } from "./neon-tokens";

export interface NarrowingHierarchyTier {
  label: string;
  description: string;
  color: NeonColor;
  maxWidthPx: number;
}

export function NarrowingHierarchyTiers({ tiers }: { tiers: NarrowingHierarchyTier[] }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {tiers.map((tier, i) => {
        const hex = neon[tier.color];
        const isTop = i === 0;
        return (
          <div
            key={tier.label}
            className="w-full rounded-xl px-4 py-3.5 text-center"
            style={{
              maxWidth: tier.maxWidthPx,
              background: isTop
                ? `linear-gradient(135deg, ${neon.violet}, ${neon.blue})`
                : hexToRgba(hex, 0.16),
              boxShadow: isTop ? groupGlow(neon.violet, 20, 0.4) : undefined,
            }}
          >
            <h5
              className="font-display text-[13px] font-bold"
              style={{ color: isTop ? "#fff" : hex }}
            >
              {tier.label}
            </h5>
            <p className="mt-0.5 text-[10.5px] leading-relaxed" style={{ color: isTop ? "rgba(255,255,255,0.85)" : undefined }}>
              <span className={isTop ? undefined : "text-muted-foreground"}>{tier.description}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
