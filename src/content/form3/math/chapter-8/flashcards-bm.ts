import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c8-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 8",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C8FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Lokus dan Situasi Sebenar (Cards 1-20)
  ["Apakah maksud lokus?", "Surihan/lintasan satu set titik yang memenuhi syarat tertentu"],
  ["Apakah lokus titik pada sayap kipas berputar?", "Bulatan"],
  ["Apakah lokus titik pada roket dilancarkan menegak?", "Garis lurus"],
  ["Apakah lokus titik pada bandul berayun?", "Lengkok"],
  ["Apakah lokus 3D apabila segi empat tepat diputar 360° mengeliling tiang?", "Silinder tegak"],
  ["Apakah lokus 3D apabila semi bulatan diputar 360° mengeliling tiang?", "Sfera"],
  ["Apakah lokus 3D apabila segi tiga bersudut tegak diputar 360°?", "Kon"],
  ["Siapakah ahli matematik Yunani yang mengkaji lokus?", "Apollonius dan Pappus"],
  ["Apakah bentuk lokus dua dimensi yang biasa?", "Garis lurus, lengkok, lengkung"],
  ["Apakah lokus titik pada bola digolek di satah condong?", "Garis lurus (sepanjang satah)"],
  ["Apakah lokus titik pada permainan yo-yo bergerak?", "Garis lurus menegak"],
  ["Apakah lokus titik pada kasut budak di gelongsor?", "Garis lurus condong"],
  ["Apakah aplikasi lokus dalam sukan badminton?", "Menganalisis pergerakan pukulan/laluan bola"],
  ["Apakah aplikasi lokus dalam penerbangan?", "Pergerakan satelit dan laluan pesawat"],
  ["Bagaimana kenal pasti lokus situasi sebenar?", "Perhatikan pergerakan satu titik pada objek tersebut"],
  ["Apakah kesilapan lazim mengenal pasti lokus?", "Mengelirukan lokus dengan laluan objek 3D sebenar"],
  ["Apakah lokus bagi titik pada kapal terbang mendarat?", "Lengkung menurun"],
  ["Apakah lokus bagi hujung pengelap cermin kereta?", "Lengkok"],
  ["Apakah lokus bagi buah durian yang gugur?", "Garis lurus menegak (jatuh bebas)"],
  ["Apakah maksud 'frustum' yang disebut dalam bab ini?", "Bentuk 3D terhasil daripada lokus bentuk trapezium diputar"],

  // Deck 2: Lokus Titik dan Garis (Cards 21-40)
  ["Apakah lokus titik berjarak tetap dari titik tetap?", "Bulatan berpusat titik tetap itu"],
  ["Apakah lokus titik berjarak sama dari dua titik tetap?", "Pembahagi dua sama serenjang"],
  ["Bina lokus P berjarak 3cm dari O. Bentuknya?", "Bulatan jejari 3cm berpusat O"],
  ["Bina lokus P berjarak sama dari M dan N. Bagaimana?", "Lukis pembahagi dua sama serenjang MN"],
  ["X berjarak sama dari P dan R (segi tiga PQR). Lokus X?", "Pembahagi dua sama serenjang PR"],
  ["Apakah lokus titik berjarak tetap dari satu garis lurus?", "Sepasang garis selari dengan garis itu"],
  ["Lukis lokus X bergerak 3 unit dari garis AB. Hasil?", "Sepasang garis selari AB, berjarak 3 unit"],
  ["T berjarak 1.5cm dari garis CD. Lokus T?", "Sepasang garis selari CD, jarak 1.5cm"],
  ["Berapa garis terhasil daripada lokus jarak tetap dari garis?", "Dua (sepasang)"],
  ["Apakah lokus titik berjarak sama dari dua garis selari?", "Satu garis lurus selari di tengah-tengah"],
  ["Lokus X berjarak sama dari AB dan DC. Hasil?", "Satu garis lurus selari AB&DC, di tengah"],
  ["Apakah lokus titik berjarak sama dari dua garis bersilang?", "Pembahagi dua sama sudut"],
  ["X berjarak sama dari PQ dan PN (bersilang di P). Lokus X?", "Pembahagi dua sama sudut QPN"],
  ["Y berjarak sama dari AB dan AD (segi empat sama ABCD). Lokus Y?", "Pembahagi dua sama sudut BAD"],
  ["Apakah alat membina pembahagi dua serenjang?", "Jangka lukis dan pembaris"],
  ["Apakah alat membina pembahagi dua sudut?", "Jangka lukis"],
  ["Pada koordinat (0,0),(-2,-2),(4,4) disambung. Apakah lokus ini?", "Pembahagi dua sudut paksi-x dan paksi-y (45°)"],
  ["Berapa nilai ∠a=∠b=∠c=∠d dalam lokus paksi 45°?", "45°"],
  ["Apakah kesilapan lazim pembahagi dua serenjang vs sudut?", "Mengelirukan kedua-dua jenis lokus"],
  ["Bagaimana kenal pasti jenis lokus yang sesuai?", "Baca syarat: 'jarak dari titik' atau 'jarak dari garis'"],

  // Deck 3: Lokus Gabungan dan Masalah (Cards 41-60)
  ["Bagaimana tentukan lokus dengan dua syarat?", "Lukis setiap lokus berasingan pada rajah sama"],
  ["Apakah simbol biasa untuk tanda persilangan lokus?", "⊗"],
  ["X berjarak 7 unit dari A; Y sama jarak dari AB,CD. Bagaimana cari persilangan?", "Lukis kedua lokus pada rajah sama, kenal pasti titik bertemu"],
  ["Apakah cabaran lokus dalam kawasan terhad (cth dalam segi empat sama)?", "Hanya lukis bahagian lokus dalam sempadan kawasan"],
  ["Faruk sama jarak dari paksi-x,y dan <5 unit dari O. Apakah lokusnya?", "Pembahagi dua sudut (45°) dalam julat <5 unit dari O"],
  ["Bot V bergerak 5 unit dari D; Bot W 3 unit dari BC. Bagaimana cari persilangan laluan?", "Lukis kedua lokus pada rajah sama"],
  ["P bergerak sama jarak dari A dan D (segi empat sama ABCD). Lokus P?", "Pembahagi dua sama serenjang AD"],
  ["Q bergerak sama jarak dari B dan D. Lokus Q?", "Pembahagi dua sama serenjang BD"],
  ["R bergerak 4 unit dari garis BC. Lokus R?", "Sepasang garis selari BC, jarak 4 unit"],
  ["S bergerak sama jarak dari AB dan BC. Lokus S?", "Pembahagi dua sama sudut ABC"],
  ["T bergerak 4 unit dari garis EG. Lokus T?", "Sepasang garis selari EG, jarak 4 unit"],
  ["Apakah tip semasa baca soalan lokus?", "Kenal pasti syarat dengan teliti sebelum melukis"],
  ["Mengapa ketepatan jangka lukis penting?", "Lokus mesti tepat secara geometri untuk persilangan tepat"],
  ["Apakah perlu disemak selepas lukis lokus gabungan?", "Pastikan semua syarat dipenuhi serentak pada titik persilangan"],
  ["Apakah aplikasi sebenar lokus gabungan?", "Menentukan lokasi yang memenuhi pelbagai syarat (cth kedudukan seseorang)"],
  ["Apakah perbezaan utama pembahagi dua serenjang dan sudut sebagai lokus?", "Serenjang untuk 2 titik; sudut untuk 2 garis bersilang"],
  ["Bagaimana lokus 3D berkait dengan lokus 2D?", "Lokus 3D dihasilkan dari bentuk 2D diputar 360° mengeliling paksi"],
  ["Apakah kesilapan jika anggap lokus jarak sama dari 2 garis selari ialah dua garis?", "Salah; ia hanya SATU garis di tengah-tengah"],
  ["Apakah langkah pertama menyelesaikan masalah lokus kompleks?", "Kenal pasti setiap syarat dan jenis lokus yang sepadan"],
  ["Apakah langkah akhir menyelesaikan masalah lokus gabungan?", "Tandakan semua titik persilangan yang memenuhi semua syarat"],
]);
