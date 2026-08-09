import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A right-angled triangle drawn on a coordinate grid — horizontal leg,
 * vertical leg, and the hypotenuse labeled "distance". Deliberately reuses
 * the Pythagoras concept from an earlier chapter rather than presenting the
 * distance formula as something new. Ports buildDistanceGrid, fixing a
 * template-literal bug in the source that silently dropped the horizontal
 * gridlines (their y1 was the literal string "10+30" instead of 40).
 */
export function DistanceGridDiagram({
  horizontalLabel,
  verticalLabel,
  distanceLabel,
  caption,
}: {
  horizontalLabel: string;
  verticalLabel: string;
  distanceLabel: string;
  caption?: string;
}) {
  const ox = 30;
  const oy = 130;
  const ax = ox + 30;
  const ay = oy - 30;
  const bx = ox + 150;
  const by = oy - 100;
  const vLines = Array.from({ length: 7 }, (_, i) => ox + i * 30);
  const hLines = Array.from({ length: 5 }, (_, j) => 10 + j * 30);

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 250 150" className="w-full max-w-[280px]">
        {vLines.map((x, i) => (
          <line
            key={`v${i}`}
            x1={x}
            y1={10}
            x2={x}
            y2={oy}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}
        {hLines.map((y, j) => (
          <line
            key={`h${j}`}
            x1={ox}
            y1={y}
            x2={ox + 180}
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}
        <line
          x1={ax}
          y1={ay}
          x2={bx}
          y2={ay}
          stroke={MATH_AMBER}
          strokeWidth={1.5}
          strokeDasharray="3,2"
        />
        <line
          x1={bx}
          y1={ay}
          x2={bx}
          y2={by}
          stroke={MATH_AMBER}
          strokeWidth={1.5}
          strokeDasharray="3,2"
        />
        <line x1={ax} y1={ay} x2={bx} y2={by} stroke={MATH_GREEN} strokeWidth={2.5} />
        <circle cx={ax} cy={ay} r={3.5} fill={MATH_VIOLET} />
        <circle cx={bx} cy={by} r={3.5} fill={MATH_VIOLET} />
        <text
          x={(ax + bx) / 2}
          y={ay + 16}
          fontSize={10}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {horizontalLabel}
        </text>
        <text
          x={bx + 8}
          y={(ay + by) / 2}
          fontSize={10}
          fill={MATH_AMBER}
          fontFamily={FONT}
          fontWeight={700}
        >
          {verticalLabel}
        </text>
        <text
          x={(ax + bx) / 2 - 10}
          y={(ay + by) / 2 - 8}
          fontSize={10}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {distanceLabel}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Two points joined by a line, with the midpoint marked between them.
 * Ports buildMidpointDemo exactly (static geometry).
 */
export function MidpointDiagram({
  pointALabel,
  pointBLabel,
  midpointLabel,
  caption,
}: {
  pointALabel: string;
  pointBLabel: string;
  midpointLabel: string;
  caption?: string;
}) {
  const ax = 30;
  const ay = 110;
  const bx = 200;
  const by = 25;
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 250 140" className="w-full max-w-[280px]">
        <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#fff" strokeWidth={1.5} />
        <circle cx={ax} cy={ay} r={4} fill={MATH_VIOLET} />
        <text
          x={ax - 8}
          y={ay + 16}
          fontSize={10}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {pointALabel}
        </text>
        <circle cx={bx} cy={by} r={4} fill={MATH_GREEN} />
        <text
          x={bx + 10}
          y={by - 4}
          fontSize={10}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {pointBLabel}
        </text>
        <circle cx={mx} cy={my} r={5} fill={MATH_AMBER} stroke="#fff" strokeWidth={1.3} />
        <text
          x={mx}
          y={my - 12}
          fontSize={11}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {midpointLabel}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
