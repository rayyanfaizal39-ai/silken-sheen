import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AcadeMYLoadingScreen } from "@/components/AcadeMYLoadingScreen";
import { useAuth } from "@/context/auth-context";

/** Hero artwork used by /home — preloaded so the page never pops in half-drawn. */
const HERO_IMAGE = "/assets/ranks/home/academy-station-hero.png";
/** Hard ceiling: the app always opens, even if an asset never resolves. */
const MAX_BOOT_MS = 6000;

function preloadHero(): Promise<void> {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = HERO_IMAGE;
    const done = () => resolve();
    if (typeof img.decode === "function") {
      img.decode().then(done, done);
      return;
    }
    img.onload = done;
    img.onerror = done;
  });
}

/**
 * Client-side boot gate. Renders the branded loader over the app until the
 * Supabase session check and the hero artwork are settled (or the timeout
 * fires). SSR and the first client render are identical (no loader), so
 * hydration stays clean; the loader is attached in an effect.
 */
export function AppBootGate({ children }: { children: ReactNode }) {
  const { loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);
    let cancelled = false;
    void preloadHero().then(() => {
      if (!cancelled) setAssetsReady(true);
    });
    const timer = window.setTimeout(() => {
      if (!cancelled) setTimedOut(true);
    }, MAX_BOOT_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const ready = timedOut || (!authLoading && assetsReady);
  const active = mounted && !removed;

  // Lock scrolling only while the loader covers the page.
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  const handleFadeOutComplete = useCallback(() => setRemoved(true), []);

  return (
    <>
      {children}
      {active ? (
        <AcadeMYLoadingScreen visible={!ready} onFadeOutComplete={handleFadeOutComplete} />
      ) : null}
    </>
  );
}
