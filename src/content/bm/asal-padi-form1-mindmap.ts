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

function evidence(id: string, label: string, proof: string): MindNode {
  return branch(id, label, [node(`${id}-bukti`, "Bukti Peristiwa", proof)]);
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
        "Asal Padi ialah prosa tradisional dalam antologi Kuingin Berterima Kasih. Teks ini tidak diberikan nama pengarang.",
      ),
      node(
        "sinopsis-permulaan",
        "1. Permulaan",
        "Si Bongsu dan Si Sulung ialah dua beradik yatim piatu. Harta keluarga mereka telah diambil orang sehingga mereka hidup susah. Mereka masih menjaga kolam ikan peninggalan keluarga sebagai sumber kehidupan, manakala Si Sulung mempunyai kecacatan pada kakinya.",
      ),
      node(
        "sinopsis-wanita",
        "2. Pertemuan dengan Wanita Kayangan",
        "Pada suatu hari, Si Bongsu melihat tujuh orang wanita mandi di kolam. Apabila mereka kembali ke kayangan, Si Bongsu mengikuti mereka sehingga tiba di sana.",
      ),
      node(
        "sinopsis-penemuan",
        "3. Penemuan Padi",
        "Di kayangan, Si Bongsu melihat kawasan tanaman yang berkilauan lalu mengetahui bahawa tanaman itu ialah padi. Setelah menikmati makanan daripada padi, dia ingin membawa benihnya ke bumi.",
      ),
      node(
        "sinopsis-cubaan",
        "4. Percubaan Pertama",
        "Si Bongsu cuba menyembunyikan padi di dalam mulutnya, tetapi perbuatannya diketahui oleh empunya padi. Dalam kejadian itu, tumitnya terluka.",
      ),
      node(
        "sinopsis-menjaga",
        "5. Menjaga Padi",
        "Si Bongsu kemudian tinggal di kayangan dan bekerja menjaga padi. Walaupun pernah gagal, dia terus memikirkan cara untuk membawa padi ke bumi.",
      ),
      node(
        "sinopsis-helah",
        "6. Helah Si Bongsu",
        "Si Bongsu menyembunyikan beberapa butir padi di dalam luka pada tumitnya. Empunya padi memeriksanya sebelum dia pulang, tetapi padi itu tidak ditemukan.",
      ),
      node(
        "sinopsis-bumi",
        "7. Padi di Bumi",
        "Si Bongsu kembali ke bumi lalu menanam padi yang dibawanya. Padi itu tumbuh dengan baik. Selepas padi berkembang di bumi, padi di kayangan kehilangan daya hidup sebagaimana diceritakan dalam teks.",
      ),
      branch("sinopsis-burung", "8. Burung Pipit dan Burung Tekuri", [
        node(
          "sinopsis-burung-siasatan",
          "Penyiasatan",
          "Burung pipit dan burung tekuri terlibat dalam penyiasatan tentang kewujudan padi di bumi.",
        ),
        node(
          "sinopsis-burung-pipit",
          "Tindakan Burung Pipit",
          "Burung pipit tidak menjalankan amanah penyiasatan dengan jujur.",
        ),
        node(
          "sinopsis-burung-tekuri",
          "Tindak Balas Burung Tekuri",
          "Burung tekuri memberikan tindak balas yang jujur dan melaksanakan amanah dengan betul.",
        ),
        node(
          "sinopsis-burung-akibat",
          "Akibat",
          "Peristiwa itu memperlihatkan akibat sikap tidak jujur serta perbezaannya dengan sikap amanah.",
        ),
      ]),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "Kebijaksanaan dalam Menyelesaikan Masalah", [
        node(
          "tema-utama-huraian",
          "Huraian",
          "Si Bongsu menggunakan akal untuk mencari jalan membawa padi dari kayangan ke bumi setelah percubaan awalnya gagal. Keberanian dan kegigihannya mengembangkan tema utama ini.",
        ),
        node(
          "tema-utama-bukti",
          "Bukti Peristiwa",
          "Si Bongsu menyembunyikan padi di dalam luka pada tumitnya supaya benih itu dapat dibawa ke bumi.",
        ),
        node(
          "tema-utama-jawapan",
          "Jawapan Murid",
          "Tema prosa tradisional Asal Padi ialah kebijaksanaan dalam menyelesaikan masalah. Hal ini dapat dilihat melalui tindakan Si Bongsu yang mencari helah untuk membawa padi dari kayangan ke bumi.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      evidence(
        "persoalan-bijak",
        "Kebijaksanaan Mencari Penyelesaian",
        "Si Bongsu mencari cara lain selepas percubaan pertamanya menyembunyikan padi di dalam mulut gagal.",
      ),
      evidence(
        "persoalan-berani",
        "Keberanian Menghadapi Risiko",
        "Si Bongsu berani pergi ke kayangan dan mengambil risiko untuk mendapatkan padi.",
      ),
      evidence(
        "persoalan-gigih",
        "Kegigihan Mendapatkan Sesuatu yang Diingini",
        "Si Bongsu tidak berputus asa, malah terus memikirkan helah untuk membawa padi ke bumi.",
      ),
      evidence(
        "persoalan-amanah",
        "Amanah dan Kejujuran",
        "Episod burung pipit dan burung tekuri memperlihatkan perbezaan antara sikap tidak jujur dengan pelaksanaan amanah secara betul.",
      ),
    ]),
    branch("watak", "Watak", [
      node(
        "watak-bongsu",
        "Si Bongsu — Watak Utama",
        "Adik kepada Si Sulung, anak yatim piatu yang hidup susah, pergi ke kayangan dan membawa padi ke bumi.",
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
        "Burung yang terlibat dalam penyiasatan tentang padi di bumi dan tidak menjalankan amanah dengan jujur.",
      ),
      node(
        "watak-tekuri",
        "Burung Tekuri",
        "Burung yang terlibat dalam episod penyiasatan dan menjadi perbandingan melalui sikap jujur serta amanah.",
      ),
    ]),
    branch("perwatakan", "Perwatakan", [
      evidence(
        "perwatakan-bijak",
        "Si Bongsu — Bijaksana",
        "Dia mendapat idea menyembunyikan padi di dalam luka pada tumitnya.",
      ),
      evidence(
        "perwatakan-gigih",
        "Si Bongsu — Gigih",
        "Dia terus berusaha mendapatkan padi walaupun percubaan awalnya gagal.",
      ),
      evidence(
        "perwatakan-berani",
        "Si Bongsu — Berani",
        "Dia berani mengambil risiko dalam usahanya membawa padi ke bumi.",
      ),
      evidence(
        "perwatakan-rajin",
        "Si Bongsu — Rajin",
        "Dia bekerja menjaga dan mengawasi padi semasa berada di kayangan.",
      ),
      evidence(
        "perwatakan-empunya-hati-hati",
        "Empunya Padi — Berhati-hati",
        "Si Bongsu diperiksa sebelum dibenarkan kembali ke bumi.",
      ),
      evidence(
        "perwatakan-empunya-baik",
        "Empunya Padi — Baik Hati",
        "Si Bongsu diberi makanan daripada padi dan kemudian diterima untuk tinggal serta menjaga padi di kayangan.",
      ),
      evidence(
        "perwatakan-pipit",
        "Burung Pipit — Tidak Jujur",
        "Burung pipit tidak menjalankan amanah penyiasatan dengan baik.",
      ),
      evidence(
        "perwatakan-tekuri",
        "Burung Tekuri — Amanah dan Jujur",
        "Burung tekuri melaksanakan amanah penyiasatan dengan betul.",
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
        "Si Bongsu mengikuti tujuh orang wanita ke kayangan lalu menemukan padi.",
      ),
      node(
        "plot-perumitan",
        "Perumitan",
        "Si Bongsu mahu membawa padi ke bumi tetapi dihalang. Percubaan pertamanya menyembunyikan padi di dalam mulut gagal dan tumitnya terluka.",
      ),
      node(
        "plot-klimaks",
        "Klimaks",
        "Si Bongsu menemukan cara yang berjaya, iaitu menyembunyikan padi di dalam luka pada tumitnya sebelum pulang ke bumi.",
      ),
      node(
        "plot-peleraian",
        "Peleraian",
        "Padi ditanam dan berkembang di bumi. Cerita diteruskan dengan akibat terhadap padi di kayangan serta episod burung pipit dan burung tekuri.",
      ),
    ]),
    branch("teknik-plot", "Teknik Plot", [
      branch("teknik-dialog", "Dialog", [
        node("teknik-dialog-maksud", "Maksud", "Percakapan antara dua watak atau lebih."),
        node(
          "teknik-dialog-contoh",
          "Contoh Peristiwa",
          "Interaksi Si Bongsu dengan orang kayangan tentang makanan dan padi disampaikan melalui percakapan. Contoh ini diparafrasa tanpa mereka-reka petikan tepat.",
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
          "Pencerita memerikan kesusahan dua beradik, keadaan kaki Si Sulung dan tanaman berkilauan di kayangan.",
        ),
      ]),
    ]),
    branch("latar-tempat", "Latar Tempat", [
      evidence(
        "latar-tempat-bumi",
        "Bumi",
        "Si Bongsu dan Si Sulung tinggal di bumi; Si Bongsu akhirnya menanam padi di situ.",
      ),
      evidence(
        "latar-tempat-kolam",
        "Kolam Ikan",
        "Kolam menjadi sumber kehidupan dua beradik dan tempat Si Bongsu melihat tujuh orang wanita mandi.",
      ),
      evidence(
        "latar-tempat-kayangan",
        "Kayangan",
        "Si Bongsu mengikuti wanita-wanita itu ke kayangan dan mengenali padi di sana.",
      ),
      evidence(
        "latar-tempat-dusun",
        "Kawasan / Dusun Padi",
        "Padi tumbuh dan dijaga di kawasan tanaman di kayangan.",
      ),
    ]),
    branch("latar-masa", "Latar Masa", [
      evidence(
        "latar-masa-suatu-hari",
        "Suatu Hari",
        "Si Bongsu melihat tujuh orang wanita mandi di kolam pada suatu hari.",
      ),
      evidence(
        "latar-masa-kayangan",
        "Tempoh Si Bongsu di Kayangan",
        "Si Bongsu tinggal dan bekerja menjaga padi sambil memikirkan cara untuk membawanya ke bumi.",
      ),
      evidence(
        "latar-masa-selepas",
        "Selepas Kembali ke Bumi",
        "Si Bongsu menanam padi dan tanaman itu berkembang di bumi.",
      ),
    ]),
    branch("latar-masyarakat", "Latar Masyarakat", [
      evidence(
        "latar-masyarakat-gigih",
        "Masyarakat yang Gigih Berusaha",
        "Diwakili oleh Si Bongsu yang terus berusaha mendapatkan padi selepas gagal.",
      ),
      evidence(
        "latar-masyarakat-kayangan",
        "Masyarakat Kayangan",
        "Masyarakat ini memiliki dan mengusahakan padi sebelum tanaman itu sampai ke bumi.",
      ),
      evidence(
        "latar-masyarakat-hak",
        "Masyarakat yang Menjaga Hak dan Harta",
        "Empunya padi mengawal padi dan memeriksa Si Bongsu sebelum dia pulang.",
      ),
      evidence(
        "latar-masyarakat-bijak",
        "Masyarakat yang Menggunakan Kebijaksanaan",
        "Diwakili oleh Si Bongsu yang mencari helah selepas percubaan pertamanya gagal.",
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
          "Contoh Selamat",
          "Kaki Si Sulung diperihalkan dengan perbandingan seperti kaki itik. Contoh diparafrasa dan bukan petikan panjang daripada teks.",
        ),
      ]),
      branch("gaya-sinkope", "Sinkope", [
        node(
          "gaya-sinkope-maksud",
          "Maksud",
          "Pemendekan perkataan dalam pertuturan atau dialog untuk menimbulkan kesan bahasa lisan.",
        ),
        node(
          "gaya-sinkope-bukti",
          "Penggunaan dalam Teks",
          "Bentuk kata yang dipendekkan hadir dalam dialog teks. Rujuk perkataan sebenar dalam naskhah sebelum menyalin contoh tepat.",
        ),
      ]),
      node(
        "gaya-amaran",
        "Semak Sebelum Menjawab",
        "Jangan mendakwa kata ganda, peribahasa atau bahasa kiasan tertentu wujud tanpa menyemak perkataan sebenar dalam teks.",
      ),
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
        "Si Bongsu bekerja menjaga padi semasa tinggal di kayangan.",
      ),
      evidence(
        "nilai-gigih",
        "Kegigihan",
        "Si Bongsu terus mencuba selepas percubaan awalnya gagal.",
      ),
      evidence(
        "nilai-berani",
        "Keberanian",
        "Si Bongsu berani pergi ke kayangan dan mengambil risiko untuk membawa padi ke bumi.",
      ),
      evidence(
        "nilai-amanah",
        "Amanah dan Kejujuran",
        "Burung tekuri melaksanakan amanah dengan jujur, berbeza daripada tindakan burung pipit.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      evidence(
        "pengajaran-bijak",
        "Kita Hendaklah Bijak Menyelesaikan Masalah",
        "Si Bongsu memikirkan strategi baharu untuk membawa padi selepas percubaan pertamanya gagal.",
      ),
      evidence(
        "pengajaran-gigih",
        "Kita Hendaklah Gigih Berusaha",
        "Si Bongsu tidak berputus asa walaupun menghadapi halangan.",
      ),
      evidence(
        "pengajaran-rajin",
        "Kita Hendaklah Rajin",
        "Si Bongsu menjalankan kerja menjaga padi ketika berada di kayangan.",
      ),
      evidence(
        "pengajaran-berani",
        "Kita Hendaklah Berani Menghadapi Cabaran",
        "Si Bongsu berani pergi ke kayangan dan berusaha mendapatkan padi.",
      ),
      evidence(
        "pengajaran-amanah",
        "Kita Hendaklah Bersikap Amanah dan Jujur",
        "Episod burung pipit dan burung tekuri menunjukkan perbezaan antara kegagalan menjaga amanah dengan tindakan yang jujur.",
      ),
    ]),
    branch("peristiwa", "Peristiwa Penting", [
      node(
        "peristiwa-1",
        "1. Dua Beradik Hidup Susah",
        "Si Bongsu dan Si Sulung kehilangan ibu bapa serta harta keluarga mereka diambil orang.",
      ),
      node(
        "peristiwa-2",
        "2. Tujuh Wanita di Kolam",
        "Si Bongsu melihat tujuh orang wanita mandi di kolam ikan.",
      ),
      node(
        "peristiwa-3",
        "3. Sampai ke Kayangan",
        "Si Bongsu mengikuti mereka sehingga tiba di kayangan.",
      ),
      node(
        "peristiwa-4",
        "4. Mengenali Padi",
        "Si Bongsu mengetahui bahawa tanaman berkilauan itu ialah padi.",
      ),
      node(
        "peristiwa-5",
        "5. Percubaan Pertama Gagal",
        "Padi yang disembunyikan di dalam mulutnya diketahui oleh empunya padi.",
      ),
      node("peristiwa-6", "6. Tumit Terluka", "Tumit Si Bongsu terluka dalam kejadian tersebut."),
      node(
        "peristiwa-7",
        "7. Menjaga Padi",
        "Si Bongsu tinggal dan bekerja menjaga padi di kayangan.",
      ),
      node(
        "peristiwa-8",
        "8. Padi pada Luka Tumit",
        "Dia menyembunyikan beberapa butir padi di dalam luka pada tumitnya.",
      ),
      node(
        "peristiwa-9",
        "9. Pulang ke Bumi",
        "Pemeriksaan empunya padi tidak menemukan benih itu lalu Si Bongsu berjaya pulang.",
      ),
      node(
        "peristiwa-10",
        "10. Padi Berkembang",
        "Si Bongsu menanam padi dan tanaman itu tumbuh dengan baik di bumi.",
      ),
      node(
        "peristiwa-11",
        "11. Padi di Kayangan",
        "Selepas padi berkembang di bumi, padi di kayangan kehilangan daya hidup sebagaimana diceritakan dalam teks.",
      ),
      node(
        "peristiwa-12",
        "12. Burung Pipit dan Tekuri",
        "Penyiasatan tentang padi di bumi memperlihatkan perbezaan antara sikap tidak jujur dengan sikap amanah.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-tema", "Tema", "Tulis TEMA + satu peristiwa sokongan yang ringkas."),
      node(
        "jawab-persoalan",
        "Persoalan",
        "Tulis PERSOALAN + BUKTI yang benar-benar menyokongnya.",
      ),
      node(
        "jawab-perwatakan",
        "Perwatakan",
        "Gunakan WATAK + SIFAT + PERISTIWA, contohnya: “Si Bongsu seorang yang bijaksana kerana...”",
      ),
      node("jawab-nilai", "Nilai", "Tulis NILAI + PERISTIWA yang menunjukkan nilai itu."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan “Kita hendaklah...” kemudian kaitkan pedoman dengan peristiwa yang sesuai.",
      ),
      node(
        "jawab-latar",
        "Latar",
        "Nyatakan JENIS LATAR + TEMPAT / MASYARAKAT / MASA + PERISTIWA.",
      ),
      node(
        "jawab-plot",
        "Plot",
        "Nyatakan PERINGKAT PLOT + PERISTIWA yang berlaku pada peringkat tersebut.",
      ),
      node(
        "jawab-fokus",
        "Jawab Secara Fokus",
        "Satu peristiwa yang tepat biasanya mencukupi; jangan ceritakan semula seluruh cerita.",
      ),
      branch("ingatan-enam", "ASAL PADI DALAM 6 LANGKAH", [
        node("ingatan-enam-susah", "1. SUSAH"),
        node("ingatan-enam-kayangan", "2. KAYANGAN"),
        node("ingatan-enam-kenal", "3. KENAL PADI"),
        node("ingatan-enam-akal", "4. CARI AKAL"),
        node("ingatan-enam-bawa", "5. BAWA KE BUMI"),
        node("ingatan-enam-berkembang", "6. PADI BERKEMBANG"),
      ]),
      node("ingatan-bongsu", "SI BONGSU", "BIJAK + GIGIH + BERANI + RAJIN"),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-tema-sinopsis",
        "Tema = Sinopsis",
        "Salah: menceritakan semula seluruh cerita apabila soalan hanya meminta tema.",
      ),
      node(
        "kesalahan-persoalan-tema",
        "Persoalan = Tema",
        "Salah: tidak membezakan idea utama dengan idea sampingan.",
      ),
      node(
        "kesalahan-watak-perwatakan",
        "Watak = Perwatakan",
        "Salah: “Perwatakan ialah Si Bongsu.” Betul: “Si Bongsu seorang yang bijaksana.”",
      ),
      node(
        "kesalahan-bukti-tiada",
        "Perwatakan Tanpa Bukti",
        "Sifat dinyatakan tanpa peristiwa yang menyokongnya.",
      ),
      node(
        "kesalahan-nilai-pengajaran",
        "Nilai = Pengajaran",
        "Nilai ialah sifat atau amalan, manakala pengajaran ialah pedoman berbentuk tindakan.",
      ),
      node(
        "kesalahan-latar",
        "Latar Tempat = Latar Masyarakat",
        "Lokasi fizikal tidak boleh digunakan sebagai ciri masyarakat.",
      ),
      node(
        "kesalahan-bukti",
        "Bukti Salah",
        "Peristiwa yang dipilih tidak menyokong sifat atau nilai yang dinyatakan.",
      ),
      node(
        "kesalahan-panjang",
        "Cerita Semula Terlalu Panjang",
        "Jawapan hilang fokus kerana seluruh jalan cerita dihuraikan.",
      ),
      node(
        "kesalahan-reka",
        "Fakta Direka",
        "Watak atau peristiwa yang tiada dalam teks ditambahkan.",
      ),
      node(
        "kesalahan-versi",
        "Campur Versi Cerita",
        "Jangan gunakan butiran daripada versi serantau lain tentang Asal Padi jika butiran itu tidak terdapat dalam teks KOMSAS yang ditetapkan.",
      ),
    ]),
  ],
};
