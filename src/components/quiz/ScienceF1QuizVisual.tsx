import {
  scienceF1QuizVisualById,
  scienceF1QuizVisualDescriptions,
} from "@/content/form1/science/quiz-visuals";

/** Presentation metadata must not clone or mutate canonical assessment records. */
export function ScienceF1QuizVisual({
  question,
}: {
  question: { id?: string; question: string; lang?: string };
}) {
  const src = question.id ? scienceF1QuizVisualById[question.id] : undefined;
  if (!src) return null;
  const name = src
    .split("/")
    .at(-1)!
    .replace(/\.svg$/, "");
  const language = question.lang === "bm" ? "bm" : "dlp";
  return (
    <img
      src={src}
      alt={scienceF1QuizVisualDescriptions[name][language]}
      className="mx-auto mb-4 block w-full max-w-xl rounded-xl object-contain"
    />
  );
}
