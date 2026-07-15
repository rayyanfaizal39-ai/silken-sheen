export interface VolcanoItem {
  name: string;
  country: string;
}

export function VolcanoGrid({ volcanoes }: { volcanoes: VolcanoItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {volcanoes.map((v) => (
        <div
          key={v.name}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-orange-400/25 bg-orange-500/5 p-4 text-center"
        >
          <span className="text-2xl">🌋</span>
          <p className="text-[12.5px] font-semibold text-foreground">{v.name}</p>
          <p className="text-[11px] text-muted-foreground">{v.country}</p>
        </div>
      ))}
    </div>
  );
}
