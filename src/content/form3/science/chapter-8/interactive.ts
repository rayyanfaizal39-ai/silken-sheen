import type { ScienceF3BilingualContent } from "../bilingual-types";

export const scienceF3C8Interactive: ScienceF3BilingualContent = {
  chapter: 8,
  blogHighlight: {
    title: { dlp: "Science Gallery — Is the Sun Really Safe?", bm: "Galeri Sains — Adakah Matahari Benar-benar Selamat?" },
    body: {
      dlp: "The Sun is the largest radioactive source near Earth. Most scientific investigations show its rays don't contain radioactive radiation — but data from a 2017 coronal mass ejection, gathered by the Fermi telescope, showed the Sun's rays do contain gamma rays after all.",
      bm: "Matahari ialah sumber radioaktif terbesar berhampiran Bumi. Kebanyakan kajian saintifik menunjukkan sinarannya tidak mengandungi sinaran radioaktif — tetapi data daripada semburan jisim korona 2017, yang dikumpul oleh teleskop Fermi, menunjukkan sinaran Matahari sebenarnya mengandungi sinar gamma.",
    },
  },
  keywords: [
    { dlp: "Radioactivity", bm: "Keradioaktifan" },
    { dlp: "Half-life", bm: "Separuh hayat" },
    { dlp: "Ionising radiation", bm: "Sinaran mengion" },
    { dlp: "Cation", bm: "Kation" },
    { dlp: "Anion", bm: "Anion" },
    { dlp: "Becquerel (Bq)", bm: "Becquerel (Bq)" },
    { dlp: "Cosmic ray", bm: "Sinar kosmik" },
  ],
  sections: [
    {
      number: "8.1",
      title: { dlp: "Discovery of Radioactivity", bm: "Sejarah Penemuan Keradioaktifan" },
      intro: {
        dlp: "Radioactivity was uncovered almost entirely by accident, across three discoveries and three Nobel Prizes. In one sentence: radioactivity is a random and spontaneous decay process of an unstable nucleus, emitting alpha particles (α), beta particles (β) or gamma rays (γ) until the nucleus becomes more stable.",
        bm: "Keradioaktifan ditemui hampir sepenuhnya secara tidak sengaja, merentasi tiga penemuan dan tiga Hadiah Nobel. Dalam satu ayat: keradioaktifan ialah proses pereputan rawak dan spontan bagi nukleus tidak stabil, memancarkan zarah alfa (α), zarah beta (β) atau sinar gamma (γ) sehingga nukleus menjadi lebih stabil.",
      },
      sequence: {
        title: { dlp: "Three discoveries, three Nobel Prizes", bm: "Tiga penemuan, tiga Hadiah Nobel" },
        instruction: {
          dlp: "Step through how radioactivity was uncovered, almost entirely by accident.",
          bm: "Langkah demi langkah, lihat bagaimana keradioaktifan ditemui, hampir sepenuhnya secara tidak sengaja.",
        },
        steps: [
          {
            title: { dlp: "🩻 Roentgen — X-ray (1895)", bm: "🩻 Roentgen — Sinar-X (1895)" },
            body: {
              dlp: "German physicist Wilhelm Roentgen unintentionally X-rayed his wife's hand, discovering X-rays. He received the first Nobel Prize in Physics in 1901.",
              bm: "Ahli fizik Jerman, Wilhelm Roentgen, secara tidak sengaja mengambil gambar sinar-X tangan isterinya, menemui sinar-X. Beliau menerima Hadiah Nobel Fizik pertama pada 1901.",
            },
          },
          {
            title: { dlp: "⚡ Becquerel — Radioactivity (1896)", bm: "⚡ Becquerel — Keradioaktifan (1896)" },
            body: {
              dlp: "French physicist Antoine Henri Becquerel found that a uranium compound could blacken a photographic plate even in the dark, detected via its ionising property. He received the Nobel Prize in Physics in 1903.",
              bm: "Ahli fizik Perancis, Antoine Henri Becquerel, mendapati sebatian uranium boleh menghitamkan plat fotografi walaupun dalam gelap, dikesan melalui sifat pengionannya. Beliau menerima Hadiah Nobel Fizik pada 1903.",
            },
          },
          {
            title: { dlp: "☢️ Marie & Pierre Curie — Polonium & Radium (1897)", bm: "☢️ Marie & Pierre Curie — Polonium & Radium (1897)" },
            body: {
              dlp: "This Polish-French couple detected radioactive radiation through its ionising power, and successfully extracted two new radioactive elements — polonium and radium — from uranium ore (pitchblende).",
              bm: "Pasangan Poland-Perancis ini mengesan sinaran radioaktif melalui kuasa pengionannya, dan berjaya mengekstrak dua unsur radioaktif baharu — polonium dan radium — daripada bijih uranium (pitchblende).",
            },
          },
        ],
      },
      calculators: [
        {
          type: "half-life",
          title: { dlp: "Half-life calculator", bm: "Kalkulator separuh hayat" },
          instruction: {
            dlp: "Half-life is the time taken for the number of undecayed nuclei to reduce to half. Enter the original mass, half-life, and elapsed time to see how much remains.",
            bm: "Separuh hayat ialah masa yang diambil untuk bilangan nukleus yang belum reput berkurang kepada separuh. Masukkan jisim asal, separuh hayat, dan masa berlalu untuk melihat baki yang tinggal.",
          },
          defaultOriginalMass: 80,
          defaultHalfLife: 5.2,
          defaultElapsedTime: 20.8,
        },
      ],
      checks: [
        {
          question: {
            dlp: "Why did Becquerel's rays go unnoticed for a year and a half after his discovery?",
            bm: "Mengapakah sinar Becquerel tidak disedari selama satu setengah tahun selepas penemuannya?",
          },
          hint: {
            dlp: "His rays couldn't produce X-rays of bones like Roentgen's discovery, so nobody was interested in pursuing his study — until Marie and Pierre Curie took notice.",
            bm: "Sinarannya tidak dapat menghasilkan sinar-X tulang seperti penemuan Roentgen, jadi tiada sesiapa berminat meneruskan kajiannya — sehingga Marie dan Pierre Curie mengambil perhatian.",
          },
        },
      ],
    },
    {
      number: "8.2",
      title: { dlp: "Atom and Nucleus", bm: "Atom dan Nukleus" },
      intro: {
        dlp: "When the number of protons equals the number of electrons, an atom is neutral. But when an atom loses or gains electrons, it becomes a charged particle called an ion.",
        bm: "Apabila bilangan proton sama dengan bilangan elektron, atom itu neutral. Tetapi apabila atom kehilangan atau memperoleh elektron, ia menjadi zarah bercas dipanggil ion.",
      },
      toggles: [
        {
          title: { dlp: "When atoms gain or lose electrons", bm: "Apabila atom kehilangan atau memperoleh elektron" },
          instruction: { dlp: "Tap to compare cations and anions.", bm: "Ketik untuk membandingkan kation dan anion." },
          options: [
            {
              id: "cation",
              label: { dlp: "Positive Ion (Cation)", bm: "Ion Positif (Kation)" },
              body: {
                dlp: "Formed when an atom LOSES electrons — protons now outnumber electrons. Example: sodium atom (Na, neutral) loses 1 electron to become Na⁺.",
                bm: "Terbentuk apabila atom KEHILANGAN elektron — proton kini melebihi elektron. Contoh: atom natrium (Na, neutral) kehilangan 1 elektron menjadi Na⁺.",
              },
            },
            {
              id: "anion",
              label: { dlp: "Negative Ion (Anion)", bm: "Ion Negatif (Anion)" },
              body: {
                dlp: "Formed when an atom GAINS electrons — electrons now outnumber protons. Example: chlorine atom (Cl, neutral) gains 1 electron to become Cl⁻.",
                bm: "Terbentuk apabila atom MEMPEROLEH elektron — elektron kini melebihi proton. Contoh: atom klorin (Cl, neutral) memperoleh 1 elektron menjadi Cl⁻.",
              },
            },
          ],
        },
      ],
      checks: [
        {
          question: {
            dlp: "According to Dalton's Atomic Theory, can an atom be divided further?",
            bm: "Menurut Teori Atom Dalton, bolehkah atom dibahagikan lagi?",
          },
          hint: {
            dlp: "No — Dalton's theory (1808) held that an atom is the smallest particle and cannot be divided further. Science later discovered even smaller particles: protons, neutrons and electrons.",
            bm: "Tidak — teori Dalton (1808) menyatakan atom ialah zarah terkecil dan tidak boleh dibahagikan lagi. Sains kemudiannya menemui zarah yang lebih kecil: proton, neutron dan elektron.",
          },
        },
      ],
    },
    {
      number: "8.3",
      title: { dlp: "Ionising Radiation and Non-ionising Radiation", bm: "Sinaran Mengion dan Sinaran Tak Mengion" },
      intro: {
        dlp: "When radiation passes through air and produces positive and negative ions, it's called ionising radiation. Radio waves, microwaves and visible light are non-ionising; X-rays, gamma rays and radioactive radiation are ionising. Tap each type below to compare its ionising power and penetration power.",
        bm: "Apabila sinaran melalui udara dan menghasilkan ion positif dan negatif, ia dipanggil sinaran mengion. Gelombang radio, gelombang mikro dan cahaya nampak adalah tak mengion; sinar-X, sinar gamma dan sinaran radioaktif adalah mengion. Ketik setiap jenis di bawah untuk membandingkan kuasa pengionan dan kuasa penembusannya.",
      },
      cards: [
        {
          title: { dlp: "Safe level", bm: "Tahap selamat" },
          body: { dlp: "Background radiation below 0.2 μSv/h is considered a normal, safe level.", bm: "Radiasi latar bawah 0.2 μSv/j dianggap tahap normal dan selamat." },
        },
      ],
      flipCards: [
        {
          id: "alpha",
          icon: "α",
          label: { dlp: "Alpha Radiation", bm: "Sinaran Alfa" },
          fact: {
            dlp: "Helium nucleus, positive charge. Ionising power: HIGH. Penetration power: LOW (stopped by paper).",
            bm: "Nukleus helium, cas positif. Kuasa pengionan: TINGGI. Kuasa penembusan: RENDAH (dihalang oleh kertas).",
          },
        },
        {
          id: "beta",
          icon: "β",
          label: { dlp: "Beta Radiation", bm: "Sinaran Beta" },
          fact: {
            dlp: "High-speed electron, negative charge. Ionising power: MODERATE. Penetration power: MODERATE (stopped by 3mm aluminium).",
            bm: "Elektron berkelajuan tinggi, cas negatif. Kuasa pengionan: SEDERHANA. Kuasa penembusan: SEDERHANA (dihalang oleh 3mm aluminium).",
          },
        },
        {
          id: "gamma",
          icon: "γ",
          label: { dlp: "Gamma Ray", bm: "Sinar Gamma" },
          fact: {
            dlp: "Electromagnetic wave, no charge. Ionising power: LOW. Penetration power: HIGH (needs 10cm lead to stop).",
            bm: "Gelombang elektromagnet, tiada cas. Kuasa pengionan: RENDAH. Kuasa penembusan: TINGGI (perlu plumbum 10cm untuk menghalang).",
          },
        },
      ],
      comparison: {
        title: { dlp: "Sources of ionising radiation", bm: "Sumber sinaran mengion" },
        columns: [
          { title: { dlp: "🌌 Natural", bm: "🌌 Semula Jadi" }, body: { dlp: "Cosmic rays, background radiation.", bm: "Sinar kosmik, radiasi latar." } },
          { title: { dlp: "🏭 Man-made", bm: "🏭 Buatan Manusia" }, body: { dlp: "Nuclear accidents, nuclear tests, medical radioisotopes.", bm: "Kemalangan nuklear, ujian nuklear, radioisotop perubatan." } },
        ],
      },
      checks: [
        {
          question: {
            dlp: "Why are pilots' working hours in the sky limited to a certain period?",
            bm: "Mengapakah jam bekerja juruterbang di udara dihadkan kepada tempoh tertentu?",
          },
          hint: {
            dlp: "At high altitude, the atmosphere absorbs less cosmic radiation, so pilots receive stronger cosmic rays — their flying hours are limited to keep their dose within a safe level.",
            bm: "Pada ketinggian tinggi, atmosfera menyerap kurang radiasi kosmik, jadi juruterbang menerima sinar kosmik yang lebih kuat — jam penerbangan mereka dihadkan untuk mengekalkan dos mereka dalam tahap selamat.",
          },
        },
      ],
    },
    {
      number: "8.4",
      title: { dlp: "Uses of Radioactive Radiation", bm: "Kegunaan Sinaran Radioaktif" },
      intro: {
        dlp: "One phenomenon, six industries. Tap each field below to see how radioactive radiation is put to work, and how it's handled safely.",
        bm: "Satu fenomena, enam industri. Ketik setiap bidang di bawah untuk melihat bagaimana sinaran radioaktif digunakan, dan bagaimana ia dikendalikan dengan selamat.",
      },
      flipCards: [
        { id: "archaeology", icon: "🦴", label: { dlp: "Archaeology", bm: "Arkeologi" }, fact: { dlp: "Carbon-14 dating determines the age of fossils and artifacts.", bm: "Penentuan usia karbon-14 menentukan usia fosil dan artifak." } },
        { id: "industry", icon: "🏭", label: { dlp: "Industry", bm: "Industri" }, fact: { dlp: "Beta radiation monitors metal sheet thickness in factories.", bm: "Sinaran beta memantau ketebalan kepingan logam di kilang." } },
        { id: "agriculture", icon: "🌾", label: { dlp: "Agriculture", bm: "Pertanian" }, fact: { dlp: "P-32 tracks fertiliser absorption; radiation sterilises pests.", bm: "P-32 menjejak penyerapan baja; sinaran mensteril perosak." } },
        { id: "defence", icon: "🛡️", label: { dlp: "Defence", bm: "Pertahanan" }, fact: { dlp: "Used in nuclear weapons — devastating and long-lasting effects.", bm: "Digunakan dalam senjata nuklear — kesan yang dahsyat dan berpanjangan." } },
        { id: "food", icon: "🍓", label: { dlp: "Food Preservation", bm: "Pengawetan Makanan" }, fact: { dlp: "Gamma rays kill bacteria in food, labelled with the Radura logo.", bm: "Sinar gamma membunuh bakteria dalam makanan, dilabel dengan logo Radura." } },
        { id: "medical", icon: "🏥", label: { dlp: "Medical", bm: "Perubatan" }, fact: { dlp: "Gamma rays from Co-60/Cs-137 kill cancer cells; Na-24 locates blood clots.", bm: "Sinar gamma daripada Co-60/Cs-137 membunuh sel kanser; Na-24 mengesan lokasi gumpalan darah." } },
      ],
      cards: [
        { title: { dlp: "🔒 Thick lead-walled containers", bm: "🔒 Bekas berdinding plumbum tebal" }, body: { dlp: "Contains radioactive sources safely during storage and transport.", bm: "Menyimpan sumber radioaktif dengan selamat semasa penyimpanan dan pengangkutan." } },
        { title: { dlp: "🦺 Protective clothing", bm: "🦺 Pakaian pelindung" }, body: { dlp: "Worn by workers handling radioactive materials directly.", bm: "Dipakai oleh pekerja yang mengendalikan bahan radioaktif secara langsung." } },
        { title: { dlp: "🤖 Robotic hands for handling", bm: "🤖 Tangan robot untuk pengendalian" }, body: { dlp: "Keeps workers physically distant from radioactive sources.", bm: "Mengekalkan jarak fizikal pekerja daripada sumber radioaktif." } },
        { title: { dlp: "📛 Radiation badges to detect dose", bm: "📛 Lencana radiasi untuk mengesan dos" }, body: { dlp: "Monitors the cumulative radiation dose a worker receives.", bm: "Memantau dos radiasi terkumpul yang diterima seorang pekerja." } },
        { title: { dlp: "🗑️ Safe, proper waste disposal", bm: "🗑️ Pelupusan sisa yang selamat dan betul" }, body: { dlp: "Prevents radioactive waste from contaminating the environment.", bm: "Mengelakkan sisa radioaktif daripada mencemari alam sekitar." } },
      ],
      checks: [
        {
          question: {
            dlp: "How does carbon-14 dating determine the age of a dinosaur fossil?",
            bm: "Bagaimanakah penentuan usia karbon-14 menentukan usia fosil dinosaur?",
          },
          hint: {
            dlp: "Once an organism dies, its C-14 begins decaying (half-life 5,700 years) by emitting beta radiation. Measuring the remaining C-14 activity reveals how long ago the organism died.",
            bm: "Sebaik sahaja organisma mati, C-14nya mula reput (separuh hayat 5,700 tahun) dengan memancarkan sinaran beta. Mengukur aktiviti C-14 yang tinggal mendedahkan berapa lama organisma itu telah mati.",
          },
        },
      ],
    },
  ],
  reflectionItems: [
    { dlp: "I can describe the history of the discovery of radioactivity.", bm: "Saya dapat menerangkan sejarah penemuan keradioaktifan." },
    { dlp: "I can explain the formation of positive ions and negative ions.", bm: "Saya dapat menerangkan pembentukan ion positif dan ion negatif." },
    { dlp: "I can differentiate ionising and non-ionising radiation, and their sources.", bm: "Saya dapat membezakan sinaran mengion dan tak mengion, serta sumbernya." },
    { dlp: "I can communicate the uses of radioactive radiation and its safe handling.", bm: "Saya dapat menyatakan kegunaan sinaran radioaktif dan pengendaliannya yang selamat." },
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: {
        dlp: "True or false: Marie Curie died from a disease caused by prolonged exposure to gamma rays.",
        bm: "Betul atau salah: Marie Curie meninggal dunia akibat penyakit disebabkan pendedahan berpanjangan kepada sinar gamma.",
      },
      answer: true,
      explanation: {
        dlp: "Correct — Marie Curie died at age 67 from prolonged exposure to gamma rays during her research.",
        bm: "Betul — Marie Curie meninggal dunia pada usia 67 tahun akibat pendedahan berpanjangan kepada sinar gamma semasa kajiannya.",
      },
    },
    {
      type: "multiple-choice",
      question: {
        dlp: "Which type of radioactive radiation has the highest ionising power?",
        bm: "Jenis sinaran radioaktif manakah yang mempunyai kuasa pengionan tertinggi?",
      },
      options: [
        { dlp: "Alpha radiation", bm: "Sinaran alfa" },
        { dlp: "Beta radiation", bm: "Sinaran beta" },
        { dlp: "Gamma ray", bm: "Sinar gamma" },
        { dlp: "X-ray", bm: "Sinar-X" },
      ],
      answerIndex: 0,
      explanation: {
        dlp: "Alpha radiation has the highest ionising power but the lowest penetration power — it's blocked by just a sheet of paper.",
        bm: "Sinaran alfa mempunyai kuasa pengionan tertinggi tetapi kuasa penembusan terendah — ia dihalang oleh sehelai kertas sahaja.",
      },
    },
  ],
};
