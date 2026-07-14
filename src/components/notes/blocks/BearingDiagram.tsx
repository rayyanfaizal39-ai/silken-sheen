function polarPoint(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarPoint(cx, cy, r, startDeg);
  const end = polarPoint(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

type BearingDiagramProps =
  | { variant: "under180"; bearingDegrees: number }
  | { variant: "over180"; bearingDegrees: number; residualAngle: number };

const COMPASS_RING: { code: string; deg: number }[] = [
  { code: "U", deg: 0 },
  { code: "TL", deg: 45 },
  { code: "T", deg: 90 },
  { code: "Tg", deg: 135 },
  { code: "S", deg: 180 },
  { code: "BD", deg: 225 },
  { code: "B", deg: 270 },
  { code: "BL", deg: 315 },
];

export function BearingDiagram(props: BearingDiagramProps) {
  const cx = 150;
  const cy = 150;
  const primaryLabelR = 133;
  const secondaryLabelR = 120;
  const { variant, bearingDegrees } = props;
  const target = polarPoint(cx, cy, 100, bearingDegrees);
  const midDeg = variant === "under180" ? bearingDegrees / 2 : bearingDegrees / 2;
  const isPrimaryDirection = (deg: number) => (variant === "over180" ? deg === 0 || deg === 180 : deg === 0);

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      <div
        className={`mb-3 text-center text-[12px] font-bold ${
          variant === "under180" ? "text-primary" : "text-red-400"
        }`}
      >
        {variant === "under180" ? "Bearing kurang daripada 180°" : "Bearing lebih daripada 180°"}
      </div>
      <div className="flex justify-center">
        <svg viewBox="0 0 300 300" className="w-full max-w-[280px]">
          <circle cx={cx} cy={cy} r="110" className="fill-background stroke-border" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="75" className="fill-none stroke-border" strokeWidth="1" />
          <line x1={cx} y1="25" x2={cx} y2="275" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
          {variant === "over180" && (
            <line x1="25" y1={cy} x2="275" y2={cy} className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
          )}
          {COMPASS_RING.map(({ code, deg }) => {
            const primary = isPrimaryDirection(deg);
            const pos = polarPoint(cx, cy, primary ? primaryLabelR : secondaryLabelR, deg);
            return (
              <text
                key={code}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={primary ? 11.5 : 7}
                fontWeight={primary ? 700 : 500}
                opacity={primary ? 1 : 0.55}
                className={primary ? "fill-foreground" : "fill-muted-foreground"}
              >
                {code} ({deg}°)
              </text>
            );
          })}

          {variant === "over180" && (
            <>
              <path
                d={arcPath(cx, cy, 118, 0, bearingDegrees)}
                fill="none"
                className="stroke-accent"
                strokeWidth="2"
                strokeDasharray="4 5"
                opacity="0.65"
              />
              <text
                x={polarPoint(cx, cy, 148, midDeg).x}
                y={polarPoint(cx, cy, 148, midDeg).y}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight={700}
                className="fill-accent"
              >
                Jumlah = {bearingDegrees}°
              </text>
              <path
                d={arcPath(cx, cy, 34, 180, bearingDegrees)}
                fill="none"
                className="stroke-amber-400"
                strokeWidth="2.5"
              />
              <text
                x={polarPoint(cx, cy, 52, 180 + props.residualAngle / 2).x}
                y={polarPoint(cx, cy, 52, 180 + props.residualAngle / 2).y}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight={700}
                className="fill-amber-400"
              >
                {props.residualAngle}°
              </text>
            </>
          )}

          {variant === "under180" && (
            <path d={arcPath(cx, cy, 40, 0, bearingDegrees)} fill="none" className="stroke-amber-400" strokeWidth="2.5" />
          )}
          {variant === "under180" && (
            <text
              x={polarPoint(cx, cy, 58, midDeg).x}
              y={polarPoint(cx, cy, 58, midDeg).y}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight={700}
              className="fill-amber-400"
            >
              {bearingDegrees}°
            </text>
          )}

          <line x1={cx} y1={cy} x2={target.x} y2={target.y} className="stroke-red-400" strokeWidth="2.5" />
          <circle cx={target.x} cy={target.y} r="5" className="fill-red-400" />
          <text
            x={polarPoint(cx, cy, 112, bearingDegrees).x}
            y={polarPoint(cx, cy, 112, bearingDegrees).y}
            textAnchor="middle"
            fontSize="11"
            fontWeight={700}
            className="fill-red-400"
          >
            Y
          </text>
          <circle cx={cx} cy={cy} r="5" className="fill-foreground" />
          <text x={cx - 22} y={cy + 4} textAnchor="middle" fontSize="10.5" fontWeight={700} className="fill-foreground">
            X
          </text>
        </svg>
      </div>
      <p className="mt-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Bearing Y dari X ={" "}
        <span className="font-semibold text-foreground">
          {variant === "over180"
            ? `180° + ${props.residualAngle}° = ${bearingDegrees}°`
            : `${bearingDegrees}°`}
        </span>
      </p>
    </div>
  );
}
