import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { setSection, sectionFromPath } from "@/lib/bg-music";

/**
 * Mounts the adaptive background music engine and updates its section
 * whenever the URL changes. Renders nothing.
 */
export function BgMusicController() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setSection(sectionFromPath(pathname));
  }, [pathname]);

  return null;
}
