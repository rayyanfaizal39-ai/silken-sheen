import type { FoetalStage } from "@/content/form1/science/chapter-4/chapter4-content";

/** Fixed order icons matching the 5 foetalDevelopment stages in chapter4-content.ts. */
const STAGE_ICONS = ["🫧", "👂", "👶", "🤰", "🍼"];

export function FoetalTimeline({ stages }: { stages: FoetalStage[] }) {
  return (
    <div className="flex gap-0 overflow-x-auto py-2">
      {stages.map((stage, i) => (
        <div key={stage.weeks} className="relative min-w-[140px] flex-1 px-2.5 text-center">
          {i > 0 && <div className="absolute left-[-50%] top-[22px] h-0.5 w-full bg-border" />}
          <div className="relative z-10 mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-pink-400 bg-secondary text-lg">
            {STAGE_ICONS[i] ?? "👶"}
          </div>
          <p className="text-[11px] font-bold text-pink-400">{stage.weeks}</p>
          <p className="mt-1 text-[10.5px] leading-tight text-muted-foreground">{stage.description}</p>
        </div>
      ))}
    </div>
  );
}
