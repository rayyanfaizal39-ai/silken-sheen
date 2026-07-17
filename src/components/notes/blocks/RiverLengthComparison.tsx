import { bgPanel, hexToRgba, riverGradients } from "./neon-tokens";

export interface RiverLengthItem {
  name: string;
  lengthKm: number;
  label: string;
}

export function RiverLengthComparison({ rivers }: { rivers: RiverLengthItem[] }) {
  const max = Math.max(...rivers.map((r) => r.lengthKm));
  return (
    <div className="space-y-3">
      {rivers.map((r) => {
        const pct = Math.max(6, (r.lengthKm / max) * 100);
        const gradient = riverGradients[r.name];
        return (
          <div key={r.name} className="flex items-center gap-3">
            <span className="w-32 shrink-0 text-[12.5px] font-semibold text-foreground sm:w-40">
              {r.name}
            </span>
            {/* Track holds the bar only; the label renders OUTSIDE/after the track so it never clips inside a short bar. */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="h-[26px] min-w-0 flex-1 overflow-hidden rounded-lg" style={{ background: bgPanel }}>
                <div
                  className="h-full rounded-lg"
                  style={
                    gradient
                      ? {
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
                          boxShadow: `0 0 16px ${hexToRgba(gradient.glow, 0.5)}`,
                        }
                      : { width: `${pct}%` }
                  }
                />
              </div>
              <span className="shrink-0 whitespace-nowrap text-[11.5px] font-semibold text-muted-foreground">
                {r.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
