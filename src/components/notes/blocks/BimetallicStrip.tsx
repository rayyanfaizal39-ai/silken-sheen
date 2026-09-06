import { useState } from "react";
import type { BimetallicStripBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { ApparatusOverlayFigure } from "./ApparatusOverlayFigure";
import { CH9_ART, CH9_ART_ASPECT, FIRE_ALARM, contactClosed, stripLayers } from "./ch9-heat-geometry";
import { CH9_COLOURS, OverlayTag } from "./Ch9OverlayParts";

/**
 * The bimetallic strip in a fire-alarm circuit, drawn on the real apparatus.
 *
 * The apparatus photograph is the primary visual — it shows the cell, the strip,
 * the burner, the contact screw and the bell as a student would meet them — and
 * the state change is drawn over it rather than in a small separate schematic
 * beside it. Only the strip itself is redrawn, over the straight one baked into
 * the artwork; everything else the picture already shows is left alone.
 *
 * The bend is derived, not drawn by hand: the metal that expands more is laid on
 * the OUTSIDE of the curve, which is the only way a strip can bend. The faster
 * metal is drawn on top and the strip curves downward toward the contact, so the
 * drawing and the physics cannot disagree.
 *
 * The circuit is open at room temperature and closes only when heated — that gap
 * is what makes the alarm meaningful, so both states are shown, and whether the
 * circuit reads as complete is computed from whether the strip actually reaches
 * the contact rather than from the state's name.
 */
export function BimetallicStrip({ block, lang }: { block: BimetallicStripBlock; lang?: string }) {
  const [state, setState] = useState<"room" | "heated">((block.states[0]?.id as "room") ?? "room");
  const copy = figureCopy(lang);
  const active = block.states.find((s) => s.id === state) ?? block.states[0];
  const heated = state === "heated";
  const strip = stripLayers(heated);
  const closed = contactClosed(heated);
  const { contact, mask, bell, pivotX, copperY, ironY } = FIRE_ALARM;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2.5 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.states.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={state === s.id}
            onClick={() => setState(s.id as "room" | "heated")}
            className={conceptButtonClass(state === s.id)}
          >
            {s.label}
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
              {/* Only in the heated state is the baked straight strip painted out
                  and replaced; at room temperature the artwork is already right,
                  so nothing is covered. */}
              {heated && (
                <>
                  <rect
                    x={mask.x}
                    y={mask.y}
                    width={mask.w}
                    height={mask.h}
                    fill={FIRE_ALARM.backdrop}
                  />
                  <path d={strip.copper} fill="#d98324" stroke="#8a4f12" strokeWidth={3} />
                  <path d={strip.iron} fill="#b6c4dd" stroke="#6d7d99" strokeWidth={3} />
                </>
              )}

              {/* Which layer is which — named from content, never baked in. */}
              <OverlayTag
                x={pivotX + 150}
                y={copperY - 12}
                text={block.fasterMetal}
                colour="#f0a44a"
                anchor="start"
              />
              <OverlayTag
                x={pivotX + 60}
                y={ironY + 54}
                text={block.slowerMetal}
                colour="#c3d0e6"
                anchor="start"
              />

              {/* The contact: a gap to cross at room temperature, a closed
                  circuit once the strip reaches it. */}
              {/* Open, the ring encloses the gap itself — the strip's underside
                  and the screw top with clear air between them. Closed, it
                  marks the point they now meet. */}
              <circle
                cx={contact.x}
                cy={closed ? contact.y : (ironY + contact.y) / 2}
                r={closed ? 40 : 48}
                fill="none"
                stroke={closed ? CH9_COLOURS.flow : CH9_COLOURS.focus}
                strokeWidth={7}
                strokeDasharray={closed ? undefined : "16 14"}
              />
              <OverlayTag
                x={contact.x + 62}
                y={contact.y + 84}
                text={block.contactLabel}
                colour={closed ? CH9_COLOURS.flow : CH9_COLOURS.focus}
                anchor="start"
              />

              {/* The bell only reads as ringing when the circuit is complete. */}
              <circle
                cx={bell.x}
                cy={bell.y}
                r={bell.r}
                fill="none"
                stroke={closed ? CH9_COLOURS.flow : CH9_COLOURS.outline}
                strokeOpacity={closed ? 0.95 : 0.35}
                strokeWidth={closed ? 10 : 6}
              />
              {closed &&
                [1, 2].map((ring) => (
                  <circle
                    key={ring}
                    cx={bell.x}
                    cy={bell.y}
                    r={bell.r + ring * 34}
                    fill="none"
                    stroke={CH9_COLOURS.flow}
                    strokeWidth={5}
                    strokeOpacity={0.55 / ring}
                  />
                ))}
              <OverlayTag
                x={bell.x - 44}
                y={bell.y + bell.r + 78}
                text={`${block.alarmLabel} — ${closed ? block.circuitClosedLabel : block.circuitOpenLabel}`}
                colour={closed ? CH9_COLOURS.flow : CH9_COLOURS.cool}
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
            <b className="text-primary">{active.label}</b> — {active.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
