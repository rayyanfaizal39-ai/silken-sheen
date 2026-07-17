import { neon } from "./neon-tokens";

export function ExamSpanTimeline({
  startLabel,
  startYear,
  endLabel,
  endYear,
}: {
  startLabel: string;
  startYear: string;
  endLabel: string;
  endYear: string;
}) {
  return (
    <div className="flex items-center justify-center gap-4 py-3">
      <div className="text-center">
        <p className="font-display text-[13px] font-bold" style={{ color: neon.green }}>
          {startYear}
        </p>
        <p className="text-[10px] text-muted-foreground">{startLabel}</p>
      </div>
      <div className="h-0.5 w-40 max-w-[35vw]" style={{ background: `linear-gradient(90deg, ${neon.green}, ${neon.red})` }} />
      <div className="text-center">
        <p className="font-display text-[13px] font-bold" style={{ color: neon.red }}>
          {endYear}
        </p>
        <p className="text-[10px] text-muted-foreground">{endLabel}</p>
      </div>
    </div>
  );
}
