import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c7-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 7",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C7FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Satah dan Unjuran Ortogon (Cards 1-20)
  ["Apakah satah?", "Permukaan rata pada objek"],
  ["Apakah tiga jenis satah?", "Mengufuk, mencancang, condong"],
  ["Apakah satah mengufuk?", "Satah mendatar (horizontal)"],
  ["Apakah satah mencancang?", "Satah tegak (vertical)"],
  ["Apakah normal kepada satah?", "Garis lurus berserenjang (90°) dengan satah"],
  ["Apakah unjuran ortogon?", "Imej terbentuk pada satah dengan garis unjuran berserenjang satah"],
  ["Adakah semua unjuran ialah unjuran ortogon?", "Tidak, hanya jika garis unjuran berserenjang satah"],
  ["Kubus PQRSTUVW, normal kepada PQRS?", "UP, VQ, WR, TS"],
  ["Apakah maksud susunan huruf normal (cth TS bukan ST)?", "Menunjukkan arah dan urutan titik yang betul"],
  ["Mengapa panjang sisi unjuran berbeza mengikut arah pandangan?", "Sisi condong/tegak terhadap satah berubah panjang dalam unjuran"],
  ["Apakah yang kekal sama dalam unjuran pada satah tertentu?", "Sisi yang selari/terletak pada satah itu"],
  ["Silinder diameter 4cm tinggi 6cm. Bentuk pelan?", "Bulatan diameter 4cm"],
  ["Daripada soalan di atas, bentuk dongakan?", "Segi empat tepat 4cm x 6cm"],
  ["Apakah maksud satah condong?", "Satah yang tidak mengufuk dan tidak mencancang"],
  ["Apakah kesilapan lazim mengenai unjuran ortogon?", "Menganggap semua unjuran ortogon tanpa sahkan keserenjangan"],
  ["Bagaimana sahkan unjuran adalah unjuran ortogon?", "Pastikan garis unjuran berserenjang dengan satah"],
  ["Apakah aplikasi unjuran ortogon dalam kejuruteraan?", "Reka bentuk dan pembinaan perindustrian"],
  ["Apakah langkah pertama melukis unjuran ortogon?", "Kenal pasti satah dan arah pandangan"],
  ["Apakah langkah selepas lukis garis normal dari bucu objek?", "Sambungkan titik persilangan normal dengan satah"],
  ["Apakah langkah akhir melukis unjuran ortogon?", "Lukis semula dengan ukuran sebenar dan label bucu"],

  // Deck 2: Pelan dan Dongakan (Cards 21-40)
  ["Apakah pelan?", "Unjuran ortogon pada satah mengufuk (pandangan atas)"],
  ["Apakah dongakan?", "Unjuran ortogon pada satah mencancang (pandangan depan/sisi)"],
  ["Di mana pelan diletakkan dalam susunan sukuan standard?", "Sukuan keempat"],
  ["Di mana dongakan depan diletakkan?", "Sukuan pertama (atas pelan)"],
  ["Apakah garis padu tebal digunakan untuk?", "Sisi yang nampak"],
  ["Apakah garis sempang digunakan untuk?", "Sisi tersembunyi/terlindung"],
  ["Apakah garis padu halus digunakan untuk?", "Garis binaan/unjuran"],
  ["Dalam kaedah 1, arah pandangan kanan-ke-kiri. Kedudukan dongakan sisi?", "Sebelah kiri dongakan depan"],
  ["Dalam kaedah 2, arah pandangan kiri-ke-kanan. Kedudukan dongakan sisi?", "Sebelah kanan dongakan depan"],
  ["Apakah skala yang digunakan melukis pelan & dongakan?", "Skala penuh (1:1) melainkan dinyatakan"],
  ["Berapa pandangan biasa dilukis bersama?", "Tiga: pelan, dongakan depan, dongakan sisi"],
  ["Apakah maksud 'keratan rentas seragam'?", "Bentuk keratan yang sama di sepanjang prisma"],
  ["Apakah perlu dibina tepat untuk sudut khas (45°, 60°)?", "Gunakan protraktor/jangka lukis dengan tepat"],
  ["Apakah kesilapan lazim melukis dongakan?", "Tertinggal tukar kepada garis sempang untuk sisi tersembunyi"],
  ["Apakah label E/D bermaksud dalam unjuran?", "Dua bucu objek bertindih pada titik unjuran yang sama"],
  ["Apakah fungsi utama pelan dan dongakan?", "Memberi maklumat tepat berkaitan reka bentuk dan saiz objek"],
  ["Apakah bidang yang banyak guna pelan dan dongakan?", "Kejuruteraan, pembinaan, arkitek, perkomputeraan"],
  ["Bagaimana tentukan kedudukan dongakan sisi (sukuan 1 atau 2)?", "Berdasarkan arah pandangan sisi sebenar"],
  ["Apakah maksud jika dongakan sisi di sukuan kedua?", "Pandangan sisi dari arah kanan"],
  ["Apakah maksud jika dongakan sisi di sukuan pertama?", "Pandangan sisi dari kiri ke kanan"],

  // Deck 3: Mensintesis Pelan dan Dongakan (Cards 41-60)
  ["Apakah maksud mensintesis pelan dan dongakan?", "Menggabungkan tiga unjuran untuk melakar bentuk 3D objek"],
  ["Apakah langkah 1 mensintesis unjuran?", "Lakar tiga unjuran ortogon pada satah berkaitan dengan ukuran sebenar"],
  ["Apakah langkah 2 mensintesis unjuran?", "Unjurkan permukaan untuk bertemu"],
  ["Apakah langkah 3 mensintesis unjuran?", "Sambungkan bucu-bucu mengikut label warna/huruf"],
  ["Apakah langkah 4 mensintesis unjuran?", "Lengkapkan lakaran dengan label panjang sisi"],
  ["Mengapa label konsisten penting semasa mensintesis?", "Memastikan bucu sepadan merentasi ketiga-tiga pandangan"],
  ["Apakah cabaran utama jika bongkah dikeluarkan daripada objek?", "Kenal pasti permukaan yang membentuk lubang/lekukan dengan tepat"],
  ["Apakah perlu dilabel pada permukaan bongkah yang dikeluarkan?", "Label permukaan I, II, III dan seterusnya"],
  ["Apakah kesan sudut tidak tepat semasa melakar bentuk 3D?", "Mengubah bentuk dan kedudukan permukaan condong, menjejaskan ketepatan"],
  ["Apakah perkaitan antara RBT (unjuran ortografik) dengan bab ini?", "Konsep yang serupa digunakan dalam reka bentuk dan teknologi"],
  ["Apakah perlu disemak selepas melakar objek 3D?", "Bandingkan dengan ketiga-tiga unjuran asal untuk pastikan ketepatan"],
  ["Apakah aplikasi sebenar mensintesis pelan dan dongakan?", "Membina semula model bangunan/objek daripada lukisan teknikal"],
  ["Apakah maksud bongkah berbentuk kuboid dikeluarkan dari prisma?", "Sebahagian isi padu prisma dipotong membentuk lubang kuboid"],
  ["Bagaimana kenal pasti arah pandangan sisi sebenar daripada kedudukan sukuan?", "Sukuan 1=kiri-ke-kanan; sukuan 2=kanan-ke-kiri"],
  ["Apakah perlu dilakukan jika objek mempunyai sudut 60° pada permukaan?", "Bina sudut tersebut dengan tepat menggunakan kaedah geometri yang betul"],
  ["Mengapa unjuran ortogon penting sebelum melakar bentuk 3D?", "Memberikan maklumat ukuran tepat bagi setiap pandangan objek"],
  ["Apakah perbezaan antara melukis unjuran dan mensintesis unjuran?", "Melukis unjuran = dari objek ke 2D; mensintesis = dari 2D kembali ke objek 3D"],
  ["Apakah tip menyemak bentuk 3D yang dilakar?", "Pastikan semua panjang sisi dan sudut sepadan dengan ketiga-tiga unjuran"],
  ["Apakah istilah lain bagi 'pandangan atas' dalam konteks ini?", "Pelan"],
  ["Apakah istilah lain bagi 'pandangan depan/sisi' dalam konteks ini?", "Dongakan"],
]);
