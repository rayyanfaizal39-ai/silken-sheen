import { useState } from "react";
import type {
  ApparatusDiagramBlock,
  MiniExperimentBlock,
} from "@/content/form2/science/interactive-types";
import { ElectromagnetApparatusFigure } from "./ElectromagnetApparatusFigure";

/**
 * A compulsory experiment, staged compactly enough to sit inside a notes
 * section rather than expanding into a worksheet page.
 *
 * One tab per manipulated variable. The three variables are pinned above the
 * apparatus in a fixed order and colour, because naming the manipulated and
 * responding variable is the part that gets examined.
 *
 * The order below is the order a laboratory report is written in — aim,
 * hypothesis, variables, apparatus, the measurements, then observation and
 * conclusion — so an investigation that ships approved apparatus artwork
 * (`block.apparatusImage`) puts the picture exactly where the apparatus
 * belongs, with the manipulated-variable control directly under it. The
 * picture then responds to that control rather than sitting beside it: see
 * `ElectromagnetApparatusFigure`.
 */
export function MiniExperiment({
  block,
  /**
   * The apparatus a picture-led investigation labels. Passed in rather than
   * duplicated into this block: the eight names and roles already live in the
   * section's `apparatusDiagram`, which stops being drawn as a separate
   * schematic once the photograph is carrying them.
   */
  apparatus,
  lang,
}: {
  block: MiniExperimentBlock;
  apparatus?: ApparatusDiagramBlock;
  lang?: string;
}) {
  const [activeId, setActiveId] = useState(block.parts[0]?.id ?? "");
  // Keyed by part id so switching tabs (Current <-> Turns) does not reset the
  // other tab's own stepper position.
  const [stepByPart, setStepByPart] = useState<Record<string, number>>({});
  const [activePart, setActivePart] = useState<string | null>(null);
  const part = block.parts.find((p) => p.id === activeId) ?? block.parts[0];

  if (!part) return null;

  const step = stepByPart[part.id] ?? 0;
  const setStep = (next: number) => setStepByPart((prev) => ({ ...prev, [part.id]: next }));
  const figure =
    block.apparatusImage && apparatus ? (
      <ElectromagnetApparatusFigure
        image={block.apparatusImage}
        apparatus={apparatus}
        variable={part.id}
        step={step}
        activePart={activePart}
        onActivePartChange={setActivePart}
        lang={lang}
      />
    ) : null;

  const variables = [
    {
      key: "manipulated",
      label: block.manipulatedLabel,
      value: part.manipulated,
      tone: "border-amber-400/35 bg-amber-500/10 text-amber-200",
    },
    {
      key: "responding",
      label: block.respondingLabel,
      value: part.responding,
      tone: "border-sky-400/35 bg-sky-500/10 text-sky-200",
    },
    {
      key: "controlled",
      label: block.controlledLabel,
      value: part.controlled,
      tone: "border-violet-400/35 bg-violet-500/10 text-violet-200",
    },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="mb-3 rounded-xl border border-border bg-card/55 px-3 py-2">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-primary">
          {block.aimLabel}
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-foreground">{block.aim}</p>
      </div>

      {/* one tab per manipulated variable */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {block.parts.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(p.id)}
              className={`min-h-11 cursor-pointer rounded-full border-2 px-3 py-1.5 text-[11.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/55 text-muted-foreground hover:border-primary"
              }`}
            >
              {p.icon && <span className="mr-1">{p.icon}</span>}
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-[13.5px] font-semibold leading-relaxed text-foreground">
          {part.question}
        </p>

        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-emerald-300">
            {block.hypothesisLabel}
          </p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-foreground">{part.hypothesis}</p>
        </div>

        {/* the examinable triad, above the apparatus: a learner should know
            what is being changed and what is being measured before they look
            at the set-up that changes and measures it. */}
        <div className="grid gap-2 sm:grid-cols-3">
          {variables.map((v) => (
            <div key={v.key} className={`rounded-xl border px-3 py-2 ${v.tone}`}>
              <p className="text-[10.5px] font-bold uppercase tracking-wide">{v.label}</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">{v.value}</p>
            </div>
          ))}
        </div>

        {/* the apparatus itself, directly above the control that changes it */}
        {figure}

        {/* the interactive stepper: move through the tested values and watch
            the qualitative (rank-only — never a fabricated count) response
            indicator move with it, so the relationship is watched, not just
            read in the conclusion sentence. */}
        {part.values && part.values.length > 0 && (
          <div className="rounded-xl border border-primary/25 bg-primary/5 px-3 py-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wide text-primary">
                {part.manipulated}
              </span>
              <span className="font-display text-[15px] font-bold text-foreground">
                {part.values[step]}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={part.values.length - 1}
              step={1}
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              aria-label={part.manipulated}
              aria-valuetext={part.values[step]}
              className="mt-2 w-full accent-primary"
            />
            <div className="mt-2 flex items-end gap-1" aria-hidden="true">
              {part.values.map((v, i) => (
                <div
                  key={v}
                  className={`flex-1 rounded-t transition-all ${
                    i === step ? "bg-primary" : "bg-primary/20"
                  }`}
                  style={{ height: `${8 + ((i + 1) / part.values!.length) * 28}px` }}
                />
              ))}
            </div>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
              {block.respondingLabel}: {part.responding}
            </p>
          </div>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/55 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
              {block.materialsLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">{part.materials}</p>
          </div>
          <div className="rounded-xl border border-border bg-card/55 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
              {block.apparatusLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">{part.apparatus}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-secondary/30 px-3 py-2">
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
            {block.methodLabel}
          </p>
          <ol className="mt-1 flex list-decimal flex-col gap-1 pl-4">
            {part.method.map((step) => (
              <li key={step} className="text-[12.5px] leading-relaxed text-foreground">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/55 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground">
              {block.observationLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">
              {part.observation}
            </p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/10 px-3 py-2">
            <p className="text-[10.5px] font-bold uppercase tracking-wide text-primary">
              {block.conclusionLabel}
            </p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground">
              {part.conclusion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
