import type { ScienceF3BilingualContent } from "../bilingual-types";
import { chapter8Facts as f } from "./chapter8-content";

const card = (fact: typeof f.substance) => ({ title: fact.term, body: fact.statement });

export const scienceF3C8Interactive: ScienceF3BilingualContent = {
  chapter: 8,
  blogHighlight: {
    title: { dlp: "Science Gallery — Is the Sun Really Safe?", bm: "Galeri Sains — Adakah Matahari Benar-benar Selamat?" },
    body: {
      dlp: "The Sun is the largest radioactive source near Earth. Most scientific investigations show its rays don't contain radioactive radiation — but data from a 2017 coronal mass ejection, gathered by the Fermi telescope, showed the Sun's rays do contain gamma rays after all.",
      bm: "Matahari ialah sumber radioaktif terbesar berhampiran Bumi. Kebanyakan kajian saintifik menunjukkan sinarannya tidak mengandungi sinaran radioaktif — tetapi data daripada semburan jisim korona 2017, yang dikumpul oleh teleskop Fermi, menunjukkan sinaran Matahari sebenarnya mengandungi sinar gama.",
    },
  },
  keywords: [
    { dlp: "Radioactivity", bm: "Keradioaktifan" },
    { dlp: "Half-life", bm: "Separuh hayat" },
    { dlp: "Ionising radiation", bm: "Sinaran mengion" },
    { dlp: "Cation", bm: "Kation" },
    { dlp: "Anion", bm: "Anion" },
    { dlp: "Becquerel (Bq)", bm: "Becquerel (Bq)" },
    { dlp: "Curie (Ci)", bm: "Curie (Ci)" },
    { dlp: "Cosmic ray", bm: "Sinar kosmik" },
  ],
  sections: [
    {
      number: "8.1",
      title: { dlp: "Discovery of Radioactivity", bm: "Sejarah Penemuan Keradioaktifan" },
      intro: { dlp: "", bm: "" },
      sequence: {
        title: { dlp: "Discovery timeline", bm: "Urutan penemuan" },
        instruction: {
          dlp: "Step through how radioactivity was uncovered, almost entirely by accident.",
          bm: "Langkah demi langkah, lihat bagaimana keradioaktifan ditemui, hampir sepenuhnya secara tidak sengaja.",
        },
        steps: [
          {
            title: { dlp: "🩻 Roentgen — X-ray (1895)", bm: "🩻 Roentgen — Sinar-X (1895)" },
            body: {
              dlp: "Wilhelm Roentgen accidentally discovered X-rays in 1895 during his experiments. He later produced an X-ray image of his wife's hand.",
              bm: "Wilhelm Roentgen menemui sinar-X secara tidak sengaja pada tahun 1895 semasa menjalankan eksperimen. Beliau kemudiannya menghasilkan imej sinar-X tangan isterinya.",
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
            title: { dlp: "☢️ Marie & Pierre Curie — Research (end of 1897)", bm: "☢️ Marie & Pierre Curie — Kajian (akhir 1897)" },
            body: {
              dlp: "At the end of 1897, the Curies studied radiation through its ionising power. They later extracted two new radioactive elements — polonium and radium — from uranium ore (pitchblende).",
              bm: "Pada akhir 1897, pasangan Curie mengkaji sinaran melalui kuasa pengionannya. Mereka kemudiannya mengekstrak dua unsur radioaktif baharu — polonium dan radium — daripada bijih uranium (pitchblende).",
            },
          },
        ],
      },
      cards: [card(f.substance), card(f.decay)],
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
      intro: { dlp: "", bm: "" },
      cards: [card(f.neutral)],
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
      title: { dlp: "Ionising Radiation and Non-ionising Radiation", bm: "Sinaran Mengion dan Sinaran Tidak Mengion" },
      intro: { dlp: "", bm: "" },
      cards: [card(f.nonIonising), card(f.natural), card(f.background), card(f.artificial), card(f.dose), card(f.controls)],
      flipCards: [
        {
          id: "alpha",
          icon: "α",
          label: { dlp: "Alpha Radiation", bm: "Sinaran Alfa" },
          fact: f.alpha.statement,
        },
        {
          id: "beta",
          icon: "β",
          label: { dlp: "Beta Radiation", bm: "Sinaran Beta" },
          fact: f.beta.statement,
        },
        {
          id: "gamma",
          icon: "γ",
          label: { dlp: "Gamma Ray", bm: "Sinar Gamma" },
          fact: f.gamma.statement,
        },
      ],
      comparison: {
        title: { dlp: "Sources of ionising radiation", bm: "Sumber sinaran mengion" },
        columns: [
          { title: { dlp: "🌌 Natural", bm: "🌌 Semula Jadi" }, body: f.natural.statement },
          { title: { dlp: "🏭 Man-made", bm: "🏭 Buatan Manusia" }, body: f.artificial.statement },
        ],
      },
      checks: [
        {
          question: {
            dlp: "Why are pilots' working hours in the sky limited to a certain period?",
            bm: "Mengapakah jam bekerja juruterbang di udara dihadkan kepada tempoh tertentu?",
          },
          hint: f.pilot.statement,
        },
      ],
    },
    {
      number: "8.4",
      title: { dlp: "Uses of Radioactive Radiation", bm: "Kegunaan Sinaran Radioaktif" },
      intro: { dlp: "", bm: "" },
      flipCards: [
        { id: "archaeology", icon: "🦴", label: { dlp: "Archaeology", bm: "Arkeologi" }, fact: { dlp: "Carbon-14 dating estimates the age of ancient organic remains.", bm: "Pentarikhan karbon-14 menganggarkan usia tinggalan organik purba." } },
        { id: "industry", icon: "🏭", label: { dlp: "Industry", bm: "Industri" }, fact: { dlp: "Beta radiation monitors metal sheet thickness in factories.", bm: "Sinaran beta memantau ketebalan kepingan logam di kilang." } },
        { id: "agriculture", icon: "🌾", label: { dlp: "Agriculture", bm: "Pertanian" }, fact: f.agriculture.statement },
        { id: "defence", icon: "🛡️", label: { dlp: "Defence", bm: "Pertahanan" }, fact: { dlp: "Used in nuclear weapons — devastating and long-lasting effects.", bm: "Digunakan dalam senjata nuklear — kesan yang dahsyat dan berpanjangan." } },
        { id: "food", icon: "🍓", label: { dlp: "Food Preservation", bm: "Pengawetan Makanan" }, fact: { dlp: "Gamma rays kill bacteria in food, labelled with the Radura logo.", bm: "Sinar gama membunuh bakteria dalam makanan, dilabel dengan logo Radura." } },
        { id: "medical", icon: "🏥", label: { dlp: "Medical", bm: "Perubatan" }, fact: f.medicine.statement },
      ],
      cards: [
        card(f.warning), card(f.clothing),
        { title: { dlp: "🔒 Thick lead-walled containers", bm: "🔒 Bekas berdinding plumbum tebal" }, body: { dlp: "Thick lead shielding reduces exposure to penetrating radiation during storage and transport.", bm: "Adangan plumbum tebal mengurangkan pendedahan kepada sinaran berkuasa penembusan tinggi semasa penyimpanan dan pengangkutan." } },
        { title: { dlp: "🦺 Protective clothing", bm: "🦺 Pakaian pelindung" }, body: { dlp: "Worn by workers handling radioactive materials directly.", bm: "Dipakai oleh pekerja yang mengendalikan bahan radioaktif secara langsung." } },
        { title: { dlp: "🤖 Robotic hands for handling", bm: "🤖 Tangan robot untuk pengendalian" }, body: { dlp: "Keeps workers physically distant from radioactive sources.", bm: "Mengekalkan jarak fizikal pekerja daripada sumber radioaktif." } },
        { title: { dlp: "📛 Radiation badges to detect dose", bm: "📛 Lencana sinaran untuk mengesan dos" }, body: { dlp: "Monitors the cumulative radiation dose a worker receives.", bm: "Memantau dos sinaran terkumpul yang diterima seorang pekerja." } },
        { title: { dlp: "🗑️ Safe, proper waste disposal", bm: "🗑️ Pelupusan sisa yang selamat dan betul" }, body: { dlp: "Prevents radioactive waste from contaminating the environment.", bm: "Mengelakkan sisa radioaktif daripada mencemari alam sekitar." } },
      ],
      checks: [
        {
          question: {
            dlp: "How can carbon-14 dating estimate the age of ancient organic remains?",
            bm: "Bagaimanakah pentarikhan karbon-14 dapat menganggarkan usia tinggalan organik purba?",
          },
          hint: f.carbon.statement,
        },
      ],
    },
  ],
  reflectionItems: [
    { dlp: "I can describe the history of the discovery of radioactivity.", bm: "Saya dapat menerangkan sejarah penemuan keradioaktifan." },
    { dlp: "I can explain the formation of positive ions and negative ions.", bm: "Saya dapat menerangkan pembentukan ion positif dan ion negatif." },
    { dlp: "I can differentiate ionising and non-ionising radiation, and their sources.", bm: "Saya dapat membezakan sinaran mengion dan sinaran tidak mengion, serta sumbernya." },
    { dlp: "I can communicate the uses of radioactive radiation and its safe handling.", bm: "Saya dapat menyatakan kegunaan sinaran radioaktif dan pengendaliannya yang selamat." },
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: {
        dlp: "True or false: Marie Curie died from a disease caused by prolonged exposure to gamma rays.",
        bm: "Betul atau salah: Marie Curie meninggal dunia akibat penyakit disebabkan pendedahan berpanjangan kepada sinar gama.",
      },
      answer: true,
      explanation: {
        dlp: "The expected textbook learning point is that prolonged gamma-ray exposure caused the disease that led to Marie Curie's death.",
        bm: "Fakta pembelajaran yang dijangkakan dalam buku teks ialah pendedahan berpanjangan kepada sinar gama menyebabkan penyakit yang membawa kepada kematian Marie Curie.",
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
        { dlp: "Gamma ray", bm: "Sinar gama" },
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
