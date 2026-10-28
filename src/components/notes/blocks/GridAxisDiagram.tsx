/**
 * Static diagram explaining garisan timuran (vertical, numbered left-to-right)
 * vs garisan utaraan (horizontal, numbered bottom-to-top) — the DSKP 1.2.2
 * distinction. Axis numbers are illustrative (matching the textbook's own
 * generic Peta 2.1 convention), not tied to any specific real map.
 */
export function GridAxisDiagram() {
  const w = 300;
  const h = 260;
  const left = 40;
  const right = 20;
  const top = 34;
  const bottom = 40;
  const cols = [28, 29, 30, 31, 32];
  const rows = [55, 54, 53, 52, 51];
  const colStep = (w - left - right) / (cols.length - 1);
  const rowStep = (h - top - bottom) / (rows.length - 1);
  const gridBottom = h - bottom;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full rounded-xl border border-border bg-card/40" role="img" aria-label="Rajah garisan timuran dan garisan utaraan dalam peta topografi">
      <text x={left} y={16} fontSize={10} fontWeight={700} className="fill-sky-300">↑ Utaraan bertambah ke Utara</text>

      <g className="stroke-border" strokeWidth={1}>
        {cols.map((_, i) => (
          <line key={`v-${i}`} x1={left + i * colStep} y1={top} x2={left + i * colStep} y2={gridBottom} />
        ))}
        {rows.map((_, i) => (
          <line key={`h-${i}`} x1={left} y1={top + i * rowStep} x2={w - right} y2={top + i * rowStep} />
        ))}
      </g>

      {/* Garisan timuran — vertical, highlighted */}
      <line x1={left + 2 * colStep} y1={top} x2={left + 2 * colStep} y2={gridBottom} className="stroke-amber-400" strokeWidth={2.5} />
      {cols.map((label, i) => (
        <text key={`cl-${i}`} x={left + i * colStep} y={gridBottom + 14} textAnchor="middle" fontSize={11} className="fill-muted-foreground">
          {label}
        </text>
      ))}
      <text x={w / 2} y={gridBottom + 30} textAnchor="middle" fontSize={10} fontWeight={700} className="fill-amber-300">
        Garisan Timuran (→ ke Timur)
      </text>

      {/* Garisan utaraan — horizontal, highlighted */}
      <line x1={left} y1={top + 2 * rowStep} x2={w - right} y2={top + 2 * rowStep} className="stroke-sky-400" strokeWidth={2.5} />
      {rows.map((label, i) => (
        <text key={`rl-${i}`} x={left - 8} y={top + i * rowStep + 4} textAnchor="end" fontSize={11} className="fill-muted-foreground">
          {label}
        </text>
      ))}
      <text x={left + 4} y={top + 2 * rowStep - 8} textAnchor="start" fontSize={10} fontWeight={700} className="fill-sky-300">
        Garisan Utaraan
      </text>
    </svg>
  );
}
