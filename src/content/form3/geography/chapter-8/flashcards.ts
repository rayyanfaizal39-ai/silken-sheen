import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Namakan empat kawasan utama yang dipelajari dalam Bab 8.",
    "Gurun Panas, Hutan Monsun Tropika, Hutan Daun Luruh Sederhana, dan Hutan Konifer",
  ],
  ["Bilakah Hari Hidupan Liar Sedunia disambut?", "3 Mac setiap tahun"],
  [
    "Nyatakan tiga contoh Gurun Panas di dunia.",
    "Gurun Sahara (Afrika), Gurun Arab (Asia Barat), dan Gurun Besar Australia",
  ],
  [
    "Di manakah taburan Hutan Monsun Tropika boleh ditemui?",
    "India, Myanmar, Thailand, Sri Lanka, dan Filipina",
  ],
  [
    "Namakan negara yang mempunyai Hutan Daun Luruh Sederhana.",
    "Kanada, Amerika Syarikat, Jepun, New Zealand, dan Eropah Barat",
  ],
  [
    "Hutan Konifer juga dikenali dengan nama apa?",
    "Hutan Taiga atau Hutan Boreal (luar sumber: istilah umum geografi; rujukan sumber: Hutan Konifer di Rusia dan Kanada)",
  ],
  ["Gurun Atacama terletak di benua mana?", "Amerika Selatan"],
  ["Di manakah letaknya Gurun Thar?", "India"],
  ["Nyatakan lokasi Hutan Konifer di Eropah.", "Sweden dan Finland"],
  ["Hutan Daun Luruh Sederhana di Kanada tertumpu di kawasan mana?", "Southwestern Ontario"],
  ["Namakan gurun yang terletak di Amerika Utara.", "Gurun Mojave"],
  ["Di manakah letaknya Hutan Monsun Tropika di Sri Lanka?", "Taman Negara Yala"],
  ["Sebutkan satu lokasi Hutan Konifer di Rusia.", "Sayan Mountain atau Samara Mountain"],
  ["Kawasan Tasmania (Australia) mempunyai jenis hutan apa?", "Hutan Daun Luruh Sederhana"],
  ["Di manakah taburan Hutan Monsun Tropika di Filipina?", "Luzon"],
  [
    "Apakah maksud tumbuhan xerofit?",
    "Tumbuhan yang dapat hidup atau tumbuh di persekitaran yang kering",
  ],
  [
    "Mengapakah pokok di Gurun Panas mempunyai akar yang panjang?",
    "Untuk menyerap air jauh ke dalam tanah atau merebak di permukaan bumi",
  ],
  [
    "Nyatakan ciri daun pokok di kawasan gurun.",
    "Daun berkilat, liat, dan berbulu untuk mengurangkan kehilangan air",
  ],
  ["Berikan tiga contoh tumbuhan di Gurun Panas.", "Kaktus, rumput esparto, dan pokok kurma"],
  ["Apakah ketinggian purata pokok di Hutan Monsun Tropika?", "Antara 20 hingga 30 meter"],
  [
    "Bagaimanakah keadaan Hutan Monsun Tropika semasa musim kering?",
    "Pokok-pokok akan menggugurkan daunnya",
  ],
  ["Namakan dua jenis pokok kayu keras di Hutan Monsun Tropika.", "Pokok jati dan pokok cendana"],
  [
    "Mengapakah daun pokok Hutan Monsun Tropika bersaiz lebar?",
    "Untuk mendapatkan cahaya matahari yang maksimum",
  ],
  [
    "Apakah ciri utama batang pokok di Hutan Daun Luruh Sederhana?",
    "Mempunyai kulit tebal untuk mengurangkan transpirasi semasa musim sejuk",
  ],
  [
    "Definisi transpirasi.",
    "Kehilangan air melalui liang-liang seni (stoma) pada permukaan tumbuhan secara penyejatan",
  ],
  ["Apakah bentuk kanopi pokok Hutan Konifer?", "Berbentuk kon"],
  [
    "Mengapakah pokok Hutan Konifer berbentuk kon?",
    "Untuk mengelakkan salji terkumpul di atas dahan yang boleh mematahkan pokok",
  ],
  ["Terangkan ciri daun pokok konifer.", "Bersaiz kecil, halus, dan berbentuk jarum"],
  ["Apakah kegunaan lapisan lilin pada daun pokok konifer?", "Untuk mengelakkan ancaman fros"],
  ["Jenis tanih apakah yang sesuai untuk Hutan Konifer?", "Tanih podzol"],
  ["Namakan pokok di Hutan Daun Luruh Sederhana yang terkenal di Kanada.", "Pokok maple"],
  ["Berikan contoh pokok di Hutan Konifer.", "Pokok pain, fir, dan sprus"],
  [
    "Adakah Hutan Monsun Tropika mempunyai lapisan hutan yang nyata?",
    "Kelihatan berlapis-lapis tetapi tidak begitu nyata berbanding Hutan Hujan Tropika",
  ],
  [
    "Apakah fungsi akar pendek pada pokok konifer?",
    "Adaptasi kerana hanya lapisan atas tanih sahaja yang tidak membeku semasa musim panas singkat",
  ],
  [
    "Pokok jati banyak digunakan untuk industri apa?",
    "Industri perabot (luar sumber: umum; rujukan sumber: kayu keras untuk ekonomi)",
  ],
  ["Apakah maksud haiwan nokturnal?", "Hidupan yang aktif pada waktu malam"],
  [
    "Bagaimanakah hidupan di Gurun Panas menjimatkan tenaga pada siang hari?",
    "Berteduh di bawah pokok atau bersembunyi di dalam lubang",
  ],
  ["Berikan tiga contoh hidupan liar di Gurun Panas.", "Unta, tikus jerboa, dan musang fennec"],
  [
    "Apakah keistimewaan kodok di kawasan gurun?",
    "Kulit kalis air yang dapat menyimpan kelembapan dan boleh tertimbus sehingga 11 bulan",
  ],
  ["Namakan haiwan karnivor utama di Hutan Monsun Tropika.", "Harimau Bengal dan buaya"],
  [
    "Di manakah gajah dan rusa biasanya ditemui dalam lapisan Hutan Monsun Tropika?",
    "Di lapisan lantai hutan",
  ],
  [
    "Apakah ciri fizikal haiwan di Hutan Monsun Tropika?",
    "Berbulu nipis, kulit berkedut, dan bersaiz besar",
  ],
  ["Apakah maksud hibernasi?", "Keadaan tidak aktif atau tidur sepanjang musim sejuk"],
  ["Namakan haiwan yang berhibernasi di Hutan Daun Luruh Sederhana.", "Chipmunk"],
  ["Berikan contoh burung di Hutan Daun Luruh Sederhana.", "Burung hantu dan burung belatuk hitam"],
  ["Apakah haiwan yang menjadi ikon Hutan Konifer?", "Moose, lynx, dan beruang"],
  [
    "Mengapakah haiwan di Hutan Konifer aktif pada musim panas?",
    "Untuk mencari makanan secukupnya sebelum musim sejuk tiba",
  ],
  [
    "Bagaimanakah rusa dan burung di Hutan Konifer menghadapi musim sejuk?",
    "Berpindah (migrasi) ke kawasan yang lebih panas di bahagian selatan",
  ],
  ["Namakan spesies serigala yang terdapat di kawasan sejuk.", "Siberian Wolf"],
  ["Musang merah biasanya ditemui di hutan jenis apa?", "Hutan Daun Luruh Sederhana"],
  [
    "Nyatakan empat kepentingan utama flora dan fauna di dunia.",
    "Pelancongan, Ekonomi, Penghalang Hakisan, dan Sumber Perubatan",
  ],
  [
    "Apakah peranan unta dalam sektor pelancongan di gurun?",
    "Sebagai pengangkutan dan tarikan pelancong",
  ],
  [
    "Di manakah gajah digunakan sebagai pengangkutan pelancong untuk menjelajah hutan?",
    "Erawan National Park (Thailand)",
  ],
  [
    "Kayu dari Hutan Konifer penting untuk industri apa?",
    "Membekalkan bahan mentah untuk membuat kertas",
  ],
  [
    "Bagaimanakah daun yang besar dapat menghalang hakisan tanah?",
    "Memecahkan butiran hujan dan mengurangkan kelajuan titisan air yang jatuh ke bumi",
  ],
  ["Apakah fungsi akar pokok dalam mencegah hakisan?", "Mengurangkan air larian permukaan"],
  [
    "Bagaimanakah pokok bakau melindungi pinggir laut?",
    "Akar menguatkan struktur tanah dan menahan tindakan ombak",
  ],
  ["Namakan bunga terbesar di dunia yang ditemui di Thailand.", "Rafflesia kerrii"],
  [
    "Apakah kegunaan biji pain dalam bidang perubatan?",
    "Digunakan sebagai sumber nutrien dan ubat-ubatan",
  ],
  ["Pokok Prickly pear sesuai digunakan untuk apa?", "Sumber perubatan di kawasan gurun"],
  ["Berapakah peratusan Hutan Monsun Tropika di Erawan National Park?", "81%"],
  ["Mengapakah aktiviti pembalakan penting kepada penduduk tempatan?", "Membuka peluang pekerjaan"],
  [
    "Apakah kepentingan estetik hutan kepada manusia?",
    "Memberikan keindahan dan tempat rekreasi (maksud estetika: berkaitan keindahan)",
  ],
  [
    "Namakan satu agensi antarabangsa yang sering dikaitkan dengan hidupan liar (berdasarkan logo pada sumber).",
    "WWF",
  ],
  [
    "Mengapakah kita perlu menjaga keseimbangan ekosistem dunia?",
    "Untuk memastikan kelangsungan hidup flora, fauna, dan manusia bagi generasi akan datang (Pembangunan Lestari)",
  ],
] as const;

export const geographyF3C8Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c8-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 8",
    front,
    back,
  }),
);
