import { ArrowRight, AlertTriangle, BookOpen, Check, Construction, FolderOpen, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

export interface WritingSection {
  id: string;
  title: string;
}

export const FORM2_WRITING_SECTIONS: Record<string, WritingSection[]> = {
  "karangan-pendek": [
    { id: "asas", title: "Asas Karangan Pendek" },
    { id: "langkah-menulis", title: "Langkah Menulis Karangan" },
    { id: "contoh-latihan", title: "Contoh & Latihan" },
  ],
  "respons-terbuka": [
    { id: "asas", title: "Asas Karangan Panjang" },
    { id: "langkah-menulis", title: "Langkah Menulis Karangan" },
    { id: "contoh-latihan", title: "Contoh & Latihan" },
  ],
  "bengkel-karangan": [
    { id: "penerangan-ringkas", title: "Penerangan Ringkas" },
    { id: "objektif-pembelajaran", title: "Objektif Pembelajaran" },
    { id: "cara-guna", title: "Cara Guna" },
    { id: "langkah-demi-langkah", title: "Langkah Demi Langkah" },
    { id: "formula-ihcp", title: "Formula I-H-C-P" },
    { id: "kematangan-ayat", title: "Teknik Meningkatkan Kematangan Ayat" },
    { id: "contoh-perenggan", title: "Contoh Lengkap Perenggan" },
    { id: "tips-guru", title: "Tips Guru" },
    { id: "kesalahan-lazim", title: "Kesalahan Lazim" },
    { id: "aktiviti-latihan", title: "Aktiviti Latihan" },
    { id: "checklist-penulisan", title: "Checklist Penulisan" },
    { id: "ringkasan", title: "Ringkasan" },
  ],
  "model-karangan-bank": [
    { id: "fakta", title: "Fakta" }, { id: "pendapat", title: "Pendapat" },
    { id: "perbincangan", title: "Perbincangan" }, { id: "pengalaman", title: "Pengalaman" },
    { id: "surat-rasmi", title: "Surat Rasmi" }, { id: "surat-tidak-rasmi", title: "Surat Tidak Rasmi" },
    { id: "laporan", title: "Laporan" }, { id: "ucapan", title: "Ucapan" },
    { id: "syarahan", title: "Syarahan" }, { id: "dialog", title: "Dialog" },
  ],
  "peribahasa-bank": [
    { id: "asas-formula", title: "Asas & Formula" },
    { id: "teknik-menjawab", title: "Teknik Menjawab" },
    { id: "contoh-latihan", title: "Contoh & Latihan" },
  ],
  "tingkatkan-karangan": [
    { id: "asas-formula", title: "Rahsia Karangan Cemerlang" },
    { id: "teknik-menjawab", title: "Formula I-H-C-P untuk Isi Matang" },
    { id: "contoh-latihan", title: "Latihan Transformasi Ayat dan Kosa Kata" },
  ],
};

export function getWritingSection(hubId: string, sectionId: string) {
  return FORM2_WRITING_SECTIONS[hubId]?.find((section) => section.id === sectionId);
}

export function BMForm2WritingHubStructure({ hubId, color, onSelect }: { hubId: string; color: string; onSelect: (sectionId: string) => void }) {
  const sections = FORM2_WRITING_SECTIONS[hubId] ?? [];
  return <section aria-label="Folder pembelajaran" className="grid gap-3 sm:grid-cols-2">
    {sections.map((section, index) => <button key={section.id} type="button" onClick={() => onSelect(section.id)} className="group flex min-h-28 items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-left transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:translate-y-0 motion-reduce:transition-none" style={{ borderColor: `${color}24` }}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ color, background: `${color}14` }}><FolderOpen className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block text-[10px] font-black uppercase tracking-[0.16em]" style={{ color }}>Folder {String(index + 1).padStart(2, "0")}</span><span className="mt-1 block font-display text-sm font-bold leading-6 text-white">{section.title}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></button>)}
  </section>;
}

export function BMForm2WritingSectionPlaceholder({ title, color }: { title: string; color: string }) {
  return <section className="relative overflow-hidden rounded-[1.75rem] border p-6 sm:p-8" style={{ borderColor: `${color}30`, background: `linear-gradient(145deg, ${color}12, rgba(8,12,26,.86))` }}><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ color, background: `${color}16` }}><Construction className="h-6 w-6" /></span><div><p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color }}>Struktur Disediakan</p><h1 className="mt-1 font-display text-xl font-black text-white sm:text-2xl">{title}</h1><p className="mt-3 max-w-xl text-sm leading-7 text-white/55">Kandungan pembelajaran akan ditambahkan pada peringkat seterusnya.</p></div></div></section>;
}

function LessonSection({
  title,
  children,
  accent,
  icon,
}: {
  title: string;
  children: ReactNode;
  accent: string;
  icon?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-4">
        {icon && <span style={{ color: accent }}>{icon}</span>}
        <h3 className="font-display text-base font-bold text-white">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warn" | "info" }) {
  const cls =
    tone === "success"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : tone === "warn"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-200"
        : tone === "info"
          ? "border-sky-400/20 bg-sky-400/10 text-sky-200"
          : "border-white/10 bg-white/5 text-white/70";
  return <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${cls}`}>{children}</span>;
}

export function BMForm2BengkelKaranganContent({ color }: { color: string }) {
  const objectiveItems = [
    "Mengembangkan isi menggunakan 5W1H",
    "Menggunakan formula I-H-C-P",
    "Membina ayat majmuk",
    "Menghubungkan idea menggunakan penanda wacana",
  ];

  const steps = [
    { title: "Pilih Isi", text: "Pilih isi yang paling relevan dengan tema dan bahan rangsangan." },
    { title: "Gunakan Teknik 5W1H", text: "Tanya siapa, apa, bila, di mana, mengapa dan bagaimana untuk mengembangkan isi." },
    { title: "Berikan Contoh", text: "Sokong isi dengan contoh yang dekat dengan pengalaman murid Form 2." },
    { title: "Penegasan", text: "Tutup isi dengan ayat penegas supaya perenggan lebih matang." },
    { title: "Gunakan Penanda Wacana", text: "Sambungkan perenggan dengan ayat penghubung yang sesuai." },
  ];

  const improvements = [
    { from: "Masalah", to: ["Kemelut", "Polemik"] },
    { from: "Sangat penting", to: ["Amat signifikan", "Sangat bererti"] },
    { from: "Contohnya", to: ["Sebagai contoh", "Tamsilnya"] },
  ];

  const mistakes = [
    {
      title: "Ayat tergantung",
      text: "Ayat tidak lengkap dan pembaca sukar memahami maksud sebenar.",
    },
    {
      title: "Pemerengganan tidak seimbang",
      text: "Satu perenggan terlalu panjang manakala yang lain terlalu pendek.",
    },
    {
      title: "Pengulangan kata",
      text: "Perkataan yang sama diulang terlalu kerap sehingga karangan jadi lemah.",
    },
  ];

  const checklist = [
    "Isi sesuai dengan tema",
    "Setiap perenggan mempunyai Isi, Huraian, Contoh dan Penegasan",
    "Ayat majmuk digunakan",
    "Penanda wacana digunakan dengan betul",
    "Bahasa gramatis dan ejaan tepat",
    "Contoh yang relevan dan mudah difahami",
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-emerald-300/20 bg-[#101826] p-5 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(52,211,153,0.18),transparent_45%),radial-gradient(circle_at_8%_100%,rgba(59,130,246,0.1),transparent_40%)]" />
        <div className="relative max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Bengkel Karangan</p>
          <h1 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">Seni Penulisan Karangan Matang &amp; Gramatis</h1>
          <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
            Modul ini membantu murid beralih daripada penulisan asas sekolah rendah kepada penulisan
            Form 2 yang lebih matang, tersusun dan gramatis.
          </p>
        </div>
      </section>

      <LessonSection title="Penerangan Ringkas" accent={color} icon={<BookOpen className="h-4 w-4" />}>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/75">
          Bengkel Karangan ialah ruang latihan untuk membimbing murid membina karangan yang lebih
          matang, tersusun dan meyakinkan. Murid belajar menyusun idea, mengembangkan isi dan
          memilih bahasa yang lebih gramatis.
        </div>
      </LessonSection>

      <LessonSection title="Objektif Pembelajaran" accent={color} icon={<Check className="h-4 w-4" />}>
        <div className="grid gap-2 sm:grid-cols-2">
          {objectiveItems.map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection title="Cara Guna" accent={color} icon={<Sparkles className="h-4 w-4" />}>
        <div className="rounded-xl border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-7 text-sky-100">
          Gunakan modul ini semasa menulis <strong>Bahagian B (Respons Terbuka)</strong>. Setiap
          perenggan isi perlu ada <strong>Isi</strong>, <strong>Huraian</strong>, <strong>Contoh</strong> dan{" "}
          <strong>Penegasan</strong>.
        </div>
      </LessonSection>

      <LessonSection title="Langkah Demi Langkah" accent={color} icon={<ArrowRight className="h-4 w-4" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
                  {i + 1}
                </span>
                <p className="text-sm font-bold text-white">{step.title}</p>
              </div>
              <p className="text-sm leading-6 text-white/70">{step.text}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection title="Formula I-H-C-P" accent={color} icon={<BookOpen className="h-4 w-4" />}>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="grid grid-cols-[72px_1fr_1.2fr] bg-white/[0.03] text-[10px] font-black uppercase tracking-wide text-white/40">
            <div className="px-3 py-2">Kod</div>
            <div className="px-3 py-2">Komponen</div>
            <div className="px-3 py-2">Cara Menulis</div>
          </div>
          {[
            ["I", "Isi", "Nyatakan idea utama yang sesuai dengan tajuk."],
            ["H", "Huraian", "Jelaskan sebab, kesan atau cara isi itu berlaku."],
            ["C", "Contoh", "Berikan contoh yang dekat dengan kehidupan murid."],
            ["P", "Penegasan", "Tutup perenggan dengan ayat penegas yang jelas."],
          ].map((row, i) => (
            <div key={row[0]} className={`grid grid-cols-[72px_1fr_1.2fr] ${i !== 3 ? "border-t border-white/5" : ""}`}>
              <div className="px-3 py-3">
                <span className="inline-flex rounded-lg px-2 py-1 text-[10px] font-black" style={{ background: `${color}25`, color }}>
                  {row[0]}
                </span>
              </div>
              <div className="px-3 py-3 text-sm font-semibold text-white">{row[1]}</div>
              <div className="px-3 py-3 text-sm leading-6 text-white/70">{row[2]}</div>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection title="Teknik Meningkatkan Kematangan Ayat" accent={color} icon={<Sparkles className="h-4 w-4" />}>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-[10px] font-black uppercase tracking-wide text-white/40">Ayat Biasa</p>
            <p className="mt-2 text-sm leading-7 text-white/70">Masalah itu perlu diselesaikan segera.</p>
            <p className="my-3 text-center text-white/25">↓</p>
            <p className="text-[10px] font-black uppercase tracking-wide text-white/40">Ayat Cemerlang</p>
            <p className="mt-2 text-sm leading-7 text-white/80">
              Kemelut ini perlu ditangani dengan segera agar tidak menjadi polemik yang lebih serius.
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/40">Sinonim Mudah &amp; Matang</p>
            <div className="grid gap-2 md:grid-cols-3">
              {improvements.map((item) => (
                <div key={item.from} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <p className="text-sm font-bold text-white">{item.from}</p>
                  <p className="mt-2 space-y-1 text-sm text-white/75">
                    {item.to.map((word, i) => (
                      <span key={word} className="block">
                        {i === 0 ? "↓ " : "↓ "}
                        <span className="font-semibold" style={{ color }}>{word}</span>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Contoh Lengkap Perenggan" accent={color} icon={<BookOpen className="h-4 w-4" />}>
        <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-white/40">Soalan</p>
            <p className="mt-1 text-sm leading-7 text-white/75">Huraikan kepentingan menghargai jasa guru.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-white/40">Isi</p>
            <p className="mt-1 text-sm leading-7 text-white/75">Menghargai jasa guru dapat memupuk rasa hormat dalam diri murid.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-white/40">Full Paragraph</p>
            <p className="mt-2 text-sm leading-7 text-white/80">
              <Pill tone="success">Isi</Pill>{" "}
              Menghargai jasa guru dapat memupuk rasa hormat dalam diri murid.{" "}
              <Pill tone="info">Huraian</Pill>{" "}
              Hal ini demikian kerana guru bertungkus lumus mendidik kita tanpa mengira masa.{" "}
              <Pill tone="warn">Contoh</Pill>{" "}
              Sebagai contoh, murid boleh mengucapkan terima kasih dan menjaga adab ketika di sekolah.{" "}
              <Pill tone="success">Penegasan</Pill>{" "}
              Tegasnya, penghargaan terhadap guru menjadikan murid lebih beradab dan bertanggungjawab.
            </p>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Tips Guru" accent={color} icon={<Sparkles className="h-4 w-4" />}>
        <div className="grid gap-2 md:grid-cols-3">
          {[
            ["Ayat Majmuk", "Galakkan murid menggabungkan dua idea dalam satu ayat yang jelas."],
            ["Penanda Wacana", "Latih murid menggunakan penanda wacana untuk melicinkan aliran idea."],
            ["Kaitan KOMSAS", "Minta murid kaitkan nilai murni dan pengajaran apabila sesuai."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
              <p className="text-sm font-bold text-emerald-100">{title}</p>
              <p className="mt-1 text-sm leading-6 text-white/75">{text}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection title="Kesalahan Lazim" accent={color} icon={<AlertTriangle className="h-4 w-4" />}>
        <div className="space-y-2.5">
          {mistakes.map((item) => (
            <div key={item.title} className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3">
              <p className="text-sm font-bold text-amber-100">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-white/75">{item.text}</p>
            </div>
          ))}
        </div>
      </LessonSection>

      <LessonSection title="Aktiviti Latihan" accent={color} icon={<BookOpen className="h-4 w-4" />}>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm font-bold text-white">Aktiviti 1 - Latihan Membina Ayat Gramatis</p>
            <div className="mt-3 space-y-2 text-sm text-white/75">
              {[
                "Guru memberi nasihat yang berguna kepada murid.",
                "Murid membantu membersihkan kelas selepas waktu belajar.",
                "Kita perlu menghormati orang yang berjasa kepada kita.",
              ].map((sentence, i) => (
                <div key={sentence} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="font-semibold text-white/55">Ayat {i + 1}.</p>
                  <p className="mt-1">{sentence}</p>
                  <div className="mt-3 border-t border-dashed border-white/10 pt-3 text-white/35">Ruang jawapan murid: __________________________________</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm font-bold text-white">Aktiviti 2 - Latihan Mengembangkan Isi</p>
            <p className="mt-2 text-sm leading-7 text-white/75">Tajuk: <strong>Menghargai jasa guru</strong></p>
            <p className="mt-1 text-sm leading-7 text-white/75">Tulis 60–80 patah perkataan menggunakan I-H-C-P.</p>
            <div className="mt-3 rounded-lg border border-dashed border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/35">
              Ruang latihan murid:
              <div className="mt-3 h-24 rounded-lg border border-white/5 bg-white/[0.02]" />
            </div>
          </div>
        </div>
      </LessonSection>

      <LessonSection title="Checklist Penulisan" accent={color} icon={<Check className="h-4 w-4" />}>
        <div className="space-y-2">
          {checklist.map((item) => (
            <label key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
              <input type="checkbox" className="mt-1 accent-emerald-400" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </LessonSection>

      <LessonSection title="Ringkasan" accent={color} icon={<BookOpen className="h-4 w-4" />}>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-7 text-white/75">
          <ul className="space-y-2">
            <li>• Kematangan huraian sangat penting.</li>
            <li>• Ketepatan bahasa mesti dijaga.</li>
            <li>• Ayat majmuk menjadikan penulisan lebih mantap.</li>
            <li>• Contoh yang relevan mengukuhkan isi.</li>
            <li>• Jangan hanya memberi isi tanpa huraian.</li>
          </ul>
        </div>
      </LessonSection>
    </div>
  );
}
