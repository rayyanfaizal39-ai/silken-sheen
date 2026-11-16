import { useId } from "react";
import { Check, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LEARNING_LEVELS,
  isLearningLevelAvailable,
  type LearningLevelId,
} from "@/lib/learning-levels";

interface LevelTheme {
  /** ~900px-wide WebP artwork shown as the card background. */
  image: string;
  /** Border plus a matching gradient that shows until the image loads. */
  card: string;
}

// Primary = enchanted forest (emerald), Junior = purple space, Senior = academy express (gold border).
const LEVEL_THEMES: Record<LearningLevelId, LevelTheme> = {
  primary: {
    image: "/images/login/level-primary.webp",
    card: "border-[#34D399]/70 bg-[linear-gradient(160deg,#1E8A55_0%,#11633C_55%,#0A3D26_100%)]",
  },
  junior: {
    image: "/images/login/level-junior.webp",
    card: "border-[#A855F7] bg-[linear-gradient(160deg,#5B21B6_0%,#3B0F86_55%,#1E0B4B_100%)]",
  },
  senior: {
    image: "/images/login/level-senior.webp",
    card: "border-[#FACC15]/80 bg-[linear-gradient(160deg,#B7860B_0%,#8A5A07_55%,#4A2C04_100%)]",
  },
};

export function LearningLevelSelector({
  value,
  onChange,
}: {
  value: LearningLevelId | null;
  onChange: (level: LearningLevelId) => void;
}) {
  const headingId = useId();

  return (
    <div>
      <h2
        id={headingId}
        className="text-center font-display text-[20px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.4)] min-[360px]:text-[22px] sm:text-4xl lg:text-[40px]"
      >
        Choose Your Learning World
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-base leading-7 text-white/75 sm:text-lg">
        Select the world that matches your current school level.
      </p>

      <ul
        aria-labelledby={headingId}
        className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-7"
      >
        {LEARNING_LEVELS.map((level) => {
          const available = isLearningLevelAvailable(level.id);
          const isSelected = available && value === level.id;
          const theme = LEVEL_THEMES[level.id];
          const statusId = `${headingId}-${level.id}-status`;

          return (
            <li
              key={level.id}
              data-level={level.id}
              data-selected={isSelected}
              data-available={available}
              className={cn(
                "relative min-w-0 overflow-hidden rounded-3xl border-2 text-left",
                theme.card,
                isSelected &&
                  "shadow-[0_0_0_2px_rgba(255,255,255,0.85),0_24px_60px_rgba(76,29,149,0.45)]",
              )}
            >
              <img
                aria-hidden="true"
                alt=""
                src={theme.image}
                width={896}
                height={1120}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/45 to-[#050816]/95"
              />
              <button
                type="button"
                disabled={!available}
                aria-describedby={statusId}
                aria-pressed={isSelected}
                onClick={() => onChange(level.id)}
                className={cn(
                  "relative flex min-h-[360px] w-full flex-col justify-end p-5 text-left sm:min-h-[400px] sm:p-6 md:min-h-[420px]",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/90",
                  available
                    ? "cursor-pointer transition duration-200 hover:bg-white/[0.04] active:bg-white/[0.08] motion-reduce:transition-none"
                    : "cursor-not-allowed",
                )}
              >
                {isSelected && (
                  <span className="absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-950/90 px-3 py-2 text-sm font-bold text-emerald-200">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    Selected
                  </span>
                )}
                <span className="relative block">
                  <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/75">
                    AcadeMY {level.name}
                  </span>
                  <span className="mt-2 block font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {level.worldTitle}
                  </span>
                  <span className="mt-2 block text-base font-bold text-white">{level.range}</span>
                  <span className="mt-3 block text-sm leading-6 text-white/75">
                    {level.description}
                  </span>
                  <span
                    id={statusId}
                    className={cn(
                      "mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold",
                      available
                        ? "bg-[#34D399] text-[#052E1F] shadow-[0_6px_18px_rgba(52,211,153,0.35)]"
                        : "border border-white/25 bg-black/55 text-white/90",
                    )}
                  >
                    {available ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Clock3 className="h-4 w-4" aria-hidden="true" />
                    )}
                    {available ? `Choose ${level.name}` : "Registration coming soon"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
