import type { ScienceF3BilingualContent } from "../bilingual-types";

export const scienceF3C9Interactive: ScienceF3BilingualContent = {
  chapter: 9,
  blogHighlight: {
    title: { dlp: "Science Gallery — X9.3 Class Solar Flare", bm: "Galeri Sains — Nyalaan Suria Kelas X9.3" },
    body: {
      dlp: "At 8:02 am on 6 September 2017, the Sun released an X9.3 class solar flare — one of the strongest ever recorded — followed by coronal mass ejections that disrupted telecommunication, navigation systems and power lines on Earth for about an hour.",
      bm: "Pada jam 8.02 pagi, 6 September 2017, Matahari melepaskan nyalaan suria kelas X9.3 — antara yang terkuat pernah direkodkan — diikuti semburan jisim korona yang mengganggu telekomunikasi, sistem navigasi dan talian kuasa di Bumi selama lebih kurang sejam.",
    },
  },
  keywords: [
    { dlp: "Corona", bm: "Korona" },
    { dlp: "Sunspot", bm: "Tompok Matahari" },
    { dlp: "Solar flare", bm: "Nyalaan suria" },
    { dlp: "Solar wind", bm: "Angin suria" },
    { dlp: "Magnetosphere", bm: "Magnetosfera" },
    { dlp: "Prominence", bm: "Semarak suria" },
  ],
  sections: [
    {
      number: "9.1",
      title: { dlp: "Activities of the Sun that Affect Earth", bm: "Aktiviti Matahari yang Memberi Kesan kepada Bumi" },
      intro: {
        dlp: "The Sun drives everything from daylight to space weather — understanding its structure and surface activity is the first step to understanding the effects that reach Earth.",
        bm: "Matahari menggerakkan segala-galanya daripada cahaya siang hingga cuaca angkasa — memahami struktur dan aktiviti permukaannya adalah langkah pertama untuk memahami kesan yang sampai ke Bumi.",
      },
      flipCardGroups: [
        {
          title: { dlp: "☀️ Six layers, one star", bm: "☀️ Enam lapisan, satu bintang" },
          instruction: {
            dlp: "The Sun is almost entirely hydrogen and helium gas. Tap each layer, from the core outward.",
            bm: "Matahari terdiri hampir sepenuhnya daripada gas hidrogen dan helium. Ketik setiap lapisan, dari teras ke luar.",
          },
          items: [
            { id: "core", icon: "🔥", label: { dlp: "Core", bm: "Teras" }, fact: { dlp: "The innermost layer where nuclear fusion produces the Sun's energy.", bm: "Lapisan paling dalam tempat pelakuran nuklear menghasilkan tenaga Matahari." } },
            { id: "radiation-zone", icon: "📡", label: { dlp: "Radiation Zone", bm: "Zon Radiasi" }, fact: { dlp: "Energy from the core moves outward as radiation.", bm: "Tenaga daripada teras bergerak ke luar sebagai radiasi." } },
            { id: "convection-zone", icon: "🌀", label: { dlp: "Convection Zone", bm: "Zon Perolakan" }, fact: { dlp: "Hot plasma rises and cooler plasma sinks, carrying energy outward.", bm: "Plasma panas naik dan plasma sejuk turun, membawa tenaga ke luar." } },
            { id: "photosphere", icon: "🟡", label: { dlp: "Photosphere", bm: "Fotosfera" }, fact: { dlp: "The visible 'surface' of the Sun, made of granules ~1,000 km wide.", bm: "'Permukaan' Matahari yang boleh dilihat, terdiri daripada granul lebar ~1,000 km." } },
            { id: "chromosphere", icon: "🌅", label: { dlp: "Chromosphere", bm: "Kromosfera" }, fact: { dlp: "A thin layer above the photosphere, visible during a solar eclipse.", bm: "Lapisan nipis di atas fotosfera, boleh dilihat semasa gerhana matahari." } },
            { id: "corona", icon: "✨", label: { dlp: "Corona", bm: "Korona" }, fact: { dlp: "The outermost, extremely hot atmosphere layer, visible as a glow during eclipses.", bm: "Lapisan atmosfera terluar yang sangat panas, kelihatan sebagai cahaya semasa gerhana." } },
          ],
        },
        {
          title: { dlp: "🔥 Phenomena on the Sun's surface", bm: "🔥 Fenomena di permukaan Matahari" },
          instruction: {
            dlp: "Tap each phenomenon to see what it is and how it behaves.",
            bm: "Ketik setiap fenomena untuk melihat apa itu dan bagaimana ia bertindak.",
          },
          items: [
            { id: "sunspots", icon: "⚫", label: { dlp: "Sunspots", bm: "Tompok Matahari" }, fact: { dlp: "Dark, cooler regions on the photosphere, appearing in pairs/groups, following an 11-year solar cycle.", bm: "Kawasan gelap dan sejuk pada fotosfera, muncul berpasangan/berkumpulan, mengikut kitaran suria 11 tahun." } },
            { id: "prominence", icon: "🌉", label: { dlp: "Prominence", bm: "Semarak Suria" }, fact: { dlp: "A huge arched loop of glowing gas over a sunspot, lasting days to months.", bm: "Gelung gerbang besar gas berkilauan di atas tompok Matahari, bertahan berhari hingga berbulan." } },
            { id: "flare", icon: "💥", label: { dlp: "Solar Flare", bm: "Nyalaan Suria" }, fact: { dlp: "A sudden bright explosion of charged gas near sunspots — light reaches Earth in 8 minutes.", bm: "Letusan cahaya mengejut gas bercas berhampiran tompok Matahari — cahaya sampai ke Bumi dalam 8 minit." } },
            { id: "cme", icon: "☁️", label: { dlp: "Coronal Mass Ejection", bm: "Semburan Jisim Korona" }, fact: { dlp: "A huge cloud of magnetic plasma ejected from the Sun, reaching Earth in about 3 days.", bm: "Awan besar plasma bermagnet yang disembur daripada Matahari, sampai ke Bumi dalam kira-kira 3 hari." } },
            { id: "solar-wind", icon: "💨", label: { dlp: "Solar Wind", bm: "Angin Suria" }, fact: { dlp: "A supersonic stream of electrons, protons and alpha particles erupting into space.", bm: "Aliran supersonik elektron, proton dan zarah alfa yang meletus ke angkasa." } },
            { id: "solar-cycle", icon: "🔄", label: { dlp: "Solar Cycle", bm: "Kitaran Suria" }, fact: { dlp: "The roughly 11-year cycle in which sunspot activity rises and falls.", bm: "Kitaran lebih kurang 11 tahun di mana aktiviti tompok Matahari meningkat dan menurun." } },
          ],
        },
      ],
      cards: [
        {
          title: { dlp: "🛡️ Earth's magnetosphere — our invisible shield", bm: "🛡️ Magnetosfera Bumi — perisai tidak kelihatan kita" },
          body: {
            dlp: "Earth's magnetosphere is a region in space surrounding Earth, formed by the interaction between the magnetic field carried by solar wind and Earth's own magnetic field. It functions as a biological shield, protecting life on Earth by blocking charged particles (electrons, protons, alpha particles) in the solar wind from reaching us — and reducing the pressure solar wind exerts on our atmosphere.",
            bm: "Magnetosfera Bumi ialah kawasan di angkasa lepas yang mengelilingi Bumi, terbentuk melalui interaksi antara medan magnet yang dibawa oleh angin suria dengan medan magnet Bumi sendiri. Ia berfungsi sebagai perisai biologi, melindungi kehidupan di Bumi dengan menghalang zarah bercas (elektron, proton, zarah alfa) dalam angin suria daripada sampai kepada kita — dan mengurangkan tekanan yang dikenakan angin suria terhadap atmosfera kita.",
          },
        },
      ],
      checks: [
        {
          question: {
            dlp: "Why are sunspots dark compared to the rest of the photosphere?",
            bm: "Mengapakah tompok Matahari kelihatan gelap berbanding fotosfera yang lain?",
          },
          hint: {
            dlp: "Sunspots have lower temperatures than the surrounding granules, so they appear darker in contrast even though they're still extremely hot.",
            bm: "Tompok Matahari mempunyai suhu lebih rendah berbanding granul di sekelilingnya, jadi ia kelihatan lebih gelap walaupun masih sangat panas.",
          },
        },
      ],
    },
    {
      number: "9.2",
      title: { dlp: "Space Weather", bm: "Cuaca Angkasa" },
      intro: {
        dlp: "Space weather is defined as phenomena on the Sun's surface (solar flares, prominences, sunspots, coronal mass ejections) and phenomena in space (solar wind, solar radiation storms, geomagnetic storms). Scientists relate the number of sunspots (and where we are in the 11-year solar cycle) to forecast increases in coronal mass ejections and solar wind activity.",
        bm: "Cuaca angkasa ditakrifkan sebagai fenomena di permukaan Matahari (nyalaan suria, semarak suria, tompok Matahari, semburan jisim korona) dan fenomena di angkasa (angin suria, ribut radiasi suria, ribut geomagnet). Saintis mengaitkan bilangan tompok Matahari (dan kedudukan kita dalam kitaran suria 11 tahun) untuk meramalkan peningkatan aktiviti semburan jisim korona dan angin suria.",
      },
      cards: [
        { title: { dlp: "🌌 Formation of aurora at the poles", bm: "🌌 Pembentukan aurora di kutub" }, body: { dlp: "Charged particles funnelled into the atmosphere near the poles produce glowing light displays.", bm: "Zarah bercas yang disalurkan ke atmosfera berhampiran kutub menghasilkan pameran cahaya berkilauan." } },
        { title: { dlp: "📡 Disruption to telecommunication", bm: "📡 Gangguan telekomunikasi" }, body: { dlp: "Solar storms can knock out radio and satellite communication signals.", bm: "Ribut suria boleh melumpuhkan isyarat komunikasi radio dan satelit." } },
        { title: { dlp: "🧭 Disruption to navigation systems", bm: "🧭 Gangguan sistem navigasi" }, body: { dlp: "GPS and other navigation systems can lose accuracy during a geomagnetic storm.", bm: "GPS dan sistem navigasi lain boleh kehilangan ketepatan semasa ribut geomagnet." } },
        { title: { dlp: "⚡ Disruption to electric power lines", bm: "⚡ Gangguan talian kuasa elektrik" }, body: { dlp: "Induced currents from geomagnetic storms can overload and damage power grids.", bm: "Arus teraruh daripada ribut geomagnet boleh membebankan dan merosakkan grid kuasa." } },
      ],
      checks: [
        {
          question: {
            dlp: "Why does the aurora only occur near Earth's poles?",
            bm: "Mengapakah aurora hanya berlaku berhampiran kutub Bumi?",
          },
          hint: {
            dlp: "Earth's magnetic field lines converge at the poles, funnelling charged particles from solar flares and coronal mass ejections down into the atmosphere there, where they collide with atoms and molecules to produce the light display.",
            bm: "Garis medan magnet Bumi bertumpu di kutub, menyalurkan zarah bercas daripada nyalaan suria dan semburan jisim korona turun ke atmosfera di situ, di mana ia berlanggar dengan atom dan molekul menghasilkan pameran cahaya.",
          },
        },
      ],
    },
  ],
  reflectionItems: [
    { dlp: "I can explain the structure of the Sun and phenomena on its surface by drawing.", bm: "Saya dapat menerangkan struktur Matahari dan fenomena di permukaannya melalui lukisan." },
    { dlp: "I can justify the importance of Earth's magnetosphere.", bm: "Saya dapat mewajarkan kepentingan magnetosfera Bumi." },
    { dlp: "I can communicate space weather and its effects on Earth.", bm: "Saya dapat menyatakan cuaca angkasa dan kesannya terhadap Bumi." },
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: { dlp: "True or false: The solar cycle lasts 11 years.", bm: "Betul atau salah: Kitaran suria berlangsung selama 11 tahun." },
      answer: true,
      explanation: {
        dlp: "Correct — sunspot activity follows an 11-year cycle of appearing and disappearing.",
        bm: "Betul — aktiviti tompok Matahari mengikut kitaran 11 tahun untuk muncul dan hilang.",
      },
    },
    {
      type: "multiple-choice",
      question: { dlp: "What is the main function of Earth's magnetosphere?", bm: "Apakah fungsi utama magnetosfera Bumi?" },
      options: [
        { dlp: "Blocking charged particles from solar wind", bm: "Menghalang zarah bercas daripada angin suria" },
        { dlp: "Producing sunlight", bm: "Menghasilkan cahaya matahari" },
        { dlp: "Creating sunspots", bm: "Mencipta tompok Matahari" },
        { dlp: "Increasing solar flares", bm: "Meningkatkan nyalaan suria" },
      ],
      answerIndex: 0,
      explanation: {
        dlp: "The magnetosphere acts as a biological shield, blocking dangerous charged particles from the Sun and reducing solar wind pressure on Earth's atmosphere.",
        bm: "Magnetosfera bertindak sebagai perisai biologi, menghalang zarah bercas berbahaya daripada Matahari dan mengurangkan tekanan angin suria terhadap atmosfera Bumi.",
      },
    },
  ],
};
