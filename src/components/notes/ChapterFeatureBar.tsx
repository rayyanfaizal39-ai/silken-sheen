import { Link } from "@tanstack/react-router";
import { BookOpen, CircleHelp, Layers3, Network } from "lucide-react";
import type { Form } from "@/data/content";
import { hasResourceContent, type ResourceType } from "@/content/registry";

export type ChapterContentType = "notes" | "flashcards" | "quizzes" | "mindmaps";

type TabDefinition = {
  type: ChapterContentType;
  resource: ResourceType;
  to: "/notes" | "/flashcards" | "/quizzes" | "/mindmaps";
  Icon: typeof BookOpen;
  en: string;
  bm: string;
};

const TABS: readonly TabDefinition[] = [
  { type: "notes", resource: "notes", to: "/notes", Icon: BookOpen, en: "Notes", bm: "Nota" },
  {
    type: "flashcards",
    resource: "flashcards",
    to: "/flashcards",
    Icon: Layers3,
    en: "Cards",
    bm: "Kad",
  },
  { type: "quizzes", resource: "quiz", to: "/quizzes", Icon: CircleHelp, en: "Quiz", bm: "Kuiz" },
  {
    type: "mindmaps",
    resource: "mindMap",
    to: "/mindmaps",
    Icon: Network,
    en: "Mindmaps",
    bm: "Peta Minda",
  },
] as const;

export function ChapterContentTabs({
  subjectId,
  form,
  chapterKey,
  scienceLang,
  currentContentType,
}: {
  subjectId: string;
  form: Form | "All";
  chapterKey: string;
  scienceLang?: "bm" | "dlp";
  currentContentType: ChapterContentType;
}) {
  const isBm = scienceLang === "bm" || (!scienceLang && subjectId !== "english");
  const formSearch = form === "All" ? undefined : Number(form.replace("Form ", ""));

  return (
    <nav
      aria-label={isBm ? "Kandungan bab" : "Chapter content"}
      className="mb-6 grid grid-cols-2 gap-2 rounded-[2rem] border border-white/[0.08] bg-[#0B1220]/62 p-2.5 shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl animate-fade-up sm:grid-cols-4"
    >
      {TABS.map(({ type, resource, to, Icon, en, bm }) => {
        const label = isBm ? bm : en;
        const available = hasResourceContent(subjectId, form, chapterKey, resource, scienceLang);
        const active = type === currentContentType;
        const sharedClassName =
          "inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full border px-3 py-2 text-center text-xs font-semibold transition-[background-color,border-color,color,box-shadow,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] sm:text-sm";

        if (!available) {
          return (
            <button
              key={type}
              type="button"
              disabled
              aria-label={`${label} — ${isBm ? "akan datang" : "coming soon"}`}
              className={`${sharedClassName} cursor-not-allowed border-white/10 bg-white/5 text-white/45 opacity-65`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{label}</span>
              <span className="text-[10px] opacity-80">{isBm ? "Akan datang" : "Soon"}</span>
            </button>
          );
        }

        return (
          <Link
            key={type}
            to={to}
            search={{ subject: subjectId, form: formSearch, chapter: chapterKey }}
            aria-current={active ? "page" : undefined}
            aria-label={`${label}${active ? (isBm ? " — dipilih" : " — selected") : ""}`}
            className={`${sharedClassName} active:brightness-90 ${
              active
                ? "border-primary/50 bg-gradient-to-r from-primary/35 to-accent/35 text-white shadow-[0_0_24px_rgba(99,102,241,0.22)]"
                : "border-primary/20 bg-gradient-to-r from-primary/12 to-accent/12 text-white/78 hover:border-primary/40 hover:from-primary/24 hover:to-accent/24 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{label}</span>
            {active && <span className="sr-only">{isBm ? "Dipilih" : "Selected"}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
