import { useEffect, useRef, type RefObject } from "react";
import { CinematicMotionProvider } from "./cinematicMotion";
import { useCinematicMotion } from "./cinematicMotionContext";
import CinematicNavigation from "./CinematicNavigation";
import HeroScene from "./HeroScene";
import LearningPlanetScene from "./LearningPlanetScene";
import LearningWorldScene from "./LearningWorldScene";
import CikguAiScene from "./CikguAiScene";
import ParentScene from "./ParentScene";
import KssmScene from "./KssmScene";
import FinalCtaScene from "./FinalCtaScene";
import SceneTransition from "./SceneTransition";
import "./cinematicLanding.css";

export default function CinematicLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <CinematicMotionProvider rootRef={rootRef}>
      <CinematicLandingContent rootRef={rootRef} />
    </CinematicMotionProvider>
  );
}

function CinematicLandingContent({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
  const motion = useCinematicMotion();

  // pin distances depend on image sizes settling
  useEffect(() => {
    if (!motion) return;
    const refreshFrame = window.requestAnimationFrame(() => {
      motion.ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(refreshFrame);
  }, [motion]);

  return (
    <div ref={rootRef} className="cinematic-landing-root">
      <a className="cine-skip-link" href="#cinematic-main">
        Skip to main content
      </a>
      <CinematicNavigation />
      <main id="cinematic-main">
        <HeroScene />
        <LearningPlanetScene />
        <LearningWorldScene />
        <CikguAiScene />
        <ParentScene />
        <KssmScene />
        <SceneTransition from="light" to="dark" />
        <FinalCtaScene />
      </main>
    </div>
  );
}
