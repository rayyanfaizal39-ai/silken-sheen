import { ArrowRight, CheckCircle2, ChevronLeft, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Colours (reused from the Form 1 Kertas 1 palette) ───────────────────────
const KERTAS_COLOR = "#818CF8"; // indigo — overall Kertas 1 accent
const SISTEM_BAHASA_COLOR = "#60A5FA"; // blue
const PEMAHAMAN_COLOR = "#34D399"; // green
const NOVEL_KOMSAS_COLOR = "#C084FC"; // purple
const BAHAGIAN_B_COLOR = "#C084FC"; // purple
const BAHAGIAN_C_COLOR = "#FBBF24"; // yellow

// ─── Shared chip + badge components (mirrors BMWorldPage.tsx) ───────────────

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-[9px] font-black tracking-wide"
      style={{ background: `${color}25`, color }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-black tracking-wide text-[#818CF8]">
      {children}
    </p>
  );
}

function PageHeader({
  breadcrumb,
  onBack,
  accent,
}: {
  breadcrumb: string[];
  onBack: () => void;
  accent: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <button
        onClick={onBack}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10"
        aria-label="Kembali"
      >
        <ChevronLeft className="h-4 w-4 text-white/60" />
      </button>
      <div className="flex min-w-0 flex-wrap items-center gap-1 text-[11px] text-white/40">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-white/20">/</span>}
            <span
              className={i === breadcrumb.length - 1 ? "font-bold text-white/70" : ""}
              style={i === breadcrumb.length - 1 ? { color: accent } : {}}
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Content data ─────────────────────────────────────────────────────────────

const BAHAGIAN_FLOW = [
  { id: "a", label: "Bahagian A", sub: "Objektif Aneka Pilihan", marks: 15, color: KERTAS_COLOR },
  { id: "b", label: "Bahagian B", sub: "Pelbagai Bentuk & Respons Terhad", marks: 30, color: BAHAGIAN_B_COLOR },
  { id: "c", label: "Bahagian C", sub: "Pemindahan Maklumat", marks: 15, color: BAHAGIAN_C_COLOR },
];

const BAHAGIAN_A_TIPS = [
  "Baca soalan dua kali sebelum memilih jawapan.",
  "Kenal pasti kata kunci dalam soalan sebelum merujuk pilihan jawapan.",
  "Untuk soalan peribahasa, fahami maksud secara literal dan kiasan.",
  "Elakkan meneka secara rawak — gunakan kaedah eliminasi untuk menolak pilihan yang jelas salah.",
];

const BAHAGIAN_A_MISTAKES = [
  "Tidak membaca petikan dengan teliti sebelum menjawab soalan pemahaman.",
  "Keliru antara golongan kata (contohnya kata adjektif dengan kata kerja).",
  "Memilih jawapan berdasarkan struktur ayat tanpa memahami maksud sebenar peribahasa.",
];

const BAHAGIAN_B_TIPS = [
  "Jawab mengikut kehendak soalan — jangan menulis lebih daripada yang diperlukan.",
  "Gunakan ayat sendiri dan elakkan menyalin terus daripada petikan.",
  "Untuk soalan novel, sertakan bukti daripada teks (contoh peristiwa atau dialog).",
  "Tulis jawapan dalam ayat yang gramatis dan lengkap (subjek + predikat).",
];

const BAHAGIAN_B_MISTAKES = [
  "Menyalin ayat terus daripada petikan tanpa mengubah struktur ayat.",
  "Jawapan novel tidak disokong dengan bukti atau contoh daripada teks.",
  "Tidak menjawab mengikut format yang dikehendaki soalan (contoh: melengkapkan ayat, mencari kesalahan).",
];

const BAHAGIAN_C_STEPS = [
  {
    title: "Cara mengenal pasti isi",
    detail:
      "Baca petikan keseluruhannya dahulu untuk faham gambaran umum. Tandakan isi penting pada setiap perenggan — biasanya terletak pada ayat topik (ayat pertama atau terakhir perenggan).",
  },
  {
    title: "Cara menulis jawapan",
    detail:
      "Susun isi yang dikenal pasti mengikut turutan logik. Gunakan ayat sendiri dan penanda wacana yang sesuai untuk menghubungkan isi. Tulis dalam satu perenggan tanpa pendahuluan atau penutup.",
  },
  {
    title: "Bilangan isi yang diperlukan",
    detail:
      "Tulis sekurang-kurangnya 5–6 isi penting bergantung kepada panjang petikan, dengan jumlah perkataan tidak melebihi had yang ditetapkan (biasanya 80–100 patah perkataan mengikut format dan sukatan Tingkatan 2).",
  },
  {
    title: "Cara menulis kesimpulan",
    detail:
      "Ringkasan/rumusan Bahagian C tidak memerlukan kesimpulan berasingan — isi terakhir yang ditulis hendaklah melengkapkan keseluruhan idea petikan secara semula jadi.",
  },
];

const BAHAGIAN_C_MISTAKES = [
  "Menulis pendahuluan atau penutup walaupun tidak diperlukan.",
  "Menyalin ayat terus daripada petikan tanpa mengubah struktur ayat.",
  "Melebihi atau tidak mencukupi bilangan patah perkataan yang ditetapkan.",
  "Menulis isi berulang atau isi yang tidak relevan kepada petikan.",
];

const KONSTRUK_DIUJI = [
  "Kemahiran aplikasi maklumat",
  "Pengetahuan sistem bahasa",
  "Kemahiran aplikasi bahasa",
  "Kemahiran kreatif dan apresiasi bahasa",
];

const ARAS_KESUKARAN = [
  { label: "Rendah", nisbah: "5" },
  { label: "Sederhana", nisbah: "3" },
  { label: "Tinggi", nisbah: "2" },
];

const KAEDAH_PENSKORAN = ["Dikotomus", "Analitikal", "Holistik"];

const REVISION_CHECKLIST = [
  { label: "Fahami kehendak soalan", color: SISTEM_BAHASA_COLOR },
  { label: "Baca petikan dengan teliti", color: PEMAHAMAN_COLOR },
  { label: "Teliti kata kunci", color: NOVEL_KOMSAS_COLOR },
  { label: "Semak jawapan sebelum menghantar", color: BAHAGIAN_C_COLOR },
  { label: "Urus masa dengan baik", color: KERTAS_COLOR },
];

// ─── Sub-section card used inside Bahagian A / B ─────────────────────────────

function SoalanSubcard({
  label,
  count,
  color,
  description,
  chips,
}: {
  label: string;
  count: string;
  color: string;
  description: string;
  chips?: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-white">{label}</p>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ background: `${color}18`, color }}
        >
          {count}
        </span>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-white/45">{description}</p>
      {chips && chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/60"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function TipsBox({ tips }: { tips: string[] }) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
      <p className="mb-3 text-[9px] font-black tracking-wide text-yellow-400">★ Tips Peperiksaan</p>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/65">
            <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MistakesBox({ mistakes }: { mistakes: string[] }) {
  return (
    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
      <p className="mb-3 text-[9px] font-black tracking-wide text-rose-400">⚠ Kesalahan Lazim</p>
      <ul className="space-y-2">
        {mistakes.map((m, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/65">
            <span className="mt-0.5 shrink-0 text-rose-400">×</span>
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NumberedStep({ index, title, detail, color }: { index: number; title: string; detail: string; color: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
        style={{ background: `${color}25`, color }}
      >
        {index}
      </span>
      <div>
        <p className="text-sm font-bold text-white/85">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-white/60">{detail}</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function BMForm2Kertas1Page({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="min-h-screen px-4 py-6 pb-[calc(var(--mobile-content-bottom,90px)+2rem)] sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #050816 0%, #080c1a 100%)" }}
    >
      <div className="mx-auto max-w-4xl">
        <PageHeader breadcrumb={["Bahasa Melayu", "Tingkatan 2", "Kertas 1"]} onBack={onBack} accent={KERTAS_COLOR} />

        {/* Title block */}
        <div className="mb-6">
          <div
            className="mb-2 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-black"
            style={{ background: `${KERTAS_COLOR}20`, color: KERTAS_COLOR }}
          >
            📝 Kertas 1 (02/1)
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Bahasa Melayu Tingkatan 2</h1>
          <p className="mt-1 text-sm text-white/40">Kertas 1 (02/1)</p>
        </div>

        {/* Tempoh + Jumlah Markah stats */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
            <p className="text-xl font-black text-white">1 Jam 30 Minit</p>
            <p className="mt-0.5 text-[9px] font-bold tracking-wide text-white/30">TEMPOH</p>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center">
            <p className="text-xl font-black text-white">60 Markah</p>
            <p className="mt-0.5 text-[9px] font-bold tracking-wide text-white/30">JUMLAH MARKAH</p>
          </div>
        </div>

        {/* Introduction card with Bahagian flow */}
        <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <SectionLabel>Struktur Kertas 1</SectionLabel>
          <p className="mb-4 text-sm leading-relaxed text-white/70">
            Kertas 1 (02/1) terdiri daripada tiga bahagian yang menguji penguasaan sistem
            bahasa, kemahiran pemahaman serta kemahiran memindah maklumat secara berturutan.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {BAHAGIAN_FLOW.map((b, i) => (
              <div key={b.id} className="flex flex-1 items-center gap-2">
                <div
                  className="flex-1 rounded-xl border p-3"
                  style={{ borderColor: `${b.color}30`, background: `${b.color}0a` }}
                >
                  <p className="text-sm font-bold" style={{ color: b.color }}>
                    {b.label}
                  </p>
                  <p className="text-xs text-white/40">{b.sub}</p>
                  <p className="mt-1 text-[10px] font-black tracking-wide text-white/30">{b.marks} MARKAH</p>
                </div>
                {i < BAHAGIAN_FLOW.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-white/20 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bahagian A / B / C — collapsible sections */}
        <Accordion type="single" collapsible defaultValue="bahagian-a" className="mb-6 space-y-3">
          <AccordionItem
            value="bahagian-a"
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
          >
            <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
              <span className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black"
                  style={{ background: `${KERTAS_COLOR}20`, color: KERTAS_COLOR }}
                >
                  A
                </span>
                <span>
                  <span className="block font-bold text-white/85">
                    Bahagian A — Objektif Aneka Pilihan
                  </span>
                  <span className="block text-xs text-white/40">15 Markah</span>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-5 px-4 pb-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <SoalanSubcard
                  label="Sistem Bahasa"
                  count="10 Soalan"
                  color={SISTEM_BAHASA_COLOR}
                  description="Menguji pengetahuan dan kefahaman murid tentang morfologi, frasa, sintaksis serta peribahasa melalui soalan aneka pilihan."
                  chips={["Morfologi", "Frasa", "Sintaksis", "Peribahasa"]}
                />
                <SoalanSubcard
                  label="Pemahaman Petikan"
                  count="5 Soalan"
                  color={PEMAHAMAN_COLOR}
                  description="Menguji kemahiran murid memahami dan mentafsir maklumat daripada petikan yang diberikan, termasuk makna perkataan mengikut konteks."
                  chips={["Berdasarkan petikan yang diberikan"]}
                />
              </div>
              <TipsBox tips={BAHAGIAN_A_TIPS} />
              <MistakesBox mistakes={BAHAGIAN_A_MISTAKES} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="bahagian-b"
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
          >
            <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
              <span className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black"
                  style={{ background: `${BAHAGIAN_B_COLOR}20`, color: BAHAGIAN_B_COLOR }}
                >
                  B
                </span>
                <span>
                  <span className="block font-bold text-white/85">
                    Bahagian B — Objektif Pelbagai Bentuk &amp; Subjektif Respons Terhad
                  </span>
                  <span className="block text-xs text-white/40">30 Markah</span>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-5 px-4 pb-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <SoalanSubcard
                  label="Sistem Bahasa"
                  count="4 Soalan"
                  color={SISTEM_BAHASA_COLOR}
                  description="Menguji penggunaan unsur tatabahasa dalam konteks ayat sebenar melalui soalan objektif pelbagai bentuk."
                  chips={["Morfologi", "Frasa", "Sintaksis"]}
                />
                <SoalanSubcard
                  label="Pemahaman Petikan"
                  count="3 Soalan"
                  color={PEMAHAMAN_COLOR}
                  description="Soalan subjektif respons terhad yang memerlukan murid menjawab dalam ayat sendiri berdasarkan petikan."
                  chips={["Berdasarkan petikan"]}
                />
                <SoalanSubcard
                  label="Novel KOMSAS"
                  count="1 Soalan"
                  color={NOVEL_KOMSAS_COLOR}
                  description="Menguji kefahaman murid terhadap novel KOMSAS Tingkatan 2 — watak, tema, persoalan, nilai dan pengajaran."
                  chips={["Subjektif Respons Terhad"]}
                />
              </div>
              <TipsBox tips={BAHAGIAN_B_TIPS} />
              <MistakesBox mistakes={BAHAGIAN_B_MISTAKES} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="bahagian-c"
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
          >
            <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
              <span className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black"
                  style={{ background: `${BAHAGIAN_C_COLOR}20`, color: BAHAGIAN_C_COLOR }}
                >
                  C
                </span>
                <span>
                  <span className="block font-bold text-white/85">
                    Bahagian C — Pemindahan Maklumat
                  </span>
                  <span className="block text-xs text-white/40">15 Markah</span>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-5 px-4 pb-5">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                <p className="text-sm leading-relaxed text-white/75">
                  Bahagian C ialah{" "}
                  <span className="font-bold text-white">tugasan ringkasan atau rumusan</span>{" "}
                  mengikut format dan sukatan Tingkatan 2 yang digunakan. Murid perlu mengenal
                  pasti isi penting daripada petikan dan menulis semula dalam bentuk ringkas
                  menggunakan ayat gramatis.
                </p>
              </div>
              <div>
                <SectionLabel>Langkah-langkah</SectionLabel>
                <div className="space-y-2">
                  {BAHAGIAN_C_STEPS.map((step, i) => (
                    <NumberedStep
                      key={step.title}
                      index={i + 1}
                      title={step.title}
                      detail={step.detail}
                      color={BAHAGIAN_C_COLOR}
                    />
                  ))}
                </div>
              </div>
              <MistakesBox mistakes={BAHAGIAN_C_MISTAKES} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Kriteria Pentaksiran */}
        <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
          <SectionLabel>Kriteria Pentaksiran</SectionLabel>

          <div className="mb-5">
            <p className="mb-2 text-xs font-bold text-white/50">Konstruk Yang Diuji</p>
            <div className="space-y-2">
              {KONSTRUK_DIUJI.map((k) => (
                <div key={k} className="flex items-start gap-2 text-sm text-white/65">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: KERTAS_COLOR }} />
                  {k}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-xs font-bold text-white/50">
              Aras Kesukaran <span className="text-white/30">(Nisbah 5 : 3 : 2)</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {ARAS_KESUKARAN.map((a) => (
                <div key={a.label} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 text-center">
                  <p className="text-lg font-black text-white">{a.nisbah}</p>
                  <p className="text-[10px] font-bold text-white/40">{a.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-white/50">Kaedah Penskoran</p>
            <div className="flex flex-wrap gap-1.5">
              {KAEDAH_PENSKORAN.map((m) => (
                <Badge key={m} label={m} color={KERTAS_COLOR} />
              ))}
            </div>
          </div>
        </div>

        {/* Tips Menghadapi Kertas 1 */}
        <div>
          <SectionLabel>Tips Menghadapi Kertas 1</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {REVISION_CHECKLIST.map((tip) => (
              <div
                key={tip.label}
                className="flex items-start gap-3 rounded-2xl border p-4"
                style={{ borderColor: `${tip.color}30`, background: `${tip.color}0a` }}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: tip.color }} />
                <p className="text-sm font-semibold text-white/80">{tip.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
