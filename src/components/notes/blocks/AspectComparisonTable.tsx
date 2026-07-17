export interface AspectComparisonRow {
  aspect: string;
  columns: string[][];
}

export function AspectComparisonTable({ headers, rows }: { headers: string[]; rows: AspectComparisonRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr className="border-b border-border bg-secondary/40">
            {headers.map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2.5 font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.aspect} className="border-b border-border last:border-0 even:bg-white/[0.02]">
              <td className="whitespace-nowrap px-3 py-2.5 align-top font-semibold text-foreground">{row.aspect}</td>
              {row.columns.map((cell, i) => (
                <td key={i} className="px-3 py-2.5 align-top text-muted-foreground">
                  <ul className="list-disc space-y-1 pl-3.5">
                    {cell.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
