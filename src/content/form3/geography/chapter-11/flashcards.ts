import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Apakah definisi kitar semula mengikut Akta 672?",
    "Memungut dan mengasingkan sisa pepejal bagi maksud menghasilkan keluaran",
  ],
  ["Apakah nama penuh Akta 672?", "Akta Pengurusan Sisa Pepejal dan Pembersihan Awam 2007"],
  [
    "Nyatakan tiga elemen utama dalam amalan 3R.",
    "Reduce (Kurangkan), Reuse (Guna semula), dan Recycle (Kitar semula)",
  ],
  [
    "Terangkan maksud elemen Reduce (Kurangkan).",
    "Amalan mengurangkan sisa pepejal untuk meminimumkan penggunaan sumber semula jadi",
  ],
  [
    "Berikan contoh amalan Reduce semasa membeli makanan.",
    "Membeli makanan mengikut keperluan untuk mengelakkan pembaziran",
  ],
  [
    "Bagaimanakah penggunaan e-mel dikaitkan dengan elemen Reduce?",
    "Mengurangkan penggunaan kertas melalui komunikasi digital",
  ],
  [
    "Apakah definisi Reuse (Guna semula)?",
    "Tindakan menggunakan semula barangan secara berulang kali untuk mengurangkan penghasilan sisa",
  ],
  [
    "Berikan satu contoh amalan Reuse bagi botol plastik.",
    "Menggunakan semula botol plastik sebagai hiasan atau bekas alat tulis",
  ],
  [
    "Mengapakah kita digalakkan membawa beg sendiri semasa membeli-belah?",
    "Ia merupakan amalan Reuse beg yang boleh digunakan berulang kali",
  ],
  [
    "Apakah maksud elemen Recycle (Kitar semula)?",
    "Amalan mengasingkan barangan mengikut jenis untuk menghasilkan produk yang sama jenis atau produk baharu",
  ],
  ["Surat khabar lama boleh dikitar semula menjadi apa?", "Bakul atau kraf tangan yang menarik"],
  ["Sisa pertanian boleh dikitar semula menjadi produk apa?", "Baja organik untuk tanaman"],
  ["Berikan contoh inovasi kitar semula menggunakan tayar terpakai.", "Dijadikan pasu tanaman"],
  ["Apakah slogan atau tema amalan kitar semula di Malaysia?", '"Fikir Dahulu Sebelum Buang"'],
  [
    "Mengapakah barangan kitar semula perlu diasingkan mengikut jenis?",
    "Untuk memudahkan proses pemprosesan semula bahan tersebut",
  ],
  [
    "Nyatakan dua kepentingan utama kitar semula kepada manusia.",
    "Menjana pendapatan dan menjimatkan sumber semula jadi",
  ],
  [
    "Bagaimanakah kitar semula boleh menjana pendapatan individu?",
    "Melalui jualan barang kitar semula atau penghasilan baja kompos daripada sisa makanan",
  ],
  [
    "Sebutkan dua kepentingan kitar semula kepada alam sekitar.",
    "Mengurangkan pencemaran dan mengurangkan kesan rumah hijau",
  ],
  [
    "Mengapakah amalan kitar semula dapat mengurangkan kesan rumah hijau?",
    "Kerana ia mengurangkan pembebasan gas rumah hijau daripada aktiviti penghasilan barang baharu",
  ],
  [
    "Apakah faedah kitar semula terhadap tapak pelupusan sampah?",
    "Meningkatkan jangka hayat tapak pelupusan tersebut",
  ],
  [
    "Berapakah anggaran nilai barangan kitar semula yang dibuang ke tapak pelupusan di Malaysia setahun?",
    "Dianggarkan mencecah RM900 juta",
  ],
  [
    "Berapakah sisa makanan yang dibuang oleh setiap isi rumah di Malaysia dalam setahun?",
    "Kira-kira 215 kilogram",
  ],
  [
    "90 peratus sisa yang dihasilkan oleh pasar raya dan restoran terdiri daripada apa?",
    "Sisa makanan",
  ],
  ["Kitar semula membantu mewujudkan persekitaran yang bagaimana?", "Sihat, bersih, dan selesa"],
  [
    "Apakah kesan kitar semula kertas terhadap sumber hutan?",
    "Membantu memelihara habitat flora dan fauna dengan mengurangkan penebangan pokok",
  ],
  [
    "Mengapakah jumlah sisa dunia semakin meningkat?",
    "Akibat pertambahan populasi, gaya hidup tinggi, dan penggunaan pembungkusan yang berlebihan",
  ],
  [
    "Apakah kepentingan kitar semula dari segi penggunaan tenaga?",
    "Menjimatkan tenaga yang diperlukan untuk memproses bahan mentah asli",
  ],
  [
    "Adakah amalan kitar semula membantu mencapai Pembangunan Lestari?",
    "Ya, kerana ia memastikan kelestarian alam sekitar untuk masa hadapan",
  ],
  [
    "Mengapakah kitar semula dianggap sebagai komponen utama pengurusan sisa moden?",
    "Kerana ia kaedah yang paling mesra alam untuk melupuskan bahan buangan",
  ],
  [
    "Siapakah yang bertanggungjawab mengamalkan kitar semula?",
    "Semua pihak, bermula daripada peringkat individu dan keluarga",
  ],
  [
    "Bilakah pihak kerajaan mewajibkan pengasingan sisa pepejal di punca?",
    "Mulai 1 September 2015",
  ],
  [
    "Nyatakan tiga kategori pengasingan sisa pepejal di Malaysia.",
    "Sisa kitar semula, sisa baki, dan sisa pukal/kebun",
  ],
  ['Berikan tiga contoh "sisa baki".', "Sisa makanan, lampin pakai buang, dan bahan-bahan kotor"],
  ['Apakah yang dimaksudkan dengan "sisa pukal"?', "Sisa perabot dan barangan elektrik yang besar"],
  ['Apakah contoh "sisa kebun"?', "Ranting, daun, bunga, dan pelepah pokok"],
  ["Kerap manakah kutipan bagi sisa kitar semula dan sisa pukal dilakukan?", "Sekali seminggu"],
  ["Berapa kalikah kutipan bagi sisa baki dijalankan dalam seminggu?", "Dua kali seminggu"],
  [
    "Negeri manakah yang pertama melaksanakan kempen Hari Tanpa Beg Plastik?",
    "Pulau Pinang pada 6 Julai 2009",
  ],
  [
    "Berapakah bayaran yang dikenakan kepada pelanggan yang mahukan beg plastik di premis terpilih?",
    "RM0.20 bagi setiap beg plastik",
  ],
  ["Di manakah terletaknya Butik 3R yang mengutip baju terpakai?", "Presint 9, Putrajaya"],
  [
    "Apakah tujuan hasil jualan baju di Butik 3R Putrajaya?",
    "Disalurkan kepada rumah anak yatim dan golongan yang memerlukan",
  ],
  ["Bilakah Hari Kitar Semula Kebangsaan disambut?", "11 November setiap tahun"],
  [
    "Apakah peranan utama SWCorp di Malaysia?",
    "Menguruskan sisa pepejal dan pembersihan awam secara sistematik",
  ],
  [
    "Namakan salah satu negeri yang terlibat dalam penguatkuasaan awal Akta 672.",
    "Johor, Pahang, atau Melaka (pilih satu)",
  ],
  [
    "Apakah tujuan pendidikan alam sekitar di sekolah dalam isu kitar semula?",
    "Memberi kesedaran dan menggalakkan inovasi murid terhadap kelestarian alam",
  ],
  [
    "Terangkan keunikan kitar semula botol plastik di Jerman.",
    "Penduduk akan mendapat €0.25 untuk setiap botol plastik yang dipulangkan ke mesin tebus semula",
  ],
  [
    "Apakah itu Ordinan Pembungkusan di Jerman?",
    "Undang-undang yang mewajibkan pengilang mengutip semula bungkusan barangan daripada pengguna",
  ],
  [
    "Apakah maksud logo Green Dot pada bungkusan barangan di Jerman?",
    "Menunjukkan pengilang telah membayar yuran kitar semula bagi kotak tersebut",
  ],
  [
    "Apakah fungsi agensi Duales System Deutschland GmBH di Jerman?",
    "Menguruskan kutipan bahan terbuang dengan cara yang sistematik",
  ],
  ["Berapakah peratusan sisa yang dikitar semula di Denmark?", "Mencapai kadar hampir 67%"],
  [
    "Apakah fokus utama Program Waste 21 di Denmark?",
    "Menjelaskan strategi kitar semula sisa dengan cekap dan berkesan",
  ],
  [
    "Jelaskan Program Pengembalian Deposit di Denmark.",
    "Pengilang membayar deposit kepada kerajaan yang akan dikembalikan apabila produk dikitar semula",
  ],
  [
    'Apakah itu "Cukai Hijau" (Green Tax) di Denmark?',
    "Cukai dikenakan ke atas pelupusan sisa tidak mudah hancur seperti bateri dan plastik",
  ],
  ["Berapakah peratus sisa di Denmark yang dilupuskan melalui kaedah incinerator?", "28%"],
  [
    "Apakah peranan Affaldsbekendtgoerelsen 1999 di Denmark?",
    "Menguatkuasakan undang-undang pengurusan sisa pepejal oleh pihak berkuasa tempatan",
  ],
  [
    "Berapakah kadar kitar semula sisa domestik di Sweden?",
    "99%, di mana hanya 1% sisa berakhir di tapak pelupusan",
  ],
  [
    "Bagaimanakah Sweden menjana tenaga elektrik daripada sampah?",
    "Melalui pembakaran sisa domestik dalam incinerator",
  ],
  [
    "Satu tan sisa yang dibakar di Sweden boleh menghasilkan berapa tenaga?",
    "Menghasilkan 3MWh tenaga elektrik",
  ],
  ["Nyatakan program kitar semula yang terkenal di Taiwan.", "Program 4-Dalam-1"],
  [
    "Siapakah empat golongan yang bekerjasama dalam Program 4-Dalam-1 di Taiwan?",
    "Masyarakat, pihak berkuasa bandar, syarikat kitar semula, dan badan sukarela",
  ],
  [
    "Apakah fungsi sistem iTrash di Taiwan?",
    "Membolehkan masyarakat menukar sisa kitar semula terus kepada wang",
  ],
  [
    "Mengapakah Sweden mengimport sisa dari negara lain?",
    "Untuk menampung keperluan penjanaan tenaga elektrik melalui pembakaran sisa",
  ],
  [
    "Apakah kesan penggunaan tong kitar semula mengikut kategori di kawasan perumahan?",
    "Memudahkan pengasingan dan mengurangkan pencemaran bau",
  ],
  [
    "Kitar semula adalah kunci utama untuk menjaga apa bagi generasi akan datang?",
    "Keseimbangan ekosistem dan bekalan sumber semula jadi",
  ],
  [
    "Apakah matlamat akhir semua negara dalam memperkasakan kitar semula?",
    "Untuk memastikan kelestarian alam sekitar secara global",
  ],
] as const;

export const geographyF3C11Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c11-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 11",
    front,
    back,
  }),
);
