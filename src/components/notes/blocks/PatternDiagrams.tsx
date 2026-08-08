import { useId } from "react";
import { MATH_AMBER, MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Growing dot-groups (e.g. 1,4,7,10 — add 3 each time), each group's dots
 * laid out in a 4-wide grid so larger counts still fit the row height.
 * Ports the mockup's buildDotPattern exactly (static 280x90 viewBox).
 */
export function GrowingDotPatternDiagram({
  counts,
  caption,
}: {
  counts: number[];
  caption?: string;
}) {
  const gap = 68;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 280 90" className="w-full max-w-[300px]">
        {counts.map((n, gi) => {
          const gx = 20 + gi * gap;
          const dots = [];
          for (let i = 0; i < n; i++) {
            const row = Math.floor(i / 4);
            const col = i % 4;
            dots.push(
              <circle key={i} cx={gx + col * 11} cy={20 + row * 14} r={4} fill={MATH_VIOLET} />,
            );
          }
          return (
            <g key={gi}>
              {dots}
              <text
                x={gx + 15}
                y={78}
                fontSize={11}
                fill="#fff"
                textAnchor="middle"
                fontFamily={FONT}
                fontWeight={700}
              >
                {n}
              </text>
            </g>
          );
        })}
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

interface GapRow {
  values: number[];
  gaps: number[];
}

/**
 * Side-by-side sequence "gap-checker": a green row with a constant gap
 * throughout (a true sequence) vs a red row with changing gaps (not a
 * sequence). Ports the mockup's buildGapCheck row() function exactly.
 */
export function SequenceGapCheckerDiagram({
  good,
  bad,
  goodLabel,
  badLabel,
}: {
  good: GapRow;
  bad: GapRow;
  goodLabel: string;
  badLabel: string;
}) {
  const spacing = 50;
  const y = 30;

  const row = (r: GapRow, color: string) => (
    <svg viewBox="0 0 260 60" className="w-full max-w-[300px]">
      {r.values.map((v, i) => {
        const x = 20 + i * spacing;
        return (
          <g key={i}>
            {i < r.values.length - 1 && (
              <>
                <line
                  x1={x + 6}
                  y1={y}
                  x2={x + spacing - 6}
                  y2={y}
                  stroke={color}
                  strokeWidth={1.3}
                />
                <text
                  x={x + spacing / 2}
                  y={y - 8}
                  fontSize={9}
                  fill={color}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontWeight={700}
                >
                  {r.gaps[i] >= 0 ? `+${r.gaps[i]}` : r.gaps[i]}
                </text>
              </>
            )}
            <circle cx={x} cy={y} r={4} fill={color} />
            <text
              x={x}
              y={y + 20}
              fontSize={10}
              fill="#fff"
              textAnchor="middle"
              fontFamily={FONT}
              fontWeight={700}
            >
              {v}
            </text>
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <div className="flex flex-col items-center">
        <p className="mb-0.5 text-center text-[10.5px] font-semibold" style={{ color: MATH_GREEN }}>
          ✓ {goodLabel}
        </p>
        {row(good, MATH_GREEN)}
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-0.5 text-center text-[10.5px] font-semibold" style={{ color: MATH_RED }}>
          ✗ {badLabel}
        </p>
        {row(bad, MATH_RED)}
      </div>
    </div>
  );
}

/**
 * "Input → formula → output" nth-term machine: feed in a position n, the
 * formula box computes, out comes the term's value. Ports the mockup's
 * buildNtermMachine exactly (static 260x100 viewBox); marker ids are
 * per-instance via useId() so multiple machines on one page don't collide.
 */
export function NthTermMachineDiagram({
  inputLabel,
  formula,
  outputLabel,
  caption,
}: {
  inputLabel: string;
  formula: string;
  outputLabel: string;
  caption?: string;
}) {
  const uid = useId();
  const arrow1 = `arrow1-${uid}`;
  const arrow2 = `arrow2-${uid}`;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 100" className="w-full max-w-[290px]">
        <circle
          cx={30}
          cy={50}
          r={20}
          fill="rgba(139,107,255,0.15)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <text
          x={30}
          y={55}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {inputLabel}
        </text>
        <path d="M55,50 L95,50" stroke="#6b7593" strokeWidth={1.5} markerEnd={`url(#${arrow1})`} />
        <rect
          x={100}
          y={30}
          width={70}
          height={40}
          rx={8}
          fill="rgba(255,185,55,0.15)"
          stroke={MATH_AMBER}
          strokeWidth={1.5}
        />
        <text
          x={135}
          y={55}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {formula}
        </text>
        <path
          d="M175,50 L215,50"
          stroke="#6b7593"
          strokeWidth={1.5}
          markerEnd={`url(#${arrow2})`}
        />
        <circle
          cx={235}
          cy={50}
          r={20}
          fill="rgba(74,222,128,0.15)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={235}
          y={55}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {outputLabel}
        </text>
        <defs>
          <marker id={arrow1} markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#6b7593" />
          </marker>
          <marker id={arrow2} markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#6b7593" />
          </marker>
        </defs>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Pascal's Triangle, computed dynamically — each cell is the sum of the two
 * cells directly above it (not hardcoded). Rendered as HTML, not SVG, since
 * it's a simple grid of cells rather than a coordinate diagram.
 */
export function PascalTriangleDiagram({ rows, caption }: { rows: number; caption?: string }) {
  const triangle: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [1];
    for (let c = 1; c < r; c++) row.push(triangle[r - 1][c - 1] + triangle[r - 1][c]);
    if (r > 0) row.push(1);
    triangle.push(row);
  }
  return (
    <div className="mt-4 flex flex-col items-center gap-1.5">
      {triangle.map((row, ri) => (
        <div key={ri} className="flex gap-1.5">
          {row.map((n, ci) => (
            <div
              key={ci}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{
                background: "rgba(139,107,255,0.12)",
                border: `1.5px solid rgba(139,107,255,0.4)`,
              }}
            >
              {n}
            </div>
          ))}
        </div>
      ))}
      {caption && <p className="mt-1.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
