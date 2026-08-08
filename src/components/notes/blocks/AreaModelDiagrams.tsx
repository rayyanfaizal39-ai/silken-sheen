import { MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Two tiles side by side (e.g. 6×3 and 6×4w) illustrating a single-bracket
 * expansion: the outside factor multiplies each piece inside, one at a time.
 */
export function SingleBracketTilesDiagram({
  leftLabel,
  rightLabel,
  leftWidth = 66,
  rightWidth = 88,
  caption,
}: {
  leftLabel: string;
  rightLabel: string;
  leftWidth?: number;
  rightWidth?: number;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center gap-1.5">
      <div className="flex gap-0.5">
        <div
          className="flex items-center justify-center rounded text-[13px] font-bold text-white"
          style={{
            width: leftWidth,
            height: 44,
            background: "rgba(139,107,255,0.15)",
            border: `1.5px solid ${MATH_VIOLET}`,
            fontFamily: FONT,
          }}
        >
          {leftLabel}
        </div>
        <div
          className="flex items-center justify-center rounded text-[13px] font-bold text-white"
          style={{
            width: rightWidth,
            height: 44,
            background: "rgba(74,222,128,0.15)",
            border: `1.5px solid ${MATH_GREEN}`,
            fontFamily: FONT,
          }}
        >
          {rightLabel}
        </div>
      </div>
      {caption && <p className="mt-1 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

export interface AreaModelCell {
  label: string;
  fill: string;
  stroke: string;
}

export interface AreaModelAxisLabel {
  text: string;
  color: string;
}

/**
 * Generic 4-quadrant area-model square/rectangle — the shared visual
 * language for both two-bracket EXPANSION (e.g. (a+b)² split into
 * a², ab, ab, b²) and trinomial FACTORISATION read in reverse (e.g.
 * x²+6x+8 rearranged into 4 tiles whose side lengths ARE the factors).
 * Column widths / row heights / cell labels / axis labels are all data, so
 * the same component renders either direction.
 */
export function AreaModelSquare({
  colWidths,
  rowHeights,
  cells,
  colLabels,
  rowLabels,
  caption,
}: {
  colWidths: [number, number];
  rowHeights: [number, number];
  cells: [[AreaModelCell, AreaModelCell], [AreaModelCell, AreaModelCell]];
  colLabels: [AreaModelAxisLabel, AreaModelAxisLabel];
  rowLabels: [AreaModelAxisLabel, AreaModelAxisLabel];
  caption?: string;
}) {
  const LEFT = 46;
  const TOP = 18;
  const BOTTOM_GAP = 32;
  const RIGHT = 20;
  const totalW = colWidths[0] + colWidths[1];
  const totalH = rowHeights[0] + rowHeights[1];
  const width = LEFT + totalW + RIGHT;
  const height = TOP + totalH + BOTTOM_GAP;
  const ox = LEFT;
  const oy = TOP;
  const colX = [ox, ox + colWidths[0]];
  const rowY = [oy, oy + rowHeights[0]];

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[260px]">
        {([0, 1] as const).map((r) =>
          ([0, 1] as const).map((c) => {
            const cell = cells[r][c];
            const x = colX[c];
            const y = rowY[r];
            const w = colWidths[c];
            const h = rowHeights[r];
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  fill={cell.fill}
                  stroke={cell.stroke}
                  strokeWidth={1.5}
                />
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 5}
                  fontSize={Math.min(13, Math.max(9, w / 4))}
                  fill="#fff"
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontWeight={700}
                >
                  {cell.label}
                </text>
              </g>
            );
          }),
        )}
        {([0, 1] as const).map((c) => (
          <text
            key={`col-${c}`}
            x={colX[c] + colWidths[c] / 2}
            y={oy + totalH + 18}
            fontSize={12}
            fill={colLabels[c].color}
            textAnchor="middle"
            fontFamily={FONT}
            fontWeight={700}
          >
            {colLabels[c].text}
          </text>
        ))}
        {([0, 1] as const).map((r) => (
          <text
            key={`row-${r}`}
            x={ox - 14}
            y={rowY[r] + rowHeights[r] / 2 + 5}
            fontSize={12}
            fill={rowLabels[r].color}
            textAnchor="end"
            fontFamily={FONT}
            fontWeight={700}
          >
            {rowLabels[r].text}
          </text>
        ))}
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Big square with a smaller square cut from its corner (x²−y²), plus an
 * "=" and the re-cut rectangle (x+y) by (x−y) — the visual proof for
 * difference of squares. Ports buildDiffSquares exactly (static geometry;
 * x/y are plain math notation, identical in both languages).
 */
export function DifferenceOfSquaresDiagram({ caption }: { caption?: string }) {
  const big = 80;
  const small = 35;
  const ox1 = 20;
  const oy1 = 15;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 140" className="w-full max-w-[290px]">
        <rect
          x={ox1}
          y={oy1}
          width={big}
          height={big}
          fill="rgba(139,107,255,0.15)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <rect
          x={ox1 + big - small}
          y={oy1}
          width={small}
          height={small}
          fill="rgba(13,6,32,0.9)"
          stroke={MATH_RED}
          strokeWidth={1.5}
          strokeDasharray="3,2"
        />
        <text
          x={ox1 + big / 2 - 10}
          y={oy1 + big / 2 + 25}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          x² − y²
        </text>
        <text
          x={ox1 + big / 2}
          y={oy1 + big + 16}
          fontSize={11}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          x
        </text>
        <text
          x={ox1 - 10}
          y={oy1 + big / 2 + 4}
          fontSize={11}
          fill={MATH_VIOLET}
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          x
        </text>
        <text
          x={ox1 + big - small / 2}
          y={oy1 - 6}
          fontSize={10}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          y
        </text>
        <text
          x={130}
          y={oy1 + big / 2 + 5}
          fontSize={18}
          fill="#6b7593"
          textAnchor="middle"
          fontFamily={FONT}
        >
          =
        </text>
        <rect
          x={155}
          y={oy1 + 20}
          width={90}
          height={big - small}
          fill="rgba(74,222,128,0.18)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={200}
          y={oy1 + 20 + (big - small) / 2 + 5}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          (x+y)(x−y)
        </text>
        <text
          x={200}
          y={oy1 + 20 + (big - small) + 16}
          fontSize={10.5}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          x + y
        </text>
        <text
          x={148}
          y={oy1 + 20 + (big - small) / 2 + 4}
          fontSize={10.5}
          fill={MATH_RED}
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          x−y
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

export interface FractionStripRow {
  n: number;
  filled: number;
  color: string;
  label: string;
}

function FractionStrip({ row }: { row: FractionStripRow }) {
  return (
    <div className="mb-2">
      <div className="mb-0.5 text-[10.5px] text-slate-500">{row.label}</div>
      <div className="flex gap-px">
        {Array.from({ length: row.n }, (_, i) => (
          <div
            key={i}
            className="flex h-7 flex-1 items-center justify-center rounded-sm text-[10px] font-bold text-white"
            style={{
              background: i < row.filled ? row.color : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {i < row.filled ? "1" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Fraction strips cut into progressively finer pieces (e.g. ¼ and ⅙, then
 * both re-cut into twelfths) — the visual proof for why algebraic fractions
 * need a common denominator before adding. Ports buildFracStrip exactly.
 */
export function FractionStripDiagram({
  topRows,
  dividerLabel,
  bottomRows,
  caption,
}: {
  topRows: FractionStripRow[];
  dividerLabel?: string;
  bottomRows: FractionStripRow[];
  caption?: string;
}) {
  return (
    <div className="mt-4 w-full max-w-[260px]">
      {topRows.map((row, i) => (
        <FractionStrip key={i} row={row} />
      ))}
      {dividerLabel && <div className="my-1.5 text-[10.5px] text-slate-500">{dividerLabel}</div>}
      {bottomRows.map((row, i) => (
        <FractionStrip key={i} row={row} />
      ))}
      {caption && <p className="mt-1.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
