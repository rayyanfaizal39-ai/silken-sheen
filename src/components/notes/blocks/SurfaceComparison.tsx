import { useState } from "react";
import type { SurfaceComparisonBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { ApparatusOverlayFigure } from "./ApparatusOverlayFigure";
import {
  CANS,
  CH9_ART,
  CH9_ART_ASPECT,
  absorptionRays,
  emissionRays,
} from "./ch9-heat-geometry";
import { CH9_COLOURS, FlowArrow, OverlayTag } from "./Ch9OverlayParts";

/**
 * Dark and dull versus light and shiny, for absorption and emission.
 *
 * The base is the controlled experiment itself: two identical cans, one matte
 * black and one shiny silver, each with a thermometer, and one heat source
 * standing between them. The abstract pair of rectangles this replaces made the
 * comparison look like a claim about colour; the apparatus makes it a
 * measurement, and the thermometers are what is actually read.
 *
 * Absorption and emission stay separate views rather than one merged picture,
 * because collapsing them is how "dark absorbs better" quietly becomes the only
 * thing a learner remembers. In both views the dark can is the better performer,
 * and the direction of the arrows is what changes.
 */
export function SurfaceComparison({ block, lang }: { block: SurfaceComparisonBlock; lang?: string }) {
  const [mode, setMode] = useState<"absorb" | "emit">((block.modes[0]?.id as "absorb") ?? "absorb");
  const copy = figureCopy(lang);
  const active = block.modes.find((m) => m.id === mode) ?? block.modes[0];
  const absorbing = mode === "absorb";
  const rays = absorbing ? absorptionRays() : emissionRays();
  const { dark, shiny, source } = CANS;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2.5 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id as "absorb" | "emit")}
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
          children: (
            <>
              {/* Emission is measured with both cans filled with hot water and no
                  external source, so the heater is muted rather than left
                  glowing beside a caption that says it is not being used. */}
              {!absorbing && (
                <ellipse
                  cx={source.x}
                  cy={source.y + 20}
                  rx={190}
                  ry={95}
                  fill={CH9_COLOURS.outline}
                  fillOpacity={0.62}
                />
              )}

              {rays.map((ray) => (
                <FlowArrow
                  key={ray.key}
                  arrow={ray}
                  colour={CH9_COLOURS.ray}
                  width={ray.strong ? 10 : 8}
                  opacity={ray.strong ? 1 : 0.5}
                  head={ray.strong ? 1 : 0.8}
                />
              ))}

              {/* Which surface each can is, and how it performs in this mode. */}
              {(
                [
                  [dark, block.darkLabel, block.betterLabel, true],
                  [shiny, block.shinyLabel, block.poorerLabel, false],
                ] as const
              ).map(([can, name, verdict, strong]) => (
                <g key={name}>
                  <OverlayTag
                    x={can.x + can.w / 2}
                    y={can.y - 18}
                    text={name}
                    colour={strong ? CH9_COLOURS.ray : CH9_COLOURS.cool}
                  />
                  <OverlayTag
                    x={can.x + can.w / 2}
                    y={can.y + can.h + 74}
                    text={verdict}
                    colour={strong ? CH9_COLOURS.flow : CH9_COLOURS.cool}
                  />
                </g>
              ))}
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
            <b className="text-primary">{active.label}</b> — {active.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
