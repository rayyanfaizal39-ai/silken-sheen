import { useEffect, useState } from "react";
import { registerServiceWorker, type UpdatePromptState } from "@/lib/pwa-register";

/**
 * Headless-ish PWA registration + update toast.
 * Mounted once from __root.tsx. Renders nothing until an update is ready.
 */
export function PwaUpdatePrompt() {
  const [state, setState] = useState<UpdatePromptState | null>(null);

  useEffect(() => {
    let cancelled = false;
    void registerServiceWorker((s) => {
      if (!cancelled) setState(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!state?.needRefresh) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0f24]/95 px-4 py-2.5 shadow-2xl backdrop-blur"
    >
      <span className="text-sm text-white/90">New version available.</span>
      <button
        onClick={() => void state.update()}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90"
      >
        Update now
      </button>
      <button
        onClick={() => setState(null)}
        className="text-xs text-white/50 hover:text-white/80"
        aria-label="Dismiss update prompt"
      >
        Later
      </button>
    </div>
  );
}
