import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface SiteCardItem {
  name: string;
  country: string;
  dateRange: string;
  significance: string;
}

export function SiteCardRow({ sites, highlightName }: { sites: SiteCardItem[]; highlightName?: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => {
        const isHighlight = site.name === highlightName;
        return (
          <div
            key={site.name}
            className="rounded-2xl p-3.5"
            style={{
              background: bgPanel,
              boxShadow: isHighlight ? groupGlow(neon.green, 20, 0.3) : groupGlow(neon.violet, 12, 0.08),
              border: isHighlight ? `1px solid ${neon.green}4d` : undefined,
            }}
          >
            <h5 className="font-display text-[12.5px] font-bold text-foreground">
              {site.name}
              {isHighlight && " ⭐"}
            </h5>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{site.country}</p>
            <p className="mt-1.5 text-[10px] font-bold" style={{ color: neon.amber }}>
              {site.dateRange}
            </p>
            <p className="mt-1.5 text-[10.5px] leading-snug text-muted-foreground">{site.significance}</p>
          </div>
        );
      })}
    </div>
  );
}
