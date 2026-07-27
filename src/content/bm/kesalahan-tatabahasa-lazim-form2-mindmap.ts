import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-kesalahan-tatabahasa-lazim";

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

export const bahasaMelayuForm2KesalahanTatabahasaLazimMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KESALAHAN TATABAHASA",
  summary:
    "Kesalahan tatabahasa lazim ialah kesalahan yang kerap berlaku dalam ejaan, pembentukan kata, penggunaan kata tugas dan pembinaan ayat.",
  children: [
    branch("ejaan", "Ejaan", [
      node(
        "ejaan-maksud",
        "Maksud",
        "Kesalahan ejaan berlaku apabila sesuatu perkataan ditulis tidak mengikut bentuk standard bahasa Melayu.",
      ),
      branch("ejaan-contoh", "Contoh Salah dan Betul", [
        node("ejaan-didominasi", "Salah → Betul", "didominassi → didominasi"),
        node("ejaan-menggerakkan", "Salah → Betul", "menggerakan → menggerakkan"),
        node("ejaan-memperuntukkan", "Salah → Betul", "memperuntukan → memperuntukkan"),
      ]),
      node(
        "ejaan-prinsip",
        "Prinsip",
        "Semak ejaan standard, imbuhan yang tepat, penggandaan konsonan, jarak atau cantuman, penggunaan huruf besar dan tanda sempang.",
      ),
      node(
        "ejaan-nota",
        "Nota",
        "Jangan anggap setiap ejaan yang tidak dikenali sebagai salah tanpa menyemak bentuk standardnya.",
      ),
    ]),
    branch("huruf-besar", "Huruf Besar", [
      branch("huruf-besar-permulaan", "Permulaan Ayat", [
        node("huruf-besar-permulaan-salah", "Salah", '"murid itu membaca buku."'),
        node("huruf-besar-permulaan-betul", "Betul", '"Murid itu membaca buku."'),
      ]),
      node(
        "huruf-besar-khas",
        "Kata Nama Khas",
        "Kata nama khas menggunakan huruf besar: Malaysia • Kuala Lumpur • Sekolah Menengah Kebangsaan Seri Indah • Bahasa Melayu",
      ),
      node(
        "huruf-besar-am",
        "Kata Nama Am",
        "Kata nama am biasanya ditulis dengan huruf kecil: sekolah • negeri • guru • murid",
      ),
      branch("huruf-besar-kesalahan", "Kesalahan Lazim", [
        node(
          "huruf-besar-kesalahan-salah",
          "Salah",
          '"negara Malaysia terletak di asia Tenggara."',
        ),
        node(
          "huruf-besar-kesalahan-betul",
          "Betul",
          '"Negara Malaysia terletak di Asia Tenggara."',
        ),
      ]),
      node(
        "huruf-besar-nota",
        "Nota",
        "Jangan gunakan huruf besar pada kata nama am hanya kerana perkataan itu dianggap penting.",
      ),
    ]),
    branch("jarak-cantum", "Jarak dan Cantum", [
      node(
        "jarak-cantum-di-sendi",
        "Kata Sendi Nama di",
        "Ditulis terpisah sebelum tempat: di sekolah • di rumah • di Kuala Lumpur",
      ),
      node(
        "jarak-cantum-di-imbuhan",
        "Imbuhan di-",
        "Ditulis bercantum dengan kata kerja: ditulis • dibaca • dipamerkan • disediakan",
      ),
      node(
        "jarak-cantum-ke-sendi",
        "Kata Sendi Nama ke",
        "Ditulis terpisah: ke sekolah • ke hospital • ke utara",
      ),
      node(
        "jarak-cantum-ke-awalan",
        "Awalan ke-",
        "Ditulis bercantum sebagai sebahagian kata terbitan: kedua • ketua • kehendak",
      ),
      node(
        "jarak-cantum-perbandingan",
        "Contoh Perbandingan",
        "di sekolah → kata sendi nama • ditulis → imbuhan pasif",
      ),
      branch("jarak-cantum-kesalahan", "Kesalahan Lazim", [
        node("jarak-cantum-kesalahan-di", "Salah → Betul", "di tulis → ditulis"),
        node("jarak-cantum-kesalahan-tempat", "Salah → Betul", "disekolah → di sekolah"),
      ]),
    ]),
    branch("tanda-sempang", "Tanda Sempang", [
      node(
        "tanda-sempang-bilangan",
        "Bilangan Berangka",
        "Gunakan tanda sempang pada bentuk tertentu yang melibatkan angka: ke-21 • tahun 1990-an • kali ke-3",
      ),
      node(
        "tanda-sempang-khas",
        "Imbuhan Pinjaman dengan Kata Nama Khas",
        "anti-Amerika • pro-Malaysia",
      ),
      node("tanda-sempang-ganda", "Kata Ganda", "murid-murid • sayur-mayur • kuih-muih"),
      branch("tanda-sempang-kesalahan", "Kesalahan Lazim", [
        node("tanda-sempang-kesalahan-angka", "Salah → Betul", "ke 21 → ke-21"),
        node("tanda-sempang-kesalahan-khas", "Salah → Betul", "anti Malaysia → anti-Malaysia"),
      ]),
      node(
        "tanda-sempang-nota",
        "Nota",
        "Jangan gunakan tanda sempang selepas setiap awalan pinjaman. Bentuk kata nama am yang telah mantap lazimnya ditulis bercantum: antirasuah • antidadah • prasekolah",
      ),
    ]),
    branch("imbuhan", "Imbuhan", [
      branch("imbuhan-dua-k", "Hukum Dua Huruf k", [
        node("imbuhan-dua-k-bentuk", "Pembentukan", "gerak + -kan = gerakkan"),
        node("imbuhan-dua-k-men", "Dengan meN-", "menggerakkan"),
      ]),
      node("imbuhan-kesalahan", "Kesalahan", "menggerakan → menggerakkan"),
      node(
        "imbuhan-peluluhan",
        "Peluluhan",
        "pukul → memukul • tulis → menulis • sapu → menyapu • karang → mengarang",
      ),
      node(
        "imbuhan-pinjaman",
        "Kata Pinjaman",
        "Sesetengah kata pinjaman atau kata dengan gugus konsonan mengekalkan konsonan: memproses • mempraktikkan • mengkritik",
      ),
      node(
        "imbuhan-bentuk-diberikan",
        "Bentuk Diberikan",
        "Jika soalan memberikan menguruskan, jangan ubah kepada pengurusan kecuali arahan membenarkan perubahan bentuk.",
      ),
      node(
        "imbuhan-nota",
        "Nota",
        "Gunakan cabang ini sebagai ulang kaji pantas melalui contoh pembetulan, bukan pengulangan seluruh pelajaran Imbuhan Lanjutan.",
      ),
    ]),
    branch("aktif-pasif", "Ayat Aktif dan Pasif", [
      node("aktif-pasif-aktif", "Aktif", 'Pelaku menjadi subjek. Contoh: "Saya membaca buku itu."'),
      branch("aktif-pasif-orang-pertama", "Pasif Orang Pertama", [
        node("aktif-pasif-orang-pertama-betul", "Betul", '"Buku itu saya baca."'),
        node(
          "aktif-pasif-orang-pertama-salah",
          "Tidak Mengikut Binaan Pasif Diri Pertama",
          '"Buku itu dibaca oleh saya."',
        ),
        node(
          "aktif-pasif-orang-pertama-nota",
          "Panduan Sekolah",
          "Tatabahasa sekolah lazimnya menggunakan binaan pasif pendek bagi kata ganti nama diri pertama.",
        ),
      ]),
      branch("aktif-pasif-orang-kedua", "Pasif Orang Kedua", [
        node("aktif-pasif-orang-kedua-aktif", "Aktif", '"Kamu menyiapkan tugasan itu."'),
        node("aktif-pasif-orang-kedua-pasif", "Pasif", '"Tugasan itu kamu siapkan."'),
      ]),
      branch("aktif-pasif-orang-ketiga", "Pasif Orang Ketiga", [
        node("aktif-pasif-orang-ketiga-aktif", "Aktif", '"Ali membaca buku itu."'),
        node("aktif-pasif-orang-ketiga-pasif", "Pasif", '"Buku itu dibaca oleh Ali."'),
      ]),
      branch("aktif-pasif-kesalahan", "Kesalahan Lazim", [
        node(
          "aktif-pasif-kesalahan-pertama",
          "Salah → Betul",
          '"Buku itu saya dibaca." → "Buku itu saya baca."',
        ),
        node(
          "aktif-pasif-kesalahan-kedua",
          "Salah → Betul",
          '"Tugasan itu di kamu siapkan." → "Tugasan itu kamu siapkan."',
        ),
      ]),
      node(
        "aktif-pasif-makna",
        "Kekalkan Makna",
        "Jangan gugurkan kata bantu, subjek, objek, masa atau tempat ketika menukarkan ragam ayat.",
      ),
    ]),
    branch("kata-sendi", "Kata Sendi Nama", [
      node(
        "kata-sendi-dari",
        "dari",
        "Digunakan untuk ATM — arah, tempat dan masa: dari utara • dari sekolah • dari pagi",
      ),
      node(
        "kata-sendi-daripada",
        "daripada",
        "Digunakan untuk orang, sumber atau asal, bahan, sumber abstrak, perbandingan dan sebahagian daripada keseluruhan: hadiah daripada ibu • meja daripada kayu • lebih tinggi daripada Ali • sebahagian daripada murid",
      ),
      branch("kata-sendi-kesalahan", "Kesalahan Lazim", [
        node(
          "kata-sendi-kesalahan-ibu",
          "Salah → Betul",
          '"Hadiah itu diterima dari ibu." → "Hadiah itu diterima daripada ibu."',
        ),
        node(
          "kata-sendi-kesalahan-banding",
          "Salah → Betul",
          '"Ali lebih tinggi dari Abu." → "Ali lebih tinggi daripada Abu."',
        ),
      ]),
      node(
        "kata-sendi-nota",
        "Nota Ketepatan",
        "Gunakan ATM sebagai alat ingatan sahaja, bukan penerangan lengkap bagi setiap penggunaan lanjutan kata sendi dari.",
      ),
    ]),
    branch("kata-pemeri", "Kata Pemeri", [
      node(
        "kata-pemeri-ialah",
        "ialah",
        'Digunakan sebelum Frasa Nama. Contoh: "Nama program itu ialah Program Bakti."',
      ),
      node(
        "kata-pemeri-adalah",
        "adalah",
        'Digunakan sebelum Frasa Adjektif atau Frasa Sendi Nama. Contoh: "Keputusan itu adalah baik." • "Program itu adalah untuk murid Tingkatan Dua."',
      ),
      branch("kata-pemeri-kesalahan", "Kesalahan Lazim", [
        node(
          "kata-pemeri-kesalahan-fn",
          "Salah → Betul",
          '"Nama saya adalah Amir." → "Nama saya ialah Amir."',
        ),
        node(
          "kata-pemeri-kesalahan-fs",
          "Salah → Betul",
          '"Program itu ialah untuk semua murid." → "Program itu adalah untuk semua murid."',
        ),
      ]),
      branch("kata-pemeri-frasa-kerja", "Sebelum Frasa Kerja", [
        node(
          "kata-pemeri-frasa-kerja-salah",
          "Elakkan",
          '"Langkah utama ialah memupuk perpaduan."',
        ),
        node(
          "kata-pemeri-frasa-kerja-pilihan-1",
          "Pilihan Lebih Tepat 1",
          '"Langkah utama adalah untuk memupuk perpaduan."',
        ),
        node(
          "kata-pemeri-frasa-kerja-pilihan-2",
          "Pilihan Lebih Tepat 2",
          '"Langkah utama ialah pemupukan perpaduan."',
        ),
        node(
          "kata-pemeri-frasa-kerja-nota",
          "Nota Ketepatan",
          "Elakkan kata pemeri secara langsung sebelum frasa kerja biasa; analisis fungsi frasa dalam konteks dan jangan anggap setiap bentuk yang menyerupai kata kerja selepas ialah semestinya salah.",
        ),
      ]),
      node(
        "kata-pemeri-merupakan",
        "merupakan",
        "Merupakan ialah kata kerja, bukan kata pemeri, dan tidak boleh dianggap sama sepenuhnya dengan ialah.",
      ),
    ]),
    branch("binaan-ayat", "Binaan Ayat", [
      branch("binaan-ayat-lengkap", "Ayat Lengkap", [
        node("binaan-ayat-lengkap-fragmen", "Fragmen", '"Sedang membaca buku."'),
        node("binaan-ayat-lengkap-betul", "Lengkap", '"Farah sedang membaca buku."'),
        node(
          "binaan-ayat-lengkap-prinsip",
          "Prinsip",
          "Ayat lengkap lazimnya memerlukan subjek dan predikat yang jelas.",
        ),
      ]),
      branch("binaan-ayat-susunan", "Susunan Gramatis", [
        node("binaan-ayat-susunan-salah", "Salah", '"Buku itu membaca Ali."'),
        node("binaan-ayat-susunan-aktif", "Betul Aktif", '"Ali membaca buku itu."'),
        node("binaan-ayat-susunan-pasif", "Betul Pasif", '"Buku itu dibaca oleh Ali."'),
      ]),
      branch("binaan-ayat-sempadan", "Sempadan Subjek", [
        node(
          "binaan-ayat-sempadan-ayat",
          "Ayat",
          '"Rumah besar di hujung jalan itu telah dijual."',
        ),
        node("binaan-ayat-sempadan-subjek", "Subjek", "Rumah besar di hujung jalan itu"),
        node("binaan-ayat-sempadan-predikat", "Predikat", "telah dijual"),
      ]),
      node(
        "binaan-ayat-hubung",
        "Kata Hubung",
        '"Amir tidak hadir ke sekolah tetapi dia demam." tidak sepadan dengan hubungan sebab. Bentuk tepat: "Amir tidak hadir ke sekolah kerana dia demam."',
      ),
      node(
        "binaan-ayat-terjemahan",
        "Elakkan Terjemahan Langsung",
        "Jangan bina ayat bahasa Melayu dengan menyalin susunan perkataan bahasa Inggeris secara mekanikal. Gunakan sintaksis standard bahasa Melayu.",
      ),
    ]),
    branch("pencerakinan", "Pencerakinan", [
      node(
        "pencerakinan-maksud",
        "Maksud",
        "Pencerakinan memisahkan ayat majmuk menjadi beberapa ayat tunggal yang lengkap.",
      ),
      branch("pencerakinan-contoh", "Contoh", [
        node(
          "pencerakinan-contoh-asal",
          "Ayat Asal",
          '"Ali membaca buku dan Siti menulis karangan."',
        ),
        node("pencerakinan-contoh-1", "Ayat Tunggal 1", '"Ali membaca buku."'),
        node("pencerakinan-contoh-2", "Ayat Tunggal 2", '"Siti menulis karangan."'),
      ]),
      branch("pencerakinan-digugurkan", "Unsur Digugurkan", [
        node("pencerakinan-digugurkan-asal", "Ayat Asal", '"Amir membeli dan membaca buku itu."'),
        node("pencerakinan-digugurkan-1", "Ayat Tunggal 1", '"Amir membeli buku itu."'),
        node("pencerakinan-digugurkan-2", "Ayat Tunggal 2", '"Amir membaca buku itu."'),
      ]),
      branch("pencerakinan-kesalahan", "Kesalahan Lazim", [
        node("pencerakinan-kesalahan-1", "Tidak Lengkap 1", '"Amir membeli."'),
        node("pencerakinan-kesalahan-2", "Tidak Lengkap 2", '"membaca buku itu."'),
        node(
          "pencerakinan-kesalahan-nota",
          "Pembetulan",
          "Setiap hasil pencerakinan mesti lengkap dan gramatis.",
        ),
      ]),
      node(
        "pencerakinan-makna",
        "Kekalkan Maksud",
        "Jangan tambah maklumat baharu, buang fakta penting, tukar sebab kepada tujuan atau ubah rujukan asal.",
      ),
      node(
        "pencerakinan-semakan",
        "Semakan",
        "Setiap ayat mesti mempunyai subjek lengkap, predikat lengkap dan maksud yang gramatis.",
      ),
    ]),
    branch("kesalahan-makna", "Kesalahan Makna", [
      node(
        "kesalahan-makna-hampir",
        "Kata Hampir Sama",
        "Perkataan yang kelihatan hampir sama boleh membawa fungsi atau makna berbeza, seperti dari dengan daripada serta ialah dengan adalah.",
      ),
      node(
        "kesalahan-makna-hubung",
        "Kata Hubung Salah",
        "Kerana menyatakan sebab, manakala supaya menyatakan tujuan. Kedua-duanya tidak boleh ditukar ganti sewenang-wenangnya.",
      ),
      node(
        "kesalahan-makna-imbuhan",
        "Imbuhan Mengubah Makna",
        "urus • mengurus • menguruskan • pengurus • pengurusan ialah bentuk berkaitan tetapi tidak boleh saling menggantikan.",
      ),
      node(
        "kesalahan-makna-penukaran",
        "Penukaran Ayat",
        "Maksud mesti dikekalkan ketika menukar ayat aktif kepada pasif, ayat majmuk kepada ayat tunggal atau cakap ajuk kepada cakap pindah.",
      ),
      node(
        "kesalahan-makna-nota",
        "Nota",
        "Ayat boleh kelihatan lengkap dari segi struktur tetapi masih salah jika perkataan yang dipilih mengubah maksud yang dikehendaki.",
      ),
    ]),
    branch("penyuntingan", "Penyuntingan", [
      node(
        "penyuntingan-langkah-1",
        "Langkah 1",
        "Kenal pasti perkataan atau frasa tepat yang salah.",
      ),
      node(
        "penyuntingan-langkah-2",
        "Langkah 2",
        "Tentukan kategori kesalahan: ejaan, imbuhan, kata sendi, kata pemeri, binaan ayat atau tanda baca.",
      ),
      node("penyuntingan-langkah-3", "Langkah 3", "Tulis pembetulan dengan jelas."),
      node(
        "penyuntingan-format",
        "Format Latihan",
        "Jika soalan meminta kedua-dua bentuk, tulis Kesalahan: ialah dan Pembetulan: adalah. Jangan anggap setiap soalan menggunakan format jawapan yang sama; ikuti arahan tepat.",
      ),
      node(
        "penyuntingan-jumlah",
        "Jumlah Jawapan",
        "Jangan berikan lebih banyak pembetulan daripada jumlah yang diminta kecuali arahan membenarkannya.",
      ),
      node(
        "penyuntingan-kejelasan",
        "Tulisan dan Kejelasan",
        "Pastikan pembetulan mudah dibaca dan tidak mengelirukan.",
      ),
      node(
        "penyuntingan-nota",
        "Nota",
        "Gunakan teknik ini untuk latihan penyuntingan Tingkatan 2 dan UASA, bukan sebagai format khusus SPM.",
      ),
    ]),
    branch("strategi", "Strategi Semakan", [
      node(
        "strategi-ejaan",
        "Semakan 1: Ejaan",
        "Semak huruf besar, ejaan standard, tanda sempang dan jarak.",
      ),
      node(
        "strategi-imbuhan",
        "Semakan 2: Imbuhan",
        "Semak awalan, akhiran, peluluhan dan penggandaan konsonan yang diperlukan.",
      ),
      node(
        "strategi-kata-tugas",
        "Semakan 3: Kata Tugas",
        "Semak dari / daripada, ialah / adalah, di / ke dan kata hubung.",
      ),
      node(
        "strategi-struktur",
        "Semakan 4: Struktur",
        "Semak subjek, predikat, objek, pelengkap dan kelengkapan ayat.",
      ),
      node(
        "strategi-makna",
        "Semakan 5: Makna",
        "Baca ayat sekali lagi dan tanya sama ada maksud yang dikehendaki masih disampaikan.",
      ),
      node(
        "strategi-kaedah",
        "Kaedah",
        "Buat bacaan kedua secara perlahan, bukan hanya menyemak sambil menulis.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "tip-uasa-teka",
        "Jangan Teka",
        "Kenal pasti kategori tatabahasa sebelum membetulkan perkataan.",
      ),
      node(
        "tip-uasa-petunjuk",
        "Cari Petunjuk",
        "Perhatikan perkataan atau frasa sebelum dan selepas bahagian yang disyaki salah.",
      ),
      node("tip-uasa-frasa", "Semak Frasa", "Bagi kata pemeri: FN → ialah • FA / FS → adalah"),
      node(
        "tip-uasa-pelaku",
        "Semak Pelaku",
        "Bagi ayat pasif, tentukan sama ada pelaku ialah orang pertama, kedua atau ketiga.",
      ),
      node(
        "tip-uasa-dasar",
        "Semak Kata Dasar",
        "Bagi kesalahan imbuhan, kenal pasti kata dasar terlebih dahulu.",
      ),
      node(
        "tip-uasa-bentuk",
        "Kekalkan Bentuk",
        "Jangan ubah kata terbitan yang diberikan kecuali diarahkan.",
      ),
      node(
        "tip-uasa-baca",
        "Baca Semula",
        "Ayat yang dibetulkan mesti gramatis, lengkap, bermakna dan setia kepada konteks asal.",
      ),
    ]),
    branch("ingat", "Ingat!", [
      node(
        "ingat-lima",
        "Lima Fokus",
        "1. Ejaan • 2. Imbuhan • 3. Kata tugas • 4. Struktur ayat • 5. Makna",
      ),
      node(
        "ingat-cepat",
        "Ingatan Cepat",
        "di + tempat → terpisah • di- + kata kerja → bercantum • dari → ATM • daripada → orang, asal, perbandingan dan bahan • ialah → FN • adalah → FA atau FS",
      ),
      node(
        "ingat-pasif",
        "Pasif",
        'Orang pertama atau kedua: "Buku itu saya baca." • Orang ketiga: "Buku itu dibaca oleh Ali."',
      ),
      node("ingat-dua-k", "Dua Huruf k", "gerak + -kan = gerakkan"),
      node(
        "ingat-akhir",
        "Semakan Akhir",
        "Tatabahasa yang betul mesti memenuhi kedua-dua syarat: bentuk yang tepat dan konteks yang sesuai.",
      ),
    ]),
  ],
};
