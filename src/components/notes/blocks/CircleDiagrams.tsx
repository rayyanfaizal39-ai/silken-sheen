import { MATH_AMBER, MATH_GREEN, MATH_ORANGE, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * One labeled diagram teaching radius / diameter / chord / arc / centre
 * together. Ports buildCircleParts exactly (static geometry); every label
 * is a plain-text prop (not SVG tspan) so it localizes correctly.
 */
export function CirclePartsDiagram({
  centreLabel,
  radiusLabel,
  diameterLabel,
  chordLabel,
  arcLabel,
  caption,
}: {
  centreLabel: string;
  radiusLabel: string;
  diameterLabel: string;
  chordLabel: string;
  arcLabel: string;
  caption?: string;
}) {
  const cx = 130;
  const cy = 75;
  const r = 55;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[290px]">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(139,107,255,0.06)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <circle cx={cx} cy={cy} r={2.5} fill={MATH_AMBER} />
        <text
          x={cx + 6}
          y={cy - 4}
          fontSize={10}
          fill={MATH_AMBER}
          fontFamily={FONT}
          fontWeight={700}
        >
          {centreLabel}
        </text>
        <line
          x1={cx}
          y1={cy}
          x2={cx + r * 0.7}
          y2={cy - r * 0.7}
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <text
          x={cx + r * 0.35 + 4}
          y={cy - r * 0.35}
          fontSize={10}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {radiusLabel}
        </text>
        <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={MATH_GREEN} strokeWidth={1.5} />
        <text
          x={cx}
          y={cy + 16}
          fontSize={10}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {diameterLabel}
        </text>
        <line
          x1={cx - r * 0.6}
          y1={cy + r * 0.55}
          x2={cx + r * 0.75}
          y2={cy + r * 0.35}
          stroke={MATH_ORANGE}
          strokeWidth={1.5}
        />
        <text
          x={cx + 10}
          y={cy + r * 0.35 - 8}
          fontSize={10}
          fill={MATH_ORANGE}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {chordLabel}
        </text>
        <path
          d={`M${cx + r * 0.7},${cy - r * 0.7} A${r},${r} 0 0 1 ${cx + r},${cy}`}
          fill="none"
          stroke={MATH_GREEN}
          strokeWidth={2.5}
        />
        <text
          x={cx + r + 14}
          y={cy - r * 0.25}
          fontSize={10}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {arcLabel}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A radius meeting a chord at a right angle, with a right-angle marker and
 * equal tick marks on each half — the visual tie-in to Pythagoras. Ports
 * buildChordBisect exactly (static geometry).
 */
export function ChordBisectionDiagram({
  equalHalvesLabel,
  caption,
}: {
  equalHalvesLabel: string;
  caption?: string;
}) {
  const cx = 130;
  const cy = 75;
  const r = 55;
  const chordY = cy + 20;
  const halfW = Math.sqrt(r * r - 20 * 20);
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[290px]">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(139,107,255,0.06)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <circle cx={cx} cy={cy} r={2.5} fill={MATH_AMBER} />
        <line
          x1={cx - halfW}
          y1={chordY}
          x2={cx + halfW}
          y2={chordY}
          stroke={MATH_ORANGE}
          strokeWidth={2}
        />
        <line x1={cx} y1={cy} x2={cx} y2={chordY} stroke={MATH_VIOLET} strokeWidth={1.5} />
        <rect
          x={cx - 8}
          y={chordY - 8}
          width={8}
          height={8}
          fill="none"
          stroke="#fff"
          strokeWidth={1}
        />
        <line
          x1={cx - halfW / 2 - 4}
          y1={chordY - 4}
          x2={cx - halfW / 2 + 4}
          y2={chordY + 4}
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <line
          x1={cx + halfW / 2 - 4}
          y1={chordY - 4}
          x2={cx + halfW / 2 + 4}
          y2={chordY + 4}
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={cx}
          y={chordY + 22}
          fontSize={10}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {equalHalvesLabel}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A circle sliced into alternating-colour wedges rearranged into a
 * rectangle — the visual proof for A=πr² (base ≈ half the circumference,
 * height = r). Wedge geometry computed dynamically from r/nWedge, and the
 * viewBox is sized from that same math so the rectangle never clips
 * regardless of how many wedges are used. In-diagram text is limited to
 * math notation ("r", "πr") — the full explanatory sentence is the
 * caller-supplied external caption.
 */
export function CircleUnrollDiagram({
  nWedge = 8,
  caption,
}: {
  nWedge?: number;
  caption?: string;
}) {
  const cx = 55;
  const cy = 65;
  const r = 45;
  const wedges: string[] = [];
  for (let i = 0; i < nWedge; i++) {
    const a1 = -Math.PI / 2 + (i * 2 * Math.PI) / nWedge;
    const a2 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / nWedge;
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    wedges.push(`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`);
  }
  const rectX = 140;
  const rectY = 20;
  const rectH = r;
  const rw = (Math.PI * r) / nWedge;
  const totalRectW = rw * nWedge;
  const vbW = rectX + totalRectW + 15;
  const vbH = Math.max(cy + r + 10, rectY + rectH + 30);

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${vbW} ${vbH}`} className="w-full max-w-[320px]">
        {wedges.map((d, i) => (
          <path
            key={`w${i}`}
            d={d}
            fill={i % 2 === 0 ? "rgba(139,107,255,0.35)" : "rgba(74,222,128,0.3)"}
            stroke="#0d0620"
            strokeWidth={0.5}
          />
        ))}
        <text
          x={(cx + r + rectX) / 2}
          y={cy + 5}
          fontSize={16}
          fill="#6b7593"
          textAnchor="middle"
          fontFamily={FONT}
        >
          →
        </text>
        {Array.from({ length: nWedge }, (_, i) => (
          <rect
            key={`r${i}`}
            x={rectX + i * rw}
            y={rectY}
            width={rw}
            height={rectH}
            fill={i % 2 === 0 ? "rgba(139,107,255,0.35)" : "rgba(74,222,128,0.3)"}
            stroke="#0d0620"
            strokeWidth={0.5}
          />
        ))}
        <text
          x={rectX + (nWedge * rw) / 2}
          y={rectY + rectH + 16}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          πr
        </text>
        <text
          x={rectX - 8}
          y={rectY + rectH / 2}
          fontSize={11}
          fill="#fff"
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          r
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
