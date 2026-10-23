// sej2ch2-content.ts
// Source-verified content for Sejarah Form 2, Bab 2 — Sistem Pemerintahan dan Kegiatan Ekonomi Masyarakat Kerajaan Alam Melayu
// Sourced from T2_BT_SEJ.pdf (pages 24-37)
// Content data only — no presentation markup.

export interface KingdomGovernance {
  kingdom: string;
  royalTitles: string[];
  centralAdmin: string;
  regionalAdmin: string;
}

export interface RiceCultivation {
  kingdom: string;
  details: string;
}

export interface TradePort {
  kingdom: string;
  ports: string[];
  goods: string[];
}

export interface ForeignTrader {
  origin: string;
  broughtGoods: string[];
  soughtGoods: string[];
}

export interface ForestSeaProduct {
  product: string;
  source: string;
  use: string;
}

export interface MiningActivity {
  mineral: string;
  kingdom: string;
  location: string;
}

export interface ManufacturingActivity {
  kingdom: string;
  products: string[];
}

export interface Sej2Ch2Content {
  hook: { title: string; body: string };
  governance: {
    intro: string;
    systemTypes: string[];
    byKingdom: KingdomGovernance[];
    socialClasses: string[];
    /** Textbook prose (hlm. 26-27) used by the notes block; optional for older consumers. */
    majapahitWomen?: string;
    smallKingdoms?: string;
    closing?: string;
  };
  economy: {
    intro: string;
    activities: string[];
    riceCultivation: RiceCultivation[];
    spices: { spice: string; growingArea: string }[];
    otherCrops: string[];
    tradePorts: TradePort[];
    foreignTraders: ForeignTrader[];
    tradeEffects: string[];
    forestSeaProducts: ForestSeaProduct[];
    mining: MiningActivity[];
    manufacturing: ManufacturingActivity[];
    agricultureIntro?: string;
    spiceNote?: string;
    otherFarming?: string;
    tradeIntro?: string;
    tradeOfficial?: string;
    foreignTradersIntro?: string;
    silkNote?: string;
    tradeClosing?: string;
    forestSeaIntro?: string;
    forestSeaDemand?: string;
    miningIntro?: string;
    economyClosing?: string;
  };
  values?: string[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch2Content: Sej2Ch2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Kerajaan Alam Melayu mengamalkan sistem beraja dengan pemerintahan pusat dan wilayah. Sistem yang teratur ini mewujudkan kestabilan, lalu kegiatan ekonomi seperti pertanian, perdagangan, hasil hutan dan laut serta perlombongan dan pembuatan berkembang maju."
  },
  governance: {
    intro: "Sistem pemerintahan yang diamalkan oleh kerajaan Alam Melayu yang masyhur ialah sistem beraja. Sistem beraja ini terbahagi kepada dua peringkat, iaitu pusat dan wilayah. Raja berada di puncak pemerintahan dan dibantu oleh pembesar pusat dan wilayah.",
    systemTypes: ["Pemerintahan Pusat", "Pemerintahan Wilayah"],
    byKingdom: [
      { kingdom: "Kerajaan Funan", royalTitles: ["Kurung Bnam (raja gunung)", "Rajadhiraja (raja segala raja)", "Cakravatin (pemerintah alam sejagat)"], centralAdmin: "Golongan agama dan golongan tentera", regionalAdmin: "Dibahagikan kepada 7 wilayah, diketuai putera-putera raja bergelar Raja Kecil" },
      { kingdom: "Kerajaan Champa", royalTitles: ["Rajadhiraja (diiktiraf sebagai pemerintah yang mulia dan suci serta dikaitkan dengan Dewa Siva)"], centralAdmin: "Para pembesar yang bertanggungjawab mengutip cukai, menjaga keamanan dan mengukuhkan pertahanan", regionalAdmin: "Dibahagikan kepada 5 wilayah: Indrapura, Amaravati, Vijaya, Kauthara, Panduranga" },
      { kingdom: "Kerajaan Srivijaya", royalTitles: ["Raja di Gunung", "Maharaja di Pulau", "Raja mempunyai unsur kesaktian dan dianggap Bodhisattva (peranan raja sebagai Buddha di bumi)"], centralAdmin: "Yuvaraja (Putera Mahkota), Pratiyuvaraja (Raja Muda) dan Rajakumara; golongan agama, tentera, pemungut cukai, hakim dan penjaga harta kerajaan", regionalAdmin: "Kedatuan (ditadbir Datu berketurunan raja) dan Pradatuan (ditadbir Datu bukan berketurunan raja)" },
      { kingdom: "Kerajaan Angkor", royalTitles: ["Dewaraja (mengaitkan raja sebagai dewa)"], centralAdmin: "Pembesar dalam bidang keagamaan, kehakiman, keselamatan dan perbendaharaan; Permaisuri dan Raja Muda ialah kuasa kedua dan ketiga yang penting", regionalAdmin: "Wilayah → daerah → daerah kecil → kampung" },
      { kingdom: "Kerajaan Majapahit", royalTitles: ["Maharaja", "Sri Maharaja", "Sri Bathara"], centralAdmin: "Sapta Prabu (Majlis Penasihat Diraja yang terdiri daripada kerabat diraja) dan para pembesar", regionalAdmin: "14 wilayah, dipecahkan kepada Kabupaten, Kawadanan, Pakuwuan, Kebuyutan" },
      { kingdom: "Kerajaan Kedah Tua", royalTitles: [], centralAdmin: "Bentuk pentadbiran mudah dengan seorang ketua yang mengurus hal perdagangan dan keagamaan", regionalAdmin: "Apabila menjadi sebahagian daripada kerajaan Srivijaya, Kedah Tua menjadi sebahagian daripada Pradatuan Srivijaya" },
      { kingdom: "Kerajaan Gangga Nagara", royalTitles: [], centralAdmin: "Struktur pemerintahan tidak jelas; kajian menunjukkan sistem beraja diamalkan dan raja membangunkan kemajuan perdagangan serta bertanggungjawab dalam hal ehwal keselamatan", regionalAdmin: "Tidak dinyatakan dalam buku teks" }
    ],
    socialClasses: ["Golongan Pemerintah", "Golongan Diperintah"],
    majapahitWomen: "Wanita kerabat diraja mendapat tempat yang tinggi dalam pentadbiran Majapahit. Mereka menjadi anggota Sapta Prabu, malahan ada yang dilantik menjadi raja.",
    smallKingdoms: "Kedah Tua banyak dibayangi oleh kerajaan besar, terutamanya Srivijaya. Pentadbirannya mudah, iaitu seorang ketua mengurus hal perdagangan dan keagamaan. Apabila Kedah Tua menjadi sebahagian daripada Srivijaya, coraknya berubah dan Kedah Tua menjadi sebahagian daripada Pradatuan Srivijaya. Struktur pemerintahan Gangga Nagara pula tidak jelas, tetapi kajian menunjukkan kerajaan ini mengamalkan sistem beraja; rajanya membangunkan kemajuan perdagangan dan bertanggungjawab dalam hal ehwal keselamatan.",
    closing: "Sistem pemerintahan merupakan tonggak penting pembangunan kerajaan. Susunan kuasa yang teratur, dengan raja di puncak dibantu pembesar pusat dan wilayah, mewujudkan kestabilan di Alam Melayu. Masyarakatnya terdiri daripada dua golongan utama, iaitu golongan pemerintah dan golongan diperintah (dihuraikan dalam Bab 3)."
  },
  economy: {
    intro: "Masyarakat kerajaan Alam Melayu menjalankan pelbagai kegiatan ekonomi, iaitu pertanian, perdagangan, mengutip hasil hutan dan laut, serta perlombongan dan pembuatan.",
    activities: ["Pertanian", "Perdagangan", "Hasil Hutan dan Laut", "Perlombongan dan Pembuatan"],
    riceCultivation: [
      { kingdom: "Funan dan Angkor", details: "Tanah subur Lembah Sungai Mekong; hujan mengisi tasik besar seperti Tonle Sap untuk mengairi sawah. Angkor membina baray (kolam menyimpan air) dan menuai padi tiga hingga empat kali setahun." },
      { kingdom: "Champa", details: "Ketua Air di setiap kampung menyelenggarakan terusan dan daik (benteng tanah untuk menahan air dan mencegah banjir)." },
      { kingdom: "Majapahit", details: "Tanah subur Pulau Jawa; Sungai Bengawan Solo dan Sungai Brantas mengairi sawah. Pemerintah membina sistem pengairan untuk meningkatkan pengeluaran padi." },
      { kingdom: "Srivijaya", details: "Padi tanaman utama, ditanam di kawasan pedalaman Palembang, terutama Tanah Tinggi Pasemah dan Hulu Musi." }
    ],
    spices: [
      { spice: "Bunga cengkih", growingArea: "Kepulauan Maluku" },
      { spice: "Buah pala", growingArea: "Pulau Banda" },
      { spice: "Lada hitam", growingArea: "Sumatera dan Jawa" }
    ],
    otherCrops: ["Pisang", "Tebu", "Bijan", "Kekacang", "Kelapa", "Sayuran", "Buah-buahan"],
    tradePorts: [
      { kingdom: "Kerajaan Funan", ports: ["Oc Eo"], goods: ["Damar", "Kapur barus", "Kayu cendana", "Gaharu"] },
      { kingdom: "Kerajaan Champa", ports: ["Turan", "Kam ran", "Sri Banoy", "Maliti"], goods: ["Beras", "Emas", "Perak", "Gading gajah", "Gaharu"] },
      { kingdom: "Kerajaan Srivijaya", ports: ["Palembang"], goods: ["Damar", "Kapur barus", "Gaharu", "Madu", "Rotan", "Rempah", "Mutiara", "Rumpai laut", "Gading gajah", "Sumbu badak"] },
      { kingdom: "Kerajaan Angkor", ports: ["Yasodharapura"], goods: ["Gaharu", "Buah pelaga", "Lilin lebah", "Minyak sayuran", "Damar", "Gading gajah"] },
      { kingdom: "Kerajaan Majapahit", ports: ["Tuban", "Sidayu", "Gresik", "Surabaya"], goods: ["Rempah", "Beras", "Rotan", "Kayu cendana", "Gaharu", "Ikan", "Kulit penyu", "Mutiara"] },
      { kingdom: "Kerajaan Kedah Tua", ports: ["Sungai Mas", "Pangkalan Bujang"], goods: ["Rotan", "Damar", "Kayu cendana", "Gading gajah"] },
      { kingdom: "Kerajaan Gangga Nagara", ports: ["Pangkalan", "Lembah Kinta", "Tanjung Rambutan", "Bidor", "Sungai Siput"], goods: ["Emas", "Bijih timah", "Rempah ratus", "Kapur barus", "Damar"] }
    ],
    foreignTraders: [
      { origin: "China", broughtGoods: ["Sutera", "Tembikar", "Pinggan dan mangkuk", "Payung", "Gula", "Gendang"], soughtGoods: ["Barangan bernilai perubatan dari Alam Melayu"] },
      { origin: "India", broughtGoods: ["Kain kapas", "Tembikar", "Batu berharga (akik, karnelian)"], soughtGoods: ["Kain sutera dari China", "Rempah, gaharu, kapur barus dari Alam Melayu"] },
      { origin: "Arab dan Parsi", broughtGoods: ["Tembikar", "Minyak wangi", "Barangan kaca dan manik"], soughtGoods: ["Rempah dan kayu wangi untuk didagang semula ke Tanah Arab dan Rom"] }
    ],
    tradeEffects: [
      "Pelabuhan berkembang",
      "Pembuatan kapal berkembang",
      "Masyarakat menguasai ilmu pelayaran",
      "Masyarakat Alam Melayu mampu belayar hingga Afrika"
    ],
    forestSeaProducts: [
      { product: "Gaharu", source: "Hutan Sungai Mekong, Tanah Melayu, Sumatera", use: "Bahan pewangi dan perubatan" },
      { product: "Sarang burung", source: "Utara Pulau Borneo", use: "Kesihatan dan perubatan" },
      { product: "Rotan", source: "Seluruh Alam Melayu", use: "Bahan binaan dan kraf tangan" },
      { product: "Kapur barus", source: "Sumatera dan Borneo", use: "Bahan pewangi" },
      { product: "Gamat", source: "Selat Melaka dan Laut Sulu", use: "Bahan makanan dan perubatan" },
      { product: "Rumpai laut", source: "Selat Melaka dan Laut Sulu", use: "Makanan" },
      { product: "Mutiara", source: "Selat Melaka dan Laut Sulu", use: "Barang perhiasan" }
    ],
    mining: [
      { mineral: "Emas", kingdom: "Champa", location: "Pergunungan Hue" },
      { mineral: "Perak", kingdom: "Champa", location: "Indrapura dan antara Amaravati-Vijaya" },
      { mineral: "Bijih besi", kingdom: "Angkor", location: "Pergunungan Phnom Dek" }
    ],
    manufacturing: [
      { kingdom: "Funan dan Angkor", products: ["Pelbagai barangan daripada bijih besi dan emas, seperti barang perhiasan"] },
      { kingdom: "Champa", products: ["Tembikar", "Cuka kelapa"] },
      { kingdom: "Majapahit", products: ["Garam", "Gula", "Minyak", "Pembungkusan daging kerbau", "Mi daripada beras"] }
    ],
    agricultureIntro: "Alam Melayu mempunyai tanah yang subur. Pada tahap awal, pertanian hanya untuk menyara diri; lebihan hasil kemudian dipasarkan atau dibekalkan kepada penduduk yang tidak bertani. Sebahagian besar kawasan ditanam dengan padi kerana nasi ialah makanan ruji. Di kawasan tanah tinggi atau bukit yang kurang air, padi ditanam secara teres atau relung.",
    spiceNote: "Hanya di bahagian kepulauan Alam Melayu, bunga cengkih, buah pala dan lada hitam ditanam sebagai tanaman dagangan.",
    otherFarming: "Selain padi, masyarakat mengusahakan pisang, tebu, bijan, kekacang, kelapa, sayuran dan buah-buahan. Mereka juga menangkap ikan di sawah, paya dan sungai, malah ada yang berusaha mendapatkan kulit kura-kura.",
    tradeIntro: "Perdagangan ialah kegiatan ekonomi yang penting. Barangan Alam Melayu menjadi tarikan pedagang luar, dan kedudukannya di tengah-tengah laluan perdagangan timur dan barat membolehkan kerajaannya berkembang maju. Pelabuhan dilengkapi kemudahan seperti bekalan air, tempat tinggal, tempat menyimpan barang dagangan dan kawasan berjual beli.",
    tradeOfficial: "Di pelabuhan Srivijaya, jawatan Tuhan Vatakvurah berperanan sebagai penyelia kegiatan perdagangan dan perkapalan.",
    foreignTradersIntro: "Pedagang luar yang sering berdagang dengan Alam Melayu datang dari China, India, Arab dan Parsi. Mereka membawa barang untuk dijual dan ditukar dengan barangan kerajaan Alam Melayu; rempah ialah barang dagangan utama dari Alam Melayu.",
    silkNote: "Selain untuk pakaian, sutera juga digunakan sebagai warkah diraja dan panji-panji kerajaan.",
    tradeClosing: "Perdagangan membantu membangunkan pelabuhan dan memajukan pembuatan kapal. Masyarakat kerajaan Alam Melayu mahir membuat kapal, menguasai ilmu pelayaran dan mampu belayar hingga ke Afrika.",
    forestSeaIntro: "Pada peringkat awal, hasil hutan dan laut dikutip untuk kegunaan sendiri. Apabila hasilnya melebihi keperluan, lebihan itu didagangkan dalam kalangan petempatan, dan petempatan tersebut berkembang menjadi kawasan perdagangan.",
    forestSeaDemand: "Hasil ini mendapat permintaan tinggi daripada pedagang asing kerana kegunaannya sebagai sumber makanan, ubatan, wangian, perhiasan dan bahan binaan.",
    miningIntro: "Perlombongan ialah kegiatan melombong emas, perak dan bijih besi; pada peringkat awal, ia dijalankan dengan cara mendulang secara kecil-kecilan. Pembuatan pula ialah kegiatan membuat barang harian dan mewah.",
    economyClosing: "Kekayaan sumber alam dan kebijaksanaan pemerintah mengurusnya, bersama kegigihan rakyat bekerja, telah memakmurkan Alam Melayu."
  },
  values: [
    "Pengetahuan tentang sistem pemerintahan kerajaan Alam Melayu menyedarkan kita tentang kepentingan mentaati pemerintah.",
    "Kestabilan politik dan kemakmuran ekonomi penting untuk membina kegemilangan tamadun bangsa dan negara.",
    "Kita perlu bijak memanfaatkan kekayaan sumber alam untuk kemakmuran ekonomi negara.",
    "Kita harus menghargai dan mencontohi kegigihan masyarakat Alam Melayu memajukan diri, serta bersifat kreatif dan inovatif."
  ],
  keyExamFacts: [
    "Sistem pemerintahan kerajaan Alam Melayu ialah sistem beraja, terbahagi pusat dan wilayah",
    "Setiap kerajaan mempunyai gelaran raja tersendiri: Kurung Bnam/Cakravatin (Funan), Rajadhiraja (Champa), Bodhisattva (Srivijaya), Dewaraja (Angkor), Maharaja/Sri Bathara (Majapahit)",
    "Struktur sosial terbahagi kepada 2: golongan pemerintah dan golongan diperintah",
    "4 kegiatan ekonomi utama: pertanian, perdagangan, hasil hutan/laut, perlombongan dan pembuatan",
    "Padi ialah tanaman utama kerana nasi makanan ruji; Angkor membina baray (kolam simpanan air) dan menuai padi 3-4 kali setahun",
    "3 rempah utama: bunga cengkih (Maluku), buah pala (Banda), lada hitam (Sumatera/Jawa)",
    "Setiap kerajaan mempunyai pelabuhan dan barangan dagangan tersendiri (contoh: Oc Eo untuk Funan, Palembang untuk Srivijaya)",
    "Pedagang luar utama: China (sutera, tembikar), India (kain kapas, batu berharga), Arab/Parsi (minyak wangi, barangan kaca)",
    "Kesan perdagangan: pelabuhan dan pembuatan kapal berkembang, masyarakat menguasai ilmu pelayaran hingga mampu belayar ke Afrika",
    "Hasil hutan/laut utama: gaharu, sarang burung, rotan, kapur barus, gamat, mutiara, rumpai laut",
    "Perlombongan: emas dan perak di Champa, bijih besi di Angkor; pada peringkat awal secara mendulang kecil-kecilan",
    "Pembuatan: tembikar dan cuka kelapa (Champa), garam, gula, minyak dan mi beras (Majapahit)"
  ],
  keyTerms: [
    "Sistem beraja", "Pemerintahan pusat", "Pemerintahan wilayah", "Kurung Bnam", "Rajadhiraja",
    "Cakravatin", "Bodhisattva", "Yuvaraja", "Dewaraja", "Sapta Prabu", "Kedatuan", "Pradatuan",
    "Golongan pemerintah", "Golongan diperintah", "Baray", "Daik", "Ketua Air", "Tuhan Vatakvurah", "Gaharu", "Kapur barus"
  ],
  chapterSummary: "Bab 2 merangkumi sistem pemerintahan beraja kerajaan Alam Melayu (gelaran raja, pentadbiran pusat/wilayah bagi 7 kerajaan) dan kegiatan ekonomi (pertanian padi dan rempah, perdagangan melalui pelabuhan tersendiri dengan pedagang China/India/Arab-Parsi, kesan perdagangan, hasil hutan dan laut, serta perlombongan dan pembuatan)."
};
