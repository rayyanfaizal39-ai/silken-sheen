import { useState, type ReactNode } from "react";
import {
  Activity,
  Atom,
  BadgeAlert,
  Bone,
  CheckCircle2,
  ChevronRight,
  Factory,
  HeartPulse,
  History,
  Microscope,
  Orbit,
  Radiation,
  ShieldCheck,
  Sprout,
  Stethoscope,
  TimerReset,
  Utensils,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 8",
    title: "Lihat yang tidak kelihatan",
    subtitle: "Jejaki nukleus tidak stabil, fahami separuh hayat, bandingkan kuasa sinaran dan lihat bagaimana keradioaktifan digunakan dengan selamat.",
    path: [
      ["8.1 Penemuan Keradioaktifan", "Daripada sinar-X kepada pereputan dan separuh hayat."],
      ["8.2 Atom & Nukleus", "Lihat bagaimana kehilangan atau penerimaan elektron membentuk ion."],
      ["8.3 Sinaran Mengion", "Bandingkan alfa, beta dan gama serta dos selamat."],
      ["8.4 Kegunaan", "Hubungkan radioisotop dengan industri dan protokol keselamatan."],
    ],
    discoveryTitle: "Tiga penemuan membuka dunia atom",
    discoveryBody: "Keradioaktifan ditemui melalui siri pemerhatian tidak sengaja yang akhirnya membuktikan bahawa nukleus tidak stabil boleh berubah sendiri.",
    timeline: [
      ["1895", "Wilhelm Roentgen", "Menemui sinar-X ketika mengkaji tiub sinar katod; sinar itu menembusi tisu lembut dan menghasilkan imej tulang."],
      ["1896", "Henri Becquerel", "Sebatian uranium menghitamkan plat fotografi walaupun disimpan dalam gelap — bukti pancaran spontan."],
      ["1897", "Marie & Pierre Curie", "Menggunakan kuasa pengionan untuk mengesan radiasi dan mengekstrak polonium serta radium daripada picblend."],
    ],
    definition: "Keradioaktifan ialah pereputan rawak dan spontan nukleus tidak stabil dengan memancarkan alfa, beta atau gama untuk menjadi lebih stabil.",
    decayTitle: "Apa yang keluar daripada nukleus?",
    alphaDecay: "U-238 → Th-234 + α. Zarah alfa ialah nukleus helium: 2 proton + 2 neutron.",
    betaDecay: "Th-234 → Pa-234 + β. Zarah beta ialah elektron berkelajuan tinggi.",
    gammaDecay: "Co-60* → Co-60 + γ. Sinar gama ialah gelombang elektromagnet bertenaga tinggi.",
    activityTitle: "Keaktifan mengira kadar pereputan",
    halfLifeTitle: "Separuh hayat: separuh, kemudian separuh lagi",
    halfLifeBody: "Separuh hayat ialah masa untuk bilangan nukleus belum mereput berkurang kepada separuh nilai asal. Pilih bilangan separuh hayat untuk melihat baki Pa-234 daripada 80 g.",
    halfLives: "Bilangan separuh hayat",
    remaining: "Jisim tertinggal",
    elapsed: "Masa berlalu",
    atomTitle: "Cas atom berubah apabila elektron bergerak",
    atomBody: "Proton dan neutron kekal di dalam nukleus. Hanya elektron hilang atau diterima semasa ion terbentuk.",
    neutral: "Atom neutral",
    cation: "Kation · ion positif",
    anion: "Anion · ion negatif",
    neutralRule: "Bilangan proton = bilangan elektron, maka cas bersih sifar.",
    cationRule: "KEHILANGAN elektron → proton melebihi elektron → cas positif.",
    anionRule: "MENERIMA elektron → elektron melebihi proton → cas negatif.",
    sodium: "Na: 11p, 11e → hilang 1e → Na⁺: 11p, 10e",
    chlorine: "Cl: 17p, 17e → terima 1e → Cl⁻: 17p, 18e",
    radiationTitle: "Pengionan dan penembusan bergerak bertentangan",
    radiationBody: "Sinaran mengion mempunyai tenaga cukup untuk menyingkirkan elektron daripada atom. Bagi alfa, beta dan gama: semakin tinggi kuasa pengionan, semakin rendah kuasa penembusan.",
    alpha: "Alfa (α)",
    beta: "Beta (β)",
    gamma: "Gama (γ)",
    ionising: "Kuasa pengionan",
    penetration: "Kuasa penembusan",
    high: "Tinggi",
    medium: "Sederhana",
    low: "Rendah",
    alphaNature: "Nukleus helium · cas +2 · dihalang kertas",
    betaNature: "Elektron laju · cas −1 · dihalang aluminium 3 mm",
    gammaNature: "Gelombang EM · neutral · dihalang plumbum 10 cm / konkrit tebal",
    spectrumTitle: "Spektrum elektromagnet",
    nonIonising: "Tak mengion: VLF → radio → mikro → inframerah → cahaya nampak",
    ionisingZone: "Mengion: ultraungu → sinar-X → sinar gama",
    doseTitle: "Dos ialah kesan biologi pada tisu",
    safe: "Aras normal",
    safeValue: "< 0.2 μSv/j",
    doseDefinition: "1 Sv = 1 J tenaga sinaran mengion diserap oleh 1 kg tisu hidup. Pembilang Geiger mengesan radiasi latar.",
    reduce: "Kurangkan dos dengan tiga prinsip",
    doseRules: [["Masa", "Kurangkan tempoh dedahan."], ["Jarak", "Jauhkan diri daripada sumber."], ["Adangan", "Gunakan bahan pelindung yang sesuai."]],
    exposure: "Contoh kawalan harian",
    exposureItems: ["Sinar-X hanya apabila disyorkan doktor.", "Hadkan masa krew penerbangan pada altitud tinggi.", "Gunakan filem anti-UV untuk cahaya ultraungu.", "Elakkan makanan dari kawasan tercemar radioaktif."],
    usesTitle: "Satu fenomena, enam bidang",
    usesBody: "Pilih bidang untuk melihat radioisotop atau sinaran yang digunakan dan mengapa sifat itu sesuai.",
    useData: [
      ["Arkeologi", "C-14", "Separuh hayat 5,700 tahun; baki aktiviti beta menentukan usia bahan organik purba."],
      ["Industri", "Sinar beta", "Pengesan mengawal ketebalan kepingan logam: bacaan tinggi bermaksud kepingan terlalu nipis."],
      ["Pertanian", "P-32", "Penjejak beta mengukur penyerapan baja; sinaran juga memandulkan serangga perosak."],
      ["Makanan", "Sinar gama", "Membunuh mikroorganisma dan melambatkan pembusukan tanpa meninggalkan sisa kimia."],
      ["Perubatan", "Co-60 / Cs-137", "Gama memusnahkan sel kanser; Na-24 menjejak bekuan darah dan I-131 merawat tiroid."],
      ["Pertahanan", "U-235 / Pu-239", "Digunakan dalam senjata nuklear dengan kesan haba, radiasi dan mutasi yang dahsyat."],
    ],
    safetyTitle: "Kendalikan dengan masa singkat, jarak jauh dan adangan tebal",
    safetyItems: ["Simpan dalam bekas plumbum tebal.", "Gunakan tangan robotik — jangan sentuh terus.", "Pakai pakaian pelindung khas.", "Pantau dos terkumpul dengan lencana sinaran.", "Sisa dimeterai dalam tong keluli, plumbum dan simen.", "Pamerkan simbol amaran radioaktif."],
    insideWarning: "Alfa sukar menembusi kulit, tetapi paling berbahaya jika masuk ke dalam badan kerana kuasa pengionannya sangat tinggi.",
    recapTitle: "Semak sebelum tamat",
    recap: ["Rawak dan spontan ialah dua kata kunci definisi keradioaktifan.", "1 Bq bersamaan 1 pereputan sesaat.", "Kation kehilangan elektron; anion menerima elektron.", "Alfa: pengionan tertinggi, penembusan terendah. Gama: sebaliknya.", "Dos di bawah 0.2 μSv/j dianggap aras latar normal.", "Padankan jenis sinaran dengan kuasa penembusan yang diperlukan."],
    mark: "Tandakan Bab 8 Selesai",
    marked: "Bab 8 selesai",
  },
  en: {
    eyebrow: "Chapter 8 visual map",
    title: "See the invisible",
    subtitle: "Track unstable nuclei, understand half-life, compare radiation power and see how radioactivity is used safely.",
    path: [
      ["8.1 Discovery of Radioactivity", "From X-rays to decay and half-life."],
      ["8.2 Atom & Nucleus", "See how losing or gaining electrons forms ions."],
      ["8.3 Ionising Radiation", "Compare alpha, beta and gamma, and safe doses."],
      ["8.4 Uses", "Connect radioisotopes to industry and safety protocols."],
    ],
    discoveryTitle: "Three discoveries opened the atomic world",
    discoveryBody: "Radioactivity emerged through a chain of accidental observations that ultimately proved an unstable nucleus can change by itself.",
    timeline: [
      ["1895", "Wilhelm Roentgen", "Discovered X-rays while studying cathode-ray tubes; the rays passed through soft tissue and produced bone images."],
      ["1896", "Henri Becquerel", "A uranium compound blackened a photographic plate even in darkness — evidence of spontaneous emission."],
      ["1897", "Marie & Pierre Curie", "Used ionising power to detect radiation and extracted polonium and radium from pitchblende."],
    ],
    definition: "Radioactivity is the random and spontaneous decay of an unstable nucleus, emitting alpha, beta or gamma radiation to become more stable.",
    decayTitle: "What leaves the nucleus?",
    alphaDecay: "U-238 → Th-234 + α. An alpha particle is a helium nucleus: 2 protons + 2 neutrons.",
    betaDecay: "Th-234 → Pa-234 + β. A beta particle is a high-speed electron.",
    gammaDecay: "Co-60* → Co-60 + γ. A gamma ray is a high-energy electromagnetic wave.",
    activityTitle: "Activity counts the rate of decay",
    halfLifeTitle: "Half-life: halve it, then halve it again",
    halfLifeBody: "Half-life is the time for the number of undecayed nuclei to fall to half its original value. Choose the number of half-lives to see how much remains from 80 g of Pa-234.",
    halfLives: "Number of half-lives",
    remaining: "Mass remaining",
    elapsed: "Elapsed time",
    atomTitle: "An atom's charge changes when electrons move",
    atomBody: "Protons and neutrons stay in the nucleus. Only electrons are lost or gained when an ion forms.",
    neutral: "Neutral atom",
    cation: "Cation · positive ion",
    anion: "Anion · negative ion",
    neutralRule: "Number of protons = number of electrons, so net charge is zero.",
    cationRule: "LOSES electrons → protons outnumber electrons → positive charge.",
    anionRule: "GAINS electrons → electrons outnumber protons → negative charge.",
    sodium: "Na: 11p, 11e → loses 1e → Na⁺: 11p, 10e",
    chlorine: "Cl: 17p, 17e → gains 1e → Cl⁻: 17p, 18e",
    radiationTitle: "Ionisation and penetration move in opposite directions",
    radiationBody: "Ionising radiation has enough energy to remove electrons from atoms. For alpha, beta and gamma: the higher the ionising power, the lower the penetration power.",
    alpha: "Alpha (α)",
    beta: "Beta (β)",
    gamma: "Gamma (γ)",
    ionising: "Ionising power",
    penetration: "Penetration power",
    high: "High",
    medium: "Moderate",
    low: "Low",
    alphaNature: "Helium nucleus · charge +2 · stopped by paper",
    betaNature: "Fast electron · charge −1 · stopped by 3 mm aluminium",
    gammaNature: "EM wave · neutral · stopped by 10 cm lead / thick concrete",
    spectrumTitle: "Electromagnetic spectrum",
    nonIonising: "Non-ionising: VLF → radio → microwave → infrared → visible light",
    ionisingZone: "Ionising: ultraviolet → X-ray → gamma ray",
    doseTitle: "Dose is the biological effect on tissue",
    safe: "Normal level",
    safeValue: "< 0.2 μSv/h",
    doseDefinition: "1 Sv = 1 J of ionising-radiation energy absorbed by 1 kg of living tissue. A Geiger counter detects background radiation.",
    reduce: "Reduce dose with three principles",
    doseRules: [["Time", "Reduce exposure duration."], ["Distance", "Move farther from the source."], ["Shielding", "Use the correct protective material."]],
    exposure: "Everyday controls",
    exposureItems: ["Have X-rays only when advised by a doctor.", "Limit aircrew time at high altitude.", "Use anti-UV film for ultraviolet light.", "Avoid food from radioactively contaminated areas."],
    usesTitle: "One phenomenon, six fields",
    usesBody: "Choose a field to see which radioisotope or radiation is used and why its properties fit the task.",
    useData: [
      ["Archaeology", "C-14", "A 5,700-year half-life; remaining beta activity reveals the age of ancient organic material."],
      ["Industry", "Beta radiation", "A detector controls metal-sheet thickness: a high reading means the sheet is too thin."],
      ["Agriculture", "P-32", "A beta tracer measures fertiliser uptake; radiation also sterilises insect pests."],
      ["Food", "Gamma rays", "Kill microorganisms and slow spoilage without leaving chemical residue."],
      ["Medicine", "Co-60 / Cs-137", "Gamma destroys cancer cells; Na-24 traces blood clots and I-131 treats the thyroid."],
      ["Defence", "U-235 / Pu-239", "Used in nuclear weapons with devastating heat, radiation and mutation effects."],
    ],
    safetyTitle: "Handle with short time, long distance and thick shielding",
    safetyItems: ["Store in thick lead containers.", "Use robotic hands — never touch directly.", "Wear specialised protective clothing.", "Monitor cumulative dose with a radiation badge.", "Seal waste in steel, lead and concrete.", "Display the radioactive warning symbol."],
    insideWarning: "Alpha cannot easily penetrate skin, but it is the most dangerous inside the body because its ionising power is extremely high.",
    recapTitle: "Check before you finish",
    recap: ["Random and spontaneous are the two keywords in the definition of radioactivity.", "1 Bq equals 1 decay per second.", "A cation loses electrons; an anion gains electrons.", "Alpha: highest ionisation, lowest penetration. Gamma: the reverse.", "A dose below 0.2 μSv/h is considered normal background level.", "Match each radiation type to the penetration required for its job."],
    mark: "Mark Chapter 8 Complete",
    marked: "Chapter 8 complete",
  },
} as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${className}`}>{children}</div>;
}

function SectionHeading({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-300">{number}</span><h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{body}</p></div>;
}

function Meter({ label, value, tone }: { label: string; value: number; tone: string }) {
  return <div><div className="mb-1 flex justify-between text-xs font-bold text-slate-300"><span>{label}</span><span>{value}%</span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-950/75"><div className={`h-full rounded-full transition-[width] duration-300 ${tone}`} style={{ width: `${value}%` }} /></div></div>;
}

export function ScienceF3Chapter8VisualNotesBlock({ id, content, lang, isRead, onMarkRead }: { id?: string; content: ScienceF3InteractiveContent; lang: Lang; storageKey?: string; isRead?: boolean; onMarkRead?: () => void }) {
  const t = copy[lang];
  const [halfLives, setHalfLives] = useState(0);
  const [ion, setIon] = useState<"neutral" | "cation" | "anion">("neutral");
  const [radiation, setRadiation] = useState<"alpha" | "beta" | "gamma">("alpha");
  const [useIndex, setUseIndex] = useState(0);
  const mass = 80 / 2 ** halfLives;
  const ionData = {
    neutral: { label: t.neutral, rule: t.neutralRule, example: lang === "bm" ? "Na: 11p, 11e · cas = 0" : "Na: 11p, 11e · charge = 0", protons: 11, electrons: 11, charge: "0" },
    cation: { label: t.cation, rule: t.cationRule, example: t.sodium, protons: 11, electrons: 10, charge: "+1" },
    anion: { label: t.anion, rule: t.anionRule, example: t.chlorine, protons: 17, electrons: 18, charge: "−1" },
  }[ion];
  const radiationData = {
    alpha: { label: t.alpha, symbol: "α", nature: t.alphaNature, ion: 100, pen: 20, ionWord: t.high, penWord: t.low, shield: lang === "bm" ? "Kertas" : "Paper" },
    beta: { label: t.beta, symbol: "β", nature: t.betaNature, ion: 60, pen: 55, ionWord: t.medium, penWord: t.medium, shield: lang === "bm" ? "Aluminium 3 mm" : "3 mm aluminium" },
    gamma: { label: t.gamma, symbol: "γ", nature: t.gammaNature, ion: 25, pen: 100, ionWord: t.low, penWord: t.high, shield: lang === "bm" ? "Plumbum 10 cm" : "10 cm lead" },
  }[radiation];
  const useIcons = [Bone, Factory, Sprout, Utensils, Stethoscope, BadgeAlert];
  const UseIcon = useIcons[useIndex];

  return <section id={id} data-lang={lang} data-chapter={content.chapter} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-fuchsia-300/15 bg-[#111124] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_12%,rgba(217,70,239,.17),transparent_34%),radial-gradient(circle_at_82%_15%,rgba(34,211,238,.13),transparent_32%)]" />
    <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
      <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-fuchsia-400/15 via-slate-950/40 to-cyan-400/10 p-5 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-fuchsia-200"><Radiation className="h-4 w-4" />{t.eyebrow}</div>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.path.map((item, index) => <div key={item[0]} className="relative rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs font-black text-fuchsia-300">0{index + 1}</span><h2 className="mt-2 text-sm font-black text-white">{item[0]}</h2><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>{index < 3 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-[#111124] p-1 text-cyan-300 xl:block" />}</div>)}</div>
      </header>

      <div className="space-y-6">
        <SectionHeading number="8.1" title={t.discoveryTitle} body={t.discoveryBody} />
        <div className="grid gap-3 lg:grid-cols-3">{t.timeline.map((item, index) => <Panel key={item[0]} className={index === 1 ? "border-fuchsia-300/30 bg-fuchsia-300/[0.07]" : ""}><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-fuchsia-300/15 font-mono text-xs font-black text-fuchsia-200">{item[0]}</span><History className="h-5 w-5 text-cyan-300" /></div><h3 className="mt-4 font-black text-white">{item[1]}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{item[2]}</p></Panel>)}</div>
        <Panel className="border-fuchsia-300/25 bg-fuchsia-300/[0.06]"><div className="flex gap-3"><Atom className="mt-1 h-8 w-8 shrink-0 text-fuchsia-300" /><div><p className="text-xs font-black uppercase tracking-[.15em] text-fuchsia-200">{lang === "bm" ? "Definisi wajib hafal" : "Definition to remember"}</p><p className="mt-2 text-base font-bold leading-7 text-white">{t.definition}</p></div></div></Panel>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]"><Panel><h3 className="font-black text-white">{t.decayTitle}</h3><div className="mt-4 grid gap-3 sm:grid-cols-3">{[["α", t.alphaDecay, "text-amber-300"], ["β", t.betaDecay, "text-cyan-300"], ["γ", t.gammaDecay, "text-fuchsia-300"]].map((item) => <div key={item[0]} className="rounded-xl bg-slate-950/55 p-3"><span className={`text-3xl font-black ${item[2]}`}>{item[0]}</span><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p></div>)}</div></Panel><Panel><h3 className="font-black text-white">{t.activityTitle}</h3><div className="mt-4 rounded-xl bg-cyan-300/10 p-4"><p className="font-mono text-xl font-black text-cyan-200">1 Bq = 1 {lang === "bm" ? "pereputan/s" : "decay/s"}</p><p className="mt-2 text-xs text-slate-300">1 Ci = 3.7 × 10¹⁰ Bq</p></div><p className="mt-3 text-xs leading-5 text-slate-400">C-14 · Rn-222 · Th-234 · U-238</p></Panel></div>

        <Panel><div className="flex items-start gap-3"><TimerReset className="mt-1 h-8 w-8 shrink-0 text-cyan-300" /><div><h3 className="font-black text-white">{t.halfLifeTitle}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{t.halfLifeBody}</p></div></div><div className="mt-5 grid gap-5 lg:grid-cols-[.75fr_1.25fr]"><div><label htmlFor="half-life-range" className="text-xs font-black uppercase tracking-[.14em] text-cyan-200">{t.halfLives}: {halfLives}</label><input id="half-life-range" type="range" min="0" max="4" step="1" value={halfLives} onChange={(event) => setHalfLives(Number(event.target.value))} className="mt-4 w-full accent-cyan-300" /><div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-xl bg-white/5 p-3"><p className="text-xs text-slate-400">{t.elapsed}</p><p className="mt-1 font-mono text-lg font-black text-white">{(halfLives * 5.2).toFixed(1)} h</p></div><div className="rounded-xl bg-cyan-300/10 p-3"><p className="text-xs text-cyan-100">{t.remaining}</p><p className="mt-1 font-mono text-lg font-black text-cyan-200">{mass} g</p></div></div></div><div className="grid grid-cols-5 gap-2">{[0, 1, 2, 3, 4].map((step) => { const stepMass = 80 / 2 ** step; return <button key={step} type="button" onClick={() => setHalfLives(step)} aria-label={`${step} ${t.halfLives}`} className={`flex min-h-36 flex-col justify-end rounded-xl border p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${halfLives === step ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-white/[0.03]"}`}><div className="w-full rounded-lg bg-gradient-to-t from-fuchsia-500 to-cyan-300 transition-[height] duration-300" style={{ height: `${Math.max(8, stepMass)}%` }} /><span className="mt-2 text-center font-mono text-xs font-black">{stepMass}g</span></button>; })}</div></div></Panel>
      </div>

      <div className="space-y-6">
        <SectionHeading number="8.2" title={t.atomTitle} body={t.atomBody} />
        <div className="grid gap-3 sm:grid-cols-3" role="tablist" aria-label={t.atomTitle}>{(["neutral", "cation", "anion"] as const).map((key) => <button key={key} type="button" role="tab" aria-selected={ion === key} onClick={() => setIon(key)} className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 ${ion === key ? "border-fuchsia-300 bg-fuchsia-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}>{key === "neutral" ? t.neutral : key === "cation" ? t.cation : t.anion}</button>)}</div>
        <Panel><div className="grid items-center gap-6 lg:grid-cols-[.8fr_1.2fr]"><div className="relative mx-auto grid h-56 w-56 place-items-center rounded-full border border-dashed border-cyan-300/40"><div className="absolute inset-8 rounded-full border border-dashed border-fuchsia-300/35" /><div className="z-10 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-700 shadow-lg shadow-fuchsia-500/20"><div className="text-center"><p className="text-xs font-bold text-fuchsia-100">{ionData.protons}p</p><p className="text-xs text-fuchsia-200">{lang === "bm" ? "nukleus" : "nucleus"}</p></div></div>{Array.from({ length: Math.min(ionData.electrons, 12) }, (_, index) => <span key={index} className="absolute grid h-5 w-5 place-items-center rounded-full bg-cyan-300 text-[9px] font-black text-slate-950" style={{ transform: `rotate(${index * 30}deg) translateY(-102px) rotate(-${index * 30}deg)` }}>e</span>)}<span className={`absolute right-2 top-2 grid h-12 w-12 place-items-center rounded-full text-lg font-black ${ion === "neutral" ? "bg-slate-600" : ion === "cation" ? "bg-amber-300 text-slate-950" : "bg-cyan-300 text-slate-950"}`}>{ionData.charge}</span></div><div><div className="flex items-center gap-3"><Orbit className="h-7 w-7 text-cyan-300" /><h3 className="text-xl font-black text-white">{ionData.label}</h3></div><p className="mt-3 text-base font-bold leading-7 text-fuchsia-100">{ionData.rule}</p><p className="mt-4 rounded-xl bg-slate-950/60 p-4 font-mono text-sm font-bold text-cyan-200">{ionData.example}</p></div></div></Panel>
      </div>

      <div className="space-y-6">
        <SectionHeading number="8.3" title={t.radiationTitle} body={t.radiationBody} />
        <Panel><h3 className="font-black text-white">{t.spectrumTitle}</h3><div className="mt-4 grid gap-2 lg:grid-cols-[1.5fr_.7fr]"><div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-sm font-bold text-cyan-100">{t.nonIonising}</div><div className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/[0.08] p-4 text-sm font-bold text-fuchsia-100">{t.ionisingZone}</div></div><div className="mt-3 flex justify-between text-[11px] font-bold text-slate-400"><span>{lang === "bm" ? "Frekuensi rendah · λ panjang" : "Low frequency · long λ"}</span><span>{lang === "bm" ? "Frekuensi tinggi · λ pendek" : "High frequency · short λ"}</span></div></Panel>
        <div className="grid gap-3 sm:grid-cols-3" role="tablist" aria-label={t.radiationTitle}>{(["alpha", "beta", "gamma"] as const).map((key) => <button key={key} type="button" role="tab" aria-selected={radiation === key} onClick={() => setRadiation(key)} className={`min-h-20 rounded-2xl border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 ${radiation === key ? "border-fuchsia-300 bg-fuchsia-300/15" : "border-white/10 bg-white/[0.04]"}`}><span className="text-2xl font-black text-fuchsia-300">{key === "alpha" ? "α" : key === "beta" ? "β" : "γ"}</span><span className="ml-3 text-sm font-black text-white">{key === "alpha" ? t.alpha : key === "beta" ? t.beta : t.gamma}</span></button>)}</div>
        <Panel className="border-fuchsia-300/25"><div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><div><div className="flex items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-fuchsia-300/15 text-4xl font-black text-fuchsia-300">{radiationData.symbol}</span><div><h3 className="text-xl font-black text-white">{radiationData.label}</h3><p className="mt-1 text-sm text-slate-300">{radiationData.nature}</p></div></div><div className="mt-5 rounded-xl bg-slate-950/60 p-4 text-center"><p className="text-xs text-slate-400">{lang === "bm" ? "Bahan pengadang" : "Shielding material"}</p><p className="mt-1 font-black text-cyan-200">{radiationData.shield}</p></div></div><div className="space-y-5"><div><div className="mb-2 flex justify-between text-sm font-bold"><span>{t.ionising}</span><span className="text-amber-300">{radiationData.ionWord}</span></div><Meter label={t.ionising} value={radiationData.ion} tone="bg-amber-400" /></div><div><div className="mb-2 flex justify-between text-sm font-bold"><span>{t.penetration}</span><span className="text-cyan-300">{radiationData.penWord}</span></div><Meter label={t.penetration} value={radiationData.pen} tone="bg-cyan-400" /></div></div></div></Panel>

        <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]"><Panel className="border-emerald-300/20"><div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-emerald-300" /><div><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-200">{t.safe}</p><p className="font-mono text-2xl font-black text-white">{t.safeValue}</p></div></div><p className="mt-4 text-sm leading-6 text-slate-300">{t.doseDefinition}</p></Panel><Panel><h3 className="font-black text-white">{t.reduce}</h3><div className="mt-4 grid gap-2 sm:grid-cols-3">{t.doseRules.map((item) => <div key={item[0]} className="rounded-xl bg-white/5 p-3"><p className="font-black text-fuchsia-200">{item[0]}</p><p className="mt-1 text-xs leading-5 text-slate-300">{item[1]}</p></div>)}</div></Panel></div>
        <Panel><h3 className="font-black text-white">{t.exposure}</h3><div className="mt-4 grid gap-2 sm:grid-cols-2">{t.exposureItems.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-slate-950/50 p-3 text-sm text-slate-300"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />{item}</div>)}</div></Panel>
      </div>

      <div className="space-y-6">
        <SectionHeading number="8.4" title={t.usesTitle} body={t.usesBody} />
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label={t.usesTitle}>{t.useData.map((item, index) => { const Icon = useIcons[index]; return <button key={item[0]} type="button" role="tab" aria-selected={useIndex === index} onClick={() => setUseIndex(index)} className={`min-h-20 rounded-xl border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${useIndex === index ? "border-cyan-300 bg-cyan-300/15" : "border-white/10 bg-white/[0.04]"}`}><Icon className="h-5 w-5 text-cyan-300" /><span className="mt-2 block text-xs font-black text-white">{item[0]}</span></button>; })}</div>
        <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/[0.07] to-transparent"><div className="flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-300/15"><UseIcon className="h-7 w-7 text-cyan-300" /></div><div><p className="text-xs font-black uppercase tracking-[.14em] text-cyan-200">{t.useData[useIndex][1]}</p><h3 className="mt-1 text-xl font-black text-white">{t.useData[useIndex][0]}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{t.useData[useIndex][2]}</p></div></div></Panel>
        <Panel><div className="flex items-center gap-3"><BadgeAlert className="h-8 w-8 text-amber-300" /><h3 className="font-black text-white">{t.safetyTitle}</h3></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{t.safetyItems.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-3 text-sm leading-6 text-amber-50"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-amber-300" />{item}</div>)}</div><div className="mt-4 flex gap-3 rounded-xl border border-rose-300/20 bg-rose-300/[0.07] p-4"><Activity className="mt-1 h-5 w-5 shrink-0 text-rose-300" /><p className="text-sm font-bold leading-6 text-rose-100">{t.insideWarning}</p></div></Panel>
      </div>

      <footer className="rounded-[1.75rem] border border-fuchsia-300/20 bg-fuchsia-300/[0.06] p-5 sm:p-7"><div className="flex items-center gap-3"><Microscope className="h-8 w-8 text-fuchsia-300" /><h2 className="text-xl font-black text-white">{t.recapTitle}</h2></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.recap.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-slate-950/45 p-3 text-sm leading-6 text-slate-200"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-fuchsia-300" />{item}</div>)}</div>{onMarkRead && <button type="button" disabled={isRead} onClick={onMarkRead} className="mt-6 min-h-12 w-full rounded-xl bg-fuchsia-300 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-fuchsia-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:bg-emerald-400"><span className="inline-flex items-center gap-2">{isRead ? <CheckCircle2 className="h-5 w-5" /> : <HeartPulse className="h-5 w-5" />}{isRead ? t.marked : t.mark}</span></button>}</footer>
    </div>
  </section>;
}
