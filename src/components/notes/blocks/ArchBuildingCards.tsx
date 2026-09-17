import { bgCard, bgPanel, groupGlow, neon } from "./neon-tokens";

export interface ArchBuildingItem {
  name: string;
  function: string;
  details: string[];
}

export function ArchBuildingCards({ buildings }: { buildings: ArchBuildingItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {buildings.map((b) => (
        <div
          key={b.name}
          className="rounded-2xl p-4"
          style={{ background: bgPanel, boxShadow: groupGlow(neon.amber, 16, 0.12) }}
        >
          <h5 className="font-display text-[13.5px] font-bold" style={{ color: neon.amber }}>
            {b.name}
          </h5>
          <p className="mb-2 mt-1 text-[10.5px] leading-relaxed text-muted-foreground">
            {b.function}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {b.details.map((detail) => (
              <span
                key={detail}
                className="rounded-md px-2 py-1 text-[9.5px] font-medium text-foreground"
                style={{ background: bgCard }}
              >
                {detail}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
