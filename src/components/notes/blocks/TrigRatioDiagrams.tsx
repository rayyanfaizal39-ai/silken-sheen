import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";
const HYP_COLOR = "#ff8a5c";

type Point = [number, number];
const sub = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]];
const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]];
const scale = (a: Point, s: number): Point => [a[0] * s, a[1] * s];
const norm = (a: Point): Point => {
  const m = Math.hypot(a[0], a[1]);
  return [a[0] / m, a[1] / m];
};
const mid = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

/** Small curved angle marker bulging away from `vertex`, between the rays toward n1 and n2. */
function angleMarker(vertex: Point, n1: Point, n2: Point, r = 16, bulge = 4, labelDist = 30) {
  const u1 = norm(sub(n1, vertex));
  const u2 = norm(sub(n2, vertex));
  const p1 = add(vertex, scale(u1, r));
  const p2 = add(vertex, scale(u2, r));
  const m = mid(p1, p2);
  const dir = norm(sub(m, vertex));
  const ctrl = add(m, scale(dir, bulge));
  const labelPos = add(vertex, scale(dir, labelDist));
  return { p1, p2, ctrl, labelPos };
}

// Fixed triangle geometry: right angle at RA, top vertex T (directly above RA),
// bottom-right vertex B. The hypotenuse TB always touches both acute-angle
// vertices; opposite/adjacent swap depending on which acute vertex is "anchor".
const RA: Point = [70, 110];
const T: Point = [70, 30];
const B: Point = [210, 110];

/**
 * Labeled right triangle showing opposite, adjacent and hypotenuse relative
 * to a marked acute angle θ. The hypotenuse never changes, but which side is
 * "opposite" and which is "adjacent" depends on which acute angle (`anchor`)
 * you're viewing from — this component re-anchors θ to either acute vertex
 * so a lesson can show both perspectives on the same fixed triangle. Ports
 * buildTriangleLabel's geometry, generalised to both acute vertices.
 */
export function TriangleLabel({
  anchor,
  thetaLabel,
  oppositeLabel,
  adjacentLabel,
  hypotenuseLabel,
  caption,
}: {
  /** Which acute vertex θ is marked at: "bottomRight" or "top". */
  anchor: "bottomRight" | "top";
  thetaLabel: string;
  oppositeLabel: string;
  adjacentLabel: string;
  hypotenuseLabel: string;
  caption?: string;
}) {
  const thetaVertex = anchor === "bottomRight" ? B : T;
  const otherAcute = anchor === "bottomRight" ? T : B;
  const marker = angleMarker(thetaVertex, RA, otherAcute);

  // Adjacent touches θ and is not the hypotenuse; opposite is the side that doesn't touch θ.
  const verticalSideLabel = anchor === "bottomRight" ? oppositeLabel : adjacentLabel;
  const horizontalSideLabel = anchor === "bottomRight" ? adjacentLabel : oppositeLabel;

  const vSideLabelPos = add(mid(RA, T), [-16, 0]);
  const hSideLabelPos = add(mid(RA, B), [0, 16]);
  const hypMid = mid(T, B);
  const hypDir = norm(sub(B, T));
  const perp: Point = [-hypDir[1], hypDir[0]];
  const towardInterior = norm(sub(RA, hypMid));
  const dot = perp[0] * towardInterior[0] + perp[1] * towardInterior[1];
  const exteriorPerp: Point = dot > 0 ? [-perp[0], -perp[1]] : perp;
  const hypLabelPos = add(hypMid, scale(exteriorPerp, 16));

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[300px]">
        <polygon
          points={`${RA[0]},${RA[1]} ${T[0]},${T[1]} ${B[0]},${B[1]}`}
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <rect
          x={RA[0]}
          y={RA[1] - 14}
          width={14}
          height={14}
          fill="none"
          stroke="#fff"
          strokeWidth={1}
        />
        <path
          d={`M${marker.p1[0]},${marker.p1[1]} Q${marker.ctrl[0]},${marker.ctrl[1]} ${marker.p2[0]},${marker.p2[1]}`}
          fill="none"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
        />
        <text
          x={marker.labelPos[0]}
          y={marker.labelPos[1]}
          fontSize={11}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {thetaLabel}
        </text>
        <text
          x={vSideLabelPos[0]}
          y={vSideLabelPos[1]}
          fontSize={10}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {verticalSideLabel}
        </text>
        <text
          x={hSideLabelPos[0]}
          y={hSideLabelPos[1]}
          fontSize={10}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {horizontalSideLabel}
        </text>
        <text
          x={hypLabelPos[0]}
          y={hypLabelPos[1]}
          fontSize={10}
          fill={HYP_COLOR}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {hypotenuseLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
