import type { ImpactTableBlock } from "@/content/form2/science/interactive-types";

/**
 * "This activity → these effects", as a table where a table earns its keep and
 * as cards where it does not.
 *
 * From `sm` up the two column headings are what make the rows comparable, so
 * the real `<table>` is the honest rendering. On a phone that same table would
 * either overflow the page or squeeze both columns past reading size, so the
 * rows become stacked cards instead — same content, same order, one column.
 */
export function ImpactTable({ block }: { block: ImpactTableBlock }) {
  return (
    <div className="min-w-0">
      {/* Phone: one card per activity. */}
      <ul className="flex flex-col gap-3 sm:hidden">
        {block.rows.map((row) => (
          <li key={row.id} className="rounded-2xl border border-border bg-card/55 p-4">
            <p className="text-[13px] font-bold text-foreground">
              {row.icon && <span className="mr-1">{row.icon}</span>}
              {row.cause}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-primary">
              {block.effectLabel}
            </p>
            <ul className="mt-1 flex flex-col gap-1.5">
              {row.effects.map((effect) => (
                <li
                  key={effect}
                  className="flex items-start gap-2 text-[12.5px] leading-snug text-muted-foreground"
                >
                  <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Tablet and up: the comparison table. */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-secondary/40">
              <th
                scope="col"
                className="w-[38%] border-b border-border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.causeLabel}
              </th>
              <th
                scope="col"
                className="border-b border-border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-primary"
              >
                {block.effectLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? "bg-card/40" : undefined}>
                <th
                  scope="row"
                  className="border-b border-border/70 px-4 py-3 align-top text-[13px] font-bold text-foreground"
                >
                  {row.icon && <span className="mr-1">{row.icon}</span>}
                  {row.cause}
                </th>
                <td className="border-b border-border/70 px-4 py-3 align-top">
                  <ul className="flex flex-col gap-1.5">
                    {row.effects.map((effect) => (
                      <li
                        key={effect}
                        className="flex items-start gap-2 text-[12.5px] leading-snug text-muted-foreground"
                      >
                        <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
