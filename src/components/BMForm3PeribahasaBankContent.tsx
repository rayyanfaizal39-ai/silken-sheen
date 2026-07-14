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
  ExamSkillLanding,
  FinalChecklist,
  MissionPageShell,
  MissionSection,
  NumberedStep,
  WarningCard,
  type MissionDefinition,
} from "@/components/exam-skill/MissionLearning";
import {
  BM_FORM3_PERIBAHASA_SECTIONS,
  PERIBAHASA_ASAS_CHECKLIST,
  PERIBAHASA_ASAS_MISTAKES,
  PERIBAHASA_ASAS_OBJECTIVES,
  PERIBAHASA_ASAS_STEPS,
  PERIBAHASA_BANK_ROWS,
  PERIBAHASA_LATIHAN_CHECKLIST,
  PERIBAHASA_LATIHAN_MISTAKES,
  PERIBAHASA_TEKNIK_CHECKLIST,
  PERIBAHASA_TEKNIK_MISTAKES,
  PERIBAHASA_TEKNIK_STEPS,
  PERIBAHASA_TYPE_ROWS,
  type BMForm3PeribahasaSectionId,
} from "@/data/bm-form3-peribahasa-bank";

const SECTION_ICONS = [Star, PenLine, Brain];
const SECTION_COLORS = ["#FBBF24", "#60A5FA", "#C084FC"];

const missions: MissionDefinition[] = BM_FORM3_PERIBAHASA_SECTIONS.map((section, index) => ({
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

function StepList({
  steps,
  color,
}: {
  steps: Array<{ title: string; text: string; items: string[] }>;
  color: string;
}) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step.title}>
          <NumberedStep index={index} text={`${step.title} — ${step.text}`} color={color} />
          <div className="ml-9">
            <ChipList items={step.items} color={color} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full min-w-[42rem] border-collapse text-left">
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
                  className={`px-4 py-3 align-top text-sm leading-6 ${cellIndex === 0 ? "font-semibold text-white/85" : "text-white/65"}`}
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

function SummaryCard({ children, final = false }: { children: ReactNode; final?: boolean }) {
  return (
    <section className="rounded-[1.75rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.08] to-purple-300/[0.05] p-5 sm:p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
        {final ? "Ringkasan Akhir" : "Ringkasan"}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/75">{children}</p>
    </section>
  );
}

function AnswerReveal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-purple-300/20 bg-purple-300/[0.045]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-bold text-purple-100 transition-colors hover:bg-purple-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-300/60"
      >
        {open ? "Sembunyikan Jawapan" : "Lihat Cadangan Jawapan"}
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

function AsasContent({ checked, onToggle }: { checked: boolean[]; onToggle: (i: number) => void }) {
  return (
    <>
      <section className="rounded-2xl border border-indigo-300/20 bg-indigo-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Folder ini menerangkan konsep peribahasa, kepentingannya dalam penulisan karangan serta
          cara memilih peribahasa yang tepat mengikut tema dan konteks.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={PERIBAHASA_ASAS_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan folder ini sebelum menulis karangan. Pastikan peribahasa sesuai dengan tema dan
          isi, digunakan secara semula jadi serta tidak dipaksa.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={PERIBAHASA_ASAS_STEPS} color="#FBBF24" />
      </MissionSection>
      <MissionSection title="Jenis Peribahasa" color="#22D3EE">
        <ResponsiveTable headers={["Jenis", "Penerangan"]} rows={PERIBAHASA_TYPE_ROWS} />
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Pilih satu peribahasa yang benar-benar menyokong isi.",
            "Jangan masukkan terlalu banyak peribahasa dalam satu perenggan.",
            "Gunakan peribahasa yang benar-benar difahami.",
            "Peribahasa lebih berkesan pada penutup atau penegasan isi jika konteksnya sesuai.",
          ]}
        />
      </MissionSection>
      <WarningCard items={PERIBAHASA_ASAS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={PERIBAHASA_ASAS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Peribahasa yang digunakan dengan tepat mampu menjadikan penulisan lebih matang, menarik dan
        meyakinkan.
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
          Folder ini menerangkan cara memasukkan peribahasa ke dalam pendahuluan, isi dan penutup
          tanpa menjejaskan kelancaran penulisan.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid
          items={[
            "Menggunakan peribahasa secara semula jadi",
            "Menghubungkan peribahasa dengan isi",
            "Mengukuhkan huraian menggunakan peribahasa",
            "Meningkatkan nilai estetik penulisan",
          ]}
        />
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#60A5FA">
        <StepList steps={PERIBAHASA_TEKNIK_STEPS} color="#60A5FA" />
      </MissionSection>
      <MissionSection title="Contoh Penggunaan" color="#22D3EE">
        <div className="space-y-3">
          <ExampleBlock label="Tema: Pendidikan">
            <p>
              <strong className="text-white">Isi:</strong> Murid perlu rajin belajar.
            </p>
            <p className="mt-2">
              Bak kata peribahasa,{" "}
              <strong className="text-white">belakang parang pun kalau diasah nescaya tajam</strong>
              , seseorang akan berjaya jika terus berusaha.
            </p>
          </ExampleBlock>
          <ExampleBlock label="Tema: Perpaduan" color="#60A5FA">
            <p>
              <strong className="text-white">Isi:</strong> Masyarakat perlu bekerjasama.
            </p>
            <p className="mt-2">
              Semangat bekerjasama amat penting kerana{" "}
              <strong className="text-white">bagai aur dengan tebing</strong>, setiap anggota
              masyarakat saling membantu antara satu sama lain.
            </p>
          </ExampleBlock>
          <ExampleBlock label="Tema: Kerajinan" color="#C084FC">
            <p>
              <strong className="text-white">Isi:</strong> Jangan mudah berputus asa.
            </p>
            <p className="mt-2">
              Kita perlu berusaha bersungguh-sungguh kerana{" "}
              <strong className="text-white">di mana ada kemahuan, di situ ada jalan</strong>.
            </p>
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Gunakan satu peribahasa sahaja bagi satu isi.",
            "Pastikan maksudnya benar-benar menyokong isi.",
            "Jangan memaksa penggunaan peribahasa.",
          ]}
        />
      </MissionSection>
      <WarningCard items={PERIBAHASA_TEKNIK_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={PERIBAHASA_TEKNIK_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Peribahasa perlu menyokong isi, bukan sekadar menjadi hiasan dalam karangan.
      </SummaryCard>
    </>
  );
}

function ContohContent({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (i: number) => void;
}) {
  return (
    <>
      <section className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Folder ini mengandungi koleksi peribahasa yang sering digunakan dalam penulisan Tingkatan
          3 berserta maksud, contoh ayat dan latihan pengukuhan.
        </p>
      </section>
      <MissionSection title="Bank Peribahasa" color="#C084FC">
        <ResponsiveTable
          headers={["Tema", "Peribahasa", "Maksud", "Contoh Ayat"]}
          rows={PERIBAHASA_BANK_ROWS}
        />
      </MissionSection>
      <section className="space-y-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
            Aktiviti Latihan
          </p>
          <h2 className="mt-1 font-display text-xl font-black text-white">Latih dan Semak</h2>
        </div>
        <ExerciseCard
          title="Aktiviti 1 — Padankan"
          answer={
            <ol className="list-decimal space-y-2 pl-5">
              <li>Bagai aur dengan tebing — saling membantu.</li>
              <li>Seperti isi dengan kuku — sangat rapat.</li>
              <li>Sediakan payung sebelum hujan — bersedia sebelum berlaku sesuatu.</li>
              <li>Di mana ada kemahuan, di situ ada jalan — kesungguhan membawa kejayaan.</li>
            </ol>
          }
        >
          <p>Padankan peribahasa berikut dengan maksud yang betul:</p>
          <ChipList
            items={[
              "bagai aur dengan tebing",
              "seperti isi dengan kuku",
              "sediakan payung sebelum hujan",
              "di mana ada kemahuan, di situ ada jalan",
            ]}
            color="#C084FC"
          />
        </ExerciseCard>
        <ExerciseCard
          title="Aktiviti 2 — Isi Tempat Kosong"
          answer={
            <ol className="list-decimal space-y-2 pl-5">
              <li>bagai aur dengan tebing</li>
              <li>belakang parang pun kalau diasah nescaya tajam</li>
              <li>sediakan payung sebelum hujan</li>
            </ol>
          }
        >
          <ol className="list-decimal space-y-2 pl-5">
            <li>Penduduk saling membantu __________ ketika membersihkan balai raya.</li>
            <li>Walaupun lemah pada awalnya, Amir terus belajar kerana __________.</li>
            <li>Kita perlu menyimpan salinan data sebagai langkah __________.</li>
          </ol>
        </ExerciseCard>
        <ExerciseCard
          title="Aktiviti 3 — Pilih Peribahasa"
          answer={
            <ul className="space-y-2">
              <li>Rakan yang sangat rapat: seperti isi dengan kuku.</li>
              <li>Usaha gigih menghadapi cabaran: di mana ada kemahuan, di situ ada jalan.</li>
              <li>Anak mengikut didikan ibu bapa: bagaimana acuan, begitulah kuihnya.</li>
            </ul>
          }
        >
          <p>Pilih peribahasa paling sesuai bagi situasi berikut:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Dua orang sahabat yang sangat rapat.</li>
            <li>Seorang murid terus berusaha walaupun menghadapi cabaran.</li>
            <li>Seorang anak menunjukkan didikan baik daripada ibu bapanya.</li>
          </ul>
        </ExerciseCard>
        <ExerciseCard
          title="Aktiviti 4 — Membina Ayat"
          answer={
            <ol className="list-decimal space-y-2 pl-5">
              <li>Penduduk bekerjasama bagai aur dengan tebing untuk menjayakan gotong-royong.</li>
              <li>Aina terus berusaha kerana di mana ada kemahuan, di situ ada jalan.</li>
              <li>
                Farid berjaya selepas rajin belajar kerana belakang parang pun kalau diasah nescaya
                tajam.
              </li>
              <li>Hani dan Mei Ling berkawan seperti isi dengan kuku sejak sekolah rendah.</li>
            </ol>
          }
        >
          <p>Gunakan setiap peribahasa berikut dalam satu ayat gramatis:</p>
          <ChipList
            items={[
              "bagai aur dengan tebing",
              "di mana ada kemahuan, di situ ada jalan",
              "belakang parang pun kalau diasah nescaya tajam",
              "seperti isi dengan kuku",
            ]}
            color="#60A5FA"
          />
        </ExerciseCard>
        <ExerciseCard
          title="Aktiviti 5 — Dalam Karangan"
          answer="Masyarakat perlu bekerjasama untuk menjaga kebersihan kawasan perumahan. Melalui aktiviti gotong-royong, penduduk dapat membahagikan tugas seperti membersihkan longkang dan mengutip sampah. Sikap ini menepati peribahasa bagai aur dengan tebing kerana setiap jiran saling membantu demi kesejahteraan bersama."
        >
          <p>
            <strong className="text-white">Isi:</strong> Masyarakat perlu bekerjasama untuk menjaga
            kebersihan kawasan perumahan.
          </p>
          <p className="mt-2">
            Pilih satu peribahasa yang paling sesuai dan tulis satu perenggan lengkap.
          </p>
        </ExerciseCard>
      </section>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Hafal mengikut tema, bukan mengikut abjad.",
            "Fahami maksud sebelum menghafal.",
            "Gunakan peribahasa yang benar-benar sesuai.",
            "Kualiti lebih penting daripada kuantiti.",
          ]}
        />
      </MissionSection>
      <WarningCard items={PERIBAHASA_LATIHAN_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist
          items={PERIBAHASA_LATIHAN_CHECKLIST}
          checked={checked}
          onToggle={onToggle}
        />
      </MissionSection>
      <SummaryCard final>
        Penguasaan peribahasa bukan sahaja membantu memperoleh markah yang lebih baik dalam
        penulisan, malah menjadikan bahasa lebih indah, matang dan meyakinkan.
      </SummaryCard>
    </>
  );
}

function LessonNavigation({
  index,
  onBack,
  onNavigate,
}: {
  index: number;
  onBack: () => void;
  onNavigate: (id: BMForm3PeribahasaSectionId) => void;
}) {
  const previous = BM_FORM3_PERIBAHASA_SECTIONS[index - 1];
  const next = BM_FORM3_PERIBAHASA_SECTIONS[index + 1];
  return (
    <nav
      aria-label="Navigasi pelajaran Peribahasa Bank"
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

export function BMForm3PeribahasaBankContent({
  initialSectionId,
  onBack,
  onNavigate,
}: {
  initialSectionId?: string;
  onBack: () => void;
  onNavigate: (id: BMForm3PeribahasaSectionId) => void;
}) {
  const initialIndex = BM_FORM3_PERIBAHASA_SECTIONS.findIndex(
    (section) => section.id === initialSectionId,
  );
  const [activeModule, setActiveModule] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [checks, setChecks] = useState(() =>
    [PERIBAHASA_ASAS_CHECKLIST, PERIBAHASA_TEKNIK_CHECKLIST, PERIBAHASA_LATIHAN_CHECKLIST].map(
      (list) => list.map(() => false),
    ),
  );

  if (activeModule === null) {
    return (
      <ExamSkillLanding
        title="Peribahasa Bank"
        subtitle="Tingkatan 3 · Maksud, penggunaan dan latihan bertema"
        missions={missions}
        onSelect={setActiveModule}
      />
    );
  }

  const mission = missions[activeModule];
  const section = BM_FORM3_PERIBAHASA_SECTIONS[activeModule];
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
        <span className="mx-1 text-white/20">/</span> Peribahasa Bank{" "}
        <span className="mx-1 text-white/20">/</span>{" "}
        <span style={{ color: mission.color }}>{section.folderTitle}</span>
      </p>
      <MissionPageShell mission={mission} onBack={onBack}>
        {activeModule === 0 && <AsasContent checked={checks[0]} onToggle={toggleCheck} />}
        {activeModule === 1 && <TeknikContent checked={checks[1]} onToggle={toggleCheck} />}
        {activeModule === 2 && <ContohContent checked={checks[2]} onToggle={toggleCheck} />}
        <LessonNavigation index={activeModule} onBack={onBack} onNavigate={onNavigate} />
      </MissionPageShell>
    </div>
  );
}
