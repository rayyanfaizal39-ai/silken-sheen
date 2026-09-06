import { useState } from "react";
import type { BreezeDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { ApparatusOverlayFigure } from "./ApparatusOverlayFigure";
import { CH9_ART, CH9_ART_ASPECT, COAST, breezeFlow } from "./ch9-heat-geometry";
import { CH9_COLOURS, FlowArrow, OverlayTag } from "./Ch9OverlayParts";

/**
 * Sea breeze and land breeze, drawn on the coastline itself.
 *
 * The two photographs — the same shore at noon and at night — used to sit above
 * a separate schematic that put land on the left and sea on the right, the
 * mirror of the pictures beside it. A learner had to reconcile two conflicting
 * layouts before reaching the physics. Here there is one figure per state: the
 * photograph for that time of day carries the airflow directly, so the picture
 * the student recognises and the mechanism they must learn are the same object.
 *
 * Every arrow is derived from one field — which side is warmer right now. Warm
 * air rises over the warmer side, and the surface wind blows from the cooler
 * side toward the warmer side to replace it. Deriving all four arrows from
 * `warmerSide` means the day and night cases cannot end up pointing the same
 * way, which is the error this figure exists to prevent.
 *
 * Naming follows the source: the breeze is named after where the wind comes
 * FROM. Sea breeze blows sea -> land; land breeze blows land -> sea.
 */
export function BreezeDiagram({ block, lang }: { block: BreezeDiagramBlock; lang?: string }) {
  const [which, setWhich] = useState<"sea" | "land">(
    (block.breezes[0]?.id as "sea" | "land") ?? "sea",
  );
  const copy = figureCopy(lang);

  const active = block.breezes.find((b) => b.id === which) ?? block.breezes[0];
  const flow = breezeFlow(active.warmerSide);
  const image = active.image;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2.5 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.breezes.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={which === b.id}
            onClick={() => setWhich(b.id as "sea" | "land")}
            className={conceptButtonClass(which === b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <ApparatusOverlayFigure
        src={image.src}
        alt={image.alt}
        aspect={CH9_ART_ASPECT}
        caption={image.caption}
        priority
        overlay={{
          width: CH9_ART.width,
          height: CH9_ART.height,
          label: `${active.label} — ${active.timeOfDay}`,
          children: (
            <>
              {/* The circulation, in the order a learner reads it: the surface
                  wind they can feel, then where that air goes. */}
              <FlowArrow arrow={flow.surface} colour={CH9_COLOURS.flow} width={13} head={1.15} />
              <FlowArrow arrow={flow.rising} colour={CH9_COLOURS.warm} />
              <FlowArrow arrow={flow.sinking} colour={CH9_COLOURS.cool} />
              <FlowArrow arrow={flow.aloft} colour={CH9_COLOURS.flow} opacity={0.7} dashed />

              <OverlayTag
                x={flow.warmX}
                y={COAST.columnTop - 14}
                text={block.risesLabel}
                colour={CH9_COLOURS.warm}
              />
              <OverlayTag
                x={COAST.seaX}
                y={COAST.surfaceY + 74}
                text={block.seaLabel}
                colour={CH9_COLOURS.cool}
              />
              <OverlayTag
                x={COAST.landX}
                y={COAST.surfaceY + 74}
                text={block.landLabel}
                colour={CH9_COLOURS.focus}
              />
            </>
          ),
        }}
      />

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {active ? (
          <>
            <b className="text-primary">{active.label}</b> ({active.timeOfDay}) — {active.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
