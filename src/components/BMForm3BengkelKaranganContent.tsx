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
  WarningCard,
  type MissionDefinition,
} from "@/components/exam-skill/MissionLearning";
import {
  BENGKEL_ASAS_CHECKLIST,
  BENGKEL_ASAS_MISTAKES,
  BENGKEL_ASAS_OBJECTIVES,
  BENGKEL_ASAS_STEPS,
  BENGKEL_LATIHAN_CHECKLIST,
  BENGKEL_LATIHAN_MISTAKES,
  BENGKEL_TEKNIK_CHECKLIST,
  BENGKEL_TEKNIK_MISTAKES,
  BENGKEL_TEKNIK_OBJECTIVES,
  BENGKEL_TEKNIK_STEPS,
  BM_FORM3_BENGKEL_KARANGAN_SECTIONS,
  FORMULA_131_BENGKEL_ROWS,
  KOSA_KATA_MATANG_ROWS,
  PENANDA_WACANA_BENGKEL,
  TRANSFORMASI_AYAT_ROWS,
  type BMForm3BengkelKaranganSectionId,
} from "@/data/bm-form3-bengkel-karangan";

const SECTION_ICONS = [Star, PenLine, Brain];
const SECTION_COLORS = ["#FBBF24", "#60A5FA", "#C084FC"];

const missions: MissionDefinition[] = BM_FORM3_BENGKEL_KARANGAN_SECTIONS.map((section, index) => ({
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

function StepList({ steps, color }: { steps: typeof BENGKEL_ASAS_STEPS; color: string }) {
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
      <table className="w-full min-w-[40rem] border-collapse text-left">
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

function IhcpParagraph() {
  const parts = [
    [
      "I",
      "Antara langkah untuk melindungi diri daripada ancaman siber ialah merahsiakan kata laluan akaun media sosial.",
      "#34D399",
    ],
    [
      "H",
      "Hal ini penting bagi mengelakkan akaun peribadi diceroboh oleh pihak yang tidak bertanggungjawab.",
      "#60A5FA",
    ],
    [
      "C",
      "Contohnya, pengguna perlu mencipta kata laluan yang kukuh dan tidak berkongsinya dengan sesiapa.",
      "#FBBF24",
    ],
    [
      "P",
      "Jelaslah bahawa kerahsiaan kata laluan merupakan salah satu benteng utama keselamatan digital.",
      "#C084FC",
    ],
  ];
  return (
    <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/15 p-4">
      {parts.map(([code, text, color]) => (
        <p key={code} className="text-sm leading-7 text-white/75">
          <span
            className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-black"
            style={{ color, background: `${color}18` }}
          >
            {code}
          </span>
          {text}
        </p>
      ))}
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
  onNavigate: (sectionId: BMForm3BengkelKaranganSectionId) => void;
}) {
  const previous = BM_FORM3_BENGKEL_KARANGAN_SECTIONS[index - 1];
  const next = BM_FORM3_BENGKEL_KARANGAN_SECTIONS[index + 1];
  return (
    <nav
      aria-label="Navigasi pelajaran Bengkel Karangan"
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
          Pelajaran ini memperkenalkan konsep Bengkel Karangan dengan fokus kepada pembinaan
          karangan yang mempunyai <strong className="text-white">huraian matang</strong>,{" "}
          <strong className="text-white">struktur yang utuh</strong> dan bahasa yang gramatis. Bagi
          Karangan Respons Terbuka, sumber Form 1 dan Form 2 dalam projek menggunakan keperluan{" "}
          <strong className="text-white">melebihi 180 patah perkataan</strong>.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={BENGKEL_ASAS_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan nota ini sebelum memulakan draf untuk memahami kehendak soalan, menyediakan
          komponen teknikal, menyusun isi, merancang masa dan memastikan karangan tidak terkeluar
          daripada tajuk.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={BENGKEL_ASAS_STEPS} color="#FBBF24" />
      </MissionSection>
      <MissionSection title="Cadangan Pembahagian Masa Latihan" color="#60A5FA">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["5 minit", "Menganalisis dan merangka"],
            ["40 minit", "Menulis karangan"],
            ["5 minit", "Menyemak bahasa"],
          ].map(([time, task]) => (
            <ExampleBlock key={time} label={time} color="#60A5FA">
              {task}
            </ExampleBlock>
          ))}
        </div>
        <p className="mt-3 text-sm leading-7 text-white/55">
          Pembahagian 5–40–5 ini ialah cadangan kaedah latihan kelas, bukannya peraturan masa
          peperiksaan rasmi. Sesuaikan strategi dengan arahan dan tempoh peperiksaan semasa.
        </p>
      </MissionSection>
      <MissionSection title="Formula 1-3-1" color="#34D399">
        <ResponsiveTable headers={["Bahagian", "Kandungan"]} rows={FORMULA_131_BENGKEL_ROWS} />
        <p className="mt-3 text-sm leading-7 text-white/60">
          Formula 1-3-1 ialah panduan praktikal, bukan peraturan yang kaku. Bilangan perenggan boleh
          disesuaikan dengan kehendak soalan dan kekuatan isi.
        </p>
      </MissionSection>
      <MissionSection title="Contoh Rangka Ringkas — Amalan Membaca" color="#22D3EE">
        <div className="grid gap-3 sm:grid-cols-2">
          <ExampleBlock label="Pendahuluan">
            Membaca penting dalam kehidupan murid dan budaya membaca perlu dipupuk.
          </ExampleBlock>
          <ExampleBlock label="Isi 1" color="#60A5FA">
            Menambahkan ilmu pengetahuan.
          </ExampleBlock>
          <ExampleBlock label="Isi 2" color="#60A5FA">
            Meningkatkan penguasaan bahasa.
          </ExampleBlock>
          <ExampleBlock label="Isi 3" color="#60A5FA">
            Mengisi masa lapang secara berfaedah.
          </ExampleBlock>
          <ExampleBlock label="Penutup" color="#F472B6">
            Semua pihak perlu menggalakkan amalan membaca agar budaya ilmu berkembang.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Teknik Kematangan Ayat" color="#A78BFA">
        <CorrectWrongExample
          wrong="Murid perlu membaca."
          right="Murid perlu membudayakan amalan membaca kerana aktiviti tersebut dapat memperluas ilmu pengetahuan dan meningkatkan penguasaan bahasa."
        />
        <ChipList
          items={["kerana", "agar", "supaya", "walaupun", "manakala", "meskipun"]}
          color="#C084FC"
        />
        <p className="mt-3 text-sm leading-7 text-white/60">
          Gunakan kata hubung secara tepat dan sederhana. Ayat majmuk tidak perlu terlalu panjang
          untuk kelihatan matang.
        </p>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Rancang sebelum menulis supaya isi tidak berulang.",
            "Gunakan ayat majmuk secara sederhana dan tepat.",
            "Gunakan satu perenggan untuk satu isi utama.",
            "Utamakan ayat yang jelas berbanding ayat berbunga tetapi kabur.",
          ]}
        />
      </MissionSection>
      <WarningCard items={BENGKEL_ASAS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={BENGKEL_ASAS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Asas karangan yang kuat bermula dengan analisis <strong className="text-white">TFT</strong>,
        rangka yang teratur dan penggunaan formula <strong className="text-white">I-H-C-P</strong>{" "}
        dalam setiap perenggan isi.
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
          Pelajaran ini memfokuskan cara mengembangkan isi secara mendalam, memilih contoh yang
          relevan, menggunakan penanda wacana dan meningkatkan nilai bahasa serta estetik penulisan.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={BENGKEL_TEKNIK_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan teknik ini selepas rangka selesai. Dalam setiap perenggan isi, nyatakan idea,
          jelaskan mengapa atau bagaimana, berikan contoh, terangkan kesan dan simpulkan perenggan.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah" color="#FBBF24">
        <StepList steps={BENGKEL_TEKNIK_STEPS} color="#60A5FA" />
      </MissionSection>
      <MissionSection title="Fokus Teknik 5W1H" color="#A78BFA">
        <ChipList
          items={[
            "Apa?",
            "Siapa?",
            "Bila?",
            "Di mana?",
            "Mengapa?",
            "Bagaimana?",
            "Apakah kesannya?",
          ]}
          color="#C084FC"
        />
        <p className="mt-3 text-sm leading-7 text-white/60">
          Pada tahap Tingkatan 3, utamakan jawapan kepada mengapa, bagaimana dan apakah kesannya
          supaya huraian tidak sekadar mengulang isi.
        </p>
      </MissionSection>
      <MissionSection title="Memilih Contoh" color="#22D3EE">
        <ObjectiveGrid
          items={[
            "Berkaitan dengan isi",
            "Logik dan mudah dijelaskan",
            "Sesuai dengan kehidupan remaja",
            "Tidak bergantung pada statistik yang tidak disahkan",
          ]}
        />
        <ChipList
          items={[
            "keselamatan siber",
            "disiplin sekolah",
            "kesihatan mental",
            "perpaduan",
            "alam sekitar",
            "teknologi",
          ]}
          color="#22D3EE"
        />
      </MissionSection>
      <MissionSection title="Penanda Wacana Mengikut Fungsi" color="#60A5FA">
        <div className="grid gap-3 sm:grid-cols-2">
          {PENANDA_WACANA_BENGKEL.map((group) => (
            <ExampleBlock key={group.function} label={group.function} color="#60A5FA">
              <ChipList items={group.items} color="#60A5FA" />
            </ExampleBlock>
          ))}
        </div>
      </MissionSection>
      <MissionSection title="Teknik Kesan Berganda" color="#34D399">
        <p className="text-sm leading-7 text-white/70">
          Jangan berhenti pada kesan kepada individu. Jika benar-benar berkaitan, lanjutkan huraian
          kepada keluarga, sekolah, masyarakat atau negara. Jangan memaksa kesan peringkat negara
          bagi topik yang tidak memerlukannya.
        </p>
        <ChipList
          items={["diri", "keluarga", "sekolah", "masyarakat", "negara jika relevan"]}
          color="#34D399"
        />
      </MissionSection>
      <MissionSection title="Contoh Teknik Kesan Berganda — Perpaduan" color="#22D3EE">
        <div className="space-y-3">
          <ExampleBlock label="Isi">Penduduk perlu mengadakan aktiviti gotong-royong.</ExampleBlock>
          <ExampleBlock label="Huraian" color="#60A5FA">
            Aktiviti ini membolehkan penduduk bekerjasama membersihkan kawasan perumahan tanpa
            mengira kaum.
          </ExampleBlock>
          <ExampleBlock label="Kesan kepada masyarakat" color="#FBBF24">
            Hubungan antara jiran dapat dieratkan dan sikap saling memahami dapat dipupuk.
          </ExampleBlock>
          <ExampleBlock label="Penegasan" color="#C084FC">
            Jelaslah bahawa gotong-royong bukan sahaja menjaga kebersihan, malah memperkukuh
            perpaduan masyarakat.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Penggunaan Peribahasa" color="#FBBF24">
        <ExampleBlock label="Contoh" color="#FBBF24">
          Kerjasama penduduk yang erat dapat diibaratkan seperti <em>aur dengan tebing</em>.
        </ExampleBlock>
        <p className="mt-3 text-sm leading-7 text-white/60">
          Gunakan satu peribahasa yang tepat apabila relevan. Peribahasa tidak menjamin markah yang
          lebih tinggi secara automatik.
        </p>
      </MissionSection>
      <MissionSection title="Sisipan KOMSAS yang Selamat" color="#C084FC">
        <p className="text-sm leading-7 text-white/70">
          Rujukan KOMSAS boleh digunakan hanya apabila benar-benar relevan, tepat dan membantu
          sebagai contoh. Gunakan nilai atau peristiwa daripada novel Tingkatan 3 yang dipelajari di
          sekolah anda. Jangan memaksa rujukan KOMSAS atau menggunakan tajuk novel yang belum
          disahkan mengikut zon.
        </p>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Gunakan 5W1H untuk menghasilkan huraian yang mendalam.",
            "Pilih contoh yang dekat dengan kehidupan murid.",
            "Gunakan penanda wacana mengikut fungsi, bukan secara rawak.",
            "Gunakan kosa kata matang yang benar-benar difahami.",
            "Pastikan peribahasa menyokong isi, bukan sekadar menjadi hiasan.",
          ]}
        />
      </MissionSection>
      <WarningCard items={BENGKEL_TEKNIK_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={BENGKEL_TEKNIK_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Gunakan teknik <strong className="text-white">5W1H</strong>, penanda wacana yang sesuai dan
        huraian kesan untuk menghasilkan perenggan yang matang serta mudah difahami.
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
  return (
    <>
      <section className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
          Penerangan Ringkas
        </p>
        <p className="mt-2 text-sm leading-7 text-white/70">
          Folder ini menyediakan contoh transformasi ayat, kosa kata, penanda wacana dan latihan
          praktikal untuk meningkatkan kematangan penulisan murid Tingkatan 3.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid
          items={[
            "Membaiki ayat mudah",
            "Membina ayat majmuk",
            "Memilih kosa kata yang tepat",
            "Mengembangkan isi menggunakan I-H-C-P",
            "Menggunakan penanda wacana mengikut fungsi",
            "Menyemak dan membaiki penulisan sendiri",
          ]}
        />
      </MissionSection>
      <MissionSection title="Contoh Transformasi Ayat" color="#60A5FA">
        <ResponsiveTable
          headers={["Tahap Biasa", "Tahap Matang Tingkatan 3"]}
          rows={TRANSFORMASI_AYAT_ROWS}
        />
        <p className="mt-3 text-sm leading-7 text-white/60">
          Gunakan ungkapan yang semula jadi dan tepat. “Wahana teknologi” atau “efektif” bukan
          pilihan automatik apabila frasa yang lebih mudah membawa maksud dengan lebih jelas.
        </p>
      </MissionSection>
      <MissionSection title="Kosa Kata Matang" color="#FBBF24">
        <ResponsiveTable
          headers={["Perkataan biasa", "Pilihan lebih matang", "Maksud ringkas"]}
          rows={KOSA_KATA_MATANG_ROWS}
        />
        <p className="mt-3 text-sm leading-7 text-white/60">
          Fahami maksud dan konteks sebelum menggunakan sesuatu perkataan. Murid tidak perlu
          menghafal perkataan yang belum difahami.
        </p>
      </MissionSection>
      <MissionSection title="Penanda Wacana Mengikut Fungsi" color="#22D3EE">
        <div className="grid gap-3 sm:grid-cols-2">
          {PENANDA_WACANA_BENGKEL.map((group) => (
            <ExampleBlock key={group.function} label={group.function} color="#22D3EE">
              <ChipList items={group.items} color="#22D3EE" />
              {group.function === "Memberikan contoh" && (
                <p className="mt-3 text-white/55">
                  <em>Tamsilnya</em> boleh digunakan sebagai pengayaan pilihan.
                </p>
              )}
              {group.function === "Menegaskan" && (
                <p className="mt-3 text-white/55">
                  <em>Sudah terang lagi bersuluh</em> hanya sesuai apabila konteksnya semula jadi.
                </p>
              )}
            </ExampleBlock>
          ))}
        </div>
        <p className="mt-3 text-sm leading-7 text-white/55">
          “Uswahnya” tidak dijadikan penanda wacana wajib dalam modul ini.
        </p>
      </MissionSection>
      <MissionSection title="Latihan Mengembangkan Isi — Keselamatan Siber" color="#34D399">
        <ExampleBlock label="Isi">Merahsiakan kata laluan akaun media sosial.</ExampleBlock>
        <p className="my-3 text-sm leading-7 text-white/60">
          Bina satu perenggan lengkap menggunakan formula I-H-C-P.
        </p>
        <IhcpParagraph />
      </MissionSection>
      <section className="space-y-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
            Aktiviti Latihan
          </p>
          <h2 className="mt-1 font-display text-xl font-black text-white">Latih dan Semak</h2>
        </div>
        <ExerciseCard
          title="Latihan 1 — Baiki Ayat"
          answer={
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Masyarakat perlu memelihara kebersihan sungai agar pencemaran dapat dielakkan.
              </li>
              <li>
                Murid perlu menggunakan telefon pintar secara terkawal supaya pelajaran tidak
                terjejas.
              </li>
              <li>
                Jiran perlu bekerjasama untuk mewujudkan kawasan perumahan yang aman dan harmoni.
              </li>
              <li>Amalan membaca sangat bermanfaat kerana dapat memperluas ilmu pengetahuan.</li>
            </ol>
          }
        >
          <ol className="list-decimal space-y-2 pl-5">
            <li>Kita kena jaga sungai.</li>
            <li>Murid suka main telefon.</li>
            <li>Jiran mesti bekerjasama.</li>
            <li>Membaca sangat bagus.</li>
          </ol>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 2 — Pilih Penanda Wacana"
          answer={
            <ul className="space-y-1">
              <li>
                <strong className="text-white">Isi kedua:</strong> Selain itu
              </li>
              <li>
                <strong className="text-white">Sebab:</strong> Hal ini dikatakan demikian kerana
              </li>
              <li>
                <strong className="text-white">Contoh:</strong> Sebagai contoh
              </li>
              <li>
                <strong className="text-white">Penegasan:</strong> Jelaslah bahawa
              </li>
            </ul>
          }
        >
          <p>
            Pilih penanda wacana yang sesuai untuk memulakan isi kedua, menghuraikan sebab,
            memberikan contoh dan menegaskan isi.
          </p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 3 — Kembangkan Isi"
          answer="Remaja perlu menjaga kesihatan mental agar kehidupan mereka lebih seimbang. Hal ini penting kerana tekanan yang tidak diurus boleh menjejaskan emosi dan tumpuan terhadap pelajaran. Contohnya, remaja boleh berehat secukupnya, melakukan aktiviti riadah dan berkongsi masalah dengan individu yang dipercayai. Jelaslah bahawa penjagaan kesihatan mental membantu remaja menjalani kehidupan yang lebih sejahtera."
        >
          <p>
            <strong className="text-white">Isi:</strong> Remaja perlu menjaga kesihatan mental.
          </p>
          <p className="mt-2">Bina satu perenggan I-H-C-P.</p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 4 — Teknik Kesan Berganda"
          answer={
            <ul className="space-y-1">
              <li>
                <strong className="text-white">Murid:</strong> membina disiplin, keyakinan dan
                kemahiran bekerjasama.
              </li>
              <li>
                <strong className="text-white">Sekolah:</strong> melahirkan murid aktif serta
                mengharumkan nama sekolah.
              </li>
              <li>
                <strong className="text-white">Masyarakat jika relevan:</strong> membentuk generasi
                yang bertanggungjawab dan suka menyumbang.
              </li>
            </ul>
          }
        >
          <p>
            <strong className="text-white">Isi:</strong> Murid menyertai aktiviti kokurikulum.
          </p>
          <p className="mt-2">Terangkan kesan kepada murid, sekolah dan masyarakat jika relevan.</p>
        </ExerciseCard>
        <ExerciseCard
          title="Latihan 5 — Bina Perenggan Lengkap"
          answer="Remaja perlu menghormati adat dan budaya kaum lain untuk memperkukuh perpaduan. Sikap ini penting kerana masyarakat Malaysia terdiri daripada pelbagai latar budaya yang perlu difahami dan dihargai. Contohnya, murid boleh menjaga tutur kata serta menghormati amalan perayaan rakan-rakan mereka. Kesannya, hubungan antara kaum menjadi lebih erat dan salah faham dapat dielakkan. Tegasnya, sikap saling menghormati merupakan asas masyarakat yang harmoni."
        >
          <p>
            <strong className="text-white">Tema:</strong> Perpaduan
          </p>
          <p className="mt-2">
            <strong className="text-white">Isi:</strong> Menghormati adat dan budaya kaum lain.
          </p>
          <p className="mt-2">Sertakan Isi, Huraian, Contoh, Kesan dan Penegasan.</p>
        </ExerciseCard>
      </section>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Hafal beberapa penanda wacana mengikut fungsi, bukan secara rawak.",
            "Gunakan kosa kata matang secara sederhana.",
            "Pastikan ayat yang ditambah baik masih mudah difahami.",
            "Semak sama ada contoh benar-benar menyokong isi.",
            "Latih satu perenggan I-H-C-P setiap hari.",
          ]}
        />
      </MissionSection>
      <WarningCard items={BENGKEL_LATIHAN_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={BENGKEL_LATIHAN_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Penulisan Tingkatan 3 yang cemerlang menggabungkan{" "}
        <strong className="text-white">isi yang bernas</strong>,{" "}
        <strong className="text-white">huraian yang logik</strong>,{" "}
        <strong className="text-white">contoh yang relevan</strong> dan{" "}
        <strong className="text-white">bahasa yang gramatis</strong>. Kematangan dibina melalui
        latihan yang konsisten, bukan sekadar penggunaan perkataan sukar.
      </SummaryCard>
    </>
  );
}

export function BMForm3BengkelKaranganContent({
  initialSectionId,
  onBack,
  onNavigate,
}: {
  initialSectionId?: string;
  onBack: () => void;
  onNavigate: (sectionId: BMForm3BengkelKaranganSectionId) => void;
}) {
  const initialIndex = BM_FORM3_BENGKEL_KARANGAN_SECTIONS.findIndex(
    (section) => section.id === initialSectionId,
  );
  const [activeModule, setActiveModule] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [checks, setChecks] = useState(() =>
    [BENGKEL_ASAS_CHECKLIST, BENGKEL_TEKNIK_CHECKLIST, BENGKEL_LATIHAN_CHECKLIST].map((list) =>
      list.map(() => false),
    ),
  );

  if (activeModule === null) {
    return (
      <ExamSkillLanding
        title="Bengkel Karangan"
        subtitle="Tingkatan 3 · Rangka, huraian dan bahasa matang"
        missions={missions}
        onSelect={setActiveModule}
      />
    );
  }

  const mission = missions[activeModule];
  const section = BM_FORM3_BENGKEL_KARANGAN_SECTIONS[activeModule];
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
        <span className="mx-1 text-white/20">/</span> Bengkel Karangan{" "}
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
