import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch6-asid-alkali.png";

export const scienceF2C6InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 6,
  blogHighlight: {
    title: "Blog Sains — pH Kulit Anda",
    body: "Kulit anda mempunyai lapisan pelindung nipis dipanggil mantel berasid — gabungan sebum dan peluh yang mengekalkan kulit sedikit berasid secara semula jadi, membantu menghalang patogen daripada menyerang.",
    imagePath: chapterImage,
  },
  keywords: [
    "Asid",
    "Alkali",
    "Nilai pH",
    "Kekakisan",
    "Petunjuk sejagat",
    "Fenolftalein",
    "Skala pH",
    "Peneutralan",
    "Garam",
    "Pentitratan",
  ],
  sections: [
    {
      number: "6.1",
      title: "Sifat-Sifat Asid dan Alkali",
      intro:
        "Perkataan \"asid\" berasal daripada perkataan Latin acidus, bermaksud masam. Perkataan \"alkali\" berasal daripada perkataan Arab al-qali, bermaksud abu tumbuhan. Kedua-duanya hanya menunjukkan sifatnya dengan kehadiran air — asid glasial etanoik sahaja tidak menukar warna kertas litmus biru, tetapi sebaik sahaja air ditambah, ia menukarkan litmus biru kepada merah. Begitu juga, natrium hidroksida pepejal sahaja tidak menjejaskan kertas litmus merah, tetapi dengan air ia menukarkan litmus merah kepada biru. Bahan yang mengandungi asid dipanggil bahan berasid (contoh: epal, kopi); bahan yang mengandungi alkali dipanggil bahan beralkali (contoh: soda penaik).",
      cards: [
        {
          title: "Asid",
          body: "Nilai pH kurang daripada 7, berasa masam, menukar kertas litmus biru kepada merah, dan bertindak balas dengan logam menghasilkan gas hidrogen.",
          detail: "Bersifat kakisan dalam bentuk tumpat",
        },
        {
          title: "Alkali",
          body: "Nilai pH lebih daripada 7, berasa pahit, menukar kertas litmus merah kepada biru, dan tidak bertindak balas dengan logam.",
          detail: "Turut bersifat kakisan — jangan sekali-kali dirasa terus",
        },
        {
          title: "Asid dan alkali dalam kehidupan harian",
          body: "Asid: cuka, minuman bergas (asid karbonik), asid bateri kereta (asid sulfurik). Alkali: sabun (kalium hidroksida), baja (ammonia), pil antasid (magnesium hidroksida), detergen (natrium hidroksida).",
        },
      ],
      phSlider: {
        title: "🌈 Skala pH — seret untuk meneroka",
        instruction: "Setiap bahan berada pada skala 0–14. Seret penanda untuk melihat apa yang berada pada setiap nilai pH.",
        scale: [
          { value: 0, name: "Asid bateri", description: "Asid amat kuat — sangat mengakis." },
          { value: 1, name: "Asid gastrik", description: "Asid sangat kuat, cukup kuat untuk mencerna makanan." },
          { value: 2, name: "Cuka / jus limau", description: "Asid kuat — rasa masam yang anda kenali." },
          { value: 3, name: "Jus oren", description: "Asid lemah." },
          { value: 4, name: "Jus nanas / tomato", description: "Asid lemah." },
          { value: 5, name: "Kopi hitam", description: "Asid lemah." },
          { value: 6, name: "Susu", description: "Sedikit berasid." },
          { value: 7, name: "Air tulen", description: "Neutral sepenuhnya." },
          { value: 8, name: "Air laut", description: "Sedikit beralkali." },
          { value: 9, name: "Soda penaik", description: "Alkali ringan." },
          { value: 10, name: "Antasid / susu magnesia", description: "Alkali ringan." },
          { value: 11, name: "Larutan ammonia", description: "Alkali kuat." },
          { value: 12, name: "Air sabun", description: "Alkali kuat." },
          { value: 13, name: "Peluntur (bleach)", description: "Alkali amat kuat." },
          { value: 14, name: "Pencuci saluran paip", description: "Alkali amat kuat — sangat mengakis." },
        ],
      },
      accordions: [
        { title: "🌸 Fenolftalein", body: "Tidak berwarna dalam asid, tidak berwarna apabila neutral, bertukar merah jambu dalam alkali." },
        { title: "🌈 Petunjuk sejagat", body: "Merah dalam asid, hijau apabila neutral, biru dalam alkali — dan setiap warna di antaranya menunjukkan nilai pH sebenar." },
        { title: "🟠 Metil jingga", body: "Merah dalam asid, kuning apabila neutral, kuning dalam alkali." },
        { title: "📄 Kertas litmus", body: "Litmus biru bertukar merah dalam asid; litmus merah bertukar biru dalam alkali — mudah tetapi tidak menunjukkan kekuatan." },
      ],
      checks: [
        { question: "Mengapakah botol asid dan alkali mempunyai simbol amaran kakisan?", hint: "Kerana kedua-dua asid DAN alkali — bukan asid sahaja — boleh bersifat kakisan dan merosakkan kulit atau bahan lain." },
        { question: "Sejenis cecair menukarkan petunjuk sejagat kepada warna hijau. Adakah ia berasid, neutral, atau beralkali?", hint: "Neutral — hijau berada tepat pada pH 7 dalam skala petunjuk sejagat." },
      ],
    },
    {
      number: "6.2",
      title: "Peneutralan",
      intro:
        "Campurkan asid dengan alkali dan kedua-duanya saling meniadakan — asid kehilangan keasidannya, alkali kehilangan kealkaliannya, dan tindak balas menghasilkan garam dan air: Asid + Alkali → Garam + Air. Ini dipanggil peneutralan, dan teknik makmal yang tepat untuk menjalankannya dipanggil pentitratan — menggunakan buret, pipet dan fenolftalein sebagai petunjuk, di mana larutan bertukar daripada merah jambu kepada tidak berwarna menandakan peneutralan telah selesai.",
      cards: [
        { title: "Asid hidroklorik + Natrium hidroksida", body: "Menghasilkan natrium klorida dan air." },
        { title: "Asid sulfurik + Kalium hidroksida", body: "Menghasilkan kalium sulfat dan air." },
        { title: "Asid nitrik + Natrium hidroksida", body: "Menghasilkan natrium nitrat dan air." },
      ],
      accordions: [
        { title: "🦷 Ubat gigi", body: "Bakteria mulut menghasilkan asid yang mengakis gigi — ubat gigi beralkali menetralkannya, membantu mencegah karies gigi." },
        { title: "💇 Syampu + pelembut rambut", body: "Syampu beralkali menjadikan rambut sedikit beralkali; pelembut rambut yang sedikit berasid menetralkan bakinya, menjadikan rambut licin." },
        { title: "🧴 Penjagaan muka", body: "Pencuci muka beralkali boleh mengeringkan kulit — toner berasid menetralkannya selepas itu." },
        { title: "🌾 Rawatan tanah", body: "Tanah berasid dirawat dengan kapur terhidrat yang beralkali supaya tanaman dapat tumbuh dengan baik." },
        { title: "🏭 Sisa perindustrian", body: "Sisa kilang yang berasid dirawat dengan alkali sebelum dilepaskan ke sungai." },
      ],
      checks: [
        { question: "Amran disengat oleh ubur-ubur. Kesakitannya bertambah teruk apabila sabun (beralkali) disapukan. Mengapa?", hint: "Jika kimia sengatan itu bukan asid mudah, penambahan alkali tidak semestinya membantu — peneutralan yang tidak lengkap atau tidak sepadan boleh mengiritasi luka lebih teruk. Rawatan yang betul bergantung kepada mengetahui kimia sebenar sengatan itu." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh mendefinisikan asid dan alkali secara operasi.",
    "Saya boleh menentukan kekuatan asid/alkali menggunakan nilai pH.",
    "Saya boleh menerangkan tindak balas peneutralan dan aplikasinya dalam kehidupan harian.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Semakin rendah nilai pH, semakin kuat asid.",
      answer: true,
      explanation: "Betul — pH 0 ialah asid paling kuat yang mungkin, manakala pH 14 ialah alkali paling kuat.",
    },
    {
      type: "multiple-choice",
      question: "Apakah dua hasil tindak balas peneutralan?",
      options: ["Asid dan alkali", "Garam dan air", "Oksigen dan hidrogen", "Karbon dioksida dan air"],
      answerIndex: 1,
      explanation: "Asid + Alkali → Garam + Air, setiap kali — hanya jenis garam yang terhasil berbeza.",
    },
  ],
};
