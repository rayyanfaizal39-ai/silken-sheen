import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
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
import { useNotesProgressScope, useNotesReadingTracker } from "@/hooks/use-notes-reading-progress";
import { DailyQuote } from "@/components/DailyQuote";
import { useProgress, chapterActivityKey } from "@/hooks/use-progress";
import { getSejarahF1Subtopics, type Subtopic } from "@/data/sejarah-f1-subtopics";
import { getGeographyF1Subtopics } from "@/data/geography-f1-subtopics";
import type { ContentRegistryModule } from "@/hooks/use-content-registry";
import { useContentRegistry, useContentDataModule } from "@/hooks/use-content-registry";
import { ChapterContentTabs } from "@/components/notes/ChapterFeatureBar";
import { NotesContentWithVideo } from "@/components/notes/NotesContentWithVideo";
import { NotesBlock, type NotesAccordionSection } from "@/components/notes/NotesBlock";
import { NotesSummaryHeroGate } from "@/components/notes/NotesSummaryHeroGate";
import { SejarahChapterHero } from "@/components/notes/SejarahChapterHero";
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
import { Sej3Chapter1NotesBlock } from "@/components/notes/Sej3Chapter1NotesBlock";
import { Sej3Chapter2NotesBlock } from "@/components/notes/Sej3Chapter2NotesBlock";
import { Sej3Chapter3NotesBlock } from "@/components/notes/Sej3Chapter3NotesBlock";
import { Sej3Chapter4NotesBlock } from "@/components/notes/Sej3Chapter4NotesBlock";
import { Sej3Chapter5NotesBlock } from "@/components/notes/Sej3Chapter5NotesBlock";
import { Sej3Chapter6NotesBlock } from "@/components/notes/Sej3Chapter6NotesBlock";
import { Sej3Chapter7NotesBlock } from "@/components/notes/Sej3Chapter7NotesBlock";
import { Sej3Chapter8NotesBlock } from "@/components/notes/Sej3Chapter8NotesBlock";
import { ScienceF1Chapter1VisualNotesBlock as Chapter1NotesBlock } from "@/components/notes/ScienceF1Chapter1VisualNotesBlock";
import { ScienceF1Chapter2VisualNotesBlock as Chapter2NotesBlock } from "@/components/notes/ScienceF1Chapter2VisualNotesBlock";
import { ScienceF1Chapter3VisualNotesBlock as Chapter3NotesBlock } from "@/components/notes/ScienceF1Chapter3VisualNotesBlock";
import { Chapter4NotesBlock } from "@/components/notes/Chapter4NotesBlock";
import { Chapter5NotesBlock } from "@/components/notes/Chapter5NotesBlock";
import { Chapter6NotesBlock } from "@/components/notes/Chapter6NotesBlock";
import { Chapter8NotesBlock } from "@/components/notes/Chapter8NotesBlock";
import { Chapter9NotesBlock } from "@/components/notes/Chapter9NotesBlock";
import { MathF1Chapter1NotesBlock } from "@/components/notes/MathF1Chapter1NotesBlock";
import { MathF1Chapter2NotesBlock } from "@/components/notes/MathF1Chapter2NotesBlock";
import { MathF1Chapter3NotesBlock } from "@/components/notes/MathF1Chapter3NotesBlock";
import { MathF1Chapter4NotesBlock } from "@/components/notes/MathF1Chapter4NotesBlock";
import { MathF1Chapter5NotesBlock } from "@/components/notes/MathF1Chapter5NotesBlock";
import { MathF1Chapter6NotesBlock } from "@/components/notes/MathF1Chapter6NotesBlock";
import { MathF1Chapter7NotesBlock } from "@/components/notes/MathF1Chapter7NotesBlock";
import { MathF1Chapter8NotesBlock } from "@/components/notes/MathF1Chapter8NotesBlock";
import { MathF1Chapter9NotesBlock } from "@/components/notes/MathF1Chapter9NotesBlock";
import { MathF1Chapter10NotesBlock } from "@/components/notes/MathF1Chapter10NotesBlock";
import { MathF1Chapter11NotesBlock } from "@/components/notes/MathF1Chapter11NotesBlock";
import { MathF1Chapter12NotesBlock } from "@/components/notes/MathF1Chapter12NotesBlock";
import { MathF1Chapter13NotesBlock } from "@/components/notes/MathF1Chapter13NotesBlock";
import { MathF2Chapter1NotesBlock } from "@/components/notes/MathF2Chapter1NotesBlock";
import { MathF2Chapter2NotesBlock } from "@/components/notes/MathF2Chapter2NotesBlock";
import { MathF2Chapter3NotesBlock } from "@/components/notes/MathF2Chapter3NotesBlock";
import { MathF2Chapter4NotesBlock } from "@/components/notes/MathF2Chapter4NotesBlock";
import { MathF2Chapter5NotesBlock } from "@/components/notes/MathF2Chapter5NotesBlock";
import { MathF2Chapter6NotesBlock } from "@/components/notes/MathF2Chapter6NotesBlock";
import { MathF2Chapter7NotesBlock } from "@/components/notes/MathF2Chapter7NotesBlock";
import { MathF2Chapter8NotesBlock } from "@/components/notes/MathF2Chapter8NotesBlock";
import { MathF2Chapter9NotesBlock } from "@/components/notes/MathF2Chapter9NotesBlock";
import { MathF2Chapter10NotesBlock } from "@/components/notes/MathF2Chapter10NotesBlock";
import { MathF2Chapter11NotesBlock } from "@/components/notes/MathF2Chapter11NotesBlock";
import { MathF2Chapter12NotesBlock } from "@/components/notes/MathF2Chapter12NotesBlock";
import { MathF2Chapter13NotesBlock } from "@/components/notes/MathF2Chapter13NotesBlock";
import { MathF3Chapter1NotesBlock } from "@/components/notes/MathF3Chapter1NotesBlock";
import { MathF3Chapter2NotesBlock } from "@/components/notes/MathF3Chapter2NotesBlock";
import { MathF3Chapter3NotesBlock } from "@/components/notes/MathF3Chapter3NotesBlock";
import { MathF3Chapter4NotesBlock } from "@/components/notes/MathF3Chapter4NotesBlock";
import { MathF3Chapter5NotesBlock } from "@/components/notes/MathF3Chapter5NotesBlock";
import { MathF3Chapter6NotesBlock } from "@/components/notes/MathF3Chapter6NotesBlock";
import { MathF3Chapter7NotesBlock } from "@/components/notes/MathF3Chapter7NotesBlock";
import { MathF3Chapter8NotesBlock } from "@/components/notes/MathF3Chapter8NotesBlock";
import { MathF3Chapter9NotesBlock } from "@/components/notes/MathF3Chapter9NotesBlock";
import { ScienceF2Chapter1NotesBlock } from "@/components/notes/ScienceF2Chapter1NotesBlock";
import { ScienceF2Chapter2NotesBlock } from "@/components/notes/ScienceF2Chapter2NotesBlock";
import { ScienceF2Chapter3NotesBlock } from "@/components/notes/ScienceF2Chapter3NotesBlock";
import { ScienceF2Chapter4NotesBlock } from "@/components/notes/ScienceF2Chapter4NotesBlock";
import { ScienceF2Chapter5NotesBlock } from "@/components/notes/ScienceF2Chapter5NotesBlock";
import { ScienceF2Chapter6NotesBlock } from "@/components/notes/ScienceF2Chapter6NotesBlock";
import { ScienceF2Chapter7NotesBlock } from "@/components/notes/ScienceF2Chapter7NotesBlock";
import { ScienceF2Chapter8NotesBlock } from "@/components/notes/ScienceF2Chapter8NotesBlock";
import { ScienceF2Chapter9NotesBlock } from "@/components/notes/ScienceF2Chapter9NotesBlock";
import { ScienceF2Chapter10NotesBlock } from "@/components/notes/ScienceF2Chapter10NotesBlock";
import { ScienceF2Chapter11NotesBlock } from "@/components/notes/ScienceF2Chapter11NotesBlock";
import { ScienceF2Chapter12NotesBlock } from "@/components/notes/ScienceF2Chapter12NotesBlock";
import { ScienceF2Chapter13NotesBlock } from "@/components/notes/ScienceF2Chapter13NotesBlock";
import { ScienceF3InteractiveNotesBlock } from "@/components/notes/ScienceF3InteractiveNotesBlock";
import { Geo2Chapter1NotesBlock } from "@/components/notes/Geo2Chapter1NotesBlock";
import { Geo2Chapter2NotesBlock } from "@/components/notes/Geo2Chapter2NotesBlock";
import { Geo2Chapter3NotesBlock } from "@/components/notes/Geo2Chapter3NotesBlock";
import { Geo2Chapter4NotesBlock } from "@/components/notes/Geo2Chapter4NotesBlock";
import { Geo2Chapter5NotesBlock } from "@/components/notes/Geo2Chapter5NotesBlock";
import { Geo2Chapter6NotesBlock } from "@/components/notes/Geo2Chapter6NotesBlock";
import { Geo2Chapter7NotesBlock } from "@/components/notes/Geo2Chapter7NotesBlock";
import { Geo2Chapter8NotesBlock } from "@/components/notes/Geo2Chapter8NotesBlock";
import { Geo2Chapter9NotesBlock } from "@/components/notes/Geo2Chapter9NotesBlock";
import { Geo2Chapter10NotesBlock } from "@/components/notes/Geo2Chapter10NotesBlock";
import { Geo3Chapter1NotesBlock } from "@/components/notes/Geo3Chapter1NotesBlock";
import { Geo3Chapter2NotesBlock } from "@/components/notes/Geo3Chapter2NotesBlock";
import { Geo3Chapter3NotesBlock } from "@/components/notes/Geo3Chapter3NotesBlock";
import { Geo3Chapter4NotesBlock } from "@/components/notes/Geo3Chapter4NotesBlock";
import { Geo3Chapter5NotesBlock } from "@/components/notes/Geo3Chapter5NotesBlock";
import { Geo3Chapter6NotesBlock } from "@/components/notes/Geo3Chapter6NotesBlock";
import { Geo3Chapter7NotesBlock } from "@/components/notes/Geo3Chapter7NotesBlock";
import { Geo3Chapter8NotesBlock } from "@/components/notes/Geo3Chapter8NotesBlock";
import { Geo3Chapter9NotesBlock } from "@/components/notes/Geo3Chapter9NotesBlock";
import { Geo3Chapter10NotesBlock } from "@/components/notes/Geo3Chapter10NotesBlock";
import { Geo3Chapter11NotesBlock } from "@/components/notes/Geo3Chapter11NotesBlock";
import {
  MiniInvestigation,
  ScienceDiscoveryChapterHeader,
} from "@/components/science/ScienceDiscoveryChrome";
import {
  normalizeChapterParam,
  normalizeFormParam,
  normalizeSubjectParam,
} from "@/lib/study-routing";
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
    const title = subjectName
      ? `${subjectName} Notes — KSSM Form 1-3`
      : "KSSM Notes — Form 1-3 Summary Notes";
    const description = subjectName
      ? `${subjectName} KSSM notes for Form 1-3 — clear, exam-focused summaries with highlighted key points.`
      : "Bite-sized KSSM notes by subject, form, and chapter — Science, Math, English, Bahasa Melayu, Sejarah and Geografi for Form 1-3.";
    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Notes", path: "/notes" },
    ];
    if (subjectName)
      crumbs.push({ name: subjectName, path: `/notes?subject=${match.search.subject}` });
    return seoMeta({
      title,
      description,
      path: subjectName ? `/notes?subject=${match.search.subject}` : "/notes",
      keywords: [
        "KSSM notes",
        "Form 1 notes",
        "Form 2 notes",
        "Form 3 notes",
        ...subjectSeoKeywords(match.search.subject),
      ],
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

// Form 2 Chapters 2-13 all share the sciF2InteractiveData shape and the same
// reusable ScienceF2InteractiveNotesBlock renderer, but each needs its own
// metaOverride (see F3_SCIENCE_LAB_META below) since their chapter numbers
// would otherwise collide with the Form-1-indexed SCIENCE_LAB_META lookup.
// Only Chapter 3 has been content-audited in detail so far; the rest use a
// conservative shared default until each is audited individually.
const F2_INTERACTIVE_DEFAULT_META = {
  modules: 10,
  minutes: 20,
  experiments: 1,
  difficulty: "Core",
} as const;
const F2_SCIENCE_INTERACTIVE_META: Record<
  number,
  { modules: number; minutes: number; experiments: number; difficulty: string }
> = {
  2: { modules: 11, minutes: 26, experiments: 1, difficulty: "Core" },
  3: { modules: 13, minutes: 30, experiments: 2, difficulty: "Core" },
};

// Form 3 Science Chapters 1-3 reuse the Lab Telemetry hero's Form-1-indexed
// SCIENCE_LAB_META lookup, which would otherwise collide with Form 1's own
// chapters 1-3 stats — same reasoning as ScienceF2 Chapter 1's metaOverride.
const F3_SCIENCE_LAB_META: Record<
  number,
  { modules: number; minutes: number; experiments: number; difficulty: string }
> = {
  1: { modules: 13, minutes: 26, experiments: 3, difficulty: "Core" },
  2: { modules: 14, minutes: 28, experiments: 3, difficulty: "Core" },
  3: { modules: 16, minutes: 30, experiments: 4, difficulty: "Core" },
  4: { modules: 11, minutes: 22, experiments: 3, difficulty: "Core" },
  5: { modules: 6, minutes: 14, experiments: 1, difficulty: "Core" },
  6: { modules: 15, minutes: 30, experiments: 4, difficulty: "Core" },
  7: { modules: 9, minutes: 20, experiments: 2, difficulty: "Core" },
  8: { modules: 12, minutes: 24, experiments: 2, difficulty: "Core" },
  9: { modules: 8, minutes: 18, experiments: 2, difficulty: "Core" },
  10: { modules: 8, minutes: 18, experiments: 2, difficulty: "Core" },
};

function SubjectFeatureArtwork({ subjectId, src }: { subjectId: string; src: string | null }) {
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
  const registry = useContentRegistry();
  const dataModule = useContentDataModule();
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
  const notesProgressScope = useMemo(
    () => (subject ? { subject, form, variant: activeScienceLang } : null),
    [subject, form, activeScienceLang],
  );
  const notesContentRef = useRef<HTMLDivElement>(null);
  const {
    progress: notesProgress,
    loading: notesProgressLoading,
    userId: notesProgressUserId,
    recordProgress: recordNotesProgress,
  } = useNotesProgressScope(notesProgressScope);
  const subjectChapters =
    subject && registry
      ? registry.getRegisteredSubjectChapters(subject, activeScienceLang, form)
      : [];
  const activeChapterKey =
    chapter && subjectChapters.some((candidate) => candidate.key === chapter) ? chapter : null;
  const activeChapter =
    subject && activeChapterKey
      ? (registry?.getChapter(subject, activeChapterKey, activeScienceLang, form) ?? undefined)
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
  const isScienceF2C1 =
    subject === "science" &&
    form === "Form 2" &&
    activeChapterKey === "Chapter 1" &&
    !!activeChapter?.sciF2C1Data;
  // Covers every Form 2 chapter that ships sciF2InteractiveData (Chapters 2-13),
  // not just Chapter 2 — the Science Discovery chrome (header + Mini
  // Investigation) previously excluded Chapters 3-13 purely because this flag
  // was hard-scoped to chapter 2 alone.
  const isScienceF2Interactive =
    subject === "science" && form === "Form 2" && !!activeChapter?.sciF2InteractiveData;
  const isScienceF3Interactive =
    subject === "science" && form === "Form 3" && !!activeChapter?.sciF3InteractiveData;
  const isScienceDiscovery =
    (subject === "science" && form === "Form 1" && !!activeChapterKey) ||
    isScienceF2C1 ||
    isScienceF2Interactive ||
    isScienceF3Interactive;
  const isSejarahChapter = subject === "sejarah" && !!activeChapterKey;
  const activeChapterProgress = activeChapterKey ? (notesProgress[activeChapterKey] ?? 0) : 0;
  const planetSubjectId = (subject ?? undefined) as SubjectPlanetId | undefined;
  const chapterArtwork = subject ? getSubjectArtwork(subject) : null;

  const measuredScrollPct = useNotesReadingTracker({
    contentRef: notesContentRef,
    scope: notesProgressScope,
    chapter: activeChapterKey,
    userId: notesProgressUserId,
    initialProgress: activeChapterProgress,
    onProgress: recordNotesProgress,
  });

  useEffect(() => setScrollPct(measuredScrollPct), [measuredScrollPct]);

  useEffect(() => {
    setChapter(normalizedChapter);
    setScrollPct(0);
  }, [subject, form, normalizedChapter]);

  const filtered = useMemo(() => {
    if (!subject || !activeChapterKey || !dataModule) return [];
    return dataModule.notes.filter((n) => {
      if (n.subjectId !== subject) return false;
      if (dataModule.getItemChapterKey(n) !== activeChapterKey) return false;
      if (n.form !== form) return false;
      if (isBilingualSubject && n.lang && scienceLang && n.lang !== scienceLang) return false;
      return true;
    });
  }, [subject, activeChapterKey, form, scienceLang, isBilingualSubject, dataModule]);

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
    ((!!registry &&
      registry.hasResourceContent(subject, form, activeChapterKey, "notes", activeScienceLang)) ||
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
    !!registry &&
    !registry.hasFormResourceContent(subject, form, "notes", activeScienceLang) &&
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
            const chapMeta = registry
              ?.getRegisteredSubjectChapters(subject, activeScienceLang, form)
              .find((c) => c.key === key);
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
        notesProgress={notesProgress}
        notesProgressLoading={notesProgressLoading}
      />
    );
  }

  return (
    <AcademyPageShell
      subjectId={planetSubjectId}
      rootClassName={
        isSejarahChapter
          ? "sejarah-notes-page"
          : isScienceDiscovery
            ? "science-notes-page"
            : undefined
      }
    >
      {/* Reading progress bar */}
      {subject && activeChapterKey && (
        <div
          className={`fixed top-0 left-0 right-0 h-1 z-40 bg-transparent ${
            isSejarahChapter ? "sejarah-reading-progress" : ""
          }`}
        >
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
          <NotesSummaryHeroGate subjectId={subject} chapterKey={activeChapterKey}>
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
          </NotesSummaryHeroGate>
          {!isSejarahChapter && (
            <div className="mb-7 flex justify-center">
              <DailyQuote />
            </div>
          )}
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
                const chapMeta = registry
                  ?.getRegisteredSubjectChapters(subject, activeScienceLang, form)
                  .find((c) => c.key === key);
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
          notesContentRef={notesContentRef}
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

            {subject && chapterArtwork && !isSejarahChapter && (
              <SubjectFeatureArtwork subjectId={subject} src={chapterArtwork} />
            )}
            {isSejarahChapter && (
              <SejarahChapterHero
                form={form}
                chapterKey={activeChapterKey}
                title={activeChapter?.title ?? chapterMeta?.label ?? activeChapterKey}
                readingProgress={scrollPct}
                chapterProgress={activeChapterProgress}
                isRead={isRead}
              />
            )}
            <ChapterContentTabs
              subjectId={subject}
              form={form}
              chapterKey={activeChapterKey}
              scienceLang={activeScienceLang}
              currentContentType="notes"
            />
          </div>

          <NotesContentWithVideo
            notesContentRef={notesContentRef}
            video={activeChapter?.video}
            videoLang={subject === "science" && scienceLang === "bm" ? "bm" : "en"}
            header={
              isScienceDiscovery ? (
                <ScienceDiscoveryChapterHeader
                  chapterKey={activeChapterKey}
                  title={chapterMeta?.label ?? activeChapter?.title ?? activeChapterKey}
                  lang={scienceLang === "bm" ? "bm" : "dlp"}
                  readingProgress={scrollPct}
                  chapterProgress={activeChapterProgress}
                  isRead={isRead}
                  embedded
                  metaOverride={
                    isScienceF2C1
                      ? { modules: 12, minutes: 22, experiments: 2, difficulty: "Core" }
                      : isScienceF2Interactive
                        ? (F2_SCIENCE_INTERACTIVE_META[
                            activeChapter?.sciF2InteractiveData?.chapter ?? 0
                          ] ?? F2_INTERACTIVE_DEFAULT_META)
                        : isScienceF3Interactive
                          ? F3_SCIENCE_LAB_META[Number(activeChapterKey?.match(/\d+/)?.[0] ?? 1)]
                          : undefined
                  }
                />
              ) : undefined
            }
            className={
              isScienceDiscovery
                ? "science-discovery-notes"
                : isSejarahChapter
                  ? "sejarah-archive-notes"
                  : undefined
            }
          >
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
            ) : activeChapter?.sej3Chapter1Data ? (
              <Sej3Chapter1NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter1Data}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sej3Chapter2Data ? (
              <Sej3Chapter2NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter2Data}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sej3Chapter3Data ? (
              <Sej3Chapter3NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter3Data}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sej3Chapter4Data ? (
              <Sej3Chapter4NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter4Data}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sej3Chapter5Data ? (
              <Sej3Chapter5NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter5Data}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sej3Chapter6Data ? (
              <Sej3Chapter6NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter6Data}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sej3Chapter7Data ? (
              <Sej3Chapter7NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter7Data}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sej3Chapter8Data ? (
              <Sej3Chapter8NotesBlock
                id="notes"
                content={activeChapter.sej3Chapter8Data}
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
            ) : activeChapter?.geoF2InteractiveData ? (
              activeChapter.geoF2InteractiveData.chapter === 1 ? (
                <Geo2Chapter1NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 2 ? (
                <Geo2Chapter2NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 3 ? (
                <Geo2Chapter3NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 4 ? (
                <Geo2Chapter4NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 5 ? (
                <Geo2Chapter5NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 6 ? (
                <Geo2Chapter6NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 7 ? (
                <Geo2Chapter7NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 8 ? (
                <Geo2Chapter8NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF2InteractiveData.chapter === 9 ? (
                <Geo2Chapter9NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : (
                <Geo2Chapter10NotesBlock
                  id="notes"
                  content={activeChapter.geoF2InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              )
            ) : activeChapter?.geoF3InteractiveData ? (
              activeChapter.geoF3InteractiveData.chapter === 1 ? (
                <Geo3Chapter1NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 2 ? (
                <Geo3Chapter2NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 3 ? (
                <Geo3Chapter3NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 4 ? (
                <Geo3Chapter4NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 5 ? (
                <Geo3Chapter5NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 6 ? (
                <Geo3Chapter6NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 7 ? (
                <Geo3Chapter7NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 8 ? (
                <Geo3Chapter8NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 9 ? (
                <Geo3Chapter9NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 10 ? (
                <Geo3Chapter10NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.geoF3InteractiveData.chapter === 11 ? (
                <Geo3Chapter11NotesBlock
                  id="notes"
                  content={activeChapter.geoF3InteractiveData}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : null
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
            ) : activeChapter?.mathChapter1Data ? (
              <MathF1Chapter1NotesBlock
                id="notes"
                content={activeChapter.mathChapter1Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter2Data ? (
              <MathF1Chapter2NotesBlock
                id="notes"
                content={activeChapter.mathChapter2Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter3Data ? (
              <MathF1Chapter3NotesBlock
                id="notes"
                content={activeChapter.mathChapter3Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter4Data ? (
              <MathF1Chapter4NotesBlock
                id="notes"
                content={activeChapter.mathChapter4Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter5Data ? (
              <MathF1Chapter5NotesBlock
                id="notes"
                content={activeChapter.mathChapter5Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter6Data ? (
              <MathF1Chapter6NotesBlock
                id="notes"
                content={activeChapter.mathChapter6Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter7Data ? (
              <MathF1Chapter7NotesBlock
                id="notes"
                content={activeChapter.mathChapter7Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter8Data ? (
              <MathF1Chapter8NotesBlock
                id="notes"
                content={activeChapter.mathChapter8Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter9Data ? (
              <MathF1Chapter9NotesBlock
                id="notes"
                content={activeChapter.mathChapter9Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter10Data ? (
              <MathF1Chapter10NotesBlock
                id="notes"
                content={activeChapter.mathChapter10Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter11Data ? (
              <MathF1Chapter11NotesBlock
                id="notes"
                content={activeChapter.mathChapter11Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter12Data ? (
              <MathF1Chapter12NotesBlock
                id="notes"
                content={activeChapter.mathChapter12Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathChapter13Data ? (
              <MathF1Chapter13NotesBlock
                id="notes"
                content={activeChapter.mathChapter13Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter1Data ? (
              <MathF2Chapter1NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter1Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter2Data ? (
              <MathF2Chapter2NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter2Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter3Data ? (
              <MathF2Chapter3NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter3Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter4Data ? (
              <MathF2Chapter4NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter4Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter5Data ? (
              <MathF2Chapter5NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter5Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter6Data ? (
              <MathF2Chapter6NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter6Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter7Data ? (
              <MathF2Chapter7NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter7Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter8Data ? (
              <MathF2Chapter8NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter8Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter9Data ? (
              <MathF2Chapter9NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter9Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter10Data ? (
              <MathF2Chapter10NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter10Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter11Data ? (
              <MathF2Chapter11NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter11Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter12Data ? (
              <MathF2Chapter12NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter12Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF2Chapter13Data ? (
              <MathF2Chapter13NotesBlock
                id="notes"
                content={activeChapter.mathF2Chapter13Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter1Data ? (
              <MathF3Chapter1NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter1Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter2Data ? (
              <MathF3Chapter2NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter2Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter3Data ? (
              <MathF3Chapter3NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter3Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter4Data ? (
              <MathF3Chapter4NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter4Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter5Data ? (
              <MathF3Chapter5NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter5Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter6Data ? (
              <MathF3Chapter6NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter6Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter7Data ? (
              <MathF3Chapter7NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter7Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter8Data ? (
              <MathF3Chapter8NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter8Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.mathF3Chapter9Data ? (
              <MathF3Chapter9NotesBlock
                id="notes"
                content={activeChapter.mathF3Chapter9Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sciF3InteractiveData ? (
              <ScienceF3InteractiveNotesBlock
                id="science-notes-content"
                content={activeChapter.sciF3InteractiveData}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sciF2C1Data ? (
              <ScienceF2Chapter1NotesBlock
                id="science-notes-content"
                content={activeChapter.sciF2C1Data}
                lang={scienceLang === "dlp" ? "en" : "bm"}
                storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                isRead={isRead}
                onMarkRead={() =>
                  subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                }
              />
            ) : activeChapter?.sciF2InteractiveData ? (
              activeChapter.sciF2InteractiveData.chapter === 2 ? (
                <ScienceF2Chapter2NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 3 ? (
                <ScienceF2Chapter3NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 4 ? (
                <ScienceF2Chapter4NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 5 ? (
                <ScienceF2Chapter5NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 6 ? (
                <ScienceF2Chapter6NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 7 ? (
                <ScienceF2Chapter7NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 8 ? (
                <ScienceF2Chapter8NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 9 ? (
                <ScienceF2Chapter9NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 10 ? (
                <ScienceF2Chapter10NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 11 ? (
                <ScienceF2Chapter11NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : activeChapter.sciF2InteractiveData.chapter === 12 ? (
                <ScienceF2Chapter12NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              ) : (
                <ScienceF2Chapter13NotesBlock
                  id="science-notes-content"
                  content={activeChapter.sciF2InteractiveData}
                  lang={scienceLang === "dlp" ? "en" : "bm"}
                  storageKey={`notes:${subject}:${activeChapterKey}:study-notes`}
                  isRead={isRead}
                  onMarkRead={() =>
                    subject && activeChapterKey && markChapter(subject, activeChapterKey, "read")
                  }
                />
              )
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

            {isScienceDiscovery && <MiniInvestigation lang={scienceLang === "bm" ? "bm" : "en"} />}
          </NotesContentWithVideo>

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
            !activeChapter?.sej3Chapter5Data &&
            !activeChapter?.sej3Chapter6Data &&
            !activeChapter?.sej3Chapter7Data &&
            !activeChapter?.sej3Chapter8Data &&
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
                        subject &&
                        activeChapterKey &&
                        markChapter(subject, activeChapterKey, "read")
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
  notesContentRef,
}: {
  subjectId: string;
  chapterKey: string;
  subtopics: Subtopic[];
  chapterContent: ReturnType<ContentRegistryModule["getChapter"]> | undefined;
  form: Form;
  scienceLang?: "bm" | "dlp";
  isRead: boolean;
  onMarkRead: () => void;
  onBack: () => void;
  notesContentRef: RefObject<HTMLDivElement | null>;
}) {
  const registry = useContentRegistry();
  const subj = subjects.find((s) => s.id === subjectId);
  const chapterLabel =
    registry?.getRegisteredSubjectChapters(subjectId).find((c) => c.key === chapterKey)?.label ??
    chapterKey;
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
    document
      .getElementById("chapter-overview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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

      <NotesContentWithVideo notesContentRef={notesContentRef} video={chapterContent?.video}>
        <NotesBlock
          id="notes"
          sections={subtopicSections}
          subjectId={subjectId}
          storageKey={`notes:${subjectId}:${chapterKey}:study-notes`}
        />
      </NotesContentWithVideo>

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
