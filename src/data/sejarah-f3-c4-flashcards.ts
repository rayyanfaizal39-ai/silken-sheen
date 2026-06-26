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

const topics: Topic[] = [{"no":"4.1","title":"Pemerintahan Kesultanan Melayu di Perlis, Kedah, Kelantan, Terengganu dan Johor","facts":["Perlis, Kedah, Kelantan, Terengganu dan Johor mempunyai sistem pemerintahan beraja.","Sultan atau Raja berada di puncak kuasa dan dibantu pembesar.","Johor melakukan pemodenan pentadbiran lebih awal melalui kerjasama sultan dan pembesar.","Terengganu dan Johor menggubal undang-undang tubuh untuk mempertahankan kedaulatan."],"keywords":["NNMTB","sistem beraja","Sultan","Raja","pembesar"],"tokoh":["Sultan Mudzaffar Shah","Sultan Muhammad I","Sultan Muhammad II","Sultan Omar","Sultan Abu Bakar"],"dates":["1839-1876: pemerintahan Sultan Omar Terengganu"],"places":["Perlis","Kedah","Kelantan","Terengganu","Johor"],"treaties":[],"laws":["Undang-Undang Tubuh Kerajaan Johor","Undang-Undang Bagi Diri Kerajaan Terengganu"],"causes":["Tradisi Kesultanan Melayu","Keperluan pentadbiran negeri","Ancaman peluasan kuasa asing"],"effects":["Sultan kekal sebagai pusat pentadbiran","Pembesar membantu kerajaan","Pemodenan pentadbiran berlaku di Johor"],"importance":["Menunjukkan negeri Melayu mempunyai sistem pemerintahan tersendiri sebelum penasihat British ditempatkan."]},{"no":"4.2","title":"Peluasan Kuasa British di Perlis, Kedah, Kelantan dan Terengganu","facts":["British dan Siam menggunakan beberapa perjanjian untuk menentukan pengaruh di negeri Melayu utara.","Perjanjian Sulit 1897, Perjanjian Sempadan 1899 dan Perjanjian 1902 membuka jalan kepada Perjanjian Bangkok 1909.","Perjanjian Bangkok 1909 ditandatangani oleh British dan Siam pada 10 Mac 1909.","Perjanjian Bangkok membolehkan British menguasai Perlis, Kedah, Kelantan dan Terengganu tanpa gangguan Siam."],"keywords":["Perjanjian Bangkok 1909","Siam","Penasihat British","negeri Melayu utara"],"tokoh":["Sultan Abdul Hamid Halim Shah","Sultan Muhammad IV","Sultan Zainal Abidin III"],"dates":["1897: Perjanjian Sulit British-Siam","1899: Perjanjian Sempadan British-Siam","1902: Pengisytiharan British-Siam","10 Mac 1909: Perjanjian Bangkok"],"places":["Perlis","Kedah","Kelantan","Terengganu","Bangkok"],"treaties":["Perjanjian Sulit 1897","Perjanjian Sempadan 1899","Perjanjian 1902","Perjanjian Bangkok 1909"],"laws":[],"causes":["British mahu menghalang pengaruh kuasa lain","Siam mahu menjaga kepentingan wilayah","British mahu meluaskan kuasa ke negeri Melayu utara"],"effects":["British menempatkan Penasihat British","Negeri Melayu utara berada di bawah pengaruh British","Hubungan tradisional dengan Siam berubah"],"importance":["Perjanjian Bangkok ialah titik penting peluasan British di NNMTB."]},{"no":"4.3","title":"Peluasan Kuasa British di Johor","facts":["Johor mengekalkan kedaulatan lebih lama melalui hubungan diplomatik dan pemodenan pentadbiran.","Perjanjian 1855 antara Sultan Ali dengan Temenggung Ibrahim mengukuhkan kedudukan Temenggung di Johor.","Perjanjian Setia 1885 antara Johor dengan British mengiktiraf hubungan Johor-British.","Pada tahun 1914, Johor menerima Penasihat Am British."],"keywords":["Johor","Temenggung Ibrahim","Sultan Abu Bakar","Perjanjian Setia 1885","Penasihat Am"],"tokoh":["Sultan Ali","Temenggung Ibrahim","Sultan Abu Bakar","Sultan Ibrahim"],"dates":["1855: Perjanjian Sultan Ali-Temenggung Ibrahim","1885: Perjanjian Setia Johor-British","1914: Johor menerima Penasihat Am British"],"places":["Johor","Muar","Singapura"],"treaties":["Perjanjian 1855","Perjanjian Setia 1885","Perjanjian Johor-British 1914"],"laws":["Undang-Undang Tubuh Kerajaan Johor 1895"],"causes":["Johor mahu mengekalkan kedaulatan","British mahu meluaskan pengaruh","Kedudukan Johor strategik berhampiran Singapura"],"effects":["Johor mengekalkan pentadbiran sendiri lebih lama","Akhirnya Penasihat Am British ditempatkan","Kawalan British meningkat"],"importance":["Johor menjadi contoh kebijaksanaan pemerintah menangguhkan campur tangan British."]},{"no":"4.4","title":"Sistem Pentadbiran Negeri-negeri Melayu Tidak Bersekutu","facts":["Perjanjian Bangkok 1909 membawa perubahan pentadbiran di Perlis, Kedah, Kelantan dan Terengganu.","Penasihat British ditempatkan tetapi sultan masih kekal sebagai puncak kuasa terutama agama Islam dan adat Melayu.","Majlis Mesyuarat Negeri membantu pentadbiran negeri.","Undang-Undang Tubuh Kerajaan Johor dan Undang-Undang Bagi Diri Kerajaan Terengganu menegaskan larangan menyerahkan negeri kepada kuasa asing."],"keywords":["Penasihat British","Majlis Mesyuarat Negeri","sultan","agama Islam","adat Melayu"],"tokoh":["Sultan Johor","Sultan Terengganu","Penasihat British"],"dates":["1909: perubahan pentadbiran NNMTB","1911: Undang-Undang Bagi Diri Kerajaan Terengganu"],"places":["Perlis","Kedah","Kelantan","Terengganu","Johor"],"treaties":["Perjanjian Bangkok 1909"],"laws":["Undang-Undang Tubuh Kerajaan Johor 1895","Undang-Undang Bagi Diri Kerajaan Terengganu 1911"],"causes":["Peluasan kuasa British","Keperluan British mengawal pentadbiran","Usaha pemerintah mempertahankan kedaulatan"],"effects":["British mengawal nasihat pentadbiran","Sultan mengekalkan kuasa agama dan adat","Pentadbiran negeri menjadi lebih tersusun tetapi terikat dengan British"],"importance":["Memahami perbezaan NNMTB dengan NNMB dari segi tahap pemusatan kuasa British."]}];

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

export const sejarahF3C4Flashcards: Flashcard[] = makeCards().map(([front, back], index) => ({
  id: `sej-f3-c4-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 3",
  chapter: "Chapter 4",
  front,
  back,
}));
