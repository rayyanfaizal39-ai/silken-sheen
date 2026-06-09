import type { StructuredNotes } from "./types";

export const mathF1C11NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 11 memperkenalkan konsep set dalam matematik. Murid akan mempelajari cara menerangkan, menyenaraikan dan mewakilkan set, memahami keahlian set, set kosong, kesamaan set, gambar rajah Venn, set semesta, pelengkap set, dan subset. Bab ini membina asas pemikiran logik dan matematik yang diperlukan untuk topik lanjutan.",
  quickRevision: [
    "Set ialah koleksi objek yang mempunyai ciri-ciri yang sama.",
    "Unsur ialah setiap ahli di dalam sesebuah set.",
    "Tiga kaedah: perihalan, penyenaraian { }, tatatanda pembina set {x : syarat}.",
    "Set kosong: ∅ atau {}. Tiada unsur.",
    "∈ bermaksud 'adalah unsur'. ∉ bermaksud 'bukan unsur'.",
    "n(A) ialah bilangan unsur dalam set A.",
    "Set sama: mengandungi unsur yang sama persis. Susunan tidak penting.",
    "Gambar rajah Venn: segi empat = set semesta (ξ), bulatan = set.",
    "Pelengkap A' ialah unsur dalam ξ yang BUKAN dalam A.",
    "B ⊂ A bermaksud B adalah subset A — semua unsur B ada dalam A.",
    "Bilangan subset = 2ⁿ, di mana n ialah bilangan unsur.",
    "Set kosong (∅) dan set itu sendiri adalah subset untuk setiap set.",
  ],
  keyExamFacts: [
    "Unsur yang berulang hanya dikira SEKALI dalam set.",
    "Set kosong ∅ BERBEZA dengan {0} atau {∅} — {0} mengandungi satu unsur.",
    "Set kosong adalah subset SETIAP set.",
    "Setiap set adalah subset dirinya sendiri.",
    "n(A) = 0 bermaksud A adalah set kosong.",
    "Set A = Set B hanya jika setiap unsur A ada dalam B DAN setiap unsur B ada dalam A.",
    "Bilangan subset set dengan n unsur = 2ⁿ (termasuk set kosong dan set itu sendiri).",
    "Dalam gambar rajah Venn, A' ialah kawasan dalam segi empat tepat (ξ) yang berada DI LUAR bulatan A.",
  ],
  keyTerms: [
    "Set",
    "Unsur",
    "Ahli",
    "Keahlian",
    "Set kosong",
    "Set semesta",
    "Pelengkap",
    "Subset",
    "Gambar rajah Venn",
    "Tatatanda pembina set",
  ],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Menerangkan konsep set dan unsur set.",
            "Mewakili set menggunakan kaedah perihalan, penyenaraian dan tatatanda pembina set.",
            "Mengenal pasti set kosong dan mewakilinya dengan simbol ∅ atau {}.",
            "Menggunakan simbol ∈ dan ∉ untuk keahlian set.",
            "Mencari bilangan unsur, n(A), dalam sesebuah set.",
            "Menentukan sama ada dua set adalah sama.",
            "Melukis dan mentafsir gambar rajah Venn.",
            "Mengenal pasti set semesta (ξ) dan pelengkap set (A').",
            "Menentukan subset dan bilangan subset bagi sesebuah set.",
            "Menerangkan hubungan antara set menggunakan gambar rajah Venn.",
          ],
        },
      ],
    },
    {
      title: "1. Pengenalan Set",
      subsections: [
        {
          title: "Definisi Set",
          content:
            "Set ialah koleksi objek yang mempunyai ciri-ciri yang sama dan boleh ditakrifkan dengan jelas. Objek-objek di dalam set dipanggil unsur atau ahli set. Set biasanya dilabelkan dengan huruf besar seperti A, B, C.",
        },
        {
          title: "Ciri-ciri Penting Set",
          content:
            "Setiap unsur dalam set MESTI boleh dikenal pasti dengan jelas. Tiada unsur yang berulang (unsur yang sama hanya dikira sekali). Set boleh mengandungi nombor, huruf, perkataan, atau objek lain.",
          bulletPoints: [
            "Unsur berulang hanya dikira sekali.",
            "Susunan unsur tidak penting — {1, 2, 3} sama dengan {3, 1, 2}.",
            "Set dilambangkan dengan huruf besar: A, B, C, ...",
          ],
        },
        {
          title: "Contoh Set dalam Kehidupan Seharian",
          content:
            "Set huruf vokal bahasa Inggeris = {a, e, i, o, u}. Set warna lampu isyarat = {merah, kuning, hijau}. Set nombor genap antara 1 dan 10 = {2, 4, 6, 8, 10}.",
        },
        {
          title: "Bukan Set",
          content:
            "Tidak semua koleksi merupakan set. Koleksi seperti 'kumpulan murid yang cantik' atau 'nombor yang besar' BUKAN set matematik kerana tidak ada kriteria yang jelas dan tepat untuk menentukannya.",
        },
      ],
    },
    {
      title: "2. Unsur dan Ahli Set",
      subsections: [
        {
          title: "Definisi Unsur",
          content:
            "Unsur (atau ahli) ialah setiap objek yang berada di dalam sesebuah set. Unsur ditulis dalam kurungan kurawal { } dan dipisahkan dengan koma.",
        },
        {
          title: "Contoh: Mengenal pasti Unsur",
          content:
            "Set A = {1, 3, 5, 7, 9}. Unsur-unsur A ialah: 1, 3, 5, 7 dan 9. Set B = {a, b, c}. Unsur-unsur B ialah: a, b dan c.",
        },
        {
          title: "Penting: Unsur yang Berulang",
          content:
            "Jika unsur yang sama muncul lebih daripada sekali dalam penyenaraian, ia hanya dikira SEKALI. Contoh: Huruf dalam perkataan 'LULUS' → {L, U, S}. (L muncul dua kali tetapi hanya dikira sekali.)",
        },
        {
          title: "Contoh: Set Huruf dalam Perkataan",
          content:
            "Perkataan 'MALAYSIA' → Senaraikan huruf: M, A, L, A, Y, S, I, A. Setelah buang ulangan: {M, A, L, Y, S, I}. n = 6 unsur.",
        },
      ],
    },
    {
      title: "3. Kaedah Perihalan",
      subsections: [
        {
          title: "Definisi Kaedah Perihalan",
          content:
            "Kaedah perihalan menerangkan set dengan menggunakan ayat atau kenyataan yang menjelaskan ciri-ciri ahli set tersebut. Kaedah ini paling mudah difahami tetapi kurang tepat berbanding kaedah lain.",
        },
        {
          title: "Format Kaedah Perihalan",
          content:
            "Format: '[Huruf set] ialah set [penerangan ciri-ciri]'.",
          bulletPoints: [
            "A ialah set huruf vokal dalam perkataan MALAYSIA.",
            "B ialah set nombor perdana antara 1 dan 20.",
            "C ialah set warna bendera Malaysia.",
            "D ialah set bulan dalam setahun yang bermula dengan huruf J.",
          ],
        },
        {
          title: "Kelebihan dan Kekurangan",
          content:
            "KELEBIHAN: Mudah ditulis dan difahami. KEKURANGAN: Mungkin samar-samar atau tidak tepat. Contoh: 'Set nombor kecil' tidak jelas kerana 'kecil' adalah subjektif.",
        },
      ],
    },
    {
      title: "4. Kaedah Penyenaraian",
      subsections: [
        {
          title: "Definisi Kaedah Penyenaraian",
          content:
            "Kaedah penyenaraian menyenaraikan semua unsur set di dalam kurungan kurawal { }, dipisahkan dengan koma. Ini adalah cara yang paling jelas dan tidak boleh disalah tafsir.",
        },
        {
          title: "Format Kaedah Penyenaraian",
          formula: "A = {unsur 1, unsur 2, unsur 3, ...}",
        },
        {
          title: "Contoh-contoh",
          content:
            "A ialah set huruf vokal dalam MALAYSIA → A = {a, i}. (Vokal dalam MALAYSIA: a, a, y, s, i, a → vokal ialah a dan i). B ialah set nombor perdana kurang daripada 10 → B = {2, 3, 5, 7}.",
        },
        {
          title: "Tiga Peraturan Penting",
          bulletPoints: [
            "Unsur dipisahkan dengan koma.",
            "Susunan tidak penting: {1, 2, 3} = {3, 2, 1}.",
            "Unsur yang berulang hanya disenaraikan SEKALI.",
          ],
        },
        {
          title: "Titik-titik (...) dalam Set Tak Terhingga",
          content:
            "Untuk set yang besar atau tak terhingga, gunakan titik-titik (...). Contoh: Set nombor asli = {1, 2, 3, 4, ...}. Set nombor genap = {2, 4, 6, 8, ...}.",
        },
      ],
    },
    {
      title: "5. Tatatanda Pembina Set",
      subsections: [
        {
          title: "Definisi Tatatanda Pembina Set",
          content:
            "Tatatanda pembina set menggunakan syarat matematik untuk menentukan unsur set. Kaedah ini sesuai untuk set matematik yang besar dan tepat.",
        },
        {
          title: "Format",
          formula: "A = {x : x memenuhi syarat tertentu}",
        },
        {
          title: "Cara Membaca",
          content:
            "'{x : syarat}' dibaca sebagai 'set semua x DI MANA x memenuhi syarat'. Tanda ':' (titik bertindih) bermaksud 'di mana' atau 'dengan syarat bahawa'.",
        },
        {
          title: "Contoh 1: Vokal",
          content:
            "A = {x : x ialah huruf vokal dalam perkataan MALAYSIA}. Dibaca: 'A ialah set semua x di mana x ialah huruf vokal dalam perkataan MALAYSIA'. Hasilnya: A = {a, i}.",
        },
        {
          title: "Contoh 2: Nombor",
          content:
            "B = {x : x ialah nombor bulat, 2 ≤ x ≤ 8}. Dibaca: 'B ialah set semua x di mana x ialah nombor bulat dan nilainya antara 2 dan 8 (termasuk 2 dan 8)'. Hasilnya: B = {2, 3, 4, 5, 6, 7, 8}.",
        },
        {
          title: "Contoh 3: Nombor Perdana",
          content:
            "C = {x : x ialah nombor perdana, x < 15}. Hasilnya: C = {2, 3, 5, 7, 11, 13}.",
        },
        {
          title: "Perbandingan Tiga Kaedah",
          table: {
            headers: ["Kaedah", "Contoh", "Kelebihan"],
            rows: [
              ["Perihalan", "A ialah set huruf vokal dalam MALAYSIA", "Mudah ditulis"],
              ["Penyenaraian", "A = {a, i}", "Jelas, tidak samar"],
              ["Pembina Set", "A = {x : x huruf vokal dalam MALAYSIA}", "Tepat dan matematik"],
            ],
          },
        },
      ],
    },
    {
      title: "6. Set Kosong",
      subsections: [
        {
          title: "Definisi Set Kosong",
          content:
            "Set kosong ialah set yang tidak mengandungi sebarang unsur. Set kosong dilambangkan dengan simbol ∅ atau {}.",
          formula: "Set kosong = ∅ atau {}",
        },
        {
          title: "Contoh Set Kosong",
          bulletPoints: [
            "Set nombor genap yang juga nombor ganjil → tidak wujud → ∅",
            "Set bulan yang mempunyai 32 hari → tidak wujud → ∅",
            "Set nombor bulat antara 3 dan 4 (tidak termasuk) → tiada → ∅",
          ],
        },
        {
          title: "AWAS: Kesilapan Lazim",
          content:
            "∅ TIDAK SAMA dengan {∅} atau {0}. Set kosong (∅) mempunyai TIADA unsur. {0} ialah set yang mengandungi SATU unsur iaitu nombor 0. {∅} ialah set yang mengandungi SATU unsur iaitu simbol ∅.",
        },
        {
          title: "Set Kosong vs Set Yang Hampir Kosong",
          table: {
            headers: ["Set", "Bilangan Unsur", "Adakah Set Kosong?"],
            rows: [
              ["∅", "0", "Ya"],
              ["{}", "0", "Ya"],
              ["{0}", "1", "Tidak"],
              ["{∅}", "1", "Tidak"],
            ],
          },
        },
        {
          title: "Sifat Penting Set Kosong",
          content:
            "Set kosong adalah SUBSET bagi SETIAP set. Ini adalah peraturan penting yang akan digunakan dalam topik subset. n(∅) = 0.",
        },
      ],
    },
    {
      title: "7. Keahlian Set",
      subsections: [
        {
          title: "Simbol Keahlian",
          content:
            "Simbol ∈ bermaksud 'adalah unsur bagi' atau 'adalah ahli bagi'. Simbol ∉ bermaksud 'bukan unsur bagi' atau 'bukan ahli bagi'.",
          table: {
            headers: ["Simbol", "Makna", "Dibaca"],
            rows: [
              ["∈", "adalah unsur bagi", "'a ∈ A' dibaca 'a adalah unsur A'"],
              ["∉", "bukan unsur bagi", "'b ∉ A' dibaca 'b bukan unsur A'"],
            ],
          },
        },
        {
          title: "Contoh Penggunaan ∈ dan ∉",
          content:
            "Diberi A = {2, 4, 6, 8, 10}. Semak setiap pernyataan:",
          bulletPoints: [
            "2 ∈ A → BENAR (2 ada dalam A)",
            "5 ∉ A → BENAR (5 tidak ada dalam A)",
            "8 ∈ A → BENAR (8 ada dalam A)",
            "3 ∈ A → SALAH (3 tidak ada dalam A, guna 3 ∉ A)",
          ],
        },
        {
          title: "Contoh: Huruf Vokal",
          content:
            "Diberi V = {a, e, i, o, u}. Maka: a ∈ V, b ∉ V, i ∈ V, z ∉ V, u ∈ V.",
        },
        {
          title: "Kesilapan Lazim",
          content:
            "Jangan gunakan = untuk keahlian. SALAH: 3 = A. BETUL: 3 ∈ A. Simbol = digunakan antara set, bukan antara unsur dan set.",
        },
      ],
    },
    {
      title: "8. Bilangan Unsur Set",
      subsections: [
        {
          title: "Tatatanda n(A)",
          content:
            "n(A) mewakili bilangan unsur dalam set A. Ia dibaca sebagai 'n daripada A' atau 'bilangan unsur dalam A'.",
          formula: "n(A) = bilangan unsur dalam set A",
        },
        {
          title: "Contoh-contoh n(A)",
          content:
            "A = {a, e, i, o, u} → n(A) = 5. B = {2, 4, 6} → n(B) = 3. C = {1} → n(C) = 1. D = ∅ → n(D) = 0. E = {Malaysia, Indonesia, Singapura} → n(E) = 3.",
        },
        {
          title: "Penting: Hitung Unsur Unik",
          content:
            "Apabila mengira n(A), pastikan anda menghapuskan unsur yang berulang terlebih dahulu. Contoh: Huruf dalam perkataan 'BUKU' = B, U, K, U. Set unik = {B, U, K}. n = 3.",
        },
        {
          title: "Jadual Contoh n(A)",
          table: {
            headers: ["Set", "Penyenaraian", "n(A)"],
            rows: [
              ["Set vokal Inggeris", "{a, e, i, o, u}", "5"],
              ["Set nombor perdana < 10", "{2, 3, 5, 7}", "4"],
              ["Set warna pelangi", "{merah, jingga, kuning, hijau, biru, nila, ungu}", "7"],
              ["Set kosong", "∅ atau {}", "0"],
            ],
          },
        },
      ],
    },
    {
      title: "9. Kesamaan Set",
      subsections: [
        {
          title: "Definisi Set Sama",
          content:
            "Dua set adalah sama jika dan hanya jika kedua-duanya mengandungi UNSUR YANG SAMA PERSIS. Susunan unsur tidak penting. Jika A = B, maka setiap unsur A ada dalam B, dan setiap unsur B ada dalam A.",
        },
        {
          title: "Contoh Set Sama",
          content:
            "A = {h, a, r, u, m} dan B = {m, u, r, a, h}. Bandingkan: A dan B mengandungi unsur yang sama (h, a, r, u, m) walaupun susunannya berbeza. Maka A = B.",
        },
        {
          title: "Contoh Set Tidak Sama",
          content:
            "C = {1, 2, 3} dan D = {1, 2, 4}. Unsur 3 ada dalam C tetapi tidak dalam D. Unsur 4 ada dalam D tetapi tidak dalam C. Maka C ≠ D.",
        },
        {
          title: "Cara Memeriksa Kesamaan Set",
          bulletPoints: [
            "Senaraikan semua unsur kedua-dua set.",
            "Hapuskan unsur berulang.",
            "Bandingkan: adakah setiap unsur set pertama ada dalam set kedua?",
            "Bandingkan: adakah setiap unsur set kedua ada dalam set pertama?",
            "Jika kedua-dua syarat dipenuhi, set adalah sama.",
          ],
        },
        {
          title: "Set Sama ≠ Set Setara",
          content:
            "SET SAMA (A = B): mengandungi unsur yang sama persis. SET SETARA: mengandungi bilangan unsur yang sama, tetapi unsurnya mungkin berbeza. Contoh: {1, 2, 3} dan {a, b, c} adalah set setara (n = 3) tetapi bukan set sama.",
        },
      ],
    },
    {
      title: "10. Gambar Rajah Venn",
      subsections: [
        {
          title: "Definisi Gambar Rajah Venn",
          content:
            "Gambar rajah Venn ialah gambar rajah yang menggunakan bulatan (atau bentuk-bentuk lain) untuk mewakili hubungan antara set secara visual. Gambar rajah ini dinamakan sempena ahli matematik John Venn.",
        },
        {
          title: "Komponen Gambar Rajah Venn",
          bulletPoints: [
            "Segi empat tepat: mewakili set semesta (ξ) — mengandungi semua unsur yang sedang dipertimbangkan.",
            "Bulatan: mewakili sesebuah set di dalam set semesta.",
            "Titik atau label: mewakili unsur-unsur di dalam set.",
            "Kawasan di luar bulatan tetapi dalam segi empat tepat: unsur dalam ξ tetapi bukan dalam set tersebut.",
          ],
        },
        {
          title: "Contoh Asas Gambar Rajah Venn",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8} dan A = {2, 4, 6, 8}. Dalam gambar rajah Venn: Segi empat tepat mengandungi semua nombor 1–8. Bulatan A mengandungi 2, 4, 6, 8. Di luar bulatan A tetapi dalam segi empat tepat: 1, 3, 5, 7.",
        },
        {
          title: "Kegunaan Gambar Rajah Venn",
          content:
            "Gambar rajah Venn membantu kita: memvisualisasikan set dan hubungannya, mengenal pasti pelengkap, menentukan subset, dan melihat unsur yang dikongsi atau diasingkan antara set.",
        },
      ],
    },
    {
      title: "11. Set Semesta",
      subsections: [
        {
          title: "Definisi Set Semesta",
          content:
            "Set semesta (ξ) ialah set yang mengandungi semua unsur yang sedang dipertimbangkan dalam sesuatu situasi atau perbincangan. Set semesta menjadi 'alam semesta' bagi semua set lain dalam perbincangan tersebut.",
          formula: "Simbol: ξ (huruf Greek xi)",
        },
        {
          title: "Contoh Set Semesta",
          content:
            "Jika kita membincangkan nombor-nombor antara 1 dan 10, maka ξ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}. Jika kita membincangkan bulan dalam setahun, ξ = {Jan, Feb, Mac, Apr, Mei, Jun, Jul, Ogs, Sep, Okt, Nov, Dis}.",
        },
        {
          title: "Ciri-ciri Set Semesta",
          bulletPoints: [
            "Set semesta adalah kontekstual — ia bergantung pada situasi perbincangan.",
            "Semua set lain dalam perbincangan adalah subset set semesta.",
            "Set semesta diwakili oleh segi empat tepat dalam gambar rajah Venn.",
            "Simbol ξ diletakkan di sudut kiri atas segi empat tepat.",
          ],
        },
        {
          title: "Gambar Rajah Venn: Set Semesta",
          content:
            "Dalam gambar rajah Venn: [Segi empat tepat berlabel ξ] mengandungi semua unsur. Set A (bulatan) berada di dalam segi empat tepat. Unsur yang tidak dalam A berada di dalam segi empat tepat tetapi di luar bulatan A — ini adalah kawasan A' (pelengkap A).",
        },
      ],
    },
    {
      title: "12. Pelengkap Set",
      subsections: [
        {
          title: "Definisi Pelengkap Set",
          content:
            "Pelengkap set A, ditulis sebagai A', ialah set yang mengandungi semua unsur dalam set semesta (ξ) yang TIDAK berada dalam set A.",
          formula: "A' = {x : x ∈ ξ dan x ∉ A}",
        },
        {
          title: "Cara Mengira Pelengkap",
          content:
            "Langkah 1: Kenal pasti ξ (set semesta). Langkah 2: Kenal pasti set A. Langkah 3: A' = semua unsur dalam ξ yang bukan dalam A.",
        },
        {
          title: "Contoh 1",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} dan A = {2, 4, 6, 8, 10}. A' = unsur dalam ξ yang bukan dalam A = {1, 3, 5, 7, 9}.",
        },
        {
          title: "Contoh 2: Huruf",
          content:
            "ξ = {a, b, c, d, e, f, g} dan B = {a, e}. B' = {b, c, d, f, g}.",
        },
        {
          title: "Sifat Pelengkap",
          bulletPoints: [
            "A ∪ A' = ξ (A dan A' bersama membentuk set semesta).",
            "A ∩ A' = ∅ (A dan A' tidak berkongsi sebarang unsur).",
            "(A')' = A (pelengkap kepada pelengkap A ialah A sendiri).",
            "ξ' = ∅ (pelengkap set semesta adalah set kosong).",
            "∅' = ξ (pelengkap set kosong adalah set semesta).",
          ],
        },
        {
          title: "Gambar Rajah Venn: Pelengkap",
          content:
            "Dalam gambar rajah Venn, kawasan yang berlorek untuk A' ialah KAWASAN DI LUAR bulatan A tetapi DALAM segi empat tepat ξ. Kawasan bulatan A sendiri tidak dilorekkan.",
        },
      ],
    },
    {
      title: "13. Subset",
      subsections: [
        {
          title: "Definisi Subset",
          content:
            "Set B adalah subset set A jika SETIAP unsur dalam B juga adalah unsur dalam A. Ini ditulis sebagai B ⊂ A.",
          formula: "B ⊂ A bermaksud: setiap unsur B ∈ A",
        },
        {
          title: "Simbol Subset",
          table: {
            headers: ["Simbol", "Makna", "Dibaca"],
            rows: [
              ["⊂", "adalah subset bagi", "'B ⊂ A' dibaca 'B adalah subset A'"],
              ["⊄", "bukan subset bagi", "'C ⊄ A' dibaca 'C bukan subset A'"],
              ["⊆", "adalah subset atau sama dengan", "'B ⊆ A' — subset atau sama"],
            ],
          },
        },
        {
          title: "Contoh Subset",
          content:
            "A = {1, 2, 3, 4, 5}. B = {2, 4}. Semua unsur B (iaitu 2 dan 4) ada dalam A. Jadi B ⊂ A (B adalah subset A).",
        },
        {
          title: "Contoh Bukan Subset",
          content:
            "A = {1, 2, 3, 4, 5} dan C = {2, 6}. Unsur 6 ada dalam C tetapi TIDAK ada dalam A. Jadi C ⊄ A (C bukan subset A).",
        },
        {
          title: "Dua Peraturan Penting Subset",
          bulletPoints: [
            "PERATURAN 1: Set kosong (∅) adalah subset SETIAP set. ∅ ⊂ A untuk setiap set A.",
            "PERATURAN 2: Setiap set adalah subset dirinya sendiri. A ⊂ A untuk setiap set A.",
          ],
        },
        {
          title: "Mengapa ∅ ⊂ A untuk setiap A?",
          content:
            "Kerana kita tidak dapat menemui sebarang unsur dalam ∅ yang tidak ada dalam A (∅ tiada unsur langsung). Oleh itu, tidak ada unsur yang 'menggagalkan' syarat subset, maka ∅ adalah subset setiap set.",
        },
      ],
    },
    {
      title: "14. Bilangan Subset",
      subsections: [
        {
          title: "Formula Bilangan Subset",
          content:
            "Jika set A mempunyai n unsur, maka bilangan subset A ialah 2ⁿ. Ini termasuk subset set kosong (∅) dan set A itu sendiri.",
          formula: "Bilangan subset = 2ⁿ\n(di mana n = bilangan unsur)",
        },
        {
          title: "Contoh: n = 1",
          content:
            "A = {x}. Subset A: ∅ dan {x}. Bilangan subset = 2¹ = 2.",
        },
        {
          title: "Contoh: n = 2",
          content:
            "A = {a, b}. Senaraikan semua subset: ∅, {a}, {b}, {a, b}. Bilangan subset = 2² = 4.",
        },
        {
          title: "Contoh: n = 3",
          content:
            "A = {1, 2, 3}. Subset: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}. Bilangan subset = 2³ = 8.",
        },
        {
          title: "Contoh: n = 4",
          content:
            "A = {a, b, c, d}. Bilangan subset = 2⁴ = 16. (Terlalu banyak untuk disenaraikan kesemuanya!)",
        },
        {
          title: "Jadual Ringkasan Bilangan Subset",
          table: {
            headers: ["Bilangan Unsur (n)", "Bilangan Subset (2ⁿ)", "Contoh"],
            rows: [
              ["0", "2⁰ = 1", "∅ hanya mempunyai ∅ sebagai subset"],
              ["1", "2¹ = 2", "{a} → ∅, {a}"],
              ["2", "2² = 4", "{a,b} → ∅, {a}, {b}, {a,b}"],
              ["3", "2³ = 8", "{a,b,c} → 8 subset"],
              ["4", "2⁴ = 16", "{a,b,c,d} → 16 subset"],
              ["5", "2⁵ = 32", "{a,b,c,d,e} → 32 subset"],
            ],
          },
        },
        {
          title: "Subset Wajar (Proper Subset)",
          content:
            "Subset wajar ialah semua subset KECUALI set itu sendiri. Bilangan subset wajar = 2ⁿ − 1. Contoh: A = {1, 2, 3} mempunyai 8 subset tetapi hanya 7 subset wajar (tidak termasuk {1,2,3}).",
        },
      ],
    },
    {
      title: "15. Hubungan Antara Set",
      subsections: [
        {
          title: "Tiga Jenis Hubungan Antara Set",
          content:
            "Dalam gambar rajah Venn, dua set boleh mempunyai tiga jenis hubungan utama:",
          bulletPoints: [
            "Set B adalah subset A (B ⊂ A): bulatan B berada sepenuhnya di dalam bulatan A.",
            "Set A dan B bertindih (ada unsur sepunya): kedua-dua bulatan bersilang.",
            "Set A dan B berasingan (disjoint): tiada unsur sepunya, bulatan tidak bersentuhan.",
          ],
        },
        {
          title: "Hubungan 1: Subset (B ⊂ A)",
          content:
            "Jika setiap unsur B juga ada dalam A, maka bulatan B berada sepenuhnya di dalam bulatan A dalam gambar rajah Venn. Contoh: A = {1, 2, 3, 4, 5}, B = {2, 4} → B ⊂ A.",
        },
        {
          title: "Hubungan 2: Set Bertindih",
          content:
            "Jika A dan B berkongsi beberapa unsur tetapi ada unsur yang tidak dikongsi, maka bulatan A dan B bersilang sebahagian. Kawasan pertindihan mengandungi unsur sepunya. Contoh: A = {1, 2, 3, 4}, B = {3, 4, 5, 6} → Unsur sepunya: {3, 4}.",
        },
        {
          title: "Hubungan 3: Set Berasingan",
          content:
            "Jika A dan B tidak berkongsi sebarang unsur, maka bulatan A dan B tidak bersentuhan (berasingan). Contoh: A = {1, 3, 5}, B = {2, 4, 6}. Tiada unsur yang sama.",
        },
      ],
    },
    {
      title: "16. Gambar Rajah Venn Bagi Subset",
      subsections: [
        {
          title: "Visual: Subset B ⊂ A",
          content:
            "Apabila B ⊂ A, dalam gambar rajah Venn: bulatan B dilukiskan SEPENUHNYA DI DALAM bulatan A. Segi empat tepat (ξ) mengandungi kedua-dua A dan B. Unsur dalam B juga ada dalam A. Unsur dalam A tetapi tidak dalam B berada di kawasan A tetapi di luar B.",
        },
        {
          title: "Contoh dengan Nombor",
          content:
            "ξ = {1, 2, 3, 4, 5, 6}, A = {1, 2, 3, 4, 5}, B = {2, 4}. Dalam gambar rajah Venn: Segi empat tepat: 1, 2, 3, 4, 5, 6. Dalam A sahaja (bukan B): 1, 3, 5. Dalam B (dan juga dalam A kerana B ⊂ A): 2, 4. Dalam ξ tetapi bukan dalam A: 6.",
        },
        {
          title: "Pelengkap dalam Konteks Subset",
          content:
            "Apabila B ⊂ A: B' mengandungi semua unsur dalam ξ yang tidak dalam B (termasuk kawasan A di luar B, dan kawasan di luar A sepenuhnya). A' mengandungi semua unsur dalam ξ yang tidak dalam A.",
        },
      ],
    },
    {
      title: "17. Gambar Rajah Venn Bagi Set Berasingan",
      subsections: [
        {
          title: "Visual: Set Berasingan (Disjoint)",
          content:
            "Apabila set A dan B tidak berkongsi sebarang unsur (set berasingan), dalam gambar rajah Venn: bulatan A dan bulatan B TIDAK BERSENTUHAN DAN TIDAK BERTINDIH. Kedua-dua bulatan terpisah sepenuhnya di dalam segi empat tepat ξ.",
        },
        {
          title: "Contoh dengan Nombor",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8}, A = {1, 3, 5, 7}, B = {2, 4, 6}. Tiada unsur yang sama antara A dan B. Dalam gambar rajah Venn: Bulatan A: 1, 3, 5, 7. Bulatan B: 2, 4, 6. Dalam ξ tetapi bukan dalam A atau B: 8.",
        },
        {
          title: "Contoh: Huruf",
          content:
            "ξ = {a, b, c, d, e, f, g, h}. A = {a, e, i} (vokal). B = {b, c, d, f, g, h} (konsonan). Perhatikan: vokal dan konsonan tidak bertindih → set berasingan.",
        },
        {
          title: "Perbezaan: Subset vs Berasingan vs Bertindih",
          table: {
            headers: ["Hubungan", "Ciri", "Gambar Rajah Venn"],
            rows: [
              ["Subset (B ⊂ A)", "Semua unsur B ada dalam A", "Bulatan B dalam bulatan A"],
              ["Bertindih", "Ada unsur sepunya", "Bulatan bersilang sebahagian"],
              ["Berasingan", "Tiada unsur sepunya", "Bulatan terpisah, tidak bersentuhan"],
            ],
          },
        },
      ],
    },
    {
      title: "18. Penyelesaian Masalah",
      subsections: [
        {
          title: "Langkah-Langkah Penyelesaian Masalah Set",
          bulletPoints: [
            "Langkah 1: Baca soalan dengan teliti. Kenal pasti ξ (set semesta), dan semua set yang terlibat.",
            "Langkah 2: Senaraikan unsur setiap set dengan jelas.",
            "Langkah 3: Kenal pasti hubungan antara set (subset, bertindih, berasingan).",
            "Langkah 4: Lukis gambar rajah Venn jika perlu.",
            "Langkah 5: Jawab soalan berdasarkan gambar rajah atau senarai unsur.",
          ],
        },
        {
          title: "Contoh 1: Mencari Unsur dan Pelengkap",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}. A = {x : x ialah nombor perdana, x ≤ 10}. Cari A dan A'.",
          formula:
            "A = {2, 3, 5, 7} (nombor perdana ≤ 10)\nA' = {1, 4, 6, 8, 9, 10} (dalam ξ tetapi bukan dalam A)\nn(A) = 4, n(A') = 6",
        },
        {
          title: "Contoh 2: Menentukan Subset",
          content:
            "A = {a, b, c, d}. B = {a, c}. C = {a, b, c, d, e}. Tentukan sama ada B ⊂ A dan A ⊂ C.",
          formula:
            "B ⊂ A: Semua unsur B (a, c) ada dalam A → YA, B ⊂ A.\nA ⊂ C: Semua unsur A (a,b,c,d) ada dalam C → YA, A ⊂ C.",
        },
        {
          title: "Contoh 3: Bilangan Subset",
          content:
            "Set M = {p, q, r, s}. Cari bilangan subset M.",
          formula:
            "n(M) = 4\nBilangan subset = 2⁴ = 16",
        },
        {
          title: "Contoh 4: Membaca Gambar Rajah Venn",
          content:
            "Dari gambar rajah Venn: ξ = {1,2,3,4,5,6,7,8,9,10}. Dalam A: {2,4,6,8,10}. Dalam B: {1,2,3,4,5}. Cari: (a) n(A), (b) unsur dalam A tetapi bukan B.",
          formula:
            "n(A) = 5\nUnsur dalam A tetapi bukan B = {6, 8, 10}",
        },
        {
          title: "Contoh 5: Kesamaan Set",
          content:
            "P = {x : x ialah huruf dalam perkataan 'RAMAH'} dan Q = {x : x ialah huruf dalam perkataan 'HAMAR'}. Adakah P = Q?",
          formula:
            "P = {r, a, m, h} (huruf dalam RAMAH)\nQ = {h, a, m, r} (huruf dalam HAMAR)\nKedua-duanya mengandungi unsur yang sama → P = Q",
        },
      ],
    },
    {
      title: "19. Ringkasan Bab",
      subsections: [
        {
          title: "Ringkasan Simbol Penting",
          table: {
            headers: ["Simbol", "Makna", "Contoh"],
            rows: [
              ["{}", "Kurungan kurawal (set)", "{1, 2, 3}"],
              ["∈", "adalah unsur bagi", "2 ∈ A"],
              ["∉", "bukan unsur bagi", "5 ∉ A"],
              ["n(A)", "bilangan unsur dalam A", "n(A) = 3"],
              ["∅ atau {}", "set kosong", "∅"],
              ["ξ", "set semesta", "ξ = {1,2,...,10}"],
              ["A'", "pelengkap A", "A' = ξ \\ A"],
              ["⊂", "adalah subset bagi", "B ⊂ A"],
              ["⊄", "bukan subset bagi", "C ⊄ A"],
              ["2ⁿ", "bilangan subset", "n=3 → 8 subset"],
            ],
          },
        },
        {
          title: "Tiga Kaedah Perwakilan Set",
          bulletPoints: [
            "PERIHALAN: menerangkan set dalam ayat. Contoh: 'A ialah set nombor genap antara 1 dan 10'.",
            "PENYENARAIAN: senaraikan semua unsur. Contoh: A = {2, 4, 6, 8, 10}.",
            "TATATANDA PEMBINA SET: gunakan syarat. Contoh: A = {x : x ialah nombor genap, 1 < x ≤ 10}.",
          ],
        },
        {
          title: "Peraturan Penting",
          bulletPoints: [
            "Unsur berulang hanya dikira SEKALI.",
            "Set kosong ∅ adalah subset SETIAP set.",
            "Setiap set adalah subset dirinya sendiri.",
            "Bilangan subset = 2ⁿ (termasuk ∅ dan set itu sendiri).",
            "Set sama mengandungi unsur yang sama (susunan tidak penting).",
            "A' = unsur dalam ξ yang bukan dalam A.",
          ],
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "Sentiasa semak sama ada unsur berulang sebelum mengira n(A).",
            "Untuk bilangan subset, kira n dahulu, kemudian kira 2ⁿ.",
            "Untuk A', mulakan dengan ξ dan buang unsur dalam A.",
            "Lukis gambar rajah Venn untuk soalan yang kompleks.",
            "∅ ≠ {0} ≠ {∅} — faham perbezaan ini!",
          ],
        },
      ],
    },
  ],
};
