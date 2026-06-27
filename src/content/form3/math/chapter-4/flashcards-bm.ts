import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c4-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 4",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C4FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Maksud dan Mentafsir Skala (Cards 1-20)
  ["Apakah maksud lukisan berskala?", "Lukisan objek dengan semua ukuran berkadaran dengan ukuran objek sebenar"],
  ["Apakah yang kekal sama dalam lukisan berskala?", "Saiz sudut (bentuk)"],
  ["Apakah formula skala?", "Skala = Ukuran lukisan berskala / Ukuran objek"],
  ["Skala biasa ditulis dalam bentuk apa?", "1 : n"],
  ["Apakah maksud 1:n?", "1 unit pada lukisan mewakili n unit pada objek sebenar"],
  ["Jika n<1, bagaimana saiz lukisan berskala?", "Lebih besar daripada objek"],
  ["Jika n>1, bagaimana saiz lukisan berskala?", "Lebih kecil daripada objek"],
  ["Jika n=1, bagaimana saiz lukisan berskala?", "Sama dengan objek"],
  ["P'Q'=2, PQ=4. Skala?", "1 : 2"],
  ["K'L'=9, KL=3. Skala dalam bentuk n:1?", "3 : 1"],
  ["Grid lukisan 2cm, grid objek 1cm (unit sisi sama). Skala?", "1 : 0.5 (atau 2:1)"],
  ["Grid lukisan 0.5cm, grid objek 1cm. Skala?", "1 : 2"],
  ["Mengapa guna saiz grid bukan bilangan unit untuk skala?", "Apabila bilangan unit sisi sama tetapi saiz grid berbeza"],
  ["K'N'=2.5cm, KN=5cm. Skala?", "1 : 2"],
  ["Apakah maksud skala 1:300 000 pada peta?", "1cm pada peta = 300 000cm (3km) sebenar"],
  ["Berapa cm dalam 1 km?", "100 000 cm"],
  ["Jarak peta 3cm, skala 1:300 000. Jarak sebenar?", "9 km"],
  ["Skala 1cm:10km, jarak peta 2cm. Jarak sebenar?", "20 km"],
  ["Apakah kesilapan lazim tentang n>1?", "Menyangka lukisan lebih besar (sebenarnya lebih kecil)"],
  ["Apakah unit yang perlu ditukar semasa kira jarak peta?", "cm kepada km"],

  // Deck 2: Menentukan Ukuran dan Melukis (Cards 21-40)
  ["Khairul lukis segi empat sama skala 1:1/3, sisi sebenar 6cm. Sisi lukisan?", "18 cm"],
  ["Apakah formula luas sebenar berbanding luas lukisan?", "Luas sebenar = (nisbah panjang)² x luas lukisan"],
  ["Bilik 7cmx5cm skala 1:400. Luas sebenar?", "560 m²"],
  ["Poligon sekata sisi sebenar 10cm, skala 1:5, berapa sisi lukisan?", "2 cm"],
  ["Poster 24cmx8cm skala 1:4. Saiz lukisan berskala?", "6cm x 2cm"],
  ["Peta skala 1:400 000, sungai 2.5cm. Jarak sebenar?", "10 km"],
  ["Apakah tiga cara melukis lukisan berskala?", "Grid sama saiz skala lain, grid berlainan saiz, kertas kosong"],
  ["Apakah yang perlu tepat semasa melukis sudut dalam lukisan berskala?", "Sudut mesti dibina tepat sama seperti objek"],
  ["Bunga pada grid 1cmx1cm, lukis pada grid 1.5cmx1.5cm. Objek lebih besar atau kecil?", "Lebih besar"],
  ["Bunga pada grid 1cmx1cm, lukis pada grid 0.5cmx0.5cm. Objek lebih besar atau kecil?", "Lebih kecil"],
  ["Lukisan berskala P'Q'R'S'T' skala 1:2, bagaimana lukis objek sebenar?", "Gandakan (x2) setiap sisi lukisan"],
  ["Apakah maksud skala 1:1/2 untuk lukisan?", "Lukisan dua kali lebih besar daripada objek"],
  ["Bagi grid berlainan saiz, apakah yang dikekalkan sama?", "Bilangan unit sisi"],
  ["Apakah langkah pertama menentukan skala daripada dua sisi sepadan?", "Bahagi panjang lukisan dengan panjang objek sepadan"],
  ["Bilik 3.5mx5.2m, skala 1:50. Perimeter lukisan?", "34.8 cm"],
  ["Padang 3cmx6cm pada lukisan skala 1:2000. Luas sebenar?", "7 200 m²"],
  ["Rumput dipotong 400m² dalam 8 minit. Masa untuk padang 7200m²?", "144 minit"],
  ["Apakah kesilapan lazim mengira luas sebenar?", "Lupa kuasa duakan nisbah panjang"],
  ["Apakah kesilapan lazim mengira isi padu sebenar?", "Lupa kuasakan tiga nisbah panjang"],
  ["Bilik stor 2cmx3cm skala 1:400. Luas sebenar?", "96 m²"],

  // Deck 3: Menyelesaikan Masalah (Cards 41-60)
  ["Bintulu-Miri 4cm pada peta skala 1cm:50km. Jarak sebenar?", "200 km"],
  ["Daripada soalan di atas, jika dipandu 80km/j, masa perjalanan?", "2.5 jam (2 jam 30 minit)"],
  ["Peta dilukis semula skala 1:2 000 000 daripada 200km sebenar. Jarak baru pada peta?", "10 cm"],
  ["Apakah formula masa daripada jarak dan laju?", "Masa = Jarak / Laju"],
  ["Kuching-KK 5.4cm pada peta skala 1cm:150km, masa terbang 90 minit. Laju purata?", "540 km/j"],
  ["Jubin 30cmx30cm RM2.80 vs 50cmx50cm RM6, mana lebih jimat per m²?", "Jubin 50cmx50cm"],
  ["Bagaimana bandingkan kos jubin dengan adil?", "Bandingkan kos seunit luas (RM per m²), bukan harga seunit jubin"],
  ["Segi tiga P (luas 112.5cm²) skala daripada Q (luas 4.5cm²). Nisbah luas?", "25 : 1"],
  ["Daripada nisbah luas 25:1, apakah nisbah panjang (n)?", "5 : 1"],
  ["Bulatan diameter lukisan 6cm, skala 1:3. Diameter sebenar?", "18 cm"],
  ["Padang bola 7cmx12cm skala 1:1000. Luas sebenar?", "8 400 m²"],
  ["Bagaimana tentukan skala maksimum untuk lukisan dimuatkan pada A4?", "Pilih skala besar (nisbah n kecil) supaya lukisan kecil cukup untuk muat A4"],
  ["Khemah 5mx4m didirikan di padang. Bagaimana kira bilangan maksimum?", "Bahagi luas kawasan tersedia dengan luas tapak satu khemah"],
  ["Sewa khemah RM100/hari, diskaun 25% untuk 5 hari+. Sewa 7 hari?", "RM525 (100x7x0.75)"],
  ["Apakah nisbah luas S:IV jika nisbah panjang 1:2?", "1 : 4"],
  ["Apakah nisbah isi padu jika nisbah panjang 1:2?", "1 : 8"],
  ["Apakah kesimpulan nisbah luas berbanding nisbah panjang?", "Nisbah luas = (nisbah panjang)²"],
  ["Apakah kesimpulan nisbah isi padu berbanding nisbah panjang?", "Nisbah isi padu = (nisbah panjang)³"],
  ["Rumah kedai ketinggian sebenar 3.75m, tapak 8mx12m. Isi padu?", "360 m³"],
  ["Apakah aplikasi sebenar lukisan berskala dalam hartanah?", "Pelan rumah dan model taman perumahan"],
]);
