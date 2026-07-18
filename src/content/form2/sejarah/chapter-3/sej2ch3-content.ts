// sej2ch3-content.ts
// Source-verified content for Sejarah Form 2, Bab 3 — Sosiobudaya Masyarakat Kerajaan Alam Melayu
// Sourced from T2_BT_SEJ.pdf (pages 38-51)
// Content data only — no presentation markup.

export interface KingdomLanguage {
  kingdom: string;
  languages: string[];
  writingSystems: string[];
  evidence: string;
}

export interface KingdomLiterature {
  kingdom: string;
  evidence: string;
  famousWorks: string[];
}

export interface KingdomArchitecture {
  kingdom: string;
  structures: string[];
  highlights: string[];
}

export interface SocialClass {
  className: string;
  rank: string;
  composition: string[];
  role: string;
}

export interface Sej2Ch3Content {
  hook: { title: string; body: string };
  languageWriting: {
    intro: string;
    byKingdom: KingdomLanguage[];
    talangTuwoInscription: { context: string; translation: string };
    education: { formal: string; informal: string };
  };
  literature: {
    intro: string;
    oralTraditionThemes: string[];
    byKingdom: KingdomLiterature[];
    indianInfluence: { epics: string[]; localAdaptation: string };
    islamicInfluence: { forms: string[]; propheticWorks: string[]; heroicWorks: string[] };
  };
  architecture: {
    intro: string;
    byKingdom: KingdomArchitecture[];
    borobudurFact: string;
  };
  socialStructure: {
    intro: string;
    classes: SocialClass[];
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej2Ch3Content: Sej2Ch3Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Batu bersurat Talang Tuwo masih menyimpan doa seorang raja Srivijaya dari 1,300 tahun lalu — dan kita masih boleh membacanya hari ini. Bab ini menunjukkan bagaimana bahasa, tulisan, karya sastera dan seni bina menjadi bukti kebijaksanaan tamadun Alam Melayu yang bertahan hingga kini."
  },
  languageWriting: {
    intro: "Perkembangan bahasa berkait rapat dengan perkembangan sistem tulisan. Sifat keterbukaan masyarakat kerajaan Alam Melayu membolehkan sistem tulisan berkembang dalam pelbagai kerajaan.",
    byKingdom: [
      { kingdom: "Kerajaan Funan", languages: ["Sanskrit (bahasa utama)"], writingSystems: ["Berasaskan tulisan orang Hu (tulisan India)"], evidence: "Batu bersurat Funan bertarikh abad kedua; turut menggunakan kalendar Saka dari India (diperkenalkan Raja Kanishka, Dinasti Kushan, 78 M)" },
      { kingdom: "Kerajaan Champa", languages: ["Bahasa Melayu Champa", "Bahasa Sanskrit"], writingSystems: ["Tulisan Palava", "Tulisan Champa Kuno", "Tulisan Jawi (selepas Islam tersebar abad kelapan)"], evidence: "Batu bersurat tertua berbahasa Melayu Champa bertarikh abad keempat; inskripsi Palava bertarikh abad keenam oleh Raja Sambhuvarman" },
      { kingdom: "Kerajaan Srivijaya", languages: ["Bahasa Melayu (dipengaruhi Sanskrit)"], writingSystems: ["Tulisan Palava"], evidence: "Batu bersurat Kedukan Bukit, Kota Kapur, Telaga Batu dan Talang Tuwo di Sumatera, bertarikh abad ketujuh" },
      { kingdom: "Kerajaan Angkor", languages: ["Bahasa Sanskrit", "Bahasa Khmer"], writingSystems: ["Tulisan Palava", "Tulisan Khmer"], evidence: "Inskripsi pada dinding candi" },
      { kingdom: "Kerajaan Majapahit", languages: ["Bahasa Jawa Kuno"], writingSystems: ["Tulisan Kawi", "Tulisan Pegon (huruf Arab untuk bahasa Jawa, selepas Islam tersebar)"], evidence: "Inskripsi dan persuratan bertarikh abad ke-14" },
      { kingdom: "Kerajaan Kedah Tua", languages: ["Bahasa Sanskrit"], writingSystems: ["Tulisan Palava"], evidence: "Batu bersurat di Sungai Mas dan Cherok Tok Kun, bertarikh abad kelima" }
    ],
    talangTuwoInscription: {
      context: "Batu bersurat Talang Tuwo, Sumatera, bertarikh abad ketujuh (Tahun Saka 606)",
      translation: "Pada tahun Saka 606, taman yang dinamakan Sriksetra dibuka di bawah pimpinan Baginda Sri Jayanasa. Niat baginda, semoga yang ditanam di sini — seperti pokok kelapa, pinang, nipah, sagu dan pelbagai pokok buah-buahan — dapat dimakan hasilnya."
    },
    education: {
      formal: "Golongan pemerintah (raja, kerabat, bangsawan) menerima pendidikan formal di istana, melahirkan golongan bijak pandai dan pujangga istana yang menghasilkan karya batu bersurat dan manuskrip",
      informal: "Golongan diperintah (rakyat) menerima pendidikan tidak formal — ilmu ubat-ubatan, petua bercucuk tanam, ilmu pertukangan dan persenjataan, serta adat resam"
    }
  },
  literature: {
    intro: "Sebelum sistem tulisan digunakan meluas, masyarakat kerajaan Alam Melayu terkenal dengan tradisi lisan berdasarkan alam sekeliling. Apabila sistem tulisan lahir, persuratan berkembang sebagai bukti keintelektualan masyarakat.",
    oralTraditionThemes: ["Asal-usul", "Binatang", "Nasihat", "Seloka", "Teladan", "Adat"],
    byKingdom: [
      { kingdom: "Kerajaan Funan", evidence: "Batu bersurat terawal di Alam Melayu, bertarikh abad kedua", famousWorks: [] },
      { kingdom: "Kerajaan Champa", evidence: "Batu bersurat tertua di Kauthara (192 M); 206 batu bersurat ditemukan; manuskrip sejak abad ke-13", famousWorks: ["Akayet Inra Patra", "Akayet Deva Mano"] },
      { kingdom: "Kerajaan Srivijaya", evidence: "Batu bersurat Karang Brahi (686 M) dan Palas Pasemah (abad ketujuh) — memerihalkan pengukuhan kerajaan dan kepentingan taat setia", famousWorks: [] },
      { kingdom: "Kerajaan Angkor", evidence: "Batu bersurat Sdok Kok Thom (barat laut Kemboja) mengisahkan pemerintahan Jayavarman II; inskripsi dinding candi menggambarkan keagamaan dan pemerintahan", famousWorks: [] },
      { kingdom: "Kerajaan Majapahit", evidence: "Batu bersurat Trowulan (1358) dalam bahasa Jawa Kuno bertulisan Kawi", famousWorks: ["Nagarakertagama (Prapanca, 1365)", "Pararaton", "Tantu Panggelaran"] },
      { kingdom: "Kerajaan Kedah Tua", evidence: "Batu bersurat di Bukit Choras dan Bukit Meriam (abad kelima); inskripsi pada pinggan tanah liat, kepingan emas dan perak, menyentuh doa dan amalan agama Buddha", famousWorks: [] }
    ],
    indianInfluence: {
      epics: ["Ramayana", "Mahabharata", "Purana", "Jataka"],
      localAdaptation: "Disadurkan ke dalam bahasa tempatan Alam Melayu — contohnya Hikayat Seri Rama, saduran daripada Ramayana"
    },
    islamicInfluence: {
      forms: ["Syair", "Gurindam", "Cerita hikayat", "Nazam"],
      propheticWorks: ["Hikayat Nabi Bercukur", "Hikayat Nabi Wafat", "Hikayat Bulan Berbelah", "Hikayat Nabi Yusof"],
      heroicWorks: ["Hikayat Amir Hamzah", "Hikayat Iskandar Zulkarnain", "Hikayat Muhammad Ali Hanafiah"]
    }
  },
  architecture: {
    intro: "Kecemerlangan masyarakat kerajaan Alam Melayu dapat dilihat melalui hasil seni bina mereka — candi, perkapalan dan sistem pengairan.",
    byKingdom: [
      { kingdom: "Kerajaan Funan", structures: ["Candi Go Cay Thi (Oc Eo)", "Sistem pengairan"], highlights: ["Kapal besar memuatkan 700 orang dan 1,000 tan kargo", "Perahu panjang membawa 100 penumpang", "Sistem pengairan mengawal limpahan air dan mengalirkan air masin keluar dari tanah pertanian"] },
      { kingdom: "Kerajaan Champa", structures: ["Kompleks candi Lembah Mi Son", "Dong Duong", "Po Nagar"], highlights: [] },
      { kingdom: "Kerajaan Srivijaya", structures: ["Candi Muara Takus", "Candi Muara Jambi"], highlights: ["Palembang menjadi pusat binaan kapal Melayu besar (Kun-lun-po) yang belayar hingga Tonkin dan tenggara China"] },
      { kingdom: "Kerajaan Angkor", structures: ["Angkor Wat (dibina Suryavarman II, abad ke-12, keluasan 208 hektar, menara utama 65m)", "Angkor Thom", "Baray (2 x 8 km, menampung 30 juta meter padu air)"], highlights: ["Kapal untuk perdagangan dan peperangan"] },
      { kingdom: "Kerajaan Majapahit", structures: ["Candi Tikus (Jawa Timur)", "Candi Cetho (Jawa Tengah)", "Gapura Wringin Lawang (pintu gerbang laluan raja)", "Gapura Bajang Ratu (pintu masuk bangunan suci)"], highlights: [] },
      { kingdom: "Kerajaan Kedah Tua", structures: ["Candi Buddha: Bukit Choras, Bukit Pendiat, Bukit Meriam", "Candi Hindu: Bukit Batu Pahat, Bendang Dalam (pengaruh Cola, India)"], highlights: ["Arca Hindu dan Buddha turut ditemukan"] },
      { kingdom: "Kerajaan Gangga Nagara", structures: ["Patung Buddha gangsa setinggi 18 meter di Tanjung Rambutan", "Patung Buddha lain di Sungai Siput dan Pangkalan"], highlights: ["Seni bina arca menerima pengaruh kerajaan Gupta, India"] }
    ],
    borobudurFact: "Candi Borobudur (Magelang, Jawa Tengah) — candi Buddha terbesar di dunia, dibina abad kesembilan semasa kerajaan Sailendra, berbentuk gunung bersegi-segi dengan 72 patung Buddha di dalam stupa pada puncaknya"
  },
  socialStructure: {
    intro: "Masyarakat kerajaan Alam Melayu terikat dengan struktur sosial yang hampir sama — kelas atasan (golongan pemerintah) dan kelas bawahan (golongan diperintah).",
    classes: [
      { className: "Golongan Diraja", rank: "Status tertinggi", composition: ["Raja", "Permaisuri", "Putera", "Puteri", "Adik-beradik", "Ibu bapa", "Ahli keluarga"], role: "Memerintah dan memimpin kerajaan" },
      { className: "Bangsawan", rank: "Golongan pemerintah", composition: ["Pembesar", "Ilmuwan", "Golongan agama", "Pujangga", "Pendeta istana"], role: "Mendukung sistem pentadbiran kerajaan" },
      { className: "Rakyat Merdeka", rank: "Golongan diperintah", composition: ["Pekerja istana", "Askar", "Petani", "Penternak", "Pedagang", "Nelayan", "Artisan"], role: "Mengukuhkan sistem beraja melalui taat setia dan menjana ekonomi kerajaan" },
      { className: "Hamba", rank: "Golongan diperintah (paling bawah)", composition: ["Tawanan perang", "Hamba berhutang", "Rela menjadi hamba"], role: "Berkhidmat dalam sektor sosioekonomi, meningkatkan status pemiliknya" }
    ]
  },
  keyExamFacts: [
    "Setiap kerajaan Alam Melayu mempunyai bahasa dan tulisan tersendiri — Funan (Sanskrit), Champa (Melayu Champa/Sanskrit, tulisan Palava/Jawi), Srivijaya (Melayu, tulisan Palava), Angkor (Sanskrit/Khmer), Majapahit (Jawa Kuno, tulisan Kawi/Pegon), Kedah Tua (Sanskrit, tulisan Palava)",
    "Kalendar Saka diperkenalkan Raja Kanishka (Dinasti Kushan) pada 78 M, mengandungi 12 bulan setahun",
    "Batu bersurat Talang Tuwo (abad ketujuh) merekodkan doa Sri Jayanasa semasa membuka taman Sriksetra",
    "Karya sastera termasyhur: Akayet Inra Patra/Deva Mano (Champa), Nagarakertagama oleh Prapanca 1365 (Majapahit)",
    "Persuratan Melayu dipengaruhi epik India (Ramayana, Mahabharata) dan sastera Islam (syair, gurindam, hikayat, nazam)",
    "Angkor Wat dibina Suryavarman II (abad ke-12), keluasan 208 hektar, menara 65 meter",
    "Candi Borobudur ialah candi Buddha terbesar di dunia, dibina abad kesembilan (Kerajaan Sailendra)",
    "Struktur sosial 4 lapisan: Golongan Diraja → Bangsawan → Rakyat Merdeka → Hamba"
  ],
  keyTerms: [
    "Tulisan Palava", "Tulisan Khmer", "Tulisan Kawi", "Tulisan Pegon", "Tulisan Jawi", "Kalendar Saka",
    "Batu bersurat", "Persuratan", "Saduran", "Syair", "Gurindam", "Nazam", "Baray",
    "Golongan Diraja", "Bangsawan", "Rakyat Merdeka", "Hamba"
  ],
  chapterSummary: "Bab 3 merangkumi bahasa dan tulisan tersendiri setiap kerajaan Alam Melayu (termasuk inskripsi Talang Tuwo), persuratan (tradisi lisan, karya sastera termasyhur, pengaruh India dan Islam), seni bina (candi, perkapalan, sistem pengairan bagi setiap kerajaan termasuk Angkor Wat dan Candi Borobudur), serta struktur sosial 4 lapisan (Golongan Diraja, Bangsawan, Rakyat Merdeka, Hamba)."
};
