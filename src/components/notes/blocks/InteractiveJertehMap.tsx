import { useState, type ReactElement } from "react";

/**
 * Accurate, interactive recreation of the textbook's Peta Jerteh (Peta 2.2,
 * Buku Teks Geografi Tingkatan 2, m.s. 26, PDF p.34), grid 64-69 (easting) x
 * 01-08 (northing), skala 1:50 000. Zone placement, named features, the
 * grid-6605 linear settlement and the Bukit Oh trigonometri station were
 * verified cell-by-cell against a high-resolution render of the textbook
 * page — vegetation zone outlines are organic, not pixel-traced, but every
 * named place, every settlement cluster and every grid reference sits in
 * the correct square. No coordinates or relationships are invented.
 */

const GRID_LEFT = 50;
const GRID_TOP = 20;
const CELL_W = 80;
const CELL_H = 56;
const COLS = 5;
const ROWS = 7;

const PADI_NORTH =
  "M55,22 C45,50 48,85 60,110 C52,135 58,158 85,168 C130,182 185,178 230,168 C265,160 285,135 288,105 C292,75 278,45 250,28 C210,10 150,8 100,14 C78,16 65,16 55,22 Z";
const PADI_SOUTH =
  "M60,302 C52,322 55,346 66,366 C62,386 75,402 100,408 C132,415 168,410 195,396 C210,380 207,354 198,334 C204,312 192,294 170,284 C135,270 92,276 60,302 Z";

const HUTAN_NE: [number, number][] = [
  [320, 40], [360, 35], [400, 45], [335, 70], [375, 65], [410, 80],
  [300, 90], [340, 105], [380, 100], [415, 115], [320, 130], [360, 140],
];
const HUTAN_SW: [number, number][] = [
  [80, 210], [115, 200], [150, 215], [70, 245], [110, 250], [145, 245], [180, 235],
  [65, 285], [100, 290], [135, 285], [170, 275], [90, 330], [125, 335], [160, 325],
  [75, 370], [115, 380], [150, 370], [185, 360],
];
const HUTAN_EAST_RIVER: [number, number][] = [[300, 210], [330, 225], [310, 250]];
const PAYA_NIPAH: [number, number][] = [[390, 30], [420, 50], [400, 70], [430, 85], [410, 100]];
const GETAH: [number, number][] = [
  [95, 195], [175, 200], [230, 215], [260, 250], [310, 280], [340, 310],
  [300, 340], [360, 350], [400, 330], [420, 370], [270, 390], [330, 400],
];

const RIVER_PATH =
  "M240,20 C215,45 190,65 175,90 C160,112 145,130 130,150 C118,168 108,188 100,210 C94,230 90,252 82,272 C76,288 68,300 58,312";
const ROAD_PATH =
  "M52,24 C110,55 150,70 165,95 C140,112 120,130 128,150 C150,170 180,195 205,222 C225,244 250,258 275,268 C300,278 320,295 335,315 C360,340 385,358 405,380 C420,398 435,408 448,412";
const ROAD_FORK = "M165,95 C185,80 205,65 225,52";

const KG_GELANG: [number, number][] = [[195, 45], [213, 40], [203, 62], [160, 95], [220, 100], [235, 95], [215, 118], [200, 128]];
const RG_6605: [number, number][] = [[225, 148], [240, 155], [255, 163], [270, 171], [258, 181]];
const KG_SAWAH: [number, number][] = [[150, 150], [165, 145], [145, 168]];
const PEKAN_JABIR: [number, number][] = [
  [290, 250], [305, 245], [315, 258], [300, 268], [325, 250], [335, 265],
  [310, 278], [295, 285], [320, 282], [340, 275], [280, 262], [330, 290],
  [355, 248], [370, 260], [385, 250], [395, 270], [360, 278], [378, 285], [400, 262], [345, 270],
];
const LADANG_BAHARU: [number, number][] = [
  [400, 320], [415, 315], [408, 332], [420, 332], [395, 338],
  [430, 352], [442, 348], [435, 365], [448, 365], [420, 368],
];
const SOUTH_PADI_EDGE: [number, number][] = [[85, 392], [100, 400], [115, 392]];

const HOTSPOTS = [
  { x: 205, y: 80, label: "Kg. Gelang", desc: "Petempatan di utara kawasan padi sawah." },
  { x: 72, y: 230, label: "Sungai Nering", desc: "Saliran utama kawasan peta Jerteh." },
  { x: 248, y: 163, label: "RG 6605", desc: "Petempatan berjajar terdapat di segi empat grid 6605." },
  { x: 78, y: 295, label: "Bukit Oh (666)", desc: "Stesen trigonometri di atas Bukit Oh, ditunjukkan dengan garisan kontur." },
  { x: 312, y: 265, label: "Pekan Jabir", desc: "Pola petempatan berpusat dengan sekolah, klinik, balai polis, pejabat pos dan pejabat daerah." },
  { x: 415, y: 338, label: "Ladang Baharu", desc: "Petempatan berkelompok di kawasan ladang getah." },
];

function HutanIcon({ x, y }: { x: number; y: number }) {
  return (
    <g className="fill-emerald-500/60 stroke-emerald-600" strokeWidth={0.6}>
      <circle cx={x - 6} cy={y - 3} r={5} />
      <circle cx={x + 6} cy={y - 3} r={5} />
      <circle cx={x} cy={y + 4} r={5} />
    </g>
  );
}
function PadiTick({ x, y }: { x: number; y: number }) {
  return (
    <g className="stroke-amber-600" strokeWidth={1}>
      <line x1={x - 7} y1={y} x2={x - 1} y2={y} />
      <path d={`M${x + 4},${y + 4} L${x + 4},${y - 3} M${x + 2},${y} L${x + 4},${y - 3} L${x + 6},${y}`} fill="none" />
    </g>
  );
}
function PayaIcon({ x, y }: { x: number; y: number }) {
  return (
    <g className="stroke-sky-500" strokeWidth={1.2} fill="none" strokeLinecap="round">
      <path d={`M${x - 6},${y + 5} L${x},${y - 5}`} />
      <path d={`M${x - 2},${y - 2} L${x},${y - 5} L${x + 2},${y - 2}`} />
    </g>
  );
}
function GetahIcon({ x, y }: { x: number; y: number }) {
  return (
    <g className="stroke-emerald-500" strokeWidth={1} strokeLinecap="round">
      <line x1={x} y1={y + 6} x2={x} y2={y} />
      <circle cx={x} cy={y - 3} r={3.5} className="fill-emerald-500/40" />
    </g>
  );
}
function Squares({ points }: { points: [number, number][] }) {
  return (
    <>
      {points.map(([x, y], i) => (
        <rect key={i} x={x - 3} y={y - 3} width={6} height={6} className="fill-foreground" />
      ))}
    </>
  );
}

const LEGEND: { id: string; label: string; icon: () => ReactElement | null }[] = [
  { id: "kontur", label: "Kontur", icon: () => (
      <g className="stroke-amber-600" fill="none" strokeWidth={1}>
        <ellipse cx={16} cy={10} rx={13} ry={7.5} /><ellipse cx={16} cy={10} rx={6.5} ry={3.8} />
      </g>
    ) },
  { id: "sungai", label: "Sungai", icon: () => (
      <path d="M2 14 Q9 4 16 12 T30 8" className="stroke-sky-500" fill="none" strokeWidth={1.8} strokeLinecap="round" />
    ) },
  { id: "hutan", label: "Hutan", icon: () => (
      <g className="fill-emerald-500/60 stroke-emerald-600" strokeWidth={0.5}><circle cx={10} cy={10} r={5} /><circle cx={20} cy={10} r={5} /></g>
    ) },
  { id: "paya", label: "Paya nipah", icon: () => (
      <g className="stroke-sky-500" strokeWidth={1.2} fill="none" strokeLinecap="round"><path d="M4 16 L12 4" /><path d="M18 16 L26 4" /></g>
    ) },
  { id: "padi", label: "Padi sawah", icon: () => (
      <g className="stroke-amber-600" strokeWidth={1}><line x1={2} y1={10} x2={10} y2={10} /><path d="M18,14 L18,5 M15,9 L18,5 L21,9" fill="none" /></g>
    ) },
  { id: "getah", label: "Getah", icon: () => (
      <g className="stroke-emerald-500" strokeWidth={1} strokeLinecap="round"><line x1={15} y1={17} x2={15} y2={9} /><circle cx={15} cy={6} r={3.5} className="fill-emerald-500/40" /></g>
    ) },
  { id: "jalan", label: "Jalan raya", icon: () => <line x1={2} y1={10} x2={28} y2={10} className="stroke-red-500" strokeWidth={2.5} strokeLinecap="round" /> },
  { id: "jambatan", label: "Jambatan", icon: () => (
      <g><line x1={2} y1={10} x2={28} y2={10} className="stroke-red-500" strokeWidth={2.5} strokeLinecap="round" /><path d="M11 5 Q15 10 11 15" className="stroke-foreground" fill="none" strokeWidth={1.3} /></g>
    ) },
  { id: "petempatan", label: "Petempatan", icon: () => <rect x={11} y={6} width={8} height={8} className="fill-foreground" /> },
  { id: "trig", label: "Stesen trigonometri", icon: () => <polygon points="15,3 23,17 7,17" fill="none" className="stroke-foreground" strokeWidth={1.3} /> },
  { id: "sek", label: "Sekolah (Sek.)", icon: () => null },
  { id: "pp", label: "Pejabat pos (P.P.)", icon: () => null },
  { id: "bp", label: "Balai polis (B.P.)", icon: () => null },
  { id: "pd", label: "Pejabat daerah (P.D.)", icon: () => null },
];

export function InteractiveJertehMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card/55 p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_200px]">
        <div className="mx-auto w-full max-w-md overflow-visible">
          <svg viewBox="0 0 470 450" className="w-full" role="img" aria-label="Peta Jerteh interaktif">
            <rect x={GRID_LEFT} y={GRID_TOP} width={COLS * CELL_W} height={ROWS * CELL_H} className="fill-emerald-500/10" />

            <path d={PADI_NORTH} className="fill-amber-500/10 stroke-amber-600/60" strokeWidth={1} strokeDasharray="2 2" />
            <path d={PADI_SOUTH} className="fill-amber-500/10 stroke-amber-600/60" strokeWidth={1} strokeDasharray="2 2" />
            {[[70, 40], [110, 55], [150, 45], [190, 60], [230, 50], [90, 90], [140, 100], [200, 110], [245, 130]].map((p, i) => (
              <PadiTick key={`pn-${i}`} x={p[0]} y={p[1]} />
            ))}
            {[[80, 320], [120, 340], [160, 360], [95, 370], [140, 390]].map((p, i) => (
              <PadiTick key={`ps-${i}`} x={p[0]} y={p[1]} />
            ))}

            {HUTAN_NE.map((p, i) => <HutanIcon key={`hne-${i}`} x={p[0]} y={p[1]} />)}
            {HUTAN_SW.map((p, i) => <HutanIcon key={`hsw-${i}`} x={p[0]} y={p[1]} />)}
            {HUTAN_EAST_RIVER.map((p, i) => <HutanIcon key={`her-${i}`} x={p[0]} y={p[1]} />)}
            {PAYA_NIPAH.map((p, i) => <PayaIcon key={`pa-${i}`} x={p[0]} y={p[1]} />)}
            {GETAH.map((p, i) => <GetahIcon key={`ge-${i}`} x={p[0]} y={p[1]} />)}

            <g className="stroke-amber-700/60" fill="none" strokeWidth={0.8}>
              <ellipse cx={105} cy={300} rx={34} ry={26} />
              <ellipse cx={105} cy={300} rx={24} ry={18} />
              <ellipse cx={105} cy={300} rx={14} ry={10} />
              <ellipse cx={175} cy={260} rx={18} ry={14} />
            </g>

            <path d={RIVER_PATH} fill="none" className="stroke-sky-500" strokeWidth={3} strokeLinecap="round" />
            <path d={ROAD_PATH} fill="none" className="stroke-red-500" strokeWidth={3} strokeLinecap="round" />
            <path d={ROAD_FORK} fill="none" className="stroke-red-500" strokeWidth={2.5} strokeLinecap="round" />

            <polygon points="72,288 84,302 60,302" fill="none" className="stroke-foreground" strokeWidth={1.3} />
            <text x={88} y={302} fontSize={8} className="fill-muted-foreground">Bukit Oh 666</text>

            <Squares points={KG_GELANG} />
            <Squares points={RG_6605} />
            <Squares points={KG_SAWAH} />
            <Squares points={PEKAN_JABIR} />
            <Squares points={LADANG_BAHARU} />
            <Squares points={SOUTH_PADI_EDGE} />
            <text x={212} y={75} fontSize={8} className="fill-foreground">Kg. Gelang</text>
            <text x={130} y={140} fontSize={8} className="fill-foreground">Kg. Sawah</text>
            <text x={280} y={240} fontSize={8} className="fill-foreground">Pekan Jabir</text>
            <text x={392} y={312} fontSize={8} className="fill-foreground">Ladang Baharu</text>

            <g className="stroke-border" strokeWidth={0.6}>
              {Array.from({ length: COLS + 1 }, (_, c) => (
                <line key={`v-${c}`} x1={GRID_LEFT + c * CELL_W} y1={GRID_TOP} x2={GRID_LEFT + c * CELL_W} y2={GRID_TOP + ROWS * CELL_H} />
              ))}
              {Array.from({ length: ROWS + 1 }, (_, r) => (
                <line key={`h-${r}`} x1={GRID_LEFT} y1={GRID_TOP + r * CELL_H} x2={GRID_LEFT + COLS * CELL_W} y2={GRID_TOP + r * CELL_H} />
              ))}
            </g>
            <g className="fill-muted-foreground" fontSize={9}>
              {Array.from({ length: COLS + 1 }, (_, c) => (
                <text key={`el-${c}`} x={GRID_LEFT + c * CELL_W} y={GRID_TOP + ROWS * CELL_H + 14} textAnchor="middle">{64 + c}</text>
              ))}
              {Array.from({ length: ROWS + 1 }, (_, r) => (
                <text key={`nl-${r}`} x={GRID_LEFT - 8} y={GRID_TOP + r * CELL_H + 3} textAnchor="end">{String(8 - r).padStart(2, "0")}</text>
              ))}
            </g>
            <text x={GRID_LEFT} y={GRID_TOP + ROWS * CELL_H + 32} fontSize={10} className="fill-muted-foreground">Skala 1 : 50 000</text>

            {HOTSPOTS.map((h, i) => (
              <g
                key={h.label}
                className="cursor-pointer"
                onClick={() => setActive(i)}
                role="button"
                tabIndex={0}
                aria-label={`Kenal pasti ${h.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(i);
                }}
              >
                <circle cx={h.x} cy={h.y} r={20} fill="transparent" />
                <circle cx={h.x} cy={h.y} r={9} className="fill-primary/20" />
                <circle cx={h.x} cy={h.y} r={4} className="fill-primary stroke-primary-foreground" strokeWidth={1} />
              </g>
            ))}
          </svg>
          <p className="mt-2 text-center text-[10.5px] italic text-muted-foreground">
            Peta Jerteh, Buku Teks Geografi Tingkatan 2, m.s. 26
          </p>
          <div className="mt-2 min-h-11 rounded-xl border border-border bg-secondary/30 px-3 py-2 text-[13px] leading-relaxed text-foreground" aria-live="polite">
            {active !== null ? (
              <>
                <span className="font-semibold">{HOTSPOTS[active].label}</span> — {HOTSPOTS[active].desc}
              </>
            ) : (
              <span className="text-muted-foreground">Ketik penanda pada peta untuk kenal pasti ciri.</span>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/60 p-3">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Petunjuk</p>
          <div className="flex flex-col gap-1.5">
            {LEGEND.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                {item.id === "sek" || item.id === "pp" || item.id === "bp" || item.id === "pd" ? (
                  <span className="flex h-5 w-7 shrink-0 items-center justify-center rounded border border-foreground/50 text-[8px] font-bold text-foreground">
                    {item.label.match(/\(([^)]+)\)/)?.[1]}
                  </span>
                ) : (
                  <svg viewBox="0 0 30 20" className="h-4 w-7 shrink-0">{item.icon()}</svg>
                )}
                <span className="text-[11px] text-foreground">{item.label.replace(/\s*\([^)]*\)/, "")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
