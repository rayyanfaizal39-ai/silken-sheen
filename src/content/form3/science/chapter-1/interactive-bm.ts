import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C1InteractiveBM: ScienceF3InteractiveContent = {
  chapter: 1,
  blogHighlight: {
    title: "Galeri Sains — Masa Tindak Balas Usain Bolt",
    body: "Pada final larian 100 m Sukan Olimpik 2016, masa tindak balas peraih pingat emas, Usain Bolt, ialah 0.155 saat. Sesiapa yang masa tindak balasnya kurang daripada 0.1 saat akan didiskualifikasi — kerana itu lebih pantas daripada yang mampu dicapai oleh sistem saraf manusia, bermakna ia mesti merupakan permulaan awal (false start).",
  },
  keywords: [
    "Rangsangan",
    "Gerak balas",
    "Afektor (reseptor)",
    "Efektor",
    "Tindakan terkawal",
    "Tindakan luar kawal",
    "Tropisme",
    "Gerak balas nasti",
    "Penglihatan stereoskopik",
    "Penglihatan monokular",
  ],
  sections: [
    {
      number: "1.1",
      title: "Sistem Saraf Manusia",
      intro:
        "Sistem saraf manusia mengesan rangsangan, menghantar impuls, mentafsir impuls, dan menghasilkan gerak balas yang sesuai — semuanya dalam sepersekian saat. Ia dibina daripada dua bahagian yang saling berhubung.",
      comparison: {
        title: "Pusat kawalan badan anda",
        columns: [
          { title: "Sistem Saraf Pusat", body: "Otak dan saraf tunjang." },
          { title: "Sistem Saraf Periferi", body: "12 pasang saraf kranium yang menghubungkan otak dengan organ deria dan organ dalaman, serta 31 pasang saraf tunjang yang menghubungkan saraf tunjang dengan otot rangka." },
        ],
      },
      toggle: {
        title: "Pilihan sedar, atau refleks automatik?",
        instruction: "Setiap gerak balas badan anda tergolong dalam salah satu daripada dua kategori. Ketik untuk membandingkan.",
        options: [
          {
            id: "terkawal",
            label: "Tindakan Terkawal",
            body: "Tindakan sedar yang dikawal oleh otak — membaca, menulis, berjalan, makan. Aliran impuls: rangsangan → afektor → impuls saraf → otak → impuls saraf → efektor → gerak balas.",
          },
          {
            id: "luarkawal",
            label: "Tindakan Luar Kawal",
            body: "Tindakan automatik tanpa pemikiran sedar, terbahagi kepada dua jenis. Melibatkan medula oblongata: degupan jantung, pernafasan, peristalsis. Tindakan refleks, melalui saraf tunjang: menarik tangan daripada objek panas, bersin.",
          },
        ],
      },
      checks: [
        { question: "Bermain badminton — tindakan terkawal atau tindakan luar kawal?", hint: "Tindakan terkawal — ia adalah tindakan sedar yang dikawal oleh otak, walaupun ia berlaku dengan pantas." },
        { question: "Apakah yang berlaku sekiranya otak seseorang mengalami kecederaan?", hint: "Bergantung kepada keterukan, seseorang itu mungkin lumpuh sementara, sebahagian, atau sepenuhnya, atau kehilangan kawalan terhadap fungsi badan tertentu." },
      ],
    },
    {
      number: "1.2",
      title: "Rangsangan dan Gerak Balas dalam Manusia",
      intro: "Manusia mengesan rangsangan — cahaya, bunyi, bahan kimia, sentuhan — melalui lima organ deria. Ketik setiap satu untuk melihat struktur dan fungsinya.",
      flipCards: [
        { id: "eye", icon: "👁️", label: "Mata", fact: "Mengesan cahaya. Sel rod mengesan keamatan cahaya; sel kon (merah/hijau/biru) mengesan warna dalam cahaya terang." },
        { id: "ear", icon: "👂", label: "Telinga", fact: "Mengesan bunyi. Telinga luar mengumpul, telinga tengah mengamplifikasi, telinga dalam (koklea) menukarkannya kepada impuls saraf." },
        { id: "nose", icon: "👃", label: "Hidung", fact: "Mengesan bau. Kira-kira 10 juta sel deria di rongga hidung melarutkan bahan kimia udara dalam mukus." },
        { id: "tongue", icon: "👅", label: "Lidah", fact: "Mengesan rasa melalui tunas rasa pada papila — manis, masin, masam, pahit, umami." },
        { id: "skin", icon: "🖐️", label: "Kulit", fact: "Organ deria terbesar. Lima jenis reseptor mengesan kesakitan, haba, sejuk, sentuhan dan tekanan." },
      ],
      matcher: {
        title: "Padankan kecacatan penglihatan dengan pembetulannya",
        instruction: "Pilih satu kecacatan, kemudian pilih kanta yang membetulkannya.",
        pairs: [
          { id: "rabunjauh", label: "Rabun jauh", match: "Kanta cekung" },
          { id: "rabundekat", label: "Rabun dekat", match: "Kanta cembung" },
          { id: "astigmatisme", label: "Astigmatisme", match: "Kanta silinder" },
        ],
      },
      accordions: [
        { title: "Batasan penglihatan", body: "Kita tidak dapat melihat objek yang sangat kecil (mikroorganisma) atau yang sangat jauh (planet Musytari). Ilusi optik berlaku apabila otak salah mentafsir objek akibat gangguan visual. Bintik buta tiada fotoreseptor sama sekali, jadi imej yang jatuh di situ tidak dapat dilihat." },
        { title: "Batasan pendengaran", body: "Telinga manusia hanya dapat mengesan 20 Hz hingga 20,000 Hz. Semakin tua usia seseorang, gegendang telinga menjadi kurang elastik dan julat frekuensi ini semakin sempit." },
        { title: "Penuaan", body: "Kepekaan penglihatan dan pendengaran semula jadi merosot dengan usia — kanta mata menjadi tegar, gegendang telinga kehilangan keanjalan." },
      ],
      checks: [
        { question: "Mengapakah hujung jari, bukan tapak tangan, digunakan untuk membaca Braille?", hint: "Hujung jari mempunyai bilangan reseptor sentuhan yang banyak dan epidermis yang nipis, menjadikannya jauh lebih peka terhadap sentuhan berbanding tapak tangan." },
        { question: "Mengapakah makanan panas selalunya lebih enak?", hint: "Deria bau menyumbang besar kepada persepsi rasa — haba melepaskan lebih banyak molekul aroma, dan gabungan isyarat bau serta rasa ditafsir oleh otak sebagai rasa yang lebih penuh." },
      ],
    },
    {
      number: "1.3",
      title: "Rangsangan dan Gerak Balas dalam Tumbuhan",
      intro:
        "Tumbuhan mengesan cahaya, air, graviti dan sentuhan, lalu bertindak balas dengan dua cara: tropisme, iaitu gerak balas pertumbuhan berarah yang perlahan, dan gerak balas nasti, iaitu gerak balas pantas yang tidak bergantung kepada arah rangsangan. Mimosa sp. melipat daunnya ke dalam sebaik disentuh — mekanisme pertahanan terhadap musuh dan angin kencang yang menunjukkan gerak balas nasti.",
      matcher: {
        title: "Padankan tropisme dengan rangsangannya",
        instruction: "Pilih satu jenis tropisme, kemudian pilih rangsangan yang sepadan.",
        pairs: [
          { id: "foto", label: "Fototropisme", match: "Cahaya — pucuk membesar ke arahnya" },
          { id: "geo", label: "Geotropisme", match: "Graviti — akar membesar ke arahnya, pucuk membesar menjauhinya" },
          { id: "hidro", label: "Hidrotropisme", match: "Air — akar membesar ke arahnya" },
          { id: "tigmo", label: "Tigmotropisme", match: "Sentuhan — sulur membelit objek" },
        ],
      },
      checks: [
        { question: "Mengapakah geotropisme positif pada akar penting untuk kemandirian tumbuhan?", hint: "Pertumbuhan ke bawah mengikut arah graviti membolehkan akar menambatkan tumbuhan dengan kukuh di dalam tanah dan mencapai air serta mineral jauh di dalam tanah." },
      ],
    },
    {
      number: "1.4",
      title: "Kepentingan Gerak Balas terhadap Rangsangan dalam Haiwan Lain",
      intro:
        "Kedudukan mata haiwan pada kepalanya menentukan bagaimana ia bertahan hidup. Oleh kerana satu telinga sentiasa lebih dekat kepada sumber bunyi, ia menerima bunyi tersebut sesaat lebih awal dan lebih kuat berbanding telinga yang satu lagi — otak menggunakan perbezaan kecil ini, iaitu pendengaran stereofonik, untuk mengesan dengan tepat arah datangnya sesuatu bunyi, membantu pemangsa mengesan mangsa dan mangsa mengesan serta melarikan diri daripada pemangsa.",
      toggle: {
        title: "Mata pemangsa lawan mata mangsa",
        instruction: "Ketik untuk membandingkan penglihatan stereoskopik dan monokular.",
        options: [
          {
            id: "stereo",
            label: "Penglihatan Stereoskopik",
            body: "Kedua-dua mata menghadap depan dengan medan penglihatan yang bertindih dengan banyak, menghasilkan imej 3D yang membolehkan otak menganggar jarak, saiz dan kedalaman dengan tepat. Inilah sebabnya manusia dan kebanyakan pemangsa (kucing, burung hantu) memilikinya — sesuai untuk memburu.",
          },
          {
            id: "mono",
            label: "Penglihatan Monokular",
            body: "Mata terletak di kedua-dua belah kepala dengan pertindihan yang sedikit atau tiada langsung. Medan penglihatan yang luas membolehkan haiwan mengesan bahaya dari hampir semua arah, walaupun persepsi kedalaman terjejas. Kebanyakan mangsa (arnab, ayam) bergantung kepada ini untuk terus hidup.",
          },
        ],
      },
      flipCards: [
        { id: "elephant", icon: "🐘", label: "Gajah", fact: "16 – 12,000 Hz — julat terendah dalam kumpulan ini, sesuai mengesan deruman dalam." },
        { id: "dog", icon: "🐕", label: "Anjing", fact: "67 – 45,000 Hz — terkenal mampu mendengar wisel 'senyap' yang tidak dapat didengar manusia." },
        { id: "bat", icon: "🦇", label: "Kelawar", fact: "2,000 – 110,000 Hz — julat terluas dan tertinggi, penting untuk ekolokasi dalam gelap." },
        { id: "dolphin", icon: "🐬", label: "Lumba-lumba", fact: "40 – 100,000 Hz — pendengaran frekuensi sangat tinggi untuk sonar bawah air." },
        { id: "sealion", icon: "🦭", label: "Singa laut", fact: "450 – 50,000 Hz — sesuai untuk bunyi di udara dan bawah air." },
        { id: "rat", icon: "🐀", label: "Tikus", fact: "200 – 80,000 Hz — peka terhadap bunyi ultrasonik yang dihasilkan tikus lain." },
      ],
      checks: [
        { question: "Jenis penglihatan apakah yang dijangka dimiliki oleh helang (pemangsa utama), dan mengapa?", hint: "Penglihatan stereoskopik — persepsi kedalaman yang tepat penting untuk menganggar jarak semasa menukik untuk menangkap mangsa." },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menerangkan struktur dan fungsi sistem saraf manusia.",
    "Saya dapat menerangkan mekanisme pendengaran dan penglihatan, serta gabungan dan batasan deria.",
    "Saya dapat menerangkan bagaimana tumbuhan bertindak balas terhadap rangsangan untuk memastikan kemandirian.",
    "Saya dapat menerangkan bagaimana organ deria memastikan kemandirian haiwan di Bumi.",
  ],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Gerak balas nasti, seperti tropisme, sentiasa bergantung kepada arah rangsangan.", answer: false, explanation: "Gerak balas nasti TIDAK bergantung kepada arah rangsangan — itulah yang membezakannya daripada tropisme." },
    { type: "multiple-choice", question: "Mata arnab terletak di kedua-dua belah kepalanya. Apakah jenis penglihatan yang dimilikinya?", options: ["Penglihatan stereoskopik", "Penglihatan monokular", "Penglihatan stereofonik", "Penglihatan binokular"], answerIndex: 1, explanation: "Penglihatan monokular — medan penglihatan yang luas membantu haiwan mangsa seperti arnab mengesan pemangsa dari hampir semua arah." },
  ],
};
