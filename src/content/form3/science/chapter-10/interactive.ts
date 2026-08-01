import type { ScienceF3BilingualContent } from "../bilingual-types";

export const scienceF3C10Interactive: ScienceF3BilingualContent = {
  chapter: 10,
  blogHighlight: {
    title: { dlp: "Science Gallery — Malaysia's First Astronaut", bm: "Galeri Sains — Angkasawan Pertama Malaysia" },
    body: {
      dlp: "Dato' Dr Sheikh Muszaphar Shukor Al Masrie became the first astronaut from Malaysia to carry out experiments in space, aboard the International Space Station from 10 to 21 October 2007.",
      bm: "Dato' Dr Sheikh Muszaphar Shukor Al Masrie menjadi angkasawan pertama dari Malaysia yang menjalankan eksperimen di angkasa, di Stesen Angkasa Antarabangsa dari 10 hingga 21 Oktober 2007.",
    },
  },
  keywords: [
    { dlp: "Geocentric", bm: "Geosentrik" },
    { dlp: "Heliocentric", bm: "Heliosentrik" },
    { dlp: "Kepler's Law", bm: "Hukum Kepler" },
    { dlp: "Space probe", bm: "Kuar angkasa" },
    { dlp: "Remote sensing", bm: "Penderiaan jauh" },
  ],
  sections: [
    {
      number: "10.1",
      title: { dlp: "Development in Astronomy", bm: "Perkembangan dalam Astronomi" },
      intro: {
        dlp: "Our model of the Solar System has been rebuilt twice, as astronomers gathered better observations across the centuries — from Earth at the centre, to the Sun at the centre, to correctly-shaped elliptical orbits.",
        bm: "Model Sistem Suria kita telah dibina semula sebanyak dua kali, apabila ahli astronomi mengumpul pemerhatian yang lebih baik merentasi kurun — daripada Bumi di pusat, kepada Matahari di pusat, sehingga orbit elips yang betul bentuknya.",
      },
      zoneExplorer: {
        title: { dlp: "Three astronomers, three models of the universe", bm: "Tiga ahli astronomi, tiga model alam semesta" },
        instruction: {
          dlp: "Tap each astronomer's tab to see their Solar System model.",
          bm: "Ketik tab setiap ahli astronomi untuk melihat model Sistem Suria mereka.",
        },
        zones: [
          {
            name: { dlp: "Ptolemy (90–168 A.D.)", bm: "Ptolemy (90–168 M)" },
            description: {
              dlp: "Greek astronomer, astrologer and geographer. Built the geocentric model — Earth at the centre, Sun and planets revolving around it in circular orbits.",
              bm: "Ahli astronomi, ahli nujum dan ahli geografi Greek. Membina model geosentrik — Bumi di pusat, Matahari dan planet mengorbit sekelilingnya dalam orbit bulat.",
            },
          },
          {
            name: { dlp: "Copernicus (1451–1543)", bm: "Copernicus (1451–1543)" },
            description: {
              dlp: "Polish astronomer, mathematician, economist and doctor. Built the heliocentric model — the Sun at the centre, with Earth rotating on its axis and revolving around the Sun in a circular orbit.",
              bm: "Ahli astronomi, ahli matematik, ahli ekonomi dan doktor Poland. Membina model heliosentrik — Matahari di pusat, dengan Bumi berputar pada paksinya dan mengorbit Matahari dalam orbit bulat.",
            },
          },
          {
            name: { dlp: "Kepler (1571–1630)", bm: "Kepler (1571–1630)" },
            description: {
              dlp: "German astronomer, mathematician and astrologer. Modified the heliocentric model with the Sun at one common focal point on the elliptical orbits of the planets, according to Kepler's Law.",
              bm: "Ahli astronomi, ahli matematik dan ahli nujum Jerman. Mengubah suai model heliosentrik dengan Matahari pada satu titik fokus sepunya pada orbit elips planet, menurut Hukum Kepler.",
            },
          },
        ],
      },
      checks: [
        {
          question: {
            dlp: "What is the key similarity between the Copernicus and Kepler models?",
            bm: "Apakah persamaan utama antara model Copernicus dan Kepler?",
          },
          hint: {
            dlp: "Both place the Sun at the centre of the Solar System (heliocentric) — Kepler's contribution was correcting the orbits from circular to elliptical, based on his own law.",
            bm: "Kedua-duanya meletakkan Matahari di pusat Sistem Suria (heliosentrik) — sumbangan Kepler ialah membetulkan orbit daripada bulat kepada elips, berdasarkan hukumnya sendiri.",
          },
        },
      ],
    },
    {
      number: "10.2",
      title: {
        dlp: "Development of Technology and its Application in Space Exploration",
        bm: "Perkembangan Teknologi dan Aplikasinya dalam Penerokaan Angkasa",
      },
      intro: {
        dlp: "From gunpowder rockets to the ISS — step through key milestones in space exploration technology, then see the tools and remote-sensing applications that technology makes possible today.",
        bm: "Daripada roket mesiu kepada ISS — langkah demi langkah, lihat detik penting dalam teknologi penerokaan angkasa, kemudian lihat alat dan aplikasi penderiaan jauh yang dimungkinkan oleh teknologi hari ini.",
      },
      sequence: {
        title: { dlp: "From gunpowder rockets to the ISS", bm: "Daripada roket mesiu kepada ISS" },
        instruction: {
          dlp: "Step through key milestones in space exploration technology.",
          bm: "Langkah demi langkah, lihat detik penting dalam teknologi penerokaan angkasa.",
        },
        steps: [
          {
            title: { dlp: "🎆 Primitive Rockets (11th century)", bm: "🎆 Roket Primitif (abad ke-11)" },
            body: { dlp: "Chinese invented gunpowder and used primitive rockets in battles.", bm: "Orang Cina mencipta mesiu dan menggunakan roket primitif dalam peperangan." },
          },
          {
            title: { dlp: "🔭 First Telescope (1609)", bm: "🔭 Teleskop Pertama (1609)" },
            body: { dlp: "Galileo Galilei used the first telescope in the field of astronomy.", bm: "Galileo Galilei menggunakan teleskop pertama dalam bidang astronomi." },
          },
          {
            title: { dlp: "🛰️ First Satellite (1957)", bm: "🛰️ Satelit Pertama (1957)" },
            body: { dlp: "USSR launched Sputnik 1, the first artificial satellite.", bm: "USSR melancarkan Sputnik 1, satelit buatan pertama." },
          },
          {
            title: { dlp: "👨‍🚀 First Human in Orbit (1961)", bm: "👨‍🚀 Manusia Pertama Mengorbit (1961)" },
            body: { dlp: "Yuri Gagarin became the first human to orbit Earth, aboard USSR Vostok 1.", bm: "Yuri Gagarin menjadi manusia pertama mengorbit Bumi, menaiki Vostok 1 USSR." },
          },
          {
            title: { dlp: "🌕 Moon Landing (1969)", bm: "🌕 Pendaratan di Bulan (1969)" },
            body: { dlp: "Neil Armstrong became the first human to set foot on the Moon, aboard US Apollo 11.", bm: "Neil Armstrong menjadi manusia pertama memijak Bulan, menaiki Apollo 11 AS." },
          },
          {
            title: { dlp: "🇲🇾 Malaysian Satellites (1996–2000)", bm: "🇲🇾 Satelit Malaysia (1996–2000)" },
            body: {
              dlp: "MEASAT 1 and 2 launched (1996); Malaysia's first microsatellite TiungSAT-1 launched (2000).",
              bm: "MEASAT 1 dan 2 dilancarkan (1996); mikrosatelit pertama Malaysia TiungSAT-1 dilancarkan (2000).",
            },
          },
          {
            title: { dlp: "🏗️ ISS Completed (2011)", bm: "🏗️ ISS Disiapkan (2011)" },
            body: { dlp: "Construction of the International Space Station (ISS) was completed.", bm: "Pembinaan Stesen Angkasa Antarabangsa (ISS) disiapkan." },
          },
        ],
      },
      cards: [
        { title: { dlp: "🔭 Space Telescope", bm: "🔭 Teleskop Angkasa" }, body: { dlp: "Detects distant objects; Hubble orbits 500 km above Earth.", bm: "Mengesan objek jauh; Hubble mengorbit 500 km dari Bumi." } },
        { title: { dlp: "🚀 Rocket", bm: "🚀 Roket" }, body: { dlp: "Burning fuel releases hot gas at high speed, pushing the rocket upward.", bm: "Pembakaran bahan api melepaskan gas panas berkelajuan tinggi, menolak roket ke atas." } },
        { title: { dlp: "🛰️ Satellite", bm: "🛰️ Satelit" }, body: { dlp: "Orbits Earth; first was Sputnik 1 (1957).", bm: "Mengorbit Bumi; pertama ialah Sputnik 1 (1957)." } },
        { title: { dlp: "📡 Space Probe", bm: "📡 Kuar Angkasa" }, body: { dlp: "Travels beyond Earth orbit, sending data back — e.g. Cassini at Saturn.", bm: "Bergerak melangkaui orbit Bumi, menghantar data kembali — cth. Cassini di Zuhal." } },
      ],
      flipCards: [
        { id: "agriculture", icon: "🌾", label: { dlp: "Agriculture", bm: "Pertanian" }, fact: { dlp: "Detects suitable regions for agricultural development.", bm: "Mengesan kawasan sesuai untuk pembangunan pertanian." } },
        { id: "geology", icon: "⛏️", label: { dlp: "Geology", bm: "Geologi" }, fact: { dlp: "Detects mineral sources, mass depletion and land depletion.", bm: "Mengesan sumber mineral, kesusutan jisim dan kesusutan tanah." } },
        { id: "disaster", icon: "🚨", label: { dlp: "Disaster Management", bm: "Pengurusan Bencana" }, fact: { dlp: "Identifies pollution and forest fires.", bm: "Mengenal pasti pencemaran dan kebakaran hutan." } },
        { id: "defence", icon: "🛡️", label: { dlp: "Defence", bm: "Pertahanan" }, fact: { dlp: "Detects intrusions of enemy ships, aircraft and vehicles.", bm: "Mengesan pencerobohan kapal, pesawat dan kenderaan musuh." } },
      ],
      checks: [
        {
          question: {
            dlp: "Why are space probes not used to send astronauts into space?",
            bm: "Mengapakah kuar angkasa tidak digunakan untuk menghantar angkasawan ke angkasa?",
          },
          hint: {
            dlp: "Space probes are unmanned spacecraft designed to travel deep into and beyond the Solar System for long durations — they lack the life-support systems needed to keep astronauts alive.",
            bm: "Kuar angkasa ialah kapal angkasa tanpa pemandu yang direka untuk bergerak jauh ke dalam dan melangkaui Sistem Suria untuk tempoh lama — ia tiada sistem sokongan hidup yang diperlukan untuk mengekalkan angkasawan hidup.",
          },
        },
      ],
    },
  ],
  reflectionItems: [
    { dlp: "I can explain the historical development of the Solar System model by drawing.", bm: "Saya dapat menerangkan perkembangan sejarah model Sistem Suria melalui lukisan." },
    { dlp: "I can communicate the importance of technology development in space exploration.", bm: "Saya dapat menyatakan kepentingan perkembangan teknologi dalam penerokaan angkasa." },
    { dlp: "I can justify the need to continue space exploration.", bm: "Saya dapat mewajarkan keperluan untuk meneruskan penerokaan angkasa." },
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: {
        dlp: "True or false: Ptolemy's model placed the Sun at the centre of the Solar System.",
        bm: "Betul atau salah: Model Ptolemy meletakkan Matahari di pusat Sistem Suria.",
      },
      answer: false,
      explanation: {
        dlp: "Ptolemy's model was geocentric — Earth at the centre. It was Copernicus who later placed the Sun at the centre.",
        bm: "Model Ptolemy adalah geosentrik — Bumi di pusat. Copernicuslah yang kemudiannya meletakkan Matahari di pusat.",
      },
    },
    {
      type: "multiple-choice",
      question: {
        dlp: "Which technology is used to detect suitable regions for agricultural development?",
        bm: "Teknologi manakah yang digunakan untuk mengesan kawasan sesuai untuk pembangunan pertanian?",
      },
      options: [
        { dlp: "Remote sensing", bm: "Penderiaan jauh" },
        { dlp: "Space probe", bm: "Kuar angkasa" },
        { dlp: "Rocket", bm: "Roket" },
        { dlp: "Space telescope", bm: "Teleskop angkasa" },
      ],
      answerIndex: 0,
      explanation: {
        dlp: "Remote sensing detects visible, ultraviolet and infrared light from Earth's surface — used in agriculture, geology, disaster management and defence.",
        bm: "Penderiaan jauh mengesan cahaya nampak, ultraungu dan inframerah daripada permukaan Bumi — digunakan dalam pertanian, geologi, pengurusan bencana dan pertahanan.",
      },
    },
  ],
};
