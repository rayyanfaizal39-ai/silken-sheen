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

import { HalfLifeCalculator } from "./blocks/HalfLifeCalculator";
import { Chapter8Atom, Chapter8Fact, Chapter8Practice, Chapter8RadiationFields } from "./ScienceF3Chapter8LearningVisuals";
import { chapter8Facts } from "@/content/form3/science/chapter-8/chapter8-content";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 8",
    title: "",
    subtitle: "",
    path: [
      ["8.1 Sejarah Penemuan Keradioaktifan", ""],
      ["8.2 Atom dan Nukleus", ""],
      ["8.3 Sinaran Mengion dan Sinaran Tidak Mengion", ""],
      ["8.4 Kegunaan Sinaran Radioaktif", ""],
    ],
    discoveryTitle: "Sejarah Penemuan Keradioaktifan",
    discoveryBody: "",
    timeline: [
      ["1895", "Wilhelm Roentgen", "Wilhelm Roentgen menemui sinar-X secara tidak sengaja pada tahun 1895 semasa menjalankan eksperimen. Beliau kemudiannya menghasilkan imej sinar-X tangan isterinya."],
      ["1896", "Henri Becquerel", "Sebatian uranium menghitamkan plat fotografi walaupun disimpan dalam gelap — bukti pancaran spontan."],
      ["Akhir 1897", "Marie & Pierre Curie", "Mengkaji sinaran melalui kuasa pengionan; kemudiannya mengekstrak polonium dan radium daripada picblend."],
    ],
    definition: "Keradioaktifan ialah pereputan rawak dan spontan nukleus tidak stabil dengan memancarkan alfa, beta atau gama untuk menjadi lebih stabil.",
    decayTitle: "Apa yang keluar daripada nukleus?",
    alphaDecay: "U-238 → Th-234 + α. Zarah alfa ialah nukleus helium: 2 proton + 2 neutron.",
    betaDecay: "Th-234 → Pa-234 + β. Zarah beta ialah elektron berkelajuan tinggi.",
    gammaDecay: "Nukleus teruja → nukleus bertenaga lebih rendah + γ. Sinar gama ialah gelombang elektromagnet bertenaga tinggi.",
    activityTitle: "Becquerel (Bq) dan Curie (Ci): unit kadar pereputan",
    halfLifeTitle: "Separuh hayat: separuh, kemudian separuh lagi",
    halfLifeBody: "Separuh hayat ialah masa untuk bilangan nukleus belum mereput berkurang kepada separuh nilai asal. Pilih bilangan separuh hayat untuk melihat baki Pa-234 daripada 80 g.",
    halfLives: "Bilangan separuh hayat",
    remaining: "Jisim tertinggal",
    elapsed: "Masa berlalu",
    atomTitle: "Atom dan Nukleus",
    atomBody: "",
    neutral: "Atom neutral",
    cation: "Kation · ion positif",
    anion: "Anion · ion negatif",
    neutralRule: "Bilangan proton = bilangan elektron: 11 = 11. Contoh Na-23 ini ialah atom neutral (cas bersih sifar) dengan nukleus stabil.",
    cationRule: "KEHILANGAN elektron → proton melebihi elektron → cas positif.",
    anionRule: "MENERIMA elektron → elektron melebihi proton → cas negatif.",
    sodium: "Na: 11p, 11e → hilang 1e → Na⁺: 11p, 10e",
    chlorine: "Cl: 17p, 17e → terima 1e → Cl⁻: 17p, 18e",
    radiationTitle: "Sinaran Mengion dan Sinaran Tidak Mengion",
    radiationBody: "Sinaran mengion mempunyai tenaga cukup untuk menyingkirkan elektron daripada atom. Bagi alfa, beta dan gama: semakin tinggi kuasa pengionan, semakin rendah kuasa penembusan.",
    alpha: "Alfa (α)",
    beta: "Beta (β)",
    gamma: "Gama (γ)",
    ionising: "Kuasa pengionan",
    penetration: "Kuasa penembusan",
    high: "Tinggi",
    medium: "Sederhana",
    low: "Rendah",
    spectrumTitle: "Spektrum elektromagnet",
    nonIonising: "Sinaran tidak mengion: gelombang frekuensi sangat rendah → gelombang radio → gelombang mikro → inframerah → cahaya nampak",
    ionisingZone: "Sinaran mengion: ultraungu → sinar-X → sinar gama",
    doseTitle: "Dos ialah kesan biologi pada tisu",
    safe: "Aras normal dalam buku teks",
    safeValue: "< 0.2 μSv/h",
    doseDefinition: chapter8Facts.dose.statement.bm,
    reduce: "Kurangkan dos dengan tiga prinsip",
    doseRules: [["Masa", "Kurangkan tempoh dedahan."], ["Jarak", "Jauhkan diri daripada sumber."], ["Adangan", "Gunakan bahan pelindung yang sesuai."]],
    exposure: "Contoh kawalan harian",
    exposureItems: chapter8Facts.controls.statement.bm.split(". "),
    usesTitle: "Kegunaan Sinaran Radioaktif",
    usesBody: "",
    useData: [
      ["Arkeologi / Geokronologi", "Karbon-14 (C-14)", "Separuh hayat 5,700 tahun; baki aktiviti beta menentukan usia bahan organik purba."],
      ["Industri", "Sinar beta", "Pengesan mengawal ketebalan kepingan logam: bacaan tinggi bermaksud kepingan terlalu nipis."],
      ["Pertanian", "Fosforus-32 (P-32)", chapter8Facts.agriculture.statement.bm],
      ["Makanan", "Sinar gama", chapter8Facts.food.statement.bm],
      ["Perubatan", "Sesium-137 (Cs-137) / Kobalt-60 (Co-60)", chapter8Facts.medicine.statement.bm],
      ["Pertahanan", "U-235 / Pu-239", "Digunakan dalam senjata nuklear dengan kesan haba, radiasi dan mutasi yang dahsyat."],
    ],
    safetyTitle: "Kendalikan dengan masa singkat, jarak jauh dan adangan tebal",
    safetyItems: ["Simpan dalam bekas berdinding plumbum tebal untuk mengurangkan pendedahan kepada sinaran berkuasa penembusan tinggi.", "Gunakan tangan robotik untuk menambah jarak daripada sumber.", "Pakai pakaian pelindung khas.", "Pantau dos terkumpul dengan lencana sinaran.", chapter8Facts.waste.statement.bm, "Pamerkan simbol amaran radioaktif."],
    insideWarning: "Alfa sukar menembusi kulit, tetapi paling berbahaya jika masuk ke dalam badan kerana kuasa pengionannya sangat tinggi.",
    recapTitle: "Semak sebelum tamat",
    recap: ["Rawak dan spontan ialah dua kata kunci definisi keradioaktifan.", "1 Bq bersamaan 1 pereputan sesaat.", "Kation kehilangan elektron; anion menerima elektron.", "Alfa: pengionan tertinggi, penembusan terendah. Gama: sebaliknya.", "Kadar dos di bawah 0.2 μSv/h dianggap aras latar normal dalam konteks buku teks.", "Padankan jenis sinaran dengan kuasa penembusan yang diperlukan."],
    mark: "Tandakan Bab 8 Selesai",
    marked: "Bab 8 selesai",
  },
  en: {
    eyebrow: "Chapter 8 visual map",
    title: "",
    subtitle: "",
    path: [
      ["8.1 Discovery of Radioactivity", ""],
      ["8.2 Atom and Nucleus", ""],
      ["8.3 Ionising and Non-ionising Radiation", ""],
      ["8.4 Uses of Radioactive Radiation", ""],
    ],
    discoveryTitle: "Discovery of Radioactivity",
    discoveryBody: "",
    timeline: [
      ["1895", "Wilhelm Roentgen", "Wilhelm Roentgen accidentally discovered X-rays in 1895 during his experiments. He later produced an X-ray image of his wife's hand."],
      ["1896", "Henri Becquerel", "A uranium compound blackened a photographic plate even in darkness — evidence of spontaneous emission."],
      ["End of 1897", "Marie & Pierre Curie", "Studied radiation through its ionising power; later extracted polonium and radium from pitchblende."],
    ],
    definition: "Radioactivity is the random and spontaneous decay of an unstable nucleus, emitting alpha, beta or gamma radiation to become more stable.",
    decayTitle: "What leaves the nucleus?",
    alphaDecay: "U-238 → Th-234 + α. An alpha particle is a helium nucleus: 2 protons + 2 neutrons.",
    betaDecay: "Th-234 → Pa-234 + β. A beta particle is a high-speed electron.",
    gammaDecay: "Excited nucleus → lower-energy nucleus + γ. A gamma ray is a high-energy electromagnetic wave.",
    activityTitle: "Becquerel (Bq) and Curie (Ci): units of decay rate",
    halfLifeTitle: "Half-life: halve it, then halve it again",
    halfLifeBody: "Half-life is the time for the number of undecayed nuclei to fall to half its original value. Choose the number of half-lives to see how much remains from 80 g of Pa-234.",
    halfLives: "Number of half-lives",
    remaining: "Mass remaining",
    elapsed: "Elapsed time",
    atomTitle: "Atom and Nucleus",
    atomBody: "",
    neutral: "Neutral atom",
    cation: "Cation · positive ion",
    anion: "Anion · negative ion",
    neutralRule: "Number of protons = number of electrons: 11 = 11. This Na-23 example is a neutral atom (zero net charge) with a stable nucleus.",
    cationRule: "LOSES electrons → protons outnumber electrons → positive charge.",
    anionRule: "GAINS electrons → electrons outnumber protons → negative charge.",
    sodium: "Na: 11p, 11e → loses 1e → Na⁺: 11p, 10e",
    chlorine: "Cl: 17p, 17e → gains 1e → Cl⁻: 17p, 18e",
    radiationTitle: "Ionising and Non-ionising Radiation",
    radiationBody: "Ionising radiation has enough energy to remove electrons from atoms. For alpha, beta and gamma: the higher the ionising power, the lower the penetration power.",
    alpha: "Alpha (α)",
    beta: "Beta (β)",
    gamma: "Gamma (γ)",
    ionising: "Ionising power",
    penetration: "Penetration power",
    high: "High",
    medium: "Moderate",
    low: "Low",
    spectrumTitle: "Electromagnetic spectrum",
    nonIonising: "Non-ionising: very low frequency waves → radio waves → microwaves → infrared → visible light",
    ionisingZone: "Ionising: ultraviolet → X-rays → gamma rays",
    doseTitle: "Dose is the biological effect on tissue",
    safe: "Normal textbook level",
    safeValue: "< 0.2 μSv/h",
    doseDefinition: chapter8Facts.dose.statement.dlp,
    reduce: "Reduce dose with three principles",
    doseRules: [["Time", "Reduce exposure duration."], ["Distance", "Move farther from the source."], ["Shielding", "Use the correct protective material."]],
    exposure: "Everyday controls",
    exposureItems: chapter8Facts.controls.statement.dlp.split(". "),
    usesTitle: "Uses of Radioactive Radiation",
    usesBody: "",
    useData: [
      ["Archaeology / Geochronology", "Carbon-14 (C-14)", "A 5,700-year half-life; remaining beta activity reveals the age of ancient organic material."],
      ["Industry", "Beta radiation", "A detector controls metal-sheet thickness: a high reading means the sheet is too thin."],
      ["Agriculture", "Phosphorus-32 (P-32)", chapter8Facts.agriculture.statement.dlp],
      ["Food", "Gamma rays", chapter8Facts.food.statement.dlp],
      ["Medicine", "Caesium-137 (Cs-137) / Cobalt-60 (Co-60)", chapter8Facts.medicine.statement.dlp],
      ["Defence", "U-235 / Pu-239", "Used in nuclear weapons with devastating heat, radiation and mutation effects."],
    ],
    safetyTitle: "Handle with short time, long distance and thick shielding",
    safetyItems: ["Store in thick lead-walled containers to reduce exposure to penetrating radiation.", "Use robotic hands to increase distance from the source.", "Wear specialised protective clothing.", "Monitor cumulative dose with a radiation badge.", chapter8Facts.waste.statement.dlp, "Display the radioactive warning symbol."],
    insideWarning: "Alpha cannot easily penetrate skin, but it is the most dangerous inside the body because its ionising power is extremely high.",
    recapTitle: "Check before you finish",
    recap: ["Random and spontaneous are the two keywords in the definition of radioactivity.", "1 Bq equals 1 decay per second.", "A cation loses electrons; an anion gains electrons.", "Alpha: highest ionisation, lowest penetration. Gamma: the reverse.", "A dose rate below 0.2 μSv/h is normal background in the textbook context.", "Match each radiation type to the penetration required for its job."],
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

function Meter({ value, tone }: { label: string; value: number; tone: string }) {
  return <div aria-hidden="true" className="h-2.5 overflow-hidden rounded-full bg-slate-950/75"><div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} /></div>;
}

export function ScienceF3Chapter8VisualNotesBlock({ id, content, lang, isRead, onMarkRead }: { id?: string; content: ScienceF3InteractiveContent; lang: Lang; storageKey?: string; isRead?: boolean; onMarkRead?: () => void }) {
  const t = copy[lang];
  const sourceLang = lang === "bm" ? "bm" : "dlp";
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
    alpha: { label: t.alpha, symbol: "α", nature: chapter8Facts.alpha.statement[sourceLang], ion: 100, pen: 20, ionWord: t.high, penWord: t.low, shield: lang === "bm" ? "Kertas" : "Paper" },
    beta: { label: t.beta, symbol: "β", nature: chapter8Facts.beta.statement[sourceLang], ion: 60, pen: 55, ionWord: t.medium, penWord: t.medium, shield: lang === "bm" ? "Aluminium 3 mm" : "3 mm aluminium" },
    gamma: { label: t.gamma, symbol: "γ", nature: chapter8Facts.gamma.statement[sourceLang], ion: 25, pen: 100, ionWord: t.low, penWord: t.high, shield: lang === "bm" ? "Plumbum 10 cm" : "10 cm lead" },
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
        <div className="grid gap-3 lg:grid-cols-3">{t.timeline.map((item, index) => <Panel key={item[0]} className={index === 1 ? "border-fuchsia-300/30 bg-fuchsia-300/[0.07]" : ""}><div className="flex items-center gap-3"><span className="grid min-h-11 min-w-16 place-items-center rounded-full bg-fuchsia-300/15 px-2 text-center font-mono text-xs font-black text-fuchsia-200">{item[0]}</span><History className="h-5 w-5 text-cyan-300" /></div><h3 className="mt-4 font-black text-white">{item[1]}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{item[2]}</p></Panel>)}</div>
        <Panel className="border-fuchsia-300/25 bg-fuchsia-300/[0.06]"><div className="flex gap-3"><Atom className="mt-1 h-8 w-8 shrink-0 text-fuchsia-300" /><div><p className="text-xs font-black uppercase tracking-[.15em] text-fuchsia-200">{lang === "bm" ? "Definisi wajib hafal" : "Definition to remember"}</p><p className="mt-2 text-base font-bold leading-7 text-white">{t.definition}</p></div></div></Panel>
        <div className="grid gap-3 sm:grid-cols-2"><Chapter8Fact name="substance" lang={lang} /><Chapter8Fact name="decay" lang={lang} /></div>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]"><Panel><h3 className="font-black text-white">{t.decayTitle}</h3><div className="mt-4 grid gap-3 sm:grid-cols-3">{[["α", t.alphaDecay, "text-amber-300"], ["β", t.betaDecay, "text-cyan-300"], ["γ", t.gammaDecay, "text-fuchsia-300"]].map((item) => <div key={item[0]} className="rounded-xl bg-slate-950/55 p-3"><span className={`text-3xl font-black ${item[2]}`}>{item[0]}</span><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p></div>)}</div></Panel><Panel><h3 className="font-black text-white">{t.activityTitle}</h3><div className="mt-4 rounded-xl bg-cyan-300/10 p-4"><p className="font-mono text-base font-black text-cyan-200">1 Bq = 1 {lang === "bm" ? "pereputan sesaat" : "decay per second"}</p><p className="mt-2 text-xs text-slate-300">1 Ci = 3.7 × 10¹⁰ {lang === "bm" ? "pereputan sesaat" : "decays per second"}<br />1 Ci = 3.7 × 10¹⁰ Bq</p></div></Panel></div>

        <Panel><div className="flex items-start gap-3"><TimerReset className="mt-1 h-8 w-8 shrink-0 text-cyan-300" /><div><h3 className="font-black text-white">{t.halfLifeTitle}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{t.halfLifeBody}</p></div></div><div className="mt-5 grid gap-5 lg:grid-cols-[.75fr_1.25fr]"><div><label htmlFor="half-life-range" className="text-xs font-black uppercase tracking-[.14em] text-cyan-200">{t.halfLives}: {halfLives}</label><input id="half-life-range" type="range" min="0" max="4" step="1" value={halfLives} onChange={(event) => setHalfLives(Number(event.target.value))} className="mt-4 w-full accent-cyan-300" /><div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-xl bg-white/5 p-3"><p className="text-xs text-slate-400">{t.elapsed}</p><p className="mt-1 font-mono text-lg font-black text-white">{(halfLives * 5.2).toFixed(1)} h</p></div><div className="rounded-xl bg-cyan-300/10 p-3"><p className="text-xs text-cyan-100">{t.remaining}</p><p className="mt-1 font-mono text-lg font-black text-cyan-200">{mass} g</p></div></div></div><div className="grid grid-cols-5 gap-2">{[0, 1, 2, 3, 4].map((step) => { const stepMass = 80 / 2 ** step; return <button key={step} type="button" onClick={() => setHalfLives(step)} aria-label={`${step} ${t.halfLives}`} aria-pressed={halfLives === step} className={`flex min-h-36 flex-col justify-end rounded-xl border p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${halfLives === step ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-white/[0.03]"}`}><div className="relative h-24 w-full" aria-hidden="true"><div className="absolute inset-x-0 bottom-0 rounded bg-gradient-to-t from-fuchsia-500 to-cyan-300" style={{ height: `${stepMass / 80 * 100}%` }} /></div><span className="mt-2 text-center font-mono text-xs font-black">{stepMass} g</span><span className="mt-1 text-center text-xs text-cyan-200">{step === 0 ? "1" : `1/${2 ** step}`}</span><span className="mt-1 text-center text-[10px] text-slate-300">{(step * 5.2).toFixed(1)} h</span></button>; })}</div></div></Panel>
        <Chapter8Fact name="activityTime" lang={lang} />
        {content.sections[0].calculators?.map(calc => calc.type === "half-life" && <Panel key={calc.type}><h3 className="font-bold">{calc.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{calc.instruction}</p><HalfLifeCalculator lang={lang} defaultOriginalMass={calc.defaultOriginalMass} defaultHalfLife={calc.defaultHalfLife} defaultElapsedTime={calc.defaultElapsedTime} /></Panel>)}
      </div>

      <div className="space-y-6">
        <SectionHeading number="8.2" title={t.atomTitle} body={t.atomBody} />
        <Chapter8Fact name="neutral" lang={lang} />
        <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label={t.atomTitle}>{(["neutral", "cation", "anion"] as const).map((key) => <button key={key} type="button" aria-pressed={ion === key} onClick={() => setIon(key)} className={`min-h-12 rounded-xl border px-4 py-3 text-sm font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 ${ion === key ? "border-fuchsia-300 bg-fuchsia-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}>{key === "neutral" ? t.neutral : key === "cation" ? t.cation : t.anion}</button>)}</div>
        <Panel><div className="grid items-center gap-6 lg:grid-cols-[.8fr_1.2fr]"><Chapter8Atom ion={ion} lang={lang} /><div><div className="flex items-center gap-3"><Orbit className="h-7 w-7 text-cyan-300" /><h3 className="text-xl font-black text-white">{ionData.label}</h3></div><p className="mt-3 text-base font-bold leading-7 text-fuchsia-100">{ionData.rule}</p><p className="mt-4 rounded-xl bg-slate-950/60 p-4 font-mono text-sm font-bold text-cyan-200">{ionData.example}</p></div></div></Panel>
      </div>

      <div className="space-y-6">
        <SectionHeading number="8.3" title={t.radiationTitle} body={t.radiationBody} />
        <Chapter8Fact name="ionising" lang={lang} /><Chapter8Fact name="nonIonising" lang={lang} />
        <Panel><h3 className="font-black text-white">{t.spectrumTitle}</h3><div className="mt-4 grid gap-2 lg:grid-cols-[1.5fr_.7fr]"><div data-radiation-class="non-ionising" className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4 text-sm font-bold text-cyan-100">{t.nonIonising}</div><div data-radiation-class="ionising" className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/[0.08] p-4 text-sm font-bold text-fuchsia-100">{t.ionisingZone}</div></div><div className="mt-3 flex justify-between text-[11px] font-bold text-slate-400"><span>{lang === "bm" ? "Frekuensi rendah · λ panjang" : "Low frequency · long λ"}</span><span>{lang === "bm" ? "Frekuensi tinggi · λ pendek" : "High frequency · short λ"}</span></div></Panel>
        <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label={t.radiationTitle}>{(["alpha", "beta", "gamma"] as const).map((key) => <button key={key} type="button" aria-pressed={radiation === key} aria-label={t[key]} onClick={() => setRadiation(key)} className={`min-h-20 rounded-2xl border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 ${radiation === key ? "border-fuchsia-300 bg-fuchsia-300/15" : "border-white/10 bg-white/[0.04]"}`}><span className="text-2xl font-black text-fuchsia-300">{key === "alpha" ? "α" : key === "beta" ? "β" : "γ"}</span><span className="ml-3 text-sm font-black text-white">{key === "alpha" ? t.alpha : key === "beta" ? t.beta : t.gamma}</span></button>)}</div>
        <Panel className="border-fuchsia-300/25"><div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><div><div className="flex items-center gap-4"><span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-fuchsia-300/15 text-4xl font-black text-fuchsia-300">{radiationData.symbol}</span><div><h3 className="text-xl font-black text-white">{radiationData.label}</h3><p className="mt-1 text-sm text-slate-300">{radiationData.nature}</p></div></div><div className="mt-5 rounded-xl bg-slate-950/60 p-4 text-center"><p className="text-xs text-slate-400">{lang === "bm" ? "Bahan pengadang" : "Shielding material"}</p><p className="mt-1 font-black text-cyan-200">{radiationData.shield}</p></div></div><div className="space-y-5"><div><div className="mb-2 flex justify-between text-sm font-bold"><span>{t.ionising}</span><span className="text-amber-300">{radiationData.ionWord}</span></div><Meter label={t.ionising} value={radiationData.ion} tone="bg-amber-400" /></div><div><div className="mb-2 flex justify-between text-sm font-bold"><span>{t.penetration}</span><span className="text-cyan-300">{radiationData.penWord}</span></div><Meter label={t.penetration} value={radiationData.pen} tone="bg-cyan-400" /></div></div></div><Chapter8RadiationFields selected={radiation} lang={lang} /></Panel>
        <div className="grid gap-3 lg:grid-cols-3"><Chapter8Fact name="natural" lang={lang} /><Chapter8Fact name="background" lang={lang} /><Chapter8Fact name="artificial" lang={lang} /></div>

        <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]"><Panel className="border-emerald-300/20"><div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-emerald-300" /><div><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-200">{t.safe}</p><p className="font-mono text-2xl font-black text-white">{t.safeValue}</p></div></div><p className="mt-4 text-sm leading-6 text-slate-300">{t.doseDefinition}</p></Panel><Panel><h3 className="font-black text-white">{t.reduce}</h3><div className="mt-4 grid gap-2 sm:grid-cols-3">{t.doseRules.map((item) => <div key={item[0]} className="rounded-xl bg-white/5 p-3"><p className="font-black text-fuchsia-200">{item[0]}</p><p className="mt-1 text-xs leading-5 text-slate-300">{item[1]}</p></div>)}</div></Panel></div>
        <Chapter8Fact name="risk" lang={lang} />
        <Panel><h3 className="font-black text-white">{t.exposure}</h3><div className="mt-4 grid gap-2 sm:grid-cols-2">{t.exposureItems.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-slate-950/50 p-3 text-sm text-slate-300"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />{item}</div>)}</div></Panel>
        <Chapter8Fact name="pilot" lang={lang} />
      </div>

      <div className="space-y-6">
        <SectionHeading number="8.4" title={t.usesTitle} body={t.usesBody} />
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6" role="group" aria-label={t.usesTitle}>{t.useData.map((item, index) => { const Icon = useIcons[index]; return <button key={item[0]} type="button" aria-pressed={useIndex === index} onClick={() => setUseIndex(index)} className={`min-h-20 rounded-xl border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${useIndex === index ? "border-cyan-300 bg-cyan-300/15" : "border-white/10 bg-white/[0.04]"}`}><Icon className="h-5 w-5 text-cyan-300" /><span className="mt-2 block text-xs font-black text-white">{item[0]}</span></button>; })}</div>
        <Panel className="border-cyan-300/25 bg-gradient-to-br from-cyan-300/[0.07] to-transparent"><div className="flex flex-col items-start gap-4 sm:flex-row"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-300/15"><UseIcon className="h-7 w-7 text-cyan-300" /></div><div><p className="text-xs font-black uppercase tracking-[.14em] text-cyan-200">{t.useData[useIndex][1]}</p><h3 className="mt-1 text-xl font-black text-white">{t.useData[useIndex][0]}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{t.useData[useIndex][2]}</p></div></div></Panel>
        <Panel><h3 className="font-bold">{content.sections[3].checks[0].question}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{content.sections[3].checks[0].hint}</p></Panel>
        <div className="grid gap-3 sm:grid-cols-2"><Chapter8Fact name="warning" lang={lang} /><Chapter8Fact name="clothing" lang={lang} /></div>
        <Panel><div className="flex items-center gap-3"><BadgeAlert className="h-8 w-8 text-amber-300" /><h3 className="font-black text-white">{t.safetyTitle}</h3></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{t.safetyItems.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-3 text-sm leading-6 text-amber-50"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-amber-300" />{item}</div>)}</div><div className="mt-4 flex gap-3 rounded-xl border border-rose-300/20 bg-rose-300/[0.07] p-4"><Activity className="mt-1 h-5 w-5 shrink-0 text-rose-300" /><p className="text-sm font-bold leading-6 text-rose-100">{t.insideWarning}</p></div></Panel>
      </div>

      <aside className="space-y-4"><p className="text-xs font-bold uppercase tracking-wider text-cyan-200">{lang === "bm" ? "Pengayaan" : "Enrichment"}</p><Panel><h2 className="font-bold">{content.blogHighlight.title}</h2><p className="mt-3 text-sm leading-6 text-slate-300">{content.blogHighlight.body}</p></Panel></aside>
      <div className="space-y-3"><h2 className="text-xl font-bold">{lang === "bm" ? "Kuiz mini" : "Mini-quiz"}</h2>{content.miniQuiz.map((item, index) => <Chapter8Practice key={`${lang}-${index}`} item={item} lang={lang} />)}</div>
      <footer className="rounded-[1.75rem] border border-fuchsia-300/20 bg-fuchsia-300/[0.06] p-5 sm:p-7"><div className="flex items-center gap-3"><Microscope className="h-8 w-8 text-fuchsia-300" /><h2 className="text-xl font-black text-white">{t.recapTitle}</h2></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.recap.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-slate-950/45 p-3 text-sm leading-6 text-slate-200"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-fuchsia-300" />{item}</div>)}</div>{onMarkRead && <button type="button" disabled={isRead} onClick={onMarkRead} className="mt-6 min-h-12 w-full rounded-xl bg-fuchsia-300 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-fuchsia-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:bg-emerald-400"><span className="inline-flex items-center gap-2">{isRead ? <CheckCircle2 className="h-5 w-5" /> : <HeartPulse className="h-5 w-5" />}{isRead ? t.marked : t.mark}</span></button>}</footer>
    </div>
  </section>;
}
