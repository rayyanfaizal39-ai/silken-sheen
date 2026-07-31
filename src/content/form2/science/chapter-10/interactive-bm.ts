import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch10-gelombang-bunyi.png";

export const scienceF2C10InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 10,
  blogHighlight: {
    title: "Blog Sains — Kilat dan Guruh",
    body: "Kilat dan guruh sebenarnya berlaku pada saat yang sama persis — tetapi cahaya sampai ke mata anda jauh lebih pantas berbanding bunyi sampai ke telinga anda, itulah sebabnya anda sentiasa melihat kilat sebelum mendengar deringan guruh.",
    imagePath: chapterImage,
  },
  keywords: [
    "Getaran",
    "Medium",
    "Amplitud",
    "Frekuensi",
    "Gegaran",
    "Kelaraban",
    "Ultrabunyi",
    "Sonar",
  ],
  sections: [
    {
      number: "10.1",
      title: "Ciri-Ciri Gelombang Bunyi",
      intro:
        "Setiap bunyi bermula sebagai getaran — pita suara anda, tali gitar, kon pembesar suara, loceng yang berbunyi. Getaran ini dipindahkan daripada satu molekul udara ke molekul lain dalam bentuk gelombang sehingga sampai ke telinga pendengar. Tetapi bunyi tidak dapat merebak melalui kekosongan: ia memerlukan medium (pepejal, cecair, atau gas) untuk merebak, itulah sebabnya tiada bunyi dalam vakum angkasa lepas.",
      cards: [
        { title: "🪨 Pepejal", body: "Paling pantas — zarah tersusun rapat, jadi getaran berpindah dari satu ke satu lagi hampir serta-merta." },
        { title: "💧 Cecair", body: "Lebih perlahan berbanding pepejal — susunan zarah yang lebih longgar." },
        { title: "💨 Gas", body: "Paling perlahan sekali — zarah jauh antara satu sama lain, melambatkan pemindahan getaran." },
      ],
      tabs: [
        { title: "Keras & licin", body: "Jubin marmar dan dinding kosong adalah pemantul bunyi yang baik — bunyi terpantul semula, yang mewujudkan gegaran." },
        { title: "Lembut & kasar", body: "Karpet dan papan lembut adalah penyerap bunyi yang baik — itulah sebabnya dinding dewan panggung wayang dilapisi papan lembut, untuk mengurangkan gegaran." },
      ],
      checks: [
        { question: "Bolehkah angkasawan mendengar satu sama lain dengan jelas dalam vakum angkasa lepas?", hint: "Tidak — bunyi memerlukan medium untuk merebak, dan angkasa lepas adalah vakum. Itulah sebabnya angkasawan berkomunikasi melalui radio, bukan dengan menjerit." },
      ],
    },
    {
      number: "10.2",
      title: "Kelantangan dan Kelaraban Bunyi",
      intro:
        "Kelantangan bergantung kepada amplitud — sebesar mana getaran itu; semakin besar amplitud, semakin kuat bunyi. Kelaraban (pitch) bergantung kepada frekuensi — sepantas mana ia bergetar, diukur dalam hertz (Hz); semakin tinggi frekuensi, semakin tinggi kelaraban. Lenguhan rendah lembu adalah frekuensi rendah; lengkingan tikus adalah frekuensi tinggi.",
      cards: [
        {
          title: "Kesan Doppler",
          body: "Pernah perasan siren ambulans kedengaran lebih tinggi kelarabannya semasa ia menghampiri, kemudian menurun semasa ia berlalu? Itulah kesan Doppler — perubahan ketara dalam frekuensi disebabkan oleh pergerakan relatif antara sumber bunyi dan pemerhati.",
        },
      ],
      waveVisualizer: {
        title: "🎛️ Main dengan gelombang sendiri",
        instruction: "Seret penebat amplitud dan frekuensi dan lihat bentuk gelombang dilukis semula secara masa nyata.",
      },
      checks: [
        { question: "Seorang pemuzik memainkan nada yang sangat lembut. Ciri manakah yang berubah?", hint: "Amplitud — nada yang lebih lembut bermaksud getaran yang lebih kecil, iaitu kelantangan lebih rendah, bukan perubahan kelaraban." },
      ],
    },
    {
      number: "10.3",
      title: "Fenomena dan Aplikasi Pantulan",
      intro:
        "Gegaran berlaku apabila gelombang bunyi terpantul daripada permukaan keras dan sampai ke telinga anda semula, sedikit tertunda — biasa di dewan kosong, gua, terowong dan gaung. Ultrabunyi ialah bunyi melebihi 20,000 Hz — terlalu tinggi untuk telinga manusia (yang julat pendengarannya kira-kira 20 Hz hingga 20,000 Hz), tetapi tidak untuk kelawar, yang menggunakannya untuk navigasi dalam gelap. Pantulan gelombang bunyi turut menggerakkan teknologi sebenar.",
      cards: [
        { title: "🚢 Sonar", body: "Mengesan objek bawah air untuk kapal, digunakan dalam sektor perkapalan, perubatan dan perikanan." },
        { title: "🏥 Ultrabunyi perubatan", body: "Mengimbas bahagian dalam badan, seperti mengimbas fetus dalam rahim." },
        { title: "🎣 Perikanan", body: "Mengesan kumpulan ikan menggunakan gelombang bunyi yang terpantul." },
        { title: "🦇 Ekolokasi kelawar", body: "Navigasi semula jadi dalam gelap — kelawar memancarkan ultrabunyi dan mendengar gegarannya." },
      ],
      checks: [
        { question: "Mengapakah dewan panggung wayang melapisi dindingnya dengan papan lembut dan bukannya dibiarkan kosong?", hint: "Papan lembut menyerap bunyi berbanding memantulkannya, mengurangkan gegaran yang tidak diingini supaya dialog dan muzik kekal jelas." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan bagaimana bunyi merebak dan dipantulkan/diserap.",
    "Saya boleh mengaitkan amplitud dengan kelantangan dan frekuensi dengan kelaraban.",
    "Saya boleh menerangkan gegaran dan aplikasi sebenar pantulan bunyi.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Gelombang bunyi boleh merebak melalui vakum.",
      answer: false,
      explanation: "Bunyi memerlukan medium — pepejal, cecair, atau gas. Tiada medium, tiada bunyi.",
    },
    {
      type: "multiple-choice",
      question: "Lengkingan tikus mempunyai kelaraban lebih tinggi berbanding lenguhan lembu. Apakah maksudnya?",
      options: ["Bunyi tikus mempunyai amplitud lebih besar", "Bunyi tikus mempunyai frekuensi lebih tinggi", "Bunyi tikus bergerak lebih pantas", "Bunyi tikus tidak memerlukan medium"],
      answerIndex: 1,
      explanation: "Kelaraban bergantung kepada frekuensi — bunyi berkelaraban lebih tinggi hanya bergetar lebih pantas.",
    },
  ],
};
