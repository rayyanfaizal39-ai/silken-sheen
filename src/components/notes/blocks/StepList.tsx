export interface StepListItem {
  step: number;
  instruction: string;
}

export function StepList({ steps }: { steps: StepListItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((s) => (
        <div key={s.step} className="flex gap-3 rounded-xl border border-border bg-secondary/40 p-3.5">
          <span className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
            {s.step}
          </span>
          <span className="text-[12.5px] leading-relaxed text-muted-foreground">{s.instruction}</span>
        </div>
      ))}
    </div>
  );
}
