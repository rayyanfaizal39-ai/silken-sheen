import { useState } from "react";
import type { CircuitKind, SeriesParallelBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Series versus parallel, drawn as the thing that actually differs: the number
 * of paths a charge can take.
 *
 * The series panel is one closed loop with both bulbs on it. The parallel panel
 * splits at two junction dots into two branches, each carrying one bulb, and
 * rejoins. Drawing the junctions explicitly is what stops "parallel" being read
 * as "two circuits drawn near each other".
 */
function CircuitArt({ kind, selected }: { kind: CircuitKind; selected: boolean }) {
  const stroke = selected ? "stroke-primary" : "stroke-border";
  const bulb = (cx: number, cy: number) => (
    <g className={stroke} key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r="9" fill="none" className="stroke-current" strokeWidth="1.6" />
      <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} className="stroke-current" strokeWidth="1.2" />
      <line x1={cx + 6} y1={cy - 6} x2={cx - 6} y2={cy + 6} className="stroke-current" strokeWidth="1.2" />
    </g>
  );

  if (kind.id === "series") {
    return (
      <svg viewBox="0 0 150 96" className="h-auto w-full" role="img" aria-label={kind.name}>
        {/* one loop, both bulbs on it */}
        <path
          d="M20,26 L52,26 M68,26 L106,26 M122,26 L130,26 L130,74 L20,74 L20,26"
          fill="none"
          className={stroke}
          strokeWidth={selected ? 2.4 : 1.7}
        />
        {bulb(60, 26)}
        {bulb(114, 26)}
        {/* cell on the bottom wire */}
        <g className={stroke}>
          <line x1={68} y1={68} x2={68} y2={80} className="stroke-current" strokeWidth="2.4" />
          <line x1={78} y1={71} x2={78} y2={77} className="stroke-current" strokeWidth="3.4" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 150 96" className="h-auto w-full" role="img" aria-label={kind.name}>
      {/* trunk with two branches between the same pair of junctions */}
      <path
        d="M20,50 L46,50 M46,20 L62,20 M78,20 L104,20 M46,80 L62,80 M78,80 L104,80 M104,50 L130,50"
        fill="none"
        className={stroke}
        strokeWidth={selected ? 2.4 : 1.7}
      />
      {/* the two junctions and the risers that make them branches */}
      <path
        d="M46,20 L46,80 M104,20 L104,80"
        fill="none"
        className={stroke}
        strokeWidth={selected ? 2.4 : 1.7}
      />
      <circle cx={46} cy={50} r="3" className={selected ? "fill-primary" : "fill-border"} />
      <circle cx={104} cy={50} r="3" className={selected ? "fill-primary" : "fill-border"} />
      {bulb(70, 20)}
      {bulb(70, 80)}
      {/* cell on the trunk */}
      <g className={stroke}>
        <line x1={24} y1={44} x2={24} y2={56} className="stroke-current" strokeWidth="2.4" />
        <line x1={32} y1={47} x2={32} y2={53} className="stroke-current" strokeWidth="3.4" />
      </g>
    </svg>
  );
}

export function SeriesParallelSchematic({
  block,
  lang,
}: {
  block: SeriesParallelBlock;
  lang?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const activeKind = block.kinds.find((k) => k.id === active) ?? null;
  const copy = figureCopy(lang);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="grid gap-2.5 sm:grid-cols-2">
        {block.kinds.map((kind) => {
          const isActive = active === kind.id;
          return (
            <button
              key={kind.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : kind.id)}
              className={`flex min-h-11 cursor-pointer flex-col rounded-xl border-2 px-2.5 py-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isActive
                  ? "border-primary bg-primary/15 shadow-md"
                  : "border-primary/40 bg-card hover:-translate-y-px hover:border-primary hover:bg-primary/10 hover:shadow-md"
              }`}
            >
              <span className="font-display text-[13px] font-bold text-foreground">{kind.name}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                {kind.pathSummary}
              </span>
              <CircuitArt kind={kind} selected={isActive} />
              <dl className="mt-1 flex flex-col gap-0.5">
                {[
                  [block.currentLabel, kind.currentRule],
                  [block.voltageLabel, kind.voltageRule],
                  [block.resistanceLabel, kind.resistanceRule],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="inline text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {k}:{" "}
                    </dt>
                    <dd className="inline text-[11.5px] font-semibold text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className={`mt-2.5 min-h-[3rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          activeKind
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeKind ? (
          <>
            <p>
              <b className="text-primary">{activeKind.name}</b> — {activeKind.note}
            </p>
            <p className="mt-1">
              <span className="font-bold uppercase tracking-wide text-emerald-300">
                {block.advantageLabel}:
              </span>{" "}
              {activeKind.advantage}
            </p>
            <p className="mt-0.5">
              <span className="font-bold uppercase tracking-wide text-amber-300">
                {block.disadvantageLabel}:
              </span>{" "}
              {activeKind.disadvantage}
            </p>
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </div>
    </div>
  );
}
