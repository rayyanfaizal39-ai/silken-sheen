import type {
  CircuitDiagramPart,
  CircuitWorkedExampleSpec,
} from "@/content/form2/science/interactive-types";

/**
 * A small deterministic circuit diagram (inspired by textbook Figures 7.12 /
 * 7.13, redrawn — not traced — with AcadeMY's own symbols) that a standalone
 * concept teaching block, a guided numerical worked example, or a
 * self-practice figure is illustrated on.
 *
 * Deliberately NOT a general-purpose circuit renderer: it draws exactly one
 * series loop or one set of parallel branches, sized to however many
 * resistors `spec.resistors` lists. It lights up whichever `highlight` parts
 * the currently selected step names, so a learner sees where each number in
 * the working came from, not only a formula. When `spec.showMeters` is set,
 * an ammeter sits in the main loop/trunk and a voltmeter branch sits across
 * every resistor — the "how is it actually wired" shape Figures 7.12/7.13
 * specifically teach. `spec.size` ("large" vs the default "compact") is the
 * diagram's own visual-focus footprint: thicker strokes and bigger labels for
 * a diagram that IS the section's picture, not decoration beside one.
 */

type Size = "compact" | "large";

// The established Chapter 7 circuit-line colour — the same sky-blue family
// `CircuitMeterDiagram`'s voltmeter branch already uses — not the low-opacity
// `border` token (too faint against the navy card) and not a solid fill.
const IDLE_STROKE = "stroke-sky-400/70";
const ACTIVE_STROKE = "stroke-primary";
const CURRENT_ARROW = "fill-sky-300";

function isOn(part: CircuitDiagramPart, highlight: CircuitDiagramPart[]) {
  return highlight.includes(part);
}

function strokeWidths(size: Size) {
  return size === "large" ? { idle: 2.2, active: 3.4 } : { idle: 1.6, active: 2.6 };
}
function maxWidthClass(size: Size) {
  return size === "large" ? "max-w-[520px]" : "max-w-[380px]";
}
function fontSizes(size: Size) {
  return size === "large"
    ? { label: "12", meter: "11.5", vm: "10.5" }
    : { label: "9.5", meter: "9.5", vm: "8.5" };
}

/** The unbroken rectangular wire, with gaps left for whatever sits on top of it. */
function gapSegments(from: number, to: number, gaps: [number, number][]): [number, number][] {
  const sorted = [...gaps].sort((a, b) => a[0] - b[0]);
  const segments: [number, number][] = [];
  let cursor = from;
  for (const [gapStart, gapEnd] of sorted) {
    if (gapStart > cursor) segments.push([cursor, gapStart]);
    cursor = Math.max(cursor, gapEnd);
  }
  if (cursor < to) segments.push([cursor, to]);
  return segments;
}

function Resistor({
  x,
  y,
  w,
  h,
  active,
  label,
  labelDy = 24,
  size,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  active: boolean;
  label: string;
  labelDy?: number;
  size: Size;
}) {
  const sw = strokeWidths(size);
  const fs = fontSizes(size);
  return (
    <g>
      {/* Transparent interior — a resistor is an outline, never a filled
          block. The card's own background shows through, so it reads as a
          circuit symbol rather than a pasted rectangle. */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        className={active ? `${ACTIVE_STROKE} fill-primary` : `${IDLE_STROKE} fill-none`}
        fillOpacity={active ? 0.14 : undefined}
        strokeWidth={active ? sw.active : sw.idle}
      />
      <text
        x={x + w / 2}
        y={y + labelDy}
        textAnchor="middle"
        fontSize={fs.label}
        fontWeight="bold"
        className={active ? "fill-primary" : "fill-foreground"}
      >
        {label}
      </text>
    </g>
  );
}

/** A small circle + letter — the ammeter (A) or voltmeter (V) symbol, drawn inline on a wire. */
function MeterCircle({
  x,
  y,
  letter,
  active,
  size,
  small = false,
}: {
  x: number;
  y: number;
  letter: "A" | "V";
  active: boolean;
  size: Size;
  small?: boolean;
}) {
  const sw = strokeWidths(size);
  const fs = fontSizes(size);
  const r = (size === "large" ? 12 : 10) - (small ? 2 : 0);
  return (
    <g>
      {/* Same transparent-interior rule as the resistor — a meter is a ring
          with a letter in it, never a solid badge. */}
      <circle
        cx={x}
        cy={y}
        r={r}
        className={active ? `${ACTIVE_STROKE} fill-primary` : `${IDLE_STROKE} fill-none`}
        fillOpacity={active ? 0.14 : undefined}
        strokeWidth={active ? sw.active : sw.idle}
      />
      <text
        x={x}
        y={y + (small ? 3 : 3.6)}
        textAnchor="middle"
        fontSize={small ? fs.vm : fs.meter}
        fontWeight="bold"
        className={active ? "fill-primary" : "fill-foreground"}
      >
        {letter}
      </text>
    </g>
  );
}

/** Long line + short line: the standard dry-cell / source symbol. */
function CellSource({
  cx,
  cy,
  vertical,
  active,
  label,
  size,
}: {
  cx: number;
  cy: number;
  vertical: boolean;
  active: boolean;
  label: string;
  size: Size;
}) {
  const sw = strokeWidths(size);
  const fs = fontSizes(size);
  const cls = active ? ACTIVE_STROKE : IDLE_STROKE;
  const width = active ? sw.active : sw.idle;
  return (
    <g className={cls} strokeWidth={width} strokeLinecap="round">
      {vertical ? (
        <>
          {/* Two vertical plates (long=thin, short=thick), offset along the
              wire's own x-axis, for a cell sitting in a HORIZONTAL wire —
              the plates cross the wire the way a real terminal does. */}
          <line x1={cx - 4} y1={cy - 9} x2={cx - 4} y2={cy + 9} />
          <line x1={cx + 4} y1={cy - 5} x2={cx + 4} y2={cy + 5} strokeWidth={width + 2} />
          {/* Below the symbol, centred — clear of the wire line that runs
              through cy, so the label never sits on top of it. */}
          <text
            x={cx}
            y={cy + 20}
            textAnchor="middle"
            fontSize={fs.label}
            fontWeight="bold"
            className={`stroke-none ${active ? "fill-primary" : "fill-foreground"}`}
          >
            {label}
          </text>
        </>
      ) : (
        <>
          {/* Two horizontal plates, offset along the wire's own y-axis, for
              a cell sitting in a VERTICAL trunk. */}
          <line x1={cx - 9} y1={cy - 4} x2={cx + 9} y2={cy - 4} />
          <line x1={cx - 5} y1={cy + 4} x2={cx + 5} y2={cy + 4} strokeWidth={width + 2} />
          <text
            x={cx}
            y={cy - 14}
            textAnchor="middle"
            fontSize={fs.label}
            fontWeight="bold"
            className={`stroke-none ${active ? "fill-primary" : "fill-foreground"}`}
          >
            {label}
          </text>
        </>
      )}
    </g>
  );
}

/** A voltmeter branch: a small loop rising off the wire, bridging across one component. */
function VoltmeterLoop({
  left,
  right,
  wireY,
  loopY,
  active,
  size,
}: {
  left: number;
  right: number;
  wireY: number;
  loopY: number;
  active: boolean;
  size: Size;
}) {
  const sw = strokeWidths(size);
  const cx = (left + right) / 2;
  return (
    <g>
      <path
        d={`M${left},${wireY} L${left},${loopY} L${right},${loopY} L${right},${wireY}`}
        fill="none"
        className={active ? ACTIVE_STROKE : IDLE_STROKE}
        strokeWidth={active ? sw.active - 0.4 : sw.idle - 0.3}
      />
      <MeterCircle x={cx} y={loopY} letter="V" active={active} size={size} small />
    </g>
  );
}

/**
 * A small, restrained current-direction marker — an arrowhead plus its own
 * label (I / I₁ / I₂). Points right by default; `rotate={90}` points it down,
 * for the vertical trunk of a parallel diagram.
 */
function CurrentArrow({
  x,
  y,
  label,
  size,
  rotate = 0,
  labelOffset,
  dim = false,
}: {
  x: number;
  y: number;
  label: string;
  size: Size;
  rotate?: number;
  /** Where the label sits relative to the arrow, as its own [dx, dy]. Defaults to just above a rightward arrow. */
  labelOffset?: [number, number];
  /**
   * Recede when a non-current property is emphasised elsewhere in the same
   * figure (the comparison's property selector) — current stays drawn (the
   * relationship it labels is still true), it just stops being the loudest
   * thing on the picture.
   */
  dim?: boolean;
}) {
  const fs = fontSizes(size);
  const [ldx, ldy] = labelOffset ?? [0, -7];
  return (
    <g>
      <path
        d={`M${x - 4},${y - 4} L${x + 5},${y} L${x - 4},${y + 4} Z`}
        className={dim ? "fill-sky-400/25" : CURRENT_ARROW}
        transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      />
      <text
        x={x + ldx}
        y={y + ldy}
        textAnchor="middle"
        fontSize={fs.vm}
        fontWeight="bold"
        className={dim ? "fill-sky-400/40" : "fill-sky-200"}
      >
        {label}
      </text>
    </g>
  );
}

const RES_W = 34;
const RES_H = 16;

function SeriesDiagram({
  spec,
  highlight,
  dimArrows,
}: {
  spec: CircuitWorkedExampleSpec;
  highlight: CircuitDiagramPart[];
  dimArrows: boolean;
}) {
  const size: Size = spec.size ?? "compact";
  const showMeters = spec.showMeters ?? false;
  const sw = strokeWidths(size);
  const gap = size === "large" ? 82 : 72;
  const firstCx = showMeters ? (size === "large" ? 108 : 100) : size === "large" ? 84 : 78;
  const centers = spec.resistors.map((_, i) => firstCx + i * gap);
  const yTop = showMeters ? 52 : 26;
  const yBottom = yTop + 50;
  const xLeft = 20;
  const xRight = centers[centers.length - 1] + (size === "large" ? 58 : 52);
  const width = xRight + 20;
  const height = showMeters ? yBottom + 40 : yBottom + 30;
  const ammeterX = 50;
  const vmLoopY = yTop - 26;

  const loopOn = isOn("loop", highlight) || isOn("source", highlight);
  const loopCls = loopOn ? ACTIVE_STROKE : IDLE_STROKE;
  const loopWidth = loopOn ? sw.active : sw.idle;

  const topGaps: [number, number][] = centers.map((cx) => [cx - RES_W / 2, cx + RES_W / 2]);
  if (showMeters) topGaps.push([ammeterX - 11, ammeterX + 11]);
  const topSegments = gapSegments(xLeft, xRight, topGaps);

  const sourceCx = (xLeft + xRight) / 2;
  const bottomSegments = gapSegments(xLeft, xRight, [[sourceCx - 5, sourceCx + 5]]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`mx-auto h-auto w-full ${maxWidthClass(size)}`}
      role="img"
      aria-label={spec.kind}
    >
      {topSegments.map(([a, b]) => (
        <line
          key={`top-${a}`}
          x1={a}
          y1={yTop}
          x2={b}
          y2={yTop}
          strokeWidth={loopWidth}
          className={loopCls}
        />
      ))}
      {bottomSegments.map(([a, b]) => (
        <line
          key={`bottom-${a}`}
          x1={a}
          y1={yBottom}
          x2={b}
          y2={yBottom}
          strokeWidth={loopWidth}
          className={loopCls}
        />
      ))}
      <line
        x1={xRight}
        y1={yTop}
        x2={xRight}
        y2={yBottom}
        strokeWidth={loopWidth}
        className={loopCls}
      />
      <line
        x1={xLeft}
        y1={yTop}
        x2={xLeft}
        y2={yBottom}
        strokeWidth={loopWidth}
        className={loopCls}
      />

      {showMeters && <MeterCircle x={ammeterX} y={yTop} letter="A" active={loopOn} size={size} />}

      {/* One restrained current arrow on the entry wire — "I →", a single
          continuous path, not a marker at every segment. */}
      <CurrentArrow x={xLeft + 8} y={yTop} label="I" size={size} dim={dimArrows} />

      {spec.resistors.map((r, i) => {
        const cx = centers[i];
        const on = isOn(r.id, highlight);
        return (
          <g key={r.id}>
            <Resistor
              x={cx - RES_W / 2}
              y={yTop - RES_H / 2}
              w={RES_W}
              h={RES_H}
              active={on}
              label={r.label}
              labelDy={28}
              size={size}
            />
            {showMeters && (
              <VoltmeterLoop
                left={cx - RES_W / 2}
                right={cx + RES_W / 2}
                wireY={yTop}
                loopY={vmLoopY}
                active={on}
                size={size}
              />
            )}
          </g>
        );
      })}

      <CellSource
        cx={sourceCx}
        cy={yBottom}
        vertical
        active={isOn("source", highlight)}
        label={spec.supplyLabel}
        size={size}
      />
    </svg>
  );
}

function ParallelDiagram({
  spec,
  highlight,
  dimArrows,
}: {
  spec: CircuitWorkedExampleSpec;
  highlight: CircuitDiagramPart[];
  dimArrows: boolean;
}) {
  const size: Size = spec.size ?? "compact";
  const showMeters = spec.showMeters ?? false;
  const sw = strokeWidths(size);
  const [r1, r2] = spec.resistors;
  const xLeft = 20;
  const xRight = size === "large" ? 230 : 200;
  const yTop = 30;
  const yBottom = 100;
  const branchCx = (xLeft + xRight) / 2;
  const vmTopY = yTop - 24;
  const vmBottomY = yBottom + 24;
  // Source sits nearer the top junction, the ammeter nearer the bottom one —
  // spread apart on the trunk so the two symbols never overlap.
  const sourceY = yTop + 22;
  const ammeterY = yBottom - 15;
  // Branch-current markers sit well clear of both the source (near xLeft) and
  // the resistor itself, so "I₁"/"I₂" never crowd the terminal the way a
  // marker right beside the left junction used to.
  const branchArrowX = xLeft + 55;
  const height = vmBottomY + 20;
  const topArrowMargin = 22;

  const sourceOn = isOn("source", highlight);
  const branch1On = isOn(r1?.id ?? "r1", highlight);
  const branch2On = isOn(r2?.id ?? "r2", highlight);
  const trunkCls = sourceOn ? ACTIVE_STROKE : IDLE_STROKE;
  const trunkWidth = sourceOn ? sw.active : sw.idle;
  const b1Cls = branch1On ? ACTIVE_STROKE : IDLE_STROKE;
  const b2Cls = branch2On ? ACTIVE_STROKE : IDLE_STROKE;

  const trunkGaps: [number, number][] = [[sourceY - 5, sourceY + 5]];
  if (showMeters) trunkGaps.push([ammeterY - 11, ammeterY + 11]);
  const trunkSegments = gapSegments(yTop, yBottom, trunkGaps);

  const topGaps: [number, number][] = [[branchCx - RES_W / 2, branchCx + RES_W / 2]];
  const bottomGaps: [number, number][] = [[branchCx - RES_W / 2, branchCx + RES_W / 2]];
  const topSegments = gapSegments(xLeft, xRight, topGaps);
  const bottomSegments = gapSegments(xLeft, xRight, bottomGaps);

  return (
    <svg
      viewBox={`0 0 ${xRight + 20} ${height}`}
      className={`mx-auto h-auto w-full ${maxWidthClass(size)}`}
      role="img"
      aria-label={spec.kind}
    >
      {trunkSegments.map(([a, b]) => (
        <line
          key={`trunk-l-${a}`}
          x1={xLeft}
          y1={a}
          x2={xLeft}
          y2={b}
          strokeWidth={trunkWidth}
          className={trunkCls}
        />
      ))}
      <line
        x1={xRight}
        y1={yTop}
        x2={xRight}
        y2={yBottom}
        strokeWidth={trunkWidth}
        className={trunkCls}
      />
      {/* The main current I, entering above the top-left junction — offset
          right of the source's own column (not stacked above it) and given
          extra clearance, so it never reads as pointing at the source. */}
      <CurrentArrow
        x={xLeft + 12}
        y={yTop - topArrowMargin}
        label="I"
        size={size}
        rotate={90}
        dim={dimArrows}
      />
      <CellSource
        cx={xLeft}
        cy={sourceY}
        vertical={false}
        active={sourceOn}
        label={spec.supplyLabel}
        size={size}
      />
      {showMeters && (
        <MeterCircle x={xLeft} y={ammeterY} letter="A" active={sourceOn} size={size} />
      )}
      {/* I₁ / I₂, well along their own branches — never beside the source. */}
      <CurrentArrow x={branchArrowX} y={yTop} label="I₁" size={size} dim={dimArrows} />
      <CurrentArrow
        x={branchArrowX}
        y={yBottom}
        label="I₂"
        size={size}
        labelOffset={[0, 12]}
        dim={dimArrows}
      />

      {topSegments.map(([a, b]) => (
        <line
          key={`top-${a}`}
          x1={a}
          y1={yTop}
          x2={b}
          y2={yTop}
          strokeWidth={branch1On ? sw.active : sw.idle}
          className={b1Cls}
        />
      ))}
      {r1 && (
        <>
          <Resistor
            x={branchCx - RES_W / 2}
            y={yTop - RES_H / 2}
            w={RES_W}
            h={RES_H}
            active={branch1On}
            label={r1.label}
            labelDy={28}
            size={size}
          />
          {showMeters && (
            <VoltmeterLoop
              left={branchCx - RES_W / 2}
              right={branchCx + RES_W / 2}
              wireY={yTop}
              loopY={vmTopY}
              active={branch1On}
              size={size}
            />
          )}
        </>
      )}

      {bottomSegments.map(([a, b]) => (
        <line
          key={`bottom-${a}`}
          x1={a}
          y1={yBottom}
          x2={b}
          y2={yBottom}
          strokeWidth={branch2On ? sw.active : sw.idle}
          className={b2Cls}
        />
      ))}
      {r2 && (
        <>
          <Resistor
            x={branchCx - RES_W / 2}
            y={yBottom - RES_H / 2}
            w={RES_W}
            h={RES_H}
            active={branch2On}
            label={r2.label}
            labelDy={-14}
            size={size}
          />
          {showMeters && (
            <VoltmeterLoop
              left={branchCx - RES_W / 2}
              right={branchCx + RES_W / 2}
              wireY={yBottom}
              loopY={vmBottomY}
              active={branch2On}
              size={size}
            />
          )}
        </>
      )}

      {/* junction nodes — blue, matching the wire family, never the faint idle-border tone */}
      <circle
        cx={xLeft}
        cy={yTop}
        r={3.2}
        className={branch1On ? "fill-primary" : "fill-sky-400/70"}
      />
      <circle
        cx={xLeft}
        cy={yBottom}
        r={3.2}
        className={branch2On ? "fill-primary" : "fill-sky-400/70"}
      />
      <circle
        cx={xRight}
        cy={yTop}
        r={3.2}
        className={branch1On ? "fill-primary" : "fill-sky-400/70"}
      />
      <circle
        cx={xRight}
        cy={yBottom}
        r={3.2}
        className={branch2On ? "fill-primary" : "fill-sky-400/70"}
      />
    </svg>
  );
}

export function CircuitWorkedDiagram({
  spec,
  highlight,
  dimArrows = false,
}: {
  spec: CircuitWorkedExampleSpec;
  highlight: CircuitDiagramPart[];
  /**
   * Recede the current-direction markers (I / I₁ / I₂) without hiding them —
   * for the Series-vs-Parallel comparator, when Voltage or Resistance (not
   * Current) is the selected property. Every other caller leaves this unset,
   * so arrows stay at their normal brightness everywhere else.
   */
  dimArrows?: boolean;
}) {
  return spec.kind === "series" ? (
    <SeriesDiagram spec={spec} highlight={highlight} dimArrows={dimArrows} />
  ) : (
    <ParallelDiagram spec={spec} highlight={highlight} dimArrows={dimArrows} />
  );
}
