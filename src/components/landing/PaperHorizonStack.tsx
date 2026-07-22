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
  driftX: number;
  duration: number;
};

/**
 * Papercraft horizon. Each PNG already contains its own full-width silhouette
 * with transparent surroundings, so we render each one at exactly 100vw,
 * anchored to bottom:0 with left:0 — no centering translate, no cropping,
 * no forced height. The PNGs stack via z-index only; drift is a few pixels.
 */
const LAYERS: LayerConfig[] = [
  { key: "layer-5", asset: layer5, zIndex: 10, driftX: 2, duration: 150 },
  { key: "layer-4", asset: layer4, zIndex: 11, driftX: -2, duration: 130 },
  { key: "layer-3", asset: layer3, zIndex: 12, driftX: 3, duration: 115 },
  { key: "layer-2", asset: layer2, zIndex: 13, driftX: -3, duration: 100 },
  { key: "layer-1", asset: layer1, zIndex: 14, driftX: 4, duration: 90 },
];

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
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "auto",
        zIndex: config.zIndex,
        transformOrigin: "bottom center",
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
      className="pointer-events-none absolute inset-x-0 bottom-0"
    >
      {LAYERS.map((cfg) => (
        <HorizonLayer key={cfg.key} config={cfg} tier={tier} reduceMotion={reduceMotion} />
      ))}
    </div>
  );
}
