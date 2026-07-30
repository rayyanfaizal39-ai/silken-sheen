import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-penutup";

function node(id: string, label: string, summary: string): MindNode {
  return { id: `${PREFIX}-${id}`, label, summary };
}

type LessonBranch = {
  id: string;
  label: string;
  penerangan: string;
  langkah: string;
  contoh: string;
  tip: string;
  kesalahan: string;
  kesalahanLabel?: string;
};

function lesson({
  id,
  label,
  penerangan,
  langkah,
  contoh,
  tip,
  kesalahan,
  kesalahanLabel = "Kesalahan Lazim",
}: LessonBranch): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    children: [
      node(`${id}-penerangan`, "Penerangan", penerangan),
      node(`${id}-langkah`, "Langkah-langkah", langkah),
      node(`${id}-contoh`, "Contoh", contoh),
      node(`${id}-tip`, "Tip Penulisan", tip),
      node(`${id}-kesalahan`, kesalahanLabel, kesalahan),
    ],
  };
}

export const bahasaMelayuForm1PenutupMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PENUTUP",
  summary:
    "Kemahiran menamatkan karangan dengan merumuskan perbincangan, menegaskan mesej serta menyatakan cadangan atau harapan secara jelas dan berkesan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Penutup?",
      penerangan:
        "Penutup ialah bahagian akhir yang menyempurnakan karangan. Penutup mengingatkan pembaca tentang perkara utama tanpa mengulang semua isi satu demi satu. Unsurnya boleh merangkumi rumusan, penegasan, cadangan, harapan dan ungkapan menarik mengikut kesesuaian.",
      langkah:
        "1. Baca semula fokus • 2. Ingat mesej utama isi • 3. Tulis rumusan umum • 4. Tambahkan penegasan, cadangan atau harapan • 5. Akhiri dengan lengkap • 6. Pastikan tiada isi baharu.",
      contoh:
        "Kesimpulannya, kebersihan sekolah perlu dipelihara melalui kerjasama seluruh warga sekolah. Setiap pihak hendaklah melaksanakan tanggungjawab masing-masing. Diharapkan agar persekitaran sekolah sentiasa bersih, sihat dan selesa untuk semua.",
      tip: "Kembali kepada fokus karangan, gunakan bahasa yang jelas dan positif, rumuskan keseluruhan perbincangan serta sesuaikan panjang penutup dengan panjang tugasan.",
      kesalahan:
        "Karangan berakhir selepas isi terakhir, penutup hanya berbunyi “Itu sahaja”, semua isi disalin semula, isi baharu dimasukkan atau penutup tidak berkaitan dengan fokus.",
    }),
    lesson({
      id: "tujuan",
      label: "Tujuan Penutup",
      penerangan:
        "Penutup menyatukan keseluruhan karangan dan meninggalkan mesej akhir yang jelas. Fungsinya ialah merumuskan perbincangan, menegaskan kepentingan tajuk, menyatakan pendirian, mencadangkan tindakan, menyatakan harapan dan menamatkan karangan.",
      langkah:
        "1. Kenal pasti mesej utama • 2. Rumuskan dalam satu ayat • 3. Tegaskan perkara penting • 4. Nyatakan tindakan atau hasil yang diinginkan • 5. Akhiri dengan nada yang sesuai.",
      contoh:
        "Kesimpulannya, aktiviti sukan memberikan banyak faedah kepada kesihatan fizikal, emosi dan sosial murid. Oleh itu, murid hendaklah melibatkan diri secara aktif dalam kegiatan sukan. Diharapkan agar amalan bersukan menjadi sebahagian daripada kehidupan mereka.",
      tip: "Tanya diri: Apakah perkara utama yang dibincangkan? Apakah tindakan yang perlu ditekankan? Apakah keadaan yang diharapkan?",
      kesalahan:
        "Rumusan terlalu umum, hanya mengulangi pendahuluan, cadangan tidak berkaitan, harapan kabur atau nada penutup bercanggah dengan tujuan karangan.",
    }),
    lesson({
      id: "ciri",
      label: "Ciri-ciri Penutup yang Baik",
      penerangan:
        "Penutup yang baik relevan, menyeluruh, ringkas, tegas, tersusun, gramatis dan menggunakan bahasa baku. Penutup bukan tempat untuk memanjangkan karangan dengan maklumat yang tidak diperlukan.",
      langkah:
        "1. Semak kaitan dengan fokus • 2. Pastikan rumusan menyeluruh • 3. Potong pengulangan • 4. Susun rumusan diikuti penegasan, cadangan atau harapan • 5. Semak ayat lengkap, ejaan dan tanda baca.",
      contoh:
        "Kurang baik: Kesimpulannya, banyak kebaikan yang ada dan perkara ini sangat penting. Lebih baik: Kesimpulannya, amalan membaca memberikan pelbagai manfaat kepada murid. Ibu bapa dan sekolah perlu memupuk amalan ini agar generasi berilmu dapat dilahirkan.",
      tip: "Gunakan prinsip satu ayat, satu fungsi: ayat pertama merumuskan, ayat seterusnya menegaskan atau mencadangkan, dan ayat terakhir menyatakan harapan atau mesej akhir.",
      kesalahan:
        "Penutup terlalu panjang, idea berulang, bahasa berbunga-bunga tanpa maksud, ayat tergantung, penanda kesimpulan tidak tepat atau kesalahan bahasa tidak disemak.",
    }),
    lesson({
      id: "cara",
      label: "Cara Menulis Penutup",
      penerangan:
        "Gunakan urutan R-P-H: Rumusan → Penegasan atau cadangan → Harapan. Urutan ini membantu murid menghasilkan pengakhiran lengkap tanpa menghafal satu penutup untuk semua tajuk.",
      langkah:
        "1. Kenal pasti fokus • 2. Bina ayat rumusan • 3. Tambahkan penegasan atau cadangan • 4. Nyatakan harapan • 5. Gabungkan ayat dengan lancar • 6. Semak supaya tiada isi baharu.",
      contoh:
        "Fokus: kepentingan menjaga kebersihan sekolah. Rumusan: Amalan ini memberikan pelbagai manfaat. Penegasan: Semua warga sekolah perlu bertanggungjawab. Harapan: Diharapkan agar sekolah sentiasa bersih, sihat dan selesa.",
      tip: "Sesuaikan rumusan dengan kata tugas: pelbagai langkah perlu dilaksanakan; memberikan banyak manfaat; semua pihak mempunyai peranan; atau masalah berlaku disebabkan beberapa faktor.",
      kesalahan:
        "Rumusan menjawab fokus yang salah, cadangan tidak munasabah, harapan tidak berkaitan, semua isi disenaraikan semula atau ayat pendahuluan disalin sebagai penutup.",
    }),
    lesson({
      id: "jenis",
      label: "Jenis Penutup",
      penerangan:
        "Penutup boleh berbentuk rumusan, penegasan, cadangan atau saranan, harapan, ungkapan atau peribahasa, dan gabungan beberapa unsur. Pilih jenis berdasarkan tujuan karangan serta perkara yang telah dibincangkan.",
      langkah:
        "1. Kenal pasti tujuan karangan • 2. Tentukan mesej akhir • 3. Pilih jenis penutup • 4. Hubungkan dengan keseluruhan isi • 5. Pastikan karangan berakhir dengan jelas.",
      contoh:
        "Rumusan: Kesimpulannya, membaca memberikan pelbagai manfaat kepada murid. • Penegasan: Tegasnya, budaya membaca perlu dijadikan amalan. • Cadangan: Ibu bapa dan sekolah perlu menyediakan bahan bacaan. • Harapan: Diharapkan agar generasi berilmu dapat dilahirkan. • Ungkapan: Sesungguhnya, ilmu pelita hidup.",
      tip: "Gunakan penutup gabungan apabila ruang mencukupi. Penutup rumusan atau penegasan sesuai untuk tugasan ringkas. Gunakan ungkapan hanya apabila maksudnya difahami dan berkaitan.",
      kesalahan:
        "Memaksa semua jenis dalam satu perenggan, menggunakan peribahasa yang salah, memberikan cadangan yang tidak dibincangkan, menulis harapan terlalu umum atau mengulang maksud yang sama.",
    }),
    lesson({
      id: "kesalahan",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan penutup boleh menyebabkan karangan kelihatan tergantung, berulang atau tersasar. Kebanyakan kesalahan boleh dielakkan melalui perancangan dan semakan.",
      langkah:
        "1. Baca semula arahan • 2. Bandingkan fokus penutup dengan pendahuluan • 3. Gariskan rumusan • 4. Potong isi baharu dan pengulangan • 5. Tambah penegasan atau harapan jika perlu • 6. Semak bahasa.",
      contoh:
        "Terlalu umum: Kesimpulannya, perkara ini sangat penting. Pembetulan: Kesimpulannya, amalan menjaga kebersihan sekolah penting untuk menjamin kesihatan dan keselesaan warga sekolah. • Tidak baku: Semua budak kenalah buat benda ni. Pembetulan: Semua murid perlu melaksanakan tanggungjawab masing-masing.",
      tip: "Semak sama ada penutup menjawab fokus, merumuskan perbincangan, bebas daripada isi baharu, mempunyai cadangan atau harapan yang sesuai dan menggunakan bahasa baku.",
      kesalahan:
        "Tiada penutup, terlalu pendek atau panjang, fokus berubah, semua isi diulang, isi baharu diperkenalkan, bahasa pasar, ungkapan salah dan tiada semakan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Ingat R-P-H: R ialah Rumusan, P ialah Penegasan atau cadangan dan H ialah Harapan. Gunakan juga FAHAM → RANGKA → TULIS → SEMAK serta I-B-S: Isi, Bahasa dan Susunan.",
      langkah:
        "1. Catat R-P-H pada rangka • 2. Tulis satu kata kunci bagi setiap huruf • 3. Tukarkan kepada ayat lengkap • 4. Semak dengan I-B-S • 5. Pastikan ayat terakhir menamatkan karangan.",
      contoh:
        "Kebaikan membaca: R — membaca bermanfaat • P — ibu bapa dan sekolah perlu memupuknya • H — melahirkan generasi berilmu dan berfikiran luas.",
      tip: "Hafal fungsi, bukan ayat contoh. Formula boleh dipendekkan atau dikembangkan mengikut arahan dan panjang tugasan.",
      kesalahan:
        "Menganggap semua penutup mesti mempunyai tiga ayat, menghafal ayat sama untuk semua tajuk, menulis huruf R-P-H dalam jawapan atau memaksa harapan sehingga ayat menjadi kaku.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, penutup perlu menyempurnakan jawapan dan menunjukkan bahawa murid dapat mengawal keseluruhan perbincangan. Ketepatan, kejelasan dan bahasa lebih penting daripada panjang semata-mata.",
      langkah:
        "Sebelum: kenal pasti kata tugas, tema dan fokus, kemudian rangka R-P-H. • Semasa: tulis rumusan, penegasan atau cadangan dan harapan tanpa isi baharu. • Selepas: semak I-B-S, keselarasan dengan pendahuluan dan isi, ejaan, tanda baca serta syarat soalan.",
      contoh:
        "Kesimpulannya, pelbagai cara perlu dilaksanakan untuk memupuk minat membaca dalam kalangan murid. Ibu bapa, guru dan pihak sekolah hendaklah bekerjasama agar usaha ini berterusan. Diharapkan agar budaya membaca dapat melahirkan generasi yang berilmu dan berfikiran matang.",
      tip: "Rancang penutup bersama rangka karangan, gunakan penanda seperti “Kesimpulannya”, “Tegasnya”, “Oleh itu” dan “Diharapkan agar” mengikut fungsi serta simpan masa untuk semakan.",
      kesalahan:
        "Kehabisan masa lalu tiada penutup, tidak menjawab kata tugas, fokus berbeza daripada pendahuluan, ayat tergantung, semua isi disalin semula, isi baharu dimasukkan atau bahasa tidak disemak.",
    }),
  ],
};
