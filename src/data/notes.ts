import type {
  Form,
  Subject,
  Note,
  ScienceNotesSubsection,
  ScienceNotesSection,
  StructuredNotes,
  Difficulty,
  QuizQuestion,
  Flashcard,
  SejarahChapter,
  ChapterItem,
} from "./types";
export const notes: Note[] = [
  {
    id: "n3",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 2",
    title: "Cells & Living Things",
    summary:
      "All living organisms are made of cells. Animal cells lack cell walls and chloroplasts found in plant cells.",
    keywords: ["cell", "nucleus", "membrane"],
  },
  {
    id: "sci-f1-c2-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 2",
    title: "Bab 2: Sel sebagai Unit Asas Hidupan",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 2 dalam Bahasa Melayu: sel, mikroskop, struktur sel, organisasi sel, respirasi dan fotosintesis.",
    keywords: ["sel", "mikroskop", "respirasi", "fotosintesis", "mitokondria", "kloroplas"],
    lang: "bm",
  },
  {
    id: "sci-f1-c2-dlp",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 2",
    title: "Chapter 2: Cell as the Basic Unit of Life",
    summary:
      "Form 1 Science Chapter 2 summary in English: cells, microscope, cell structure, organisation, respiration and photosynthesis.",
    keywords: [
      "cell",
      "microscope",
      "respiration",
      "photosynthesis",
      "mitochondria",
      "chloroplast",
    ],
    lang: "dlp",
  },
  {
    id: "sci-f1-c5-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 5",
    title: "Bab 5: Jirim",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 5: jirim, bukan jirim, sifat fizik dan kimia, tiga keadaan jirim, teori kinetik, resapan, perubahan keadaan jirim, ketumpatan, apungan dan sesaran air.",
    keywords: [
      "jirim",
      "jisim",
      "isi padu",
      "pepejal",
      "cecair",
      "gas",
      "resapan",
      "ketumpatan",
      "apungan",
      "sesaran air",
    ],
    lang: "bm",
  },
  {
    id: "sci-f1-c5-dlp",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 5",
    title: "Chapter 5: Matter",
    summary:
      "Form 1 Science Chapter 5 summary: matter, non-matter, physical and chemical properties, three states of matter, kinetic theory, diffusion, changes of state, density, buoyancy and water displacement.",
    keywords: [
      "matter",
      "mass",
      "volume",
      "solid",
      "liquid",
      "gas",
      "diffusion",
      "density",
      "buoyancy",
      "water displacement",
    ],
    lang: "dlp",
  },
  {
    id: "sci-f1-c6-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 6",
    title: "Bab 6: Jadual Berkala",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 6: atom, zarah subatom, molekul, unsur, sebatian, Jadual Berkala, logam, bukan logam, campuran dan kaedah pengasingan.",
    keywords: [
      "jadual berkala",
      "atom",
      "proton",
      "neutron",
      "elektron",
      "unsur",
      "sebatian",
      "campuran",
      "logam",
      "bukan logam",
    ],
    lang: "bm",
  },
  {
    id: "sci-f1-c6-dlp",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 6",
    title: "Chapter 6: Periodic Table",
    summary:
      "Form 1 Science Chapter 6 summary: atoms, subatomic particles, molecules, elements, compounds, the Periodic Table, metals, non-metals, mixtures and separation methods.",
    keywords: [
      "periodic table",
      "atom",
      "proton",
      "neutron",
      "electron",
      "element",
      "compound",
      "mixture",
      "metal",
      "non-metal",
    ],
    lang: "dlp",
  },
  {
    id: "sci-f1-c7-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 7",
    title: "Bab 7: Udara",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 7: komposisi udara, kepentingan gas, kitar karbon dan oksigen, pembakaran, keselamatan kebakaran, pencemaran udara dan kawalan pencemaran.",
    keywords: [
      "udara",
      "atmosfera",
      "nitrogen",
      "oksigen",
      "karbon dioksida",
      "gas nadir",
      "pembakaran",
      "pencemaran udara",
      "hujan asid",
      "pemanasan global",
    ],
    lang: "bm",
  },
  {
    id: "sci-f1-c7-dlp",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 7",
    title: "Chapter 7: Air",
    summary:
      "Form 1 Science Chapter 7 summary: composition of air, importance of gases, carbon and oxygen cycles, combustion, fire safety, air pollution and pollution control.",
    keywords: [
      "air",
      "atmosphere",
      "nitrogen",
      "oxygen",
      "carbon dioxide",
      "noble gases",
      "combustion",
      "air pollution",
      "acid rain",
      "global warming",
    ],
    lang: "dlp",
  },
  {
    id: "sci-f1-c8-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 8",
    title: "Bab 8: Cahaya dan Optik",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 8: sifat cahaya, bayang-bayang, cermin dan imej, pantulan, pembiasan, penyebaran, penyerakan, warna cahaya, penapis warna dan alat optik.",
    keywords: [
      "cahaya",
      "optik",
      "bayang-bayang",
      "cermin",
      "imej",
      "pantulan",
      "pembiasan",
      "penyebaran",
      "penyerakan",
      "warna",
      "periskop",
    ],
    lang: "bm",
  },
  {
    id: "sci-f1-c8-dlp",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 8",
    title: "Chapter 8: Light and Optics",
    summary:
      "Form 1 Science Chapter 8 summary: properties of light, shadows, mirrors and images, reflection, refraction, dispersion, scattering, light colours, colour filters and optical instruments.",
    keywords: [
      "light",
      "optics",
      "shadow",
      "mirror",
      "image",
      "reflection",
      "refraction",
      "dispersion",
      "scattering",
      "colour",
      "periscope",
    ],
    lang: "dlp",
  },
  {
    id: "sci-f1-c9-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 9",
    title: "Bab 9: Bumi",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 9: sistem Bumi, lapisan atmosfera dan lautan, struktur dalaman Bumi, batuan, mineral, proses Bumi, geobencana, usia Bumi dan sumber Bumi.",
    keywords: [
      "bumi",
      "atmosfera",
      "biosfera",
      "hidrosfera",
      "geosfera",
      "batuan",
      "mineral",
      "fosil",
      "geobencana",
      "gempa bumi",
      "tsunami",
      "geoterma",
    ],
    lang: "bm",
  },
  {
    id: "sci-f1-c9-dlp",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 9",
    title: "Chapter 9: Earth",
    summary:
      "Form 1 Science Chapter 9 summary: Earth systems, atmospheric and ocean layers, internal Earth structure, rocks, minerals, Earth processes, geohazards, Earth's age and Earth resources.",
    keywords: [
      "earth",
      "atmosphere",
      "biosphere",
      "hydrosphere",
      "geosphere",
      "rocks",
      "minerals",
      "fossils",
      "geohazards",
      "earthquakes",
      "tsunamis",
      "geothermal",
    ],
    lang: "dlp",
  },
  {
    id: "n4",
    subjectId: "science",
    form: "Form 3",
    chapter: "Chapter 5",
    title: "Electricity",
    summary:
      "Current flows from positive to negative terminals. Voltage = Current × Resistance (Ohm's Law).",
    keywords: ["current", "voltage", "Ohm's Law"],
  },

  {
    id: "n6",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 1",
    title: "Map Reading",
    summary:
      "Maps use scale, symbols, and grid references. Latitude lines run east-west; longitude lines run north-south.",
    keywords: ["scale", "latitude", "longitude"],
  },
  {
    id: "n7",
    subjectId: "english",
    form: "Form 2",
    chapter: "Unit 3",
    title: "Present Perfect Tense",
    summary:
      "Used for actions that started in the past and continue, or have relevance now. Form: have/has + past participle.",
    keywords: ["tense", "past participle", "have/has"],
  },
  {
    id: "n8",
    subjectId: "bm",
    form: "Form 3",
    chapter: "Bab 2",
    title: "Kata Adjektif",
    summary:
      "Kata adjektif menerangkan sifat, keadaan atau warna sesuatu kata nama. Contoh: cantik, tinggi, merah.",
    keywords: ["sifat", "kata nama", "penerangan"],
  },
  {
    id: "sej-f1-c1-note",
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 1",
    title: "Mengenali Sejarah",
    summary:
      "Sejarah ialah kajian tentang peristiwa masa lalu. Dalam bahasa Arab, sejarah berasal daripada syajaratun yang bermaksud pokok. Dalam bahasa Melayu, sejarah dikaitkan dengan asal usul, salasilah, riwayat dan keturunan. Dalam bahasa Inggeris, history berasal daripada historia yang bermaksud penyelidikan. Herodotus mentakrifkan sejarah sebagai penceritaan tindakan manusia yang penting dan mengagumkan serta sebab sesuatu peristiwa berlaku. Ibn Khaldun menekankan masyarakat manusia, peradaban dunia dan perubahan sifat masyarakat. E.H. Carr melihat sejarah sebagai interaksi berterusan antara ahli sejarah dengan fakta. Khoo Kay Kim menegaskan sejarah ialah apa-apa yang pernah atau sudah berlaku, manakala Muhd Yusof Ibrahim melihat sejarah sebagai catatan atau rekod peristiwa masa lalu. Masa silam ialah rentetan peristiwa yang telah berlaku dan kronologi ialah urutan peristiwa mengikut masa. Dekad bersamaan 10 tahun, abad 100 tahun dan alaf 1,000 tahun. SM ialah sebelum kelahiran Nabi Isa AS, manakala M ialah selepas kelahiran baginda. Sumber sejarah terbahagi kepada sumber primer dan sumber sekunder. Sumber primer ialah sumber asli yang belum diolah seperti fosil, artifak, batu bersurat, dokumen rasmi, manuskrip asal, diari, dinding gua, monumen dan runtuhan lama. Sumber sekunder pula ialah bahan yang telah diolah, ditafsir dan diterbitkan seperti buku teks, majalah, surat khabar dan ensiklopedia. Sejarah dikaji melalui kaedah bertulis, kaedah lisan dan kaedah arkeologi. Kaedah bertulis menggunakan catatan pada batu, dinding gua, kulit kayu, gading dan kertas. Kaedah lisan diperoleh melalui temubual dengan tokoh atau saksi peristiwa, iaitu orang sumber. Kaedah arkeologi ialah kaedah saintifik melalui ekskavasi dan kajian tinggalan sejarah, termasuk arkeologi bawah air. Pentafsiran sejarah ialah proses menerangkan fakta berdasarkan sumber. Tafsiran boleh berbeza kerana perbezaan sumber, pandangan, ideologi dan tujuan penulisan. Mempelajari sejarah penting untuk mengenal asal usul, mengambil iktibar, memupuk patriotisme, mengukuhkan perpaduan dan melatih pemikiran kritis.",
    keywords: [
      "Mengenali Sejarah",
      "Pengertian Sejarah",
      "Masa Silam",
      "Sumber Primer",
      "Sumber Sekunder",
      "Kaedah Bertulis",
      "Kaedah Lisan",
      "Kaedah Arkeologi",
      "Tafsiran Sejarah",
      "Kepentingan Sejarah",
      "Herodotus",
      "Ibn Khaldun",
      "E.H. Carr",
      "Khoo Kay Kim",
      "Kronologi",
      "SM",
      "Masihi",
      "Artifak",
      "Fosil",
      "Ekskavasi",
      "Patriotisme",
    ],
  },
  {
    id: "sej-f1-c2-note",
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 2",
    title: "Zaman Air Batu",
    summary:
      "Bab 2 Zaman Air Batu menerangkan dunia kita, perubahan iklim bumi dan kesannya kepada hidupan serta kawasan di Asia Tenggara. Dunia kita terdiri daripada daratan dan lautan yang berubah mengikut suhu bumi. Zaman Air Batu ialah tempoh suhu bumi sangat rendah sehingga banyak kawasan dilitupi air batu tebal. Zaman ini berlaku sejak jutaan tahun dahulu dan membantu kita memahami sejarah bumi secara kronologi. Garis masa Zaman Air Batu dibahagikan kepada empat tahap utama, iaitu Miosen, Pliosen, Pleistosen dan Holosen. Miosen berlaku kira-kira 23 hingga 5 juta tahun dahulu, apabila gunung-ganang terbentuk dan mamalia mula berkembang. Pliosen berlaku antara 5.3 hingga 2.6 juta tahun dahulu, dengan penyejukan global dan penyebaran padang rumput. Pleistosen berlaku antara 2.5 juta hingga 11,700 tahun dahulu dan merupakan tahap yang mengalami banyak pengglasieran. Holosen bermula 11,700 tahun dahulu hingga kini, iaitu zaman kita hidup sekarang. Ciri-ciri Zaman Air Batu Akhir termasuk suhu yang sangat sejuk, tumbuhan renek yang tahan iklim sejuk, haiwan berbulu tebal seperti mamot dan badak berbulu, serta manusia yang hidup secara nomad kerana bergantung pada memburu dan mengumpul makanan. Paras laut pula sangat rendah kerana banyak air membeku menjadi air batu. Apabila Zaman Air Batu Akhir berakhir, suhu bumi meningkat, air batu mencair, paras laut naik, tasik-tasik besar dan laut terbentuk, mamot pupus dan manusia berpindah ke kawasan yang lebih sesuai. Di Asia Tenggara, perubahan ini menyebabkan Pentas Sunda tenggelam dan memisahkan kawasan yang dahulu bersambung seperti Semenanjung Tanah Melayu, Sumatera, Jawa, Borneo dan kawasan sekitarnya. Perubahan ini turut menjelaskan persamaan pada rupa fizikal, bahasa dan budaya masyarakat Asia Tenggara. Bab ini mengajar kita bahawa perubahan iklim memberi kesan besar kepada alam sekitar dan kehidupan manusia, jadi kita mesti menjaga bumi dengan lebih bijak.",
    keywords: [
      "Zaman Air Batu",
      "Pentas Sunda",
      "Holosen",
      "Pleistosen",
      "Miosen",
      "Pliosen",
      "Geologi",
      "Paleontologi",
      "Mamot",
      "glasier",
      "paras laut",
    ],
  },
  {
    id: "sej-f1-c3-note",
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 3",
    title: "Zaman Prasejarah",
    summary: `🚀 Misi Bab
Bab 3 menerangkan maksud Zaman Prasejarah, lokasi prasejarah di dunia, ciri kehidupan manusia mengikut tahap zaman, kesinambungan sumbangan prasejarah kepada kehidupan moden, dan bukti prasejarah di Malaysia.

🎯 Objektif Pembelajaran
Selepas belajar bab ini, anda boleh:
- menerangkan maksud Zaman Prasejarah
- menyatakan lokasi Zaman Prasejarah di dunia
- menghuraikan ciri kehidupan manusia prasejarah
- menjelaskan sumbangan Zaman Prasejarah kepada kemajuan hidup manusia
- menyenaraikan lokasi, bukti penemuan dan kepentingan tapak prasejarah di Malaysia

🌍 Mengapa Bab Ini Penting?
Bab ini menunjukkan bahawa manusia dahulu hidup tanpa tulisan tetapi tetap bijak menyesuaikan diri dengan alam. Daripada bab ini, kita belajar bagaimana manusia berkembang daripada memburu kepada bertani, daripada menggunakan batu kepada logam, dan daripada hidup berpindah-randah kepada hidup menetap.

📖 Nota Lengkap

3.1 Maksud Zaman Prasejarah
Zaman Prasejarah ialah zaman sebelum manusia mengenal tulisan.

Zaman ini bermula sejak manusia wujud di bumi dan berakhir apabila tulisan mula dicipta.

Zaman Prasejarah dibahagikan kepada:
- Zaman Batu
- Zaman Logam

Zaman Batu pula terbahagi kepada:
- Paleolitik
- Mesolitik
- Neolitik

Zaman Logam pula merangkumi:
- Zaman Gangsa
- Zaman Besi

Cara mudah ingat:
- Pra = sebelum
- Sejarah = tulisan sudah wujud
- Prasejarah = sebelum tulisan wujud

3.2 Lokasi Zaman Prasejarah di Dunia
Zaman Prasejarah berlaku di banyak tempat di dunia.

Antara tapak terkenal ialah:
- Gua Chauvet, Perancis
- Altamira, Sepanyol
- Stonehenge, Britain
- Catal Huyuk, Turki
- Zhoukoudian, China

Tapak-tapak ini penting kerana membuktikan bahawa manusia prasejarah hidup di pelbagai benua dan meninggalkan kesan kehidupan mereka.

3.3 Ciri-ciri Kehidupan Manusia Zaman Prasejarah

Tempat Kediaman
- Paleolitik: tinggal di gua, tepi tasik, pinggir sungai atau tempat terlindung
- Mesolitik: masih tinggal di gua dan kawasan berhampiran air
- Neolitik: mula menetap di kawasan tertentu, biasanya berhampiran sungai dan tanah subur
- Zaman Logam: hidup lebih teratur dan menetap di lembah sungai, kawasan subur dan strategik

Peralatan
- Paleolitik: menggunakan alat batu yang kasar, ringkas dan belum dicanai
- Mesolitik: alat batu lebih kecil dan lebih halus, contohnya mikrolit
- Neolitik: alat batu dicanai halus, lebih kemas dan lebih berfungsi
- Zaman Logam: menggunakan alatan gangsa dan besi yang lebih kuat dan tahan lama

Pengumpulan Makanan
- Paleolitik: memburu binatang liar, memungut hasil hutan dan menangkap ikan
- Mesolitik: masih memburu, memungut hasil hutan dan menangkap ikan, tetapi lebih mahir menggunakan alat kecil
- Neolitik: mula bercucuk tanam dan menternak haiwan
- Zaman Logam: pertanian dan penternakan semakin maju

Kegiatan Ekonomi
- Paleolitik: ekonomi secara asas, bergantung pada alam
- Mesolitik: masih bergantung pada pemburuan dan pengumpulan makanan
- Neolitik: pertanian berkembang, manusia mula menghasilkan lebihan makanan
- Zaman Logam: perdagangan berkembang, termasuk pertukaran barang dan perdagangan melalui laut

Organisasi Sosial
- Paleolitik dan Mesolitik: hidup secara kecil-kecilan dalam kumpulan
- Neolitik: wujud pembahagian kerja dan ketua
- Zaman Logam: masyarakat lebih tersusun, ada pemimpin, petani, artisan dan golongan lain

Kepercayaan
- Paleolitik: berkepercayaan animisme, iaitu percaya setiap benda mempunyai semangat
- Neolitik: kepercayaan lebih tersusun
- Zaman Logam: wujud upacara keagamaan dan tempat ibadat

Kesenian dan Kebudayaan
- Paleolitik: lukisan pada dinding gua dan ukiran ringkas
- Mesolitik: alat dan corak kehidupan lebih kemas
- Neolitik: pembuatan tembikar dan hiasan yang lebih baik
- Zaman Logam: kesenian pada peralatan logam, termasuk hiasan dan gendang gangsa

3.4 Kesinambungan Sumbangan Zaman Prasejarah kepada Kemajuan Kehidupan Manusia
Walaupun Zaman Prasejarah sudah lama berlalu, banyak sumbangannya masih memberi kesan hingga hari ini.

Antara sumbangannya:
- penggunaan alat batu membawa kepada penciptaan alat moden
- kemahiran memburu dan mengumpul berkembang menjadi ilmu pengurusan sumber
- pertanian awal menjadi asas pertanian moden
- penternakan awal membantu bekalan makanan manusia
- kehidupan menetap menjadi asas pembinaan kampung, bandar dan negara
- pembuatan tembikar menjadi asas industri kraf dan pembuatan
- penggunaan logam menjadi asas teknologi moden

3.5 Zaman Prasejarah di Malaysia

Lokasi
Antara tapak prasejarah utama di Malaysia ialah:
- Kota Tampan, Perak
- Gua Niah, Sarawak
- Gua Cha, Kelantan
- Bukit Tengkorak, Sabah
- Sungai Lang, Selangor
- Lembah Bernam, Selangor

Bukit dan gua ini dipilih kerana sesuai untuk manusia prasejarah berlindung, tinggal dan menjalankan kegiatan harian.

Bukti Penemuan
Antara bukti penemuan penting:
- alat batu
- tembikar
- peralatan logam
- tinggalan rangka manusia
- lukisan dan kesan aktiviti kehidupan

Antara bukti terkenal ialah Perak Man di Gua Gunung Runtuh, Lenggong, Perak.

Kepentingan Tapak Prasejarah
Tapak prasejarah penting kerana:
- membuktikan kewujudan manusia awal di Malaysia
- menunjukkan cara hidup masyarakat dahulu
- membantu ahli sejarah mengkaji perkembangan manusia
- menambah pengetahuan tentang asal usul negara
- menjadi khazanah warisan yang perlu dipelihara

💡 Tip Ingatan
- Paleolitik = batu kasar
- Mesolitik = batu kecil
- Neolitik = batu halus
- Logam = gangsa dan besi
- Prasejarah = sebelum tulisan

⚠️ Kesilapan Lazim
- menyangka prasejarah bermaksud zaman selepas tulisan
- tertukar ciri Paleolitik, Mesolitik dan Neolitik
- lupa bahawa Zaman Logam datang selepas Zaman Batu
- menganggap semua manusia prasejarah hidup sama
- lupa kepentingan tapak prasejarah di Malaysia

🌍 Aplikasi Kehidupan
Bab ini mengajar kita supaya:
- menghargai kemajuan hidup manusia
- menjaga tapak sejarah dan warisan negara
- memahami bagaimana manusia menyesuaikan diri dengan alam
- menghargai teknologi moden yang berasal daripada pengetahuan awal manusia

📝 Ringkasan Bab
Zaman Prasejarah ialah zaman sebelum tulisan. Zaman ini terbahagi kepada Zaman Batu dan Zaman Logam. Kehidupan manusia berubah daripada memburu kepada bertani, daripada hidup berpindah-randah kepada hidup menetap, dan daripada menggunakan batu kepada logam. Di Malaysia, banyak tapak prasejarah membuktikan kewujudan manusia awal dan warisan sejarah negara.

🎯 Apa Yang Perlu Anda Ingat?
- Prasejarah ialah zaman sebelum tulisan
- Zaman Prasejarah terbahagi kepada Zaman Batu dan Zaman Logam
- Paleolitik, Mesolitik dan Neolitik ialah tiga tahap Zaman Batu
- Manusia prasejarah berubah daripada nomad kepada hidup menetap
- Pertanian, penternakan dan logam ialah sumbangan penting zaman ini
- Tapak prasejarah di Malaysia ialah bukti penting kewujudan manusia awal

🚀 Teruskan ke Kuiz
Semak semula fakta utama, urutan zaman, ciri kehidupan dan tapak prasejarah.

🚀 Teruskan ke Flashcards
Ulang istilah penting seperti Paleolitik, Mesolitik, Neolitik, animisme dan Perak Man.`,
    keywords: [
      "Zaman Prasejarah",
      "Paleolitik",
      "Mesolitik",
      "Neolitik",
      "Zaman Logam",
      "Kota Tampan",
      "Gua Niah",
      "Gua Cha",
      "Bukit Tengkorak",
      "Sungai Lang",
      "Pentas Sunda",
      "Perak Man",
      "Lenggong",
      "mikrolit",
      "tembikar",
      "gangsa",
      "besi",
      "nomad",
      "animisme",
      "megalitik",
    ],
  },
  {
    id: "sej-f1-c4-note",
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 4",
    title: "Mengenali Tamadun",
    summary: `🚀 Misi Bab
Bab 4 menerangkan maksud tamadun, konsep tamadun menurut Islam dan Barat, serta ciri-ciri tamadun awal dunia yang menjadi asas kemajuan manusia.

🎯 Objektif Pembelajaran
Selepas belajar bab ini, anda boleh:
- menerangkan maksud tamadun
- membezakan masyarakat bertamadun dan belum bertamadun
- menghuraikan konsep tamadun menurut perspektif Islam dan Barat
- membandingkan persamaan dan perbezaan kedua-dua konsep tamadun
- menjelaskan sembilan ciri tamadun awal dunia

🌍 Mengapa Bab Ini Penting?
Bab ini penting kerana tamadun ialah asas kepada kehidupan moden. Kita belajar bagaimana manusia membina bandar, sistem kerajaan, tulisan, ekonomi, seni dan teknologi sehingga lahirlah kehidupan yang lebih teratur.

📖 Nota Lengkap

4.1 Maksud Tamadun

Maksud Tamadun
Tamadun ialah keadaan masyarakat yang maju dalam bidang lahiriah dan rohaniah.

Maksud yang lebih mudah:
- masyarakat hidup teratur
- ada ilmu, nilai, undang-undang dan kemajuan
- bukan hanya bangunan tinggi atau teknologi canggih

Dalam bahasa Melayu, tamadun juga disebut sebagai peradaban.

Dalam bahasa Yunani:
- civitas bermaksud bandar atau kota

Dalam bahasa Inggeris:
- civilization bermaksud tahap kebudayaan yang tinggi dan kompleks

Dalam bahasa Arab:
- mudun
- madain
- madana
- hadharah
- madaniyyah

Maksud umum:
- mudun dan madain berkaitan bandar atau kota
- madana berkaitan tinggi budi bahasa dan pembukaan bandar
- hadharah berkaitan kawasan, daerah atau kota
- madaniyyah berkaitan taraf kehidupan yang maju

💡 Mudah Ingat
Tamadun bukan sekadar “besar dan moden”, tetapi “maju, berilmu dan berbudi”.

Ciri Umum Tamadun
Antara ciri umum tamadun ialah:
- kehidupan tersusun
- masyarakat berorganisasi
- ada sistem pemerintahan
- ada undang-undang
- ada kegiatan ekonomi
- ada tulisan
- ada teknologi
- ada kesenian dan kebudayaan

Perbezaan masyarakat bertamadun dan belum bertamadun

| Masyarakat bertamadun | Masyarakat belum bertamadun |
| --- | --- |
| Hidup teratur | Hidup lebih bebas dan tidak tetap |
| Ada bandar | Tiada bandar yang tersusun |
| Ada undang-undang | Kurang sistem peraturan |
| Ada tulisan dan rekod | Belum ada sistem tulisan |
| Ada pengkhususan kerja | Semua orang melakukan kerja asas |
| Ada seni, budaya dan teknologi | Kemajuan masih sangat terhad |

Mengapa penting?
- memudahkan hidup bersama
- mengelakkan kacau-bilau
- membantu kemajuan ekonomi dan ilmu

4.2 Konsep Tamadun

Konsep tamadun menurut perspektif Islam
Islam melihat tamadun sebagai kemajuan yang seimbang antara:
- lahiriah atau kebendaan
- rohaniah atau kerohanian

Maksudnya:
- manusia perlu maju dalam ilmu, ekonomi dan teknologi
- tetapi akhlak, nilai dan agama mesti ada

Tokoh penting:
- Syed Naquib al-Attas menekankan kehalusan budi pekerti, adab dan kebudayaan yang luhur
- Ibn Khaldun mengaitkan tamadun dengan \`umran\` dan \`hadari\`, iaitu kehidupan bermasyarakat yang tersusun

Konsep tamadun menurut perspektif Barat
Barat lebih menumpukan pembangunan lahiriah.

Maksudnya:
- kemajuan bandar
- kemajuan ilmu dan teknologi
- kemajuan seni, undang-undang dan organisasi masyarakat

Tokoh penting:
- Arnold J. Toynbee melihat tamadun sebagai sistem masyarakat yang membantu manusia maju dalam kesenian, penulisan, undang-undang dan sains

Persamaan dan perbezaan kedua-dua konsep

Persamaan:
- kedua-duanya melihat tamadun sebagai kemajuan manusia
- kedua-duanya mengiktiraf sistem kehidupan yang teratur
- kedua-duanya mengaitkan tamadun dengan pencapaian masyarakat

Perbezaan:

| Perspektif Islam | Perspektif Barat |
| --- | --- |
| Seimbang antara lahiriah dan rohaniah | Lebih menekankan lahiriah |
| Akhlak, agama dan budi pekerti penting | Kemajuan fizikal dan material lebih ditonjolkan |
| Tamadun mesti berteras nilai murni | Tamadun dinilai melalui pencapaian kebendaan |

💡 Mudah Ingat
- Islam = seimbang
- Barat = lebih fokus pada fizikal

Mengapa konsep ini penting?
- supaya kita faham tamadun tidak boleh diukur pada bangunan sahaja
- supaya kita sedar akhlak sama penting dengan kemajuan

4.3 Ciri-ciri Tamadun Awal Dunia

1. Pembentukan bandar
Definisi:
- pembinaan penempatan yang tersusun dan menjadi pusat masyarakat

Penerangan mudah:
- bandar lahir apabila penduduk semakin ramai
- bandar menjadi pusat pentadbiran, ekonomi dan keagamaan

Contoh:
- Ur, Uruk dan Babylon dalam Tamadun Mesopotamia
- Memphis dalam Tamadun Mesir Purba

Mengapa penting?
- bandar memudahkan pengurusan penduduk dan kegiatan ekonomi

2. Sistem pemerintahan
Definisi:
- cara sesebuah masyarakat diketuai dan diurus

Penerangan mudah:
- tamadun awal memerlukan pemimpin untuk menjaga keamanan dan mengurus rakyat
- raja biasanya memegang kuasa tertinggi

Contoh:
- Raja Hammurabi di Mesopotamia
- Firaun di Mesir Purba

Mengapa penting?
- sistem pemerintahan mewujudkan ketertiban dan keadilan

3. Agama dan kepercayaan
Definisi:
- kepercayaan masyarakat terhadap kuasa atau tuhan

Penerangan mudah:
- masyarakat awal percaya kepada banyak tuhan atau kuasa alam
- agama menjadi panduan hidup dan upacara

Contoh:
- politeisme
- ziggurat sebagai tempat ibadat di Mesopotamia
- piramid berkaitan kepercayaan kehidupan selepas mati di Mesir

Mengapa penting?
- agama membentuk nilai dan cara hidup masyarakat

4. Pengkhususan pekerjaan
Definisi:
- pembahagian kerja mengikut kemahiran tertentu

Penerangan mudah:
- apabila makanan mencukupi, tidak semua orang perlu bertani
- ada yang menjadi petani, artisan, pedagang, askar dan pegawai

Contoh:
- artisan membuat tembikar dan alat logam
- pedagang menjalankan urusan jual beli

Mengapa penting?
- kerja menjadi lebih cekap
- ekonomi berkembang

5. Sistem ekonomi
Definisi:
- cara masyarakat menghasilkan, mengguna dan menukar barang

Penerangan mudah:
- ekonomi tamadun awal bermula dengan pertanian
- lebihan hasil pertanian menyebabkan perdagangan berkembang
- barter digunakan sebelum wujud mata wang

Contoh:
- petani menukar gandum dengan tembikar
- pedagang menjalankan pertukaran barang di pasar

Mengapa penting?
- ekonomi yang baik membantu bandar dan kerajaan berkembang

6. Organisasi sosial
Definisi:
- susunan lapisan masyarakat mengikut kedudukan dan peranan

Penerangan mudah:
- masyarakat tamadun awal tidak sama rata
- ada golongan atasan dan golongan bawahan
- susunannya seperti piramid

Contoh:
- raja di atas
- bangsawan, pendeta dan pegawai di tengah
- petani, artisan dan hamba di bawah

Mengapa penting?
- memudahkan pembahagian tugas dan pentadbiran

7. Tulisan dan penyimpanan rekod
Definisi:
- sistem untuk mencatat maklumat penting

Penerangan mudah:
- tulisan digunakan untuk menyimpan rekod cukai, undang-undang, perniagaan dan sejarah
- tanpa tulisan, pentadbiran menjadi sukar

Contoh:
- kuneiform di Mesopotamia
- hieroglif di Mesir
- ideogram di China

Mengapa penting?
- tulisan memudahkan komunikasi dan penyimpanan ilmu

💡 Mudah Ingat
Tulisan = simpan ilmu dan rekod

8. Teknologi
Definisi:
- penggunaan alat dan pengetahuan untuk memudahkan kehidupan

Penerangan mudah:
- tamadun awal mencipta alat yang membantu pertanian, pengangkutan dan pembinaan

Contoh:
- roda
- gangsa
- besi
- sistem pengairan

Mengapa penting?
- teknologi meningkatkan hasil kerja dan memudahkan hidup

9. Kesenian dan kesusasteraan
Definisi:
- hasil ciptaan seni dan karya tulisan yang menunjukkan budaya masyarakat

Penerangan mudah:
- tamadun awal menghasilkan patung, ukiran, lukisan dan karya sastera
- kesusasteraan juga menceritakan raja, dewa dan peristiwa penting

Contoh:
- patung dewa
- lukisan dinding
- Epik Gilgamesh

Mengapa penting?
- seni dan sastera menunjukkan identiti serta pemikiran sesuatu tamadun

📦 Fakta Penting
- Tamadun = kemajuan masyarakat yang teratur
- Peradaban = istilah tamadun dalam bahasa Melayu
- Islam menekankan keseimbangan lahiriah dan rohaniah
- Barat lebih menekankan pembangunan fizikal
- Ciri tamadun awal ada 9
- Bandar, tulisan dan sistem pemerintahan ialah asas tamadun

💡 Tip Ingatan
- \`Bandar\` untuk masyarakat ramai
- \`Raja\` untuk pemerintahan
- \`Tuhan\` untuk agama
- \`Kerja khas\` untuk pengkhususan pekerjaan
- \`Barter\` untuk ekonomi awal
- \`Piramid\` untuk sosial
- \`Tulisan\` untuk rekod
- \`Roda\` untuk teknologi
- \`Seni\` untuk kesenian

⚠️ Kesilapan Lazim
- menyangka tamadun hanya bermaksud bangunan tinggi
- tertukar pandangan Islam dan Barat
- lupa bahawa akhlak juga sebahagian daripada tamadun
- mencampurkan ciri tamadun dengan ciri masyarakat biasa
- menganggap tulisan tidak penting dalam tamadun

🌍 Aplikasi Kehidupan
Bab ini mengajar kita untuk:
- menghargai hidup beradab
- mematuhi undang-undang
- menghormati perbezaan budaya
- menggunakan teknologi dengan bijak
- membina masyarakat yang maju tetapi berakhlak

📝 Ringkasan Bab
Tamadun ialah kemajuan masyarakat yang merangkumi lahiriah dan rohaniah. Islam menekankan keseimbangan, manakala Barat lebih menumpukan pembangunan fizikal. Tamadun awal dunia mempunyai sembilan ciri utama, iaitu bandar, pemerintahan, agama, pekerjaan, ekonomi, sosial, tulisan, teknologi, serta kesenian dan kesusasteraan.

🎯 Apa Yang Perlu Anda Ingat?
- Tamadun bukan sekadar bangunan
- Tamadun mesti ada kemajuan dan nilai
- Islam menekankan keseimbangan, Barat menekankan fizikal
- Ciri tamadun awal ada 9
- Bandar, tulisan dan pemerintahan ialah asas penting tamadun
- Setiap ciri tamadun ada definisi, contoh dan kepentingan

🚀 Teruskan ke Kuiz
Uji semula maksud tamadun, konsep Islam dan Barat, serta sembilan ciri tamadun awal.

🚀 Teruskan ke Flashcard
Ulang istilah penting seperti civitas, civilization, madaniyyah, politeisme, barter, dan hieroglif.`,
    keywords: [
      "Mengenali Tamadun",
      "Pengertian Tamadun",
      "Peradaban",
      "Civitas",
      "Civilization",
      "Syed Naquib al-Attas",
      "Arnold J. Toynbee",
      "Tamadun Islam",
      "Tamadun Barat",
      "Ciri Tamadun Awal",
      "Kod Hammurabi",
      "Ziggurat",
      "Piramid",
      "Kuneiform",
      "Hieroglif",
      "Ideogram",
      "Barter",
      "Politeisme",
      "Artisan",
    ],
  },
  {
    id: "sej-f1-c5-note",
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 5",
    title: "Tamadun Awal Dunia",
    summary: `🚀 Misi Bab
Bab 5 memperkenalkan empat tamadun awal dunia dan menunjukkan bagaimana lokasi sungai, pertanian, pemerintahan, tulisan dan teknologi membantu tamadun berkembang.

🎯 Objektif Pembelajaran
Selepas belajar bab ini, anda boleh:
- menamakan empat tamadun awal dunia
- menerangkan lokasi dan faktor perkembangan setiap tamadun
- menghuraikan ciri utama setiap tamadun
- menjelaskan sumbangan tamadun awal kepada kehidupan moden
- membandingkan sumbangan tamadun awal dunia

🌍 Mengapa Bab Ini Penting?
Bab ini penting kerana tamadun awal menjadi asas kepada kehidupan moden. Kita belajar bahawa bandar, undang-undang, tulisan, seni bina, pertanian dan teknologi hari ini berkembang daripada idea manusia pada zaman dahulu.

📖 Nota Lengkap

5.1 Empat Lokasi Tamadun Awal Dunia

Empat tamadun awal dunia ialah:
- Tamadun Mesopotamia
- Tamadun Mesir Purba
- Tamadun Indus
- Tamadun Huang He

Setiap tamadun berkembang di lembah sungai kerana:
- air diperlukan untuk pertanian
- tanah menjadi subur selepas banjir
- manusia mudah mendapatkan makanan
- pengangkutan dan perdagangan lebih mudah

💡 Mudah Ingat
Empat tamadun awal dunia = Mesopotamia, Mesir, Indus dan Huang He.

A. Tamadun Mesopotamia

Lokasi
Tamadun Mesopotamia berkembang di antara Sungai Tigris dan Sungai Euphrates.

Mengapa di situ?
- kawasan itu subur
- sungainya membekalkan air untuk pertanian
- tanah aluvium sesuai untuk bercucuk tanam

Faktor perkembangan
- air sungai untuk pertanian
- tanah subur
- kedudukan strategik untuk perdagangan
- penduduk boleh tinggal tetap kerana bekalan makanan stabil

Ciri utama
- bandar wujud sebagai negara kota
- sistem pemerintahan beraja
- masyarakat tersusun
- tulisan berkembang
- undang-undang digubal

Pemerintahan
- setiap negara kota mempunyai pemerintah sendiri
- raja memegang kuasa tertinggi
- raja dibantu oleh pegawai, pendeta dan bangsawan

Kegiatan ekonomi
- pertanian ialah asas ekonomi
- perdagangan berkembang apabila hasil pertanian berlebihan
- pertukaran barang berlaku melalui barter

Agama dan kepercayaan
- percaya kepada banyak tuhan
- ziggurat menjadi tempat ibadat dan pusat aktiviti keagamaan

Teknologi
- roda
- sistem pengairan
- pembinaan ziggurat
- pengiraan masa dan bulatan menggunakan Sistem 60

Sistem tulisan
- kuneiform
- ditulis pada kepingan tanah liat

Sumbangan
- Kod Hammurabi
- Sistem 60
- tulisan kuneiform
- perkembangan ilmu astronomi
- karya sastera seperti Epik Gilgamesh

Fakta penting
- Ur, Uruk dan Babylon ialah negara kota terkenal
- Kod Hammurabi ialah undang-undang bertulis yang penting

💡 Mudah Ingat
Mesopotamia = sungai dua, negara kota, kod undang-undang dan kuneiform.

B. Tamadun Mesir Purba

Lokasi
Tamadun Mesir Purba berkembang di Lembah Sungai Nil.

Mengapa di situ?
- Sungai Nil membekalkan air
- banjir tahunan menjadikan tanah subur
- pertanian boleh dijalankan dengan baik

Faktor perkembangan
- tanah subur di tepi Nil
- air mencukupi sepanjang tahun
- banjir membawa mendapan lumpur yang subur
- kehidupan lebih stabil dan teratur

Ciri utama
- pemerintah utama ialah Firaun
- masyarakat tersusun
- pembinaan besar seperti piramid
- kepercayaan terhadap kehidupan selepas mati

Pemerintahan
- Firaun ialah ketua negara dan dianggap wakil tuhan
- dibantu oleh wazir dan pegawai kerajaan

Kegiatan ekonomi
- pertanian di tepi Sungai Nil
- pengumpulan hasil pertanian
- perdagangan dengan kawasan luar

Agama dan kepercayaan
- percaya kepada banyak tuhan
- percaya kepada kehidupan selepas mati
- mumia dibuat untuk menjaga mayat

Teknologi
- geometri
- pembinaan piramid
- penghasilan kertas papirus
- ilmu perubatan dan mumia

Sistem tulisan
- hieroglif
- digunakan pada dinding, papirus dan monumen

Sumbangan
- piramid
- kertas papirus
- ilmu perubatan
- ilmu matematik dan geometri
- tulisan hieroglif

Fakta penting
- Sungai Nil ialah nadi tamadun Mesir
- Herodotus menggelar Mesir sebagai Hadiah Sungai Nil

💡 Mudah Ingat
Mesir = Nil, Firaun, piramid dan hieroglif.

C. Tamadun Indus

Lokasi
Tamadun Indus berkembang di Lembah Sungai Indus.

Mengapa di situ?
- tanah subur
- air sungai untuk pertanian
- sesuai untuk pembentukan bandar
- kedudukan memudahkan perdagangan

Faktor perkembangan
- sungai menyediakan air
- tanah subur
- masyarakat mampu membina bandar terancang
- perdagangan berkembang dengan baik

Ciri utama
- bandar terancang
- sistem perparitan yang baik
- rumah dibina mengikut pelan yang teratur
- masyarakat mempunyai kemudahan asas

Pemerintahan
- wujud sistem pentadbiran yang teratur
- bandar dikawal dengan baik walaupun bukti raja sangat terhad

Kegiatan ekonomi
- pertanian
- penternakan
- perdagangan

Agama dan kepercayaan
- terdapat kepercayaan dan upacara tertentu
- penemuan arkeologi menunjukkan kehidupan masyarakat yang tersusun

Teknologi
- pembinaan bandar mengikut pelan grid
- sistem kumbahan dan perparitan
- penggunaan batu bata bersaiz seragam

Sistem tulisan
- piktograf atau tulisan simbol
- masih belum dapat dibaca sepenuhnya

Sumbangan
- bandar terancang
- sistem saliran dan pembetungan
- batu bata seragam
- perancangan bandar yang sistematik

Fakta penting
- Mohenjo-Daro dan Harappa ialah bandar terkenal
- The Great Bath menunjukkan kebolehan masyarakat Indus dalam pembinaan

💡 Mudah Ingat
Indus = bandar terancang, saliran baik dan rumah tersusun.

D. Tamadun Huang He

Lokasi
Tamadun Huang He berkembang di Lembah Sungai Huang He, iaitu Sungai Kuning di China.

Mengapa di situ?
- sungai membekalkan air
- tanah subur sesuai untuk pertanian
- kawasan lembah memudahkan petempatan

Faktor perkembangan
- pertanian di lembah sungai
- kesuburan tanah
- masyarakat menetap di kawasan sesuai
- kemajuan alat dan teknik pertanian

Ciri utama
- pemerintahan dinasti
- pertanian penting
- tulisan berkembang
- kemahiran teknologi semakin maju

Pemerintahan
- pemerintah memegang kuasa besar
- dinasti-dinasti awal memerintah kawasan luas
- konsep Mandat dari Syurga digunakan untuk mengesahkan kuasa pemerintah

Kegiatan ekonomi
- pertanian
- penternakan
- perdagangan

Agama dan kepercayaan
- percaya kepada kuasa syurga
- upacara dan ramalan digunakan dalam kehidupan

Teknologi
- penggunaan besi
- penghasilan sutera
- pembuatan alat pertanian

Sistem tulisan
- ideogram
- ditulis pada tulang sula dan bahan lain

Sumbangan
- tulisan ideogram
- sutera
- penggunaan besi
- terusan dan alat pertanian

Fakta penting
- Huang He bermaksud Sungai Kuning
- Tulang Sula digunakan untuk meramal dan mencatat

💡 Mudah Ingat
Huang He = Sungai Kuning, dinasti, ideogram dan sutera.

5.2 Perbandingan Sumbangan Tamadun Awal

Pemerintahan
- Mesopotamia: raja mengetuai negara kota
- Mesir Purba: Firaun memerintah sebagai wakil tuhan
- Indus: pentadbiran teratur, tetapi bukti raja tidak jelas
- Huang He: dinasti memerintah dan konsep Mandat dari Syurga digunakan

Pertanian
- Mesopotamia: bergantung pada sistem pengairan
- Mesir Purba: sangat bergantung pada Sungai Nil
- Indus: pertanian di lembah sungai dan bandar terancang
- Huang He: pertanian berkembang di lembah Sungai Kuning

Sistem tulisan
- Mesopotamia: kuneiform
- Mesir Purba: hieroglif
- Indus: piktograf
- Huang He: ideogram

Teknologi
- Mesopotamia: roda dan Sistem 60
- Mesir Purba: piramid, geometri dan papirus
- Indus: sistem perparitan dan batu bata seragam
- Huang He: besi, sutera dan alat pertanian

Seni bina
- Mesopotamia: ziggurat
- Mesir Purba: piramid dan monumen besar
- Indus: rumah bandar dan The Great Bath
- Huang He: pembinaan kota dan bangunan yang tersusun

Pengangkutan
- Mesopotamia: roda memudahkan pengangkutan
- Mesir Purba: pengangkutan di Sungai Nil
- Indus: perdagangan darat dan sungai
- Huang He: penggunaan sungai dan laluan darat untuk pergerakan barang

Organisasi masyarakat
- semua tamadun mempunyai masyarakat yang tersusun
- wujud golongan pemerintah, pegawai, pekerja mahir dan rakyat biasa

Undang-undang
- Mesopotamia: Kod Hammurabi
- tamadun lain juga mempunyai peraturan dan pentadbiran tersusun

Keagamaan
- semua tamadun awal mempunyai kepercayaan yang kuat
- tempat ibadat dan upacara penting dalam kehidupan mereka

Perdagangan
- semua tamadun berkembang kerana lebihan hasil
- perdagangan membantu pertukaran barang, idea dan teknologi

| Tamadun | Sumbangan utama yang mudah diingat |
| --- | --- |
| Mesopotamia | Kod Hammurabi, kuneiform, roda, Sistem 60 |
| Mesir Purba | Piramid, hieroglif, papirus, perubatan |
| Indus | Bandar terancang, perparitan, batu bata seragam |
| Huang He | Ideogram, sutera, besi, Mandat dari Syurga |

Fakta penting perbandingan
- semua tamadun awal lahir di lembah sungai
- semua berkembang kerana pertanian dan organisasi masyarakat
- semua memberi sumbangan kepada dunia moden

📦 Fakta Penting
- Empat tamadun awal dunia berkembang di lembah sungai
- Sungai membantu pertanian, pengangkutan dan petempatan
- Mesopotamia terkenal dengan negara kota
- Mesir Purba terkenal dengan Firaun dan piramid
- Indus terkenal dengan bandar terancang
- Huang He terkenal dengan dinasti, sutera dan ideogram

💡 Tip Ingatan
Untuk hafal empat tamadun:
- \`Me\`sopotamia
- \`Me\`sir
- \`In\`dus
- \`Huang\` He

⚠️ Kesilapan Lazim
- tertukar lokasi empat tamadun awal
- menyangka semua tamadun mempunyai ciri yang sama
- lupa bahawa sungai ialah faktor penting perkembangan
- tertukar tulisan kuneiform, hieroglif, piktograf dan ideogram
- menganggap tamadun hanya berlaku kerana bangunan besar

🌍 Aplikasi Kehidupan
Bab ini membantu kita memahami bahawa:
- bandar moden juga perlu perancangan yang baik
- undang-undang penting untuk keamanan
- teknologi memudahkan kehidupan
- tulisan dan rekod penting untuk pengurusan
- kemajuan mesti seimbang dengan nilai

📝 Ringkasan Bab
Bab 5 menerangkan empat tamadun awal dunia yang berkembang di lembah sungai. Mesopotamia, Mesir Purba, Indus dan Huang He masing-masing mempunyai lokasi, faktor perkembangan, ciri, pemerintahan, ekonomi, agama, teknologi, tulisan dan sumbangan yang besar kepada tamadun manusia.

🎯 Apa Yang Perlu Anda Ingat?
- Empat tamadun awal dunia ialah Mesopotamia, Mesir Purba, Indus dan Huang He
- Semua tamadun berkembang di lembah sungai
- Sungai penting untuk air, pertanian dan perdagangan
- Setiap tamadun ada tulisan dan teknologi tersendiri
- Setiap tamadun memberi sumbangan penting kepada dunia moden
- Perbandingan sumbangan membantu kita nampak persamaan dan keunikan setiap tamadun

🚀 Teruskan ke Kuiz
Semak lokasi, ciri, sumbangan dan perbandingan empat tamadun awal dunia.

🚀 Teruskan ke Flashcard
Ulang nama tamadun, sungai, tulisan, sumbangan dan fakta penting setiap tamadun.`,
    keywords: [
      "Tamadun Mesopotamia",
      "Tamadun Mesir Purba",
      "Tamadun Indus",
      "Tamadun Huang He",
      "Bulan Sabit Subur",
      "Sungai Tigris",
      "Sungai Euphrates",
      "Sungai Nil",
      "Sungai Indus",
      "Sungai Huang He",
      "Ziggurat",
      "Kod Hammurabi",
      "Kuneiform",
      "Epik Gilgamesh",
      "Sistem 60",
      "Firaun",
      "Wazir",
      "Mumia",
      "Piramid",
      "Hieroglif",
      "Mohenjo-Daro",
      "Harappa",
      "The Great Bath",
      "Meterai Indus",
      "Perancangan Grid",
      "Mandat dari Syurga",
      "Tulang Sula",
      "Oracle Bones",
      "Ideogram",
      "Sutera",
      "Herodotus",
      "Hammurabi",
      "Ur",
      "Uruk",
      "Babylon",
    ],
  },
  {
    id: "sej-f1-c6-note",
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 6",
    title: "Peningkatan Tamadun Yunani dan Rom",
    summary: `🚀 Misi Bab
Bab 6 menerangkan perkembangan Tamadun Yunani dan Rom, perubahan sistem pemerintahan, serta peningkatan seni bina Rom yang menjadi asas banyak idea moden.

🎯 Objektif Pembelajaran
Selepas belajar bab ini, anda boleh:
- menerangkan latar belakang Tamadun Yunani dan Rom
- menjelaskan ciri-ciri polis dan kehidupan masyarakat Yunani
- menghuraikan perubahan sistem pemerintahan Yunani
- menerangkan perkembangan Tamadun Rom
- menjelaskan peningkatan seni bina dalam Tamadun Rom

🌍 Mengapa Bab Ini Penting?
Bab ini penting kerana banyak idea moden datang daripada Yunani dan Rom, seperti demokrasi, undang-undang, seni bina, jalan raya dan sistem pentadbiran. Bab ini juga membantu kita faham bagaimana tamadun berubah apabila masyarakat menjadi semakin besar dan kompleks.

📖 Nota Lengkap

6.1 Tamadun Yunani

Latar belakang Tamadun Yunani
Tamadun Yunani berkembang di kawasan berbukit-bukau, pulau-pulau dan kawasan pantai di sekitar Laut Aegean dan Laut Mediterranean.

Mengapa di situ?
- bentuk muka bumi yang bergunung-ganang menyebabkan kawasan terpisah
- banyak pulau memudahkan perkembangan bandar kecil yang berdikari
- laut memudahkan perhubungan dan perdagangan

Lokasi
Tamadun Yunani berkembang di:
- Semenanjung Greece
- Kepulauan Laut Aegean
- kawasan sekitar Laut Mediterranean

Polis
Polis ialah negara kota Yunani.

Maksud mudah:
- satu bandar utama bersama kawasan sekitarnya
- setiap polis mempunyai kerajaan sendiri
- setiap polis berdikari

Ciri-ciri polis
- ada bandar utama
- ada kawasan kampung atau luar bandar
- ada sistem pemerintahan sendiri
- ada pusat pentadbiran, pasar dan tempat ibadat
- polis biasanya dikelilingi oleh kawasan pertahanan
- Acropolis ialah kawasan tinggi yang menjadi pusat pertahanan dan keagamaan
- Agora ialah kawasan terbuka yang menjadi tempat perhimpunan dan perdagangan

Contoh polis terkenal:
- Athens
- Sparta
- Corinth

Athens
Athens terkenal sebagai polis yang:
- mempunyai penduduk paling ramai
- menekankan pendidikan, seni, falsafah dan demokrasi
- menjadi pusat perdagangan dan kebudayaan

Kehidupan masyarakat Athens:
- ada golongan warganegara, bukan warganegara, wanita dan hamba
- warganegara lelaki dewasa boleh terlibat dalam politik
- masyarakat mengutamakan ilmu dan perbincangan awam

Sparta
Sparta terkenal sebagai polis yang:
- menekankan disiplin dan ketenteraan
- mempunyai wilayah yang luas
- menumpukan kekuatan tentera darat

Kehidupan masyarakat Sparta:
- kehidupan yang keras dan teratur
- kanak-kanak lelaki dilatih menjadi askar
- wanita Sparta lebih bebas berbanding wanita Athens
- masyarakat sangat mementingkan kesetiaan dan kekuatan

Kehidupan masyarakat
Masyarakat Yunani hidup dalam polis yang berasingan.

Kehidupan harian mereka bergantung pada:
- pertanian
- perdagangan
- seni
- peperangan
- perbincangan politik

💡 Mudah Ingat
Yunani = polis, Athens = ilmu dan demokrasi, Sparta = tentera dan disiplin.

Fakta penting
- Polis ialah asas organisasi politik Yunani
- Athens dan Sparta sering dibandingkan kerana cara hidupnya sangat berbeza

6.2 Peningkatan Pemerintahan dan Pentadbiran Tamadun Yunani

Perubahan sistem pemerintahan berlaku apabila masyarakat menjadi lebih ramai dan polis menjadi lebih kompleks.

1. Monarki
Maksud
- sistem pemerintahan oleh seorang raja
- kuasa diwarisi melalui keturunan

Ciri-ciri
- raja menjadi pemerintah tertinggi
- kuasa biasanya diwarisi
- rakyat taat kepada raja

Bagaimana sistem berfungsi
- raja membuat keputusan utama
- pembesar membantu raja
- rakyat perlu patuh

Mengapa berubah kepada sistem seterusnya?
- kuasa raja terlalu kuat
- golongan bangsawan mahu berkongsi kuasa
- masyarakat menjadi lebih besar dan rumit

Analogi mudah
- seperti ketua keluarga yang mahu semua keputusan datang daripada seorang sahaja

💡 Mudah Ingat
Monarki = satu raja, satu kuasa.

2. Oligarki
Maksud
- sistem pemerintahan oleh sekumpulan kecil orang berkuasa

Ciri-ciri
- kuasa dipegang oleh beberapa orang
- biasanya golongan kaya atau bangsawan
- rakyat biasa tidak banyak suara

Bagaimana sistem berfungsi
- kumpulan kecil membuat keputusan
- mereka menguasai politik dan ekonomi

Mengapa berubah kepada sistem seterusnya?
- rakyat tidak puas hati kerana kuasa terlalu terhad
- golongan bangsawan pula mahu lebih pengaruh
- muncul persaingan dalam kalangan golongan atasan

Analogi mudah
- seperti satu kelas yang hanya dibenarkan beberapa orang pelajar menentukan semua keputusan

💡 Mudah Ingat
Oligarki = kuasa kumpulan kecil.

3. Aristokrasi
Maksud
- sistem pemerintahan oleh golongan bangsawan

Ciri-ciri
- bangsawan memegang kuasa
- dipilih kerana dianggap paling mulia atau berketurunan baik
- rakyat biasa masih kurang kuasa

Bagaimana sistem berfungsi
- bangsawan mengurus polis
- keputusan dibuat oleh golongan elit

Mengapa berubah kepada sistem seterusnya?
- rakyat biasa tidak berpuas hati
- muncul penentangan terhadap kuasa bangsawan
- masyarakat mahukan perubahan yang lebih adil

Analogi mudah
- seperti hanya pelajar yang paling kaya atau paling terkenal diberi kuasa membuat semua peraturan

💡 Mudah Ingat
Aristokrasi = kuasa bangsawan.

4. Tirani
Maksud
- pemerintahan oleh seorang pemerintah yang menggunakan kuasa secara zalim

Ciri-ciri
- kuasa dipegang oleh seorang individu
- pemerintah boleh bertindak keras
- rakyat ditekan atau ditindas

Bagaimana sistem berfungsi
- pemerintah mengambil kuasa melalui sokongan rakyat atau kekacauan politik
- selepas berkuasa, dia memerintah secara keras

Mengapa berubah kepada sistem seterusnya?
- rakyat bosan dengan pemerintahan zalim
- muncul keinginan untuk pemerintahan yang memberi suara kepada rakyat
- rakyat mahu keadilan dan penyertaan dalam pentadbiran

Analogi mudah
- seperti seorang ketua yang mula-mula dipilih untuk membantu, tetapi kemudian memaksa semua orang ikut kehendaknya

💡 Mudah Ingat
Tirani = kuasa seorang yang zalim.

5. Demokrasi
Maksud
- sistem pemerintahan yang memberi kuasa kepada rakyat

Ciri-ciri
- rakyat terlibat dalam membuat keputusan
- ada perbincangan dan undian
- lebih adil berbanding sistem sebelumnya

Bagaimana sistem berfungsi
- rakyat bersuara melalui dewan atau perhimpunan
- pegawai dipilih untuk menjalankan tugas
- keputusan dibuat secara majoriti

Mengapa berlaku perubahan?
- rakyat mahu hak bersuara
- rakyat tidak mahu diperintah secara zalim
- masyarakat mahu pentadbiran yang lebih adil dan terbuka

Analogi mudah
- seperti kelas yang membenarkan murid mengundi untuk memilih ketua kelas

💡 Mudah Ingat
Demokrasi = rakyat ada suara.

Perbandingan sistem pemerintahan Yunani

| Sistem | Siapa memerintah? | Ciri utama | Sebab berubah |
| --- | --- | --- | --- |
| Monarki | Raja | Kuasa diwarisi | Bangsawan mahu kuasa |
| Oligarki | Kumpulan kecil | Kuasa terhad | Rakyat dan golongan lain tidak puas hati |
| Aristokrasi | Bangsawan | Kuasa golongan elit | Rakyat mahukan perubahan |
| Tirani | Seorang pemerintah | Pemerintah zalim | Rakyat mahukan keadilan |
| Demokrasi | Rakyat | Kuasa rakyat | Inilah bentuk yang lebih adil dan terbuka |

Mengapa perubahan ini penting?
- menunjukkan masyarakat Yunani semakin matang
- mengajar bahawa kuasa perlu ada had
- membantu lahirnya idea demokrasi moden

6.3 Tamadun Rom

Latar belakang
Tamadun Rom bermula di Semenanjung Itali.

Lokasi
- berkembang di Lembah Sungai Tiber
- berhampiran Laut Mediterranean

Mengapa di situ?
- lokasi sesuai untuk perdagangan
- kedudukan strategik untuk peluasan kuasa
- mudah berhubung dengan kawasan lain di Mediterranean

Perkembangan Tamadun Rom
Tamadun Rom melalui tiga tahap utama:
- Zaman Beraja
- Zaman Republik
- Zaman Empayar

Zaman Beraja
- Rom diperintah oleh raja
- kuasa tertumpu pada pemerintah

Zaman Republik
- kuasa raja diganti dengan wakil rakyat dan pegawai
- senat memainkan peranan penting

Zaman Empayar
- Rom menjadi empayar besar
- pemerintah bergelar maharaja
- zaman ini terkenal dengan Pax Romana, iaitu keamanan Rom

Pemerintahan
- pada awalnya beraja
- kemudian republik
- akhirnya empayar
- sistem ini menunjukkan perkembangan politik yang sangat panjang

Kehidupan masyarakat
Masyarakat Rom terdiri daripada:
- Patrician, iaitu golongan atasan
- Plebeian, iaitu rakyat biasa seperti petani, pedagang dan artisan
- Hamba

Kehidupan harian:
- golongan atasan memegang kuasa dan kekayaan
- rakyat biasa bekerja dalam pertanian, perdagangan dan kraf
- hamba melakukan kerja berat

💡 Mudah Ingat
Rom = beraja, republik, empayar.

Fakta penting
- Rom berkembang menjadi empayar besar di Mediterranean
- Pax Romana membawa keamanan dan kestabilan

6.4 Peningkatan Seni Bina dalam Tamadun Rom

Seni bina Rom sangat maju kerana:
- ada arkitek yang mahir
- ada teknologi pembinaan seperti simen dan konkrit
- ada ramai buruh
- pemerintah mahu binaan yang besar dan megah

1. Colosseum
Apa itu
- bangunan besar berbentuk arena untuk pertunjukan

Fungsi
- tempat pertarungan gladiator
- tempat hiburan awam

Keistimewaan
- binaan sangat besar
- boleh memuatkan ramai penonton
- reka bentuknya sangat kukuh
- mempunyai ruang duduk berlapis-lapis untuk penonton
- berbentuk elips supaya semua orang dapat melihat pertunjukan dengan lebih baik

Kepentingan
- menunjukkan kehebatan seni bina Rom
- menjadi simbol kemegahan Rom

Sumbangan kepada tamadun
- memberi inspirasi kepada stadium dan arena moden

2. Pantheon
Apa itu
- bangunan kuil besar bagi tujuan keagamaan

Fungsi
- tempat pemujaan dan sembahyang

Keistimewaan
- kubah besar
- seni bina yang seimbang dan indah
- mempunyai oculus di bahagian atas kubah untuk memasukkan cahaya

Kepentingan
- membuktikan kebolehan Rom membina bangunan bertingkat tinggi dan berkubah besar

Sumbangan kepada tamadun
- mempengaruhi reka bentuk bangunan berkubah pada masa kini

3. Amfiteater
Apa itu
- gelanggang terbuka berbentuk bulat atau bujur

Fungsi
- pertandingan dan hiburan awam

Keistimewaan
- susunan tempat duduk melingkari gelanggang
- membolehkan ramai orang menonton

Kepentingan
- menunjukkan seni bina untuk kegunaan masyarakat ramai

Sumbangan kepada tamadun
- menjadi asas kepada arena dan stadium moden

4. Akueduk
Apa itu
- saluran air yang membawa air dari tempat tinggi ke bandar

Fungsi
- membekalkan air bersih kepada penduduk

Keistimewaan
- dibina dengan cerun yang tepat
- air mengalir dengan lancar melalui saluran
- menggunakan gerbang batu yang kuat untuk menyokong struktur

Kepentingan
- memastikan bandar sentiasa mempunyai bekalan air

Sumbangan kepada tamadun
- menjadi asas kepada sistem bekalan air moden

5. Jalan raya
Apa itu
- jaringan jalan yang dibina untuk menghubungkan kawasan

Fungsi
- memudahkan pergerakan tentera, pedagang dan penduduk

Keistimewaan
- dibina lurus dan kukuh
- tahan lama

Kepentingan
- memudahkan pentadbiran empayar yang luas

Sumbangan kepada tamadun
- mempengaruhi pembinaan jalan raya moden

6. Tembok pertahanan
Apa itu
- binaan untuk melindungi kawasan daripada serangan musuh

Fungsi
- mempertahankan bandar dan empayar

Keistimewaan
- dibina kukuh
- menjadi simbol kekuatan pertahanan
- contoh terkenal ialah Tembok Hadrian di Britain

Kepentingan
- melindungi penduduk dan harta benda

Sumbangan kepada tamadun
- memberi idea kepada benteng dan kubu moden

7. Tempat mandi awam
Apa itu
- tempat masyarakat mandi, berehat dan bersosial

Fungsi
- membersihkan badan
- tempat bertemu dan berinteraksi

Keistimewaan
- ada bilik mandi, kolam air panas dan sejuk
- direka untuk kegunaan ramai
- tempat ini juga dikenali sebagai thermae dalam tamadun Rom

Kepentingan
- menunjukkan kehidupan bandar yang maju

Sumbangan kepada tamadun
- memberi idea kepada kemudahan awam moden seperti pusat rekreasi

Mengapa seni bina Rom penting?
- menunjukkan kemahiran kejuruteraan tinggi
- membantu kehidupan harian
- menjadi warisan dunia hingga hari ini

📦 Fakta Penting
- Colosseum = arena hiburan
- Pantheon = kuil berkubah
- Akueduk = saluran bekalan air
- Jalan raya Rom = kukuh dan lurus
- Seni bina Rom mempengaruhi banyak bangunan moden

💡 Tip Ingatan
- \`C\`olosseum = \`C\`rowd / ramai penonton
- \`P\`antheon = \`P\`enyembahan
- \`A\`kueduk = \`A\`ir
- \`J\`alan raya = \`J\`auh dan luas
- \`T\`embok = \`T\`ahan serangan
- \`M\`andi awam = \`M\`asyarakat

⚠️ Kesilapan Lazim
- menyangka polis ialah negara seluruh Greece
- tertukar Athens dengan Sparta
- menganggap demokrasi sama seperti tirani
- lupa bahawa Rom berkembang melalui tiga tahap pemerintahan
- menyamakan Colosseum dengan Pantheon

🌍 Aplikasi Kehidupan
Bab ini membantu kita memahami:
- pentingnya hak rakyat dalam sistem pemerintahan
- kepentingan jalan raya dan bekalan air
- perlunya bangunan awam yang berfungsi
- bagaimana idea lama masih mempengaruhi dunia moden

📝 Ringkasan Bab
Bab 6 menerangkan Tamadun Yunani dan Rom, perubahan sistem pemerintahan Yunani daripada monarki kepada demokrasi, perkembangan Tamadun Rom daripada beraja kepada empayar, dan peningkatan seni bina Rom seperti Colosseum, Pantheon dan akueduk. Banyak idea moden berasal daripada tamadun ini.

🎯 Apa Yang Perlu Anda Ingat?
- Yunani terkenal dengan polis, Athens dan Sparta
- Sistem pemerintahan Yunani berubah beberapa kali
- Demokrasi memberi kuasa kepada rakyat
- Rom berkembang melalui zaman beraja, republik dan empayar
- Seni bina Rom sangat maju dan mempengaruhi dunia moden
- Setiap bangunan Rom ada fungsi dan kepentingan tersendiri

🚀 Teruskan ke Kuiz
Semak semula polis, sistem pemerintahan Yunani, perkembangan Rom dan binaan Rom.

🚀 Teruskan ke Flashcard
Ulang istilah penting seperti polis, monarki, oligarki, aristokrasi, tirani, demokrasi, Colosseum, Pantheon dan akueduk.`,
    keywords: [
      "Tamadun Yunani",
      "Tamadun Rom",
      "Polis",
      "Acropolis",
      "Agora",
      "Athens",
      "Sparta",
      "Corinth",
      "Monarki",
      "Oligarki",
      "Aristokrasi",
      "Tirani",
      "Demokrasi",
      "Dewan Perhimpunan",
      "Council of 500",
      "Majistret",
      "Juri",
      "Diarqi",
      "Agoge",
      "Pozzolana",
      "Colosseum",
      "Pantheon",
      "Oculus",
      "Akueduk",
      "Jalan Raya Rom",
      "Tembok Hadrian",
      "Pusat Mandi Awam",
      "gladiator",
      "demokrasi langsung",
    ],
  },
  {
    id: "sej-f1-c7-note",
    subjectId: "sejarah",
    form: "Form 1",
    chapter: "Chapter 7",
    title: "Peningkatan Tamadun India dan China",
    summary:
      "Tamadun India berkembang daripada petempatan kecil yang dikenali sebagai Janapada kepada kerajaan besar bernama Mahajanapada. Kerajaan Magadha (540 SM–320 SM) muncul sebagai kuasa utama berkat kedudukan strategiknya di Lembah Ganges yang subur serta akses kepada bekalan besi dan gajah untuk tentera. Dinasti Maurya mempelopori perluasan kuasa melalui dua pendekatan: Kekuatan Fizikal (Ketenteraan) dan Kemanusiaan (Dharma). Chandragupta Maurya, dibantu penasihat Chanakya, membina angkatan tentera besar (600,000 infantri, 30,000 kavalri, 9,000 gajah) untuk menyatukan utara India. Anaknya Bindusara meneruskan perluasan ke selatan. Peralihan besar berlaku apabila Raja Asoka menyaksikan kehancuran Perang Kalinga (261 SM) yang mengorbankan lebih 100,000 nyawa. Asoka memeluk agama Buddha dan memperkenalkan dasar Dharma yang menekankan kasih sayang, keadilan, dan kebajikan. Titah perintah diraja Asoka diukir pada Tiang Asoka (Edicts of Asoka) yang diletakkan di kawasan awam sebagai panduan etika dan toleransi agama. Tamadun China pula dibina berasaskan sistem meritokrasi melalui pendidikan dan peperiksaan awam. Matlamat pendidikan ialah menyediakan individu untuk perkhidmatan awam, mengekalkan ajaran Konfusianisme, dan mencapai status sosial lebih tinggi. Tiga tahap pendidikan wujud: Rendah (menghafal tulisan dan buku suci), Menengah (karangan, sastera, falsafah Konfusius), dan Tinggi (menterjemah buku suci, etika, undang-undang, kepimpinan). Sistem Peperiksaan Awam dimulakan oleh Maharaja Wu (Dinasti Han). Hanya lelaki boleh menduduki peperiksaan. Tiga tahap peperiksaan ialah: Xiucai (peringkat daerah, setiap dua tahun, calon lulus jadi pegawai rendah), Juren (ibu kota wilayah, setiap tiga tahun, hanya calon Xiucai layak), dan Jinshi (istana di hadapan Maharaja, calon lulus jadi pegawai tinggi istana). Calon dikurung dalam bilik kecil selama tiga hari tiga malam untuk peperiksaan tahap tinggi, dan sesiapa yang meniru dikenakan hukuman mati.",
    keywords: [
      "Janapada",
      "Mahajanapada",
      "Magadha",
      "Dinasti Maurya",
      "Chandragupta Maurya",
      "Chanakya",
      "Bindusara",
      "Raja Asoka",
      "Perang Kalinga",
      "Dharma",
      "Tiang Asoka",
      "Edicts of Asoka",
      "Konfusianisme",
      "Maharaja Wu",
      "Dinasti Han",
      "Peperiksaan Awam",
      "Xiucai",
      "Juren",
      "Jinshi",
      "Meritokrasi",
      "Pendidikan Rendah",
      "Pendidikan Menengah",
      "Pendidikan Tinggi",
      "Tamadun India",
      "Tamadun China",
      "Lembah Ganges",
    ],
  },
  {
    id: "geo-f1-c1-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 1",
    title: "Arah",
    summary:
      "Arah didefinisikan sebagai hala tuju sesuatu tempat dari suatu tempat yang lain. Secara keseluruhannya, terdapat lapan arah mata angin yang dipelajari dan ia dibahagikan kepada dua kategori utama, iaitu arah mata angin utama dan arah mata angin perantaraan. Empat arah mata angin utama terdiri daripada Utara yang sentiasa terletak di bahagian atas rajah atau peta, Selatan di bahagian bawah, Timur di sebelah kanan (iaitu arah matahari terbit), dan Barat di sebelah kiri (iaitu arah matahari terbenam). Empat arah mata angin perantaraan pula wujud tepat di tengah-tengah antara arah mata angin utama tersebut, yang merangkumi Timur Laut (di antara Utara dengan Timur), Barat Laut (di antara Utara dengan Barat), Tenggara (di antara Timur dengan Selatan), dan Barat Daya (di antara Barat dengan Selatan). Terdapat kaedah semula jadi untuk menentukan arah pada siang hari dengan berpandukan matahari. Langkahnya adalah dengan berdiri menghadap ke arah matahari terbit pada waktu awal pagi, yang bermaksud arah di hadapan anda ialah Timur dan arah di belakang anda ialah Barat. Apabila kedua-dua belah tangan didepakan dalam posisi ini, tangan kiri akan menunjukkan arah Utara manakala tangan kanan akan menunjukkan arah Selatan. Bagi menentukan arah pada waktu malam secara semula jadi, kita boleh menggunakan panduan buruj (kumpulan bintang) di langit yang cerah, seperti Buruj Biduk yang sentiasa digunakan untuk menunjukkan arah Utara. Seterusnya, instrumen yang digunakan untuk menentukan arah dengan lebih tepat dan jitu ialah kompas magnetik. Kompas magnetik mempunyai jarum magnet yang sentiasa menunjukkan ke arah utara bumi disebabkan oleh pengaruh tarikan magnet dari Kutub Utara magnetik bumi. Komponen utama sebuah kompas magnetik asas merangkumi jarum kompas, permukaan kompas yang mengandungi petunjuk arah (muka dial), dan perumah sebagai pelindung. Langkah-langkah penggunaan kompas yang betul bermula dengan berdiri menghadap objek atau lokasi rujukan yang ingin ditentukan arahnya. Kompas kemudiannya mesti diletakkan di atas permukaan yang rata supaya jarum magnetik dapat berpusing dengan bebas tanpa sekatan. Pengguna juga wajib menjauhi objek yang diperbuat daripada besi atau logam (seperti tiang lampu, pagar besi, atau jam tangan) semasa mengambil bacaan kerana sifat magnetik besi boleh mengganggu tarikan magnet asli bumi dan menjejaskan ketepatan jarum kompas. Selepas itu, kompas perlu diorientasikan dengan cara memusingkan badan kompas secara perlahan-lahan sehinggalah jarum magnetik berhenti dan bertindih tepat (selari) dengan tanda huruf U atau N (Utara) pada muka dial. Akhir sekali, arah objek tersebut boleh dibaca dengan melihat petunjuk arah pada dial yang sejajar dengan kedudukan objek berkenaan. Menguasai kemahiran menentukan arah ini sangat penting dalam Geografi kerana ia merupakan asas utama sebelum mempelajari kemahiran geografi yang lebih kompleks seperti pembacaan peta lakar, kajian geografi fizikal, serta pelaksanaan kerja lapangan.",
    keywords: [
      "Arah",
      "Arah Mata Angin Utama",
      "Arah Mata Angin Perantaraan",
      "Utara",
      "Selatan",
      "Timur",
      "Barat",
      "Timur Laut",
      "Barat Laut",
      "Tenggara",
      "Barat Daya",
      "Matahari Terbit",
      "Matahari Terbenam",
      "Buruj",
      "Buruj Biduk",
      "Kompas Magnetik",
      "Muka Dial",
      "Jarum Kompas",
      "Kutub Utara",
      "Orientasi Kompas",
      "Gangguan Besi",
      "Kemahiran Geografi",
    ],
  },
  {
    id: "geo-f1-c2-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 2",
    title: "Kedudukan",
    summary:
      "Kedudukan didefinisikan sebagai tempat letaknya sesuatu objek dalam sesuatu kawasan yang membolehkan kita menyatakan dengan tepat di mana sesuatu tempat atau objek itu berada. Kedudukan terbahagi kepada dua jenis utama, iaitu kedudukan relatif dan kedudukan mutlak (koordinat). Kedudukan relatif ialah cara menentukan lokasi sesuatu objek dengan merujuk kepada satu titik rujukan yang bertindak sebagai pusat atau petunjuk di sekelilingnya menggunakan istilah seperti hadapan, belakang, sebelah kanan, dan sebelah kiri. Sebagai contoh di dalam kelas, jika Siti dijadikan titik rujukan, murid di arah muka Siti berada di hadapan manakala di arah punggung Siti berada di belakang, sementara kedudukan kiri atau kanan ditentukan berdasarkan tangan kiri dan tangan kanan Siti. Di lapangan pula, kedudukan bangunan ditentukan dengan mengenal pasti pintu depan bangunan rujukan tersebut untuk menetapkan arah hadapan, belakang, serta sisi kanan dan kiri. Seterusnya, kedudukan mutlak ditentukan secara saintifik mengikut koordinat hasil persilangan garisan imaginasi pada glob atau peta atlas yang dikenali sebagai latitud dan longitud. Latitud ialah garisan imaginasi yang dilukis secara melintang atau mendata pada glob. Garisan latitud utama ialah Garisan Khatulistiwa (0°) yang membahagikan bumi kepada Hemisfera Utara dan Hemisfera Selatan. Terdapat lima garisan latitud utama bumi, iaitu Garisan Artik (66 ½° U), Garisan Sartan (23 ½° U), Garisan Khatulistiwa (0°), Garisan Jadi (23 ½° S), dan Garisan Antartik (66 ½° S), dengan nilai maksimum dari 0° hingga 90° U di Kutub Utara dan 90° S di Kutub Selatan. Longitud pula ialah garisan imaginasi yang dilukis secara menegak dari Kutub Utara ke Kutub Selatan. Garisan longitud utama ialah Garisan Meridian Pangkal (GMP) (0°) yang merentasi bandar Greenwich di London dan membahagikan bumi kepada bahagian Timur dan Barat. Di sebelah pertentangan GMP terletak Garisan Tarikh Antarabangsa (GTA) (180° T/B) yang berfungsi memisahkan tarikh dan waktu di bumi. GTA dilukis secara bengkang-bengkok untuk mengelakkan kawasan daratan atau kumpulan pulau yang sama daripada mempunyai dua tarikh atau waktu yang berbeza. Untuk menentukan kedudukan atau koordinat sesuatu tempat, peraturan penulisan menetapkan nilai latitud (Utara/Selatan) mesti ditulis dahulu, kemudian diikuti oleh nilai longitud (Timur/Barat). Langkah menentukan koordinat dilakukan dengan mengenal pasti nilai latitud yang melintasi titik tersebut, diikuti nilai longitud, lalu ditulis dalam format koordinat seperti 30° U, 40° T. Jika sesuatu lokasi terletak di antara garisan grid utama pada atlas, ruang tersebut perlu dibahagikan kepada unit kecil yang sekata bagi mendapatkan nilai persilangan latitud dan longitud yang tepat.",
    keywords: [
      "Kedudukan",
      "Kedudukan Relatif",
      "Titik Rujukan",
      "Koordinat",
      "Latitud",
      "Longitud",
      "Garisan Khatulistiwa",
      "Garisan Artik",
      "Garisan Sartan",
      "Garisan Jadi",
      "Garisan Antartik",
      "Hemisfera Utara",
      "Hemisfera Selatan",
      "Garisan Meridian Pangkal",
      "Greenwich",
      "Garisan Tarikh Antarabangsa",
      "GTA",
      "Kutub Utara",
      "Kutub Selatan",
      "Persilangan Grid",
      "Atlas",
    ],
  },
  {
    id: "geo-f1-c1-note2",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 1",
    title: "Bearing Sudutan",
    summary:
      "Bearing ialah arah sesuatu objek atau tempat dari satu titik rujukan yang diukur dalam unit darjah (°). Bearing sudutan, atau dikenali sebagai bearing azimuth, diukur bermula dari arah Utara (0°) mengikut arah pusingan jam dengan menggunakan jangka sudut sebagai alat pengukuran utama. Langkah-langkah untuk mengukur bearing sudutan bagi sesuatu titik (contohnya Titik W dari Titik X) dimulakan dengan melukis satu garisan lurus menggunakan pembaris bagi menyambungkan kedua-dua titik tersebut. Seterusnya, tentukan titik rujukan dengan mencari kata kunci 'dari' dalam soalan, di mana titik yang disebut selepas perkataan tersebut merupakan titik rujukan (Titik X). Bina simbol arah mata angin pada titik rujukan dengan memastikan arah Utara (U) menghadap tepat ke bahagian atas. Seterusnya, letakkan pusat jangka sudut tepat di atas titik rujukan dan pastikan garisan 0° atau Utara jangka sudut selari dengan arah Utara mata angin. Baca nilai darjah pada skala luar jangka sudut kerana ia mengikut arah pusingan jam bermula dari Utara sehingga menyentuh garisan lurus yang menyambungkan kedua-dua titik tadi, dengan menggunakan pensil tajam untuk ketepatan optimum. Sekiranya kedudukan objek berada di hemisfera bawah atau melebihi separuh bulatan (melebihi arah Selatan/180°), kaedah pengiraan tambahan diperlukan. Oleh sebab jangka sudut biasa hanya berskala 180° (separuh bulatan), anda perlu mengukur nilai sudut baki yang melebihi garisan Selatan tersebut menggunakan jangka sudut pada skala luar, kemudian tambahkan nilai 180° dengan nilai sudut baharu yang diukur itu. Sebagai contoh, jika sudut baki yang diukur dari arah Selatan ialah 121°, maka pengiraannya ialah 180° + 121° yang menghasilkan bearing sudutan bernilai 301°. Syarat penting penambahan 180° ini hanya dilakukan jika bearing objek terbukti melebihi separuh bulatan, dan semasa membaca jangka sudut, pengguna diingatkan supaya tidak membaca skala bahagian dalam kerana skala tersebut mengikut arah lawan jam.",
    keywords: [
      "Bearing Sudutan",
      "Bearing Azimuth",
      "Jangka Sudut",
      "Titik Rujukan",
      "Arah Pusingan Jam",
      "Skala Luar",
      "Mengukur Bearing",
      "Melebihi 180 Darjah",
      "Sudut Baki",
      "Unit Darjah",
      "Kemahiran Geografi",
    ],
  },
  {
    id: "geo-f1-c3-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 3",
    title: "Peta Lakar",
    summary:
      "Peta lakar ialah gambaran permukaan bumi yang dilukis dari pandangan atas bagi mewakili sesuatu kawasan yang luas dengan menggunakan simbol geografi bagi menggantikan lukisan objek rumit supaya maklumat lebih mudah dibaca dan difahami. Sebuah peta lakar yang lengkap dan berkualiti wajib mempunyai lima elemen utama, iaitu Tajuk yang ditulis dengan huruf besar di bahagian atas dan digariskan untuk menyatakan isi kandungan peta; Bingkai berupa garisan luar yang melingkari peta untuk menandakan had kawasan; Arah Mata Angin yang menunjukkan orientasi peta (biasanya arah Utara); Simbol untuk mewakili ciri geografi bagi menjimatkan ruang; serta Petunjuk untuk menjelaskan makna di sebalik setiap simbol yang digunakan. Jenis-jenis simbol dalam peta lakar dibahagikan kepada empat kategori utama, iaitu Simbol Titik untuk kedudukan spesifik seperti masjid, kuil, gereja, tanda aras, atau stesen trigonometri; Simbol Garisan untuk ciri memanjang seperti jalan raya, sungai, jalan kereta api, dan sempadan; Simbol Kawasan untuk ruang yang luas seperti sawah padi, hutan, kelapa sawit, dan getah; serta Simbol Bergambar yang berbentuk lukisan ringkas menyerupai objek asal seperti gambar pokok kelapa. Penggunaan singkatan seperti B.P. (Balai Polis), Sek. (Sekolah), Hosp. (Hospital), P.P. / Pej. Pos (Pejabat Pos), Kg. (Kampung), dan Pt. (Parit) turut diaplikasikan bagi menjimatkan ruang petempatan bangunan awam. Seterusnya, kandungan peta lakar diklasifikasikan kepada dua ciri pandang darat utama, iaitu Ciri Pandang Darat Fizikal (semula jadi) yang merangkumi bentuk muka bumi (tanah tinggi, tanah pamah, bukit, lembah), saliran (sungai, tasik, paya bakau, paya air tawar), dan tumbuhan semula jadi (hutan rimba, belukar) tanpa campur tangan manusia. Manakala Ciri Pandang Darat Budaya (buatan manusia) merujuk kepada hasil aktiviti manusia seperti petempatan (rumah, bandar), sistem pengangkutan (jalan raya, jalan kereta api, jambatan, jeti), kegiatan ekonomi (sawah padi, ladang kelapa sawit, kilang, lombong), serta kemudahan sosial. Terdapat hubung kait yang rapat antara kedua-dua ciri ini kerana manusia membina ciri budaya berdasarkan potensi ciri fizikal sedia ada, seperti memilih kawasan tanah pamah yang subur untuk penanaman padi, petempatan, dan jalan raya; kawasan pinggir laut untuk aktiviti perikanan dan jeti; serta kawasan tanah tinggi untuk pelancongan dan penanaman teh. Akhir sekali, langkah-langkah melukis peta lakar yang sistematik bermula dengan memilih tajuk kawasan, melukis bingkai peta, menentukan simbol yang sesuai, memplotkan ciri-ciri geografi mengikut kedudukan yang betul dengan mendahulukan ciri fizikal sebelum ciri budaya, serta melengkapkan petunjuk dan arah mata angin.",
    keywords: [
      "Peta Lakar",
      "Ciri Pandang Darat Fizikal",
      "Ciri Pandang Darat Budaya",
      "Simbol Titik",
      "Simbol Garisan",
      "Simbol Kawasan",
      "Simbol Bergambar",
      "Singkatan Peta",
      "Petunjuk Peta",
      "Bingkai Peta",
      "Tanah Pamah",
      "Saliran",
      "Titik Rujukan",
      "Kemahiran Geografi",
    ],
  },
  {
    id: "geo-f1-c4-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 4",
    title: "Lakaran Peta Malaysia",
    summary:
      "Malaysia merupakan sebuah negara di Asia Tenggara yang terbahagi kepada dua bahagian utama dipisahkan oleh Laut China Selatan, iaitu Semenanjung Malaysia dan Malaysia Timur (Sabah dan Sarawak). Negara ini terdiri daripada 13 buah negeri dan 3 buah Wilayah Persekutuan yang ditadbir terus oleh Kerajaan Persekutuan, iaitu Kuala Lumpur (ibu negara dan pusat kewangan), Putrajaya (pusat pentadbiran kerajaan persekutuan), dan Labuan (pusat kewangan luar pesisir antarabangsa). Di Semenanjung Malaysia terdapat 11 buah negeri, iaitu Perlis (negeri terkecil di paling utara, ibu negeri Kangar), Kedah (Jelapang Padi Malaysia, ibu negeri Alor Setar), Pulau Pinang (pulau dan tanah besar Seberang Perai, ibu negeri George Town), Perak (terkenal dengan bijih timah, ibu negeri Ipoh), Selangor (paling maju dan padat, ibu negeri Shah Alam), Negeri Sembilan (terkenal dengan adat perpatih, ibu negeri Seremban), Melaka (negeri bersejarah, ibu negeri Bandaraya Melaka), Johor (paling selatan, ibu negeri Johor Bahru), Pahang (terbesar di Semenanjung, ibu negeri Kuantan), Terengganu (pantai timur, ibu negeri Kuala Terengganu), dan Kelantan (utara Terengganu bersempadan Thailand, ibu negeri Kota Bharu). Di Malaysia Timur pula terdapat 2 buah negeri terbesar di Pulau Borneo, iaitu Sarawak (negeri terbesar di Malaysia, ibu negeri Kuching) dan Sabah (negeri kedua terbesar yang terkenal dengan Gunung Kinabalu, ibu negeri Kota Kinabalu). Setiap ibu negeri berfungsi penting sebagai pusat pentadbiran kerajaan negeri, pusat ekonomi, dan pusat perkhidmatan utama. Seterusnya, prosedur melakar Peta Malaysia secara sistematik merangkumi lima langkah utama, iaitu Langkah 1: Menentukan Bingkai Peta dengan melukis kotak sempadan luar ruang; Langkah 2: Melakar Bentuk Kasar Semenanjung Malaysia di sebelah kiri serta Sabah dan Sarawak di sebelah kanan secara seimbang; Langkah 3: Melukis Sempadan Negeri secara relatif dari utara ke selatan serta sempadan negara jiran seperti Brunei dan Indonesia; Langkah 4: Melabel Nama Negeri dan Wilayah Persekutuan menggunakan huruf besar untuk kejelasan; serta Langkah 5: Melengkapkan Ciri Peta wajib seperti tajuk 'Peta Malaysia', simbol arah mata angin Utara, dan petunjuk peta. Kemahiran melakar peta ini sangat penting bagi mengenali identiti keluasan negara, memudahkan navigasi arah, serta membantu urusan pendidikan dan perancangan analisis taburan penduduk serta pembangunan ekonomi.",
    keywords: [
      "Lakaran Peta Malaysia",
      "Ibu Negeri",
      "Wilayah Persekutuan",
      "Semenanjung Malaysia",
      "Malaysia Timur",
      "Borneo",
      "Sempadan Negeri",
      "Bingkai Peta",
      "Kuala Lumpur",
      "Putrajaya",
      "Labuan",
      "Landskap Budaya",
      "Kemahiran Geografi",
    ],
  },
  {
    id: "geo-f1-c5-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 5",
    title: "Bumi",
    summary:
      "Bumi ialah planet dinamik unik yang mempunyai sistem fizikal yang saling berinteraksi untuk menyokong hidupan, terdiri daripada empat komponen utama iaitu Atmosfera (lapisan udara mengandungi 78% Nitrogen, 21% Oksigen, argon, karbon dioksida, debu, dan wap air yang berfungsi melindungi bumi daripada sinaran ultraungu), Hidrosfera (meliputi 71% permukaan bumi yang dilitupi air termasuk lautan, sungai, tasik, air bawah tanah, dan wap air), Litosfera (lapisan luar bumi yang pejal merangkumi kerak bumi dan bahagian atas mantel yang kaya dengan batuan serta mineral sebagai habitat hidupan), dan Biosfera (kawasan didiami manusia, haiwan, dan tumbuhan hasil interaksi tiga sistem fizikal tadi). Struktur dalaman bumi terbahagi kepada tiga lapisan utama iaitu Kerak Bumi yang paling luar, nipis, dan pejal—terbahagi kepada lapisan Sial (Silika & Aluminium) di bahagian benua dan Sima (Silika & Magnesium) di dasar lautan; Mantel iaitu lapisan paling tebal (80% isi padu bumi) yang sebahagiannya bersifat separa cecair atau magma panas; serta Teras Bumi di bahagian paling dalam yang sangat panas dan bertekanan tinggi—terbahagi kepada Teras Luar (cecair) dan Teras Dalam (pepejal). Permukaan bumi terdiri daripada 29% daratan yang membentuk 7 benua utama, iaitu Asia (terbesar), Afrika, Amerika Utara, Amerika Selatan, Antartika (paling sejuk), Eropah, dan Oceania/Australia (terkecil); serta 71% perairan yang membentuk 5 lautan utama, iaitu Lautan Pasifik (terbesar dan terdalam), Atlantik, Hindi, Selatan, dan Artik (terkecil). Di sekitar Malaysia, terdapat perairan penting seperti Laut China Selatan, Selat Melaka (selat terpanjang di dunia), Selat Tebrau, dan Laut Sulu. Akhir sekali, pergerakan kerak bumi yang digerakkan oleh arus perolakan magma dalam mantel mengakibatkan fenomena hanyutan benua, pembentukan gunung lipat, letusan gunung berapi (vulkanisme), gempa bumi, serta kejadian tsunami di dasar laut.",
    keywords: [
      "Sistem Fizikal Bumi",
      "Atmosfera",
      "Hidrosfera",
      "Litosfera",
      "Biosfera",
      "Struktur Bumi",
      "Kerak Bumi",
      "Sial Sima",
      "Mantel Magma",
      "Teras Bumi",
      "Benua dan Lautan",
      "Selat Melaka",
      "Pergerakan Kerak Bumi",
      "Gunung Lipat",
    ],
  },
  {
    id: "geo-f1-c6-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 6",
    title: "Bentuk Muka Bumi di Malaysia",
    summary:
      "Malaysia mempunyai kepelbagaian bentuk muka bumi unik yang dibahagikan kepada empat kategori utama, iaitu Tanah Tinggi, Tanah Pamah, Pinggir Laut, dan Saliran. Kawasan Tanah Tinggi merujuk kepada kawasan berketinggian melebihi 180 meter dari aras laut yang terbentuk daripada proses lipatan kerak bumi; contohnya Banjaran Titiwangsa sebagai 'tulang belakang' Semenanjung Malaysia dan Banjaran Crocker di Sabah yang menempatkan Gunung Kinabalu (4,095 meter). Kepentingannya merangkumi pusat pelancongan (suhu sejuk turun kira-kira 6.5°C bagi setiap kenaikan 1,000 meter), pertanian hawa sederhana (teh, strawberi, sayur-sayuran), dan penjanaan kuasa hidroelektrik menggunakan tenaga kinetik aliran sungai deras (contohnya Empangan Bakun). Kawasan Tanah Pamah pula beralun atau rata dengan ketinggian kurang daripada 180 meter dari aras laut yang biasanya terbentuk di lembah sungai melalui pemendapan aluvium seperti Dataran Kedah-Perlis dan Dataran Kelantan. Kepentingannya adalah sebagai kawasan pertanian padi (memudahkan sistem pengairan dan jentera berat), pusat petempatan serta perindustrian utama (kos pembinaan bangunan lebih murah), dan pembangunan jaringan pengangkutan (jalan raya dan landasan kereta api lebih efisien dan kurang terowong). Seterusnya, Pinggir Laut Malaysia kaya dengan ciri fizikal seperti tanjung, pulau, dan teluk terlindung berair tenang. Kepentingannya termasuklah kawasan pelabuhan semula jadi yang selamat daripada ombak besar (contohnya Pelabuhan Klang), pusat perikanan komersial (kawasan pentas benua cetek kaya plankton makanan ikan), dan destinasi pelancongan (Pulau Redang dan Pulau Sipadan yang terkenal dengan terumbu karang). Akhir sekali, komponen Saliran merangkumi sistem sungai dan tasik; di mana Sungai Rajang merupakan sungai terpanjang di Malaysia, manakala Tasik Bera ialah tasik semula jadi dan Tasik Kenyir ialah tasik buatan. Saliran berfungsi penting sebagai sumber bekalan air domestik dan industri, jalan perhubungan serta pengangkutan utama di pedalaman Sabah dan Sarawak, serta bertindak sebagai sempadan semula jadi geopolitik seperti Sungai Golok yang memisahkan Malaysia dengan Thailand.",
    keywords: [
      "Bentuk Muka Bumi",
      "Tanah Tinggi",
      "Banjaran Titiwangsa",
      "Gunung Kinabalu",
      "Tanah Pamah",
      "Aluvium",
      "Dataran Kedah-Perlis",
      "Pinggir Laut",
      "Pentas Benua",
      "Saliran",
      "Sungai Rajang",
      "Kuasa Hidroelektrik",
      "Sempadan Semula Jadi",
    ],
  },
  {
    id: "geo-f1-c7-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 7",
    title: "Saliran di Malaysia",
    summary:
      "Sistem saliran di Malaysia merujuk kepada aliran air di permukaan bumi yang merangkumi rangkaian sungai dan tasik yang padat disebabkan faktor Iklim Khatulistiwa yang membawa hujan lebat tahunan melebihi 2,500 mm. Sungai di Malaysia mempunyai ciri aliran deras di hulu tanah tinggi dan perlahan serta berliku-liku di hilir tanah pamah. Di Semenanjung Malaysia, terdapat Sungai Pahang (sungai terpanjang di Semenanjung hasil pertemuan Sungai Jelai dan Sungai Tembeling), Sungai Perak (nadi kuasa hidroelektrik melalui Empangan Temenggor dan Bersia), dan Sungai Kelantan (lembah subur tanih aluvium untuk penanaman padi). Di Borneo pula, terdapat Sungai Rajang di Sarawak (sungai terpanjang di Malaysia, 563 km, yang merentasi jeram deras hulu untuk jana kuasa Empangan Bakun), Sungai Kinabatangan di Sabah (sungai terpanjang di Sabah yang menjadi habitat Gajah Pygmy dan Monyet Belanda bagi ekopelancongan), serta Sungai Baram di Sarawak (laluan pengangkutan kayu balak). Sistem tasik pula terbahagi kepada tasik semula jadi seperti Tasik Bera (tasik terbesar, kawasan lembap perlindungan RAMSAR) dan Tasik Chini; serta tasik buatan (empangan) seperti Tasik Kenyir di Terengganu dan Tasik Bakun di Sarawak. Sistem saliran ini memegang kepentingan kritikal sebagai pembekal 90% bekalan air tawar domestik, penjanaan kuasa hidroelektrik yang mesra alam, penanda sempadan semula jadi geopolitik (seperti Sungai Golok antara Malaysia-Thailand dan Sungai Bernam antara Selangor-Perak), jalan perhubungan utama bagi bot di pedalaman Sabah dan Sarawak, sumber protein ekonomi nelayan darat serta aktiviti akuakultur sangkar, dan pembekal sistem pengairan pertanian padi sawah melalui terusan bagi menjamin keselamatan makanan negara.",
    keywords: [
      "Sistem Saliran",
      "Iklim Khatulistiwa",
      "Sungai Pahang",
      "Sungai Perak",
      "Sungai Rajang",
      "Sungai Kinabatangan",
      "Tasik Bera",
      "RAMSAR",
      "Tasik Kenyir",
      "Hidroelektrik",
      "Sempadan Semula Jadi",
      "Akuakultur",
      "Terusan Pengairan",
    ],
  },
  {
    id: "geo-f1-c8-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 8",
    title: "Penduduk di Malaysia",
    summary:
      "Taburan penduduk di Malaysia adalah tidak sekata dan dibahagikan kepada tiga jenis utama berdasarkan bilangan orang per kilometer persegi. Kawasan penduduk padat (melebihi 200 orang/km²) tertumpu di bandar-bandar besar dan dataran subur seperti KL, Shah Alam, George Town, Johor Bahru, dan Kota Kinabalu. Kawasan penduduk sederhana (50 hingga 200 orang/km²) melibatkan kawasan pertanian, pesisir pantai, dan bandar kecil seperti utara Perak, Kedah, dan pesisir pantai Sarawak. Kawasan penduduk jarang (kurang 50 orang/km²) pula berada di kawasan pedalaman Borneo, banjaran gunung seperti Banjaran Titiwangsa, serta hutan rimba. Taburan ini dipengaruhi oleh empat faktor kritikal: Faktor Fizikal (tanah pamah yang rata menjadi tumpuan padat, manakala tanah tinggi bercerun dan hutan tebal berpenduduk jarang kecuali pusat pelancongan sejuk); Faktor Ekonomi (peluang pekerjaan dalam sektor pertanian aluvium di Dataran Kedah-Perlis, perindustrian di Lembah Klang dan Bayan Lepas, serta perlombongan petroleum di Kerteh dan Bintulu); Faktor Sosial (ketersediaan infrastruktur pengangkutan yang maju, kemudahan hospital pakar, serta pusat pendidikan tinggi seperti Bangi dan Skudai); dan Faktor Dasar Kerajaan/Governan (pembukaan tanah rancangan FELDA untuk menyeimbangkan penduduk luar bandar, pewartaan bandar baru, serta pembangunan Putrajaya sebagai pusat pentadbiran negara).",
    keywords: [
      "Taburan Penduduk",
      "Penduduk Padat",
      "Penduduk Sederhana",
      "Penduduk Jarang",
      "Tanah Pamah",
      "Tanah Aluvium",
      "Lembah Klang",
      "Bayan Lepas",
      "Infrastruktur Sosial",
      "Dasar Kerajaan",
      "FELDA",
      "Putrajaya",
    ],
  },
  {
    id: "geo-f1-c9-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 9",
    title: "Petempatan di Malaysia",
    summary:
      "Petempatan di Malaysia dibahagikan kepada dua jenis utama: Petempatan Bandar (penduduk melebihi 10,000 orang, kepadatan tinggi, bangunan rapat/pencakar langit, serta ekonomi berasaskan perindustrian dan perkhidmatan seperti KL dan Kuching) dan Petempatan Luar Bandar (penduduk kurang 10,000 orang, kepadatan rendah, persekitaran semula jadi, serta ekonomi primer seperti pertanian dan perikanan di kampung tradisional atau FELDA). Susun atur bangunan digolongkan kepada empat Pola Petempatan: Pola Berselerak (rumah berjauhan di kawasan kebun kecil), Pola Berjajar (rumah sebaris selari di sepanjang jalan raya, tebing sungai, atau pesisir pantai), Pola Berkelompok (rumah rapat dalam kumpulan tersusun seperti tanah rancangan FELDA), dan Pola Terpusat (bangunan padat mengelilingi titik tumpuan seperti simpang jalan atau stesen kereta api di bandar). Fungsi petempatan bandar merangkumi pusat pentadbiran (Putrajaya), pusat perniagaan/kewangan (Kuala Lumpur), pusat perindustrian (Shah Alam), dan pusat pendidikan (Bangi). Sebaliknya, fungsi petempatan luar bandar memfokuskan kepada fungsi ekonomi primer (pertanian/perikanan), industri desa (IKS), fungsi sosial asas (klinik desa/balai raya), serta fungsi governan tempatan menerusi pejabat penghulu atau ketua kampung.",
    keywords: [
      "Petempatan Bandar",
      "Petempatan Luar Bandar",
      "Pola Berselerak",
      "Pola Berjajar",
      "Pola Berkelompok",
      "Pola Terpusat",
      "Fungsi Bandar",
      "Fungsi Luar Bandar",
      "Pusat Pentadbiran",
      "Industri Kecil Sederhana",
    ],
  },
  {
    id: "geo-f1-c10-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 10",
    title: "Bentuk Muka Bumi dan Saliran di Asia Tenggara",
    summary:
      "Asia Tenggara terdiri daripada 11 buah negara yang dibahagikan kepada Tanah Besar (Semenanjung Malaysia, Thailand, Myanmar, Laos, Kemboja, Vietnam) dan Kepulauan (Sabah, Sarawak, Singapura, Indonesia, Brunei, Filipina, Timor-Leste), dengan Laos sebagai satu-satunya negara tanpa pinggir laut (landlocked). Ciri fizikal utama merangkumi Tanah Tinggi (Sistem Banjaran Himalaya/Gunung Lipat Muda), kawasan Gunung Berapi aktif di Indonesia dan Filipina yang terletak dalam Lingkaran Api Pasifik, puncak tertinggi Hkakabo Razi (5,881 meter) di Myanmar, serta Tanah Pamah (lembah dan delta sungai) yang kaya dengan tanih aluvium subur untuk pertanian padi sawah, petempatan padat, dan pengangkutan. Sistem saliran utamanya merangkumi Sungai Mekong (sungai terpanjang, mengalir melalui 6 negara dan delta produktif di Vietnam); Sungai Irrawaddy (nadi perhubungan dan 'mangkuk nasi' Myanmar); Menam Chao Phraya (jalan air komersial utama Bangkok dan Dataran Tengah Thailand); serta Tonle Sap di Kemboja (tasik air tawar terbesar yang mengawal banjir Mekong dan membekalkan protein ikan). Bentuk muka bumi dan saliran ini penting untuk sektor Pertanian padi sawah berskala besar, Perikanan air tawar/laut, Penjanaan Kuasa Hidroelektrik di kawasan sungai deras (seperti Laos yang digelar 'Bateri Asia'), serta sektor Pelancongan global seperti Teluk Ha Long (Vietnam) dan Pulau Bali (Indonesia).",
    keywords: [
      "Asia Tenggara",
      "Tanah Besar",
      "Kepulauan",
      "Landlocked Country",
      "Lingkaran Api Pasifik",
      "Tanih Aluvium",
      "Sungai Mekong",
      "Menam Chao Phraya",
      "Tonle Sap",
      "Hidroelektrik",
    ],
  },
  {
    id: "geo-f1-c11-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 11",
    title: "Penduduk dan Petempatan di Asia Tenggara",
    summary:
      "Taburan penduduk di Asia Tenggara adalah tidak sekata, terbahagi kepada kawasan Padat (Pulau Jawa, Bangkok, Manila, Delta Sungai Red, Lembah Klang) yang bertumpu di delta subur dan metropolitan; kawasan Sederhana (kawasan pesisir pantai dan pinggir bandar); serta kawasan Jarang (pedalaman Borneo, pergunungan utara Myanmar, paya Sumatera) akibat rintangan semula jadi. Faktor yang mempengaruhi taburan ini merangkumi Faktor Fizikal (tanah pamah aluvium yang rata untuk pertanian padi), Faktor Ekonomi (peluang pekerjaan di kawasan industri/perdagangan), Faktor Sosial (kemudahan pendidikan dan infrastruktur moden seperti MRT/LRT), serta Faktor Dasar Kerajaan (pembinaan ibu kota baharu seperti Putrajaya dan Naypyidaw, atau program transmigrasi). Bandar-bandar utama mempunyai fungsi dinamik tersendiri: Kuala Lumpur (pusat kewangan dan komersial), Bangkok (pusat pelancongan antarabangsa dan pentadbiran), Jakarta (metropolitan terbesar dan pusat politik), Manila (hab perdagangan Pasifik yang sangat padat), dan Singapura (pusat kewangan dan pelabuhan antarabangsa tersibuk). Petempatan di rantau ini dikategorikan kepada Petempatan Bandar yang bercorak terpusat serta Petempatan Luar Bandar yang bercorak berjajar di sepanjang saliran/pantai atau berselerak di kawasan pertanian.",
    keywords: [
      "Taburan Penduduk",
      "Kawasan Padat",
      "Kawasan Jarang",
      "Faktor Fizikal",
      "Dasar Kerajaan",
      "Transmigrasi",
      "Bandar Utama",
      "Petempatan Bandar",
      "Petempatan Luar Bandar",
    ],
  },
  {
    id: "geo-f1-c13-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 13",
    title: "Sisa Domestik",
    summary:
      "Sisa domestik merujuk kepada bahan buangan pepejal dan cecair dari kawasan perumahan atau institusi. Ia dikategorikan kepada Sisa Organik yang boleh diurai secara semula jadi (sisa makanan, sisa kebun, kertas) dan boleh dijadikan baja kompos, serta Sisa Bukan Organik yang sukar diurai (plastik, kaca, logam, sisa elektronik). Di Malaysia, ia wujud sebagai sisa pepejal mahupun sisa cecair (air kumbahan dan greywater). Pembuangan sisa yang tidak teratur membawa impak buruk seperti pencemaran alam sekitar (air, udara, bau), penularan wabak penyakit (demam denggi, kolera, kencing tikus), peningkatan kos penyelenggaraan oleh kerajaan, dan kejadian banjir kilat akibat saluran longkang tersumbat. Langkah mengurangkan kesan ini merangkumi amalan 3R (Reduce, Reuse, Recycle), penguatkuasaan undang-undang yang ketat oleh PBT di bawah Akta Pengurusan Sisa Pepejal dan Pembersihan Awam 2007, pelaksanaan pendidikan serta kempen kesedaran pengasingan sisa di punca, dan inovasi teknologi seperti penghasilan baja kompos daripada sisa dapur.",
    keywords: [
      "Sisa Domestik",
      "Sisa Organik",
      "Sisa Bukan Organik",
      "Sisa Cecair",
      "Amalan 3R",
      "Wabak Penyakit",
      "Banjir Kilat",
      "Baja Kompos",
      "Pengasingan Sisa",
    ],
  },
  {
    id: "geo-f1-c12-note",
    subjectId: "geography",
    form: "Form 1",
    chapter: "Chapter 12",
    title: "Sumber Air",
    summary:
      "Sumber air di Malaysia terbahagi kepada Air Permukaan (menyumbang sekitar 97% bekalan, meliputi sungai, tasik, dan paya) serta Air Tanah (sekitar 3%, disimpan dalam akuifer bawah tanah). Krisis air berlaku apabila permintaan melebihi bekalan bersih, yang berpunca daripada penebangan hutan di kawasan tadahan hujan, pencemaran sungai oleh sisa kilang dan domestik, pertambahan penduduk, pembaziran air oleh pengguna, serta fenomena cuaca kemarau seperti El Nino. Impak krisis air termasuklah kekurangan bekalan air bersih (catuan air), kepupusan hidupan akuatik, dan ancaman penyakit bawaan air (kolera, tifoid). Langkah mitigasi merangkumi pemeliharaan kawasan tadahan hujan, penguatkuasaan Akta Kuality Alam Sekeliling 1974, kempen kesedaran, rawatan air kumbahan untuk industri, serta penerokaan sumber alternatif seperti Sistem Penuaian Air Hujan (SPAHL) dan air tanah.",
    keywords: [
      "Sumber Air",
      "Air Permukaan",
      "Air Tanah",
      "Akuifer",
      "Krisis Air",
      "Kawasan Tadahan Hujan",
      "Penyakit Bawaan Air",
      "Akta Kualiti Alam Sekeliling 1974",
      "SPAHL",
    ],
  },
  // ===== Science Form 1 — Chapter 1: Introduction to Scientific Investigation (DLP) =====
  {
    id: "sci-f1-c1-dlp-1",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "dlp",
    title: "1.1 Science Is Part of Daily Life",
    summary:
      "Science is a discipline that involves systematic observations and experiments on natural phenomena. Its main branches include Biology (study of living things — e.g. Zoology, Microbiology, Physiology), Physics (study of energy, force and their influence on matter — e.g. Engineering, Astronomy), Chemistry (study of matter, its composition and reactions — e.g. Pharmacology, Forensics), Geology (rocks, minerals and Earth's structure), Astronomy (celestial bodies such as stars and planets) and Meteorology (weather and climate changes). Science is important in daily life — it helps solve crimes through forensic DNA, increases crop yields through hydroponics and hybrid seeds, and enables medical breakthroughs such as robotic surgery and nanotechnology.",
    keywords: [
      "Biology",
      "Physics",
      "Chemistry",
      "Geology",
      "Astronomy",
      "Meteorology",
      "Forensic DNA",
      "Hydroponics",
      "Nanotechnology",
    ],
  },
  {
    id: "sci-f1-c1-dlp-2",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "dlp",
    title: "1.2 Your Science Laboratory",
    summary:
      "Hazard symbols warn about dangerous substances: EXPLOSIVE — chemicals that react violently to heat or shock (e.g. Hydrogen, Butane); FLAMMABLE — catches fire easily, keep away from fire and heat (e.g. Ethanol, Acetone); OXIDISING — releases oxygen that helps other materials burn (e.g. Potassium manganate(VII)); CORROSIVE — burns skin and dissolves materials, avoid contact (e.g. concentrated acid); TOXIC — lethal if swallowed or inhaled (e.g. Mercury, Cyanide); IRRITANT — causes itching and redness (e.g. Ammonia, Chloroform). Key apparatus include the Burette and Pipette (measure liquid volume with very high accuracy — 0.1 cm³), the Gas Jar (collect and contain gases) and the Bell Jar (create a vacuum or isolate an experiment from outside air).",
    keywords: [
      "Explosive",
      "Flammable",
      "Oxidising",
      "Corrosive",
      "Toxic",
      "Irritant",
      "Burette",
      "Pipette",
      "Gas Jar",
      "Bell Jar",
    ],
  },
  {
    id: "sci-f1-c1-dlp-3",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "dlp",
    title: "1.3 Physical Quantities and Their Units",
    summary:
      "Base quantities and their SI units: Length — Meter (m), Mass — Kilogram (kg), Time — Second (s), Temperature — Kelvin (K), Electric Current — Ampere (A). Common prefixes: Mega (M) = 1,000,000 (10⁶), Kilo (k) = 1,000 (10³), Centi (c) = 0.01 (10⁻²), Milli (m) = 0.001 (10⁻³), Micro (µ) = 0.000001 (10⁻⁶). These prefixes scale base units so very large or very small measurements can be expressed compactly.",
    keywords: [
      "SI Units",
      "Length",
      "Mass",
      "Time",
      "Temperature",
      "Ampere",
      "Mega",
      "Kilo",
      "Milli",
      "Micro",
    ],
  },
  {
    id: "sci-f1-c1-dlp-4",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "dlp",
    title: "1.4 Measurement and Accuracy",
    summary:
      "ACCURACY is how close a measurement is to the true value, while PRECISION is the consistency and closeness between repeated measurements of the same quantity. ZERO ERROR is a systematic error where the instrument does not start at zero — correct it using: Actual Reading = Scale Reading − Zero Error. PARALLAX ERROR is a random error caused when the eye is not perpendicular to the scale; avoid it by aligning your eye level directly with the meniscus (for liquids, read the bottom of the curve).",
    keywords: [
      "Accuracy",
      "Precision",
      "Zero Error",
      "Parallax Error",
      "Meniscus",
      "Systematic Error",
      "Random Error",
    ],
  },
  {
    id: "sci-f1-c1-dlp-5",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "dlp",
    title: "1.5 Density",
    summary:
      "Density is mass per unit volume: Density = Mass ÷ Volume, measured in g/cm³ or kg/m³. The Water Displacement Method is used to find the volume of an irregular solid (such as a stone) — measure how much water it pushes up in a displacement can or measuring cylinder. The Law of Flotation states that objects with density LESS than 1.0 g/cm³ FLOAT, while objects with density MORE than 1.0 g/cm³ SINK (e.g. wood floats, iron sinks).",
    keywords: [
      "Density",
      "Mass",
      "Volume",
      "Water Displacement",
      "Law of Flotation",
      "Float",
      "Sink",
    ],
  },

  // ===== Sains Tingkatan 1 — Bab 1: Pengenalan kepada Penyiasatan Saintifik (BM) =====
  {
    id: "sci-f1-c1-bm-1",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "bm",
    title: "1.1 Sains Sebahagian Daripada Kehidupan Harian",
    summary:
      "Sains ialah disiplin ilmu yang melibatkan pemerhatian dan eksperimen yang sistematik terhadap fenomena alam semula jadi. Bidang-bidang utama Sains termasuk Biologi (kajian tentang benda hidup — contoh: Zoologi, Mikrobiologi), Fizik (kajian tentang tenaga, daya, dan jirim — contoh: Kejuruteraan, Astronomi), Kimia (kajian tentang komposisi dan tindak balas jirim — contoh: Farmakologi, Forensik), Geologi (kajian tentang batuan, mineral, dan struktur Bumi), Astronomi (kajian tentang objek di angkasa lepas), dan Meteorologi (kajian tentang cuaca dan iklim). Antara kerjaya dalam bidang Sains ialah doktor, jurutera, pakar nutrisi, ahli geologi, dan ahli farmasi.",
    keywords: ["Biologi", "Fizik", "Kimia", "Geologi", "Astronomi", "Meteorologi", "Kerjaya Sains"],
  },
  {
    id: "sci-f1-c1-bm-2",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "bm",
    title: "1.2 Makmal Sains Anda",
    summary:
      "Simbol amaran memberi peringatan tentang bahan merbahaya: MUDAH MELETUP — meletup jika terdedah kepada haba atau tekanan (contoh: gas Hidrogen); MUDAH TERBAKAR — cecair yang mudah meruap dan terbakar (contoh: Alkohol, Aseton); PENGOKSIDAAN — membebaskan oksigen yang membantu pembakaran (contoh: Kalium manganat(VII)); MENGAKIS — boleh menghakis kulit dan logam, elakkan sentuhan (contoh: asid pekat); BERACUN/TOKSIK — boleh membawa maut jika masuk ke badan (contoh: Merkuri, Sianida); MERENGSA — boleh menyebabkan kegatalan kulit (contoh: Kloroform, Ammonia). Alat radas penting termasuk Pipet dan Buret (menyukat cecair dengan kejituan tinggi — 0.1 cm³), Kelalang Dasar Rata (menyimpan atau memanaskan cecair secara sekata), dan Mangkuk Penyejat (menguapkan pelarut daripada larutan).",
    keywords: [
      "Mudah Meletup",
      "Mudah Terbakar",
      "Pengoksidaan",
      "Mengakis",
      "Toksik",
      "Merengsa",
      "Pipet",
      "Buret",
      "Mangkuk Penyejat",
    ],
  },
  {
    id: "sci-f1-c1-bm-3",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "bm",
    title: "1.3 Kuantiti Fizik dan Unitnya",
    summary:
      "Kuantiti asas dan unit SI: Panjang — meter (m), Jisim — kilogram (kg), Masa — saat (s), Suhu — Kelvin (K), Arus Elektrik — Ampere (A). Simbol imbuhan yang biasa digunakan: Mega (M) = 1,000,000, Kilo (k) = 1,000, Senti (c) = 0.01, Mili (m) = 0.001, Mikro (µ) = 0.000001. Imbuhan ini menyenangkan kita menyatakan nilai yang sangat besar atau sangat kecil dengan ringkas.",
    keywords: [
      "Unit SI",
      "Panjang",
      "Jisim",
      "Masa",
      "Suhu",
      "Ampere",
      "Mega",
      "Kilo",
      "Mili",
      "Mikro",
    ],
  },
  {
    id: "sci-f1-c1-bm-4",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "bm",
    title: "1.4 Penggunaan Alat Pengukur",
    summary:
      "KETEPATAN ialah sejauh mana bacaan mendekati nilai sebenar, manakala KEPERSISAN ialah konsistensi bacaan apabila ukuran diulang. RALAT SIFAR berlaku apabila penanda alat tidak pada sifar — betulkan dengan menolak ralat sifar daripada bacaan alat. RALAT PARALAKS pula berlaku jika mata tidak tegak lurus dengan skala; elakkan dengan memastikan mata searah dengan meniskus cecair (baca bahagian paling bawah lengkungan air).",
    keywords: ["Ketepatan", "Kepersisan", "Ralat Sifar", "Ralat Paralaks", "Meniskus"],
  },
  {
    id: "sci-f1-c1-bm-5",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "bm",
    title: "1.5 Ketumpatan",
    summary:
      "Ketumpatan ialah jisim per unit isi padu: Ketumpatan = Jisim ÷ Isi Padu, dalam unit g/cm³ atau kg/m³. Kaedah Sesaran Air digunakan untuk mencari isi padu objek yang tidak sekata — guna tin Eureka atau silinder penyukat dan ukur jumlah air yang teranjak. Aplikasi ketumpatan: belon udara panas boleh terbang kerana udara panas kurang tumpat daripada udara sejuk; kapal laut terapung kerana mempunyai ruang udara yang menjadikannya kurang tumpat daripada air laut.",
    keywords: ["Ketumpatan", "Jisim", "Isi Padu", "Sesaran Air", "Tin Eureka", "Belon Udara Panas"],
  },
  {
    id: "sci-f1-c1-bm-6",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 1",
    lang: "bm",
    title: "1.6 Langkah Penyiasatan Saintifik",
    summary:
      "Langkah-langkah penyiasatan saintifik: (1) Mengenal pasti masalah; (2) Membina hipotesis — pernyataan awal yang boleh diuji; (3) Mengawal pemboleh ubah — DIMANIPULASI (perkara yang diubah), BERGERAK BALAS (hasil yang diperhatikan), DIMALARKAN (perkara yang tetap/sama); (4) Menganalisis data; (5) Membuat kesimpulan. Langkah-langkah ini memastikan eksperimen dijalankan secara sistematik dan keputusan yang diperoleh adalah sah serta boleh dipercayai.",
    keywords: [
      "Hipotesis",
      "Pemboleh Ubah Dimanipulasi",
      "Pemboleh Ubah Bergerak Balas",
      "Pemboleh Ubah Dimalarkan",
      "Kesimpulan",
    ],
  },
  {
    id: "eng-f1-c1-note",
    subjectId: "english",
    form: "Form 1",
    chapter: "Chapter 1",
    title: "Grammar — KSSM English Form 1",
    summary:
      "Grammar is the set of rules used to form correct sentences in English. Good grammar helps students communicate clearly in speaking and writing. NOUNS are naming words for people, places, animals, things, or ideas (teacher, Kuala Lumpur, cat, pencil, happiness). Types: Common Nouns — general names (boy, school, city); Proper Nouns — specific names (Ali, Malaysia, Monday); Collective Nouns — names for groups (team, class, family); Abstract Nouns — things we cannot touch (bravery, kindness, happiness). PRONOUNS replace nouns to avoid repetition (I, You, He, She, They, We). Example: Ali is my friend. He is kind. Sara likes music. She sings well. VERBS are action words or state-of-being words. Action Verbs: run, jump, eat, study. State Verbs: is, are, seem, become. Examples: The boy runs quickly. She is happy. ADJECTIVES describe nouns (beautiful flower, tall building, clever student). Types: Size (big, small); Colour (blue, red); Shape (round, square); Feeling (happy, sad). ADVERBS describe verbs, adjectives, or other adverbs (quickly, softly, happily, carefully). Many adverbs end with '-ly'. Examples: He runs quickly. She sings beautifully. TENSES: Simple Present Tense — routines, habits, facts (She walks to school every day. The sun rises in the east.); Simple Past Tense — actions that already happened (They visited the zoo yesterday. I played football last night.); Simple Future Tense — future actions (I will study tonight. We will travel tomorrow.). PREPOSITIONS show place, direction, or time (in, on, under, behind, beside). Examples: The cat is under the table. The bag is beside the chair. CONJUNCTIONS join words or sentences (and, but, because, or). Examples: I like tea and coffee. She stayed home because she was sick. SENTENCE STRUCTURE: A complete sentence has Subject + Verb + Object. Example: Ali kicks the ball. Subject: Ali; Verb: kicks; Object: the ball.",
    keywords: [
      "Grammar",
      "Nouns",
      "Pronouns",
      "Verbs",
      "Adjectives",
      "Adverbs",
      "Tenses",
      "Prepositions",
      "Conjunctions",
      "Sentence Structure",
    ],
  },
  {
    id: "eng-f1-c2-note",
    subjectId: "english",
    form: "Form 1",
    chapter: "Chapter 2",
    title: "Vocabulary — KSSM English Form 1",
    summary:
      "Vocabulary refers to the words we know and use in speaking, reading, and writing. Strong vocabulary helps students understand passages better, write better essays, and communicate confidently. SYNONYMS are words with similar meanings: Big = Large, Happy = Joyful, Smart = Intelligent, Fast = Quick. Using synonyms makes writing more interesting. ANTONYMS are words with opposite meanings: Hot ≠ Cold, Fast ≠ Slow, Strong ≠ Weak, Happy ≠ Sad. IDIOMS are phrases with meanings different from the actual words: 'Piece of cake' → very easy; 'Break a leg' → good luck; 'Under the weather' → feeling sick. Idioms are commonly used in conversations. PHRASAL VERBS combine a verb with another word: wake up, sit down, turn on, look after, give up. Examples: Please turn on the fan. She looks after her younger brother. COMMON KSSM VOCABULARY — important words for comprehension and essays: generous, confident, careful, brave, peaceful.",
    keywords: ["Vocabulary", "Synonyms", "Antonyms", "Idioms", "Phrasal Verbs", "KSSM Vocabulary"],
  },
  {
    id: "eng-f1-c3-note",
    subjectId: "english",
    form: "Form 1",
    chapter: "Chapter 3",
    title: "Reading — KSSM English Form 1",
    summary:
      "Reading comprehension is the ability to understand and explain a text. Students must identify important information, understand meanings, and answer questions correctly. The MAIN IDEA is the most important point in a passage — e.g. if a passage talks about recycling, the main idea may be 'Recycling helps protect the environment.' SUPPORTING DETAILS are extra information about the main idea (facts, examples, explanations). INFERENCE means making conclusions using clues from the text — readers must think carefully to understand hidden meanings. CONTEXT CLUES are words around difficult vocabulary that help explain meaning; use surrounding sentences to guess unfamiliar words. SKIMMING is reading quickly to get the general idea, useful for long passages or searching for the topic. SCANNING is looking for specific information quickly (dates, names, numbers). FACTS AND OPINIONS: a FACT is something true and can be proven (Malaysia has 13 states); an OPINION is a personal belief or feeling (Football is the best sport).",
    keywords: [
      "Reading Comprehension",
      "Main Idea",
      "Supporting Details",
      "Inference",
      "Context Clues",
      "Skimming",
      "Scanning",
      "Facts",
      "Opinions",
    ],
  },
  {
    id: "eng-f1-c4-note",
    subjectId: "english",
    form: "Form 1",
    chapter: "Chapter 4",
    title: "Writing — KSSM English Form 1",
    summary:
      "Writing is the process of expressing ideas using sentences and paragraphs. Good writing should be clear, organised, and grammatically correct. EMAIL WRITING structure: (1) Greeting, (2) Main content, (3) Closing. Example greetings: 'Hi Ali,' 'Dear Teacher,'. Example closings: 'Thank you.' 'Regards,'. ESSAY WRITING structure: (1) Introduction — introduces the topic; (2) Body Paragraphs — explanations and examples; (3) Conclusion — summarises the essay. INFORMAL LETTERS are written to friends or family with a friendly tone, simple language, and personal stories. FORMAL LETTERS are used for official matters with polite language, proper format, and a professional tone. PUNCTUATION makes writing clear: full stop (.), comma (,), question mark (?), exclamation mark (!). PARAGRAPH WRITING: a paragraph contains a topic sentence, supporting sentences, and a closing sentence. Good paragraphs focus on one main idea.",
    keywords: [
      "Writing",
      "Email",
      "Essay",
      "Informal Letter",
      "Formal Letter",
      "Punctuation",
      "Paragraph",
    ],
  },
  {
    id: "sci-f1-c3-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 3",
    title: "Bab 3: Koordinasi dan Gerak Balas (Homeostasis)",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 3: homeostasis, kawalan kandungan air dan suhu badan manusia, contoh pada haiwan dan tumbuhan, serta kepentingan kestabilan persekitaran dalaman.",
    keywords: [
      "homeostasis",
      "ginjal",
      "transpirasi",
      "stoma",
      "peluh",
      "metabolisme",
      "sel pengawal",
    ],
    lang: "bm",
  },
  {
    id: "sci-f1-c4-bm",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 4",
    title: "Bab 4: Pembiakan",
    summary:
      "Ringkasan Sains Tingkatan 1 Bab 4: pembiakan seks dan aseks, sistem pembiakan manusia, kitar haid, persenyawaan, kehamilan, penjagaan prenatal, kemandulan, pencegahan kehamilan dan pembiakan tumbuhan.",
    keywords: [
      "pembiakan",
      "gamet",
      "persenyawaan",
      "zigot",
      "kitar haid",
      "plasenta",
      "pendebungaan",
      "percambahan",
    ],
    lang: "bm",
  },
  {
    id: "sci-f1-c4-dlp",
    subjectId: "science",
    form: "Form 1",
    chapter: "Chapter 4",
    title: "Chapter 4: Reproduction",
    summary:
      "Form 1 Science Chapter 4 summary: sexual and asexual reproduction, human reproductive systems, menstrual cycle, fertilisation, pregnancy, prenatal care, sterility, contraception and reproduction in flowering plants.",
    keywords: [
      "reproduction",
      "gamete",
      "fertilisation",
      "zygote",
      "menstrual cycle",
      "placenta",
      "pollination",
      "germination",
    ],
    lang: "dlp",
  },
];
