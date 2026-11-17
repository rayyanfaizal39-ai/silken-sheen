import { useEffect, useMemo, useState, type ReactNode, type RefObject } from "react";
type LenisRuntime = import("lenis").default;
import { CinematicMotionContext, type CinematicMotionRuntime } from "./cinematicMotionContext";

function navigationOffset(root: HTMLElement) {
  const navigation = root.querySelector<HTMLElement>(".cine-nav");
  return navigation ? -(navigation.offsetHeight + 12) : -84;
}

const ANCHOR_PROGRESS: Record<string, number> = {
  "#learning-world": 0.27,
  "#cikgu-ai": 0.62,
  "#parents": 0.8,
};

export function CinematicMotionProvider({
  children,
  rootRef,
}: {
  children: ReactNode;
  rootRef: RefObject<HTMLDivElement | null>;
}) {
  const [runtime, setRuntime] = useState<CinematicMotionRuntime | null>(null);

  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};

    async function initialize() {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      const root = rootRef.current;
      if (!root) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const existingTriggers = new Set(ScrollTrigger.getAll());

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const usesCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      let lenis: LenisRuntime | null = null;
      let tickerCallback: ((time: number) => void) | null = null;

      if (!prefersReducedMotion && !usesCoarsePointer) {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;

        lenis = new Lenis({
          autoRaf: false,
          smoothWheel: true,
          duration: 1.15,
          syncTouch: false,
        });

        lenis.on("scroll", ScrollTrigger.update);
        tickerCallback = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
      }

      const scrollToSection = (target: string) => {
        const element = root.querySelector<HTMLElement>(target);
        if (!element) return;

        const progress = ANCHOR_PROGRESS[target];
        if (progress) {
          const pinnedTrigger = ScrollTrigger.getAll().find((trigger) => {
            const triggerElement = trigger.trigger;
            return (
              trigger.pin &&
              triggerElement instanceof Element &&
              (triggerElement === element || element.contains(triggerElement))
            );
          });
          if (pinnedTrigger) {
            const top = pinnedTrigger.start + (pinnedTrigger.end - pinnedTrigger.start) * progress;
            if (lenis) {
              lenis.resize();
              lenis.scrollTo(top, { duration: 1.6, force: true });
            } else {
              window.scrollTo({ top, behavior: "smooth" });
            }
            return;
          }
        }

        const top = element.getBoundingClientRect().top + window.scrollY + navigationOffset(root);
        if (lenis) {
          // Use a numeric destination. Passing the element itself makes Lenis
          // add the document's scroll-padding on top of our measured offset.
          lenis.resize();
          lenis.scrollTo(top, { duration: 1.6, force: true });
          return;
        }

        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      };

      const nextRuntime: CinematicMotionRuntime = {
        gsap,
        ScrollTrigger,
        getLenis: () => lenis,
        scrollToSection,
      };

      setRuntime(nextRuntime);

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const refreshFrame = window.requestAnimationFrame(refresh);

      dispose = () => {
        window.cancelAnimationFrame(refreshFrame);
        window.removeEventListener("load", refresh);

        for (const trigger of ScrollTrigger.getAll()) {
          if (!existingTriggers.has(trigger)) {
            trigger.kill(true);
          }
        }

        if (tickerCallback) {
          gsap.ticker.remove(tickerCallback);
        }
        lenis?.destroy();
        lenis = null;
      };
    }

    // A failed GSAP/Lenis chunk (flaky mobile network, stale SW entry) used to
    // leave every animated-in element stuck at its opacity:0 start state, which
    // read to users as "the images are missing". Flag the root so CSS can
    // reveal the static composition instead.
    void initialize().catch((error) => {
      if (import.meta.env.DEV) console.error("Cinematic motion failed to initialise:", error);
      rootRef.current?.setAttribute("data-motion-failed", "true");
    });

    return () => {
      cancelled = true;
      dispose();
    };
  }, [rootRef]);

  const value = useMemo(() => runtime, [runtime]);

  return (
    <CinematicMotionContext.Provider value={value}>{children}</CinematicMotionContext.Provider>
  );
}
