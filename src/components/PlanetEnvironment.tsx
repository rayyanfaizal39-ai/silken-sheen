import { useEffect, useState, type CSSProperties } from "react";

/**
 * Reusable per-subject "planet" atmosphere — swapped in wherever a study
 * page would otherwise show the generic AcademyBackdrop. Reuses the
 * world-scene-* CSS scenes already authored for SubjectWorldPage so the
 * chapter map and the quiz/flashcard/mindmap/notes views share one
 * identity instead of losing it once a chapter is opened.
 */

export type PlanetSubjectId = "math" | "science" | "english" | "geography" | "sejarah" | "bm";

type PlanetTheme = {
  sceneClass: string;
  color: string;
  glow: string;
  decor: string[];
};

export const PLANET_THEMES: Record<PlanetSubjectId, PlanetTheme> = {
  math: {
    sceneClass: "world-scene-math",
    color: "#FBBF24",
    glow: "rgba(251,191,36,0.45)",
    decor: ["π", "∑", "∞", "√", "∫", "θ", "x²", "Δ"],
  },
  science: {
    sceneClass: "world-scene-science",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.45)",
    decor: ["⚛", "H₂O", "DNA", "O₂", "CO₂", "pH"],
  },
  english: {
    sceneClass: "world-scene-english",
    color: "#C084FC",
    glow: "rgba(192,132,252,0.45)",
    decor: ["❝", "Aa", "¶", "✦", "ABC"],
  },
  geography: {
    sceneClass: "world-scene-geography",
    color: "#34D399",
    glow: "rgba(52,211,153,0.45)",
    decor: ["N", "↑", "°E", "km²", "S"],
  },
  sejarah: {
    sceneClass: "world-scene-sejarah",
    color: "#FB923C",
    glow: "rgba(251,146,60,0.45)",
    decor: ["1957", "BCE", "📜", "Abad", "⚔"],
  },
  bm: {
    sceneClass: "world-scene-bm",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.45)",
    decor: ["◆", "BM", "Kata", "ب", "Puisi"],
  },
};

export function getPlanetTheme(subjectId?: string | null): PlanetTheme | null {
  if (!subjectId) return null;
  return PLANET_THEMES[subjectId as PlanetSubjectId] ?? null;
}

// Fixed ambient layer, kept low-opacity and off to the edges so it never
// competes with content for attention.
const PARTICLE_SLOTS: Array<{ top: string; left?: string; right?: string; cls: string; op: number; fs: string }> = [
  { top: "6%", left: "2%", cls: "particle-float-1", op: 0.1, fs: "1.1rem" },
  { top: "14%", right: "3%", cls: "particle-float-2", op: 0.08, fs: "0.85rem" },
  { top: "30%", left: "1.5%", cls: "particle-float-3", op: 0.09, fs: "0.95rem" },
  { top: "46%", right: "2%", cls: "particle-float-1", op: 0.07, fs: "0.8rem" },
  { top: "62%", left: "2.5%", cls: "particle-float-2", op: 0.1, fs: "1rem" },
  { top: "78%", right: "3.5%", cls: "particle-float-3", op: 0.08, fs: "0.85rem" },
  { top: "90%", left: "3%", cls: "particle-float-1", op: 0.07, fs: "0.9rem" },
];

export function PlanetEnvironment({ subjectId }: { subjectId: PlanetSubjectId }) {
  const theme = PLANET_THEMES[subjectId] ?? PLANET_THEMES.math;
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <>
      <div className={`absolute inset-0 -z-20 ${theme.sceneClass}`} />
      <div
        className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${tabHidden ? "planet-paused" : ""}`}
        aria-hidden
      >
        {PARTICLE_SLOTS.map((slot, i) => (
          <span
            key={i}
            className={`absolute select-none font-black ${slot.cls}`}
            style={
              {
                top: slot.top,
                left: slot.left,
                right: slot.right,
                color: theme.color,
                opacity: slot.op,
                fontSize: slot.fs,
                fontFamily: "var(--font-display)",
              } as CSSProperties
            }
          >
            {theme.decor[i % theme.decor.length]}
          </span>
        ))}
      </div>
    </>
  );
}
