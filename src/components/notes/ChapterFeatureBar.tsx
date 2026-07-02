import { BookOpen, Layers, HelpCircle, Network, Video } from "lucide-react";
import type { ChapterFeatureKey } from "@/content/types";

const FEATURE_META: Record<
  ChapterFeatureKey,
  { label: string; shortLabel?: string; Icon: typeof BookOpen; compact?: boolean }
> = {
  notes: { label: "Notes", Icon: BookOpen, compact: true },
  flashcards: { label: "Flashcards", shortLabel: "Cards", Icon: Layers, compact: true },
  quiz: { label: "Quiz", Icon: HelpCircle },
  mindMap: { label: "Mind Map", Icon: Network },
  video: { label: "AI Video", Icon: Video },
};

const ORDER: ChapterFeatureKey[] = ["notes", "flashcards", "quiz", "video"];

export function ChapterFeatureBar({
  features,
  onJump,
}: {
  features: Record<ChapterFeatureKey, boolean>;
  onJump?: (key: ChapterFeatureKey) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2 rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-2.5 shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl animate-fade-up">
      {ORDER.map((key) => {
        const { label, shortLabel, Icon, compact } = FEATURE_META[key];
        const available = features[key];
        const className = available
          ? "bg-gradient-to-r from-primary/18 to-accent/18 text-foreground border-primary/25 hover:from-primary/28 hover:to-accent/28"
          : "bg-white/5 text-muted-foreground border-white/10 cursor-not-allowed opacity-60";
        const sizeClass = compact
          ? "px-3 py-1.5 text-[11px] sm:px-3.5 sm:text-xs"
          : "px-3.5 py-1.5 text-xs sm:px-4 sm:py-2";
        return (
          <button
            key={key}
            type="button"
            onClick={() => available && onJump?.(key)}
            disabled={!available}
            className={`inline-flex items-center gap-1.5 rounded-full border font-semibold transition-all ${sizeClass} ${className}`}
            aria-label={`${label}${available ? "" : " — coming soon"}`}
          >
            <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            <span>{shortLabel ?? label}</span>
            {!available && <span className="ml-0.5 text-[10px] opacity-80">Soon</span>}
          </button>
        );
      })}
    </div>
  );
}

