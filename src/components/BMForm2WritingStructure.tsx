import { ArrowRight, Construction, FolderOpen } from "lucide-react";

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
  "karangan-panjang": [
    { id: "asas", title: "Asas Karangan Panjang" },
    { id: "langkah-menulis", title: "Langkah Menulis Karangan" },
    { id: "contoh-latihan", title: "Contoh & Latihan" },
  ],
  "bengkel-karangan": [
    { id: "bank-idea", title: "Bank Idea" },
    { id: "pendahuluan-bank", title: "Pendahuluan Bank" },
    { id: "penutup-bank", title: "Penutup Bank" },
    { id: "ayat-menarik", title: "Ayat Menarik" },
    { id: "kosa-kata", title: "Kosa Kata" },
    { id: "formula-imbak", title: "Formula IMBAK" },
    { id: "huraian-isi", title: "Huraian Isi" },
    { id: "contoh-ayat", title: "Contoh Ayat" },
  ],
  "model-karangan-bank": [
    { id: "fakta", title: "Fakta" }, { id: "pendapat", title: "Pendapat" },
    { id: "perbincangan", title: "Perbincangan" }, { id: "pengalaman", title: "Pengalaman" },
    { id: "surat-rasmi", title: "Surat Rasmi" }, { id: "surat-tidak-rasmi", title: "Surat Tidak Rasmi" },
    { id: "laporan", title: "Laporan" }, { id: "ucapan", title: "Ucapan" },
    { id: "syarahan", title: "Syarahan" }, { id: "dialog", title: "Dialog" },
  ],
  "peribahasa-bank": [
    { id: "pendidikan", title: "Pendidikan" }, { id: "kesihatan", title: "Kesihatan" },
    { id: "keluarga", title: "Keluarga" }, { id: "alam-sekitar", title: "Alam Sekitar" },
    { id: "patriotisme", title: "Patriotisme" }, { id: "teknologi", title: "Teknologi" },
    { id: "masyarakat", title: "Masyarakat" }, { id: "sukan", title: "Sukan" },
    { id: "nilai-murni", title: "Nilai Murni" },
  ],
  "penanda-wacana": [
    { id: "memulakan", title: "Memulakan Karangan" }, { id: "menambah", title: "Menambah Isi" },
    { id: "contoh", title: "Memberi Contoh" }, { id: "menghuraikan", title: "Menghuraikan Isi" },
    { id: "membandingkan", title: "Membandingkan" }, { id: "menyimpulkan", title: "Menyimpulkan" },
    { id: "penutup", title: "Penutup Karangan" },
  ],
  "tingkatkan-karangan": [
    { id: "kesalahan-lazim", title: "Kesalahan Lazim" },
    { id: "mengembangkan-isi", title: "Cara Mengembangkan Isi" },
    { id: "teknik-huraian", title: "Teknik Huraian" },
    { id: "pendahuluan-menarik", title: "Pendahuluan Menarik" },
    { id: "penutup-mantap", title: "Penutup Mantap" },
    { id: "penggunaan-peribahasa", title: "Penggunaan Peribahasa" },
    { id: "tips-pemeriksa", title: "Tips Pemeriksa" },
  ],
  "latihan-uasa": [
    { id: "mudah", title: "Mudah" }, { id: "sederhana", title: "Sederhana" }, { id: "sukar", title: "Sukar" },
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
