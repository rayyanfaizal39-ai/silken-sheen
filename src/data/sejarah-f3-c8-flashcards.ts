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

const topics: Topic[] = [{"no":"8.1","title":"Reaksi Pemerintah Negeri-negeri Melayu Utara dan Johor Terhadap Tindakan Barat","facts":["Perjanjian Bangkok 1909 menimbulkan reaksi pemerintah negeri Melayu utara.","Perlis kehilangan wilayah Setul, Kedah kehilangan wilayah tertentu dan pemerintah membantah tindakan British-Siam.","Sultan Abdul Hamid Halim Shah menegaskan bantahan terhadap kesan Perjanjian Bangkok.","Sultan Zainal Abidin III mengecam tindakan British dan Siam.","Johor berusaha mengekalkan kedaulatan melalui diplomasi dan pemodenan."],"keywords":["reaksi pemerintah","Perjanjian Bangkok 1909","negeri Melayu utara","Johor","kedaulatan"],"tokoh":["Sultan Abdul Hamid Halim Shah","Sultan Muhammad IV","Sultan Zainal Abidin III","Sultan Abu Bakar","Sultan Ibrahim"],"dates":["1909: Perjanjian Bangkok"],"places":["Perlis","Kedah","Kelantan","Terengganu","Johor","Setul"],"treaties":["Perjanjian Bangkok 1909"],"laws":[],"causes":["Perjanjian dibuat tanpa persetujuan penuh pemerintah Melayu","Wilayah dan kedaulatan negeri terjejas","British mahu meluaskan kuasa"],"effects":["Pemerintah Melayu membantah","British tetap menempatkan penasihat","Kesedaran mempertahankan kedaulatan meningkat"],"importance":["Menunjukkan raja Melayu tidak pasif dalam menghadapi tindakan Barat."]},{"no":"8.2","title":"Tindakan Raja Melayu Menangani Cabaran Barat","facts":["Raja-raja Melayu menggunakan Durbar untuk menyuarakan bantahan terhadap pemusatan kuasa British.","Durbar Kuala Lumpur 1903 menyaksikan Sultan Idris Murshidul Adzam Shah mengkritik pemusatan kuasa Residen Jeneral.","Durbar Pekan 1932, Durbar Klang 1937 dan Durbar Seri Menanti 1939 menjadi wadah tuntutan raja-raja Melayu.","Sultan Abu Bakar mengadakan hubungan diplomatik untuk mengukuhkan kedudukan Johor.","Sultan Zainal Abidin III enggan menerima Penasihat British dan hanya menerima ejen British."],"keywords":["Durbar","diplomasi","Raja-raja Melayu","Penasihat British","ejen British"],"tokoh":["Sultan Idris Murshidul Adzam Shah","Sultan Iskandar Shah","Sultan Abu Bakar Riayatuddin Al-Muazzam Shah","Sultan Hisamuddin Alam Shah","Sultan Abu Bakar Johor","Sultan Zainal Abidin III"],"dates":["1903: Durbar Kuala Lumpur","1932: Durbar Pekan","1937: Durbar Klang","1939: Durbar Seri Menanti","24 Mei 1919: Perjanjian Terengganu-British"],"places":["Kuala Lumpur","Pekan","Klang","Seri Menanti","Johor","Terengganu"],"treaties":["Perjanjian Terengganu-British 1919"],"laws":[],"causes":["Pemusatan kuasa British","Kuasa raja dan negeri terhakis","Penasihat British semakin mengawal pentadbiran"],"effects":["Raja Melayu menyuarakan tuntutan","Durbar menjadi platform perbincangan","Kedaulatan dipertahankan melalui diplomasi"],"importance":["Membuktikan kebijaksanaan raja Melayu menggunakan saluran rasmi, diplomasi dan rundingan."]},{"no":"8.3","title":"Usaha Pembesar Melayu dalam Pemodenan Negeri","facts":["Pembesar Melayu memainkan peranan dalam pemodenan negeri melalui pentadbiran, pendidikan, ekonomi dan undang-undang.","Sultan Abu Bakar bekerjasama dengan Majlis Mesyuarat Kerajaan untuk memodenkan Johor.","Pembesar Johor membantu membangunkan sistem pentadbiran moden.","Pembesar Terengganu bekerjasama dengan Sultan Zainal Abidin III mempertahankan kedaulatan negeri."],"keywords":["pemodenan negeri","pembesar Melayu","Majlis Mesyuarat","pentadbiran moden","diplomasi"],"tokoh":["Sultan Abu Bakar","Dato' Jaafar bin Muhammad","Dato' Abdul Rahman Andak","Sultan Zainal Abidin III","Pembesar Terengganu"],"dates":["1895: Undang-Undang Tubuh Kerajaan Johor","1911: Undang-Undang Bagi Diri Kerajaan Terengganu"],"places":["Johor","Terengganu","London"],"treaties":[],"laws":["Undang-Undang Tubuh Kerajaan Johor 1895","Undang-Undang Bagi Diri Kerajaan Terengganu 1911"],"causes":["Keperluan memodenkan pentadbiran","Ancaman campur tangan British","Keinginan mempertahankan kedaulatan"],"effects":["Pentadbiran negeri lebih tersusun","British sukar menguasai negeri secara tergesa-gesa","Pembesar tempatan berperanan sebagai pentadbir moden"],"importance":["Murid melihat pembesar Melayu sebagai agen pemodenan, bukan hanya tokoh tradisional."]},{"no":"8.4","title":"Keberkesanan Peranan Pemerintah Tempatan dalam Menangani Cabaran Barat","facts":["Pemerintah tempatan berjaya melambatkan campur tangan British melalui diplomasi, undang-undang dan pemodenan.","Undang-Undang Tubuh Kerajaan Johor 1895 menetapkan sultan tidak boleh menyerahkan negeri kepada kuasa asing.","Undang-Undang Bagi Diri Kerajaan Terengganu 1911 mengandungi 53 fasal dan melarang penyerahan negeri kepada kuasa asing.","Walaupun British akhirnya meluaskan kuasa, usaha pemerintah tempatan mempertahankan identiti dan kedaulatan negeri tetap berkesan sebagai warisan politik."],"keywords":["keberkesanan","kedaulatan","undang-undang tubuh","pemodenan","diplomasi"],"tokoh":["Sultan Abu Bakar","Sultan Ibrahim","Sultan Zainal Abidin III","Sultan Muhammad II","Undang Luak Rembau"],"dates":["1895: Undang-Undang Tubuh Kerajaan Johor","1911: Undang-Undang Bagi Diri Kerajaan Terengganu","1914: Perjanjian Johor-British"],"places":["Johor","Terengganu","Perak","Selangor","Sungai Ujong","Pahang","Negeri Sembilan"],"treaties":["Perjanjian Johor-British 1914"],"laws":["Undang-Undang Tubuh Kerajaan Johor 1895","Undang-Undang Bagi Diri Kerajaan Terengganu 1911"],"causes":["Cabaran peluasan kuasa Barat","Keperluan mempertahankan negeri","Pemusatan kuasa British"],"effects":["Campur tangan British dapat dilambatkan","Identiti negeri dipertahankan","Pentadbiran moden tempatan berkembang","Warisan institusi raja terus kekal"],"importance":["Menyimpulkan kebijaksanaan pemerintah tempatan sebagai asas patriotisme dan jati diri negara."]}];

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

export const sejarahF3C8Flashcards: Flashcard[] = makeCards().map(([front, back], index) => ({
  id: `sej-f3-c8-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 3",
  chapter: "Chapter 8",
  front,
  back,
}));
