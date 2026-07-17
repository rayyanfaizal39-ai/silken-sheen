import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface MalaysiaSiteEra {
  era: string;
  dateRange: string;
  sites: string[];
}

export function MalaysiaSiteList({ eras }: { eras: MalaysiaSiteEra[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {eras.map((e) => (
        <div key={e.era} className="rounded-2xl p-4" style={{ background: bgPanel, boxShadow: groupGlow(neon.green, 14, 0.12) }}>
          <h5 className="font-display text-[13px] font-bold" style={{ color: neon.green }}>
            {e.era}
          </h5>
          <p className="mb-2 mt-0.5 text-[10.5px] text-muted-foreground">{e.dateRange}</p>
          <div className="flex flex-wrap gap-1.5">
            {e.sites.map((site) => (
              <span key={site} className="rounded-lg bg-card px-2.5 py-1 text-[10px] font-medium text-foreground">
                {site}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
