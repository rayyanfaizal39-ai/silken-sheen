// sej2-chapter6-content.ts
// Source-verified content for Sejarah Form 2, Bab 6 — Kesultanan Johor Riau
// Sourced from T2_BT_SEJ.pdf (pages 96-113)
// Content data only — no presentation markup.

export interface CapitalRelocation {
  location: string;
  year: string;
  reason: string;
}

export interface Challenge {
  name: string;
  description: string;
  outcome: string;
}

export interface TradeGood {
  good: string;
  origin: string;
}

export interface Sej2Ch6Content {
  hook: { title: string; body: string };
  founding: {
    founder: string;
    title: string;
    reignYears: string;
    parentage: string;
    capitals: CapitalRelocation[];
    dynastyNote: string;
  };
  challenges: Challenge[];
  strategies: string[];
  goldenAge: {
    intro: string;
    strategicAdvantages: string[];
    tradersOrigin: { origin: string; note: string }[];
    tradeGoods: TradeGood[];
    portOperations: {
      shipCount: string;
      facilities: string[];
      currency: { name: string; material: string }[];
      syahbandarRole: string;
    };
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej2Ch6Content: Sej2Ch6Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Selepas Melaka jatuh pada 1511, warisannya tidak lenyap — ia berpindah ke Johor Riau, yang terpaksa memindahkan pusat pemerintahannya empat kali dan mengalahkan perebut takhta bersenjatakan tentera Bugis, sebelum muncul sebagai pelabuhan entrepot yang disinggahi 500-600 kapal serentak."
  },
  founding: {
    founder: "Raja Ali, putera Sultan Mahmud Shah dan Tun Fatimah",
    title: "Sultan Alauddin Riayat Shah I",
    reignYears: "1528-1564",
    parentage: "Waris Kesultanan Melayu Melaka — mewarisi sistem pemerintahan, pentadbiran serta wilayah jajahan takluk dan naungan Melaka",
    capitals: [
      { location: "Kota Kara, Pekan Tua", year: "1528", reason: "Berhampiran sungai lebar dan dalam; kawasan berbukit-bukau menjadi benteng pertahanan" },
      { location: "Kota Sayong, Sayong Pinang", year: "Selepas 1535", reason: "Kota Kara diserang dan dimusnahkan Portugis (1535); kapal perang musuh sukar melintasi sungai yang sempit" },
      { location: "Kota Batu, Johor Lama (Tanjung Batu)", year: "1540", reason: "Kedudukan strategik di Sungai Johor yang lebar dan dalam memudahkan kemasukan kapal dagang" }
    ],
    dynastyNote: "1528-1699: diperintah waris berketurunan Kesultanan Melayu Melaka. 1699-1824: diteruskan sultan berketurunan Bendahara Johor. Turut dikenali sebagai Kesultanan Johor Riau Lingga kerana Lingga menjadi pusat pemerintahan semasa Sultan Abdullah Ma'ayat Shah (1615-1623), Sultan Abdul Jalil Rahmat Shah (1718-1722) dan Sultan Mahmud Shah II (1761-1812)"
  },
  challenges: [
    { name: "Persaingan Johor-Acheh-Portugis (Perang Tiga Segi / Perang Seratus Tahun)", description: "Johor menyerang Portugis di Melaka untuk merampas semula Melaka; Acheh menyerang Johor kerana pakatan Johor-Belanda mengancam perdagangan Acheh; Portugis menyerang Acheh kerana hendak menguasai perdagangan Acheh", outcome: "Berakhir apabila Johor membantu Belanda mengalahkan Portugis dan menguasai Melaka pada 1641; Acheh merosot selepas kemangkatan Sultan Iskandar Thani" },
    { name: "Perang Johor-Jambi", description: "Johor menuntut wilayah Tungkal daripada Jambi; krisis dan peperangan berlaku 1659-1679", outcome: "Johor menyerang Jambi pada Jun 1679; Jambi tewas dan tunduk di bawah kuasa Kesultanan Johor Riau yang berpusat di Riau" },
    { name: "Konflik Pembesar", description: "Konflik antara Bendahara Tun Habib Abdul Majid dengan Laksamana Tun Abdul Jamil untuk menguasai pemerintahan", outcome: "Laksamana Tun Abdul Jamil berundur ke Terengganu; keturunan Bendahara kembali berpengaruh — Tun Habib (Bendahara Padang Saujana) digantikan anaknya Tun Abdul Jalil" },
    { name: "Ancaman Raja Kechil", description: "Raja Kechil menyerang Johor (1718), mendakwa diri putera Sultan Mahmud Shah I (Sultan Mahmud Mangkat Dijulang) dan mengisytiharkan diri Sultan Abdul Jalil Rahmat Shah; Raja Sulaiman meminta bantuan Opu Bugis Lima Bersaudara", outcome: "Raja Kechil dikalahkan 4 Oktober 1722; Raja Sulaiman ditabalkan sebagai Sultan Sulaiman Badrul Alam Shah (1722-1760); Daeng Merewah dilantik Yamtuan Muda Bugis pertama di Johor" }
  ],
  strategies: ["Memindahkan pusat pemerintahan (keperluan strategi ketenteraan dan pertahanan)", "Membina kota pertahanan", "Menjalinkan hubungan persahabatan dengan Belanda"],
  goldenAge: {
    intro: "Kesultanan Johor Riau mencapai kegemilangan dalam aspek perdagangan dan persuratan Melayu pada abad ke-16 dan ke-17, menghidupkan kembali tradisi perdagangan dengan Arab, India dan China.",
    strategicAdvantages: [
      "Pelabuhan Johor Lama, Batu Sawar dan Panchor mudah dimudiki kapal besar kerana Sungai Johor yang lebar dan dalam",
      "Lokasi di kawasan selatan Selat Melaka membolehkan kawalan lalu lintas kapal dagang Timur-Barat",
      "Pelabuhan Riau di persimpangan lalu lintas maritim strategik menjadi tumpuan pedagang luar"
    ],
    tradersOrigin: [
      { origin: "China, Gujerat, Belanda, Inggeris", note: "Tumpuan utama pedagang antarabangsa" },
      { origin: "Jawa", note: "Memilih Johor kerana tidak berminat berdagang dengan Portugis di Melaka" },
      { origin: "Siam", note: "Memasarkan hasil pertanian seperti beras" }
    ],
    tradeGoods: [
      { good: "Lada hitam", origin: "Jambi" },
      { good: "Bijih timah", origin: "Klang, Sungai Ujong, Bernam, Pulau Bangka (Sumatera)" },
      { good: "Emas", origin: "Inderagiri" },
      { good: "Benang emas, kain sutera putih, tembikar, seramik, kuali besi, teh, tembaga", origin: "China" },
      { good: "Kain, wangian, manik", origin: "Gujerat" },
      { good: "Beras", origin: "Jawa dan Siam" }
    ],
    portOperations: {
      shipCount: "500 hingga 600 buah kapal dagang pelbagai bangsa berlabuh, terutama di Pelabuhan Riau (termasuk kapal Siam, Portugis, Inggeris)",
      facilities: ["Gudang bawah tanah untuk menyimpan barangan (elak kebakaran)", "Pegawai terlatih mengendalikan urusan perdagangan", "Bekalan barang keperluan pedagang seperti lada hitam dan rempah-ratus"],
      currency: [
        { name: "Mas", material: "Emas" },
        { name: "Kupang", material: "Perak" },
        { name: "Katun", material: "Timah" }
      ],
      syahbandarRole: "Pembesar yang mengurus sistem jual beli dan kutipan cukai pelabuhan (cukai berpatutan); menetapkan ukuran dan berat timbangan barangan"
    }
  },
  keyExamFacts: [
    "Kesultanan Johor Riau diasaskan Raja Ali (Sultan Alauddin Riayat Shah I, 1528-1564), putera Sultan Mahmud Shah dan Tun Fatimah",
    "3 pusat pemerintahan awal: Kota Kara/Pekan Tua (1528) → Kota Sayong/Sayong Pinang (selepas 1535) → Kota Batu/Johor Lama (1540)",
    "Perang Tiga Segi/Perang Seratus Tahun: Johor-Acheh-Portugis, berakhir 1641 apabila Johor+Belanda mengalahkan Portugis",
    "Perang Johor-Jambi (1659-1679) — Jambi tewas Jun 1679",
    "Raja Kechil menyerang Johor 1718; dikalahkan 4 Oktober 1722 dengan bantuan Opu Bugis Lima Bersaudara",
    "Daeng Merewah menjadi Yamtuan Muda Bugis pertama di Johor",
    "500-600 kapal dagang berlabuh di Pelabuhan Riau — pelabuhan entrepot",
    "3 mata wang Johor Riau: Mas (emas), Kupang (perak), Katun (timah)",
    "Johor Riau turut dikenali sebagai Kesultanan Johor Riau Lingga"
  ],
  keyTerms: [
    "Raja Ali", "Sultan Alauddin Riayat Shah I", "Perang Tiga Segi", "Perang Seratus Tahun",
    "Raja Kechil", "Opu Bugis Lima Bersaudara", "Yamtuan Muda", "Daeng Merewah",
    "Syahbandar", "Mas", "Kupang", "Katun", "Pelabuhan entrepot"
  ],
  chapterSummary: "Bab 6 mengkaji pengasasan Kesultanan Johor Riau oleh Sultan Alauddin Riayat Shah I (1528) sebagai waris Melaka, empat cabaran ke arah kegemilangan (Perang Tiga Segi, Perang Johor-Jambi, konflik pembesar, ancaman Raja Kechil), strategi menghadapi cabaran, serta kegemilangan sebagai pusat perdagangan entrepot unggul dengan sistem mata wang dan pengurusan pelabuhan tersendiri."
};

export default sej2Ch6Content;
