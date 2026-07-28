import type { MindNode } from "@/components/MindMap";

type SimpulanBahasaEntry = {
  id: string;
  label: string;
  maksud: string;
  huraian: string;
  contohAyat: string;
  situasi: string;
  kesalahan?: string;
  berkaitan: string;
};

function simpulanBahasa(entry: SimpulanBahasaEntry): MindNode {
  const id = `bm-simpulan-bahasa-${entry.id}`;
  return {
    id,
    label: entry.label,
    children: [
      { id: `${id}-maksud`, label: "Maksud", summary: entry.maksud },
      { id: `${id}-huraian`, label: "Huraian", summary: entry.huraian },
      { id: `${id}-contoh-ayat`, label: "Contoh Ayat", summary: entry.contohAyat },
      { id: `${id}-situasi`, label: "Situasi Penggunaan", summary: entry.situasi },
      ...(entry.kesalahan
        ? [{ id: `${id}-kesalahan`, label: "Kesalahan Lazim", summary: entry.kesalahan }]
        : []),
      { id: `${id}-berkaitan`, label: "Berkaitan", summary: entry.berkaitan },
    ],
  };
}

const simpulanBahasaEntries: SimpulanBahasaEntry[] = [
  {
    id: "katak-di-bawah-tempurung",
    label: "Katak di bawah tempurung",
    maksud: "Orang yang cetek pengetahuan dan kurang mengetahui hal di luar lingkungannya.",
    huraian:
      "Menggambarkan seseorang yang tidak terdedah kepada dunia luar lalu beranggapan pengetahuannya sudah mencukupi.",
    contohAyat:
      '"Rajin-rajinlah membaca dan meneroka ilmu baharu agar kita tidak menjadi seperti katak di bawah tempurung."',
    situasi: "Digunakan apabila seseorang kurang pendedahan, pengalaman atau pengetahuan am.",
    kesalahan:
      "Jangan gunakan untuk seseorang yang sekadar pemalu; ungkapan ini menekankan pengetahuan atau pengalaman yang terbatas.",
    berkaitan: "Cetek pengetahuan • kurang pendedahan • berpandangan sempit",
  },
  {
    id: "mendabik-dada",
    label: "Mendabik dada",
    maksud: "Membanggakan diri atau bercakap dengan sombong tentang kelebihan sendiri.",
    huraian:
      "Perbuatan menunjuk-nunjukkan kejayaan, kebolehan atau kedudukan dengan rasa terlalu bangga.",
    contohAyat:
      '"Walaupun memenangi pertandingan itu, Faris tidak pernah mendabik dada di hadapan rakan-rakannya."',
    situasi: "Digunakan ketika seseorang bermegah-megah atau meninggikan diri.",
    kesalahan:
      "Jangan samakan dengan rasa bangga yang wajar; mendabik dada membawa nada negatif dan sombong.",
    berkaitan: "Bermegah-megah • besar kepala • sombong",
  },
  {
    id: "membuka-mata",
    label: "Membuka mata",
    maksud: "Menyedarkan atau memberikan kefahaman tentang sesuatu perkara.",
    huraian:
      "Pengalaman atau maklumat baharu menyebabkan seseorang memahami kenyataan yang sebelum itu tidak disedarinya.",
    contohAyat:
      '"Lawatan ke pusat pemuliharaan itu membuka mata kami tentang pentingnya melindungi hidupan liar."',
    situasi: "Digunakan apabila sesuatu pengalaman menimbulkan kesedaran atau kefahaman baharu.",
    kesalahan: "Bezakan makna kiasan dengan perbuatan membuka kelopak mata secara fizikal.",
    berkaitan: "Memberi kesedaran • menyedarkan • menginsafkan",
  },
  {
    id: "ambil-berat",
    label: "Ambil berat",
    maksud: "Memberikan perhatian yang bersungguh-sungguh terhadap seseorang atau sesuatu.",
    huraian:
      "Menunjukkan sikap peduli dengan mengetahui keadaan, membantu atau memastikan sesuatu diurus dengan baik.",
    contohAyat:
      '"Ibu bapa perlu mengambil berat tentang perkembangan pelajaran dan emosi anak-anak."',
    situasi: "Digunakan apabila seseorang menunjukkan perhatian, kepedulian atau tanggungjawab.",
    kesalahan:
      'Jangan keliru dengan "ambil mudah", yang bermaksud memandang ringan sesuatu perkara.',
    berkaitan: "Prihatin • peduli • memberi perhatian",
  },
  {
    id: "membawang",
    label: "Membawang",
    maksud: "Berbual atau bergosip tentang hal orang lain.",
    huraian:
      "Ungkapan tidak formal yang merujuk kepada perbualan panjang, khususnya tentang cerita atau khabar orang lain.",
    contohAyat:
      '"Mereka dinasihati supaya tidak membawang tentang masalah peribadi rakan sekelas."',
    situasi:
      "Sesuai dalam konteks perbualan tidak formal tentang tabiat bergosip atau bercerita.",
    kesalahan:
      "Elakkan dalam penulisan rasmi jika perkataan yang lebih baku seperti bergosip atau mengumpat lebih sesuai.",
    berkaitan: "Bergosip • mengumpat • berbual-bual",
  },
  {
    id: "panas-baran",
    label: "Panas baran",
    maksud: "Sifat seseorang yang cepat marah.",
    huraian:
      "Merujuk kepada orang yang mudah hilang sabar atau naik marah walaupun disebabkan perkara kecil.",
    contohAyat:
      '"Sikap panas baran Harun menyebabkan rakan-rakannya takut untuk berbincang dengannya."',
    situasi: "Digunakan untuk menerangkan sifat seseorang yang mudah marah.",
    kesalahan:
      "Jangan gunakan untuk kemarahan sekali-sekala; ungkapan ini biasanya menerangkan sifat atau tabiat.",
    berkaitan: "Cepat marah • naik darah • hilang sabar",
  },
  {
    id: "darah-daging",
    label: "Darah daging",
    maksud: "Anak atau saudara kandung sendiri.",
    huraian:
      "Menunjukkan hubungan kekeluargaan yang sangat rapat melalui keturunan atau pertalian darah.",
    contohAyat: '"Walau apa-apa pun yang berlaku, Amir tetap darah daging keluarga itu."',
    situasi: "Digunakan apabila menegaskan pertalian keluarga atau keturunan.",
    kesalahan:
      "Jangan gunakan semata-mata untuk sahabat rapat kerana ungkapan ini menekankan pertalian darah.",
    berkaitan: "Saudara kandung • pertalian darah • keluarga sendiri",
  },
  {
    id: "selok-belok",
    label: "Selok-belok",
    maksud: "Hal-hal terperinci atau cara-cara yang berkaitan dengan sesuatu perkara.",
    huraian: "Merujuk kepada pengetahuan menyeluruh tentang proses, keadaan atau bidang tertentu.",
    contohAyat:
      '"Puan Aida memahami selok-belok perniagaan dalam talian setelah bertahun-tahun mengusahakannya."',
    situasi:
      "Digunakan untuk menerangkan pengetahuan mendalam tentang sesuatu bidang atau urusan.",
    berkaitan: "Hal-ehwal • liku-liku • perincian",
  },
  {
    id: "jalan-mudah",
    label: "Jalan mudah",
    maksud: "Cara yang paling mudah untuk menyelesaikan sesuatu perkara.",
    huraian:
      "Merujuk kepada pilihan yang memerlukan usaha, masa atau kesukaran yang lebih sedikit.",
    contohAyat:
      '"Meniru bukanlah jalan mudah yang wajar dipilih untuk memperoleh keputusan cemerlang."',
    situasi: "Digunakan ketika membincangkan pilihan atau kaedah penyelesaian.",
    kesalahan:
      "Pastikan konteks menunjukkan suatu cara atau penyelesaian, bukan jalan raya yang mudah dilalui.",
    berkaitan: "Cara mudah • jalan singkat • penyelesaian",
  },
  {
    id: "modal-insan",
    label: "Modal insan",
    maksud: "Sumber manusia yang mempunyai ilmu, kemahiran dan nilai berkualiti.",
    huraian:
      "Merujuk kepada keupayaan manusia sebagai aset penting dalam pembangunan masyarakat dan negara.",
    contohAyat:
      '"Pendidikan yang berkualiti penting untuk melahirkan modal insan yang berilmu dan berkemahiran."',
    situasi: "Digunakan dalam konteks pendidikan, pekerjaan, pembangunan dan kemajuan negara.",
    kesalahan:
      "Jangan tafsirkan modal sebagai wang; dalam ungkapan ini, manusia dilihat sebagai sumber bernilai.",
    berkaitan: "Sumber manusia • tenaga mahir • pembangunan insan",
  },
  {
    id: "anak-watan",
    label: "Anak watan",
    maksud: "Penduduk asal atau orang yang dilahirkan di sesebuah negeri atau negara.",
    huraian: "Menunjukkan hubungan seseorang dengan tempat asal, negeri atau tanah airnya.",
    contohAyat: '"Sebagai anak watan Malaysia, kita hendaklah memelihara keharmonian negara."',
    situasi: "Digunakan ketika menyatakan asal-usul atau jati diri seseorang.",
    kesalahan:
      'Jangan tafsirkan perkataan "anak" sebagai kanak-kanak; ungkapan ini boleh merujuk kepada orang dewasa.',
    berkaitan: "Penduduk asal • rakyat tempatan • tanah air",
  },
];

export const bahasaMelayuSimpulanBahasaMindMap: MindNode = {
  id: "bm-simpulan-bahasa-root",
  label: "SIMPULAN BAHASA",
  summary:
    "Ungkapan ringkas yang terbentuk daripada dua patah perkataan atau lebih dan membawa maksud tertentu.",
  children: [
    {
      id: "bm-simpulan-bahasa-pengenalan",
      label: "Apa Itu Simpulan Bahasa?",
      children: [
        {
          id: "bm-simpulan-bahasa-pengenalan-maksud",
          label: "Maksud",
          summary:
            "Simpulan bahasa ialah ungkapan tetap yang membawa makna berlainan daripada makna harfiah perkataan yang membentuknya.",
        },
        {
          id: "bm-simpulan-bahasa-pengenalan-fungsi",
          label: "Fungsi",
          summary:
            "Menjadikan pertuturan dan penulisan lebih ringkas, menarik, halus dan berkesan.",
        },
        {
          id: "bm-simpulan-bahasa-pengenalan-contoh",
          label: "Contoh",
          summary:
            '"Panas baran" tidak bermaksud baran yang panas, tetapi seseorang yang cepat marah.',
        },
      ],
    },
    {
      id: "bm-simpulan-bahasa-ciri",
      label: "Ciri-ciri",
      children: [
        {
          id: "bm-simpulan-bahasa-ciri-ringkas",
          label: "Ungkapan Ringkas",
          summary: "Biasanya terdiri daripada dua patah perkataan atau lebih.",
        },
        {
          id: "bm-simpulan-bahasa-ciri-makna",
          label: "Makna Kiasan",
          summary: "Maksudnya tidak semestinya sama dengan makna setiap perkataan secara langsung.",
        },
        {
          id: "bm-simpulan-bahasa-ciri-tetap",
          label: "Bentuk Tetap",
          summary:
            "Susunan perkataannya lazimnya tidak boleh ditukar sesuka hati tanpa mengubah atau merosakkan maksud.",
        },
        {
          id: "bm-simpulan-bahasa-ciri-konteks",
          label: "Bergantung pada Konteks",
          summary: "Pemilihan simpulan bahasa mesti sepadan dengan orang, peristiwa dan situasi.",
        },
      ],
    },
    {
      id: "bm-simpulan-bahasa-cara-kenal-pasti",
      label: "Cara Mengenal Pasti",
      children: [
        {
          id: "bm-simpulan-bahasa-cara-kenal-pasti-baca",
          label: "Baca Seluruh Ayat",
          summary: "Fahami konteks ayat sebelum menentukan maksud ungkapan.",
        },
        {
          id: "bm-simpulan-bahasa-cara-kenal-pasti-harfiah",
          label: "Uji Makna Harfiah",
          summary:
            "Jika makna langsung kedengaran janggal, pertimbangkan sama ada ungkapan itu membawa makna kiasan.",
        },
        {
          id: "bm-simpulan-bahasa-cara-kenal-pasti-kata-kunci",
          label: "Cari Petunjuk",
          summary:
            "Kenal pasti kata atau peristiwa dalam ayat yang menunjukkan sifat, perasaan, tindakan atau hubungan.",
        },
        {
          id: "bm-simpulan-bahasa-cara-kenal-pasti-ganti",
          label: "Gantikan dengan Maksud",
          summary:
            "Masukkan maksud simpulan bahasa ke dalam ayat dan pastikan ayat itu masih logik.",
        },
      ],
    },
    ...simpulanBahasaEntries.map(simpulanBahasa),
    {
      id: "bm-simpulan-bahasa-kesalahan-lazim",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-simpulan-bahasa-kesalahan-lazim-harfiah",
          label: "Mentafsir Secara Harfiah",
          summary: "Tentukan makna kiasan berdasarkan konteks, bukan makna setiap perkataan.",
        },
        {
          id: "bm-simpulan-bahasa-kesalahan-lazim-konteks",
          label: "Salah Konteks",
          summary:
            "Jangan masukkan simpulan bahasa jika maksudnya tidak sepadan dengan situasi ayat.",
        },
        {
          id: "bm-simpulan-bahasa-kesalahan-lazim-bentuk",
          label: "Mengubah Bentuk",
          summary: 'Kekalkan bentuk yang betul, contohnya "panas baran", bukannya "baran panas".',
        },
        {
          id: "bm-simpulan-bahasa-kesalahan-lazim-ayat",
          label: "Ayat Tidak Lengkap",
          summary:
            "Bina ayat yang jelas tentang siapa, perkara yang berlaku dan sebab simpulan bahasa itu sesuai.",
        },
      ],
    },
    {
      id: "bm-simpulan-bahasa-teknik-mengingat",
      label: "Teknik Mengingat",
      children: [
        {
          id: "bm-simpulan-bahasa-teknik-mengingat-kumpulan",
          label: "Kumpulkan Mengikut Tema",
          summary:
            "Contoh: sifat — panas baran; sikap — ambil berat; pengetahuan — katak di bawah tempurung.",
        },
        {
          id: "bm-simpulan-bahasa-teknik-mengingat-visual",
          label: "Bina Gambaran Mental",
          summary: "Bayangkan imej ungkapan, kemudian kaitkannya dengan maksud kiasan.",
        },
        {
          id: "bm-simpulan-bahasa-teknik-mengingat-ayat",
          label: "Cipta Ayat Sendiri",
          summary: "Gunakan situasi harian supaya maksud lebih mudah diingati.",
        },
        {
          id: "bm-simpulan-bahasa-teknik-mengingat-kad",
          label: "Kad Imbas",
          summary: "Tulis ungkapan pada satu bahagian dan maksud serta contoh pada bahagian lain.",
        },
      ],
    },
    {
      id: "bm-simpulan-bahasa-teknik-uasa",
      label: "Teknik Menjawab UASA",
      children: [
        {
          id: "bm-simpulan-bahasa-teknik-uasa-konteks",
          label: "Kenal Pasti Konteks",
          summary: "Gariskan petunjuk tentang sifat, tindakan, perasaan atau keadaan dalam soalan.",
        },
        {
          id: "bm-simpulan-bahasa-teknik-uasa-maksud",
          label: "Padankan Maksud",
          summary: "Gantikan pilihan jawapan dengan maksudnya dan baca semula ayat.",
        },
        {
          id: "bm-simpulan-bahasa-teknik-uasa-singkir",
          label: "Singkir Pilihan Salah",
          summary: "Tolak ungkapan yang maknanya bercanggah dengan situasi.",
        },
        {
          id: "bm-simpulan-bahasa-teknik-uasa-bina-ayat",
          label: "Bina Ayat Lengkap",
          summary:
            "Jika diminta membina ayat, tunjukkan konteks yang membuktikan maksud simpulan bahasa.",
        },
        {
          id: "bm-simpulan-bahasa-teknik-uasa-semak",
          label: "Semak Bentuk dan Ejaan",
          summary: "Pastikan ungkapan ditulis dalam bentuk yang tepat dan ayatnya gramatis.",
        },
      ],
    },
  ],
};
