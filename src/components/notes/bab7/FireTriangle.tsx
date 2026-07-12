export function FireTriangle({
  definition,
  triangle,
}: {
  definition: string;
  triangle: { heat: string; oxygen: string; fuel: string };
}) {
  const nodes = [
    { icon: "🔥", label: triangle.heat },
    { icon: "💨", label: triangle.oxygen },
    { icon: "🪵", label: triangle.fuel },
  ];

  return (
    <div>
      <p className="mb-5 text-[13.5px] leading-relaxed text-muted-foreground">{definition}</p>
      <div className="relative mx-auto h-[190px] w-[220px]">
        {nodes.map((n, i) => (
          <div
            key={n.label}
            className={`absolute flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-amber-400 bg-secondary/60 text-2xl ${
              i === 0
                ? "left-1/2 top-0 -translate-x-1/2"
                : i === 1
                  ? "bottom-0 left-0"
                  : "bottom-0 right-0"
            }`}
          >
            {n.icon}
            <span className="mt-0.5 text-[10px] font-semibold text-muted-foreground">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
