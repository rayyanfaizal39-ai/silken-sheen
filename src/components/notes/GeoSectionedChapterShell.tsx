import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * One-module-at-a-time chapter shell — same mechanics as Science F2's
 * `ScienceSectionedNotesShell` (numbered stepper, Back/Next, remembered
 * position via sessionStorage), deliberately generic/subject-agnostic so it
 * isn't tied to Geography's own section-data shape. A chapter opts in by
 * rendering this instead of a stacked list of sections; nothing here assumes
 * which chapter or subject is using it.
 */
export type GeoSectionedModule = {
  key: string;
  /** Short label under the stepper's circle, e.g. "01". */
  stepLabel: string;
  title: string;
  content: ReactNode;
};

export function GeoSectionedChapterShell({
  storageKey,
  modules,
}: {
  storageKey?: string;
  modules: GeoSectionedModule[];
}) {
  const total = modules.length;
  const stateKey = storageKey ? `${storageKey}:geo-sectioned-module` : undefined;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!stateKey || total === 0) return;
    const saved = window.sessionStorage.getItem(stateKey);
    const parsed = saved ? Number(saved) : 0;
    if (Number.isFinite(parsed)) setCurrent(Math.max(0, Math.min(parsed, total - 1)));
  }, [stateKey, total]);

  useEffect(() => {
    if (stateKey && total > 0) window.sessionStorage.setItem(stateKey, String(current));
  }, [current, stateKey, total]);

  if (total === 0) return null;

  const active = modules[current] ?? modules[0];
  const isLast = current === total - 1;
  const go = (direction: number) => setCurrent((value) => Math.max(0, Math.min(total - 1, value + direction)));

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1" aria-label="Modul bab">
        {modules.map((mod, index) => (
          <button
            key={mod.key}
            type="button"
            onClick={() => setCurrent(index)}
            aria-current={index === current ? "step" : undefined}
            className="flex min-h-11 shrink-0 flex-col items-center gap-1.5 px-1 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                index < current
                  ? "border-transparent bg-gradient-to-br from-primary to-accent text-white"
                  : index === current
                    ? "border-primary text-primary shadow-[0_0_0_4px_rgba(59,130,246,0.16)]"
                    : "border-border text-muted-foreground"
              }`}
            >
              {index < current ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : mod.stepLabel}
            </span>
            <span
              className={`max-w-[84px] text-center text-[10px] leading-tight ${
                index === current ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {mod.title}
            </span>
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          Modul {active.stepLabel} / {String(total).padStart(2, "0")}
        </p>
        <h2 className="font-display mb-5 text-xl font-bold leading-tight text-foreground sm:text-2xl">{active.title}</h2>

        {active.content}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Kembali
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Modul seterusnya
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
