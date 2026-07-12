export interface ProcessStepItem {
  step: number;
  heading: string;
  body: string;
}

export function ProcessSteps({ steps }: { steps: ProcessStepItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((s) => (
        <div key={s.step} className="flex gap-3.5 rounded-xl border border-border bg-secondary/40 p-4">
          <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
            {s.step}
          </span>
          <div>
            <h5 className="font-display mb-1 text-[13.5px] font-bold text-foreground">{s.heading}</h5>
            <p className="text-xs leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
