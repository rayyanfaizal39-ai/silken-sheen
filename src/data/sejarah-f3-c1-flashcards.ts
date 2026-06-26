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

const topics: Topic[] = [{"no":"1.1","title":"Kestabilan dan Kemakmuran Negara Kita","facts":["Negara kita mempunyai sistem pemerintahan beraja dan pentadbiran mantap sebelum kedatangan Barat.","Pentadbiran negeri diketuai raja atau sultan, dibantu pembesar jajahan atau daerah dan penghulu atau penggawa pada peringkat kampung.","Perundangan terdiri daripada undang-undang tidak bertulis seperti adat dan undang-undang bertulis seperti Hukum Kanun Melaka, Hukum Kanun Pahang dan Undang-Undang 99 Perak.","Kemakmuran disokong hasil bumi, hasil alam, perdagangan, pelabuhan, sistem mata wang, percukaian, timbang sukat dan kegiatan intelektual."],"keywords":["kestabilan","kemakmuran","sistem beraja","perundangan","hubungan luar","ekonomi tradisional"],"tokoh":["Raja atau Sultan","Pembesar","Penghulu","Penggawa","Ibu Soko"],"dates":["1759: Batu Uban dibuka oleh orang Melayu dari Sumatera"],"places":["Negeri-negeri Melayu","Sarawak","Sabah","Pelabuhan Johor","Kedah","Klang","Melaka","Batu Uban"],"treaties":[],"laws":["Adat Perpatih","Hukum Kanun Melaka","Hukum Kanun Pahang","Undang-Undang 99 Perak"],"causes":["Kebijaksanaan pemerintah","Muafakat pemerintah dan rakyat","Kedudukan pelabuhan strategik","Kekayaan hasil bumi dan hasil alam"],"effects":["Pentadbiran stabil","Hubungan luar berkembang","Ekonomi makmur","Bahasa Melayu dan tulisan Jawi berkembang"],"importance":["Membuktikan negara kita sudah mempunyai tamadun, pentadbiran dan ekonomi tersusun sebelum campur tangan Barat."]},{"no":"1.2","title":"Faktor Kedatangan Kuasa Barat ke Negara Kita","facts":["Pada tahun 1600, Syarikat Hindia Timur Inggeris ditubuhkan di England.","Pada tahun 1602, Syarikat Hindia Timur Belanda ditubuhkan.","Pada tahun 1664, Perancis menubuhkan Syarikat Hindia Timur Perancis.","Kedatangan Barat dipengaruhi keperluan barangan mewah, pusat pengumpulan barang, pelabuhan persinggahan, penyebaran agama Kristian, Revolusi Perindustrian, perkembangan industri kereta, kesuburan tanah, industri mengetin, Terusan Suez, kapal wap, persaingan kuasa Barat dan telegraf."],"keywords":["rempah-ratus","SHTI","VOC","Revolusi Perindustrian","Terusan Suez","kapal wap","telegraf"],"tokoh":["Ferdinand de Lesseps"],"dates":["1600: SHTI ditubuhkan","1602: Syarikat Hindia Timur Belanda ditubuhkan","1664: Syarikat Hindia Timur Perancis ditubuhkan","1859: Terusan Suez mula dibangunkan","1870-an: Jerman dan Perancis menjadi negara perindustrian"],"places":["Kepulauan Melayu","China","India","Canton","Pelabuhan Said","Suez","Tanjung Harapan"],"treaties":[],"laws":[],"causes":["Permintaan rempah, emas, perak, sutera dan tembikar","Keperluan bahan mentah dan pasaran","Perkembangan pengangkutan dan komunikasi","Persaingan mendapatkan tanah jajahan"],"effects":["Alam Melayu menjadi sasaran kuasa Barat","Perdagangan bertambah","Tanah jajahan dicari untuk bahan mentah dan pasaran"],"importance":["Menjelaskan sebab kuasa Barat sanggup datang jauh dan bersaing untuk menguasai Alam Melayu."]},{"no":"1.3","title":"Persaingan Kuasa Barat untuk Mendapatkan Tanah Jajahan","facts":["Kuasa Barat bersaing untuk mendapatkan tanah jajahan bagi bahan mentah, pasaran dan kedudukan strategik.","British, Belanda, Perancis, Sepanyol, Jerman dan Amerika Syarikat terlibat dalam persaingan imperialisme.","Kawasan di Alam Melayu penting kerana kedudukan strategik dan kekayaan hasil bumi.","Kuasa Barat menganggap keluasan tanah jajahan melambangkan kekuatan dan sanjungan."],"keywords":["imperialisme","tanah jajahan","persaingan kuasa Barat","bahan mentah","pasaran"],"tokoh":["Sultan Brunei","Sultan Sulu"],"dates":["1843: serangan penduduk tempatan ke atas kapal British di Sabah"],"places":["Alam Melayu","Sabah","Sarawak","Kepulauan Melayu","Filipina"],"treaties":[],"laws":[],"causes":["Keperluan bahan mentah","Kepentingan laluan perdagangan","Persaingan kuasa imperialis","Prestij tanah jajahan"],"effects":["Peluasan kuasa Barat semakin agresif","Negeri tempatan berhadapan ancaman kedaulatan","Kuasa Barat mula menggunakan pelbagai strategi"],"importance":["Murid perlu memahami persaingan kuasa Barat sebagai faktor luaran yang menggugat kedaulatan negara."]},{"no":"1.4","title":"Perbezaan Strategi Kuasa Barat untuk Menguasai Negara Kita","facts":["Kuasa Barat menggunakan strategi perjanjian, pakatan, manipulasi, ugutan, serangan fizikal dan pajakan.","British menggunakan perjanjian untuk mendapatkan Pulau Pinang, Singapura dan Melaka.","Belanda dan British memeterai Perjanjian London 1824 untuk menyelesaikan pertikaian di Alam Melayu.","Strategi pajakan dan perjanjian turut digunakan di Sabah dan Sarawak."],"keywords":["perjanjian","pakatan","manipulasi","ugutan","serangan fizikal","pajakan"],"tokoh":["Francis Light","Stamford Raffles","John Crawfurd","James Brooke"],"dates":["1786: British menduduki Pulau Pinang","1819: perjanjian awal Singapura","1824: Perjanjian London","1824: Perjanjian British di Singapura"],"places":["Pulau Pinang","Singapura","Melaka","Naning","Sarawak","Sabah"],"treaties":["Perjanjian London 1824","Perjanjian 6 Februari 1819","Perjanjian 2 Ogos 1824"],"laws":[],"causes":["British mahukan petempatan strategik","Belanda mahu melindungi kepentingan di Alam Melayu","Pemerintah tempatan menghadapi tekanan politik dan keselamatan"],"effects":["Kedaulatan tempatan terjejas","British menguasai petempatan strategik","Naning dianggap sebahagian Melaka oleh British selepas Perjanjian London"],"importance":["Menunjukkan perlunya berwaspada terhadap anasir luar dan strategi kuasa asing."]}];

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

export const sejarahF3C1Flashcards: Flashcard[] = makeCards().map(([front, back], index) => ({
  id: `sej-f3-c1-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 3",
  chapter: "Chapter 1",
  front,
  back,
}));
