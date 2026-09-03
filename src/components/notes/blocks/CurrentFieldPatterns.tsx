import { useState } from "react";
import type { ConductorPattern, CurrentFieldPatternsBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge, PoleLabel } from "./InteractiveFigureCard";
import { figureCopy, type FigureCopy } from "./figure-copy";
import { ApparatusOverlayFigure } from "./ApparatusOverlayFigure";
import {
  CH7_ART,
  CH7_ART_ASPECT,
  CURRENT_LOOP,
  loopCurrentArrows,
  loopInteriorField,
  loopReturnField,
  SOLENOID,
  solenoidExteriorLines,
  solenoidInteriorLines,
  solenoidPoles,
  STRAIGHT_WIRE,
  straightWireCurrentArrow,
  straightWireFieldArrows,
  type FieldArrow,
  type FieldSymbol,
} from "./ch7-field-geometry";

/**
 * Magnetic field patterns produced by a current, taught on the apparatus a
 * student would actually meet in the laboratory.
 *
 * Each conductor shows one photograph of the real apparatus with a generated
 * SVG layer on top of it. The photographs carry no arrows, labels, poles or
 * field lines — every one of those is drawn here, from the geometry module, so
 * it can be language-free, corrected without new artwork, and above all
 * reversed: the reverse-current control exists to teach one specific source
 * point, that flipping the current flips the field's DIRECTION and leaves its
 * PATTERN alone, and that is only convincing if the arrowheads turn while the
 * lines they sit on visibly do not move.
 *
 * The grip rule is rendered as ordered steps with current first, because the
 * rule takes current as its input and yields field as its output — stating it
 * the other way round is the error this chapter previously carried.
 */

const FIELD_STROKE = "#34d399";
const CURRENT_STROKE = "#fbbf24";

/** One arrowhead, rotated to a heading given in the artwork's own space. */
function Head({ x, y, deg, scale = 1, colour = FIELD_STROKE }: FieldArrow & { scale?: number; colour?: string }) {
  return (
    <path
      d="M-13,-10 L13,0 L-13,10 Z"
      transform={`translate(${x} ${y}) rotate(${deg}) scale(${scale})`}
      fill={colour}
      stroke="#052e26"
      strokeWidth={2}
    />
  );
}

/**
 * A field-direction symbol: a filled dot for a field coming out of the page, a
 * cross for one going into it. The two are the standard notation, and swapping
 * between them is exactly what reversing the current does to a loop.
 */
function Symbol({ x, y, out, r, copy }: FieldSymbol & { copy: FigureCopy }) {
  const label = out ? copy.fieldOutOfPage : copy.fieldIntoPage;
  return (
    <g role="img" aria-label={label}>
      <circle cx={x} cy={y} r={r} fill="#052e26" fillOpacity={0.55} stroke={FIELD_STROKE} strokeWidth={3} />
      {out ? (
        <circle cx={x} cy={y} r={r * 0.34} fill={FIELD_STROKE} />
      ) : (
        <g stroke={FIELD_STROKE} strokeWidth={3.4} strokeLinecap="round">
          <line x1={x - r * 0.5} y1={y - r * 0.5} x2={x + r * 0.5} y2={y + r * 0.5} />
          <line x1={x + r * 0.5} y1={y - r * 0.5} x2={x - r * 0.5} y2={y + r * 0.5} />
        </g>
      )}
    </g>
  );
}

function StraightWireOverlay({ reversed }: { reversed: boolean }) {
  const { x, topY, boardY, centre, perspective, radii } = STRAIGHT_WIRE;
  const current = straightWireCurrentArrow(reversed);
  return (
    <>
      {/* The concentric field circles, foreshortened onto the board so they sit
          in the plane the compasses lie in. */}
      {radii.map((rx) => (
        <ellipse
          key={rx}
          cx={centre.x}
          cy={centre.y}
          rx={rx}
          ry={rx * perspective}
          fill="none"
          stroke={FIELD_STROKE}
          strokeWidth={5}
          strokeOpacity={0.9}
        />
      ))}
      {straightWireFieldArrows(reversed).map((arrow) => (
        <Head key={`${arrow.x}-${arrow.y}`} {...arrow} />
      ))}
      {/* The current, marked on the wire itself rather than beside it. */}
      <line
        x1={x}
        y1={topY}
        x2={x}
        y2={boardY - 14}
        stroke={CURRENT_STROKE}
        strokeWidth={8}
        strokeOpacity={0.7}
        strokeLinecap="round"
      />
      <Head {...current} colour={CURRENT_STROKE} scale={1.25} />
    </>
  );
}

function LoopOverlay({ reversed, copy }: { reversed: boolean; copy: FigureCopy }) {
  const { centre, radius } = CURRENT_LOOP;
  return (
    <>
      {/* The return field outside, drawn sparsely: spread out means weaker. */}
      {loopReturnField(reversed).map((symbol) => (
        <Symbol key={`out-${symbol.x}-${symbol.y}`} {...symbol} copy={copy} />
      ))}
      {/* The aperture, filled with one field pointing one way. Not two circles
          round two sides of the wire — the loop has a single field, and every
          part of it contributes to that field in the same direction. */}
      <circle
        cx={centre.x}
        cy={centre.y}
        r={radius - 30}
        fill={FIELD_STROKE}
        fillOpacity={0.09}
        stroke={FIELD_STROKE}
        strokeWidth={2}
        strokeOpacity={0.35}
        strokeDasharray="14 12"
      />
      {loopInteriorField(reversed).map((symbol) => (
        <Symbol key={`in-${symbol.x}-${symbol.y}`} {...symbol} copy={copy} />
      ))}
      {loopCurrentArrows(reversed).map((arrow) => (
        <Head key={`i-${arrow.x}-${arrow.y}`} {...arrow} colour={CURRENT_STROKE} scale={1.25} />
      ))}
    </>
  );
}

function SolenoidOverlay({ reversed, copy }: { reversed: boolean; copy: FigureCopy }) {
  const { axisY, leftX, rightX } = SOLENOID;
  const poles = solenoidPoles(reversed);
  return (
    <>
      {/* Outside: few lines, spread wide and curving right around the coil —
          the same field, much weaker, in the shape a bar magnet makes. */}
      {solenoidExteriorLines(reversed).map((line) => (
        <g key={line.d}>
          <path d={line.d} fill="none" stroke={FIELD_STROKE} strokeWidth={4} strokeOpacity={0.55} />
          {line.arrows.map((arrow) => (
            <Head key={`${arrow.x}-${arrow.y}`} {...arrow} scale={0.85} />
          ))}
        </g>
      ))}
      {/* Inside: many lines, straight, parallel and close together. */}
      {solenoidInteriorLines(reversed).map((line) => (
        <g key={line.d}>
          <path d={line.d} fill="none" stroke={FIELD_STROKE} strokeWidth={5} />
          {line.arrows.map((arrow) => (
            <Head key={`${arrow.x}-${arrow.y}`} {...arrow} />
          ))}
        </g>
      ))}
      {/* Pole letters, drawn rather than baked in, so they swap with the
          current and read correctly in either language. */}
      {(
        [
          [leftX - 78, poles.left],
          [rightX + 78, poles.right],
        ] as const
      ).map(([px, pole]) => (
        <g key={pole + px}>
          <circle
            cx={px}
            cy={axisY}
            r={44}
            fill="#052e26"
            fillOpacity={0.75}
            stroke={pole === "north" ? "#fb7185" : "#7dd3fc"}
            strokeWidth={4}
          />
          <PoleLabel
            x={px}
            y={axisY + 19}
            pole={pole}
            copy={copy}
            fontSize={52}
            fill={pole === "north" ? "#fb7185" : "#7dd3fc"}
          />
        </g>
      ))}
    </>
  );
}

export function CurrentFieldPatterns({
  block,
  lang,
}: {
  block: CurrentFieldPatternsBlock;
  lang?: string;
}) {
  const [shape, setShape] = useState(block.conductors[0]?.id ?? "straight");
  const [reversed, setReversed] = useState(false);
  const copy = figureCopy(lang);
  const active: ConductorPattern | undefined =
    block.conductors.find((c) => c.id === shape) ?? block.conductors[0];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2.5 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.conductors.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={shape === c.id}
            onClick={() => setShape(c.id)}
            className={conceptButtonClass(shape === c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {active && (
        <ApparatusOverlayFigure
          src={active.image.src}
          alt={active.image.alt}
          aspect={CH7_ART_ASPECT}
          caption={active.image.caption}
          // Switching conductor swaps the picture under a learner who is
          // actively comparing them; a lazy load would blank the figure for a
          // moment each time. Three files, well under 150 kB together.
          priority
          overlay={{
            width: CH7_ART.width,
            height: CH7_ART.height,
            label: active.name,
            children: (
              <>
                {active.id === "straight" && <StraightWireOverlay reversed={reversed} />}
                {active.id === "loop" && <LoopOverlay reversed={reversed} copy={copy} />}
                {active.id === "solenoid" && <SolenoidOverlay reversed={reversed} copy={copy} />}
              </>
            ),
          }}
        />
      )}

      {/* What the two overlay colours mean. Two words, in the reader's own
          language, so the picture needs no baked-in key. */}
      <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 p-0 text-[11.5px] text-muted-foreground">
        {[
          [CURRENT_STROKE, copy.currentKey],
          [FIELD_STROKE, copy.fieldKey],
        ].map(([colour, label]) => (
          <li key={label} className="flex list-none items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-5 rounded-full"
              style={{ backgroundColor: colour }}
            />
            {label}
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-pressed={reversed}
        onClick={() => setReversed((v) => !v)}
        className={conceptButtonClass(reversed, "mt-2 w-full sm:w-auto")}
      >
        ⇄ {block.keyPoint.split(".")[0]}
      </button>

      <div className="mt-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
          {block.gripRule.title}
        </p>
        <ol className="mt-1 flex list-decimal flex-col gap-0.5 pl-4">
          {block.gripRule.steps.map((s) => (
            <li key={s} className="text-[12.5px] leading-relaxed text-foreground">
              {s}
            </li>
          ))}
        </ol>
      </div>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {active && (
          <>
            <b className="text-primary">{active.name}</b> — <b>{block.patternLabel}</b>{" "}
            {active.pattern} <b>{block.directionLabel}</b> {active.direction}
          </>
        )}
      </p>

      <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{block.keyPoint}</p>
    </div>
  );
}
