export function ChipRow({
  heading,
  items,
  tone = "neutral",
}: {
  heading?: string;
  items: string[];
  tone?: "neutral" | "green";
}) {
  const chipClass =
    tone === "green"
      ? "rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-300"
      : "rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground";

  return (
    <div className="science-knowledge-chips">
      {heading && <h4 className="font-display mb-2.5 text-sm font-bold text-foreground">{heading}</h4>}
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className={chipClass}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
