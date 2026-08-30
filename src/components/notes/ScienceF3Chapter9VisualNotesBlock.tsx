import { useState, type ReactNode } from "react";
import {
  Activity,
  Antenna,
  Atom,
  CheckCircle2,
  ChevronRight,
  CloudLightning,
  Compass,
  Earth,
  Flame,
  Gauge,
  Orbit,
  Radio,
  Satellite,
  ShieldCheck,
  Sparkles,
  Sun,
  Waves,
  Zap,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 9",
    title: "Dari denyutan Matahari ke sistem di Bumi",
    subtitle: "Teroka lapisan Matahari, kenal pasti fenomena aktif, kemudian jejaki bagaimana ribut suria boleh menghasilkan aurora atau mengganggu teknologi.",
    path: [
      ["Struktur Matahari", "Enam lapisan membawa tenaga dari teras ke korona."],
      ["Aktiviti Suria", "Tujuh fenomena menunjukkan Matahari sentiasa dinamik."],
      ["Magnetosfera", "Perisai magnet Bumi memesongkan kebanyakan zarah bercas."],
      ["Cuaca Angkasa", "Aktiviti suria memberi kesan kepada aurora, GPS, radio dan grid kuasa."],
    ],
    section91: "Aktiviti Matahari yang memberi kesan kepada Bumi",
    section91Body: "Matahari ialah bebola gas hidrogen dan helium yang membara. Tenaga daripada pelakuran nuklear bergerak merentasi lapisan dalam sebelum dipancarkan dari atmosfera Matahari.",
    layersTitle: "Enam lapisan, satu aliran tenaga",
    layersHint: "Pilih lapisan dari pusat ke luar.",
    layers: [
      ["Teras", "Bahagian Dalam", "Pelakuran nuklear hidrogen menjana tenaga haba dan cahaya Matahari."],
      ["Zon Radiasi", "Bahagian Dalam", "Tenaga bergerak keluar sebagai radiasi elektromagnet atau foton."],
      ["Zon Perolakan", "Bahagian Dalam", "Arus plasma panas naik dan plasma lebih sejuk turun, membawa haba ke permukaan."],
      ["Fotosfera", "Atmosfera", "Permukaan yang kelihatan, bersuhu kira-kira 5,800°C dan mempunyai granul."],
      ["Kromosfera", "Atmosfera", "Lingkaran merah terang yang kelihatan semasa gerhana Matahari penuh."],
      ["Korona", "Atmosfera", "Lapisan terluar berwarna putih kebiruan yang mengembang jauh ke angkasa."],
    ],
    energyFlow: "Teras → radiasi → perolakan → fotosfera → kromosfera → korona",
    phenomenaTitle: "Tujuh wajah Matahari yang aktif",
    phenomenaHint: "Pilih fenomena untuk melihat ciri yang membezakannya.",
    phenomena: [
      ["Granul", "Bahagian atas sel perolakan plasma panas yang menjadikan fotosfera berbutir; diameter sekitar 1,000 km."],
      ["Tompok Matahari", "Kawasan fotosfera yang lebih sejuk dan gelap, biasanya berpasangan atau berkumpulan dan boleh kekal lebih seminggu."],
      ["Kitaran Suria", "Bilangan tompok Matahari meningkat dan menurun dalam kitaran kira-kira 11 tahun."],
      ["Semarak Suria", "Gelungan gas menyala yang boleh mencapai ratusan ribu kilometer dan bertahan beberapa hari hingga bulan."],
      ["Nyalaan Suria", "Letusan gas bercas yang sangat kuat berhampiran tompok Matahari; cerah maksimum dalam saat atau minit."],
      ["Lentingan Jisim Korona", "Awan plasma bermagnet gergasi yang meletus dari korona dan boleh mencetuskan ribut geomagnet."],
      ["Angin Suria", "Aliran plasma berterusan — elektron, proton dan alfa — pada 250 hingga 750 km s⁻¹."],
    ],
    arrivalsTitle: "Tidak semua gangguan tiba serentak",
    arrivals: [["8 minit", "Cahaya / radiasi nyalaan suria"], ["Puluhan minit", "Zarah bercas nyalaan suria"], ["±3 hari", "Plasma bermagnet CME"], ["Berterusan", "Angin suria"]],
    shieldTitle: "Magnetosfera ialah perisai dinamik",
    shieldBody: "Magnetosfera terbentuk melalui interaksi medan magnet Bumi dengan medan magnet antara planet yang dibawa angin suria. Bahagian menghadap Matahari dihimpit, manakala bahagian belakang memanjang sebagai ekor magnet.",
    calm: "Angin suria biasa",
    storm: "Ribut suria kuat",
    shieldFunctions: ["Menghalang zarah bercas berbahaya.", "Melindungi hidupan daripada radiasi melampau.", "Mengurangkan tekanan dan hakisan atmosfera Bumi."],
    section92: "Cuaca angkasa lepas",
    section92Body: "Cuaca angkasa ialah keadaan dinamik di permukaan Matahari dan ruang angkasa yang boleh mempengaruhi atmosfera, satelit serta infrastruktur teknologi Bumi.",
    sunSide: "Di permukaan Matahari",
    spaceSide: "Di angkasa lepas",
    sunExamples: "Nyalaan · semarak · tompok · CME",
    spaceExamples: "Angin suria · ribut pancaran · ribut geomagnet",
    chainTitle: "Daripada letusan kepada kesan",
    chain: ["Tompok aktif", "Nyalaan / CME", "Zarah & medan magnet", "Interaksi magnetosfera", "Kesan di Bumi"],
    effectsTitle: "Empat kesan utama di Bumi",
    effects: [
      ["Aurora", "Zarah bercas disalurkan ke kutub lalu berlanggar dengan oksigen dan nitrogen, menghasilkan cahaya berwarna."],
      ["Telekomunikasi", "Pengionan ionosfera mengganggu atau menyerap isyarat radio frekuensi tinggi."],
      ["Navigasi GPS", "Ribut suria melambatkan dan memesongkan isyarat satelit, lalu menghasilkan ralat kedudukan."],
      ["Grid kuasa", "Ribut geomagnet mengaruh arus tinggi dalam kabel, merosakkan transformer dan menyebabkan blackout."],
    ],
    cycleTitle: "Lebih banyak tompok, lebih aktif cuaca angkasa",
    cycleBody: "Pada maksimum suria dalam kitaran 11 tahun, nyalaan, CME serta kelajuan dan ketumpatan angin suria cenderung meningkat. Data ini membantu saintis memberi amaran awal.",
    lowActivity: "Minimum suria",
    highActivity: "Maksimum suria",
    forecast: "Tujuan ramalan",
    forecastItems: ["Anggar masa CME menuju Bumi.", "Lindungi satelit dengan mod selamat.", "Sediakan pengendali grid kuasa.", "Maklumkan penerbangan dan komunikasi radio."],
    eventTitle: "Kajian kes: 6 September 2017",
    eventBody: "Nyalaan suria kelas X9.3 pada 8.02 pagi diikuti CME. Telekomunikasi, navigasi dan talian kuasa di Bumi terganggu selama kira-kira satu jam.",
    recapTitle: "Semak sebelum tamat",
    recap: ["Bahagian dalam: teras, zon radiasi, zon perolakan.", "Atmosfera: fotosfera, kromosfera, korona.", "Tompok Matahari lebih sejuk dan mengikut kitaran 11 tahun.", "Cahaya nyalaan tiba dalam 8 minit; CME mengambil kira-kira 3 hari.", "Magnetosfera memesongkan zarah bercas dan melindungi atmosfera.", "Aktiviti tompok tinggi menandakan risiko cuaca angkasa lebih aktif."],
    mark: "Tandakan Bab 9 Selesai",
    marked: "Bab 9 selesai",
  },
  en: {
    eyebrow: "Chapter 9 visual map",
    title: "From the Sun's pulse to systems on Earth",
    subtitle: "Explore the Sun's layers, identify active phenomena, then track how solar storms can create aurora or disrupt technology.",
    path: [
      ["Structure of the Sun", "Six layers carry energy from the core to the corona."],
      ["Solar Activity", "Seven phenomena show that the Sun is always dynamic."],
      ["Magnetosphere", "Earth's magnetic shield deflects most charged particles."],
      ["Space Weather", "Solar activity affects aurora, GPS, radio and power grids."],
    ],
    section91: "Activities of the Sun that affect Earth",
    section91Body: "The Sun is a glowing ball of hydrogen and helium gas. Energy from nuclear fusion travels through its inner layers before radiating from the solar atmosphere.",
    layersTitle: "Six layers, one energy flow",
    layersHint: "Choose a layer from the centre outward.",
    layers: [
      ["Core", "Interior", "Nuclear fusion of hydrogen generates the Sun's heat and light energy."],
      ["Radiation Zone", "Interior", "Energy moves outward as electromagnetic radiation or photons."],
      ["Convection Zone", "Interior", "Hot plasma rises and cooler plasma sinks, carrying heat to the surface."],
      ["Photosphere", "Atmosphere", "The visible surface, about 5,800°C, with a granular appearance."],
      ["Chromosphere", "Atmosphere", "A bright red ring visible during a total solar eclipse."],
      ["Corona", "Atmosphere", "The bluish-white outermost layer extending far into space."],
    ],
    energyFlow: "Core → radiation → convection → photosphere → chromosphere → corona",
    phenomenaTitle: "Seven faces of an active Sun",
    phenomenaHint: "Choose a phenomenon to see its distinguishing features.",
    phenomena: [
      ["Granules", "The tops of hot plasma convection cells that make the photosphere look grainy; about 1,000 km wide."],
      ["Sunspots", "Cooler, darker photosphere regions, usually in pairs or groups, that may last over a week."],
      ["Solar Cycle", "Sunspot numbers rise and fall in a cycle of about 11 years."],
      ["Prominence", "A glowing gas loop that can reach hundreds of thousands of kilometres and last days to months."],
      ["Solar Flare", "A powerful charged-gas explosion near sunspots, reaching peak brightness in seconds or minutes."],
      ["Coronal Mass Ejection", "A giant cloud of magnetised plasma erupting from the corona that may trigger a geomagnetic storm."],
      ["Solar Wind", "A continuous plasma flow — electrons, protons and alpha particles — travelling at 250 to 750 km s⁻¹."],
    ],
    arrivalsTitle: "Not every disturbance arrives together",
    arrivals: [["8 minutes", "Light / radiation from a solar flare"], ["Tens of minutes", "Charged flare particles"], ["About 3 days", "Magnetised CME plasma"], ["Continuous", "Solar wind"]],
    shieldTitle: "The magnetosphere is a dynamic shield",
    shieldBody: "The magnetosphere forms when Earth's magnetic field interacts with the interplanetary field carried by solar wind. Its Sun-facing side is compressed while its far side stretches into a magnetotail.",
    calm: "Normal solar wind",
    storm: "Strong solar storm",
    shieldFunctions: ["Blocks harmful charged particles.", "Protects life from extreme radiation.", "Reduces pressure and erosion of Earth's atmosphere."],
    section92: "Space weather",
    section92Body: "Space weather is the dynamic conditions on the Sun and in space that can affect Earth's atmosphere, satellites and technological infrastructure.",
    sunSide: "On the Sun's surface",
    spaceSide: "In space",
    sunExamples: "Flares · prominences · sunspots · CME",
    spaceExamples: "Solar wind · radiation storms · geomagnetic storms",
    chainTitle: "From eruption to impact",
    chain: ["Active sunspot", "Flare / CME", "Particles & magnetic field", "Magnetosphere interaction", "Impact on Earth"],
    effectsTitle: "Four major effects on Earth",
    effects: [
      ["Aurora", "Charged particles funnel to the poles and collide with oxygen and nitrogen, producing coloured light."],
      ["Telecommunication", "Excess ionisation in the ionosphere disrupts or absorbs high-frequency radio signals."],
      ["GPS Navigation", "Solar storms slow and bend satellite signals, producing position errors."],
      ["Power Grid", "Geomagnetic storms induce high currents in cables, damaging transformers and causing blackouts."],
    ],
    cycleTitle: "More sunspots, more active space weather",
    cycleBody: "At solar maximum in the 11-year cycle, flares, CMEs, and solar-wind speed and density tend to increase. Scientists use this data to issue early warnings.",
    lowActivity: "Solar minimum",
    highActivity: "Solar maximum",
    forecast: "Why forecast it",
    forecastItems: ["Estimate when a CME will reach Earth.", "Place satellites into safe mode.", "Prepare power-grid operators.", "Alert aviation and radio communications."],
    eventTitle: "Case study: 6 September 2017",
    eventBody: "An X9.3-class solar flare at 8:02 am was followed by a CME. Telecommunications, navigation and power lines on Earth were disrupted for about an hour.",
    recapTitle: "Check before you finish",
    recap: ["Interior: core, radiation zone, convection zone.", "Atmosphere: photosphere, chromosphere, corona.", "Sunspots are cooler and follow an 11-year cycle.", "Flare light arrives in 8 minutes; a CME takes about 3 days.", "The magnetosphere deflects charged particles and protects the atmosphere.", "High sunspot activity signals a greater risk of active space weather."],
    mark: "Mark Chapter 9 Complete",
    marked: "Chapter 9 complete",
  },
} as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${className}`}>{children}</div>;
}

function SectionHeading({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.2em] text-orange-300">{number}</span><h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{body}</p></div>;
}

export function ScienceF3Chapter9VisualNotesBlock({ id, content, lang, isRead, onMarkRead }: { id?: string; content: ScienceF3InteractiveContent; lang: Lang; storageKey?: string; isRead?: boolean; onMarkRead?: () => void }) {
  const t = copy[lang];
  const [layer, setLayer] = useState(0);
  const [phenomenon, setPhenomenon] = useState(0);
  const [storm, setStorm] = useState(false);
  const layerRadius = [20, 30, 40, 50, 60, 70][layer];
  const phenomenonIcons = [Activity, Orbit, Gauge, Flame, Zap, CloudLightning, Waves];
  const PhenomenonIcon = phenomenonIcons[phenomenon];
  const effectIcons = [Sparkles, Radio, Compass, Zap];
  const cycleHeights = [18, 28, 42, 63, 82, 100, 86, 66, 44, 28, 18];

  return <section id={id} data-lang={lang} data-chapter={content.chapter} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-orange-300/15 bg-[#0b1224] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_12%,rgba(249,115,22,.19),transparent_34%),radial-gradient(circle_at_82%_15%,rgba(34,211,238,.13),transparent_32%)]" />
    <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
      <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-orange-400/15 via-slate-950/40 to-cyan-400/10 p-5 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-orange-200"><Sun className="h-4 w-4" />{t.eyebrow}</div>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.path.map((item, index) => <div key={item[0]} className="relative rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs font-black text-orange-300">0{index + 1}</span><h2 className="mt-2 text-sm font-black text-white">{item[0]}</h2><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>{index < 3 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-[#0b1224] p-1 text-cyan-300 xl:block" />}</div>)}</div>
      </header>

      <div className="space-y-6">
        <SectionHeading number="9.1" title={t.section91} body={t.section91Body} />
        <Panel><div className="flex items-center gap-3"><Atom className="h-8 w-8 text-orange-300" /><div><h3 className="font-black text-white">{t.layersTitle}</h3><p className="mt-1 text-sm text-slate-400">{t.layersHint}</p></div></div><div className="mt-5 grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><div className="relative mx-auto grid h-64 w-64 place-items-center rounded-full border border-orange-200/20 bg-orange-950/30"><div className="absolute rounded-full border border-cyan-200/30 bg-gradient-to-br from-yellow-200 via-orange-400 to-rose-600 shadow-[0_0_50px_rgba(249,115,22,.3)] transition-[width,height] duration-300" style={{ width: `${layerRadius}%`, height: `${layerRadius}%` }} /><Sun className="relative z-10 h-12 w-12 text-white" /></div><div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{t.layers.map((item, index) => <button key={item[0]} type="button" onClick={() => setLayer(index)} className={`min-h-12 rounded-xl border px-3 py-2 text-left text-xs font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${layer === index ? "border-orange-300 bg-orange-300/15 text-white" : "border-white/10 bg-white/[0.04] text-slate-300"}`}>{index + 1}. {item[0]}</button>)}</div><div className="mt-4 rounded-2xl bg-slate-950/60 p-4"><p className="text-xs font-black uppercase tracking-[.14em] text-cyan-300">{t.layers[layer][1]}</p><h4 className="mt-1 text-xl font-black text-white">{t.layers[layer][0]}</h4><p className="mt-2 text-sm leading-6 text-slate-300">{t.layers[layer][2]}</p></div></div></div><div className="mt-5 rounded-xl bg-orange-300/10 p-3 text-center font-mono text-xs font-bold text-orange-100 sm:text-sm">{t.energyFlow}</div></Panel>

        <Panel><div className="flex items-center gap-3"><PhenomenonIcon className="h-8 w-8 text-cyan-300" /><div><h3 className="font-black text-white">{t.phenomenaTitle}</h3><p className="mt-1 text-sm text-slate-400">{t.phenomenaHint}</p></div></div><div className="mt-5 grid gap-5 lg:grid-cols-[.75fr_1.25fr]"><div className="grid grid-cols-2 gap-2">{t.phenomena.map((item, index) => <button key={item[0]} type="button" onClick={() => setPhenomenon(index)} className={`min-h-12 rounded-xl px-3 py-2 text-left text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${phenomenon === index ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-300"}`}>{item[0]}</button>)}</div><div className="flex min-h-48 items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5"><div><PhenomenonIcon className="h-10 w-10 text-cyan-300" /><h4 className="mt-4 text-xl font-black text-white">{t.phenomena[phenomenon][0]}</h4><p className="mt-3 text-sm leading-6 text-slate-300">{t.phenomena[phenomenon][1]}</p></div></div></div></Panel>

        <Panel><h3 className="font-black text-white">{t.arrivalsTitle}</h3><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.arrivals.map((item, index) => <div key={item[0]} className="relative rounded-xl bg-white/5 p-4"><span className="font-mono text-lg font-black text-orange-300">{item[0]}</span><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>{index < 3 && <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#0b1224] p-1 text-slate-500 xl:block" />}</div>)}</div></Panel>

        <Panel className="border-cyan-300/20"><div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><div><div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-cyan-300" /><h3 className="text-xl font-black text-white">{t.shieldTitle}</h3></div><p className="mt-3 text-sm leading-6 text-slate-300">{t.shieldBody}</p><div className="mt-5 flex gap-2" role="group" aria-label={t.shieldTitle}>{[false, true].map((value) => <button key={String(value)} type="button" aria-pressed={storm === value} onClick={() => setStorm(value)} className={`min-h-11 flex-1 rounded-xl px-3 text-sm font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${storm === value ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-300"}`}>{value ? t.storm : t.calm}</button>)}</div></div><div className="relative min-h-64 overflow-hidden rounded-2xl bg-slate-950/70"><div className="absolute -left-8 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-200 to-orange-600 shadow-[0_0_45px_rgba(249,115,22,.45)]" /><div className={`absolute left-1/2 top-1/2 h-36 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-cyan-300/60 bg-cyan-300/5 transition-[width] duration-300 ${storm ? "w-36" : "w-52"}`}><Earth className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-cyan-300" /><div className={`absolute left-full top-1/2 h-20 -translate-y-1/2 border-y border-cyan-300/40 bg-gradient-to-r from-cyan-300/10 to-transparent transition-[width] duration-300 ${storm ? "w-24" : "w-36"}`} /></div>{Array.from({ length: storm ? 9 : 5 }, (_, index) => <span key={index} className="absolute h-0.5 bg-orange-300" style={{ left: `${12 + index * 7}%`, top: `${22 + (index % 5) * 14}%`, width: storm ? "18%" : "10%" }} />)}</div></div><div className="mt-5 grid gap-2 sm:grid-cols-3">{t.shieldFunctions.map((item) => <div key={item} className="flex gap-2 rounded-xl bg-cyan-300/[0.06] p-3 text-xs leading-5 text-cyan-50"><CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />{item}</div>)}</div></Panel>
      </div>

      <div className="space-y-6">
        <SectionHeading number="9.2" title={t.section92} body={t.section92Body} />
        <div className="grid gap-4 lg:grid-cols-2"><Panel className="border-orange-300/20"><div className="flex items-center gap-3"><Sun className="h-7 w-7 text-orange-300" /><h3 className="font-black text-white">{t.sunSide}</h3></div><p className="mt-3 text-sm font-bold text-orange-100">{t.sunExamples}</p></Panel><Panel className="border-violet-300/20"><div className="flex items-center gap-3"><Orbit className="h-7 w-7 text-violet-300" /><h3 className="font-black text-white">{t.spaceSide}</h3></div><p className="mt-3 text-sm font-bold text-violet-100">{t.spaceExamples}</p></Panel></div>
        <Panel><h3 className="font-black text-white">{t.chainTitle}</h3><div className="mt-4 grid gap-2 lg:grid-cols-5">{t.chain.map((item, index) => <div key={item} className="relative rounded-xl bg-white/5 p-3 text-center text-xs font-bold text-slate-200"><span className="mb-2 block font-mono text-orange-300">0{index + 1}</span>{item}{index < 4 && <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#0b1224] p-1 text-orange-300 lg:block" />}</div>)}</div></Panel>

        <div><h3 className="font-black text-white">{t.effectsTitle}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{t.effects.map((item, index) => { const Icon = effectIcons[index]; return <Panel key={item[0]}><div className="flex items-center gap-3"><Icon className="h-7 w-7 text-cyan-300" /><h4 className="font-black text-white">{item[0]}</h4></div><p className="mt-3 text-sm leading-6 text-slate-300">{item[1]}</p></Panel>; })}</div></div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]"><Panel><div className="flex items-center gap-3"><Activity className="h-8 w-8 text-orange-300" /><h3 className="font-black text-white">{t.cycleTitle}</h3></div><p className="mt-3 text-sm leading-6 text-slate-300">{t.cycleBody}</p><div className="mt-5 flex h-40 items-end gap-2 border-b border-slate-600 px-2">{cycleHeights.map((height, index) => <div key={index} className={`flex-1 rounded-t bg-gradient-to-t transition-[height] duration-300 ${height > 80 ? "from-rose-600 to-orange-300" : "from-violet-700 to-cyan-400"}`} style={{ height: `${height}%` }}><span className="sr-only">{index + 1}: {height}%</span></div>)}</div><div className="mt-2 flex justify-between text-xs font-bold text-slate-400"><span>{t.lowActivity}</span><span className="text-orange-300">{t.highActivity}</span><span>{t.lowActivity}</span></div></Panel><Panel><div className="flex items-center gap-3"><Satellite className="h-8 w-8 text-violet-300" /><h3 className="font-black text-white">{t.forecast}</h3></div><div className="mt-4 space-y-2">{t.forecastItems.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-white/5 p-3 text-sm text-slate-300"><Antenna className="h-5 w-5 shrink-0 text-violet-300" />{item}</div>)}</div></Panel></div>

        <Panel className="border-rose-300/25 bg-gradient-to-br from-rose-400/[0.09] to-transparent"><div className="flex items-start gap-4"><CloudLightning className="mt-1 h-9 w-9 shrink-0 text-rose-300" /><div><p className="text-xs font-black uppercase tracking-[.15em] text-rose-200">X9.3</p><h3 className="mt-1 text-xl font-black text-white">{t.eventTitle}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{t.eventBody}</p></div></div></Panel>
      </div>

      <footer className="rounded-[1.75rem] border border-orange-300/20 bg-orange-300/[0.06] p-5 sm:p-7"><div className="flex items-center gap-3"><Earth className="h-8 w-8 text-orange-300" /><h2 className="text-xl font-black text-white">{t.recapTitle}</h2></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.recap.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-slate-950/45 p-3 text-sm leading-6 text-slate-200"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-orange-300" />{item}</div>)}</div>{onMarkRead && <button type="button" disabled={isRead} onClick={onMarkRead} className="mt-6 min-h-12 w-full rounded-xl bg-orange-300 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:bg-emerald-400"><span className="inline-flex items-center gap-2">{isRead ? <CheckCircle2 className="h-5 w-5" /> : <Sun className="h-5 w-5" />}{isRead ? t.marked : t.mark}</span></button>}</footer>
    </div>
  </section>;
}
