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

const topics: Topic[] = [{"no":"6.1","title":"Pengenalan Ekonomi Moden oleh Kuasa Barat di Negara Kita","facts":["Kuasa Barat memperkenalkan ekonomi moden berasaskan modal besar, teknologi dan eksport.","Tanaman komersial seperti getah, tebu, tembakau dan padi berorientasikan eksport berkembang.","Bijih timah, bijih besi, emas, petroleum dan arang batu menjadi hasil penting.","SBUB melakukan pelaburan dalam tanaman getah di Sabah seperti Bongaya dan Sungai Labuk."],"keywords":["ekonomi moden","modal","eksport","getah","bijih timah","petroleum"],"tokoh":["Pelabur Barat","SBUB","Pentadbir British"],"dates":["Abad ke-19: ekonomi moden berkembang","Selepas 1840: permintaan bijih timah meningkat"],"places":["Negeri-negeri Melayu","Sarawak","Sabah","Bongaya","Sungai Labuk"],"treaties":[],"laws":[],"causes":["Permintaan bahan mentah dunia","Revolusi Perindustrian","Modal Barat","Kesuburan tanah dan kekayaan hasil bumi"],"effects":["Pertanian komersial berkembang","Perlombongan diperluas","Buruh luar dibawa masuk","Ekonomi tradisional berubah"],"importance":["Menerangkan asas perubahan ekonomi negara akibat pentadbiran Barat."]},{"no":"6.2","title":"Pentadbiran Barat Berkaitan dengan Ekonomi","facts":["Pentadbiran Barat menggubal dasar tanah, buruh dan kewangan untuk menyokong ekonomi kolonial.","Akta Tanah Simpanan Melayu diperkenalkan bagi melindungi tanah orang Melayu.","Sistem cukai dan peraturan tanah mengubah hubungan masyarakat dengan tanah.","Kemasukan buruh luar diurus untuk memenuhi keperluan lombong dan ladang."],"keywords":["tanah","buruh","cukai","Akta Tanah Simpanan Melayu","ekonomi kolonial"],"tokoh":["Pentadbir British","Pemodal Eropah","Buruh Cina","Buruh India"],"dates":["1913: Akta Tanah Simpanan Melayu diperkenalkan"],"places":["Tanah Melayu","Sarawak","Sabah","kawasan lombong","ladang getah"],"treaties":[],"laws":["Akta Tanah Simpanan Melayu","peraturan tanah","peraturan buruh"],"causes":["Keperluan mengawal tanah dan tenaga kerja","Perkembangan lombong dan ladang","Kepentingan hasil eksport"],"effects":["Tanah dikategorikan mengikut kepentingan ekonomi","Buruh luar meningkat","Masyarakat tempatan semakin terikat dengan sistem pentadbiran Barat"],"importance":["Menunjukkan ekonomi kolonial dikawal melalui undang-undang dan pentadbiran."]},{"no":"6.3","title":"Kesan Ekonomi Akibat Pentadbiran Barat di Negara Kita","facts":["British membina landasan kereta api untuk menghubungkan kawasan lombong dengan pelabuhan.","Fasa kereta api 1885-1896 menghubungkan lombong dengan pelabuhan.","Fasa 1897-1909 menghubungkan utara dan selatan Tanah Melayu selepas NNMB dibentuk.","Fasa 1910-1931 menghubungkan seluruh Tanah Melayu selepas pengaruh British meluas ke NNMTB.","Jalan raya, pelabuhan, lapangan terbang awam dan telekomunikasi seperti telegraf, telefon dan pos berkembang."],"keywords":["kereta api","jalan raya","pelabuhan","telegraf","telefon","pos"],"tokoh":["Pentadbir British","Pengusaha lombong","Pengusaha ladang"],"dates":["1885-1896: fasa pertama kereta api","1897-1909: fasa kedua","1910-1931: fasa ketiga"],"places":["Port Weld","Taiping","Kuala Lumpur","Port Swettenham","Gemas","Padang Besar","Kota Bharu"],"treaties":[],"laws":[],"causes":["Keperluan mengangkut bijih timah dan getah","Pertumbuhan ekonomi eksport","Keperluan menghubungkan kawasan pengeluaran dengan pelabuhan"],"effects":["Pengangkutan moden berkembang","Bandar dan pelabuhan maju","Eksport bahan mentah lebih cepat","Telekomunikasi memudahkan pentadbiran"],"importance":["Infrastruktur moden ialah kesan langsung ekonomi kolonial."]},{"no":"6.4","title":"Kesan Sosial Akibat Perkembangan Ekonomi di Negara Kita","facts":["Perkembangan ekonomi membawa kepada kemunculan bandar baharu.","Kemasukan buruh luar membentuk masyarakat majmuk.","Pendidikan vernakular, sekolah Melayu dan sekolah agama berkembang mengikut komuniti.","Perkhidmatan kesihatan, hospital, sistem pos, telegraf dan telefon diperkenalkan.","SBUB membuka sekolah Melayu di Papar."],"keywords":["bandar","masyarakat majmuk","pendidikan vernakular","kesihatan","telekomunikasi"],"tokoh":["Pentadbir British","Masyarakat Melayu","Masyarakat Cina","Masyarakat India","SBUB"],"dates":["Awal abad ke-20: bandar dan perkhidmatan sosial berkembang"],"places":["Kuala Lumpur","Ipoh","Taiping","Papar","Sarawak","Sabah"],"treaties":[],"laws":[],"causes":["Perkembangan lombong dan ladang","Kemasukan buruh luar","Pembinaan infrastruktur","Keperluan pentadbiran kolonial"],"effects":["Bandar berkembang","Masyarakat majmuk terbentuk","Pendidikan terpisah mengikut kaum","Perkhidmatan sosial moden diperkenalkan"],"importance":["Menjelaskan asal usul perubahan sosial moden di negara kita."]}];

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

export const sejarahF3C6Flashcards: Flashcard[] = makeCards().map(([front, back], index) => ({
  id: `sej-f3-c6-fc${index + 1}`,
  subjectId: "sejarah",
  form: "Form 3",
  chapter: "Chapter 6",
  front,
  back,
}));
