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

// Option order is the stored order (the quiz shuffles options at runtime and remaps the answer);
// explanations come from the audited notes. Each entry: question, options, answerIndex, explanation.
const questions: [string, string[], number, string][] = [
  // q1
  [
    "Apakah maksud Janapada dalam Tamadun India?",
    ["Kerajaan kecil", "Kerajaan besar", "Empayar", "Dinasti"],
    0,
    recall[0][1],
  ],
  // q2
  [
    "Mengapakah kedudukan Magadha strategik?",
    [
      "Penguasaan pelabuhan di pantai barat",
      "Kawalan laluan perdagangan Sungai Ganges",
      "Perlindungan benteng pergunungan tinggi",
      "Kedudukan berhampiran Lembah Indus",
    ],
    1,
    recall[3][1],
  ],
  // q3
  [
    "Seorang raja mempunyai tentera yang kuat tetapi perbendaharaan kerajaan tidak mencukupi untuk membiayai projek perluasan. Faktor perluasan kuasa manakah yang lemah?",
    ["Kekuatan ketenteraan", "Dasar pemerintahan", "Kewangan", "Diplomasi keagamaan"],
    2,
    `${c.powerExpansion.factors[4].factor}: ${c.powerExpansion.factors[4].description}.`,
  ],
  // q4
  [
    "Siapakah penulis Arthasastra?",
    ["Asoka", "Kautilya", "Chandragupta Maurya", "Samudragupta"],
    1,
    recall[6][1],
  ],
  // q5
  [
    "Berapakah bilangan infantri dalam tentera Chandragupta Maurya?",
    ["9,000", "30,000", "200,000", "600,000"],
    3,
    c.indianDynasties[1].militaryStrength!.join(", "),
  ],
  // q6
  [
    "Apakah pusat pemerintahan Dinasti Nanda, Maurya dan Gupta?",
    ["Pataliputra", "Hindu Kush", "Punjab", "Bengal"],
    0,
    `${c.indianDynasties[0].facts[1]}.`,
  ],
  // q7 (cause)
  [
    "Peristiwa manakah menyebabkan Asoka mengubah dasar pemerintahannya?",
    ["Pembinaan Tiang Asoka", "Kejatuhan Dinasti Nanda", "Perang Kalinga", "Penaklukan Punjab"],
    2,
    c.asokaTransformation.afterKalinga,
  ],
  // q8 (Kalinga figures stay distinct)
  [
    "Apakah akibat Perang Kalinga menurut buku teks?",
    [
      "150,000 orang terbunuh; 100,000 orang kehilangan harta benda",
      "100,000 orang terbunuh dan 100,000 orang kehilangan harta benda",
      "150,000 orang kehilangan harta benda; 100,000 orang terbunuh",
      "250,000 orang terbunuh serta kehilangan harta benda",
    ],
    2,
    `${c.asokaTransformation.kalingaWar}.`,
  ],
  // q9
  [
    "Mengapakah zaman Gupta dikenali sebagai zaman keemasan agama Hindu?",
    [
      "Agama Hindu disebarkan melalui misi ke luar negara",
      "Agama Hindu ditekankan dalam kebudayaan dan pemerintahan",
      "Agama Hindu menggantikan perluasan fizikal pemerintah",
      "Agama Hindu menjadi sumber kewangan perbendaharaan",
    ],
    1,
    c.guptaGoldenAge.religionFocus,
  ],
  // q10
  [
    "Apakah yang diukir pada tiang batu yang diletakkan Asoka di kawasan strategik?",
    [
      "Senarai tentera Dinasti Maurya",
      "Peraturan dan undang-undang Asoka",
      "Catatan perdagangan Sungai Ganges",
      "Rekod hasil kewangan kerajaan",
    ],
    1,
    `${c.asokaTransformation.asokaPillar}.`,
  ],
  // q11
  [
    "Apakah dua bentuk perluasan kuasa dalam Tamadun India?",
    [
      "Ketenteraan dan kewangan",
      "Politik dan ekonomi",
      "Fizikal dan keagamaan",
      "Pendidikan dan perdagangan",
    ],
    2,
    c.powerExpansion.forms.map((f) => `${f.type}: ${f.description}.`).join(" "),
  ],
  // q12
  [
    "Senarai ini merujuk kepada sumbangan siapa: menyatukan China, menyeragamkan unit timbang dan sukat, menyeragamkan sistem tulisan?",
    ["Cai Lun", "Han Fei Zi", "Konfusius", "Shi Huangdi"],
    3,
    c.chineseDynasties[0].facts.join(". "),
  ],
  // q13
  [
    "Sebuah sekolah tinggi di Chang’an menekankan ajaran Konfusius untuk melatih bakal pegawai. Perkembangan pendidikan dinasti manakah ditunjukkan?",
    ["Dinasti Han", "Dinasti Shang", "Dinasti Qin", "Dinasti Zhou"],
    0,
    e.hanEducation,
  ],
  // q14
  [
    "Pendidikan Rendah di China menekankan apakah?",
    [
      "Menulis karangan dan sajak",
      "Mempelajari etika dan adat istiadat",
      "Menghafal tulisan serta buku suci",
      "Menterjemah dan mentafsir buku suci",
    ],
    2,
    `${e.levels[0].level}: ${e.levels[0].focus}.`,
  ],
  // q15
  [
    "Apakah kandungan yang menjadi sukatan peperiksaan perkhidmatan awam China?",
    [
      "Lun Yu dan Shiji",
      "Arthasastra dan Lun Yu",
      "Shiji dan Empat Buku",
      "Empat Buku dan Lima Kitab",
    ],
    3,
    x.syllabus,
  ],
  // q16
  [
    "Pada zaman pemerintah manakah sistem peperiksaan awal diperkenalkan menurut buku teks?",
    [
      "Maharaja Wu, Dinasti Han",
      "Maharaja Gaozu, Dinasti Han",
      "Maharaja Shi Huangdi, Dinasti Qin",
      "Konfusius, Dinasti Zhou",
    ],
    0,
    `Menurut buku teks, sistem peperiksaan awam diperkenalkan pada ${x.introduced}.`,
  ],
  // q17
  [
    "Siapakah yang dibenarkan menduduki peperiksaan perkhidmatan awam China?",
    [
      "Lelaki daripada keluarga bangsawan sahaja",
      "Lelaki tanpa mengira latar belakang sosial",
      "Lelaki dan wanita daripada keluarga pegawai",
      "Lelaki yang sudah menjadi pegawai kerajaan",
    ],
    1,
    x.characteristics[1],
  ],
  // q18
  [
    "Bagaimanakah penipuan dalam peperiksaan dicegah menurut buku teks?",
    [
      "Calon diawasi oleh penduduk kampung sepanjang tahun",
      "Calon diwajibkan menyerahkan jaminan wang",
      "Calon dipilih oleh pegawai daerah sebelum peperiksaan",
      "Calon dikurung sebelum peperiksaan berlangsung",
    ],
    3,
    x.controls[1],
  ],
  // q19
  [
    "Apakah susunan tiga tahap peperiksaan perkhidmatan awam bermula daripada tahap pertama?",
    [
      "Juren, Xiucai, Jinshi",
      "Xiucai, Juren, Jinshi",
      "Jinshi, Juren, Xiucai",
      "Xiucai, Jinshi, Juren",
    ],
    1,
    stages
      .map((s) => `${s.name}: ${s.level.toLowerCase()}, ${s.location.toLowerCase()}`)
      .join("; ") + ".",
  ],
  // q20
  [
    "Seorang calon lulus peperiksaan tahap pertama di peringkat daerah dan mahu menduduki peperiksaan seterusnya di ibu kota daerah. Peperiksaan manakah yang akan disertainya?",
    ["Xiucai", "Juren", "Jinshi", "Ujian peringkat kampung"],
    1,
    `${stages[1].name}: ${stages[1].location}. ${stages[1].eligibility}`,
  ],
  // q21
  [
    "Calon yang berjaya dalam peperiksaan Jinshi memperoleh ganjaran yang manakah?",
    [
      "Butang keemasan dilekatkan pada topi",
      "Jawatan kakitangan kerajaan peringkat rendah",
      "Tanda nama diletakkan di pintu masuk rumah",
      "Kedudukan dan pangkat tinggi dalam kerajaan",
    ],
    3,
    stages[2].rewards.join(" "),
  ],
  // q22
  [
    "Berapa lama peperiksaan Jinshi diadakan?",
    ["Sehari", "Tiga hari", "13 hari", "Tujuh hari"],
    2,
    `${stages[2].name}: ${stages[2].location}; ${stages[2].frequency.toLowerCase()}; ${stages[2].duration}.`,
  ],
  // q23 (policy change shown by a situation)
  [
    "Selepas perang yang memusnahkan, seorang pemerintah menghentikan penaklukan wilayah dan menghantar misi agama ke luar negara. Dasar manakah ditunjukkan?",
    [
      "Perluasan fizikal oleh Dinasti Nanda",
      "Perluasan fizikal oleh Chandragupta Maurya",
      "Zaman keemasan Hindu oleh Gupta",
      "Perluasan keagamaan oleh Asoka",
    ],
    3,
    c.asokaTransformation.afterKalinga,
  ],
  // q24
  [
    "Empayar sebuah dinasti menganjur dari Bengal hingga Punjab serta Deccan, dengan Pataliputra sebagai pusat pemerintahan. Dinasti manakah ditunjukkan?",
    ["Dinasti Nanda", "Dinasti Maurya", "Dinasti Gupta", "Kerajaan Magadha"],
    0,
    `${c.indianDynasties[0].facts.join(". ")}.`,
  ],
  // q25
  [
    "Sebuah sekolah di China mengajar murid bersikap jujur dan menghormati orang tua. Matlamat pendidikan manakah ditunjukkan?",
    [
      "Meningkatkan hasil pertanian negara",
      "Memupuk nilai moral dan etika",
      "Melatih pasukan tentera diraja",
      "Meluaskan perdagangan jarak jauh",
    ],
    1,
    e.goals.map((g) => g.goal).join("; ") + ".",
  ],
  // q26
  [
    "Siapakah yang menulis Shiji?",
    ["Han Fei Zi", "Sima Qian", "Dong Zhongshu", "Cai Lun"],
    1,
    e.scholars[1].contribution,
  ],
  // q27
  [
    "Sebuah kerajaan memilih pegawai berdasarkan pencapaian akademik. Sistem pendidikan China manakah yang dicontohi?",
    [
      "Penyeragaman sistem tulisan",
      "Peperiksaan perkhidmatan awam",
      "Sekolah peringkat daerah",
      "Hafalan buku suci peringkat rendah",
    ],
    1,
    x.legacy,
  ],
  // q28
  [
    "Apakah kesan penggunaan kertas secara meluas terhadap pendidikan di China?",
    [
      "Sekolah daerah dan wilayah ditutup",
      "Sistem peperiksaan awam dimansuhkan",
      "Pendidikan di sekolah bertambah baik",
      "Pembelajaran bertukar kepada hafalan",
    ],
    2,
    `${e.paperInvention.inventor} menghasilkan kertas daripada ${e.paperInvention.materials.toLowerCase().replace("campuran ", "")}. ${e.paperInvention.benefit}`,
  ],
  // q29
  [
    "Apakah maksud perluasan kuasa?",
    [
      "Usaha raja menguasai kawasan dan mengatasi pihak lain",
      "Usaha raja membina bandar dan tempat ibadat baharu",
      "Usaha raja mengumpul hasil cukai daripada rakyat",
      "Usaha raja memajukan pendidikan dan perdagangan",
    ],
    0,
    c.powerExpansion.definition,
  ],
  // q30
  [
    "Padanan sarjana dengan sumbangannya manakah yang betul?",
    [
      "Sima Qian – sarjana Konfusius terkemuka",
      "Dong Zhongshu – sejarawan China pertama",
      "Han Fei Zi – penulis Shiji",
      "Dong Zhongshu – sarjana Konfusius terkemuka",
    ],
    3,
    e.scholars.map((s) => `${s.name}: ${s.contribution}`).join(" "),
  ],
];

// Difficulty follows the cognitive demand of each question and totals 8 Easy / 15 Medium / 7 Hard,
// the split the quiz catalog (and its server-side XP caps) expects for this chapter.
const difficulties = [
  "Easy",
  "Medium",
  "Hard",
  "Easy",
  "Medium",
  "Easy",
  "Medium",
  "Medium",
  "Hard",
  "Easy",
  "Easy",
  "Medium",
  "Medium",
  "Easy",
  "Medium",
  "Medium",
  "Easy",
  "Medium",
  "Medium",
  "Medium",
  "Hard",
  "Medium",
  "Hard",
  "Hard",
  "Medium",
  "Easy",
  "Hard",
  "Medium",
  "Medium",
  "Hard",
] as const;

export const sej7Quizzes: QuizQuestion[] = questions.map(
  ([question, options, answerIndex, explanation], index) => ({
    id: `sej-f1-c7-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 7",
    difficulty: difficulties[index],
    question,
    options,
    answerIndex,
    explanation,
  }),
);
