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
      toggles: [
        {
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
              body: "Tindakan automatik tanpa pemikiran sedar, terbahagi kepada dua jenis. Melibatkan medula oblongata: degupan jantung, pernafasan, peristalsis, rembesan air liur. Tindakan refleks, melalui saraf tunjang: menarik tangan daripada objek panas, menarik kaki apabila terpijak objek tajam, bersin apabila habuk memasuki hidung.",
            },
          ],
        },
      ],
      sequence: {
        title: "Laluan Impuls dalam Tindakan Refleks",
        instruction: "Ketik setiap langkah untuk mengikuti laluan impuls semasa tindakan refleks, seperti menarik tangan daripada objek panas.",
        steps: [
          { title: "Rangsangan", body: "Objek panas menyentuh kulit tangan." },
          { title: "Afektor (reseptor)", body: "Reseptor pada kulit mengesan rangsangan dan menjana impuls saraf." },
          { title: "Impuls saraf", body: "Impuls dihantar melalui neuron deria ke sistem saraf pusat." },
          { title: "Saraf tunjang", body: "Saraf tunjang memproses impuls dengan pantas tanpa menunggu arahan otak." },
          { title: "Efektor", body: "Impuls dihantar melalui neuron motor ke otot tangan." },
          { title: "Gerak balas", body: "Otot mengecut dan tangan ditarik daripada objek panas serta-merta." },
        ],
      },
      checks: [
        { question: "Bermain badminton — tindakan terkawal atau tindakan luar kawal?", hint: "Tindakan terkawal — ia adalah tindakan sedar yang dikawal oleh otak, walaupun ia berlaku dengan pantas." },
        { question: "Apakah yang berlaku sekiranya otak seseorang mengalami kecederaan?", hint: "Bergantung kepada keterukan, seseorang itu mungkin lumpuh sementara, sebahagian, atau sepenuhnya, atau kehilangan kawalan terhadap fungsi badan tertentu." },
        { question: "Mengapakah tindakan refleks tidak menunggu arahan daripada otak?", hint: "Saraf tunjang boleh memproses dan menghantar impuls terus ke efektor tanpa menunggu otak, menjadikan gerak balas lebih pantas untuk melindungi badan daripada bahaya serta-merta." },
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
      sequence: {
        title: "Mekanisme Penglihatan",
        instruction: "Ketik setiap struktur untuk mengikuti laluan cahaya dari mata ke otak.",
        steps: [
          { title: "Cahaya", body: "Cahaya daripada objek memasuki mata." },
          { title: "Kornea", body: "Kornea membiaskan cahaya yang masuk ke mata." },
          { title: "Gelemair", body: "Cecair di ruang hadapan mata terus membiaskan cahaya menuju kanta mata." },
          { title: "Kanta mata", body: "Kanta mata memfokuskan cahaya dengan tepat ke retina." },
          { title: "Gelemaca", body: "Cecair likat di ruang belakang mata mengekalkan bentuk bebola mata semasa cahaya melaluinya." },
          { title: "Retina", body: "Fotoreseptor pada retina mengesan cahaya yang difokuskan." },
          { title: "Impuls saraf", body: "Fotoreseptor menghasilkan impuls saraf daripada cahaya yang dikesan." },
          { title: "Saraf optik", body: "Saraf optik menghantar impuls saraf dari retina ke otak." },
          { title: "Otak", body: "Otak mentafsir impuls saraf tersebut sebagai imej yang dilihat." },
        ],
      },
      ladder: {
        title: "Mekanisme Pendengaran",
        instruction: "Ketik setiap langkah mengikut urutan untuk mengikuti laluan bunyi dari sumbernya ke otak.",
        items: [
          { symbol: "1", name: "Sumber bunyi", fact: "Sumber bunyi menghasilkan getaran di udara." },
          { symbol: "2", name: "Cuping telinga", fact: "Cuping telinga mengumpul dan menyalurkan getaran bunyi." },
          { symbol: "3", name: "Salur telinga", fact: "Getaran bunyi bergerak melalui salur telinga." },
          { symbol: "4", name: "Gegendang telinga", fact: "Gegendang telinga bergetar mengikut getaran bunyi yang diterima." },
          { symbol: "5", name: "Osikel", fact: "Tiga tulang osikel di telinga tengah mengamplifikasi getaran." },
          { symbol: "6", name: "Jendela bujur", fact: "Getaran yang diamplifikasi dihantar melalui jendela bujur ke telinga dalam." },
          { symbol: "7", name: "Koklea", fact: "Koklea menukarkan getaran bunyi kepada impuls saraf." },
          { symbol: "8", name: "Impuls saraf", fact: "Impuls saraf terhasil daripada penukaran getaran oleh koklea." },
          { symbol: "9", name: "Saraf auditori", fact: "Saraf auditori menghantar impuls saraf ke otak." },
          { symbol: "10", name: "Otak", fact: "Otak mentafsir impuls saraf tersebut sebagai bunyi yang didengar." },
        ],
      },
      checks: [
        { question: "Mengapakah hujung jari, bukan tapak tangan, digunakan untuk membaca Braille?", hint: "Hujung jari mempunyai bilangan reseptor sentuhan yang banyak dan epidermis yang nipis, menjadikannya jauh lebih peka terhadap sentuhan berbanding tapak tangan." },
        { question: "Mengapakah makanan terasa kurang jelas apabila hidung tersumbat?", hint: "Deria rasa dan deria bau bekerjasama untuk menghasilkan persepsi rasa makanan sepenuhnya. Apabila hidung tersumbat, molekul aroma tidak dapat mencapai reseptor bau, jadi otak hanya menerima isyarat daripada lidah sahaja, menjadikan rasa makanan kurang jelas." },
      ],
    },
    {
      number: "1.3",
      title: "Rangsangan dan Gerak Balas dalam Tumbuhan",
      intro:
        "Tumbuhan mengesan cahaya, air, graviti dan sentuhan, lalu bertindak balas dengan dua cara: tropisme, iaitu gerak balas pertumbuhan berarah yang perlahan, dan gerak balas nasti, iaitu gerak balas pantas yang tidak bergantung kepada arah rangsangan. Mimosa sp. melipat daunnya ke dalam sebaik disentuh — mekanisme pertahanan terhadap musuh dan angin kencang yang menunjukkan gerak balas nasti.",
      cards: [
        { title: "Eksperimen: Fototropisme", body: "Tujuan: Mengkaji kesan cahaya ke atas arah pertumbuhan pucuk. Apa yang diuji: Anak pokok ditempatkan berhampiran satu sumber cahaya sehala. Pemerhatian: Pucuk membengkok dan tumbuh ke arah cahaya.", detail: "Kesimpulan: Pucuk menunjukkan fototropisme positif." },
        { title: "Eksperimen: Geotropisme", body: "Tujuan: Mengkaji kesan graviti ke atas arah pertumbuhan akar dan pucuk. Apa yang diuji: Anak benih yang telah bercambah diletakkan mengufuk dan dibiarkan tumbuh. Pemerhatian: Akar membengkok tumbuh ke bawah, pucuk membengkok tumbuh ke atas.", detail: "Kesimpulan: Akar menunjukkan geotropisme positif, pucuk menunjukkan geotropisme negatif." },
        { title: "Eksperimen: Hidrotropisme", body: "Tujuan: Mengkaji kesan air ke atas arah pertumbuhan akar. Apa yang diuji: Anak benih ditanam di tengah bekas berpasir dengan sumber air hanya pada satu sisi. Pemerhatian: Akar membengkok dan tumbuh ke arah sumber air.", detail: "Kesimpulan: Akar menunjukkan hidrotropisme positif." },
      ],
      accordions: [
        { title: "Tropisme positif", body: "Bahagian tumbuhan tumbuh ke arah rangsangan, contohnya pucuk tumbuh ke arah cahaya (fototropisme positif)." },
        { title: "Tropisme negatif", body: "Bahagian tumbuhan tumbuh menjauhi rangsangan, contohnya pucuk tumbuh menjauhi graviti (geotropisme negatif)." },
        { title: "Kepentingan fototropisme", body: "Pucuk membesar ke arah cahaya supaya daun mendapat lebih banyak cahaya untuk fotosintesis." },
        { title: "Kepentingan geotropisme", body: "Akar membesar ke dalam tanah untuk mencengkam tumbuhan dengan kukuh dan mencapai air serta mineral; pucuk membesar ke atas untuk mendapatkan cahaya." },
        { title: "Kepentingan hidrotropisme", body: "Akar membesar ke arah sumber air supaya tumbuhan dapat memperoleh air dan garam mineral yang diperlukan." },
        { title: "Kepentingan tigmotropisme", body: "Sulur paut atau batang yang melilit objek sokongan membantu tumbuhan memanjat untuk mendapatkan sokongan dan cahaya." },
      ],
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
      comparison: {
        title: "Tropisme berbanding gerak balas nasti",
        columns: [
          { title: "Tropisme", body: "Gerak balas terarah — arah pertumbuhan bergantung pada arah rangsangan. Biasanya berlaku secara perlahan kerana melibatkan pertumbuhan." },
          { title: "Gerak balas nasti", body: "Arah gerak balas tidak bergantung pada arah rangsangan. Biasanya berlaku dengan pantas — contohnya daun pokok semalu menguncup serta-merta apabila disentuh sebagai pertahanan." },
        ],
      },
      checks: [
        { question: "Mengapakah geotropisme positif pada akar penting untuk kemandirian tumbuhan?", hint: "Pertumbuhan ke bawah mengikut arah graviti membolehkan akar menambatkan tumbuhan dengan kukuh di dalam tanah dan mencapai air serta mineral jauh di dalam tanah." },
        { question: "Mengapakah pengucupan daun pokok semalu digolongkan sebagai gerak balas nasti dan bukan tropisme?", hint: "Kerana arah pengucupan daunnya tidak bergantung kepada arah sentuhan (rangsangan) — inilah ciri utama gerak balas nasti, berbeza daripada tropisme yang arahnya ditentukan oleh arah rangsangan." },
      ],
    },
    {
      number: "1.4",
      title: "Kepentingan Gerak Balas terhadap Rangsangan dalam Haiwan Lain",
      intro:
        "Kedudukan mata haiwan pada kepalanya menentukan bagaimana ia bertahan hidup. Oleh kerana satu telinga sentiasa lebih dekat kepada sumber bunyi, ia menerima bunyi tersebut sesaat lebih awal dan lebih kuat berbanding telinga yang satu lagi — otak menggunakan perbezaan kecil ini, iaitu pendengaran stereofonik, untuk mengesan dengan tepat arah datangnya sesuatu bunyi, membantu pemangsa mengesan mangsa dan mangsa mengesan serta melarikan diri daripada pemangsa.",
      toggles: [
        {
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
      ],
      flipCardGroups: [
        {
          title: "Organ deria membantu kemandirian haiwan",
          instruction: "Ketik setiap haiwan untuk melihat bagaimana organ deria atau gerak balasnya membantu ia terus hidup.",
          items: [
            { id: "cockroach", icon: "🪳", label: "Lipas", fact: "Gerak balas: pengeluaran feromon — isyarat kimia ini membolehkan lipas berkomunikasi dengan lipas lain, contohnya untuk mengesan sumber makanan atau bahaya." },
            { id: "fish", icon: "🐟", label: "Ikan", fact: "Organ deria: garis lateral — mengesan perubahan tekanan dan pergerakan air di sekelilingnya, membantu ikan mengesan pemangsa, mangsa atau halangan." },
            { id: "eel", icon: "⚡", label: "Belut elektrik", fact: "Gerak balas: penghasilan medan elektrik — digunakan untuk mengesan objek di sekeliling serta melumpuhkan mangsa atau pemangsa." },
          ],
        },
      ],
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
        { question: "Mengapakah garis lateral penting untuk kemandirian ikan?", hint: "Garis lateral membolehkan ikan mengesan pergerakan dan perubahan tekanan air tanpa bergantung sepenuhnya pada penglihatan, jadi ikan tetap dapat mengesan pemangsa, mangsa atau halangan walaupun dalam air yang keruh." },
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
