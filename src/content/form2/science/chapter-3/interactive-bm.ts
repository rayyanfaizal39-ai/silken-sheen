import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch3-nutrisi.png";
import digestiveSystemImg from "@/assets/notes/form2-science/chapter-3/chapter3_digestive_system.webp";
import foodTestsImg from "@/assets/notes/form2-science/chapter-3/chapter3_food_tests.webp";
import villusImg from "@/assets/notes/form2-science/chapter-3/chapter3_villus_absorption.webp";
import viskingImg from "@/assets/notes/form2-science/chapter-3/chapter3_visking_tubing.webp";
import digestionPathwaysImg from "@/assets/notes/form2-science/chapter-3/chapter3_digestion_pathways.webp";

export const scienceF2C3InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 3,
  blogHighlight: {
    title: "Blog Sains — Makanan Angkasawan",
    body: "Makanan angkasa mesti berkhasiat, ringan, padat dan selamat selama berbulan-bulan tanpa penyejukan. Pengeringan beku menyingkirkan air sambil mengekalkan kebanyakan nilai nutrien.",
    imagePath: chapterImage,
  },
  keywords: [
    "Karbohidrat",
    "Protein",
    "Lemak",
    "Vitamin",
    "Mineral",
    "Pelawas",
    "Gizi seimbang",
    "Piramid makanan",
    "Pencernaan",
    "Enzim",
    "Duodenum",
    "Pankreas",
    "Hati",
    "Pundi hempedu",
    "Kim",
    "Vilus",
    "Asimilasi",
    "Tiub Visking",
    "Penyahtinjaan",
  ],
  sections: [
    {
      number: "3.1.1",
      title: "Kelas Makanan",
      intro:
        "Badan yang sihat memerlukan tujuh kelas makanan dalam kadar yang sesuai: karbohidrat, protein, lemak, vitamin, mineral, pelawas dan air.",
      cards: [
        {
          title: "Karbohidrat",
          body: "Sumber tenaga utama badan (makanan ruji). Contoh: kanji (simpanan dalam tumbuhan), glikogen (simpanan dalam haiwan). Sumber: nasi, roti, kentang, pisang, madu.",
        },
        {
          title: "Protein",
          body: "Untuk pertumbuhan dan pembaikan tisu badan, serta mensintesis enzim, hormon dan antibodi. Dicernakan kepada asid amino. Sumber: ikan, ayam, telur, kekacang, daging, susu.",
          detail:
            "Pengetahuan Tambahan: kekurangan teruk protein dikaitkan dengan Kwasyiorkor (kanak-kanak 1–3 tahun).",
        },
        {
          title: "Lemak",
          body: "Simpanan tenaga paling pekat — membekalkan kira-kira 2× tenaga karbohidrat/protein bagi setiap gram. Melindungi organ badan dan menjadi penebat haba. Sumber: mentega, minyak masak, kacang tanah.",
        },
        {
          title: "Vitamin",
          body: "Sebatian organik yang diperlukan dalam kuantiti kecil untuk kesihatan; tidak membekalkan tenaga. Enam vitamin utama (A, B, C, D, E, K) — lihat seksyen seterusnya.",
        },
        {
          title: "Mineral",
          body: "Bahan bukan organik yang diperlukan dalam kuantiti kecil untuk mengawal atur proses badan. Enam mineral utama — lihat seksyen seterusnya.",
        },
        {
          title: "Pelawas",
          body: "Selulosa yang tidak dapat dicerna oleh sistem pencernaan; merangsang peristalsis dan mencegah sembelit. Sumber: bijirin, buah-buahan, sayur-sayuran.",
        },
        {
          title: "Air",
          body: "Pelarut kimia dan medium pengangkutan nutrien serta oksigen ke dalam sel; mengawal suhu badan. Cadangan: sekurang-kurangnya 2 liter sehari.",
        },
      ],
      checks: [
        {
          question: "Apakah tujuh kelas makanan?",
          hint: "Karbohidrat, protein, lemak, vitamin, mineral, pelawas dan air.",
        },
        {
          question: "Mengapakah kanak-kanak yang sedang membesar memerlukan lebih banyak protein?",
          hint: "Untuk pertumbuhan dan pembaikan tisu badan.",
        },
      ],
    },
    {
      number: "3.1.1",
      title: "Vitamin dan Mineral",
      intro:
        "Terdapat enam vitamin utama dan enam mineral utama yang perlu anda kenali, bersama sumber, kepentingan dan kesan kekurangan masing-masing.",
      cards: [
        {
          title: "Vitamin A",
          body: "Sumber: susu, kuning telur, minyak ikan. Bantu penglihatan waktu malam & kesihatan kulit. Kekurangan: rabun senja, penyakit kulit.",
        },
        {
          title: "Vitamin B",
          body: "Sumber: yis, hati, telur. Kekalkan fungsi sistem saraf & pembentukan sel darah merah. Kekurangan: beri-beri, anemia.",
        },
        {
          title: "Vitamin C",
          body: "Sumber: buah-buahan, sayur-sayuran. Lawan jangkitan penyakit & kekalkan kesihatan gusi/mulut. Kekurangan: skurvi (gusi berdarah).",
        },
        {
          title: "Vitamin D",
          body: "Sumber: mentega, telur, minyak ikan, cahaya matahari. Bantu penyerapan kalsium & kuatkan enamel gigi. Kekurangan: riket, sakit gigi.",
        },
        {
          title: "Vitamin E",
          body: "Sumber: bijirin, sayur-sayuran hijau. Kekalkan fungsi sistem pembiakan. Kekurangan: kemandulan, keguguran fetus.",
        },
        {
          title: "Vitamin K",
          body: "Sumber: susu, kuning telur, minyak ikan. Mempercepatkan proses pembekuan darah. Kekurangan: darah lambat membeku.",
        },
      ],
      accordions: [
        {
          title: "Kalsium",
          body: "Sumber: susu, ikan bilis, udang, sayur-sayuran hijau. Kepentingan: membantu pembekuan darah, menguatkan tulang dan gigi. Kekurangan: riket, osteoporosis.",
        },
        {
          title: "Natrium",
          body: "Sumber: garam, daging, telur. Kepentingan: memelihara fungsi sistem saraf. Kekurangan: kekejangan otot.",
        },
        {
          title: "Besi (Ferum)",
          body: "Sumber: hati, daging. Kepentingan: membina hemoglobin dalam darah. Kekurangan: anemia.",
        },
        {
          title: "Iodin",
          body: "Sumber: makanan laut, buah-buahan. Kepentingan: membantu fungsi kelenjar tiroid. Kekurangan: goiter.",
        },
        {
          title: "Fosforus",
          body: "Sumber: keju, daging, telur, sayur-sayuran. Kepentingan: menguatkan tulang/gigi, membentuk asid nukleik (DNA/RNA). Kekurangan: riket, gigi rapuh.",
        },
        {
          title: "Kalium",
          body: "Sumber: tumbuhan dan haiwan. Kepentingan: membantu pengecutan otot dan fungsi sistem saraf. Kekurangan: lumpuh, kekejangan otot.",
        },
      ],
      comparison: {
        title: "Larut air berbanding larut lemak",
        columns: [
          {
            title: "Larut air",
            body: "Vitamin B dan C. Diperoleh secara berterusan daripada makanan kerana tidak disimpan lama dalam badan.",
          },
          {
            title: "Larut lemak",
            body: "Vitamin A, D, E dan K. Diangkut dan disimpan bersama lemak dalam badan.",
          },
        ],
      },
      checks: [
        { question: "Namakan dua vitamin larut lemak.", hint: "A, D, E atau K." },
        {
          question: "Apakah kesan kekurangan iodin?",
          hint: "Goiter — kelenjar tiroid tidak berfungsi dengan baik.",
        },
      ],
    },
    {
      number: "3.1.2",
      title: "Ujian Makanan",
      images: [
        {
          src: foodTestsImg,
          annotationMode: "labels",
          size: "standard",
          alt: "Empat ujian makanan yang dijalankan berturut-turut: ujian iodin, ujian Benedict dalam mandi air panas, ujian Millon dalam mandi air panas, dan ujian emulsi etanol.",
          aspect: "16 / 9",
          legendLabel: "Empat ujian makanan",
          caption: "Ketik setiap nombor untuk melihat reagen dan keputusan positifnya.",
          annotations: [
            { id: "starch", label: "Kanji", x: 10, y: 12, note: "Iodin → biru kehitaman" },
            { id: "glucose", label: "Glukosa", x: 34, y: 12, note: "Benedict + tab mandi air panas → mendakan merah bata" },
            { id: "protein", label: "Protein", x: 60, y: 12, note: "Reagen Millon + pemanasan → merah bata" },
            { id: "fat", label: "Lemak", x: 86, y: 12, note: "Etanol + air → emulsi putih susu" },
          ],
        },
      ],
      intro:
        "Ujian makmal digunakan untuk mengesan kehadiran kanji, glukosa, protein dan lemak dalam sampel makanan.",
      accordions: [
        {
          title: "🧪 Bagaimana ujian makanan berfungsi?",
          body: "Setiap ujian menggunakan reagen khusus yang bertindak balas dengan nutrien tertentu sahaja dan menghasilkan perubahan warna atau mendakan yang boleh diperhatikan — inilah 'keputusan positif' yang menunjukkan nutrien itu wujud dalam sampel.",
        },
        {
          title: "Ujian kanji dan gula",
          body: "Kanji: tambah larutan iodin terus pada sampel pada suhu bilik — warna bertukar kepada biru kehitaman jika positif. Gula penurun: tambah larutan Benedict, kemudian PANASKAN dalam mandi air — warna bertukar daripada biru kepada hijau/kuning/mendakan merah bata jika positif.",
        },
        {
          title: "Ujian protein dan lemak",
          body: "Protein: tambah reagen Millon, kemudian panaskan dalam mandi air — mendakan/warna merah bata menunjukkan keputusan positif. Lemak: campurkan sampel dengan etanol, kemudian tuang ke dalam air — emulsi putih melekit/berkabus terbentuk jika positif.",
        },
        {
          title: "⚠️ Langkah berjaga-jaga",
          body: "Etanol mudah terbakar, jadi pemanasan bagi ujian Benedict dan Millon dijalankan dalam mandi air, bukan nyalaan api terus.",
        },
      ],
      matcher: {
        title: "Padankan ujian makanan",
        instruction: "Padankan nutrien dengan reagen dan keputusan positif.",
        pairs: [
          { id: "starch", label: "Kanji", match: "Larutan iodin → biru kehitaman" },
          {
            id: "sugar",
            label: "Gula penurun",
            match: "Larutan Benedict + haba → mendakan merah bata",
          },
          { id: "protein", label: "Protein", match: "Reagen Millon + haba → merah bata" },
          { id: "fat", label: "Lemak", match: "Ujian emulsi etanol → putih susu" },
        ],
      },
      checks: [
        {
          question: "Apakah keputusan positif bagi ujian iodin?",
          hint: "Warna bertukar kepada biru kehitaman.",
        },
        {
          question: "Mengapakah ujian Benedict dan Millon dipanaskan dalam mandi air?",
          hint: "Untuk pemanasan yang selamat dan sekata; etanol dalam ujian lain mudah terbakar.",
        },
      ],
    },
    {
      number: "3.2.1",
      title: "Gizi Seimbang & Piramid Makanan",
      intro:
        "Gizi seimbang ialah pemakanan yang mengandungi semua kelas makanan dalam kuantiti yang betul, berpandukan Piramid Makanan Malaysia atau Model Pinggan Sihat.",
      pyramid: {
        title: "Piramid Makanan Malaysia 2020",
        instruction:
          "Ketik setiap aras untuk melihat cadangan sajian harian. Aras tapak (paling lebar) ialah kumpulan yang perlu dimakan paling banyak. Piramid ini mempunyai 4 aras dan 5 kumpulan makanan utama.",
        tiers: [
          {
            id: "base",
            icon: "🥦",
            groups: [
              { label: "Sayur-sayuran", servings: "Sekurang-kurangnya 3 sajian sehari" },
              { label: "Buah-buahan", servings: "2 sajian sehari" },
            ],
            note: "Kaya dengan vitamin, mineral dan pelawas — aras tapak Piramid Makanan Malaysia 2020.",
          },
          {
            id: "grains",
            icon: "🍚",
            groups: [
              {
                label: "Nasi, bijirin lain, produk berasaskan bijirin penuh dan ubi-ubian",
                servings: "3–5 sajian sehari",
              },
            ],
            note: "Sumber tenaga utama; diletakkan pada aras kedua, di atas sayur-sayuran dan buah-buahan.",
          },
          {
            id: "protein-dairy",
            icon: "🍗",
            groups: [
              { label: "Ikan", servings: "1 sajian sehari" },
              { label: "Ayam, telur atau daging", servings: "1–2 sajian sehari" },
              { label: "Kekacang (legum)", servings: "1 sajian sehari" },
              { label: "Susu dan produk tenusu", servings: "2 sajian sehari" },
            ],
            note: "Satu aras yang menggabungkan kumpulan protein dan tenusu — membekalkan protein untuk pertumbuhan/pembaikan tisu dan kalsium untuk tulang dan gigi.",
          },
          {
            id: "apex",
            icon: "🧂",
            groups: [{ label: "Lemak, minyak, gula dan garam", servings: "Hadkan pengambilan" }],
            note: "Aras puncak — ambil dalam kuantiti paling kecil.",
          },
        ],
        baseNote:
          "Air kosong: 6–8 gelas sehari (1 gelas = 250 ml) — asas kepada setiap piramid makanan.",
        limitNote:
          "Panduan tambahan semasa: selain menghadkan lemak, minyak, gula dan garam di puncak piramid, hadkan juga pengambilan makanan ultra-proses (makanan rapu). Ini tidak bermakna semua makanan diproses tidak sihat.",
        sourceLabel: "Panduan semasa: Piramid Makanan Malaysia 2020 (KKM).",
      },
      cards: [
        {
          title: "Umur",
          body: "Kanak-kanak dan remaja memerlukan lebih banyak karbohidrat (tenaga) dan protein (pertumbuhan) kerana sedang membesar dan lebih aktif.",
        },
        {
          title: "Jantina",
          body: "Lelaki umumnya lebih berotot dan menjalankan aktiviti yang lebih berat, jadi memerlukan kuantiti makanan yang lebih banyak daripada perempuan.",
        },
        {
          title: "Saiz badan",
          body: "Orang bersaiz badan lebih besar memerlukan kuantiti makanan yang lebih banyak untuk tenaga yang lebih.",
        },
        {
          title: "Pekerjaan",
          body: "Petani, buruh dan nelayan memerlukan lebih banyak tenaga kerana kerja berat, berbanding pekerja pejabat seperti guru.",
        },
        {
          title: "Iklim",
          body: "Orang di kawasan beriklim sejuk kehilangan haba dengan lebih cepat dan memerlukan lebih banyak makanan untuk mengekalkan suhu badan.",
        },
        {
          title: "Keadaan kesihatan",
          body: "Orang yang sakit, hamil atau dalam pemulihan memerlukan sajian makanan yang lebih sesuai dengan keadaan kesihatan mereka.",
        },
      ],
      checks: [
        {
          question: "Apakah enam faktor yang mempengaruhi keperluan kalori seseorang?",
          hint: "Umur, jantina, saiz badan, pekerjaan, iklim dan keadaan kesihatan.",
        },
        {
          question: "Mengapakah nelayan memerlukan lebih tenaga berbanding guru?",
          hint: "Pekerjaan nelayan melibatkan kerja fizikal yang lebih berat.",
        },
      ],
    },
    {
      number: "3.2.2",
      title: "Nilai Kalori & Perancangan Diet",
      intro:
        "Nilai kalori ialah jumlah tenaga yang dibebaskan apabila 1 g makanan dioksidakan dengan lengkap, diukur dalam kalori (kal) atau joule (J).",
      comparison: {
        title: "Nilai tenaga setiap gram",
        columns: [
          {
            title: "Lemak",
            body: "37 kJ/g (9 kcal/g) — lebih dua kali ketumpatan tenaga protein atau karbohidrat.",
          },
          {
            title: "Protein dan karbohidrat",
            body: "Setiap satu membekalkan kira-kira 17 kJ/g (4 kcal/g).",
          },
        ],
      },
      accordions: [
        {
          title: "🧮 Contoh: Anggaran Nilai Kalori Sarapan",
          body: "1 kalori (kal) = 4.2 joule (J). Contoh sarapan: nasi goreng 1 pinggan (330 g) = 640 kcal; pisang berangan 2 biji (120 g) = 120 kcal; susu 1 gelas (250 ml) = 130 kcal. Jumlah nilai kalori sarapan = 890 kcal.",
        },
        {
          title: "📋 Aktiviti: Merancang Gizi Seimbang Sehari",
          body: "Sediakan menu sarapan, makan tengah hari dan makan malam untuk satu individu (contohnya buruh binaan, wanita hamil atau murid aktif bersukan). Tentukan kuantiti makanan bagi setiap menu, kemudian jumlahkan nilai kalori untuk satu hari. Faktor seperti pekerjaan, umur dan keadaan kesihatan menentukan sama ada menu itu sesuai.",
        },
      ],
      cards: [
        {
          title: "Indeks Jisim Badan (BMI) — Pengetahuan Tambahan",
          body: "BMI = Jisim (kg) ÷ [Ketinggian (m) × Ketinggian (m)]. Formula ini digunakan untuk menilai status jisim badan, tetapi ia bukan sesuatu yang wajib anda hafal untuk bab ini.",
        },
      ],
      checks: [
        { question: "Berapakah nilai 1 kalori dalam unit joule?", hint: "1 kal = 4.2 J." },
        {
          question: "Kelas makanan manakah membekalkan tenaga paling padat setiap gram?",
          hint: "Lemak — 37 kJ/g, kira-kira dua kali ganda karbohidrat atau protein.",
        },
      ],
    },
    {
      number: "3.2.3",
      title: "Gaya Hidup Sihat",
      intro:
        "Gizi seimbang, senaman dan gaya hidup sihat penting untuk mengekalkan kesihatan badan dan mengelakkan penyakit berkaitan pemakanan.",
      causeEffect: {
        title: "Tabiat → kesan badan → penyakit → alternatif sihat",
        instruction:
          "Ikuti setiap rantaian untuk memahami bagaimana tabiat harian membawa kepada masalah kesihatan.",
        items: [
          {
            icon: "🍟",
            title: "Pemakanan tinggi gula, garam, minyak dan lemak",
            chain: [
              "Kerap makan makanan diproses dan makanan rapu",
              "Lebihan kalori dan lemak tepu",
              "Berat badan berlebihan / obesiti",
              "Risiko kencing manis, tekanan darah tinggi dan kolesterol tinggi",
            ],
            note: "Alternatif sihat: kurangkan gula, garam dan minyak; tambah sayur-sayuran dan buah-buahan.",
          },
          {
            icon: "🛋️",
            title: "Kurang senaman",
            chain: [
              "Gaya hidup tidak aktif",
              "Tenaga berlebihan tidak dibakar",
              "Simpanan lemak badan meningkat",
              "Risiko penyakit jantung",
            ],
            note: "Alternatif sihat: bersenam secara berkala setiap minggu.",
          },
          {
            icon: "🚬",
            title: "Merokok",
            chain: [
              "Tabiat merokok berterusan",
              "Kerosakan sel dan saluran darah",
              "Risiko kanser kulit dan kanser peparu",
            ],
            note: "Alternatif sihat: elakkan tabiat merokok sepenuhnya.",
          },
        ],
      },
      accordions: [
        {
          title: "📊 Konteks: Tinjauan Kesihatan dan Morbiditi Kebangsaan (NHMS) 2016",
          body: "Peratusan rakyat Malaysia dewasa: kencing manis 17.5%, tekanan darah tinggi 30%, kolesterol tinggi 47%, obesiti 17%, berat badan berlebihan 40%. Hanya 6% orang dewasa Malaysia makan buah dan sayur yang mencukupi — statistik ini adalah konteks sokongan, bukan fakta wajib hafal.",
        },
      ],
      checks: [
        {
          question:
            "Namakan tiga penyakit yang boleh dikaitkan dengan pemakanan dan gaya hidup yang tidak sihat.",
          hint: "Penyakit jantung, tekanan darah tinggi, kencing manis, kanser kulit atau kanser peparu.",
        },
        {
          question: "Apakah kaitan antara makanan diproses/rapu dengan obesiti?",
          hint: "Makanan ini tinggi kalori, gula, garam dan lemak, menyebabkan lebihan tenaga disimpan sebagai lemak badan.",
        },
      ],
    },
    {
      number: "3.3.1",
      title: "Sistem Pencernaan Manusia",
      intro:
        "Pencernaan ialah penguraian makanan yang kompleks atau besar kepada molekul yang lebih kecil, larut dan sedia diserap oleh badan.",
      digestiveSystem: {
        image: {
          src: digestiveSystemImg,
          annotationMode: "callouts",
          size: "portrait",
          alt: "Rajah sistem pencernaan manusia di dalam badan: mulut, esofagus, perut, hati, pundi hempedu, pankreas, duodenum, usus kecil, usus besar, rektum dan dubur.",
          aspect: "3 / 4",
          caption: "Ketik mana-mana nombor untuk melihat fungsi organ itu.",
          points: [
            { id: "mulut", x: 43, y: 19 },
            { id: "esofagus", x: 49, y: 36 },
            { id: "hati", x: 35, y: 47 },
            { id: "perut", x: 59, y: 51 },
            { id: "pundi-hempedu", x: 39, y: 55 },
            { id: "pankreas", x: 60, y: 59 },
            { id: "duodenum", x: 47, y: 61 },
            { id: "usus-besar", x: 33, y: 71 },
            { id: "usus-kecil", x: 53, y: 75 },
            { id: "rektum", x: 51, y: 81 },
            { id: "dubur", x: 49, y: 90 },
          ],
        },
        title: "Struktur Sistem Pencernaan Manusia",
        instruction:
          "Ketik mana-mana organ untuk melihat fungsinya. Organ bulat membentuk salur pencernaan; organ segi empat ialah organ aksesori pencernaan yang bersambung ke duodenum.",
        tractLabel: "Salur pencernaan",
        accessoryLabel: "Organ Aksesori Pencernaan",
        organs: [
          {
            id: "mulut",
            label: "Mulut",
            kind: "tract",
            note: "Makanan dikunyah oleh gigi; air liur melembutkan makanan dan mula mencerna kanji.",
          },
          {
            id: "esofagus",
            label: "Esofagus",
            kind: "tract",
            note: "Tiub yang menyalurkan bolus ke perut melalui peristalsis.",
          },
          {
            id: "perut",
            label: "Perut",
            kind: "tract",
            note: "Mengadun makanan; merembeskan protease dan asid hidroklorik.",
          },
          {
            id: "duodenum",
            label: "Duodenum",
            kind: "tract",
            note: "Bahagian pertama usus kecil; menerima hempedu daripada pundi hempedu dan jus pankreas daripada pankreas.",
          },
          {
            id: "usus-kecil",
            label: "Usus kecil",
            kind: "tract",
            note: "Tempat pencernaan disempurnakan dan penyerapan nutrien berlaku melalui vilus.",
          },
          {
            id: "usus-besar",
            label: "Usus besar",
            kind: "tract",
            note: "Menyerap semula air dan garam mineral daripada baki makanan.",
          },
          {
            id: "rektum",
            label: "Rektum",
            kind: "tract",
            note: "Menyimpan tinja sementara sebelum disingkirkan.",
          },
          {
            id: "dubur",
            label: "Dubur",
            kind: "tract",
            note: "Tempat tinja disingkirkan daripada badan (penyahtinjaan).",
          },
          {
            id: "hati",
            label: "Hati",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Menghasilkan hempedu (jus hempedu) yang disalurkan ke duodenum.",
          },
          {
            id: "pundi-hempedu",
            label: "Pundi hempedu",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Menyimpan hempedu sebelum disalurkan ke duodenum.",
          },
          {
            id: "pankreas",
            label: "Pankreas",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Menghasilkan jus pankreas yang mengandungi amilase, protease dan lipase.",
          },
        ],
      },
      sequence: {
        title: "Ikuti aliran makanan",
        instruction: "Bergerak mengikut urutan salur alimentari, daripada mulut hingga dubur.",
        steps: [
          {
            title: "Mulut",
            body: "Gigi mengunyah makanan. Amilase liur dalam air liur mula mencerna kanji kepada maltosa.",
          },
          { title: "Esofagus", body: "Peristalsis menolak bolus untuk masuk ke dalam perut." },
          {
            title: "Perut",
            body: "Dinding perut merembeskan protease dan asid hidroklorik. Asid hidroklorik mengaktifkan protease dan membunuh bakteria. Protease mencerna protein kepada polipeptida sahaja pada tahap ini. Makanan menjadi separa cecair dipanggil kim.",
          },
          {
            title: "Duodenum",
            body: "Hati menghasilkan hempedu, disimpan di pundi hempedu; hempedu mengemulsikan lemak dan meneutralkan asid dalam kim. Pankreas merembeskan jus pankreas: amilase mencerna kanji→maltosa, protease mencerna polipeptida→dipeptida, lipase mencerna lemak→asid lemak dan gliserol.",
          },
          {
            title: "Usus kecil",
            body: "Usus kecil merembeskan protease (dipeptida→asid amino); vilus pada dindingnya menyerap nutrien ke dalam darah dan limfa.",
          },
          {
            title: "Usus besar",
            body: "Air dan garam mineral diserap semula ke dalam aliran darah.",
          },
          { title: "Rektum", body: "Tinja disimpan sementara sebelum disingkirkan." },
          { title: "Dubur", body: "Tinja disingkirkan daripada badan melalui penyahtinjaan." },
        ],
      },
      checks: [
        {
          question: "Apakah organ yang terletak antara perut dan usus kecil?",
          hint: "Duodenum — bahagian pertama usus kecil.",
        },
        {
          question: "Apakah fungsi pundi hempedu?",
          hint: "Menyimpan hempedu sebelum disalurkan ke duodenum.",
        },
      ],
    },
    {
      number: "3.3.1",
      title: "Pencernaan Fizikal & Kimia",
      intro:
        "Pencernaan terdiri daripada dua jenis proses yang berlaku serentak: pencernaan fizikal dan pencernaan kimia.",
      comparison: {
        title: "Perbandingan pencernaan fizikal dengan pencernaan kimia",
        columns: [
          {
            title: "Pencernaan fizikal",
            body: "Berlaku di dalam mulut sahaja. Melibatkan pemecahan makanan secara mekanikal (pengunyahan). TIDAK melibatkan enzim.",
          },
          {
            title: "Pencernaan kimia",
            body: "Berlaku di dalam mulut, perut, duodenum dan usus. Melibatkan bantuan enzim untuk memecahkan molekul kompleks kepada molekul kecil dan larut.",
          },
        ],
      },
      accordions: [
        {
          title: "Apakah enzim?",
          body: "Enzim ialah bahan di dalam badan yang menggalakkan tindak balas kimia dalam sistem pencernaan. Enzim diperbuat daripada protein — tanpa enzim, pencernaan berlaku pada kadar yang sangat perlahan.",
        },
      ],
      checks: [
        { question: "Di manakah pencernaan fizikal berlaku?", hint: "Di dalam mulut sahaja." },
        {
          question: "Apakah perbezaan utama antara pencernaan fizikal dan kimia?",
          hint: "Pencernaan kimia melibatkan enzim; pencernaan fizikal tidak.",
        },
      ],
    },
    {
      number: "3.3.1",
      title: "Enzim dan Pencernaan Kimia",
      images: [
        {
          src: digestionPathwaysImg,
          annotationMode: "labels",
          size: "standard",
          alt: "Tiga baris laluan pencernaan: karbohidrat, protein dan lemak, setiap satu bermula daripada makanan sehingga hasil akhir yang diserap.",
          aspect: "3 / 2",
          legendLabel: "Tiga laluan pencernaan",
          caption:
            "Gambaran keseluruhan ketiga-tiga kelas makanan. Ketik satu label untuk melihat laluan penuhnya, kemudian pilih enzim di bawah untuk butiran setiap tindak balas.",
          annotations: [
            { id: "carb", label: "Karbohidrat", x: 8, y: 8, note: "Kanji → Maltosa → Glukosa. Dicernakan oleh amilase, kemudian maltase." },
            { id: "protein", label: "Protein", x: 8, y: 37, note: "Protein → Polipeptida → Dipeptida → Asid amino. Dicernakan oleh protease dalam tiga peringkat." },
            { id: "fat", label: "Lemak", x: 8, y: 63, note: "Lemak → Asid lemak + Gliserol. Dicernakan oleh lipase selepas hempedu mengemulsikannya." },
          ],
        },
      ],
      intro:
        "Terdapat tiga enzim pencernaan utama yang perlu anda kenali: amilase, protease dan lipase. Setiap satu dirembeskan oleh lebih daripada satu organ dan bertindak pada substrat yang berbeza di setiap peringkat.",
      enzymeExplorer: {
        title: "Terokai setiap enzim",
        instruction:
          "Pilih satu enzim untuk melihat di mana ia dirembeskan, di mana ia bertindak, dan apa yang dicernakannya.",
        enzymes: [
          {
            id: "amilase",
            name: "Amilase",
            accent: "#f59e0b",
            summary: "Amilase mencernakan kanji kepada maltosa. Ia bertindak dua kali: di mulut dan di duodenum.",
            stages: [
              {
                stageLabel: "Di dalam mulut",
                enzymeLabel: "Amilase liur",
                substrate: "Kanji",
                product: "Maltosa",
                sourceLabel: "Dirembeskan oleh",
                source: "Kelenjar air liur",
                siteLabel: "Bertindak di",
                site: "Mulut",
              },
              {
                stageLabel: "Di dalam duodenum",
                enzymeLabel: "Amilase pankreas",
                substrate: "Kanji yang tinggal",
                product: "Maltosa",
                sourceLabel: "Dirembeskan oleh",
                source: "Pankreas",
                siteLabel: "Bertindak di",
                site: "Duodenum",
              },
            ],
            note: "Pencernaan karbohidrat bermula di mulut — satu-satunya enzim yang bertindak di sana.",
          },
          {
            id: "protease",
            name: "Protease",
            accent: "#a78bfa",
            summary: "Protease mencernakan protein dalam tiga peringkat berasingan, setiap satu oleh organ yang berbeza.",
            stages: [
              {
                stageLabel: "Peringkat 1 — di dalam perut",
                enzymeLabel: "Protease perut",
                substrate: "Protein",
                product: "Polipeptida",
                sourceLabel: "Dirembeskan oleh",
                source: "Dinding perut",
                siteLabel: "Bertindak di",
                site: "Perut",
              },
              {
                stageLabel: "Peringkat 2 — di dalam duodenum",
                enzymeLabel: "Protease pankreas",
                substrate: "Polipeptida",
                product: "Dipeptida",
                sourceLabel: "Dirembeskan oleh",
                source: "Pankreas",
                siteLabel: "Bertindak di",
                site: "Duodenum",
              },
              {
                stageLabel: "Peringkat 3 — di dalam usus kecil",
                enzymeLabel: "Protease usus",
                substrate: "Dipeptida",
                product: "Asid amino",
                sourceLabel: "Dirembeskan oleh",
                source: "Usus kecil",
                siteLabel: "Bertindak di",
                site: "Usus kecil",
              },
            ],
            note: "Pencernaan protein bermula di perut, bukan di mulut. Asid amino ialah hasil akhir yang diserap.",
          },
          {
            id: "lipase",
            name: "Lipase",
            accent: "#34d399",
            summary: "Lipase mencernakan lemak kepada asid lemak dan gliserol. Hempedu mengemulsikan lemak dahulu supaya lipase dapat bertindak dengan lebih cepat.",
            stages: [
              {
                stageLabel: "Di dalam duodenum dan usus kecil",
                enzymeLabel: "Lipase",
                substrate: "Lemak (titisan kecil)",
                product: "Asid lemak + gliserol",
                sourceLabel: "Dirembeskan oleh",
                source: "Pankreas dan usus kecil",
                siteLabel: "Bertindak di",
                site: "Duodenum dan usus kecil",
              },
            ],
            note: "Hempedu bukan enzim. Ia hanya memecahkan lemak kepada titisan kecil supaya lipase mempunyai luas permukaan yang lebih besar untuk bertindak.",
          },
        ],
      },
      accordions: [
        {
          title: "🧂 Asid Hidroklorik (HCl)",
          body: "Dirembeskan oleh dinding perut bersama protease. Dua fungsi utama: mengaktifkan protease dan membunuh bakteria dalam makanan yang masuk ke dalam perut.",
        },
        {
          title: "➕ Tahukah Anda: Maltase",
          body: "Usus kecil turut merembeskan maltase, yang mencerna maltosa → glukosa, melengkapkan laluan karbohidrat: kanji → maltosa → glukosa. Maltase adalah butiran tambahan — anda tidak perlu menghafalnya seperti tiga enzim utama di atas.",
        },
      ],
      checks: [
        {
          question:
            "Organ manakah merembeskan protease yang mencerna polipeptida kepada dipeptida?",
          hint: "Pankreas — bertindak di duodenum.",
        },
        {
          question: "Apakah dua fungsi asid hidroklorik di dalam perut?",
          hint: "Mengaktifkan protease dan membunuh bakteria.",
        },
      ],
    },
    {
      number: "3.4.1",
      title: "Penyerapan Hasil Pencernaan",
      intro: "Usus kecil disesuaikan secara struktur untuk menyerap nutrien tercerna dengan cekap.",
      cards: [
        {
          title: "Banyak vilus",
          body: "Berjuta-juta unjuran halus menambahkan luas permukaan penyerapan.",
        },
        {
          title: "Dinding setebal satu sel",
          body: "Dinding vilus sangat nipis, mewujudkan jarak resapan yang pendek.",
        },
        {
          title: "Permukaan berlipat-lipat",
          body: "Permukaan usus kecil berlipat-lipat untuk menambahkan lagi luas permukaan penyerapan.",
        },
        {
          title: "Rangkaian pengangkutan",
          body: "Kapilari darah dan lakteal yang banyak membolehkan nutrien dibawa pergi dengan cepat.",
        },
      ],
      villusDiagram: {
        image: {
          src: villusImg,
          annotationMode: "callouts",
          size: "compact",
          alt: "Keratan rentas satu vilus pada dinding usus kecil, menunjukkan kapilari darah dan lakteal di dalamnya.",
          aspect: "4 / 3",
          caption: "Glukosa dan asid amino masuk ke kapilari darah; asid lemak dan gliserol masuk ke lakteal.",
          points: [
            { id: "blood", x: 45, y: 62 },
            { id: "lacteal", x: 50, y: 80 },
          ],
          extra: [
            { id: "villus", label: "Vilus", x: 50, y: 13, note: "Unjuran halus seperti jari pada dinding usus kecil. Berjuta-juta vilus menambahkan luas permukaan untuk penyerapan." },
            { id: "wall", label: "Dinding nipis", x: 62, y: 22, note: "Dinding vilus setebal satu sel sahaja. Jarak resapan yang pendek ini mempercepatkan penyerapan nutrien." },
            { id: "lumen", label: "Lumen usus", x: 16, y: 25, note: "Ruang di dalam usus kecil tempat makanan tercerna berada sebelum diserap melalui dinding vilus." },
          ],
        },
        title: "Struktur vilus dan penyerapan",
        instruction:
          "Molekul kecil yang terhasil daripada pencernaan menembusi dinding vilus melalui dua laluan berasingan.",
        wallLabel: "Dinding vilus (setebal satu sel)",
        lumenLabel: "Lumen usus kecil",
        pathways: [
          {
            id: "blood",
            label: "Kapilari darah",
            destination: "Darah → Hati",
            cargo: "Glukosa dan asid amino",
          },
          {
            id: "lacteal",
            label: "Lakteal",
            destination: "Sistem limfa",
            cargo: "Asid lemak dan gliserol",
          },
        ],
      },
      checks: [
        {
          question: "Mengapakah dinding vilus yang nipis penting untuk penyerapan?",
          hint: "Ia memendekkan jarak resapan, meningkatkan kadar penyerapan.",
        },
        {
          question:
            "Ke manakah glukosa dan asid amino dibawa mula-mula selepas memasuki kapilari darah?",
          hint: "Ke hati.",
        },
      ],
    },
    {
      number: "3.4.1",
      title: "Eksperimen Tiub Visking",
      intro:
        "Dalam eksperimen tiub Visking ini, tiub Visking digunakan sebagai model dinding usus kecil untuk mengkaji penyerapan hasil pencernaan.",
      accordions: [
        {
          title: "🎯 Tujuan & Hipotesis",
          body: "Tujuan: Mengkaji penyerapan glukosa melalui tiub Visking. Pernyataan masalah: Adakah glukosa boleh meresap keluar melalui tiub Visking? Hipotesis: Glukosa boleh meresap keluar melalui tiub Visking.",
        },
        {
          title: "🔧 Pemboleh Ubah",
          body: "Dimalarkan: jenis dan saiz tiub Visking, suhu, masa. Dimanipulasikan: jenis kandungan di dalam tiub Visking (ampaian kanji berbanding larutan glukosa). Bergerak balas: kehadiran glukosa di dalam air suling di luar tiub.",
        },
        {
          title: "🧪 Kaedah Ringkas",
          body: "Ampaian kanji 1% dimasukkan ke dalam satu tiub Visking (P); larutan glukosa dimasukkan ke dalam tiub Visking satu lagi (Q). Kedua-dua tiub diikat dan direndam dalam air suling di dalam tabung didih berasingan. Ujian iodin dan ujian Benedict dijalankan ke atas AIR SULING DI LUAR tiub Visking — pada permulaan dan selepas 30 minit.",
        },
        {
          title: "🔍 Pemerhatian & Inferens",
          body: "Tabung didih P (kanji): ujian iodin dan Benedict pada air suling kekal negatif pada akhir eksperimen — molekul kanji terlalu besar untuk menembusi tiub Visking. Tabung didih Q (glukosa): ujian Benedict pada air suling menjadi positif (mendakan merah bata) selepas 30 minit — molekul glukosa cukup kecil untuk meresap keluar melalui tiub Visking.",
        },
        {
          title: "💡 Kesimpulan",
          body: "Tiub Visking berfungsi seperti model dinding usus kecil: molekul kecil dan larut seperti glukosa boleh meresap melaluinya, tetapi molekul besar seperti kanji tidak boleh.",
        },
      ],
      viskingExperiment: {
        image: {
          src: viskingImg,
          annotationMode: "labels",
          size: "compact",
          alt: "Dua tabung didih berisi air suling. Tiub Visking di dalam tabung kiri mengandungi kanji yang kekal di dalam; tiub di dalam tabung kanan mengandungi glukosa yang meresap keluar melalui membran.",
          aspect: "3 / 2",
          caption: "Kanji kekal di dalam tiub Visking. Glukosa meresap keluar melalui membran ke dalam air suling di sekelilingnya.",
          points: [
            { id: "P", x: 30, y: 55 },
            { id: "Q", x: 68, y: 55 },
          ],
          extra: [
            { id: "tubing", label: "Tiub Visking", x: 30, y: 88, note: "Membran separa telap yang mewakili dinding usus kecil: hanya molekul kecil boleh menembusinya." },
            { id: "water", label: "Air suling", x: 15, y: 24, note: "Air suling di luar tiub mewakili darah. Ujian makanan dijalankan pada air ini untuk mengesan apa yang telah meresap keluar." },
          ],
        },
        title: "Susunan radas eksperimen tiub Visking",
        instruction:
          "Kedua-dua tiub Visking direndam dalam air suling berasingan. Ujian makanan dijalankan pada air suling DI LUAR tiub, bukan pada kandungan di dalam tiub.",
        tubes: [
          { id: "P", label: "Tabung didih P", contents: "Tiub Visking + ampaian kanji" },
          { id: "Q", label: "Tabung didih Q", contents: "Tiub Visking + larutan glukosa" },
        ],
        surroundLabel: "Kedua-dua tiub Visking direndam dalam air suling di dalam tabung didih.",
        testLabel:
          "Ujian iodin dan ujian Benedict dijalankan pada air suling DI LUAR tiub Visking.",
        resultCorrect:
          "Q — Ujian Benedict pada air suling menjadi POSITIF selepas 30 minit: glukosa meresap keluar.",
        resultIncorrect:
          "P — Ujian iodin dan Benedict pada air suling KEKAL NEGATIF: kanji tidak dapat menembusi tiub.",
        note: "Ini mewakili bagaimana dinding usus kecil membenarkan molekul kecil dan larut sahaja untuk diserap ke dalam darah.",
      },
      checks: [
        {
          question: "Apakah yang diwakili oleh tiub Visking dalam eksperimen ini?",
          hint: "Dinding usus kecil (membran separa telap).",
        },
        {
          question:
            "Mengapakah ujian makanan dijalankan pada air suling di LUAR tiub, bukan di dalam tiub?",
          hint: "Untuk mengesan bahan yang telah meresap keluar melalui tiub Visking.",
        },
      ],
    },
    {
      number: "3.4.2",
      title: "Asimilasi & Kerjasama Sistem",
      intro:
        "Molekul yang diserap ke dalam vilus perlu sampai ke sel-sel badan — proses ini memerlukan kerjasama tiga sistem badan.",
      causeEffect: {
        title: "Kerjasama tiga sistem badan",
        instruction:
          "Setiap sistem menyumbang satu peranan supaya sel badan menerima nutrien dan oksigen.",
        items: [
          {
            icon: "🍽️",
            title: "Sistem pencernaan",
            chain: [
              "Memecahkan makanan besar/kompleks",
              "Molekul kecil dan larut",
              "Diserap ke dalam vilus",
            ],
          },
          {
            icon: "🩸",
            title: "Sistem peredaran darah",
            chain: [
              "Menerima nutrien daripada vilus",
              "Mengangkut melalui darah",
              "Sampai ke sel-sel badan",
            ],
          },
          {
            icon: "🫁",
            title: "Sistem respirasi",
            chain: [
              "Membekalkan oksigen",
              "Oksigen bertindak balas dengan glukosa di dalam sel",
              "Respirasi → tenaga",
            ],
            note: "Ketiga-tiga sistem bekerjasama supaya sel badan menerima nutrien dan oksigen serentak.",
          },
        ],
      },
      comparison: {
        title: "Asimilasi — penggunaan hasil akhir pencernaan",
        columns: [
          { title: "Glukosa", body: "Digunakan untuk menghasilkan tenaga melalui respirasi." },
          {
            title: "Asid amino, asid lemak & gliserol",
            body: "Asid amino membentuk komponen sel baharu. Asid lemak dan gliserol bergabung membentuk lemak — penebat haba dan pelindung organ dalaman.",
          },
        ],
      },
      checks: [
        {
          question: "Apakah asimilasi?",
          hint: "Proses pengagihan hasil akhir pencernaan bagi kegunaan sel-sel badan.",
        },
        {
          question: "Bagaimanakah sistem respirasi berkait dengan sistem pencernaan?",
          hint: "Sistem respirasi membekalkan oksigen yang diperlukan untuk respirasi menggunakan glukosa yang diasimilasikan.",
        },
      ],
    },
    {
      number: "3.4.3",
      title: "Penyahtinjaan",
      intro:
        "Makanan yang tidak dicerna dan tidak diserap bergerak ke usus besar, dan akhirnya disingkirkan daripada badan melalui penyahtinjaan.",
      cards: [
        {
          title: "Usus besar",
          body: "Air dan garam mineral diserap semula ke dalam aliran darah semasa baki makanan bergerak di sepanjangnya.",
        },
        {
          title: "Tinja",
          body: "Baki pepejal (serat, sisa rembesan salur pencernaan, sel mati, air) yang tidak diserap atau dicerna.",
        },
        { title: "Rektum", body: "Menyimpan tinja sementara sebelum disingkirkan." },
        { title: "Dubur", body: "Tinja disingkirkan daripada badan melalui proses penyahtinjaan." },
      ],
      causeEffect: {
        title: "Kesan kekurangan serat dan air",
        items: [
          {
            icon: "🚱",
            title: "Kurang serat & air dalam diet",
            chain: [
              "Kurang pelawas dan air dalam pemakanan",
              "Pergerakan tinja menjadi perlahan dan keras",
              "Sembelit",
            ],
            note: "Cara elak: makan cukup serat (buah-buahan, sayur-sayuran, bijirin) dan air (sekurang-kurangnya 2 liter sehari).",
          },
        ],
      },
      checks: [
        {
          question: "Apakah kesan kekurangan serat dan air kepada penyahtinjaan?",
          hint: "Sembelit — pergerakan tinja menjadi perlahan dan keras.",
        },
        {
          question: "Apakah bahan yang diserap semula di usus besar?",
          hint: "Air dan garam mineral.",
        },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menyatakan fungsi dan sumber tujuh kelas makanan, termasuk vitamin dan mineral yang mandatori.",
    "Saya boleh menerangkan Piramid Makanan Malaysia 2020 dan faktor yang mempengaruhi keperluan kalori.",
    "Saya boleh menganggar nilai kalori satu hidangan dan merancang gizi seimbang.",
    "Saya boleh menghuraikan kepentingan gizi seimbang, senaman dan gaya hidup sihat.",
    "Saya boleh menjejaki makanan melalui sistem pencernaan, termasuk peranan pankreas, hati dan pundi hempedu.",
    "Saya boleh membandingkan pencernaan fizikal dengan pencernaan kimia.",
    "Saya boleh menerangkan eksperimen tiub Visking dan kepentingannya kepada penyerapan.",
    "Saya boleh menerangkan asimilasi dan kerjasama tiga sistem badan, serta proses penyahtinjaan.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Hempedu mengandungi enzim yang mencernakan lemak.",
      answer: false,
      explanation:
        "Hempedu bukan enzim; ia mengemulsikan lemak dan meneutralkan kim berasid. Lemak dicerna secara kimia oleh enzim lipase.",
    },
    {
      type: "multiple-choice",
      question: "Struktur manakah menyerap asid lemak dan gliserol?",
      options: ["Platlet darah", "Lakteal", "Esofagus", "Rektum"],
      answerIndex: 1,
      explanation:
        "Lakteal di dalam setiap vilus menyerap hasil pencernaan lemak ke dalam sistem limfa.",
    },
    {
      type: "multiple-choice",
      question: "Apakah urutan pencernaan protein yang betul daripada perut hingga usus kecil?",
      options: [
        "Protein → Asid amino → Polipeptida",
        "Protein → Polipeptida → Dipeptida → Asid amino",
        "Polipeptida → Protein → Asid amino",
        "Asid amino → Dipeptida → Protein",
      ],
      answerIndex: 1,
      explanation:
        "Protease perut mencerna protein → polipeptida; protease pankreas mencerna polipeptida → dipeptida; protease usus kecil mencerna dipeptida → asid amino.",
    },
    {
      type: "true-false",
      question:
        "Betul atau salah: Dalam eksperimen tiub Visking, ujian makanan dijalankan pada kandungan DI DALAM tiub.",
      answer: false,
      explanation:
        "Ujian dijalankan pada air suling DI LUAR tiub Visking, untuk mengesan bahan yang telah meresap keluar.",
    },
  ],
};
