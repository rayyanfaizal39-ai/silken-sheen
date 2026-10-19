import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FarRealm,
  GatewayLight,
  GatewayRunes,
  GatewayStone,
  NearFloor,
  NearLanterns,
  Tree,
} from "./art";
import { createMotes, createSky, createVortex, type Renderer, type View } from "./renderers";
import {
  CALM_FADE_MS,
  CALM_HOLD_MS,
  DEPTH,
  GATEWAY_MS,
  SCENE,
  arrival,
  cameraZ,
  gateGlow,
  layerScale,
  nightfall,
  passOpacity,
  phaseAt,
  sceneUnit,
  smoothstep,
  type GatewayPhase,
} from "./timeline";
import "./celestial-gateway.css";

/** The moment a still frame shows: gateway lit and vortex open, camera at rest. */
const STILL_MS = 2700;

// Server rendering has no layout; the browser runs the camera before first paint.
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const ORBITS = [
  { size: 700, tilt: -22, lean: 72, rate: 1 },
  { size: 610, tilt: 28, lean: 66, rate: -0.8 },
  { size: 580, tilt: 0, lean: 0, rate: 0.25 },
];

/**
 * The Cosmic Companion's Celestial Gateway: a dark enchanted forest whose gateway awakens, opens,
 * and carries the camera through into the deep navy where the 12-question journey begins.
 */
export function CelestialGateway({
  studioUrl,
  navigate,
}: {
  studioUrl: string;
  navigate: (url: string) => void;
}) {
  const [phase, setPhase] = useState<GatewayPhase>("arrival");
  const [still, setStill] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [resting, setResting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const root = useRef<HTMLElement>(null);
  const sky = useRef<HTMLCanvasElement>(null);
  const vortex = useRef<HTMLCanvasElement>(null);
  const motes = useRef<HTMLCanvasElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const gateLight = useRef<HTMLDivElement>(null);
  const orbits = useRef<(HTMLDivElement | null)[]>([]);
  const far = useRef<HTMLDivElement>(null);
  const gate = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const mist = useRef<HTMLDivElement>(null);
  const floor = useRef<HTMLDivElement>(null);
  const lanterns = useRef<HTMLDivElement>(null);
  const trees = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);

  // The sequence: phases for the markup, then the same-tab hand-off once the screen is navy.
  useEffect(() => {
    setMounted(true);
    const calm = prefersReducedMotion();
    setStill(calm);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (ms: number, run: () => void) => timers.push(setTimeout(run, ms));
    const leave = () => {
      if (veil.current) veil.current.style.opacity = "1";
      navigate(studioUrl);
    };
    if (calm) {
      setPhase("opening");
      later(CALM_HOLD_MS, () => setLeaving(true));
      later(CALM_HOLD_MS + CALM_FADE_MS, leave);
    } else {
      later(GATEWAY_MS.awakening, () => setPhase("awakening"));
      later(GATEWAY_MS.opening, () => setPhase("opening"));
      later(GATEWAY_MS.entering, () => setPhase("entering"));
      later(GATEWAY_MS.end, leave);
    }
    // Back from the Studio restores this page from cache: rest on the lit gateway, never re-enter.
    const onShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      timers.forEach(clearTimeout);
      setLeaving(false);
      setPhase("opening");
      setResting(true);
    };
    window.addEventListener("pageshow", onShow);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("pageshow", onShow);
    };
  }, [navigate, studioUrl]);

  // The camera: one clock moves every layer, canvas and light.
  useBrowserLayoutEffect(() => {
    const scene = root.current;
    if (!scene) return;
    const calm = resting || prefersReducedMotion();
    const renderers = [sky, vortex, motes]
      .map((ref, i) => ref.current && [createSky, createVortex, createMotes][i](ref.current))
      .filter((r): r is Renderer => !!r);
    const layers: [HTMLDivElement | null, number, (s: number) => number][] = [
      [far.current, DEPTH.far, () => 1],
      [gate.current, DEPTH.gate, (s) => 1 - smoothstep(4, 9, s)],
      [mist.current, DEPTH.mist, (s) => 0.9 * passOpacity(s)],
      [floor.current, DEPTH.floor, passOpacity],
      [lanterns.current, DEPTH.lanterns, passOpacity],
      [trees.current, DEPTH.trees, passOpacity],
      [foreground.current, DEPTH.foreground, passOpacity],
    ];
    let spin = 0;

    const measure = () => {
      const width = scene.clientWidth || window.innerWidth;
      const height = scene.clientHeight || window.innerHeight;
      const view: View = {
        width,
        height,
        unit: sceneUnit(width, height),
        vx: width / 2,
        vy: height * SCENE.horizon,
      };
      scene.style.setProperty("--cg-u", `${view.unit}px`);
      renderers.forEach((r) => r.resize(view));
    };

    const render = (ms: number, z: number, dt: number) => {
      const lit = gateGlow(ms);
      for (const [el, depth, fade] of layers) {
        if (!el) continue;
        const s = layerScale(depth, z);
        el.style.transform = `scale(${s})`;
        el.style.opacity = `${fade(s)}`;
      }
      if (glow.current) {
        glow.current.style.transform = `scale(${layerScale(DEPTH.gate, z)})`;
        glow.current.style.opacity = `${lit * (1 - nightfall(ms))}`;
      }
      if (gateLight.current) gateLight.current.style.opacity = `${0.06 + 0.94 * lit}`;
      spin += dt * (0.006 + 0.05 * lit);
      ORBITS.forEach((o, i) => {
        const el = orbits.current[i];
        if (!el) return;
        el.style.transform = `translate(-50%, -50%) rotate(${o.tilt}deg) rotateX(${o.lean}deg) rotate(${spin * o.rate}deg)`;
        el.style.opacity = `${0.18 + 0.82 * lit}`;
      });
      renderers.forEach((r) => r.draw(ms, z, dt));
    };

    measure();
    if (calm) {
      scene.style.opacity = "1";
      if (veil.current && resting) veil.current.style.opacity = "0";
      render(STILL_MS, 0, 16);
      const observer = new ResizeObserver(() => {
        measure();
        render(STILL_MS, 0, 16);
      });
      observer.observe(scene);
      return () => observer.disconnect();
    }

    let frame = 0;
    let last = 0;
    const start = performance.now();
    const step = (now: number) => {
      const ms = Math.max(0, now - start);
      const dt = last ? Math.min(now - last, 50) : 16;
      last = now;
      scene.style.opacity = `${arrival(ms)}`;
      if (veil.current) veil.current.style.opacity = `${smoothstep(4050, 4480, ms)}`;
      render(ms, cameraZ(ms), dt);
      if (ms < GATEWAY_MS.end + 300) frame = requestAnimationFrame(step);
    };
    scene.style.opacity = "0";
    frame = requestAnimationFrame(step);
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [resting]);

  return (
    <section
      ref={root}
      className="cg"
      data-phase={phase}
      data-still={still || resting}
      aria-label="Celestial Gateway cinematic transition"
      style={{ "--cg-horizon": `${SCENE.horizon * 100}%` } as React.CSSProperties}
    >
      <canvas ref={sky} className="cg-canvas" aria-hidden="true" />
      <div ref={far} className="cg-layer" aria-hidden="true">
        <FarRealm />
      </div>
      <canvas ref={vortex} className="cg-canvas" aria-hidden="true" />
      <div ref={gate} className="cg-layer" aria-hidden="true">
        <GatewayStone />
        <div ref={gateLight} className="cg-gate-light">
          <GatewayLight />
        </div>
        <GatewayRunes />
        {ORBITS.map((o, i) => (
          <div
            key={i}
            ref={(el) => {
              orbits.current[i] = el;
            }}
            className={`cg-orbit${o.lean ? "" : " cg-orbit--flat"}`}
            style={{ "--cg-orbit": o.size } as React.CSSProperties}
          />
        ))}
      </div>
      <div ref={mist} className="cg-layer" aria-hidden="true">
        <div className="cg-mist" />
        <div className="cg-mist cg-mist--drift" />
      </div>
      <div ref={floor} className="cg-layer" aria-hidden="true">
        <NearFloor />
      </div>
      <div ref={lanterns} className="cg-layer" aria-hidden="true">
        <NearLanterns />
      </div>
      <div ref={glow} className="cg-layer cg-glow" aria-hidden="true" />
      <canvas ref={motes} className="cg-canvas" aria-hidden="true" />
      <div ref={trees} className="cg-layer" aria-hidden="true">
        <Tree side="left" />
        <Tree side="right" />
      </div>
      <div ref={foreground} className="cg-layer cg-foreground" aria-hidden="true">
        <span className="cg-bloom cg-bloom--left" />
        <span className="cg-bloom cg-bloom--right" />
        <span className="cg-ember cg-ember--a" />
        <span className="cg-ember cg-ember--b" />
      </div>
      <div className="cg-vignette" aria-hidden="true" />
      <p className="sr-only" role="status" aria-live="polite">
        {phase === "entering" || leaving
          ? "Traveling through the Celestial Gateway…"
          : "The Celestial Gateway is appearing…"}
      </p>
      {/* Rendered into <body> so the final darkness covers the whole page, navigation included. */}
      {mounted &&
        createPortal(
          <div ref={veil} className="cg-veil" data-leaving={leaving} aria-hidden="true" />,
          document.body,
        )}
    </section>
  );
}
