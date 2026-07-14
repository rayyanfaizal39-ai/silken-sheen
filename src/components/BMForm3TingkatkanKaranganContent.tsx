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
  BM_FORM3_TINGKATKAN_KARANGAN_SECTIONS,
  TINGKATKAN_ASAS_CHECKLIST,
  TINGKATKAN_ASAS_MISTAKES,
  TINGKATKAN_ASAS_OBJECTIVES,
  TINGKATKAN_ASAS_STEPS,
  TINGKATKAN_IHCP_ROWS,
  TINGKATKAN_LATIHAN_CHECKLIST,
  TINGKATKAN_LATIHAN_MISTAKES,
  TINGKATKAN_PENANDA_GROUPS,
  TINGKATKAN_RCH_ROWS,
  TINGKATKAN_TEKNIK_GROUPS,
  TINGKATKAN_TEKNIK_MISTAKES,
  TINGKATKAN_TEKNIK_OBJECTIVES,
  TINGKATKAN_TEKNIK_STEPS,
  TINGKATKAN_TRANSFORMATIONS,
  type BMForm3TingkatkanKaranganSectionId,
} from "@/data/bm-form3-tingkatkan-karangan";

const SECTION_ICONS = [Star, PenLine, Brain];
const SECTION_COLORS = ["#FBBF24", "#60A5FA", "#C084FC"];

const missions: MissionDefinition[] = BM_FORM3_TINGKATKAN_KARANGAN_SECTIONS.map(
  (section, index) => ({
    number: String(index + 1).padStart(2, "0"),
    kindLabel: "Folder",
    title: section.lessonTitle,
    description: section.description,
    icon: SECTION_ICONS[index],
    color: SECTION_COLORS[index],
  }),
);

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

function StepList({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <NumberedStep key={step} index={index} text={step} color={color} />
      ))}
    </div>
  );
}

function TeacherTips({ items }: { items: ReactNode[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4"
        >
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <div className="text-sm leading-6 text-white/70">{item}</div>
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
  answer: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <h3 className="font-display text-base font-bold text-white">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-white/70">{children}</div>
      <AnswerReveal>{answer}</AnswerReveal>
    </article>
  );
}

function IntroCard({ children, color }: { children: ReactNode; color: string }) {
  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: `${color}30`, background: `${color}0d` }}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color }}>
        Penerangan Ringkas
      </p>
      <p className="mt-2 text-sm leading-7 text-white/70">{children}</p>
    </section>
  );
}

function AsasContent({ checked, onToggle }: { checked: boolean[]; onToggle: (i: number) => void }) {
  return (
    <>
      <IntroCard color="#FBBF24">
        Meningkatkan karangan bermaksud mengubah gaya penulisan daripada sekadar bercerita kepada
        huraian yang analitikal dan gramatis. Murid perlu mahir dalam sistem bahasa, termasuk
        morfologi dan sintaksis.
      </IntroCard>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={TINGKATKAN_ASAS_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan jadual perbandingan dan formula di bawah sebagai panduan setiap kali anda merangka
          perenggan isi atau penutup.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={TINGKATKAN_ASAS_STEPS} color="#FBBF24" />
      </MissionSection>
      <MissionSection title="Formula I-H-C-P" color="#22D3EE">
        <ResponsiveTable headers={["Komponen", "Fungsi"]} rows={TINGKATKAN_IHCP_ROWS} />
      </MissionSection>
      <MissionSection title="Formula Penutup R-C-H" color="#C084FC">
        <ResponsiveTable headers={["Komponen", "Fungsi"]} rows={TINGKATKAN_RCH_ROWS} />
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Gunakan nilai murni atau pengajaran daripada KOMSAS bagi mengukuhkan huraian.",
            "Pastikan setiap perenggan mempunyai panjang yang seimbang.",
            "Ayat majmuk lebih sesuai digunakan berbanding ayat tunggal.",
          ]}
        />
      </MissionSection>
      <WarningCard items={TINGKATKAN_ASAS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={TINGKATKAN_ASAS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Kematangan karangan Tingkatan 3 bergantung pada ketepatan tatabahasa, penggunaan kosa kata
        yang luas serta huraian yang logik dan mendalam.
      </SummaryCard>
    </>
  );
}

function TeknikContent() {
  return (
    <>
      <IntroCard color="#60A5FA">
        Pelajaran ini memfokuskan teknik menghubungkan idea dan meningkatkan nilai estetik penulisan
        menggunakan penanda wacana, peribahasa dan kosa kata matang.
      </IntroCard>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={TINGKATKAN_TEKNIK_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#60A5FA">
        <StepList steps={TINGKATKAN_TEKNIK_STEPS} color="#60A5FA" />
      </MissionSection>
      <MissionSection title="Teknik Menjawab" color="#22D3EE">
        <div className="grid gap-3 sm:grid-cols-2">
          {TINGKATKAN_TEKNIK_GROUPS.map((group) => (
            <article
              key={group.title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
            >
              <h3 className="font-display text-sm font-bold text-white">{group.title}</h3>
              <ChipList items={group.items} color="#60A5FA" />
            </article>
          ))}
        </div>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            <div key="sinonim">
              <p className="font-semibold text-white/85">Gunakan sinonim seperti:</p>
              <ul className="mt-2 space-y-1">
                <li>penting → signifikan</li>
                <li>penting → mustahak</li>
                <li>masalah → polemik</li>
                <li>alat → wahana</li>
              </ul>
            </div>,
            'Semak penggunaan partikel "-kah" agar tidak berlaku kesalahan struktur ayat.',
          ]}
        />
      </MissionSection>
      <WarningCard items={TINGKATKAN_TEKNIK_MISTAKES} />
      <SummaryCard>
        Penulisan yang cemerlang merupakan gabungan idea yang bernas, bahasa yang indah dan teknik
        penghuraian yang sistematik.
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
      <IntroCard color="#C084FC">
        Folder ini menyediakan contoh transformasi ayat, kosa kata matang serta latihan pengukuhan
        untuk meningkatkan kemahiran menulis.
      </IntroCard>
      <MissionSection title="Transformasi Ayat" color="#C084FC">
        <ResponsiveTable
          headers={["Ayat Biasa", "Ayat Matang"]}
          rows={TINGKATKAN_TRANSFORMATIONS}
        />
      </MissionSection>
      <MissionSection title="Penanda Wacana & Frasa Menarik" color="#60A5FA">
        <div className="grid gap-3 sm:grid-cols-3">
          {TINGKATKAN_PENANDA_GROUPS.map((group) => (
            <article
              key={group.title}
              className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
            >
              <h3 className="font-display text-sm font-bold text-white">{group.title}</h3>
              <ChipList items={group.items} color="#C084FC" />
            </article>
          ))}
        </div>
      </MissionSection>
      <section className="space-y-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
            Latihan Pengukuhan
          </p>
          <h2 className="mt-1 font-display text-xl font-black text-white">Praktis dan Semak</h2>
        </div>
        <ExerciseCard
          title="Latihan 1 — Keselamatan Siber"
          answer="Remaja perlu mencipta kata laluan yang kukuh kerana langkah tersebut dapat menghalang pencerobohan supaya akaun mereka sentiasa selamat."
        >
          Gabungkan ayat tentang <strong className="text-white">Keselamatan Siber</strong>{" "}
          menggunakan kata hubung <strong className="text-white">kerana</strong> dan{" "}
          <strong className="text-white">supaya</strong>.
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 2 — Formula I-H-C-P"
          answer={
            <p>
              <strong className="text-white">Isi:</strong> Amalan membaca merupakan jambatan ilmu
              yang perlu dibudayakan oleh murid. <strong className="text-white">Huraian:</strong>{" "}
              Hal ini dikatakan demikian kerana bahan bacaan dapat memperluas pengetahuan dan
              meningkatkan penguasaan bahasa. <strong className="text-white">Contoh:</strong>{" "}
              Contohnya, murid boleh membaca buku ilmiah dan karya sastera pada waktu lapang.{" "}
              <strong className="text-white">Penegasan:</strong> Jelaslah bahawa amalan membaca
              mampu melahirkan generasi yang berilmu.
            </p>
          }
        >
          Bina satu perenggan lengkap menggunakan formula{" "}
          <strong className="text-white">I-H-C-P</strong> bagi isi:{" "}
          <strong className="text-white">Amalan membaca jambatan ilmu.</strong>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 3 — Betulkan Ayat"
          answer={<p>Mengapakah isu itu kami bincangkan?</p>}
        >
          Betulkan ayat berikut:
          <blockquote className="mt-3 border-l-2 border-purple-300/50 pl-4 italic text-white/80">
            Isu itu dibincangkan oleh kami mengapakah?
          </blockquote>
        </ExerciseCard>
      </section>
      <MissionSection title="Contoh Jawapan — Tema: Tanggungjawab Remaja" color="#22D3EE">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["I — Isi", "Remaja bertanggungjawab menjaga disiplin diri di sekolah."],
            [
              "H — Huraian",
              "Hal ini dikatakan demikian kerana disiplin merupakan teras utama pembentukan sahsiah yang terpuji.",
            ],
            [
              "C — Contoh",
              "Tamsilnya, remaja perlu mematuhi peraturan sekolah serta menghormati guru.",
            ],
            [
              "P — Penegasan",
              "Jelaslah bahawa disiplin yang mantap akan melahirkan generasi yang cemerlang.",
            ],
          ].map(([label, text], index) => (
            <article key={label} className="rounded-xl border border-white/[0.08] bg-black/15 p-4">
              <p
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: SECTION_COLORS[index % 3] }}
              >
                {label}
              </p>
              <p className="mt-2 text-sm leading-7 text-white/75">{text}</p>
            </article>
          ))}
        </div>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Gunakan contoh daripada KOMSAS seperti nilai kegigihan, keberanian dan kebijaksanaan untuk menyokong huraian.",
            "Hafal sekurang-kurangnya lima kosa kata matang dan lima penanda wacana yang berbeza.",
          ]}
        />
      </MissionSection>
      <WarningCard items={TINGKATKAN_LATIHAN_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist
          items={TINGKATKAN_LATIHAN_CHECKLIST}
          checked={checked}
          onToggle={onToggle}
        />
      </MissionSection>
      <SummaryCard final>
        Teruskan berlatih mengembangkan ayat menggunakan bahasa yang gramatis, kosa kata yang luas
        serta huraian yang logik. Penulisan yang matang lahir daripada latihan yang konsisten.
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
  onNavigate: (id: BMForm3TingkatkanKaranganSectionId) => void;
}) {
  const previous = BM_FORM3_TINGKATKAN_KARANGAN_SECTIONS[index - 1];
  const next = BM_FORM3_TINGKATKAN_KARANGAN_SECTIONS[index + 1];
  return (
    <nav
      aria-label="Navigasi pelajaran Tingkatkan Karangan"
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

export function BMForm3TingkatkanKaranganContent({
  initialSectionId,
  onBack,
  onNavigate,
}: {
  initialSectionId?: string;
  onBack: () => void;
  onNavigate: (id: BMForm3TingkatkanKaranganSectionId) => void;
}) {
  const initialIndex = BM_FORM3_TINGKATKAN_KARANGAN_SECTIONS.findIndex(
    (section) => section.id === initialSectionId,
  );
  const [activeModule, setActiveModule] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [checks, setChecks] = useState(() => [
    TINGKATKAN_ASAS_CHECKLIST.map(() => false),
    [],
    TINGKATKAN_LATIHAN_CHECKLIST.map(() => false),
  ]);

  if (activeModule === null) {
    return (
      <ExamSkillLanding
        title="Tingkatkan Karangan"
        subtitle="Tingkatan 3 · Bahasa matang, huraian tersusun dan praktis intensif"
        missions={missions}
        onSelect={setActiveModule}
      />
    );
  }

  const mission = missions[activeModule];
  const section = BM_FORM3_TINGKATKAN_KARANGAN_SECTIONS[activeModule];
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
        <span className="mx-1 text-white/20">/</span> Tingkatkan Karangan{" "}
        <span className="mx-1 text-white/20">/</span>{" "}
        <span style={{ color: mission.color }}>{section.folderTitle}</span>
      </p>
      <MissionPageShell mission={mission} onBack={onBack}>
        {activeModule === 0 && <AsasContent checked={checks[0]} onToggle={toggleCheck} />}
        {activeModule === 1 && <TeknikContent />}
        {activeModule === 2 && <ContohContent checked={checks[2]} onToggle={toggleCheck} />}
        <LessonNavigation index={activeModule} onBack={onBack} onNavigate={onNavigate} />
      </MissionPageShell>
    </div>
  );
}
