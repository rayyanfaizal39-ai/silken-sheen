import { useEffect, useState, type ReactNode } from "react";
import type { CurrentDirectionBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Electron flow vs conventional current, redrawn as two separate, always-
 * visible horizontal lanes rather than two arrows sharing one conductor.
 *
 * The one-conductor version made a scientifically correct picture hard to
 * read: two opposing arrows on the same line, labels sitting over them, and
 * controls crowding the lower half. Splitting the two directions into their
 * own rows — same terminal positions in both — means a learner compares them
 * by looking up and down rather than by untangling one busy line.
 *
 * Both lanes are ALWAYS on screen. Selecting a mode brightens its own lane
 * and dims (never hides) the other, because the whole point is to keep the
 * contrast visible regardless of which direction is currently selected.
 */

const ROW_VIEWBOX = "0 0 200 44";
const WIRE_Y = 22;
const LEFT_WIRE = 26;
const RIGHT_WIRE = 174;
const TERMINAL_LEFT_X = 12;
const TERMINAL_RIGHT_X = 188;
/** Electron dots travel within this track, wrapping every full cycle so the
 * pattern loops seamlessly — four evenly spaced dots, each covering exactly
 * one quarter of the track per cycle. */
const TRACK_START = 30;
const TRACK_LENGTH = 140;
const DOT_SPACING = TRACK_LENGTH / 4;
const STATIC_DOT_X = [0, 1, 2, 3].map((i) => TRACK_START + i * DOT_SPACING);

function prefersReducedMotion() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

/** A slow 0→1 sawtooth that loops every `periodMs`, off entirely under reduced motion. */
function useLoopingPhase(periodMs: number): number {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setPhase(((now - start) % periodMs) / periodMs);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [periodMs]);
  return phase;
}

/** Small right-pointing chevron, used as a static direction cue between electrons. */
function ChevronRight({ x, y, dim }: { x: number; y: number; dim: boolean }) {
  return (
    <path
      d={`M${x - 4},${y - 4} L${x + 4},${y} L${x - 4},${y + 4}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={dim ? "stroke-sky-400/30" : "stroke-sky-300"}
    />
  );
}

function TerminalGlyph({ x, sign }: { x: number; sign: "−" | "+" }) {
  return (
    <text
      x={x}
      y={WIRE_Y + 5}
      textAnchor="middle"
      fontSize="20"
      fontWeight="bold"
      className="fill-foreground"
    >
      {sign}
    </text>
  );
}

/** Row 1 — electrons drawn as discrete, labelled dots moving negative -> positive. */
function ElectronRow({ dim, phase }: { dim: boolean; phase: number }) {
  return (
    <svg viewBox={ROW_VIEWBOX} className="mx-auto h-auto w-full" role="img" aria-hidden="true">
      <line
        x1={LEFT_WIRE}
        y1={WIRE_Y}
        x2={RIGHT_WIRE}
        y2={WIRE_Y}
        strokeWidth="6"
        strokeLinecap="round"
        className={dim ? "stroke-border/60" : "stroke-sky-400/30"}
      />
      <TerminalGlyph x={TERMINAL_LEFT_X} sign="−" />
      <TerminalGlyph x={TERMINAL_RIGHT_X} sign="+" />

      {/* static direction chevrons between the resting dot positions — the
          direction still reads with no motion at all, e.g. under
          prefers-reduced-motion. */}
      {[0, 1, 2].map((i) => (
        <ChevronRight
          key={i}
          x={(STATIC_DOT_X[i] + STATIC_DOT_X[i + 1]) / 2}
          y={WIRE_Y}
          dim={dim}
        />
      ))}

      {[0, 1, 2, 3].map((i) => {
        const x = TRACK_START + (((i + phase) * DOT_SPACING) % TRACK_LENGTH);
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={WIRE_Y}
              r={dim ? 5 : 7}
              className={dim ? "fill-sky-400/35" : "fill-sky-300"}
            />
            {!dim && i % 2 === 0 && (
              <text
                x={x}
                y={WIRE_Y + 2.6}
                textAnchor="middle"
                fontSize="6.5"
                fontWeight="bold"
                className="fill-sky-950"
              >
                e⁻
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Row 2 — one clean directional arrow, positive -> negative. No particles: conventional
 * current must never look like something is physically moving through the metal. */
function ConventionalRow({ dim, phase }: { dim: boolean; phase: number }) {
  const pulseX = RIGHT_WIRE - phase * (RIGHT_WIRE - LEFT_WIRE);
  const pulseOpacity = Math.sin(phase * Math.PI);

  return (
    <svg viewBox={ROW_VIEWBOX} className="mx-auto h-auto w-full" role="img" aria-hidden="true">
      <line
        x1={LEFT_WIRE}
        y1={WIRE_Y}
        x2={RIGHT_WIRE}
        y2={WIRE_Y}
        strokeWidth="6"
        strokeLinecap="round"
        className={dim ? "stroke-border/60" : "stroke-fuchsia-400/25"}
      />
      <TerminalGlyph x={TERMINAL_LEFT_X} sign="−" />
      <TerminalGlyph x={TERMINAL_RIGHT_X} sign="+" />

      {/* one broad arrow, positive -> negative */}
      <path
        d={`M${RIGHT_WIRE - 6},${WIRE_Y} L${LEFT_WIRE + 14},${WIRE_Y}`}
        strokeWidth={dim ? 3 : 5}
        strokeLinecap="round"
        className={dim ? "stroke-fuchsia-400/35" : "stroke-fuchsia-400"}
      />
      <path
        d={`M${LEFT_WIRE + 22},${WIRE_Y - 8} L${LEFT_WIRE + 8},${WIRE_Y} L${LEFT_WIRE + 22},${WIRE_Y + 8} Z`}
        className={dim ? "fill-fuchsia-400/35" : "fill-fuchsia-400"}
      />

      {/* a single subtle streak, not a particle: an elongated capsule rather than a
          circle, so it can never be mistaken for an electron. */}
      {!dim && (
        <rect
          x={pulseX - 9}
          y={WIRE_Y - 2.5}
          width="18"
          height="5"
          rx="2.5"
          className="fill-fuchsia-100"
          opacity={pulseOpacity * 0.9}
        />
      )}
    </svg>
  );
}

function Lane({
  heading,
  dim,
  children,
  colourClass,
}: {
  heading: string;
  dim: boolean;
  children: ReactNode;
  colourClass: string;
}) {
  return (
    <div
      className={`rounded-xl border p-3 transition-opacity ${
        dim ? "border-border/60 opacity-[0.45]" : "border-primary/30 bg-card/60 opacity-100"
      }`}
    >
      <h4
        className={`font-display mb-1.5 text-center text-[12px] font-bold uppercase tracking-wide ${colourClass}`}
      >
        {heading}
      </h4>
      {children}
    </div>
  );
}

export function CurrentDirectionDiagram({
  block,
  lang,
}: {
  block: CurrentDirectionBlock;
  lang?: string;
}) {
  const [mode, setMode] = useState(block.modes[0]?.id ?? "electron");
  const copy = figureCopy(lang);
  const isElectron = mode === "electron";
  // Only the selected lane drifts — a static lane still reads its direction
  // from the fixed chevrons/arrow, so nothing depends on the motion running.
  // Called unconditionally, before any early return, per the rules of hooks.
  const phase = useLoopingPhase(isElectron ? 2600 : 3400);

  const active = block.modes.find((m) => m.id === mode) ?? block.modes[0];
  const electronMode = block.modes.find((m) => m.id === "electron");
  const conventionalMode = block.modes.find((m) => m.id === "conventional");
  if (!active || !electronMode || !conventionalMode) return null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="flex flex-col gap-2.5">
        <Lane heading={electronMode.label} dim={!isElectron} colourClass="text-sky-400">
          <ElectronRow dim={!isElectron} phase={isElectron ? phase : 0} />
          <div className="mt-1 hidden justify-between px-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground sm:flex">
            <span>{block.negativeTerminalLabel}</span>
            <span>{block.positiveTerminalLabel}</span>
          </div>
          <p className="mt-1 text-center text-[12px] font-semibold text-foreground/90">
            {electronMode.directionSummary}
          </p>
        </Lane>

        <Lane heading={conventionalMode.label} dim={isElectron} colourClass="text-fuchsia-400">
          <ConventionalRow dim={isElectron} phase={!isElectron ? phase : 0} />
          <div className="mt-1 hidden justify-between px-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground sm:flex">
            <span>{block.negativeTerminalLabel}</span>
            <span>{block.positiveTerminalLabel}</span>
          </div>
          <p className="mt-1 text-center text-[12px] font-semibold text-foreground/90">
            {conventionalMode.directionSummary}
          </p>
        </Lane>
      </div>

      <div
        className="mt-2.5 flex flex-wrap justify-center gap-1.5"
        role="group"
        aria-label={copy.controlsLabel}
      >
        {block.modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={m.id === mode}
            aria-label={m.label}
            onClick={() => setMode(m.id)}
            className={conceptButtonClass(m.id === mode)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* The strongest takeaway: both directions, side by side, with nothing
          else competing for attention. */}
      <div className="mt-2.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-center">
        <p className="font-display text-[11.5px] font-bold uppercase tracking-wide text-primary">
          {block.contrastLabel}
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-0.5 text-[12px] font-semibold text-foreground">
          <span>
            {electronMode.label}: <span className="text-sky-400">− → +</span>
          </span>
          <span>
            {conventionalMode.label}: <span className="text-fuchsia-400">+ → −</span>
          </span>
        </div>
      </div>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.5rem] rounded-xl border border-border bg-secondary/30 px-3 py-1.5 text-[12px] leading-relaxed text-foreground"
      >
        <b className={isElectron ? "text-sky-400" : "text-fuchsia-400"}>{active.label}</b> —{" "}
        {active.note}
      </p>

      <p className="mt-1.5 text-center text-[12px] font-semibold text-muted-foreground">
        {block.keyPoint}
      </p>
    </div>
  );
}
