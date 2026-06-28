import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Heart,
  Lightbulb,
  ListChecks,
  Music2,
  Palette,
  Quote,
  ShieldAlert,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import {
  BM_FORM2_KOMSAS_CATEGORIES,
  BM_FORM2_KOMSAS_WORKS,
  type Form2KomsasWork,
} from "@/data/bm-form2-komsas-structure";
import { PANTUN_ALAM_REMAJA } from "@/data/bm-form2-pantun-alam-remaja";
import { PANTUN_KIASAN } from "@/data/bm-form2-pantun-kiasan";

const ACCENT = "#C084FC";
const FOCUS_ITEMS = ["Maksud setiap rangkap", "Tema", "Persoalan", "Gaya bahasa", "Nilai murni", "Pengajaran", "Persediaan UASA"];
const RANGKAP_TAGS = ["Kepulangan ibu", "Hilang kerisauan", "Kegembiraan", "Adik-beradik", "Ibu dan bapa", "Pemberian hadiah", "Anak kecil"];
const RANGKAP_VALUES = ["Kasih sayang", "Rasa selamat", "Kasih sayang", "Hubungan erat", "Kasih sayang", "Baik hati", "Hormat"];
const VALUE_COLORS = ["#FB7185", "#FBBF24", "#34D399", "#60A5FA"];
const LANGUAGE_ICONS = ["🌿", "💬", "↔", "🎵", "🔁", "✨"];

function WorkCard({ work, index, onSelect }: { work: Form2KomsasWork; index: number; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-left transition-all hover:border-white/[0.14] hover:bg-white/[0.06]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white/60" style={{ background: `${ACCENT}15` }}>{String(index).padStart(2, "0")}</span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 block text-[9px] font-black tracking-wide" style={{ color: ACCENT, opacity: 0.7 }}>{work.category}</span>
        <span className="block truncate text-sm font-semibold text-white">{work.title}</span>
      </span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" style={{ color: ACCENT }} />
    </button>
  );
}

function Pill({ children, color = ACCENT }: { children: ReactNode; color?: string }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black" style={{ borderColor: `${color}35`, background: `${color}14`, color }}>{children}</span>;
}

function WorkHero({ work }: { work: Form2KomsasWork }) {
  const isAlamRemaja = work.id === "pantun-alam-remaja";
  const isKiasan = work.id === "pantun-kiasan";
  const populated = isAlamRemaja || isKiasan;
  const introduction = isKiasan
    ? "Pantun yang menyindir pelbagai ragam manusia melalui bahasa kiasan serta mengajak pembaca menilai sikap dalam kehidupan."
    : "Sebuah pantun tentang kegembiraan anak-anak menyambut kepulangan ibu bapa serta kasih sayang yang menyatukan keluarga.";
  return (
    <section className="relative mb-7 overflow-hidden rounded-2xl border border-purple-300/15 bg-[#111226] p-5 sm:p-7">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(192,132,252,0.16),transparent_65%)]" />
      <div className="relative max-w-2xl">
        <div className="mb-4 flex flex-wrap gap-2"><Pill>{work.category}</Pill><Pill color="#FBBF24"><Trophy className="h-3 w-3" /> Fokus UASA</Pill></div>
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/35">Bahasa Melayu · Tingkatan 2</p>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">{work.title}</h1>
        {populated && <><p className="mt-2 text-xs font-semibold text-purple-200/70">{isKiasan ? `Penyelenggara: ${PANTUN_KIASAN.editor}` : "Pengarang tidak diketahui"}</p><p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{introduction}</p></>}
        <div className="mt-5 flex flex-wrap gap-2">
          {populated && <><Pill color="#60A5FA"><BookOpen className="h-3 w-3" /> Puisi tradisional</Pill><Pill color="#34D399"><Clock3 className="h-3 w-3" /> {isKiasan ? "25 minit" : "12 minit"}</Pill><Pill color="#FB7185"><Star className="h-3 w-3" /> {isKiasan ? "Sederhana" : "Mudah"}</Pill></>}
        </div>
      </div>
    </section>
  );
}

function PantunKiasanContent() {
  const note = PANTUN_KIASAN;
  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 sm:p-6">
          <SectionTitle icon={<Target className="h-5 w-5" />} eyebrow="Misi Pembelajaran" title="Baca kiasan, fahami sindiran" color="#60A5FA" />
          <p className="mb-4 max-w-2xl text-sm leading-7 text-white/65">{note.introduction}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{["17 maksud rangkap", "Tema dan persoalan", "Gaya bahasa", "Unsur bunyi dan nada", "Nilai dan pengajaran", "Kosa kata"].map((item) => <div key={item} className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs font-semibold text-white/75"><Check className="h-3.5 w-3.5 text-emerald-400" />{item}</div>)}</div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<BookOpen className="h-5 w-5" />} eyebrow="Fahami Kiasan" title="Maksud Mengikut Rangkap" color="#A78BFA" />
        <div className="grid gap-3 md:grid-cols-2">
          {note.meanings.map((meaning, index) => <article key={meaning} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.055]"><div className="mb-3 flex items-center justify-between"><Pill>Rangkap {index + 1}</Pill><Quote className="h-4 w-4 text-white/20" /></div><p className="text-sm leading-6 text-white/70">{meaning}</p></article>)}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Sparkles className="h-5 w-5" />} eyebrow="Idea Utama" title="Tema" color="#F472B6" />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6"><Pill color="#F472B6">Tema Utama</Pill><h3 className="mt-4 font-display text-lg font-bold text-white">{note.theme.title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{note.theme.explanation}</p></div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<ListChecks className="h-5 w-5" />} eyebrow="Kupas Karya" title="Persoalan" color="#60A5FA" />
        <div className="grid gap-3 sm:grid-cols-2">{note.issues.map((item, index) => <article key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"><div className="mb-3 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">{index + 1}</span><h3 className="font-bold text-white">{item.title}</h3></div><p className="text-sm leading-6 text-white/60">{item.explanation}</p><div className="mt-3"><Pill color="#60A5FA">{item.reference}</Pill></div></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Palette className="h-5 w-5" />} eyebrow="Bahasa Berkias" title="Gaya Bahasa" color="#FBBF24" />
        <div className="grid gap-3 sm:grid-cols-2">{note.language.map((item, index) => <article key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"><div className="mb-3 flex items-center gap-2"><span className="text-lg">{LANGUAGE_ICONS[index]}</span><h3 className="font-bold text-white">{item.title}</h3></div><p className="text-xs leading-5 text-white/50">{item.definition}</p><div className="mt-3 space-y-2">{item.examples.map((example) => <p key={example} className="rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-xs italic leading-5 text-amber-100/80">“{example}”</p>)}</div></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Music2 className="h-5 w-5" />} eyebrow="Dengar Irama" title="Unsur Bunyi" color="#22D3EE" />
        <div className="grid gap-3 sm:grid-cols-2">{note.sound.map((item) => <article key={item.title} className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] p-5"><Pill color="#22D3EE">{item.title}</Pill><p className="mt-3 text-sm leading-6 text-white/60">{item.definition}</p><p className="mt-2 text-sm font-semibold italic leading-6 text-white/80">“{item.example}”</p><p className="mt-2 text-[10px] font-bold text-cyan-200/55">{item.reference}</p></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Music2 className="h-5 w-5" />} eyebrow="Suasana Karya" title="Nada" color="#FB7185" />
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.07] p-5"><Pill color="#FB7185">{note.tone.title}</Pill><p className="mt-4 text-sm font-semibold leading-6 text-white/75">{note.tone.explanation}</p></div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Heart className="h-5 w-5" />} eyebrow="Bina Peribadi" title="Nilai Murni" color="#FB7185" />
        <div className="grid gap-3 sm:grid-cols-2">{note.values.map((item, index) => <article key={item.title} className="rounded-2xl border bg-white/[0.03] p-4" style={{ borderColor: `${VALUE_COLORS[index]}25` }}><div className="mb-3 flex items-center gap-2"><Heart className="h-4 w-4" style={{ color: VALUE_COLORS[index] }} /><h3 className="font-bold text-white">{item.title}</h3></div><p className="text-sm leading-6 text-white/60">{item.meaning}</p><div className="mt-3 rounded-xl bg-black/15 p-3 text-xs leading-5 text-white/70">{item.example}</div><div className="mt-3"><Pill color={VALUE_COLORS[index]}>{item.reference}</Pill></div></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<CheckCircle2 className="h-5 w-5" />} eyebrow="Amalkan" title="Pengajaran" color="#34D399" />
        <div className="grid gap-3 sm:grid-cols-2">{note.lessons.map((item) => <article key={item.title} className="flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /><div><h3 className="text-sm font-bold text-white">{item.title}</h3><p className="mt-1 text-xs leading-5 text-white/55">{item.explanation}</p></div></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<BookOpen className="h-5 w-5" />} eyebrow="Kamus Mini" title="Kosa Kata" color="#C084FC" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{note.vocabulary.map((item) => <article key={item.word} className="rounded-2xl border border-purple-300/10 bg-purple-300/[0.05] p-4"><h3 className="font-display text-base font-bold text-purple-200">{item.word}</h3><p className="mt-2 text-xs leading-5 text-white/55">{item.meaning}</p></article>)}</div>
      </StudySection>

      <StudySection>
        <div className="overflow-hidden rounded-2xl border border-purple-300/20 bg-[#151327]">
          <div className="border-b border-white/[0.07] p-5 sm:p-6"><SectionTitle icon={<Lightbulb className="h-5 w-5" />} eyebrow="Ulang Kaji Bersama" title="Cikgu AcadeMY" color="#C084FC" /><p className="text-sm leading-7 text-white/65">Cari ragam manusia dalam setiap rangkap, kemudian padankan sikap itu dengan persoalan, nilai dan pengajaran yang sesuai.</p></div>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            <TeacherTip icon={<Star className="h-4 w-4" />} title="Paling Penting" color="#FBBF24">Ingat tema ragam manusia, nada sinis dan empat nilai utama.</TeacherTip>
            <TeacherTip icon={<Target className="h-4 w-4" />} title="Soalan UASA" color="#34D399">Kenal pasti kehendak soalan sebelum memilih tema, persoalan atau pengajaran.</TeacherTip>
            <TeacherTip icon={<BookOpen className="h-4 w-4" />} title="Tip Menghafal" color="#60A5FA">Kelompokkan rangkap mengikut sikap manusia supaya maksud lebih mudah diingat.</TeacherTip>
            <TeacherTip icon={<ShieldAlert className="h-4 w-4" />} title="Kesalahan Lazim" color="#FB7185">Jangan salin maksud rangkap apabila soalan meminta pengajaran.</TeacherTip>
            <TeacherTip icon={<CheckCircle2 className="h-4 w-4" />} title="Cara Menjawab" color="#C084FC">Tulis isi dengan tepat dan sokong menggunakan rangkap atau contoh yang berkaitan.</TeacherTip>
          </div>
        </div>
      </StudySection>
    </div>
  );
}

function SectionTitle({ icon, eyebrow, title, color }: { icon: ReactNode; eyebrow: string; title: string; color: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${color}16`, color }}>{icon}</span>
      <div><p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>{eyebrow}</p><h2 className="font-display text-lg font-bold text-white">{title}</h2></div>
    </div>
  );
}

function StudySection({ children }: { children: ReactNode }) {
  return <section className="py-7 first:pt-0">{children}</section>;
}

function PantunAlamRemajaContent() {
  const note = PANTUN_ALAM_REMAJA;
  return (
    <div className="divide-y divide-white/[0.06]">
      <StudySection>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5 sm:p-6">
          <SectionTitle icon={<Target className="h-5 w-5" />} eyebrow="Fokus Pembelajaran" title="Hari ini anda akan menguasai" color="#60A5FA" />
          <p className="mb-4 max-w-2xl text-sm leading-6 text-white/60">{note.mission}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{FOCUS_ITEMS.map((item) => <div key={item} className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs font-semibold text-white/75"><Check className="h-3.5 w-3.5 text-emerald-400" />{item}</div>)}</div>
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<BookOpen className="h-5 w-5" />} eyebrow="Fahami Cerita" title="Maksud Setiap Rangkap" color="#A78BFA" />
        <div className="grid gap-3 md:grid-cols-2">
          {note.meanings.map((meaning, index) => (
            <article key={meaning} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors hover:bg-white/[0.055]">
              <div className="mb-3 flex items-center justify-between gap-3"><Pill>Rangkap {index + 1}</Pill><Quote className="h-4 w-4 text-white/20" /></div>
              <p className="text-sm leading-6 text-white/75">{meaning}</p>
              <div className="mt-4 flex flex-wrap gap-2"><Pill color="#60A5FA">{RANGKAP_TAGS[index]}</Pill><Pill color="#FB7185"><Heart className="h-3 w-3" /> {RANGKAP_VALUES[index]}</Pill></div>
            </article>
          ))}
        </div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Sparkles className="h-5 w-5" />} eyebrow="Idea Utama" title="Tema" color="#F472B6" />
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.08] p-5 sm:p-6"><Pill color="#F472B6">Tema Utama</Pill><p className="mt-4 font-display text-lg font-bold leading-7 text-white">{note.theme}</p></div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<ListChecks className="h-5 w-5" />} eyebrow="Kupas Karya" title="Persoalan" color="#60A5FA" />
        <div className="grid gap-3 sm:grid-cols-2">{note.issues.map((item, index) => <article key={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"><div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-sky-400/10 text-xs font-black text-sky-300">{index + 1}</div><p className="text-sm font-semibold leading-6 text-white/75">{item}</p></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<ListChecks className="h-5 w-5" />} eyebrow="Kenali Bentuk" title="Bentuk dan Ciri-ciri Pantun" color="#34D399" />
        <div className="flex flex-wrap gap-2">{note.form.map((item) => <Pill key={item} color="#34D399"><CheckCircle2 className="h-3 w-3" />{item}</Pill>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Sparkles className="h-5 w-5" />} eyebrow="Bahasa Berirama" title="Gaya Bahasa" color="#FBBF24" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{note.language.map((item, index) => <article key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"><div className="mb-3 flex items-center gap-2"><span className="text-lg">{LANGUAGE_ICONS[index]}</span><h3 className="font-bold text-white">{item.title}</h3></div><p className="text-xs leading-5 text-white/50">{item.definition}</p><div className="mt-3 rounded-xl bg-amber-300/[0.07] px-3 py-2.5 text-xs leading-5 text-amber-100/80"><strong>Contoh:</strong> {item.example}</div></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Music2 className="h-5 w-5" />} eyebrow="Dengar Irama" title="Unsur Bunyi" color="#22D3EE" />
        <div className="grid gap-3 sm:grid-cols-2">{note.sound.map((item) => <article key={item.title} className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] p-5"><Pill color="#22D3EE">{item.title}</Pill><p className="mt-3 text-sm leading-6 text-white/60">{item.definition}</p><p className="mt-2 text-sm font-semibold leading-6 text-white/80">{item.example}</p></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<Heart className="h-5 w-5" />} eyebrow="Bina Peribadi" title="Nilai Murni" color="#FB7185" />
        <div className="grid gap-3 sm:grid-cols-2">{note.values.map((item, index) => <article key={item.title} className="rounded-2xl border bg-white/[0.03] p-4" style={{ borderColor: `${VALUE_COLORS[index]}25` }}><div className="mb-3 flex items-center gap-2"><Heart className="h-4 w-4" style={{ color: VALUE_COLORS[index] }} /><h3 className="font-bold text-white">{item.title}</h3></div><p className="text-sm leading-6 text-white/60">{item.explanation}</p></article>)}</div>
      </StudySection>

      <StudySection>
        <SectionTitle icon={<CheckCircle2 className="h-5 w-5" />} eyebrow="Amalkan" title="Pengajaran" color="#34D399" />
        <div className="grid gap-3 sm:grid-cols-2">{note.lessons.map((item) => <article key={item} className="flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.05] p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /><p className="text-sm font-semibold leading-6 text-white/75">Kita hendaklah {item.charAt(0).toLowerCase() + item.slice(1)}</p></article>)}</div>
      </StudySection>

      <StudySection>
        <div className="overflow-hidden rounded-2xl border border-purple-300/20 bg-[#151327]">
          <div className="border-b border-white/[0.07] p-5 sm:p-6"><SectionTitle icon={<Lightbulb className="h-5 w-5" />} eyebrow="Bersama Guru" title="Cikgu AcadeMY Terangkan" color="#C084FC" /><p className="text-sm leading-7 text-white/65">{note.teacher}</p></div>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
            <TeacherTip icon={<Lightbulb className="h-4 w-4" />} title="Tahukah Anda?" color="#FBBF24">Dua baris awal pantun ialah pembayang, manakala dua baris akhir membawa maksud.</TeacherTip>
            <TeacherTip icon={<Target className="h-4 w-4" />} title="Tip Menjawab UASA" color="#34D399">Nyatakan isi, kemudian kaitkan jawapan dengan kepulangan ibu bapa dan kegembiraan anak-anak.</TeacherTip>
            <TeacherTip icon={<ShieldAlert className="h-4 w-4" />} title="Kesilapan Lazim" color="#FB7185">Jangan kelirukan tema dengan persoalan. Tema ialah gagasan utama seluruh pantun.</TeacherTip>
          </div>
        </div>
      </StudySection>
    </div>
  );
}

function TeacherTip({ icon, title, color, children }: { icon: ReactNode; title: string; color: string; children: ReactNode }) {
  return <div className="bg-[#111022] p-5"><div className="mb-2 flex items-center gap-2 text-xs font-black" style={{ color }}>{icon}{title}</div><p className="text-xs leading-5 text-white/55">{children}</p></div>;
}

export function BMForm2KomsasWorkStructure({ work }: { work: Form2KomsasWork }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex min-h-20 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] sm:px-6">
        <span className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-300/10 text-purple-300"><BookOpen className="h-5 w-5" /></span><span><span className="block text-[9px] font-black uppercase tracking-widest text-purple-300/65">Folder Pembelajaran</span><span className="mt-1 block font-display text-base font-bold text-white sm:text-lg">{work.title}</span></span></span>
        <ChevronDown className="h-5 w-5 shrink-0 text-purple-300 transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : undefined }} />
      </button>
      <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
        <div className="overflow-hidden"><div className="border-t border-white/[0.07] p-3 sm:p-5"><WorkHero work={work} />{work.id === "pantun-alam-remaja" && <PantunAlamRemajaContent />}{work.id === "pantun-kiasan" && <PantunKiasanContent />}</div></div>
      </div>
    </section>
  );
}

export function BMForm2KomsasStructure({ onSelectWork }: { onSelectWork: (workId: string) => void }) {
  return <div>{BM_FORM2_KOMSAS_CATEGORIES.map((category) => { const works = BM_FORM2_KOMSAS_WORKS.filter((work) => work.category === category); return <section key={category} className="mb-8"><div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-[11px] font-black uppercase tracking-wide" style={{ color: ACCENT }}>{category}</h2><span className="text-[10px] font-bold text-white/30">{works.length}</span></div><div className="grid gap-3 sm:grid-cols-2">{works.map((work, index) => <WorkCard key={work.id} work={work} index={index + 1} onSelect={() => onSelectWork(work.id)} />)}</div></section>; })}</div>;
}
