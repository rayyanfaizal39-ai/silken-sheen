import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C2InteractiveBM: ScienceF3InteractiveContent = {
  chapter: 2,
  blogHighlight: {
    title: "Galeri Sains — Latihan di Udara Nipis",
    body: "Atlet berlatih di kawasan tinggi atau bilik hipoksik di mana oksigen lebih terhad — ini memaksa badan melepaskan sel darah merah yang tersimpan dan menghasilkan lebih banyak sel darah merah, meningkatkan keupayaan membawa oksigen dan kecekapan respirasi untuk pertandingan.",
  },
  keywords: ["Alveolus", "Diafragma", "Oksihemoglobin", "Resapan", "Respirasi sel", "Emfisema", "Stoma"],
  sections: [
    {
      number: "2.1",
      title: "Sistem Respirasi Manusia",
      intro:
        "Pernafasan ialah proses menyedut dan menghembus udara oleh paru-paru. Udara mengalir: lubang hidung → rongga hidung → farinks → larinks → trakea → bronkus → bronkiol → alveolus — di situlah pertukaran gas sebenar berlaku.",
      cards: [
        { title: "Saya boleh ingat!", body: "Sistem respirasi manusia berfungsi membekalkan oksigen dan menyingkirkan karbon dioksida daripada sel badan." },
      ],
      toggles: [
        {
          title: "Sedut atau hembus?",
          instruction: "Ketik untuk melihat apa yang dilakukan oleh sangkar rusuk, diafragma dan paru-paru anda pada setiap peringkat.",
          options: [
            { id: "sedut", label: "Penyedutan", body: "Otot interkosta berkontraksi, menarik sangkar rusuk ke atas dan ke luar. Diafragma berkontraksi dan mendatar ke bawah. Bersama-sama, ini membesarkan rongga toraks, menurunkan tekanan udara di dalamnya — jadi tekanan udara luar yang lebih tinggi memaksa udara masuk ke paru-paru." },
            { id: "hembus", label: "Penghembusan", body: "Otot interkosta berelaksasi, dan sangkar rusuk bergerak ke bawah dan ke dalam. Diafragma berelaksasi dan melengkung ke atas. Ini mengecilkan rongga toraks, meningkatkan tekanan udara di dalamnya — menolak udara keluar dari paru-paru." },
          ],
        },
      ],
      comparison: {
        title: "Apa yang diramalkan oleh teori",
        columns: [
          { title: "Udara disedut", body: "Peratusan oksigen lebih tinggi dan peratusan karbon dioksida lebih rendah." },
          { title: "Udara dihembus", body: "Peratusan oksigen lebih rendah dan peratusan karbon dioksida lebih tinggi." },
        ],
      },
      checks: [
        { question: "Struktur manakah yang membuka atau menutup trakea semasa menelan?", hint: "Epiglotis — ia turun untuk menutup trakea semasa menelan, dan naik untuk membukanya semasa bernafas." },
      ],
    },
    {
      number: "2.2",
      title: "Pergerakan dan Pertukaran Gas di dalam Badan Manusia",
      intro:
        "Oksigen meresap dari alveolus, di mana kepekatannya lebih tinggi, ke dalam darah, di mana hemoglobin membentuk sebatian tidak stabil dipanggil oksihemoglobin (hemoglobin + oksigen → oksihemoglobin). Di sel badan, oksihemoglobin terurai untuk melepaskan oksigen bagi respirasi sel (glukosa + oksigen → karbon dioksida + air + tenaga), dan karbon dioksida meresap kembali ke arah bertentangan.",
      cards: [
        { title: "Mengapa alveolus dibina khas untuk tugasnya", body: "Ketik setiap adaptasi di bawah untuk melihat bagaimana ia mempercepat pertukaran gas." },
      ],
      flipCards: [
        { id: "thin-walls", icon: "🧱", label: "Dinding nipis", fact: "Dinding alveolus dan kapilari hanya setebal satu sel, mempercepat resapan." },
        { id: "moist", icon: "💧", label: "Permukaan lembap", fact: "Membolehkan gas respirasi larut sebelum meresap merentasi." },
        { id: "surface-area", icon: "📐", label: "Luas permukaan besar", fact: "Berjuta-juta alveolus dalam paru-paru menyediakan jumlah luas permukaan yang besar untuk pertukaran." },
        { id: "capillary", icon: "🕸️", label: "Rangkaian kapilari", fact: "Jaringan kapilari yang padat membalut setiap alveolus, memaksimumkan kadar pertukaran." },
      ],
      checks: [
        { question: "Apakah yang berlaku kepada kecekapan pertukaran gas di kawasan tinggi?", hint: "Ia berkurang — kepekatan oksigen yang lebih rendah di udara mengurangkan kecerunan kepekatan yang menggerakkan resapan ke dalam darah." },
      ],
    },
    {
      number: "2.3",
      title: "Kesihatan Sistem Respirasi Manusia",
      intro: "Tar rokok, karbon monoksida, sulfur dioksida, nitrogen dioksida, jerebu, debu dan debunga semuanya boleh merosakkan sistem respirasi. Ketik setiap satu untuk melihat kesannya.",
      accordions: [
        { title: "Tar rokok", body: "Melekat pada dan membunuh sel di sepanjang laluan udara, meningkatkan penghasilan mukus, dan merupakan punca utama kanser peparu." },
        { title: "Karbon monoksida", body: "Bergabung dengan hemoglobin membentuk karboksihemoglobin yang stabil — ini menghalang pengangkutan oksigen, menyebabkan sel badan kekurangan tenaga." },
        { title: "Sulfur & nitrogen dioksida", body: "Dibebaskan daripada pembakaran arang batu dan bahan api kenderaan — merengsakan laluan udara, menyebabkan batuk, kesukaran bernafas, bronkitis dan asma." },
        { title: "Jerebu, debu & debunga", body: "Zarah pepejal halus yang terampai di udara, merengsakan sistem respirasi dan mencetuskan asma." },
      ],
      matcher: {
        title: "Padankan penyakit dengan puncanya",
        instruction: "Pilih satu penyakit respirasi, kemudian pilih puncanya.",
        pairs: [
          { id: "asma", label: "Asma", match: "Debu, debunga, jerebu dan asap — bunyi berdehit dan sesak nafas" },
          { id: "bronkitis", label: "Bronkitis", match: "Iritan tar rokok yang meradangkan bronkus" },
          { id: "emfisema", label: "Emfisema", match: "Alveolus rosak akibat zarah asap berbahaya" },
          { id: "kanserpeparu", label: "Kanser peparu", match: "Karsinogen seperti tar rokok" },
        ],
      },
      checks: [
        { question: "Apakah maksud perokok pasif?", hint: "Seseorang yang tidak merokok tetapi menyedut asap rokok daripada orang di sekelilingnya — mereka mengalami kesan respirasi berbahaya yang sama seperti perokok." },
      ],
    },
    {
      number: "2.4",
      title: "Adaptasi dalam Sistem Respirasi",
      intro: "Apa jua organisma, permukaan respirasi yang cekap perlu lembap, nipis, dan mempunyai luas permukaan yang besar. Ketik setiap organisma untuk melihat adaptasi uniknya.",
      flipCards: [
        { id: "frog", icon: "🐸", label: "Katak — Kulit luar lembap", fact: "Kulit nipis, telap dan berlapis mukus di atas rangkaian kapilari padat membolehkan gas larut dan meresap dengan mudah, selain menggunakan paru-paru." },
        { id: "fish", icon: "🐟", label: "Ikan — Insang", fact: "Filamen halus berlapis lamela mendatar memberikan luas permukaan besar; aliran air berterusan mengekalkan gas terlarut dan meresap." },
        { id: "insect", icon: "🦗", label: "Serangga — Trakea", fact: "Tiub udara (trakea) bercabang kepada trakeol lembap yang menghantar oksigen terus ke tisu melalui liang spirakel." },
      ],
      checks: [
        { question: "Mengapakah serangga tidak memerlukan sistem peredaran darahnya untuk membantu respirasi?", hint: "Sistem trakeanya menghantar oksigen terus ke tisu melalui trakeol — tidak memerlukan darah untuk membawa gas respirasi langsung." },
      ],
    },
    {
      number: "2.5",
      title: "Pertukaran Gas dalam Tumbuhan",
      intro:
        "Pertukaran gas dalam tumbuhan berlaku terutamanya melalui stoma pada daun, dikawal oleh sepasang sel pengawal. Sama ada stoma terbuka bergantung kepada osmosis. Jerebu dan debu yang mendap pada stoma menghalang pertukaran gas dan mengurangkan fotosintesis, dan gas berasid seperti sulfur dioksida larut dalam hujan membentuk hujan asid — membunuh sel tumbuhan dan menjadikan tanah kurang subur.",
      toggles: [
        {
          title: "Tumbuhan juga bernafas — melalui stomanya",
          instruction: "Ketik untuk membandingkan stoma siang dan malam.",
          options: [
            { id: "siang", label: "☀️ Siang", body: "Sel pengawal menjalankan fotosintesis, meningkatkan kepekatan glukosanya. Air meresap masuk melalui osmosis, menjadikan sel pengawal turgid dan melengkung — ini membuka stoma." },
            { id: "malam", label: "🌙 Malam / Hari Panas", body: "Air meresap keluar daripada sel pengawal melalui osmosis, menjadikannya lembik dan lurus — ini menutup stoma, mengurangkan kehilangan air." },
          ],
        },
      ],
      checks: [
        { question: "Mengapakah stoma menutup pada hari yang sangat panas, walaupun pada waktu siang?", hint: "Untuk mengehadkan kehilangan air melalui transpirasi — haba berlebihan boleh menyebabkan tumbuhan kehilangan air lebih pantas daripada yang dapat digantikan oleh akarnya." },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat melukis dan menerangkan struktur dalaman sistem respirasi manusia serta mekanisme pernafasan.",
    "Saya dapat menerangkan pergerakan dan pertukaran oksigen serta karbon dioksida dalam badan manusia.",
    "Saya dapat menyatakan bahan yang berbahaya kepada sistem respirasi serta penyakit dan simptomnya.",
    "Saya dapat menjustifikasikan bagaimana sistem respirasi beradaptasi dalam situasi berbeza, termasuk dalam tumbuhan.",
  ],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Peratusan karbon dioksida dalam udara yang dihembus adalah kurang berbanding udara yang disedut.", answer: false, explanation: "Udara yang dihembus mempunyai LEBIH BANYAK karbon dioksida berbanding udara yang disedut — bertentangan dengan oksigen." },
    { type: "multiple-choice", question: "Gas manakah yang bergabung dengan hemoglobin membentuk sebatian stabil yang menghalang pengangkutan oksigen?", options: ["Karbon monoksida", "Karbon dioksida", "Nitrogen dioksida", "Sulfur dioksida"], answerIndex: 0, explanation: "Karbon monoksida membentuk karboksihemoglobin yang stabil, tidak seperti oksihemoglobin biasa — menghalang hemoglobin itu daripada membawa oksigen secara kekal." },
  ],
};
