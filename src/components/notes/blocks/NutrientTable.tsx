import type { NutrientTableBlock } from "@/content/form2/science/interactive-types";

/**
 * A named-nutrient reference table (KSSM Table 3.1 vitamins / Table 3.2
 * minerals shape): name, source, importance, effect of deficiency.
 *
 * From `sm` up this is a real `<table>` — four short columns read naturally
 * side by side there. On a phone the same four columns would either force
 * horizontal scrolling or shrink past reading size, so each row becomes one
 * card instead, its four facts stacked as a label/value list — same content,
 * same order, no tiny cells.
 */
export function NutrientTable({ block }: { block: NutrientTableBlock }) {
  return (
    <div className="min-w-0">
      {/* Phone: one card per nutrient. */}
      <ul className="flex flex-col gap-3 sm:hidden">
        {block.rows.map((row) => (
          <li key={row.id} className="rounded-2xl border border-border bg-card/55 p-4">
            <p className="text-[13px] font-bold text-foreground">
              {row.icon && <span className="mr-1">{row.icon}</span>}
              {row.name}
            </p>
            <dl className="mt-2 flex flex-col gap-1.5">
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                  {block.sourceLabel}
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  {row.source}
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                  {block.importanceLabel}
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  {row.importance}
                </dd>
              </div>
              <div>
                <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-primary">
                  {block.deficiencyLabel}
                </dt>
                <dd className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  {row.deficiency}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Tablet and up: the real table. */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-secondary/40">
              <th
                scope="col"
                className="w-[16%] border-b border-border px-3.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.nameLabel}
              </th>
              <th
                scope="col"
                className="w-[24%] border-b border-border px-3.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.sourceLabel}
              </th>
              <th
                scope="col"
                className="border-b border-border px-3.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.importanceLabel}
              </th>
              <th
                scope="col"
                className="w-[24%] border-b border-border px-3.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.deficiencyLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? "bg-card/40" : undefined}>
                <th
                  scope="row"
                  className="border-b border-border/70 px-3.5 py-3 align-top text-[12.5px] font-bold text-foreground"
                >
                  {row.icon && <span className="mr-1">{row.icon}</span>}
                  {row.name}
                </th>
                <td className="border-b border-border/70 px-3.5 py-3 align-top text-[12px] leading-snug text-muted-foreground">
                  {row.source}
                </td>
                <td className="border-b border-border/70 px-3.5 py-3 align-top text-[12px] leading-snug text-muted-foreground">
                  {row.importance}
                </td>
                <td className="border-b border-border/70 px-3.5 py-3 align-top text-[12px] leading-snug text-muted-foreground">
                  {row.deficiency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
