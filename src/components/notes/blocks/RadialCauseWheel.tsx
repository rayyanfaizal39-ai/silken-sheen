export interface RadialCauseItem {
  label: string;
}

// Precise polar-coordinate layout for exactly 6 nodes around a center hub.
// Radius chosen generously and labels placed further out than nodes so text never overlaps neighboring nodes/labels.
export function RadialCauseWheel({ causes, centerLabel }: { causes: RadialCauseItem[]; centerLabel: string }) {
  const n = causes.length;
  const nodeRadius = 34; // % of container
  const labelRadius = 46; // % of container — further out than the node
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/20 to-accent/10 text-center text-[11px] font-bold text-foreground shadow-lg">
        {centerLabel}
      </div>
      {causes.map((c, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const nodeX = 50 + nodeRadius * Math.cos(angle);
        const nodeY = 50 + nodeRadius * Math.sin(angle);
        const labelX = 50 + labelRadius * Math.cos(angle);
        const labelY = 50 + labelRadius * Math.sin(angle);
        return (
          <div key={c.label}>
            <div
              className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,0,0,0.15)]"
              style={{ left: `${nodeX}%`, top: `${nodeY}%` }}
            />
            <div
              className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center text-[10.5px] font-medium leading-tight text-foreground"
              style={{ left: `${labelX}%`, top: `${labelY}%` }}
            >
              {c.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
