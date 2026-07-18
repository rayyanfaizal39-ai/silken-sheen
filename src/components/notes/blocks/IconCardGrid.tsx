import type { ReactNode } from "react";

export interface IconCardGridItem {
  icon?: ReactNode;
  label: string;
  detail?: string | string[];
}

export function IconCardGrid({ items }: { items: IconCardGridItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const details = Array.isArray(item.detail) ? item.detail : item.detail ? [item.detail] : [];
        return (
          <div key={`${i}-${item.label}`} className="rounded-2xl border border-border bg-secondary/40 p-4">
            {item.icon && (
              <span className="mb-2 flex text-xl [&_svg]:h-[22px] [&_svg]:w-[22px]">{item.icon}</span>
            )}
            <b className="font-display block text-[13.5px] text-foreground">{item.label}</b>
            {details.map((d, j) => (
              <p key={j} className="mt-1 text-xs leading-snug text-muted-foreground">
                {d}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
