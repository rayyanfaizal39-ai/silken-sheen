import { bgCard, bgPanel, groupGlow, neon, type NeonColor } from "./neon-tokens";

export interface CivilizationProfileItem {
  name: string;
  river: string;
  location: string;
  startDate: string;
  kingdoms: { name: string; duration: string; facts: string[] }[];
  cityHighlights: { name: string; facts: string[] }[];
  keyFacts: string[];
}

const ROTATION: NeonColor[] = ["violet", "amber", "green", "red"];

export function CivilizationProfileCards({ civilizations }: { civilizations: CivilizationProfileItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {civilizations.map((civ, i) => {
        const color = neon[ROTATION[i % ROTATION.length]];
        return (
          <div key={civ.name} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(color, 18, 0.15) }}>
            <h4 className="font-display text-[14px] font-bold text-foreground">{civ.name}</h4>
            <p className="mt-1 text-[11px] font-bold" style={{ color: neon.amber }}>
              {civ.river}
            </p>
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground">{civ.location}</p>
            <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">{civ.startDate}</p>

            {civ.kingdoms.length > 0 && (
              <div className="mt-3 flex flex-col gap-1.5">
                {civ.kingdoms.map((k) => (
                  <div key={k.name} className="rounded-lg p-2.5" style={{ background: bgCard }}>
                    <p className="text-[11px] font-semibold text-foreground">
                      {k.name} <span className="font-normal text-muted-foreground">— {k.duration}</span>
                    </p>
                    {k.facts.map((f) => (
                      <p key={f} className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                        • {f}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {civ.cityHighlights.length > 0 && (
              <div className="mt-3 flex flex-col gap-1.5">
                {civ.cityHighlights.map((c) => (
                  <div key={c.name} className="rounded-lg p-2.5" style={{ background: bgCard }}>
                    <p className="text-[11px] font-semibold" style={{ color }}>
                      {c.name}
                    </p>
                    {c.facts.map((f) => (
                      <p key={f} className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                        • {f}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-col gap-1">
              {civ.keyFacts.map((f) => (
                <p key={f} className="text-[10.5px] leading-snug text-muted-foreground">
                  ★ {f}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
