import { useEffect, useState } from "react";
import { Check, CheckCircle2, ChevronLeft, Copy, Star } from "lucide-react";
import type { BMTopic } from "@/data/bm-structure";
import { type WorkshopTopicContent, countWords } from "@/data/bm-workshop-hub";
import { PENANDA_WACANA_PANJANG_GROUPS, IMBAK_STEPS, IMBAK_WORKED_EXAMPLE, KESALAHAN_LAZIM_PANJANG } from "@/data/bm-karangan-panjang-hub";

const STORAGE_KEY = "bm-workshop-hub-v2";
const SECTION_IDS = [
  "penerangan",
  "objektif",
  "cara-guna",
  "langkah",
  "formula",
  "kematangan",
  "contoh",
  "tips",
  "kesalahan",
  "latihan",
  "checklist",
  "ringkasan",
] as const;

function loadOpenedSections(topicId: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed[topicId]) ? parsed[topicId] : [];
  } catch {
    return [];
  }
}

function saveOpenedSections(topicId: string, opened: string[]) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[topicId] = opened;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore
  }
}

function SectionShell({
  title,
  icon,
  defaultOpen = false,
  onOpen,
  children,
}: {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  onOpen?: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) onOpen?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) onOpen?.();
        }}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.05]"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-white">
          <span className="text-base">{icon}</span>
          {title}
        </span>
        <ChevronLeft className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 ${open ? "rotate-90" : "-rotate-90"}`} />
      </button>
      {open && <div className="border-t border-white/5 px-4 pb-4 pt-3.5">{children}</div>}
    </section>
  );
}

function Pill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "success" | "warn" | "info" }) {
  const styles =
    tone === "success"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : tone === "warn"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-200"
        : tone === "info"
          ? "border-sky-400/20 bg-sky-400/10 text-sky-200"
          : "border-white/10 bg-white/5 text-white/70";
  return <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${styles}`}>{children}</span>;
}

function TitleNote({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-white/40">{title}</p>
      <p className="text-sm leading-relaxed text-white/75">{text}</p>
    </div>
  );
}

function NumberBadge({ n, color }: { n: number; color: string }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black" style={{ background: `${color}25`, color }}>
      {n}
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-black text-white/60">{i + 1}</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function StepGrid({ steps, color }: { steps: { title: string; text: string }[]; color: string }) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {steps.map((step, i) => (
        <div key={step.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="mb-2 flex items-center gap-2">
            <NumberBadge n={i + 1} color={color} />
            <p className="text-sm font-bold text-white">{step.title}</p>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

function TwoColumnPairs({ pairs, color }: { pairs: { left: string; right: string }[]; color: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {pairs.map((pair, i) => (
        <div key={`${pair.left}-${i}`} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-white/40 line-through">{pair.left}</span>
            <span className="text-sm font-black" style={{ color }}>
              →
            </span>
            <span className="text-sm font-semibold" style={{ color }}>
              {pair.right}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CopyGroupCard({
  group,
  idx,
  color,
  copiedIdx,
  onCopy,
}: {
  group: { kategori: string; items: string[] };
  idx: number;
  color: string;
  copiedIdx: number | null;
  onCopy: (idx: number, items: string[]) => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[10px] font-black uppercase tracking-wide" style={{ color }}>
          {group.kategori}
        </span>
        <button
          onClick={() => onCopy(idx, group.items)}
          className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-white/60 transition-colors hover:bg-white/10"
        >
          {copiedIdx === idx ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" /> Disalin
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Salin
            </>
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <Pill key={item}>{item}</Pill>
        ))}
      </div>
    </div>
  );
}

export function BengkelKaranganHub({
  topic,
  content,
  color,
  onBack,
}: {
  topic: BMTopic;
  content: WorkshopTopicContent;
  color: string;
  onBack: () => void;
}) {
  const [opened, setOpened] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOpened(loadOpenedSections(content.id));
    setHydrated(true);
  }, [content.id]);

  useEffect(() => {
    if (!hydrated) return;
    saveOpenedSections(content.id, opened);
  }, [opened, hydrated, content.id]);

  const markOpened = (id: string) => {
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const progressPct = Math.round((opened.length / SECTION_IDS.length) * 100);
  const objectiveItems = [
    "memahami struktur bengkel karangan yang lengkap",
    "menggunakan formula I-H-C-P dengan betul",
    "menambah kematangan ayat melalui penanda wacana dan ungkapan menarik",
    "mengelakkan kesalahan lazim dalam karangan",
    "menghasilkan karangan KSSM Tingkatan 2 yang lebih matang daripada Form 1",
  ];

  const stepItems = [
    { title: "Baca soalan dan bahan", text: "Tentukan tema, kata kunci dan kehendak tugasan sebelum menulis." },
    { title: "Pilih isi yang paling relevan", text: "Gunakan idea bank untuk memilih isi yang tepat dan sesuai dengan soalan." },
    { title: "Susun rangka", text: "Bina pendahuluan, isi dan penutup agar karangan lebih tersusun." },
    { title: "Kembangkan isi", text: "Gunakan formula I-H-C-P untuk setiap perenggan isi." },
    { title: "Semak dan kemaskan", text: "Baiki tatabahasa, ejaan, tanda baca dan pemilihan perkataan." },
  ];

  const checklistItems = [
    "Tajuk dan tema telah dikenal pasti dengan betul",
    "Sekurang-kurangnya 5 isi telah disediakan",
    "Setiap isi mempunyai huraian, contoh dan penegasan",
    "Penanda wacana digunakan dengan sesuai",
    "Ayat gramatis dan perkataan menarik digunakan",
    "Karangan mempunyai pendahuluan dan penutup yang jelas",
  ];

  const sampleParagraph = `Dalam isu ${content.tema.toLowerCase()}, semua pihak perlu memainkan peranan masing-masing secara konsisten. ${content.ideaBank[0]} amat penting kerana ia memberi kesan langsung kepada kesejahteraan masyarakat. Sebagai contoh, kita boleh mengamalkan ${content.ideaBank[1].toLowerCase()} dalam kehidupan seharian. Dengan itu, ${content.ideaBank[2].toLowerCase()} dapat dicapai dengan lebih berkesan. Tegasnya, ${content.tema.toLowerCase()} perlu dipelihara demi masa depan yang lebih baik.`;
  const sampleWordCount = countWords(sampleParagraph);

  const formulaRows = IMBAK_STEPS.map((step) => {
    const example = IMBAK_WORKED_EXAMPLE[step.code.toLowerCase() as keyof typeof IMBAK_WORKED_EXAMPLE];
    return { code: step.code, label: step.label, desc: step.desc, example };
  });

  const summaryBullets = [
    "mula dengan rangka yang jelas",
    "kembangkan setiap isi menggunakan formula I-H-C-P",
    "pilih kosa kata dan ungkapan yang lebih matang",
    "semak kembali kesalahan bahasa sebelum menghantar",
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10"
          aria-label="Kembali"
        >
          <ChevronLeft className="h-4 w-4 text-white/60" />
        </button>
        <div className="min-w-0">
          <p className="text-[11px] text-white/40">BM · Kertas 2 · Bengkel Karangan</p>
          <h2 className="truncate font-display text-lg font-bold text-white">
            {content.icon} {content.tema}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-white/60">Kemajuan Bengkel</span>
          <span className="text-[11px] font-black" style={{ color }}>
            {opened.length}/{SECTION_IDS.length} bahagian
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, background: color }} />
        </div>
        {progressPct === 100 && (
          <div className="mt-3 flex items-center gap-2 text-[11px] font-black" style={{ color: "#FBBF24" }}>
            <CheckCircle2 className="h-3.5 w-3.5" /> Semua bahagian telah dibuka. Anda sedia menulis dengan struktur lengkap.
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-4">
        <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
        <p className="text-sm leading-relaxed text-white/80">
          Bengkel ini mengikuti struktur Form 1 secara tepat, tetapi isi, contoh dan huraian dikembangkan pada tahap{" "}
          <strong className="text-white">Tingkatan 2</strong>.
        </p>
      </div>

      <SectionShell title="Penerangan Ringkas" icon="1" defaultOpen onOpen={() => markOpened("penerangan")}>
        <TitleNote
          title="Fungsi Bengkel"
          text={`Halaman ini membantu pelajar ${content.tema.toLowerCase()} membina karangan yang lebih matang dengan latihan berstruktur dan contoh ayat yang sesuai untuk KSSM Tingkatan 2.`}
        />
      </SectionShell>

      <SectionShell title="Objektif Pembelajaran" icon="2" onOpen={() => markOpened("objektif")}>
        <BulletList items={objectiveItems} />
      </SectionShell>

      <SectionShell title="Cara Guna" icon="3" onOpen={() => markOpened("cara-guna")}>
        <StepGrid steps={stepItems} color={color} />
      </SectionShell>

      <SectionShell title="Langkah Demi Langkah" icon="4" onOpen={() => markOpened("langkah")}>
        <div className="space-y-2.5">
          {stepItems.map((step, i) => (
            <div key={step.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="mb-1 flex items-center gap-2">
                <NumberBadge n={i + 1} color={color} />
                <p className="text-sm font-bold text-white">{step.title}</p>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{step.text}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Formula I-H-C-P" icon="5" onOpen={() => markOpened("formula")}>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="grid grid-cols-[72px_1fr] bg-white/[0.03] text-[10px] font-black uppercase tracking-wide text-white/40">
            <div className="px-3 py-2">Langkah</div>
            <div className="px-3 py-2">Panduan</div>
          </div>
          {formulaRows.map((row, idx) => (
            <div key={row.code} className={`grid grid-cols-[72px_1fr] ${idx !== formulaRows.length - 1 ? "border-t border-white/5" : ""}`}>
              <div className="px-3 py-3">
                <div className="inline-flex rounded-lg px-2 py-1 text-[10px] font-black" style={{ background: `${color}25`, color }}>
                  {row.code}
                </div>
                <p className="mt-2 text-[10px] font-bold text-white/55">{row.label}</p>
              </div>
              <div className="px-3 py-3 text-sm leading-relaxed text-white/75">
                <p>{row.desc}</p>
                <p className="mt-2 text-white/55">{row.example}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Teknik Meningkatkan Kematangan Ayat" icon="6" onOpen={() => markOpened("kematangan")}>
        <div className="grid gap-2 md:grid-cols-2">
          <TitleNote title="Penanda Wacana" text="Gunakan penanda wacana seperti 'Pertama', 'Selain itu', 'Di samping itu' dan 'Akhir sekali' untuk melicinkan aliran isi." />
          <TitleNote title="Kata Lebih Mantap" text="Tukar ayat biasa kepada ayat yang lebih tepat, misalnya 'penting' kepada 'signifikan' dan 'baik' kepada 'berkesan'."
          />
          <TitleNote title="Contoh Konkret" text="Sertakan contoh dekat dengan pengalaman murid atau sekolah supaya isi nampak lebih hidup dan meyakinkan." />
          <TitleNote title="Ayat Penegas" text="Tutup setiap isi dengan ayat rumusan kecil agar perenggan menjadi lebih matang dan fokus." />
        </div>
      </SectionShell>

      <SectionShell title="Contoh Lengkap Perenggan" icon="7" onOpen={() => markOpened("contoh")}>
        <div className="space-y-3">
          <TitleNote title="Contoh Perenggan Isi" text={sampleParagraph} />
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="info">{sampleWordCount} patah perkataan</Pill>
            <Pill tone="success">Sesuaikan dengan tema</Pill>
            <Pill tone="warn">Beri contoh yang relevan</Pill>
          </div>
        </div>
      </SectionShell>

      <SectionShell title="Tips Guru" icon="8" onOpen={() => markOpened("tips")}>
        <div className="grid gap-2 md:grid-cols-2">
          <TitleNote title="Tip 1" text="Minta murid membina satu perenggan isi penuh menggunakan formula I-H-C-P sebelum menulis karangan panjang." />
          <TitleNote title="Tip 2" text="Galakkan murid menukar sekurang-kurangnya tiga perkataan biasa kepada kata yang lebih menarik pada setiap latihan." />
          <TitleNote title="Tip 3" text="Semak sama ada murid menggunakan penegas dan contoh pada tempat yang sesuai." />
          <TitleNote title="Tip 4" text="Beri latihan berulang untuk karangan pendek dan panjang supaya struktur menjadi automatik." />
        </div>
      </SectionShell>

      <SectionShell title="Kesalahan Lazim" icon="9" onOpen={() => markOpened("kesalahan")}>
        <div className="space-y-2.5">
          {KESALAHAN_LAZIM_PANJANG.slice(0, 5).map((item) => (
            <div key={item.label} className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3">
              <p className="text-sm font-bold text-amber-100">{item.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{item.mengapa}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Aktiviti Latihan" icon="10" onOpen={() => markOpened("latihan")}>
        <div className="grid gap-2 md:grid-cols-2">
          <TitleNote title="Latihan 1" text={`Tulis satu perenggan isi tentang ${content.ideaBank[0].toLowerCase()} menggunakan formula I-H-C-P.`} />
          <TitleNote title="Latihan 2" text={`Tukar tiga ayat biasa kepada ayat yang lebih matang berdasarkan tema ${content.tema.toLowerCase()}.`} />
          <TitleNote title="Latihan 3" text="Susun semula penanda wacana mengikut turutan yang betul untuk sebuah karangan lengkap." />
          <TitleNote title="Latihan 4" text="Tulis satu penutup yang ringkas tetapi kuat dengan unsur harapan atau penegasan." />
        </div>
      </SectionShell>

      <SectionShell title="Checklist Penulisan" icon="11" onOpen={() => markOpened("checklist")}>
        <div className="space-y-2">
          {checklistItems.map((item, i) => (
            <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>
                {i + 1}. {item}
              </span>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell title="Ringkasan" icon="12" onOpen={() => markOpened("ringkasan")}>
        <div className="space-y-3">
          <TitleNote title="Inti Penting" text={`Fokus utama bengkel ${content.tema.toLowerCase()} ialah struktur, huraian, contoh, dan kematangan ayat yang konsisten.`} />
          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Apa perlu diingat</p>
              <div className="space-y-1.5">
                {summaryBullets.map((item) => (
                  <p key={item} className="text-sm text-white/75">
                    • {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="mb-2 text-[10px] font-black uppercase tracking-wide text-white/40">Penanda Wacana Cadangan</p>
              <div className="space-y-2">
                {PENANDA_WACANA_PANJANG_GROUPS.slice(0, 3).map((group) => (
                  <p key={group.kategori} className="text-sm text-white/70">
                    <span className="font-bold text-white">{group.kategori}:</span> {group.items.join(", ")}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-white">Peta penggunaan cepat</p>
          <Pill tone="info">
            {opened.length}/{SECTION_IDS.length} dibuka
          </Pill>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SECTION_IDS.map((id, i) => (
            <div key={id} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/60">
              {i + 1}. {id}
            </div>
          ))}
        </div>
      </div>

      {topic.peribahasa && topic.peribahasa.length > 0 && (
        <SectionShell title="Nota Asal (Peribahasa)" icon="📋">
          <div className="flex flex-wrap gap-1.5">
            {topic.peribahasa.map((p) => (
              <span key={p} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/65">
                {p}
              </span>
            ))}
          </div>
        </SectionShell>
      )}
    </div>
  );
}
