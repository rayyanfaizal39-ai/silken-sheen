import { bgPanel, bgCard, groupGlow, neon } from "./neon-tokens";

export interface IslamWestComparisonProps {
  islamic: {
    framework: string;
    scholars: { name: string; view: string }[];
  };
  western: {
    framework: string;
    scholars: { name: string; view: string }[];
  };
}

export function IslamWestComparison({ islamic, western }: IslamWestComparisonProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl p-5" style={{ background: bgPanel, boxShadow: groupGlow(neon.green, 20, 0.12) }}>
        <h4 className="font-display mb-3 text-[15px] font-bold" style={{ color: neon.green }}>
          ☪️ Sudut Pandangan Islam
        </h4>
        {islamic.scholars.map((s) => (
          <div key={s.name} className="mb-2 rounded-xl p-3" style={{ background: bgCard }}>
            <b className="mb-0.5 block text-xs text-foreground">{s.name}</b>
            <span className="text-[11px] leading-relaxed text-muted-foreground">{s.view}</span>
          </div>
        ))}
        <p className="mt-2 text-[10.5px] leading-relaxed text-muted-foreground">{islamic.framework}</p>
      </div>
      <div className="rounded-2xl p-5" style={{ background: bgPanel, boxShadow: groupGlow(neon.blue, 20, 0.12) }}>
        <h4 className="font-display mb-3 text-[15px] font-bold" style={{ color: neon.blue }}>
          🏛️ Sudut Pandangan Barat
        </h4>
        {western.scholars.map((s) => (
          <div key={s.name} className="mb-2 rounded-xl p-3" style={{ background: bgCard }}>
            <b className="mb-0.5 block text-xs text-foreground">{s.name}</b>
            <span className="text-[11px] leading-relaxed text-muted-foreground">{s.view}</span>
          </div>
        ))}
        <p className="mt-2 text-[10.5px] leading-relaxed text-muted-foreground">{western.framework}</p>
      </div>
    </div>
  );
}
