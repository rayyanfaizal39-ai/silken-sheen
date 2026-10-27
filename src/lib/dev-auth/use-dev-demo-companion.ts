import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import type { DevDemoCompanion } from "./store";

/**
 * The signed-in demo companion, or "off" when the dev bypass is not active.
 * The store import stays inside the dev branch so production builds drop it.
 */
export function useDevDemoCompanion(): "off" | DevDemoCompanion | null {
  const { devAuthBypass } = useAuth();
  const [face, setFace] = useState<"off" | DevDemoCompanion | null>("off");

  useEffect(() => {
    if (import.meta.env.DEV && devAuthBypass) {
      let stop = () => {};
      let cancelled = false;
      void import("./store").then((store) => {
        if (cancelled) return;
        const read = () => setFace(store.devDemoCompanion());
        read();
        stop = store.subscribeDevStore(read);
      });
      return () => {
        cancelled = true;
        stop();
      };
    }
    setFace("off");
  }, [devAuthBypass]);

  return face;
}
