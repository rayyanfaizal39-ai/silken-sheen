export interface UrbanFunctionItem {
  name: string;
  category: string;
  description: string;
  examples: string[];
}

const CATEGORY_META: Record<string, { icon: string; label: string }> = {
  ekonomi: { icon: "💰", label: "Ekonomi" },
  sosial: { icon: "🏫", label: "Sosial" },
  kerajaan: { icon: "🏛️", label: "Kerajaan" },
};

export function UrbanFunctionsByCategory({ functions }: { functions: UrbanFunctionItem[] }) {
  const categories = ["ekonomi", "sosial", "kerajaan"];
  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const items = functions.filter((f) => f.category === cat);
        if (items.length === 0) return null;
        const meta = CATEGORY_META[cat];
        return (
          <div key={cat} className="rounded-2xl border border-border bg-secondary/40 p-4">
            <h4 className="font-display mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
              <span>{meta.icon}</span> {meta.label}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <div key={item.name} className="rounded-xl border border-border/60 bg-card/60 p-3">
                  <p className="text-[13px] font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  {item.examples.length > 0 && (
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      <b className="text-foreground">Contoh:</b> {item.examples.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
