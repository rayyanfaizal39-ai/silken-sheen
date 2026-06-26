import type { Difficulty, QuizQuestion } from "./types";

type Topic = {
  no: string;
  title: string;
  facts: string[];
  keywords: string[];
  tokoh: string[];
  dates: string[];
  places: string[];
  treaties: string[];
  laws: string[];
  causes: string[];
  effects: string[];
};

type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = [{"no":"3.1","title":"Kekayaan Hasil Bumi di Perak, Selangor, Negeri Sembilan dan Pahang","facts":["Perak, Selangor, Negeri Sembilan dan Pahang kaya dengan bijih timah, emas dan hasil bumi.","Kekayaan hasil bumi menarik minat British untuk campur tangan.","Pembesar dan sultan memperoleh pendapatan daripada hasil perlombongan dan cukai.","Perkembangan perlombongan menyebabkan kemasukan modal dan buruh luar."],"keywords":["bijih timah","emas","hasil bumi","perlombongan","cukai"],"tokoh":["Sultan Muzaffar Shah","Sultan Abdul Samad","Sultan Ahmad","Ngah Ibrahim"],"dates":["1857-1898: pemerintahan Sultan Abdul Samad di Selangor","1885: Sultan Ahmad di Pahang dirakam dalam sumber textbook"],"places":["Larut","Kinta","Kuala Lumpur","Lukut","Sungai Ujong","Pahang"],"treaties":[],"laws":[],"causes":["Permintaan bijih timah meningkat","Kekayaan lombong","Kepentingan cukai dan perdagangan"],"effects":["British memberi perhatian kepada negeri Melayu","Persaingan pembesar dan pelombong meningkat","Campur tangan British menjadi lebih mudah"]},{"no":"3.2","title":"Peluasan Kuasa British di Perak, Selangor, Negeri Sembilan dan Pahang","facts":["British menggunakan alasan kekacauan untuk campur tangan.","Perjanjian Pangkor 1874 menandakan penguasaan British secara langsung di Perak.","Raja Abdullah diiktiraf sebagai Sultan Perak dan Sultan menerima Residen British.","Perjanjian British-Selangor 1875, British-Sungai Ujong, British-Pahang 1887 dan British-Negeri Sembilan 1895 mengukuhkan Sistem Residen."],"keywords":["Sistem Residen","Perjanjian Pangkor","campur tangan","Residen British"],"tokoh":["Andrew Clarke","Raja Abdullah","Raja Ismail","Ngah Ibrahim","Dato' Sagor","J.W.W. Birch","J.G. Davidson","Martin Lister","J.P. Rodger"],"dates":["1874: Perjanjian Pangkor","1875: Perjanjian British-Selangor","1887: Perjanjian British-Pahang","1895: Perjanjian British-Negeri Sembilan"],"places":["Pulau Pangkor","Perak","Selangor","Sungai Ujong","Pahang","HMS Pluto"],"treaties":["Perjanjian Pangkor 1874","Perjanjian British-Sungai Ujong","Perjanjian British-Selangor 1875","Perjanjian British-Pahang 1887","Perjanjian British-Negeri Sembilan 1895"],"laws":[],"causes":["Pergaduhan kongsi gelap","Perebutan takhta","Kepentingan bijih timah","British mahu mengawal cukai"],"effects":["Residen British ditempatkan","Sultan dan pembesar kehilangan kuasa pentadbiran","British menguasai pungutan cukai"]},{"no":"3.3","title":"Pembentukan Negeri-negeri Melayu Bersekutu","facts":["Negeri-negeri Melayu Bersekutu terdiri daripada Perak, Selangor, Negeri Sembilan dan Pahang.","Perjanjian Persekutuan 1895 membawa kepada pembentukan NNMB.","Residen Jeneral menjadi ketua pentadbiran kerajaan persekutuan.","Pembentukan NNMB bertujuan menyeragamkan pentadbiran dan mengatasi kelemahan Sistem Residen."],"keywords":["NNMB","Perjanjian Persekutuan 1895","Residen Jeneral","pemusatan kuasa"],"tokoh":["Frank Swettenham","Raja-raja Melayu","Residen Jeneral"],"dates":["1895: Perjanjian Persekutuan","1896: NNMB dilaksanakan"],"places":["Perak","Selangor","Negeri Sembilan","Pahang","Kuala Lumpur"],"treaties":["Perjanjian Persekutuan 1895"],"laws":[],"causes":["Sistem Residen tidak seragam","British mahu kawalan kewangan dan pentadbiran lebih berpusat","Keperluan menyelaraskan pembangunan"],"effects":["Kuasa Residen Jeneral meningkat","Raja-raja Melayu kehilangan lebih banyak kuasa","Pentadbiran menjadi lebih berpusat"]},{"no":"3.4","title":"Pentadbiran Negeri-negeri Melayu Bersekutu","facts":["Pentadbiran NNMB melibatkan Residen Jeneral, Residen negeri, Majlis Mesyuarat Negeri, Durbar dan Majlis Mesyuarat Persekutuan.","Durbar pertama diadakan di Kuala Kangsar.","Pada tahun 1909, Majlis Mesyuarat Persekutuan ditubuhkan.","Majlis Mesyuarat Persekutuan memberikan ruang kepada British mengawal undang-undang dan kewangan negeri."],"keywords":["Residen Jeneral","Durbar","Majlis Mesyuarat Negeri","Majlis Mesyuarat Persekutuan"],"tokoh":["Pesuruhjaya Tinggi British","Raja-raja Melayu","Residen Jeneral","Residen British"],"dates":["1897: Durbar pertama di Kuala Kangsar","1909: Majlis Mesyuarat Persekutuan ditubuhkan"],"places":["Kuala Kangsar","Kuala Lumpur","Pekan","Klang","Seri Menanti"],"treaties":[],"laws":["Undang-undang yang diluluskan Majlis Mesyuarat Persekutuan"],"causes":["British mahu sokongan Raja-raja Melayu","Pemusatan pentadbiran memerlukan badan perundangan","Keperluan mengawal kewangan"],"effects":["Kewibawaan Raja-raja Melayu terjejas","British mengawal undang-undang dan kewangan","Durbar menjadi ruang pertemuan Raja-raja Melayu"]}];

function topic(index: number) {
  return topics[index % topics.length];
}

function makeQuiz(): QuizSeed[] {
  const items: QuizSeed[] = [];
  for (let i = 0; i < 10; i++) {
    const t = topic(i);
    items.push([
      "Easy",
      `Apakah fakta utama bagi ${t.no} ${t.title}? (Set ${i + 1})`,
      [t.facts[0], t.effects[0], t.causes[0], t.keywords[0]],
      0,
      `Fakta utama subtopik ini ialah: ${t.facts[0]}`,
    ]);
  }
  for (let i = 0; i < 10; i++) {
    const t = topic(i + 1);
    const correct = t.treaties[0] || t.laws[0] || t.dates[0] || t.places[0];
    items.push([
      "Medium",
      `Maklumat manakah paling berkaitan dengan ${t.no} ${t.title}? (Set ${i + 1})`,
      [correct, t.effects[0], t.causes[0], t.keywords[t.keywords.length - 1]],
      0,
      `Maklumat ini penting kerana berkait langsung dengan ${t.title}.`,
    ]);
  }
  for (let i = 0; i < 10; i++) {
    const t = topic(i + 2);
    items.push([
      "Hard",
      `Apakah hubungan sebab dan kesan yang tepat bagi ${t.no} ${t.title}? (Set ${i + 1})`,
      [
        `${t.causes[0]} -> ${t.effects[0]}`,
        `${t.effects[0]} -> ${t.causes[0]}`,
        `${t.keywords[0]} -> tiada perubahan pentadbiran`,
        `${t.places[0]} -> semua kuasa Barat berundur serta-merta`,
      ],
      0,
      `Jawapan tepat menghubungkan sebab textbook dengan kesannya: ${t.causes[0]} menyebabkan ${t.effects[0].toLowerCase()}.`,
    ]);
  }
  return items;
}

export const sejarahF3C3Quizzes: QuizQuestion[] = makeQuiz().map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f3-c3-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 3",
    chapter: "Chapter 3",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
