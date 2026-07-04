import { useState } from "react";
import { useProgress, getRank } from "@/hooks/use-progress";
import { CikguAIPanel } from "./CikguAIPanel";
import robotImage from "@/assets/cikgu-ai-robot.png";

/** Floating Cikgu AI button — shows the AcadeMY robot and opens the companion panel. */
export function AICompanionButton() {
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const rank = getRank(progress.xp);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Cikgu AI Companion"
        className="mobile-ai-control cikgu-button-pulse fixed z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 md:bottom-7 md:right-6 md:h-16 md:w-16"
        style={{
          background: "linear-gradient(135deg, #8B5CF6 0%, #2563EB 100%)",
        }}
      >
        <img
          src={robotImage}
          alt="Cikgu AI"
          draggable={false}
          className="h-11 w-11 object-contain md:h-12 md:w-12"
        />
      </button>

      <CikguAIPanel open={open} onOpenChange={setOpen} rankImage={robotImage} rank={rank} />
    </>
  );
}
