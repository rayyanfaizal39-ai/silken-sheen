export interface GlobeLatitudeLine {
  value: string;
  name: string;
}

const RING_STYLE: {
  cy: number;
  rx: number;
  ry: number;
  strokeClassName: string;
  fillClassName: string;
  strokeWidth: number;
}[] = [
  { cy: 84, rx: 158, ry: 19, strokeClassName: "stroke-primary", fillClassName: "fill-primary", strokeWidth: 2.5 },
  { cy: 140, rx: 167, ry: 32, strokeClassName: "stroke-emerald-400", fillClassName: "fill-emerald-400", strokeWidth: 2.5 },
  { cy: 210, rx: 170, ry: 40, strokeClassName: "stroke-amber-400", fillClassName: "fill-amber-400", strokeWidth: 3 },
  { cy: 280, rx: 167, ry: 32, strokeClassName: "stroke-emerald-400", fillClassName: "fill-emerald-400", strokeWidth: 2.5 },
  { cy: 336, rx: 158, ry: 19, strokeClassName: "stroke-primary", fillClassName: "fill-primary", strokeWidth: 2.5 },
];

const LEADER: { lineEnd: { x: number; y: number }; labelY: number; labelYSub: number }[] = [
  { lineEnd: { x: 410, y: 60 }, labelY: 57, labelYSub: 70 },
  { lineEnd: { x: 410, y: 122 }, labelY: 119, labelYSub: 132 },
  { lineEnd: { x: 410, y: 200 }, labelY: 197, labelYSub: 210 },
  { lineEnd: { x: 410, y: 270 }, labelY: 267, labelYSub: 280 },
  { lineEnd: { x: 410, y: 345 }, labelY: 342, labelYSub: 355 },
];

export function GlobeLatitudeDiagram({ mainLines }: { mainLines: GlobeLatitudeLine[] }) {
  const middleFive = mainLines.slice(1, 6);
  const cx = 230;

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="flex justify-center">
        <svg viewBox="0 0 460 420" className="w-full max-w-[460px]">
          <circle cx={cx} cy="210" r="170" className="fill-background stroke-border" strokeWidth="2" />
          <path d={`M ${cx} 40 Q ${cx - 100} 210 ${cx} 380`} fill="none" className="stroke-border" strokeWidth="1" />
          <path d={`M ${cx} 40 Q ${cx + 100} 210 ${cx} 380`} fill="none" className="stroke-border" strokeWidth="1" />

          <circle cx={cx} cy="42" r="3" className="fill-foreground" />
          {middleFive.map((line, i) => {
            const style = RING_STYLE[i];
            return (
              <ellipse
                key={line.value}
                cx={cx}
                cy={style.cy}
                rx={style.rx}
                ry={style.ry}
                fill="none"
                className={style.strokeClassName}
                strokeWidth={style.strokeWidth}
              />
            );
          })}
          <circle cx={cx} cy="378" r="3" className="fill-foreground" />

          <line x1={cx} y1="40" x2={cx} y2="380" className="stroke-red-400" strokeWidth="2.5" />
          <text x={cx} y="20" textAnchor="middle" fontSize="11" fontWeight={700} className="fill-red-400">
            Garisan Meridian Pangkal (0°)
          </text>

          {middleFive.map((line, i) => {
            const style = RING_STYLE[i];
            const leader = LEADER[i];
            return (
              <g key={line.value}>
                <line
                  x1={cx + style.rx}
                  y1={style.cy}
                  x2={leader.lineEnd.x}
                  y2={leader.lineEnd.y}
                  className="stroke-muted-foreground"
                  strokeWidth="1"
                />
                <text
                  x={leader.lineEnd.x + 5}
                  y={leader.labelY}
                  fontSize="11"
                  fontWeight={700}
                  className={style.fillClassName}
                >
                  {line.name}
                </text>
                <text x={leader.lineEnd.x + 5} y={leader.labelYSub} fontSize="10" className="fill-muted-foreground">
                  {line.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Khatulistiwa (0°) membahagikan Bumi kepada Hemisfera Utara dan Selatan. Garisan Meridian Pangkal (0° longitud)
        memisahkan Timur dan Barat.
      </p>
    </div>
  );
}
