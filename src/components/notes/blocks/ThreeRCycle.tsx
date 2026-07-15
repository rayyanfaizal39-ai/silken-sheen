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

export function ThreeRCycle({ items }: { items: ThreeRItem[] }) {
  const nodes = items.slice(0, 3);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-primary" />
          </marker>
        </defs>
        <path
          d="M 50 14 A 45 45 0 0 1 88 78"
          className="fill-none stroke-primary/60"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 84 82 A 45 45 0 0 1 16 82"
          className="fill-none stroke-primary/60"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 12 78 A 45 45 0 0 1 46 14"
          className="fill-none stroke-primary/60"
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />
      </svg>
      {nodes.map((item, i) => (
        <div
          key={item.name}
          className="absolute w-28 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary/30 bg-card p-2.5 text-center shadow-md"
          style={POSITIONS[i]}
        >
          <p className="text-[12px] font-bold text-foreground">{item.name}</p>
          <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
