import type { PreventCategory } from "@/content/form1/science/chapter-7/bab7-content";

const CATEGORY_ICONS = ["⚖️", "🎓", "🔬"];

export function PreventionColumns({ categories }: { categories: PreventCategory[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-3">
      {categories.map((c, i) => (
        <div key={c.heading} className="rounded-2xl border border-border bg-secondary/40 p-4">
          <h5 className="font-display mb-2.5 text-[13.5px] font-bold text-primary">
            {CATEGORY_ICONS[i % CATEGORY_ICONS.length]} {c.heading}
          </h5>
          <ul className="flex flex-col gap-1.5">
            {c.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
