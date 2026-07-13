import { useState } from "react";
import { Brain, CheckCircle2, ChevronDown, Lightbulb, PenLine, Star } from "lucide-react";
import { CorrectWrongExample, ExamSkillLanding, FinalChecklist, MissionPageShell, MissionSection, QuickScoreCard, WarningCard, type MissionDefinition } from "@/components/exam-skill/MissionLearning";

const modules: MissionDefinition[] = [
  { number: "01", kindLabel: "Modul", title: "Asas Karangan Panjang", description: "Fahami format, struktur dan formula IMBAK sebelum membuat latihan.", icon: Star, color: "#FBBF24" },
  { number: "02", kindLabel: "Modul", title: "Langkah Menulis Karangan", description: "Bina rangka, kembangkan isi dan semak jawapan langkah demi langkah.", icon: PenLine, color: "#38BDF8" },
  { number: "03", kindLabel: "Modul", title: "Contoh & Latihan", description: "Pelajari contoh karangan UASA Tingkatan 2 lengkap mengikut tema popular.", icon: Brain, color: "#C084FC" },
];

const checklist = ["Kehendak soalan dijawab", "Sekurang-kurangnya 3 isi dihuraikan", "Setiap isi guna formula IMBAK", "Penanda wacana digunakan", "Ungkapan menarik digunakan", "Ejaan dan tanda baca disemak", "Melebihi 180 patah perkataan"];

const ihcpCard = [
  { label: "Isi", text: "Nyatakan idea utama yang terus menjawab soalan." },
  { label: "Huraian", text: "Terangkan sebab, kesan atau keadaan dengan jelas." },
  { label: "Contoh", text: "Berikan contoh yang dekat dengan pengalaman murid." },
  { label: "Penegasan", text: "Tutup perenggan dengan ayat kesimpulan kecil." },
];

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

type PanjangPractice = {
  theme: string;
  title: string;
  points: string[];
  pendahuluan: string;
  isi: string[];
  penutup: string;
  expression?: string;
};

const practices: PanjangPractice[] = [
  {
    theme: "Tema 1 · Pendidikan",
    title: "Kepentingan Membudayakan Tabiat Membaca dalam Kalangan Remaja",
    points: ["meningkatkan pengetahuan am", "memperkasakan penguasaan bahasa", "mengisi masa lapang dengan berfaedah"],
    pendahuluan: "Tabiat membaca merupakan amalan murni yang perlu dipupuk sejak di bangku sekolah lagi. Malangnya, kajian menunjukkan minat membaca dalam kalangan remaja kini semakin menurun berikutan pengaruh gajet dan media sosial. Oleh itu, pelbagai usaha wajar dilaksanakan bagi membudayakan tabiat membaca dalam kalangan generasi muda pada hari ini.",
    isi: [
      "Antara sebab utama remaja perlu membudayakan tabiat membaca ialah untuk meningkatkan pengetahuan am mereka. Hal ini demikian kerana bahan bacaan seperti buku, akhbar dan majalah mengandungi pelbagai maklumat berguna daripada pelbagai bidang ilmu. Sebagai contoh, seorang murid yang gemar membaca akhbar dapat mengetahui isu semasa dengan lebih pantas berbanding rakan-rakan yang jarang membaca. Akibatnya, murid tersebut lebih yakin mengemukakan pandangan semasa sesi perbincangan di dalam kelas. Kesimpulannya, pembacaan yang meluas amat penting dalam melahirkan generasi yang celik ilmu.",
      "Selain itu, tabiat membaca turut dapat memperkasakan penguasaan bahasa dalam kalangan remaja. Hal ini kerana pembacaan yang kerap membolehkan seseorang mempelajari kosa kata baharu serta struktur ayat yang gramatis secara tidak langsung. Sebagai contoh, murid yang gemar membaca novel dan cerpen didapati lebih mahir menulis karangan berbanding murid yang jarang membaca bahan sastera. Akibatnya, prestasi murid tersebut dalam mata pelajaran Bahasa Melayu turut meningkat dari semasa ke semasa. Kesimpulannya, pembacaan yang berterusan mampu melahirkan pelajar yang cekap berbahasa.",
      "Seterusnya, membaca juga merupakan cara terbaik untuk mengisi masa lapang dengan aktiviti yang berfaedah. Hal ini demikian kerana remaja yang gemar membaca lebih cenderung meluangkan masa terluang mereka dengan menatap buku berbanding melayari media sosial tanpa had. Sebagai contoh, sebuah sekolah telah memperkenalkan program membaca yang mewajibkan setiap murid membaca sekurang-kurangnya satu buah buku dalam sebulan. Akibatnya, murid-murid didapati lebih produktif dan kurang bergantung kepada telefon pintar semasa waktu lapang. Kesimpulannya, aktiviti membaca wajar dijadikan amalan harian dalam kalangan remaja.",
    ],
    penutup: "Kesimpulannya, pelbagai pihak termasuklah ibu bapa, guru dan pihak sekolah perlu bekerjasama bagi membudayakan tabiat membaca dalam kalangan remaja. Sekiranya usaha ini dilaksanakan secara berterusan, generasi muda pada hari ini pasti dapat melahirkan modal insan yang berilmu dan berdaya saing pada masa hadapan. Sesungguhnya, membaca itu jambatan ilmu.",
    expression: "Membaca itu jambatan ilmu.",
  },
  {
    theme: "Tema 2 · Kesihatan",
    title: "Amalan Gaya Hidup Sihat dalam Kalangan Remaja",
    points: ["mengamalkan pemakanan seimbang", "melakukan aktiviti riadah secara berkala", "mengelakkan tabiat tidur lewat malam"],
    pendahuluan: "Kesihatan yang baik merupakan aset paling berharga bagi setiap individu termasuklah golongan remaja. Namun begitu, gaya hidup moden pada masa kini telah menyebabkan ramai remaja mengabaikan aspek kesihatan diri. Oleh itu, beberapa amalan gaya hidup sihat wajar diterapkan dalam kalangan remaja sejak di bangku sekolah lagi.",
    isi: [
      "Pertamanya, remaja perlu mengamalkan pemakanan seimbang dalam kehidupan seharian. Hal ini kerana pengambilan makanan yang seimbang dapat membekalkan tenaga serta nutrien yang diperlukan oleh tubuh badan untuk berfungsi dengan baik. Sebagai contoh, remaja digalakkan mengurangkan pengambilan makanan segera yang tinggi kandungan lemak dan menggantikannya dengan sayur-sayuran serta buah-buahan. Akibatnya, risiko menghidap penyakit seperti obesiti dan darah tinggi dapat dikurangkan sejak usia muda. Kesimpulannya, pemakanan seimbang perlu diberikan keutamaan oleh setiap remaja.",
      "Selain itu, remaja juga perlu melakukan aktiviti riadah secara berkala bagi mengekalkan kecergasan tubuh badan. Hal ini demikian kerana aktiviti fizikal seperti berlari, berbasikal dan bersukan dapat membakar kalori berlebihan serta mengukuhkan sistem kardiovaskular. Sebagai contoh, sebuah sekolah telah menetapkan waktu riadah wajib selama tiga puluh minit setiap hari untuk semua murid. Akibatnya, tahap kecergasan dan tumpuan murid semasa proses pembelajaran turut meningkat. Kesimpulannya, aktiviti riadah yang konsisten amat penting bagi kesejahteraan remaja.",
      "Seterusnya, remaja hendaklah mengelakkan tabiat tidur lewat malam yang boleh menjejaskan kesihatan jangka panjang. Hal ini kerana tidur yang mencukupi membolehkan otak dan tubuh badan berehat serta memulihkan tenaga selepas seharian beraktiviti. Sebagai contoh, remaja yang kerap tidur lewat kerana melayari media sosial sering kelihatan letih dan sukar menumpukan perhatian di dalam kelas. Akibatnya, prestasi akademik dan kesihatan mental remaja tersebut turut terjejas. Kesimpulannya, corak tidur yang teratur perlu diamalkan oleh setiap remaja.",
    ],
    penutup: "Kesimpulannya, amalan gaya hidup sihat perlu diterapkan dalam kalangan remaja sejak di bangku sekolah lagi bagi memastikan mereka membesar menjadi generasi yang cergas dan produktif. Sekiranya kesihatan diabaikan, generasi muda tidak akan mampu menyumbang secara maksimum kepada pembangunan negara pada masa hadapan. Sesungguhnya, kesihatan itu mahkota yang tidak ternilai.",
    expression: "Kesihatan itu mahkota yang tidak ternilai.",
  },
  {
    theme: "Tema 3 · Sains dan Teknologi",
    title: "Kesan Penggunaan Media Sosial Secara Keterlaluan dalam Kalangan Remaja",
    points: ["mengganggu pencapaian akademik", "mendatangkan risiko masalah kesihatan mental", "pendedahan kepada unsur negatif"],
    pendahuluan: "Media sosial telah menjadi sebahagian daripada kehidupan seharian remaja pada era digital ini. Walau bagaimanapun, penggunaan media sosial secara keterlaluan telah menimbulkan pelbagai kesan negatif yang membimbangkan. Oleh itu, kesan buruk penggunaan media sosial secara berlebihan perlu diketahui oleh semua pihak.",
    isi: [
      "Pertamanya, penggunaan media sosial yang keterlaluan boleh mengganggu pencapaian akademik remaja. Hal ini kerana masa yang sepatutnya digunakan untuk mengulang kaji pelajaran telah dihabiskan untuk melayari media sosial sehingga larut malam. Sebagai contoh, seorang murid yang taasub dengan media sosial didapati kerap mengantuk di dalam kelas dan gagal menyiapkan kerja rumah tepat pada masanya. Akibatnya, keputusan peperiksaan murid tersebut turut merosot secara mendadak. Kesimpulannya, penggunaan media sosial yang tidak terkawal mampu menjejaskan masa depan pendidikan remaja.",
      "Selain itu, penggunaan media sosial yang berlebihan turut mendatangkan risiko masalah kesihatan mental dalam kalangan remaja. Hal ini demikian kerana pendedahan berterusan kepada kandungan yang membandingkan kehidupan boleh menyebabkan remaja berasa rendah diri dan tertekan. Sebagai contoh, kajian mendapati remaja yang menghabiskan lebih lima jam sehari di media sosial lebih berisiko mengalami kemurungan berbanding rakan sebaya yang lain. Akibatnya, kesejahteraan emosi dan hubungan sosial remaja tersebut turut terjejas. Kesimpulannya, kesihatan mental remaja perlu dilindungi daripada kesan negatif media sosial.",
      "Seterusnya, remaja yang terlalu kerap menggunakan media sosial turut terdedah kepada unsur negatif seperti buli siber dan maklumat palsu. Hal ini kerana platform media sosial tidak selalunya ditapis dengan ketat sehingga membolehkan sebarang kandungan tersebar dengan mudah. Sebagai contoh, terdapat kes remaja yang menjadi mangsa buli siber sehingga menjejaskan keyakinan diri mereka. Akibatnya, remaja tersebut mungkin mengalami trauma dan menarik diri daripada aktiviti sosial. Kesimpulannya, penggunaan media sosial perlu dipantau bagi mengelakkan pendedahan kepada unsur yang tidak sihat.",
    ],
    penutup: "Kesimpulannya, penggunaan media sosial secara keterlaluan membawa lebih banyak kesan negatif berbanding manfaatnya sekiranya tidak dikawal dengan bijak. Semua pihak termasuklah ibu bapa dan pihak sekolah perlu memainkan peranan penting bagi memastikan remaja menggunakan media sosial secara berhemah. Sesungguhnya, kebijaksanaan menggunakan teknologi menentukan kualiti kehidupan seseorang.",
    expression: "Kebijaksanaan menggunakan teknologi menentukan kualiti kehidupan.",
  },
  {
    theme: "Tema 4 · Patriotisme",
    title: "Cara Memupuk Semangat Patriotisme dalam Kalangan Generasi Muda",
    points: ["menyertai aktiviti sambutan Hari Kemerdekaan", "mempelajari sejarah perjuangan negara", "menghormati lambang-lambang negara"],
    pendahuluan: "Semangat patriotisme merupakan elemen penting yang perlu disemai dalam jiwa setiap rakyat Malaysia termasuklah golongan remaja. Namun begitu, semangat cintakan negara didapati semakin pudar dalam kalangan generasi muda akibat pengaruh budaya luar. Oleh itu, beberapa langkah wajar dilaksanakan bagi memupuk semangat patriotisme dalam kalangan generasi muda pada hari ini.",
    isi: [
      "Pertamanya, generasi muda perlu digalakkan menyertai aktiviti sambutan Hari Kemerdekaan yang dianjurkan setiap tahun. Hal ini kerana penglibatan secara langsung dalam aktiviti seperti perbarisan dan pertandingan mendeklamasikan sajak dapat menanamkan rasa cinta akan negara. Sebagai contoh, sebuah sekolah menganjurkan pertandingan menghias kelas bertemakan kemerdekaan bagi menarik minat murid menghayati erti kemerdekaan. Akibatnya, murid-murid lebih menghargai jasa para pejuang kemerdekaan negara. Kesimpulannya, penglibatan aktif dalam sambutan kemerdekaan mampu memupuk semangat cintakan negara.",
      "Selain itu, generasi muda juga perlu mempelajari sejarah perjuangan negara dengan lebih mendalam. Hal ini demikian kerana pengetahuan tentang pengorbanan pejuang silam dapat membina rasa hormat dan bangga terhadap warisan negara. Sebagai contoh, lawatan ke muzium sejarah dan tempat bersejarah dapat memberikan gambaran sebenar tentang perjuangan mencapai kemerdekaan. Akibatnya, generasi muda lebih memahami nilai kemerdekaan dan tidak memandang ringan terhadap kedaulatan negara. Kesimpulannya, pengetahuan sejarah yang mendalam mampu mengukuhkan jati diri generasi muda.",
      "Seterusnya, generasi muda perlu menunjukkan penghormatan terhadap lambang-lambang negara seperti Jalur Gemilang dan lagu kebangsaan. Hal ini kerana lambang-lambang tersebut melambangkan kedaulatan dan maruah negara yang perlu dihormati oleh setiap rakyat. Sebagai contoh, murid-murid diajar untuk berdiri tegak dan menyanyikan lagu Negaraku dengan penuh khidmat semasa perhimpunan sekolah. Akibatnya, rasa hormat dan taat setia terhadap negara dapat dipupuk sejak usia muda. Kesimpulannya, penghormatan terhadap lambang negara mencerminkan semangat patriotisme yang tinggi.",
    ],
    penutup: "Kesimpulannya, semangat patriotisme dalam kalangan generasi muda perlu dipupuk secara berterusan melalui pelbagai pendekatan yang bersesuaian. Sekiranya semangat ini berjaya disemai dengan jayanya, generasi muda pasti akan menjadi rakyat yang setia dan sanggup mempertahankan kedaulatan negara pada masa hadapan. Sesungguhnya, negara yang maju lahir daripada rakyat yang cintakan tanah air.",
    expression: "Negara yang maju lahir daripada rakyat yang cintakan tanah air.",
  },
];

function fullEssay(p: PanjangPractice) {
  return [p.pendahuluan, ...p.isi, p.penutup].join(" ");
}

function PracticeCard({ practice, index }: { practice: PanjangPractice; index: number }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"><div className="p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">Latihan {index + 1} · {practice.theme}</p><h3 className="mt-2 font-display text-lg font-bold leading-7 text-white">{practice.title}</h3><div className="mt-4"><p className="text-[10px] font-black uppercase tracking-widest text-sky-300">Isi Utama</p><div className="mt-2 flex flex-wrap gap-2">{practice.points.map(item => <span key={item} className="rounded-lg border border-sky-300/15 bg-sky-300/[0.05] px-3 py-2 text-xs leading-5 text-sky-100">{item}</span>)}</div></div><button type="button" onClick={() => setShowAnswer(value => !value)} aria-expanded={showAnswer} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-purple-300/20 bg-purple-300/[0.08] px-4 text-sm font-bold text-purple-100 transition-colors hover:bg-purple-300/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60">{showAnswer ? "Sembunyikan Jawapan" : "Lihat Jawapan"}<ChevronDown className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${showAnswer ? "rotate-180" : ""}`} /></button></div><div className="grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none" style={{ gridTemplateRows: showAnswer ? "1fr" : "0fr", opacity: showAnswer ? 1 : 0 }}><div className="overflow-hidden"><div className="space-y-4 border-t border-white/[0.06] p-5"><div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4"><div className="mb-2 flex items-center justify-between gap-2"><p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Contoh Karangan Lengkap</p><span className="rounded-full bg-emerald-300/15 px-2 py-0.5 text-[10px] font-bold text-emerald-200">{countWords(fullEssay(practice))} patah perkataan</span></div><p className="text-sm leading-7 text-white/75">{fullEssay(practice)}</p></div><QuickScoreCard items={["Setiap isi guna formula IMBAK", "Penanda wacana digunakan", "Bahasa gramatis", "Melebihi 180 patah perkataan"]} />{practice.expression && <p className="flex items-start gap-2 text-sm text-amber-100"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />Ungkapan: {practice.expression}</p>}</div></div></div></article>;
}

function UasaExampleCard({ practice, index }: { practice: PanjangPractice; index: number }) {
  const [open, setOpen] = useState(false);
  return <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
    <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} className="flex min-h-20 w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-300/50">
      <span><span className="block text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">Contoh {String(index + 1).padStart(2, "0")} · {practice.theme}</span><span className="mt-2 block font-display text-base font-bold leading-6 text-white">{practice.title}</span></span><ChevronDown className={`h-5 w-5 shrink-0 text-purple-300 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
    </button>
    <div className="grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}><div className="overflow-hidden"><div className="space-y-5 border-t border-white/[0.06] p-5">
      <div className="grid gap-3 sm:grid-cols-2"><InfoBlock label="1 · Tema" text={practice.theme} color="#C084FC" /><InfoBlock label="2 · Soalan" text={`Tulis sebuah karangan tentang "${practice.title}".`} color="#60A5FA" /></div>
      <div><p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">3 · Isi Utama</p><div className="mt-2 flex flex-wrap gap-2">{practice.points.map(item => <span key={item} className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.05] px-3 py-2 text-xs leading-5 text-cyan-100">{item}</span>)}</div></div>
      <InfoBlock label="4 · Cara Berfikir" text="Kenal pasti tema, susun sekurang-kurangnya 3 isi dan kembangkan setiap isi menggunakan formula IMBAK." color="#FBBF24" />
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"><p className="text-[10px] font-black uppercase tracking-widest text-amber-300">5 · Rangka Pendahuluan</p><p className="mt-2 text-sm leading-6 text-white/65">{practice.pendahuluan}</p></div>
      <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4"><div className="mb-2 flex items-center justify-between gap-2"><p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">6 · Model Karangan Lengkap</p><span className="rounded-full bg-emerald-300/15 px-2 py-0.5 text-[10px] font-bold text-emerald-200">{countWords(fullEssay(practice))} patah perkataan</span></div><p className="mt-2 text-sm leading-7 text-white/75">{fullEssay(practice)}</p></div>
      <QuickScoreCard items={["Sekurang-kurangnya 3 isi dihuraikan", "Setiap isi guna formula IMBAK", "Penanda wacana digunakan", "Melebihi 180 patah perkataan"]} />
      <CorrectWrongExample wrong="Menulis isi secara ringkas tanpa huraian, contoh atau kesan." right="Mengembangkan setiap isi menggunakan formula IMBAK (Isi, Mengapa, Bagaimana, Akibat, Kesimpulan kecil)." />
    </div></div></div>
  </article>;
}

function InfoBlock({ label, text, color }: { label: string; text: string; color: string }) {
  return <div className="rounded-xl border bg-white/[0.025] p-4" style={{ borderColor: `${color}25` }}><p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{label}</p><p className="mt-2 text-sm leading-6 text-white/65">{text}</p></div>;
}

const imbakSteps = [
  { code: "I", label: "Isi", desc: "Maklumat atau idea utama yang dipilih." },
  { code: "M", label: "Mengapa", desc: "Sebab atau alasan isi tersebut penting." },
  { code: "B", label: "Bagaimana", desc: "Contoh atau cara isi tersebut berlaku." },
  { code: "A", label: "Akibat", desc: "Kesan atau hasil daripada isi tersebut." },
  { code: "K", label: "Kesimpulan Kecil", desc: "Rumusan ringkas menutup perenggan isi." },
];

export function BMForm2KaranganPanjangContent({ initialSectionId, onBack }: { initialSectionId?: string; onBack?: () => void } = {}) {
  const sectionMap: Record<string, number> = { asas: 0, "langkah-menulis": 1, "contoh-latihan": 2 };
  const initialModule = initialSectionId ? (sectionMap[initialSectionId] ?? null) : null;
  const [activeModule, setActiveModule] = useState<number | null>(initialModule);
  const [checked, setChecked] = useState(() => checklist.map(() => false));
  if (activeModule === null) return <ExamSkillLanding title="Karangan Respons Terbuka" subtitle="Bahagian B: Kuasai karangan melebihi 180 patah perkataan langkah demi langkah." missions={modules} onSelect={setActiveModule} />;
  const module = modules[activeModule];
  return <MissionPageShell mission={module} onBack={() => onBack ? onBack() : setActiveModule(null)}>
    {activeModule === 0 && <>
      <section className="rounded-2xl border border-indigo-300/20 bg-indigo-300/[0.05] p-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-300">Mission Brief</p><p className="mt-2 text-sm leading-7 text-white/70">Kuasai format, kembangkan sekurang-kurangnya 3 isi menggunakan formula IMBAK dan hasilkan karangan respons terbuka yang lengkap dan matang.</p></section>
      <MissionSection title="Apa Itu Karangan Respons Terbuka" color={module.color}><div className="grid gap-3 sm:grid-cols-3">{[["Tujuan", "Mengembangkan sesuatu tema menjadi karangan yang lengkap dan matang."], ["Panjang", "Melebihi 180 patah perkataan"], ["Format", "Bahagian B · Kertas 2"]].map(([label, text]) => <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"><p className="text-[10px] font-black uppercase tracking-widest text-amber-300">{label}</p><p className="mt-2 text-sm leading-6 text-white/70">{text}</p></div>)}</div></MissionSection>
      <MissionSection title="Struktur Karangan" color="#38BDF8"><div className="mx-auto max-w-lg space-y-2">{["Pendahuluan", "Isi 1 (IMBAK)", "Isi 2 (IMBAK)", "Isi 3 (IMBAK)", "Isi seterusnya (jika perlu)", "Penutup"].map((item, index, list) => <div key={item}><div className="rounded-xl border border-sky-300/15 bg-sky-300/[0.05] p-3 text-center text-sm font-bold text-white/75">{item}</div>{index < list.length - 1 && <div className="py-1 text-center text-sky-300/30">↓</div>}</div>)}</div></MissionSection>
      <MissionSection title="Formula IMBAK" color="#34D399"><div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-5">{imbakSteps.map(s => <div key={s.code} className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-3"><p className="text-base font-black text-emerald-300">{s.code}</p><p className="mt-1 text-xs font-bold text-white/85">{s.label}</p><p className="mt-1 text-[11px] leading-snug text-white/50">{s.desc}</p></div>)}</div></MissionSection>
      <MissionSection title="Teknik I-H-C-P" color="#38BDF8"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{ihcpCard.map((item, index) => <div key={item.label} className="rounded-xl border border-sky-300/15 bg-sky-300/[0.05] p-4"><p className="text-[10px] font-black uppercase tracking-widest text-sky-300">{String(index + 1).padStart(2, "0")} · {item.label}</p><p className="mt-2 text-sm leading-6 text-white/70">{item.text}</p></div>)}</div></MissionSection>
      <MissionSection title="Cara Memilih Tajuk" color="#A78BFA"><div className="grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm leading-6 text-white/70">Pilih tajuk yang mempunyai idea paling banyak, contoh yang jelas dan tidak terlalu luas.</div><div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm leading-6 text-white/70">Elakkan tajuk yang memerlukan fakta terlalu khusus jika anda kurang yakin dengan isi.</div></div></MissionSection>
      <MissionSection title="Formula Pendahuluan" color="#A78BFA"><div className="grid gap-2 sm:grid-cols-3">{[["Latar Belakang", "Nyatakan situasi am berkaitan tema."], ["Isu / Kenyataan", "Nyatakan isu atau kepentingan tema tersebut."], ["Gambaran Keseluruhan", "Berikan gambaran ringkas isi yang akan dihuraikan."]].map(([label, text]) => <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3"><p className="text-[10px] font-black uppercase tracking-widest text-purple-300">{label}</p><p className="mt-2 text-xs leading-5 text-white/65">{text}</p></div>)}</div></MissionSection>
      <MissionSection title="Formula Penutup" color="#F472B6"><div className="flex flex-wrap gap-2">{["Kesimpulan", "Penegasan", "Harapan", "Ungkapan Menarik"].map(item => <span key={item} className="rounded-lg border border-pink-300/15 bg-pink-300/[0.06] px-3 py-2 text-xs font-bold text-pink-100">{item}</span>)}</div></MissionSection>
      <MissionSection title="Penanda Wacana" color="#22D3EE"><div className="flex flex-wrap gap-2">{["Pertamanya", "Selain itu", "Seterusnya", "Di samping itu", "Tambahan pula", "Akhir sekali", "Kesimpulannya"].map(item => <span key={item} className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-2 text-xs font-bold text-cyan-100">{item}</span>)}</div></MissionSection>
      <MissionSection title="Cara Memberi Contoh dan Penegasan" color="#34D399"><div className="grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-4 text-sm leading-6 text-white/70">Gunakan frasa seperti <strong className="text-white">sebagai contoh</strong>, <strong className="text-white">misalnya</strong> dan <strong className="text-white">tamsilnya</strong>.</div><div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-4 text-sm leading-6 text-white/70">Tutup isi dengan penegasan seperti <strong className="text-white">jelaslah bahawa</strong> atau <strong className="text-white">natijahnya</strong>.</div></div></MissionSection>
      <MissionSection title="Ungkapan Menarik" color="#F472B6"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{["Jambatan ilmu", "Mahkota tidak ternilai", "Kunci kejayaan", "Nadi pembangunan negara", "Aset paling berharga", "Cintakan tanah air"].map(item => <div key={item} className="rounded-xl border border-pink-300/15 bg-pink-300/[0.04] p-3 text-sm font-bold text-pink-100">{item}</div>)}</div></MissionSection>
      <section className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-5"><p className="text-[10px] font-black uppercase tracking-widest text-amber-300">Tip Guru · Jangan Ulang Isi</p><p className="mt-2 text-sm leading-6 text-white/70">Setiap isi mesti membawa idea baharu dengan huraian, contoh dan kesan yang berbeza. Elakkan menulis isi yang bertindih antara satu sama lain.</p></section>
      <MissionSection title="Kesalahan Lazim" color="#FB7185"><div className="space-y-3"><CorrectWrongExample wrong="Menulis isi tanpa huraian, contoh atau kesan." right="Kembangkan setiap isi menggunakan formula IMBAK secara lengkap." /><CorrectWrongExample wrong="Pendahuluan dan penutup terlalu ringkas atau tidak berkaitan tema." right="Gunakan formula pendahuluan dan penutup supaya karangan lebih tersusun." /></div></MissionSection>
      <MissionSection title="Checklist Sebelum Hantar" color="#34D399"><FinalChecklist items={checklist} checked={checked} onToggle={index => setChecked(current => current.map((value, i) => i === index ? !value : value))} /></MissionSection>
    </>}
    {activeModule === 1 && <>
      <MissionSection title="Langkah 1 · Kenal Pasti Kehendak Soalan" color={module.color}><p className="text-sm leading-7 text-white/65">Baca soalan dengan teliti dan tandakan tema utama serta jenis karangan yang perlu ditulis (fakta, pendapat, pengalaman dan sebagainya).</p></MissionSection>
      <MissionSection title="Langkah 2 · Kenal Pasti dan Susun Isi" color="#C084FC"><div className="grid gap-2 sm:grid-cols-2">{practices[0].points.map(item => <p key={item} className="flex min-h-11 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 text-sm text-white/65"><CheckCircle2 className="h-4 w-4 shrink-0 text-purple-300" />{item}</p>)}</div></MissionSection>
      <MissionSection title="Langkah 3 · Tulis Pendahuluan" color="#60A5FA"><p className="rounded-xl border border-sky-300/15 bg-sky-300/[0.05] p-4 text-sm leading-7 text-white/70">{practices[0].pendahuluan}</p></MissionSection>
      <MissionSection title="Langkah 4 · Kembangkan Isi Guna Formula IMBAK" color="#34D399"><p className="mb-3 text-sm leading-6 text-white/60">Setiap perenggan isi mesti mengandungi Isi, Mengapa, Bagaimana, Akibat dan Kesimpulan Kecil.</p><p className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-4 text-sm leading-7 text-white/70">{practices[0].isi[0]}</p></MissionSection>
      <MissionSection title="Langkah 5 · Gunakan Penanda Wacana dan Ungkapan Menarik" color="#22D3EE"><div className="grid gap-2 sm:grid-cols-2">{["Sambungkan setiap perenggan isi dengan penanda wacana", "Selitkan ungkapan menarik dalam pendahuluan atau penutup", "Elakkan pengulangan penanda wacana yang sama", "Pastikan ayat gramatis dan jelas"].map(item => <p key={item} className="flex min-h-11 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 text-sm text-white/65"><CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />{item}</p>)}</div></MissionSection>
      <MissionSection title="Langkah 6 · Tulis Penutup" color="#F472B6"><p className="rounded-xl border border-pink-300/15 bg-pink-300/[0.05] p-4 text-sm leading-7 text-white/70">{practices[0].penutup}</p></MissionSection>
      <MissionSection title="Langkah 7 · Semak Semula" color="#34D399"><FinalChecklist items={["Sekurang-kurangnya 3 isi dihuraikan", "Setiap isi guna formula IMBAK", "Penanda wacana digunakan", "Melebihi 180 patah perkataan", "Ejaan dan tanda baca disemak"]} checked={checked.slice(0, 5)} onToggle={index => setChecked(current => current.map((value, i) => i === index ? !value : value))} /></MissionSection>
      <WarningCard items={["Isi tidak dihuraikan dengan lengkap", "Pendahuluan tidak berkaitan tema", "Tiada penanda wacana antara perenggan", "Karangan terlalu pendek (kurang 180 patah perkataan)", "Ejaan dan tanda baca tidak disemak"]} />
    </>}
    {activeModule === 2 && <>
      <div className="space-y-4">{practices.map((practice, index) => <UasaExampleCard key={`${practice.title}-${index}`} practice={practice} index={index} />)}</div>
      <MissionSection title="Latihan Tambahan" color="#38BDF8"><div className="space-y-4">{practices.slice(0, 2).map((practice, index) => <PracticeCard key={`practice-${practice.title}`} practice={practice} index={index} />)}</div></MissionSection>
      <MissionSection title="Mini Bank Ulang Kaji" color="#22D3EE"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{["Formula IMBAK", "Penanda Wacana", "Ungkapan Menarik", "Formula Pendahuluan", "Formula Penutup", "Kosa Kata Berimpak Tinggi"].map(item => <div key={item} className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.05] p-3 text-sm font-bold text-cyan-100">{item}</div>)}</div></MissionSection>
      <section className="rounded-[1.75rem] border border-amber-300/25 bg-gradient-to-br from-amber-300/[0.1] to-purple-300/[0.05] p-6"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">1 Minit Sebelum Masuk Dewan Peperiksaan</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{["Formula IMBAK", "Struktur Karangan", "Penanda Wacana", "Ungkapan Menarik", "Checklist Akhir"].map(item => <p key={item} className="rounded-xl border border-white/[0.08] bg-black/10 p-3 text-sm font-bold text-white/75">★ {item}</p>)}</div></section>
    </>}
  </MissionPageShell>;
}
