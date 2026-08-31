import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BatteryCharging,
  Bolt,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  Gauge,
  House,
  Lightbulb,
  PlugZap,
  RotateCw,
  ShieldCheck,
  Smartphone,
  Sun,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 6",
    title: "Fahami perjalanan tenaga elektrik",
    subtitle: "Ikuti perjalanan tenaga elektrik — daripada cara elektrik dijana, voltan diubah dan dihantar, hingga penggunaan elektrik di rumah.",
    path: [
      { title: "6.1 Penjanaan Tenaga Elektrik", description: "Bagaimana tenaga elektrik dihasilkan daripada pelbagai sumber." },
      { title: "6.2 Transformer", description: "Bagaimana voltan elektrik dinaikkan atau diturunkan." },
      { title: "6.3 Penghantaran & Pengagihan Tenaga Elektrik", description: "Bagaimana elektrik dihantar melalui Grid Nasional hingga ke rumah dengan selamat." },
      { title: "6.4 Pengiraan Kos Penggunaan Elektrik", description: "Bagaimana penggunaan tenaga, kecekapan dan kos elektrik dikira." },
    ],
    bigIdea: "Idea besar",
    how: "Bagaimana ia berlaku",
    key: "Ingat ini",
    try: "Uji diri",
    reveal: "Lihat jawapan",
    hide: "Tutup jawapan",
    sourceTitle: "Dua keluarga sumber tenaga",
    renewable: "Boleh baharu",
    renewableDesc: "Boleh digantikan secara berterusan dan tidak akan habis digunakan.",
    nonrenewable: "Tidak boleh baharu",
    nonrenewableDesc: "Tidak boleh diganti semula dan akhirnya akan habis digunakan.",
    inductionTitle: "Arus aruhan bermula dengan gerakan",
    inductionIdea: "Arus aruhan terhasil apabila konduktor memotong garis medan magnet. Tanpa gerakan relatif, tiada arus aruhan.",
    enter: "Magnet masuk",
    stop: "Magnet berhenti",
    exit: "Magnet keluar",
    needleRight: "Jarum terpesong",
    needleZero: "Jarum kembali sifar",
    needleLeft: "Pesongan bertentangan",
    currentYes: "Arus aruhan terhasil",
    currentNo: "Tiada arus aruhan",
    moveWire: "Alternatif: gerakkan dawai kuprum naik atau turun merentasi medan magnet. Gerakan selari dengan garis medan tidak menghasilkan arus.",
    generatorTitle: "Generator menukar putaran kepada elektrik",
    generatorIdea: "Lihat mesin secara keseluruhan dahulu: angker berputar dalam medan magnet, lalu arus terhasil dan disalurkan ke litar luar.",
    generatorFlow: ["Putaran", "Potong garis medan", "Arus aruhan", "Tenaga elektrik"],
    stationsTitle: "Enam laluan ke penjana",
    stationsHint: "Pilih sebuah stesen untuk melihat mekanisme dan perubahan tenaganya.",
    currentTitle: "Satu arah atau berulang-alik?",
    dc: "Arus terus (a.t.)",
    dcDesc: "Mengalir dalam satu arah sahaja.",
    ac: "Arus ulang-alik (a.u.)",
    acDesc: "Arah aliran berubah-ubah secara berterusan.",
    croTitle: "Apa yang dilukis oleh O.S.K.?",
    croHint: "Tukar input untuk melihat bagaimana dasar-masa mengubah paparan.",
    transformerTitle: "Transformer: lihat lilitan dahulu",
    transformerIdea: "Transformer mengubah voltan arus ulang-alik melalui dua gegelung pada teras besi lembut berlamina. Ia tidak berfungsi dengan a.t. kerana medan magnetnya tidak berubah secara berterusan.",
    primary: "Gegelung primer",
    core: "Teras besi lembut berlamina",
    secondary: "Gegelung sekunder",
    stepUp: "Injak naik",
    stepDown: "Injak turun",
    outputUp: "Voltan output meningkat",
    outputDown: "Voltan output menurun",
    formula: "Selepas visual, barulah rumus",
    worked: "Contoh berperingkat",
    applications: "Mengapa transformer injak turun?",
    gridTitle: "Perjalanan elektrik ke rumah",
    gridIdea: "Voltan dinaikkan untuk perjalanan jauh, kemudian diturunkan berperingkat mengikut keperluan pengguna.",
    whyHigh: "Mengapa voltan tinggi?",
    highFlow: ["Voltan tinggi", "Arus lebih rendah", "Kurang kehilangan haba", "Penghantaran lebih cekap"],
    phaseTitle: "Satu fasa atau tiga fasa?",
    houseTitle: "Elektrik memasuki rumah dalam urutan ini",
    plugTitle: "Palam 3-pin: ikut setiap dawai",
    fuseTitle: "Fius melindungi dengan memutuskan litar",
    fuseIdea: "Fius ialah dawai halus bertakat lebur rendah pada dawai hidup. Apabila arus terlalu tinggi, fius melebur dan menghentikan arus.",
    normal: "1 — Normal",
    excess: "2 — Arus berlebihan",
    protect: "3 — Perlindungan",
    fuseRule: "Rating fius ialah arus maksimum tanpa melebur. Pilih rating sedikit lebih tinggi daripada arus operasi normal.",
    safetyTitle: "MCB, ELCB dan dawai bumi tidak melakukan kerja yang sama",
    earthTitle: "Semasa kerosakan pada perkakas logam",
    costTitle: "Daripada kuasa kepada kos",
    efficiency: "Kecekapan tenaga",
    useful: "Tenaga berguna",
    wasted: "Tenaga dibazirkan",
    better: "Buat pilihan lebih baik",
    mark: "Tandakan Bab 6 Selesai",
    marked: "Selesai ditanda",
  },
  en: {
    eyebrow: "Chapter 6 visual map",
    title: "Understand the journey of electrical energy",
    subtitle: "Follow the journey of electrical energy — from how electricity is generated, transformed and transmitted, to how it is used at home.",
    path: [
      { title: "6.1 Generation of Electricity", description: "How electrical energy is generated from different sources." },
      { title: "6.2 Transformer", description: "How electrical voltage is stepped up or stepped down." },
      { title: "6.3 Transmission & Distribution of Electricity", description: "How electricity travels through the National Grid safely to homes." },
      { title: "6.4 Calculating the Cost of Electricity Consumption", description: "How energy use, efficiency and electricity cost are calculated." },
    ],
    bigIdea: "Big idea",
    how: "How it works",
    key: "Remember this",
    try: "Check yourself",
    reveal: "Reveal answer",
    hide: "Hide answer",
    sourceTitle: "Two families of energy sources",
    renewable: "Renewable",
    renewableDesc: "Can be replaced continuously and will not be used up.",
    nonrenewable: "Non-renewable",
    nonrenewableDesc: "Cannot be replaced and will eventually run out.",
    inductionTitle: "Induced current starts with motion",
    inductionIdea: "An induced current is produced when a conductor cuts magnetic field lines. Without relative motion, there is no induced current.",
    enter: "Magnet moves in",
    stop: "Magnet stops",
    exit: "Magnet moves out",
    needleRight: "Needle deflects",
    needleZero: "Needle returns to zero",
    needleLeft: "Opposite deflection",
    currentYes: "Induced current produced",
    currentNo: "No induced current",
    moveWire: "Alternative: move a copper wire up or down across the magnetic field. Motion parallel to the field lines produces no current.",
    generatorTitle: "A generator turns rotation into electricity",
    generatorIdea: "See the whole machine first: an armature rotates in a magnetic field, producing current that flows to the external circuit.",
    generatorFlow: ["Rotation", "Cut field lines", "Induced current", "Electrical energy"],
    stationsTitle: "Six routes to the generator",
    stationsHint: "Choose a power station to see its mechanism and energy changes.",
    currentTitle: "One direction or alternating?",
    dc: "Direct current (d.c.)",
    dcDesc: "Flows in one direction only.",
    ac: "Alternating current (a.c.)",
    acDesc: "Its direction changes continuously.",
    croTitle: "What does a C.R.O. draw?",
    croHint: "Change the input to see how the time-base changes the display.",
    transformerTitle: "Transformer: see the turns first",
    transformerIdea: "A transformer changes a.c. voltage using two coils on a laminated soft-iron core. It does not work with d.c. because its magnetic field does not change continuously.",
    primary: "Primary coil",
    core: "Laminated soft-iron core",
    secondary: "Secondary coil",
    stepUp: "Step-up",
    stepDown: "Step-down",
    outputUp: "Output voltage increases",
    outputDown: "Output voltage decreases",
    formula: "After the visual, use the equation",
    worked: "Worked example, step by step",
    applications: "Why use a step-down transformer?",
    gridTitle: "Electricity's journey to your home",
    gridIdea: "Voltage is raised for the long journey, then lowered in stages for each type of consumer.",
    whyHigh: "Why high voltage?",
    highFlow: ["High voltage", "Lower current", "Less heat loss", "More efficient transmission"],
    phaseTitle: "Single phase or three phase?",
    houseTitle: "Electricity enters a house in this order",
    plugTitle: "3-pin plug: follow each wire",
    fuseTitle: "A fuse protects by opening the circuit",
    fuseIdea: "A fuse is a thin, low-melting-point wire in the live wire. When current is too high, it melts and stops the current.",
    normal: "1 — Normal",
    excess: "2 — Excess current",
    protect: "3 — Protection",
    fuseRule: "Fuse rating is the maximum current it carries without melting. Choose a rating just above the normal operating current.",
    safetyTitle: "MCB, ELCB and the earth wire do different jobs",
    earthTitle: "When a metal appliance develops a fault",
    costTitle: "From power to cost",
    efficiency: "Energy efficiency",
    useful: "Useful energy",
    wasted: "Wasted energy",
    better: "Make a better choice",
    mark: "Mark Chapter 6 as Read",
    marked: "Marked as read",
  },
} as const;

const stations = {
  bm: [
    ["Terma", "Diesel, gas asli atau arang batu", "Pembakaran → air menjadi stim → turbin → generator", "Kimia → haba → kinetik → elektrik"],
    ["Solar", "Sinaran matahari", "Cahaya matahari → panel suria → elektrik", "Cahaya → elektrik"],
    ["Hidroelektrik", "Air empangan", "Air tinggi → air mengalir → turbin → generator", "Keupayaan graviti → kinetik → elektrik"],
    ["Angin", "Udara bergerak", "Angin → bilah kincir → turbin → generator", "Kinetik → elektrik"],
    ["Nuklear", "Uranium", "Pembelahan nuklear → haba → stim → turbin → generator", "Nuklear → haba → kinetik → elektrik"],
    ["Biojisim", "Hampas padi, sabut sawit atau metana", "Biojisim → gas dibakar → stim → turbin → generator", "Kimia → haba → kinetik → elektrik"],
  ],
  en: [
    ["Thermal", "Diesel, natural gas or coal", "Combustion → water becomes steam → turbine → generator", "Chemical → heat → kinetic → electrical"],
    ["Solar", "Sunlight", "Sunlight → solar panel → electricity", "Light → electrical"],
    ["Hydroelectric", "Water in a dam", "Stored water → flowing water → turbine → generator", "Gravitational potential → kinetic → electrical"],
    ["Wind", "Moving air", "Wind → blades → turbine → generator", "Kinetic → electrical"],
    ["Nuclear", "Uranium", "Nuclear fission → heat → steam → turbine → generator", "Nuclear → heat → kinetic → electrical"],
    ["Biomass", "Rice husks, oil-palm fibre or methane", "Biomass → gas burns → steam → turbine → generator", "Chemical → heat → kinetic → electrical"],
  ],
} as const;

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_18px_60px_rgba(2,6,23,.28)] sm:p-6 ${className}`}>{children}</div>;
}

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return <div className="space-y-2"><div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-bold tracking-[.16em] text-cyan-200">{number}</div><h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>{subtitle && <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{subtitle}</p>}</div>;
}

function Flow({ items }: { items: readonly string[] }) {
  return <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">{items.map((item, index) => <div className="contents" key={item}><div className="min-h-14 rounded-xl border border-cyan-300/20 bg-cyan-300/8 px-3 py-3 text-center text-sm font-bold text-cyan-50">{item}</div>{index < items.length - 1 && <><ArrowDown className="mx-auto h-5 w-5 text-amber-300 sm:hidden"/><ArrowRight className="hidden h-5 w-5 text-amber-300 sm:block"/></>}</div>)}</div>;
}

function Check({ question, answer, lang }: { question: string; answer: string; lang: Lang }) {
  const [open, setOpen] = useState(false); const t = copy[lang];
  return <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-violet-200">{t.try}</p><p className="mt-2 text-sm font-semibold text-white">{question}</p><button type="button" onClick={() => setOpen(v => !v)} className="mt-3 min-h-11 rounded-full bg-violet-300 px-4 text-sm font-bold text-slate-950 transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{open ? t.hide : t.reveal}</button>{open && <p className="mt-3 rounded-xl bg-slate-950/60 p-3 text-sm leading-6 text-violet-100" aria-live="polite">{answer}</p>}</div>;
}

function InductionDiagram({ lang }: { lang: Lang }) {
  const t = copy[lang]; const [state, setState] = useState<"in"|"stop"|"out">("in");
  const labels = { in: [t.enter, t.needleRight, t.currentYes], stop: [t.stop, t.needleZero, t.currentNo], out: [t.exit, t.needleLeft, t.currentYes] } as const;
  const needle = state === "in" ? 32 : state === "out" ? -32 : 0;
  return <Panel className="overflow-hidden bg-gradient-to-br from-cyan-500/10 via-slate-950/70 to-violet-500/10"><div className="grid grid-cols-3 gap-2">{(["in","stop","out"] as const).map(s => <button key={s} type="button" onClick={() => setState(s)} className={`min-h-12 rounded-xl border px-2 text-xs font-bold transition-colors duration-200 ${state===s ? "border-amber-300 bg-amber-300 text-slate-950" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"}`}>{labels[s][0]}</button>)}</div><div className="relative mt-6 min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-5"><div className="absolute inset-0 opacity-25" style={{backgroundImage:"linear-gradient(rgba(34,211,238,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.16) 1px,transparent 1px)",backgroundSize:"24px 24px"}}/><div className="relative flex min-h-44 items-center justify-between gap-3"><div className={`relative flex h-16 w-28 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 from-50% to-blue-500 to-50% font-black text-white shadow-lg transition-transform duration-300 ease-out ${state==="in"?"translate-x-12":state==="out"?"-translate-x-1":"translate-x-9"}`}><span className="absolute left-5">N</span><span className="absolute right-5">S</span><span className={`absolute -bottom-9 text-amber-300 ${state==="stop"?"opacity-0":"opacity-100"}`}>{state==="out"?"←":"→"}</span></div><div className="flex h-32 w-28 shrink-0 items-center justify-center rounded-[45%] border-[10px] border-cyan-300/70 shadow-[0_0_30px_rgba(34,211,238,.28)]"><span className="text-xs font-bold text-cyan-100">{lang==="bm"?"Solenoid":"Coil"}</span></div><div className="flex w-28 shrink-0 flex-col items-center"><Gauge className="h-16 w-16 text-amber-300"/><div className="h-9 w-1 origin-bottom rounded-full bg-amber-300 transition-transform duration-300" style={{transform:`rotate(${needle}deg)`}}/><span className="mt-1 text-[10px] font-bold text-slate-300">Galvanometer</span></div></div></div><div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="rounded-xl bg-amber-300/10 p-3 text-sm font-bold text-amber-100">{labels[state][1]}</div><div className="rounded-xl bg-cyan-300/10 p-3 text-sm font-bold text-cyan-100">{labels[state][2]}</div></div></Panel>;
}

function GeneratorDiagram({ lang }: { lang: Lang }) {
  const labels = lang === "bm" ? ["Magnet", "Angker", "Gandar", "Komutator", "Berus karbon"] : ["Magnet", "Armature", "Shaft", "Commutator", "Carbon brushes"];
  return <Panel><div className="relative mx-auto min-h-72 max-w-2xl overflow-hidden rounded-2xl bg-slate-900 p-4"><div className="absolute left-4 top-14 h-36 w-20 rounded-xl bg-gradient-to-b from-rose-500 to-blue-500 p-2 text-center text-xs font-black text-white">N<br/><span className="inline-block pt-20">S</span></div><div className="absolute right-4 top-14 h-36 w-20 rounded-xl bg-gradient-to-b from-rose-500 to-blue-500 p-2 text-center text-xs font-black text-white">N<br/><span className="inline-block pt-20">S</span></div><div className="absolute left-1/2 top-12 h-40 w-28 -translate-x-1/2 rounded-xl border-[7px] border-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.3)]"><RotateCw className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-amber-300 motion-safe:animate-spin [animation-duration:3s]"/></div><div className="absolute left-1/2 top-52 h-10 w-10 -translate-x-1/2 rounded-full border-8 border-amber-300"/><div className="absolute left-1/2 top-[11.5rem] h-12 w-1 -translate-x-1/2 bg-slate-200"/><div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-12"><span className="h-7 w-2 rounded bg-slate-200"/><span className="h-7 w-2 rounded bg-slate-200"/></div><div className="absolute inset-x-0 bottom-1 flex justify-center gap-2 text-[9px] text-slate-300"><span>{labels[3]}</span><span>•</span><span>{labels[4]}</span></div></div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{labels.map(label=><div key={label} className="rounded-xl border border-white/10 bg-white/5 p-2 text-center text-xs font-bold text-slate-200">{label}</div>)}</div></Panel>;
}

function TransformerVisual({ lang, mode }: { lang: Lang; mode: "up"|"down" }) {
  const t=copy[lang]; const up=mode==="up"; const primaryTurns=up?3:7; const secondaryTurns=up?7:3;
  return <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"><div className="mb-3 flex items-center justify-between"><span className="font-black text-white">{up?t.stepUp:t.stepDown}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${up?"bg-emerald-300 text-emerald-950":"bg-amber-300 text-amber-950"}`}>{up?t.outputUp:t.outputDown}</span></div><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"><div className="text-center"><div className="mx-auto flex h-36 w-16 items-center justify-center rounded-xl border-8 border-slate-500">{Array.from({length:primaryTurns}).map((_,i)=><span key={i} className="-mx-1 h-20 w-1 rounded bg-cyan-300"/>)}</div><p className="mt-2 text-xs font-bold text-cyan-100">{t.primary}</p><p className="text-xs text-slate-400">Nₚ {up?"<":">"} Nₛ</p></div><div className="flex h-44 w-12 items-center justify-center rounded-lg bg-slate-500/80 text-center text-[9px] font-bold text-white [writing-mode:vertical-rl]">{t.core}</div><div className="text-center"><div className="mx-auto flex h-36 w-16 items-center justify-center rounded-xl border-8 border-slate-500">{Array.from({length:secondaryTurns}).map((_,i)=><span key={i} className="-mx-1 h-20 w-1 rounded bg-violet-300"/>)}</div><p className="mt-2 text-xs font-bold text-violet-100">{t.secondary}</p><p className="text-xs text-slate-400">Vₚ {up?"<":">"} Vₛ</p></div></div></div>;
}

function WaveScreen({ lang }: { lang: Lang }) {
  const [screen,setScreen]=useState<"dc"|"ac"|"acoff">("dc");
  const options=lang==="bm"?["a.t. + dasar-masa HIDUP","a.u. + dasar-masa HIDUP","a.u. + dasar-masa MATI"]:["d.c. + time-base ON","a.c. + time-base ON","a.c. + time-base OFF"];
  return <Panel><div className="grid gap-2 sm:grid-cols-3">{(["dc","ac","acoff"] as const).map((v,i)=><button key={v} onClick={()=>setScreen(v)} className={`min-h-12 rounded-xl px-3 text-xs font-bold ${screen===v?"bg-emerald-300 text-emerald-950":"bg-white/5 text-slate-200"}`}>{options[i]}</button>)}</div><svg viewBox="0 0 600 220" className="mt-4 w-full rounded-2xl border-8 border-slate-700 bg-[#071b20]" role="img" aria-label={options[["dc","ac","acoff"].indexOf(screen)]}><g stroke="#164e63" strokeWidth="1">{[50,100,150,200,250,300,350,400,450,500,550].map(x=><line key={x} x1={x} y1="0" x2={x} y2="220"/>)}{[40,80,120,160,200].map(y=><line key={y} x1="0" y1={y} x2="600" y2={y}/>)}</g>{screen==="dc"?<line x1="20" y1="75" x2="580" y2="75" stroke="#6ee7b7" strokeWidth="5"/>:screen==="acoff"?<line x1="300" y1="25" x2="300" y2="195" stroke="#6ee7b7" strokeWidth="5"/>:<path d="M20 110 C70 20 120 20 170 110 S270 200 320 110 S420 20 470 110 S570 200 580 110" fill="none" stroke="#6ee7b7" strokeWidth="5"/>}</svg><div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300 sm:grid-cols-4 lg:grid-cols-7">{(lang==="bm"?["Gandaan-Y: skala voltan","Pesongan-Y: kedudukan menegak","Pesongan-X: kedudukan mengufuk","Suis a.t./a.u.: jenis input","Dasar-masa: imbasan mengufuk","Keamatan: kecerahan","Fokus: ketajaman"]:["Y-gain: voltage scale","Y-position: vertical position","X-position: horizontal position","d.c./a.c. switch: input type","Time-base: horizontal sweep","Intensity: brightness","Focus: sharpness"]).map(x=><div key={x} className="rounded-xl bg-white/5 p-3">{x}</div>)}</div></Panel>;
}

function FuseProcess({ lang }: { lang: Lang }) {
  const t=copy[lang]; const states=lang==="bm"?[[t.normal,"Arus normal","Fius utuh","Perkakas berfungsi"],[t.excess,"Arus terlalu tinggi","Dawai fius menjadi panas","Takat lebur dicapai"],[t.protect,"Fius melebur","Litar terbuka","Arus berhenti"]]:[[t.normal,"Normal current","Fuse intact","Appliance works"],[t.excess,"Current too high","Fuse wire heats up","Melting point reached"],[t.protect,"Fuse melts","Circuit opens","Current stops"]];
  return <div className="grid gap-3 lg:grid-cols-3">{states.map((s,i)=><div key={s[0]} className={`rounded-2xl border p-4 ${i===2?"border-rose-300/30 bg-rose-300/10":"border-amber-300/20 bg-amber-300/7"}`}><div className="flex items-center gap-3"><Bolt className={`h-6 w-6 ${i===2?"text-rose-300":"text-amber-300"}`}/><h4 className="font-black text-white">{s[0]}</h4></div><div className="mt-4 flex flex-col items-center gap-2">{s.slice(1).map((x,j)=><div className="contents" key={x}><div className="w-full rounded-xl bg-slate-950/60 p-3 text-center text-sm font-semibold text-slate-100">{x}</div>{j<2&&<ArrowDown className="h-4 w-4 text-slate-400"/>}</div>)}</div></div>)}</div>;
}

export function ScienceF3Chapter6VisualNotesBlock({id,content,lang,isRead,onMarkRead}:{id?:string;content:ScienceF3InteractiveContent;lang:Lang;storageKey?:string;isRead?:boolean;onMarkRead?:()=>void}) {
  const t=copy[lang]; const [station,setStation]=useState(0); const stationData=stations[lang][station];
  const renew=lang==="bm"?["Hidro","Ombak","Solar","Pasang surut","Angin","Biojisim","Geotermal"]:["Hydro","Wave","Solar","Tidal","Wind","Biomass","Geothermal"];
  const nonrenew=lang==="bm"?["Nuklear","Arang batu","Gas asli","Petroleum"]:["Nuclear","Coal","Natural gas","Petroleum"];
  const houseFlow=lang==="bm"?["Kabel utama","Kotak fius utama","Meter elektrik","Suis utama","ELCB","MCB","Soket / perkakas"]:["Main cable","Main fuse box","Electricity meter","Main switch","ELCB","MCB","Sockets / appliances"];
  return <section id={id} data-lang={lang} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#071229] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.18),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,.16),transparent_34%)]"/>
    <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
      <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-cyan-400/15 via-slate-950/40 to-violet-400/15 p-5 sm:p-8"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-cyan-200"><Zap className="h-4 w-4"/>{t.eyebrow}</div><h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-[1.02] text-white sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p><div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.path.map((item,i)=><div key={item.title} className="relative min-h-36 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="block text-xs font-black tracking-[.14em] text-cyan-300">0{i+1}</span><h2 className="mt-2 text-sm font-black leading-5 text-white">{item.title}</h2><p className="mt-2 text-xs font-medium leading-5 text-slate-300">{item.description}</p>{i<3&&<ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-amber-300/30 bg-[#071229] p-1 text-amber-300 xl:block"/>}</div>)}</div></header>

      <div className="space-y-6"><SectionTitle number="6.1" title={lang==="bm"?"Penjanaan tenaga elektrik":"Generation of electricity"}/><Panel><h3 className="text-lg font-black text-white">{t.sourceTitle}</h3><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-emerald-300/25 bg-emerald-300/8 p-4"><div className="flex items-center gap-2 font-black text-emerald-200"><Sun className="h-5 w-5"/>{t.renewable}</div><p className="mt-2 text-sm text-slate-300">{t.renewableDesc}</p><div className="mt-4 flex flex-wrap gap-2">{renew.map(x=><span key={x} className="rounded-full bg-emerald-300/15 px-3 py-1.5 text-xs font-bold text-emerald-100">{x}</span>)}</div></div><div className="rounded-2xl border border-orange-300/25 bg-orange-300/8 p-4"><div className="flex items-center gap-2 font-black text-orange-200"><Factory className="h-5 w-5"/>{t.nonrenewable}</div><p className="mt-2 text-sm text-slate-300">{t.nonrenewableDesc}</p><div className="mt-4 flex flex-wrap gap-2">{nonrenew.map(x=><span key={x} className="rounded-full bg-orange-300/15 px-3 py-1.5 text-xs font-bold text-orange-100">{x}</span>)}</div></div></div><p className="mt-4 text-xs leading-5 text-slate-400">{lang==="bm"?"Contoh Malaysia: Bakun (hidro), Tuanku Jaafar (gas asli), Manjung (arang batu), TSH Bio-Energy (biojisim), Gelugor (diesel), dan Pulau Perhentian Kecil (angin + solar + diesel).":"Malaysian examples: Bakun (hydro), Tuanku Jaafar (natural gas), Manjung (coal), TSH Bio-Energy (biomass), Gelugor (diesel), and Pulau Perhentian Kecil (wind + solar + diesel)."}</p></Panel>
        <SectionTitle number="6.1A" title={t.inductionTitle} subtitle={t.inductionIdea}/><InductionDiagram lang={lang}/><Panel><p className="text-sm font-semibold leading-6 text-cyan-100">{t.moveWire}</p></Panel>
        <SectionTitle number="6.1B" title={t.generatorTitle} subtitle={t.generatorIdea}/><GeneratorDiagram lang={lang}/><Flow items={t.generatorFlow}/>
        <SectionTitle number="6.1C" title={t.stationsTitle} subtitle={t.stationsHint}/><Panel><div className="flex gap-2 overflow-x-auto pb-2">{stations[lang].map((s,i)=><button key={s[0]} onClick={()=>setStation(i)} className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-bold ${station===i?"bg-cyan-300 text-slate-950":"bg-white/5 text-slate-200"}`}>{s[0]}</button>)}</div><div className="mt-5 rounded-2xl bg-white/5 p-4"><div className="flex items-center gap-3"><div className="rounded-xl bg-cyan-300/10 p-3"><Factory className="h-7 w-7 text-cyan-200"/></div><div><h4 className="font-black text-white">{stationData[0]}</h4><p className="text-sm text-slate-400">{stationData[1]}</p></div></div><div className="mt-4 space-y-3"><div className="rounded-xl border border-cyan-300/15 bg-cyan-300/8 p-3 text-sm font-semibold text-cyan-50">{stationData[2]}</div><div className="rounded-xl border border-violet-300/15 bg-violet-300/8 p-3 text-sm font-semibold text-violet-50">{stationData[3]}</div></div></div><div className="mt-3 flex items-start gap-3 rounded-xl border border-blue-300/15 bg-blue-300/8 p-3"><Waves className="h-5 w-5 shrink-0 text-blue-200"/><p className="text-xs leading-5 text-slate-300">{lang==="bm"?"Tenaga ombak: gerakan ombak naik dan turun menjana tekanan udara atau air untuk menggerakkan turbin.":"Wave energy: the rise and fall of sea waves creates air or water pressure that drives a turbine."}</p></div></Panel>
        <SectionTitle number="6.1D" title={t.currentTitle}/><div className="grid gap-4 md:grid-cols-2"><Panel><div className="flex items-center gap-3"><BatteryCharging className="h-7 w-7 text-cyan-300"/><h3 className="font-black text-white">{t.dc}</h3></div><div className="my-5 flex items-center"><div className="h-1 flex-1 bg-cyan-300"/><ArrowRight className="h-8 w-8 text-cyan-300"/></div><p className="text-sm text-slate-300">{t.dcDesc}</p><p className="mt-3 text-xs text-slate-400">{lang==="bm"?"Sumber: sel suria, akumulator, bateri. Alat: lampu suluh, kalkulator, kereta mainan.":"Sources: solar cells, accumulators, batteries. Devices: torchlights, calculators, toy cars."}</p></Panel><Panel><div className="flex items-center gap-3"><Waves className="h-7 w-7 text-violet-300"/><h3 className="font-black text-white">{t.ac}</h3></div><svg viewBox="0 0 400 80" className="my-3 w-full"><path d="M0 40 C35 0 65 0 100 40 S165 80 200 40 S265 0 300 40 S365 80 400 40" fill="none" stroke="#c4b5fd" strokeWidth="6"/></svg><p className="text-sm text-slate-300">{t.acDesc}</p><p className="mt-3 text-xs text-slate-400">{lang==="bm"?"Sumber: penjana komersial. Alat: pembakar roti, pengering rambut, pendingin hawa.":"Source: commercial generators. Devices: toasters, hair dryers, air conditioners."}</p></Panel></div>
        <SectionTitle number="6.1E" title={t.croTitle} subtitle={t.croHint}/><WaveScreen lang={lang}/>
        <Check lang={lang} question={content.sections[0]?.checks[0]?.question ?? ""} answer={content.sections[0]?.checks[0]?.hint ?? ""}/>
      </div>

      <div className="space-y-6"><SectionTitle number="6.2" title={t.transformerTitle} subtitle={t.transformerIdea}/><div className="grid gap-4 lg:grid-cols-2"><TransformerVisual lang={lang} mode="up"/><TransformerVisual lang={lang} mode="down"/></div><Panel><h3 className="text-lg font-black text-white">{t.formula}</h3><div className="mt-4 rounded-2xl bg-cyan-300/10 p-5 text-center font-mono text-2xl font-black text-cyan-100">Vₚ / Vₛ = Nₚ / Nₛ</div><div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300 sm:grid-cols-4"><div>Vₚ = {lang==="bm"?"voltan primer":"primary voltage"}</div><div>Vₛ = {lang==="bm"?"voltan sekunder":"secondary voltage"}</div><div>Nₚ = {lang==="bm"?"lilitan primer":"primary turns"}</div><div>Nₛ = {lang==="bm"?"lilitan sekunder":"secondary turns"}</div></div><h4 className="mt-6 font-black text-white">{t.worked}</h4><div className="mt-3 grid gap-2 sm:grid-cols-4">{(lang==="bm"?["Diberi: Vₚ=240 V, Vₛ=40 V, Nₚ=120","240/40 = 120/Nₛ","6 = 120/Nₛ","Nₛ = 20 lilitan"]:["Given: Vₚ=240 V, Vₛ=40 V, Nₚ=120","240/40 = 120/Nₛ","6 = 120/Nₛ","Nₛ = 20 turns"]).map((x,i)=><div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-semibold text-slate-200" key={x}><span className="mb-1 block text-xs text-amber-300">0{i+1}</span>{x}</div>)}</div></Panel><Panel><h3 className="font-black text-white">{t.applications}</h3><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="flex gap-3 rounded-xl bg-white/5 p-4"><Smartphone className="h-7 w-7 shrink-0 text-cyan-300"/><p className="text-sm text-slate-300"><strong className="text-white">{lang==="bm"?"Pengecas telefon":"Phone charger"}:</strong> {lang==="bm"?"menurunkan 240 V a.u. kepada voltan kecil, kemudian litar rektifikasi menukarnya kepada a.t.":"steps 240 V a.c. down to a low voltage, then a rectifier circuit converts it to d.c."}</p></div><div className="flex gap-3 rounded-xl bg-white/5 p-4"><Wind className="h-7 w-7 shrink-0 text-violet-300"/><p className="text-sm text-slate-300"><strong className="text-white">{lang==="bm"?"Pengawal kipas":"Fan regulator"}:</strong> {lang==="bm"?"gelung multi-ketukan membekalkan voltan 2, 4, 6, 8 atau 10 V untuk mengubah kelajuan.":"a multi-tapped coil supplies 2, 4, 6, 8 or 10 V to vary speed."}</p></div></div></Panel><Check lang={lang} question={content.sections[1]?.checks[0]?.question ?? ""} answer={content.sections[1]?.checks[0]?.hint ?? ""}/></div>

      <div className="space-y-6"><SectionTitle number="6.3" title={t.gridTitle} subtitle={t.gridIdea}/><Panel><Flow items={lang==="bm"?["Stesen jana kuasa · 11 / 25 kV","Transformer injak naik","Grid Nasional · 132 / 275 / 500 kV","Transformer injak turun"]:["Power station · 11 / 25 kV","Step-up transformer","National Grid · 132 / 275 / 500 kV","Step-down transformer"]}/><div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">{(lang==="bm"?[["Industri berat","33 kV"],["Industri ringan","11 kV"],["Pejabat / hospital","415 V · tiga fasa"],["Rumah","240 V · satu fasa"]]:[["Heavy industry","33 kV"],["Light industry","11 kV"],["Office / hospital","415 V · three phase"],["Home","240 V · single phase"]]).map(x=><div key={x[0]} className="rounded-xl border border-violet-300/15 bg-violet-300/8 p-3 text-center"><div className="text-xs font-black text-white">{x[0]}</div><div className="mt-1 text-xs text-violet-200">{x[1]}</div></div>)}</div><p className="mt-3 text-xs leading-5 text-slate-400">{lang==="bm"?"Lapangan suis di hujung grid membolehkan arus diputus atau dialihkan untuk penyelenggaraan tanpa memutuskan semua pengguna.":"A switch zone at the end of the grid lets current be isolated or rerouted for maintenance without cutting every consumer's supply."}</p><div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/8 p-4"><h3 className="font-black text-amber-100">{t.whyHigh}</h3><div className="mt-3"><Flow items={t.highFlow}/></div><p className="mt-3 text-xs text-slate-400">P<sub>lost</sub> = I²R</p></div></Panel>
        <SectionTitle number="6.3A" title={t.phaseTitle}/><div className="grid gap-4 sm:grid-cols-2"><Panel><House className="h-7 w-7 text-cyan-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Satu fasa":"Single phase"}</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Kediaman domestik dengan penggunaan tidak melebihi 10 kW atau 50 A.":"Domestic homes using no more than 10 kW or 50 A."}</p></Panel><Panel><Building2 className="h-7 w-7 text-violet-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Tiga fasa":"Three phase"}</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Komersial, pejabat, kilang atau penggunaan melebihi 10 kW atau 50 A.":"Commercial buildings, offices, factories, or demand above 10 kW or 50 A."}</p></Panel></div>
        <SectionTitle number="6.3B" title={t.houseTitle}/><Panel><Flow items={houseFlow}/><p className="mt-4 text-xs leading-5 text-slate-400">{lang==="bm"?"Meter menyukat tenaga dalam kWj; suis utama mengawal bekalan; ELCB mengesan kebocoran ke bumi; MCB mengasingkan sub-litar dan memutuskan arus berlebihan atau litar pintas.":"The meter measures energy in kWh; the main switch controls supply; the ELCB detects leakage to earth; MCBs isolate sub-circuits and cut excess current or short circuits."}</p></Panel>
        <SectionTitle number="6.3C" title={t.plugTitle}/><Panel><div className="grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-amber-700 bg-amber-900/25 p-4"><div className="h-2 rounded-full bg-amber-700"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Perang — dawai hidup":"Brown — live wire"}</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Membawa 240 V dan melalui fius sebelum ke perkakas.":"Carries 240 V and passes through the fuse before the appliance."}</p></div><div className="rounded-xl border border-blue-400/30 bg-blue-400/10 p-4"><div className="h-2 rounded-full bg-blue-500"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Biru — dawai neutral":"Blue — neutral wire"}</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Melengkapkan litar dan membawa arus balik pada 0 V.":"Completes the circuit and carries return current at 0 V."}</p></div><div className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-4"><div className="h-2 rounded-full bg-[repeating-linear-gradient(90deg,#facc15_0_12px,#22c55e_12px_24px)]"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Kuning/hijau — dawai bumi":"Yellow/green — earth wire"}</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Menyediakan laluan selamat ke bumi jika dawai hidup menyentuh badan logam.":"Provides a safe path to earth if the live wire touches a metal casing."}</p></div></div><p className="mt-4 text-xs text-slate-400">{lang==="bm"?"Palam 2-pin digunakan untuk alat berkuasa rendah dengan kerangka plastik dwipenebat; dawai bumi tidak diperlukan.":"A 2-pin plug is used for low-power, double-insulated plastic-cased appliances; no earth wire is required."}</p></Panel>
        <SectionTitle number="6.3D" title={t.fuseTitle} subtitle={t.fuseIdea}/><FuseProcess lang={lang}/><Panel><div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className="rounded-xl bg-amber-300/10 p-4 text-center text-sm font-bold">{lang==="bm"?"Dawai hidup":"Live wire"}</div><ArrowRight className="mx-auto hidden text-amber-300 sm:block"/><div className="rounded-xl bg-rose-300/10 p-4 text-center text-sm font-bold">{lang==="bm"?"Fius":"Fuse"}</div><ArrowRight className="mx-auto hidden text-amber-300 sm:block"/><div className="rounded-xl bg-cyan-300/10 p-4 text-center text-sm font-bold">{lang==="bm"?"Perkakas":"Appliance"}</div></div><p className="mt-4 text-sm font-semibold text-amber-100">{t.fuseRule}</p><div className="mt-4 grid gap-2 sm:grid-cols-4">{["I = P / V","I = 2200 / 240","I = 9.17 A",lang==="bm"?"Pilih fius 10 A atau 13 A":"Choose a 10 A or 13 A fuse"].map((x,i)=><div key={x} className="rounded-xl bg-white/5 p-3 text-sm font-bold text-slate-200"><span className="block text-[10px] text-cyan-300">0{i+1}</span>{x}</div>)}</div></Panel>
        <SectionTitle number="6.3E" title={t.safetyTitle}/><div className="grid gap-4 lg:grid-cols-3"><Panel><ShieldCheck className="h-7 w-7 text-amber-300"/><h3 className="mt-2 font-black text-white">MCB</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Mengesan arus berlebihan atau litar pintas. Melindungi litar dan pendawaian serta boleh ditetapkan semula.":"Detects excess current or a short circuit. Protects circuits and wiring and can be reset."}</p></Panel><Panel><ShieldCheck className="h-7 w-7 text-cyan-300"/><h3 className="mt-2 font-black text-white">ELCB</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Mengesan kebocoran arus ke bumi dan memutuskan bekalan untuk melindungi pengguna.":"Detects current leaking to earth and cuts the supply to protect the user."}</p></Panel><Panel><PlugZap className="h-7 w-7 text-emerald-300"/><h3 className="mt-2 font-black text-white">{lang==="bm"?"Dawai bumi":"Earth wire"}</h3><p className="mt-2 text-sm text-slate-300">{lang==="bm"?"Kerosakan: dawai hidup → badan logam → dawai bumi → Bumi. Perlindungan diaktifkan dan pengguna dielakkan daripada kejutan.":"Fault: live wire → metal casing → earth wire → Earth. Protection operates and helps prevent electric shock."}</p></Panel></div><Panel><h3 className="font-black text-white">{lang==="bm"?"Konduktor kilat":"Lightning conductor"}</h3><Flow items={lang==="bm"?["Kilat","Konduktor logam","Laluan rintangan rendah","Bumi"]:["Lightning","Metal conductor","Low-resistance path","Earth"]}/></Panel><Check lang={lang} question={content.sections[2]?.checks[0]?.question ?? ""} answer={content.sections[2]?.checks[0]?.hint ?? ""}/></div>

      <div className="space-y-6"><SectionTitle number="6.4" title={t.costTitle}/><Panel><h3 className="font-black text-white">{t.efficiency}</h3><div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr]"><div className="rounded-xl bg-cyan-300/10 p-4 text-center"><p className="text-3xl font-black text-cyan-100">100%</p><p className="text-xs text-slate-300">{lang==="bm"?"Tenaga input":"Energy input"}</p></div><ArrowRight className="mx-auto hidden self-center text-amber-300 sm:block"/><div className="grid grid-cols-2 gap-2"><div className="rounded-xl bg-emerald-300/10 p-4 text-center font-bold text-emerald-100">{t.useful}</div><div className="rounded-xl bg-rose-300/10 p-4 text-center font-bold text-rose-100">{t.wasted}</div></div></div><div className="mt-4 rounded-xl bg-white/5 p-4 text-center font-mono text-sm font-bold text-white sm:text-lg">{lang==="bm"?"Kecekapan = tenaga output berguna / tenaga input × 100%":"Efficiency = useful energy output / energy input × 100%"}</div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded-xl bg-rose-300/8 p-3"><strong className="block text-white">{lang==="bm"?"Filamen":"Filament"}</strong><span className="text-rose-200">10%</span></div><div className="rounded-xl bg-amber-300/8 p-3"><strong className="block text-white">CFL</strong><span className="text-amber-200">≈50%</span></div><div className="rounded-xl bg-emerald-300/8 p-3"><strong className="block text-white">LED</strong><span className="text-emerald-200">≈90%</span></div></div><div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/8 p-4"><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-200">{lang==="bm"?"Label Cekap Tenaga · Suruhanjaya Tenaga":"Energy Efficiency Label · Energy Commission"}</p><div className="mt-3 flex items-end gap-1" aria-label={lang==="bm"?"Skala satu hingga lima bintang":"One-to-five-star scale"}>{[1,2,3,4,5].map(n=><div key={n} className="flex-1 rounded-t-md bg-gradient-to-t from-amber-400 to-emerald-300 p-2 text-center font-black text-slate-950" style={{height:`${36+n*7}px`}}>{n}★</div>)}</div><p className="mt-2 text-xs text-slate-300">{lang==="bm"?"1 bintang = paling kurang cekap · 5 bintang = paling cekap":"1 star = least efficient · 5 stars = most efficient"}</p></div></Panel>
        <div className="grid gap-4 md:grid-cols-2"><Panel><h3 className="font-black text-white">{lang==="bm"?"Kuasa elektrik":"Electrical power"}</h3><div className="mt-3 rounded-xl bg-cyan-300/10 p-4 text-center font-mono text-2xl font-black text-cyan-100">P = VI</div><div className="mt-3 space-y-2 text-sm text-slate-300"><p>P = 150 W, V = 250 V</p><p>I = P/V</p><p>I = 150/250 = <strong className="text-white">0.6 A</strong></p></div></Panel><Panel><h3 className="font-black text-white">{lang==="bm"?"Tenaga elektrik":"Electrical energy"}</h3><div className="mt-3 rounded-xl bg-violet-300/10 p-4 text-center font-mono text-2xl font-black text-violet-100">E = Pt</div><div className="mt-3 space-y-2 text-sm text-slate-300"><p>1 kW = 1000 W</p><p>1 kWh / 1 kWj = 1 {lang==="bm"?"unit elektrik":"unit of electricity"}</p></div></Panel></div>
        <Panel><h3 className="font-black text-white">{lang==="bm"?"Kalkulator visual kos":"Visual cost calculation"}</h3><div className="mt-4 grid gap-2 sm:grid-cols-4">{(lang==="bm"?["Peranti: 80 W selama 3 jam","80 W ÷ 1000 = 0.08 kW","0.08 × 3 = 0.24 kWj","0.24 × kadar tarif = kos"]:["Device: 80 W for 3 hours","80 W ÷ 1000 = 0.08 kW","0.08 × 3 = 0.24 kWh","0.24 × tariff rate = cost"]).map((x,i)=><div key={x} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-bold text-slate-200"><span className="block text-[10px] text-amber-300">{i===0?(lang==="bm"?"DIBERI":"GIVEN"):`STEP 0${i}`}</span>{x}</div>)}</div><p className="mt-4 text-xs text-slate-400">{lang==="bm"?"Contoh rumah lengkap: 2.0 kW × 5 j + 0.15 kW × 4 j + 0.1 kW × 8 j = 11.4 kWj sehari. Pada RM0.218/unit: RM2.49 sehari, RM74.70 untuk 30 hari.":"Full household example: 2.0 kW × 5 h + 0.15 kW × 4 h + 0.1 kW × 8 h = 11.4 kWh daily. At RM0.218/unit: RM2.49 daily, RM74.70 for 30 days."}</p></Panel>
        <Panel><div className="flex items-center gap-3"><Lightbulb className="h-7 w-7 text-emerald-300"/><h3 className="font-black text-white">{t.better}</h3></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{(lang==="bm"?["Pilih peralatan 5 bintang","Gunakan pengudaraan semula jadi","Maksimumkan cahaya siang","Pasang panel suria","Tuai air hujan & bumbung hijau"]:["Choose 5-star appliances","Use natural ventilation","Maximise daylight","Install solar panels","Harvest rainwater & add green roofs"]).map(x=><div key={x} className="rounded-xl bg-emerald-300/8 p-3 text-xs font-semibold text-emerald-50">{x}</div>)}</div></Panel><Check lang={lang} question={content.sections[3]?.checks[0]?.question ?? ""} answer={content.sections[3]?.checks[0]?.hint ?? ""}/></div>

      {onMarkRead&&<div className="flex justify-center"><button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isRead?"bg-emerald-300/20 text-emerald-200":"bg-gradient-to-r from-cyan-300 to-violet-300 text-slate-950 hover:scale-[1.03] active:scale-[.97]"}`}><CheckCircle2 className="h-5 w-5"/>{isRead?t.marked:t.mark}</button></div>}
    </div>
  </section>;
}
