import type { ScienceF3BilingualContent } from "../bilingual-types";

export const scienceF3C7Interactive: ScienceF3BilingualContent = {
  chapter: 7,
  blogHighlight: {
    title: { dlp: "Science Gallery — Stairs Over Lifts", bm: "Galeri Sains — Tangga Berbanding Lif" },
    body: {
      dlp: "Staff and visitors at Shah Alam Hospital, Selangor are encouraged to use the stairs instead of the lift — climbing stairs strengthens the heart and lungs, burns body fat, and even helps reduce the risk of osteoporosis.",
      bm: "Kakitangan dan pelawat Hospital Shah Alam, Selangor digalakkan menggunakan tangga berbanding lif — memanjat tangga mengukuhkan jantung dan paru-paru, membakar lemak badan, malah membantu mengurangkan risiko osteoporosis.",
    },
  },
  keywords: [
    { dlp: "Work", bm: "Kerja" },
    { dlp: "Energy", bm: "Tenaga" },
    { dlp: "Power", bm: "Kuasa" },
    { dlp: "Gravitational potential energy", bm: "Tenaga keupayaan graviti" },
    { dlp: "Elastic potential energy", bm: "Tenaga keupayaan kenyal" },
    { dlp: "Kinetic energy", bm: "Tenaga kinetik" },
    { dlp: "Principle of Conservation of Energy", bm: "Prinsip Keabadian Tenaga" },
  ],
  sections: [
    {
      number: "7.1",
      title: { dlp: "Work, Energy and Power", bm: "Kerja, Tenaga dan Kuasa" },
      intro: {
        dlp: "Work, W, is the product of force, F, and displacement, s, in the direction of the force: W = Fs. The S.I. unit is joule (J) — 1 J of work is done when 1 N of force moves an object 1 m in the direction of the force. Energy is the ability to do work — same unit, joule (J). Power, P, is the rate of doing work: P = W/t, measured in watt (W), where 1 W = 1 J of work done in 1 second.",
        bm: "Kerja, W, ialah hasil darab daya, F, dengan sesaran, s, dalam arah daya tersebut: W = Fs. Unit S.I. ialah joule (J) — 1 J kerja dilakukan apabila daya 1 N menggerakkan objek sejauh 1 m dalam arah daya itu. Tenaga ialah keupayaan untuk melakukan kerja — unit yang sama, joule (J). Kuasa, P, ialah kadar melakukan kerja: P = W/t, diukur dalam watt (W), di mana 1 W = 1 J kerja dilakukan dalam masa 1 saat.",
      },
      calculators: [
        {
          type: "work-power",
          title: { dlp: "Work & power calculator", bm: "Kalkulator kerja & kuasa" },
          instruction: {
            dlp: "Enter force, displacement and time to see the work done and power needed.",
            bm: "Masukkan daya, sesaran dan masa untuk melihat kerja yang dilakukan dan kuasa yang diperlukan.",
          },
          defaultForce: 20,
          defaultDisplacement: 5,
          defaultTime: 10,
        },
      ],
      checks: [
        {
          question: {
            dlp: "A student weighing 400 N carries a 100 N load up a flight of stairs of vertical height 3 m. Calculate the work done.",
            bm: "Seorang murid seberat 400 N membawa beban 100 N menaiki tangga setinggi menegak 3 m. Kirakan kerja yang dilakukan.",
          },
          hint: { dlp: "W = Fs = (400+100) N × 3 m = 1,500 J.", bm: "W = Fs = (400+100) N × 3 m = 1,500 J." },
        },
      ],
    },
    {
      number: "7.2",
      title: { dlp: "Potential Energy and Kinetic Energy", bm: "Tenaga Keupayaan dan Tenaga Kinetik" },
      intro: {
        dlp: "Tap each energy type to see its formula and where it shows up in daily life.",
        bm: "Ketik setiap jenis tenaga untuk melihat formula dan contohnya dalam kehidupan harian.",
      },
      flipCards: [
        {
          id: "gpe",
          icon: "⛰️",
          label: { dlp: "Gravitational P.E.", bm: "T.K. Graviti" },
          fact: {
            dlp: "mgh — energy from height above ground, e.g. a lifted piledriver hammer.",
            bm: "mgh — tenaga daripada ketinggian dari tanah, cth. tukul jentera cerucuk yang diangkat.",
          },
        },
        {
          id: "epe",
          icon: "🌀",
          label: { dlp: "Elastic P.E.", bm: "T.K. Kenyal" },
          fact: {
            dlp: "½Fx — energy stored in a stretched/compressed spring, e.g. a stapler spring.",
            bm: "½Fx — tenaga tersimpan dalam spring yang diregang/dimampat, cth. spring stapler.",
          },
        },
        {
          id: "ke",
          icon: "🏃",
          label: { dlp: "Kinetic Energy", bm: "Tenaga Kinetik" },
          fact: {
            dlp: "½mv² — energy of a moving object, e.g. a moving train.",
            bm: "½mv² — tenaga objek yang bergerak, cth. kereta api yang bergerak.",
          },
        },
      ],
      calculators: [
        {
          type: "energy-type",
          title: { dlp: "Energy calculator", bm: "Kalkulator tenaga" },
          instruction: {
            dlp: "Pick an energy type, then enter its values to see the energy possessed.",
            bm: "Pilih jenis tenaga, kemudian masukkan nilainya untuk melihat tenaga yang dimiliki.",
          },
          defaultGpeMass: 1500,
          defaultGpeHeight: 30,
          defaultEpeForce: 20,
          defaultEpeExtension: 0.08,
          defaultKeMass: 500000,
          defaultKeVelocity: 100,
        },
      ],
      checks: [
        {
          question: {
            dlp: "Liza lifts a 40 N chair to a height of 50 cm. How much energy does the chair possess?",
            bm: "Liza mengangkat sebuah kerusi seberat 40 N ke ketinggian 50 cm. Berapakah tenaga yang dimiliki kerusi itu?",
          },
          hint: { dlp: "Gravitational P.E. = Fh = 40 N × 0.5 m = 20 J.", bm: "T.K. Graviti = Fh = 40 N × 0.5 m = 20 J." },
        },
      ],
    },
    {
      number: "7.3",
      title: { dlp: "Principle of Conservation of Energy", bm: "Prinsip Keabadian Tenaga" },
      intro: {
        dlp: "The Principle of Conservation of Energy states that energy cannot be created or destroyed, only converted from one form to another. A swinging pendulum proves this perfectly.",
        bm: "Prinsip Keabadian Tenaga menyatakan bahawa tenaga tidak boleh dicipta atau dimusnahkan, hanya boleh ditukar daripada satu bentuk kepada bentuk lain. Ayunan bandul membuktikan ini dengan sempurna.",
      },
      sequence: {
        title: { dlp: "Follow the energy through a pendulum swing", bm: "Ikuti tenaga sepanjang ayunan bandul" },
        instruction: {
          dlp: "Step through each position of the swing to see how energy converts between forms.",
          bm: "Langkah demi langkah, lihat setiap kedudukan ayunan untuk melihat bagaimana tenaga bertukar bentuk.",
        },
        steps: [
          {
            title: { dlp: "⬆️ Position X (start)", bm: "⬆️ Kedudukan X (mula)" },
            body: {
              dlp: "Bob at maximum height, momentarily stationary. Gravitational P.E. = maximum. K.E. = zero.",
              bm: "Bandul pada ketinggian maksimum, statik seketika. T.K. graviti = maksimum. Tenaga kinetik = sifar.",
            },
          },
          {
            title: { dlp: "↘️ X → Y", bm: "↘️ X → Y" },
            body: {
              dlp: "Bob swings down. Gravitational P.E. decreases as K.E. increases.",
              bm: "Bandul berayun ke bawah. T.K. graviti berkurang sementara tenaga kinetik bertambah.",
            },
          },
          {
            title: { dlp: "⚡ Position Y (lowest)", bm: "⚡ Kedudukan Y (terendah)" },
            body: {
              dlp: "Bob at minimum height, maximum speed. Gravitational P.E. = minimum. K.E. = maximum.",
              bm: "Bandul pada ketinggian minimum, kelajuan maksimum. T.K. graviti = minimum. Tenaga kinetik = maksimum.",
            },
          },
          {
            title: { dlp: "↗️ Y → Z", bm: "↗️ Y → Z" },
            body: {
              dlp: "Bob swings up the other side. K.E. decreases as gravitational P.E. increases.",
              bm: "Bandul berayun ke sisi lain. Tenaga kinetik berkurang sementara T.K. graviti bertambah.",
            },
          },
          {
            title: { dlp: "⬆️ Position Z (opposite end)", bm: "⬆️ Kedudukan Z (hujung bertentangan)" },
            body: {
              dlp: "Bob at maximum height again, momentarily stationary. Gravitational P.E. = maximum. K.E. = zero.",
              bm: "Bandul pada ketinggian maksimum semula, statik seketika. T.K. graviti = maksimum. Tenaga kinetik = sifar.",
            },
          },
        ],
      },
      checks: [
        {
          question: {
            dlp: "Why does a closed oscillating system have no heat energy produced?",
            bm: "Mengapakah sistem ayunan tertutup tidak menghasilkan tenaga haba?",
          },
          hint: {
            dlp: "A closed system has no external force such as friction acting on it, so no energy is wasted as heat.",
            bm: "Sistem tertutup tiada daya luaran seperti geseran yang bertindak ke atasnya, jadi tiada tenaga terbazir sebagai haba.",
          },
        },
      ],
    },
  ],
  reflectionItems: [
    { dlp: "I can define work and solve problems related to power in daily life.", bm: "Saya dapat mendefinisikan kerja dan menyelesaikan masalah berkaitan kuasa dalam kehidupan harian." },
    { dlp: "I can explain gravitational, elastic and kinetic energy with examples.", bm: "Saya dapat menerangkan tenaga keupayaan graviti, kenyal dan kinetik dengan contoh." },
    { dlp: "I can explain the Principle of Conservation of Energy with examples.", bm: "Saya dapat menerangkan Prinsip Keabadian Tenaga dengan contoh." },
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: { dlp: "True or false: A stationary object possesses kinetic energy.", bm: "Betul atau salah: Objek yang statik memiliki tenaga kinetik." },
      answer: false,
      explanation: {
        dlp: "A stationary object has zero velocity, so its kinetic energy (½mv²) is zero.",
        bm: "Objek statik mempunyai halaju sifar, jadi tenaga kinetiknya (½mv²) adalah sifar.",
      },
    },
    {
      type: "multiple-choice",
      question: { dlp: "At the highest point of a pendulum swing, what is true?", bm: "Pada titik tertinggi ayunan bandul, apakah yang benar?" },
      options: [
        { dlp: "P.E. is maximum, K.E. is zero", bm: "T.K. maksimum, tenaga kinetik sifar" },
        { dlp: "P.E. is zero, K.E. is maximum", bm: "T.K. sifar, tenaga kinetik maksimum" },
        { dlp: "Both are zero", bm: "Kedua-duanya sifar" },
        { dlp: "Both are maximum", bm: "Kedua-duanya maksimum" },
      ],
      answerIndex: 0,
      explanation: {
        dlp: "At maximum height, the bob is momentarily stationary — all energy is gravitational P.E., none is K.E.",
        bm: "Pada ketinggian maksimum, bandul statik seketika — semua tenaga ialah T.K. graviti, tiada tenaga kinetik.",
      },
    },
  ],
};
