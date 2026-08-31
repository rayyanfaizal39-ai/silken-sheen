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
  HeartPulse,
  LampDesk,
  Package,
  Snowflake,
  Thermometer,
  Trees,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 5",
    title: "Fahami arah aliran haba",
    subtitle: "Ikuti haba antara sistem dan persekitaran — lihat arah aliran, baca perubahan suhu, kemudian tentukan tindak balas dan aplikasinya.",
    roadmap: [
      ["Kenal pasti sistem", "Cari kawasan tindak balas kimia berlaku."],
      ["Ikut arah haba", "Adakah haba keluar atau masuk ke dalam sistem?"],
      ["Baca termometer", "Suhu persekitaran meningkat atau menurun?"],
      ["Gunakan konsep", "Kelaskan tindak balas dan reka aplikasi yang sesuai."],
    ],
    bigIdea: "Idea besar",
    visual: "Lihat konsep",
    how: "Bagaimana ia berlaku",
    key: "Ingat ini",
    check: "Uji diri",
    reveal: "Lihat jawapan",
    hide: "Tutup jawapan",
    introTitle: "Termokimia mengkaji perubahan haba",
    introBody: "Sistem ialah kawasan tindak balas berlaku. Persekitaran ialah kawasan di luar sistem yang menerima atau membekalkan haba.",
    compareTitle: "Eksotermik atau endotermik? Ikut anak panah haba",
    exo: "Eksotermik",
    exoDef: "Sistem membebaskan haba ke persekitaran.",
    endo: "Endotermik",
    endoDef: "Sistem menyerap haba daripada persekitaran.",
    system: "Sistem",
    surroundings: "Persekitaran",
    heatOut: "Haba keluar",
    heatIn: "Haba masuk",
    tempRise: "Suhu persekitaran meningkat",
    tempFall: "Suhu persekitaran menurun",
    thermoTitle: "Termometer ialah bukti",
    thermoBody: "Kenaikan suhu ialah definisi operasi pembebasan haba. Penurunan suhu ialah definisi operasi penyerapan haba.",
    equilibrium: "Selepas tindak balas tamat, suhu kembali menuju suhu bilik sehingga keseimbangan terma dicapai.",
    experimentTitle: "Aktiviti Inkuiri 5.1 — baca eksperimen sebagai satu cerita",
    experimentPurpose: "Tujuan: membandingkan dan membezakan tindak balas eksotermik dengan endotermik.",
    apparatus: "Susunan radas",
    procedure: ["Sukat cecair", "Biarkan 2 minit", "Catat suhu awal", "Campur bahan", "Kacau", "Catat suhu maksimum / minimum"],
    variables: ["Dimanipulasikan: jenis bahan kimia", "Bergerak balas: suhu akhir maksimum / minimum", "Dimalarkan: isi padu cecair"],
    whyCup: "Mengapa cawan polistirena? Ia penebat haba yang baik, jadi perubahan suhu yang direkodkan lebih tepat datang daripada tindak balas.",
    resultsTitle: "Empat campuran, satu kaedah pengelasan",
    resultsHint: "Pilih campuran untuk melihat bukti dan kesimpulan.",
    dailyTitle: "Kenali tindak balas dalam kehidupan harian",
    designTitle: "Pek segera: pilih hasil yang diperlukan dahulu",
    hotPack: "Pek panas segera",
    coldPack: "Pek sejuk segera",
    hotNeed: "Melegakan kekejangan otot dan meluaskan kapilari untuk meningkatkan aliran darah.",
    coldNeed: "Mengurangkan bengkak dan mengecilkan kapilari untuk memperlahankan aliran darah serta membantu menghentikan pendarahan.",
    diyTitle: "Bagaimana pek DIY diaktifkan",
    diySteps: ["Air dalam beg nipis", "Pepejal kimia dalam beg luar tebal", "Picit hingga beg air pecah", "Air melarutkan pepejal", "Suhu berubah serta-merta"],
    stemTitle: "Reka bentuk lain yang menggunakan tenaga dan haba",
    thermiteTitle: "Tindak balas termit — haba untuk mengimpal landasan",
    environmentTitle: "Termokimia dan suhu Bumi",
    mark: "Tandakan Bab 5 Selesai",
    marked: "Selesai ditanda",
  },
  en: {
    eyebrow: "Chapter 5 visual map",
    title: "Understand the direction of heat flow",
    subtitle: "Follow heat between the system and surroundings — see its direction, read the temperature change, then identify the reaction and its applications.",
    roadmap: [
      ["Identify the system", "Find where the chemical reaction occurs."],
      ["Follow the heat", "Does heat leave or enter the system?"],
      ["Read the thermometer", "Does the surroundings' temperature rise or fall?"],
      ["Apply the concept", "Classify the reaction and design a suitable application."],
    ],
    bigIdea: "Big idea",
    visual: "See the concept",
    how: "How it works",
    key: "Remember this",
    check: "Check yourself",
    reveal: "Reveal answer",
    hide: "Hide answer",
    introTitle: "Thermochemistry studies heat changes",
    introBody: "The system is where the reaction occurs. The surroundings are everything outside the system that receives or supplies heat.",
    compareTitle: "Exothermic or endothermic? Follow the heat arrows",
    exo: "Exothermic",
    exoDef: "The system releases heat to the surroundings.",
    endo: "Endothermic",
    endoDef: "The system absorbs heat from the surroundings.",
    system: "System",
    surroundings: "Surroundings",
    heatOut: "Heat flows out",
    heatIn: "Heat flows in",
    tempRise: "Surroundings' temperature rises",
    tempFall: "Surroundings' temperature falls",
    thermoTitle: "The thermometer is the evidence",
    thermoBody: "A temperature rise is the operational definition of heat release. A temperature fall is the operational definition of heat absorption.",
    equilibrium: "After the reaction ends, temperature moves back towards room temperature until thermal equilibrium is reached.",
    experimentTitle: "Inquiry Activity 5.1 — read the experiment as one story",
    experimentPurpose: "Aim: to compare and contrast exothermic and endothermic reactions.",
    apparatus: "Apparatus setup",
    procedure: ["Measure liquid", "Leave for 2 minutes", "Record initial temperature", "Add reactant", "Stir", "Record maximum / minimum temperature"],
    variables: ["Manipulated: type of chemical", "Responding: final maximum / minimum temperature", "Constant: volume of liquid"],
    whyCup: "Why a polystyrene cup? It is a good heat insulator, so the recorded temperature change comes more accurately from the reaction.",
    resultsTitle: "Four mixtures, one classification method",
    resultsHint: "Choose a mixture to see its evidence and conclusion.",
    dailyTitle: "Recognise reactions in daily life",
    designTitle: "Instant packs: choose the needed effect first",
    hotPack: "Instant hot pack",
    coldPack: "Instant cold pack",
    hotNeed: "Relieves muscle cramps and widens capillaries to increase blood flow.",
    coldNeed: "Reduces swelling and narrows capillaries to slow blood flow and help stop bleeding.",
    diyTitle: "How a DIY pack is activated",
    diySteps: ["Water in a thin inner bag", "Solid chemical in a thick outer bag", "Squeeze until water bag breaks", "Water dissolves solid", "Temperature changes immediately"],
    stemTitle: "Other designs that use energy and heat",
    thermiteTitle: "Thermite reaction — heat for welding railway tracks",
    environmentTitle: "Thermochemistry and Earth's temperature",
    mark: "Mark Chapter 5 as Read",
    marked: "Marked as read",
  },
} as const;

const results = {
  bm: [
    ["NaOH + air", "Suhu meningkat ke maksimum", "Eksotermik", "Haba dibebaskan ke persekitaran"],
    ["NH₄Cl + air", "Suhu menurun ke minimum", "Endotermik", "Haba diserap daripada persekitaran"],
    ["HCl + NaOH", "Suhu meningkat ke maksimum", "Eksotermik · peneutralan", "Haba dibebaskan ke persekitaran"],
    ["HCl + NaHCO₃", "Suhu menurun ke minimum", "Endotermik", "Haba diserap daripada persekitaran"],
  ],
  en: [
    ["NaOH + water", "Temperature rises to a maximum", "Exothermic", "Heat is released to the surroundings"],
    ["NH₄Cl + water", "Temperature falls to a minimum", "Endothermic", "Heat is absorbed from the surroundings"],
    ["HCl + NaOH", "Temperature rises to a maximum", "Exothermic · neutralisation", "Heat is released to the surroundings"],
    ["HCl + NaHCO₃", "Temperature falls to a minimum", "Endothermic", "Heat is absorbed from the surroundings"],
  ],
} as const;

function Panel({children,className=""}:{children:React.ReactNode;className?:string}) {
  return <div className={`rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_18px_60px_rgba(2,6,23,.28)] sm:p-6 ${className}`}>{children}</div>;
}

function SectionTitle({number,title,subtitle}:{number:string;title:string;subtitle?:string}) {
  return <div className="space-y-2"><span className="inline-flex rounded-full border border-orange-300/25 bg-orange-300/10 px-3 py-1 text-xs font-black tracking-[.16em] text-orange-200">{number}</span><h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>{subtitle&&<p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{subtitle}</p>}</div>;
}

function Flow({items}:{items:readonly string[]}) {
  return <div className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr sm:items-center">{items.map((item,i)=><div className="contents" key={item}><div className="min-h-14 rounded-xl border border-orange-300/20 bg-orange-300/8 px-3 py-3 text-center text-sm font-bold text-orange-50">{item}</div>{i<items.length-1&&<><ArrowDown className="mx-auto h-5 w-5 text-cyan-300 sm:hidden"/><ArrowRight className="hidden h-5 w-5 text-cyan-300 sm:block"/></>}</div>)}</div>;
}

function Check({lang,question,answer}:{lang:Lang;question:string;answer:string}) {
  const [open,setOpen]=useState(false); const t=copy[lang];
  return <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-violet-200">{t.check}</p><p className="mt-2 text-sm font-semibold text-white">{question}</p><button type="button" onClick={()=>setOpen(v=>!v)} className="mt-3 min-h-11 rounded-full bg-violet-300 px-4 text-sm font-black text-slate-950 transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{open?t.hide:t.reveal}</button>{open&&<p className="mt-3 rounded-xl bg-slate-950/60 p-3 text-sm leading-6 text-violet-100" aria-live="polite">{answer}</p>}</div>;
}

function HeatFlowVisual({lang}:{lang:Lang}) {
  const t=copy[lang]; const [mode,setMode]=useState<"exo"|"endo">("exo"); const exo=mode==="exo";
  return <Panel className={`overflow-hidden bg-gradient-to-br ${exo?"from-orange-500/15 via-slate-950/70 to-rose-500/10":"from-cyan-500/15 via-slate-950/70 to-blue-500/10"}`}><div className="grid grid-cols-2 gap-2"><button type="button" onClick={()=>setMode("exo")} className={`min-h-12 rounded-xl text-sm font-black ${exo?"bg-orange-300 text-orange-950":"bg-white/5 text-slate-200"}`}>{t.exo}</button><button type="button" onClick={()=>setMode("endo")} className={`min-h-12 rounded-xl text-sm font-black ${!exo?"bg-cyan-300 text-cyan-950":"bg-white/5 text-slate-200"}`}>{t.endo}</button></div><div className="relative mt-5 min-h-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 p-5"><div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle,rgba(255,255,255,.45) 1px,transparent 1px)",backgroundSize:"22px 22px"}}/><p className="relative text-center text-xs font-black uppercase tracking-[.18em] text-slate-400">{t.surroundings}</p><div className="relative mx-auto mt-8 flex max-w-xl items-center justify-center gap-3"><div className={`hidden text-center text-xs font-black sm:block ${exo?"text-orange-200":"text-cyan-200"}`}>{exo?t.heatOut:t.heatIn}</div>{exo?<ArrowRight className="hidden h-9 w-9 text-orange-300 motion-safe:animate-pulse sm:block"/>:<ArrowRight className="hidden h-9 w-9 rotate-180 text-cyan-300 motion-safe:animate-pulse sm:block"/>}<div className={`flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border-4 ${exo?"border-orange-300 bg-orange-300/15 shadow-[0_0_50px_rgba(251,146,60,.25)]":"border-cyan-300 bg-cyan-300/15 shadow-[0_0_50px_rgba(34,211,238,.25)]"}`}><FlaskConical className={`h-10 w-10 ${exo?"text-orange-200":"text-cyan-200"}`}/><span className="mt-2 font-black text-white">{t.system}</span></div>{exo?<ArrowRight className="hidden h-9 w-9 text-orange-300 motion-safe:animate-pulse sm:block"/>:<ArrowRight className="hidden h-9 w-9 rotate-180 text-cyan-300 motion-safe:animate-pulse sm:block"/>}<div className={`hidden text-center text-xs font-black sm:block ${exo?"text-orange-200":"text-cyan-200"}`}>{exo?t.heatOut:t.heatIn}</div></div><div className="relative mt-7 flex items-center justify-center gap-3"><Thermometer className={`h-9 w-9 ${exo?"text-orange-300":"text-cyan-300"}`}/><p className="text-sm font-black text-white">{exo?t.tempRise:t.tempFall}</p><span className={`text-2xl font-black ${exo?"text-orange-300":"text-cyan-300"}`}>{exo?"↑":"↓"}</span></div></div><p className="mt-4 text-sm font-semibold leading-6 text-slate-200">{exo?t.exoDef:t.endoDef}</p></Panel>;
}

function TemperatureGraph({lang}:{lang:Lang}) {
  const t=copy[lang]; const [mode,setMode]=useState<"exo"|"endo">("exo"); const exo=mode==="exo";
  return <Panel><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-black text-white">{t.thermoTitle}</h3><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">{t.thermoBody}</p></div><button type="button" onClick={()=>setMode(exo?"endo":"exo")} className={`min-h-11 rounded-full px-4 text-sm font-black ${exo?"bg-orange-300 text-orange-950":"bg-cyan-300 text-cyan-950"}`}>{exo?t.exo:t.endo}</button></div><svg viewBox="0 0 640 260" className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-900 p-3" role="img" aria-label={exo?t.tempRise:t.tempFall}><line x1="55" y1="25" x2="55" y2="220" stroke="#94a3b8" strokeWidth="2"/><line x1="55" y1="220" x2="610" y2="220" stroke="#94a3b8" strokeWidth="2"/><line x1="55" y1="140" x2="610" y2="140" stroke="#64748b" strokeDasharray="8 8"/><text x="65" y="132" fill="#94a3b8" fontSize="13">{lang==="bm"?"Suhu bilik":"Room temperature"}</text><path d={exo?"M55 140 C150 140 170 55 300 55 S450 130 610 140":"M55 140 C150 140 170 205 300 205 S450 150 610 140"} fill="none" stroke={exo?"#fdba74":"#67e8f9"} strokeWidth="6" strokeLinecap="round"/><text x="10" y="25" fill="#cbd5e1" fontSize="13">{lang==="bm"?"Suhu":"Temperature"}</text><text x="555" y="245" fill="#cbd5e1" fontSize="13">{lang==="bm"?"Masa":"Time"}</text></svg><p className="mt-3 text-xs leading-5 text-slate-400">{t.equilibrium}</p></Panel>;
}

function ExperimentVisual({lang}:{lang:Lang}) {
  const t=copy[lang]; const [selected,setSelected]=useState(0); const result=results[lang][selected]; const hot=selected===0||selected===2;
  return <div className="space-y-4"><Panel><h3 className="font-black text-white">{t.apparatus}</h3><div className="mt-4 grid items-center gap-5 md:grid-cols-[1fr_1.2fr]"><div className="relative mx-auto h-60 w-56"><div className="absolute bottom-3 left-5 h-40 w-44 rounded-b-[2.5rem] border-[10px] border-slate-300/80 bg-cyan-300/10"><div className="absolute inset-x-3 bottom-3 h-20 rounded-b-3xl bg-cyan-300/25"/><span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-black text-cyan-100">{lang==="bm"?"Campuran tindak balas":"Reaction mixture"}</span></div><div className="absolute left-1/2 top-1 h-44 w-4 -translate-x-1/2 rounded-full border-2 border-slate-200 bg-gradient-to-t from-rose-400 from-40% to-white to-40%"/><Thermometer className="absolute right-2 top-10 h-7 w-7 text-orange-300"/></div><div><Flow items={t.procedure}/></div></div><div className="mt-4 grid gap-2 sm:grid-cols-2"><div className="rounded-xl border border-cyan-300/15 bg-cyan-300/8 p-3 text-xs leading-5 text-slate-300"><strong className="block text-cyan-100">{lang==="bm"?"Sistem air + pepejal":"Water + solid system"}</strong>{lang==="bm"?"50 ml air; dua spatula NaOH, kemudian ulang dengan NH₄Cl.":"50 ml water; two spatulas of NaOH, then repeat with NH₄Cl."}</div><div className="rounded-xl border border-violet-300/15 bg-violet-300/8 p-3 text-xs leading-5 text-slate-300"><strong className="block text-violet-100">{lang==="bm"?"Sistem asid + alkali / karbonat":"Acid + alkali / carbonate system"}</strong>{lang==="bm"?"25 ml HCl 0.1 M + 25 ml NaOH 0.1 M; kemudian ulang HCl dengan NaHCO₃.":"25 ml 0.1 M HCl + 25 ml 0.1 M NaOH; then repeat HCl with NaHCO₃."}</div></div><p className="mt-3 text-xs leading-5 text-slate-400">{lang==="bm"?"Radas: cawan polistirena, termometer, spatula dan silinder penyukat. Bahan: NaOH, NH₄Cl, NaHCO₃, HCl 0.1 M dan air suling.":"Apparatus: polystyrene cup, thermometer, spatula and measuring cylinder. Materials: NaOH, NH₄Cl, NaHCO₃, 0.1 M HCl and distilled water."}</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{t.variables.map(x=><div key={x} className="rounded-xl bg-white/5 p-3 text-xs font-semibold leading-5 text-slate-300">{x}</div>)}</div><p className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/8 p-3 text-sm font-semibold leading-6 text-amber-100">{t.whyCup}</p></Panel><Panel><h3 className="font-black text-white">{t.resultsTitle}</h3><p className="mt-1 text-sm text-slate-400">{t.resultsHint}</p><div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">{results[lang].map((x,i)=><button key={x[0]} type="button" onClick={()=>setSelected(i)} className={`min-h-12 rounded-xl border px-3 text-xs font-black ${selected===i?"border-white/30 bg-white text-slate-950":"border-white/10 bg-white/5 text-slate-200"}`}>{x[0]}</button>)}</div><div className={`mt-4 rounded-2xl border p-4 ${hot?"border-orange-300/25 bg-orange-300/8":"border-cyan-300/25 bg-cyan-300/8"}`}><div className="flex items-center gap-3"><Thermometer className={`h-8 w-8 ${hot?"text-orange-300":"text-cyan-300"}`}/><div><p className="font-black text-white">{result[1]}</p><p className={`text-sm font-bold ${hot?"text-orange-200":"text-cyan-200"}`}>{result[2]}</p></div></div><p className="mt-3 text-sm text-slate-300">{result[3]}</p></div><p className="mt-3 rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300">{lang==="bm"?"Jangan samakan semua karbonat: HCl + natrium karbonat ialah eksotermik, tetapi HCl + natrium hidrogen karbonat dalam aktiviti ini ialah endotermik.":"Do not treat all carbonates alike: HCl + sodium carbonate is exothermic, but HCl + sodium hydrogen carbonate in this activity is endothermic."}</p></Panel></div>;
}

function DailyExamples({lang}:{lang:Lang}) {
  const exo=lang==="bm"?[["Pembakaran bunga api","Haba dan cahaya dibebaskan dengan pantas"],["Respirasi sel","Haba membantu mengekalkan suhu badan"],["Peneutralan","Asid + alkali membebaskan haba"],["Pengaratan besi","Haba dibebaskan secara beransur-ansur"]]:[["Burning fireworks","Heat and light are released rapidly"],["Cellular respiration","Released heat helps maintain body temperature"],["Neutralisation","Acid + alkali releases heat"],["Rusting iron","Heat is released gradually"]];
  const endo=lang==="bm"?[["Fotosintesis","Tenaga cahaya dan haba diserap"],["Membakar kek / roti","Adunan menyerap haba ketuhar"],["Pengekstrakan besi","Haba tinggi diperlukan untuk memutus ikatan"],["Penguraian CaCO₃","CaCO₃ → CaO + CO₂ memerlukan haba"]]:[["Photosynthesis","Light energy and heat are absorbed"],["Baking cake / bread","The mixture absorbs oven heat"],["Iron extraction","High heat is needed to break bonds"],["CaCO₃ decomposition","CaCO₃ → CaO + CO₂ requires heat"]];
  return <div className="grid gap-4 lg:grid-cols-2"><Panel><div className="flex items-center gap-2 text-orange-200"><Flame className="h-6 w-6"/><h3 className="font-black">{copy[lang].exo}</h3></div><div className="mt-4 grid gap-2">{exo.map(x=><div key={x[0]} className="rounded-xl bg-orange-300/8 p-3"><p className="text-sm font-black text-white">{x[0]}</p><p className="mt-1 text-xs leading-5 text-slate-300">{x[1]}</p></div>)}</div></Panel><Panel><div className="flex items-center gap-2 text-cyan-200"><Snowflake className="h-6 w-6"/><h3 className="font-black">{copy[lang].endo}</h3></div><div className="mt-4 grid gap-2">{endo.map(x=><div key={x[0]} className="rounded-xl bg-cyan-300/8 p-3"><p className="text-sm font-black text-white">{x[0]}</p><p className="mt-1 text-xs leading-5 text-slate-300">{x[1]}</p></div>)}</div></Panel></div>;
}

function InstantPacks({lang}:{lang:Lang}) {
  const t=copy[lang];
  return <div className="space-y-4"><div className="grid gap-4 lg:grid-cols-2"><Panel className="border-orange-300/20 bg-orange-950/20"><div className="flex items-center gap-3"><HeartPulse className="h-8 w-8 text-orange-300"/><div><h3 className="font-black text-white">{t.hotPack}</h3><p className="text-xs font-bold text-orange-200">{t.exo}</p></div></div><p className="mt-3 text-sm leading-6 text-slate-300">{t.hotNeed}</p><div className="mt-4 rounded-xl bg-orange-300/10 p-3 text-sm font-bold text-orange-100">CaCl₂ {lang==="bm"?"kontang atau":"anhydrous or"} MgSO₄ {lang==="bm"?"kontang + air → haba dibebaskan":"anhydrous + water → heat released"}</div></Panel><Panel className="border-cyan-300/20 bg-cyan-950/20"><div className="flex items-center gap-3"><Snowflake className="h-8 w-8 text-cyan-300"/><div><h3 className="font-black text-white">{t.coldPack}</h3><p className="text-xs font-bold text-cyan-200">{t.endo}</p></div></div><p className="mt-3 text-sm leading-6 text-slate-300">{t.coldNeed}</p><div className="mt-4 rounded-xl bg-cyan-300/10 p-3 text-sm font-bold text-cyan-100">NH₄NO₃ {lang==="bm"?"atau":"or"} NH₄Cl + {lang==="bm"?"air → haba diserap":"water → heat absorbed"}</div></Panel></div><Panel><h3 className="font-black text-white">{t.diyTitle}</h3><div className="mt-4"><Flow items={t.diySteps}/></div><p className="mt-3 text-xs leading-5 text-slate-400">{lang==="bm"?"Beg luar yang tebal dan tertutup menghalang campuran daripada bocor semasa beg air nipis di dalam dipecahkan.":"The sealed thick outer bag prevents leakage when the thin inner water bag is broken."}</p></Panel></div>;
}

export function ScienceF3Chapter5VisualNotesBlock({id,content,lang,isRead,onMarkRead}:{id?:string;content:ScienceF3InteractiveContent;lang:Lang;storageKey?:string;isRead?:boolean;onMarkRead?:()=>void}) {
  const t=copy[lang];
  return <section id={id} data-lang={lang} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-orange-300/15 bg-[#111126] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"><div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,.18),transparent_38%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,.14),transparent_34%)]"/><div className="relative mx-auto flex max-w-6xl flex-col gap-14">
    <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-orange-400/15 via-slate-950/40 to-cyan-400/15 p-5 sm:p-8"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-orange-200"><Thermometer className="h-4 w-4"/>{t.eyebrow}</div><h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-[1.02] text-white sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p><div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.roadmap.map((item,i)=><div key={item[0]} className="relative min-h-32 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs font-black tracking-[.14em] text-orange-300">0{i+1}</span><h2 className="mt-2 text-sm font-black text-white">{item[0]}</h2><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>{i<3&&<ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-[#111126] p-1 text-cyan-300 xl:block"/>}</div>)}</div></header>

    <div className="space-y-6"><SectionTitle number="5.1" title={t.introTitle} subtitle={t.introBody}/><Panel><div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="rounded-2xl border border-orange-300/20 bg-orange-300/8 p-5 text-center"><FlaskConical className="mx-auto h-9 w-9 text-orange-300"/><h3 className="mt-2 font-black text-white">{t.system}</h3><p className="mt-1 text-xs text-slate-300">{lang==="bm"?"Kawasan tindak balas kimia":"Region where reaction occurs"}</p></div><ArrowRight className="mx-auto hidden text-slate-400 sm:block"/><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-5 text-center"><CircleDot className="mx-auto h-9 w-9 text-cyan-300"/><h3 className="mt-2 font-black text-white">{t.surroundings}</h3><p className="mt-1 text-xs text-slate-300">{lang==="bm"?"Kawasan di luar sistem":"Region outside the system"}</p></div></div></Panel>
      <SectionTitle number="5.1A" title={t.compareTitle}/><HeatFlowVisual lang={lang}/><TemperatureGraph lang={lang}/><Check lang={lang} question={content.sections[0]?.checks[0]?.question??""} answer={content.sections[0]?.checks[0]?.hint??""}/>
    </div>

    <div className="space-y-6"><SectionTitle number="5.1B" title={t.experimentTitle} subtitle={t.experimentPurpose}/><ExperimentVisual lang={lang}/></div>

    <div className="space-y-6"><SectionTitle number="5.1C" title={t.dailyTitle}/><DailyExamples lang={lang}/><Check lang={lang} question={content.sections[0]?.checks[1]?.question??""} answer={content.sections[0]?.checks[1]?.hint??""}/></div>

    <div className="space-y-6"><SectionTitle number="5.1D" title={t.designTitle}/><InstantPacks lang={lang}/><SectionTitle number="5.1E" title={t.stemTitle}/><div className="grid gap-4 lg:grid-cols-2"><Panel><LampDesk className="h-8 w-8 text-violet-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Lampu kecemasan kemiluminesens":"Chemiluminescent emergency lamp"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang==="bm"?"Tindak balas kimia menghasilkan cahaya sejuk tanpa pembebasan haba, sesuai semasa bekalan elektrik terputus atau kebocoran gas.":"A chemical reaction produces cool light without releasing heat, suitable during power failures or gas leaks."}</p></Panel><Panel><Package className="h-8 w-8 text-emerald-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Bekas pengekalan suhu":"Temperature-retaining container"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang==="bm"?"Dwi-dinding dengan vakum menghalang konduksi dan perolakan; lapisan dalam berkilat memantulkan radiasi haba.":"Double walls with a vacuum prevent conduction and convection; a shiny inner layer reflects heat radiation."}</p></Panel></div></div>

    <div className="space-y-6"><SectionTitle number="5.1F" title={t.thermiteTitle}/><Panel className="border-orange-300/20 bg-gradient-to-br from-orange-500/12 to-slate-950/70"><div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]"><div><div className="flex items-center gap-3"><Factory className="h-9 w-9 text-orange-300"/><div><p className="text-xs font-black uppercase tracking-[.14em] text-orange-200">{t.exo}</p><h3 className="font-black text-white">{lang==="bm"?"Haba melebihi takat lebur besi":"Heat exceeds iron's melting point"}</h3></div></div><p className="mt-4 text-sm leading-6 text-slate-300">{lang==="bm"?"Pita magnesium mencetuskan tindak balas redoks sangat reaktif antara ferum(III) oksida dan serbuk aluminium.":"Magnesium ribbon ignites a highly reactive redox reaction between iron(III) oxide and aluminium powder."}</p></div><div className="rounded-2xl bg-orange-300/10 p-4 text-center font-mono text-sm font-bold leading-7 text-orange-50">{lang==="bm"?"Ferum(III) oksida + aluminium → besi leburan + aluminium oksida + haba tinggi":"Iron(III) oxide + aluminium → molten iron + aluminium oxide + intense heat"}</div></div><div className="mt-5"><Flow items={lang==="bm"?["Tindak balas termit","Besi cair mengalir ke celah","Besi menyejuk dan membeku","Landasan tersambung kuat"]:["Thermite reaction","Molten iron fills the gap","Iron cools and solidifies","Rail is joined strongly"]}/></div></Panel></div>

    <div className="space-y-6"><SectionTitle number="5.1G" title={t.environmentTitle}/><Panel><div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]"><div className="rounded-2xl border border-orange-300/20 bg-orange-300/8 p-5"><Flame className="h-8 w-8 text-orange-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Pembakaran bahan api fosil":"Burning fossil fuels"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang==="bm"?"Tindak balas eksotermik membebaskan haba dan CO₂. CO₂ memerangkap haba lalu meningkatkan pemanasan global.":"An exothermic reaction releases heat and CO₂. CO₂ traps heat and increases global warming."}</p></div><ArrowRight className="mx-auto hidden self-center text-emerald-300 lg:block"/><div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/8 p-5"><Trees className="h-8 w-8 text-emerald-300"/><h3 className="mt-3 font-black text-white">{lang==="bm"?"Tanam semula pokok":"Replant trees"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang==="bm"?"Fotosintesis ialah endotermik: tumbuhan menyerap tenaga dan CO₂, membantu mengurangkan kesan rumah hijau.":"Photosynthesis is endothermic: plants absorb energy and CO₂, helping reduce the greenhouse effect."}</p></div></div></Panel></div>

    {onMarkRead&&<div className="flex justify-center"><button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isRead?"bg-emerald-300/20 text-emerald-200":"bg-gradient-to-r from-orange-300 to-cyan-300 text-slate-950 hover:scale-[1.03] active:scale-[.97]"}`}><CheckCircle2 className="h-5 w-5"/>{isRead?t.marked:t.mark}</button></div>}
  </div></section>;
}
