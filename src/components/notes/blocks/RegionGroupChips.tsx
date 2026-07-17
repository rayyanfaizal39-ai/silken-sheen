import { bgCard, bgPanel, chipGlow, groupGlow, neon } from "./neon-tokens";

export interface RegionGroupChipsItem {
  label: string;
  countries: string[];
  tone: "primary" | "accent";
}

export function RegionGroupChips({ groups }: { groups: RegionGroupChipsItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((g) => {
        const color = g.tone === "primary" ? neon.green : neon.blue;
        return (
          <div
            key={g.label}
            className="rounded-2xl p-4"
            style={{ background: bgPanel, boxShadow: groupGlow(color, 24, 0.15) }}
          >
            <h5 className="font-display mb-3 text-sm font-bold" style={{ color }}>
              {g.label}
            </h5>
            <div className="flex flex-wrap gap-2">
              {g.countries.map((c) => (
                <span
                  key={c}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ background: bgCard, color, boxShadow: chipGlow(color, 10, 0.35) }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
