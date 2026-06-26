import type { Flashcard } from "./types";

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
  importance: string[];
};

const topics: Topic[] = [{"no":"2.1","title":"Peluasan Kuasa British di Pulau Pinang, Singapura dan Melaka","facts":["Pulau Pinang merupakan wilayah Kesultanan Kedah dan menjadi pelabuhan perdagangan serantau.","Batu Uban dibuka pada tahun 1759 oleh orang Melayu dari Sumatera.","Sultan Kedah menawarkan Pulau Pinang kepada SHTI untuk mendapatkan bantuan ketenteraan menghadapi ancaman Siam dan Burma.","Singapura penting kerana kedudukan strategik di selatan Selat Melaka.","British memperoleh Melaka melalui pertukaran wilayah dalam Perjanjian London 1824."],"keywords":["Pulau Pinang","Singapura","Melaka","SHTI","Batu Uban","petempatan strategik"],"tokoh":["Sultan Muhammad Jiwa","Sultan Abdullah","Francis Light","Stamford Raffles","Sultan Hussein","Temenggung Abdul Rahman","John Crawfurd"],"dates":["1759: Batu Uban dibuka","1786: Francis Light menduduki Pulau Pinang","1791: perjanjian mengiktiraf pendudukan British di Pulau Pinang","6 Februari 1819: perjanjian awal Singapura","2 Ogos 1824: perjanjian mengukuhkan kuasa British di Singapura"],"places":["Pulau Pinang","Batu Uban","Muka Head","Singapura","Melaka","Riau-Lingga"],"treaties":["Perjanjian 1791","Perjanjian 6 Februari 1819","Perjanjian 2 Ogos 1824"],"laws":[],"causes":["British memerlukan pelabuhan persinggahan","Kedah memerlukan bantuan ketenteraan","Singapura strategik untuk perdagangan","Melaka diperoleh melalui pertukaran wilayah"],"effects":["British bertapak di Selat Melaka","Sultan dan pembesar kehilangan kuasa ke atas wilayah tertentu","Pulau Pinang, Singapura dan Melaka menjadi asas Negeri-negeri Selat"],"importance":["Menerangkan proses awal peluasan British melalui perjanjian dan strategi diplomatik."]},{"no":"2.2","title":"Perjanjian London 1824 dan Kesannya Terhadap Alam Melayu","facts":["Perjanjian London 1824 ditandatangani oleh British dan Belanda pada 17 Mac 1824 di London.","Perjanjian ini dibuat tanpa merujuk Raja-raja Melayu.","Perjanjian membahagikan wilayah pengaruh British dan Belanda di Alam Melayu.","British memperoleh Melaka manakala Belanda memperoleh Bangkahulu.","Perjanjian ini menyebabkan perpecahan Alam Melayu kepada dua lingkungan pengaruh."],"keywords":["Perjanjian London 1824","British","Belanda","wilayah pengaruh","Alam Melayu"],"tokoh":["Sultan Hussein Muhammad Shah","Sultan Abdul Rahman","Sultan Mahmud Muzaffar Shah IV"],"dates":["17 Mac 1824: Perjanjian London ditandatangani"],"places":["London","Melaka","Bangkahulu","Singapura","Riau-Lingga","Naning"],"treaties":["Perjanjian London 1824","Perjanjian Inggeris-Belanda 1824"],"laws":[],"causes":["British dan Belanda mahu menamatkan pertikaian dan menjaga kepentingan masing-masing","Persaingan perdagangan di Alam Melayu"],"effects":["Melaka menjadi milik British","Alam Melayu terbahagi kepada pengaruh British dan Belanda","Naning dianggap British sebagai sebahagian Melaka","Kedaulatan Raja-raja Melayu diketepikan"],"importance":["Perjanjian ini ialah titik penting perubahan geopolitik Alam Melayu."]},{"no":"2.3","title":"Pembentukan Negeri-negeri Selat","facts":["Negeri-negeri Selat terdiri daripada Pulau Pinang, Singapura dan Melaka.","Pembentukan Negeri-negeri Selat membolehkan British menyeragamkan pentadbiran di petempatan Selat Melaka.","Negeri-negeri Selat menjadi Tanah Jajahan Mahkota British.","Pentadbiran berpusat membantu British mengawal perdagangan dan keselamatan."],"keywords":["Negeri-negeri Selat","Tanah Jajahan Mahkota","Gabenor","Residen Konsular"],"tokoh":["Gabenor Negeri-negeri Selat","Residen Konsular"],"dates":["1826: Negeri-negeri Selat dibentuk","1867: Negeri-negeri Selat menjadi Tanah Jajahan Mahkota British"],"places":["Pulau Pinang","Singapura","Melaka","Selat Melaka"],"treaties":[],"laws":["Undang-undang British di Negeri-negeri Selat"],"causes":["Keperluan pentadbiran seragam","Kepentingan perdagangan dan keselamatan","Penguasaan British di tiga petempatan strategik"],"effects":["Pengaruh British semakin kukuh","Undang-undang British dilaksanakan","Pentadbiran tempatan berubah mengikut model British"],"importance":["Menjadi tapak kuasa British untuk meluaskan pengaruh ke negeri Melayu lain."]},{"no":"2.4","title":"Pentadbiran Negeri-negeri Selat","facts":["Undang-undang British dikuatkuasakan di Negeri-negeri Selat.","Gabenor mengetuai pentadbiran Negeri-negeri Selat.","Residen Konsular dilantik untuk membantu pentadbiran di setiap negeri.","Pentadbiran Negeri-negeri Selat membolehkan British mengawal perdagangan, pelabuhan dan keselamatan."],"keywords":["Gabenor","Residen Konsular","undang-undang British","pentadbiran berpusat"],"tokoh":["Gabenor Negeri-negeri Selat","Residen Konsular"],"dates":["1867: pentadbiran Negeri-negeri Selat di bawah Pejabat Tanah Jajahan di London"],"places":["Singapura","Pulau Pinang","Melaka","London"],"treaties":[],"laws":["Undang-undang British"],"causes":["British mahu pentadbiran lebih cekap","Kepentingan perdagangan bertambah","Singapura berkembang sebagai pusat perdagangan"],"effects":["Kawalan British semakin langsung","Singapura menjadi pusat pentadbiran utama","Kedaulatan tempatan terhakis"],"importance":["Memperlihatkan perubahan daripada petempatan perdagangan kepada pentadbiran kolonial rasmi."]}];

function topic(index: number) {
  return topics[index % topics.length];
}

function makeCards(): Array<[string, string]> {
  const cards: Array<[string, string]> = [];
  for (let i = 0; i < 20; i++) {
    const t = topic(i);
    cards.push([`Fakta ${t.no}: ${t.title} (${i + 1})`, t.facts[i % t.facts.length]]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 1);
    const detail = t.dates[i % Math.max(t.dates.length, 1)] || t.places[i % t.places.length];
    cards.push([`Tokoh/Tarikh ${t.no}: ${t.title} (${i + 1})`, `${(t.tokoh[i % Math.max(t.tokoh.length, 1)] || "Kata kunci")}: ${detail}`]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 2);
    const treaty = t.treaties[0] || t.laws[0] || t.keywords[0];
    cards.push([`Sebab/Kesan ${t.no}: ${t.title} (${i + 1})`, `${t.causes[i % t.causes.length]} -> ${t.effects[i % t.effects.length]}. Kata kunci: ${treaty}.`]);
  }
  return cards;
}

export const sejarahF3C2Flashcards: Flashcard[] = makeCards().map(([front, back], index) => ({
  id: `sej-f3-c2-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 3",
  chapter: "Chapter 2",
  front,
  back,
}));
