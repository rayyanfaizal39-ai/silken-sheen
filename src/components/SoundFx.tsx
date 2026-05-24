import { useEffect, useRef } from "react";
import { sfx, initSfxPreference } from "@/lib/sounds";
import { useProgress } from "@/hooks/use-progress";

const XP_MILESTONE = 100; // every 100 XP triggers level-up sound

function isInteractive(el: EventTarget | null): HTMLElement | null {
  if (!(el instanceof HTMLElement)) return null;
  const target = el.closest(
    'button, a, [role="button"], [data-sfx]',
  ) as HTMLElement | null;
  if (!target) return null;
  if (target.hasAttribute("disabled")) return null;
  if (target.dataset.sfx === "off") return null;
  return target;
}

export function SoundFx() {
  const { progress } = useProgress();
  const lastLevelRef = useRef<number | null>(null);

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
      document.removeEventListener("click", onClick, true as any);
    };
  }, []);

  useEffect(() => {
    const level = Math.floor(progress.xp / XP_MILESTONE);
    if (lastLevelRef.current === null) {
      lastLevelRef.current = level;
      return;
    }
    if (level > lastLevelRef.current) {
      sfx.levelUp();
      lastLevelRef.current = level;
    }
  }, [progress.xp]);

  return null;
}
