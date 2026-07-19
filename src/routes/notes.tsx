import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { notes, getItemChapterKey } from "@/data/content";
import { subjects, type Form } from "@/data/subjects-meta";
import { BookOpenCheck, ArrowLeft, ArrowUp, Compass } from "lucide-react";
import { z } from "zod";
import {
  SubjectGrid,
  FormGrid,
  FormComingSoon,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import { DailyQuote } from "@/components/DailyQuote";
import { useProgress, chapterActivityKey, chapterProgressPct } from "@/hooks/use-progress";
import { getSejarahF1Subtopics, type Subtopic } from "@/data/sejarah-f1-subtopics";
import { getGeographyF1Subtopics } from "@/data/geography-f1-subtopics";
import {
  getChapter,
  getRegisteredSubjectChapters as getSubjectChapters,
  hasFormResourceContent,
  hasResourceContent,
} from "@/content/registry";
import { ChapterContentTabs } from "@/components/notes/ChapterFeatureBar";
import { VideoBlock } from "@/components/notes/VideoBlock";
import { NotesBlock, type NotesAccordionSection } from "@/components/notes/NotesBlock";
import { EnglishNotesBlock } from "@/components/notes/EnglishNotesBlock";
import { Bab7NotesBlock } from "@/components/notes/Bab7NotesBlock";
import { GeoChapter1NotesBlock } from "@/components/notes/GeoChapter1NotesBlock";
import { GeoChapter2NotesBlock } from "@/components/notes/GeoChapter2NotesBlock";
import { GeoChapter3NotesBlock } from "@/components/notes/GeoChapter3NotesBlock";
import { GeoChapter4NotesBlock } from "@/components/notes/GeoChapter4NotesBlock";
import { GeoChapter5NotesBlock } from "@/components/notes/GeoChapter5NotesBlock";
import { GeoChapter6NotesBlock } from "@/components/notes/GeoChapter6NotesBlock";
import { GeoChapter7NotesBlock } from "@/components/notes/GeoChapter7NotesBlock";
import { GeoChapter8NotesBlock } from "@/components/notes/GeoChapter8NotesBlock";
import { GeoChapter9NotesBlock } from "@/components/notes/GeoChapter9NotesBlock";
import { GeoChapter10NotesBlock } from "@/components/notes/GeoChapter10NotesBlock";
import { GeoChapter11NotesBlock } from "@/components/notes/GeoChapter11NotesBlock";
import { GeoChapter12NotesBlock } from "@/components/notes/GeoChapter12NotesBlock";
import { GeoChapter13NotesBlock } from "@/components/notes/GeoChapter13NotesBlock";
import { SejChapter1NotesBlock } from "@/components/notes/SejChapter1NotesBlock";
import { SejChapter2NotesBlock } from "@/components/notes/SejChapter2NotesBlock";
import { SejChapter3NotesBlock } from "@/components/notes/SejChapter3NotesBlock";
import { SejChapter4NotesBlock } from "@/components/notes/SejChapter4NotesBlock";
import { SejChapter5NotesBlock } from "@/components/notes/SejChapter5NotesBlock";
import { SejChapter6NotesBlock } from "@/components/notes/SejChapter6NotesBlock";
import { SejChapter7NotesBlock } from "@/components/notes/SejChapter7NotesBlock";
import { SejChapter8NotesBlock } from "@/components/notes/SejChapter8NotesBlock";
import { Sej2Chapter1NotesBlock } from "@/components/notes/Sej2Chapter1NotesBlock";
import { Sej2Chapter2NotesBlock } from "@/components/notes/Sej2Chapter2NotesBlock";
import { Sej2Chapter3NotesBlock } from "@/components/notes/Sej2Chapter3NotesBlock";
import { Sej2Chapter4NotesBlock } from "@/components/notes/Sej2Chapter4NotesBlock";
import { Sej2Chapter5NotesBlock } from "@/components/notes/Sej2Chapter5NotesBlock";
import { Sej2Chapter6NotesBlock } from "@/components/notes/Sej2Chapter6NotesBlock";
import { Sej2Chapter7NotesBlock } from "@/components/notes/Sej2Chapter7NotesBlock";
import { Sej2Chapter8NotesBlock } from "@/components/notes/Sej2Chapter8NotesBlock";
import { Sej2Chapter9NotesBlock } from "@/components/notes/Sej2Chapter9NotesBlock";
import { Sej2Chapter10NotesBlock } from "@/components/notes/Sej2Chapter10NotesBlock";
import { Chapter1NotesBlock } from "@/components/notes/Chapter1NotesBlock";
import { Chapter2NotesBlock } from "@/components/notes/Chapter2NotesBlock";
import { Chapter3NotesBlock } from "@/components/notes/Chapter3NotesBlock";
import { Chapter4NotesBlock } from "@/components/notes/Chapter4NotesBlock";
import { Chapter5NotesBlock } from "@/components/notes/Chapter5NotesBlock";
import { Chapter6NotesBlock } from "@/components/notes/Chapter6NotesBlock";
import { Chapter8NotesBlock } from "@/components/notes/Chapter8NotesBlock";
import { Chapter9NotesBlock } from "@/components/notes/Chapter9NotesBlock";
import {
  MiniInvestigation,
  ScienceDiscoveryChapterHeader,
} from "@/components/science/ScienceDiscoveryChrome";
import { normalizeChapterParam, normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";
import {
  AcademyHero,
  AcademyPageShell,
  SubjectWorldBanner,
  type SubjectPlanetId,
} from "@/components/AcademyPage";
import { SubjectWorldPage } from "@/components/SubjectWorldPage";
import { NotesLanding } from "@/components/notes/NotesLanding";
import { BMWorldPage } from "@/components/BMWorldPage";
import { BMForm2WorldPage } from "@/components/BMForm2WorldPage";
import { BMForm3WorldPage } from "@/components/BMForm3WorldPage";
import geographyArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 10_59_37 AM.png";
import bmArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_00_15 AM.png";
import englishArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_00_47 AM.png";
import scienceArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_01_08 AM.png";
import sejarahArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_01_37 AM.png";
import mathArtwork from "@/assets/subjects/ChatGPT Image Jun 27, 2026, 11_02_06 AM.png";
import { seoMeta, breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";
import { subjectSeoName, subjectSeoKeywords } from "@/lib/subject-seo";



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
  chapter: z.preprocess(
    (value) => (value == null || value === "" ? undefined : String(value)),
    z.string().optional(),
  ),
});

export const Route = createFileRoute("/notes")({
  validateSearch: searchSchema,
  head: ({ match }) => {
    const subjectName = subjectSeoName(match.search.subject);
    const title = subjectName ? `${subjectName} Notes — KSSM Form 1-3` : "KSSM Notes — Form 1-3 Summary Notes";
    const description = subjectName
      ? `${subjectName} KSSM notes for Form 1-3 — clear, exam-focused summaries with highlighted key points.`
      : "Bite-sized KSSM notes by subject, form, and chapter — Science, Math, English, Bahasa Melayu, Sejarah and Geografi for Form 1-3.";
    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Notes", path: "/notes" },
    ];
    if (subjectName) crumbs.push({ name: subjectName, path: `/notes?subject=${match.search.subject}` });
    return seoMeta({
      title,
      description,
      path: "/notes",
      keywords: ["KSSM notes", "Form 1 notes", "Form 2 notes", "Form 3 notes", ...subjectSeoKeywords(match.search.subject)],
      jsonLd: [
        courseJsonLd({
          name: subjectName ? `${subjectName} KSSM Notes (Form 1-3)` : "KSSM Notes — Form 1-3",
          description,
          path: subjectName ? `/notes?subject=${match.search.subject}` : "/notes",
          subjectName: subjectName ?? undefined,
        }),
        breadcrumbJsonLd(crumbs),
      ],
    });
  },

  component: NotesPage,
});

const SUBJECT_ARTWORK: Record<string, string> = {
  geography: geographyArtwork,
  bm: bmArtwork,
  english: englishArtwork,
  science: scienceArtwork,
  sejarah: sejarahArtwork,
  math: mathArtwork,
};

function getSubjectArtwork(subjectId: string) {
  return SUBJECT_ARTWORK[subjectId] ?? null;
}

function SubjectFeatureArtwork({
  subjectId,
  src,
}: {
  subjectId: string;
  src: string | null;
}) {
  if (!src) return null;

  const subjectName = subjects.find((item) => item.id === subjectId)?.name ?? subjectId;

  return (
    <div className="mb-4 overflow-hidden rounded-[1.6rem] border border-white/10 bg-card/55 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl animate-fade-up">
      <div className="pointer-events-none absolute inset-x-6 top-4 h-20 rounded-full bg-gradient-to-r from-primary/16 via-accent/14 to-primary/10 blur-3xl" />
      <img
        src={src}
        alt={`${subjectName} chapter artwork`}
        className="relative block h-32 w-full object-cover object-center sm:h-40"
        loading="lazy"
      />
    </div>
  );
}


function NotesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const normalizedSubject = normalizeSubjectParam(search.subject);
  const normalizedChapter = normalizeChapterParam(search.chapter);
  const subject =
    normalizedSubject && subjects.some((s) => s.id === normalizedSubject)
      ? normalizedSubject
      : null;
  const [chapter, setChapter] = useState<string | null>(normalizedChapter);
  const form = normalizeFormParam(search.form) as Form;
  const hasSelectedForm = search.form != null;
  const [scrollPct, setScrollPct] = useState(0);
  const { progress, markChapter, setLastVisited } = useProgress();
  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const isBilingualSubject = subject === "science" || subject === "math";
  const needsScienceLang = isBilingualSubject && !scienceLang;

  const activeScienceLang = isBilingualSubject ? (scienceLang ?? undefined) : undefined;
  const subjectChapters = subject ? getSubjectChapters(subject, activeScienceLang, form) : [];
  const activeChapterKey =
    chapter && subjectChapters.some((candidate) => candidate.key === chapter) ? chapter : null;
  const activeChapter =
    subject && activeChapterKey
      ? (getChapter(subject, activeChapterKey, activeScienceLang, form) ?? undefined)
      : undefined;
  const hasSubtopics =
    form === "Form 1" &&
    (subject === "sejarah" || subject === "geography") &&
    !!activeChapterKey &&
    !activeChapter?.geoChapter1Data &&
    !activeChapter?.geoChapter2Data &&
    !activeChapter?.geoChapter3Data &&
    !activeChapter?.geoChapter4Data &&
    !activeChapter?.geoChapter5Data &&
    !activeChapter?.geoChapter6Data &&
    !activeChapter?.geoChapter7Data &&
    !activeChapter?.geoChapter8Data &&
    !activeChapter?.geoChapter9Data &&
    !activeChapter?.geoChapter10Data &&
    !activeChapter?.geoChapter11Data &&
    !activeChapter?.geoChapter12Data &&
    !activeChapter?.geoChapter13Data &&
    !activeChapter?.sejChapter1Data &&
    !activeChapter?.sejChapter2Data &&
    !activeChapter?.sejChapter3Data &&
    !activeChapter?.sejChapter4Data &&
    !activeChapter?.sejChapter5Data &&
    !activeChapter?.sejChapter6Data &&
    !activeChapter?.sejChapter7Data &&
    !activeChapter?.sejChapter8Data;
  const subtopics: Subtopic[] = hasSubtopics
    ? subject === "sejarah"
      ? getSejarahF1Subtopics(activeChapterKey ?? "")
      : getGeographyF1Subtopics(activeChapterKey ?? "")
    : [];

  const chapterMeta =
    subject && activeChapterKey
      ? subjectChapters.find((candidate) => candidate.key === activeChapterKey)
      : null;
  const missingChapter = !!(subject && chapter && !activeChapterKey);
  const isRead =
    subject && activeChapterKey
      ? !!progress.chapterActivity[chapterActivityKey(subject, activeChapterKey)]?.read
      : false;
  const isScienceDiscovery = subject === "science" && form === "Form 1" && !!activeChapterKey;
  const activeChapterProgress =
    subject && activeChapterKey
      ? chapterProgressPct(progress.chapterActivity[chapterActivityKey(subject, activeChapterKey)])
      : 0;
  const planetSubjectId = (subject ?? undefined) as SubjectPlanetId | undefined;
  const chapterArtwork = subject ? getSubjectArtwork(subject) : null;


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
    setChapter(normalizedChapter);
    setScrollPct(0);
  }, [subject, form, normalizedChapter]);

  const filtered = useMemo(() => {
    if (!subject || !activeChapterKey) return [];
    return notes.filter((n) => {
      if (n.subjectId !== subject) return false;
      if (getItemChapterKey(n) !== activeChapterKey) return false;
      if (n.form !== form) return false;
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
  const hasNotesContent =
    !!subject &&
    !!activeChapterKey &&
    (hasResourceContent(subject, form, activeChapterKey, "notes", activeScienceLang) ||
      legacyNoteSections.length > 0);
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToOverview() {
    const el = document.getElementById("chapter-overview");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else scrollToTop();
  }

  function selectChapter(key: string | null) {
    setChapter(key);
    void navigate({
      search: (previous: Record<string, unknown>) => ({
        ...previous,
        subject: subject ?? undefined,
        form: Number(form.replace("Form ", "")),
        chapter: key ?? undefined,
      }),
    });
  }

  // ── BM has its own hub page ───────────────────────────────────────────────
  if (subject && !hasSelectedForm && !activeChapterKey) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <FormGrid
          subjectId={subject}
          mode="notes"
          onSelect={(selectedForm) => {
            setChapter(null);
            void navigate({
              search: (previous: Record<string, unknown>) => ({
                ...previous,
                subject,
                form: Number(selectedForm.replace("Form ", "")),
                chapter: undefined,
              }),
            });
          }}
          onBack={() => {
            setChapter(null);
            void navigate({
              search: (previous: Record<string, unknown>) => ({
                ...previous,
                subject: undefined,
                form: undefined,
                chapter: undefined,
              }),
            });
          }}
        />
      </AcademyPageShell>
    );
  }

  if (subject === "bm" && form === "Form 2" && !activeChapterKey) {
    return (
      <BMForm2WorldPage
        onBack={() => {
          setChapter(null);
          void navigate({
            search: (previous: Record<string, unknown>) => ({ ...previous, subject: undefined }),
          });
        }}
      />
    );
  }

  if (subject === "bm" && form === "Form 3" && !activeChapterKey) {
    return (
      <BMForm3WorldPage
        onBack={() => {
          setChapter(null);
          void navigate({
            search: (previous: Record<string, unknown>) => ({ ...previous, subject: undefined }),
          });
        }}
      />
    );
  }

  if (
    subject &&
    (form === "Form 2" || form === "Form 3") &&
    !hasFormResourceContent(subject, form, "notes", activeScienceLang) &&
    !needsScienceLang
  ) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <FormComingSoon
          subjectId={subject}
          form={form}
          onBack={() => {
            setChapter(null);
            void navigate({
              search: (previous: Record<string, unknown>) => ({
                ...previous,
                form: undefined,
                chapter: undefined,
              }),
            });
          }}
        />
      </AcademyPageShell>
    );
  }

  if (subject === "bm" && form === "Form 1" && !activeChapterKey) {
    return (
      <BMWorldPage
        onBack={() => {
          setChapter(null);
          void navigate({
            search: (previous: Record<string, unknown>) => ({ ...previous, subject: undefined }),
          });
        }}
      />
    );
  }

  // ── Subject World early-return — replaces AcademyPageShell entirely ──────
  if (subject && !needsScienceLang && !activeChapterKey && !missingChapter) {
    return (
      <SubjectWorldPage
        subjectId={subject}
        form={form}
        scienceLang={scienceLang ?? undefined}
        isBilingualSubject={isBilingualSubject}
        onSelectChapter={(key) => {
          selectChapter(key);
          if (setLastVisited) {
            const chapMeta = getSubjectChapters(subject, activeScienceLang, form).find(
              (c) => c.key === key,
            );
            setLastVisited({
              subjectId: subject,
              chapterKey: key,
              type: "notes",
              label: chapMeta?.label ?? key,
              timestamp: Date.now(),
              form,
            });
          }
        }}
        onBack={() => {
          setChapter(null);
          void navigate({
            search: (previous: Record<string, unknown>) => ({ ...previous, subject: undefined }),
          });
        }}
        onChangeLang={isBilingualSubject ? () => setScienceLang(null) : undefined}
      />
    );
  }

  return (
    <AcademyPageShell subjectId={planetSubjectId}>
      {/* Reading progress bar */}
      {subject && activeChapterKey && (
        <div className="fixed top-0 left-0 right-0 h-1 z-40 bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-nova-yellow transition-all"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      )}

      {/* Focus-mode wayfinding: lets a student get back to the top or the
          chapter overview without hunting for a scrollbar. */}
      {subject && activeChapterKey && scrollPct > 8 && (
        <div className="fixed bottom-[calc(var(--mobile-content-bottom)+1rem)] right-4 z-[70] flex flex-col gap-2 sm:bottom-6">
          <button
            type="button"
            onClick={scrollToOverview}
            title="Back to chapter overview"
            aria-label="Back to chapter overview"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0B1220]/90 text-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-white"
          >
            <Compass className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollToTop}
            title="Back to top"
            aria-label="Back to top"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0B1220]/90 text-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* On the landing view (no subject selected) we render the redesigned
          Notes hub instead of the generic AcademyHero + inline preview cards.
          The AcademyHero + DailyQuote stack still shows when a subject is
          picked so downstream chapter views keep their existing chrome. */}
      {!subject && (
        <NotesLanding
          progress={progress}
          onSelectSubject={(id) => {
            setChapter(null);
            void navigate({
              search: (previous: Record<string, unknown>) => ({
                ...previous,
                subject: id,
                form: undefined,
                chapter: undefined,
              }),
            });
          }}
          onContinueReading={(subjectId, chapterKey, form) => {
            setChapter(chapterKey);
            void navigate({
              search: (previous: Record<string, unknown>) => ({
                ...previous,
                subject: subjectId,
                form: Number(form.replace("Form ", "")),
                chapter: chapterKey,
              }),
            });
          }}
        />
      )}

      {subject && (
        <>
          <AcademyHero
            eyebrow="Smart revision"
            title="Summary"
            gradientTitle="Notes"
            description="Quick, focused notes that get you ready in minutes."
            illustration="notes"
            stats={[
              {
                label: "Reading Progress",
                value: activeChapterKey ? `${Math.round(scrollPct)}%` : "Ready",
              },
              {
                label: "Chapters Completed",
                value: Object.values(progress.chapterActivity).filter((activity) => activity.read)
                  .length,
              },
              { label: "Study Mode", value: activeChapterKey ? "Chapter" : "Explore" },
            ]}
          />
          <div className="mb-7 flex justify-center">
            <DailyQuote />
          </div>
        </>
      )}

      {!subject ? null : needsScienceLang ? (
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
      ) : missingChapter ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-muted-foreground">Chapter not found. Please choose another chapter.</p>
          <button
            type="button"
            onClick={() => setChapter(null)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back to chapters
          </button>
        </div>
      ) : !activeChapterKey ? (
        <>
          <SubjectWorldBanner subjectId={subject as SubjectPlanetId} />
          {isBilingualSubject && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <ChapterGrid
            subjectId={subject}
            scienceLang={activeScienceLang}
            form={form}
            onSelect={(key) => {
              selectChapter(key);
              if (subject && setLastVisited) {
                const chapMeta = getSubjectChapters(subject, activeScienceLang, form).find(
                  (c) => c.key === key,
                );
                setLastVisited({
                  subjectId: subject,
                  chapterKey: key,
                  type: "notes",
                  label: chapMeta?.label ?? key,
                  timestamp: Date.now(),
                  form,
                });
              }
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
      ) : chapterMeta && !hasNotesContent ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={activeChapterKey}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          form={form}
          mode="notes"
          onBack={() => selectChapter(null)}
        />
      ) : hasSubtopics ? (
        <SubtopicView
          subjectId={subject}
          chapterKey={activeChapterKey}
          subtopics={subtopics}
          chapterContent={activeChapter}
          form={form}
          scienceLang={activeScienceLang}
          isRead={isRead}
          onMarkRead={() => markChapter(subject, activeChapterKey, "read")}
          onBack={() => selectChapter(null)}
        />
      ) : (
        <>
          <div id="chapter-overview">
            <ContentHeader
              subjectId={subject}
              chapterKey={activeChapterKey}
              scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
              form={form}
              onBack={() => selectChapter(null)}
            />

            {subject && chapterArtwork && (
              <SubjectFeatureArtwork subjectId={subject} src={chapterArtwork} />
            )}
            <ChapterContentTabs
              subjectId={subject}
              form={form}
              chapterKey={activeChapterKey}
              scienceLang={activeScienceLang}
              currentContentType="notes"
            />
          </div>

          {activeChapter?.video && <VideoBlock id="video" video={activeChapter.video} />}
          <div className={isScienceDiscovery ? "science-discovery-notes" : undefined}>
          {isScienceDiscovery && (
            <ScienceDiscoveryChapterHeader
              chapterKey={activeChapterKey}
              title={chapterMeta?.label ?? activeChapter?.title ?? activeChapterKey}
              lang={scienceLang === "bm" ? "bm" : "dlp"}
              readingProgress={scrollPct}
              chapterProgress={activeChapterProgress}
              isRead={isRead}
              embedded
            />
          )}
          {activeChapter?.sejChapter1Data ? (
            <SejChapter1NotesBlock
              id="notes"
              content={activeChapter.sejChapter1Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sejChapter2Data ? (
            <SejChapter2NotesBlock
              id="notes"
              content={activeChapter.sejChapter2Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sejChapter3Data ? (
            <SejChapter3NotesBlock
              id="notes"
              content={activeChapter.sejChapter3Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sejChapter4Data ? (
            <SejChapter4NotesBlock
              id="notes"
              content={activeChapter.sejChapter4Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sejChapter5Data ? (
            <SejChapter5NotesBlock
              id="notes"
              content={activeChapter.sejChapter5Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sejChapter6Data ? (
            <SejChapter6NotesBlock
              id="notes"
              content={activeChapter.sejChapter6Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sejChapter7Data ? (
            <SejChapter7NotesBlock
              id="notes"
              content={activeChapter.sejChapter7Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sejChapter8Data ? (
            <SejChapter8NotesBlock
              id="notes"
              content={activeChapter.sejChapter8Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter1Data ? (
            <Sej2Chapter1NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter1Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter2Data ? (
            <Sej2Chapter2NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter2Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter3Data ? (
            <Sej2Chapter3NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter3Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter4Data ? (
            <Sej2Chapter4NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter4Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter5Data ? (
            <Sej2Chapter5NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter5Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter6Data ? (
            <Sej2Chapter6NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter6Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter7Data ? (
            <Sej2Chapter7NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter7Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter8Data ? (
            <Sej2Chapter8NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter8Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter9Data ? (
            <Sej2Chapter9NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter9Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.sej2Chapter10Data ? (
            <Sej2Chapter10NotesBlock
              id="notes"
              content={activeChapter.sej2Chapter10Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter1Data ? (
            <GeoChapter1NotesBlock
              id="notes"
              content={activeChapter.geoChapter1Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter2Data ? (
            <GeoChapter2NotesBlock
              id="notes"
              content={activeChapter.geoChapter2Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter3Data ? (
            <GeoChapter3NotesBlock
              id="notes"
              content={activeChapter.geoChapter3Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter4Data ? (
            <GeoChapter4NotesBlock
              id="notes"
              content={activeChapter.geoChapter4Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter5Data ? (
            <GeoChapter5NotesBlock
              id="notes"
              content={activeChapter.geoChapter5Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter6Data ? (
            <GeoChapter6NotesBlock
              id="notes"
              content={activeChapter.geoChapter6Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter7Data ? (
            <GeoChapter7NotesBlock
              id="notes"
              content={activeChapter.geoChapter7Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter8Data ? (
            <GeoChapter8NotesBlock
              id="notes"
              content={activeChapter.geoChapter8Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter9Data ? (
            <GeoChapter9NotesBlock
              id="notes"
              content={activeChapter.geoChapter9Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter10Data ? (
            <GeoChapter10NotesBlock
              id="notes"
              content={activeChapter.geoChapter10Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter11Data ? (
            <GeoChapter11NotesBlock
              id="notes"
              content={activeChapter.geoChapter11Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter12Data ? (
            <GeoChapter12NotesBlock
              id="notes"
              content={activeChapter.geoChapter12Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.geoChapter13Data ? (
            <GeoChapter13NotesBlock
              id="notes"
              content={activeChapter.geoChapter13Data}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.bab7Data ? (
            <Bab7NotesBlock
              id="science-notes-content"
              content={activeChapter.bab7Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter1Data ? (
            <Chapter1NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter1Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter2Data ? (
            <Chapter2NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter2Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter3Data ? (
            <Chapter3NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter3Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter4Data ? (
            <Chapter4NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter4Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter5Data ? (
            <Chapter5NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter5Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter6Data ? (
            <Chapter6NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter6Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter8Data ? (
            <Chapter8NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter8Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : activeChapter?.chapter9Data ? (
            <Chapter9NotesBlock
              id="science-notes-content"
              content={activeChapter.chapter9Data}
              lang={isBilingualSubject ? (scienceLang === "dlp" ? "en" : "bm") : "en"}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              isRead={isRead}
              onMarkRead={() =>
                subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
              }
            />
          ) : subject === "english" && activeChapter?.englishData ? (
            <EnglishNotesBlock
              id="notes"
              data={activeChapter.englishData}
              storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
              form={form}
            />
          ) : (
            activeChapter?.notes && (
              <NotesBlock
                id="notes"
                notes={activeChapter.notes}
                subjectId={subject ?? undefined}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                defaultOpenFirstSection={activeChapter.id !== "sejarah-f2-c1"}
              />
            )
          )}

          {isScienceDiscovery && (
            <MiniInvestigation lang={scienceLang === "bm" ? "bm" : "en"} />
          )}
          </div>

          {filtered.length === 0 ? (
            !activeChapter?.geoChapter1Data &&
            !activeChapter?.geoChapter2Data &&
            !activeChapter?.geoChapter3Data &&
            !activeChapter?.geoChapter4Data &&
            !activeChapter?.geoChapter5Data &&
            !activeChapter?.geoChapter6Data &&
            !activeChapter?.geoChapter7Data &&
            !activeChapter?.geoChapter8Data &&
            !activeChapter?.geoChapter9Data &&
            !activeChapter?.geoChapter10Data &&
            !activeChapter?.geoChapter11Data &&
            !activeChapter?.geoChapter12Data &&
            !activeChapter?.geoChapter13Data &&
            !activeChapter?.sejChapter1Data &&
            !activeChapter?.sejChapter2Data &&
            !activeChapter?.sejChapter3Data &&
            !activeChapter?.sejChapter4Data &&
            !activeChapter?.sejChapter5Data &&
            !activeChapter?.sejChapter6Data &&
            !activeChapter?.sejChapter7Data &&
            !activeChapter?.sejChapter8Data &&
            !activeChapter?.sej2Chapter1Data &&
            !activeChapter?.sej2Chapter2Data &&
            !activeChapter?.sej2Chapter3Data &&
            !activeChapter?.sej2Chapter4Data &&
            !activeChapter?.sej2Chapter5Data &&
            !activeChapter?.sej2Chapter6Data &&
            !activeChapter?.sej2Chapter7Data &&
            !activeChapter?.sej3Chapter1Data &&
            !activeChapter?.sej3Chapter2Data &&
            !activeChapter?.sej3Chapter3Data &&
            !activeChapter?.sej3Chapter4Data &&
            !activeChapter?.bab7Data &&
            !activeChapter?.chapter1Data &&
            !activeChapter?.chapter2Data &&
            !activeChapter?.chapter3Data &&
            !activeChapter?.chapter4Data &&
            !activeChapter?.chapter5Data &&
            !activeChapter?.chapter6Data &&
            !activeChapter?.chapter8Data &&
            !activeChapter?.chapter9Data &&
            !activeChapter?.englishData &&
            !activeChapter?.notes &&
            !activeChapter?.video && (
              <p className="text-center text-muted-foreground py-20">
                {subject === "math"
                  ? "Content Coming Soon"
                  : "More content for this chapter is coming soon."}
              </p>
            )
          ) : (
            <>
              {!activeChapter?.geoChapter1Data &&
                !activeChapter?.geoChapter2Data &&
                !activeChapter?.geoChapter3Data &&
                !activeChapter?.geoChapter4Data &&
                !activeChapter?.geoChapter5Data &&
                !activeChapter?.geoChapter6Data &&
                !activeChapter?.geoChapter7Data &&
                !activeChapter?.geoChapter8Data &&
                !activeChapter?.geoChapter9Data &&
                !activeChapter?.geoChapter10Data &&
                !activeChapter?.geoChapter11Data &&
                !activeChapter?.geoChapter12Data &&
                !activeChapter?.geoChapter13Data &&
                !activeChapter?.sejChapter1Data &&
                !activeChapter?.sejChapter2Data &&
                !activeChapter?.sejChapter3Data &&
                !activeChapter?.sejChapter4Data &&
                !activeChapter?.sejChapter5Data &&
                !activeChapter?.sejChapter6Data &&
                !activeChapter?.sejChapter7Data &&
                !activeChapter?.sejChapter8Data &&
                !activeChapter?.bab7Data &&
                !activeChapter?.chapter1Data &&
                !activeChapter?.chapter2Data &&
                !activeChapter?.chapter3Data &&
                !activeChapter?.chapter4Data &&
                !activeChapter?.chapter5Data &&
                !activeChapter?.chapter6Data &&
                !activeChapter?.chapter8Data &&
                !activeChapter?.chapter9Data &&
                !activeChapter?.englishData &&
                !activeChapter?.notes && (
                <NotesBlock
                  id="notes"
                  sections={legacyNoteSections}
                  subjectId={subject ?? undefined}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                />
              )}

              {!activeChapter?.geoChapter1Data &&
                !activeChapter?.geoChapter2Data &&
                !activeChapter?.geoChapter3Data &&
                !activeChapter?.geoChapter4Data &&
                !activeChapter?.geoChapter5Data &&
                !activeChapter?.geoChapter6Data &&
                !activeChapter?.geoChapter7Data &&
                !activeChapter?.geoChapter8Data &&
                !activeChapter?.geoChapter9Data &&
                !activeChapter?.geoChapter10Data &&
                !activeChapter?.geoChapter11Data &&
                !activeChapter?.geoChapter12Data &&
                !activeChapter?.geoChapter13Data &&
                !activeChapter?.sejChapter1Data &&
                !activeChapter?.sejChapter2Data &&
                !activeChapter?.sejChapter3Data &&
                !activeChapter?.sejChapter4Data &&
                !activeChapter?.sejChapter5Data &&
                !activeChapter?.sejChapter6Data &&
                !activeChapter?.sejChapter7Data &&
                !activeChapter?.sejChapter8Data &&
                !activeChapter?.bab7Data &&
                !activeChapter?.chapter1Data &&
                !activeChapter?.chapter2Data &&
                !activeChapter?.chapter3Data &&
                !activeChapter?.chapter4Data &&
                !activeChapter?.chapter5Data &&
                !activeChapter?.chapter6Data &&
                !activeChapter?.chapter8Data &&
                !activeChapter?.chapter9Data && (
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
              )}
            </>
          )}
        </>
      )}
    </AcademyPageShell>
  );
}

function SubtopicView({
  subjectId,
  chapterKey,
  subtopics,
  chapterContent,
  form,
  scienceLang,
  isRead,
  onMarkRead,
  onBack,
}: {
  subjectId: string;
  chapterKey: string;
  subtopics: Subtopic[];
  chapterContent: ReturnType<typeof getChapter>;
  form: Form;
  scienceLang?: "bm" | "dlp";
  isRead: boolean;
  onMarkRead: () => void;
  onBack: () => void;
}) {
  const subj = subjects.find((s) => s.id === subjectId);
  const chapterLabel =
    getSubjectChapters(subjectId).find((c) => c.key === chapterKey)?.label ?? chapterKey;
  const subtopicSections = useMemo<NotesAccordionSection[]>(
    () =>
      (Array.isArray(subtopics) ? subtopics : []).map((subtopic) => ({
        id: subtopic.key,
        title: `${subtopic.num}. ${subtopic.title}`,
        content: subtopic.summary,
        keywords: subtopic.keywords,
      })),
    [subtopics],
  );
  const [showWayfinding, setShowWayfinding] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowWayfinding(window.scrollY > 320);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToOverview() {
    document.getElementById("chapter-overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="animate-fade-up">
      {showWayfinding && (
        <div className="fixed bottom-[calc(var(--mobile-content-bottom)+1rem)] right-4 z-[70] flex flex-col gap-2 sm:bottom-6">
          <button
            type="button"
            onClick={scrollToOverview}
            title="Back to chapter overview"
            aria-label="Back to chapter overview"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0B1220]/90 text-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-white"
          >
            <Compass className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollToTop}
            title="Back to top"
            aria-label="Back to top"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0B1220]/90 text-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      )}
      <div id="chapter-overview">
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

        {subj && <SubjectFeatureArtwork subjectId={subjectId} src={getSubjectArtwork(subjectId)} />}
        <ChapterContentTabs
          subjectId={subjectId}
          form={form}
          chapterKey={chapterKey}
          scienceLang={scienceLang}
          currentContentType="notes"
        />

      </div>

      {chapterContent?.video && <VideoBlock id="video" video={chapterContent.video} />}
      <NotesBlock
        id="notes"
        sections={subtopicSections}
        subjectId={subjectId}
        storageKey={`notes:${subjectId}:${chapterKey}:study-notes`}
      />

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
