export type GeoCalloutVariant = "fakta-penting" | "ingat" | "kesilapan-lazim";

export type GeoCalloutItem = {
  variant: GeoCalloutVariant;
  title?: string;
  body: string;
};

const VARIANT_STYLE: Record<
  GeoCalloutVariant,
  { label: string; icon: string; border: string; bg: string; text: string }
> = {
  "fakta-penting": {
    label: "Fakta Penting",
    icon: "★",
    border: "border-primary/30",
    bg: "bg-primary/10",
    text: "text-primary",
  },
  ingat: {
    label: "Ingat!",
    icon: "💡",
    border: "border-amber-400/30",
    bg: "bg-amber-500/10",
    text: "text-amber-300",
  },
  "kesilapan-lazim": {
    label: "Kesilapan Lazim",
    icon: "⚠",
    border: "border-red-400/30",
    bg: "bg-red-500/10",
    text: "text-red-300",
  },
};

export function GeoCallout({ item }: { item: GeoCalloutItem }) {
  const style = VARIANT_STYLE[item.variant];
  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} px-4 py-3`}>
      <p className={`font-display mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${style.text}`}>
        <span aria-hidden="true">{style.icon}</span>
        {item.title ?? style.label}
      </p>
      <p className="text-[13px] leading-relaxed text-foreground/90">{item.body}</p>
    </div>
  );
}

export function GeoCalloutList({ items }: { items: GeoCalloutItem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <GeoCallout key={i} item={item} />
      ))}
    </div>
  );
}
