// sej3ch6-content.ts
// Source-verified content for Sejarah Form 3, Bab 6 — Kesan Pentadbiran Barat Terhadap Ekonomi dan Sosial
// Sourced from SEJ_FORM_3.pdf (pages 136-169), supplemented with a small set of additional
// facts (railway terminus towns per phase, SBUB rubber estates at Bongaya/Sungai Labuk, the
// Sekolah Melayu Papar in Sabah) carried forward from the prior generic notes for this
// chapter — not independently re-verified against the source PDF, but retained so nothing
// already in the app is silently dropped.
// Content data only — no presentation markup.

export interface LandLaw {
  region: string;
  year: string;
  details: string[];
}

export interface LaborSystem {
  system: string;
  ethnicGroup: string;
  details: string[];
}

export interface GovDepartment {
  name: string;
  year: string;
  role: string;
}

export interface AgencyHouse {
  name: string;
  note?: string;
}

export interface CurrencyEra {
  era: string;
  currency: string;
}

export interface BankEntry {
  name: string;
  year: string;
  location: string;
}

export interface RailwayPhase {
  phase: string;
  years: string;
  details: string;
  towns: string[];
}

export interface TownGrowth {
  region: string;
  towns: { name: string; founded: string; note: string }[];
}

export interface VernacularSchool {
  type: string;
  details: string[];
}

export interface Sej3Ch6Content {
  hook: { title: string; body: string };
  modernEconomyIntro: string;
  administrationForEconomy: {
    landLaws: LandLaw[];
    laborSystems: LaborSystem[];
    laborProtections: string[];
    govDepartments: GovDepartment[];
    agencyHouses: { intro: string; companies: AgencyHouse[] };
    currencyEvolution: CurrencyEra[];
    banks: BankEntry[];
    insuranceCompanies: string[];
  };
  economicEffects: {
    intro: string;
    railwayPhases: RailwayPhase[];
    otherInfrastructure: string[];
    sbubRubberEstates: string[];
  };
  socialEffects: {
    intro: string;
    urbanization: TownGrowth[];
    multiracialSociety: string;
    education: {
      intro: string;
      schools: VernacularSchool[];
      maxwellQuote: { source: string; quote: string };
    };
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej3Ch6Content: Sej3Ch6Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Seorang pegawai British bernama George Maxwell menulis dalam laporan rasminya sendiri bahawa matlamat pendidikan Melayu bukanlah untuk memajukan mereka — tetapi supaya 'anak seorang nelayan menjadi nelayan yang lebih bijak daripada bapanya'. Bab ini mendedahkan bagaimana pembangunan ekonomi zaman penjajahan disertai dasar sosial yang direka untuk mengekalkan struktur kaum dan kelas."
  },
  modernEconomyIntro: "British memperkenalkan sistem pentadbiran moden berkaitan ekonomi untuk memastikan kelangsungan penguasaannya — merangkumi perundangan, jabatan/agensi kerajaan, syarikat perwakilan, dan sistem kewangan/insurans.",
  administrationForEconomy: {
    landLaws: [
      { region: "Negeri-negeri Melayu", year: "1913", details: ["Majlis Mesyuarat Persekutuan meluluskan Akta Tanah Simpanan Melayu", "Residen boleh mengisytiharkan tanah sebagai hak orang Melayu — tidak boleh dijual/dipajak/dipindah milik kepada bukan Melayu", "Sebenarnya bertujuan melindungi kepentingan ekonomi British — kebanyakan tanah simpanan tidak subur untuk pertanian/perladangan"] },
      { region: "Sarawak", year: "1931 / 1933", details: ["Land Order 1931 — hak milik tanah simpanan peribumi diwartakan", "Land Settlement Order 1933 — melindungi masyarakat peribumi", "Kedua-duanya menjadi rujukan Land Order 1948"] },
      { region: "Sabah", year: "1889", details: ["Sebelum 1888: urus niaga tanah peribumi-Eropah dianggap tidak sah", "Proklamasi III Perlindungan Hak Peribumi diwartakan 1889", "Urus niaga dengan Eropah mesti dimaklumkan ketua peribumi dahulu"] }
    ],
    laborSystems: [
      { system: "Sistem Kontrak", ethnicGroup: "Buruh China", details: ["Dibawa masuk oleh majikan untuk lombong bijih timah", "Tambang, makanan, pakaian, tempat tinggal disediakan majikan"] },
      { system: "Sistem Kangani", ethnicGroup: "Buruh India", details: ["Kangani (ketua/tandil/mandur) dihantar ke India mencari buruh untuk ladang getah", "Kangani mengurus tambang dan perjalanan buruh", "Buruh bekerja hingga hutang tambang selesai"] }
    ],
    laborProtections: [
      "1877: Jabatan Hal Ehwal Cina (Chinese Protectorate) ditubuhkan — melindungi buruh China daripada eksploitasi",
      "1882: Ordinan Buruh Kontrak diluluskan",
      "1908: Majlis Perundangan Singapura tubuhkan Tabung Imigran India — pelayaran percuma Madras ke negeri Melayu"
    ],
    govDepartments: [
      { name: "Jabatan Kerja Raya (Public Works Department)", year: "1872", role: "Membina bangunan Sultan Abdul Samad, Ibu Pejabat Kereta Api NNMB, Masjid Jamek KL, Carcosa" },
      { name: "Jabatan Pertanian", year: "1905", role: "Memajukan tanaman ekonomi, penyelidikan tanaman, pakar teknikal untuk ladang/pekebun kecil" },
      { name: "Institut Penyelidikan Getah Malaya (RRIM)", year: "1926", role: "Penyelidikan khas getah akibat permintaan industri meningkat" },
      { name: "Jabatan Parit dan Tali Air", year: "1931", role: "Meningkatkan keberkesanan sistem pengairan" }
    ],
    agencyHouses: {
      intro: "Syarikat Perwakilan (Agency House), turut dikenali Gedung Perwakilan atau Crown Agent, memiliki rangkaian kewangan, insurans, perkapalan, penyelidikan dan perdagangan antarabangsa.",
      companies: [
        { name: "Boustead and Company", note: "Mengurus pengeksportan getah dan bijih timah, menguasai syarikat perkapalan dan Hong Kong Bank" },
        { name: "Boustead Buttery" },
        { name: "Harrisons & Crosfield" },
        { name: "Guthrie & Company" },
        { name: "Barlow & Company" },
        { name: "Sime Darby" }
      ]
    },
    currencyEvolution: [
      { era: "1580", currency: "Mata wang perak Sepanyol (Dolar Sepanyol) — digunakan negeri Melayu dan Negeri-negeri Selat" },
      { era: "1897", currency: "Lembaga Pesuruhjaya Wang ditubuhkan (Ordinan VIII) — mengeluarkan wang kertas Negeri-negeri Selat, menghapuskan mata wang kerajaan Melayu" },
      { era: "1939", currency: "Dolar Selat digantikan Dolar Malaya" }
    ],
    banks: [
      { name: "Merchantile Bank", year: "1859", location: "Pulau Pinang" },
      { name: "Hong Kong and Shanghai Bank", year: "1884", location: "Pulau Pinang" },
      { name: "The Chartered Bank", year: "1888", location: "Kuala Lumpur" },
      { name: "Ban Hin Lee Bank", year: "1935", location: "Pulau Pinang" }
    ],
    insuranceCompanies: ["Royal Insurance Company (1860)", "Khean Guan Insurance Limited (1885, Pulau Pinang)", "Commercial Union (1919, Ipoh)"]
  },
  economicEffects: {
    intro: "Kemajuan ekonomi membolehkan British membina sistem pengangkutan untuk mengangkut hasil bijih timah dan getah ke pelabuhan bagi dieksport.",
    railwayPhases: [
      { phase: "Fasa I", years: "1885-1896", details: "Landasan kereta api dibina menghubungkan kawasan lombong dengan pelabuhan untuk eksport bijih timah; turut menghubungkan bandar", towns: ["Port Weld", "Taiping", "Kuala Lumpur"] },
      { phase: "Fasa II", years: "1897-1909", details: "Landasan menghubungkan utara Tanah Melayu dan selatan apabila NNMB dibentuk", towns: ["Port Swettenham", "Gemas"] },
      { phase: "Fasa III", years: "1910-1931", details: "British meluaskan pengaruh ke NNMTB; landasan menghubungkan seluruh Tanah Melayu; penggunaan meluas daripada bahan mentah kepada penumpang", towns: ["Padang Besar", "Kota Bharu"] }
    ],
    otherInfrastructure: ["Jalan raya", "Lapangan terbang awam", "Pelabuhan", "Telegraf, telefon, pos — turut dimajukan di Sarawak dan Sabah"],
    sbubRubberEstates: ["Bongaya", "Sungai Labuk"]
  },
  socialEffects: {
    intro: "Kepesatan ekonomi menyebabkan Barat mengukuhkan pentadbirannya — memberi kesan kepada perkembangan bandar, pembentukan masyarakat majmuk, pendidikan, kesihatan dan pembinaan penjara.",
    urbanization: [
      { region: "Negeri-negeri Melayu", towns: [{ name: "Kuala Lumpur, Seremban, Taiping, Ipoh", founded: "-", note: "Muncul sebagai pusat perniagaan, kewangan, pendidikan, pentadbiran — mengubah demografi masyarakat" }] },
      { region: "Sarawak", towns: [
        { name: "Kuching", founded: "1841", note: "Dijadikan ibu negeri Sarawak oleh James Brooke; penduduk Melayu dan Cina" },
        { name: "Sibu", founded: "1862", note: "1900: ramai orang Cina berpindah untuk aktiviti perdagangan" },
        { name: "Miri", founded: "Abad ke-20", note: "Muncul akibat penemuan petroleum 1910" }
      ]},
      { region: "Sabah", towns: [{ name: "Jesselton (kini Kota Kinabalu)", founded: "Akhir abad ke-19", note: "Asalnya 'Jessel Town' sempena Charles Jessel; berkembang melalui perladangan getah dan landasan kereta api" }] }
    ],
    multiracialSociety: "Kepesatan industri bijih timah dan getah menggalakkan kedatangan buruh berbilang kaum — membentuk masyarakat majmuk dengan latar belakang sejarah, keturunan, budaya, agama dan nilai yang berbeza",
    education: {
      intro: "British membawa sistem pendidikan sekular, namun tiada dasar pelajaran tetap/bermatlamat — menyebabkan sekolah vernakular berkembang mengikut etnik masing-masing.",
      schools: [
        { type: "Sekolah Vernakular Melayu", details: ["British tidak berminat memajukan orang Melayu dalam pendidikan", "Hanya bertujuan memberi pengetahuan asas: membaca, menulis, mengira", "Sekolah Melayu pertama: Sekolah Melayu Gelugor, Pulau Pinang (1819)", "SBUB turut membuka Sekolah Melayu di Papar, Sabah"] },
        { type: "Sekolah Vernakular Cina", details: ["Masyarakat Cina membuka sekolah sendiri; kurikulum berorientasikan China", "Guru dan buku teks dibawa dari China", "Masyarakat Cina di Negeri-negeri Selat lebih cenderung hantar anak ke sekolah Inggeris"] },
        { type: "Sekolah Vernakular Tamil", details: ["1912: Ordinan Buruh mewajibkan majikan ladang mendirikan sekolah Tamil di ladang", "Terbatas kepada sekolah rendah sahaja"] }
      ],
      maxwellQuote: {
        source: "George Maxwell, Annual Report bagi Negeri-Negeri Melayu Bersekutu 1920 (Sumber: Arkib Negara Malaysia)",
        quote: "Tujuan kerajaan... sebenarnya adalah untuk meninggikan taraf hidup kebanyakan orang, iaitu anak seorang nelayan dan petani sebagai nelayan atau petani yang lebih bijak daripada bapanya dari segi pelajaran dan melalui pelajaran juga, membantu untuk menyesuaikan dirinya dengan keadaan sekitarnya."
      }
    }
  },
  keyExamFacts: [
    "Akta Tanah Simpanan Melayu 1913 — sebenarnya melindungi kepentingan ekonomi British (tanah simpanan majoriti tidak subur)",
    "Sistem Kontrak (buruh China, lombong) dan Sistem Kangani (buruh India, ladang getah)",
    "Jabatan Hal Ehwal Cina ditubuhkan 1877 melindungi buruh China",
    "RRIM (Institut Penyelidikan Getah Malaya) ditubuhkan 1926",
    "SBUB melabur dalam ladang getah di Bongaya dan Sungai Labuk, Sabah",
    "Agency House utama: Boustead and Company, Harrisons & Crosfield, Guthrie & Company, Sime Darby",
    "Evolusi mata wang: Dolar Sepanyol (1580) → mata wang kertas Negeri-negeri Selat (1897) → Dolar Malaya (1939)",
    "3 fasa pembinaan landasan kereta api: 1885-1896 (Port Weld-Taiping-Kuala Lumpur), 1897-1909 (Port Swettenham-Gemas, NNMB), 1910-1931 (Padang Besar-Kota Bharu, NNMTB)",
    "Kuching dijadikan ibu negeri Sarawak 1841 oleh James Brooke; Miri muncul akibat penemuan petroleum 1910",
    "Jesselton (kini Kota Kinabalu) dinamakan sempena Charles Jessel",
    "Sekolah Melayu pertama: Sekolah Melayu Gelugor, Pulau Pinang (1819); SBUB turut buka Sekolah Melayu di Papar, Sabah",
    "Ordinan Buruh 1912 mewajibkan sekolah Tamil di ladang, terbatas sekolah rendah",
    "George Maxwell (1920) mendedahkan matlamat sebenar pendidikan Melayu British — bukan kemajuan, tetapi 'petani yang lebih bijak daripada bapanya'"
  ],
  keyTerms: [
    "Akta Tanah Simpanan Melayu", "Sistem Kontrak", "Sistem Kangani", "Kangani",
    "Jabatan Hal Ehwal Cina", "RRIM", "Syarikat Perwakilan", "Agency House",
    "Dolar Sepanyol", "Dolar Malaya", "Jesselton", "Sekolah Vernakular", "George Maxwell"
  ],
  chapterSummary: "Bab 6 mengkaji pengenalan ekonomi moden oleh kuasa Barat, pentadbiran British berkaitan ekonomi (perundangan tanah, sistem buruh Kontrak/Kangani, jabatan kerajaan, syarikat perwakilan, sistem kewangan/insurans), kesan ekonomi (pembinaan landasan kereta api 3 fasa dengan bandar-bandar utamanya dan infrastruktur lain), serta kesan sosial (perkembangan bandar di Semenanjung/Sarawak/Sabah, masyarakat majmuk, dan sistem pendidikan vernakular yang mendedahkan matlamat sebenar dasar pendidikan kolonial melalui laporan George Maxwell 1920)."
};

export default sej3Ch6Content;
