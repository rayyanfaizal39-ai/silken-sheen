import { useState } from "react";
import type { BuoyancySchematicBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { ArrowHead, Chapter8PhotoFigure } from "@/components/notes/chapter8/Chapter8PhotoFigure";

/**
 * The spring-balance method for buoyant force, drawn as the two readings the
 * source actually takes: the object in air (W1) and the same object submerged
 * (W2). The difference between the two readings is the buoyant force.
 *
 * The float/sink views are deliberately separate from the measurement view,
 * because the force condition differs between them and collapsing the two is
 * how "floating means F > W" gets taught by accident. Here, floating is drawn
 * with the two arrows equal, and only sinking draws W longer than F.
 */

type ViewId = "measure" | "floating" | "sinking";

/**
 * Arrow lengths in artwork pixels. Floating keeps F and W identical on purpose:
 * a floating object is in equilibrium, and drawing F longer is exactly how
 * "floating means an unbalanced upward force" gets taught by accident.
 */
const FORCE_LEN: Record<Exclude<ViewId, "measure">, { up: number; down: number }> = {
  floating: { up: 150, down: 150 },
  sinking: { up: 95, down: 165 },
};
/** Block edges measured on each scene, so the arrows leave the object itself. */
const FORCE_X: Record<Exclude<ViewId, "measure">, number> = { floating: 846, sinking: 827 };
const FORCE_TOP: Record<Exclude<ViewId, "measure">, number> = { floating: 272, sinking: 498 };
const FORCE_BOTTOM: Record<Exclude<ViewId, "measure">, number> = { floating: 574, sinking: 707 };

/** First number in a reading such as "10 N", so the pointer can sit where the scale says. */
export function readingValue(text: string) {
  const match = /-?\d+(?:[.,]\d+)?/.exec(text ?? "");
  return match ? Number(match[0].replace(",", ".")) : null;
}

export function BuoyancySchematic({ block, lang }: { block: BuoyancySchematicBlock; lang?: string }) {
  const [view, setView] = useState<ViewId>("measure");
  const copy = figureCopy(lang);

  const views: { id: ViewId; label: string }[] = [
    { id: "measure", label: block.buoyantForceLabel },
    { id: "floating", label: block.floatingNote.split(/[.—-]/)[0].trim() },
    { id: "sinking", label: block.sinkingNote.split(/[.—-]/)[0].trim() },
  ];

  const note =
    view === "measure" ? block.formula : view === "floating" ? block.floatingNote : block.sinkingNote;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
            className={conceptButtonClass(view === v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view === "measure" ? (
        <Chapter8PhotoFigure
          image="springBalance"
          alt={
            lang === "bm"
              ? "Bongkah yang sama digantung pada neraca spring di udara dan di dalam air."
              : "The same block hung from a spring balance in air and then in water."
          }
          space="pixel"
          priority
        >
          {/* The readings stay as SVG so they are never baked into the artwork
              and remain controllable per language. */}
          <text
            data-reading="air"
            x={575}
            y={430}
            textAnchor="middle"
            fontSize="52"
            fontWeight="bold"
            className="fill-emerald-300"
            stroke="rgba(2,8,23,0.75)"
            strokeWidth="8"
            paintOrder="stroke"
          >
            {block.realWeight}
          </text>
          <text
            data-reading="water"
            x={1290}
            y={330}
            textAnchor="middle"
            fontSize="52"
            fontWeight="bold"
            className="fill-emerald-300"
            stroke="rgba(2,8,23,0.75)"
            strokeWidth="8"
            paintOrder="stroke"
          >
            {block.apparentWeight}
          </text>
          <text
            x={556}
            y={484}
            textAnchor="start"
            fontSize="30"
            className="fill-slate-200"
            stroke="rgba(2,8,23,0.75)"
            strokeWidth="6"
            paintOrder="stroke"
          >
            {block.realWeightLabel}
          </text>
          <text
            x={1271}
            y={384}
            textAnchor="start"
            fontSize="30"
            className="fill-slate-200"
            stroke="rgba(2,8,23,0.75)"
            strokeWidth="6"
            paintOrder="stroke"
          >
            {block.apparentWeightLabel}
          </text>
        </Chapter8PhotoFigure>
      ) : (
        <Chapter8PhotoFigure
          image={view === "floating" ? "floating" : "sinking"}
          alt={
            view === "floating"
              ? lang === "bm"
                ? "Bongkah kayu terapung dengan sebahagiannya di atas permukaan air."
                : "A wooden block floating with part of it above the water surface."
              : lang === "bm"
                ? "Bongkah logam tenggelam di dalam air, jauh dari dasar tangki."
                : "A metal block sinking through the water, clear of the tank floor."
          }
          space="pixel"
          priority
        >
          <ArrowHead id="ch8-buoy-up" className="fill-emerald-300" />
          <ArrowHead id="ch8-buoy-down" className="fill-rose-300" />
          {/* Floating is equilibrium, so the two arrows are drawn the same
              length. Only sinking draws the weight longer than the buoyant
              force. The lengths are constants, never measured off the artwork. */}
          <line
            data-force-arrow="buoyant"
            x1={FORCE_X[view]}
            y1={FORCE_TOP[view]}
            x2={FORCE_X[view]}
            y2={FORCE_TOP[view] - FORCE_LEN[view].up}
            className="stroke-emerald-300"
            strokeWidth="11"
            strokeLinecap="round"
            markerEnd="url(#ch8-buoy-up)"
          />
          <line
            data-force-arrow="weight"
            x1={FORCE_X[view]}
            y1={FORCE_BOTTOM[view]}
            x2={FORCE_X[view]}
            y2={FORCE_BOTTOM[view] + FORCE_LEN[view].down}
            className="stroke-rose-300"
            strokeWidth="11"
            strokeLinecap="round"
            markerEnd="url(#ch8-buoy-down)"
          />
          <text
            x={FORCE_X[view] + 42}
            y={FORCE_TOP[view] - FORCE_LEN[view].up + 34}
            fontSize="46"
            fontWeight="bold"
            className="fill-emerald-300"
            stroke="rgba(2,8,23,0.75)"
            strokeWidth="8"
            paintOrder="stroke"
          >
            F
          </text>
          <text
            x={FORCE_X[view] + 42}
            y={FORCE_BOTTOM[view] + FORCE_LEN[view].down - 6}
            fontSize="46"
            fontWeight="bold"
            className="fill-rose-300"
            stroke="rgba(2,8,23,0.75)"
            strokeWidth="8"
            paintOrder="stroke"
          >
            W
          </text>
        </Chapter8PhotoFigure>
      )}

      {view === "measure" && (
        <p
          data-buoyant-force=""
          className="mt-2 rounded-xl border border-amber-300/40 bg-amber-300/10 px-3 py-2 text-center font-display text-[13px] font-bold text-amber-200"
        >
          {block.buoyantForce}
        </p>
      )}
      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {note}
      </p>
    </div>
  );
}
