import { hexToRgba, neon } from "./neon-tokens";

export interface RadialCauseItem {
  label: string;
}

// Order + colors + icons match design-reference/geo-signature-visuals-ch12.html's 6 spokes exactly
// (top, going clockwise): red, orange, amber, green, blue, violet.
const NODE_STYLE = [
  { color: neon.red, icon: "🪓" },
  { color: neon.orange, icon: "☀️" },
  { color: neon.amber, icon: "🗑️" },
  { color: neon.green, icon: "🏭" },
  { color: neon.blue, icon: "🧪" },
  { color: neon.violet, icon: "👥" },
];

// Precise polar-coordinate layout for exactly 6 nodes around a center hub.
// Radius chosen generously and labels placed further out than nodes so text never overlaps neighboring nodes/labels.
export function RadialCauseWheel({ causes, centerLabel }: { causes: RadialCauseItem[]; centerLabel: string }) {
  const n = causes.length;
  const nodeRadius = 34; // % of container
  const labelRadius = 46; // % of container — further out than the node
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        {causes.map((c, i) => {
          const style = NODE_STYLE[i % NODE_STYLE.length];
          const angle = (2 * Math.PI * i) / n - Math.PI / 2;
          const nodeX = 50 + nodeRadius * Math.cos(angle);
          const nodeY = 50 + nodeRadius * Math.sin(angle);
          return (
            <line
              key={c.label}
              x1={50}
              y1={50}
              x2={nodeX}
              y2={nodeY}
              stroke={style.color}
              strokeWidth={0.6}
              opacity={0.5}
            />
          );
        })}
      </svg>
      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-500/20 to-blue-500/10 text-center text-[11px] font-bold text-foreground shadow-lg">
        {centerLabel}
      </div>
      {causes.map((c, i) => {
        const style = NODE_STYLE[i % NODE_STYLE.length];
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const nodeX = 50 + nodeRadius * Math.cos(angle);
        const nodeY = 50 + nodeRadius * Math.sin(angle);
        const labelX = 50 + labelRadius * Math.cos(angle);
        const labelY = 50 + labelRadius * Math.sin(angle);
        return (
          <div key={c.label}>
            <div
              className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-base"
              style={{
                left: `${nodeX}%`,
                top: `${nodeY}%`,
                borderColor: style.color,
                background: "#0c1128",
                boxShadow: `0 0 10px ${hexToRgba(style.color, 0.5)}`,
              }}
            >
              {style.icon}
            </div>
            <div
              className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center text-[10.5px] font-semibold leading-tight"
              style={{ left: `${labelX}%`, top: `${labelY}%`, color: style.color }}
            >
              {c.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
