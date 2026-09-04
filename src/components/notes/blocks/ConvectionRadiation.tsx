import { useState } from "react";
import type { ConvectionRadiationBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { ApparatusOverlayFigure } from "./ApparatusOverlayFigure";
import { CH9_ART, CH9_ART_ASPECT, KITCHEN, convectionLoop, radiationRays } from "./ch9-heat-geometry";
import { CH9_COLOURS, FlowArrow, OverlayTag } from "./Ch9OverlayParts";

/**
 * The two transfer modes that do not need a solid, drawn on the kitchen scene.
 *
 * The scene already contains both: water boiling in a pan over a flame, and a
 * hand held up beside the pan without touching it. Putting the mechanism on that
 * picture rather than in a schematic below it means the student is shown the
 * process happening in the thing they just recognised, instead of being asked to
 * map one onto the other.
 *
 * Convection is drawn as a closed loop with the warm middle rising and the cool
 * sides sinking — the loop is what makes it a current, so it is one continuous
 * path rather than two unrelated arrows.
 *
 * Radiation deliberately draws NOTHING between the pan and the hand. The whole
 * point is that nothing needs to be there, so filling the gap with a medium
 * would contradict the caption.
 */

type ModeId = "convection" | "radiation";

export function ConvectionRadiation({
  block,
  lang,
}: {
  block: ConvectionRadiationBlock;
  lang?: string;
}) {
  const [mode, setMode] = useState<ModeId>((block.modes[0]?.id as ModeId) ?? "convection");
  const copy = figureCopy(lang);
  const active = block.modes.find((m) => m.id === mode) ?? block.modes[0];
  const loop = convectionLoop();
  const { pan, hand } = KITCHEN;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2.5 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id as ModeId)}
            className={conceptButtonClass(mode === m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <ApparatusOverlayFigure
        src={block.image.src}
        alt={block.image.alt}
        aspect={CH9_ART_ASPECT}
        caption={block.image.caption}
        priority
        overlay={{
          width: CH9_ART.width,
          height: CH9_ART.height,
          label: active?.label ?? block.title,
          children:
            mode === "convection" ? (
              <>
                {/* A cut-away over the pan, so the loop reads as being inside the
                    water rather than painted on the metal. */}
                <rect
                  x={pan.x}
                  y={pan.y}
                  width={pan.w}
                  height={pan.h}
                  rx={26}
                  fill={CH9_COLOURS.outline}
                  fillOpacity={0.42}
                />
                <path
                  d={loop.d}
                  fill="none"
                  stroke={CH9_COLOURS.flow}
                  strokeWidth={7}
                  strokeOpacity={0.75}
                />
                {loop.arrows.map((arrow) => (
                  <FlowArrow
                    key={arrow.key}
                    arrow={arrow}
                    colour={arrow.key === "rise" ? CH9_COLOURS.warm : CH9_COLOURS.cool}
                    width={10}
                  />
                ))}
                {/* Both labels sit inside the cut-away, beside the arrow they
                    name — outside it they would land on the hob. */}
                <OverlayTag
                  x={KITCHEN.flameX - 30}
                  y={pan.y + 104}
                  text={block.warmLabel}
                  colour={CH9_COLOURS.warm}
                  anchor="end"
                />
                <OverlayTag
                  x={pan.x + 74}
                  y={pan.y + pan.h - 22}
                  text={block.coolLabel}
                  colour={CH9_COLOURS.cool}
                  anchor="start"
                />
              </>
            ) : (
              <>
                {/* Nothing is drawn in the gap: that emptiness is the lesson. */}
                {radiationRays().map((ray, i) => (
                  <FlowArrow key={i} arrow={ray} colour={CH9_COLOURS.ray} width={9} />
                ))}
                <OverlayTag
                  x={(pan.x + pan.w + hand.x) / 2}
                  y={pan.y - 40}
                  text={active?.label ?? ""}
                  colour={CH9_COLOURS.ray}
                />
              </>
            ),
        }}
      />

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <div
        aria-live="polite"
        className="mt-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2"
      >
        {active ? (
          <>
            <p className="text-[12px] leading-relaxed text-foreground">
              <b className="text-primary">{active.label}</b> — {active.note}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{active.detail}</p>
          </>
        ) : (
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            {block.hint || copy.prompt}
          </p>
        )}
      </div>
    </div>
  );
}
