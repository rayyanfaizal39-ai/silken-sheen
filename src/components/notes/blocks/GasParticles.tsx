import { useEffect, useRef, useState } from "react";
import type { GasParticlesBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Gas pressure from the kinetic model.
 *
 * The particle count is fixed by the block data and every view renders exactly
 * that many particles. Changing how many dots are drawn when only the volume or
 * the temperature changes would teach that compressing a gas creates particles,
 * so the count is deliberately not a per-view value.
 *
 * What each view changes:
 *   compressed -- the right wall moves in. Particle speed is unchanged, because
 *                 the temperature is unchanged; the smaller box simply means the
 *                 particles reach a wall sooner, which is the reason the pressure
 *                 rises.
 *   heated     -- the box is left alone and the particles move faster, so they
 *                 hit the walls harder and more often.
 *
 * Particles move in their own direction and bounce off the walls. The starting
 * layout and directions come from a seeded generator, so the first frame is
 * identical on every mount and QA screenshots and tests stay stable.
 */

type StateId = "normal" | "compressed" | "heated";

const BOX = { x: 60, y: 30, w: 200, h: 110 } as const;
/** How far the right wall moves in when compressed. */
const COMPRESSED_W = 120;
const R = 3.2;
/** Diagram units per second. Compressing does not change the temperature. */
const SPEED: Record<StateId, number> = { normal: 20, compressed: 20, heated: 34 };
const SEED = 20250831;

type Particle = { x: number; y: number; vx: number; vy: number };

/** mulberry32 — small, seeded, and well mixed enough that no two draws correlate. */
function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic starting state.
 *
 * The previous version derived both coordinates from `i` through a modulus that
 * never wrapped at these particle counts, so x and y were each linear in `i` and
 * every particle landed on one straight diagonal.
 */
export function seedParticles(count: number, width: number, speed: number): Particle[] {
  const next = rng(SEED);
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = next() * Math.PI * 2;
    out.push({
      x: BOX.x + R + next() * (width - 2 * R),
      y: BOX.y + R + next() * (BOX.h - 2 * R),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });
  }
  return out;
}

/** One step of straight-line travel with elastic wall bounces. */
export function stepParticles(particles: Particle[], dt: number, width: number) {
  const minX = BOX.x + R;
  const maxX = BOX.x + width - R;
  const minY = BOX.y + R;
  const maxY = BOX.y + BOX.h - R;
  for (const p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.x < minX) { p.x = minX; p.vx = Math.abs(p.vx); }
    if (p.x > maxX) { p.x = maxX; p.vx = -Math.abs(p.vx); }
    if (p.y < minY) { p.y = minY; p.vy = Math.abs(p.vy); }
    if (p.y > maxY) { p.y = maxY; p.vy = -Math.abs(p.vy); }
  }
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
}

export function GasParticles({ block, lang }: { block: GasParticlesBlock; lang?: string }) {
  const [view, setView] = useState<StateId>((block.states[0]?.id as StateId) ?? "normal");
  const copy = figureCopy(lang);

  const state = block.states.find((s) => s.id === view) ?? block.states[0];
  const compressed = view === "compressed";
  const heated = view === "heated";
  const width = compressed ? COMPRESSED_W : BOX.w;
  const speed = SPEED[view] ?? SPEED.normal;

  const particlesRef = useRef<Particle[] | undefined>(undefined);
  if (!particlesRef.current) particlesRef.current = seedParticles(block.particleCount, BOX.w, SPEED.normal);
  const particles = particlesRef.current;
  const [, setFrame] = useState(0);

  // Rescale to the new temperature and pull anything the piston swept past back
  // inside, keeping every particle's direction.
  useEffect(() => {
    const maxX = BOX.x + width - R;
    for (const p of particles) {
      const current = Math.hypot(p.vx, p.vy) || 1;
      p.vx = (p.vx / current) * speed;
      p.vy = (p.vy / current) * speed;
      if (p.x > maxX) p.x = maxX;
    }
    setFrame((f) => f + 1);
  }, [particles, speed, width]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      // Clamp so a backgrounded tab does not teleport particles through a wall.
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      stepParticles(particles, dt, width);
      setFrame((f) => f + 1);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [particles, width]);

  /** Streaks trail behind the particle, and are longer when it is moving faster. */
  const streak = 0.28;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.states.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={view === s.id}
            onClick={() => setView(s.id as StateId)}
            className={conceptButtonClass(view === s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 170"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={state?.label ?? block.title}
          data-view={view}
          data-particle-count={block.particleCount}
        >
          {/* container: the right wall is the only thing that moves */}
          <rect
            x={BOX.x}
            y={BOX.y}
            width={width}
            height={BOX.h}
            className={heated ? "fill-rose-400/10 stroke-rose-300/70" : "fill-primary/5 stroke-primary/60"}
            strokeWidth="2.5"
          />

          {/* piston arrow, only when compressing */}
          {compressed && (
            <g className="text-amber-300">
              <line x1={BOX.x + BOX.w + 12} y1={BOX.y + BOX.h / 2} x2={BOX.x + width + 8} y2={BOX.y + BOX.h / 2} stroke="currentColor" strokeWidth="3" />
              <path d="M5,-5 L-3,0 L5,5 Z" transform={`translate(${BOX.x + width + 8} ${BOX.y + BOX.h / 2})`} fill="currentColor" />
            </g>
          )}

          {/* heat marks, only when heating */}
          {heated && (
            <g className="stroke-rose-300" strokeWidth="2">
              {[100, 140, 180, 220].map((x) => (
                <path key={x} d={`M${x},152 q6,-8 0,-16 q-6,-8 0,-16`} fill="none" />
              ))}
            </g>
          )}

          {/* the particles -- same number in every view */}
          {particles.map((p, i) => (
            <g key={i} data-particle={i}>
              <line
                x1={p.x - p.vx * streak}
                y1={p.y - p.vy * streak}
                x2={p.x}
                y2={p.y}
                className={heated ? "stroke-rose-300/70" : "stroke-sky-300/60"}
                strokeWidth="1.4"
              />
              <circle cx={p.x} cy={p.y} r={R} className={heated ? "fill-rose-300" : "fill-sky-300"} />
            </g>
          ))}
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {state ? (
          <>
            <b className="text-primary">{state.label}</b> — {state.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
