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
  BM_FORM3_MODEL_KARANGAN_SECTIONS,
  FORMAT_ROWS,
  IHCP_ROWS,
  MODEL_ASAS_CHECKLIST,
  MODEL_ASAS_MISTAKES,
  MODEL_ASAS_OBJECTIVES,
  MODEL_ASAS_STEPS,
  MODEL_ESSAY_PARAGRAPHS,
  MODEL_ESSAY_WORD_COUNT,
  MODEL_LATIHAN_CHECKLIST,
  MODEL_LATIHAN_MISTAKES,
  MODEL_TEKNIK_CHECKLIST,
  MODEL_TEKNIK_MISTAKES,
  RCH_ROWS,
  VOCABULARY_ROWS,
  WEAK_ANSWER_ROWS,
  type BMForm3ModelKaranganSectionId,
} from "@/data/bm-form3-model-karangan-bank";

const SECTION_ICONS = [Star, PenLine, Brain];
const SECTION_COLORS = ["#FBBF24", "#60A5FA", "#C084FC"];

const missions: MissionDefinition[] = BM_FORM3_MODEL_KARANGAN_SECTIONS.map((section, index) => ({
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

function StepList({ color }: { color: string }) {
  return (
    <div className="space-y-3">
      {MODEL_ASAS_STEPS.map((step, index) => (
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
          Folder ini merupakan panduan asas yang mengandungi formula penting untuk membina karangan
          yang mempunyai struktur kukuh, huraian yang mendalam dan bahasa yang gramatis.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid items={MODEL_ASAS_OBJECTIVES} />
      </MissionSection>
      <MissionSection title="Cara Guna" color="#60A5FA">
        <p className="text-sm leading-7 text-white/70">
          Gunakan folder ini sebelum mula menulis untuk memahami kehendak soalan, memilih format,
          menyusun isi, mengelakkan pengulangan serta melengkapkan pendahuluan, isi dan penutup.
        </p>
      </MissionSection>
      <MissionSection title="Langkah Demi Langkah — Merancang Karangan" color="#FBBF24">
        <StepList color="#FBBF24" />
      </MissionSection>
      <MissionSection title="Analisis TFT" color="#22D3EE">
        <div className="grid gap-3 sm:grid-cols-3">
          <ExampleBlock label="T — Tema">
            Kenal pasti isu utama. Contoh: keselamatan siber.
          </ExampleBlock>
          <ExampleBlock label="F — Format" color="#60A5FA">
            Tentukan sama ada karangan berformat atau tidak berformat, seperti laporan, surat,
            ucapan, syarahan atau dialog.
          </ExampleBlock>
          <ExampleBlock label="T — Tugasan" color="#C084FC">
            Kenal pasti sama ada soalan meminta punca, langkah, kesan, kepentingan, dua sudut atau
            peranan pihak tertentu.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Strategi Pengurusan Masa" color="#60A5FA">
        <ObjectiveGrid
          items={[
            "Masa untuk menganalisis dan merangka",
            "Masa untuk menulis",
            "Masa untuk menyemak",
          ]}
        />
        <p className="mt-3 text-sm leading-7 text-white/55">
          Ini ialah strategi latihan kelas yang boleh disesuaikan dengan arahan dan tempoh
          peperiksaan semasa, bukan ketetapan masa rasmi.
        </p>
      </MissionSection>
      <MissionSection title="Formula Perenggan Isi — I-H-C-P" color="#34D399">
        <ResponsiveTable headers={["Kod", "Komponen", "Fungsi"]} rows={IHCP_ROWS} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ExampleBlock label="I — Isi">Remaja perlu merahsiakan maklumat peribadi.</ExampleBlock>
          <ExampleBlock label="H — Huraian" color="#60A5FA">
            Hal ini penting kerana maklumat tersebut boleh disalahgunakan oleh pihak yang tidak
            bertanggungjawab.
          </ExampleBlock>
          <ExampleBlock label="C — Contoh" color="#FBBF24">
            Contohnya, pengguna tidak seharusnya berkongsi kata laluan atau lokasi semasa dengan
            orang asing.
          </ExampleBlock>
          <ExampleBlock label="P — Penegasan" color="#C084FC">
            Jelaslah bahawa kerahsiaan data merupakan benteng utama keselamatan digital.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Formula Penutup — R-C-H" color="#A78BFA">
        <ResponsiveTable headers={["Kod", "Komponen", "Fungsi"]} rows={RCH_ROWS} />
        <ExampleBlock label="Contoh Penutup" color="#A78BFA">
          Kesimpulannya, keselamatan siber perlu diberikan perhatian oleh semua pihak. Ibu bapa dan
          sekolah hendaklah meningkatkan pendidikan digital dalam kalangan remaja. Diharapkan usaha
          ini dapat mewujudkan ruang siber yang lebih selamat untuk generasi muda.
        </ExampleBlock>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Jika sesuai, huraikan kesan kepada diri, sekolah, masyarakat atau negara.",
            "Gunakan peribahasa atau kata hikmat hanya apabila benar-benar berkaitan.",
            "Gunakan satu perenggan untuk satu isi utama.",
            "Utamakan ayat yang jelas berbanding ayat berbunga tetapi kabur.",
          ]}
        />
      </MissionSection>
      <WarningCard items={MODEL_ASAS_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={MODEL_ASAS_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Kuasai teknik <strong className="text-white">TFT</strong>,{" "}
        <strong className="text-white">I-H-C-P</strong> dan{" "}
        <strong className="text-white">R-C-H</strong> untuk menghasilkan karangan yang tersusun,
        relevan dan matang.
      </SummaryCard>
    </>
  );
}

const formatGuides = [
  [
    "Karangan Fakta / Pendapat",
    "Analisis tema dan tugasan, pilih isi yang benar-benar berbeza, bina pendahuluan yang memperkenalkan isu, gunakan I-H-C-P dan akhiri dengan R-C-H. Elakkan hujah tanpa huraian.",
  ],
  [
    "Karangan Perbincangan",
    "Huraikan dua sudut pandangan secara seimbang, gunakan penanda pertentangan dan buat rumusan yang adil.",
  ],
  [
    "Karangan Pengalaman",
    "Susun latar, watak, konflik, kemuncak, penyelesaian, perasaan dan pengajaran mengikut urutan masa.",
  ],
  [
    "Surat Kiriman Rasmi",
    "Sertakan alamat pengirim, alamat penerima, tarikh, perkara, kata panggilan, isi bernombor, penutup, tandatangan dan jawatan mengikut templat projek.",
  ],
  [
    "Surat Kiriman Tidak Rasmi",
    "Sertakan alamat pengirim, tarikh, kata hadap diri, pembuka, isi, penutup dan nama atau tandatangan mengikut templat projek.",
  ],
  [
    "Ucapan / Syarahan / Ceramah",
    "Gunakan kata alu-aluan, sapaan mengikut protokol, pengenalan tajuk, isi, penghargaan atau seruan dan penutup.",
  ],
  [
    "Laporan",
    "Gunakan tajuk, pengenalan, fakta aktiviti yang tersusun atau kronologi, penutup dan pengesahan pelapor mengikut templat projek.",
  ],
  [
    "Artikel",
    "Gunakan tajuk, nama penulis jika diperlukan oleh templat, pendahuluan, isi dan penutup dengan gaya informatif.",
  ],
  [
    "Dialog",
    "Gunakan nama watak, titik bertindih, bahasa yang sesuai dengan watak serta plot atau tujuan yang berkembang secara logik.",
  ],
];

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
          Folder ini menerangkan ciri, struktur dan teknik menjawab bagi jenis karangan yang sesuai
          untuk murid Tingkatan 3.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid
          items={[
            "Mengenal pasti jenis karangan",
            "Membezakan karangan berformat dan tidak berformat",
            "Menggunakan struktur yang betul",
            "Memilih penanda wacana yang sesuai",
            "Mengelakkan kesalahan format",
          ]}
        />
      </MissionSection>
      <MissionSection title="Teknik Mengikut Jenis Karangan" color="#60A5FA">
        <ResponsiveTable
          headers={["Jenis Karangan", "Ciri dan Teknik", "Penanda Wacana Sesuai"]}
          rows={FORMAT_ROWS}
        />
      </MissionSection>
      <MissionSection title="Panduan Struktur Mengikut Format" color="#FBBF24">
        <div className="grid gap-3 sm:grid-cols-2">
          {formatGuides.map(([title, body], index) => (
            <ExampleBlock
              key={title}
              label={title}
              color={SECTION_COLORS[index % SECTION_COLORS.length]}
            >
              {body}
            </ExampleBlock>
          ))}
        </div>
      </MissionSection>
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Ucapan, syarahan dan ceramah perlu menggunakan nada yang sesuai dengan khalayak dan tugasan.",
            "Masukkan emosi, konflik dan pengajaran supaya karangan pengalaman tidak mendatar.",
            "Kenal pasti format sebelum mencari isi.",
            "Elakkan singkatan dan bahasa pasar dalam penulisan formal.",
          ]}
        />
      </MissionSection>
      <MissionSection title="Rujukan KOMSAS" color="#C084FC">
        <p className="text-sm leading-7 text-white/70">
          Murid boleh menggunakan nilai atau peristiwa daripada teks KOMSAS Tingkatan 3 yang
          dipelajari di sekolah jika sesuai dengan tajuk. Pastikan rujukan tepat dan jangan
          memaksanya ke dalam karangan yang tidak berkaitan.
        </p>
      </MissionSection>
      <WarningCard items={MODEL_TEKNIK_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={MODEL_TEKNIK_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Setiap jenis karangan mempunyai struktur dan ciri tersendiri. Kenal pasti format dahulu
        sebelum membina rangka dan menulis isi.
      </SummaryCard>
    </>
  );
}

function ExerciseList() {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
          Aktiviti Tambahan
        </p>
        <h2 className="mt-1 font-display text-xl font-black text-white">Latih dan Semak</h2>
      </div>
      <ExerciseCard
        title="Latihan 1 — Kenal Pasti Format"
        answer={
          <ol className="list-decimal space-y-2 pl-5">
            <li>Aduan kemudahan awam kepada majlis: surat rasmi.</li>
            <li>Catatan Hari Kokurikulum: laporan.</li>
            <li>Pesanan tentang amalan membaca kepada perhimpunan: ucapan.</li>
            <li>Perbualan murid dan guru tentang disiplin: dialog.</li>
          </ol>
        }
      >
        <p>
          Tentukan format bagi empat situasi: aduan rasmi, catatan aktiviti sekolah, penyampaian
          kepada khalayak dan perbualan dua watak.
        </p>
      </ExerciseCard>
      <ExerciseCard
        title="Latihan 2 — Bina Rangka"
        answer={
          <ul className="space-y-1">
            <li>
              <strong className="text-white">Pendahuluan:</strong> Kesihatan mental penting untuk
              kesejahteraan remaja.
            </li>
            <li>
              <strong className="text-white">Isi:</strong> rehat mencukupi; aktiviti riadah;
              berkongsi masalah dengan orang dipercayai.
            </li>
            <li>
              <strong className="text-white">Penutup:</strong> kerjasama keluarga dan sekolah serta
              harapan remaja lebih sejahtera.
            </li>
          </ul>
        }
      >
        <p>
          <strong className="text-white">Tema:</strong> Kesihatan Mental Remaja. Bina pendahuluan,
          tiga isi dan penutup.
        </p>
      </ExerciseCard>
      <ExerciseCard
        title="Latihan 3 — Pilih Penanda Wacana"
        answer={
          <ul className="space-y-1">
            <li>Menambah isi: Selain itu</li>
            <li>Menunjukkan pertentangan: Namun begitu</li>
            <li>Memberikan contoh: Sebagai contoh</li>
            <li>Membuat kesimpulan: Kesimpulannya</li>
          </ul>
        }
      >
        <p>
          Pilih penanda wacana untuk menambah isi, menunjukkan pertentangan, memberikan contoh dan
          membuat kesimpulan.
        </p>
      </ExerciseCard>
      <ExerciseCard
        title="Latihan 4 — Bina Penutup R-C-H"
        answer="Kesimpulannya, aktiviti kokurikulum memberikan pelbagai manfaat kepada murid. Pihak sekolah dan ibu bapa hendaklah menggalakkan penyertaan yang aktif dan seimbang. Diharapkan aktiviti ini dapat melahirkan murid yang berdisiplin, yakin dan mampu bekerjasama."
      >
        <p>
          <strong className="text-white">Tema:</strong> Kepentingan Aktiviti Kokurikulum. Bina
          penutup yang mempunyai rumusan, cadangan dan harapan.
        </p>
      </ExerciseCard>
      <ExerciseCard title="Latihan 5 — Menulis Karangan Lengkap">
        <p>
          <strong className="text-white">Soalan:</strong> Penggunaan teknologi secara
          bertanggungjawab amat penting dalam kehidupan remaja. Huraikan cara-cara remaja dapat
          menggunakan teknologi secara bijak.
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Analisis TFT.</li>
          <li>Bina rangka.</li>
          <li>Tulis sekurang-kurangnya tiga perenggan I-H-C-P.</li>
          <li>Akhiri dengan penutup R-C-H.</li>
          <li>Semak bahasa, ejaan dan tanda baca.</li>
        </ol>
      </ExerciseCard>
    </section>
  );
}

function ContohContent({
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
          Folder ini menyediakan model karangan, analisis TFT dan latihan untuk membantu murid
          menguasai jenis penulisan Tingkatan 3.
        </p>
      </section>
      <MissionSection title="Objektif Pembelajaran" color="#34D399">
        <ObjectiveGrid
          items={[
            "Menganalisis soalan",
            "Membina rangka",
            "Mengembangkan isi",
            "Mengenal pasti format",
            "Membaiki ayat lemah",
            "Menulis karangan lengkap",
          ]}
        />
      </MissionSection>
      <MissionSection title="Pelajaran 1 — Model Karangan Fakta" color="#60A5FA">
        <ExampleBlock label="Tema">Keselamatan Siber</ExampleBlock>
        <div className="mt-3">
          <ExampleBlock label="Soalan" color="#60A5FA">
            Keselamatan siber merupakan isu yang semakin membimbangkan dalam kalangan remaja.
            Huraikan langkah-langkah yang perlu diambil untuk mengelakkan diri daripada menjadi
            mangsa penipuan dalam talian.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Analisis TFT" color="#22D3EE">
        <ResponsiveTable
          headers={["Elemen", "Jawapan"]}
          rows={[
            ["Tema", "Keselamatan siber"],
            ["Format", "Karangan fakta tanpa format khusus"],
            ["Tugasan", "Langkah-langkah mengelakkan penipuan dalam talian"],
          ]}
        />
      </MissionSection>
      <MissionSection title="Kata Kunci dan Cadangan Rangka" color="#FBBF24">
        <ChipList
          items={[
            "maklumat peribadi",
            "kata laluan",
            "pautan mencurigakan",
            "bantuan orang dewasa",
            "laporan kepada pihak berkuasa",
          ]}
          color="#FBBF24"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ExampleBlock label="Pendahuluan">
            Penggunaan Internet semakin meluas; penipuan menjadi ancaman; remaja perlu berjaga-jaga.
          </ExampleBlock>
          <ExampleBlock label="Isi 1" color="#60A5FA">
            Merahsiakan maklumat peribadi.
          </ExampleBlock>
          <ExampleBlock label="Isi 2" color="#60A5FA">
            Menggunakan kata laluan kukuh.
          </ExampleBlock>
          <ExampleBlock label="Isi 3" color="#60A5FA">
            Tidak menekan pautan mencurigakan.
          </ExampleBlock>
          <ExampleBlock label="Isi 4" color="#60A5FA">
            Mendapatkan bantuan dan membuat laporan.
          </ExampleBlock>
          <ExampleBlock label="Penutup" color="#C084FC">
            Rumusan, cadangan kepada ibu bapa dan sekolah serta harapan ruang siber lebih selamat.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Rangka I-H-C-P — Isi 1" color="#34D399">
        <div className="grid gap-3 sm:grid-cols-2">
          <ExampleBlock label="Isi">Remaja perlu merahsiakan maklumat peribadi.</ExampleBlock>
          <ExampleBlock label="Huraian" color="#60A5FA">
            Maklumat tersebut boleh disalahgunakan untuk menceroboh akaun atau melakukan penipuan.
          </ExampleBlock>
          <ExampleBlock label="Contoh" color="#FBBF24">
            Pengguna tidak seharusnya berkongsi kata laluan, nombor telefon atau lokasi semasa
            dengan orang asing.
          </ExampleBlock>
          <ExampleBlock label="Penegasan" color="#C084FC">
            Jelaslah bahawa kerahsiaan data merupakan benteng pertama keselamatan digital.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Contoh Penutup R-C-H" color="#A78BFA">
        <div className="grid gap-3 sm:grid-cols-3">
          <ExampleBlock label="Rumusan">
            Kesimpulannya, setiap pengguna Internet perlu sentiasa berwaspada.
          </ExampleBlock>
          <ExampleBlock label="Cadangan" color="#60A5FA">
            Ibu bapa dan pihak sekolah hendaklah meningkatkan pendidikan keselamatan digital dalam
            kalangan remaja.
          </ExampleBlock>
          <ExampleBlock label="Harapan" color="#C084FC">
            Diharapkan ruang siber dapat menjadi persekitaran yang lebih selamat untuk semua.
          </ExampleBlock>
        </div>
      </MissionSection>
      <MissionSection title="Karangan Lengkap" color="#34D399">
        <article className="space-y-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-5 sm:p-6">
          {MODEL_ESSAY_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-7 text-white/75">
              {paragraph}
            </p>
          ))}
          <p className="border-t border-white/[0.08] pt-3 text-xs font-bold text-emerald-300">
            {MODEL_ESSAY_WORD_COUNT} patah perkataan · dikira daripada teks model yang dipaparkan
          </p>
        </article>
      </MissionSection>
      <ExerciseCard
        title="Pelajaran 2 — Latihan Analisis TFT"
        answer={
          <ul className="space-y-1">
            <li>Tema: Disiplin murid.</li>
            <li>Format: Syarahan.</li>
            <li>Tugasan: Kepentingan disiplin terhadap masa depan pelajar.</li>
          </ul>
        }
      >
        <p>
          Anda sebagai Ketua Murid diminta menyampaikan syarahan bertajuk “Kepentingan Disiplin
          dalam Menentukan Masa Depan Pelajar”. Kenal pasti Tema, Format dan Tugasan.
        </p>
      </ExerciseCard>
      <ExerciseCard
        title="Pelajaran 3 — Latihan Mengembangkan Isi"
        answer="Salah satu cara mengeratkan semangat kejiranan ialah dengan mengadakan aktiviti gotong-royong. Aktiviti ini membolehkan penduduk bekerjasama membersihkan kawasan perumahan tanpa mengira kaum dan usia. Contohnya, penduduk boleh membersihkan longkang, mengutip sampah dan menceriakan kawasan taman. Jelaslah bahawa gotong-royong dapat mewujudkan persekitaran yang bersih serta mengukuhkan hubungan antara jiran."
      >
        <p>
          <strong className="text-white">Tema:</strong> Semangat Kejiranan
        </p>
        <p>
          <strong className="text-white">Isi:</strong> Mengadakan aktiviti gotong-royong.
        </p>
        <p>Bina satu perenggan lengkap menggunakan I-H-C-P.</p>
      </ExerciseCard>
      <MissionSection title="Pelajaran 4 — Membaiki Jawapan Lemah" color="#F472B6">
        <div className="space-y-3">
          {WEAK_ANSWER_ROWS.map(([wrong, right]) => (
            <CorrectWrongExample key={wrong} wrong={wrong} right={right} />
          ))}
        </div>
      </MissionSection>
      <MissionSection title="Kosa Kata Matang" color="#FBBF24">
        <ResponsiveTable headers={["Perkataan", "Maksud Mudah"]} rows={VOCABULARY_ROWS} />
        <p className="mt-3 text-sm leading-7 text-white/60">
          Gunakan perkataan ini hanya apabila maksudnya difahami. Jangan ganti setiap perkataan
          mudah; kejelasan lebih penting daripada kesukaran.
        </p>
      </MissionSection>
      <ExerciseList />
      <MissionSection title="Tips Guru" color="#FBBF24">
        <TeacherTips
          items={[
            "Gunakan kosa kata matang secara sederhana.",
            "Pastikan format betul sebelum menulis isi.",
            "Gunakan contoh yang dekat dengan kehidupan remaja.",
            "Semak ejaan dan tanda baca selepas selesai menulis.",
            "Gunakan rujukan KOMSAS hanya jika benar-benar relevan dan tepat.",
          ]}
        />
      </MissionSection>
      <WarningCard items={MODEL_LATIHAN_MISTAKES} />
      <MissionSection title="Checklist" color="#34D399">
        <FinalChecklist items={MODEL_LATIHAN_CHECKLIST} checked={checked} onToggle={onToggle} />
      </MissionSection>
      <SummaryCard>
        Penulisan yang cemerlang bergantung pada{" "}
        <strong className="text-white">idea yang relevan</strong>,{" "}
        <strong className="text-white">format yang tepat</strong>,{" "}
        <strong className="text-white">huraian yang matang</strong> dan{" "}
        <strong className="text-white">bahasa yang jelas</strong>. Kosa kata menarik perlu menyokong
        maksud, bukan mengaburkannya.
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
  onNavigate: (id: BMForm3ModelKaranganSectionId) => void;
}) {
  const previous = BM_FORM3_MODEL_KARANGAN_SECTIONS[index - 1];
  const next = BM_FORM3_MODEL_KARANGAN_SECTIONS[index + 1];
  return (
    <nav
      aria-label="Navigasi pelajaran Model Karangan Bank"
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

export function BMForm3ModelKaranganBankContent({
  initialSectionId,
  onBack,
  onNavigate,
}: {
  initialSectionId?: string;
  onBack: () => void;
  onNavigate: (id: BMForm3ModelKaranganSectionId) => void;
}) {
  const initialIndex = BM_FORM3_MODEL_KARANGAN_SECTIONS.findIndex(
    (section) => section.id === initialSectionId,
  );
  const [activeModule, setActiveModule] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [checks, setChecks] = useState(() =>
    [MODEL_ASAS_CHECKLIST, MODEL_TEKNIK_CHECKLIST, MODEL_LATIHAN_CHECKLIST].map((list) =>
      list.map(() => false),
    ),
  );

  if (activeModule === null)
    return (
      <ExamSkillLanding
        title="Model Karangan Bank"
        subtitle="Tingkatan 3 · Format, model lengkap dan latihan"
        missions={missions}
        onSelect={setActiveModule}
      />
    );

  const mission = missions[activeModule];
  const section = BM_FORM3_MODEL_KARANGAN_SECTIONS[activeModule];
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
        <span className="mx-1 text-white/20">/</span> Model Karangan Bank{" "}
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
