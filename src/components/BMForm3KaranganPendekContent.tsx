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
  ASAS_CHECKLIST,
  ASAS_MISTAKES,
  ASAS_OBJECTIVES,
  ASAS_STEPS,
  BM_FORM3_KARANGAN_PENDEK_SECTIONS,
  FORMULA_131_ROWS,
  KARANGAN_MODELS,
  LATIHAN_CHECKLIST,
  LATIHAN_MISTAKES,
  TEKNIK_CHECKLIST,
  TEKNIK_MISTAKES,
  TEKNIK_OBJECTIVES,
  TEKNIK_STEPS,
  VOCABULARY_ROWS,
  WEAK_ANSWER_CORRECTIONS,
  countKaranganWords,
  type BMForm3KaranganPendekSectionId,
} from "@/data/bm-form3-karangan-pendek";

const SECTION_ICONS = [Star, PenLine, Brain];
const SECTION_COLORS = ["#FBBF24", "#60A5FA", "#C084FC"];

const missions: MissionDefinition[] = BM_FORM3_KARANGAN_PENDEK_SECTIONS.map((section, index) => ({
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

function StepList({ steps, color }: { steps: typeof ASAS_STEPS; color: string }) {
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

function LessonNavigation({
  index,
  onBack,
  onNavigate,
}: {
  index: number;
  onBack: () => void;
  onNavigate: (sectionId: BMForm3KaranganPendekSectionId) => void;
}) {
  const previous = BM_FORM3_KARANGAN_PENDEK_SECTIONS[index - 1];
  const next = BM_FORM3_KARANGAN_PENDEK_SECTIONS[index + 1];
  return (
    <nav
      aria-label="Navigasi pelajaran Karangan Pendek"
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

function AsasContent({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (index: number) => void;
}) {
  return (
    <>
      <section className="rounded-2xl border border-indigo-300/20 bg-indigo-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Karangan Pendek merupakan tugasan{" "}
          <strong className="text-white">Bahagian A dalam Kertas 2</strong> yang menguji kemahiran
          menulis secara ringkas dan padat berdasarkan bahan rangsangan.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={ASAS_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan nota ini untuk memahami format dan langkah asas sebelum mula menulis.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={ASAS_STEPS} color="#FBBF24" />
      </MissionSection>
      <MissionSection title="Formula Mudah — 1-3-1" color="#34D399">
        <div className="space-y-4">
          <ResponsiveTable headers={["Bahagian", "Fungsi"]} rows={FORMULA_131_ROWS} />
          <p className="text-sm leading-7 text-white/65">
            Formula ini ialah panduan mudah. Bilangan ayat boleh berubah sedikit selagi semua
            maklumat digunakan dan had perkataan dipatuhi.
          </p>
        </div>
      </MissionSection>
      <MissionSection title="Cara Mengira Patah Perkataan" color="#A78BFA">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Tulis jumlah perkataan di hujung karangan jika amalan tersebut digunakan oleh guru atau sekolah.",
            "Had sasaran ialah 50 hingga 80 patah perkataan.",
            "Kata nama khas yang terdiri daripada beberapa perkataan dikira mengikut kaedah rujukan rasmi sekolah.",
            "Kata ganda yang menggunakan tanda sempang lazimnya dikira sebagai satu perkataan.",
          ].map((item) => (
            <p
              key={item}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm leading-6 text-white/70"
            >
              {item}
            </p>
          ))}
        </div>
      </MissionSection>
      <MissionSection title="Contoh Ringkas — Amalan Membaca" color="#22D3EE">
        <div className="space-y-3">
          <ExampleBlock label="Tema">Amalan Membaca</ExampleBlock>
          <ExampleBlock label="Kata Kunci" color="#FBBF24">
            <ChipList
              items={["membaca buku", "menambahkan ilmu", "mengisi masa lapang"]}
              color="#FBBF24"
            />
          </ExampleBlock>
          <ExampleBlock
            label={`Contoh Jawapan · ${countKaranganWords("Amalan membaca membawa banyak manfaat kepada murid. Antaranya, membaca buku dapat menambahkan ilmu pengetahuan dalam pelbagai bidang. Selain itu, aktiviti ini juga membantu murid mengisi masa lapang dengan perkara yang berfaedah. Oleh itu, setiap murid perlulah menjadikan membaca sebagai amalan harian.")} patah perkataan`}
          >
            Amalan membaca membawa banyak manfaat kepada murid. Antaranya, membaca buku dapat
            menambahkan ilmu pengetahuan dalam pelbagai bidang. Selain itu, aktiviti ini juga
            membantu murid mengisi masa lapang dengan perkara yang berfaedah. Oleh itu, setiap murid
            perlulah menjadikan membaca sebagai amalan harian.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Fokus pada bahan rangsangan: gunakan semua maklumat penting sebelum menambah idea sendiri.",
            "Utamakan ketepatan: ayat yang mudah tetapi gramatis lebih baik daripada ayat sukar yang salah.",
            "Rancang dahulu: luangkan satu atau dua minit untuk menyusun kata kunci.",
          ]}
        />
      </MissionSection>
      <WarningCard items={ASAS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={ASAS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Karangan Pendek memerlukan <strong className="text-white">kepadatan idea</strong>,{" "}
        <strong className="text-white">ketepatan bahasa</strong> dan penggunaan semua maklumat bahan
        rangsangan dalam satu perenggan yang tersusun.
      </SummaryCard>
    </>
  );
}

function TeknikContent({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (index: number) => void;
}) {
  return (
    <>
      <section className="rounded-2xl border border-sky-300/20 bg-sky-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Pelajaran ini memfokuskan cara mengembangkan kata kunci menjadi ayat yang lebih jelas,
          matang dan gramatis untuk tahap Tingkatan 3.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={TEKNIK_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan teknik ini selepas mengenal pasti tema dan semua kata kunci dalam bahan
          rangsangan.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={TEKNIK_STEPS} color="#60A5FA" />
      </MissionSection>
      <MissionSection title="Contoh Ayat Majmuk, Pendahuluan dan Penutup" color="#22D3EE">
        <div className="space-y-3">
          <CorrectWrongExample
            wrong="Murid perlu bersenam. Badan akan menjadi sihat."
            right="Murid perlu bersenam secara berkala agar tubuh badan sentiasa sihat."
          />
          <ExampleBlock label="Pendahuluan Ringkas">
            Keselamatan siber amat penting dalam kehidupan moden.
          </ExampleBlock>
          <ExampleBlock label="Penutup Ringkas" color="#A78BFA">
            Oleh itu, kita perlulah menggunakan teknologi secara bijak dan selamat.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Teknik KOSA" color="#C084FC">
        <div className="space-y-4">
          <p className="text-sm leading-7 text-white/70">
            <strong className="text-white">KOSA</strong> bermaksud{" "}
            <strong className="text-white">
              Kembangkan Kata Kunci melalui Objek, Sifat dan Aktiviti
            </strong>
            . Gunakan teknik ini untuk menambah siapa yang melakukan aktiviti, bagaimana aktiviti
            dilakukan, tujuan dan kesannya.
          </p>
          <ExampleBlock label="Kata Kunci">Bersenam</ExampleBlock>
          <CorrectWrongExample
            wrong="Kita perlu bersenam."
            right="Kita perlu bersenam secara konsisten untuk memastikan kesihatan fizikal dan mental sentiasa terjamin."
          />
          <QuickScoreCard
            items={[
              "Siapa yang melakukan aktiviti",
              "Bagaimana aktiviti dilakukan",
              "Tujuan aktiviti",
              "Kesan aktiviti",
            ]}
          />
        </div>
      </MissionSection>
      <MissionSection title="Contoh Transformasi" color="#34D399">
        <div className="space-y-3">
          <ExampleBlock label="Kata Kunci">Menjaga kesihatan mental</ExampleBlock>
          <CorrectWrongExample
            wrong="Kita perlu menjaga kesihatan mental."
            right="Remaja perlu menjaga kesihatan mental dengan berehat secukupnya dan berkongsi masalah dengan individu yang dipercayai."
          />
        </div>
      </MissionSection>
      <MissionSection title="Kosa Kata yang Sesuai" color="#FBBF24">
        <div className="space-y-4">
          <ResponsiveTable
            headers={["Perkataan biasa", "Pilihan lebih tepat"]}
            rows={VOCABULARY_ROWS}
          />
          <p className="text-sm leading-7 text-white/65">
            Pilih perkataan mengikut maksud ayat. Jangan gunakan perkataan seperti “berkesan” atau
            “kondusif” jika konteksnya tidak sesuai.
          </p>
        </div>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Pilih kosa kata yang tepat, bukan sekadar sukar.",
            "Gunakan penanda wacana yang berbeza supaya ayat tidak berulang.",
            "Pastikan setiap ayat membawa maklumat baharu.",
            "Jangan terlalu banyak menggunakan ayat panjang.",
          ]}
        />
      </MissionSection>
      <WarningCard items={TEKNIK_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={TEKNIK_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Kunci kejayaan Karangan Pendek ialah{" "}
        <strong className="text-white">kesinambungan idea</strong>, ayat yang gramatis dan
        penggunaan penanda wacana yang sesuai.
      </SummaryCard>
    </>
  );
}

function ModelCard({ model }: { model: (typeof KARANGAN_MODELS)[number] }) {
  const wordCount = countKaranganWords(model.essay);
  return (
    <article className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
          {model.title}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold text-white">{model.theme}</h3>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">Maklumat</p>
        <ChipList items={model.information} color="#22D3EE" />
      </div>
      <ResponsiveTable headers={model.outlineHeaders} rows={model.outline} />
      <ExampleBlock
        label={`Karangan Lengkap · ${wordCount} patah perkataan`}
        color={wordCount >= 50 && wordCount <= 80 ? "#34D399" : "#FB7185"}
      >
        {model.essay}
      </ExampleBlock>
    </article>
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

function ContohLatihanContent({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (index: number) => void;
}) {
  return (
    <>
      <section className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Folder ini mengandungi contoh, model jawapan dan latihan berdasarkan tema yang sesuai
          untuk murid Tingkatan 3.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid
          items={[
            "Menganalisis bahan rangsangan",
            "Membina rangka 1-3-1",
            "Membezakan jawapan lemah dan jawapan lebih baik",
            "Menulis Karangan Pendek lengkap",
            "Menyemak jawapan sendiri",
          ]}
        />
      </MissionSection>
      <div className="space-y-5">
        {KARANGAN_MODELS.map((model) => (
          <ModelCard key={model.title} model={model} />
        ))}
      </div>
      <MissionSection title="Contoh Jawapan Lemah dan Pembetulan" color="#FBBF24">
        <div className="space-y-4">
          {WEAK_ANSWER_CORRECTIONS.map((item, index) => (
            <div key={item.weak} className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                Contoh {index + 1}
              </p>
              <CorrectWrongExample wrong={item.weak} right={item.better} />
              {item.problems.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-white/50">Masalah:</p>
                  <ChipList items={item.problems} color="#FB7185" />
                </div>
              )}
            </div>
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
        <ExerciseCard title="Latihan 1 — Kenal Pasti Kata Kunci">
          <p>
            <strong className="text-white">Tema:</strong> Kesihatan Mental
          </p>
          <p className="mt-2">
            <strong className="text-white">Bahan rangsangan:</strong>
          </p>
          <ChipList
            items={["tidur secukupnya", "berkongsi masalah", "melakukan aktiviti riadah"]}
            color="#22D3EE"
          />
          <p className="mt-3">
            Senaraikan tiga kata kunci dan bina satu ayat bagi setiap kata kunci.
          </p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 2 — Membina Ayat Majmuk"
          answer="Remaja perlu menjaga kesihatan mental dengan mendapatkan rehat yang cukup dan berkongsi masalah dengan individu yang dipercayai."
        >
          <p>
            Bina satu ayat majmuk menggunakan kata kunci{" "}
            <strong className="text-white">menjaga kesihatan mental</strong>.
          </p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 3 — Menyusun Isi"
          answer={
            <>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Menyertai gotong-royong.</li>
                <li>Menghadiri aktiviti komuniti.</li>
                <li>Membantu jiran yang menghadapi kesusahan.</li>
              </ol>
              <p className="mt-3 text-white/55">
                Ini ialah satu cadangan urutan. Lebih daripada satu susunan logik boleh diterima
                jika hubungan antara isi jelas.
              </p>
            </>
          }
        >
          <p>
            <strong className="text-white">Tema:</strong> Semangat Kejiranan
          </p>
          <ChipList
            items={[
              "membantu jiran yang menghadapi kesusahan",
              "menyertai gotong-royong",
              "menghadiri aktiviti komuniti",
            ]}
            color="#FBBF24"
          />
        </ExerciseCard>
        <ExerciseCard title="Latihan 4 — Menulis Karangan Pendek">
          <p>
            <strong className="text-white">Tema:</strong> Amalan Membaca
          </p>
          <ChipList
            items={["menambahkan ilmu", "meningkatkan penguasaan bahasa", "mengisi masa lapang"]}
            color="#34D399"
          />
          <p className="mt-3">Tulis satu karangan antara 50 hingga 80 patah perkataan.</p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 5 — Baiki Jawapan"
          answer={
            <ol className="list-decimal space-y-2 pl-5">
              <li>Pengguna perlu menjaga keselamatan ketika melayari Internet.</li>
              <li>Amalan membaca dapat menambahkan ilmu pengetahuan.</li>
              <li>Masyarakat perlu saling membantu jiran yang menghadapi kesusahan.</li>
              <li>
                Kita tidak seharusnya membuang sampah merata-rata kerana perbuatan tersebut
                mencemarkan alam sekitar.
              </li>
            </ol>
          }
        >
          <ol className="list-decimal space-y-2 pl-5">
            <li>Kita kena jaga internet.</li>
            <li>Membaca bagus.</li>
            <li>Jiran mesti tolong.</li>
            <li>Kita jangan buang sampah.</li>
          </ol>
        </ExerciseCard>
      </section>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Pastikan setiap ayat mempunyai subjek dan predikat yang jelas.",
            "Gunakan semua maklumat bahan rangsangan.",
            "Elakkan ayat yang terlalu pendek dan tidak dikembangkan.",
            "Semak jumlah perkataan selepas selesai menulis.",
          ]}
        />
      </MissionSection>
      <WarningCard items={LATIHAN_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={LATIHAN_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Karangan Pendek yang cemerlang menggabungkan semua isi rangsangan dengan bahasa yang
        gramatis, tersusun dan tepat dalam had{" "}
        <strong className="text-white">50 hingga 80 patah perkataan</strong>.
      </SummaryCard>
    </>
  );
}

export function BMForm3KaranganPendekContent({
  initialSectionId,
  onBack,
  onNavigate,
}: {
  initialSectionId?: string;
  onBack: () => void;
  onNavigate: (sectionId: BMForm3KaranganPendekSectionId) => void;
}) {
  const initialIndex = BM_FORM3_KARANGAN_PENDEK_SECTIONS.findIndex(
    (section) => section.id === initialSectionId,
  );
  const [activeModule, setActiveModule] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [checks, setChecks] = useState(() =>
    [ASAS_CHECKLIST, TEKNIK_CHECKLIST, LATIHAN_CHECKLIST].map((list) => list.map(() => false)),
  );

  if (activeModule === null) {
    return (
      <ExamSkillLanding
        title="Karangan Pendek"
        subtitle="Bahagian A · Kertas 2 · Tingkatan 3"
        missions={missions}
        onSelect={setActiveModule}
      />
    );
  }

  const mission = missions[activeModule];
  const section = BM_FORM3_KARANGAN_PENDEK_SECTIONS[activeModule];
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
        <span className="mx-1 text-white/20">/</span> Karangan Pendek{" "}
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
