import type { MindNode } from "@/components/MindMap";

type PerumpamaanEntry = {
  id: string;
  label: string;
  maksud: string;
  huraian: string;
  contohAyat: string;
  situasi: string;
  kesalahan: string;
  berkaitan: string;
};

function perumpamaan(entry: PerumpamaanEntry): MindNode {
  const id = `bm-f2-perumpamaan-${entry.id}`;
  return {
    id,
    label: entry.label,
    children: [
      { id: `${id}-maksud`, label: "Maksud", summary: entry.maksud },
      { id: `${id}-huraian`, label: "Huraian", summary: entry.huraian },
      { id: `${id}-contoh-ayat`, label: "Contoh Ayat", summary: entry.contohAyat },
      { id: `${id}-situasi`, label: "Situasi Penggunaan", summary: entry.situasi },
      { id: `${id}-kesalahan`, label: "Kesalahan Lazim", summary: entry.kesalahan },
      { id: `${id}-berkaitan`, label: "Berkaitan", summary: entry.berkaitan },
    ],
  };
}

const perumpamaanEntries: PerumpamaanEntry[] = [
  {
    id: "ibarat-abu-di-atas-tunggul",
    label: "Ibarat abu di atas tunggul",
    maksud: "Kedudukan seseorang yang tidak tetap dan boleh disingkirkan pada bila-bila masa.",
    huraian:
      "Abu yang berada di atas tunggul mudah diterbangkan angin, seperti orang yang tidak mempunyai jaminan dalam kedudukannya.",
    contohAyat:
      '"Pekerja tanpa surat pelantikan itu berasa kedudukannya ibarat abu di atas tunggul."',
    situasi:
      "Digunakan apabila kedudukan, jawatan atau tempat seseorang tidak kukuh dan tidak terjamin.",
    kesalahan:
      "Jangan gunakan untuk menggambarkan orang yang lemah semata-mata; penekanannya ialah kedudukan yang tidak tetap.",
    berkaitan: "Kedudukan tidak terjamin • mudah disingkirkan • tiada kepastian",
  },
  {
    id: "seperti-ayam-berak-kapur",
    label: "Seperti ayam berak kapur",
    maksud: "Wajah seseorang yang sangat pucat kerana sakit, ketakutan atau terkejut.",
    huraian:
      "Keadaan ayam yang tidak sihat dijadikan perbandingan bagi wajah yang hilang seri dan kelihatan pucat.",
    contohAyat:
      '"Wajah Hakim seperti ayam berak kapur apabila namanya dipanggil oleh guru disiplin."',
    situasi:
      "Digunakan untuk menerangkan rupa seseorang yang pucat akibat sakit, takut atau cemas.",
    kesalahan:
      "Jangan gunakan untuk seseorang yang sekadar berkulit cerah; mesti ada keadaan sakit, takut atau terkejut.",
    berkaitan: "Pucat lesi • ketakutan • cemas",
  },
  {
    id: "duduk-sama-rendah-berdiri-sama-tinggi",
    label: "Duduk sama rendah, berdiri sama tinggi",
    maksud: "Dua pihak yang sama taraf, sama kedudukan atau setanding kebolehannya.",
    huraian:
      "Perumpamaan ini menegaskan kesamarataan antara individu, kumpulan atau negara tanpa pihak yang dianggap lebih rendah.",
    contohAyat:
      '"Pasukan sekolah kita kini duduk sama rendah, berdiri sama tinggi dengan pasukan juara negeri itu."',
    situasi:
      "Digunakan apabila membandingkan pihak yang setara dari segi taraf, pencapaian atau kemampuan.",
    kesalahan:
      "Jangan tafsirkan secara fizikal tentang cara duduk atau berdiri; maksudnya berkaitan taraf dan kedudukan.",
    berkaitan: "Sama taraf • setanding • seimbang",
  },
  {
    id: "bak-aur-dengan-tebing",
    label: "Bak aur dengan tebing",
    maksud: "Hubungan yang saling membantu dan saling memerlukan antara satu sama lain.",
    huraian:
      "Aur mengukuhkan tebing manakala tebing menyokong aur, lalu kedua-duanya menjadi lambang kerjasama yang erat.",
    contohAyat:
      '"Penduduk kampung bekerjasama bak aur dengan tebing untuk menjayakan program gotong-royong."',
    situasi:
      "Digunakan apabila dua pihak bekerjasama, saling menyokong dan memperoleh manfaat bersama.",
    kesalahan:
      "Jangan gunakan jika bantuan hanya datang daripada satu pihak kerana perumpamaan ini menekankan hubungan timbal balik.",
    berkaitan: "Bekerjasama • saling membantu • muafakat",
  },
  {
    id: "bagai-cendawan-tumbuh-selepas-hujan",
    label: "Bagai cendawan tumbuh selepas hujan",
    maksud: "Sesuatu yang muncul atau bertambah dengan banyak dalam masa yang singkat.",
    huraian:
      "Cendawan sering tumbuh dengan cepat selepas hujan, lalu dibandingkan dengan perkembangan yang berlaku secara mendadak dan meluas.",
    contohAyat: '"Kedai kopi moden tumbuh bagai cendawan selepas hujan di kawasan bandar itu."',
    situasi:
      "Digunakan untuk perkembangan pesat seperti perniagaan, bangunan, pusat tuisyen atau trend baharu.",
    kesalahan:
      "Jangan gunakan untuk satu kejadian sahaja; konteks mesti menunjukkan jumlah yang banyak dan pertambahan yang cepat.",
    berkaitan: "Bertambah pesat • muncul dengan banyak • berkembang cepat",
  },
  {
    id: "umpama-minyak-setitik-di-laut-sekalipun-timbul-juga",
    label: "Umpama minyak setitik, di laut sekalipun timbul juga",
    maksud: "Orang yang baik akan tetap dihormati dan dimuliakan walau di mana-mana pun berada.",
    huraian:
      "Minyak tetap timbul di permukaan air walaupun hanya setitik, seperti kebaikan seseorang yang tetap terserlah dalam kelompok yang besar.",
    contohAyat:
      '"Sifat jujur Aina sentiasa dihargai kerana umpama minyak setitik, di laut sekalipun timbul juga."',
    situasi:
      "Digunakan apabila kebaikan atau kemuliaan seseorang tetap dikenali dalam apa-apa lingkungan.",
    kesalahan:
      "Jangan gunakan hanya untuk orang yang terkenal; perumpamaan ini menekankan kebaikan yang menyebabkan seseorang dimuliakan.",
    berkaitan: "Orang yang baik • dihormati • kebaikan terserlah",
  },
];

export const bahasaMelayuForm2PerumpamaanMindMap: MindNode = {
  id: "bm-f2-perumpamaan-root",
  label: "PERUMPAMAAN",
  summary:
    "Peribahasa yang membandingkan sesuatu dengan perkara lain untuk menyampaikan maksud secara jelas dan berkesan.",
  children: [
    {
      id: "bm-f2-perumpamaan-pengenalan",
      label: "Apa Itu Perumpamaan?",
      children: [
        {
          id: "bm-f2-perumpamaan-pengenalan-maksud",
          label: "Maksud",
          summary:
            "Perumpamaan ialah peribahasa yang membandingkan sesuatu keadaan, sifat atau perbuatan dengan perkara lain.",
        },
        {
          id: "bm-f2-perumpamaan-pengenalan-penanda",
          label: "Kata Perbandingan",
          summary:
            "Perumpamaan lazimnya menggunakan kata seperti bagai, bak, ibarat, laksana, seperti dan umpama.",
        },
        {
          id: "bm-f2-perumpamaan-pengenalan-fungsi",
          label: "Fungsi",
          summary:
            "Menjadikan penerangan lebih hidup, mudah dibayangkan dan berkesan dalam pertuturan serta penulisan.",
        },
      ],
    },
    {
      id: "bm-f2-perumpamaan-ciri",
      label: "Ciri-ciri",
      children: [
        {
          id: "bm-f2-perumpamaan-ciri-perbandingan",
          label: "Membuat Perbandingan",
          summary:
            "Membandingkan manusia, keadaan atau perbuatan dengan alam dan kehidupan harian.",
        },
        {
          id: "bm-f2-perumpamaan-ciri-kiasan",
          label: "Makna Kiasan",
          summary: "Maksud sebenar difahami melalui gambaran perbandingan, bukan secara harfiah.",
        },
        {
          id: "bm-f2-perumpamaan-ciri-bentuk",
          label: "Bentuk Tetap",
          summary:
            "Susunan kata perlu dikekalkan supaya maksud dan keaslian perumpamaan terpelihara.",
        },
        {
          id: "bm-f2-perumpamaan-ciri-konteks",
          label: "Sesuai dengan Konteks",
          summary: "Perbandingan yang dipilih mesti sepadan dengan keadaan yang diterangkan.",
        },
      ],
    },
    {
      id: "bm-f2-perumpamaan-cara-kenal-pasti",
      label: "Cara Mengenal Pasti",
      children: [
        {
          id: "bm-f2-perumpamaan-cara-kenal-pasti-penanda",
          label: "Cari Kata Perbandingan",
          summary: "Kenal pasti kata bagai, bak, ibarat, laksana, seperti atau umpama.",
        },
        {
          id: "bm-f2-perumpamaan-cara-kenal-pasti-gambaran",
          label: "Bayangkan Gambaran",
          summary: "Perhatikan imej atau keadaan yang digunakan sebagai bahan perbandingan.",
        },
        {
          id: "bm-f2-perumpamaan-cara-kenal-pasti-konteks",
          label: "Baca Seluruh Ayat",
          summary:
            "Cari petunjuk konteks tentang sifat, hubungan, keadaan atau perubahan yang berlaku.",
        },
        {
          id: "bm-f2-perumpamaan-cara-kenal-pasti-padankan",
          label: "Padankan Maksud",
          summary: "Gantikan perumpamaan dengan maksudnya dan pastikan ayat masih logik.",
        },
      ],
    },
    ...perumpamaanEntries.map(perumpamaan),
    {
      id: "bm-f2-perumpamaan-kesalahan-lazim",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-f2-perumpamaan-kesalahan-lazim-harfiah",
          label: "Mentafsir Secara Harfiah",
          summary: "Fahami gambaran sebagai perbandingan kiasan, bukan kejadian sebenar.",
        },
        {
          id: "bm-f2-perumpamaan-kesalahan-lazim-konteks",
          label: "Salah Konteks",
          summary: "Pastikan maksud perumpamaan benar-benar sepadan dengan situasi ayat.",
        },
        {
          id: "bm-f2-perumpamaan-kesalahan-lazim-bentuk",
          label: "Mengubah Susunan",
          summary: "Kekalkan bentuk perumpamaan dan jangan menggantikan perkataannya sesuka hati.",
        },
        {
          id: "bm-f2-perumpamaan-kesalahan-lazim-penanda",
          label: "Salah Kata Perbandingan",
          summary: "Gunakan kata perbandingan yang diterima dalam bentuk asal perumpamaan.",
        },
      ],
    },
    {
      id: "bm-f2-perumpamaan-teknik-mengingat",
      label: "Teknik Mengingat",
      children: [
        {
          id: "bm-f2-perumpamaan-teknik-mengingat-visual",
          label: "Bina Gambaran Mental",
          summary: "Bayangkan abu, ayam, aur, tebing, cendawan atau minyak dalam setiap ungkapan.",
        },
        {
          id: "bm-f2-perumpamaan-teknik-mengingat-tema",
          label: "Kumpulkan Mengikut Tema",
          summary: "Contoh: kerjasama, kesamarataan, pertumbuhan, ketidakpastian dan kemuliaan.",
        },
        {
          id: "bm-f2-perumpamaan-teknik-mengingat-kata",
          label: "Ingat Kata Perbandingan",
          summary: "Gunakan urutan mudah: bagai • bak • ibarat • seperti • umpama.",
        },
        {
          id: "bm-f2-perumpamaan-teknik-mengingat-ayat",
          label: "Cipta Ayat Sendiri",
          summary: "Kaitkan setiap perumpamaan dengan situasi yang dekat dengan kehidupan harian.",
        },
      ],
    },
    {
      id: "bm-f2-perumpamaan-teknik-uasa",
      label: "Teknik Menjawab UASA",
      children: [
        {
          id: "bm-f2-perumpamaan-teknik-uasa-petunjuk",
          label: "Gariskan Petunjuk",
          summary:
            "Tandakan kata yang menunjukkan keadaan, hubungan, sifat atau perubahan dalam soalan.",
        },
        {
          id: "bm-f2-perumpamaan-teknik-uasa-maksud",
          label: "Uji Maksud",
          summary: "Gantikan setiap pilihan dengan maksudnya sebelum memilih jawapan.",
        },
        {
          id: "bm-f2-perumpamaan-teknik-uasa-singkir",
          label: "Singkir Pilihan Salah",
          summary: "Tolak perumpamaan yang gambaran dan maksudnya bercanggah dengan konteks.",
        },
        {
          id: "bm-f2-perumpamaan-teknik-uasa-ayat",
          label: "Bina Ayat Lengkap",
          summary:
            "Tunjukkan situasi yang membuktikan maksud perumpamaan, bukan sekadar menyebutnya.",
        },
        {
          id: "bm-f2-perumpamaan-teknik-uasa-semak",
          label: "Semak Bentuk dan Ejaan",
          summary: "Pastikan ungkapan ditulis lengkap, tepat dan gramatis.",
        },
      ],
    },
  ],
};
