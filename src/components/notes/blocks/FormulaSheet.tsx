export interface FormulaSheetEntry {
  formula: string;
  label: string;
}

/** Chapter-end quick-reference grid of every formula introduced in the chapter. */
export function FormulaSheet({ entries }: { entries: FormulaSheetEntry[] }) {
  return (
    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
      {entries.map((e, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 text-center"
        >
          <div className="font-display mb-1 text-[15px] text-[#eef1fb]">{e.formula}</div>
          <div className="text-[11px] text-slate-500">{e.label}</div>
        </div>
      ))}
    </div>
  );
}
