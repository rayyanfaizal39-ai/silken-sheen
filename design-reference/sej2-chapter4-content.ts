// sej2-chapter4-content.ts
// Source-verified content for Sejarah Form 2, Bab 4 — Agama, Kepercayaan dan Keunikan Warisan Masyarakat Kerajaan Alam Melayu
// Sourced from T2_BT_SEJ.pdf (pages 54-67)
// Content data only — no presentation markup.

export interface KingdomReligion {
  kingdom: string;
  religiousDevelopment: string[];
  evidence: string[];
}

export interface DiplomaticExample {
  type: string;
  example: string;
}

export interface PortType {
  type: string;
  definition: string;
}

export interface Sej2Ch4Content {
  hook: { title: string; body: string };
  earlyBeliefs: {
    intro: string;
    animism: string;
    dynamism: string;
  };
  religionSpread: {
    intro: string;
    islamArrival: string;
    byKingdom: KingdomReligion[];
    pasaiFact: string;
  };
  heritageIntro: string;
  governanceHeritage: {
    intro: string;
    kingSelection: string[];
    kingPosition: string[];
    titles: string[];
  };
  wiseLeadership: {
    locationChoice: string[];
    diplomaticRelations: DiplomaticExample[];
  };
  economicHeritage: {
    soilFertility: string;
    irrigation: string;
    ports: PortType[];
  };
  socioculturalHeritage: {
    writingLanguage: string;
    literature: string;
    architecture: string;
  };
  religiousPracticeHeritage: {
    openness: string;
    tolerance: string;
    religionAsUnifyingSymbol: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej2Ch4Content: Sej2Ch4Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Candi Hindu Prambanan dibina bersebelahan Candi Buddha Borobudur — bukan sebagai pertembungan, tetapi sebagai bukti toleransi. Bab ini menunjukkan bagaimana kerajaan Alam Melayu menyerap animisme, Hindu, Buddha dan Islam menjadi satu warisan yang unik dan bertahan hingga hari ini."
  },
  earlyBeliefs: {
    intro: "Agama merupakan sistem berkaitan anutan, keimanan dan penyembahan terhadap tuhan. Kepercayaan pula merupakan pegangan yang diyakini dapat menjadi panduan dalam kehidupan.",
    animism: "Kepercayaan bahawa setiap makhluk, hidupan dan tumbuhan memiliki roh atau semangat — berkait dengan penyembahan roh nenek moyang (hyang) yang telah meninggal dunia, penting untuk memastikan keluarga yang masih hidup mendapat kebaikan",
    dynamism: "Kepercayaan terhadap kekuatan yang dikenali sebagai mana atau semangat — setiap benda dan makhluk dianggap mempunyai mana yang boleh mempengaruhi kehidupan, contohnya upacara pemujaan semangat tanaman untuk hasil yang subur"
  },
  religionSpread: {
    intro: "Agama Hindu dan Buddha tersebar sebelum Masihi, mempengaruhi Funan, Champa, Srivijaya, Angkor, Majapahit, Kedah Tua dan Gangga Nagara. Penyebaran berkait rapat dengan peranan mubaligh, pemerintah dan perdagangan antarabangsa.",
    islamArrival: "Agama Islam tiba di Alam Melayu mulai abad ketujuh, tersebar dan diamalkan dalam kerajaan seperti Champa, Majapahit, Kedah dan Pasai",
    byKingdom: [
      { kingdom: "Kerajaan Funan", religiousDevelopment: ["Hindu dan Buddha tersebar sejak abad pertama", "Fan Shih-man memainkan peranan besar dalam perkembangan Buddha"], evidence: ["Candi Go Cay Thi"] },
      { kingdom: "Kerajaan Champa", religiousDevelopment: ["Hindu tersebar sejak abad keempat (Bhadravarman), mendirikan candi Siva-Bhadresvara di Lembah Mi Son", "Buddha tersebar melalui Candi Dong Duong", "Islam tersebar luas semasa Sultan Zainal Abidin (abad ke-14)"], evidence: ["Batu bersurat 1035", "Batu nisan 1039 di Panduranga"] },
      { kingdom: "Kerajaan Srivijaya", religiousDevelopment: ["Pusat kegiatan agama Buddha sejak abad ketujuh", "Pendeta Buddha I-Tsing dari China datang mempelajari bahasa Sanskrit dan menterjemah kitab Buddha"], evidence: ["Candi Muara Jambi", "Candi Bahal", "Candi Muara Takus"] },
      { kingdom: "Kerajaan Angkor", religiousDevelopment: ["Hindu anutan utama sejak diasaskan, gemilang semasa Suryavarman II (Angkor Wat)", "Buddha mengambil alih semasa Jayavarman VII (abad ke-12)"], evidence: ["Angkor Wat"] },
      { kingdom: "Kerajaan Majapahit", religiousDevelopment: ["Hindu dan Buddha berkembang serentak; Hayam Wuruk menyatukan kedua aliran (Tripaksa, abad ke-14)", "Islam tersebar sejak abad ke-14 — Wu Ping (wakil Ming beragama Islam), Gan Eng Chou (ketua kaum Cina Islam di Tuban)", "Selepas Majapahit runtuh, Demak menjadi pusat pengajian Islam terbesar di Jawa (abad ke-16)"], evidence: ["Candi Jabong", "Candi Sukuh", "Candi Brahu", "Masjid Demak"] },
      { kingdom: "Kerajaan Kedah Tua", religiousDevelopment: ["Buddha diamalkan sejak abad kelima, anutan utama; Hindu tersebar kemudian", "Islam diterima abad ke-12; Maharaja Derbar Raja II (pemerintah kesembilan) memeluk Islam pada 1136"], evidence: [] },
      { kingdom: "Kerajaan Gangga Nagara", religiousDevelopment: ["Menganut agama Buddha"], evidence: ["Arca-arca Buddha di Lembah Kinta", "Patung Buddha Avalokitesvara di Bidor, Perak (abad keenam-kesembilan)"] }
    ],
    pasaiFact: "Islam berkembang pesat di Pasai pada abad ke-13; pemerintah Pasai, Merah Silu, memeluk Islam dan bergelar Sultan Malik al-Saleh — pengaruhnya diwarisi kerajaan-kerajaan lain di Alam Melayu"
  },
  heritageIntro: "Keunikan warisan bermaksud legasi kebijaksanaan dan keunggulan yang ditinggalkan oleh pemerintah terdahulu untuk diwarisi generasi seterusnya — merangkumi sistem pemerintahan beraja, kebijaksanaan pemerintah, kegiatan ekonomi, sosiobudaya dan amalan beragama.",
  governanceHeritage: {
    intro: "Keunikan warisan sistem pemerintahan dapat dilihat apabila pemerintah mengasimilasikan pengaruh agama dalam pentadbiran.",
    kingSelection: ["Berasaskan keturunan, disahkan pembesar", "Keturunan diraja dianggap suci dan berdaulat", "Boleh dipilih daripada golongan tentera (Funan, Champa)", "Wanita keturunan diraja boleh dilantik sebagai pemerintah (Majapahit)"],
    kingPosition: ["Semasa pengaruh Hindu/Buddha, raja dianggap titisan dewa", "Kedatangan Islam memperkenalkan konsep khalifah", "Mengingkari raja dianggap mengingkari tuhan (menderhaka)"],
    titles: ["Pengaruh Hindu/Buddha memasyhurkan gelaran Raja dan Maharaja", "Gelaran Sultan digunakan selepas kedatangan Islam", "Gelaran menggambarkan kebesaran kuasa: Raja di Gunung, Maharaja di Pulau", "Raja Funan, Champa, Angkor dan Srivijaya menggunakan gelaran Sanskrit 'varman'"]
  },
  wiseLeadership: {
    locationChoice: ["Memilih lokasi strategik di pesisiran pantai atau lembah sungai", "Mengembangkan pertanian di kawasan subur (Angkor, Majapahit)", "Memilih laluan antarabangsa timur-barat (Oc Eo di Funan, Palembang di Srivijaya)", "Mengambil kira petunjuk arah seperti Gunung Jerai (mercu tanda Kedah)"],
    diplomaticRelations: [
      { type: "Hubungan persahabatan", example: "Srivijaya menghantar utusan ke China (abad ketujuh); Majapahit menjalin persahabatan dengan China (abad ke-14)" },
      { type: "Bantuan ketenteraan", example: "Maharaja Chola dari India menghantar bantuan tentera ke Srivijaya untuk pemberontakan (abad ke-11)" },
      { type: "Perkahwinan diraja", example: "Raden Wijaya (Majapahit) berkahwin dengan puteri kerajaan Singhasari (abad ke-13)" }
    ]
  },
  economicHeritage: {
    soilFertility: "Lembah Sungai Mekong, Musi, Bengawan Solo dan Brantas menjadi tapak pertanian penting yang diwarisi dari zaman ke zaman",
    irrigation: "Kemahiran mencipta baray dan sistem saliran memastikan bekalan air mencukupi untuk padi dan rempah sepanjang tahun",
    ports: [
      { type: "Pelabuhan Pembekal", definition: "Pelabuhan persinggahan untuk membekalkan bahan dagangan dan bekalan makanan kepada pedagang" },
      { type: "Pelabuhan Kerajaan", definition: "Pelabuhan pembekal yang berkembang apabila wujud pusat pentadbiran/kerajaan di situ" },
      { type: "Pelabuhan Entrepot", definition: "Tumpuan pedagang, berperanan sebagai pengumpul, pengendali dan pengedar barang dagangan serantau dan antarabangsa" }
    ]
  },
  socioculturalHeritage: {
    writingLanguage: "Tulisan Palava dan Kawi dari India digunakan meluas sebagai medium tulisan bahasa tempatan dan Sanskrit; huruf Arab disesuaikan membentuk tulisan Jawi — warisan sistem tulisan Melayu hingga kini",
    literature: "Kegiatan persuratan berkembang daripada batu bersurat kepada karya manuskrip — bukti keintelektualan yang diwarisi dan diteruskan oleh kerajaan-kerajaan Melayu",
    architecture: "Kemahiran seni bina dihasilkan untuk memudahkan pertanian, pelayaran, perdagangan dan keagamaan — kehidupan di persisiran pantai dan lembah sungai melahirkan tukang kapal yang handal"
  },
  religiousPracticeHeritage: {
    openness: "Masyarakat mengamalkan sifat terbuka — kepercayaan awal disesuaikan dengan Hindu/Buddha, dan Islam tersebar secara aman; sebahagian masyarakat Champa dan Angkor menganut Hindu, sebahagian lain Buddha pada masa yang sama",
    tolerance: "Candi Prambanan (Hindu) dibina berdekatan Candi Borobudur (Buddha) di Jawa Tengah — bukti toleransi beragama",
    religionAsUnifyingSymbol: "Golongan Brahmin memainkan peranan besar dalam pertabalan raja — contohnya Jayavarman II diisytiharkan sebagai Dewaraja oleh Brahmin Hiranyadama. Golongan agama turut dilantik sebagai pentadbir dan penasihat di Funan, Srivijaya dan Angkor"
  },
  keyExamFacts: [
    "Kepercayaan awal Alam Melayu ialah animisme (roh/semangat, penyembahan hyang) dan dinamisme (mana/kekuatan)",
    "Hindu dan Buddha tersebar sebelum Masihi; Islam tiba mulai abad ketujuh",
    "Maharaja Derbar Raja II (Kedah Tua) memeluk Islam pada 1136",
    "Merah Silu (Pasai) memeluk Islam, bergelar Sultan Malik al-Saleh, abad ke-13",
    "Masjid Demak menjadi pusat pengajian Islam terbesar di Jawa (abad ke-16)",
    "Gelaran Sanskrit 'varman' digunakan raja Funan, Champa, Angkor dan Srivijaya",
    "3 jenis pelabuhan: Pembekal, Kerajaan, Entrepot",
    "Candi Prambanan (Hindu) dan Candi Borobudur (Buddha) dibina berdekatan — bukti toleransi beragama",
    "Jayavarman II diisytiharkan sebagai Dewaraja oleh Brahmin Hiranyadama"
  ],
  keyTerms: [
    "Animisme", "Dinamisme", "Hyang", "Mana", "Khalifah", "Asimilasi", "Varman",
    "Pelabuhan Pembekal", "Pelabuhan Kerajaan", "Pelabuhan Entrepot", "Tripaksa", "Dewaraja"
  ],
  chapterSummary: "Bab 4 merangkumi kepercayaan awal (animisme, dinamisme), penyebaran agama Hindu, Buddha dan Islam merentas 7 kerajaan Alam Melayu sebelum abad ke-15, serta keunikan warisan dalam 5 aspek — sistem pemerintahan beraja, kebijaksanaan pemerintah (lokasi strategik, hubungan diplomatik), kegiatan ekonomi (kesuburan tanah, pengairan, 3 jenis pelabuhan), sosiobudaya (tulisan/bahasa, persuratan, seni bina), dan amalan beragama (keterbukaan, toleransi, agama sebagai simbol penyatuan)."
};

export default sej2Ch4Content;
