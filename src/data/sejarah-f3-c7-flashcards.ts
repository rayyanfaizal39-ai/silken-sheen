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

const topics: Topic[] = [{"no":"7.1","title":"Matlamat dan Bentuk Penentangan Masyarakat Tempatan","facts":["Penentangan bertujuan mempertahankan hak, kuasa, maruah, adat dan kedaulatan tempatan.","Bentuk penentangan termasuk penentangan bersenjata, mencabar perjanjian, menggunakan undang-undang dan serangan terhadap pusat pentadbiran Barat.","Tokoh tempatan menentang kerana pentadbiran Barat menggugat kuasa tradisional dan kehidupan masyarakat.","Penentangan berlaku di Naning, Sarawak, Sabah, Perak, Pahang, Kelantan dan Terengganu."],"keywords":["penentangan","kedaulatan","hak tempatan","adat","kuasa pembesar"],"tokoh":["Dol Said","Rentap","Sharif Masahor","Dato' Maharaja Lela","Yamtuan Antah","Dato' Bahaman","Mat Salleh","Tok Janggut","Haji Abdul Rahman Limbong"],"dates":["1831-1832: Perang Naning","1875: pembunuhan J.W.W. Birch","1895-1897: penentangan Mat Salleh","1915: penentangan Tok Janggut","1928: gerakan Haji Abdul Rahman Limbong"],"places":["Naning","Bukit Sadok","Pasir Salak","Pahang","Tambunan","Kelantan","Terengganu"],"treaties":["Perjanjian Pangkor 1874"],"laws":["Undang-undang Barat","peraturan cukai Barat"],"causes":["Cukai membebankan","Kuasa pembesar terhakis","Adat tempatan diganggu","Tanah dan hasil dikawal Barat"],"effects":["Kebangkitan tempatan berlaku","British menggunakan kekuatan tentera dan undang-undang","Tokoh tempatan dihukum atau dibuang negeri"],"importance":["Membuktikan masyarakat tempatan mempertahankan maruah dan kedaulatan."]},{"no":"7.2","title":"Sistem Pentadbiran Barat Memberikan Kesan Terhadap Kuasa Pemerintahan dan Kehidupan Masyarakat Tempatan","facts":["Sistem pentadbiran Barat menjejaskan kuasa sultan dan pembesar.","Residen British mentadbir hasil negeri dan nasihatnya mesti dipatuhi kecuali agama Islam dan adat Melayu.","Pungutan cukai tradisional digantikan dengan cukai Barat.","Undang-undang tradisional terjejas apabila undang-undang Barat diperkenalkan.","SBUB memperkenalkan pelbagai jenis cukai yang membebankan rakyat."],"keywords":["Sistem Residen","cukai","undang-undang Barat","kuasa pembesar","adat tempatan"],"tokoh":["J.W.W. Birch","Sultan Abdullah","Pembesar Melayu","Pegawai SBUB"],"dates":["1874: Sistem Residen bermula di Perak selepas Perjanjian Pangkor"],"places":["Perak","Naning","Sabah","Pahang","Terengganu","Kelantan"],"treaties":["Perjanjian Pangkor 1874"],"laws":["Undang-undang Barat","peraturan cukai","peraturan tanah"],"causes":["British mahu menguasai hasil negeri","Sistem pentadbiran Barat menggantikan amalan tradisional","Cukai baharu diperkenalkan"],"effects":["Pembesar kehilangan sumber pendapatan","Rakyat terbeban","Kemarahan masyarakat tempatan meningkat"],"importance":["Menjelaskan punca langsung penentangan masyarakat tempatan."]},{"no":"7.3","title":"Penentangan Masyarakat Tempatan Terhadap Kuasa Barat","facts":["Dol Said menentang British di Naning kerana isu cukai dan kedaulatan Naning.","Rentap menentang Brooke di Sarawak dan mempertahankan Bukit Sadok sehingga serangan ketiga Brooke pada tahun 1861.","Dato' Maharaja Lela dan pembesar Perak menentang J.W.W. Birch di Pasir Salak.","Dato' Bahaman menentang British di Pahang.","Mat Salleh menentang SBUB di Sabah.","Tok Janggut menentang British di Kelantan pada tahun 1915.","Haji Abdul Rahman Limbong menentang peraturan tanah British di Terengganu."],"keywords":["Dol Said","Rentap","Dato' Maharaja Lela","Dato' Bahaman","Mat Salleh","Tok Janggut","Haji Abdul Rahman Limbong"],"tokoh":["Dol Said","Rentap","Sharif Masahor","Dato' Maharaja Lela","Dato' Sagor","Sultan Abdullah","Dato' Bahaman","Mat Salleh","Tok Janggut","Haji Abdul Rahman Limbong"],"dates":["1831-1832: Perang Naning","1861: Brooke menawan Bukit Sadok","1875: J.W.W. Birch dibunuh","1915: Tok Janggut menentang British","1928: penentangan di Terengganu"],"places":["Naning","Bukit Sadok","Kuching","Pasir Salak","Belanja","Pahang","Tambunan","Kelantan","Terengganu"],"treaties":["Perjanjian Pangkor 1874"],"laws":["Peraturan tanah British","peraturan cukai SBUB"],"causes":["Cukai","hilang kuasa","campur tangan adat","peraturan tanah","penindasan pentadbiran Barat"],"effects":["British menggunakan tentera dan tipu muslihat","Tokoh tempatan dihukum","British memperkukuh kuasa selepas penentangan dipatahkan"],"importance":["Tokoh penentangan menjadi lambang keberanian mempertahankan tanah air."]},{"no":"7.4","title":"Kesan Penentangan Masyarakat Tempatan","facts":["British mengalami kerugian 100,000 Pound Sterling dalam Perang Naning.","British membelanjakan 400,000 Pound Sterling dalam Perang Perak.","British mengalami kerugian 7000 Pound Sterling dalam Perang Pahang.","British lebih berhati-hati melantik Residen yang memahami adat resam tempatan.","British menubuhkan Majlis Mesyuarat Negeri dan memantapkan skim penempatan pegawai.","Kolej Melayu Kuala Kangsar ditubuhkan pada tahun 1905.","British memberikan peluang kepada aristokrat Melayu menyertai MCS dan menubuhkan MAS."],"keywords":["kerugian perang","Majlis Mesyuarat Negeri","MCKK","MCS","MAS","pemantapan kuasa Barat"],"tokoh":["Residen British","Aristokrat Melayu","Pegawai British"],"dates":["1905: Kolej Melayu Kuala Kangsar ditubuhkan"],"places":["Naning","Perak","Pahang","Kuala Kangsar","Sarawak","Sabah"],"treaties":[],"laws":["Perintah atau Peraturan Sultan dalam Majlis Mesyuarat"],"causes":["Penentangan tempatan menyukarkan pentadbiran British","British mahu mengelakkan kebangkitan berulang"],"effects":["British lebih berhati-hati","MMN ditubuhkan","Pentadbiran pegawai disusun semula","Kuasa Barat tetap diperkukuh"],"importance":["Menunjukkan penentangan memberi kesan walaupun akhirnya British memantapkan kuasa."]}];

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

export const sejarahF3C7Flashcards: Flashcard[] = makeCards().map(([front, back], index) => ({
  id: `sej-f3-c7-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 3",
  chapter: "Chapter 7",
  front,
  back,
}));
