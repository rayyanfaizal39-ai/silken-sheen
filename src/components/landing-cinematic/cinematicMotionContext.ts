import { createContext, useContext } from "react";

type GsapRuntime = (typeof import("gsap"))["default"];
type ScrollTriggerRuntime = (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];
type LenisRuntime = import("lenis").default;

export type CinematicScrollTrigger = ReturnType<ScrollTriggerRuntime["create"]>;

export interface CinematicMotionRuntime {
  gsap: GsapRuntime;
  ScrollTrigger: ScrollTriggerRuntime;
  getLenis: () => LenisRuntime | null;
  scrollToSection: (target: string) => void;
}

export const CinematicMotionContext = createContext<CinematicMotionRuntime | null>(null);

export function useCinematicMotion() {
  return useContext(CinematicMotionContext);
}
