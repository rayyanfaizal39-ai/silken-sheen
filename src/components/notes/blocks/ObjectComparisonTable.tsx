import type { ObjectComparisonBlock } from "@/content/form2/science/interactive-types";

/**
 * Several objects compared feature by feature.
 *
 * From `sm` up this is a real `<table>`: a learner scanning "Orbit" lands on
 * one row with every object's answer beside it. On a phone the same content
 * becomes one card per object, because four columns would either overflow the
 * page or shrink past reading size — same rows, same order, one column.
 */
export function ObjectComparisonTable({ block }: { block: ObjectComparisonBlock }) {
  return (
    <div className="min-w-0" data-comparison-table="">
      {/* Phone: one card per object. */}
      <ul className="flex flex-col gap-3 sm:hidden">
        {block.columns.map((column, c) => (
          <li key={column.id} className="rounded-2xl border border-border bg-card/55 p-4">
            <p className="font-display text-[15px] font-bold text-foreground">
              {column.icon && (
                <span aria-hidden="true" className="mr-1.5">
                  {column.icon}
                </span>
              )}
              {column.label}
            </p>
            <dl className="mt-2 flex flex-col gap-2">
              {block.rows.map((row) => (
                <div key={row.id} className="border-t border-border/60 pt-2">
                  <dt className="text-[10.5px] font-bold uppercase tracking-wide text-primary">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-foreground/90">
                    {row.values[c]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* Tablet and up: the comparison table. */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-primary/10">
              <th
                scope="col"
                className="w-[22%] border-b border-border px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.featureLabel}
              </th>
              {block.columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="font-display border-b border-border px-3 py-2.5 text-[14px] font-bold text-foreground"
                >
                  {column.icon && (
                    <span aria-hidden="true" className="mr-1.5">
                      {column.icon}
                    </span>
                  )}
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, r) => (
              <tr key={row.id} className={r % 2 === 1 ? "bg-card/40" : undefined}>
                <th
                  scope="row"
                  className="border-b border-border/70 px-3 py-3 align-top text-[11px] font-bold uppercase tracking-wide text-primary"
                >
                  {row.label}
                </th>
                {row.values.map((value, c) => (
                  <td
                    key={block.columns[c]?.id ?? c}
                    className="border-b border-border/70 px-3 py-3 align-top text-[12.5px] leading-snug text-foreground/90"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
