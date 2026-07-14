export interface CompassRoseDirection {
  code: string;
  name: string;
  type: "utama" | "perantaraan";
  note?: string;
}

const DIRECTION_DEGREES: Record<string, number> = {
  U: 0,
  TL: 45,
  T: 90,
  Tg: 135,
  S: 180,
  BD: 225,
  B: 270,
  BL: 315,
};

function polarPoint(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

export function CompassRose({ directions }: { directions: CompassRoseDirection[] }) {
  const cx = 190;
  const cy = 190;
  const outerR = 140;
  const innerR = 100;
  const labelR = 158;

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <svg viewBox="0 0 380 380" className="mx-auto w-full max-w-[320px]">
        <circle cx={cx} cy={cy} r={outerR} className="fill-background stroke-border" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={innerR} className="fill-none stroke-border" strokeWidth="1" />
        {directions.map((d) => {
          const deg = DIRECTION_DEGREES[d.code] ?? 0;
          const isMain = d.type === "utama";
          const tip = polarPoint(cx, cy, isMain ? 122 : 100, deg);
          const label = polarPoint(cx, cy, labelR, deg);
          return (
            <g key={d.code}>
              <line
                x1={cx}
                y1={cy}
                x2={tip.x}
                y2={tip.y}
                className={isMain ? "stroke-primary" : "stroke-accent"}
                strokeWidth={isMain ? 3 : 2}
                opacity={isMain ? 1 : 0.75}
              />
              <circle cx={tip.x} cy={tip.y} r={isMain ? 4 : 3} className={isMain ? "fill-primary" : "fill-accent"} />
              <text
                x={label.x}
                y={label.y - 4}
                textAnchor="middle"
                fontSize={isMain ? 15 : 12}
                fontWeight={700}
                className="fill-foreground"
              >
                {d.code}
              </text>
              <text
                x={label.x}
                y={label.y + 9}
                textAnchor="middle"
                fontSize={8.5}
                className="fill-muted-foreground"
              >
                {d.name} · {deg}°
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="8" className="fill-amber-400" />
      </svg>
      <p className="mt-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        4 arah utama (biru) + 4 arah perantaraan (ungu) — setiap satu tepat di tengah dua arah utama.
      </p>
    </div>
  );
}
