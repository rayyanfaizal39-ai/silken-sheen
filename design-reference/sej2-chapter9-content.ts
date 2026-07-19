// sej2-chapter9-content.ts
// Source-verified content for Sejarah Form 2, Bab 9 — Warisan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis
// Sourced from T2_BT_SEJ.pdf (pages 156-175)
// Content data only — no presentation markup.

export interface LegacyAspect {
  aspect: string;
  description: string;
}

export interface RoyalTitle {
  kingdom: string;
  title: string;
}

export interface GovernanceTier {
  tier: string;
  role: string;
}

export interface AdatPerpatihFeature {
  feature: string;
  points: string[];
}

export interface AdatHierarchyRole {
  role: string;
  selectedBy: string;
  functions: string[];
}

export interface Sej2Ch9Content {
  hook: { title: string; body: string };
  legacyOfThreeKingdoms: {
    intro: string;
    aspects: string[];
    royalTitles: RoyalTitle[];
    perlisLineage: { ruler: string; years: string }[];
    governanceHierarchy: GovernanceTier[];
    coronationSteps: string[];
    literaryExample: { title: string; era: string; form: string; subject: string };
  };
  negeriSembilanUniqueness: {
    intro: string;
    origin: string;
    features: AdatPerpatihFeature[];
    kedimChant: string;
    sukuCount: string;
    hierarchy: AdatHierarchyRole[];
    societalGroups: string[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej2Ch9Content: Sej2Ch9Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Di Negeri Sembilan, jika tiada Ibu Soko, tiada seorang pun pemimpin adat boleh dilantik pada sebarang peringkat — sebuah sistem matrilineal yang unik di seluruh Malaysia. Bab ini menunjukkan bagaimana warisan pemerintahan boleh kekal relevan hingga kini dalam bentuk yang sangat berbeza antara satu negeri dengan yang lain."
  },
  legacyOfThreeKingdoms: {
    intro: "Kelangsungan kewujudan kerajaan Kedah, Kelantan dan Perlis hingga kini diiringi kegemilangan mengharungi pelbagai cabaran sejak pengasasan. Warisan ini dapat dilihat menerusi sistem pemerintahan beraja, adat istiadat, perundangan, persuratan dan kesenian.",
    aspects: ["Sistem Pemerintahan Beraja", "Adat Istiadat", "Perundangan", "Persuratan", "Kesenian"],
    royalTitles: [
      { kingdom: "Kedah", title: "Sultan" },
      { kingdom: "Kelantan", title: "Sultan" },
      { kingdom: "Perlis", title: "Raja" }
    ],
    perlisLineage: [
      { ruler: "Tuanku Syed Hussin Jamalullail", years: "1843-1873 (Raja Perlis Pertama)" },
      { ruler: "Tuanku Syed Ahmad Jamalullail", years: "1873-1897 (Kedua)" },
      { ruler: "Tuanku Syed Safi Jamalullail", years: "1897-1904 (Ketiga)" },
      { ruler: "Tuanku Syed Alwi Jamalullail", years: "1904-1943 (Keempat)" },
      { ruler: "Tuanku Syed Hamzah Jamalullail", years: "1943-1945 (Kelima)" },
      { ruler: "Tuanku Syed Putra Jamalullail", years: "1945-2000 (Keenam)" },
      { ruler: "Tuanku Syed Sirajuddin Jamalullail", years: "2000-kini (Ketujuh)" }
    ],
    governanceHierarchy: [
      { tier: "Sultan (Negeri)", role: "Hierarki tertinggi; ketua agama Islam; lambang perpaduan rakyat" },
      { tier: "Pembesar (Jajahan/Daerah)", role: "Wakil pentadbir bagi pihak kerajaan, bertanggungjawab terhadap jajahan atau daerah" },
      { tier: "Penghulu (Mukim)", role: "Penguasa peringkat mukim; orang perantaraan antara rakyat dengan pemerintah — diwarisi hari ini sebagai ketua kampung" }
    ],
    coronationSteps: [
      "Majlis Pemasyhuran — pengganti dimasyhurkan sebelum jenazah pemerintah lama dimakamkan",
      "Istiadat Pertabalan — mempersembahkan naskhah al-Quran dan alat kebesaran diraja",
      "Sultan/Raja yang dimasyhurkan membaca watikah pertabalan dan mengucup keris kuasa",
      "Menteri Besar mengetuai seruan 'Daulat Tuanku'"
    ],
    literaryExample: { title: "Syair Sultan Maulana", era: "Zaman Sultan Ahmad Tajuddin Halim Shah II (1804-1845)", form: "Syair", subject: "Kisah perang tentera Kedah" }
  },
  negeriSembilanUniqueness: {
    intro: "Keserumpunan Alam Melayu membawa perantau Minangkabau menetap di Rembau, Sungai Ujong dan Johol (Negeri Sembilan) serta Naning, membawa bersama adat resam asal — Adat Perpatih, dibawa oleh Dato' Perpatih Nan Sebatang.",
    origin: "Adat Minangkabau disesuaikan dengan adat tempatan untuk melindungi kepentingan individu dan masyarakat",
    features: [
      { feature: "Jurai Keturunan Sebelah Ibu", points: ["Kaum perempuan dianggap Ibu Soko — ibu yang melahirkan anggota masyarakat", "Setiap anak merupakan anggota suku ibunya", "Anggota suku dianggap sedarah kerana berasal daripada moyang perempuan yang sama"] },
      { feature: "Pelaksanaan Hukuman", points: ["Bersifat pemulihan, mengutamakan kebaikan pesalah", "Kesalahan kecil diselesaikan dengan bermaafan atau denda ringan"] },
      { feature: "Perkahwinan", points: ["Perkahwinan sesama suku tidak digalakkan (dianggap keluarga besar/bersaudara)", "Digalakkan berkahwin luar suku untuk mewujudkan hubungan persaudaraan antara suku", "Lelaki yang berkahwin menjadi 'orang semenda' (tinggal di rumah isteri, anggota suku isteri)", "Wanita berkahwin sesama suku hilang hak mewarisi pusaka; lelaki hilang hak jawatan adat — boleh dipulihkan melalui adat memulih pusaka"] },
      { feature: "Upacara Kedim", points: ["Menerima orang luar suku menjadi ahli suku", "Bersumpah taat setia dan bersaudara dengan ahli suku yang disertai"] },
      { feature: "Wanita Mewarisi Pusaka", points: ["Wanita mewarisi harta pusaka (termasuk tanah dan rumah) supaya tidak terabai", "Diwarisi turun-temurun daripada ibu kepada anak perempuan"] }
    ],
    kedimChant: "Darah dicecah, Doa ditampung, Sumpah dilabuh, Quran dijunjung.",
    sukuCount: "12 suku di Negeri Sembilan: Biduanda, Batu Hampar, Paya Kumbuh, Mungkal, Tiga Nenek, Semelenggang, Selemak, Batu Belang, Tanah Datar, Anak Acheh, Anak Melaka, Tiga Batu",
    hierarchy: [
      { role: "Yamtuan Besar / Yang di-Pertuan Besar", selectedBy: "Dipilih oleh Undang Yang Empat", functions: ["Ketua negeri", "Lambang kesatuan dan persekutuan"] },
      { role: "Undang", selectedBy: "Dilantik oleh Lembaga", functions: ["Ketua Luak (Sungai Ujong, Jelebu, Johol, Rembau)", "Berkerapatan memilih Yamtuan Besar daripada keturunan Yamtuan Radin"] },
      { role: "Lembaga", selectedBy: "Dilantik oleh Buapak", functions: ["Ketua Suku", "Memilih Undang dan Penghulu", "Menjaga keamanan dan keselamatan", "Menyelesaikan pertelingkahan antara suku", "Mengurus pembahagian harta pusaka"] },
      { role: "Buapak", selectedBy: "Dilantik oleh Anak Buah dalam Perut", functions: ["Ketua rujukan aspek adat dan hukum"] },
      { role: "Ibu Soko", selectedBy: "Peranan diwarisi (Ibu Waris di Johol; Ibu Telapak di Tampin)", functions: ["Mengetahui, memahami, menghafal adat dan asal usul kelompok", "Terlibat langsung dalam pemilihan dan pelantikan Buapak", "Tanpa Ibu Soko, semua peringkat pelantikan pemimpin adat tidak boleh dilaksanakan"] }
    ],
    societalGroups: ["Perut (unit terkecil, keturunan sebelah ibu)", "Suku (dibentuk beberapa Perut)", "Luak (daerah/jajahan, kumpulan terbesar)"]
  },
  keyExamFacts: [
    "5 aspek warisan Kedah/Kelantan/Perlis: sistem pemerintahan beraja, adat istiadat, perundangan, persuratan, kesenian",
    "Kedah dan Kelantan menggunakan gelaran Sultan; Perlis menggunakan gelaran Raja",
    "Hierarki pemerintahan diwarisi: Sultan/Raja (negeri) → Pembesar (jajahan/daerah) → Penghulu (mukim)",
    "Adat Perpatih dibawa Dato' Perpatih Nan Sebatang dari Minangkabau",
    "5 keunikan Adat Perpatih: jurai keturunan sebelah ibu, pelaksanaan hukuman (pemulihan), perkahwinan (luar suku, orang semenda), upacara kedim, wanita mewarisi pusaka",
    "Terdapat 12 suku di Negeri Sembilan",
    "Hierarki Adat Perpatih: Yamtuan Besar → Undang (4: Sungai Ujong/Jelebu/Johol/Rembau) → Lembaga → Buapak → Anak Buah/Ibu Soko",
    "Tanpa Ibu Soko, tiada pelantikan pemimpin adat boleh dilaksanakan pada mana-mana peringkat",
    "3 kumpulan masyarakat Minangkabau: Perut (terkecil), Suku, Luak (terbesar)"
  ],
  keyTerms: [
    "Sistem Pemerintahan Beraja", "Adat Istiadat", "Daulat Tuanku", "Adat Perpatih", "Dato' Perpatih Nan Sebatang",
    "Ibu Soko", "Orang Semenda", "Upacara Kedim", "Teromba", "Perbilangan",
    "Perut", "Suku", "Luak", "Undang Yang Empat", "Lembaga", "Buapak", "Yamtuan Besar"
  ],
  chapterSummary: "Bab 9 mengkaji warisan kerajaan Kedah, Kelantan dan Perlis dalam 5 aspek (pemerintahan beraja, adat istiadat, perundangan, persuratan, kesenian), termasuk salasilah lengkap Raja Perlis dan langkah istiadat pertabalan, serta keunikan Adat Perpatih Negeri Sembilan — sistem matrilineal yang meliputi jurai keturunan sebelah ibu, peraturan perkahwinan luar suku, upacara kedim, pewarisan harta oleh wanita, dan hierarki pemerintahan adat (Yamtuan Besar, Undang, Lembaga, Buapak, Ibu Soko)."
};

export default sej2Ch9Content;
