export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-[12.5px]">
        <thead>
          <tr className="border-b border-border bg-secondary/40">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={j === 0 ? "px-4 py-2.5 font-semibold text-foreground" : "px-4 py-2.5 text-muted-foreground"}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
