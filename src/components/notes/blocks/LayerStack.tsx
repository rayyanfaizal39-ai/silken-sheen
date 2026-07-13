export interface LayerStackItem {
  name: string;
  sub?: string;
  colorClass: string;
}

export function LayerStack({ layers }: { layers: LayerStackItem[] }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border">
      {layers.map((layer) => (
        <div key={layer.name} className={`px-3.5 py-3 ${layer.colorClass}`}>
          <p className="font-display text-[12.5px] font-bold text-foreground">{layer.name}</p>
          {layer.sub && <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{layer.sub}</p>}
        </div>
      ))}
    </div>
  );
}
