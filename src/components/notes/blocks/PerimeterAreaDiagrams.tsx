import { MATH_AMBER, MATH_GREEN, MATH_ORANGE, MATH_RED } from "./mathTheme";

const FAINT = "#6b7593";
const FONT = "'Space Grotesk', sans-serif";

/** Rectangle with length/width labels; unknownSide (if given) highlights that label in amber. Ports buildRectanglePerim. */
export function RectanglePerimeterDiagram({
  lenLabel,
  widLabel,
  unknownSide = null,
}: {
  lenLabel: string;
  widLabel: string;
  unknownSide?: "len" | "wid" | null;
}) {
  const ox = 55;
  const oy = 85;
  const rw = 130;
  const rh = 55;
  const color = (s: "len" | "wid") => (s === unknownSide ? MATH_AMBER : "#fff");
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 210 110" className="w-full max-w-[240px]">
        <rect
          x={ox}
          y={oy - rh}
          width={rw}
          height={rh}
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <text
          x={ox + rw / 2}
          y={oy + 16}
          fontSize={12}
          fill={color("len")}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {lenLabel}
        </text>
        <text
          x={ox - 10}
          y={oy - rh / 2}
          fontSize={12}
          fill={color("wid")}
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          {widLabel}
        </text>
      </svg>
    </div>
  );
}

/** Schematic L-shape matching the 10.1 worked example (9,4,3,4,6 cm known, VW missing). Ports buildLShapePerim exactly (static). */
export function LShapePerimeterDiagram() {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 230 150" className="w-full max-w-[260px]">
        <polygon
          points="50,20 140,20 140,60 190,60 190,130 50,130"
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <text
          x={95}
          y={14}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          9 cm
        </text>
        <text
          x={148}
          y={43}
          fontSize={11}
          fill="#fff"
          textAnchor="start"
          fontFamily={FONT}
          fontWeight={700}
        >
          4 cm
        </text>
        <text
          x={198}
          y={98}
          fontSize={11}
          fill="#fff"
          textAnchor="start"
          fontFamily={FONT}
          fontWeight={700}
        >
          6 cm
        </text>
        <text
          x={120}
          y={145}
          fontSize={11}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          VW = ?
        </text>
        <text
          x={40}
          y={78}
          fontSize={11}
          fill="#fff"
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          4 cm
        </text>
        <text
          x={165}
          y={98}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          3 cm
        </text>
      </svg>
    </div>
  );
}

/** Large square overlapping a small square at one corner, each labeled with its side length. Ports buildOverlapSquares. */
export function OverlappingSquaresDiagram({ l1, l2 }: { l1: string; l2: string }) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 190 120" className="w-full max-w-[210px]">
        <rect
          x={20}
          y={20}
          width={90}
          height={90}
          fill="rgba(139,107,255,0.1)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <rect
          x={95}
          y={20}
          width={24}
          height={24}
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={65}
          y={128}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {l1}
        </text>
        <text
          x={107}
          y={14}
          fontSize={11}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {l2}
        </text>
      </svg>
    </div>
  );
}

/** Land-plot schematic (PQTV) with a smaller region marked "given away". Ports buildLandPlot. */
export function LandPlotDiagram({ givenAwayLabel }: { givenAwayLabel: string }) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 200 130" className="w-full max-w-[220px]">
        <polygon
          points="20,20 160,20 160,110 100,110 100,70 20,70"
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <polygon
          points="100,70 100,110 60,110"
          fill="rgba(248,113,113,0.15)"
          stroke={MATH_RED}
          strokeWidth={1.2}
          strokeDasharray="3,2"
        />
        <text
          x={90}
          y={14}
          fontSize={10.5}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          PQTV
        </text>
        <text
          x={80}
          y={98}
          fontSize={10}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {givenAwayLabel}
        </text>
      </svg>
    </div>
  );
}

/** Triangle with a dashed perpendicular height line from the apex to the base. Ports buildTriangleArea. */
export function TriangleAreaDiagram({
  baseLabel,
  heightLabel,
}: {
  baseLabel: string;
  heightLabel: string;
}) {
  const ox = 25;
  const oy = 95;
  const bw = 120;
  const apexX = 75;
  const apexY = 20;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 170 120" className="w-full max-w-[190px]">
        <polygon
          points={`${ox},${oy} ${ox + bw},${oy} ${apexX},${apexY}`}
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <line
          x1={apexX}
          y1={apexY}
          x2={apexX}
          y2={oy}
          stroke={MATH_ORANGE}
          strokeWidth={1.3}
          strokeDasharray="4,3"
        />
        <rect
          x={apexX}
          y={oy - 8}
          width={8}
          height={8}
          fill="none"
          stroke={MATH_ORANGE}
          strokeWidth={1}
        />
        <text
          x={ox + bw / 2}
          y={oy + 18}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {baseLabel}
        </text>
        <text
          x={apexX + 10}
          y={(apexY + oy) / 2}
          fontSize={12}
          fill={MATH_ORANGE}
          textAnchor="start"
          fontFamily={FONT}
          fontWeight={700}
        >
          {heightLabel}
        </text>
      </svg>
    </div>
  );
}

/** Parallelogram with a dashed perpendicular height line. Ports buildParallelogramArea. */
export function ParallelogramAreaDiagram({
  baseLabel,
  heightLabel,
}: {
  baseLabel: string;
  heightLabel: string;
}) {
  const ox = 45;
  const oy = 90;
  const bw = 110;
  const slant = 35;
  const ph = 55;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[220px]">
        <polygon
          points={`${ox},${oy} ${ox + bw},${oy} ${ox + bw + slant},${oy - ph} ${ox + slant},${oy - ph}`}
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <line
          x1={ox + slant}
          y1={oy - ph}
          x2={ox + slant}
          y2={oy}
          stroke={MATH_ORANGE}
          strokeWidth={1.3}
          strokeDasharray="4,3"
        />
        <rect
          x={ox + slant}
          y={oy - 8}
          width={8}
          height={8}
          fill="none"
          stroke={MATH_ORANGE}
          strokeWidth={1}
        />
        <text
          x={ox + bw / 2}
          y={oy + 18}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {baseLabel}
        </text>
        <text
          x={ox + slant - 12}
          y={oy - ph / 2}
          fontSize={12}
          fill={MATH_ORANGE}
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          {heightLabel}
        </text>
      </svg>
    </div>
  );
}

/** Kite with both dashed diagonals shown. Ports buildKiteArea. */
export function KiteAreaDiagram({ d1Label, d2Label }: { d1Label: string; d2Label: string }) {
  const cx = 85;
  const cy = 60;
  const halfW = 55;
  const topH = 25;
  const botH = 45;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 170 120" className="w-full max-w-[190px]">
        <polygon
          points={`${cx},${cy - topH - 20} ${cx + halfW},${cy} ${cx},${cy + botH} ${cx - halfW},${cy}`}
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <line
          x1={cx - halfW}
          y1={cy}
          x2={cx + halfW}
          y2={cy}
          stroke={MATH_ORANGE}
          strokeWidth={1.3}
          strokeDasharray="4,3"
        />
        <line
          x1={cx}
          y1={cy - topH - 20}
          x2={cx}
          y2={cy + botH}
          stroke={MATH_GREEN}
          strokeWidth={1.3}
          strokeDasharray="4,3"
        />
        <rect
          x={cx - 6}
          y={cy - 6}
          width={6}
          height={6}
          fill="none"
          stroke="#fff"
          strokeWidth={1}
        />
        <text
          x={cx}
          y={cy - topH - 26}
          fontSize={12}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {d2Label}
        </text>
        <text
          x={cx + halfW + 8}
          y={cy + 4}
          fontSize={12}
          fill={MATH_ORANGE}
          textAnchor="start"
          fontFamily={FONT}
          fontWeight={700}
        >
          {d1Label}
        </text>
      </svg>
    </div>
  );
}

/** Trapezium with a dashed perpendicular height line. Ports buildTrapeziumArea. */
export function TrapeziumAreaDiagram({
  aLabel,
  bLabel,
  heightLabel,
}: {
  aLabel: string;
  bLabel: string;
  heightLabel: string;
}) {
  const ox = 45;
  const oy = 90;
  const topW = 60;
  const botW = 110;
  const topX = 65;
  const ph = 55;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[220px]">
        <polygon
          points={`${topX},${oy - ph} ${topX + topW},${oy - ph} ${ox + botW},${oy} ${ox},${oy}`}
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <line
          x1={topX}
          y1={oy - ph}
          x2={topX}
          y2={oy}
          stroke={MATH_ORANGE}
          strokeWidth={1.3}
          strokeDasharray="4,3"
        />
        <rect
          x={topX}
          y={oy - 8}
          width={8}
          height={8}
          fill="none"
          stroke={MATH_ORANGE}
          strokeWidth={1}
        />
        <text
          x={topX + topW / 2}
          y={oy - ph - 8}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {aLabel}
        </text>
        <text
          x={ox + botW / 2}
          y={oy + 18}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {bLabel}
        </text>
        <text
          x={topX - 12}
          y={oy - ph / 2}
          fontSize={12}
          fill={MATH_ORANGE}
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          {heightLabel}
        </text>
      </svg>
    </div>
  );
}

/**
 * 2×2 grid of the four area-formula diagrams (triangle/parallelogram/kite/
 * trapezium) with generic base/height/diagonal labels, plus a shared
 * caption. Ports buildAreaFormulaDiagrams exactly — embedded once in 10.2's
 * lesson intro.
 */
export function AreaFormulaDiagramsGrid({
  titles,
  subLabels,
  caption,
}: {
  titles: { triangle: string; parallelogram: string; kite: string; trapezium: string };
  subLabels: { base: string; height: string; d1: string; d2: string; a: string; b: string };
  caption: string;
}) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2.5">
        <div className="text-center">
          <div className="mb-1 text-[11px]" style={{ color: FAINT }}>
            {titles.triangle}
          </div>
          <TriangleAreaDiagram baseLabel={subLabels.base} heightLabel={subLabels.height} />
        </div>
        <div className="text-center">
          <div className="mb-1 text-[11px]" style={{ color: FAINT }}>
            {titles.parallelogram}
          </div>
          <ParallelogramAreaDiagram baseLabel={subLabels.base} heightLabel={subLabels.height} />
        </div>
        <div className="text-center">
          <div className="mb-1 text-[11px]" style={{ color: FAINT }}>
            {titles.kite}
          </div>
          <KiteAreaDiagram d1Label={subLabels.d1} d2Label={subLabels.d2} />
        </div>
        <div className="text-center">
          <div className="mb-1 text-[11px]" style={{ color: FAINT }}>
            {titles.trapezium}
          </div>
          <TrapeziumAreaDiagram
            aLabel={subLabels.a}
            bLabel={subLabels.b}
            heightLabel={subLabels.height}
          />
        </div>
      </div>
      <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>
    </div>
  );
}

/** Rectangle containing a shaded triangle sharing its width and length. Ports buildTriangleInRect. */
export function TriangleInRectDiagram({
  widthLabel,
  lengthLabel,
}: {
  widthLabel: string;
  lengthLabel: string;
}) {
  const ox = 55;
  const oy = 90;
  const rw = 130;
  const rh = 55;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 210 110" className="w-full max-w-[240px]">
        <rect
          x={ox}
          y={oy - rh}
          width={rw}
          height={rh}
          fill="rgba(139,107,255,0.05)"
          stroke="#fff"
          strokeWidth={1.3}
        />
        <polygon
          points={`${ox},${oy - rh} ${ox + rw},${oy} ${ox},${oy}`}
          fill="rgba(251,191,90,0.15)"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
        />
        <text
          x={ox + rw / 2}
          y={oy + 16}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {lengthLabel}
        </text>
        <text
          x={ox - 12}
          y={oy - rh / 2}
          fontSize={12}
          fill="#fff"
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          {widthLabel}
        </text>
      </svg>
    </div>
  );
}

/** A square with its area and side-length labels. Ports buildSquareArea. */
export function SquareAreaDiagram({
  areaLabel,
  sideLabel,
}: {
  areaLabel: string;
  sideLabel: string;
}) {
  const ox = 45;
  const oy = 90;
  const s = 70;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 170 110" className="w-full max-w-[190px]">
        <rect
          x={ox}
          y={oy - s}
          width={s}
          height={s}
          fill="rgba(139,107,255,0.1)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <text
          x={ox + s / 2}
          y={oy - s / 2 + 4}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {areaLabel}
        </text>
        <text
          x={ox + s / 2}
          y={oy + 18}
          fontSize={12}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {sideLabel}
        </text>
      </svg>
    </div>
  );
}

/** Two rectangles of different proportions side by side, each labeled, to compare their areas. Ports buildTwoRectCompare. */
export function TwoRectCompareDiagram({
  w1,
  h1,
  l1,
  w2,
  h2,
  l2,
}: {
  w1: number;
  h1: number;
  l1: string;
  w2: number;
  h2: number;
  l2: string;
}) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[220px]">
        <rect
          x={15}
          y={75 - h1}
          width={w1}
          height={h1}
          fill="rgba(139,107,255,0.1)"
          stroke="#fff"
          strokeWidth={1.3}
        />
        <text
          x={15 + w1 / 2}
          y={90}
          fontSize={10.5}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {l1}
        </text>
        <rect
          x={120}
          y={75 - h2}
          width={w2}
          height={h2}
          fill="rgba(74,222,128,0.15)"
          stroke={MATH_GREEN}
          strokeWidth={1.3}
        />
        <text
          x={120 + w2 / 2}
          y={90}
          fontSize={10.5}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {l2}
        </text>
      </svg>
    </div>
  );
}
