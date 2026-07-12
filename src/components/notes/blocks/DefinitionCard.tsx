export interface DefinitionCardItem {
  icon?: string;
  name: string;
  body: string;
  example?: string;
  exampleLabel?: string;
}

export function DefinitionCard({ items }: { items: DefinitionCardItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.name} className="rounded-2xl border border-border bg-secondary/40 p-4">
          <h5 className="font-display mb-1.5 flex items-center gap-2 text-[13.5px] font-bold text-foreground">
            {item.icon && <span>{item.icon}</span>}
            {item.name}
          </h5>
          <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
          {item.example && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              <b className="text-foreground">{item.exampleLabel ?? "Example"}:</b> {item.example}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
