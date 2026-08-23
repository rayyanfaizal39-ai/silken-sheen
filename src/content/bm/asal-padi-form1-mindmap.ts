import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-asal-padi";

function node(id: string, label: string, summary?: string, children?: MindNode[]): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    ...(summary ? { summary } : {}),
    ...(children?.length ? { children } : {}),
  };
}

function branch(id: string, label: string, children: MindNode[]): MindNode {
  return node(id, label, undefined, children);
}

function evidence(id: string, label: string, summary: string): MindNode {
  return branch(id, label, [node(`${id}-bukti`, "Bukti Peristiwa", summary)]);
}

export const bahasaMelayuTingkatan1AsalPadiMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ASAL PADI",
  summary:
    "Prosa tradisional yang mengisahkan usaha Si Bongsu mendapatkan padi dari kayangan dan membawanya ke bumi sehingga tanaman padi akhirnya dapat berkembang di bumi.",
  children: [
    branch("sinopsis", "Sinopsis", [
      node(
        "sinopsis-identiti",
        "Identiti Karya",
        "Asal Padi ialah prosa tradisional dalam Antologi Kuingin Berterima Kasih. Nama pengarang tidak dinyatakan dalam sumber yang ditetapkan.",
      ),
      branch("sinopsis-permulaan", "Permulaan", [
        node(
          "sinopsis-permulaan-keluarga",
          "Dua Beradik",
          "Si Bongsu dan Si Sulung ialah dua beradik yang telah kehilangan ibu bapa. Harta peninggalan keluarga mereka diambil orang sehingga mereka hidup dalam kesusahan.",
        ),
        node(
          "sinopsis-permulaan-kolam",
          "Kolam Peninggalan Keluarga",
          "Mereka masih mempunyai kolam ikan peninggalan keluarga yang dijaga sebagai sumber kehidupan. Si Sulung mempunyai kecacatan pada kakinya.",
        ),
      ]),
      branch("sinopsis-wanita", "Pertemuan dengan Wanita Kayangan", [
        node(
          "sinopsis-wanita-kolam",
          "Tujuh Wanita",
          "Pada suatu hari, Si Bongsu melihat tujuh orang wanita mandi di kolam.",
        ),
        node(
          "sinopsis-wanita-ikut",
          "Mengikuti ke Kayangan",
          "Wanita-wanita itu kemudian kembali ke kayangan. Si Bongsu mengikuti mereka sehingga tiba di sana.",
        ),
      ]),
      branch("sinopsis-penemuan", "Penemuan Padi", [
        node(
          "sinopsis-penemuan-tanaman",
          "Tanaman Berkilauan",
          "Di kayangan, Si Bongsu melihat kawasan tanaman yang berkilauan dan mengetahui bahawa tanaman itu ialah padi.",
        ),
        node(
          "sinopsis-penemuan-makanan",
          "Makanan daripada Padi",
          "Si Bongsu menikmati makanan yang diperbuat daripada padi lalu ingin membawa benih tersebut pulang ke bumi.",
        ),
      ]),
      branch("sinopsis-cubaan", "Percubaan Pertama", [
        node(
          "sinopsis-cubaan-mulut",
          "Padi di Dalam Mulut",
          "Si Bongsu cuba menyembunyikan padi di dalam mulutnya, tetapi percubaan itu diketahui oleh empunya padi.",
        ),
        node(
          "sinopsis-cubaan-tumit",
          "Tumit Terluka",
          "Dalam kejadian tersebut, tumit Si Bongsu terluka.",
        ),
      ]),
      branch("sinopsis-menjaga", "Menjaga Padi", [
        node(
          "sinopsis-menjaga-kerja",
          "Bekerja di Kayangan",
          "Si Bongsu kemudiannya tinggal di kayangan dan bekerja menjaga padi.",
        ),
        node(
          "sinopsis-menjaga-usaha",
          "Terus Mencari Jalan",
          "Walaupun pernah gagal, dia terus memikirkan cara untuk membawa padi ke bumi.",
        ),
      ]),
      branch("sinopsis-helah", "Helah Si Bongsu", [
        node(
          "sinopsis-helah-luka",
          "Padi di Dalam Luka",
          "Si Bongsu menyembunyikan beberapa butir padi di dalam luka pada tumitnya.",
        ),
        node(
          "sinopsis-helah-periksa",
          "Pemeriksaan",
          "Empunya padi memeriksanya sebelum dia pulang, tetapi padi tersebut tidak ditemukan.",
        ),
      ]),
      branch("sinopsis-bumi", "Padi di Bumi", [
        node(
          "sinopsis-bumi-tanam",
          "Berjaya Ditanam",
          "Si Bongsu kembali ke bumi dan menanam padi yang dibawanya. Padi tersebut tumbuh dengan baik.",
        ),
        node(
          "sinopsis-bumi-kayangan",
          "Perubahan di Kayangan",
          "Selepas padi berkembang di bumi, padi di kayangan mengalami perubahan dan kehilangan daya hidup sebagaimana diceritakan dalam teks.",
        ),
      ]),
      branch("sinopsis-burung", "Burung Pipit dan Tekuri", [
        node(
          "sinopsis-burung-siasat",
          "Penyiasatan",
          "Burung Pipit dan Burung Tekuri terlibat dalam penyiasatan tentang kewujudan padi di bumi.",
        ),
        node(
          "sinopsis-burung-pipit",
          "Tindakan Burung Pipit",
          "Burung Pipit tidak menjalankan amanah penyiasatan dengan jujur.",
        ),
        node(
          "sinopsis-burung-tekuri",
          "Tindak Balas Burung Tekuri",
          "Burung Tekuri menjalankan tanggungjawab dengan jujur dan menjadi perbandingan kepada Burung Pipit.",
        ),
        node(
          "sinopsis-burung-akibat",
          "Akibat",
          "Perbezaan sikap kedua-dua burung menegaskan bahawa ketidakjujuran membawa akibat, sedangkan amanah dan kejujuran perlu dipelihara.",
        ),
      ]),
    ]),
    branch("tema", "Tema", [
      evidence(
        "tema-bijaksana",
        "Kebijaksanaan dalam Menyelesaikan Masalah",
        "Si Bongsu menggunakan akal dengan menyembunyikan padi di dalam luka pada tumitnya supaya benih itu dapat dibawa ke bumi. Keberanian dan kegigihannya mengembangkan tema ini tanpa menjadi tema utama yang bersaing.",
      ),
      node(
        "tema-jawapan",
        "Jawapan Murid",
        "Tema prosa tradisional Asal Padi ialah kebijaksanaan dalam menyelesaikan masalah. Hal ini dapat dilihat melalui tindakan Si Bongsu yang mencari helah untuk membawa padi dari kayangan ke bumi.",
      ),
    ]),
    branch("persoalan", "Persoalan", [
      evidence(
        "persoalan-penyelesaian",
        "Kebijaksanaan Mencari Penyelesaian",
        "Si Bongsu mencari cara lain selepas percubaan pertamanya membawa padi gagal.",
      ),
      evidence(
        "persoalan-risiko",
        "Keberanian Menghadapi Risiko",
        "Si Bongsu berani mengambil tindakan untuk mendapatkan padi dan membawanya ke bumi.",
      ),
      evidence(
        "persoalan-gigih",
        "Kegigihan Mendapatkan Sesuatu yang Diingini",
        "Si Bongsu tidak berputus asa dalam usahanya mendapatkan padi walaupun percubaan awalnya gagal.",
      ),
      evidence(
        "persoalan-budi",
        "Kepentingan Budi Pekerti dan Kesopanan",
        "Interaksi Si Bongsu dengan orang kayangan menunjukkan bahawa hubungan dengan orang lain perlu disertai budi pekerti yang baik.",
      ),
      evidence(
        "persoalan-amanah",
        "Amanah dan Kejujuran",
        "Perbezaan tindakan Burung Pipit dan Burung Tekuri menunjukkan kepentingan melaksanakan amanah dengan jujur.",
      ),
    ]),
    branch("watak", "Watak", [
      node(
        "watak-bongsu",
        "Si Bongsu — Watak Utama",
        "Adik kepada Si Sulung, anak yatim piatu yang hidup dalam kesusahan, pergi ke kayangan dan membawa padi ke bumi.",
      ),
      node(
        "watak-sulung",
        "Si Sulung",
        "Abang Si Bongsu yang mempunyai kecacatan pada kaki dan tinggal bersama adiknya.",
      ),
      node(
        "watak-empunya",
        "Empunya Padi / Orang Kayangan",
        "Pihak yang mempunyai dan menjaga padi di kayangan, berinteraksi dengan Si Bongsu serta menghalang padi dibawa sesuka hati.",
      ),
      node(
        "watak-pipit",
        "Burung Pipit",
        "Terlibat dalam penyiasatan tentang padi di bumi dan menjadi watak perbandingan yang tidak menjalankan amanah dengan jujur.",
      ),
      node(
        "watak-tekuri",
        "Burung Tekuri",
        "Terlibat dalam penyiasatan tentang padi di bumi dan menjadi watak yang jujur serta amanah.",
      ),
    ]),
    branch("perwatakan", "Perwatakan", [
      evidence(
        "perwatakan-bongsu-bijak",
        "Si Bongsu — Bijaksana",
        "Dia mendapat idea menyembunyikan padi di dalam luka pada tumitnya.",
      ),
      evidence(
        "perwatakan-bongsu-gigih",
        "Si Bongsu — Gigih / Tidak Mudah Berputus Asa",
        "Dia terus berusaha mendapatkan padi walaupun percubaan awalnya gagal.",
      ),
      evidence(
        "perwatakan-bongsu-berani",
        "Si Bongsu — Berani",
        "Dia berani mengambil risiko dalam usahanya membawa padi ke bumi.",
      ),
      evidence(
        "perwatakan-bongsu-rajin",
        "Si Bongsu — Rajin",
        "Dia bekerja menjaga dan mengawasi padi semasa berada di kayangan.",
      ),
      evidence(
        "perwatakan-sulung-tabah",
        "Si Sulung — Tabah",
        "Dia meneruskan kehidupan yang susah bersama Si Bongsu walaupun mempunyai kecacatan pada kaki.",
      ),
      evidence(
        "perwatakan-empunya-hati-hati",
        "Empunya Padi — Berhati-hati",
        "Si Bongsu diperiksa sebelum dibenarkan kembali ke bumi.",
      ),
      evidence(
        "perwatakan-empunya-baik",
        "Empunya Padi — Bertimbang Rasa",
        "Si Bongsu diberi makanan dan diterima untuk tinggal serta menjaga padi di kayangan.",
      ),
      evidence(
        "perwatakan-pipit",
        "Burung Pipit — Tidak Jujur",
        "Burung Pipit tidak menjalankan amanah penyiasatan dengan baik.",
      ),
      evidence(
        "perwatakan-tekuri",
        "Burung Tekuri — Amanah dan Jujur",
        "Burung Tekuri menjalankan tanggungjawab penyiasatan dengan jujur.",
      ),
    ]),
    branch("plot", "Plot", [
      node(
        "plot-permulaan",
        "Permulaan",
        "Si Bongsu dan Si Sulung diperkenalkan sebagai dua beradik yatim piatu yang hidup dalam kesusahan.",
      ),
      node(
        "plot-perkembangan",
        "Perkembangan",
        "Si Bongsu mengikuti tujuh wanita ke kayangan lalu menemukan padi.",
      ),
      node(
        "plot-perumitan",
        "Perumitan",
        "Si Bongsu mahu membawa padi ke bumi, tetapi dihalang. Percubaan pertamanya gagal dan tumitnya terluka.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Si Bongsu menemukan cara yang berjaya untuk menyembunyikan padi di dalam luka pada tumitnya dan membawanya dari kayangan.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Padi ditanam dan tumbuh di bumi. Akibat terhadap padi di kayangan serta episod Burung Pipit dan Burung Tekuri menyusul sebagaimana diceritakan dalam teks.",
      ),
    ]),
    branch("teknik-plot", "Teknik Plot", [
      branch("teknik-dialog", "Dialog", [
        node("teknik-dialog-maksud", "Maksud", "Percakapan antara dua watak atau lebih."),
        node(
          "teknik-dialog-contoh",
          "Contoh Peristiwa",
          "Percakapan Si Bongsu dengan orang kayangan menggerakkan peristiwa ketika dia mengenali padi dan berurusan dengan empunya padi. Tiada petikan langsung direka.",
        ),
      ]),
      branch("teknik-pemerian", "Pemerian", [
        node(
          "teknik-pemerian-maksud",
          "Maksud",
          "Pencerita menerangkan watak, keadaan atau tempat kepada pembaca.",
        ),
        node(
          "teknik-pemerian-contoh",
          "Contoh Peristiwa",
          "Keadaan hidup dua beradik, kecacatan kaki Si Sulung dan kawasan tanaman di kayangan diterangkan oleh pencerita.",
        ),
      ]),
    ]),
    branch("latar-tempat", "Latar Tempat", [
      evidence(
        "latar-tempat-bumi",
        "Bumi",
        "Si Bongsu dan Si Sulung tinggal di bumi; padi kemudiannya ditanam dan berkembang di sini.",
      ),
      evidence(
        "latar-tempat-kolam",
        "Kolam Ikan",
        "Kolam menjadi sumber kehidupan dua beradik dan tempat Si Bongsu melihat tujuh wanita mandi.",
      ),
      evidence(
        "latar-tempat-kayangan",
        "Kayangan",
        "Si Bongsu mengikuti tujuh wanita ke kayangan lalu menemukan padi di sana.",
      ),
      evidence(
        "latar-tempat-dusun",
        "Kawasan / Dusun Padi",
        "Padi ditanam dan dijaga di kawasan tanaman di kayangan; Si Bongsu bekerja menjaganya.",
      ),
    ]),
    branch("latar-masa", "Latar Masa", [
      evidence(
        "latar-masa-suatu-hari",
        "Suatu Hari",
        "Pada suatu hari, Si Bongsu melihat tujuh wanita mandi di kolam.",
      ),
      evidence(
        "latar-masa-tempoh",
        "Tempoh di Kayangan",
        "Si Bongsu tinggal di kayangan untuk suatu tempoh dan bekerja menjaga padi sebelum pulang ke bumi.",
      ),
    ]),
    branch("latar-masyarakat", "Latar Masyarakat", [
      evidence(
        "latar-masyarakat-gigih",
        "Masyarakat yang Gigih Berusaha",
        "Si Bongsu terus mencari jalan mendapatkan padi walaupun percubaan awalnya gagal.",
      ),
      evidence(
        "latar-masyarakat-kayangan",
        "Masyarakat Kayangan",
        "Masyarakat ini memiliki dan mengusahakan padi sebelum tanaman tersebut sampai ke bumi.",
      ),
      evidence(
        "latar-masyarakat-hak",
        "Masyarakat yang Menjaga Hak dan Harta",
        "Empunya padi mengawal tanaman dan memeriksa Si Bongsu sebelum dia pulang.",
      ),
      evidence(
        "latar-masyarakat-bijak",
        "Masyarakat yang Menggunakan Kebijaksanaan",
        "Si Bongsu menggunakan akal untuk menyelesaikan masalah membawa benih padi ke bumi.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      branch("gaya-simile", "Simile", [
        node(
          "gaya-simile-maksud",
          "Maksud",
          "Perbandingan yang menggunakan kata seperti, bagai, bak atau umpama.",
        ),
        node(
          "gaya-simile-contoh",
          "Contoh Sumber-Selamat",
          "Kaki Si Sulung digambarkan melalui perbandingan dengan kaki itik. Contoh diparafrasa dan bukan petikan panjang daripada teks.",
        ),
      ]),
      branch("gaya-sinkope", "Sinkope", [
        node(
          "gaya-sinkope-maksud",
          "Maksud",
          "Pemendekan bentuk kata dalam percakapan atau dialog.",
        ),
        node(
          "gaya-sinkope-panduan",
          "Cara Mengenal Pasti",
          "Kenal pasti kata yang dipendekkan dalam dialog dan nyatakan bentuk penuhnya. Contoh tepat tidak direka tanpa petikan sumber.",
        ),
      ]),
      branch("gaya-kata-ganda", "Kata Ganda", [
        node(
          "gaya-kata-ganda-maksud",
          "Maksud",
          "Pengulangan seluruh atau sebahagian kata untuk membawa maksud tertentu, termasuk jamak.",
        ),
        node(
          "gaya-kata-ganda-panduan",
          "Cara Mengenal Pasti",
          "Cari bentuk kata yang diulang dalam teks dan jelaskan fungsinya. Contoh yang tidak disahkan tidak ditambah.",
        ),
      ]),
    ]),
    branch("nilai", "Nilai", [
      evidence(
        "nilai-bijak",
        "Kebijaksanaan",
        "Si Bongsu menggunakan akal untuk menyembunyikan padi di dalam luka pada tumitnya.",
      ),
      evidence(
        "nilai-rajin",
        "Kerajinan",
        "Si Bongsu bekerja menjaga dan mengawasi padi ketika berada di kayangan.",
      ),
      evidence(
        "nilai-gigih",
        "Kegigihan",
        "Si Bongsu terus berusaha mendapatkan padi selepas percubaan pertamanya gagal.",
      ),
      evidence(
        "nilai-berani",
        "Keberanian",
        "Si Bongsu berani menghadapi risiko ketika berusaha membawa padi ke bumi.",
      ),
      evidence(
        "nilai-sopan",
        "Kesopanan / Budi Bahasa",
        "Interaksi Si Bongsu dengan orang kayangan menunjukkan kepentingan berbudi bahasa dalam perhubungan.",
      ),
      evidence(
        "nilai-amanah",
        "Amanah / Kejujuran",
        "Burung Tekuri menjalankan amanah dengan jujur, berbeza dengan Burung Pipit.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      evidence(
        "pengajaran-bijak",
        "Kita Hendaklah Bijak Menyelesaikan Masalah",
        "Si Bongsu mencari helah yang berjaya selepas percubaan awalnya membawa padi gagal.",
      ),
      evidence(
        "pengajaran-gigih",
        "Kita Hendaklah Gigih Berusaha",
        "Si Bongsu terus mencuba walaupun menghadapi halangan.",
      ),
      evidence(
        "pengajaran-rajin",
        "Kita Hendaklah Rajin",
        "Si Bongsu bekerja menjaga padi semasa berada di kayangan.",
      ),
      evidence(
        "pengajaran-sopan",
        "Kita Hendaklah Bersopan Santun",
        "Hubungan Si Bongsu dengan orang kayangan memperlihatkan kepentingan budi bahasa.",
      ),
      evidence(
        "pengajaran-amanah",
        "Kita Hendaklah Bersikap Amanah dan Jujur",
        "Episod Burung Pipit dan Burung Tekuri menunjukkan perbezaan serta akibat antara tidak amanah dengan jujur.",
      ),
    ]),
    branch("peristiwa", "Peristiwa Penting", [
      branch("peristiwa-garis-masa", "Garis Masa Cerita", [
        node(
          "peristiwa-1",
          "1. Dua Beradik Hidup Susah",
          "Si Bongsu dan Si Sulung hidup dalam kesusahan selepas kehilangan ibu bapa dan harta keluarga.",
        ),
        node(
          "peristiwa-2",
          "2. Melihat Tujuh Wanita",
          "Si Bongsu melihat tujuh wanita mandi di kolam ikan.",
        ),
        node(
          "peristiwa-3",
          "3. Sampai ke Kayangan",
          "Si Bongsu mengikuti mereka sehingga tiba di kayangan.",
        ),
        node(
          "peristiwa-4",
          "4. Mengenali Padi",
          "Si Bongsu mengetahui bahawa tanaman berkilauan itu ialah padi dan menikmati makanan daripadanya.",
        ),
        node(
          "peristiwa-5",
          "5. Percubaan Pertama Gagal",
          "Percubaan menyembunyikan padi di dalam mulut diketahui oleh empunya padi.",
        ),
        node(
          "peristiwa-6",
          "6. Tumit Terluka",
          "Tumit Si Bongsu terluka dalam kejadian percubaan pertama.",
        ),
        node(
          "peristiwa-7",
          "7. Menjaga Padi",
          "Si Bongsu tinggal dan bekerja menjaga padi di kayangan.",
        ),
        node(
          "peristiwa-8",
          "8. Padi di Luka Tumit",
          "Dia menyembunyikan beberapa butir padi di dalam luka pada tumitnya.",
        ),
        node(
          "peristiwa-9",
          "9. Pulang ke Bumi",
          "Si Bongsu melepasi pemeriksaan dan berjaya pulang ke bumi.",
        ),
        node("peristiwa-10", "10. Padi Berkembang", "Padi ditanam dan tumbuh dengan baik di bumi."),
        node(
          "peristiwa-11",
          "11. Padi di Kayangan",
          "Padi di kayangan mengalami perubahan dan kehilangan daya hidup setelah padi berkembang di bumi.",
        ),
        node(
          "peristiwa-12",
          "12. Pipit dan Tekuri",
          "Kedua-dua burung terlibat dalam penyiasatan yang menegaskan perbezaan antara tidak jujur dengan amanah.",
        ),
      ]),
      branch("peristiwa-ingatan", "ASAL PADI DALAM 6 LANGKAH", [
        node("peristiwa-ingatan-susah", "SUSAH"),
        node("peristiwa-ingatan-kayangan", "KAYANGAN"),
        node("peristiwa-ingatan-kenal", "KENAL PADI"),
        node("peristiwa-ingatan-akal", "CARI AKAL"),
        node("peristiwa-ingatan-bawa", "BAWA KE BUMI"),
        node("peristiwa-ingatan-berkembang", "PADI BERKEMBANG"),
      ]),
      node("peristiwa-ingatan-bongsu", "SI BONGSU", "BIJAK + GIGIH + BERANI + RAJIN"),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-tema",
        "Tema",
        "TEMA + peristiwa sokongan ringkas. Nyatakan kebijaksanaan menyelesaikan masalah dan kaitkan dengan helah Si Bongsu.",
      ),
      node(
        "jawab-persoalan",
        "Persoalan",
        "PERSOALAN + BUKTI. Pilih satu idea sampingan dan satu peristiwa yang menyokongnya.",
      ),
      node(
        "jawab-perwatakan",
        "Perwatakan",
        "WATAK + SIFAT + PERISTIWA. Contoh struktur: “Si Bongsu seorang yang bijaksana kerana...”",
      ),
      node("jawab-nilai", "Nilai", "NILAI + PERISTIWA yang benar-benar menunjukkan nilai itu."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan “Kita hendaklah...” dan nyatakan pedoman yang sesuai dengan peristiwa.",
      ),
      node(
        "jawab-latar",
        "Latar",
        "JENIS LATAR + TEMPAT / MASYARAKAT / MASA + PERISTIWA. Jangan gunakan lokasi sebagai latar masyarakat.",
      ),
      node(
        "jawab-plot",
        "Plot",
        "PERINGKAT + PERISTIWA. Pilih kejadian yang tepat bagi tahap plot yang ditanya.",
      ),
      node(
        "jawab-fokus",
        "Jawab dengan Fokus",
        "Jangan ceritakan semula seluruh karya apabila satu peristiwa sudah cukup sebagai bukti.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-tema-sinopsis",
        "Tema = Sinopsis",
        "SALAH: menceritakan semula seluruh cerita apabila soalan meminta idea utama.",
      ),
      node(
        "kesalahan-persoalan-tema",
        "Persoalan = Tema",
        "SALAH: tidak membezakan idea utama daripada idea sampingan.",
      ),
      node(
        "kesalahan-watak-perwatakan",
        "Watak = Perwatakan",
        "SALAH: “Perwatakan ialah Si Bongsu.” BETUL: “Si Bongsu seorang yang bijaksana.”",
      ),
      node(
        "kesalahan-tanpa-bukti",
        "Perwatakan Tanpa Bukti",
        "Sifat diberikan tanpa peristiwa yang menyokongnya.",
      ),
      node(
        "kesalahan-nilai-pengajaran",
        "Nilai = Pengajaran",
        "NILAI ialah sifat atau amalan, manakala PENGAJARAN ialah nasihat atau pedoman.",
      ),
      node(
        "kesalahan-latar",
        "Latar Tempat = Latar Masyarakat",
        "SALAH: lokasi fizikal digunakan sebagai ciri masyarakat.",
      ),
      node(
        "kesalahan-bukti",
        "Bukti Salah",
        "Peristiwa yang dipilih tidak menyokong sifat, nilai atau idea yang diberikan.",
      ),
      node(
        "kesalahan-panjang",
        "Cerita Semula Terlalu Panjang",
        "Jawapan hilang fokus kerana terlalu banyak peristiwa yang tidak diperlukan.",
      ),
      node(
        "kesalahan-reka",
        "Fakta Direka",
        "Watak, peristiwa, gaya bahasa atau butiran yang tiada dalam teks ditambah.",
      ),
      node(
        "kesalahan-versi",
        "Campur Versi Cerita",
        "Jangan gunakan butiran daripada versi serantau atau cerita rakyat Asal Padi yang lain jika butiran itu tidak terdapat dalam teks KOMSAS yang ditetapkan.",
      ),
    ]),
  ],
};
