import { useState, type ReactNode } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Bike,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Clock3,
  Dumbbell,
  Gauge,
  MoveDown,
  MoveUp,
  Scale,
  Sparkles,
  Timer,
  Weight,
  Zap,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 7",
    title: "Tenaga dan Kuasa",
    subtitle: "Kerja, tenaga dan kuasa, tenaga keupayaan dan tenaga kinetik, serta prinsip keabadian tenaga.",
    path: [
      ["7.1 Kerja, Tenaga dan Kuasa", "Hubungkan daya, sesaran dan masa."],
      ["7.2 Tenaga Keupayaan dan Tenaga Kinetik", "Bezakan tenaga kerana kedudukan, bentuk dan gerakan."],
      ["7.3 Prinsip Keabadian Tenaga", "Jejaki pertukaran tenaga dalam sistem ayunan."],
    ],
    bigIdea: "Idea besar",
    formula: "Rumus",
    unit: "Unit S.I.",
    workTitle: "Kerja, Tenaga dan Kuasa",
    workBody: "Dalam fizik, kerja ialah hasil darab daya dengan sesaran dalam arah daya. Menolak dinding yang tidak bergerak tidak melakukan kerja walaupun anda berasa penat.",
    yesWork: "Ada kerja",
    yesWorkBody: "Daya 10 N menolak troli sejauh 5 m dalam arah yang sama.",
    noWork: "Tiada kerja",
    noWorkBody: "Dinding tidak bergerak, maka s = 0 dan W = 0 J.",
    energyDefinition: "Tenaga didefinisikan sebagai keupayaan untuk melakukan kerja. Kerja yang dilakukan bersamaan dengan jumlah tenaga yang dipindahkan atau digunakan.",
    powerTitle: "Definisi dan Konsep Kuasa",
    powerBody: "Kuasa ditakrifkan sebagai kadar melakukan kerja.",
    staircase: "Contoh Pengiraan Kerja",
    staircaseQuestion: "Murid yang mempunyai berat badan 400 N membawa beban seberat 100 N menaiki tangga dengan tinggi tegak 3 m.",
    inquiry: "Aktiviti Inkuiri 7.1",
    inquiryBody: "Bandingkan kerja dan kuasa ketika menarik bongkah secara mendatar dengan mengangkat pemberat secara menegak.",
    horizontal: "Mendatar: atasi daya geseran",
    vertical: "Menegak: atasi daya graviti",
    measure: ["Ukur daya, F", "Ukur sesaran, s", "Catat masa, t", "Kira W dan P"],
    energyTitle: "Tenaga Keupayaan dan Tenaga Kinetik",
    energyHint: "Pilih jenis tenaga untuk melihat asal, rumus dan contoh pengiraannya.",
    gpe: "Tenaga keupayaan graviti",
    gpeOrigin: "Tenaga yang disimpan oleh suatu objek disebabkan oleh kedudukannya atau ketinggiannya dari permukaan Bumi.",
    gpeExample: "Lif mengangkat 1,500 kg setinggi 30 m: 1,500 × 10 × 30 = 450,000 J.",
    epe: "Tenaga keupayaan kenyal",
    epeOrigin: "Tenaga yang disimpan dalam suatu objek kenyal apabila objek itu diregangkan atau dimampatkan dari kedudukan keseimbangannya.",
    epeExample: "Spring dimampat 0.08 m dengan daya akhir 20 N: ½ × 20 × 0.08 = 0.8 J.",
    ke: "Tenaga kinetik",
    keOrigin: "Tenaga yang dimiliki oleh suatu objek yang sedang bergerak.",
    keExample: "Bebola 0.2 kg bergerak pada 6 m s⁻¹: ½ × 0.2 × 6² = 3.6 J.",
    variables: "Kenali pemboleh ubah",
    graphTitle: "Hubungan Kerja dengan Tenaga Keupayaan Kenyal",
    graphBody: "Daya meningkat secara linear daripada 0 ke F. Daya purata ialah ½F, maka kerja = daya purata × sesaran = ½Fx — luas segi tiga di bawah graf F–x.",
    conservationTitle: "Prinsip Keabadian Tenaga",
    conservationBody: "Tenaga tidak boleh dicipta atau dimusnahkan, tetapi hanya boleh berubah-ubah bentuknya. Dalam sistem tertutup, jumlah tenaga sentiasa malar walaupun tenaga keupayaan dan tenaga kinetik berubah.",
    pendulum: "Bandul ringkas",
    spring: "Spring berbeban",
    positionHint: "Pilih kedudukan untuk membandingkan tenaga.",
    left: "X · hujung pertama",
    centre: "Y · keseimbangan",
    right: "Z · hujung bertentangan",
    potential: "Tenaga keupayaan",
    kinetic: "Tenaga kinetik",
    maximum: "maksimum",
    minimum: "minimum",
    zero: "sifar",
    stationary: "Pegun seketika; halaju sifar.",
    fastest: "Bergerak paling laju melalui keseimbangan.",
    changingDown: "Keupayaan berkurang → kinetik bertambah",
    changingUp: "Kinetik berkurang → keupayaan bertambah",
    closedTitle: "Sistem ideal berbanding dunia sebenar",
    closed: "Sistem tertutup",
    closedBody: "Tiada geseran atau rintangan udara. Jumlah tenaga mekanikal kekal malar.",
    real: "Sistem Realiti (Sistem Terbuka)",
    realBody: "Geseran dan rintangan udara menukar sebahagian tenaga mekanikal kepada haba; ayunan akhirnya berhenti.",
    workedTitle: "Masalah Numerikal Pengiraan Keabadian Tenaga",
    workedQuestion: "Spring 300 mm dimampat hingga 50 mm oleh daya 5 N. Bola plastik berjisim 50 g. Cari halaju maksimum.",
    examTitle: "Penyelesaian",
    examSteps: ["Tukar unit: x = 0.25 m, m = 0.05 kg", "Eₚ = ½Fx = 0.625 J", "Gunakan Eₚ = Eₖ", "½(0.05)v² = 0.625", "v = 5 m s⁻¹"],
    recapTitle: "Rumusan",
    recap: ["Kerja memerlukan daya dan sesaran dalam arah daya.", "Kuasa meningkat apabila kerja bertambah atau masa berkurang.", "T.K. graviti = mgh, T.K. kenyal = ½Fx, tenaga kinetik = ½mv².", "Dalam sistem tertutup, jumlah tenaga adalah malar.", "Tukar cm, mm, g, minit dan km j⁻¹ kepada unit S.I. sebelum mengira."],
    mark: "Tandakan Bab 7 Selesai",
    marked: "Bab 7 selesai",
  },
  en: {
    eyebrow: "Chapter 7 visual map",
    title: "Energy and Power",
    subtitle: "Work, energy and power, potential energy and kinetic energy, and the principle of conservation of energy.",
    path: [
      ["7.1 Work, Energy and Power", "Connect force, displacement and time."],
      ["7.2 Potential Energy and Kinetic Energy", "Distinguish energy due to position, shape and motion."],
      ["7.3 Principle of Conservation of Energy", "Track energy changes in oscillating systems."],
    ],
    bigIdea: "Big idea",
    formula: "Equation",
    unit: "S.I. unit",
    workTitle: "Work, Energy and Power",
    workBody: "In physics, work is the product of force and displacement in the direction of the force. Pushing a wall that does not move does no work, even if you feel tired.",
    yesWork: "Work is done",
    yesWorkBody: "A 10 N force pushes a trolley 5 m in the same direction.",
    noWork: "No work",
    noWorkBody: "The wall does not move, so s = 0 and W = 0 J.",
    energyDefinition: "Energy is defined as the ability to do work. Work done equals the amount of energy transferred or used.",
    powerTitle: "Definition and Concept of Power",
    powerBody: "Power is defined as the rate of doing work.",
    staircase: "Example of Calculating Work",
    staircaseQuestion: "A student weighing 400 N carries a load weighing 100 N up a staircase through a vertical height of 3 m.",
    inquiry: "Inquiry Activity 7.1",
    inquiryBody: "Compare work and power when pulling a block horizontally and lifting a weight vertically.",
    horizontal: "Horizontal: overcome friction",
    vertical: "Vertical: overcome gravity",
    measure: ["Measure force, F", "Measure displacement, s", "Record time, t", "Calculate W and P"],
    energyTitle: "Potential Energy and Kinetic Energy",
    energyHint: "Choose an energy type to see its origin, equation and worked example.",
    gpe: "Gravitational potential energy",
    gpeOrigin: "Energy stored by an object because of its position or height above the Earth's surface.",
    gpeExample: "A lift raises 1,500 kg through 30 m: 1,500 × 10 × 30 = 450,000 J.",
    epe: "Elastic potential energy",
    epeOrigin: "Energy stored in an elastic object when it is stretched or compressed from its equilibrium position.",
    epeExample: "A spring is compressed 0.08 m by a final force of 20 N: ½ × 20 × 0.08 = 0.8 J.",
    ke: "Kinetic energy",
    keOrigin: "Energy possessed by a moving object.",
    keExample: "A 0.2 kg ball moves at 6 m s⁻¹: ½ × 0.2 × 6² = 3.6 J.",
    variables: "Know the variables",
    graphTitle: "Relationship between Work and Elastic Potential Energy",
    graphBody: "Force rises linearly from 0 to F. The average force is ½F, so work = average force × displacement = ½Fx — the triangular area under an F–x graph.",
    conservationTitle: "Principle of Conservation of Energy",
    conservationBody: "Energy cannot be created or destroyed, but can only change from one form to another. In a closed system, total energy remains constant even as potential energy and kinetic energy change.",
    pendulum: "Simple pendulum",
    spring: "Loaded spring",
    positionHint: "Choose a position to compare the energy stores.",
    left: "X · first extreme",
    centre: "Y · equilibrium",
    right: "Z · opposite extreme",
    potential: "Potential energy",
    kinetic: "Kinetic energy",
    maximum: "maximum",
    minimum: "minimum",
    zero: "zero",
    stationary: "Momentarily stationary; velocity is zero.",
    fastest: "Moving fastest through equilibrium.",
    changingDown: "Potential decreases → kinetic increases",
    changingUp: "Kinetic decreases → potential increases",
    closedTitle: "An ideal system versus the real world",
    closed: "Closed system",
    closedBody: "No friction or air resistance. Total mechanical energy stays constant.",
    real: "Real System (Open System)",
    realBody: "Friction and air resistance convert some mechanical energy to heat; the oscillation eventually stops.",
    workedTitle: "Numerical Problem on the Conservation of Energy",
    workedQuestion: "A 300 mm spring is compressed to 50 mm by a 5 N force. The plastic ball has a mass of 50 g. Find its maximum velocity.",
    examTitle: "Solution",
    examSteps: ["Convert units: x = 0.25 m, m = 0.05 kg", "Eₚ = ½Fx = 0.625 J", "Use Eₚ = Eₖ", "½(0.05)v² = 0.625", "v = 5 m s⁻¹"],
    recapTitle: "Summary",
    recap: ["Work needs force and displacement in the direction of the force.", "Power increases when work increases or time decreases.", "Gravitational P.E. = mgh, elastic P.E. = ½Fx, kinetic energy = ½mv².", "In a closed system, total energy is constant.", "Convert cm, mm, g, minutes and km h⁻¹ into S.I. units before calculating."],
    mark: "Mark Chapter 7 Complete",
    marked: "Chapter 7 complete",
  },
} as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${className}`}>{children}</div>;
}

function Formula({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return <div className="rounded-xl border border-amber-300/25 bg-amber-300/10 p-3"><p className="text-[11px] font-black uppercase tracking-[.16em] text-amber-200">{label}</p><p className="mt-1 font-mono text-lg font-black text-white">{value}</p>{unit && <p className="mt-1 text-xs text-amber-100/80">{unit}</p>}</div>;
}

function SectionHeading({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.2em] text-amber-300">{number}</span><h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{body}</p></div>;
}

function EnergyBars({ potential, kinetic, labels }: { potential: number; kinetic: number; labels: [string, string] }) {
  return <div className="space-y-3" aria-label={`${labels[0]} ${potential}%, ${labels[1]} ${kinetic}%`}>
    {[[labels[0], potential, "bg-violet-400"], [labels[1], kinetic, "bg-cyan-400"]].map(([label, value, colour]) => <div key={String(label)}><div className="mb-1 flex justify-between text-xs font-bold text-slate-300"><span>{label}</span><span>{value}%</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-950/70"><div className={`h-full rounded-full ${colour} transition-[width] duration-300`} style={{ width: `${value}%` }} /></div></div>)}
  </div>;
}

export function ScienceF3Chapter7VisualNotesBlock({ id, content, lang, isRead, onMarkRead }: { id?: string; content: ScienceF3InteractiveContent; lang: Lang; storageKey?: string; isRead?: boolean; onMarkRead?: () => void }) {
  const t = copy[lang];
  const [energy, setEnergy] = useState<"gpe" | "epe" | "ke">("gpe");
  const [oscillator, setOscillator] = useState<"pendulum" | "spring">("pendulum");
  const [position, setPosition] = useState(0);
  const energyData = {
    gpe: { name: t.gpe, origin: t.gpeOrigin, equation: "Eₚ = mgh", units: "m (kg) · g (m s⁻²) · h (m)", example: t.gpeExample, icon: MoveUp },
    epe: { name: t.epe, origin: t.epeOrigin, equation: "Eₚ = ½Fx", units: "F (N) · x (m)", example: t.epeExample, icon: Activity },
    ke: { name: t.ke, origin: t.keOrigin, equation: "Eₖ = ½mv²", units: "m (kg) · v (m s⁻¹)", example: t.keExample, icon: Bike },
  }[energy];
  const positionLabels = [t.left, t.centre, t.right];
  const potential = position === 1 ? 0 : 100;
  const kinetic = 100 - potential;
  const stateText = position === 1 ? t.fastest : t.stationary;

  return <section id={id} data-lang={lang} data-chapter={content.chapter} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-amber-300/15 bg-[#101426] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_15%,rgba(251,191,36,.18),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(34,211,238,.14),transparent_32%)]" />
    <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
      <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-amber-300/15 via-slate-950/40 to-cyan-300/10 p-5 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-amber-200"><Zap className="h-4 w-4" />{t.eyebrow}</div>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p>
        <div className="mt-7 grid gap-3 lg:grid-cols-3">{t.path.map((item, index) => <div key={item[0]} className="relative rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs font-black text-amber-300">0{index + 1}</span><h2 className="mt-2 text-sm font-black text-white">{item[0]}</h2><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>{index < 2 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-[#101426] p-1 text-cyan-300 lg:block" />}</div>)}</div>
      </header>

      <div className="space-y-6">
        <SectionHeading number="7.1" title={t.workTitle} body={t.workBody} />
        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <Panel><div className="grid gap-3 sm:grid-cols-3"><Formula label={t.formula} value="W = Fs" unit="W (J) · F (N) · s (m)" /><Formula label={t.unit} value="1 J = 1 N m" /><Formula label={t.bigIdea} value="s = 0 → W = 0" /></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-emerald-400/10 p-4"><div className="flex items-center gap-2 font-black text-emerald-300"><CheckCircle2 className="h-5 w-5" />{t.yesWork}</div><p className="mt-2 text-sm leading-6 text-slate-300">{t.yesWorkBody}</p><p className="mt-2 font-mono font-black text-white">W = 10 × 5 = 50 J</p></div><div className="rounded-xl bg-rose-400/10 p-4"><div className="flex items-center gap-2 font-black text-rose-300"><Dumbbell className="h-5 w-5" />{t.noWork}</div><p className="mt-2 text-sm leading-6 text-slate-300">{t.noWorkBody}</p><p className="mt-2 font-mono font-black text-white">W = F × 0 = 0 J</p></div></div></Panel>
          <Panel className="border-cyan-300/20 bg-cyan-300/[0.06]"><div className="flex items-start gap-3"><Sparkles className="mt-1 h-7 w-7 shrink-0 text-cyan-300" /><div><h3 className="font-black text-white">{lang === "bm" ? "Definisi dan Konsep Tenaga" : "Definition and Concept of Energy"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{t.energyDefinition}</p></div></div><div className="mt-5 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-white/10 px-3 py-2">1 kJ = 1,000 J</span><span className="rounded-full bg-white/10 px-3 py-2">1 MJ = 1,000,000 J</span></div></Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel><div className="flex items-center gap-3"><Timer className="h-8 w-8 text-amber-300" /><div><h3 className="font-black text-white">{t.powerTitle}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{t.powerBody}</p></div></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><Formula label={t.formula} value="P = W ÷ t" unit="P (W) · W (J) · t (s)" /><Formula label={t.unit} value="1 W = 1 J s⁻¹" /></div></Panel>
          <Panel><div className="flex items-center gap-3"><MoveUp className="h-8 w-8 text-cyan-300" /><h3 className="font-black text-white">{t.staircase}</h3></div><p className="mt-3 text-sm leading-6 text-slate-300">{t.staircaseQuestion}</p><div className="mt-4 flex flex-col gap-2 font-mono text-sm font-bold"><span>F = 400 + 100 = 500 N</span><span className="text-cyan-300">W = 500 × 3 = 1,500 J</span></div></Panel>
        </div>

        <Panel className="border-violet-300/20"><div className="flex items-center gap-3"><CircleGauge className="h-8 w-8 text-violet-300" /><div><h3 className="font-black text-white">{t.inquiry}</h3><p className="mt-1 text-sm text-slate-300">{t.inquiryBody}</p></div></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-violet-300/10 p-3 text-sm font-bold text-violet-100">{t.horizontal}</div><div className="rounded-xl bg-cyan-300/10 p-3 text-sm font-bold text-cyan-100">{t.vertical}</div></div><div className="mt-4 grid gap-2 sm:grid-cols-4">{t.measure.map((step, index) => <div key={step} className="flex items-center gap-2 rounded-xl bg-slate-950/55 p-3 text-xs font-semibold"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-300 font-black text-slate-950">{index + 1}</span>{step}</div>)}</div></Panel>
      </div>

      <div className="space-y-6">
        <SectionHeading number="7.2" title={t.energyTitle} body={t.energyHint} />
        <div className="grid gap-3 sm:grid-cols-3" role="tablist" aria-label={t.energyTitle}>{(["gpe", "epe", "ke"] as const).map((key) => { const item = { gpe: { label: t.gpe, Icon: MoveUp }, epe: { label: t.epe, Icon: Activity }, ke: { label: t.ke, Icon: Bike } }[key]; const Icon = item.Icon; return <button key={key} type="button" role="tab" aria-selected={energy === key} onClick={() => setEnergy(key)} className={`min-h-24 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${energy === key ? "border-amber-300/60 bg-amber-300/15" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`}><Icon className="h-6 w-6 text-amber-300" /><span className="mt-3 block text-sm font-black text-white">{item.label}</span></button>; })}</div>
        <Panel className="border-amber-300/25"><div className="grid gap-5 lg:grid-cols-[1fr_.8fr]"><div><div className="flex items-center gap-3"><energyData.icon className="h-8 w-8 text-amber-300" /><h3 className="text-xl font-black text-white">{energyData.name}</h3></div><p className="mt-3 text-sm leading-6 text-slate-300">{energyData.origin}</p><div className="mt-4"><Formula label={t.formula} value={energyData.equation} unit={energyData.units} /></div></div><div className="rounded-2xl bg-slate-950/60 p-4"><p className="text-xs font-black uppercase tracking-[.15em] text-cyan-300">{lang === "bm" ? "Contoh dikira" : "Worked example"}</p><p className="mt-3 text-sm leading-6 text-slate-200">{energyData.example}</p></div></div></Panel>
        <div className="grid gap-4 lg:grid-cols-2"><Panel><h3 className="font-black text-white">{t.variables}</h3><div className="mt-4 grid grid-cols-2 gap-2 text-sm"><span className="rounded-xl bg-white/5 p-3"><b>m</b> = {lang === "bm" ? "jisim (kg)" : "mass (kg)"}</span><span className="rounded-xl bg-white/5 p-3"><b>g</b> = 10 m s⁻²</span><span className="rounded-xl bg-white/5 p-3"><b>h, x</b> = {lang === "bm" ? "meter (m)" : "metre (m)"}</span><span className="rounded-xl bg-white/5 p-3"><b>v</b> = m s⁻¹</span></div></Panel><Panel><div className="flex gap-4"><div className="relative h-28 w-32 shrink-0 border-b border-l border-slate-500"><div className="absolute bottom-0 left-0 h-0 w-0 border-b-[110px] border-r-[120px] border-b-amber-300/25 border-r-transparent" /><span className="absolute -bottom-6 right-0 text-xs">x</span><span className="absolute -left-4 top-0 text-xs">F</span></div><div><h3 className="font-black text-white">{t.graphTitle}</h3><p className="mt-2 text-xs leading-5 text-slate-300">{t.graphBody}</p></div></div></Panel></div>
      </div>

      <div className="space-y-6">
        <SectionHeading number="7.3" title={t.conservationTitle} body={t.conservationBody} />
        <Panel><div className="flex flex-wrap gap-2" role="tablist" aria-label={lang === "bm" ? "Jenis ayunan" : "Oscillator type"}>{(["pendulum", "spring"] as const).map((key) => <button key={key} type="button" role="tab" aria-selected={oscillator === key} onClick={() => { setOscillator(key); setPosition(0); }} className={`min-h-11 rounded-xl px-4 text-sm font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${oscillator === key ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-200"}`}>{key === "pendulum" ? t.pendulum : t.spring}</button>)}</div><p className="mt-4 text-sm text-slate-400">{t.positionHint}</p><div className="mt-4 grid gap-5 lg:grid-cols-[1fr_.85fr]"><div className="relative min-h-64 overflow-hidden rounded-2xl bg-slate-950/65 p-5"><div className="absolute inset-x-8 top-10 border-t border-dashed border-slate-600" />{oscillator === "pendulum" ? <div className="relative mx-auto h-44 max-w-md"><div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-slate-300" /><div className={`absolute left-1/2 top-2 h-32 w-0.5 origin-top bg-slate-400 transition-transform duration-300 ${position === 0 ? "-rotate-45" : position === 2 ? "rotate-45" : "rotate-0"}`}><div className="absolute -bottom-5 -left-5 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg shadow-amber-500/25"><Weight className="h-5 w-5 text-slate-950" /></div></div></div> : <div className="mx-auto flex h-44 max-w-md flex-col items-center"><div className="h-3 w-32 rounded bg-slate-400" /><div className={`w-10 border-x-4 border-dashed border-violet-300 transition-[height] duration-300 ${position === 0 ? "h-32" : position === 1 ? "h-20" : "h-10"}`} /><div className="grid h-12 w-20 place-items-center rounded-xl bg-violet-400 font-black text-slate-950">m</div></div>}<div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">{positionLabels.map((label, index) => <button key={label} type="button" onClick={() => setPosition(index)} className={`min-h-11 rounded-xl px-2 py-2 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${position === index ? "bg-amber-300 text-slate-950" : "bg-white/10 text-slate-200"}`}>{label}</button>)}</div></div><div><h3 className="text-lg font-black text-white">{positionLabels[position]}</h3><p className="mt-2 text-sm text-slate-300">{stateText}</p><div className="mt-5"><EnergyBars potential={potential} kinetic={kinetic} labels={[t.potential, t.kinetic]} /></div><div className="mt-5 rounded-xl bg-cyan-300/10 p-3 text-center text-sm font-black text-cyan-200">{position === 0 ? t.changingDown : position === 1 ? t.changingUp : t.changingDown}</div></div></div></Panel>

        <div className="grid gap-4 lg:grid-cols-2"><Panel className="border-emerald-300/20"><h3 className="flex items-center gap-2 font-black text-emerald-300"><CheckCircle2 className="h-5 w-5" />{t.closed}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{t.closedBody}</p><div className="mt-4 flex items-end gap-2"><div className="h-16 flex-1 rounded-t-lg bg-violet-400/70" /><div className="h-8 flex-1 rounded-t-lg bg-cyan-400/70" /><div className="h-16 flex-1 rounded-t-lg bg-violet-400/70" /></div><div className="mt-2 border-t-2 border-emerald-300 text-center text-xs font-bold text-emerald-200">Eₖ + Eₚ = {lang === "bm" ? "malar" : "constant"}</div></Panel><Panel className="border-rose-300/20"><h3 className="flex items-center gap-2 font-black text-rose-300"><MoveDown className="h-5 w-5" />{t.real}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{t.realBody}</p><div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold"><span className="rounded-lg bg-violet-300/10 p-2">{lang === "bm" ? "Tenaga mekanikal" : "Mechanical energy"}</span><ArrowRight className="h-4 w-4 text-slate-500" /><span className="rounded-lg bg-rose-300/10 p-2 text-rose-200">{lang === "bm" ? "Tenaga haba" : "Heat energy"}</span></div></Panel></div>

        <Panel className="border-amber-300/25 bg-gradient-to-br from-amber-300/[0.08] to-transparent"><div className="flex items-center gap-3"><Gauge className="h-8 w-8 text-amber-300" /><div><h3 className="font-black text-white">{t.workedTitle}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{t.workedQuestion}</p></div></div><h4 className="mt-5 text-xs font-black uppercase tracking-[.15em] text-amber-200">{t.examTitle}</h4><div className="mt-3 flex flex-col gap-2">{t.examSteps.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl bg-slate-950/55 p-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-300 text-xs font-black text-slate-950">{index + 1}</span><span className="font-mono text-sm font-bold text-slate-100">{step}</span>{index < t.examSteps.length - 1 && <ArrowDown className="ml-auto h-4 w-4 text-slate-500" />}</div>)}</div></Panel>
      </div>

      <footer className="rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 sm:p-7"><div className="flex items-center gap-3"><Scale className="h-8 w-8 text-cyan-300" /><h2 className="text-xl font-black text-white">{t.recapTitle}</h2></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.recap.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-slate-950/45 p-3 text-sm leading-6 text-slate-200"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />{item}</div>)}</div>{onMarkRead && <button type="button" disabled={isRead} onClick={onMarkRead} className="mt-6 min-h-12 w-full rounded-xl bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:bg-emerald-400"><span className="inline-flex items-center gap-2">{isRead ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}{isRead ? t.marked : t.mark}</span></button>}</footer>
    </div>
  </section>;
}
