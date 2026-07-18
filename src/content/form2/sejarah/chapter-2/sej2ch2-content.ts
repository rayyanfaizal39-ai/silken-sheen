// sej2ch2-content.ts
// Source-verified content for Sejarah Form 2, Bab 2 — Sistem Pemerintahan dan Kegiatan Ekonomi Masyarakat Kerajaan Alam Melayu
// Sourced from T2_BT_SEJ.pdf (pages 24-35)
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
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch2Content: Sej2Ch2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap kerajaan Alam Melayu mempunyai gelaran raja tersendiri, pelabuhan tersendiri, dan barangan dagangan tersendiri — namun semuanya berkongsi struktur asas yang sama: raja di pusat, wilayah di sekeliling, dan ekonomi berasaskan pertanian, perdagangan dan hasil bumi."
  },
  governance: {
    intro: "Sistem pemerintahan yang diamalkan oleh kerajaan Alam Melayu yang masyhur ialah sistem beraja, terbahagi kepada pemerintahan pusat dan wilayah.",
    systemTypes: ["Pemerintahan Pusat", "Pemerintahan Wilayah"],
    byKingdom: [
      { kingdom: "Kerajaan Funan", royalTitles: ["Kurung Bnam (raja gunung)", "Rajadhiraja (raja segala raja)", "Cakravatin (pemerintah alam sejagat)"], centralAdmin: "Raja dibantu golongan agama dan golongan tentera", regionalAdmin: "Dibahagikan kepada 7 wilayah, diketuai putera-putera raja bergelar Raja Kecil" },
      { kingdom: "Kerajaan Champa", royalTitles: ["Rajadhiraja", "diiktiraf sebagai pemerintah mulia dan suci, dikaitkan dengan Dewa Siva"], centralAdmin: "Raja dibantu pembesar yang mengutip cukai, menjaga keamanan dan pertahanan", regionalAdmin: "Dibahagikan kepada 5 wilayah: Indrapura, Amaravati, Vijaya, Kauthara, Panduranga" },
      { kingdom: "Kerajaan Srivijaya", royalTitles: ["Raja di Gunung", "Maharaja di Pulau", "dianggap Bodhisattva (peranan Buddha di bumi)"], centralAdmin: "Raja dibantu Yuvaraja (Putera Mahkota), Pratiyuvaraja (Raja Muda), Rajakumara, golongan agama, tentera, pemungut cukai, hakim, penjaga harta", regionalAdmin: "Kedatuan (ditadbir Datu berketurunan raja) dan Pradatuan (ditadbir Datu bukan berketurunan raja)" },
      { kingdom: "Kerajaan Angkor", royalTitles: ["Dewaraja (raja sebagai dewa)"], centralAdmin: "Raja dibantu Permaisuri, Raja Muda, dan pembesar (keagamaan, kehakiman, keselamatan, perbendaharaan)", regionalAdmin: "Wilayah → daerah → daerah kecil → kampung" },
      { kingdom: "Kerajaan Majapahit", royalTitles: ["Maharaja", "Sri Maharaja", "Sri Bathara"], centralAdmin: "Raja dibantu Sapta Prabu (Majlis Penasihat Diraja daripada kerabat diraja)", regionalAdmin: "14 wilayah, dipecahkan kepada Kabupaten, Kawadanan, Pakuwuan, Kebuyutan" },
      { kingdom: "Kerajaan Kedah Tua", royalTitles: [], centralAdmin: "Bentuk pentadbiran mudah dengan seorang ketua mengurus perdagangan dan keagamaan", regionalAdmin: "Selepas menjadi sebahagian Srivijaya, menjadi sebahagian Pradatuan" },
      { kingdom: "Kerajaan Gangga Nagara", royalTitles: [], centralAdmin: "Struktur tidak jelas; mengamalkan sistem beraja, raja membangunkan perdagangan dan keselamatan", regionalAdmin: "Tidak jelas" }
    ],
    socialClasses: ["Golongan Pemerintah", "Golongan Diperintah"]
  },
  economy: {
    intro: "Masyarakat kerajaan Alam Melayu menjalankan pelbagai kegiatan ekonomi: pertanian, perdagangan, mengutip hasil hutan dan laut, serta perlombongan dan pembuatan.",
    activities: ["Pertanian", "Perdagangan", "Hasil Hutan dan Laut", "Perlombongan dan Pembuatan"],
    riceCultivation: [
      { kingdom: "Funan dan Angkor", details: "Lembah Sungai Mekong; tasik Tonle Sap mengairi sawah; Angkor membina baray (kolam simpanan air); tuaian 3-4 kali setahun di Angkor" },
      { kingdom: "Champa", details: "Ketua Air di setiap kampung menyelenggarakan terusan dan daik (benteng tanah menahan air/banjir)" },
      { kingdom: "Majapahit", details: "Sungai Bengawan Solo dan Sungai Brantas membekalkan air; sistem pengairan dibina untuk tingkatkan hasil" },
      { kingdom: "Srivijaya", details: "Padi tanaman utama; ditanam di pedalaman Palembang, terutama Tanah Tinggi Pasemah dan Hulu Musi" }
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
      { product: "Gamat", source: "Perairan Alam Melayu", use: "Bahan makanan dan perubatan" },
      { product: "Rumpai laut", source: "Selat Melaka dan Laut Sulu", use: "Makanan" },
      { product: "Mutiara", source: "Selat Melaka dan Laut Sulu", use: "Barang perhiasan" }
    ],
    mining: [
      { mineral: "Emas", kingdom: "Champa", location: "Pergunungan Hue" },
      { mineral: "Perak", kingdom: "Champa", location: "Indrapura dan antara Amaravati-Vijaya" },
      { mineral: "Bijih besi", kingdom: "Angkor", location: "Pergunungan Phnom Dek" }
    ],
    manufacturing: [
      { kingdom: "Funan dan Angkor", products: ["Barang perhiasan emas daripada bijih besi dan emas"] },
      { kingdom: "Champa", products: ["Tembikar", "Cuka kelapa"] },
      { kingdom: "Majapahit", products: ["Garam", "Gula", "Minyak", "Pembungkusan daging kerbau", "Mi daripada beras"] }
    ]
  },
  keyExamFacts: [
    "Sistem pemerintahan kerajaan Alam Melayu ialah sistem beraja, terbahagi pusat dan wilayah",
    "Setiap kerajaan mempunyai gelaran raja tersendiri: Kurung Bnam/Cakravatin (Funan), Rajadhiraja (Champa), Bodhisattva (Srivijaya), Dewaraja (Angkor), Maharaja/Sri Bathara (Majapahit)",
    "Struktur sosial terbahagi kepada 2: golongan pemerintah dan golongan diperintah",
    "4 kegiatan ekonomi utama: pertanian, perdagangan, hasil hutan/laut, perlombongan dan pembuatan",
    "Padi ialah tanaman utama; Angkor membina baray (kolam air) dan menuai 3-4 kali setahun",
    "3 rempah utama: bunga cengkih (Maluku), buah pala (Banda), lada hitam (Sumatera/Jawa)",
    "Setiap kerajaan mempunyai pelabuhan dan barangan dagangan tersendiri (contoh: Oc Eo untuk Funan, Palembang untuk Srivijaya)",
    "Pedagang luar utama: China (sutera, tembikar), India (kain kapas, batu berharga), Arab/Parsi (minyak wangi, barangan kaca)",
    "Kesan perdagangan: pelabuhan dan pembuatan kapal berkembang, masyarakat menguasai ilmu pelayaran hingga mampu belayar ke Afrika",
    "Hasil hutan/laut utama: gaharu, sarang burung, rotan, kapur barus, gamat, mutiara, rumpai laut",
    "Perlombongan: emas dan perak di Champa, bijih besi di Angkor"
  ],
  keyTerms: [
    "Sistem beraja", "Pemerintahan pusat", "Pemerintahan wilayah", "Kurung Bnam", "Rajadhiraja",
    "Cakravatin", "Bodhisattva", "Yuvaraja", "Dewaraja", "Sapta Prabu", "Kedatuan", "Pradatuan",
    "Golongan pemerintah", "Golongan diperintah", "Baray", "Daik", "Gaharu", "Kapur barus"
  ],
  chapterSummary: "Bab 2 merangkumi sistem pemerintahan beraja kerajaan Alam Melayu (gelaran raja, pentadbiran pusat/wilayah bagi 7 kerajaan) dan kegiatan ekonomi (pertanian padi dan rempah, perdagangan melalui pelabuhan tersendiri dengan pedagang China/India/Arab-Parsi, kesan perdagangan, hasil hutan dan laut, serta perlombongan dan pembuatan)."
};
