import { useState, type ReactNode } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FileQuestion,
  Film,
  GraduationCap,
  Heart,
  Lightbulb,
  ListChecks,
  MapPin,
  Palette,
  Sparkles,
  Star,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import type { BMForm3Novel } from "@/data/bm-form3-novel-structure";

const icons = {
  focus: Target,
  introduction: BookOpen,
  synopsis: BookOpen,
  chapters: ListChecks,
  theme: Sparkles,
  issues: Lightbulb,
  characters: Users,
  plot: ListChecks,
  technique: Film,
  setting: MapPin,
  language: Palette,
  values: Heart,
  lessons: GraduationCap,
  exam: Target,
  questions: FileQuestion,
  notes: Sparkles,
  facts: Star,
  checklist: CheckCircle2,
} as const;

function Placeholder() {
  return (
    <div className="rounded-2xl border border-dashed border-orange-300/15 bg-orange-300/[0.04] px-5 py-7 text-center">
      <p className="text-sm font-semibold text-white/45">Content coming soon.</p>
      <p className="mt-1 text-xs text-white/25">This section will be updated.</p>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  color,
  icon,
  children,
}: {
  title: string;
  eyebrow: string;
  color: string;
  icon: keyof typeof icons;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const Icon = icons[icon];
  return (
    <section className="overflow-hidden border-b border-white/[0.06] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-20 w-full items-center justify-between gap-4 px-1 py-5 text-left transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-300/60 sm:px-2"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
            style={{ color, background: `${color}12`, borderColor: `${color}28` }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span
              className="block text-[9px] font-black uppercase tracking-[0.2em]"
              style={{ color }}
            >
              {eyebrow}
            </span>
            <span className="mt-1 block font-display text-base font-bold text-white sm:text-lg">
              {title}
            </span>
          </span>
        </span>
        <ChevronDown
          className="h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none"
          style={{ color, transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="pb-7 pt-1">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Fold({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.045]"
      >
        <span className="text-sm font-bold text-white">{title}</span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-orange-300 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] p-4">{children}</div>
        </div>
      </div>
    </article>
  );
}

function AnalysisGrid({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(([title, detail]) => (
        <article key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{detail}</p>
        </article>
      ))}
    </div>
  );
}

function BulletCards({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-300/[0.1] text-xs font-black text-orange-200">
            {index + 1}
          </span>
          <p className="text-sm leading-6 text-white/65">{item}</p>
        </div>
      ))}
    </div>
  );
}

function Questions({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="space-y-2">
      {items.map(([question, answer], index) => (
        <Fold key={question} title={`${index + 1}. ${question}`}>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-300">
            Jawapan
          </p>
          <p className="mt-2 text-sm leading-7 text-white/70">{answer}</p>
        </Fold>
      ))}
    </div>
  );
}

function ChapterBrowser({ novel }: { novel: BMForm3Novel }) {
  const [activeChapter, setActiveChapter] = useState(novel.chapters[0]?.id);
  const chapter = novel.chapters.find((item) => item.id === activeChapter);
  const fields = [
    ["Ringkasan Bab", "ringkasanBab"],
    ["Peristiwa Utama", "peristiwaUtama"],
    ["Tindakan Watak", "tindakanWatak"],
    ["Konflik", "konflikPerumitan"],
    ["Latar", "latarSpesifik"],
    ["Resolusi", "resolusiKecil"],
    ["Watak Terlibat", "watakTerlibat"],
    ["Persoalan Bab", "persoalanBab"],
    ["Nilai Bab", "nilaiBab"],
    ["Pengajaran Bab", "pengajaranBab"],
  ] as const;

  if (!novel.chapters.length) {
    return (
      <div>
        <Placeholder />
        {novel.chaptersNote && (
          <p className="mt-3 text-xs leading-5 text-white/35">{novel.chaptersNote}</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-[13rem_1fr]">
      <div className="grid max-h-96 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 md:grid-cols-1">
        {novel.chapters.map((item, index) => {
          const active = item.id === activeChapter;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveChapter(item.id)}
              className="flex min-h-12 items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm font-bold transition-all"
              style={
                active
                  ? { borderColor: "#FB923C55", background: "#FB923C18", color: "#FDBA74" }
                  : {
                      borderColor: "rgba(255,255,255,.08)",
                      background: "rgba(255,255,255,.025)",
                      color: "rgba(255,255,255,.55)",
                    }
              }
            >
              <span className="text-[10px] opacity-60">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          );
        })}
      </div>
      <div>
        <h3 className="mb-3 font-display text-lg font-bold text-white">{chapter?.label}</h3>
        <div className="space-y-2">
          {fields.map(([label, key]) => (
            <Fold key={key} title={label}>
              {chapter?.content?.[key] ? (
                <p className="text-sm leading-7 text-white/70">{chapter.content[key]}</p>
              ) : (
                <Placeholder />
              )}
            </Fold>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BMForm3NovelContent({ novel }: { novel: BMForm3Novel }) {
  return (
    <div>
      <section className="relative mb-3 overflow-hidden rounded-2xl border border-orange-300/20 bg-[#12111f] p-5 sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(251,146,60,0.18),transparent_46%),radial-gradient(circle_at_10%_100%,rgba(192,132,252,0.1),transparent_42%)]" />
        <div className="relative flex items-start gap-4">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/[0.1] text-orange-300 sm:flex">
            <BookOpen className="h-7 w-7" />
          </span>
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-orange-300/25 bg-orange-300/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange-200">
                KOMSAS Novel
              </span>
              <span className="rounded-full border border-amber-300/25 bg-amber-300/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-200">
                Fokus UASA
              </span>
            </div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              {novel.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" /> Penulis: {novel.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" /> Tingkatan 3
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> {novel.chapters.length} Bab
              </span>
              {novel.mainCharacter && (
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Watak Utama: {novel.mainCharacter}
                </span>
              )}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
              Hafal isi, kaitkan dengan peristiwa dan bina jawapan lengkap untuk mendapatkan markah
              penuh.
            </p>
          </div>
        </div>
      </section>

      <Section title="Fokus Pembelajaran" eyebrow="Panduan belajar" color="#60A5FA" icon="focus">
        {novel.focus ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {novel.focus.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-xl border border-sky-300/10 bg-sky-300/[0.055] px-4 py-3 text-sm leading-6 text-white/70"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        ) : (
          <Placeholder />
        )}
      </Section>
      <Section title="Pengenalan" eyebrow="Kenali novel" color="#94A3B8" icon="introduction">
        {novel.introduction ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-sm leading-7 text-white/70">
              {novel.introduction}
            </div>
            {novel.quickSummary && (
              <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.055] p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-sky-300">
                  Ringkasan Cerita 30 Saat
                </p>
                <p className="mt-3 text-sm leading-7 text-white/70">{novel.quickSummary}</p>
              </div>
            )}
          </div>
        ) : (
          <Placeholder />
        )}
      </Section>
      <Section
        title="Sinopsis Keseluruhan"
        eyebrow="Ringkasan novel"
        color="#38BDF8"
        icon="synopsis"
      >
        {novel.synopsis ? (
          <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.055] p-5 text-sm leading-7 text-white/70">
            {novel.synopsis}
          </div>
        ) : (
          <Placeholder />
        )}
      </Section>
      <Section title="Inti Pati Bab" eyebrow="Pelayar bab" color="#FB923C" icon="chapters">
        <ChapterBrowser novel={novel} />
      </Section>
      <Section title="Tema" eyebrow="Idea utama" color="#F472B6" icon="theme">
        {novel.analysis ? (
          <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.065] p-5 text-sm leading-7 text-white/70">
            {novel.analysis.theme}
          </div>
        ) : (
          <Placeholder />
        )}
      </Section>
      <Section title="Persoalan" eyebrow="Kupas novel" color="#60A5FA" icon="issues">
        {novel.analysis ? <AnalysisGrid items={novel.analysis.issues} /> : <Placeholder />}
      </Section>
      <Section
        title="Watak dan Perwatakan"
        eyebrow="Kenali watak"
        color="#FBBF24"
        icon="characters"
      >
        {novel.analysis ? <AnalysisGrid items={novel.analysis.characters} /> : <Placeholder />}
      </Section>
      <Section title="Plot (Binaan Plot)" eyebrow="Jalan cerita" color="#34D399" icon="plot">
        {novel.analysis ? <AnalysisGrid items={novel.analysis.plot} /> : <Placeholder />}
      </Section>
      <Section title="Teknik Plot" eyebrow="Teknik penceritaan" color="#FB923C" icon="technique">
        {novel.analysis ? <AnalysisGrid items={novel.analysis.plotTechniques} /> : <Placeholder />}
      </Section>
      <Section title="Latar" eyebrow="Tempat · Masa · Masyarakat" color="#A78BFA" icon="setting">
        {novel.analysis ? (
          <AnalysisGrid items={novel.analysis.settings} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {["Tempat", "Masa", "Masyarakat"].map((label) => (
              <div key={label}>
                <h3 className="mb-2 text-sm font-bold text-white/70">{label}</h3>
                <Placeholder />
              </div>
            ))}
          </div>
        )}
      </Section>
      <Section title="Gaya Bahasa" eyebrow="Seni bahasa" color="#22D3EE" icon="language">
        {novel.analysis ? <AnalysisGrid items={novel.analysis.language} /> : <Placeholder />}
      </Section>
      <Section title="Nilai" eyebrow="Bina peribadi" color="#FB7185" icon="values">
        {novel.analysis ? <AnalysisGrid items={novel.analysis.values} /> : <Placeholder />}
      </Section>
      <Section title="Pengajaran" eyebrow="Amalkan" color="#34D399" icon="lessons">
        {novel.analysis ? <BulletCards items={novel.analysis.lessons} /> : <Placeholder />}
      </Section>
      <Section title="Tip UASA" eyebrow="Formula markah" color="#FB923C" icon="exam">
        {novel.analysis ? <BulletCards items={novel.analysis.examTips} /> : <Placeholder />}
      </Section>
      <Section title="Contoh Soalan UASA" eyebrow="SRT · KBAT" color="#C084FC" icon="questions">
        {novel.analysis ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-bold text-white/70">SRT</h3>
              <Questions items={novel.analysis.srt} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-white/70">KBAT</h3>
              <Questions items={novel.analysis.kbat} />
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {["SRT", "KBAT"].map((label) => (
              <div key={label}>
                <h3 className="mb-2 text-sm font-bold text-white/70">{label}</h3>
                <Placeholder />
              </div>
            ))}
          </div>
        )}
      </Section>
      <Section title="Nota Kilat" eyebrow="Ulang kaji pantas" color="#60A5FA" icon="notes">
        {novel.analysis ? <AnalysisGrid items={novel.analysis.quickNotes} /> : <Placeholder />}
      </Section>
      <Section title="Fakta Penting" eyebrow="Wajib ingat" color="#FBBF24" icon="facts">
        {novel.analysis ? <BulletCards items={novel.analysis.facts} /> : <Placeholder />}
      </Section>
      <Section
        title="Checklist Penguasaan"
        eyebrow="Semak kemajuan"
        color="#34D399"
        icon="checklist"
      >
        {novel.analysis ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {novel.analysis.checklist.map((item) => (
              <label
                key={item}
                className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/65"
              >
                <input type="checkbox" className="h-4 w-4 accent-emerald-400" />
                {item}
              </label>
            ))}
          </div>
        ) : (
          <Placeholder />
        )}
      </Section>
    </div>
  );
}
