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

const topics: Topic[] = [{"no":"5.1","title":"Latar Belakang Pemerintahan Tempatan di Sarawak dan Sabah","facts":["Sebelum kuasa luar, masyarakat Sarawak dan Sabah mempunyai sistem pemerintahan tempatan yang berkesan.","Sarawak mempunyai kerajaan Melayu seperti Sawaku, Kalaka, Samadong dan Melano.","Sistem pemerintahan termasuk sistem kesukuan, kesultanan dan ketua bebas.","Sarawak dan Sabah mempunyai kira-kira 27 etnik dan 34 etnik menurut maklumat textbook."],"keywords":["Sarawak","Sabah","sistem kesukuan","sistem kesultanan","ketua bebas"],"tokoh":["Sultan Brunei","Sultan Sulu","Tuai Rumah","Orang Tua","Syarif Osman","Datu Kurunding"],"dates":["Abad ke-14: Kesultanan Brunei berkembang","Abad ke-15: Kesultanan Sulu berkembang"],"places":["Kuching","Sibu","Bintulu","Kudat","Sandakan","Lahad Datu","Tawau","Kota Kinabalu"],"treaties":[],"laws":["Hukum adat masyarakat tempatan"],"causes":["Kepelbagaian etnik","Kedudukan sungai dan pesisir","Pengaruh Brunei dan Sulu"],"effects":["Wujud sistem pentadbiran tempatan yang pelbagai","Masyarakat hidup stabil dan mempunyai aturan sendiri"]},{"no":"5.2","title":"Peluasan Kuasa Dinasti Brooke di Sarawak","facts":["James Brooke menggunakan peluang pergolakan di Sarawak untuk mendapatkan kuasa.","Sultan Brunei mengiktiraf James Brooke sebagai Raja Putih Sarawak.","Perjanjian 1841 menyerahkan kawasan Sarawak kepada James Brooke.","Dinasti Brooke meluaskan kuasa secara berperingkat dari Tanjung Datu hingga kawasan lain."],"keywords":["James Brooke","Raja Putih","Dinasti Brooke","Sultan Brunei","Tanjung Datu"],"tokoh":["James Brooke","Pengiran Indera Mahkota","Sultan Omar Ali Saifuddin II","Sultan Abdul Mumin","Charles Brooke"],"dates":["1841: Perjanjian Brooke dengan Brunei","1842: James Brooke diiktiraf sebagai Raja Sarawak","1890: peluasan kuasa Brooke"],"places":["Sarawak","Kuching","Tanjung Datu","Sungai Samarahan","Rajang","Limbang"],"treaties":["Perjanjian 1841","Perjanjian 1842"],"laws":[],"causes":["Pergolakan di Sarawak","Kelemahan pentadbiran Brunei","Brooke menawarkan bantuan kepada Sultan Brunei"],"effects":["Brooke memerintah Sarawak","Wilayah Sarawak diperluas","Pentadbiran Barat diperkenalkan"]},{"no":"5.3","title":"Peluasan Kuasa Syarikat Borneo Utara British di Sabah","facts":["Sabah menarik minat kuasa Barat kerana kedudukannya dan kekayaan hasil hutan serta laut.","Sultan Brunei menyerahkan Labuan kepada British.","SBUB menerima piagam diraja dan memerintah Sabah atau Borneo Utara.","SBUB perlu memelihara adat resam, agama dan undang-undang penduduk tempatan serta tidak menyerahkan Sabah kepada pihak lain tanpa kebenaran British."],"keywords":["SBUB","Borneo Utara","Labuan","piagam diraja","Sultan Brunei","Sultan Sulu"],"tokoh":["Sultan Brunei","Sultan Sulu","Alfred Dent","Baron von Overbeck"],"dates":["1846: Labuan diserahkan kepada British","1881: SBUB menerima piagam diraja","1888: Sabah menjadi negeri naungan British"],"places":["Sabah","Borneo Utara","Labuan","Sandakan","Kudat"],"treaties":["Perjanjian pajakan wilayah dengan Sultan Brunei dan Sultan Sulu","Piagam Diraja SBUB"],"laws":["Syarat piagam SBUB berkaitan adat, agama dan larangan menyerahkan Sabah"],"causes":["Kedudukan strategik Sabah","Kelemahan Brunei dan Sulu","Minat pelabur Barat terhadap hasil ekonomi"],"effects":["SBUB mentadbir Sabah","Gabenor dan pegawai British ditempatkan","Pentadbiran syarikat mengubah pemerintahan tempatan"]},{"no":"5.4","title":"Bentuk Pentadbiran Barat di Sarawak dan Sabah","facts":["Brooke membahagikan Sarawak kepada bahagian dan daerah.","SBUB membahagikan Sabah kepada residensi dan daerah.","Pentadbiran Sabah diketuai Gabenor yang bertanggungjawab kepada lembaga pengarah syarikat.","Ketua Anak Negeri dan ketua tempatan digunakan untuk melicinkan pentadbiran.","Brooke memperkenalkan undang-undang lapan perkara."],"keywords":["Gabenor","Residen","Pegawai Daerah","Ketua Anak Negeri","undang-undang lapan perkara"],"tokoh":["James Brooke","Charles Brooke","Gabenor SBUB","Residen","Pegawai Daerah"],"dates":["Abad ke-19: pentadbiran Brooke dan SBUB diperkukuh"],"places":["Sarawak","Sabah","Kuching","Sandakan"],"treaties":[],"laws":["Undang-undang lapan perkara","Undang-undang pentadbiran SBUB"],"causes":["Brooke dan SBUB mahu mengukuhkan kawalan","Wilayah semakin luas","Keperluan memungut cukai dan menjaga keselamatan"],"effects":["Pentadbiran Barat tersusun","Kuasa tempatan dikawal","Cukai dan peraturan baharu diperkenalkan"]}];

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

export const sejarahF3C5Quizzes: QuizQuestion[] = makeQuiz().map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f3-c5-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 3",
    chapter: "Chapter 5",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
