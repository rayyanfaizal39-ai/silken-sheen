import { Beaker, ChevronDown, ClipboardCheck, Lightbulb, TriangleAlert } from "lucide-react";
import type { LocalizedLearningExperience } from "@/content/form1/science/chapter-1/chapter1-content";

const MODE_STYLE = {
  ACTIVITY: { icon: Lightbulb, className: "border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300" },
  EXPERIMENT: { icon: Beaker, className: "border-cyan-400/40 bg-cyan-400/10 text-cyan-700 dark:text-cyan-300" },
  PRACTICE: { icon: ClipboardCheck, className: "border-violet-400/40 bg-violet-400/10 text-violet-700 dark:text-violet-300" },
} as const;

export function Chapter1LearningExperienceCard({ experience, lang }: { experience: LocalizedLearningExperience; lang: "en" | "bm" }) {
  const style = MODE_STYLE[experience.mode];
  const ModeIcon = style.icon;
  return (
    <article className="rounded-2xl border border-orange-400/30 bg-orange-400/5 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${style.className}`}>
          <ModeIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {lang === "en" ? experience.mode : experience.mode === "EXPERIMENT" ? "EKSPERIMEN" : experience.mode === "PRACTICE" ? "LATIHAN" : "AKTIVITI"}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-800 dark:text-orange-200"><TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />{lang === "en" ? "Teacher/lab guided" : "Bimbingan guru/makmal"}</span>
        <span className="text-[11px] font-semibold text-muted-foreground">SP {experience.standards.join(", ")}</span>
      </div>
      <h4 className="font-display mt-3 text-sm font-bold text-foreground">{experience.title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{experience.purpose}</p>
      {experience.practicalNotice && <p className="mt-2 text-xs font-medium leading-relaxed text-orange-900 dark:text-orange-200">{experience.practicalNotice}</p>}
      <details className="group mt-3 rounded-xl border border-border bg-card/70">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          {lang === "en" ? "Show practical prompt" : "Tunjukkan arahan amali"}<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="border-t border-border p-3">
          <ol className="space-y-2">{experience.instructions.map((instruction, index) => <li key={instruction} className="flex gap-2 text-xs leading-relaxed text-foreground/85"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">{index + 1}</span><span>{instruction}</span></li>)}</ol>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{lang === "en" ? "Evidence:" : "Bukti:"}</span> {experience.studentOutput}</p>
        </div>
      </details>
    </article>
  );
}

export function Chapter1LearningExperienceList({ experiences, lang }: { experiences: LocalizedLearningExperience[]; lang: "en" | "bm" }) {
  if (experiences.length === 0) return null;
  return (
    <div className="space-y-3">
      <h3 className="font-display text-sm font-bold text-foreground">{lang === "en" ? "Physical practical" : "Amali fizikal"}</h3>
      {experiences.map((experience) => (
        <Chapter1LearningExperienceCard key={experience.id} experience={experience} lang={lang} />
      ))}
    </div>
  );
}
