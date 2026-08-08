import type { ReactNode } from "react";
import { MATH_AMBER, MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

export interface Shape3DLabels {
  prism: string;
  pyramid: string;
  cylinder: string;
  cone: string;
  sphere: string;
}

/**
 * Five small comparison icons — prism, pyramid, cylinder, cone, sphere —
 * side by side, so the flat-vs-curved / one-base-vs-two distinction reads
 * at a glance. Ports buildShapeCompare's five hand-drawn icons exactly.
 */
export function Shape3DIcons({ labels, caption }: { labels: Shape3DLabels; caption?: string }) {
  const items: { key: keyof Shape3DLabels; svg: ReactNode }[] = [
    {
      key: "prism",
      svg: (
        <>
          <polygon
            points="10,45 30,45 40,30 20,30"
            fill="rgba(139,107,255,0.2)"
            stroke={MATH_VIOLET}
            strokeWidth={1.3}
          />
          <polygon
            points="10,45 20,30 20,15 10,30"
            fill="rgba(139,107,255,0.35)"
            stroke={MATH_VIOLET}
            strokeWidth={1.3}
          />
          <polygon
            points="20,30 20,15 40,15 40,30"
            fill="rgba(139,107,255,0.1)"
            stroke={MATH_VIOLET}
            strokeWidth={1.3}
          />
        </>
      ),
    },
    {
      key: "pyramid",
      svg: (
        <>
          <polygon
            points="25,10 45,42 5,42"
            fill="rgba(74,222,128,0.2)"
            stroke={MATH_GREEN}
            strokeWidth={1.3}
          />
          <line x1={25} y1={10} x2={25} y2={42} stroke={MATH_GREEN} strokeWidth={1} />
        </>
      ),
    },
    {
      key: "cylinder",
      svg: (
        <>
          <ellipse
            cx={25}
            cy={12}
            rx={15}
            ry={6}
            fill="rgba(251,191,90,0.2)"
            stroke={MATH_AMBER}
            strokeWidth={1.3}
          />
          <line x1={10} y1={12} x2={10} y2={38} stroke={MATH_AMBER} strokeWidth={1.3} />
          <line x1={40} y1={12} x2={40} y2={38} stroke={MATH_AMBER} strokeWidth={1.3} />
          <ellipse
            cx={25}
            cy={38}
            rx={15}
            ry={6}
            fill="rgba(251,191,90,0.1)"
            stroke={MATH_AMBER}
            strokeWidth={1.3}
          />
        </>
      ),
    },
    {
      key: "cone",
      svg: (
        <>
          <ellipse
            cx={25}
            cy={38}
            rx={15}
            ry={6}
            fill="rgba(248,113,113,0.15)"
            stroke={MATH_RED}
            strokeWidth={1.3}
          />
          <line x1={10} y1={38} x2={25} y2={8} stroke={MATH_RED} strokeWidth={1.3} />
          <line x1={40} y1={38} x2={25} y2={8} stroke={MATH_RED} strokeWidth={1.3} />
        </>
      ),
    },
    {
      key: "sphere",
      svg: (
        <>
          <circle
            cx={25}
            cy={25}
            r={17}
            fill="rgba(139,107,255,0.15)"
            stroke="#fff"
            strokeWidth={1.3}
          />
          <ellipse
            cx={25}
            cy={25}
            rx={17}
            ry={6}
            fill="none"
            stroke="#fff"
            strokeWidth={0.8}
            opacity={0.5}
          />
        </>
      ),
    },
  ];

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-3.5">
        {items.map((it) => (
          <div key={it.key} className="text-center">
            <svg width={50} height={50} viewBox="0 0 50 50">
              {it.svg}
            </svg>
            <div className="mt-0.5 text-[10px] text-slate-500">{labels[it.key]}</div>
          </div>
        ))}
      </div>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * The classic cross-shaped cube net — 6 squares arranged so folding along
 * every edge closes up perfectly into a cube. Ports buildCubeNet exactly
 * (static geometry).
 */
export function CubeNetDiagram({ caption }: { caption?: string }) {
  const s = 32;
  const squares: [number, number][] = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
  ];
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 160 115" className="w-full max-w-[220px]">
        {squares.map(([col, row], i) => (
          <rect
            key={i}
            x={col * s + 10}
            y={row * s + 5}
            width={s}
            height={s}
            fill="rgba(139,107,255,0.15)"
            stroke={MATH_VIOLET}
            strokeWidth={1.3}
          />
        ))}
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Three small cones beside one same-base, same-height cylinder — the
 * visual proof for why cone/pyramid volume needs the ⅓ factor (it takes
 * exactly 3 cones of sand to fill the matching cylinder). Ports
 * buildConeCylinder exactly (static geometry).
 */
export function ConeCylinderVolumeDiagram({ caption }: { caption?: string }) {
  const cone = (x: number) => (
    <>
      <ellipse
        cx={x}
        cy={72}
        rx={14}
        ry={5}
        fill="rgba(248,113,113,0.15)"
        stroke={MATH_RED}
        strokeWidth={1.2}
      />
      <line x1={x - 14} y1={72} x2={x} y2={35} stroke={MATH_RED} strokeWidth={1.2} />
      <line x1={x + 14} y1={72} x2={x} y2={35} stroke={MATH_RED} strokeWidth={1.2} />
    </>
  );
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 90" className="w-full max-w-[300px]">
        {cone(35)}
        {cone(75)}
        {cone(115)}
        <text x={150} y={55} fontSize={18} fill="#6b7593" textAnchor="middle" fontFamily={FONT}>
          =
        </text>
        <ellipse
          cx={200}
          cy={30}
          rx={24}
          ry={7}
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.3}
        />
        <line x1={176} y1={30} x2={176} y2={72} stroke={MATH_GREEN} strokeWidth={1.3} />
        <line x1={224} y1={30} x2={224} y2={72} stroke={MATH_GREEN} strokeWidth={1.3} />
        <ellipse
          cx={200}
          cy={72}
          rx={24}
          ry={7}
          fill="rgba(74,222,128,0.1)"
          stroke={MATH_GREEN}
          strokeWidth={1.3}
        />
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
