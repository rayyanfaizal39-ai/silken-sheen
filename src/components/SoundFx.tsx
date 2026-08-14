import { useEffect, useRef } from "react";
import { sfx, initSfxPreference } from "@/lib/sounds";
import { getCompanionLevelProgress, useProgress } from "@/hooks/use-progress";
import { getRank } from "@/data/rankAssets";

function isInteractive(el: EventTarget | null): HTMLElement | null {
  if (!(el instanceof HTMLElement)) return null;
  const target = el.closest('button, a, [role="button"], [data-sfx]') as HTMLElement | null;
  if (!target) return null;
  if (target.hasAttribute("disabled")) return null;
  if (target.dataset.sfx === "off") return null;
  return target;
}

export function SoundFx() {
  const { progress } = useProgress();
  const lastLevelRef = useRef<number | null>(null);
  const lastXpRef = useRef<number | null>(null);

  useEffect(() => {
    initSfxPreference();

    const onOver = (e: Event) => {
      if (isInteractive(e.target)) sfx.hover();
    };
    const onClick = (e: Event) => {
      if (isInteractive(e.target)) sfx.click();
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("click", onClick, { passive: true, capture: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  useEffect(() => {
    const level = getCompanionLevelProgress(progress.xp).currentLevel;
    if (lastLevelRef.current === null || lastXpRef.current === null) {
      lastLevelRef.current = level;
      lastXpRef.current = progress.xp;
      return;
    }
    const crossedRankBoundary = getRank(lastXpRef.current).id !== getRank(progress.xp).id;
    if (level > lastLevelRef.current && !crossedRankBoundary) {
      sfx.levelUp();
    }
    lastLevelRef.current = level;
    lastXpRef.current = progress.xp;
  }, [progress.xp]);

  return null;
}
