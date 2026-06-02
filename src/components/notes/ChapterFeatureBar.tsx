import { BookOpen, Layers, HelpCircle, Network, Video } from "lucide-react";
import type { ChapterFeatureKey } from "@/content/types";

const FEATURE_META: Record<
  ChapterFeatureKey,
  { label: string; Icon: typeof BookOpen }
> = {
  notes: { label: "Notes", Icon: BookOpen },
  flashcards: { label: "Flashcards", Icon: Layers },
  quiz: { label: "Quiz", Icon: HelpCircle },
  mindMap: { label: "Mind Map", Icon: Network },
  video: { label: "AI Video", Icon: Video },
};

const ORDER: ChapterFeatureKey[] = ["notes", "flashcards", "quiz", "mindMap", "video"];

export function ChapterFeatureBar({
  features,
  onJump,
}: {
  features: Record<ChapterFeatureKey, boolean>;
  onJump?: (key: ChapterFeatureKey) => void;
}) {
  return (
    <div className="glass rounded-2xl p-3 mb-6 flex flex-wrap gap-2 animate-fade-up">
      {ORDER.map((key) => {
        const { label, Icon } = FEATURE_META[key];
        const available = features[key];
        const className = available
          ? "bg-gradient-to-r from-primary/15 to-accent/15 text-foreground border-primary/30 hover:from-primary/25 hover:to-accent/25"
          : "bg-white/5 text-muted-foreground border-white/10 cursor-not-allowed opacity-60";
        return (
          <button
            key={key}
            type="button"
            onClick={() => available && onJump?.(key)}
            disabled={!available}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${className}`}
            aria-label={`${label}${available ? "" : " — coming soon"}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
            {!available && <span className="text-[10px] ml-1 opacity-80">Soon</span>}
          </button>
        );
      })}
    </div>
  );
}
