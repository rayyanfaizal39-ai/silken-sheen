import { useState } from "react";
import { useProgress, getRank } from "@/hooks/use-progress";
import { CikguAIPanel } from "./CikguAIPanel";

const RANK_IMAGE: Record<string, string> = {
  cadet: "/companions/Astrounaut/cadet.png",
  "planet-voyager": "/companions/Astrounaut/planet-voyager.png",
  "star-captain": "/companions/Astrounaut/star-captain.png",
  "galaxy-guardian": "/companions/Astrounaut/galaxy-guardian.png",
  "celestial-master": "/companions/Astrounaut/celestial-master.png",
  "cosmic-legend": "/companions/Astrounaut/cosmic-legend.png",
};

/** Floating Cikgu AI button — shows the student's current rank avatar and opens the companion panel. */
export function AICompanionButton() {
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const rank = getRank(progress.xp);
  const image = RANK_IMAGE[rank.id] ?? RANK_IMAGE.cadet;

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
          src={image}
          alt={rank.name}
          draggable={false}
          className="h-11 w-11 object-contain md:h-12 md:w-12"
        />
      </button>

      <CikguAIPanel open={open} onOpenChange={setOpen} rankImage={image} rank={rank} />
    </>
  );
}
