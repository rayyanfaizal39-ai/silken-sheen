import { MATH_AMBER, MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Side-by-side valid (green, same shape moved) vs invalid (red, shape
 * distorted) comparison for Chapter 11.1. Only the ✓/✗ symbols live inside
 * the SVG — the two descriptive captions render as plain HTML below it. An
 * earlier version of this chapter put the full bilingual sentences inside
 * the SVG with text-anchor="middle"; since SVG text never wraps, the two
 * captions overflowed their half of the canvas and overlapped. Keep
 * descriptive text OUTSIDE the SVG when porting or extending this pattern.
 */
export function TransformCompare({
  validLabel,
  invalidLabel,
}: {
  validLabel: string;
  invalidLabel: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 90" className="w-full max-w-[320px]">
        <polygon
          points="20,70 45,70 45,45 20,45"
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <polygon
          points="70,60 95,60 95,35 70,35"
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={57}
          y={85}
          fontSize={11}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          ✓
        </text>
        <polygon
          points="150,70 178,70 172,45 158,40"
          fill="rgba(248,113,113,0.15)"
          stroke={MATH_RED}
          strokeWidth={1.5}
        />
        <polygon
          points="200,65 235,60 220,30 195,40"
          fill="rgba(248,113,113,0.15)"
          stroke={MATH_RED}
          strokeWidth={1.5}
        />
        <text
          x={197}
          y={85}
          fontSize={11}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          ✗
        </text>
      </svg>
      <div className="mt-1.5 flex w-full max-w-[320px] justify-around gap-3">
        <p className="flex-1 text-center text-[11.5px] text-slate-500">{validLabel}</p>
        <p className="flex-1 text-center text-[11.5px] text-slate-500">{invalidLabel}</p>
      </div>
    </div>
  );
}

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 6): string {
  const backAngle = Math.atan2(y2 - y1, x2 - x1) + Math.PI;
  const spread = 0.45;
  const c1x = x2 + size * Math.cos(backAngle + spread);
  const c1y = y2 + size * Math.sin(backAngle + spread);
  const c2x = x2 + size * Math.cos(backAngle - spread);
  const c2y = y2 + size * Math.sin(backAngle - spread);
  return `${x2},${y2} ${c1x},${c1y} ${c2x},${c2y}`;
}

/**
 * A translation vector with dashed sideways/up component lines, labeled a
 * and b. Ports buildVector exactly (static geometry), with the arrowhead
 * drawn as a plain polygon instead of an SVG <marker> so the id can't
 * collide if this component is ever rendered more than once on a page.
 */
export function VectorArrow({
  sidewaysLabel,
  upLabel,
  caption,
}: {
  sidewaysLabel: string;
  upLabel: string;
  caption?: string;
}) {
  const ox = 40;
  const oy = 90;
  const tx = 150;
  const ty = 20;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 240 110" className="w-full max-w-[300px]">
        <line x1={ox} y1={oy} x2={tx} y2={ty} stroke={MATH_GREEN} strokeWidth={2.5} />
        <polygon points={arrowHead(ox, oy, tx, ty)} fill={MATH_GREEN} />
        <line
          x1={ox}
          y1={oy}
          x2={tx}
          y2={oy}
          stroke={MATH_AMBER}
          strokeWidth={1.3}
          strokeDasharray="3,2"
        />
        <line
          x1={tx}
          y1={oy}
          x2={tx}
          y2={ty}
          stroke={MATH_VIOLET}
          strokeWidth={1.3}
          strokeDasharray="3,2"
        />
        <text
          x={95}
          y={oy + 14}
          fontSize={10}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {sidewaysLabel}
        </text>
        <text
          x={tx + 10}
          y={55}
          fontSize={10}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {upLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Object and image shown equidistant from a dashed axis of reflection. Ports
 * buildMirror exactly (static geometry).
 */
export function MirrorDiagram({
  axisLabel,
  objectLabel,
  imageLabel,
  caption,
}: {
  axisLabel: string;
  objectLabel: string;
  imageLabel: string;
  caption?: string;
}) {
  const axisX = 130;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 110" className="w-full max-w-[320px]">
        <line
          x1={axisX}
          y1={10}
          x2={axisX}
          y2={100}
          stroke="#fff"
          strokeWidth={1.3}
          strokeDasharray="4,3"
        />
        <polygon
          points="60,80 90,80 90,55 60,55"
          fill="rgba(139,107,255,0.2)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <polygon
          points="200,80 170,80 170,55 200,55"
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <line
          x1={90}
          y1={65}
          x2={170}
          y2={65}
          stroke={MATH_AMBER}
          strokeWidth={1}
          strokeDasharray="2,2"
        />
        <text x={axisX} y={8} fontSize={9} fill="#fff" textAnchor="middle" fontFamily={FONT}>
          {axisLabel}
        </text>
        <text
          x={75}
          y={95}
          fontSize={9}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {objectLabel}
        </text>
        <text
          x={185}
          y={95}
          fontSize={9}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {imageLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Object and image around a fixed centre point with an angle arc. Ports
 * buildRotation exactly. An earlier version placed the image triangle at
 * negative y-coordinates, pushing the whole shape and its label above the
 * top edge of the viewBox — invisible. All coordinates here are positive
 * and stay within the 260×150 viewBox with real margin; verify that again
 * before changing any of the numbers below.
 */
export function RotationDiagram({
  centreLabel,
  objectLabel,
  imageLabel,
  caption,
}: {
  centreLabel: string;
  objectLabel: string;
  imageLabel: string;
  caption?: string;
}) {
  const cx = 130;
  const cy = 95;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[320px]">
        <circle cx={cx} cy={cy} r={3} fill={MATH_AMBER} />
        <text
          x={cx + 8}
          y={cy - 6}
          fontSize={9}
          fill={MATH_AMBER}
          fontFamily={FONT}
          fontWeight={700}
        >
          {centreLabel}
        </text>
        <polygon
          points="40,110 65,110 65,85"
          fill="rgba(139,107,255,0.2)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <polygon
          points="145,55 145,30 170,30"
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <path
          d={`M105,${cy} A25,25 0 0 1 ${cx},70`}
          fill="none"
          stroke="#fff"
          strokeWidth={1}
          strokeDasharray="2,2"
        />
        <text x={40} y={124} fontSize={9} fill={MATH_VIOLET} fontFamily={FONT} fontWeight={700}>
          {objectLabel}
        </text>
        <text x={145} y={23} fontSize={9} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {imageLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A shape shown at multiple rotated positions overlaid — an equilateral
 * triangle at 0°/120°/240° for order-3 rotational symmetry. Ports
 * buildRotSymmetry's geometry; viewBox widened from the mockup's 200×110 to
 * 240×110 and the label font size trimmed slightly so the longer Malay
 * labels ("selepas 120°"/"selepas 240°" vs "after 120°"/"after 240°") stay
 * inside the right edge.
 */
export function RotationalSymmetry({
  startLabel,
  after1Label,
  after2Label,
  caption,
}: {
  startLabel: string;
  after1Label: string;
  after2Label: string;
  caption?: string;
}) {
  const cx = 60;
  const cy = 55;
  const r = 40;
  const triAt = (rot: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 3; i++) {
      const a = rot + (i * 2 * Math.PI) / 3;
      pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    }
    return pts.join(" ");
  };
  const rots = [-Math.PI / 2, -Math.PI / 2 + (2 * Math.PI) / 3, -Math.PI / 2 + (4 * Math.PI) / 3];
  const colors = [MATH_VIOLET, MATH_GREEN, MATH_AMBER];
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 240 110" className="w-full max-w-[300px]">
        {rots.map((rot, i) => (
          <polygon
            key={i}
            points={triAt(rot)}
            fill="none"
            stroke={colors[i]}
            strokeWidth={1.5}
            strokeDasharray={i === 0 ? "none" : "4,3"}
          />
        ))}
        <circle cx={cx} cy={cy} r={2} fill="#fff" />
        <text x={125} y={30} fontSize={8.5} fill={MATH_VIOLET} fontFamily={FONT} fontWeight={700}>
          {startLabel}
        </text>
        <text x={125} y={50} fontSize={8.5} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {after1Label}
        </text>
        <text x={125} y={70} fontSize={8.5} fill={MATH_AMBER} fontFamily={FONT} fontWeight={700}>
          {after2Label}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
