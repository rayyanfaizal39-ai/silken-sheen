import { bgPanel } from "./neon-tokens";

export interface ScholarCardItem {
  field: string;
  name: string;
  contribution: string;
}

export function ScholarCards({ scholars }: { scholars: ScholarCardItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {scholars.map((s) => (
        <div key={s.name} className="rounded-xl p-3.5" style={{ background: bgPanel }}>
          <p className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">{s.field}</p>
          <h5 className="font-display mt-1 mb-1.5 text-[13px] font-bold text-foreground">{s.name}</h5>
          <p className="text-[10px] leading-relaxed text-muted-foreground">{s.contribution}</p>
        </div>
      ))}
    </div>
  );
}
