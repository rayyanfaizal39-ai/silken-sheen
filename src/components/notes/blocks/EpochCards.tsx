import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface EpochCardItem {
  name: string;
  duration: string;
  facts: string[];
}

export function EpochCards({ epochs }: { epochs: EpochCardItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {epochs.map((epoch) => (
        <div
          key={epoch.name}
          className="rounded-2xl p-4"
          style={{ background: bgPanel, boxShadow: groupGlow(neon.violet, 16, 0.1) }}
        >
          <h4 className="font-display text-[13px] font-bold" style={{ color: neon.violet }}>
            {epoch.name}
          </h4>
          <p className="mb-2 mt-0.5 text-[10.5px] text-muted-foreground">{epoch.duration}</p>
          <ul className="space-y-1 pl-4 text-[10.5px] leading-relaxed text-muted-foreground" style={{ listStyleType: "disc" }}>
            {epoch.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
