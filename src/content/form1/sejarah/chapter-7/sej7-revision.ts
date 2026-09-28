import type { Flashcard, QuizQuestion, Note } from "@/data/types";
import { sej7Content as c } from "./sej7-content";

// Legacy entry points share these source-derived records instead of separate facts.
const e = c.education;
const x = e.examSystem;
const stages = x.stages;
const stageSummary = (index: number) => {
  const stage = stages[index];
  return `${stage.name}: ${stage.location}; ${stage.frequency}; ${stage.duration}. ${stage.eligibility ?? ""} ${stage.rewards.join(" ")}`;
};

export const sej7Note: Note = {
  id: "sej-f1-c7-note",
  subjectId: "sejarah",
  form: "Form 1",
  chapter: "Chapter 7",
  title: c.hook.title,
  summary: [
    c.indiaOverview.janapadaSystem,
    c.indiaOverview.magadhaRise,
    c.chapterSummary,
    x.introduced,
    ...stages.map((_, index) => stageSummary(index)),
    ...x.controls,
  ].join(" "),
  keywords: c.keyTerms,
};

export const sej7Subtopics = [
  {
    key: "c7-s1",
    num: 1,
    title: "Tamadun India",
    summary: [
      c.indiaOverview.locationShift,
      c.indiaOverview.janapadaSystem,
      c.indiaOverview.magadhaRise,
      c.powerExpansion.definition,
      c.asokaTransformation.afterKalinga,
      c.guptaGoldenAge.religionFocus,
    ].join(" "),
    keywords: [
      "Janapada",
      "Mahajanapada",
      "Magadha",
      ...c.indianDynasties.map((d) => d.name),
      "Asoka",
    ],
  },
  {
    key: "c7-s2",
    num: 2,
    title: "Tamadun China",
    summary: [
      c.chinaOverview.location,
      e.qinEducation,
      e.hanEducation,
      x.introduced,
      x.syllabus,
      ...stages.map((_, index) => stageSummary(index)),
      ...x.controls,
      ...e.scholars.map((s) => `${s.name}: ${s.contribution}`),
      `${e.paperInvention.inventor}: ${e.paperInvention.materials}`,
    ].join(" "),
    keywords: [
      "Dinasti Qin",
      "Dinasti Han",
      "Laluan Sutera",
      "Han Fei Zi",
      "Xiucai",
      "Juren",
      "Jinshi",
      "Dong Zhongshu",
      "Sima Qian",
      "Cai Lun",
    ],
  },
];

const recall: [string, string][] = [
  ["Apakah yang dimaksudkan dengan Janapada?", c.indiaOverview.janapadaSystem],
  ["Apakah Mahajanapada?", c.indiaOverview.janapadaSystem],
  ["Bilakah Magadha muncul sebagai kuasa penting?", c.indiaOverview.magadhaRise],
  ["Mengapakah kedudukan Magadha dianggap strategik?", c.indiaOverview.magadhaRise],
  ["Apakah lima faktor perluasan kuasa?", c.powerExpansion.factors.map((f) => f.factor).join(", ")],
  ["Siapakah pemerintah Maurya yang meluaskan empayar?", c.indianDynasties[1].facts[0]],
  ["Siapakah penulis Arthasastra?", c.indianAchievements[0]],
  [
    "Berapakah kekuatan tentera Chandragupta Maurya?",
    c.indianDynasties[1].militaryStrength!.join(", "),
  ],
  ["Apakah kawasan perluasan Maurya?", c.indianDynasties[1].facts[0]],
  ["Apakah pusat pemerintahan Nanda, Maurya dan Gupta?", "Pataliputra."],
  ["Apakah kesan Perang Kalinga?", c.asokaTransformation.kalingaWar],
  ["Bagaimanakah pemerintahan Asoka berubah selepas Kalinga?", c.asokaTransformation.afterKalinga],
  ["Ke manakah misi Buddha dihantar?", c.asokaTransformation.buddhistMission.join("; ")],
  ["Apakah Tiang Asoka?", c.asokaTransformation.asokaPillar],
  ["Apakah dua bentuk perluasan kuasa?", c.powerExpansion.forms.map((f) => f.type).join(" dan ")],
  ["Apakah matlamat pendidikan China?", e.goals.map((g) => g.goal).join("; ")],
  ["Apakah karya Konfusius yang terkenal?", e.confucius.work],
  ["Bagaimanakah Qin menekankan pendidikan?", e.qinEducation],
  ["Apakah fokus Pendidikan Rendah?", e.levels[0].focus],
  ["Apakah fokus Pendidikan Menengah?", e.levels[1].focus],
  ["Apakah fokus Pendidikan Tinggi?", e.levels[2].focus],
  ["Bilakah sistem peperiksaan awam mula diperkenalkan?", x.introduced],
  ["Siapakah yang boleh menduduki peperiksaan?", x.characteristics[1]],
  ["Bagaimanakah penipuan dalam peperiksaan dicegah?", x.controls.slice(0, 2).join(" ")],
  [
    "Namakan tiga tahap peperiksaan mengikut urutan.",
    stages.map((s) => `${s.name} (${s.location})`).join(" → "),
  ],
  ["Apakah ciri Xiucai?", stageSummary(0)],
  ["Apakah ciri Juren?", stageSummary(1)],
  ["Apakah ciri Jinshi?", stageSummary(2)],
  ["Apakah sukatan peperiksaan awam?", x.syllabus],
  ["Apakah sumbangan Dong Zhongshu?", e.scholars[0].contribution],
  ["Apakah karya Sima Qian?", e.scholars[1].contribution],
  ["Bagaimanakah Han memperkukuh pendidikan?", e.hanEducation],
  ["Mengapakah Gupta dikenali sebagai zaman keemasan Hindu?", c.guptaGoldenAge.religionFocus],
  ["Siapakah Kaviraja?", c.guptaGoldenAge.samudragupta],
  ["Apakah Laluan Sutera?", c.silkRoad.definition],
  ["Apakah bahan kertas Cai Lun?", e.paperInvention.materials],
  ["Apakah warisan sistem peperiksaan China?", x.legacy],
  ["Bagaimanakah kampung menyokong calon?", x.sponsorship],
  ["Apakah perubahan lokasi Tamadun India?", c.indiaOverview.locationShift],
  ["Bilakah peperiksaan awam dimansuhkan?", `${x.abolished}, oleh ${x.abolishedBy}.`],
];

export const sej7Flashcards: Flashcard[] = recall.map(([front, back], index) => ({
  id: `sej-f1-c7-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 1",
  chapter: "Chapter 7",
  front,
  back,
}));

// Answer positions retain the established item IDs; explanations come from the audited notes.
const questions: [string, string[], number, string][] = [
  [
    "Apakah Janapada?",
    ["Empayar", "Kerajaan kecil", "Pasukan tentera", "Tiang batu"],
    1,
    recall[0][1],
  ],
  [
    "Mengapakah kedudukan Magadha strategik?",
    [
      "Perdagangan maritim",
      "Mengawal laluan perdagangan Sungai Ganges",
      "Sistem peperiksaan",
      "Pembuatan kertas",
    ],
    1,
    recall[3][1],
  ],
  [
    "Siapakah pemerintah Maurya yang mempunyai 600,000 infantri?",
    ["Asoka", "Samudragupta", "Chandragupta Maurya", "Chandragupta I"],
    2,
    recall[7][1],
  ],
  ["Siapakah penulis Arthasastra?", ["Asoka", "Kautilya", "Cai Lun", "Konfusius"], 1, recall[6][1]],
  [
    "Berapakah bilangan infantri Chandragupta Maurya?",
    ["100,000", "200,000", "600,000", "30,000"],
    2,
    recall[7][1],
  ],
  [
    "Apakah pusat pemerintahan tiga dinasti India?",
    ["Chang’an", "Pataliputra", "Xianyang", "Loyang"],
    1,
    recall[9][1],
  ],
  [
    "Apakah peristiwa yang mengubah dasar Asoka?",
    ["Pembukaan Laluan Sutera", "Perang Kalinga", "Penubuhan sekolah", "Pembuatan kertas"],
    1,
    recall[11][1],
  ],
  [
    "Berapakah orang yang terbunuh dalam Perang Kalinga menurut buku teks?",
    ["10,000", "50,000", "100,000", "150,000"],
    2,
    recall[10][1],
  ],
  [
    "Agama apakah yang dikembangkan Asoka selepas Kalinga?",
    ["Hindu", "Islam", "Buddha", "Kristian"],
    2,
    recall[11][1],
  ],
  [
    "Apakah yang diukir pada Tiang Asoka?",
    [
      "Keputusan peperiksaan",
      "Peraturan dan undang-undang",
      "Senarai calon",
      "Proses membuat kertas",
    ],
    1,
    recall[13][1],
  ],
  [
    "Apakah dua bentuk perluasan kuasa India?",
    [
      "Pendidikan dan perdagangan",
      "Fizikal dan keagamaan",
      "Pertanian dan seni",
      "Penulisan dan hafalan",
    ],
    1,
    recall[14][1],
  ],
  [
    "Apakah asas penting kemajuan Tamadun China?",
    ["Pertandingan sukan", "Pendidikan", "Perluasan Kalinga", "Tiang Asoka"],
    1,
    e.intro,
  ],
  [
    "Apakah ajaran yang ditekankan dalam pendidikan Han?",
    ["Taoisme", "Buddhisme", "Konfusianisme", "Hinduisme"],
    2,
    e.hanEducation,
  ],
  [
    "Apakah fokus Pendidikan Rendah China?",
    ["Menulis sajak", e.levels[0].focus, "Menterjemah buku suci", "Mentafsir buku suci"],
    1,
    e.levels[0].focus,
  ],
  [
    "Apakah fokus Pendidikan Menengah China?",
    ["Menterjemah", e.levels[1].focus, "Menghafal tanpa memahami", "Mentafsir upacara"],
    1,
    e.levels[1].focus,
  ],
  [
    "Siapakah yang memperkenalkan sistem peperiksaan awal?",
    ["Konfusius", "Maharaja Wu, Dinasti Han", "Chandragupta Maurya", "Asoka"],
    1,
    x.introduced,
  ],
  [
    "Siapakah yang tidak dibenarkan menduduki peperiksaan?",
    ["Petani lelaki", "Pedagang lelaki", "Wanita", "Artisan lelaki"],
    2,
    x.characteristics[1],
  ],
  [
    "Bilakah calon dikurung untuk mengelakkan penipuan?",
    ["Selepas mendapat jawatan", "Selepas keputusan", "Sebelum peperiksaan", "Selepas persaraan"],
    2,
    x.controls.slice(0, 2).join(" "),
  ],
  [
    "Berapa kerap Xiucai diadakan?",
    ["Setiap tahun", stages[0].frequency, "Setiap dua tahun", "Setiap lima tahun"],
    1,
    stageSummary(0),
  ],
  [
    "Siapakah yang layak menduduki Juren?",
    ["Hanya bangsawan", stages[1].eligibility!, "Hanya pedagang", "Semua tanpa syarat"],
    1,
    stageSummary(1),
  ],
  [
    "Apakah keistimewaan calon berjaya dalam Jinshi?",
    ["Menjadi tentera", stages[2].rewards[0], "Menjadi petani", "Menjadi calon Xiucai"],
    1,
    stages[2].rewards.join(" "),
  ],
  [
    "Berapa lama peperiksaan Jinshi?",
    ["Sehari", "Tiga hari", "13 hari", "Dua hari"],
    2,
    stageSummary(2),
  ],
  [
    "Apakah tumpuan Asoka selepas Kalinga?",
    [
      "Perluasan fizikal",
      "Pengembangan agama Buddha",
      "Peperiksaan awam",
      "Pembukaan Laluan Sutera",
    ],
    1,
    c.asokaTransformation.afterKalinga,
  ],
  [
    "Apakah latar belakang calon lelaki yang dibenarkan?",
    [
      "Bangsawan sahaja",
      "Tanpa mengira latar belakang dan status sosial",
      "Pedagang sahaja",
      "Pegawai sahaja",
    ],
    1,
    x.characteristics[1],
  ],
  [
    "Yang manakah matlamat pendidikan China?",
    ["Melatih pasukan gajah", e.goals[0].goal, "Menakluk Kalinga", "Membina Tiang Asoka"],
    1,
    e.goals.map((g) => g.goal).join("; "),
  ],
  [
    "Siapakah yang menulis Shiji?",
    ["Han Fei Zi", "Sima Qian", "Dong Zhongshu", "Cai Lun"],
    1,
    e.scholars[1].contribution,
  ],
  [
    "Apakah warisan sistem peperiksaan China?",
    [
      "Menggantikan perdagangan",
      "Menjadi contoh pemilihan kakitangan kerajaan",
      "Menghentikan pendidikan",
      "Menghapuskan sekolah",
    ],
    1,
    x.legacy,
  ],
  [
    "Siapakah yang menghasilkan kertas?",
    ["Kautilya", "Cai Lun", "Samudragupta", "Sima Qian"],
    1,
    `${e.paperInvention.inventor}: ${e.paperInvention.materials}`,
  ],
  [
    "Apakah bahan sukatan peperiksaan awam?",
    ["Arthasastra", "Empat Buku dan Lima Kitab", "Shiji sahaja", "Peraturan Tiang Asoka"],
    1,
    x.syllabus,
  ],
  [
    "Siapakah sarjana Konfusius terkemuka?",
    ["Cai Lun", "Dong Zhongshu", "Asoka", "Chandragupta I"],
    1,
    e.scholars[0].contribution,
  ],
];
export const sej7Quizzes: QuizQuestion[] = questions.map(
  ([question, options, answerIndex, explanation], index) => ({
    id: `sej-f1-c7-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 7",
    difficulty: "Medium",
    question,
    options,
    answerIndex,
    explanation,
  }),
);
