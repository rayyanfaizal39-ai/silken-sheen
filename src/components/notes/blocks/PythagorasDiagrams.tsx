import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_AMBER, MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

/**
 * Labeled right-triangle diagram for a specific question. base/vert/hyp are
 * the label strings shown on each side; unknownSide (if given) highlights
 * that one label in amber. Geometry ports buildTriQ exactly (Chapter 13
 * mockup) — margins kept as shipped since this exact layout is what fixed an
 * earlier text-clipping bug on the vertical (text-anchor=end) label.
 */
export function RightTriangleDiagram({
  base,
  vert,
  hyp,
  unknownSide = null,
}: {
  base: string;
  vert: string;
  hyp: string;
  unknownSide?: "base" | "vert" | "hyp" | null;
}) {
  const ox = 65;
  const oy = 95;
  const legA = 100;
  const legB = 65;
  const color = (side: "base" | "vert" | "hyp") => (side === unknownSide ? MATH_AMBER : "#fff");

  return (
    <div className="mt-4 flex justify-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[220px]">
        <polygon
          points={`${ox},${oy} ${ox + legA},${oy} ${ox},${oy - legB}`}
          fill="rgba(139,107,255,0.08)"
          stroke="#fff"
          strokeWidth={1.5}
        />
        <rect x={ox} y={oy - 9} width={9} height={9} fill="none" stroke="#fff" strokeWidth={1.2} />
        <text
          x={ox + legA / 2}
          y={oy + 18}
          fontSize={12}
          fill={color("base")}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          {base}
        </text>
        <text
          x={ox - 10}
          y={oy - legB / 2}
          fontSize={12}
          fill={color("vert")}
          textAnchor="end"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          {vert}
        </text>
        <text
          x={ox + legA / 2 + 14}
          y={oy - legB / 2 - 8}
          fontSize={12}
          fill={color("hyp")}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          {hyp}
        </text>
      </svg>
    </div>
  );
}

/**
 * Right-angled triangle with squares drawn on the two legs, illustrating
 * c² = a² + b². Static layout (ports buildPythagDiagram exactly) — always
 * the same shape, only the caption changes per language.
 */
export function PythagorasSquaresDiagram({ caption }: { caption?: string }) {
  const ox = 60;
  const oy = 160;
  const legA = 70;
  const legB = 90;
  const p1: [number, number] = [ox, oy];
  const p2: [number, number] = [ox + legA, oy];
  const p3: [number, number] = [ox, oy - legB];

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 200" className="w-full max-w-[240px]">
        <rect
          x={ox}
          y={oy}
          width={legA}
          height={18}
          fill="rgba(139,107,255,0.35)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <rect
          x={ox - 18}
          y={oy - legB}
          width={18}
          height={legB}
          fill="rgba(74,222,128,0.3)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <polygon
          points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
          fill="rgba(255,255,255,0.05)"
          stroke="#fff"
          strokeWidth={2}
        />
        <rect x={ox} y={oy - 8} width={8} height={8} fill="none" stroke="#fff" strokeWidth={1.5} />
        <text
          x={(p1[0] + p2[0]) / 2}
          y={oy + 34}
          fontSize={12}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          a
        </text>
        <text
          x={ox - 28}
          y={(p1[1] + p3[1]) / 2}
          fontSize={12}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          b
        </text>
        <text
          x={(p2[0] + p3[0]) / 2 + 8}
          y={(p2[1] + p3[1]) / 2 - 4}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          c
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Right-angle checker: given 3 side lengths, sorts to find the longest (c)
 * and verifies c²=a²+b² dynamically — ports buildRightAngleCheck exactly.
 */
export function RightAngleChecker({
  lang,
  sides,
}: {
  lang: MathLang;
  sides: [number, number, number];
}) {
  const [a, b, c] = [...sides].sort((x, y) => x - y);
  const lhs = c * c;
  const rhs = a * a + b * b;
  const isRight = lhs === rhs;

  return (
    <div className="mt-4 text-center">
      <div className="font-display text-[15px] text-[#eef1fb]">
        {c}² <span className="text-slate-500">vs</span> {a}²+{b}²
      </div>
      <div className="font-display mt-2.5 text-lg font-bold text-[#eef1fb]">
        {lhs} <span className="font-normal text-slate-500">{isRight ? "=" : "≠"}</span> {rhs}
      </div>
      <div
        className="font-display mt-3.5 inline-block rounded-[10px] border px-5 py-2 text-sm font-bold"
        style={
          isRight
            ? {
                background: "rgba(74,222,128,0.1)",
                borderColor: "rgba(74,222,128,0.35)",
                color: MATH_GREEN,
              }
            : {
                background: "rgba(248,113,113,0.1)",
                borderColor: "rgba(248,113,113,0.35)",
                color: MATH_RED,
              }
        }
      >
        {isRight ? chrome("rightAngleConfirmed", lang) : chrome("rightAngleNotConfirmed", lang)}
      </div>
    </div>
  );
}
