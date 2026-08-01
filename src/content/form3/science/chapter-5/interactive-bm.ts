import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C5InteractiveBM: ScienceF3InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "Galeri Sains — Bebat Panas lawan Bebat Sejuk",
    body: "Bebat panas segera melegakan kekejangan otot dan meningkatkan aliran darah, manakala bebat sejuk segera mengurangkan bengkak dan melambatkan pendarahan — kedua-duanya bergantung kepada konsep termokimia yang sama, cuma bertentangan arah.",
  },
  keywords: ["Termokimia", "Tindak balas eksotermik", "Tindak balas endotermik"],
  sections: [
    {
      number: "5.1",
      title: "Tindak Balas Endotermik dan Eksotermik",
      intro:
        "Setiap tindak balas kimia menukarkan tenaga kimia yang tersimpan dalam bahan tindak balas kepada bentuk lain — selalunya haba. Termokimia mengkaji perubahan haba ini. Semuanya bergantung kepada satu ukuran sahaja: apa yang dibaca oleh termometer sebelum dan semasa tindak balas. Awalan Greek \"ekso\" bermaksud luar, \"endo\" bermaksud dalam, dan \"termik\" bermaksud haba — eksotermik menolak haba KELUAR ke persekitaran, endotermik menarik haba MASUK daripada persekitaran.",
      cards: [
        { title: "Merekabentuk untuk satu, atau yang satu lagi", body: "Memahami kedua-dua tindak balas ini membolehkan kita merekayasa penyelesaian sebenar: bahan untuk melegakan kekejangan otot (bebat panas eksotermik), lampu kecemasan semasa gangguan bekalan elektrik, dan bekas yang direka untuk mengekalkan suhu tetap." },
      ],
      toggles: [
        {
          title: "Haba dibebaskan, atau haba diserap?",
          instruction: "Ketik untuk membandingkan kedua-dua jenis tindak balas.",
          options: [
            { id: "ekso", label: "Eksotermik", body: "Membebaskan haba KE persekitaran — bacaan termometer meningkat. Contoh: pembakaran kertas, letupan bom, respirasi, peneutralan asid dengan alkali, pengaratan ferum." },
            { id: "endo", label: "Endotermik", body: "Menyerap haba DARIPADA persekitaran — bacaan termometer menurun. Contoh: fotosintesis, membakar kek, pengekstrakan ferum daripada bijihnya, melarutkan garam ammonium dalam air." },
          ],
        },
      ],
      matcher: {
        title: "Padankan proses dengan jenis tindak balasnya",
        instruction: "Pilih satu proses, kemudian pilih sama ada ia eksotermik atau endotermik.",
        pairs: [
          { id: "petrol", label: "Pembakaran petrol", match: "Eksotermik" },
          { id: "fotosintesis", label: "Fotosintesis", match: "Endotermik" },
          { id: "respirasi", label: "Respirasi", match: "Eksotermik" },
          { id: "roti", label: "Membuat roti (membakar)", match: "Endotermik" },
          { id: "peneutralan", label: "Peneutralan", match: "Eksotermik" },
          { id: "pengaratan", label: "Pengaratan ferum", match: "Eksotermik" },
        ],
      },
      checks: [
        { question: "Mengapakah suhu badan anda meningkat semasa bersenam dengan giat?", hint: "Respirasi sel — yang memecahkan glukosa untuk membebaskan tenaga — ialah tindak balas eksotermik, membebaskan haba sebagai hasil sampingan." },
        { question: "Adakah pemanasan kalsium karbonat merupakan tindak balas eksotermik atau endotermik?", hint: "Endotermik — haba mesti dibekalkan secara berterusan daripada sumber luaran (mancis Bunsen) untuk tindak balas penguraian terus berlaku, bermakna tindak balas ini menyerap haba." },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat mendefinisikan tindak balas endotermik dan eksotermik.",
    "Saya dapat mengaitkan haba yang diserap atau dibebaskan dengan jenis tindak balas, dengan contoh sebenar.",
    "Saya dapat mereka bentuk bahan menggunakan konsep tindak balas eksotermik dan endotermik.",
  ],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Bebat sejuk segera berfungsi melalui tindak balas eksotermik.", answer: false, explanation: "Bebat sejuk menyerap haba daripada persekitaran — itu ialah tindak balas endotermik." },
    { type: "multiple-choice", question: "Fotosintesis dalam tumbuhan merupakan contoh tindak balas jenis manakah?", options: ["Eksotermik", "Endotermik", "Bukan salah satu", "Kedua-duanya serentak"], answerIndex: 1, explanation: "Endotermik — tumbuhan menyerap tenaga cahaya untuk menggerakkan tindak balas, menyimpannya sebagai tenaga kimia dalam glukosa." },
  ],
};
