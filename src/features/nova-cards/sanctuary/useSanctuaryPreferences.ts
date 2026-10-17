import { useEffect, useState, useSyncExternalStore } from "react";
import { soundscape } from "./audio";
export function useSanctuaryPreferences() {
  const [systemCalm, setSystemCalm] = useState(false),
    [manualCalm, setManualCalm] = useState(false);
  const [visible, setVisible] = useState(true);
  const audio = useSyncExternalStore(
    soundscape.subscribe,
    soundscape.getSnapshot,
    soundscape.getServerSnapshot,
  );
  useEffect(() => {
    const release = soundscape.mount();
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setSystemCalm(query?.matches ?? false);
    update();
    query?.addEventListener("change", update);
    const visibility = () => {
      const active = document.visibilityState !== "hidden";
      setVisible(active);
      soundscape.setVisible(active);
    };
    const gesture = (event: Event) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest(".nova-sanctuary") ||
        !event.isTrusted
      )
        return;
      if (event instanceof KeyboardEvent && !["Enter", " "].includes(event.key)) return;
      void soundscape.unlockFromGesture();
    };
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("pointerdown", gesture, true);
    document.addEventListener("keydown", gesture, true);
    visibility();
    return () => {
      query?.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("pointerdown", gesture, true);
      document.removeEventListener("keydown", gesture, true);
      release();
    };
  }, []);
  return {
    reducedMotion: systemCalm || manualCalm || !visible,
    systemCalm,
    visible,
    audio,
    toggleMotion: () => setManualCalm((v) => !v),
  };
}
