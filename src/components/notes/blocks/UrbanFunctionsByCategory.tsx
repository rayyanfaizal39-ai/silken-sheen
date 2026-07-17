import { bgCard, bgPanel, neon } from "./neon-tokens";

export interface UrbanFunctionItem {
  name: string;
  category: string;
  description: string;
  examples: string[];
}

// Colors match design-reference/geo-signature-visuals-ch9.html's .function-tile h6 per-category colors.
const CATEGORY_META: Record<string, { icon: string; label: string; color: string }> = {
  ekonomi: { icon: "💰", label: "Ekonomi", color: neon.blue },
  sosial: { icon: "🎓", label: "Sosial", color: neon.green },
  kerajaan: { icon: "🏛️", label: "Kerajaan/Governan", color: neon.violet },
};

export function UrbanFunctionsByCategory({ functions }: { functions: UrbanFunctionItem[] }) {
  const categories = ["ekonomi", "sosial", "kerajaan"];
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const items = functions.filter((f) => f.category === cat);
        if (items.length === 0) return null;
        const meta = CATEGORY_META[cat];
        return (
          <div key={cat} className="rounded-2xl p-4" style={{ background: bgPanel, borderTop: `2px solid ${meta.color}` }}>
            <h4 className="font-display mb-3 flex items-center gap-2 text-sm font-bold" style={{ color: meta.color }}>
              <span>{meta.icon}</span> {meta.label}
            </h4>
            <div className="space-y-2.5">
              {items.map((item) => (
                <div key={item.name} className="rounded-xl p-3" style={{ background: bgCard }}>
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
