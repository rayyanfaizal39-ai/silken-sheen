import { useState, type ReactNode } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileQuestion,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Route,
  Sparkles,
  Star,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { MENITI_IMPIAN as note } from "@/data/bm-form2-meniti-impian";

const icons = { summary: Clock3, theme: Sparkles, issues: Lightbulb, characters: Users, setting: MapPin, values: Heart, technique: Target, questions: FileQuestion, extra: BookOpen } as const;

function Section({ title, eyebrow, color, icon, children }: { title: string; eyebrow: string; color: string; icon: keyof typeof icons; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const Icon = icons[icon];
  return (
    <section className="overflow-hidden border-b border-white/[0.06] last:border-0">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex min-h-20 w-full items-center justify-between gap-4 px-1 py-5 text-left transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-300/60 sm:px-2">
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ color, background: `${color}12`, borderColor: `${color}28` }}><Icon className="h-5 w-5" /></span>
          <span>
            <span className="block text-[9px] font-black uppercase tracking-[0.2em]" style={{ color }}>{eyebrow}</span>
            <span className="mt-1 block font-display text-base font-bold text-white sm:text-lg">{title}</span>
          </span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none" style={{ color, transform: open ? "rotate(180deg)" : undefined }} />
      </button>
      <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
        <div className="overflow-hidden"><div className="pb-7 pt-1">{children}</div></div>
      </div>
    </section>
  );
}

function Fold({ title, color, children }: { title: string; color: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/30">
        <span className="text-sm font-bold text-white">{title}</span>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none" style={{ color, transform: open ? "rotate(180deg)" : undefined }} />
      </button>
      <div className="grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
        <div className="overflow-hidden"><div className="border-t border-white/[0.06] p-4">{children}</div></div>
      </div>
    </article>
  );
}

function Label({ children, tone = "sky" }: { children: ReactNode; tone?: "sky" | "amber" | "emerald" }) {
  const styles = { sky: "bg-sky-300/[0.1] text-sky-200", amber: "bg-amber-300/[0.1] text-amber-200", emerald: "bg-emerald-300/[0.1] text-emerald-200" };
  return <span className={`inline-flex rounded-md px-2 py-1 text-[9px] font-black uppercase tracking-widest ${styles[tone]}`}>{children}</span>;
}

function AnswerParts({ point, event, answer }: { point: string; event: string; answer?: string }) {
  return (
    <div className="space-y-3 text-sm leading-6">
      <div><Label>Isi</Label><p className="mt-1.5 font-semibold text-white/80">{point}</p></div>
      <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.055] p-3"><Label tone="amber">Peristiwa</Label><p className="mt-1.5 text-white/70">{event}</p></div>
      {answer && <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.055] p-3"><Label tone="emerald">Ayat jawapan siap guna</Label><p className="mt-1.5 text-white/75">{answer}</p></div>}
    </div>
  );
}

const milestones = ["Zahar gagal memasuki Tingkatan Enam", "Bekerja di bengkel Pak Yusuf", "Belajar Pertukangan Perabot di IKM", "Dipandang rendah oleh Suhaili", "Cemerlang di IKM", "Menjalani latihan praktikal di Kamunting", "Membuka Bengkel Perabot Meniti Impian"];

const issues = note.issues.slice(0, 5).map((item) => ({ ...item, answer: `Antara persoalan yang terdapat dalam novel ini ialah persoalan ${item.title.toLowerCase()}. Buktinya, ${item.example.charAt(0).toLowerCase() + item.example.slice(1)}` }));
const zahar = note.characters[0];

const times = [
  { title: "Selepas berhenti sekolah", example: "Zahar bekerja di Bengkel Perabot Pak Yusuf selepas berhenti sekolah." },
  { title: "Selepas kematian bapanya", example: "Zahar membantu Pak Yusuf di bengkel serta membantu ibunya menganyam tikar selepas kematian bapanya." },
  { title: "Selepas tamat pengajian", example: "Zahar gigih membuka bengkel sendiri selepas tamat pengajian." },
];

const lessons = [
  { point: note.lessons[0], event: "Zahar gigih membuka bengkel sendiri selepas tamat pengajian." },
  { point: note.lessons[1], event: "Zahar membantu Pak Yusuf di bengkel serta membantu ibunya menganyam tikar selepas kematian bapanya." },
  { point: note.lessons[2], event: "Zahar memastikan adik-adiknya dapat meneruskan pelajaran." },
];

const questions = [
  ["Tema", "Jelaskan tema novel Meniti Impian berserta satu peristiwa yang sesuai."],
  ["Persoalan", "Huraikan dua persoalan yang terdapat dalam novel Meniti Impian."],
  ["Watak", "Siapakah watak utama novel Meniti Impian? Jelaskan kepentingannya."],
  ["Perwatakan", "Nyatakan dua perwatakan Zahar berserta peristiwa yang sesuai."],
  ["Latar", "Huraikan dua latar yang terdapat dalam novel Meniti Impian."],
  ["Nilai", "Jelaskan dua nilai murni berserta peristiwa dalam novel Meniti Impian."],
  ["Pengajaran", "Nyatakan dua pengajaran yang boleh diperoleh daripada novel Meniti Impian."],
  ["Plot", "Jelaskan satu peristiwa pada bahagian klimaks atau peleraian novel Meniti Impian."],
] as const;

const unavailable = "Maklumat ini tidak dinyatakan dalam kandungan akademik yang dibekalkan.";

export function BMForm2MenitiImpianContent() {
  return (
    <div>
      <section className="relative mb-3 overflow-hidden rounded-2xl border border-orange-300/20 bg-[#12111f] p-5 sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(251,146,60,0.18),transparent_46%),radial-gradient(circle_at_10%_100%,rgba(192,132,252,0.1),transparent_42%)]" />
        <div className="relative flex items-start gap-4">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-300/[0.1] text-orange-300 sm:flex"><BookOpen className="h-7 w-7" /></span>
          <div>
            <div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full border border-orange-300/25 bg-orange-300/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange-200">KOMSAS Novel</span><span className="rounded-full border border-amber-300/25 bg-amber-300/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-200">Fokus UASA</span></div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">Meniti Impian</h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/50"><span className="inline-flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" /> Penulis: Tidak dinyatakan</span><span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> Tingkatan 2</span></div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">Hafal isi, kaitkan dengan peristiwa dan bina jawapan lengkap untuk mendapatkan markah penuh.</p>
          </div>
        </div>
      </section>

      <Section title="Ringkasan Cerita 30 Saat" eyebrow="Aliran cerita sahaja" color="#38BDF8" icon="summary">
        <div className="mx-auto max-w-xl space-y-2">{milestones.map((item, index) => <div key={item}><div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.055] px-4 py-3 text-center text-sm font-semibold text-white/80">{item}</div>{index < milestones.length - 1 && <div className="py-1 text-center text-sky-300/45">↓</div>}</div>)}</div>
      </Section>

      <Section title="Tema Wajib Hafal" eyebrow="Wajib hafal" color="#F472B6" icon="theme">
        <div className="rounded-2xl border border-pink-300/20 bg-pink-300/[0.065] p-5"><Label>Isi</Label><p className="mt-2 font-display text-lg font-bold leading-8 text-white">{note.theme}</p><div className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/[0.055] p-3"><Label tone="amber">Peristiwa</Label><p className="mt-2 text-sm leading-6 text-white/70">Zahar mengikuti kursus Pertukangan Perabot di IKM dan berjaya membuka bengkel perabot sendiri.</p></div></div>
      </Section>

      <Section title="Persoalan Wajib Hafal" eyebrow="5 isi pilihan" color="#60A5FA" icon="issues">
        <div className="space-y-3">{issues.map((item) => <Fold key={item.title} title={item.title} color="#60A5FA"><AnswerParts point={item.title} event={item.example} answer={item.answer} /></Fold>)}</div>
      </Section>

      <Section title="Watak & Perwatakan Wajib Hafal" eyebrow="Watak utama sahaja" color="#FBBF24" icon="characters">
        <div className="mb-3 flex items-center gap-2"><Star className="h-4 w-4 text-amber-300" /><p className="font-bold text-white">Watak utama: {zahar.name}</p></div>
        <div className="space-y-3">{zahar.traits.map((trait) => <Fold key={trait.title} title={trait.title} color="#FBBF24"><AnswerParts point={trait.title} event={trait.example} answer={`Zahar seorang yang ${trait.title.toLowerCase()}. Buktinya, ${trait.example.charAt(0).toLowerCase() + trait.example.slice(1)}`} /></Fold>)}</div>
      </Section>

      <Section title="Latar Wajib Hafal" eyebrow="Tempat · Masa · Masyarakat" color="#A78BFA" icon="setting">
        <div className="space-y-3">
          {[{ group: "Tempat", entries: note.settings.filter((item) => item.group === "Latar Tempat") }, { group: "Masa", entries: times }, { group: "Masyarakat", entries: note.settings.filter((item) => item.group === "Latar Masyarakat") }].map(({ group, entries }) => <Fold key={group} title={group} color="#A78BFA"><div className="space-y-3">{entries.map((item) => <AnswerParts key={item.title} point={item.title} event={item.example} />)}</div></Fold>)}
        </div>
      </Section>

      <Section title="Nilai & Pengajaran Wajib Hafal" eyebrow="Isi lengkap dengan bukti" color="#34D399" icon="values">
        <div className="mb-5"><h3 className="mb-3 flex items-center gap-2 font-bold text-white"><Heart className="h-4 w-4 text-rose-300" />Nilai</h3><div className="space-y-3">{note.values.map((item) => <Fold key={item.title} title={item.title} color="#FB7185"><AnswerParts point={item.title} event={item.example} answer={`Antara nilai yang terdapat dalam novel ini ialah nilai ${item.title.toLowerCase()}. Buktinya, ${item.example.charAt(0).toLowerCase() + item.example.slice(1)}`} /></Fold>)}</div></div>
        <div><h3 className="mb-3 flex items-center gap-2 font-bold text-white"><CheckCircle2 className="h-4 w-4 text-emerald-300" />Pengajaran</h3><div className="space-y-3">{lessons.map((item) => <Fold key={item.point} title={item.point} color="#34D399"><AnswerParts point={item.point} event={item.event} answer={`${item.point} Contohnya, ${item.event.charAt(0).toLowerCase() + item.event.slice(1)}`} /></Fold>)}</div></div>
      </Section>

      <Section title="Teknik Menjawab Markah Penuh" eyebrow="Formula UASA" color="#FB923C" icon="technique">
        <div className="rounded-2xl border border-orange-300/20 bg-orange-300/[0.06] p-5"><div className="grid gap-2 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className="rounded-xl bg-sky-300/[0.1] p-3 font-black text-sky-200">Isi</div><span className="self-center text-white/30">+</span><div className="rounded-xl bg-amber-300/[0.1] p-3 font-black text-amber-200">Peristiwa</div><span className="self-center text-white/30">+</span><div className="rounded-xl bg-emerald-300/[0.1] p-3 font-black text-emerald-200">Huraian</div></div><div className="mt-5 rounded-xl border border-white/[0.08] bg-black/10 p-4"><p className="text-[10px] font-black uppercase tracking-widest text-orange-200">Contoh jawapan lengkap</p><p className="mt-3 text-sm leading-7 text-white/75">Antara nilai yang terdapat dalam novel ini ialah nilai kegigihan. Buktinya, Zahar gigih mengikuti kursus Pertukangan Perabot di IKM Sungai Petani walaupun pernah dihina oleh Suhaili. Hal ini menunjukkan bahawa usaha yang berterusan mampu membawa seseorang kepada kejayaan.</p></div></div>
      </Section>

      <Section title="Soalan Ramalan UASA" eyebrow="Jenis soalan lazim" color="#C084FC" icon="questions">
        <p className="mb-4 text-xs leading-5 text-white/45">Soalan latihan berdasarkan bentuk soalan lazim, bukan ramalan kertas peperiksaan sebenar.</p><div className="space-y-3">{questions.map(([type, question]) => <Fold key={type} title={type} color="#C084FC"><p className="text-sm font-semibold leading-6 text-white/75">{question}</p></Fold>)}</div>
      </Section>

      <Section title="Bacaan Tambahan" eyebrow="Pilihan · Tidak wajib hafal dahulu" color="#94A3B8" icon="extra">
        <div className="space-y-3">
          <Fold title="Fokus pembelajaran" color="#94A3B8"><p className="text-sm leading-7 text-white/65">{note.focus}</p></Fold>
          <Fold title="Sinopsis penuh" color="#94A3B8"><div className="space-y-3">{note.plot.map((item) => <div key={item.title} className="rounded-xl bg-white/[0.035] p-3"><p className="font-bold text-white">{item.title}</p><p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p></div>)}</div></Fold>
          <Fold title="Plot penuh" color="#94A3B8"><div className="relative space-y-3 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-white/10">{note.plot.map((item, index) => <div key={item.title} className="relative flex gap-3"><span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-600 text-xs font-black text-white">{index + 1}</span><div className="rounded-xl bg-white/[0.035] p-3"><p className="font-bold text-white">{item.title}</p><p className="mt-1 text-sm leading-6 text-white/60">{item.text}</p></div></div>)}</div></Fold>
          <Fold title="Watak sampingan" color="#94A3B8"><div className="space-y-3">{note.characters.slice(1).map((character) => <div key={character.name} className="rounded-xl bg-white/[0.035] p-3"><p className="font-bold text-white">{character.name}</p>{character.traits.map((trait) => <p key={trait.title} className="mt-2 text-sm leading-6 text-white/60"><strong className="text-white/75">{trait.title}:</strong> {trait.example}</p>)}</div>)}</div></Fold>
          <Fold title="Persoalan tambahan" color="#94A3B8"><AnswerParts point={note.issues[5].title} event={note.issues[5].example} /></Fold>
          <Fold title="Hubungan watak, konflik dan kata kunci" color="#94A3B8"><div className="space-y-4 text-sm leading-6 text-white/65"><p><strong className="text-white">Hubungan watak:</strong> Zahar menyayangi Mak Kiah, adik-adiknya dan Pak Yusuf; mempunyai hubungan istimewa dengan Norimi; menerima galakan daripada Tauke Lim; serta berkonflik dengan Suhaili.</p><p><strong className="text-white">Konflik:</strong> Suhaili memandang rendah lulusan IKM dan Zahar berasa terhina. Penghinaan itu membakar semangat Zahar untuk berjaya.</p><p><strong className="text-white">Kata kunci:</strong> Zahar · IKM · MARA · Berdikari · Gigih · Pengorbanan · Keluarga · Pertukangan Perabot.</p></div></Fold>
          <Fold title="Teknik plot" color="#94A3B8"><p className="text-sm text-white/50">{unavailable}</p></Fold>
          <Fold title="Gaya bahasa" color="#94A3B8"><p className="text-sm text-white/50">{unavailable}</p></Fold>
          <Fold title="Butiran tambahan" color="#94A3B8"><p className="text-sm leading-6 text-white/60">Pak Yusuf memberikan RM5,000 kepada Zahar untuk memulakan bengkel. Mak Kiah menyara keluarga dengan menoreh getah dan menganyam tikar walaupun sering sakit. Norimi ialah pelajar jurusan Lukisan Seni Bina di IKM. Tauke Lim ialah pemilik kedai basikal yang rapat dengan masyarakat Melayu.</p></Fold>
        </div>
      </Section>
    </div>
  );
}
