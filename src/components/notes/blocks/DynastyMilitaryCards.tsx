import { bgCard, bgPanel, neon } from "./neon-tokens";

export interface DynastyMilitaryItem {
  name: string;
  duration: string;
  militaryStrength?: string[];
  facts: string[];
}

export function DynastyMilitaryCards({ dynasties }: { dynasties: DynastyMilitaryItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {dynasties.map((d) => (
        <div key={d.name} className="rounded-2xl p-4" style={{ background: bgPanel }}>
          <h4 className="font-display text-[13.5px] font-bold" style={{ color: neon.amber }}>
            {d.name}
          </h4>
          <p className="mb-2 mt-0.5 text-[10.5px] text-muted-foreground">{d.duration}</p>
          {d.militaryStrength && d.militaryStrength.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {d.militaryStrength.map((m) => (
                <span key={m} className="rounded-md px-2 py-1 text-[9.5px] font-medium text-foreground" style={{ background: bgCard }}>
                  {m}
                </span>
              ))}
            </div>
          )}
          {d.facts.map((f) => (
            <p key={f} className="text-[10px] leading-snug text-muted-foreground">
              {f}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
