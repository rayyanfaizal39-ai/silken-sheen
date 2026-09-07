import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch3-nutrisi.png";
import digestiveSystemImg from "@/assets/notes/form2-science/chapter-3/chapter3_digestive_system.webp";
import foodPyramidImg from "@/assets/notes/form2-science/chapter-3/science-f2-ch3-food-pyramid.webp";
import foodTestsImg from "@/assets/notes/form2-science/chapter-3/chapter3_food_tests.webp";
import villusImg from "@/assets/notes/form2-science/chapter-3/chapter3_villus_absorption.webp";
import viskingImg from "@/assets/notes/form2-science/chapter-3/chapter3_visking_tubing.webp";
import { DIGESTIVE_ORGAN_SHAPES } from "./digestive-system-spotlight";
import { PYRAMID_HOTSPOTS } from "./pyramid-spotlight";
import { VILLUS_SHAPES } from "./villus-spotlight";
import { VISKING_SHAPES } from "./visking-spotlight";

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
          body: "**Sumber tenaga utama badan** (makanan ruji).",
          facts: [
            { label: "Mengandungi", value: "Karbon, hidrogen dan oksigen" },
            {
              label: "Contoh & sumber",
              value:
                "Kanji (simpanan dalam tumbuhan), glikogen (simpanan dalam haiwan), selulosa (membentuk dinding sel tumbuhan). Sumber: nasi, roti, kentang, pisang, madu.",
            },
            { label: "Fungsi", value: "Membekalkan tenaga untuk aktiviti harian badan" },
          ],
        },
        {
          title: "Protein",
          body: "Diperlukan untuk **pertumbuhan dan pembaikan tisu badan**.",
          facts: [
            { label: "Mengandungi", value: "Karbon, hidrogen, oksigen dan nitrogen" },
            { label: "Contoh & sumber", value: "Ikan, ayam, telur, kekacang, daging, susu" },
            {
              label: "Fungsi",
              value:
                "Membaiki tisu rosak, menggantikan sel mati, dan membina enzim, hormon dan antibodi. Dicernakan kepada asid amino.",
            },
          ],
          detail:
            "Pengetahuan Tambahan: kekurangan teruk protein dikaitkan dengan Kwasyiorkor (kanak-kanak 1–3 tahun).",
        },
        {
          title: "Lemak",
          body: "**Simpanan tenaga paling pekat** — kira-kira 2× tenaga karbohidrat/protein bagi setiap gram.",
          facts: [
            {
              label: "Mengandungi",
              value: "Karbon, hidrogen dan oksigen; terbentuk daripada gliserol dan asid lemak",
            },
            { label: "Contoh & sumber", value: "Mentega, minyak masak, kacang tanah" },
            {
              label: "Fungsi",
              value:
                "Melindungi organ badan, menjadi penebat haba di bawah kulit, dan mengangkut vitamin larut lemak A, D, E dan K",
            },
          ],
        },
        {
          title: "Vitamin",
          body: "Sebatian organik yang tidak membekalkan tenaga, tetapi diperlukan dalam kuantiti kecil untuk mengekalkan kesihatan yang baik.",
          facts: [
            { label: "Ciri utama", value: "Larut air: B dan C. Larut lemak: A, D, E dan K." },
            { label: "Contoh", value: "Enam vitamin utama: A, B, C, D, E dan K" },
            {
              label: "Fungsi",
              value:
                "Menyokong penglihatan, pembekuan darah, ketahanan terhadap jangkitan dan banyak lagi — setiap vitamin mempunyai peranan tersendiri",
            },
          ],
        },
        {
          title: "Mineral",
          body: "Bahan bukan organik yang tidak membekalkan tenaga, tetapi diperlukan dalam kuantiti kecil untuk mengawal atur proses badan dan mengekalkan kesihatan.",
          facts: [
            { label: "Contoh", value: "Enam mineral utama: kalsium, natrium, besi, iodin, fosforus dan kalium" },
            {
              label: "Fungsi",
              value:
                "Membina tulang dan gigi yang kukuh, membentuk hemoglobin, menyokong saraf dan otot — setiap mineral mempunyai peranan tersendiri",
            },
          ],
        },
        {
          title: "Pelawas",
          body: "Tidak dapat dicerna oleh sistem pencernaan.",
          facts: [
            { label: "Ciri utama", value: "Terutamanya selulosa daripada dinding sel tumbuhan" },
            { label: "Contoh & sumber", value: "Bijirin, buah-buahan, sayur-sayuran" },
            {
              label: "Fungsi",
              value:
                "**Merangsang peristalsis** dan membantu makanan bergerak melalui salur pencernaan, membantu **mencegah sembelit**",
            },
          ],
        },
        {
          title: "Air",
          body: "Sebatian penting yang mengandungi hidrogen dan oksigen.",
          facts: [
            { label: "Ciri utama", value: "Bertindak sebagai pelarut" },
            { label: "Contoh & sumber", value: "Air minuman dan cecair — sekurang-kurangnya 2 liter sehari" },
            {
              label: "Fungsi",
              value:
                "Mengangkut nutrien dan oksigen ke dalam sel, membawa bahan buangan seperti urea dan garam, dan membantu mengawal suhu badan melalui peluh/penyejatan",
            },
          ],
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
        "Vitamin ialah sebatian organik yang tidak membekalkan tenaga tetapi diperlukan dalam kuantiti kecil untuk kesihatan yang baik. Mineral ialah bahan bukan organik yang tidak membekalkan tenaga tetapi diperlukan dalam kuantiti kecil untuk mengawal atur proses badan dan mengekalkan kesihatan.",
      nutrientTables: [
        {
          title: "Jadual 3.1: Vitamin",
          instruction: "Enam vitamin yang perlu anda kenali, bersama sumber, kepentingan dan kesan kekurangan.",
          nameLabel: "Vitamin",
          sourceLabel: "Sumber",
          importanceLabel: "Kepentingan",
          deficiencyLabel: "Kesan kekurangan",
          rows: [
            {
              id: "a",
              name: "Vitamin A",
              source: "Susu, kuning telur, minyak ikan",
              importance: "Bantu penglihatan waktu malam dan mengekalkan kesihatan kulit",
              deficiency: "Rabun senja, penyakit kulit",
            },
            {
              id: "b",
              name: "Vitamin B",
              source: "Yis, hati, telur",
              importance: "Mengekalkan fungsi sistem saraf dan pembentukan sel darah merah",
              deficiency: "Beri-beri, anemia",
            },
            {
              id: "c",
              name: "Vitamin C",
              source: "Buah-buahan, sayur-sayuran",
              importance: "Melawan jangkitan dan mengekalkan kesihatan gusi dan mulut",
              deficiency: "Skurvi (gusi berdarah)",
            },
            {
              id: "d",
              name: "Vitamin D",
              source: "Mentega, telur, minyak ikan, cahaya matahari",
              importance: "Membantu penyerapan kalsium untuk tulang dan gigi yang kukuh",
              deficiency: "Riket, sakit gigi",
            },
            {
              id: "e",
              name: "Vitamin E",
              source: "Bijirin, sayur-sayuran hijau",
              importance: "Mengekalkan fungsi sistem pembiakan",
              deficiency: "Kemandulan, keguguran fetus",
            },
            {
              id: "k",
              name: "Vitamin K",
              source: "Susu, kuning telur, minyak ikan",
              importance: "Mempercepatkan pembekuan darah",
              deficiency: "Darah lambat membeku",
            },
          ],
        },
        {
          title: "Jadual 3.2: Mineral",
          instruction: "Enam mineral yang perlu anda kenali, bersama sumber, kepentingan dan kesan kekurangan.",
          nameLabel: "Mineral",
          sourceLabel: "Sumber",
          importanceLabel: "Kepentingan",
          deficiencyLabel: "Kesan kekurangan",
          rows: [
            {
              id: "calcium",
              name: "Kalsium",
              source: "Susu, ikan bilis, udang, sayur-sayuran hijau",
              importance: "Membantu pembekuan darah; menguatkan tulang dan gigi",
              deficiency: "Riket, osteoporosis",
            },
            {
              id: "sodium",
              name: "Natrium",
              source: "Garam, daging, telur",
              importance: "Memelihara fungsi sistem saraf dan keseimbangan air dalam badan",
              deficiency: "Kekejangan otot",
            },
            {
              id: "iron",
              name: "Besi",
              source: "Hati, daging",
              importance: "Membina hemoglobin dalam darah",
              deficiency: "Anemia",
            },
            {
              id: "iodine",
              name: "Iodin",
              source: "Makanan laut, buah-buahan",
              importance: "Membantu fungsi kelenjar tiroid",
              deficiency: "Goiter",
            },
            {
              id: "phosphorus",
              name: "Fosforus",
              source: "Keju, daging, telur, sayur-sayuran",
              importance: "Menguatkan tulang/gigi; membentuk asid nukleik (DNA/RNA)",
              deficiency: "Riket, gigi rapuh",
            },
            {
              id: "potassium",
              name: "Kalium",
              source: "Tumbuhan dan haiwan",
              importance: "Membantu pengecutan otot dan fungsi sistem saraf",
              deficiency: "Lumpuh, kekejangan otot",
            },
          ],
        },
      ],
      comparison: {
        title: "Larut air berbanding larut lemak",
        columns: [
          {
            title: "Larut air",
            body: "Vitamin B dan C. **Diperoleh secara berterusan daripada makanan** kerana tidak disimpan lama dalam badan.",
          },
          {
            title: "Larut lemak",
            body: "Vitamin A, D, E dan K. **Diangkut dan disimpan bersama lemak** dalam badan.",
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
          body: "Setiap ujian menggunakan **reagen khusus** yang bertindak balas dengan nutrien tertentu sahaja dan menghasilkan perubahan warna atau mendakan yang boleh diperhatikan — inilah 'keputusan positif' yang menunjukkan nutrien itu wujud dalam sampel.",
        },
        {
          title: "Ujian kanji dan gula",
          body: "Kanji: tambah larutan iodin terus pada sampel pada suhu bilik — warna bertukar kepada **biru kehitaman** jika positif. Gula penurun: tambah larutan Benedict, kemudian PANASKAN dalam mandi air — warna bertukar daripada biru kepada hijau/kuning/mendakan merah bata jika positif.",
        },
        {
          title: "Ujian protein dan lemak",
          body: "Protein: tambah reagen Millon, kemudian panaskan dalam mandi air — mendakan/warna merah bata menunjukkan keputusan positif. Lemak: campurkan sampel dengan etanol, kemudian tuang ke dalam air — **emulsi putih melekit/berkabus** terbentuk jika positif.",
        },
        {
          title: "⚠️ Langkah berjaga-jaga",
          body: "Etanol **mudah terbakar**, jadi pemanasan bagi ujian Benedict dan Millon dijalankan dalam mandi air, bukan nyalaan api terus.",
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
        "Gizi seimbang ialah gizi yang mengandungi semua kelas makanan dalam kuantiti yang betul seperti yang diperlukan oleh badan, berpandukan piramid makanan.",
      pyramid: {
        title: "Piramid Makanan",
        instruction: "Tekan aras untuk melihat cadangan sajian.",
        image: {
          src: foodPyramidImg,
          alt: "Piramid makanan KSSM: nasi, mi, roti, bijirin dan ubi-ubian pada aras tapak yang paling lebar; sayur-sayuran dan buah-buahan pada aras seterusnya; ikan, ayam, daging, telur, kekacang dan tenusu pada aras seterusnya; lemak, minyak, gula dan garam pada aras puncak yang paling sempit.",
          aspect: "3 / 2",
          size: "wide",
        },
        defaultRegionId: "grains",
        regions: [
          {
            id: "grains",
            label: "Nasi, mi, roti, bijirin lain dan ubi-ubian",
            servings: "4–8 sajian sehari",
            detailTitle: "Sumber tenaga utama",
            note: "Membekalkan karbohidrat untuk tenaga. Kumpulan ini perlu diambil dalam bahagian yang paling banyak dalam gizi harian.",
            polygon: PYRAMID_HOTSPOTS.grains,
          },
          {
            id: "vegetables",
            label: "Sayur-sayuran",
            servings: "3 sajian sehari",
            detailTitle: "Vitamin dan pelawas",
            note: "Kaya dengan vitamin, mineral dan pelawas yang membantu mengekalkan sistem penghadaman yang sihat.",
            polygon: PYRAMID_HOTSPOTS.vegetables,
          },
          {
            id: "fruits",
            label: "Buah-buahan",
            servings: "2 sajian sehari",
            detailTitle: "Vitamin dan mineral",
            note: "Sumber semula jadi vitamin dan mineral yang membantu badan kekal sihat.",
            polygon: PYRAMID_HOTSPOTS.fruits,
          },
          {
            id: "protein",
            label: "Sumber protein",
            items: [
              { label: "Ikan", servings: "1 sajian sehari" },
              { label: "Ayam / daging / telur", servings: "½–2 sajian sehari" },
              { label: "Kekacang", servings: "½–1 sajian sehari" },
            ],
            detailTitle: "Pertumbuhan dan pembaikan",
            note: "Membina dan membaiki tisu badan, serta mengukuhkan tulang dan gigi.",
            polygon: PYRAMID_HOTSPOTS.protein,
          },
          {
            id: "dairy",
            label: "Susu dan produk tenusu",
            servings: "1–3 sajian sehari",
            detailTitle: "Kalsium untuk tulang dan gigi",
            note: "Sumber penting kalsium dan protein yang menyokong tulang dan gigi yang kukuh.",
            polygon: PYRAMID_HOTSPOTS.dairy,
          },
          {
            id: "apex",
            label: "Lemak, minyak, gula dan garam",
            servings: "Makan sedikit",
            detailTitle: "Makan paling sedikit",
            note: "Pengambilan lemak, gula dan garam berlebihan meningkatkan risiko obesiti dan masalah kesihatan lain.",
            polygon: PYRAMID_HOTSPOTS.apex,
          },
        ],
        baseNote: "Minum sekurang-kurangnya 8 gelas air kosong sehari.",
        limitNote:
          "Makan lemak, minyak, gula dan garam sedikit sahaja — pengambilan berlebihan boleh menjejaskan kesihatan.",
        sourceLabel: "Sumber: Buku teks Sains Tingkatan 2 KSSM — piramid makanan.",
      },
      checks: [
        {
          question: "Apakah gizi seimbang?",
          hint: "Gizi yang mengandungi semua kelas makanan dalam kuantiti yang betul seperti diperlukan oleh badan.",
        },
        {
          question: "Aras manakah piramid makanan perlu dimakan paling banyak?",
          hint: "Aras tapak — nasi, mi, roti, bijirin lain dan ubi-ubian.",
        },
      ],
    },
    {
      number: "3.2.1",
      title: "Faktor yang Mempengaruhi Keperluan Kalori",
      intro:
        "Setiap orang memerlukan kuantiti tenaga makanan yang berbeza setiap hari. Enam faktor mempengaruhi keperluan badan seseorang.",
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
          title: "Jenis pekerjaan",
          body: "Petani, buruh dan nelayan memerlukan lebih banyak tenaga kerana **kerja berat**, berbanding pekerja pejabat seperti guru.",
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
          hint: "Umur, jantina, saiz badan, jenis pekerjaan, iklim dan keadaan kesihatan.",
        },
        {
          question: "Mengapakah nelayan memerlukan lebih tenaga berbanding guru?",
          hint: "Jenis pekerjaan nelayan melibatkan kerja fizikal yang lebih berat.",
        },
      ],
    },
    {
      number: "3.2.2",
      title: "Nilai Kalori Makanan",
      intro:
        "Nilai kalori ialah jumlah tenaga yang dibebaskan apabila 1 g makanan dioksidakan dengan lengkap, diukur dalam kalori (kal) atau joule (J).",
      comparison: {
        title: "Nilai tenaga setiap gram",
        columns: [
          {
            title: "Lemak",
            body: "**37 kJ/g (9 kcal/g)** — lebih dua kali ketumpatan tenaga protein atau karbohidrat.",
          },
          {
            title: "Protein dan karbohidrat",
            body: "Setiap satu membekalkan kira-kira **17 kJ/g (4 kcal/g)**.",
          },
        ],
      },
      calorieExample: {
        title: "🧮 Contoh Pengiraan: Nilai Kalori Sarapan",
        items: [
          { id: "rice", food: "Nasi goreng", quantity: "1 pinggan", kcal: 640 },
          { id: "banana", food: "Pisang", quantity: "2 biji", perUnitKcal: 60, multiplier: 2, kcal: 120 },
          { id: "milk", food: "Susu", quantity: "1 gelas", kcal: 130 },
        ],
        totalLabel: "Jumlah",
        note: "Jumlahkan nilai kalori bagi setiap makanan dalam hidangan. 1 kal = 4.2 J, dan 1 kkal = 4.2 kJ.",
      },
      accordions: [
        {
          title: "📋 Aktiviti: Merancang Gizi Seimbang Sehari",
          body: "Sediakan menu sarapan, makan tengah hari dan makan malam untuk satu individu (contohnya buruh binaan, wanita hamil atau murid aktif bersukan). Tentukan kuantiti makanan bagi setiap menu, kemudian jumlahkan nilai kalori untuk satu hari. Faktor seperti jenis pekerjaan, umur dan keadaan kesihatan menentukan sama ada menu itu sesuai.",
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
            note: "Alternatif sihat: **kurangkan gula, garam dan minyak**; tambah sayur-sayuran dan buah-buahan.",
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
            note: "Alternatif sihat: **bersenam secara berkala** setiap minggu.",
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
      cards: [
        {
          title: "Indeks Jisim Badan (BMI)",
          body: "BMI membandingkan jisim badan dengan ketinggian, dan merupakan satu cara untuk menyemak sama ada jisim badan berada dalam julat yang sihat — sebahagian daripada usaha mengekalkan kesihatan yang baik.",
          facts: [
            { label: "Formula", value: "BMI = jisim (kg) ÷ [ketinggian (m) × ketinggian (m)]" },
          ],
        },
      ],
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
      title: "Pencernaan Fizikal & Kimia",
      intro:
        "Pencernaan terdiri daripada dua jenis proses yang berlaku serentak: pencernaan fizikal dan pencernaan kimia.",
      comparison: {
        title: "Perbandingan pencernaan fizikal dengan pencernaan kimia",
        columns: [
          {
            title: "Pencernaan fizikal",
            body: "Berlaku di dalam mulut sahaja. Melibatkan pemecahan makanan secara mekanikal (pengunyahan). **TIDAK melibatkan enzim**.",
          },
          {
            title: "Pencernaan kimia",
            body: "Berlaku di dalam mulut, perut, duodenum dan usus. **Melibatkan bantuan enzim** untuk memecahkan molekul kompleks kepada molekul kecil dan larut.",
          },
        ],
      },
      accordions: [
        {
          title: "Apakah enzim?",
          body: "Enzim ialah bahan di dalam badan yang **menggalakkan tindak balas kimia** dalam sistem pencernaan. Enzim diperbuat daripada protein — tanpa enzim, pencernaan berlaku pada kadar yang sangat perlahan.",
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
      title: "Sistem Pencernaan Manusia",
      intro:
        "Pencernaan ialah penguraian fizikal dan kimia makanan yang kompleks atau besar kepada molekul yang lebih kecil, larut dan boleh diserap oleh badan.",
      digestiveSystem: {
        image: {
          src: digestiveSystemImg,
          annotationMode: "spotlight",
          size: "portrait",
          alt: "Rajah sistem pencernaan manusia di dalam badan: mulut, kelenjar air liur, esofagus, perut, hati, pundi hempedu, pankreas, duodenum, usus kecil, usus besar, rektum dan dubur.",
          aspect: "3 / 4",
          caption: "Ketik satu peringkat aliran makanan di bawah untuk melihat apa yang berlaku di situ dan di manakah lokasinya di sini.",
          points: [
            {
              id: "mulut",
              x: 45,
              y: 19,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.mulut,
              spotlightCaption: "Kunyahan + air liur mulakan pencernaan",
            },
            {
              id: "kelenjar-air-liur",
              x: 34,
              y: 24,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["kelenjar-air-liur"],
              spotlightCaption: "Hasilkan air liur + amilase",
            },
            {
              id: "esofagus",
              x: 50,
              y: 33,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.esofagus,
              spotlightCaption: "Menyalurkan makanan ke perut",
            },
            {
              id: "hati",
              x: 40,
              y: 48,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.hati,
              spotlightCaption: "Menghasilkan hempedu",
            },
            {
              id: "perut",
              x: 61,
              y: 51,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.perut,
              spotlightCaption: "Protease + asid → kim",
            },
            {
              id: "pundi-hempedu",
              x: 40,
              y: 55,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["pundi-hempedu"],
              spotlightCaption: "Menyimpan hempedu",
            },
            {
              id: "pankreas",
              x: 57,
              y: 59,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.pankreas,
              spotlightCaption: "Menghasilkan jus pankreas",
            },
            {
              id: "duodenum",
              x: 47,
              y: 61,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.duodenum,
              spotlightCaption: "Hempedu + jus pankreas bercampur",
            },
            {
              id: "usus-besar",
              x: 33,
              y: 71,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["usus-besar"],
              spotlightCaption: "Air diserap semula",
            },
            {
              id: "usus-kecil",
              x: 53,
              y: 75,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["usus-kecil"],
              spotlightCaption: "Pencernaan selesai; nutrien diserap",
            },
            {
              id: "rektum",
              x: 51,
              y: 81,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.rektum,
              spotlightCaption: "Menyimpan tinja",
            },
            {
              id: "dubur",
              x: 49,
              y: 90,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.dubur,
              spotlightCaption: "Tinja keluar daripada badan",
            },
          ],
        },
        title: "Struktur Sistem Pencernaan Manusia",
        instruction:
          "Ketik satu peringkat aliran makanan untuk menyorot organ yang berkaitan dan melihat apa yang berlaku di situ. Hati, pundi hempedu dan pankreas semuanya menyalurkan bahan ke duodenum — lihat penjelasannya untuk peranan masing-masing.",
        tractLabel: "Salur pencernaan",
        accessoryLabel: "Organ Aksesori Pencernaan",
        journey: [
          "mulut",
          "esofagus",
          "perut",
          "duodenum",
          "usus-kecil",
          "usus-besar",
          "rektum",
          "dubur",
        ],
        journeyTitle: "Ikuti aliran makanan",
        journeyInstruction: "Ketik setiap peringkat mengikut urutan, daripada mulut hingga dubur.",
        organs: [
          {
            id: "mulut",
            label: "Mulut",
            kind: "tract",
            note: "Makanan dikunyah dan dilembutkan oleh air liur; amilase liur mula mencerna kanji.",
            points: [
              "Makanan dikunyah oleh gigi.",
              "Cebisan makanan dilembutkan oleh air liur.",
              "Amilase liur memecahkan kanji kepada maltosa.",
            ],
          },
          {
            id: "esofagus",
            label: "Esofagus",
            kind: "tract",
            note: "Peristalsis menolak bolus makanan ke perut.",
            points: [
              "Makanan yang memasuki esofagus dipanggil bolus.",
              "Peristalsis dalam esofagus menolak bolus ke dalam perut.",
            ],
          },
          {
            id: "perut",
            label: "Perut",
            kind: "tract",
            note: "Protease dan asid hidroklorik menukar makanan kepada kim.",
            points: [
              "Dinding perut merembeskan protease dan asid hidroklorik.",
              "Asid hidroklorik mengaktifkan protease.",
              "Asid hidroklorik membunuh bakteria dalam makanan.",
              "Protease mencerna protein kepada polipeptida.",
              "Makanan separa cecair di dalam perut dipanggil kim.",
            ],
          },
          {
            id: "duodenum",
            label: "Duodenum",
            kind: "tract",
            note: "Hempedu dan jus pankreas ditambah di sini.",
            points: [
              "Makanan memasuki bahagian pertama usus kecil, iaitu duodenum.",
              "Hati menghasilkan hempedu.",
              "Pundi hempedu menyimpan hempedu.",
              "Hempedu mengemulsikan lemak kepada titisan kecil.",
              "Hempedu meneutralkan asid dalam kim.",
              "Pankreas menghasilkan jus pankreas.",
              "Jus pankreas mengandungi amilase, protease dan lipase.",
              "Amilase pankreas mencerna kanji kepada maltosa.",
              "Protease pankreas mencerna polipeptida kepada dipeptida.",
              "Lipase pankreas mencerna lemak kepada asid lemak dan gliserol.",
            ],
          },
          {
            id: "usus-kecil",
            label: "Usus kecil",
            kind: "tract",
            note: "Pencernaan disempurnakan dan nutrien diserap.",
            points: [
              "Usus kecil menyempurnakan pencernaan.",
              "Maltosa ditukar kepada glukosa oleh maltase.",
              "Dipeptida ditukar kepada asid amino.",
              "Lemak dicerna kepada asid lemak dan gliserol.",
            ],
          },
          {
            id: "usus-besar",
            label: "Usus besar",
            kind: "tract",
            note: "Air dan garam mineral diserap semula.",
            points: [
              "Makanan tidak tercerna memasuki usus besar.",
              "Air dan garam mineral diserap semula.",
            ],
          },
          {
            id: "rektum",
            label: "Rektum",
            kind: "tract",
            note: "Tinja disimpan sementara sebelum disingkirkan.",
            points: [
              "Makanan tidak tercerna menjadi tinja.",
              "Tinja disimpan sementara di dalam rektum.",
            ],
          },
          {
            id: "dubur",
            label: "Dubur",
            kind: "tract",
            note: "Tinja disingkirkan daripada badan melalui dubur.",
            points: ["Tinja disingkirkan daripada badan melalui dubur."],
          },
          {
            id: "kelenjar-air-liur",
            label: "Kelenjar air liur",
            kind: "accessory",
            connectsTo: "mulut",
            note: "Merembeskan air liur yang mengandungi amilase liur, yang mula mencerna kanji kepada maltosa semasa makanan masih di dalam mulut.",
          },
          {
            id: "hati",
            label: "Hati",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Menghasilkan hempedu, yang disalurkan ke duodenum untuk mengemulsikan lemak dan meneutralkan asid perut.",
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
            note: "Menghasilkan jus pankreas yang mengandungi amilase, protease dan lipase, yang disalurkan ke duodenum.",
          },
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
      title: "Enzim dan Pencernaan Kimia",
      intro:
        "Tiga enzim pencernaan utama bertindak ke atas tiga kelas makanan. Setiap laluan di bawah menunjukkan substrat, enzim, dan organ yang terlibat, daripada makanan asal sehingga hasil akhir.",
      reactionFlow: {
        title: "Tiga laluan pencernaan",
        instruction: "Setiap lajur menunjukkan laluan penuh satu kelas makanan sekali imbas — tiada tab, tiada yang tersembunyi.",
        columns: [
          {
            id: "carb",
            title: "Karbohidrat",
            icon: "🍚",
            steps: [
              { substrate: "Kanji", enzyme: "Amilase", organs: "Kelenjar air liur + pankreas" },
              { substrate: "Maltosa", enzyme: "Maltase", organs: "Usus kecil" },
            ],
            finalProduct: "Glukosa",
          },
          {
            id: "protein",
            title: "Protein",
            icon: "🍗",
            steps: [
              { substrate: "Protein", enzyme: "Protease", organs: "Perut" },
              { substrate: "Polipeptida", enzyme: "Protease", organs: "Pankreas" },
              { substrate: "Dipeptida", enzyme: "Protease", organs: "Usus kecil" },
            ],
            finalProduct: "Asid amino",
          },
          {
            id: "fat",
            title: "Lemak",
            icon: "🧈",
            steps: [{ substrate: "Lemak", enzyme: "Lipase", organs: "Pankreas + usus kecil" }],
            finalProduct: "Asid lemak + Gliserol",
          },
        ],
      },
      remember:
        "Tiga enzim pencernaan utama: amilase (kanji → maltosa), protease (protein → polipeptida → dipeptida → asid amino) dan lipase (lemak → asid lemak + gliserol). Setiap satu mencerna substrat yang berbeza.",
      checks: [
        {
          question:
            "Organ manakah merembeskan protease yang mencerna polipeptida kepada dipeptida?",
          hint: "Pankreas — bertindak di duodenum.",
        },
        {
          question: "Apakah dua fungsi asid hidroklorik di dalam perut?",
          hint: "Mengaktifkan protease dan membunuh bakteria — lihat peringkat Perut di bawah Sistem Pencernaan Manusia.",
        },
      ],
    },
    {
      number: "3.4.1",
      title: "Penyerapan Hasil Pencernaan",
      intro:
        "Vilus = bentuk tunggal / vili = bentuk jamak: dinding usus kecil mempunyai berjuta-juta unjuran halus seperti jari dipanggil vili, yang menambahkan luas permukaan untuk penyerapan makanan tercerna.",
      cards: [
        {
          title: "Banyak vilus",
          body: "Berjuta-juta unjuran halus **menambahkan luas permukaan** penyerapan.",
        },
        {
          title: "Dinding setebal satu sel",
          body: "Dinding vilus sangat nipis, mewujudkan **jarak resapan yang pendek**.",
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
          annotationMode: "spotlight",
          size: "compact",
          alt: "Keratan rentas satu vilus pada dinding usus kecil, menunjukkan kapilari darah dan lakteal di dalamnya.",
          aspect: "4 / 3",
          caption: "Glukosa dan asid amino masuk ke kapilari darah; asid lemak dan gliserol masuk ke lakteal.",
          points: [
            {
              id: "blood",
              x: 47,
              y: 55,
              spotlightShapes: VILLUS_SHAPES.blood,
              spotlightCaption: "Glukosa + asid amino → darah",
            },
            {
              id: "lacteal",
              x: 50,
              y: 55,
              spotlightShapes: VILLUS_SHAPES.lacteal,
              spotlightCaption: "Asid lemak + gliserol → limfa",
            },
          ],
          extra: [
            {
              id: "villus",
              label: "Vilus / Vili",
              x: 50,
              y: 13,
              note: "Unjuran halus seperti jari pada dinding usus kecil. Berjuta-juta vili (bentuk jamak vilus) menambahkan luas permukaan untuk penyerapan.",
              spotlightShapes: VILLUS_SHAPES.villus,
              spotlightCaption: "Satu unjuran halus",
            },
            {
              id: "wall",
              label: "Dinding nipis",
              x: 62,
              y: 22,
              note: "Dinding vilus setebal satu sel sahaja. Jarak resapan yang pendek ini mempercepatkan penyerapan nutrien.",
              spotlightShapes: VILLUS_SHAPES.wall,
              spotlightCaption: "Setebal satu sel sahaja",
            },
            {
              id: "lumen",
              label: "Lumen usus",
              x: 16,
              y: 25,
              note: "Ruang di dalam usus kecil tempat makanan tercerna berada sebelum diserap melalui dinding vilus.",
              spotlightShapes: VILLUS_SHAPES.lumen,
              spotlightCaption: "Makanan tercerna menunggu di sini",
            },
            {
              id: "absorption",
              label: "Penyerapan nutrien",
              x: 50,
              y: 45,
              note: "Molekul kecil hasil pencernaan menembusi dinding vilus yang nipis ke dalam kapilari darah atau lakteal — zarah besar yang tidak tercerna tidak dapat menembusinya.",
              spotlightShapes: VILLUS_SHAPES.absorption,
              spotlightCaption: "Molekul kecil menembusi dinding",
            },
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
            destination: "Sistem limfa, sebelum sampai ke peredaran darah",
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
          body: "Tabung didih P (kanji): ujian iodin dan Benedict pada air suling kekal negatif pada akhir eksperimen — **molekul kanji terlalu besar** untuk menembusi tiub Visking. Tabung didih Q (glukosa): ujian Benedict pada air suling menjadi positif (mendakan merah bata) selepas 30 minit — **molekul glukosa cukup kecil** untuk meresap keluar melalui tiub Visking.",
        },
        {
          title: "💡 Kesimpulan",
          body: "Tiub Visking berfungsi seperti model dinding usus kecil: molekul kecil dan larut seperti glukosa boleh meresap melaluinya, tetapi **molekul besar seperti kanji tidak boleh**.",
        },
      ],
      viskingExperiment: {
        image: {
          src: viskingImg,
          annotationMode: "spotlight",
          size: "compact",
          alt: "Dua tabung didih berisi air suling. Tiub Visking di dalam tabung kiri mengandungi kanji yang kekal di dalam; tiub di dalam tabung kanan mengandungi glukosa yang meresap keluar melalui membran.",
          aspect: "3 / 2",
          caption: "Kanji kekal di dalam tiub Visking. Glukosa meresap keluar melalui membran ke dalam air suling di sekelilingnya.",
          points: [
            {
              id: "P",
              x: 29,
              y: 50,
              spotlightShapes: VISKING_SHAPES.P,
              spotlightCaption: "Kanji kekal di dalam — terlalu besar untuk menembusi",
            },
            {
              id: "Q",
              x: 68,
              y: 50,
              spotlightShapes: VISKING_SHAPES.Q,
              spotlightCaption: "Glukosa meresap keluar",
            },
          ],
          extra: [
            {
              id: "tubing",
              label: "Membran tiub Visking",
              x: 48,
              y: 88,
              note: "Membran separa telap yang mewakili dinding usus kecil: hanya molekul kecil boleh menembusinya.",
              spotlightShapes: VISKING_SHAPES.tubing,
              spotlightCaption: "Membran separa telap",
            },
            {
              id: "water",
              label: "Air suling",
              x: 15,
              y: 24,
              note: "Air suling di luar tiub mewakili darah. Ujian makanan dijalankan pada air ini untuk mengesan apa yang telah meresap keluar.",
              spotlightShapes: VISKING_SHAPES.water,
              spotlightCaption: "Ujian makanan dijalankan di sini",
            },
            {
              id: "before",
              label: "Sebelum (0 minit)",
              x: 50,
              y: 8,
              note: "Pada permulaan, kedua-dua tiub hanya mengandungi bahan asalnya. Air di luar masih jernih — tiada ujian makanan akan positif lagi.",
            },
            {
              id: "after",
              label: "Selepas (30 minit)",
              x: 50,
              y: 8,
              note: "Selepas 30 minit, air di luar tiub Q positif untuk glukosa (ujian Benedict bertukar merah bata). Air di luar tiub P kekal negatif — kanji tidak pernah menembusi membran.",
            },
          ],
        },
        title: "Susunan radas eksperimen tiub Visking",
        instruction:
          "Kedua-dua tiub Visking direndam dalam air suling berasingan. Ujian makanan dijalankan pada air suling DI LUAR tiub, bukan pada kandungan di dalam tiub.",
        tubes: [
          { id: "P", label: "Tiub kanji (P)", contents: "Tiub Visking + ampaian kanji" },
          { id: "Q", label: "Tiub glukosa (Q)", contents: "Tiub Visking + larutan glukosa" },
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
        "Asimilasi ialah proses pengagihan hasil akhir pencernaan bagi kegunaan sel-sel badan. Untuk molekul ini sampai daripada vilus ke setiap sel, kerjasama tiga sistem badan diperlukan.",
      systemFlow: {
        title: "Bagaimana tiga sistem bekerjasama",
        instruction: "Ikuti aliran daripada setiap sistem sehingga bagaimana sel badan menggunakan nutrien.",
        systems: [
          {
            icon: "🍽️",
            label: "Sistem pencernaan",
            role: "Memecahkan makanan kepada nutrien kecil dan larut",
          },
          {
            icon: "🩸",
            label: "Sistem peredaran darah",
            role: "Mengangkut nutrien daripada vilus ke sel badan",
          },
          {
            icon: "🫁",
            label: "Sistem respirasi",
            role: "Membekalkan oksigen yang diperlukan oleh sel badan",
          },
        ],
        convergeLabel: "Sel badan",
        convergeNote: "Menerima nutrien dan oksigen serentak.",
        outcomes: [
          { label: "Glukosa + oksigen", result: "→ respirasi → tenaga" },
          { label: "Asid amino", result: "→ komponen sel baharu" },
          { label: "Asid lemak + gliserol", result: "→ lemak simpanan: penebat haba + pelindung organ" },
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
          body: "**Baki pepejal** (serat, sisa rembesan salur pencernaan, sel mati, air) yang tidak diserap atau dicerna.",
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
            note: "Cara elak: makan **cukup serat** (buah-buahan, sayur-sayuran, bijirin) dan air (sekurang-kurangnya 2 liter sehari).",
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
    "Saya boleh menerangkan piramid makanan dan faktor yang mempengaruhi keperluan kalori.",
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
