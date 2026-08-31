import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Factory,
  Flame,
  FlaskConical,
  Gem,
  Leaf,
  Mountain,
  ShieldAlert,
  Sparkles,
  TestTube2,
  Wind,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 4",
    title: "Fahami bagaimana kereaktifan menentukan segalanya",
    subtitle: "Daripada mineral dalam kerak Bumi, bina siri kereaktifan daripada bukti eksperimen, kemudian gunakan siri itu untuk memilih cara logam diekstrak.",
    roadmap: [
      ["4.1 Kepelbagaian Mineral", "Kenal pasti unsur, sebatian semula jadi dan unsur yang bergabung."],
      ["4.2 Siri Kereaktifan Logam", "Bandingkan tindak balas dengan oksigen serta tentukan kedudukan karbon dan hidrogen."],
      ["4.3 Pengekstrakan Logam", "Gunakan kedudukan logam untuk memilih elektrolisis, penurunan karbon atau pemanasan."],
    ],
    bigIdea: "Idea besar",
    check: "Uji diri",
    reveal: "Lihat jawapan",
    hide: "Tutup jawapan",
    mineralTitle: "Mineral ialah bahan semula jadi di dalam kerak Bumi",
    mineralBody: "Mineral ialah unsur atau sebatian pepejal semula jadi dengan struktur hablur dan komposisi kimia tertentu. Kandungan mineral yang berbeza menghasilkan warna, struktur, bentuk dan tekstur batuan yang berbeza.",
    element: "Mineral unsur",
    elementBody: "Wujud bebas tanpa bergabung secara kimia.",
    compound: "Sebatian semula jadi",
    compoundBody: "Beberapa unsur bergabung secara kimia.",
    mineralTable: "Daripada nama biasa kepada unsur gabungan",
    proofTitle: "Buktikan batu kapur ialah sebatian",
    proofBody: "Dua tindakan berbeza menghasilkan gas yang sama. Air kapur yang menjadi keruh membuktikan karbon dioksida terbebas.",
    acid: "Tambah asid hidroklorik cair",
    heat: "Panaskan dengan kuat",
    limewater: "Alirkan gas ke air kapur",
    cloudy: "Air kapur menjadi keruh",
    conclusion: "Kesimpulan: CaCO₃ mengandungi kalsium, karbon dan oksigen.",
    reactivityTitle: "Kereaktifan dibina daripada apa yang kita lihat",
    reactivityBody: "Semakin cergas tindak balas logam dengan oksigen, semakin tinggi kedudukannya dalam siri kereaktifan.",
    oxygenExperiment: "Aktiviti 4.3 — pemanasan logam dalam oksigen",
    carbonTitle: "Letakkan karbon dengan ujian penyingkiran oksigen",
    carbonRule: "Jika karbon mengambil oksigen daripada oksida logam, karbon lebih reaktif daripada logam itu.",
    hydrogenTitle: "Letakkan hidrogen dengan kaedah yang sama",
    hydrogenRule: "Hidrogen kering dialirkan di atas oksida logam yang dipanaskan. Jika logam terbentuk, hidrogen lebih reaktif daripada logam itu.",
    seriesTitle: "Siri kereaktifan lengkap",
    more: "Lebih reaktif",
    less: "Kurang reaktif",
    extractionTitle: "Kedudukan menentukan kaedah pengekstrakan",
    extractionBody: "Pengekstrakan logam ialah proses kimia memperoleh atau mengasingkan logam tulen daripada bijihnya.",
    furnaceTitle: "Ikuti bahan di dalam relau bagas",
    furnaceBody: "Bijih besi, kok dan batu kapur masuk dari atas. Udara sangat panas masuk dari bawah. Besi dan sanga keluar melalui saluran berasingan.",
    ironPath: "Laluan menghasilkan besi",
    slagPath: "Laluan menyingkirkan bendasing sebagai sanga",
    miningTitle: "Pengekstrakan mempunyai kos kepada alam",
    mark: "Tandakan Bab 4 Selesai",
    marked: "Selesai ditanda",
  },
  en: {
    eyebrow: "Chapter 4 visual map",
    title: "Understand how reactivity determines everything",
    subtitle: "Start with minerals in Earth's crust, build the reactivity series from experimental evidence, then use the series to choose how each metal is extracted.",
    roadmap: [
      ["4.1 Variety of Minerals", "Identify elements, natural compounds and the elements combined in them."],
      ["4.2 Reactivity Series of Metals", "Compare reactions with oxygen and determine the positions of carbon and hydrogen."],
      ["4.3 Extraction of Metals", "Use a metal's position to choose electrolysis, carbon reduction or heating."],
    ],
    bigIdea: "Big idea",
    check: "Check yourself",
    reveal: "Reveal answer",
    hide: "Hide answer",
    mineralTitle: "Minerals are natural substances in Earth's crust",
    mineralBody: "A mineral is a naturally occurring solid element or compound with a definite crystalline structure and chemical composition. Different mineral contents give rocks different colours, structures, shapes and textures.",
    element: "Element mineral",
    elementBody: "Exists freely without chemically combining with other elements.",
    compound: "Natural compound",
    compoundBody: "Several elements are chemically combined.",
    mineralTable: "From common name to combined elements",
    proofTitle: "Prove limestone is a compound",
    proofBody: "Two different treatments produce the same gas. Limewater turning cloudy proves carbon dioxide was released.",
    acid: "Add dilute hydrochloric acid",
    heat: "Heat strongly",
    limewater: "Bubble gas through limewater",
    cloudy: "Limewater turns cloudy",
    conclusion: "Conclusion: CaCO₃ contains calcium, carbon and oxygen.",
    reactivityTitle: "Reactivity is built from what we observe",
    reactivityBody: "The more vigorous a metal's reaction with oxygen, the higher its position in the reactivity series.",
    oxygenExperiment: "Activity 4.3 — heating metals in oxygen",
    carbonTitle: "Place carbon by testing oxygen removal",
    carbonRule: "If carbon removes oxygen from a metal oxide, carbon is more reactive than that metal.",
    hydrogenTitle: "Place hydrogen using the same reasoning",
    hydrogenRule: "Dry hydrogen is passed over a heated metal oxide. If metal forms, hydrogen is more reactive than that metal.",
    seriesTitle: "Complete reactivity series",
    more: "More reactive",
    less: "Less reactive",
    extractionTitle: "Position determines the extraction method",
    extractionBody: "Metal extraction is the chemical process of obtaining or separating a pure metal from its ore.",
    furnaceTitle: "Follow each material through the blast furnace",
    furnaceBody: "Iron ore, coke and limestone enter from the top. Very hot air enters from below. Iron and slag leave through separate outlets.",
    ironPath: "Route that produces iron",
    slagPath: "Route that removes impurities as slag",
    miningTitle: "Extraction has an environmental cost",
    mark: "Mark Chapter 4 as Read",
    marked: "Marked as read",
  },
} as const;

const minerals = {
  bm: [
    ["Hematit", "Ferum(III) oksida", "Ferum + oksigen"], ["Kasiterit", "Stanum(IV) oksida", "Stanum + oksigen"],
    ["Kuarza", "Silikon dioksida", "Silikon + oksigen"], ["Bauksit", "Aluminium oksida", "Aluminium + oksigen"],
    ["Galena", "Plumbum(II) sulfida", "Plumbum + sulfur"], ["Pirit", "Ferum sulfida", "Ferum + sulfur"],
    ["Kalsit", "Kalsium karbonat", "Kalsium + karbon + oksigen"],
  ],
  en: [
    ["Hematite", "Iron(III) oxide", "Iron + oxygen"], ["Cassiterite", "Tin(IV) oxide", "Tin + oxygen"],
    ["Quartz", "Silicon dioxide", "Silicon + oxygen"], ["Bauxite", "Aluminium oxide", "Aluminium + oxygen"],
    ["Galena", "Lead(II) sulphide", "Lead + sulphur"], ["Pyrite", "Iron sulphide", "Iron + sulphur"],
    ["Calcite", "Calcium carbonate", "Calcium + carbon + oxygen"],
  ],
} as const;

const oxygenResults = {
  bm: [
    ["Mg", "Magnesium", "Amat cepat · nyalaan putih terang", "Paling reaktif"], ["Al", "Aluminium", "Cepat · nyalaan terang", "Sangat reaktif"],
    ["Zn", "Zink", "Perlahan · membara terang", "Sederhana"], ["Fe", "Ferum", "Membara terang · bunga api", "Kurang reaktif"],
    ["Pb", "Plumbum", "Membara malap", "Paling kurang reaktif"],
  ],
  en: [
    ["Mg", "Magnesium", "Very rapid · bright white flame", "Most reactive"], ["Al", "Aluminium", "Rapid · bright flame", "Very reactive"],
    ["Zn", "Zinc", "Slow · bright glow", "Moderate"], ["Fe", "Iron", "Bright glow · sparks", "Less reactive"],
    ["Pb", "Lead", "Dull glow", "Least reactive"],
  ],
} as const;

const oxygenEquations = {
  bm: [
    "Magnesium + oksigen → magnesium oksida",
    "Aluminium + oksigen → aluminium oksida",
    "Zink + oksigen → zink oksida",
    "Ferum + oksigen → ferum oksida",
    "Plumbum + oksigen → plumbum(II) oksida",
  ],
  en: [
    "Magnesium + oxygen → magnesium oxide",
    "Aluminium + oxygen → aluminium oxide",
    "Zinc + oxygen → zinc oxide",
    "Iron + oxygen → iron oxide",
    "Lead + oxygen → lead(II) oxide",
  ],
} as const;

const carbonResults = {
  bm: [
    ["Al₂O₃ + C", "Tiada perubahan", "Karbon kurang reaktif daripada aluminium", "Tiada tindak balas"],
    ["ZnO + C", "Membara cergas · pepejal kelabu", "Karbon lebih reaktif daripada zink", "Zink oksida + karbon → zink + karbon dioksida"],
    ["PbO + C", "Membara sangat terang · plumbum berkilat", "Karbon lebih reaktif daripada plumbum", "Plumbum(II) oksida + karbon → plumbum + karbon dioksida"],
  ],
  en: [
    ["Al₂O₃ + C", "No change", "Carbon is less reactive than aluminium", "No reaction"],
    ["ZnO + C", "Vigorous glow · grey solid", "Carbon is more reactive than zinc", "Zinc oxide + carbon → zinc + carbon dioxide"],
    ["PbO + C", "Very bright glow · shiny lead", "Carbon is more reactive than lead", "Lead(II) oxide + carbon → lead + carbon dioxide"],
  ],
} as const;

const hydrogenResults = {
  bm: [
    ["Al₂O₃", "Tiada baraan · kekal putih", "H kurang reaktif daripada Al"], ["ZnO", "Kuning semasa panas, putih semasa sejuk", "H kurang reaktif daripada Zn"],
    ["Fe₂O₃", "Perang kemerahan → besi kelabu berkilat", "H lebih reaktif daripada Fe"], ["PbO", "Kuning → plumbum kelabu berkilat", "H lebih reaktif daripada Pb"],
    ["CuO", "Hitam → kuprum perang", "H lebih reaktif daripada Cu"],
  ],
  en: [
    ["Al₂O₃", "No glow · remains white", "H is less reactive than Al"], ["ZnO", "Yellow when hot, white when cool", "H is less reactive than Zn"],
    ["Fe₂O₃", "Reddish-brown → shiny grey iron", "H is more reactive than Fe"], ["PbO", "Yellow → shiny grey lead", "H is more reactive than Pb"],
    ["CuO", "Black → brown copper", "H is more reactive than Cu"],
  ],
} as const;

const series = ["K", "Na", "Ca", "Mg", "Al", "C", "Zn", "H", "Fe", "Sn", "Pb", "Cu", "Hg", "Ag", "Au"] as const;

function Panel({children,className=""}:{children:React.ReactNode;className?:string}) { return <div className={`rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_18px_60px_rgba(2,6,23,.28)] sm:p-6 ${className}`}>{children}</div>; }
function SectionTitle({number,title,subtitle}:{number:string;title:string;subtitle?:string}) { return <div className="space-y-2"><span className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-black tracking-[.16em] text-amber-200">{number}</span><h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>{subtitle&&<p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{subtitle}</p>}</div>; }
function Flow({items}:{items:readonly string[]}) { return <div className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr sm:items-center">{items.map((x,i)=><div className="contents" key={x}><div className="min-h-14 rounded-xl border border-amber-300/20 bg-amber-300/8 p-3 text-center text-sm font-bold text-amber-50">{x}</div>{i<items.length-1&&<><ArrowDown className="mx-auto h-5 w-5 text-cyan-300 sm:hidden"/><ArrowRight className="hidden h-5 w-5 text-cyan-300 sm:block"/></>}</div>)}</div>; }
function Check({lang,question,answer}:{lang:Lang;question:string;answer:string}) { const [open,setOpen]=useState(false); const t=copy[lang]; return <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-violet-200">{t.check}</p><p className="mt-2 text-sm font-semibold text-white">{question}</p><button type="button" onClick={()=>setOpen(v=>!v)} className="mt-3 min-h-11 rounded-full bg-violet-300 px-4 text-sm font-black text-slate-950 transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{open?t.hide:t.reveal}</button>{open&&<p className="mt-3 rounded-xl bg-slate-950/60 p-3 text-sm leading-6 text-violet-100" aria-live="polite">{answer}</p>}</div>; }

function LimestoneProof({lang}:{lang:Lang}) {
  const t=copy[lang]; const [mode,setMode]=useState<"acid"|"heat">("acid");
  const equation=mode==="acid"?(lang==="bm"?"Kalsium karbonat + asid hidroklorik → kalsium klorida + karbon dioksida + air":"Calcium carbonate + hydrochloric acid → calcium chloride + carbon dioxide + water"):(lang==="bm"?"Kalsium karbonat → kalsium oksida + karbon dioksida":"Calcium carbonate → calcium oxide + carbon dioxide");
  return <Panel><div className="grid grid-cols-2 gap-2"><button type="button" onClick={()=>setMode("acid")} className={`min-h-12 rounded-xl px-3 text-sm font-black ${mode==="acid"?"bg-amber-300 text-amber-950":"bg-white/5 text-slate-200"}`}>{t.acid}</button><button type="button" onClick={()=>setMode("heat")} className={`min-h-12 rounded-xl px-3 text-sm font-black ${mode==="heat"?"bg-orange-300 text-orange-950":"bg-white/5 text-slate-200"}`}>{t.heat}</button></div><div className="mt-5 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"><Mountain className="mx-auto h-9 w-9 text-slate-200"/><p className="mt-2 text-sm font-black">CaCO₃</p></div><ArrowRight className="mx-auto hidden text-cyan-300 sm:block"/><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-4 text-center"><CircleDot className="mx-auto h-9 w-9 text-cyan-300 motion-safe:animate-pulse"/><p className="mt-2 text-sm font-black">CO₂</p></div><ArrowRight className="mx-auto hidden text-cyan-300 sm:block"/><div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"><TestTube2 className="mx-auto h-9 w-9 text-slate-100"/><p className="mt-2 text-sm font-black">{t.cloudy}</p></div></div><p className="mt-4 rounded-xl bg-white/5 p-3 text-center text-xs font-bold leading-5 text-slate-200">{equation}</p><p className="mt-3 text-sm font-black text-emerald-200">{t.conclusion}</p><p className="mt-2 text-xs leading-5 text-slate-400">{lang==="bm"?"Bahan: serbuk CaCO₃, air kapur dan HCl cair. Radas utama: tabung didih, tabung uji, penunu Bunsen, penyumbat dan tiub penghantar.":"Materials: CaCO₃ powder, limewater and dilute HCl. Main apparatus: boiling tube, test tube, Bunsen burner, stopper and delivery tube."}</p><p className="mt-2 text-xs leading-5 text-rose-200">{lang==="bm"?"Keselamatan: jangan halakan mulut tabung didih yang dipanaskan kepada diri sendiri atau orang lain.":"Safety: never point the mouth of a heated boiling tube towards yourself or anyone else."}</p></Panel>;
}

function OxygenExperiment({lang}:{lang:Lang}) {
  const [selected,setSelected]=useState(0); const item=oxygenResults[lang][selected];
  return <Panel><div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]"><div className="relative mx-auto h-52 w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900"><div className="absolute left-8 top-1/2 h-16 w-24 -translate-y-1/2 rounded-lg border border-violet-300/30 bg-violet-300/10 p-2 text-center text-[10px] font-black text-violet-100">KMnO₄<br/>{lang==="bm"?"bekal O₂":"supplies O₂"}</div><div className="absolute left-1/2 top-1/2 h-20 w-7 -translate-x-1/2 -translate-y-1/2 rounded bg-slate-200/70"><span className="absolute -bottom-7 -left-3 w-16 text-center text-[9px] text-slate-300">{lang==="bm"?"Wul kaca":"Glass wool"}</span></div><div className="absolute right-8 top-1/2 h-14 w-24 -translate-y-1/2 rounded-b-2xl border-4 border-amber-300/50 bg-amber-300/10 text-center text-xs font-black leading-[3rem] text-amber-100">{item[0]}</div><div className="absolute inset-x-5 top-1/2 h-24 -translate-y-1/2 rounded-full border-4 border-slate-400"/></div><div><p className="text-sm leading-6 text-slate-300">{lang==="bm"?"Panaskan serbuk logam dahulu. Kemudian panaskan hablur kalium manganat(VII) untuk membebaskan oksigen. Wul kaca mesti memisahkan kedua-dua bahan.":"Heat the metal powder first. Then heat potassium manganate(VII) crystals to release oxygen. Glass wool must separate the two materials."}</p><div className="mt-3 rounded-xl border border-rose-300/15 bg-rose-300/8 p-3 text-xs leading-5 text-rose-100">{lang==="bm"?"Keselamatan: gunakan sedikit serbuk, kendali wul kaca dengan forseps, pakai cermin mata dan jangan pandang nyalaan secara terus.":"Safety: use very little powder, handle glass wool with forceps, wear goggles and never look directly at the flame."}</div></div></div><div className="mt-5 grid grid-cols-5 gap-2">{oxygenResults[lang].map((x,i)=><button type="button" key={x[0]} onClick={()=>setSelected(i)} className={`min-h-12 rounded-xl text-sm font-black ${selected===i?"bg-amber-300 text-amber-950":"bg-white/5 text-slate-200"}`}>{x[0]}</button>)}</div><div className="mt-4 rounded-2xl bg-amber-300/8 p-4"><div className="flex items-center gap-3"><Flame className="h-8 w-8 text-amber-300"/><div><p className="font-black text-white">{item[1]}</p><p className="text-sm font-bold text-amber-200">{item[2]}</p></div></div><p className="mt-2 text-xs text-slate-300">{item[3]}</p><p className="mt-2 rounded-lg bg-slate-950/45 px-3 py-2 text-xs font-bold text-amber-50">{oxygenEquations[lang][selected]}</p></div><div className="mt-4"><Flow items={oxygenResults[lang].map(x=>x[0])}/></div></Panel>;
}

function ReductionTests({lang,type}:{lang:Lang;type:"carbon"|"hydrogen"}) {
  const data=type==="carbon"?carbonResults[lang]:hydrogenResults[lang]; const [selected,setSelected]=useState(0); const item=data[selected];
  return <Panel><div className="flex gap-2 overflow-x-auto pb-2">{data.map((x,i)=><button key={x[0]} type="button" onClick={()=>setSelected(i)} className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-black ${selected===i?"bg-cyan-300 text-cyan-950":"bg-white/5 text-slate-200"}`}>{x[0]}</button>)}</div><div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-4"><div className="flex items-center gap-3"><FlaskConical className="h-8 w-8 text-cyan-300"/><div><p className="font-black text-white">{item[1]}</p><p className="text-sm font-bold text-cyan-200">{item[2]}</p></div></div>{type==="carbon"&&<p className="mt-3 text-xs leading-5 text-slate-300">{item[3]}</p>}</div>{type==="carbon"?<div className="mt-4"><Flow items={["Al", "C", "Zn"]}/><p className="mt-2 text-center text-xs font-black text-cyan-200">Al &gt; C &gt; Zn</p></div>:<div className="mt-4"><Flow items={["Zn", "H", "Fe"]}/><p className="mt-2 text-center text-xs font-black text-cyan-200">Zn &gt; H &gt; Fe</p></div>}</Panel>;
}

function FullSeries({lang}:{lang:Lang}) {
  const t=copy[lang];
  return <Panel><div className="flex items-center justify-between text-xs font-black uppercase tracking-[.14em]"><span className="text-rose-200">{t.more}</span><ArrowRight className="h-5 w-5 text-slate-400 rotate-90 sm:rotate-0"/><span className="text-emerald-200">{t.less}</span></div><div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-[repeat(15,minmax(0,1fr))]">{series.map((x,i)=><div key={x} className={`rounded-xl border p-3 text-center font-mono text-sm font-black ${x==="C"||x==="H"?"border-cyan-300/40 bg-cyan-300/15 text-cyan-100":"border-white/10 bg-white/5 text-white"}`}><span className="block text-[9px] text-slate-500">{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div><div className="mt-4 grid gap-2 sm:grid-cols-3"><p className="rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300">{lang==="bm"?"K dan Na disimpan dalam minyak parafin di dalam botol gelap kerana sangat reaktif dengan oksigen dan air.":"K and Na are stored in paraffin oil in dark bottles because they react strongly with oxygen and water."}</p><p className="rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300">{lang==="bm"?"Bateri litium boleh meletup apabila dipanaskan, maka tidak dibenarkan dalam bagasi daftar masuk pesawat.":"Lithium batteries may explode when heated, so they are not allowed in checked aircraft baggage."}</p><p className="rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300">{lang==="bm"?"Simpanan arang batu terbesar Malaysia di Merit Pila, Sarawak: Sarawak 80%, Sabah 19%, Semenanjung 1%.":"Malaysia's largest coal reserve is at Merit Pila, Sarawak: Sarawak 80%, Sabah 19%, Peninsular Malaysia 1%."}</p></div></Panel>;
}

function ExtractionChoice({lang}:{lang:Lang}) {
  const options=lang==="bm"?[
    ["Di atas karbon", "K, Na, Ca, Mg, Al", "Elektrolisis sebatian lebur", "Karbon tidak dapat menurunkan oksidanya"],
    ["Di bawah karbon", "Zn, Fe, Sn, Pb", "Penurunan oksida oleh karbon", "Karbon lebih reaktif daripada logam"],
    ["Kurang reaktif", "Cu, Hg", "Pemanasan terus di udara", "Tarikan terhadap oksigen lemah"],
    ["Paling tidak reaktif", "Ag, Au", "Tiada pengekstrakan kimia", "Wujud sebagai unsur bebas"],
  ]:[
    ["Above carbon", "K, Na, Ca, Mg, Al", "Electrolysis of molten compounds", "Carbon cannot reduce their oxides"],
    ["Below carbon", "Zn, Fe, Sn, Pb", "Reduction of oxide by carbon", "Carbon is more reactive than the metal"],
    ["Less reactive", "Cu, Hg", "Direct heating in air", "Weak attraction to oxygen"],
    ["Least reactive", "Ag, Au", "No chemical extraction", "Exist as free elements"],
  ];
  const [selected,setSelected]=useState(0); const item=options[selected];
  return <Panel><div className="grid grid-cols-2 gap-2 lg:grid-cols-4">{options.map((x,i)=><button key={x[0]} onClick={()=>setSelected(i)} className={`min-h-12 rounded-xl px-3 text-xs font-black ${selected===i?"bg-amber-300 text-amber-950":"bg-white/5 text-slate-200"}`}>{x[0]}</button>)}</div><div className="mt-4 grid gap-3 rounded-2xl bg-white/5 p-4 sm:grid-cols-3"><div><p className="text-[10px] font-black uppercase tracking-[.14em] text-slate-400">{lang==="bm"?"Logam":"Metals"}</p><p className="mt-1 font-mono font-black text-white">{item[1]}</p></div><div><p className="text-[10px] font-black uppercase tracking-[.14em] text-slate-400">{lang==="bm"?"Kaedah":"Method"}</p><p className="mt-1 text-sm font-black text-amber-100">{item[2]}</p></div><div><p className="text-[10px] font-black uppercase tracking-[.14em] text-slate-400">{lang==="bm"?"Sebab":"Reason"}</p><p className="mt-1 text-sm text-slate-300">{item[3]}</p></div></div><p className="mt-3 text-xs text-slate-400">{lang==="bm"?"Timah diekstrak daripada kasiterit, SnO₂, melalui penurunan karbon kerana timah berada di bawah karbon.":"Tin is extracted from cassiterite, SnO₂, by carbon reduction because tin is below carbon."}</p></Panel>;
}

function BlastFurnace({lang}:{lang:Lang}) {
  const t=copy[lang];
  const ironReactions=lang==="bm"?[
    "Karbon + oksigen → karbon dioksida + haba",
    "Karbon dioksida + karbon → karbon monoksida",
    "Ferum(III) oksida + karbon → ferum + karbon dioksida",
    "Ferum(II) oksida + karbon → ferum + karbon dioksida",
    "Ferum(III) oksida + karbon monoksida → ferum + karbon dioksida",
    "Ferum(II) oksida + karbon monoksida → ferum + karbon dioksida",
    "Ferum lebur mengalir ke dasar relau",
  ]:[
    "Carbon + oxygen → carbon dioxide + heat",
    "Carbon dioxide + carbon → carbon monoxide",
    "Iron(III) oxide + carbon → iron + carbon dioxide",
    "Iron(II) oxide + carbon → iron + carbon dioxide",
    "Iron(III) oxide + carbon monoxide → iron + carbon dioxide",
    "Iron(II) oxide + carbon monoxide → iron + carbon dioxide",
    "Molten iron flows to the furnace base",
  ];
  return <div className="space-y-4"><Panel><div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="relative mx-auto h-[28rem] w-64"><div className="absolute inset-x-8 top-2 h-12 rounded-t-3xl border-4 border-slate-400 bg-slate-800 text-center text-[10px] font-black leading-10 text-white">Fe₂O₃ + C + CaCO₃</div><div className="absolute inset-x-4 top-12 h-[23rem] [clip-path:polygon(20%_0,80%_0,100%_100%,0_100%)] bg-gradient-to-b from-orange-950 via-orange-800 to-rose-950 shadow-[0_0_50px_rgba(251,146,60,.2)]"><div className="absolute inset-x-10 top-16 h-20 rounded-full bg-orange-400/15 motion-safe:animate-pulse"/><div className="absolute inset-x-5 bottom-20 h-16 rounded-full bg-amber-300/25"/><div className="absolute inset-x-3 bottom-5 h-20 rounded-full bg-slate-300/20"/></div><div className="absolute -left-4 bottom-20 flex items-center text-[10px] font-black text-cyan-100"><Wind className="mr-1 h-5 w-5"/>{lang==="bm"?"Udara panas":"Hot air"}<ArrowRight className="h-5 w-5"/></div><div className="absolute -right-3 bottom-24 text-[10px] font-black text-amber-100">{lang==="bm"?"Sanga · atas":"Slag · upper"} →</div><div className="absolute -right-3 bottom-10 text-[10px] font-black text-slate-100">{lang==="bm"?"Besi · bawah":"Iron · lower"} →</div></div><div className="space-y-3"><div className="rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300"><strong className="text-white">{lang==="bm"?"Bijih besi / hematit":"Iron ore / hematite"}</strong> — {lang==="bm"?"sumber oksida besi":"source of iron oxide"}</div><div className="rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300"><strong className="text-white">{lang==="bm"?"Arang kok":"Coke"}</strong> — {lang==="bm"?"bahan api dan agen penurunan":"fuel and reducing agent"}</div><div className="rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300"><strong className="text-white">{lang==="bm"?"Batu kapur":"Limestone"}</strong> — {lang==="bm"?"menyingkirkan bendasing pasir":"removes sand impurities"}</div><div className="rounded-xl border border-amber-300/20 bg-amber-300/8 p-3 text-xs leading-5 text-amber-100">{lang==="bm"?"Sanga kurang tumpat lalu terapung di atas besi lebur. Sanga digunakan untuk tapak bangunan dan jalan raya; besi disejukkan menjadi besi tuangan.":"Slag is less dense and floats above molten iron. Slag is used for building foundations and roads; iron cools to form cast iron."}</div></div></div></Panel><Panel><h3 className="font-black text-white">{t.ironPath}</h3><div className="mt-4 space-y-2">{ironReactions.map((x,i)=><div key={x} className="flex gap-3 rounded-xl bg-orange-300/8 p-3 text-sm text-orange-50"><span className="font-black text-orange-300">{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div><h3 className="mt-6 font-black text-white">{t.slagPath}</h3><div className="mt-4"><Flow items={lang==="bm"?["CaCO₃ → CaO + CO₂","CaO + SiO₂","Kalsium silikat · sanga","Terapung di atas besi"]:["CaCO₃ → CaO + CO₂","CaO + SiO₂","Calcium silicate · slag","Floats above iron"]}/></div></Panel></div>;
}

export function ScienceF3Chapter4VisualNotesBlock({id,content,lang,isRead,onMarkRead}:{id?:string;content:ScienceF3InteractiveContent;lang:Lang;storageKey?:string;isRead?:boolean;onMarkRead?:()=>void}) {
  const t=copy[lang];
  const impacts=lang==="bm"?["Pencemaran udara","Pencemaran air","Pencemaran bunyi","Hakisan tanah","Kemusnahan habitat","Penggunaan tenaga tinggi"]:["Air pollution","Water pollution","Noise pollution","Soil erosion","Habitat destruction","High energy use"];
  const solutions=lang==="bm"?["Tanam semula hutan","Rawat air dalam kolam takungan","Pasang penghadang bunyi","Tapis gas cerobong","Guna teknologi cekap tenaga","Kitar semula logam"]:["Replant forests","Treat water in holding ponds","Install noise barriers","Filter chimney gases","Use energy-efficient technology","Recycle metals"];
  return <section id={id} data-lang={lang} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-amber-300/15 bg-[#0e1427] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"><div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,.18),transparent_38%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,.13),transparent_34%)]"/><div className="relative mx-auto flex max-w-6xl flex-col gap-14">
    <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-amber-400/15 via-slate-950/40 to-cyan-400/15 p-5 sm:p-8"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-amber-200"><Gem className="h-4 w-4"/>{t.eyebrow}</div><h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.02] text-white sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p><div className="mt-7 grid gap-3 lg:grid-cols-3">{t.roadmap.map((x,i)=><div key={x[0]} className="relative min-h-36 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs font-black tracking-[.14em] text-amber-300">0{i+1}</span><h2 className="mt-2 text-sm font-black text-white">{x[0]}</h2><p className="mt-2 text-xs leading-5 text-slate-300">{x[1]}</p>{i<2&&<ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-[#0e1427] p-1 text-cyan-300 lg:block"/>}</div>)}</div></header>

    <div className="space-y-6"><SectionTitle number="4.1" title={t.mineralTitle} subtitle={t.mineralBody}/><div className="grid gap-4 md:grid-cols-2"><Panel><Sparkles className="h-8 w-8 text-amber-300"/><h3 className="mt-3 font-black text-white">{t.element}</h3><p className="mt-2 text-sm text-slate-300">{t.elementBody}</p><p className="mt-4 rounded-xl bg-amber-300/8 p-3 text-sm font-bold text-amber-100">{lang==="bm"?"Emas · perak":"Gold · silver"}</p></Panel><Panel><Gem className="h-8 w-8 text-cyan-300"/><h3 className="mt-3 font-black text-white">{t.compound}</h3><p className="mt-2 text-sm text-slate-300">{t.compoundBody}</p><p className="mt-4 rounded-xl bg-cyan-300/8 p-3 text-sm font-bold text-cyan-100">{lang==="bm"?"Bauksit · hematit · galena · kasiterit":"Bauxite · hematite · galena · cassiterite"}</p></Panel></div><Panel><h3 className="font-black text-white">{t.mineralTable}</h3><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{minerals[lang].map(x=><div key={x[0]} className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-sm font-black text-white">{x[0]}</p><p className="mt-1 text-xs font-bold text-amber-200">{x[1]}</p><p className="mt-1 text-xs text-slate-400">{x[2]}</p></div>)}</div><p className="mt-4 text-xs leading-5 text-slate-400">{lang==="bm"?"Mineralogi mengkaji mineral. Litium dan kobalt penting untuk bateri kereta elektrik tahan lama. Kalsium silikat boleh digunakan sebagai bahan tambahan makanan.":"Mineralogy studies minerals. Lithium and cobalt are important for long-lasting electric-car batteries. Calcium silicate can be used as a food additive."}</p></Panel><SectionTitle number="4.1A" title={t.proofTitle} subtitle={t.proofBody}/><LimestoneProof lang={lang}/><Panel><p className="text-xs font-black uppercase tracking-[.14em] text-slate-400">{lang==="bm"?"Bentuk semula jadi CaCO₃":"Natural forms of CaCO₃"}</p><div className="mt-3 flex flex-wrap gap-2">{(lang==="bm"?["Batu kapur","Marmar","Kapur","Kalsit","Terumbu karang","Cangkerang haiwan laut"]:["Limestone","Marble","Chalk","Calcite","Coral reefs","Marine shells"]).map(x=><span key={x} className="rounded-full bg-white/5 px-3 py-2 text-xs font-bold text-slate-200">{x}</span>)}</div></Panel><Check lang={lang} question={content.sections[0]?.checks[0]?.question??""} answer={content.sections[0]?.checks[0]?.hint??""}/></div>

    <div className="space-y-6"><SectionTitle number="4.2" title={t.reactivityTitle} subtitle={t.reactivityBody}/><SectionTitle number="4.2A" title={t.oxygenExperiment}/><OxygenExperiment lang={lang}/><SectionTitle number="4.2B" title={t.carbonTitle} subtitle={t.carbonRule}/><ReductionTests lang={lang} type="carbon"/><Check lang={lang} question={lang==="bm"?"Karbon menurunkan ZnO dan PbO tetapi tidak Al₂O₃. Di manakah karbon dalam siri?":"Carbon reduces ZnO and PbO but not Al₂O₃. Where does carbon sit in the series?"} answer={lang==="bm"?"Di antara aluminium dan zink: Al > C > Zn. Karbon lebih reaktif daripada zink dan plumbum, tetapi kurang reaktif daripada aluminium.":"Between aluminium and zinc: Al > C > Zn. Carbon is more reactive than zinc and lead, but less reactive than aluminium."}/><SectionTitle number="4.2C" title={t.hydrogenTitle} subtitle={t.hydrogenRule}/><Panel><Flow items={lang==="bm"?["Zn + asid sulfurik cair · CuSO₄ sebagai mangkin","Gas H₂ terhasil","Keringkan dengan CaCl₂ kontang","Alir atas oksida logam panas","Bakar lebihan H₂"]:["Zn + dilute sulphuric acid · CuSO₄ catalyst","H₂ gas forms","Dry with anhydrous CaCl₂","Pass over hot metal oxide","Burn excess H₂"]}/><p className="mt-3 text-xs text-rose-200">{lang==="bm"?"Lebihan hidrogen dibakar supaya gas tidak terkumpul dan meletup.":"Excess hydrogen is burned so the gas cannot collect and explode."}</p></Panel><ReductionTests lang={lang} type="hydrogen"/><SectionTitle number="4.2D" title={t.seriesTitle}/><FullSeries lang={lang}/></div>

    <div className="space-y-6"><SectionTitle number="4.3" title={t.extractionTitle} subtitle={t.extractionBody}/><ExtractionChoice lang={lang}/><SectionTitle number="4.3A" title={t.furnaceTitle} subtitle={t.furnaceBody}/><BlastFurnace lang={lang}/><Check lang={lang} question={content.sections[2]?.checks[0]?.question??""} answer={content.sections[2]?.checks[0]?.hint??""}/><SectionTitle number="4.3B" title={t.miningTitle}/><div className="grid gap-4 lg:grid-cols-2"><Panel><ShieldAlert className="h-8 w-8 text-rose-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Kesan perlombongan tidak terancang":"Effects of poorly planned mining"}</h3><div className="mt-4 grid grid-cols-2 gap-2">{impacts.map(x=><div key={x} className="rounded-xl bg-rose-300/8 p-3 text-xs font-bold text-rose-100">{x}</div>)}</div></Panel><Panel><Leaf className="h-8 w-8 text-emerald-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Tindakan tempatan dan global":"Local and global actions"}</h3><div className="mt-4 grid grid-cols-2 gap-2">{solutions.map(x=><div key={x} className="rounded-xl bg-emerald-300/8 p-3 text-xs font-bold text-emerald-100">{x}</div>)}</div></Panel></div></div>

    {onMarkRead&&<div className="flex justify-center"><button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isRead?"bg-emerald-300/20 text-emerald-200":"bg-gradient-to-r from-amber-300 to-cyan-300 text-slate-950 hover:scale-[1.03] active:scale-[.97]"}`}><CheckCircle2 className="h-5 w-5"/>{isRead?t.marked:t.mark}</button></div>}
  </div></section>;
}
