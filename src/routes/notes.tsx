import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { subjects, notes, getItemChapterKey, getSubjectChapters } from "@/data/content";
import { BookOpenCheck, ArrowLeft } from "lucide-react";
import { z } from "zod";
import {
  SubjectGrid,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import { DailyQuote } from "@/components/DailyQuote";
import { useProgress, chapterActivityKey } from "@/hooks/use-progress";
import { MindMap } from "@/components/MindMap";
import { zamanAirBatuMindMap } from "@/data/sejarah-f1-c2-mindmap";
import { mengenaliSejarahMindMap } from "@/data/mengenaliSejarahMindMap";
import { zamanPrasejarahMindMap } from "@/data/zamanPrasejarahMindMap";
import { tamadunIndiaChinaMindMap } from "@/data/sejarah-f1-c7-mindmap";
import { tamadunIslamSumbanganMindMap } from "@/data/sejarah-f1-c8-mindmap";
import { mengenaliTamadunMindMap } from "@/data/sejarah-f1-c4-mindmap";
import { tamadunAwalDuniaMindMap } from "@/data/sejarah-f1-c5-mindmap";
import { peningkatanTamadunYunaniRomMindMap } from "@/data/sejarah-f1-c6-mindmap";
import { getSejarahF1Subtopics, type Subtopic } from "@/data/sejarah-f1-subtopics";
import { getGeographyF1Subtopics } from "@/data/geography-f1-subtopics";
import { getChapter } from "@/content/registry";
import { getChapterFeatures } from "@/content/types";
import { ChapterFeatureBar } from "@/components/notes/ChapterFeatureBar";
import { VideoBlock } from "@/components/notes/VideoBlock";
import { MindMapBlock } from "@/components/notes/MindMapBlock";
import { NotesBlock, type NotesAccordionSection } from "@/components/notes/NotesBlock";
import { normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";

const searchSchema = z.object({
  subject: z.preprocess(
    (value) => (value == null ? undefined : String(value)),
    z.string().optional(),
  ),
  form: z.preprocess((value) => {
    if (value == null || value === "") return undefined;
    const formNumber = Number(String(value).replaceAll('"', ""));
    return formNumber === 1 || formNumber === 2 || formNumber === 3 ? formNumber : undefined;
  }, z.number().optional()),
});

export const Route = createFileRoute("/notes")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Summary Notes — AcadeMY" },
      { name: "description", content: "Bite-sized KSSM notes by subject, form, and chapter." },
      { property: "og:title", content: "Summary Notes — AcadeMY" },
      {
        property: "og:description",
        content: "Clean, highlighted study notes for Form 1–3 students.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const normalizedSubject = normalizeSubjectParam(search.subject);
  const subject =
    normalizedSubject && subjects.some((s) => s.id === normalizedSubject)
      ? normalizedSubject
      : null;
  const [chapter, setChapter] = useState<string | null>(null);
  const form = normalizeFormParam(search.form);
  const [scrollPct, setScrollPct] = useState(0);
  const { progress, markChapter } = useProgress();
  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const isBilingualSubject = subject === "science" || subject === "math";
  const needsScienceLang = isBilingualSubject && !scienceLang;

  const activeScienceLang = isBilingualSubject ? (scienceLang ?? undefined) : undefined;
  const subjectChapters = subject ? getSubjectChapters(subject, activeScienceLang) : [];
  const activeChapterKey =
    chapter && subjectChapters.some((candidate) => candidate.key === chapter) ? chapter : null;
  const hasSubtopics = (subject === "sejarah" || subject === "geography") && !!activeChapterKey;
  const subtopics: Subtopic[] = hasSubtopics
    ? subject === "sejarah"
      ? getSejarahF1Subtopics(activeChapterKey!)
      : getGeographyF1Subtopics(activeChapterKey!)
    : [];

  const chapterMeta =
    subject && activeChapterKey
      ? subjectChapters.find((candidate) => candidate.key === activeChapterKey)
      : null;
  const isRead =
    subject && activeChapterKey
      ? !!progress.chapterActivity[chapterActivityKey(subject, activeChapterKey)]?.read
      : false;
  const activeChapter =
    subject && activeChapterKey
      ? (getChapter(subject, activeChapterKey, activeScienceLang) ?? undefined)
      : undefined;
  const features = getChapterFeatures(activeChapter);

  // Reading progress bar
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setChapter(null);
    setScrollPct(0);
  }, [subject, form]);

  const filtered = useMemo(() => {
    if (!subject || !activeChapterKey) return [];
    return notes.filter((n) => {
      if (n.subjectId !== subject) return false;
      if (getItemChapterKey(n) !== activeChapterKey) return false;
      if (form !== "All" && n.form !== form) return false;
      if (isBilingualSubject && n.lang && scienceLang && n.lang !== scienceLang) return false;
      return true;
    });
  }, [subject, activeChapterKey, form, scienceLang, isBilingualSubject]);

  const legacyNoteSections = useMemo<NotesAccordionSection[]>(
    () =>
      filtered.map((note, index) => ({
        id: note.id,
        title: `${index + 1}. ${note.title}`,
        content: note.summary,
        keywords: note.keywords,
      })),
    [filtered],
  );
  const visibleFeatures = {
    ...features,
    notes: features.notes || legacyNoteSections.length > 0,
  };

  function jumpTo(key: string) {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16 overflow-visible">
      {/* Reading progress bar */}
      {subject && activeChapterKey && (
        <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-nova-yellow transition-all"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      )}

      <div className="text-center mb-6">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">
          Summary <span className="gradient-text">Notes</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Quick, focused notes that get you ready in minutes.
        </p>
      </div>
      <div className="flex justify-center">
        <DailyQuote />
      </div>

      {!subject ? (
        <SubjectGrid
          onSelect={(id) => {
            setChapter(null);
            void navigate({
              search: (previous: Record<string, unknown>) => ({
                ...previous,
                subject: id,
              }),
            });
          }}
        />
      ) : needsScienceLang ? (
        <ScienceLanguagePicker
          onSelect={(l) => setScienceLang(l)}
          subjectName={subject === "math" ? "Mathematics" : "Science"}
          subjectNameBm={subject === "math" ? "Matematik" : "Sains"}
          subjectEmoji={subject === "math" ? "📐" : "🔬"}
          bmDescription={
            subject === "math"
              ? "Belajar Matematik dalam Bahasa Malaysia"
              : "Belajar Sains dalam Bahasa Malaysia"
          }
          dlpDescription={
            subject === "math"
              ? "Learn Mathematics in English (DLP)"
              : "Learn Science in English (DLP)"
          }
          onBack={() => {
            setChapter(null);
            void navigate({
              search: (previous: Record<string, unknown>) => ({
                ...previous,
                subject: undefined,
              }),
            });
          }}
        />
      ) : !activeChapterKey ? (
        <>
          {isBilingualSubject && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <ChapterGrid
            subjectId={subject}
            scienceLang={activeScienceLang}
            onSelect={(key) => {
              setChapter(key);
            }}
            onBack={() => {
              setChapter(null);
              void navigate({
                search: (previous: Record<string, unknown>) => ({
                  ...previous,
                  subject: undefined,
                }),
              });
            }}
          />
        </>
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={activeChapterKey}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          onBack={() => setChapter(null)}
        />
      ) : hasSubtopics ? (
        <SubtopicView
          subjectId={subject}
          chapterKey={activeChapterKey}
          subtopics={subtopics}
          chapterContent={activeChapter}
          isRead={isRead}
          onMarkRead={() => markChapter(subject, activeChapterKey, "read")}
          onBack={() => setChapter(null)}
        />
      ) : (
        <>
          <ContentHeader
            subjectId={subject}
            chapterKey={activeChapterKey}
            scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
            onBack={() => setChapter(null)}
          />

          <ChapterFeatureBar features={visibleFeatures} onJump={jumpTo} />

          {activeChapter?.video && <VideoBlock id="video" video={activeChapter.video} />}
          {activeChapter?.mindMap && (
            <MindMapBlock
              id="mindMap"
              data={activeChapter.mindMap.data}
              title={activeChapter.mindMap.title}
            />
          )}
          {activeChapter?.notes && <NotesBlock id="notes" notes={activeChapter.notes} />}

          {filtered.length === 0 ? (
            !activeChapter?.notes &&
            !activeChapter?.mindMap &&
            !activeChapter?.video && (
              <p className="text-center text-muted-foreground py-20">
                {subject === "math"
                  ? "Content Coming Soon"
                  : "More content for this chapter is coming soon."}
              </p>
            )
          ) : (
            <>
              {!activeChapter?.notes && <NotesBlock id="notes" sections={legacyNoteSections} />}

              <div className="mt-10 flex justify-center animate-fade-up">
                <button
                  onClick={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                  disabled={isRead}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                    isRead
                      ? "bg-emerald-500/20 text-emerald-200 cursor-default"
                      : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
                  }`}
                >
                  <BookOpenCheck className="w-4 h-4" />
                  {isRead ? "Marked as read ✓" : "Mark as Read"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

function SubtopicView({
  subjectId,
  chapterKey,
  subtopics,
  chapterContent,
  isRead,
  onMarkRead,
  onBack,
}: {
  subjectId: string;
  chapterKey: string;
  subtopics: Subtopic[];
  chapterContent: ReturnType<typeof getChapter>;
  isRead: boolean;
  onMarkRead: () => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapterLabel =
    getSubjectChapters(subjectId).find((c) => c.key === chapterKey)?.label ?? chapterKey;
  const features = getChapterFeatures(chapterContent);
  const subtopicSections = useMemo<NotesAccordionSection[]>(
    () =>
      subtopics.map((subtopic) => ({
        id: subtopic.key,
        title: `${subtopic.num}. ${subtopic.title}`,
        content: subtopic.summary,
        keywords: subtopic.keywords,
      })),
    [subtopics],
  );

  function jumpTo(key: string) {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to chapters
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {subj?.emoji} {subj?.name} • {chapterLabel}
        </span>
      </div>

      <ChapterFeatureBar features={features} onJump={jumpTo} />

      {chapterContent?.video && <VideoBlock id="video" video={chapterContent.video} />}
      {chapterContent?.mindMap && (
        <MindMapBlock
          id="mindMap"
          data={chapterContent.mindMap.data}
          title={chapterContent.mindMap.title}
        />
      )}

      <NotesBlock id="notes" sections={subtopicSections} />

      <div className="mt-10 flex justify-center">
        <button
          onClick={onMarkRead}
          disabled={isRead}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
            isRead
              ? "bg-emerald-500/20 text-emerald-200 cursor-default"
              : "bg-gradient-to-r from-primary to-accent text-white hover:scale-105"
          }`}
        >
          <BookOpenCheck className="w-4 h-4" />
          {isRead ? "Marked as read ✓" : "Mark chapter as Read"}
        </button>
      </div>
    </div>
  );
}
