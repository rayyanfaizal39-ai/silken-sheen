import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, ChevronLeft, ChevronRight, GitFork, Network, Rocket } from "lucide-react";
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
  formatChapterLabel,
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters as getSubjectChapters,
  hasFormResourceContent,
  hasResourceContent,
} from "@/content/registry";
import { MindMapBlock } from "@/components/notes/MindMapBlock";
import { ChapterContentTabs } from "@/components/notes/ChapterFeatureBar";
import { normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";
import {
  getBahasaMelayuMindMapCategories,
  type BahasaMelayuMindMapCategory,
} from "@/lib/bm-mindmap-categories";
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
    const bmTopic = {
      "Kata Nama": {
        description:
          "Peta minda Kata Nama untuk Tingkatan 1, 2 dan 3: definisi, Kata Nama Am, Kata Nama Khas, kesalahan lazim, tip UASA dan nota ejaan.",
        keywords: ["Kata Nama", "kata nama am", "kata nama khas"],
      },
      "Kata Ganti Nama": {
        description:
          "Peta minda Kata Ganti Nama untuk Tingkatan 1, 2 dan 3: kata ganti nama diri, kata ganti nama tunjuk, pemilihan mengikut konteks, kesalahan lazim dan tip UASA.",
        keywords: [
          "Kata Ganti Nama",
          "kata ganti nama diri",
          "kata ganti nama tunjuk",
          "kami dan kita",
        ],
      },
      "Kata Kerja": {
        description:
          "Peta minda Kata Kerja untuk Tingkatan 1, 2 dan 3: transitif, tak transitif, bentuk kata kerja, ayat aktif dan pasif, kesalahan lazim serta tip UASA.",
        keywords: ["Kata Kerja", "kata kerja transitif", "kata kerja tak transitif"],
      },
      "Kata Adjektif": {
        description:
          "Peta minda Kata Adjektif untuk Tingkatan 1, 2 dan 3: definisi, fungsi, Frasa Adjektif, kosa kata, kesalahan lazim dan tip UASA.",
        keywords: ["Kata Adjektif", "frasa adjektif", "contoh kata adjektif"],
      },
      "Kata Sendi Nama": {
        description:
          "Peta minda Kata Sendi Nama untuk Tingkatan 1, 2 dan 3: fungsi di, dari dan daripada, ke dan kepada, Frasa Sendi Nama, kesalahan lazim serta tip UASA.",
        keywords: ["Kata Sendi Nama", "frasa sendi nama", "dari dan daripada", "ke dan kepada"],
      },
      "Kata Hubung": {
        description:
          "Peta minda Kata Hubung untuk Tingkatan 1, 2 dan 3: definisi, fungsi, jenis kata hubung, ayat majmuk, kesalahan lazim dan tip UASA.",
        keywords: ["Kata Hubung", "jenis kata hubung", "ayat majmuk", "kata hubung KSSM"],
      },
      "Kata Bilangan": {
        description:
          "Peta minda Kata Bilangan untuk Tingkatan 1, 2 dan 3: bilangan tentu, tak tentu, himpunan, pisahan, tingkat, pecahan, ejaan dan tip UASA.",
        keywords: [
          "Kata Bilangan",
          "jenis kata bilangan",
          "kata bilangan KSSM",
          "kata bilangan tentu dan tak tentu",
        ],
      },
      "Penjodoh Bilangan": {
        description:
          "Peta minda Penjodoh Bilangan untuk Tingkatan 1, 2 dan 3: cara penggunaan, padanan mengikut manusia, haiwan, bentuk dan kumpulan, kesalahan lazim serta tip UASA.",
        keywords: [
          "Penjodoh Bilangan",
          "contoh penjodoh bilangan",
          "penjodoh bilangan KSSM",
          "orang ekor buah helai",
        ],
      },
      Imbuhan: {
        description:
          "Peta minda Imbuhan untuk Tingkatan 1, 2 dan 3: awalan, akhiran, apitan, sisipan, imbuhan pinjaman, fungsi, kesalahan lazim dan tip UASA.",
        keywords: ["Imbuhan", "jenis imbuhan", "imbuhan KSSM", "awalan akhiran apitan sisipan"],
      },
      "Penanda Wacana": {
        description:
          "Peta minda Penanda Wacana untuk Tingkatan 1, 2 dan 3: memulakan idea, penambahan, sebab dan akibat, contoh, kesimpulan, kosa kata lanjutan serta tip UASA.",
        keywords: [
          "Penanda Wacana",
          "contoh penanda wacana",
          "penanda wacana KSSM",
          "penanda wacana karangan",
        ],
      },
      "Frasa Nama": {
        description:
          "Peta minda Frasa Nama Tingkatan 2: definisi, inti dan penerang, fungsi sebagai subjek atau predikat, pola ayat dasar, kesalahan lazim dan tip UASA.",
        keywords: [
          "Frasa Nama",
          "frasa nama Tingkatan 2",
          "pola ayat dasar",
          "subjek dan predikat",
        ],
      },
      "Frasa Kerja": {
        description:
          "Peta minda Frasa Kerja Tingkatan 2: kata kerja inti, kata bantu, objek, pelengkap, pola FN + FK, perbandingan jenis frasa, kesalahan lazim dan tip UASA.",
        keywords: ["Frasa Kerja", "frasa kerja Tingkatan 2", "kata kerja inti", "pola FN FK"],
      },
      "Frasa Adjektif": {
        description:
          "Peta minda Frasa Adjektif Tingkatan 2: kata adjektif inti, struktur frasa, kata penguat, pola FN + FA, perbandingan jenis frasa, kesalahan lazim dan tip UASA.",
        keywords: [
          "Frasa Adjektif",
          "frasa adjektif Tingkatan 2",
          "kata adjektif inti",
          "pola FN FA",
        ],
      },
      "Ayat Aktif": {
        description:
          "Peta minda Ayat Aktif Tingkatan 2: struktur ayat, ayat aktif transitif dan tak transitif, imbuhan meN- dan ber-, objek dan pelengkap, penukaran ayat, kesalahan lazim dan tip UASA.",
        keywords: [
          "Ayat Aktif",
          "ayat aktif Tingkatan 2",
          "ayat aktif transitif dan tak transitif",
          "penukaran ayat aktif kepada pasif",
        ],
      },
      "Ayat Pasif": {
        description:
          "Peta minda Ayat Pasif Tingkatan 2: perbezaan ayat aktif dan pasif, pasif diri pertama, kedua dan ketiga, imbuhan ter- dan ke-...-an, penukaran ayat, kesalahan lazim dan tip UASA.",
        keywords: [
          "Ayat Pasif",
          "ayat pasif Tingkatan 2",
          "pasif diri pertama kedua ketiga",
          "penukaran ayat aktif kepada pasif",
        ],
      },
      "Ayat Tunggal": {
        description:
          "Peta minda Ayat Tunggal Tingkatan 2: subjek dan predikat, empat pola ayat dasar, susunan biasa dan songsang, pencerakinan, kesalahan lazim dan tip UASA.",
        keywords: [
          "Ayat Tunggal",
          "ayat tunggal Tingkatan 2",
          "subjek dan predikat",
          "pola ayat dasar",
          "pencerakinan ayat",
        ],
      },
      "Ayat Majmuk": {
        description:
          "Peta minda Ayat Majmuk Tingkatan 2: gabungan, pancangan, campuran, kata hubung, penggabungan, pencerakinan, kesalahan lazim dan tip UASA.",
        keywords: [
          "Ayat Majmuk",
          "ayat majmuk Tingkatan 2",
          "ayat majmuk gabungan pancangan campuran",
          "penggabungan dan pencerakinan ayat",
        ],
      },
      "Imbuhan Lanjutan": {
        description:
          "Peta minda Imbuhan Lanjutan Tingkatan 2: imbuhan pinjaman, sisipan, perubahan meN- dan peN-, peluluhan huruf, ejaan kata terbitan dan tip UASA.",
        keywords: [
          "Imbuhan Lanjutan",
          "imbuhan lanjutan Tingkatan 2",
          "imbuhan pinjaman dan sisipan",
          "peluluhan huruf meN peN",
          "ejaan kata terbitan",
        ],
      },
      "Simpulan Bahasa": {
        description:
          "Peta minda Simpulan Bahasa Tingkatan 1: maksud, huraian, contoh ayat, situasi penggunaan, kesalahan lazim, teknik mengingat dan teknik menjawab UASA.",
        keywords: [
          "Simpulan Bahasa",
          "simpulan bahasa Tingkatan 1",
          "Peribahasa Bahasa Melayu",
          "contoh ayat simpulan bahasa",
        ],
      },
      Pendahuluan: {
        description:
          "Peta minda Pendahuluan Tingkatan 1: tujuan, ciri-ciri, jenis, langkah menulis, kesalahan lazim, teknik mengingat dan teknik menjawab UASA.",
        keywords: [
          "Pendahuluan",
          "pendahuluan karangan Tingkatan 1",
          "cara menulis pendahuluan",
          "penulisan Bahasa Melayu KSSM",
        ],
      },
      Penutup: {
        description:
          "Peta minda Penutup Tingkatan 1: tujuan, ciri-ciri, langkah menulis, jenis penutup, kesalahan lazim, teknik mengingat dan teknik menjawab UASA.",
        keywords: [
          "Penutup",
          "penutup karangan Tingkatan 1",
          "cara menulis penutup",
          "penulisan Bahasa Melayu KSSM",
        ],
      },
      "Karangan Berpandukan Gambar": {
        description:
          "Peta minda Karangan Berpandukan Gambar Tingkatan 1: tafsiran gambar, pemilihan isi, urutan idea, pengembangan perenggan dan teknik menjawab UASA.",
        keywords: [
          "Karangan Berpandukan Gambar",
          "karangan gambar Tingkatan 1",
          "cara mentafsir gambar",
          "penulisan Bahasa Melayu KSSM",
        ],
      },
      "Karangan Respons Terbuka": {
        description:
          "Peta minda Karangan Respons Terbuka Tingkatan 1: memahami soalan, merancang isi, mengembangkan perenggan, menyemak jawapan dan teknik UASA.",
        keywords: [
          "Karangan Respons Terbuka",
          "karangan respons terbuka Tingkatan 1",
          "cara merancang karangan",
          "penulisan Bahasa Melayu KSSM",
        ],
      },
      "Mengedit dan Menyemak Karangan": {
        description:
          "Peta minda Mengedit dan Menyemak Karangan Tingkatan 1: semakan isi, bahasa, ejaan, tanda baca, ayat, perenggan dan teknik UASA.",
        keywords: [
          "Mengedit dan Menyemak Karangan",
          "semakan karangan Tingkatan 1",
          "senarai semak karangan",
          "penulisan Bahasa Melayu KSSM",
        ],
      },
    }[
      match.search.chapter as
        | "Kata Nama"
        | "Kata Ganti Nama"
        | "Kata Kerja"
        | "Kata Adjektif"
        | "Kata Sendi Nama"
        | "Kata Hubung"
        | "Kata Bilangan"
        | "Penjodoh Bilangan"
        | "Imbuhan"
        | "Penanda Wacana"
        | "Frasa Nama"
        | "Frasa Kerja"
        | "Frasa Adjektif"
        | "Ayat Aktif"
        | "Ayat Pasif"
        | "Ayat Tunggal"
        | "Ayat Majmuk"
        | "Imbuhan Lanjutan"
        | "Simpulan Bahasa"
        | "Pendahuluan"
        | "Penutup"
        | "Karangan Berpandukan Gambar"
        | "Karangan Respons Terbuka"
        | "Mengedit dan Menyemak Karangan"
    ];
    if (normalizeSubjectParam(match.search.subject) === "bm" && bmTopic) {
      const isPeribahasa = match.search.chapter === "Simpulan Bahasa";
      const bmCategory =
        match.search.chapter === "Pendahuluan" ||
        match.search.chapter === "Penutup" ||
        match.search.chapter === "Penanda Wacana" ||
        match.search.chapter === "Karangan Berpandukan Gambar" ||
        match.search.chapter === "Karangan Respons Terbuka" ||
        match.search.chapter === "Mengedit dan Menyemak Karangan"
          ? "Penulisan"
          : isPeribahasa
            ? "Peribahasa"
            : "Tatabahasa";
      return seoMeta({
        title: `${match.search.chapter} — Peta Minda ${bmCategory} Bahasa Melayu`,
        description: bmTopic.description,
        path: "/mindmaps",
        keywords: [
          ...bmTopic.keywords,
          "Peta Minda Bahasa Melayu",
          `${bmCategory} Tingkatan 1`,
          `${bmCategory} Tingkatan 2`,
          `${bmCategory} Tingkatan 3`,
        ],
      });
    }
    const title = subjectName
      ? `${subjectName} Mind Maps — KSSM Form 1-3`
      : "KSSM Mind Maps — Visual Chapter Revision";
    const description = subjectName
      ? `Visual ${subjectName} mind maps for KSSM Form 1-3 — explore every chapter's key concepts at a glance.`
      : "Explore every KSSM chapter visually through interactive mind maps — Science, Math, English, Bahasa Melayu, Sejarah and Geografi, Form 1-3.";
    return seoMeta({
      title,
      description,
      path: "/mindmaps",
      keywords: [
        "KSSM mind maps",
        "visual notes Form 1",
        "concept maps",
        ...subjectSeoKeywords(match.search.subject),
      ],
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
  const activeChapterIndex = activeChapterKey
    ? subjectChapters.findIndex((candidate) => candidate.key === activeChapterKey)
    : -1;
  const previousTopic =
    activeChapterIndex > 0 ? subjectChapters[activeChapterIndex - 1] : undefined;
  const nextTopic = activeChapterIndex >= 0 ? subjectChapters[activeChapterIndex + 1] : undefined;
  const showBmTopicNavigation =
    subject === "bm" &&
    ((form === "Form 2" &&
      (activeChapterKey === "Frasa Adjektif" ||
        activeChapterKey === "Ayat Aktif" ||
        activeChapterKey === "Ayat Pasif" ||
        activeChapterKey === "Ayat Tunggal" ||
        activeChapterKey === "Ayat Majmuk" ||
        activeChapterKey === "Imbuhan Lanjutan" ||
        activeChapterKey === "Kata Pemeri" ||
        activeChapterKey === "Kesalahan Tatabahasa Lazim")) ||
      (form === "Form 3" &&
        (activeChapterKey === "Jenis Ayat" ||
          activeChapterKey === "Ragam Ayat" ||
          activeChapterKey === "Cakap Ajuk dan Cakap Pindah")));
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
      search: () => ({
        subject: subjectId,
        form: undefined,
        chapter: undefined,
      }),
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
    void navigate({
      search: () => ({
        subject: undefined,
        form: undefined,
        chapter: undefined,
      }),
    });
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
            illustration="mindmaps"
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
      ) : chapterMeta &&
        !hasResourceContent(subject, form, activeChapterKey, "mindMap", activeScienceLang) ? (
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
            mode="mindmaps"
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
            <>
              <MindMapBlock
                id="mindMap"
                data={activeChapter.mindMap.data}
                title={activeChapter.mindMap.title}
                storageKey={`mindmaps:${subject}:${form}:${activeChapterKey}`}
                palette={mindMapPalette}
                mobileLayout={subject === "bm" ? "learning-path" : "canvas"}
              />
              {showBmTopicNavigation && (
                <nav
                  aria-label="Navigasi topik Tatabahasa"
                  className="mb-8 grid gap-3 sm:grid-cols-2"
                >
                  <button
                    type="button"
                    onClick={() => previousTopic && chooseChapter(previousTopic.key)}
                    disabled={!previousTopic}
                    aria-disabled={!previousTopic}
                    className="group inline-flex min-h-16 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-left transition-all duration-200 hover:border-cyan-300/30 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    <ChevronLeft
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-cyan-200 transition-transform group-hover:-translate-x-0.5"
                    />
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                        Sebelumnya
                      </span>
                      <span className="mt-0.5 block text-sm font-bold text-white">
                        {previousTopic?.key ?? "Tiada topik sebelumnya"}
                      </span>
                    </span>
                  </button>
                  {nextTopic ? (
                    <button
                      type="button"
                      onClick={() => chooseChapter(nextTopic.key)}
                      className="group inline-flex min-h-16 items-center justify-end gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-right transition-all duration-200 hover:border-cyan-300/30 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                    >
                      <span>
                        <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                          Seterusnya
                        </span>
                        <span className="mt-0.5 block text-sm font-bold text-white">
                          {nextTopic.key}
                        </span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-cyan-200 transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="inline-flex min-h-16 cursor-not-allowed items-center justify-end gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-right opacity-50"
                    >
                      <span>
                        <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                          Seterusnya
                        </span>
                        <span className="mt-0.5 block text-sm font-bold text-white/60">
                          Tiada topik seterusnya
                        </span>
                      </span>
                      <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-white/35" />
                    </button>
                  )}
                </nav>
              )}
            </>
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
  const isBahasaMelayu = subjectId === "bm";
  const bahasaMelayuCategories = getBahasaMelayuMindMapCategories(form);
  const [activeBahasaMelayuCategory, setActiveBahasaMelayuCategory] =
    useState<BahasaMelayuMindMapCategory>("Tatabahasa");

  useEffect(() => {
    setActiveBahasaMelayuCategory("Tatabahasa");
  }, [form, subjectId]);

  const activeCategoryChapters = chapters.filter(
    (chapter) =>
      !isBahasaMelayu || (chapter.categoryLabel ?? "Tatabahasa") === activeBahasaMelayuCategory,
  );

  const renderChapterCard = (chapter: (typeof chapters)[number], index: number) => {
    const hasMindMap = hasResourceContent(subjectId, form, chapter.key, "mindMap", scienceLang);
    return (
      <button
        key={chapter.key}
        type="button"
        onClick={() => hasMindMap && onSelect(chapter.key)}
        disabled={!hasMindMap}
        className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0D1525]/80 p-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.20)] backdrop-blur-2xl transition-all duration-300 animate-slide-up hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_24px_80px_rgba(14,165,233,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
          isBahasaMelayu ? "min-h-[190px]" : "min-h-[210px]"
        }`}
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
            {hasMindMap
              ? isBahasaMelayu
                ? "Interaktif"
                : "Interactive"
              : isBahasaMelayu
                ? "Akan Datang"
                : "Coming Soon"}
          </span>
        </div>
        {!isBahasaMelayu && (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">
            Chapter {index + 1}
          </p>
        )}
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">
          {chapter.label}
        </h3>
        <p className="mt-3 text-sm leading-6 text-white/55">
          {chapter.description ??
            (hasMindMap
              ? "Open the chapter's visual learning map."
              : "This chapter's interactive mind map is currently being prepared.")}
        </p>
        <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-bold text-white shadow-[0_12px_28px_rgba(14,165,233,0.18)] transition-transform group-hover:scale-105">
          <GitFork className="h-3.5 w-3.5" />
          {isBahasaMelayu ? "Buka Peta Minda" : "Open Mind Map"}
        </span>
      </button>
    );
  };

  return (
    <AcademyPanel>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 transition-all hover:-translate-x-0.5 hover:bg-white/[0.10] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <ArrowLeft className="h-4 w-4" />{" "}
          {isBahasaMelayu ? "Kembali ke tingkatan" : "Back to forms"}
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5">
          <Network className="h-4 w-4 text-cyan-200" />
          <span className="text-xs font-bold text-cyan-100">
            {isBahasaMelayu ? `${form} • Bahasa Melayu` : `${form} Mind Maps`}
          </span>
        </div>
      </div>

      <AcademySectionHeader
        eyebrow={isBahasaMelayu ? "Peta Minda • Bahasa Melayu" : "Mind Map Library"}
        title={isBahasaMelayu ? "Bahasa Melayu" : subj ? `${subj.name} Mind Maps` : "Mind Maps"}
        description={
          isBahasaMelayu
            ? "Pilih topik dan buka peta minda visual yang interaktif."
            : "Choose a chapter and open its interactive visual learning map."
        }
      />

      {isBahasaMelayu && (
        <div
          role="tablist"
          aria-label="Kategori peta minda Bahasa Melayu"
          className={`mb-8 grid gap-2 rounded-2xl border border-white/[0.08] bg-[#08101D]/70 p-2 sm:inline-grid ${
            bahasaMelayuCategories.length === 3
              ? "grid-cols-3 sm:min-w-[540px]"
              : "grid-cols-2 sm:min-w-[360px]"
          }`}
        >
          {bahasaMelayuCategories.map((category) => {
            const isActive = activeBahasaMelayuCategory === category;
            return (
              <button
                key={category}
                id={`bm-category-tab-${category.toLowerCase()}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="bm-category-panel"
                onClick={() => setActiveBahasaMelayuCategory(category)}
                className={`min-h-12 rounded-xl px-2 py-2.5 text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:px-4 sm:text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_10px_28px_rgba(14,165,233,0.22)]"
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      {chapters.length === 0 ? (
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] py-20 text-center">
          <Rocket className="mx-auto mb-4 h-10 w-10 text-cyan-200" />
          <p className="font-display text-xl font-bold text-white">Mind Maps Coming Soon</p>
          <p className="mt-2 text-sm text-muted-foreground">
            This form's interactive mind maps are currently being prepared.
          </p>
        </div>
      ) : isBahasaMelayu ? (
        <div
          id="bm-category-panel"
          role="tabpanel"
          aria-labelledby={`bm-category-tab-${activeBahasaMelayuCategory.toLowerCase()}`}
          className="animate-fade-up"
        >
          {activeCategoryChapters.length > 0 ? (
            <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeCategoryChapters.map(renderChapterCard)}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-white/[0.08] bg-white/[0.02] px-5 py-12 text-center">
              <Rocket className="mx-auto mb-3 h-8 w-8 text-cyan-200/70" />
              <p className="font-display text-lg font-bold text-white/75">
                {activeBahasaMelayuCategory}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/45">
                Kandungan untuk {form} akan datang.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map(renderChapterCard)}
        </div>
      )}
    </AcademyPanel>
  );
}

function getMindMapChapters(subjectId: string, scienceLang: "bm" | "dlp" | undefined, form: Form) {
  const rows = new Map<
    string,
    {
      key: string;
      label: string;
      description?: string;
      categoryLabel?: string;
      available: boolean;
      isNew?: boolean;
    }
  >();

  for (const chapter of getSubjectChapters(subjectId, scienceLang, form)) {
    const hasMindMap = hasResourceContent(subjectId, form, chapter.key, "mindMap", scienceLang);
    if (subjectId === "bm" && !hasMindMap && chapter.categoryLabel !== "Tatabahasa") {
      continue;
    }
    rows.set(chapter.key, chapter);
  }

  for (const chapter of getChaptersForSubject(subjectId, scienceLang).filter(
    (candidate) => candidate.form === form && !!candidate.mindMap,
  )) {
    if (!rows.has(chapter.chapterKey)) {
      rows.set(chapter.chapterKey, {
        key: chapter.chapterKey,
        label: formatChapterLabel(chapter.chapterKey, chapter.title, scienceLang),
        available: true,
        isNew: form === "Form 2",
      });
    }
  }

  return Array.from(rows.values()).sort(
    (a, b) => chapterSortValue(a.key) - chapterSortValue(b.key),
  );
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
