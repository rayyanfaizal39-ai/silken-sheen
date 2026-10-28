import type { ReactElement } from "react";

export type MapSymbolId =
  | "belukar"
  | "kontur"
  | "tasik"
  | "sungai"
  | "rumput"
  | "hutan"
  | "paya-nipah"
  | "paya-bakau"
  | "tanjung"
  | "bukit"
  | "jalan-raya"
  | "jambatan"
  | "jalan-kereta-api"
  | "getah"
  | "masjid"
  | "kelapa-sawit"
  | "kuil"
  | "padi-sawah"
  | "tokong"
  | "gereja";

export type MapSymbolItem = {
  id: MapSymbolId;
  label: string;
};

export type MapSymbolLegendBlock = {
  fizikal: MapSymbolItem[];
  budaya: MapSymbolItem[];
};

/** Each icon shares a 0 0 56 34 viewBox so the grid stays visually aligned. */
const ICONS: Record<MapSymbolId, () => ReactElement> = {
  belukar: () => (
    <g className="fill-emerald-500">
      {[
        [8, 8], [20, 6], [32, 10], [44, 7], [14, 20], [28, 22], [40, 18], [10, 27], [24, 28], [38, 25],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} />
      ))}
    </g>
  ),
  kontur: () => (
    <g className="stroke-amber-600" fill="none" strokeWidth={1.3}>
      <ellipse cx={28} cy={17} rx={19} ry={11} />
      <ellipse cx={28} cy={17} rx={11.5} ry={6.5} />
      <ellipse cx={28} cy={17} rx={5} ry={3} />
    </g>
  ),
  tasik: () => (
    <g className="fill-sky-400">
      <ellipse cx={22} cy={17} rx={12} ry={8} />
      <ellipse cx={35} cy={17} rx={9.5} ry={6.5} />
    </g>
  ),
  sungai: () => (
    <path d="M4 20 Q14 8 24 20 T44 16 T54 12" className="stroke-sky-400" fill="none" strokeWidth={2.2} strokeLinecap="round" />
  ),
  rumput: () => (
    <g className="stroke-emerald-500" fill="none" strokeWidth={1.4} strokeLinecap="round">
      <path d="M14 22 Q18 13 22 22" />
      <path d="M26 22 Q30 13 34 22" />
      <path d="M38 22 Q42 13 46 22" />
    </g>
  ),
  hutan: () => (
    <g className="fill-emerald-500/70 stroke-emerald-600" strokeWidth={0.7}>
      <circle cx={14} cy={15} r={7} />
      <circle cx={27} cy={11} r={7} />
      <circle cx={40} cy={15} r={7} />
      <circle cx={20} cy={21} r={7} />
      <circle cx={33} cy={21} r={7} />
    </g>
  ),
  "paya-nipah": () => (
    <g>
      <g className="stroke-sky-400" strokeWidth={1}>
        <line x1={2} y1={9} x2={54} y2={9} />
        <line x1={2} y1={17} x2={54} y2={17} />
        <line x1={2} y1={25} x2={54} y2={25} />
      </g>
      <g className="stroke-foreground" strokeWidth={1.8} fill="none" strokeLinecap="round">
        <path d="M13 24 L20 9" />
        <path d="M35 24 L42 9" />
      </g>
    </g>
  ),
  "paya-bakau": () => (
    <g>
      <g className="stroke-sky-400" strokeWidth={1}>
        <line x1={2} y1={9} x2={54} y2={9} />
        <line x1={2} y1={17} x2={54} y2={17} />
        <line x1={2} y1={25} x2={54} y2={25} />
      </g>
      <g className="fill-emerald-500/60">
        <circle cx={16} cy={13} r={4} />
        <circle cx={38} cy={13} r={4} />
      </g>
      <g className="stroke-foreground" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 24 L16 19 L19 24" />
        <path d="M35 24 L38 19 L41 24" />
      </g>
    </g>
  ),
  tanjung: () => (
    <g>
      <rect x={11} y={8} width={34} height={18} rx={3} className="fill-none stroke-border" />
      <text x={28} y={21} textAnchor="middle" fontSize={12} fontWeight={700} className="fill-foreground">Tg.</text>
    </g>
  ),
  bukit: () => (
    <g>
      <rect x={11} y={8} width={34} height={18} rx={3} className="fill-none stroke-border" />
      <text x={28} y={21} textAnchor="middle" fontSize={12} fontWeight={700} className="fill-foreground">Bt.</text>
    </g>
  ),
  "jalan-raya": () => <line x1={4} y1={17} x2={52} y2={17} className="stroke-red-500" strokeWidth={3} strokeLinecap="round" />,
  jambatan: () => (
    <g>
      <line x1={4} y1={17} x2={52} y2={17} className="stroke-red-500" strokeWidth={3} strokeLinecap="round" />
      <path d="M20 10 Q25 17 20 24" className="stroke-foreground" fill="none" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M36 10 Q31 17 36 24" className="stroke-foreground" fill="none" strokeWidth={1.6} strokeLinecap="round" />
    </g>
  ),
  "jalan-kereta-api": () => (
    <g>
      <line x1={4} y1={17} x2={52} y2={17} className="stroke-foreground" strokeWidth={1.4} />
      {[8, 14, 20, 26, 32, 38, 44, 48].map((x, i) => (
        <line key={i} x1={x} y1={10} x2={x} y2={24} className="stroke-foreground" strokeWidth={1.3} />
      ))}
    </g>
  ),
  getah: () => (
    <g className="stroke-emerald-500" strokeWidth={1.4} strokeLinecap="round">
      <line x1={16} y1={27} x2={16} y2={15} fill="none" />
      <path d="M16 15 Q11 9 16 4 Q21 9 16 15 Z" className="fill-emerald-500/50" />
      <line x1={38} y1={27} x2={38} y2={15} fill="none" />
      <path d="M38 15 Q33 9 38 4 Q43 9 38 15 Z" className="fill-emerald-500/50" />
    </g>
  ),
  masjid: () => (
    <g>
      <rect x={20} y={16} width={14} height={11} className="fill-foreground" />
      <path d="M23.5 6 a4 4 0 1 0 0.6 7.9 a3 3 0 1 1 -0.6 -7.9 Z" className="fill-foreground" />
    </g>
  ),
  "kelapa-sawit": () => (
    <g className="stroke-emerald-500" strokeWidth={1.3} fill="none" strokeLinecap="round">
      <line x1={16} y1={27} x2={16} y2={15} />
      <path d="M16 15 L9 10 M16 15 L12 6 M16 15 L16 4 M16 15 L20 6 M16 15 L23 10" />
      <line x1={38} y1={27} x2={38} y2={15} />
      <path d="M38 15 L31 10 M38 15 L34 6 M38 15 L38 4 M38 15 L42 6 M38 15 L45 10" />
    </g>
  ),
  kuil: () => (
    <g>
      <rect x={20} y={18} width={14} height={9} className="fill-foreground" />
      <path d="M27 18 L27 7 M22.5 10 Q27 15 31.5 10" className="stroke-foreground" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  ),
  "padi-sawah": () => (
    <g>
      <g className="stroke-amber-500" strokeWidth={1.2}>
        <line x1={3} y1={9} x2={53} y2={9} strokeDasharray="4 3" />
        <line x1={3} y1={17} x2={53} y2={17} strokeDasharray="4 3" />
        <line x1={3} y1={25} x2={53} y2={25} strokeDasharray="4 3" />
      </g>
      <g className="stroke-amber-500" strokeWidth={1} strokeLinecap="round">
        <path d="M12 9 l-2.5 -4.5 M12 9 l2.5 -4.5" />
        <path d="M30 17 l-2.5 -4.5 M30 17 l2.5 -4.5" />
        <path d="M44 25 l-2.5 -4.5 M44 25 l2.5 -4.5" />
      </g>
    </g>
  ),
  tokong: () => (
    <g className="fill-foreground">
      <rect x={21} y={21} width={14} height={7} />
      <path d="M17 21 L39 21 L35 16 L21 16 Z" />
      <path d="M20 16 L36 16 L28 10 Z" />
    </g>
  ),
  gereja: () => (
    <g>
      <rect x={20} y={18} width={14} height={10} className="fill-foreground" />
      <line x1={27} y1={5} x2={27} y2={18} className="stroke-foreground" strokeWidth={2} strokeLinecap="round" />
      <line x1={22.5} y1={9} x2={31.5} y2={9} className="stroke-foreground" strokeWidth={2} strokeLinecap="round" />
    </g>
  ),
};

function SymbolTile({ item }: { item: MapSymbolItem }) {
  const Icon = ICONS[item.id];
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card/55 p-2 text-center">
      <svg viewBox="0 0 56 34" className="h-9 w-full">
        {Icon()}
      </svg>
      <span className="text-[11px] font-semibold leading-tight text-foreground">{item.label}</span>
    </div>
  );
}

export function MapSymbolLegend({ block }: { block: MapSymbolLegendBlock }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4">
        <h4 className="font-display mb-3 text-sm font-bold text-emerald-300">🏔️ Ciri Pandang Darat Fizikal</h4>
        <div className="grid grid-cols-2 gap-2">
          {block.fizikal.map((item) => (
            <SymbolTile key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
        <h4 className="font-display mb-3 text-sm font-bold text-amber-300">🏘️ Ciri Pandang Darat Budaya</h4>
        <div className="grid grid-cols-2 gap-2">
          {block.budaya.map((item) => (
            <SymbolTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
