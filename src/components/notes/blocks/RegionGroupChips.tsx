export interface RegionGroupChipsItem {
  label: string;
  countries: string[];
  tone: "primary" | "accent";
}

export function RegionGroupChips({ groups }: { groups: RegionGroupChipsItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((g) => (
        <div
          key={g.label}
          className={`rounded-2xl border p-4 ${
            g.tone === "primary"
              ? "border-primary/30 bg-gradient-to-br from-primary/10 to-transparent"
              : "border-accent/30 bg-gradient-to-br from-accent/10 to-transparent"
          }`}
        >
          <h5 className="font-display mb-3 text-sm font-bold text-foreground">{g.label}</h5>
          <div className="flex flex-wrap gap-2">
            {g.countries.map((c) => (
              <span
                key={c}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium shadow-[0_0_12px_-2px] ${
                  g.tone === "primary"
                    ? "border-primary/40 bg-primary/15 text-primary shadow-primary/30"
                    : "border-accent/40 bg-accent/15 text-accent shadow-accent/30"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
