import { bgPanel, groupGlow, neon } from "./neon-tokens";

export interface GovernmentSystemItem {
  name: string;
  definition: string;
}

export function GovernmentSystemCards({ systems }: { systems: GovernmentSystemItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {systems.map((s) => {
        const isDemokrasi = s.name === "Demokrasi";
        return (
          <div
            key={s.name}
            className="rounded-2xl p-4"
            style={{
              background: bgPanel,
              boxShadow: isDemokrasi ? groupGlow(neon.green, 20, 0.28) : groupGlow(neon.violet, 12, 0.1),
              border: isDemokrasi ? `1px solid ${neon.green}4d` : undefined,
            }}
          >
            <h5 className="font-display text-[13px] font-bold" style={{ color: isDemokrasi ? neon.green : neon.violet }}>
              {s.name}
              {isDemokrasi && " ⭐"}
            </h5>
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted-foreground">{s.definition}</p>
          </div>
        );
      })}
    </div>
  );
}
