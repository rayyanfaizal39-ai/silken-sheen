import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  Droplets,
  Fish,
  Leaf,
  ShieldAlert,
  Wind,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 2",
    title: "Fahami perjalanan gas yang mengekalkan kehidupan",
    subtitle: "Ikuti udara masuk ke peparu, lihat oksigen dan karbon dioksida bertukar tempat, kemudian bandingkan cara manusia, haiwan dan tumbuhan bernafas.",
    roadmap: [
      ["2.1 Sistem Respirasi Manusia", "Bagaimana udara bergerak dan perubahan isi padu serta tekanan menghasilkan pernafasan."],
      ["2.2 Pergerakan & Pertukaran Gas", "Bagaimana resapan, alveolus dan hemoglobin menghantar oksigen kepada sel."],
      ["2.3 Kesihatan Sistem Respirasi", "Bagaimana bahan pencemar dan asap rokok merosakkan laluan udara dan alveolus."],
      ["2.4 Adaptasi Sistem Respirasi", "Bagaimana katak, ikan dan serangga menyesuaikan permukaan pertukaran gas."],
      ["2.5 Pertukaran Gas dalam Tumbuhan", "Bagaimana stoma, osmosis, respirasi dan fotosintesis mengawal pertukaran gas."],
    ],
    check: "Uji diri", reveal: "Lihat jawapan", hide: "Tutup jawapan", mark: "Tandakan Bab 2 Selesai", marked: "Selesai ditanda",
  },
  en: {
    eyebrow: "Chapter 2 visual map",
    title: "Understand the gas journey that sustains life",
    subtitle: "Follow air into the lungs, watch oxygen and carbon dioxide exchange places, then compare how humans, animals and plants respire.",
    roadmap: [
      ["2.1 Human Respiratory System", "How air moves and changes in volume and pressure produce breathing."],
      ["2.2 Movement & Exchange of Gases", "How diffusion, alveoli and haemoglobin deliver oxygen to cells."],
      ["2.3 Respiratory Health", "How pollutants and cigarette smoke damage airways and alveoli."],
      ["2.4 Respiratory Adaptations", "How frogs, fish and insects adapt their gaseous-exchange surfaces."],
      ["2.5 Gaseous Exchange in Plants", "How stomata, osmosis, respiration and photosynthesis control gas exchange."],
    ],
    check: "Check yourself", reveal: "Reveal answer", hide: "Hide answer", mark: "Mark Chapter 2 as Read", marked: "Marked as read",
  },
} as const;

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_18px_60px_rgba(2,6,23,.28)] sm:p-6 ${className}`}>{children}</div>; }
function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) { return <div className="space-y-2"><span className="inline-flex rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-xs font-black tracking-[.16em] text-sky-200">{number}</span><h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>{subtitle && <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{subtitle}</p>}</div>; }
function Flow({ items, accent = "sky" }: { items: readonly string[]; accent?: "sky" | "rose" | "emerald" }) { const tone = accent === "rose" ? "border-rose-300/20 bg-rose-300/8 text-rose-50" : accent === "emerald" ? "border-emerald-300/20 bg-emerald-300/8 text-emerald-50" : "border-sky-300/20 bg-sky-300/8 text-sky-50"; return <div className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr sm:items-center">{items.map((item, index) => <div className="contents" key={item}><div className={`min-h-14 rounded-xl border p-3 text-center text-sm font-bold ${tone}`}>{item}</div>{index < items.length - 1 && <><ArrowDown className="mx-auto h-5 w-5 text-slate-400 sm:hidden"/><ArrowRight className="hidden h-5 w-5 text-slate-400 sm:block"/></>}</div>)}</div>; }
function Check({ lang, question, answer }: { lang: Lang; question: string; answer: string }) { const [open, setOpen] = useState(false); const t = copy[lang]; return <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-violet-200">{t.check}</p><p className="mt-2 text-sm font-semibold text-white">{question}</p><button type="button" aria-expanded={open} onClick={() => setOpen(value => !value)} className="mt-3 min-h-11 rounded-full bg-violet-300 px-4 text-sm font-black text-slate-950 transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{open ? t.hide : t.reveal}</button>{open && <p className="mt-3 rounded-xl bg-slate-950/60 p-3 text-sm leading-6 text-violet-100" aria-live="polite">{answer}</p>}</div>; }

function BreathingMechanism({ lang }: { lang: Lang }) {
  const [inhale, setInhale] = useState(true);
  const rows = inhale ? (lang === "bm" ? [["Otot interkostal", "Mengecut"], ["Sangkar rusuk", "Ke atas dan ke luar"], ["Diafragma", "Mengecut, turun dan meleper"], ["Isi padu toraks", "Bertambah"], ["Tekanan udara", "Berkurang"], ["Udara", "Masuk ke peparu"]] : [["Intercostal muscles", "Contract"], ["Rib cage", "Up and out"], ["Diaphragm", "Contracts, lowers and flattens"], ["Thoracic volume", "Increases"], ["Air pressure", "Decreases"], ["Air", "Enters lungs"]]) : (lang === "bm" ? [["Otot interkostal", "Mengendur"], ["Sangkar rusuk", "Ke bawah dan ke dalam"], ["Diafragma", "Mengendur, melengkung ke atas"], ["Isi padu toraks", "Berkurang"], ["Tekanan udara", "Bertambah"], ["Udara", "Keluar dari peparu"]] : [["Intercostal muscles", "Relax"], ["Rib cage", "Down and in"], ["Diaphragm", "Relaxes and curves upward"], ["Thoracic volume", "Decreases"], ["Air pressure", "Increases"], ["Air", "Leaves lungs"]]);
  return <div className="grid gap-4 lg:grid-cols-[.7fr_1.3fr]"><Panel><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={inhale} onClick={() => setInhale(true)} className={`min-h-12 rounded-xl text-xs font-black ${inhale ? "bg-sky-300 text-sky-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Menarik nafas" : "Inhalation"}</button><button type="button" aria-pressed={!inhale} onClick={() => setInhale(false)} className={`min-h-12 rounded-xl text-xs font-black ${!inhale ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Menghembus nafas" : "Exhalation"}</button></div><div className="relative mx-auto mt-5 h-56 w-52 rounded-t-[5rem] border-4 border-slate-500 bg-slate-900/70"><div className={`absolute left-7 top-14 h-28 w-16 rounded-[50%] border-4 border-sky-300/40 bg-sky-300/15 transition-transform duration-300 ease-out motion-reduce:transition-none ${inhale ? "scale-110" : "scale-90"}`}/><div className={`absolute right-7 top-14 h-28 w-16 rounded-[50%] border-4 border-sky-300/40 bg-sky-300/15 transition-transform duration-300 ease-out motion-reduce:transition-none ${inhale ? "scale-110" : "scale-90"}`}/><div className={`absolute inset-x-6 bottom-5 h-8 rounded-[50%] border-t-4 border-amber-300 transition-transform duration-300 ease-out motion-reduce:transition-none ${inhale ? "translate-y-3 scale-y-50" : "-translate-y-1"}`}/></div></Panel><Panel><div className="grid grid-cols-2 gap-2">{rows.map(row => <div key={row[0]} className="rounded-xl bg-white/5 p-3"><p className="text-[10px] font-black uppercase tracking-[.12em] text-slate-400">{row[0]}</p><p className="mt-1 text-xs font-bold text-white">{row[1]}</p></div>)}</div><p className="mt-4 text-xs leading-5 text-slate-400">{lang === "bm" ? "Model balang kaca: balang = sangkar rusuk, tiub-Y = trakea dan bronkus, belon = peparu, getah nipis = diafragma. Balang tegar tidak boleh menunjukkan pergerakan rusuk sebenar." : "Bell-jar model: jar = rib cage, Y-tube = trachea and bronchi, balloons = lungs, thin rubber sheet = diaphragm. The rigid jar cannot model real rib movement."}</p></Panel></div>;
}
function BreathingExperiments({ lang }: { lang: Lang }) {
  const [experiment, setExperiment] = useState<"oxygen" | "carbon">("oxygen");
  const oxygen = lang === "bm" ? ["Lilin menyala menggunakan O₂", "Balang ditelangkup dalam air", "Lilin padam", "Air naik lebih tinggi bagi udara sedutan", "O₂ udara sedutan lebih tinggi"] : ["Burning candle uses O₂", "Jar inverted in water", "Flame goes out", "Water rises higher for inhaled air", "Inhaled air has more O₂"];
  const carbon = lang === "bm" ? ["Udara melalui air kapur", "Banding udara sedutan dan hembusan", "Air kapur hembusan lebih keruh", "CO₂ udara hembusan lebih tinggi"] : ["Air passes through limewater", "Compare inhaled and exhaled air", "Exhaled-air limewater turns cloudier", "Exhaled air has more CO₂"];
  return <Panel><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setExperiment("oxygen")} className={`min-h-12 rounded-xl text-xs font-black ${experiment === "oxygen" ? "bg-sky-300 text-sky-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Eksperimen 2.1A · oksigen" : "Experiment 2.1A · oxygen"}</button><button type="button" onClick={() => setExperiment("carbon")} className={`min-h-12 rounded-xl text-xs font-black ${experiment === "carbon" ? "bg-amber-300 text-amber-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Eksperimen 2.1B · karbon dioksida" : "Experiment 2.1B · carbon dioxide"}</button></div><div className="mt-5"><Flow accent={experiment === "oxygen" ? "sky" : "emerald"} items={experiment === "oxygen" ? oxygen : carbon}/></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-sky-300/8 p-3 text-xs text-sky-100"><strong>{lang === "bm" ? "Udara sedutan:" : "Inhaled air:"}</strong> {lang === "bm" ? "lebih O₂, kurang CO₂" : "more O₂, less CO₂"}</div><div className="rounded-xl bg-rose-300/8 p-3 text-xs text-rose-100"><strong>{lang === "bm" ? "Udara hembusan:" : "Exhaled air:"}</strong> {lang === "bm" ? "kurang O₂, lebih CO₂" : "less O₂, more CO₂"}</div></div></Panel>;
}

function GasExchange({ lang }: { lang: Lang }) {
  const [location, setLocation] = useState<"alveolus" | "cell">("alveolus");
  const alveolus = lang === "bm" ? ["Alveolus · O₂ tinggi", "O₂ larut pada dinding lembap", "Resap ke kapilari · O₂ rendah", "Hemoglobin + O₂ ⇌ oksihemoglobin", "CO₂ resap ke alveolus dan dihembus"] : ["Alveolus · high O₂", "O₂ dissolves on moist wall", "Diffuses into capillary · low O₂", "Haemoglobin + O₂ ⇌ oxyhaemoglobin", "CO₂ diffuses into alveolus and is exhaled"];
  const cell = lang === "bm" ? ["Oksihemoglobin tiba di tisu", "Oksihemoglobin → hemoglobin + O₂", "O₂ resap ke sel", "Glukosa + O₂ → CO₂ + air + tenaga", "CO₂ resap ke darah"] : ["Oxyhaemoglobin reaches tissue", "Oxyhaemoglobin → haemoglobin + O₂", "O₂ diffuses into cell", "Glucose + O₂ → CO₂ + water + energy", "CO₂ diffuses into blood"];
  return <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]"><Panel><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setLocation("alveolus")} className={`min-h-12 rounded-xl text-xs font-black ${location === "alveolus" ? "bg-sky-300 text-sky-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Di alveolus" : "At the alveolus"}</button><button type="button" onClick={() => setLocation("cell")} className={`min-h-12 rounded-xl text-xs font-black ${location === "cell" ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Di sel badan" : "At body cells"}</button></div><div className="mt-5"><Flow accent={location === "alveolus" ? "sky" : "rose"} items={location === "alveolus" ? alveolus : cell}/></div><p className="mt-4 text-xs text-slate-400">{lang === "bm" ? "Resapan ialah pergerakan zarah dari kepekatan tinggi ke kepekatan rendah. Semakin besar perbezaan kepekatan, semakin cepat resapan." : "Diffusion is particle movement from high to low concentration. A larger concentration difference produces faster diffusion."}</p></Panel><Panel><div className="mx-auto flex h-44 w-44 items-center justify-center rounded-[45%_55%_50%_50%] border-8 border-sky-200/60 bg-sky-300/10"><div className="h-28 w-28 rounded-full border-4 border-dashed border-rose-300/50 motion-safe:animate-pulse"/></div><div className="mt-4 grid grid-cols-2 gap-2 text-xs">{(lang === "bm" ? ["Dinding 1 sel", "Permukaan lembap", "Luas permukaan besar", "Kapilari padat"] : ["One-cell wall", "Moist surface", "Large surface area", "Dense capillaries"]).map(item => <p key={item} className="rounded-lg bg-white/5 p-2 font-bold text-slate-200">{item}</p>)}</div></Panel></div>;
}

function PollutantExplorer({ lang }: { lang: Lang }) {
  const pollutants = lang === "bm" ? [
    ["Tar rokok", "Melekit, perang gelap", "Membunuh sel laluan udara, menambah mukus dan kahak; karsinogen utama."],
    ["Karbon monoksida", "Tidak berwarna dan berbau", "CO + hemoglobin → karboksihemoglobin stabil; pengangkutan O₂ dan tenaga sel berkurang."],
    ["Sulfur dioksida", "Arang batu · bau menyesakkan", "Merengsa saluran, menyebabkan batuk, sukar bernafas dan bronkitis."],
    ["Nitrogen dioksida", "Petrol/diesel · gas perang", "Merengsa saluran dan merangsang asma."],
    ["Jerebu, debu, debunga", "Zarah halus terampai", "Merengsa sistem respirasi dan mencetuskan asma."],
  ] : [
    ["Cigarette tar", "Sticky, dark brown", "Kills airway cells, increases mucus and phlegm; a major carcinogen."],
    ["Carbon monoxide", "Colourless and odourless", "CO + haemoglobin → stable carboxyhaemoglobin; oxygen transport and cellular energy fall."],
    ["Sulphur dioxide", "Coal burning · choking smell", "Irritates airways, causing cough, breathing difficulty and bronchitis."],
    ["Nitrogen dioxide", "Petrol/diesel · brown gas", "Irritates airways and triggers asthma."],
    ["Haze, dust, pollen", "Fine suspended particles", "Irritates the respiratory system and triggers asthma."],
  ];
  const [selected, setSelected] = useState(0); const item = pollutants[selected];
  return <Panel><div className="flex gap-2 overflow-x-auto pb-2">{pollutants.map((pollutant, index) => <button type="button" key={pollutant[0]} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-black ${selected === index ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{pollutant[0]}</button>)}</div><div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-300/8 p-4"><ShieldAlert className="h-8 w-8 text-rose-300"/><p className="mt-3 font-black text-white">{item[1]}</p><p className="mt-2 text-sm leading-6 text-slate-300">{item[2]}</p></div></Panel>;
}

function DiseaseCards({ lang }: { lang: Lang }) {
  const diseases = lang === "bm" ? [
    ["Asma", "Debu, debunga, jerebu, asap", "Sesak nafas · semput · batuk"],
    ["Bronkitis", "Bronkus meradang akibat tar/perengsa", "Batuk berterusan · tercungap · sukar tidur"],
    ["Emfisema", "Dinding alveolus pecah; luas permukaan merosot", "Sesak/sakit bernafas · sangat letih · tidak pulih sepenuhnya"],
    ["Kanser peparu", "Karsinogen seperti tar", "Batuk berterusan · kahak berdarah · sakit bernafas"],
  ] : [
    ["Asthma", "Dust, pollen, haze, smoke", "Shortness of breath · wheezing · cough"],
    ["Bronchitis", "Bronchial inflammation from tar/irritants", "Persistent cough · gasping · sleeplessness"],
    ["Emphysema", "Alveolar walls break; surface area collapses", "Breathlessness/pain · severe fatigue · no full recovery"],
    ["Lung cancer", "Carcinogens such as tar", "Persistent cough · bloody sputum · painful breathing"],
  ];
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{diseases.map(disease => <Panel key={disease[0]}><p className="font-black text-white">{disease[0]}</p><p className="mt-2 text-xs font-bold text-rose-200">{disease[1]}</p><p className="mt-2 text-xs leading-5 text-slate-300">{disease[2]}</p></Panel>)}</div>;
}

function SmokingExperiment({ lang }: { lang: Lang }) {
  const [smoke, setSmoke] = useState(false);
  return <Panel><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setSmoke(false)} className={`min-h-12 rounded-xl text-xs font-black ${!smoke ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Tanpa asap rokok" : "Without smoke"}</button><button type="button" onClick={() => setSmoke(true)} className={`min-h-12 rounded-xl text-xs font-black ${smoke ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Dengan asap rokok" : "With smoke"}</button></div><div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className="rounded-xl bg-white/5 p-4 text-center text-sm font-black text-white">{lang === "bm" ? "Rokok / udara" : "Cigarette / air"}</div><ArrowRight className="mx-auto hidden text-slate-400 sm:block"/><div className={`rounded-xl p-4 text-center text-sm font-black ${smoke ? "bg-amber-800 text-amber-100" : "bg-white/80 text-slate-800"}`}>{lang === "bm" ? `Kapas: ${smoke ? "perang · tar" : "warna asal"}` : `Cotton: ${smoke ? "brown · tar" : "unchanged"}`}</div><ArrowRight className="mx-auto hidden text-slate-400 sm:block"/><div className={`rounded-xl p-4 text-center text-sm font-black ${smoke ? "bg-rose-700 text-rose-100" : "bg-violet-500 text-white"}`}>{lang === "bm" ? `Litmus: ${smoke ? "merah · gas berasid" : "ungu"}` : `Litmus: ${smoke ? "red · acidic gases" : "purple"}`}</div></div><p className="mt-4 text-xs leading-5 text-rose-200">{lang === "bm" ? "Eksperimen 2.2 mesti dijalankan dalam kebuk wasap. Elakkan menyedut asap rokok. Perokok pasif turut menerima kesan berbahaya yang sama." : "Experiment 2.2 must be performed in a fume chamber. Avoid inhaling cigarette smoke. Passive smokers receive the same harmful exposure."}</p></Panel>;
}

function AdaptationExplorer({ lang }: { lang: Lang }) {
  const organisms = lang === "bm" ? [
    ["Katak · kulit lembap", "Darat + air", "Kulit nipis dan telap, mukus melarutkan gas, kapilari padat; turut menggunakan peparu.", "Gas → kulit lembap → kapilari", "Mukus memastikan permukaan sentiasa lembap."],
    ["Ikan · insang", "Air", "Banyak filamen dan lamela nipis memberi luas permukaan besar; aliran air membekalkan O₂ terlarut.", "Air → lamela → kapilari", "Ikan belacak menggunakan insang serta kulit luar lembap."],
    ["Serangga · trakea", "Darat", "Spirakel berinjap → trakea → trakeol nipis dan lembap → sel. Darah tidak mengangkut gas.", "Spirakel → trakea → trakeol → sel", "Kantung udara meningkatkan pertukaran gas semasa aktiviti cergas."],
  ] : [
    ["Frog · moist skin", "Land + water", "Thin permeable skin, gas-dissolving mucus and dense capillaries; also uses lungs.", "Gas → moist skin → capillary", "Mucus keeps the exchange surface moist."],
    ["Fish · gills", "Water", "Many filaments and thin lamellae create a large area; water flow supplies dissolved O₂.", "Water → lamellae → capillary", "Mudskippers use both gills and moist outer skin."],
    ["Insect · trachea", "Land", "Valved spiracle → trachea → thin moist tracheoles → cells. Blood does not carry gases.", "Spiracle → trachea → tracheole → cell", "Air sacs increase gaseous exchange during vigorous activity."],
  ];
  const [selected, setSelected] = useState(0); const item = organisms[selected];
  return <Panel><div className="grid grid-cols-3 gap-2">{organisms.map((organism, index) => <button type="button" key={organism[0]} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-12 rounded-xl px-2 text-xs font-black ${selected === index ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-slate-200"}`}>{organism[0]}</button>)}</div><div className="mt-5 grid gap-4 lg:grid-cols-[.55fr_1.45fr]"><div className="flex min-h-40 items-center justify-center rounded-2xl bg-emerald-300/8">{selected === 1 ? <Fish className="h-20 w-20 text-emerald-300"/> : selected === 2 ? <Wind className="h-20 w-20 text-emerald-300"/> : <Droplets className="h-20 w-20 text-emerald-300"/>}</div><div><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-200">{item[1]}</p><p className="mt-3 text-sm leading-6 text-slate-300">{item[2]}</p><p className="mt-4 rounded-xl bg-slate-950/50 p-3 text-sm font-black text-white">{item[3]}</p><p className="mt-3 text-xs text-emerald-100">{item[4]}</p></div></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-200">{(lang === "bm" ? ["Lembap", "Nipis", "Luas permukaan besar"] : ["Moist", "Thin", "Large surface area"]).map(feature => <span key={feature} className="rounded-xl bg-white/5 p-3">{feature}</span>)}</div></Panel>;
}

function PlantGasExchange({ lang }: { lang: Lang }) {
  const [day, setDay] = useState(true);
  const steps = day ? (lang === "bm" ? ["Cahaya → fotosintesis sel pengawal", "Glukosa meningkat", "Air masuk secara osmosis", "Sel segah dan membengkok", "Stoma terbuka"] : ["Light → guard-cell photosynthesis", "Glucose rises", "Water enters by osmosis", "Cells become turgid and curve", "Stoma opens"]) : (lang === "bm" ? ["Malam / hari terlalu panas", "Air keluar secara osmosis", "Sel pengawal flasid", "Sel menjadi lurus", "Stoma tertutup"] : ["Night / excessively hot day", "Water leaves by osmosis", "Guard cells become flaccid", "Cells straighten", "Stoma closes"]);
  return <div className="grid gap-4 lg:grid-cols-[.7fr_1.3fr]"><Panel><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setDay(true)} className={`min-h-12 rounded-xl text-xs font-black ${day ? "bg-amber-300 text-amber-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Siang" : "Day"}</button><button type="button" onClick={() => setDay(false)} className={`min-h-12 rounded-xl text-xs font-black ${!day ? "bg-violet-300 text-violet-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Malam / terlalu panas" : "Night / very hot"}</button></div><div className="mt-5 flex h-44 items-center justify-center rounded-2xl bg-emerald-950/40"><div className={`h-32 w-12 rounded-[100%] border-8 border-emerald-300/60 transition-transform duration-300 ease-out motion-reduce:transition-none ${day ? "-translate-x-3 -rotate-12" : "translate-x-0"}`}/><div className={`h-32 w-12 rounded-[100%] border-8 border-emerald-300/60 transition-transform duration-300 ease-out motion-reduce:transition-none ${day ? "translate-x-3 rotate-12" : "translate-x-0"}`}/></div><p className="mt-3 text-xs text-slate-400">{lang === "bm" ? "Dinding dalam tebal · dinding luar nipis" : "Thick inner wall · thin outer wall"}</p></Panel><Panel><Flow accent="emerald" items={steps}/><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-amber-300/8 p-3"><p className="text-xs font-black text-amber-100">{lang === "bm" ? "Respirasi" : "Respiration"}</p><p className="mt-1 text-xs text-slate-300">{lang === "bm" ? "Siang + malam: O₂ masuk, CO₂ keluar." : "Day + night: O₂ enters, CO₂ leaves."}</p></div><div className="rounded-xl bg-emerald-300/8 p-3"><p className="text-xs font-black text-emerald-100">{lang === "bm" ? "Fotosintesis" : "Photosynthesis"}</p><p className="mt-1 text-xs text-slate-300">{lang === "bm" ? "Siang sahaja: CO₂ masuk, O₂ keluar." : "Day only: CO₂ enters, O₂ leaves."}</p></div></div><p className="mt-3 text-xs leading-5 text-slate-400">{lang === "bm" ? "Gas bertukar melalui stoma daun, lentisel batang dan akar mengikut perbezaan kepekatan. Akar udara bakau membantu pertukaran gas." : "Gases exchange through leaf stomata, stem lenticels and roots according to concentration differences. Mangrove aerial roots assist gas exchange."}</p></Panel></div>;
}

function PlantPollution({ lang }: { lang: Lang }) {
  const items = lang === "bm" ? [
    ["Jerebu, debu, habuk", "Menyumbat stoma + menghalang cahaya → pertukaran gas dan fotosintesis menurun."],
    ["Hujan asid", "SO₂/NO₂ larut dalam hujan → sel mati, tanah berasid dan kurang subur, hasil pertanian merosot."],
    ["Pencegahan", "Haramkan pembakaran terbuka, hadkan kenderaan bandar dan gunakan tenaga bersih seperti suria."],
  ] : [
    ["Haze, dust, particles", "Block stomata + sunlight → gaseous exchange and photosynthesis decrease."],
    ["Acid rain", "SO₂/NO₂ dissolve in rain → cells die, soil acidifies and fertility and crop yield fall."],
    ["Prevention", "Ban open burning, limit city vehicles and use clean energy such as solar."],
  ];
  return <div className="grid gap-3 md:grid-cols-3">{items.map((item, index) => <Panel key={item[0]} className={index === 2 ? "border-emerald-300/20" : "border-rose-300/20"}>{index === 2 ? <Leaf className="h-8 w-8 text-emerald-300"/> : <CloudSun className="h-8 w-8 text-rose-300"/>}<h3 className="mt-3 font-black text-white">{item[0]}</h3><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p></Panel>)}</div>;
}

export function ScienceF3Chapter2VisualNotesBlock({ id, content, lang, isRead, onMarkRead }: { id?: string; content: ScienceF3InteractiveContent; lang: Lang; storageKey?: string; isRead?: boolean; onMarkRead?: () => void }) {
  const t = copy[lang]; const section = (index: number) => content.sections[index];
  return <section id={id} data-lang={lang} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-sky-300/15 bg-[#0b1724] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"><div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_14%,rgba(56,189,248,.18),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,.14),transparent_34%)]"/><div className="relative mx-auto flex max-w-6xl flex-col gap-14">
    <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-sky-400/15 via-slate-950/40 to-emerald-400/15 p-5 sm:p-8"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-sky-200"><Wind className="h-4 w-4"/>{t.eyebrow}</div><h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.02] text-white sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p><div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{t.roadmap.map((item, index) => <div key={item[0]} className="relative min-h-40 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs font-black tracking-[.14em] text-sky-300">{String(index + 1).padStart(2, "0")}</span><h2 className="mt-2 text-sm font-black leading-5 text-white">{item[0]}</h2><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>{index < 4 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-emerald-300/30 bg-[#0b1724] p-1 text-emerald-300 xl:block"/>}</div>)}</div><div className="mt-5 rounded-xl border border-sky-300/15 bg-sky-300/8 p-3 text-xs leading-5 text-sky-100">{lang === "bm" ? "Altitud tinggi mempunyai kurang O₂. Badan membebaskan sel darah merah dari limpa, menghasilkan lebih banyak sel darah merah dan memudahkan oksihemoglobin membebaskan O₂." : "High altitude has less O₂. The body releases stored red blood cells from the spleen, produces more red blood cells and helps oxyhaemoglobin release O₂."}</div></header>

    <div className="space-y-6"><SectionTitle number="2.1" title={lang === "bm" ? "Ikuti udara hingga ke tapak pertukaran gas" : "Follow air to the gaseous-exchange surface"} subtitle={lang === "bm" ? "Pernafasan membekalkan oksigen kepada sel dan menyingkirkan karbon dioksida." : "Breathing supplies oxygen to cells and removes carbon dioxide."}/><Panel><Flow items={lang === "bm" ? ["Lubang hidung", "Rongga hidung", "Farinks", "Larinks", "Trakea", "Bronkus", "Bronkiol", "Alveolus"] : ["Nostrils", "Nasal cavity", "Pharynx", "Larynx", "Trachea", "Bronchus", "Bronchiole", "Alveolus"]}/><p className="mt-4 text-xs text-slate-400">{lang === "bm" ? "Epiglotis membuka trakea semasa bernafas dan menutupnya semasa bolus ditelan." : "The epiglottis opens the trachea during breathing and closes it when a bolus is swallowed."}</p></Panel><SectionTitle number="2.1A" title={lang === "bm" ? "Isi padu mengubah tekanan, lalu menggerakkan udara" : "Volume changes pressure, which moves air"}/><BreathingMechanism lang={lang}/><SectionTitle number="2.1B" title={lang === "bm" ? "Bandingkan udara sedutan dengan udara hembusan" : "Compare inhaled and exhaled air"}/><BreathingExperiments lang={lang}/><Check lang={lang} question={section(0)?.checks[0]?.question ?? ""} answer={section(0)?.checks[0]?.hint ?? ""}/></div>

    <div className="space-y-6"><SectionTitle number="2.2" title={lang === "bm" ? "Jejaki O₂ ke sel dan CO₂ kembali ke peparu" : "Trace O₂ to cells and CO₂ back to the lungs"} subtitle={lang === "bm" ? "Gas bergerak secara resapan mengikut kecerunan kepekatan; hemoglobin mengangkut oksigen di antara kedua-dua tempat." : "Gases diffuse down concentration gradients; haemoglobin carries oxygen between the two locations."}/><GasExchange lang={lang}/><Check lang={lang} question={section(1)?.checks[0]?.question ?? ""} answer={section(1)?.checks[0]?.hint ?? ""}/></div>

    <div className="space-y-6"><SectionTitle number="2.3" title={lang === "bm" ? "Kenal pasti bahan, kerosakan dan penyakit" : "Connect each substance to damage and disease"}/><PollutantExplorer lang={lang}/><DiseaseCards lang={lang}/><SectionTitle number="2.3A" title={lang === "bm" ? "Eksperimen 2.2 mendedahkan tar dan gas berasid" : "Experiment 2.2 reveals tar and acidic gases"}/><SmokingExperiment lang={lang}/><Check lang={lang} question={section(2)?.checks[0]?.question ?? ""} answer={section(2)?.checks[0]?.hint ?? ""}/></div>

    <div className="space-y-6"><SectionTitle number="2.4" title={lang === "bm" ? "Habitat berbeza, prinsip permukaan respirasi sama" : "Different habitats, same respiratory-surface principles"} subtitle={lang === "bm" ? "Permukaan yang lembap, nipis dan luas mempercepat pertukaran gas dalam semua organisma." : "A moist, thin and large surface speeds gaseous exchange in every organism."}/><AdaptationExplorer lang={lang}/><Check lang={lang} question={section(3)?.checks[0]?.question ?? ""} answer={section(3)?.checks[0]?.hint ?? ""}/></div>

    <div className="space-y-6"><SectionTitle number="2.5" title={lang === "bm" ? "Tumbuhan menukar gas mengikut cahaya, kepekatan dan air" : "Plants exchange gases according to light, concentration and water"}/><PlantGasExchange lang={lang}/><SectionTitle number="2.5A" title={lang === "bm" ? "Pencemaran mengganggu pertukaran gas dan fotosintesis" : "Pollution disrupts gaseous exchange and photosynthesis"}/><PlantPollution lang={lang}/><Check lang={lang} question={section(4)?.checks[0]?.question ?? ""} answer={section(4)?.checks[0]?.hint ?? ""}/></div>

    {onMarkRead && <div className="flex justify-center"><button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isRead ? "bg-emerald-300/20 text-emerald-200" : "bg-gradient-to-r from-sky-300 to-emerald-300 text-slate-950 hover:scale-[1.03] active:scale-[.97]"}`}><CheckCircle2 className="h-5 w-5"/>{isRead ? t.marked : t.mark}</button></div>}
  </div></section>;
}
