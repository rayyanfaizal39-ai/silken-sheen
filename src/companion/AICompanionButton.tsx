import { useState } from "react";
import { X } from "lucide-react";
import { useProgress, getRank } from "@/hooks/use-progress";

const RANK_IMAGE: Record<string, string> = {
  cadet: "/companions/Astrounaut/cadet.png",
  "planet-voyager": "/companions/Astrounaut/planet-voyager.png",
  "star-captain": "/companions/Astrounaut/star-captain.png",
  "galaxy-guardian": "/companions/Astrounaut/galaxy-guardian.png",
  "celestial-master": "/companions/Astrounaut/celestial-master.png",
  "cosmic-legend": "/companions/Astrounaut/cosmic-legend.png",
};

/** Floating "AI" button below the Music button — opens a Cikgu AI Companion teaser panel. */
export function AICompanionButton() {
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const rank = getRank(progress.xp);
  const image = RANK_IMAGE[rank.id] ?? RANK_IMAGE.cadet;

  return (
    <>
      <div className="mobile-ai-control fixed z-[70] flex flex-col items-end gap-3 md:bottom-7 md:right-6">
        {open && (
          <div
            className="w-72 glass-strong rounded-2xl p-4 shadow-2xl border border-[#8B5CF6]/30"
            style={{
              animation: "aiCompanionFadeScale 0.22s ease-out",
              boxShadow: "0 10px 40px -10px rgba(139,92,246,0.4)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Cikgu AI Companion
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative mx-auto mb-3 flex h-28 w-28 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/25 blur-2xl" />
              <img
                src={image}
                alt={rank.name}
                className="relative z-10 h-24 w-auto object-contain rank-companion-float"
                draggable={false}
              />
            </div>

            <p className="text-center text-sm font-bold text-white">Cikgu AI is coming soon.</p>
            <p className="mt-1.5 text-center text-xs leading-relaxed text-white/55">
              Your cosmic companion will help you study, explain notes, and guide quizzes.
            </p>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open Cikgu AI Companion"
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 md:h-14 md:w-14 md:rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #2563EB 100%)",
            boxShadow: "0 16px 38px -24px rgba(0,0,0,0.75), 0 0 22px rgba(139,92,246,0.35)",
          }}
        >
          <span className="relative text-sm font-black tracking-wide md:text-base">AI</span>
        </button>
      </div>

      <style>{`
        @keyframes aiCompanionFadeScale {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
