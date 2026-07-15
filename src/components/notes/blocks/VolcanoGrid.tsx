import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface VolcanoItem {
  name: string;
  country: string;
}

// Two-tone country coding matches design-reference/geo-signature-visuals-ch10.html.
const COUNTRY_COLOR: Record<string, string> = {
  Indonesia: neon.red,
  Filipina: neon.amber,
};

export function VolcanoGrid({ volcanoes }: { volcanoes: VolcanoItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {volcanoes.map((v) => {
        const color = COUNTRY_COLOR[v.country] ?? neon.red;
        return (
          <div
            key={v.name}
            className="flex flex-col items-center gap-1.5 rounded-xl p-4 text-center"
            style={{ background: bgPanel, boxShadow: groupGlow(color, 16, 0.2) }}
          >
            <span className="text-2xl">🌋</span>
            <p className="text-[12.5px] font-semibold text-foreground">{v.name}</p>
            <p className="text-[11px]" style={{ color }}>
              {v.country}
            </p>
          </div>
        );
      })}
    </div>
  );
}
