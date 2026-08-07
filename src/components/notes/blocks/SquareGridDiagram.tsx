import { MATH_VIOLET } from "./mathTheme";

/**
 * n×n grid of unit squares — the area IS the square of the side length.
 * Static (always 4×4=16, matching the mockup's one worked illustration).
 * Ports buildSquareGrid exactly.
 */
export function SquareGridDiagram({ caption }: { caption?: string }) {
  const n = 4;
  const cell = 34;
  const pad = 20;
  const w = n * cell + pad * 2;
  const h = n * cell + pad * 2 + 30;
  const cells: { x: number; y: number }[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      cells.push({ x: pad + c * cell, y: pad + r * cell });
    }
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[220px]">
        {cells.map((cellPos, i) => (
          <rect
            key={i}
            x={cellPos.x}
            y={cellPos.y}
            width={cell - 2}
            height={cell - 2}
            rx={3}
            fill="rgba(139,107,255,0.18)"
            stroke={MATH_VIOLET}
            strokeWidth={1.2}
          />
        ))}
        <text
          x={w / 2}
          y={h - 8}
          fontSize={13}
          fill="#fff"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          {n} × {n} = {n * n} ({n}² = {n * n})
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
