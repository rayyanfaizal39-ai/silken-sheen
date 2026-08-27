import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const JOURNEY_COPY = {
  en: { progress: "Journey progress", start: "Start", complete: "Complete" },
  bm: { progress: "Kemajuan perjalanan", start: "Mula", complete: "Selesai" },
} as const;

export function Journey({
  steps,
  instruction,
  lang = "en",
}: {
  steps: { title: string; body: string; detail?: string }[];
  instruction: string;
  /** Defaults to English so existing callers keep their current chrome. */
  lang?: "en" | "bm";
}) {
  const [current, setCurrent] = useState(0);
  const t = JOURNEY_COPY[lang];
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
      <p className="mb-4 text-xs text-muted-foreground">{instruction}</p>
      <div className="mb-4 flex flex-wrap gap-2" aria-label={t.progress}>
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            onClick={() => setCurrent(index)}
            aria-current={current === index ? "step" : undefined}
            className={`flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              current === index
                ? "border-primary bg-primary text-primary-foreground"
                : index < current
                  ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-200"
                  : "border-border bg-card/60 text-muted-foreground"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="min-h-28 rounded-xl border border-border bg-card/70 p-4">
        <h4 className="font-display font-bold text-foreground">{steps[current].title}</h4>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{steps[current].body}</p>
        {steps[current].detail && <p className="mt-2 text-xs font-semibold text-primary">{steps[current].detail}</p>}
      </div>
      <div className="mt-3 flex justify-between gap-3">
        <button type="button" disabled={current === 0} onClick={() => setCurrent((v) => v - 1)} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-primary disabled:opacity-30">
          <ArrowLeft className="h-4 w-4" /> {current === 0 ? t.start : steps[current - 1].title}
        </button>
        <button type="button" disabled={current === steps.length - 1} onClick={() => setCurrent((v) => v + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-right text-xs font-semibold text-primary disabled:opacity-30">
          {current === steps.length - 1 ? t.complete : steps[current + 1].title} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
