import { hexToRgba, neon } from "./neon-tokens";

export interface ThreeRItem {
  name: string;
  description: string;
}

// Fixed at exactly 3 nodes arranged in a triangle with connecting arrows — deliberately not generalized
// to more nodes, since a similar cycle diagram elsewhere overlapped arrows once it grew past 3 steps.
const POSITIONS = [
  { left: "50%", top: "6%" },
  { left: "92%", top: "82%" },
  { left: "8%", top: "82%" },
];

// Order matches content: [Kurangkan, Guna Semula, Kitar Semula] mapped to
// blue/violet/green per design-reference/geo-signature-visuals-ch13.html.
const NODE_STYLE = [
  { color: neon.blue, icon: "⬇️" },
  { color: neon.violet, icon: "🔁" },
  { color: neon.green, icon: "♻️" },
];

const ARC_STYLE = [
  { d: "M 50 14 A 45 45 0 0 1 88 78", color: neon.blue },
  { d: "M 84 82 A 45 45 0 0 1 16 82", color: neon.violet },
  { d: "M 12 78 A 45 45 0 0 1 46 14", color: neon.green },
];

export function ThreeRCycle({ items }: { items: ThreeRItem[] }) {
  const nodes = items.slice(0, 3);
  return (
    <div className="space-y-4">
      <div className="relative mx-auto aspect-square w-full max-w-sm">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            {ARC_STYLE.map((arc, i) => (
              <marker
                key={i}
                id={`threeR-arrow-${i}`}
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={arc.color} />
              </marker>
            ))}
          </defs>
          {ARC_STYLE.map((arc, i) => (
            <path
              key={i}
              d={arc.d}
              fill="none"
              stroke={arc.color}
              strokeWidth="1.5"
              markerEnd={`url(#threeR-arrow-${i})`}
              style={{ filter: `drop-shadow(0 0 3px ${hexToRgba(arc.color, 0.6)})` }}
            />
          ))}
        </svg>
        {nodes.map((item, i) => {
          const style = NODE_STYLE[i % NODE_STYLE.length];
          return (
            <div
              key={item.name}
              className="absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 p-2 text-center"
              style={{
                ...POSITIONS[i],
                borderColor: style.color,
                background: "#0c1128",
                boxShadow: `0 0 12px ${hexToRgba(style.color, 0.4)}`,
              }}
            >
              <span className="text-base leading-none">{style.icon}</span>
              <p className="mt-1 text-[9.5px] font-bold leading-tight" style={{ color: style.color }}>
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-3 text-[11px] text-muted-foreground">
        {nodes.map((item, i) => {
          const style = NODE_STYLE[i % NODE_STYLE.length];
          return (
            <div key={item.name} className="max-w-[200px] text-center">
              <b style={{ color: style.color }}>{item.name}</b> — {item.description}
            </div>
          );
        })}
      </div>
    </div>
  );
}
