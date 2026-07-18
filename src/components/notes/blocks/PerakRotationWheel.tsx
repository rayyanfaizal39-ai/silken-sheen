// Circular succession diagram for Perak's unique 6-title rotation system.
// Geometry (positions, radii, arc paths) is copied verbatim from
// design-reference/sej2-signature-visuals-ch7.html's reviewed, generously-spaced
// SVG layout — do not "optimize" the coordinates, they were tuned to avoid the
// label/arrow overlap problems a prior radial diagram (water-crisis wheel) had.

const OUTER_POSITIONS = [
  { cx: 210, cy: 60 },
  { cx: 340, cy: 135 },
  { cx: 340, cy: 285 },
  { cx: 210, cy: 360 },
  { cx: 80, cy: 285 },
  { cx: 80, cy: 135 },
];

const OUTER_COLORS = ["#4fb0ff", "#4ade80", "#fbbf5a", "#f87171", "#f472b6", "#94a3b8"];

const ARROW_PATHS = [
  "M 240 90 A 160 160 0 0 1 320 165",
  "M 335 175 A 160 160 0 0 1 335 245",
  "M 315 315 A 160 160 0 0 1 245 350",
  "M 175 350 A 160 160 0 0 1 105 315",
  "M 85 245 A 160 160 0 0 1 85 175",
];

function splitLabel(label: string): [string, string] {
  const lastSpace = label.lastIndexOf(" ");
  if (lastSpace === -1) return [label, ""];
  return [label.slice(0, lastSpace), label.slice(lastSpace + 1)];
}

export function PerakRotationWheel({ centerLabel, outerLabels }: { centerLabel: string; outerLabels: string[] }) {
  const nodes = OUTER_POSITIONS.map((pos, i) => ({
    ...pos,
    color: OUTER_COLORS[i % OUTER_COLORS.length],
    lines: splitLabel(outerLabels[i] ?? ""),
  }));

  return (
    <div className="flex justify-center py-4">
      <svg width="420" height="420" viewBox="0 0 420 420" className="h-auto w-full max-w-[420px]">
        <circle cx={210} cy={210} r={150} fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth={2} strokeDasharray="4 4" />

        <circle
          cx={210}
          cy={210}
          r={55}
          fill="#0c1128"
          stroke="#8b6bff"
          strokeWidth={2}
          style={{ filter: "drop-shadow(0 0 14px rgba(139,107,255,0.4))" }}
        />
        <text x={210} y={216} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize={15} fontWeight={700} fill="#eef1fb">
          {centerLabel}
        </text>

        {nodes.map((node, i) => (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r={42} fill="#0c1128" stroke={node.color} strokeWidth={2} />
            {node.lines[1] ? (
              <>
                <text x={node.cx} y={node.cy - 5} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize={9.5} fontWeight={700} fill={node.color}>
                  {node.lines[0]}
                </text>
                <text x={node.cx} y={node.cy + 8} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize={9.5} fontWeight={700} fill={node.color}>
                  {node.lines[1]}
                </text>
              </>
            ) : (
              <text x={node.cx} y={node.cy + 4} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize={10.5} fontWeight={700} fill={node.color}>
                {node.lines[0]}
              </text>
            )}
          </g>
        ))}

        <defs>
          <marker id="perak-rotation-arrow" markerWidth={6} markerHeight={6} refX={3} refY={3} orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#6b7593" />
          </marker>
        </defs>
        {ARROW_PATHS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#6b7593" strokeWidth={1.5} markerEnd="url(#perak-rotation-arrow)" />
        ))}
      </svg>
    </div>
  );
}
