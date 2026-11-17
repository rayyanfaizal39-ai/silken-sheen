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

  // Share the real header height with native anchors, CSS scroll margins and
  // programmatic navigation. The bar changes size at the mobile breakpoint
  // and can grow with text zoom, so a fixed allowance is not reliable.
  useEffect(() => {
    const root = rootRef.current;
    const navigation = root?.querySelector<HTMLElement>(".cine-nav");
    const scrollContainer = document.scrollingElement as HTMLElement | null;
    if (!root || !navigation || !scrollContainer) return;

    const previousScrollPaddingTop = scrollContainer.style.scrollPaddingTop;
    let frame = 0;
    const updateOffset = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const height = Math.ceil(navigation.getBoundingClientRect().height);
        const offset = height + 12;
        root.style.setProperty("--cine-nav-height", `${height}px`);
        root.style.setProperty("--cine-nav-offset", `${offset}px`);
        scrollContainer.style.scrollPaddingTop = `${offset}px`;
        motion?.ScrollTrigger.refresh();
      });
    };

    updateOffset();
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateOffset);
    observer?.observe(navigation);
    window.addEventListener("resize", updateOffset);
    window.visualViewport?.addEventListener("resize", updateOffset);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", updateOffset);
      window.visualViewport?.removeEventListener("resize", updateOffset);
      scrollContainer.style.scrollPaddingTop = previousScrollPaddingTop;
    };
  }, [motion, rootRef]);

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
