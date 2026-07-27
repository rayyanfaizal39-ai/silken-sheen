import type { Flashcard } from "@/data/types";

const flashcardContent = [
  [
    "Nyatakan lima jenis hutan utama di Malaysia.",
    "Hutan Hujan Tropika, Hutan Paya Air Masin, Hutan Paya Air Tawar, Hutan Pantai, dan Hutan Gunung",
  ],
  ["Apakah jenis hutan yang paling luas di Malaysia?", "Hutan Hujan Tropika"],
  [
    "Di manakah taburan Hutan Hujan Tropika biasanya ditemui?",
    "Di kawasan kaki bukit atau dataran pamah yang ketinggiannya kurang daripada 1,000 meter",
  ],
  [
    "Namakan lokasi Hutan Paya Air Masin yang terkenal di Malaysia.",
    "Laut Matang (Perak) dan muara Sungai Rajang (Sarawak)",
  ],
  [
    "Di manakah terletaknya Hutan Paya Air Tawar yang terbesar di Malaysia?",
    "Tasik Bera dan Tasik Chini (Pahang)",
  ],
  [
    "Nyatakan lokasi contoh bagi Hutan Pantai.",
    "Pantai Cahaya Bulan (Kelantan) dan Pantai Desaru (Johor)",
  ],
  [
    "Berapakah ketinggian minimum bagi kawasan Hutan Gunung?",
    "Melebihi 1,200 meter dari aras laut",
  ],
  [
    "Apakah ciri utama hutan di Malaysia secara umum?",
    "Malar hijau dan mempunyai kepelbagaian spesies (megabiodiversiti)",
  ],
  ["Apakah spesies tumbuhan yang sinonim dengan Hutan Pantai?", "Pokok Ru dan Pokok Kelapa"],
  [
    "Mengapakah Hutan Hujan Tropika di Malaysia tumbuh dengan lebat?",
    "Kerana menerima cahaya matahari dan hujan yang banyak sepanjang tahun",
  ],
  [
    "Namakan empat lapisan utama dalam Hutan Hujan Tropika.",
    "Lapisan Renjong (Emergent), Kanopi (Silara), Lapisan Tengah, dan Lantai Hutan",
  ],
  ["Apakah ketinggian purata pokok di Lapisan Renjong?", "Antara 40 hingga 50 meter"],
  [
    "Apakah fungsi akar banir pada pokok di Lapisan Renjong?",
    "Untuk menyokong pokok yang tinggi daripada tumbang",
  ],
  ["Lapisan manakah yang membentuk bumbung hutan yang padat?", "Lapisan Kanopi (Silara)"],
  [
    "Mengapakah cahaya matahari sukar sampai ke lantai hutan?",
    "Kerana dihalang oleh lapisan kanopi yang sangat rapat",
  ],
  ["Apakah jenis tumbuhan yang banyak ditemui di Lapisan Tengah?", "Tumbuhan epifit dan liana"],
  [
    "Apakah itu tumbuhan liana?",
    "Tumbuhan memanjat yang bergantung pada pokok lain untuk mendapatkan cahaya matahari, contohnya rotan",
  ],
  ["Apakah ketinggian pokok di Lapisan Tengah?", "Antara 10 hingga 20 meter"],
  [
    "Terangkan keadaan Lantai Hutan.",
    "Keadaan agak gelap dan lembap kerana hanya 2% cahaya matahari sampai ke bawah",
  ],
  [
    "Apakah itu tumbuhan saprofit?",
    "Tumbuhan yang hidup di atas bahan organik yang reput di lantai hutan",
  ],
  ["Namakan contoh tumbuhan epifit.", "Orkid dan paku pakis langsuir"],
  [
    "Mengapakah pokok di lapisan renjong mempunyai batang yang lurus?",
    "Untuk bersaing mendapatkan cahaya matahari yang maksimum",
  ],
  [
    "Apakah fungsi utama kanopi hutan dalam ekosistem?",
    "Mengurangkan hakisan hujan dengan memecahkan titisan hujan sebelum sampai ke bumi",
  ],
  [
    "Di manakah terletaknya habitat utama bagi burung dan kelawar dalam hutan?",
    "Lapisan Renjong dan Kanopi",
  ],
  [
    "Apakah ciri daun pokok di Lapisan Kanopi?",
    "Berdaun lebar dan berbentuk tirus (drip-tip) untuk menyalirkan air hujan dengan cepat",
  ],
  ["Apakah jenis tanih bagi Hutan Paya Air Masin?", "Tanih lumpur dan berselut"],
  [
    "Apakah ciri unik akar pokok bakau (Rhizophora)?",
    "Mempunyai akar jangkang untuk sokongan di kawasan berlumpur",
  ],
  ["Apakah fungsi akar pneumatofor (akar ceracak)?", "Untuk pernafasan pokok semasa air pasang"],
  [
    "Namakan spesies pokok utama di Hutan Paya Air Tawar.",
    "Pokok Ramin, Kempas, dan Meranti Bakau",
  ],
  [
    "Terangkan keadaan air di Hutan Paya Air Tawar.",
    "Kawasan yang sentiasa ditenggelami air tawar yang bertakung (asid)",
  ],
  ["Apakah jenis tanih di Hutan Paya Air Tawar?", "Tanih gambut"],
  ["Apakah tumbuhan menjalar yang biasa ditemui di Hutan Pantai?", "Tapak kuda"],
  [
    "Mengapakah pokok ru mempunyai daun yang halus seperti jarum?",
    "Untuk mengurangkan kehilangan air melalui proses transpirasi di kawasan pantai yang berangin",
  ],
  [
    "Apakah kepentingan Hutan Paya Air Masin kepada hidupan laut?",
    "Sebagai kawasan pembiakan dan perlindungan anak ikan serta ketam",
  ],
  [
    "Apakah kegunaan kayu bakau dalam industri?",
    "Digunakan untuk membuat arang dan cerucuk bangunan",
  ],
  [
    "Apakah beza antara Hutan Paya Air Masin dan Air Tawar dari segi lokasi?",
    "Air Masin di muara sungai/pinggir laut; Air Tawar di kawasan pedalaman yang bersaliran buruk",
  ],
  ["Pokok Gelam biasanya ditemui di hutan jenis apa?", "Hutan Paya Air Tawar"],
  [
    "Mengapakah Hutan Pantai penting untuk penyu?",
    "Sebagai kawasan pendaratan penyu untuk bertelur",
  ],
  [
    "Apakah kepentingan Hutan Paya Air Masin terhadap bencana alam?",
    "Bertindak sebagai benteng semula jadi untuk mengurangkan kesan tsunami dan ombak besar",
  ],
  [
    "Namakan pokok yang sering digunakan untuk kraf tangan di kawasan paya.",
    "Pokok Mengkuang dan Nipah",
  ],
  [
    "Nyatakan perubahan tumbuhan mengikut ketinggian di Hutan Gunung.",
    "Tumbuhan berubah daripada hutan dipterokarp kepada hutan oak-laurel, kemudian hutan lumut dan tumbuhan alpin",
  ],
  ["Pada ketinggian berapakah Hutan Lumut ditemui?", "Antara 2,000 hingga 2,900 meter"],
  [
    "Apakah spesies flora yang unik di Hutan Gunung?",
    "Periuk kera, orkid gunung, dan rhododendron",
  ],
  [
    "Nyatakan empat faktor fizikal yang mempengaruhi tumbuh-tumbuhan semula jadi di Malaysia.",
    "Bentuk muka bumi, Saliran, Tanih, dan Iklim",
  ],
  [
    "Bagaimanakah saliran yang baik mempengaruhi jenis hutan?",
    "Kawasan bersaliran baik membolehkan Hutan Hujan Tropika dan Hutan Pantai tumbuh",
  ],
  [
    "Apakah kesan saliran yang buruk terhadap tumbuh-tumbuhan?",
    "Mewujudkan kawasan paya yang sesuai untuk Hutan Paya Air Tawar dan Masin",
  ],
  ["Tanih jenis apakah yang sesuai untuk Hutan Hujan Tropika?", "Tanih laterit dan aluvium"],
  [
    "Apakah kaitan antara tanih berpasir dengan Hutan Pantai?",
    "Tanih berpasir yang telap air membolehkan pokok ru dan kelapa tumbuh dengan baik",
  ],
  [
    "Bagaimanakah faktor iklim mempengaruhi hutan di Malaysia?",
    "Suhu yang tinggi dan hujan lebat menggalakkan pertumbuhan hutan yang tebal dan malar hijau",
  ],
  [
    "Apakah pengaruh ketinggian terhadap saiz pokok di kawasan gunung?",
    "Semakin tinggi kawasan, saiz pokok akan semakin kecil dan renek",
  ],
  ["Tanih podzol biasanya dikaitkan dengan kawasan mana?", "Kawasan tanah tinggi atau gunung"],
  [
    "Apakah jenis tanih yang terdapat di kawasan Hutan Paya Air Tawar?",
    "Tanih gambut yang terdiri daripada reputan organik",
  ],
  [
    "Mengapakah pokok di Hutan Gunung mempunyai daun yang lebih kecil?",
    "Untuk menyesuaikan diri dengan suhu yang lebih sejuk",
  ],
  [
    "Di manakah letaknya kawasan alpin di Malaysia?",
    "Di puncak Gunung Kinabalu (melebihi 3,500 meter)",
  ],
  ["Namakan tumbuhan di zon sub-alpin.", "Rumput dan semak samun alpin"],
  [
    "Nyatakan tiga kepentingan hutan kepada alam sekitar.",
    "Kawasan tadahan hujan, keseimbangan ekosistem, dan membekalkan oksigen",
  ],
  [
    "Bagaimanakah hutan bertindak sebagai kawasan tadahan hujan?",
    "Hutan menyerap air hujan ke dalam tanah dan menyalurkannya ke sungai secara perlahan-lahan",
  ],
  [
    "Apakah itu ekosistem?",
    "Interaksi antara komponen biotik (benda hidup) dan abiotik (benda bukan hidup) dalam alam sekitar",
  ],
  [
    "Nyatakan dua kepentingan hutan dari segi ekonomi.",
    "Sumber bahan mentah (balak) dan sumber perubatan",
  ],
  [
    "Namakan pokok yang digunakan untuk membuat perubatan tradisional.",
    "Tongkat ali, kacip fatimah, dan pokok senduduk",
  ],
  [
    "Apakah kesan negatif pembalakan haram terhadap tanih?",
    "Menyebabkan hakisan tanih dan kejadian tanah runtuh",
  ],
  [
    "Apakah itu pemuliharaan hutan?",
    "Usaha membaiki dan memulihkan hutan yang telah musnah melalui penghutanan semula",
  ],
  [
    "Apakah itu pemeliharaan hutan?",
    "Usaha mengekalkan keadaan asal hutan melalui pewartaan hutan simpan dan taman negara",
  ],
  [
    "Nyatakan satu kesan positif kegiatan manusia terhadap hutan.",
    "Mewujudkan pusat penyelidikan seperti FRIM dan pusat konservasi hidupan liar",
  ],
  [
    "Apakah kesan kemusnahan hutan terhadap suhu bumi?",
    "Menyebabkan peningkatan suhu global (kesan rumah hijau) kerana kurangnya proses fotosintesis yang menyerap karbon dioksida",
  ],
] as const;

export const geographyF3C4Flashcards: Flashcard[] = flashcardContent.map(
  ([front, back], index) => ({
    id: `geo-f3-c4-f${index + 1}`,
    subjectId: "geography",
    form: "Form 3",
    chapter: "Chapter 4",
    front,
    back,
  }),
);
