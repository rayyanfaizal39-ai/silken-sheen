import { useEffect, useState, type ComponentType } from "react";

/**
 * Mounts the demo-student picker only in a dev build, and only after the
 * bypass has been confirmed. The picker module is not imported otherwise.
 */
export function DevSignInSlot({ active }: { active: boolean }) {
  const [Panel, setPanel] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV && active) {
      let cancelled = false;
      void import("./DevSignInPanel").then((mod) => {
        if (!cancelled) setPanel(() => mod.DevSignInPanel);
      });
      return () => {
        cancelled = true;
      };
    }
  }, [active]);

  if (!import.meta.env.DEV || !active || !Panel) return null;
  return <Panel />;
}
