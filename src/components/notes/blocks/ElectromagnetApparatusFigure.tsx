import { useId } from "react";
import type {
  ApparatusDiagramBlock,
  ExperimentApparatusImage,
} from "@/content/form2/science/interactive-types";
import { ApparatusOverlayFigure } from "./ApparatusOverlayFigure";
import { SpotlightOverlay } from "./SpotlightOverlay";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import {
  attractedPins,
  coilTurnLayout,
  COIL_TURNS_BY_STEP,
  COIL_TURNS_CONTROLLED,
  ELECTROMAGNET_ART,
  ELECTROMAGNET_ART_ASPECT,
  ELECTROMAGNET_CORE,
  ELECTROMAGNET_DIM_OPACITY,
  ELECTROMAGNET_PARTS,
  fieldCueRings,
  PIN_SHAPE,
} from "./ch7-approved-figure-geometry";

/**
 * The electromagnet-strength investigation, carried out on the approved
 * photograph of its own apparatus.
 *
 * This is the investigation's primary apparatus visual, not an illustration
 * beside it, and it earns that by responding to both things the learner
 * controls:
 *
 *  - **Selecting a piece of apparatus** lights up the real thing on the
 *    photograph and dims the rest. The eight names and roles are not authored
 *    here — they are the section's own `apparatusDiagram.parts`, so the labels
 *    exist once per language and the geometry once for both.
 *  - **Moving the manipulated variable** redraws the coil, the field cue and
 *    the pins clinging to the iron core. The responding variable of this
 *    investigation is the NUMBER OF PINS ATTRACTED, so pins are the primary
 *    feedback: each step keeps every pin the step below it drew and adds more,
 *    which is the qualitative claim the source actually supports. No step is
 *    labelled with a pin count, because there is no pin dataset to label it
 *    with.
 *
 * Every coordinate comes from `ch7-approved-figure-geometry.ts` — the teaching
 * layer in the artwork's own pixel space, the highlight regions in percentages
 * of it — so the picture and everything drawn on it scale as one at any width.
 */

/** The field colour Chapter 7's other current-and-field overlays already use. */
const FIELD_STROKE = "#34d399";
const COPPER_STROKE = "#f9a03c";
const COPPER_SHADOW = "#7c3d0a";
const PIN_STROKE = "#dbe4f0";
const PIN_SHADOW = "#0f172e";

/** The wound copper coil, drawn at whatever turn count the investigation is at. */
function CoilOverlay({ turns }: { turns: number }) {
  const { x, coilLeft, coilRight, coilTopY, coilBottomY } = ELECTROMAGNET_CORE;
  const { turns: loops, strokeWidth } = coilTurnLayout(turns);
  const rx = (coilRight - coilLeft) / 2;
  return (
    <g>
      {/* The artwork paints one fixed coil, so the generated coil sits on a
          soft scrim over that band — otherwise fifty turns would be drawn on
          top of twelve and read as noise rather than as denser wire. */}
      <rect
        x={coilLeft - 6}
        y={coilTopY - 8}
        width={coilRight - coilLeft + 12}
        height={coilBottomY - coilTopY + 16}
        rx={10}
        fill="#0b1533"
        fillOpacity={0.88}
      />
      {loops.map((loop, index) => (
        <g key={index}>
          <ellipse
            cx={x}
            cy={loop.cy + strokeWidth * 0.35}
            rx={rx}
            ry={loop.ry}
            fill="none"
            stroke={COPPER_SHADOW}
            strokeWidth={strokeWidth}
            strokeOpacity={0.75}
          />
          <ellipse
            cx={x}
            cy={loop.cy}
            rx={rx}
            ry={loop.ry}
            fill="none"
            stroke={COPPER_STROKE}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </g>
      ))}
    </g>
  );
}

/**
 * The strength cue: arcs spreading from the magnetised lower end of the core,
 * more of them and brighter as the field strengthens. Secondary to the pins by
 * design — it is what makes the extra pins read as a consequence.
 */
function FieldCueOverlay({ step }: { step: number }) {
  const { x, bottomY } = ELECTROMAGNET_CORE;
  return (
    <g>
      {fieldCueRings(step).map((ring, index) => (
        <ellipse
          key={index}
          cx={x}
          cy={bottomY}
          rx={ring.r}
          ry={ring.r * 0.66}
          fill="none"
          stroke={FIELD_STROKE}
          strokeWidth={6}
          strokeOpacity={ring.opacity}
        />
      ))}
    </g>
  );
}

/** The pins the electromagnet has picked up — the responding variable itself. */
function PinsOverlay({ step }: { step: number }) {
  const { length, headRadius } = PIN_SHAPE;
  return (
    <g>
      {attractedPins(step).map((pin) => {
        const rad = (pin.deg * Math.PI) / 180;
        const tipX = pin.x + Math.cos(rad) * length;
        const tipY = pin.y + Math.sin(rad) * length;
        return (
          <g key={pin.id}>
            {/* Shaft, with a dark casing so a steel pin stays visible against
                both the pale rod and the dark bench behind it. */}
            <line
              x1={pin.x}
              y1={pin.y}
              x2={tipX}
              y2={tipY}
              stroke={PIN_SHADOW}
              strokeWidth={7}
              strokeLinecap="round"
              strokeOpacity={0.85}
            />
            <line
              x1={pin.x}
              y1={pin.y}
              x2={tipX}
              y2={tipY}
              stroke={PIN_STROKE}
              strokeWidth={3.4}
              strokeLinecap="round"
            />
            {/* The pin head, at the free end. */}
            <circle cx={tipX} cy={tipY} r={headRadius + 1.6} fill={PIN_SHADOW} fillOpacity={0.85} />
            <circle cx={tipX} cy={tipY} r={headRadius} fill={PIN_STROKE} />
          </g>
        );
      })}
    </g>
  );
}

export function ElectromagnetApparatusFigure({
  image,
  apparatus,
  /** `"turns"` when the coil count is the manipulated variable, else `"current"`. */
  variable,
  /** Which of the five tested values is selected, 0-4. */
  step,
  activePart,
  onActivePartChange,
  lang,
}: {
  image: ExperimentApparatusImage;
  apparatus: ApparatusDiagramBlock;
  variable: string;
  step: number;
  activePart: string | null;
  onActivePartChange: (next: string | null) => void;
  lang?: string;
}) {
  const copy = figureCopy(lang);
  const maskId = `${useId()}-em-apparatus`;
  const selected = apparatus.parts.find((part) => part.id === activePart) ?? null;
  const shapes = activePart ? (ELECTROMAGNET_PARTS[activePart] ?? []) : [];
  const turns =
    variable === "turns"
      ? (COIL_TURNS_BY_STEP[Math.min(COIL_TURNS_BY_STEP.length - 1, Math.max(0, step))] ??
        COIL_TURNS_CONTROLLED)
      : COIL_TURNS_CONTROLLED;
  const response =
    image.responseLabels[Math.min(image.responseLabels.length - 1, Math.max(0, step))];

  return (
    <div className="flex flex-col gap-2">
      <InteractiveBadge lang={lang} instruction={apparatus.instruction} />

      <ApparatusOverlayFigure
        src={image.src}
        alt={image.alt}
        aspect={ELECTROMAGNET_ART_ASPECT}
        size="panel"
        caption={apparatus.caption}
        // The apparatus leads its own investigation, so it is above the fold
        // whenever the section is open; deferring it would show a reader an
        // empty box where the figure they came for should be.
        priority
        overlay={{
          width: ELECTROMAGNET_ART.width,
          height: ELECTROMAGNET_ART.height,
          label: apparatus.title,
          children: (
            <>
              <FieldCueOverlay step={step} />
              <CoilOverlay turns={turns} />
              <PinsOverlay step={step} />
            </>
          ),
        }}
      >
        {/* Highlighting a part dims the rest of the circuit rather than adding
            a label to a picture that is already finished. Percentages, so the
            region stays on its apparatus at every width. */}
        <SpotlightOverlay maskId={maskId} shapes={shapes} dimOpacity={ELECTROMAGNET_DIM_OPACITY} />
        {selected && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[3%] z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:text-[12.5px]"
          >
            {selected.label}
          </span>
        )}
        {/* The coil-turn readout, so the redrawn density is named as well as
            drawn — the picture never carries a baked-in number. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[3%] left-[2.5%] z-10 rounded-lg border border-white/20 bg-slate-950/80 px-2 py-1 text-[9.5px] font-semibold leading-tight text-white backdrop-blur-[2px] sm:text-[11px]"
        >
          {image.turnsLabel}: {turns}
        </span>
      </ApparatusOverlayFigure>

      {/* What the photograph is showing right now, in words. Qualitative only:
          a rank, never a measured number of pins. */}
      <p
        aria-live="polite"
        className="rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] font-semibold leading-relaxed text-foreground"
      >
        {response}
      </p>

      {/* The apparatus controls. Full-size, keyboard-reachable buttons rather
          than pin-sized regions on the artwork: the iron core is a few
          millimetres wide on a phone, and a hit area that small is a control
          only a mouse can use. */}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {apparatus.parts.map((part) => {
          const isActive = part.id === activePart;
          return (
            <button
              key={part.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onActivePartChange(isActive ? null : part.id)}
              className={conceptButtonClass(isActive, "flex-auto sm:flex-none")}
            >
              {part.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          selected
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {selected ? (
          <>
            <b className="text-primary">{selected.label}</b> — {selected.note}
          </>
        ) : (
          (apparatus.hint ?? copy.prompt)
        )}
      </p>
    </div>
  );
}
