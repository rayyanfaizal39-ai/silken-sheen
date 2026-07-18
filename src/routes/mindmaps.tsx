import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, GitFork, Network, Rocket } from "lucide-react";
import { subjects, type Form } from "@/data/subjects-meta";
import {
  SubjectGrid,
  FormGrid,
  FormComingSoon,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters as getSubjectChapters,
  hasFormResourceContent,
  hasResourceContent,
} from "@/content/registry";
import { MindMapBlock } from "@/components/notes/MindMapBlock";
import { ChapterContentTabs } from "@/components/notes/ChapterFeatureBar";
import { normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";
import { getPlanetTheme } from "@/components/PlanetEnvironment";
import {
  AcademyHero,
  AcademyPageShell,
  AcademyPanel,
  AcademySectionHeader,
  SubjectWorldBanner,
  type SubjectPlanetId,
} from "@/components/AcademyPage";
import { seoMeta } from "@/lib/seo";
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

export const Route = createFileRoute("/mindmaps")({
  validateSearch: searchSchema,
  head: ({ match }) => {
    const subjectName = subjectSeoName(match.search.subject);
    const title = subjectName ? `${subjectName} Mind Maps — KSSM Form 1-3` : "KSSM Mind Maps — Visual Chapter Revision";
    const description = subjectName
      ? `Visual ${subjectName} mind maps for KSSM Form 1-3 — explore every chapter's key concepts at a glance.`
      : "Explore every KSSM chapter visually through interactive mind maps — Science, Math, English, Bahasa Melayu, Sejarah and Geografi, Form 1-3.";
    return seoMeta({
      title,
      description,
      path: "/mindmaps",
      keywords: ["KSSM mind maps", "visual notes Form 1", "concept maps", ...subjectSeoKeywords(match.search.subject)],
    });
  },
  component: MindMapsPage,
});

function MindMapsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const normalizedSubject = normalizeSubjectParam(search.subject);
  const subject =
    normalizedSubject && subjects.some((candidate) => candidate.id === normalizedSubject)
      ? normalizedSubject
      : null;
  const form = normalizeFormParam(search.form) as Form;
  const hasSelectedForm = search.form != null;
  const [chapter, setChapter] = useState<string | null>(search.chapter ?? null);
  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const isBilingualSubject = subject === "science" || subject === "math";
  const needsScienceLang = isBilingualSubject && !scienceLang;
  const activeScienceLang = isBilingualSubject ? (scienceLang ?? undefined) : undefined;
  const subjectChapters = subject ? getMindMapChapters(subject, activeScienceLang, form) : [];
  const activeChapterKey =
    chapter && subjectChapters.some((candidate) => candidate.key === chapter) ? chapter : null;
  const chapterMeta =
    subject && activeChapterKey
      ? subjectChapters.find((candidate) => candidate.key === activeChapterKey)
      : null;
  const missingChapter = !!(subject && chapter && !activeChapterKey);
  const activeChapter =
    subject && activeChapterKey
      ? (getChapter(subject, activeChapterKey, activeScienceLang, form) ?? undefined)
      : undefined;
  const planetSubjectId = (subject ?? undefined) as SubjectPlanetId | undefined;
  const planetTheme = getPlanetTheme(subject);
  const mindMapPalette = planetTheme
    ? {
        edgeStart: planetTheme.color,
        edgeEnd: planetTheme.color,
        accentBorder: `${planetTheme.color}99`,
        accentGlow: `0 0 24px ${planetTheme.glow}`,
      }
    : undefined;

  useEffect(() => {
    setChapter(search.chapter ?? null);
  }, [subject, form, search.chapter]);

  function chooseSubject(subjectId: string) {
    setChapter(null);
    void navigate({
      search: () => ({ subject: subjectId, form: undefined, chapter: undefined }),
    });
  }

  function chooseForm(selectedForm: Form) {
    setChapter(null);
    void navigate({
      search: (previous: Record<string, unknown>) => ({
        ...previous,
        subject,
        form: Number(selectedForm.replace("Form ", "")),
        chapter: undefined,
      }),
    });
  }

  function chooseChapter(key: string) {
    setChapter(key);
    void navigate({
      search: (previous: Record<string, unknown>) => ({
        ...previous,
        subject,
        form: Number(form.replace("Form ", "")),
        chapter: key,
      }),
    });
  }

  function backToSubjects() {
    setChapter(null);
    void navigate({ search: () => ({ subject: undefined, form: undefined, chapter: undefined }) });
  }

  function backToForms() {
    setChapter(null);
    void navigate({
      search: (previous: Record<string, unknown>) => ({
        ...previous,
        form: undefined,
        chapter: undefined,
      }),
    });
  }

  function backToChapters() {
    setChapter(null);
    void navigate({
      search: (previous: Record<string, unknown>) => ({ ...previous, chapter: undefined }),
    });
  }

  if (subject && !hasSelectedForm && !activeChapterKey) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <FormGrid
          subjectId={subject}
          mode="mindmaps"
          onSelect={chooseForm}
          onBack={backToSubjects}
        />
      </AcademyPageShell>
    );
  }

  if (
    subject &&
    (form === "Form 2" || form === "Form 3") &&
    !hasFormResourceContent(subject, form, "mindMap", activeScienceLang) &&
    !needsScienceLang
  ) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <FormComingSoon subjectId={subject} form={form} onBack={backToForms} />
      </AcademyPageShell>
    );
  }

  return (
    <AcademyPageShell subjectId={planetSubjectId}>
      {!subject ? (
        <>
          <AcademyHero
            eyebrow="Visual Learning"
            title="Mind Maps"
            gradientTitle="Library"
            description="Explore every chapter visually through interactive learning maps."
          />
          <SubjectGrid onSelect={chooseSubject} />
        </>
      ) : needsScienceLang ? (
        <ScienceLanguagePicker onSelect={setScienceLang} onBack={backToForms} />
      ) : missingChapter ? (
        <div className="rounded-[2rem] border border-white/[0.08] bg-[#0D1525]/80 py-20 text-center">
          <p className="text-muted-foreground">Chapter not found. Please choose another chapter.</p>
          <button
            type="button"
            onClick={backToChapters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to chapters
          </button>
        </div>
      ) : !activeChapterKey ? (
        <>
          <SubjectWorldBanner subjectId={subject as SubjectPlanetId} />
          {isBilingualSubject && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <MindMapChapterGrid
            subjectId={subject}
            form={form}
            scienceLang={activeScienceLang}
            onSelect={chooseChapter}
            onBack={backToForms}
          />
        </>
      ) : chapterMeta && !hasResourceContent(subject, form, activeChapterKey, "mindMap", activeScienceLang) ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={activeChapterKey}
          scienceLang={activeScienceLang}
          form={form}
          mode="mindmaps"
          onBack={backToChapters}
        />
      ) : (
        <>
          <ContentHeader
            subjectId={subject}
            chapterKey={activeChapterKey}
            scienceLang={activeScienceLang}
            form={form}
            onBack={backToChapters}
          />
          <ChapterContentTabs
            subjectId={subject}
            form={form}
            chapterKey={activeChapterKey}
            scienceLang={activeScienceLang}
            currentContentType="mindmaps"
          />
          {activeChapter?.mindMap ? (
            <MindMapBlock
              id="mindMap"
              data={activeChapter.mindMap.data}
              title={activeChapter.mindMap.title}
              storageKey={`mindmaps:${subject}:${form}:${activeChapterKey}`}
              palette={mindMapPalette}
            />
          ) : (
            <MindMapComingSoon onBack={backToChapters} />
          )}
        </>
      )}
    </AcademyPageShell>
  );
}

function MindMapChapterGrid({
  subjectId,
  form,
  scienceLang,
  onSelect,
  onBack,
}: {
  subjectId: string;
  form: Form;
  scienceLang?: "bm" | "dlp";
  onSelect: (key: string) => void;
  onBack: () => void;
}) {
  const subj = subjects.find((candidate) => candidate.id === subjectId);
  const chapters = getMindMapChapters(subjectId, scienceLang, form);

  return (
    <AcademyPanel>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to forms
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5">
          <Network className="h-4 w-4 text-cyan-200" />
          <span className="text-xs font-bold text-cyan-100">{form} Mind Maps</span>
        </div>
      </div>

      <AcademySectionHeader
        eyebrow="Mind Map Library"
        title={subj ? `${subj.name} Mind Maps` : "Mind Maps"}
        description="Choose a chapter and open its interactive visual learning map."
      />

      {chapters.length === 0 ? (
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] py-20 text-center">
          <Rocket className="mx-auto mb-4 h-10 w-10 text-cyan-200" />
          <p className="font-display text-xl font-bold text-white">Mind Maps Coming Soon</p>
          <p className="mt-2 text-sm text-muted-foreground">
            This form's interactive mind maps are currently being prepared.
          </p>
        </div>
      ) : (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter, index) => {
            const chapterContent = getChapter(subjectId, chapter.key, scienceLang, form);
            const hasMindMap = hasResourceContent(
              subjectId,
              form,
              chapter.key,
              "mindMap",
              scienceLang,
            );
            return (
              <button
                key={chapter.key}
                type="button"
                onClick={() => hasMindMap && onSelect(chapter.key)}
                disabled={!hasMindMap}
                className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D1525]/80 p-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.20)] backdrop-blur-2xl transition-all duration-300 animate-slide-up hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_24px_80px_rgba(14,165,233,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl transition-opacity group-hover:bg-cyan-300/16" />
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_26px_rgba(34,211,238,0.12)]">
                    <Network className="h-5 w-5 text-cyan-200" />
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide ${
                      hasMindMap
                        ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
                        : "border-white/10 bg-white/[0.04] text-white/50"
                    }`}
                  >
                    {hasMindMap ? "Interactive" : "Coming Soon"}
                  </span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">
                  Chapter {index + 1}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">
                  {chapter.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  {hasMindMap
                    ? "Open the chapter's visual learning map."
                    : "This chapter's interactive mind map is currently being prepared."}
                </p>
                <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-[0_12px_28px_rgba(14,165,233,0.18)] transition-transform group-hover:scale-105">
                  <GitFork className="h-3.5 w-3.5" />
                  Open Mind Map
                </span>
              </button>
            );
          })}
        </div>
      )}
    </AcademyPanel>
  );
}

function getMindMapChapters(subjectId: string, scienceLang: "bm" | "dlp" | undefined, form: Form) {
  const rows = new Map<
    string,
    { key: string; label: string; available: boolean; isNew?: boolean }
  >();

  for (const chapter of getSubjectChapters(subjectId, scienceLang, form)) {
    rows.set(chapter.key, chapter);
  }

  for (const chapter of getChaptersForSubject(subjectId, scienceLang).filter(
    (candidate) => candidate.form === form && !!candidate.mindMap,
  )) {
    if (!rows.has(chapter.chapterKey)) {
      rows.set(chapter.chapterKey, {
        key: chapter.chapterKey,
        label: chapter.chapterKey.startsWith("Chapter ")
          ? `${chapter.chapterKey}: ${chapter.title}`
          : chapter.title,
        available: true,
        isNew: form === "Form 2",
      });
    }
  }

  return Array.from(rows.values()).sort((a, b) => chapterSortValue(a.key) - chapterSortValue(b.key));
}

function chapterSortValue(key: string) {
  const match = key.match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
}

function MindMapComingSoon({ onBack }: { onBack: () => void }) {
  return (
    <div className="animate-fade-up rounded-[2rem] border border-white/[0.08] bg-[#0D1525]/80 px-6 py-16 text-center shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-400/10 shadow-[0_0_34px_rgba(34,211,238,0.18)]">
        <Rocket className="h-8 w-8 text-cyan-200" />
      </div>
      <h2 className="font-display text-3xl font-bold text-white">Mind Map Coming Soon</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/60">
        This chapter's interactive mind map is currently being prepared.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-5 py-3 text-sm font-bold text-white/75 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
      >
        <ArrowLeft className="h-4 w-4" /> Back to chapters
      </button>
    </div>
  );
}
