import { useState, type ReactNode } from "react";
import {
  Antenna,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  FlaskConical,
  Globe2,
  Map,
  Orbit,
  Rocket,
  Satellite,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Sprout,
  Telescope,
} from "lucide-react";
import copernicusHeliocentricImage from "@/assets/notes/form3-science/chapter-10/copernicus-heliosentrik.webp";
import keplerEllipticalOrbitImage from "@/assets/notes/form3-science/chapter-10/kepler-orbit-elips.webp";
import ptolemyGeocentricImage from "@/assets/notes/form3-science/chapter-10/ptolemy-geosentrik.webp";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const modelImages = [
  { src: ptolemyGeocentricImage, width: 1456, height: 1092 },
  { src: copernicusHeliocentricImage, width: 1672, height: 941 },
  { src: keplerEllipticalOrbitImage, width: 1536, height: 1024 },
] as const;

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 10",
    title: "Daripada memerhati langit kepada meneroka angkasa",
    subtitle:
      "Lihat bagaimana bukti mengubah model Sistem Suria, kemudian jejaki teknologi yang membawa manusia, mesin dan sensor melangkaui atmosfera Bumi.",
    path: [
      ["Model Astronomi", "Geosentrik berubah kepada heliosentrik dan orbit elips."],
      ["Garis Masa Teknologi", "Roket, teleskop, satelit dan misi membina kemajuan."],
      ["Alat Penerokaan", "Setiap alat mempunyai lokasi, fungsi dan batas berbeza."],
      ["Penderiaan Jauh", "Sensor orbit menukar sinaran daripada Bumi kepada maklumat."],
    ],
    section101: "Perkembangan dalam astronomi",
    section101Body:
      "Model saintifik berubah apabila pemerhatian dan bukti yang lebih tepat muncul. Tiga tokoh utama menunjukkan bagaimana pemahaman Sistem Suria dibina semula.",
    modelTitle: "Tiga tokoh, tiga model Sistem Suria",
    modelHint: "Pilih tokoh untuk melihat pusat dan bentuk orbit modelnya.",
    modelImageAlt: [
      "Infografik model geosentrik Ptolemy dengan Bumi di pusat",
      "Infografik model heliosentrik Copernicus dengan Matahari di pusat",
      "Infografik orbit elips Kepler dengan Matahari pada satu fokus",
    ],
    models: [
      [
        "Ptolemy",
        "90–168 M",
        "Geosentrik",
        "Bumi pegun di pusat; Matahari, Bulan dan planet mengelilinginya dalam orbit bulat.",
        "Bumi",
        "Bulat",
      ],
      [
        "Nicolaus Copernicus",
        "1473–1543",
        "Heliosentrik",
        "Matahari di pusat; Bumi berputar pada paksi dan planet mengelilingi Matahari dalam orbit bulat.",
        "Matahari",
        "Bulat",
      ],
      [
        "Johannes Kepler",
        "1571–1630",
        "Heliosentrik dikemas kini",
        "Matahari berada pada satu fokus orbit elips planet, selaras dengan Hukum Kepler.",
        "Matahari",
        "Elips",
      ],
    ],
    centre: "Pusat model",
    orbitShape: "Bentuk orbit",
    compareTitle: "Apa yang kekal, apa yang berubah?",
    comparisons: [
      [
        "Ptolemy ↔ Copernicus",
        "Persamaan: jasad bergerak dalam orbit.",
        "Perbezaan: pusat berubah daripada Bumi kepada Matahari.",
      ],
      [
        "Copernicus ↔ Kepler",
        "Persamaan: kedua-duanya heliosentrik.",
        "Perbezaan: orbit bulat berubah kepada orbit elips.",
      ],
    ],
    section102: "Perkembangan teknologi dan aplikasinya",
    section102Body:
      "Penerokaan angkasa berkembang melalui gabungan daya tujah, pemerhatian, komunikasi radio, sistem sokongan hidup dan penderiaan dari orbit.",
    timelineTitle: "Daripada roket primitif kepada RazakSAT",
    timelineHint: "Gerakkan peluncur atau pilih penanda masa untuk meneroka 11 pencapaian.",
    timeline: [
      [
        "Abad ke-11",
        "Roket primitif",
        "China mencipta serbuk letupan dan menggunakan roket primitif dalam peperangan.",
      ],
      [
        "1609",
        "Teleskop Galileo",
        "Galileo menggunakan teleskop untuk memerhati Bulan dan objek angkasa.",
      ],
      ["1957", "Sputnik 1", "USSR melancarkan satelit buatan manusia pertama ke orbit Bumi."],
      ["1961", "Yuri Gagarin", "Manusia pertama mengorbit Bumi menaiki Vostok 1."],
      ["1969", "Apollo 11", "Neil Armstrong menjadi manusia pertama menjejakkan kaki di Bulan."],
      ["1973", "SkyLab", "Stesen angkasa pertama dilancarkan."],
      ["1977", "Voyager 1 & 2", "Dua kuar dilancarkan untuk meneroka planet luar Sistem Suria."],
      [
        "1990",
        "Teleskop Hubble",
        "Teleskop angkasa dilancarkan untuk imej tajam tanpa gangguan atmosfera.",
      ],
      ["1998", "ISS bermula", "Modul pertama Stesen Angkasa Antarabangsa dilancarkan."],
      ["2000", "TiungSAT-1", "Mikrosatelit pertama Malaysia dilancarkan ke orbit."],
      ["2009", "RazakSAT", "Satelit penderiaan jauh pertama Malaysia dilancarkan."],
    ],
    technologyTitle: "Lima alat, lima peranan",
    technologyHint: "Pilih teknologi untuk membezakan tujuan dan cara operasinya.",
    technologies: [
      [
        "Teleskop",
        "Mengesan sinaran daripada objek jauh. Hubble dan Spitzer berada di luar atmosfera untuk mengelakkan habuk, wap air dan cahaya persekitaran.",
      ],
      [
        "Roket",
        "Enjin mengeluarkan gas panas berkelajuan tinggi untuk menghasilkan daya tujah; membawa satelit, kuar dan angkasawan melawan graviti.",
      ],
      [
        "Satelit",
        "Jasad buatan yang mengorbit Bumi atau planet lain untuk telekomunikasi, cuaca, GPS dan penderiaan jauh.",
      ],
      [
        "Kuar Angkasa",
        "Kapal robotik tanpa manusia yang menjelajah jauh, menggunakan panel suria atau bateri radioisotop dan menghantar data melalui radio.",
      ],
      [
        "Stesen Angkasa",
        "Kediaman dan makmal orbit untuk angkasawan menjalankan eksperimen mikrograviti selama berbulan-bulan.",
      ],
    ],
    probeQuestion: "Mengapa kuar tidak membawa angkasawan?",
    probeAnswer:
      "Misi terlalu jauh, berbahaya dan boleh mengambil puluhan tahun. Kuar tidak mempunyai sistem sokongan hidup manusia.",
    remoteTitle: "Penderiaan jauh: data tanpa menyentuh sasaran",
    remoteBody:
      "Sensor atau kamera pada satelit, pesawat atau belon mengumpul sinaran daripada permukaan Bumi, lalu data dihantar untuk diproses menjadi peta dan maklumat tindakan.",
    remoteFlow: [
      "Permukaan Bumi",
      "Sinar dipantul / dipancar",
      "Sensor orbit",
      "Data dihantar",
      "Imej & analisis",
    ],
    applicationsTitle: "Empat bidang menggunakan pandangan dari atas",
    applications: [
      [
        "Pertanian",
        "Pantau kelembapan dan keadaan tanah; nilai kesihatan tanaman serta ramal hasil padi.",
      ],
      [
        "Geologi",
        "Cari petroleum, gas asli dan mineral; petakan bentuk muka Bumi untuk topografi.",
      ],
      [
        "Pengurusan Bencana",
        "Petakan banjir dan mangsa, kesan kebakaran hutan, tanah runtuh serta tumpahan minyak.",
      ],
      ["Pertahanan", "Kesan pencerobohan udara, darat dan laut serta ujian nuklear haram."],
    ],
    malaysiaTitle: "Jejak Malaysia di angkasa",
    malaysia: [
      ["TiungSAT-1 · 2000", "Mikrosatelit pertama Malaysia."],
      ["RazakSAT · 2009", "Satelit penderiaan jauh pertama Malaysia."],
      ["Sheikh Muszaphar · 2007", "Angkasawan pertama Malaysia menjalankan eksperimen di ISS."],
      [
        "MACRES",
        "Menyelaras projek dan penyelidikan penderiaan jauh untuk keselamatan dan kemajuan negara.",
      ],
    ],
    recapTitle: "Semak sebelum tamat",
    recap: [
      "Ptolemy: Bumi di pusat; Copernicus dan Kepler: Matahari di pusat.",
      "Copernicus menggunakan orbit bulat; Kepler membetulkannya kepada elips.",
      "Roket memberi daya tujah, satelit mengorbit, kuar menjelajah dan ISS menjadi makmal.",
      "Teleskop angkasa mengelakkan gangguan atmosfera.",
      "Penderiaan jauh mengumpul data tanpa sentuhan fizikal dengan sasaran.",
      "Malaysia mempunyai TiungSAT-1, RazakSAT, program angkasawan dan MACRES.",
    ],
    mark: "Tandakan Bab 10 Selesai",
    marked: "Bab 10 selesai",
  },
  en: {
    eyebrow: "Chapter 10 visual map",
    title: "From observing the sky to exploring space",
    subtitle:
      "See how evidence changed the Solar System model, then track the technologies that carry people, machines and sensors beyond Earth's atmosphere.",
    path: [
      ["Astronomical Models", "Geocentric gave way to heliocentric and elliptical orbits."],
      ["Technology Timeline", "Rockets, telescopes, satellites and missions drove progress."],
      ["Exploration Tools", "Each tool has a different location, function and limitation."],
      ["Remote Sensing", "Orbiting sensors turn radiation from Earth into information."],
    ],
    section101: "Development in astronomy",
    section101Body:
      "Scientific models change when more accurate observations and evidence emerge. Three major astronomers show how our picture of the Solar System was rebuilt.",
    modelTitle: "Three astronomers, three Solar System models",
    modelHint: "Choose an astronomer to see the centre and orbit shape in the model.",
    modelImageAlt: [
      "Ptolemy's geocentric model infographic with Earth at the centre",
      "Copernicus's heliocentric model infographic with the Sun at the centre",
      "Kepler's elliptical-orbit infographic with the Sun at one focus",
    ],
    models: [
      [
        "Ptolemy",
        "90–168 A.D.",
        "Geocentric",
        "A stationary Earth at the centre; the Sun, Moon and planets circle it in circular orbits.",
        "Earth",
        "Circular",
      ],
      [
        "Nicolaus Copernicus",
        "1473–1543",
        "Heliocentric",
        "The Sun at the centre; Earth rotates on its axis and planets circle the Sun in circular orbits.",
        "Sun",
        "Circular",
      ],
      [
        "Johannes Kepler",
        "1571–1630",
        "Updated heliocentric",
        "The Sun lies at one focus of each planet's elliptical orbit, following Kepler's Law.",
        "Sun",
        "Elliptical",
      ],
    ],
    centre: "Model centre",
    orbitShape: "Orbit shape",
    compareTitle: "What stayed, and what changed?",
    comparisons: [
      [
        "Ptolemy ↔ Copernicus",
        "Similarity: bodies travel in orbits.",
        "Difference: the centre changed from Earth to the Sun.",
      ],
      [
        "Copernicus ↔ Kepler",
        "Similarity: both are heliocentric.",
        "Difference: circular orbits changed to elliptical orbits.",
      ],
    ],
    section102: "Technology development and its applications",
    section102Body:
      "Space exploration advances through a combination of thrust, observation, radio communication, life-support systems and sensing from orbit.",
    timelineTitle: "From primitive rockets to RazakSAT",
    timelineHint: "Move the slider or choose a time marker to explore 11 milestones.",
    timeline: [
      [
        "11th century",
        "Primitive rockets",
        "China invented gunpowder and used primitive rockets in warfare.",
      ],
      [
        "1609",
        "Galileo's telescope",
        "Galileo used a telescope to observe the Moon and space objects.",
      ],
      ["1957", "Sputnik 1", "The USSR launched the first artificial satellite into Earth orbit."],
      ["1961", "Yuri Gagarin", "The first human to orbit Earth aboard Vostok 1."],
      ["1969", "Apollo 11", "Neil Armstrong became the first human to step onto the Moon."],
      ["1973", "SkyLab", "The first space station was launched."],
      [
        "1977",
        "Voyager 1 & 2",
        "Two probes launched to explore the outer planets of the Solar System.",
      ],
      [
        "1990",
        "Hubble Telescope",
        "A space telescope launched for sharp images without atmospheric interference.",
      ],
      ["1998", "ISS begins", "The first module of the International Space Station was launched."],
      ["2000", "TiungSAT-1", "Malaysia's first microsatellite was launched into orbit."],
      ["2009", "RazakSAT", "Malaysia's first remote-sensing satellite was launched."],
    ],
    technologyTitle: "Five tools, five roles",
    technologyHint: "Choose a technology to distinguish its purpose and operation.",
    technologies: [
      [
        "Telescope",
        "Detects radiation from distant objects. Hubble and Spitzer sit beyond the atmosphere to avoid dust, water vapour and surrounding light.",
      ],
      [
        "Rocket",
        "An engine ejects hot gas at high speed to create thrust; carries satellites, probes and astronauts against gravity.",
      ],
      [
        "Satellite",
        "An artificial body orbiting Earth or another planet for telecommunications, weather, GPS and remote sensing.",
      ],
      [
        "Space Probe",
        "An unmanned robotic craft that travels far, uses solar panels or radioisotope batteries, and returns data by radio.",
      ],
      [
        "Space Station",
        "An orbiting home and laboratory where astronauts perform microgravity experiments for months.",
      ],
    ],
    probeQuestion: "Why do probes not carry astronauts?",
    probeAnswer:
      "Missions are too distant, dangerous and may take decades. Probes do not contain human life-support systems.",
    remoteTitle: "Remote sensing: data without touching the target",
    remoteBody:
      "Sensors or cameras on satellites, aircraft or balloons collect radiation from Earth's surface, then transmit data for processing into maps and actionable information.",
    remoteFlow: [
      "Earth's surface",
      "Radiation reflected / emitted",
      "Orbiting sensor",
      "Data transmitted",
      "Image & analysis",
    ],
    applicationsTitle: "Four fields use the view from above",
    applications: [
      [
        "Agriculture",
        "Monitor soil moisture and condition; assess crop health and forecast rice yield.",
      ],
      ["Geology", "Locate petroleum, natural gas and minerals; map landforms for topography."],
      [
        "Disaster Management",
        "Map floods and victims; detect forest fires, landslides and oil spills.",
      ],
      ["Defence", "Detect air, land and sea intrusions, as well as illegal nuclear tests."],
    ],
    malaysiaTitle: "Malaysia's trail in space",
    malaysia: [
      ["TiungSAT-1 · 2000", "Malaysia's first microsatellite."],
      ["RazakSAT · 2009", "Malaysia's first remote-sensing satellite."],
      [
        "Sheikh Muszaphar · 2007",
        "Malaysia's first astronaut conducted experiments aboard the ISS.",
      ],
      [
        "MACRES",
        "Coordinates remote-sensing projects and research for national security and development.",
      ],
    ],
    recapTitle: "Check before you finish",
    recap: [
      "Ptolemy: Earth-centred; Copernicus and Kepler: Sun-centred.",
      "Copernicus used circular orbits; Kepler corrected them to ellipses.",
      "Rockets provide thrust, satellites orbit, probes explore and the ISS is a laboratory.",
      "Space telescopes avoid atmospheric interference.",
      "Remote sensing collects data without physical contact with the target.",
      "Malaysia has TiungSAT-1, RazakSAT, an astronaut programme and MACRES.",
    ],
    mark: "Mark Chapter 10 Complete",
    marked: "Chapter 10 complete",
  },
} as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="max-w-3xl">
      <span className="text-xs font-black uppercase tracking-[.2em] text-violet-300">{number}</span>
      <h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{body}</p>
    </div>
  );
}

export function ScienceF3Chapter10VisualNotesBlock({
  id,
  content,
  lang,
  isRead,
  onMarkRead,
}: {
  id?: string;
  content: ScienceF3InteractiveContent;
  lang: Lang;
  storageKey?: string;
  isRead?: boolean;
  onMarkRead?: () => void;
}) {
  const t = copy[lang];
  const [model, setModel] = useState(0);
  const [milestone, setMilestone] = useState(0);
  const [technology, setTechnology] = useState(0);
  const [application, setApplication] = useState(0);
  const technologyIcons = [Telescope, Rocket, Satellite, Antenna, FlaskConical];
  const TechnologyIcon = technologyIcons[technology];
  const applicationIcons = [Sprout, Map, CloudSun, ShieldCheck];
  const ApplicationIcon = applicationIcons[application];
  const modelImage = modelImages[model];

  return (
    <section
      id={id}
      data-lang={lang}
      data-chapter={content.chapter}
      className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[#0d1025] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_12%,rgba(139,92,246,.19),transparent_34%),radial-gradient(circle_at_82%_15%,rgba(34,211,238,.14),transparent_32%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-violet-400/15 via-slate-950/40 to-cyan-400/10 p-5 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-violet-200">
            <Rocket className="h-4 w-4" />
            {t.eyebrow}
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.04] text-white sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {t.path.map((item, index) => (
              <div
                key={item[0]}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="text-xs font-black text-violet-300">0{index + 1}</span>
                <h2 className="mt-2 text-sm font-black text-white">{item[0]}</h2>
                <p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>
                {index < 3 && (
                  <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-[#0d1025] p-1 text-cyan-300 xl:block" />
                )}
              </div>
            ))}
          </div>
        </header>

        <div className="space-y-6">
          <SectionHeading number="10.1" title={t.section101} body={t.section101Body} />
          <Panel>
            <div className="flex items-center gap-3">
              <Orbit className="h-8 w-8 text-violet-300" />
              <div>
                <h3 className="font-black text-white">{t.modelTitle}</h3>
                <p className="mt-1 text-sm text-slate-400">{t.modelHint}</p>
              </div>
            </div>
            <div
              className="mt-5 grid gap-3 sm:grid-cols-3"
              role="tablist"
              aria-label={t.modelTitle}
            >
              {t.models.map((item, index) => (
                <button
                  key={item[0]}
                  type="button"
                  role="tab"
                  aria-selected={model === index}
                  onClick={() => setModel(index)}
                  className={`min-h-16 rounded-xl border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${model === index ? "border-violet-300 bg-violet-300/15" : "border-white/10 bg-white/[0.04]"}`}
                >
                  <span className="block text-xs font-black text-violet-200">{item[1]}</span>
                  <span className="mt-1 block text-sm font-black text-white">{item[0]}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 grid items-center gap-6 lg:grid-cols-[1.35fr_.65fr]">
              <figure className="aspect-[3/2] min-w-0 overflow-hidden rounded-2xl border border-violet-300/20 bg-slate-950/60 shadow-[0_18px_60px_rgba(2,6,23,.4)]">
                <img
                  key={modelImage.src}
                  src={modelImage.src}
                  alt={t.modelImageAlt[model]}
                  width={modelImage.width}
                  height={modelImage.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </figure>
              <div>
                <p className="text-xs font-black uppercase tracking-[.15em] text-violet-300">
                  {t.models[model][2]}
                </p>
                <h4 className="mt-1 text-2xl font-black text-white">{t.models[model][0]}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{t.models[model][3]}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-xs text-slate-400">{t.centre}</span>
                    <p className="mt-1 font-black text-cyan-200">{t.models[model][4]}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <span className="text-xs text-slate-400">{t.orbitShape}</span>
                    <p className="mt-1 font-black text-cyan-200">{t.models[model][5]}</p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
          <div>
            <h3 className="font-black text-white">{t.compareTitle}</h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {t.comparisons.map((item) => (
                <Panel key={item[0]}>
                  <h4 className="font-black text-violet-200">{item[0]}</h4>
                  <p className="mt-3 flex gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                    {item[1]}
                  </p>
                  <p className="mt-2 flex gap-2 text-sm text-slate-300">
                    <ScanSearch className="h-5 w-5 shrink-0 text-amber-300" />
                    {item[2]}
                  </p>
                </Panel>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeading number="10.2" title={t.section102} body={t.section102Body} />
          <Panel>
            <div className="flex items-center gap-3">
              <Rocket className="h-8 w-8 text-cyan-300" />
              <div>
                <h3 className="font-black text-white">{t.timelineTitle}</h3>
                <p className="mt-1 text-sm text-slate-400">{t.timelineHint}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <label
                  htmlFor="space-timeline"
                  className="text-xs font-black uppercase tracking-[.14em] text-cyan-200"
                >
                  {t.timeline[milestone][0]}
                </label>
                <input
                  id="space-timeline"
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={milestone}
                  onChange={(event) => setMilestone(Number(event.target.value))}
                  className="mt-4 w-full accent-cyan-300"
                />
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[0, 2, 4, 6, 8, 10].map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setMilestone(index)}
                      className={`min-h-11 rounded-lg px-2 text-[11px] font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${milestone === index ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-300"}`}
                    >
                      {t.timeline[index][0]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="min-h-48 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/15 font-mono text-xs font-black text-cyan-200">
                    {milestone + 1}/11
                  </span>
                  <div>
                    <p className="text-xs font-black text-cyan-300">{t.timeline[milestone][0]}</p>
                    <h4 className="text-xl font-black text-white">{t.timeline[milestone][1]}</h4>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{t.timeline[milestone][2]}</p>
              </div>
            </div>
          </Panel>

          <Panel>
            <div className="flex items-center gap-3">
              <TechnologyIcon className="h-8 w-8 text-violet-300" />
              <div>
                <h3 className="font-black text-white">{t.technologyTitle}</h3>
                <p className="mt-1 text-sm text-slate-400">{t.technologyHint}</p>
              </div>
            </div>
            <div
              className="mt-5 grid gap-2 sm:grid-cols-5"
              role="tablist"
              aria-label={t.technologyTitle}
            >
              {t.technologies.map((item, index) => {
                const Icon = technologyIcons[index];
                return (
                  <button
                    key={item[0]}
                    type="button"
                    role="tab"
                    aria-selected={technology === index}
                    onClick={() => setTechnology(index)}
                    className={`min-h-20 rounded-xl border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${technology === index ? "border-violet-300 bg-violet-300/15" : "border-white/10 bg-white/[0.04]"}`}
                  >
                    <Icon className="h-5 w-5 text-violet-300" />
                    <span className="mt-2 block text-xs font-black text-white">{item[0]}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-950/60 p-5">
              <h4 className="text-xl font-black text-white">{t.technologies[technology][0]}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {t.technologies[technology][1]}
              </p>
              {technology === 3 && (
                <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.07] p-4">
                  <p className="font-black text-amber-200">{t.probeQuestion}</p>
                  <p className="mt-2 text-sm text-slate-300">{t.probeAnswer}</p>
                </div>
              )}
            </div>
          </Panel>

          <Panel className="border-cyan-300/20">
            <div className="flex items-center gap-3">
              <Satellite className="h-8 w-8 text-cyan-300" />
              <div>
                <h3 className="font-black text-white">{t.remoteTitle}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">{t.remoteBody}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-2 lg:grid-cols-5">
              {t.remoteFlow.map((item, index) => (
                <div
                  key={item}
                  className="relative rounded-xl bg-cyan-300/[0.07] p-3 text-center text-xs font-bold text-cyan-50"
                >
                  <span className="mb-2 block font-mono text-cyan-300">0{index + 1}</span>
                  {item}
                  {index < 4 && (
                    <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#0d1025] p-1 text-cyan-300 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <div>
            <h3 className="font-black text-white">{t.applicationsTitle}</h3>
            <div
              className="mt-4 grid gap-3 sm:grid-cols-4"
              role="tablist"
              aria-label={t.applicationsTitle}
            >
              {t.applications.map((item, index) => {
                const Icon = applicationIcons[index];
                return (
                  <button
                    key={item[0]}
                    type="button"
                    role="tab"
                    aria-selected={application === index}
                    onClick={() => setApplication(index)}
                    className={`min-h-20 rounded-xl border p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${application === index ? "border-cyan-300 bg-cyan-300/15" : "border-white/10 bg-white/[0.04]"}`}
                  >
                    <Icon className="h-5 w-5 text-cyan-300" />
                    <span className="mt-2 block text-xs font-black text-white">{item[0]}</span>
                  </button>
                );
              })}
            </div>
            <Panel className="mt-3 border-cyan-300/20">
              <div className="flex items-start gap-4">
                <ApplicationIcon className="h-9 w-9 shrink-0 text-cyan-300" />
                <div>
                  <h4 className="text-xl font-black text-white">
                    {t.applications[application][0]}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {t.applications[application][1]}
                  </p>
                </div>
              </div>
            </Panel>
          </div>

          <Panel>
            <div className="flex items-center gap-3">
              <Globe2 className="h-8 w-8 text-emerald-300" />
              <h3 className="font-black text-white">{t.malaysiaTitle}</h3>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.malaysia.map((item) => (
                <div
                  key={item[0]}
                  className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4"
                >
                  <p className="text-sm font-black text-emerald-200">{item[0]}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <footer className="rounded-[1.75rem] border border-violet-300/20 bg-violet-300/[0.06] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-violet-300" />
            <h2 className="text-xl font-black text-white">{t.recapTitle}</h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {t.recap.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl bg-slate-950/45 p-3 text-sm leading-6 text-slate-200"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-violet-300" />
                {item}
              </div>
            ))}
          </div>
          {onMarkRead && (
            <button
              type="button"
              disabled={isRead}
              onClick={onMarkRead}
              className="mt-6 min-h-12 w-full rounded-xl bg-violet-300 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-default disabled:bg-emerald-400"
            >
              <span className="inline-flex items-center gap-2">
                {isRead ? <CheckCircle2 className="h-5 w-5" /> : <Rocket className="h-5 w-5" />}
                {isRead ? t.marked : t.mark}
              </span>
            </button>
          )}
        </footer>
      </div>
    </section>
  );
}
