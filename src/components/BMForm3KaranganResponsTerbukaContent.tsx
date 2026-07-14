import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  PenLine,
  Star,
} from "lucide-react";
import {
  CorrectWrongExample,
  ExamSkillLanding,
  FinalChecklist,
  MissionPageShell,
  MissionSection,
  NumberedStep,
  QuickScoreCard,
  WarningCard,
  type MissionDefinition,
} from "@/components/exam-skill/MissionLearning";
import {
  ASAS_RESPONS_CHECKLIST,
  ASAS_RESPONS_MISTAKES,
  ASAS_RESPONS_OBJECTIVES,
  ASAS_RESPONS_STEPS,
  BM_FORM3_RESPONS_TERBUKA_SECTIONS,
  IHCP_ROWS,
  LATIHAN_RESPONS_CHECKLIST,
  LATIHAN_RESPONS_MISTAKES,
  MODEL_ESSAY_PARAGRAPHS,
  TEKNIK_RESPONS_CHECKLIST,
  TEKNIK_RESPONS_MISTAKES,
  TEKNIK_RESPONS_OBJECTIVES,
  TEKNIK_RESPONS_STEPS,
  WEAK_RESPONS_CORRECTIONS,
  countResponsTerbukaWords,
  type BMForm3ResponsTerbukaSectionId,
} from "@/data/bm-form3-karangan-respons-terbuka";

const SECTION_ICONS = [Star, PenLine, Brain];
const SECTION_COLORS = ["#FBBF24", "#60A5FA", "#C084FC"];

const missions: MissionDefinition[] = BM_FORM3_RESPONS_TERBUKA_SECTIONS.map((section, index) => ({
  number: String(index + 1).padStart(2, "0"),
  kindLabel: "Folder",
  title: section.lessonTitle,
  description: section.description,
  icon: SECTION_ICONS[index],
  color: SECTION_COLORS[index],
}));

function ObjectiveGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 text-sm leading-6 text-white/70"
        >
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ChipList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
          style={{ borderColor: `${color}28`, background: `${color}0d`, color }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function StepList({ steps, color }: { steps: typeof ASAS_RESPONS_STEPS; color: string }) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step.title}>
          <NumberedStep index={index} text={`${step.title} — ${step.text}`} color={color} />
          {step.items.length > 0 && (
            <div className="ml-9">
              <ChipList items={step.items} color={color} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <thead className="bg-white/[0.045] text-[10px] font-black uppercase tracking-widest text-white/45">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="border-t border-white/[0.06]">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className={`px-4 py-3 text-sm leading-6 ${cellIndex === 0 ? "font-semibold text-white/85" : "text-white/65"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExampleBlock({
  label,
  children,
  color = "#34D399",
}: {
  label: string;
  children: ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-xl border bg-black/15 p-4" style={{ borderColor: `${color}25` }}>
      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>
        {label}
      </p>
      <div className="mt-2 text-sm leading-7 text-white/75">{children}</div>
    </div>
  );
}

function TeacherTips({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4"
        >
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p className="text-sm leading-6 text-white/70">{item}</p>
        </div>
      ))}
    </div>
  );
}

function SummaryCard({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.08] to-purple-300/[0.05] p-5 sm:p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Ringkasan</p>
      <p className="mt-3 text-sm leading-7 text-white/75">{children}</p>
    </section>
  );
}

function AnswerReveal({
  children,
  label = "Lihat Cadangan Jawapan",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-purple-300/20 bg-purple-300/[0.045]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-bold text-purple-100 transition-colors hover:bg-purple-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-300/60"
      >
        {open ? "Sembunyikan Jawapan" : label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] p-4 text-sm leading-7 text-white/75">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({
  title,
  children,
  answer,
}: {
  title: string;
  children: ReactNode;
  answer?: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <h3 className="font-display text-base font-bold text-white">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-white/70">{children}</div>
      {answer && <AnswerReveal>{answer}</AnswerReveal>}
    </article>
  );
}

function LessonNavigation({
  index,
  onBack,
  onNavigate,
}: {
  index: number;
  onBack: () => void;
  onNavigate: (sectionId: BMForm3ResponsTerbukaSectionId) => void;
}) {
  const previous = BM_FORM3_RESPONS_TERBUKA_SECTIONS[index - 1];
  const next = BM_FORM3_RESPONS_TERBUKA_SECTIONS[index + 1];
  return (
    <nav
      aria-label="Navigasi pelajaran Karangan Respons Terbuka"
      className="grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3"
    >
      <button
        type="button"
        onClick={previous ? () => onNavigate(previous.id) : onBack}
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-xs font-bold text-white/65 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <ArrowLeft className="h-4 w-4" />
        {previous ? previous.folderTitle : "Semua Folder"}
      </button>
      <button
        type="button"
        onClick={onBack}
        className="min-h-12 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-xs font-bold text-white/65 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        Gambaran Keseluruhan
      </button>
      {next ? (
        <button
          type="button"
          onClick={() => onNavigate(next.id)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
          style={{
            borderColor: `${SECTION_COLORS[index]}40`,
            background: `${SECTION_COLORS[index]}12`,
            color: SECTION_COLORS[index],
          }}
        >
          {next.folderTitle}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}

function AsasContent({ checked, onToggle }: { checked: boolean[]; onToggle: (i: number) => void }) {
  return (
    <>
      <section className="rounded-2xl border border-indigo-300/20 bg-indigo-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Karangan Respons Terbuka merupakan{" "}
          <strong className="text-white">Bahagian B dalam Kertas 2 (Penulisan)</strong>. Murid perlu
          memilih satu tajuk daripada pilihan yang diberikan dan menghasilkan karangan panjang yang
          tersusun, gramatis dan menepati kehendak tugasan. Panjang karangan ialah{" "}
          <strong className="text-white">melebihi 180 patah perkataan</strong>, selaras dengan
          sumber Form 1 dan Form 2 dalam projek.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={ASAS_RESPONS_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan folder ini sebelum mula menulis supaya format dikenal pasti, kehendak soalan
          difahami, isi tidak tersasar dan karangan dapat dirancang dengan teratur.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={ASAS_RESPONS_STEPS} color="#FBBF24" />
      </MissionSection>
      <MissionSection title="Analisis TFT" color="#A78BFA">
        <div className="grid gap-3 sm:grid-cols-3">
          <ExampleBlock label="T — Tema" color="#C084FC">
            Kenal pasti isu utama yang dibincangkan. Contoh:{" "}
            <strong className="text-white">keselamatan siber</strong>.
          </ExampleBlock>
          <ExampleBlock label="F — Format" color="#60A5FA">
            Tentukan sama ada soalan memerlukan syarahan, ucapan, surat, laporan atau karangan fakta
            tanpa format khusus.
          </ExampleBlock>
          <ExampleBlock label="T — Tugasan" color="#34D399">
            Kenal pasti sama ada soalan meminta punca, langkah, kesan, kepentingan, kebaikan dan
            keburukan atau peranan pihak tertentu.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Formula I-H-C-P" color="#34D399">
        <ResponsiveTable headers={["Komponen", "Fungsi"]} rows={IHCP_ROWS} />
      </MissionSection>
      <MissionSection title="Contoh Ringkas I-H-C-P — Keselamatan Siber" color="#22D3EE">
        <div className="space-y-3">
          <ExampleBlock label="Isi">Remaja perlu merahsiakan maklumat peribadi.</ExampleBlock>
          <ExampleBlock label="Huraian" color="#60A5FA">
            Hal ini penting kerana maklumat tersebut boleh disalahgunakan oleh pihak yang tidak
            bertanggungjawab.
          </ExampleBlock>
          <ExampleBlock label="Contoh" color="#FBBF24">
            Contohnya, pengguna tidak seharusnya berkongsi kata laluan, nombor telefon atau lokasi
            semasa dengan orang asing.
          </ExampleBlock>
          <ExampleBlock label="Penegasan" color="#C084FC">
            Jelaslah bahawa kerahsiaan data peribadi merupakan langkah penting untuk melindungi
            keselamatan pengguna Internet.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Perancangan Masa" color="#60A5FA">
        <div className="space-y-2">
          {[
            "Analisis soalan dan bina rangka",
            "Tulis pendahuluan",
            "Kembangkan perenggan isi",
            "Tulis penutup",
            "Semak bahasa, ejaan dan tanda baca",
          ].map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-sky-300/15 bg-sky-300/[0.045] p-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-300/15 text-xs font-black text-sky-300">
                {index + 1}
              </span>
              <p className="text-sm text-white/70">{item}</p>
            </div>
          ))}
          <p className="pt-2 text-sm leading-7 text-white/55">
            Sebagai cadangan latihan kelas, murid boleh menggunakan 5–10 minit untuk merangka dan
            40–45 minit untuk menulis. Pembahagian ini ialah panduan latihan, bukannya peraturan
            masa rasmi, dan perlu disesuaikan dengan arahan peperiksaan semasa.
          </p>
        </div>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Pilih soalan secara bijak: pastikan anda mempunyai isi dan contoh, bukan sekadar memilih tajuk yang kelihatan mudah.",
            "Rancang sebelum menulis supaya isi tidak berulang.",
            "Huraikan kesan terhadap murid, masyarakat atau negara apabila sesuai dengan tajuk.",
            "Gunakan satu perenggan untuk satu isi utama.",
          ]}
        />
      </MissionSection>
      <WarningCard items={ASAS_RESPONS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={ASAS_RESPONS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Penguasaan <strong className="text-white">TFT</strong> dan formula{" "}
        <strong className="text-white">I-H-C-P</strong> membantu murid menghasilkan karangan yang
        tersusun, relevan dan mempunyai huraian yang bernas.
      </SummaryCard>
    </>
  );
}

function TeknikContent({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (i: number) => void;
}) {
  return (
    <>
      <section className="rounded-2xl border border-sky-300/20 bg-sky-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Pelajaran ini memfokuskan cara membina pendahuluan yang menarik, mengembangkan isi secara
          mendalam, menghubungkan perenggan dan menghasilkan penutup yang lengkap.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={TEKNIK_RESPONS_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan teknik ini selepas rangka karangan selesai dibina. Pendahuluan memperkenalkan
          tema, isi menjawab tugasan dan penutup merumus serta memberikan harapan.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={TEKNIK_RESPONS_STEPS} color="#60A5FA" />
      </MissionSection>
      <MissionSection title="Pendahuluan yang Berkaitan dengan Tajuk" color="#22D3EE">
        <ExampleBlock label="Tema Keselamatan Siber">
          Dalam era penggunaan teknologi yang semakin meluas, keselamatan siber menjadi satu
          keperluan penting dalam kehidupan remaja.
        </ExampleBlock>
        <p className="mt-3 text-sm leading-7 text-white/60">
          Elakkan pendahuluan hafalan yang umum dan tidak mempunyai hubungan langsung dengan tajuk.
        </p>
      </MissionSection>
      <MissionSection title="Teknik 5W1H" color="#A78BFA">
        <ChipList
          items={["Apa?", "Siapa?", "Bila?", "Di mana?", "Mengapa?", "Bagaimana?"]}
          color="#C084FC"
        />
        <p className="mt-4 text-sm leading-7 text-white/65">
          Untuk mengembangkan isi karangan, berikan tumpuan utama kepada{" "}
          <strong className="text-white">mengapa</strong>,{" "}
          <strong className="text-white">bagaimana</strong> dan{" "}
          <strong className="text-white">kesan</strong>.
        </p>
      </MissionSection>
      <MissionSection title="Penanda Wacana" color="#22D3EE">
        <ChipList
          items={[
            "Selain itu",
            "Di samping itu",
            "Seterusnya",
            "Dalam pada itu",
            "Sehubungan dengan itu",
            "Namun begitu",
            "Oleh sebab itu",
          ]}
          color="#22D3EE"
        />
        <p className="mt-4 text-sm leading-7 text-white/60">
          Pilih penanda wacana mengikut hubungan idea. Jangan memaksakan penanda wacana sukar ke
          dalam setiap perenggan.
        </p>
      </MissionSection>
      <MissionSection title="Formula Penutup R-C-H" color="#F472B6">
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["R — Rumusan", "Rumuskan isu utama."],
            ["C — Cadangan", "Nyatakan tindakan yang sesuai."],
            ["H — Harapan", "Berikan hasil yang diharapkan."],
          ].map(([label, text]) => (
            <ExampleBlock key={label} label={label} color="#F472B6">
              {text}
            </ExampleBlock>
          ))}
        </div>
        <div className="mt-3">
          <ExampleBlock label="Contoh Penutup" color="#F472B6">
            Kesimpulannya, keselamatan siber perlu diberikan perhatian oleh semua pihak. Ibu bapa,
            sekolah dan remaja sendiri hendaklah meningkatkan pengetahuan tentang penggunaan
            Internet yang selamat. Diharapkan usaha ini dapat mewujudkan ruang digital yang lebih
            selamat untuk generasi muda.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Teknik Ayat Majmuk" color="#34D399">
        <CorrectWrongExample
          wrong="Remaja menggunakan media sosial. Remaja perlu berhati-hati."
          right="Remaja yang menggunakan media sosial perlu sentiasa berhati-hati agar maklumat peribadi mereka tidak disalahgunakan."
        />
      </MissionSection>
      <MissionSection title="Penggunaan Peribahasa" color="#FBBF24">
        <ExampleBlock label="Contoh" color="#FBBF24">
          Pengguna perlu mengambil langkah awal untuk melindungi akaun kerana{" "}
          <em>sediakan payung sebelum hujan</em>.
        </ExampleBlock>
        <p className="mt-3 text-sm leading-7 text-white/60">
          Peribahasa tidak wajib dalam setiap karangan. Satu peribahasa yang tepat dan digunakan
          secara semula jadi lebih baik daripada beberapa peribahasa yang dipaksa.
        </p>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Gunakan ayat majmuk untuk menghubungkan idea yang berkaitan.",
            "Utamakan huraian yang jelas sebelum menggunakan kosa kata sukar.",
            "Gunakan penanda wacana yang pelbagai tetapi mudah difahami.",
            "Masukkan peribahasa hanya apabila benar-benar sesuai.",
            "Pastikan setiap perenggan menjawab tugasan.",
          ]}
        />
      </MissionSection>
      <WarningCard items={TEKNIK_RESPONS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={TEKNIK_RESPONS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Gunakan teknik <strong className="text-white">5W1H</strong>, ayat majmuk dan penanda wacana
        yang tepat untuk menghasilkan huraian yang matang. Penutup yang baik mesti merumuskan isi
        serta mengandungi cadangan dan harapan.
      </SummaryCard>
    </>
  );
}

function ContohLatihanContent({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (i: number) => void;
}) {
  const modelEssay = MODEL_ESSAY_PARAGRAPHS.join(" ");
  const wordCount = countResponsTerbukaWords(modelEssay);
  return (
    <>
      <section className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Folder ini mengandungi model, analisis dan latihan untuk membantu murid mempraktikkan
          teknik Karangan Respons Terbuka berdasarkan tema Tingkatan 3.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid
          items={[
            "Menganalisis TFT",
            "Membina rangka",
            "Mengembangkan isi menggunakan I-H-C-P",
            "Membezakan ayat lemah dan ayat matang",
            "Menghasilkan karangan lengkap",
          ]}
        />
      </MissionSection>
      <MissionSection title="Contoh Pelajaran — Tema Keselamatan Siber" color="#C084FC">
        <ExampleBlock label="Soalan" color="#C084FC">
          Isu keselamatan siber dalam kalangan remaja semakin membimbangkan. Huraikan
          langkah-langkah yang perlu diambil untuk melindungi diri daripada ancaman siber.
        </ExampleBlock>
      </MissionSection>
      <MissionSection title="Analisis TFT" color="#60A5FA">
        <ResponsiveTable
          headers={["Elemen", "Jawapan"]}
          rows={[
            ["Tema", "Keselamatan siber"],
            ["Format", "Karangan fakta tanpa format khusus"],
            ["Tugasan", "Langkah-langkah melindungi diri daripada ancaman siber"],
          ]}
        />
      </MissionSection>
      <MissionSection title="Cadangan Rangka" color="#FBBF24">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Pendahuluan",
              "Perkembangan teknologi, penggunaan Internet oleh remaja dan ancaman siber.",
            ],
            ["Isi 1", "Merahsiakan maklumat peribadi."],
            ["Isi 2", "Menggunakan kata laluan yang kukuh."],
            ["Isi 3", "Tidak menekan pautan mencurigakan."],
            ["Isi 4", "Mendapatkan bantuan ibu bapa, guru atau pihak berkuasa."],
            ["Penutup", "Rumusan, kerjasama semua pihak dan harapan ruang digital lebih selamat."],
          ].map(([label, text]) => (
            <ExampleBlock key={label} label={label} color="#FBBF24">
              {text}
            </ExampleBlock>
          ))}
        </div>
      </MissionSection>
      <MissionSection title="Rangka I-H-C-P — Isi 1" color="#34D399">
        <div className="space-y-3">
          <ExampleBlock label="Isi">
            Remaja perlu merahsiakan maklumat peribadi di media sosial.
          </ExampleBlock>
          <ExampleBlock label="Huraian" color="#60A5FA">
            Hal ini penting kerana maklumat tersebut boleh digunakan oleh penjenayah siber untuk
            menceroboh akaun atau melakukan penipuan.
          </ExampleBlock>
          <ExampleBlock label="Contoh" color="#FBBF24">
            Contohnya, pengguna tidak seharusnya berkongsi kata laluan, nombor kad pengenalan atau
            lokasi semasa dengan orang asing.
          </ExampleBlock>
          <ExampleBlock label="Penegasan" color="#C084FC">
            Jelaslah bahawa kerahsiaan data peribadi merupakan benteng utama dalam menjaga
            keselamatan siber.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Contoh Bahagian Karangan" color="#22D3EE">
        <div className="space-y-3">
          <ExampleBlock label="Contoh Pendahuluan">{MODEL_ESSAY_PARAGRAPHS[0]}</ExampleBlock>
          <ExampleBlock label="Contoh Perenggan Isi 2" color="#60A5FA">
            {MODEL_ESSAY_PARAGRAPHS[2]}
          </ExampleBlock>
          <ExampleBlock label="Contoh Penutup" color="#F472B6">
            {MODEL_ESSAY_PARAGRAPHS[5]}
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Model Karangan Lengkap" color="#34D399">
        <article className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
              Keselamatan Siber dalam Kalangan Remaja
            </p>
            <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-[10px] font-bold text-emerald-200">
              {wordCount} patah perkataan
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {MODEL_ESSAY_PARAGRAPHS.map((paragraph, index) => (
              <p key={index} className="text-sm leading-7 text-white/75">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
        <div className="mt-4">
          <QuickScoreCard
            items={[
              "TFT dijawab dengan jelas",
              "Empat perenggan isi menggunakan I-H-C-P",
              "Contoh relevan dan boleh dijelaskan",
              "Melebihi 180 patah perkataan",
              "Rumusan, cadangan dan harapan dalam penutup",
            ]}
          />
        </div>
      </MissionSection>
      <MissionSection title="Contoh Jawapan Lemah dan Pembetulan" color="#FBBF24">
        <div className="space-y-4">
          {WEAK_RESPONS_CORRECTIONS.map((item) => (
            <CorrectWrongExample key={item.weak} wrong={item.weak} right={item.better} />
          ))}
        </div>
      </MissionSection>
      <section className="space-y-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
            Aktiviti Latihan
          </p>
          <h2 className="mt-1 font-display text-xl font-black text-white">Latih dan Semak</h2>
        </div>
        <ExerciseCard
          title="Latihan 1 — Analisis TFT"
          answer={
            <ul className="space-y-1">
              <li>
                <strong className="text-white">Tema:</strong> Perpaduan.
              </li>
              <li>
                <strong className="text-white">Format:</strong> Karangan fakta tanpa format khusus.
              </li>
              <li>
                <strong className="text-white">Tugasan:</strong> Peranan remaja dalam memperkukuh
                perpaduan.
              </li>
            </ul>
          }
        >
          <p>
            Semangat perpaduan perlu dipupuk dalam kalangan remaja. Huraikan peranan remaja dalam
            memperkukuh perpaduan.
          </p>
          <p className="mt-2">Kenal pasti Tema, Format dan Tugasan.</p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 2 — Mengembangkan Isi"
          answer="Salah satu tanggungjawab remaja dalam memupuk perpaduan ialah menghormati rakan yang berlainan kaum. Sikap ini penting kerana setiap individu mempunyai budaya, bahasa dan kepercayaan yang berbeza. Contohnya, murid perlu menjaga tutur kata serta menghormati amalan perayaan rakan-rakan mereka. Jelaslah bahawa sikap saling menghormati dapat mengeratkan hubungan dan mewujudkan suasana sekolah yang harmoni."
        >
          <p>
            <strong className="text-white">Isi utama:</strong> Remaja perlu menghormati rakan yang
            berlainan kaum.
          </p>
          <p className="mt-2">Bina satu perenggan menggunakan I-H-C-P.</p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 3 — Bina Pendahuluan"
          answer="Kesihatan mental merupakan aspek penting dalam kehidupan setiap remaja. Tekanan pelajaran, hubungan sosial dan penggunaan teknologi yang tidak terkawal boleh mempengaruhi kesejahteraan emosi mereka. Oleh itu, kepentingan menjaga kesihatan mental perlu difahami agar remaja dapat menjalani kehidupan yang seimbang."
        >
          <p>
            <strong className="text-white">Tajuk:</strong> Kepentingan Menjaga Kesihatan Mental
            dalam Kalangan Remaja
          </p>
          <p className="mt-2">Tulis pendahuluan yang mengandungi tiga ayat.</p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 4 — Bina Penutup"
          answer="Kesimpulannya, pencemaran alam sekitar perlu ditangani secara bersungguh-sungguh demi kesejahteraan bersama. Semua pihak hendaklah mengurangkan penggunaan plastik, mengamalkan kitar semula dan menjaga kebersihan kawasan sekitar. Diharapkan usaha yang berterusan dapat mewujudkan alam yang bersih dan selamat untuk generasi akan datang."
        >
          <p>
            <strong className="text-white">Tajuk:</strong> Cara-cara Mengurangkan Pencemaran Alam
            Sekitar
          </p>
          <p className="mt-2">Bina penutup yang mempunyai rumusan, cadangan dan harapan.</p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 5 — Pilih Penanda Wacana"
          answer={
            <ul className="space-y-1">
              <li>
                <strong className="text-white">Isi kedua:</strong> Selain itu
              </li>
              <li>
                <strong className="text-white">Huraian:</strong> Hal ini demikian kerana
              </li>
              <li>
                <strong className="text-white">Contoh:</strong> Sebagai contoh
              </li>
              <li>
                <strong className="text-white">Penegasan:</strong> Jelaslah bahawa
              </li>
              <li>
                <strong className="text-white">Penutup:</strong> Kesimpulannya
              </li>
            </ul>
          }
        >
          <p>
            Pilih penanda wacana yang sesuai untuk isi kedua, huraian, contoh, penegasan dan
            penutup.
          </p>
        </ExerciseCard>
        <ExerciseCard title="Latihan 6 — Menulis Karangan Lengkap">
          <p>
            <strong className="text-white">Tema:</strong> Tanggungjawab Remaja
          </p>
          <p className="mt-2">
            Huraikan cara-cara remaja dapat menjadi pengguna teknologi yang bertanggungjawab.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            <li>Analisis TFT.</li>
            <li>Bina rangka.</li>
            <li>Tulis sekurang-kurangnya tiga perenggan isi I-H-C-P.</li>
            <li>Sertakan penutup lengkap.</li>
            <li>Semak ejaan dan tanda baca.</li>
          </ol>
        </ExerciseCard>
      </section>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Semak ejaan dan tanda baca selepas selesai menulis.",
            "Pastikan setiap perenggan membawa isi baharu.",
            "Jangan memasukkan contoh yang tidak dapat dijelaskan.",
            "Gunakan bahasa matang tetapi mudah difahami.",
            "Pastikan karangan menjawab tugasan dari awal hingga akhir.",
          ]}
        />
      </MissionSection>
      <WarningCard items={LATIHAN_RESPONS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={LATIHAN_RESPONS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Karangan Respons Terbuka yang cemerlang menggabungkan{" "}
        <strong className="text-white">isi yang relevan</strong>,{" "}
        <strong className="text-white">huraian yang logik</strong>,{" "}
        <strong className="text-white">contoh yang sesuai</strong> dan{" "}
        <strong className="text-white">bahasa yang gramatis</strong>. Tema buku teks atau{" "}
        <em>Bintang Hati</em> boleh digunakan apabila relevan, tetapi tidak wajib bagi setiap
        karangan.
      </SummaryCard>
    </>
  );
}

export function BMForm3KaranganResponsTerbukaContent({
  initialSectionId,
  onBack,
  onNavigate,
}: {
  initialSectionId?: string;
  onBack: () => void;
  onNavigate: (sectionId: BMForm3ResponsTerbukaSectionId) => void;
}) {
  const initialIndex = BM_FORM3_RESPONS_TERBUKA_SECTIONS.findIndex(
    (section) => section.id === initialSectionId,
  );
  const [activeModule, setActiveModule] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [checks, setChecks] = useState(() =>
    [ASAS_RESPONS_CHECKLIST, TEKNIK_RESPONS_CHECKLIST, LATIHAN_RESPONS_CHECKLIST].map((list) =>
      list.map(() => false),
    ),
  );

  if (activeModule === null) {
    return (
      <ExamSkillLanding
        title="Karangan Respons Terbuka"
        subtitle="Bahagian B · Kertas 2 · Tingkatan 3 · Melebihi 180 patah perkataan"
        missions={missions}
        onSelect={setActiveModule}
      />
    );
  }

  const mission = missions[activeModule];
  const section = BM_FORM3_RESPONS_TERBUKA_SECTIONS[activeModule];
  const toggleCheck = (index: number) =>
    setChecks((current) =>
      current.map((list, listIndex) =>
        listIndex === activeModule
          ? list.map((value, itemIndex) => (itemIndex === index ? !value : value))
          : list,
      ),
    );

  return (
    <div>
      <p className="mb-4 text-[11px] text-white/40">
        Bahasa Melayu <span className="mx-1 text-white/20">/</span> Tingkatan 3{" "}
        <span className="mx-1 text-white/20">/</span> Kertas 2{" "}
        <span className="mx-1 text-white/20">/</span> Karangan Respons Terbuka{" "}
        <span className="mx-1 text-white/20">/</span>{" "}
        <span style={{ color: mission.color }}>{section.folderTitle}</span>
      </p>
      <MissionPageShell mission={mission} onBack={onBack}>
        {activeModule === 0 && <AsasContent checked={checks[0]} onToggle={toggleCheck} />}
        {activeModule === 1 && <TeknikContent checked={checks[1]} onToggle={toggleCheck} />}
        {activeModule === 2 && <ContohLatihanContent checked={checks[2]} onToggle={toggleCheck} />}
        <LessonNavigation index={activeModule} onBack={onBack} onNavigate={onNavigate} />
      </MissionPageShell>
    </div>
  );
}
