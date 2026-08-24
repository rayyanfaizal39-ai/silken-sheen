import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ResearchModuleMeta } from "@/components/science/ScienceDiscoveryChrome";

type Lang = "en" | "bm";

export type ScienceNotesSection = {
  key: string;
  /** Internal curriculum-mapping reference (e.g. a Standard Pembelajaran code). Kept on the
   * type for content-ops/QA traceability, but intentionally never rendered to students — see
   * SCIENCE_F2_CH01_03_LEARNER_FACING_QA_AUDIT.md. */
  eyebrow: string;
  label: string;
  title: string;
  description?: string;
  content: ReactNode;
};

export function ScienceSectionedNotesShell({
  id,
  lang,
  storageKey,
  intro,
  sections,
}: {
  id?: string;
  lang: Lang;
  storageKey?: string;
  intro: ReactNode;
  sections: ScienceNotesSection[];
}) {
  const total = sections.length;
  const stateKey = storageKey ? `${storageKey}:science-f2-section` : undefined;
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

  const active = sections[current] ?? sections[0];
  const isLast = current === total - 1;
  const go = (direction: number) =>
    setCurrent((value) => Math.max(0, Math.min(total - 1, value + direction)));

  return (
    <section id={id} data-lang={lang} className="science-research-modules mt-8 animate-fade-up">
      {intro}

      <div
        className="science-research-orbit mb-6 flex items-center justify-between gap-1 overflow-x-auto pb-2"
        aria-label={lang === "en" ? "Chapter sections" : "Bahagian bab"}
      >
        {sections.map((section, index) => (
          <button
            key={section.key}
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
              {index < current ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={`max-w-[76px] text-center text-[10px] leading-tight ${
                index === current ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>

      <div className="science-research-module-shell relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8">
        <h2 className="science-research-title font-display mb-1 text-xl font-bold text-foreground sm:text-2xl">
          {active.title}
        </h2>
        <ResearchModuleMeta index={current} total={total} title={active.title} lang={lang} />
        {active.description ? (
          <p className="mb-6 text-[13.5px] leading-relaxed text-muted-foreground">
            {active.description}
          </p>
        ) : (
          <div className="mb-6" />
        )}

        {active.content}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {lang === "en" ? "Back" : "Kembali"}
          </button>
          {!isLast && (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {lang === "en" ? "Next section" : "Seksyen seterusnya"}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
