import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-ayat-gramatis";

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

export const bahasaMelayuForm2AyatGramatisMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "AYAT GRAMATIS",
  summary:
    "Panduan Tingkatan 2 untuk membina ayat yang lengkap, tepat, jelas dan bervariasi melalui penggunaan subjek, predikat, kata hubung serta struktur ayat yang sesuai.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Ayat Gramatis?",
      penerangan:
        "Ayat gramatis ialah ayat yang dibina mengikut peraturan bahasa, mempunyai struktur lengkap dan menyampaikan maksud dengan jelas. Ayat ini lazimnya mempunyai subjek dan predikat serta menggunakan perkataan, imbuhan dan tanda baca dengan tepat.",
      langkah:
        "1. Tentukan perkara yang hendak disampaikan • 2. Kenal pasti subjek • 3. Bina predikat • 4. Pilih perkataan dan imbuhan yang tepat • 5. Lengkapkan tanda baca • 6. Baca semula maksud ayat.",
      contoh:
        "Tidak lengkap: Menjaga kebersihan sekolah supaya selesa. Gramatis: Semua murid perlu menjaga kebersihan sekolah supaya suasana pembelajaran lebih selesa.",
      tip: "Jika kurang pasti, bina ayat dengan susunan biasa: subjek diikuti predikat. Ayat yang mudah tetapi tepat lebih baik daripada ayat rumit yang kabur.",
      kesalahan:
        "Ayat tergantung, subjek tidak jelas, predikat tidak lengkap, susunan kata janggal, imbuhan salah atau tanda baca menyebabkan maksud berubah.",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan Ayat Gramatis",
      penerangan:
        "Ayat gramatis membantu pembaca memahami isi tanpa kekeliruan. Dalam karangan, ayat yang tepat menguatkan huraian, melicinkan hubungan idea dan menunjukkan penguasaan bahasa yang matang.",
      langkah:
        "1. Nyatakan idea utama dengan jelas • 2. Hubungkan sebab, cara atau kesan • 3. Gunakan struktur yang tepat • 4. Elakkan pengulangan • 5. Pelbagaikan ayat secara terkawal • 6. Semak kefahaman pembaca.",
      contoh:
        "Kabur: Murid membaca buku menjadi pandai kerana banyak ilmu. Jelas: Murid yang rajin membaca dapat menambahkan ilmu pengetahuan dan seterusnya meningkatkan pencapaian mereka.",
      tip: "Baca ayat dari sudut pembaca. Jika perlu dibaca beberapa kali untuk memahami maksudnya, ringkaskan atau susun semula ayat itu.",
      kesalahan:
        "Mengutamakan ayat panjang, memasukkan terlalu banyak idea, memilih kata sukar secara paksa atau menganggap pembaca akan memahami maksud yang tidak dinyatakan.",
    }),
    lesson({
      id: "ciri-ciri",
      label: "Ciri-ciri Ayat Gramatis",
      penerangan:
        "Ayat gramatis mempunyai subjek dan predikat yang jelas, susunan kata yang betul, perkataan serta imbuhan yang tepat, hubungan idea yang logik dan tanda baca yang sesuai.",
      langkah:
        "1. Cari subjek • 2. Cari predikat • 3. Periksa susunan • 4. Semak kata dan imbuhan • 5. Uji hubungan makna • 6. Periksa ejaan serta tanda baca • 7. Pastikan ayat mudah difahami.",
      contoh:
        "Ayat: Aktiviti senaman dapat meningkatkan kecergasan badan. Subjek: Aktiviti senaman. Predikat: dapat meningkatkan kecergasan badan. Maksudnya lengkap, susunannya jelas dan imbuhannya tepat.",
      tip: "Gunakan senarai semak ringkas: lengkap, tepat, jelas dan berkaitan. Keempat-empat ciri perlu hadir sebelum ayat dianggap sesuai untuk karangan.",
      kesalahan:
        "Subjek dan predikat tidak sepadan, kata sendi atau imbuhan salah, hubungan sebab-akibat tidak logik, penggunaan kata berlebihan atau noktah tertinggal.",
    }),
    lesson({
      id: "ayat-mudah",
      label: "Ayat Mudah",
      penerangan:
        "Ayat mudah ialah ayat yang menyampaikan satu idea secara terus dan senang difahami. Dalam pembelajaran ini, ayat mudah lazimnya dibina sebagai ayat tunggal dengan satu struktur subjek dan predikat yang jelas.",
      langkah:
        "1. Pilih satu idea • 2. Tentukan pelaku atau perkara sebagai subjek • 3. Nyatakan perbuatan atau keadaan sebagai predikat • 4. Tambah keterangan yang perlu • 5. Letakkan noktah • 6. Semak kelengkapan.",
      contoh:
        "Murid membaca buku. → Murid Tingkatan 2 membaca buku ilmiah di pusat sumber. Subjek: Murid Tingkatan 2. Predikat: membaca buku ilmiah di pusat sumber.",
      tip: "Gunakan ayat mudah untuk memperkenalkan isi penting atau memecahkan penerangan yang terlalu panjang. Ringkas tidak bermaksud cetek jika perkataannya tepat.",
      kesalahan:
        "Ayat terlalu pendek sehingga maksud tidak lengkap, frasa dianggap sebagai ayat, keterangan berlebihan atau semua ayat dalam perenggan mempunyai pola yang sama hingga penulisan menjadi kaku.",
    }),
    lesson({
      id: "ayat-majmuk",
      label: "Ayat Majmuk",
      penerangan:
        "Ayat majmuk terbentuk daripada gabungan dua atau lebih ayat tunggal atau klausa. Ayat ini membolehkan murid menunjukkan hubungan penambahan, pertentangan, pilihan, sebab, tujuan, masa atau penerangan.",
      langkah:
        "1. Kenal pasti klausa • 2. Tentukan hubungan makna • 3. Pilih kata hubung yang tepat • 4. Gabungkan klausa • 5. Gugurkan pengulangan hanya jika selamat • 6. Pastikan maksud asal dan struktur lengkap.",
      contoh:
        "Ayat 1: Murid membaca buku. Ayat 2: Murid memperoleh ilmu. Gabungan sebab: Murid memperoleh ilmu kerana mereka membaca buku. Gabungan hasil: Murid membaca buku lalu memperoleh ilmu.",
      tip: "Gunakan ayat majmuk untuk menghubungkan idea yang benar-benar berkaitan. Bukan setiap ayat panjang atau ayat yang mengandungi “dan” semestinya ayat majmuk.",
      kesalahan:
        "Kata hubung tidak sesuai, klausa tergantung, terlalu banyak klausa, maksud asal berubah atau “dan” digunakan untuk semua jenis hubungan.",
    }),
    lesson({
      id: "variasi",
      label: "Variasi Struktur Ayat",
      penerangan:
        "Variasi struktur bermaksud mempelbagaikan bentuk dan panjang ayat tanpa menjejaskan ketepatan. Murid boleh menggabungkan ayat mudah dengan ayat majmuk serta menggunakan susunan biasa atau keterangan awal apabila sesuai.",
      langkah:
        "1. Baca satu perenggan • 2. Kenal pasti pola yang berulang • 3. Kekalkan ayat penting secara ringkas • 4. Gabungkan idea berkaitan • 5. Ubah kedudukan keterangan jika jelas • 6. Semak kelancaran.",
      contoh:
        "Biasa: Murid membaca di pusat sumber pada waktu rehat. Variasi keterangan awal: Pada waktu rehat, murid membaca di pusat sumber. Majmuk: Pada waktu rehat, murid membaca di pusat sumber supaya masa lapang dimanfaatkan.",
      tip: "Selang-selikan ayat ringkas dan ayat majmuk yang terkawal. Variasi harus membantu penekanan dan aliran idea, bukan sekadar mengubah susunan.",
      kesalahan:
        "Menyongsangkan ayat hingga janggal, semua ayat terlalu panjang, pola ayat diulang, keterangan diletakkan pada tempat yang mengelirukan atau tanda koma digunakan secara rawak.",
    }),
    lesson({
      id: "menggabungkan",
      label: "Menggabungkan Ayat",
      penerangan:
        "Penggabungan ayat mencantumkan dua atau lebih idea yang berkaitan menjadi satu ayat yang lancar. Proses ini perlu mengekalkan semua maklumat penting dan hubungan makna asal.",
      langkah:
        "1. Baca semua ayat asal • 2. Tandakan idea yang sama • 3. Kenal pasti hubungan • 4. Pilih kata hubung • 5. Buang pengulangan yang tidak perlu • 6. Bina ayat baharu • 7. Bandingkan maksud asal.",
      contoh:
        "Asal: Aktiviti gotong-royong diadakan. Aktiviti itu memupuk kerjasama. Gabungan: Aktiviti gotong-royong diadakan kerana aktiviti tersebut dapat memupuk kerjasama dalam kalangan murid.",
      tip: "Gunakan “dan” untuk penambahan, “tetapi” untuk pertentangan, “kerana” untuk sebab dan “supaya” untuk tujuan. Pilihan sebenar bergantung pada maksud ayat.",
      kesalahan:
        "Menggugurkan maklumat penting, memilih kata hubung berdasarkan kebiasaan, mengulang subjek tanpa perlu, mengubah sebab menjadi kesan atau menghasilkan ayat terlalu sarat.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan ayat gramatis yang lazim termasuk ayat tergantung, struktur tidak lengkap, kata hubung salah, pengulangan, imbuhan tidak tepat dan ayat terlalu panjang.",
      langkah:
        "1. Gariskan subjek dan predikat • 2. Bulatkan kata hubung • 3. Semak imbuhan • 4. Potong pengulangan • 5. Pecahkan ayat terlalu panjang • 6. Betulkan tanda baca • 7. Baca semula.",
      contoh:
        "Tergantung: Kerana aktiviti itu menyihatkan badan. Betul: Murid digalakkan bersukan kerana aktiviti itu menyihatkan badan. Panjang: Murid membaca dan belajar dan menulis. Betul: Murid membaca, belajar dan menulis.",
      tip: "Semak satu jenis kesalahan pada satu masa. Mulakan dengan kelengkapan ayat sebelum menyemak perkataan, imbuhan dan tanda baca.",
      kesalahan:
        "Ayat tergantung, subjek hilang, predikat kabur, kata hubung berlebihan, susunan janggal, bahasa pasar, imbuhan salah, terjemahan langsung dan penggunaan koma antara subjek dengan predikat.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan teknik J-E-L-A-S: Jaga maksud, Ejaan dan imbuhan tepat, Lengkapkan subjek serta predikat, Atur perkataan dan klausa, kemudian Semak semula.",
      langkah:
        "1. J—tentukan maksud • 2. E—semak ejaan dan imbuhan • 3. L—pastikan ayat lengkap • 4. A—atur struktur serta kata hubung • 5. S—baca dan semak kejelasan.",
      contoh:
        "Ayat: Murid memanfaatkan pusat sumber kerana kemudahan itu menyediakan pelbagai bahan bacaan. J—maksud jelas • E—imbuhan tepat • L—lengkap • A—hubungan sebab • S—mudah difahami.",
      tip: "Gunakan J-E-L-A-S semasa membina dan menyemak ayat. Ingat fungsi setiap huruf, bukan sekadar nama teknik.",
      kesalahan:
        "Menulis singkatan teknik dalam karangan, menyemak ejaan sahaja, menganggap ayat panjang lebih matang atau mengubah ayat yang sudah tepat tanpa sebab.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, ayat perlu menjawab kehendak soalan, menyampaikan isi dengan jelas dan menunjukkan penguasaan bahasa. Gunakan gabungan ayat mudah serta ayat majmuk yang tepat mengikut tujuan.",
      langkah:
        "Sebelum: fahami fokus dan rangka isi. • Semasa: bina ayat lengkap, gunakan kata hubung tepat dan pelbagaikan struktur secara terkawal. • Selepas: semak J-E-L-A-S, tanda baca, hubungan idea dan maksud keseluruhan.",
      contoh:
        "Isi: faedah membaca. Ayat UASA: Amalan membaca dapat memperluas pengetahuan kerana murid memperoleh maklumat tentang pelbagai bidang. Kesannya, mereka mampu menghuraikan idea dengan lebih matang dalam karangan.",
      tip: "Jika ayat terlalu panjang, pecahkan pada sempadan idea yang sesuai. Kejelasan dan ketepatan lebih penting daripada penggunaan struktur yang rumit.",
      kesalahan:
        "Menyalin kata kunci tanpa ayat lengkap, semua ayat berpola sama, kata hubung salah, isi bercampur, ayat terlalu panjang, bahasa tidak baku atau tiada semakan akhir.",
    }),
  ],
};
