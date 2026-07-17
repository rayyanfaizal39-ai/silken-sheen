import { bgPanel } from "./neon-tokens";

export interface FlatLifeTimelineStep {
  step: number;
  text: string;
}

export function FlatLifeTimeline({ steps }: { steps: FlatLifeTimelineStep[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((s, i) => (
        <div key={s.step} className="relative flex gap-3.5 py-2.5">
          {i < steps.length - 1 && (
            <div className="absolute left-4 top-9 h-[calc(100%-8px)] w-px" style={{ background: "rgba(148,163,184,0.14)" }} />
          )}
          <span
            className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-[13px] font-semibold text-foreground"
            style={{ background: bgPanel }}
          >
            {s.step}
          </span>
          <p className="pt-1 text-[11.5px] leading-relaxed text-muted-foreground">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
