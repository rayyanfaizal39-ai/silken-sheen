import type { ApiRow } from "@/content/form1/science/chapter-7/bab7-content";

const SEVERITY_CLASSES: Record<ApiRow["severity"], string> = {
  good: "bg-emerald-500/15 text-emerald-300",
  moderate: "bg-amber-400/15 text-amber-300",
  unhealthy: "bg-orange-500/15 text-orange-300",
  veryUnhealthy: "bg-red-500/15 text-red-300",
  hazardous: "bg-red-900/40 text-red-200",
};

export function ApiTable({ rows }: { rows: ApiRow[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((row) => (
        <div
          key={row.range}
          className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 ${SEVERITY_CLASSES[row.severity]}`}
        >
          <div className="font-display min-w-[80px] font-bold">{row.range}</div>
          <div className="flex-1 font-semibold">{row.label}</div>
        </div>
      ))}
    </div>
  );
}
