import { bgCard, bgPanel, groupGlow, neon, type NeonColor } from "./neon-tokens";

export interface KingdomStageItem {
  name: string;
  location: string;
  era: string;
  capital: string;
  founder?: string;
  foundingStory?: string;
  glory: string;
  keyRuler?: string;
  decline: string;
}

const ROTATION: NeonColor[] = ["violet", "green", "amber", "blue"];

export function KingdomStageCards({ kingdoms }: { kingdoms: KingdomStageItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {kingdoms.map((k, i) => {
        const glow = neon[ROTATION[i % ROTATION.length]];
        return (
          <div key={k.name} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(glow, 16, 0.12) }}>
            <h4 className="font-display text-[14px] font-bold text-foreground">{k.name}</h4>
            <p className="mt-1 text-[10.5px] text-muted-foreground">
              {k.location} · {k.era} · {k.capital}
            </p>

            {(k.founder || k.foundingStory) && (
              <div className="mt-3 rounded-lg p-2.5" style={{ background: bgCard }}>
                <p className="text-[9.5px] font-bold uppercase tracking-wide" style={{ color: neon.blue }}>
                  Pengasas
                </p>
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted-foreground">
                  {[k.founder, k.foundingStory].filter(Boolean).join(" — ")}
                </p>
              </div>
            )}

            <div className="mt-2 rounded-lg p-2.5" style={{ background: bgCard }}>
              <p className="text-[9.5px] font-bold uppercase tracking-wide" style={{ color: neon.amber }}>
                Kemasyhuran
              </p>
              <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted-foreground">{k.glory}</p>
            </div>

            <div className="mt-2 rounded-lg p-2.5" style={{ background: bgCard }}>
              <p className="text-[9.5px] font-bold uppercase tracking-wide" style={{ color: neon.red }}>
                Kemerosotan
              </p>
              <p className="mt-0.5 text-[10.5px] leading-relaxed text-muted-foreground">{k.decline}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
