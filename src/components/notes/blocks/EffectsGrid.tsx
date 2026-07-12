import type { EffectCategory } from "@/content/form1/science/chapter-7/bab7-content";

const CATEGORY_STYLE: Record<EffectCategory["category"], { icon: string; bg: string }> = {
  health: { icon: "🫁", bg: "bg-red-500/5" },
  buildings: { icon: "🏛️", bg: "bg-amber-400/5" },
  plants: { icon: "🌱", bg: "bg-emerald-500/5" },
  climate: { icon: "🌍", bg: "bg-primary/5" },
};

export function EffectsGrid({ effects }: { effects: EffectCategory[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {effects.map((e) => {
        const style = CATEGORY_STYLE[e.category];
        return (
          <div key={e.heading} className={`rounded-2xl border border-border p-4 ${style.bg}`}>
            <h5 className="font-display mb-2.5 flex items-center gap-2 text-[13.5px] font-bold text-foreground">
              {style.icon} {e.heading}
            </h5>
            <ul className="flex flex-col gap-1.5">
              {e.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-snug text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
