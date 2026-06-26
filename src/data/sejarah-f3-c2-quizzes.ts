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

const topics: Topic[] = [{"no":"2.1","title":"Peluasan Kuasa British di Pulau Pinang, Singapura dan Melaka","facts":["Pulau Pinang merupakan wilayah Kesultanan Kedah dan menjadi pelabuhan perdagangan serantau.","Batu Uban dibuka pada tahun 1759 oleh orang Melayu dari Sumatera.","Sultan Kedah menawarkan Pulau Pinang kepada SHTI untuk mendapatkan bantuan ketenteraan menghadapi ancaman Siam dan Burma.","Singapura penting kerana kedudukan strategik di selatan Selat Melaka.","British memperoleh Melaka melalui pertukaran wilayah dalam Perjanjian London 1824."],"keywords":["Pulau Pinang","Singapura","Melaka","SHTI","Batu Uban","petempatan strategik"],"tokoh":["Sultan Muhammad Jiwa","Sultan Abdullah","Francis Light","Stamford Raffles","Sultan Hussein","Temenggung Abdul Rahman","John Crawfurd"],"dates":["1759: Batu Uban dibuka","1786: Francis Light menduduki Pulau Pinang","1791: perjanjian mengiktiraf pendudukan British di Pulau Pinang","6 Februari 1819: perjanjian awal Singapura","2 Ogos 1824: perjanjian mengukuhkan kuasa British di Singapura"],"places":["Pulau Pinang","Batu Uban","Muka Head","Singapura","Melaka","Riau-Lingga"],"treaties":["Perjanjian 1791","Perjanjian 6 Februari 1819","Perjanjian 2 Ogos 1824"],"laws":[],"causes":["British memerlukan pelabuhan persinggahan","Kedah memerlukan bantuan ketenteraan","Singapura strategik untuk perdagangan","Melaka diperoleh melalui pertukaran wilayah"],"effects":["British bertapak di Selat Melaka","Sultan dan pembesar kehilangan kuasa ke atas wilayah tertentu","Pulau Pinang, Singapura dan Melaka menjadi asas Negeri-negeri Selat"]},{"no":"2.2","title":"Perjanjian London 1824 dan Kesannya Terhadap Alam Melayu","facts":["Perjanjian London 1824 ditandatangani oleh British dan Belanda pada 17 Mac 1824 di London.","Perjanjian ini dibuat tanpa merujuk Raja-raja Melayu.","Perjanjian membahagikan wilayah pengaruh British dan Belanda di Alam Melayu.","British memperoleh Melaka manakala Belanda memperoleh Bangkahulu.","Perjanjian ini menyebabkan perpecahan Alam Melayu kepada dua lingkungan pengaruh."],"keywords":["Perjanjian London 1824","British","Belanda","wilayah pengaruh","Alam Melayu"],"tokoh":["Sultan Hussein Muhammad Shah","Sultan Abdul Rahman","Sultan Mahmud Muzaffar Shah IV"],"dates":["17 Mac 1824: Perjanjian London ditandatangani"],"places":["London","Melaka","Bangkahulu","Singapura","Riau-Lingga","Naning"],"treaties":["Perjanjian London 1824","Perjanjian Inggeris-Belanda 1824"],"laws":[],"causes":["British dan Belanda mahu menamatkan pertikaian dan menjaga kepentingan masing-masing","Persaingan perdagangan di Alam Melayu"],"effects":["Melaka menjadi milik British","Alam Melayu terbahagi kepada pengaruh British dan Belanda","Naning dianggap British sebagai sebahagian Melaka","Kedaulatan Raja-raja Melayu diketepikan"]},{"no":"2.3","title":"Pembentukan Negeri-negeri Selat","facts":["Negeri-negeri Selat terdiri daripada Pulau Pinang, Singapura dan Melaka.","Pembentukan Negeri-negeri Selat membolehkan British menyeragamkan pentadbiran di petempatan Selat Melaka.","Negeri-negeri Selat menjadi Tanah Jajahan Mahkota British.","Pentadbiran berpusat membantu British mengawal perdagangan dan keselamatan."],"keywords":["Negeri-negeri Selat","Tanah Jajahan Mahkota","Gabenor","Residen Konsular"],"tokoh":["Gabenor Negeri-negeri Selat","Residen Konsular"],"dates":["1826: Negeri-negeri Selat dibentuk","1867: Negeri-negeri Selat menjadi Tanah Jajahan Mahkota British"],"places":["Pulau Pinang","Singapura","Melaka","Selat Melaka"],"treaties":[],"laws":["Undang-undang British di Negeri-negeri Selat"],"causes":["Keperluan pentadbiran seragam","Kepentingan perdagangan dan keselamatan","Penguasaan British di tiga petempatan strategik"],"effects":["Pengaruh British semakin kukuh","Undang-undang British dilaksanakan","Pentadbiran tempatan berubah mengikut model British"]},{"no":"2.4","title":"Pentadbiran Negeri-negeri Selat","facts":["Undang-undang British dikuatkuasakan di Negeri-negeri Selat.","Gabenor mengetuai pentadbiran Negeri-negeri Selat.","Residen Konsular dilantik untuk membantu pentadbiran di setiap negeri.","Pentadbiran Negeri-negeri Selat membolehkan British mengawal perdagangan, pelabuhan dan keselamatan."],"keywords":["Gabenor","Residen Konsular","undang-undang British","pentadbiran berpusat"],"tokoh":["Gabenor Negeri-negeri Selat","Residen Konsular"],"dates":["1867: pentadbiran Negeri-negeri Selat di bawah Pejabat Tanah Jajahan di London"],"places":["Singapura","Pulau Pinang","Melaka","London"],"treaties":[],"laws":["Undang-undang British"],"causes":["British mahu pentadbiran lebih cekap","Kepentingan perdagangan bertambah","Singapura berkembang sebagai pusat perdagangan"],"effects":["Kawalan British semakin langsung","Singapura menjadi pusat pentadbiran utama","Kedaulatan tempatan terhakis"]}];

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

export const sejarahF3C2Quizzes: QuizQuestion[] = makeQuiz().map(
  ([difficulty, question, options, answerIndex, explanation], index) => ({
    id: `sej-f3-c2-q${index + 1}`,
    subjectId: "sejarah",
    form: "Form 3",
    chapter: "Chapter 2",
    difficulty,
    question,
    options,
    answerIndex,
    explanation,
  }),
);
