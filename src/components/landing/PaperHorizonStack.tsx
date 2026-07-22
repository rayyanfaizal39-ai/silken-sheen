import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import layer1 from "@/assets/hero landing/layer 1.png";
import layer2 from "@/assets/hero landing/layer 2.png";
import layer3 from "@/assets/hero landing/layer 3.png";
import layer4 from "@/assets/hero landing/layer 4.png";
import layer5 from "@/assets/hero landing/layer 5.png";

type Tier = "mobile" | "tablet" | "desktop";

type LayerConfig = {
  key: string;
  asset: string;
  /** stacking order — lower = further back. Kept well under the hero content's z-10. */
  zIndex: number;
  /**
   * Fraction of this layer's own canvas, from the top of the opaque
   * silhouette down to the canvas's bottom edge (measured from the PNG's
   * alpha channel — each of the 5 layers has its own canvas size now).
   */
  hillFraction: number;
  /**
   * Fraction of the canvas that's transparent padding *below* the opaque
   * silhouette — none of these five sit exactly flush with their own canvas
   * bottom. Anchoring with `background-position: bottom` would put that
   * padding *inside* the visible area, leaving the silhouette floating with
   * a gap beneath it. The background is shifted down by this fraction so
   * the silhouette itself, not the canvas, touches the wrapper's bottom —
   * see the height/position math in HorizonLayer.
   */
  bottomPadFraction: number;
  /** Wrapper bottom offset, per tier — the literal vertical stagger between layers. */
  bottomVh: Record<Tier, number>;
  /** Wrapper render height, per tier, chosen so bottomVh + heightVh*(hillFraction-bottomPadFraction)*SCALE_Y lands each layer's peak at its intended height. */
  heightVh: Record<Tier, number>;
  /** Starting background-position-x, so adjacent layers' bumps don't repeat in lockstep. */
  phase: string;
  /** idle horizontal drift in px at desktop scale (negative = left, positive = right; mobile halves it, see useLayerMotion) */
  driftX: number;
  /** idle vertical breathing in px at desktop scale */
  breatheY: number;
  /** seconds for one full drift-and-back cycle */
  duration: number;
  /** max mouse-parallax offset in px at desktop scale (tablet *0.6, mobile disabled) */
  parallax: number;
};

/** Restrained vertical enlargement applied to every layer's placement wrapper (never the animated element — see HorizonLayer). */
const SCALE_Y = 1.1;

const LAYERS: LayerConfig[] = [
  {
    key: "layer-5",
    asset: layer5,
    zIndex: 2,
    hillFraction: 0.2599,
    bottomPadFraction: 0.0367,
    bottomVh: { mobile: 3.24, tablet: 3.808, desktop: 4 },
    heightVh: { mobile: 19.79, tablet: 23.27, desktop: 24.44 },
    phase: "10%",
    driftX: 2,
    breatheY: 0.5,
    duration: 150,
    parallax: 1,
  },
  {
    key: "layer-4",
    asset: layer4,
    zIndex: 4,
    hillFraction: 0.4187,
    bottomPadFraction: 0.072,
    bottomVh: { mobile: 2.43, tablet: 2.856, desktop: 3 },
    heightVh: { mobile: 27.61, tablet: 32.46, desktop: 34.09 },
    phase: "55%",
    driftX: -3,
    breatheY: 0.8,
    duration: 125,
    parallax: 2,
  },
  {
    key: "layer-3",
    asset: layer3,
    zIndex: 5,
    hillFraction: 0.432,
    bottomPadFraction: 0.1947,
    bottomVh: { mobile: 1.62, tablet: 1.904, desktop: 2 },
    heightVh: { mobile: 40.34, tablet: 47.42, desktop: 49.80 },
    phase: "42%",
    driftX: 4,
    breatheY: 1,
    duration: 105,
    parallax: 3,
  },
  {
    key: "layer-2",
    asset: layer2,
    zIndex: 7,
    hillFraction: 0.3242,
    bottomPadFraction: 0.0612,
    bottomVh: { mobile: 0.81, tablet: 0.952, desktop: 1 },
    heightVh: { mobile: 35.00, tablet: 41.13, desktop: 43.21 },
    phase: "70%",
    driftX: -5,
    breatheY: 1.2,
    duration: 90,
    parallax: 4,
  },
  {
    key: "layer-1",
    asset: layer1,
    zIndex: 9,
    hillFraction: 0.2927,
    bottomPadFraction: 0.00305,
    bottomVh: { mobile: 0, tablet: 0, desktop: 0 },
    heightVh: { mobile: 24.16, tablet: 28.39, desktop: 29.82 },
    phase: "0%",
    driftX: 6,
    breatheY: 1.5,
    duration: 78,
    parallax: 6,
  },
];

// Dark shadow cast onto whatever sits behind, plus a faint highlight along
// the fold — restrained cardstock depth, not a bevel.
const SHADOW_FILTER =
  "drop-shadow(0 -2px 3px rgba(0,0,0,0.20)) drop-shadow(0 2px 5px rgba(0,0,0,0.12))";

function useViewportTier(): Tier {
  const [tier, setTier] = useState<Tier>("desktop");
  useEffect(() => {
    const mqTablet = window.matchMedia("(max-width: 1023px)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const update = () => setTier(mqMobile.matches ? "mobile" : mqTablet.matches ? "tablet" : "desktop");
    update();
    mqTablet.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqTablet.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);
  return tier;
}

function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}

/** Drives one layer's idle drift + breathing into its own motion values, independent of every other layer. */
function useLayerMotion(config: LayerConfig, tier: Tier, reduceMotion: boolean) {
  const idleX = useMotionValue(0);
  const idleY = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) {
      idleX.set(0);
      idleY.set(0);
      return;
    }
    const scale = tier === "mobile" ? 0.5 : 1;
    const dx = config.driftX * scale;
    const dy = config.breatheY * scale;
    const shared = {
      duration: config.duration,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "mirror" as const,
    };
    const controlsX = animate(idleX, [0, dx, 0], shared);
    const controlsY = animate(idleY, [0, dy, 0], shared);
    return () => {
      controlsX.stop();
      controlsY.stop();
    };
  }, [config.driftX, config.breatheY, config.duration, idleX, idleY, reduceMotion, tier]);

  return { idleX, idleY };
}

function HorizonLayer({
  config,
  tier,
  reduceMotion,
  parallaxEnabled,
  pointerX,
}: {
  config: LayerConfig;
  tier: Tier;
  reduceMotion: boolean;
  parallaxEnabled: boolean;
  pointerX: MotionValue<number>;
}) {
  const { idleX, idleY } = useLayerMotion(config, tier, reduceMotion);

  const parallaxScale = tier === "tablet" ? 0.6 : 1;
  const parallaxRange = parallaxEnabled ? config.parallax * parallaxScale : 0;
  const parallaxX = useTransform(pointerX, [-0.5, 0.5], [-parallaxRange, parallaxRange]);
  const x = useTransform([idleX, parallaxX], (values) => (values as number[]).reduce((a, b) => a + b, 0));

  const heightVh = config.heightVh[tier];
  const bottomPadVh = config.bottomPadFraction * heightVh;

  const fillStyle = {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: `url(${config.asset})`,
    backgroundRepeat: "repeat-x" as const,
    backgroundPosition: `left ${config.phase} bottom -${bottomPadVh}vh`,
    backgroundSize: "auto 100%" as const,
  };

  return (
    // Outer placement wrapper: position, overscan, bottom offset and the
    // vertical "taller" enlargement all live here as a single static
    // transform. Framer Motion never touches this element, so its scaleY
    // can never be clobbered by an animated x/y on the same node.
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        left: "-5%",
        width: "110%",
        bottom: `${config.bottomVh[tier]}vh`,
        height: `${heightVh}vh`,
        zIndex: config.zIndex,
        transformOrigin: "bottom center",
        transform: `scaleY(${SCALE_Y})`,
      }}
    >
      {/* Static shadow caster — never transformed by motion, so its
          drop-shadow filter is painted once instead of every animation
          frame. Sits exactly under the crisp copy, so only its cast shadow
          (offset up/down a couple px) reads as a seam of depth. */}
      <div aria-hidden="true" style={{ ...fillStyle, filter: SHADOW_FILTER }} />
      <motion.div aria-hidden="true" style={{ ...fillStyle, x, y: idleY, willChange: "transform" }} />
    </div>
  );
}

/**
 * The planet sits at a fixed position independent of the horizon — on
 * desktop its bottom edge lands around 50% of the hero's height, far above
 * the horizon itself. A single repeating tile can't bridge that gap: at the
 * height needed to reach the planet, one tile becomes wider than the
 * viewport, so raising a whole layer that high buries the headline under
 * its rising slope. This is a second, non-repeating instance of layer 2's
 * silhouette, sized and positioned only under the visible portion of the
 * planet on the right, so the horizon reads as rising to meet the planet
 * without touching the text side.
 *
 * Sized in vw, not vh: the planet's own box (`w-[Nvw]`) scales with
 * viewport *width*, so this has to as well, or the two drift apart at
 * different aspect ratios (confirmed on an ultrawide screen — at vh-based
 * sizing the peak crept left into the headline).  Desktop only — at
 * tablet/mobile widths the planet sits near the top of the viewport,
 * nowhere near the horizon, so there's nothing sensible to connect.
 */
const PLANET_CONNECTOR = {
  asset: layer2,
  zIndex: 6,
  hillFraction: 0.3242,
  bottomPadFraction: 0.0612,
  heightVw: 115,
  phase: "-14%",
  driftX: 2,
  breatheY: 0.6,
  duration: 140,
  parallax: 3,
};

function PlanetConnector({
  reduceMotion,
  parallaxEnabled,
  pointerX,
}: {
  reduceMotion: boolean;
  parallaxEnabled: boolean;
  pointerX: MotionValue<number>;
}) {
  const idleX = useMotionValue(0);
  const idleY = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) {
      idleX.set(0);
      idleY.set(0);
      return;
    }
    const shared = {
      duration: PLANET_CONNECTOR.duration,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "mirror" as const,
    };
    const cx = animate(idleX, [0, PLANET_CONNECTOR.driftX, 0], shared);
    const cy = animate(idleY, [0, PLANET_CONNECTOR.breatheY, 0], shared);
    return () => {
      cx.stop();
      cy.stop();
    };
  }, [reduceMotion, idleX, idleY]);

  const parallaxRange = parallaxEnabled ? PLANET_CONNECTOR.parallax : 0;
  const parallaxX = useTransform(pointerX, [-0.5, 0.5], [-parallaxRange, parallaxRange]);
  const x = useTransform([idleX, parallaxX], (values) => (values as number[]).reduce((a, b) => a + b, 0));

  const bottomPadVw = PLANET_CONNECTOR.bottomPadFraction * PLANET_CONNECTOR.heightVw;
  const fillStyle = {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: `url(${PLANET_CONNECTOR.asset})`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: `left ${PLANET_CONNECTOR.phase} bottom -${bottomPadVw}vw`,
    backgroundSize: "auto 100%" as const,
  };

  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        left: "-5%",
        width: "110%",
        bottom: 0,
        height: `${PLANET_CONNECTOR.heightVw}vw`,
        zIndex: PLANET_CONNECTOR.zIndex,
      }}
    >
      <div aria-hidden="true" style={{ ...fillStyle, filter: SHADOW_FILTER }} />
      <motion.div aria-hidden="true" style={{ ...fillStyle, x, y: idleY, willChange: "transform" }} />
    </div>
  );
}

/**
 * Five-layer papercraft horizon, anchored to the bottom of the hero.
 * Purely decorative: aria-hidden, pointer-events-none throughout, and every
 * loop is transform/opacity only so the compositor can run it off the main
 * thread.
 */
export function PaperHorizonStack() {
  const reduceMotion = useReducedMotion();
  const tier = useViewportTier();
  const coarsePointer = useCoarsePointer();
  const parallaxEnabled = !reduceMotion && !coarsePointer && tier !== "mobile";

  const pointerXRaw = useMotionValue(0);
  // Springs the raw pointer position before any layer reads it, so all
  // layers share one smoothed, slightly lagging parallax source instead of
  // snapping straight to the cursor.
  const pointerX = useSpring(pointerXRaw, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!parallaxEnabled) return;
    const onMove = (e: PointerEvent) => {
      pointerXRaw.set(e.clientX / window.innerWidth - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallaxEnabled, pointerXRaw]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-visible">
      {/* Ambient light — a static, unfiltered-by-transform wash of the same
          purple used elsewhere in the hero, so the paper reads as lit from
          behind rather than sitting flat against the sky. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          zIndex: 1,
          height: "24svh",
          background:
            "linear-gradient(to top, rgba(168,85,247,0.16), rgba(168,85,247,0.05) 55%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />
      {tier === "desktop" && (
        <PlanetConnector reduceMotion={Boolean(reduceMotion)} parallaxEnabled={parallaxEnabled} pointerX={pointerX} />
      )}
      {LAYERS.map((layer) => (
        <HorizonLayer
          key={layer.key}
          config={layer}
          tier={tier}
          reduceMotion={Boolean(reduceMotion)}
          parallaxEnabled={parallaxEnabled}
          pointerX={pointerX}
        />
      ))}
    </div>
  );
}
