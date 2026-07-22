import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import layer1 from "@/assets/hero landing/layer 1.png";
import layer2 from "@/assets/hero landing/layer 2.png";
import layer3 from "@/assets/hero landing/layer 3.png";
import layer4 from "@/assets/hero landing/layer 4.png";
import layer5 from "@/assets/hero landing/layer 5.png";

type Tier = "mobile" | "tablet" | "desktop";

type LayerConfig = {
  key: string;
  asset: string;
  zIndex: number;
  /** width relative to viewport, per tier */
  widthVw: Record<Tier, number>;
  /** bottom offset (vh) that positions the layer, per tier */
  bottomVh: Record<Tier, number>;
  /** idle horizontal drift in px */
  driftX: number;
  /** seconds for one full drift cycle */
  duration: number;
};

/**
 * Clean, low, elegant five-layer papercraft horizon. Each layer is rendered
 * as an <img> anchored to the bottom of the hero. Width controls scale;
 * heights stay auto so the artwork is never stretched. Kept intentionally
 * simple after an earlier oversized/blurred implementation.
 */
const LAYERS: LayerConfig[] = [
  {
    key: "layer-5",
    asset: layer5,
    zIndex: 10,
    widthVw: { desktop: 106, tablet: 110, mobile: 118 },
    bottomVh: { desktop: 6, tablet: 5, mobile: 4 },
    driftX: 2,
    duration: 150,
  },
  {
    key: "layer-4",
    asset: layer4,
    zIndex: 11,
    widthVw: { desktop: 107, tablet: 111, mobile: 120 },
    bottomVh: { desktop: 4.5, tablet: 3.75, mobile: 3 },
    driftX: -2,
    duration: 130,
  },
  {
    key: "layer-3",
    asset: layer3,
    zIndex: 12,
    widthVw: { desktop: 108, tablet: 112, mobile: 122 },
    bottomVh: { desktop: 3, tablet: 2.5, mobile: 2 },
    driftX: 3,
    duration: 115,
  },
  {
    key: "layer-2",
    asset: layer2,
    zIndex: 13,
    widthVw: { desktop: 109, tablet: 113, mobile: 124 },
    bottomVh: { desktop: 1.5, tablet: 1.25, mobile: 1 },
    driftX: -3,
    duration: 100,
  },
  {
    key: "layer-1",
    asset: layer1,
    zIndex: 14,
    widthVw: { desktop: 110, tablet: 114, mobile: 126 },
    bottomVh: { desktop: 0, tablet: 0, mobile: 0 },
    driftX: 4,
    duration: 90,
  },
];

const SHADOW = "drop-shadow(0 -1px 2px rgba(0,0,0,0.18))";

function useViewportTier(): Tier {
  const [tier, setTier] = useState<Tier>("desktop");
  useEffect(() => {
    const mqTablet = window.matchMedia("(max-width: 1023px)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setTier(mqMobile.matches ? "mobile" : mqTablet.matches ? "tablet" : "desktop");
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

function HorizonLayer({
  config,
  tier,
  reduceMotion,
}: {
  config: LayerConfig;
  tier: Tier;
  reduceMotion: boolean;
}) {
  // Disable drift on mobile for a calmer feel + battery.
  const animate =
    reduceMotion || tier === "mobile"
      ? undefined
      : { x: [0, config.driftX, 0] };

  return (
    <motion.img
      src={config.asset}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="absolute pointer-events-none select-none"
      style={{
        left: "50%",
        bottom: `${config.bottomVh[tier]}vh`,
        width: `${config.widthVw[tier]}vw`,
        height: "auto",
        zIndex: config.zIndex,
        transform: "translateX(-50%)",
        transformOrigin: "bottom center",
        filter: SHADOW,
        willChange: animate ? "transform" : undefined,
      }}
      initial={false}
      animate={animate}
      transition={
        animate
          ? {
              duration: config.duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }
          : undefined
      }
    />
  );
}

export function PaperHorizonStack() {
  const tier = useViewportTier();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
      style={{ height: "40vh" }}
    >
      {LAYERS.map((cfg) => (
        <HorizonLayer key={cfg.key} config={cfg} tier={tier} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}
