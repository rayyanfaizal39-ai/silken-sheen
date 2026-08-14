import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A flat "object" (violet parallelogram) with four dashed amber normal
 * lines dropping straight down at 90° onto a horizontal plane, landing as a
 * highlighted green outline — the visual proof of what an orthogonal
 * projection actually is. Ports buildOrthoProject's geometry exactly; all
 * coordinates stay within the 220×130 viewBox with real margin.
 */
export function NormalProjectionDiagram({
  objectLabel,
  planeLabel,
  projectionLabel,
  caption,
}: {
  objectLabel: string;
  planeLabel: string;
  projectionLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 130" className="w-full max-w-[280px]">
        <polygon
          points="60,20 140,20 150,35 70,35"
          fill="rgba(139,107,255,0.15)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <text
          x={105}
          y={15}
          fontSize={9}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {objectLabel}
        </text>
        <line
          x1={60}
          y1={20}
          x2={60}
          y2={90}
          stroke={MATH_AMBER}
          strokeWidth={1}
          strokeDasharray="3,2"
        />
        <line
          x1={140}
          y1={20}
          x2={140}
          y2={90}
          stroke={MATH_AMBER}
          strokeWidth={1}
          strokeDasharray="3,2"
        />
        <line
          x1={70}
          y1={35}
          x2={70}
          y2={105}
          stroke={MATH_AMBER}
          strokeWidth={1}
          strokeDasharray="3,2"
        />
        <line
          x1={150}
          y1={35}
          x2={150}
          y2={105}
          stroke={MATH_AMBER}
          strokeWidth={1}
          strokeDasharray="3,2"
        />
        <polygon
          points="10,90 190,90 190,110 10,110"
          fill="rgba(255,255,255,0.04)"
          stroke="#fff"
          strokeWidth={1.3}
        />
        <text x={100} y={123} fontSize={9} fill="#fff" textAnchor="middle" fontFamily={FONT}>
          {planeLabel}
        </text>
        <polygon
          points="60,90 140,90 150,105 70,105"
          fill="rgba(91,227,176,0.25)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={105}
          y={99}
          fontSize={8}
          fill="#0d0620"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {projectionLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Plan / front-elevation / side-elevation triptych shown side by side —
 * illustrates that any 3D object is fully described by these three flat
 * views. Ports buildThreeView's geometry exactly.
 */
export function ThreeViewLayoutDiagram({
  planLabel,
  frontLabel,
  sideLabel,
  caption,
}: {
  planLabel: string;
  frontLabel: string;
  sideLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 130" className="w-full max-w-[320px]">
        <rect
          x={15}
          y={15}
          width={60}
          height={35}
          fill="rgba(139,107,255,0.15)"
          stroke={MATH_VIOLET}
          strokeWidth={1.3}
        />
        <text
          x={45}
          y={60}
          fontSize={9}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {planLabel}
        </text>
        <rect
          x={100}
          y={15}
          width={60}
          height={25}
          fill="rgba(91,227,176,0.15)"
          stroke={MATH_GREEN}
          strokeWidth={1.3}
        />
        <line
          x1={100}
          y1={30}
          x2={160}
          y2={30}
          stroke={MATH_GREEN}
          strokeWidth={1}
          strokeDasharray="2,2"
        />
        <text
          x={130}
          y={60}
          fontSize={9}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {frontLabel}
        </text>
        <rect
          x={185}
          y={15}
          width={40}
          height={25}
          fill="rgba(255,185,55,0.15)"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
        />
        <text
          x={205}
          y={60}
          fontSize={9}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {sideLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
