import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-imbuhan-lanjutan";

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

export const bahasaMelayuForm2ImbuhanLanjutanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "IMBUHAN LANJUTAN",
  summary:
    "Imbuhan lanjutan melibatkan penggunaan imbuhan yang lebih kompleks untuk membentuk kata terbitan yang tepat mengikut makna, bentuk dan konteks.",
  children: [
    branch("definisi", "Definisi", [
      node(
        "definisi-maksud",
        "Maksud",
        "Imbuhan lanjutan merujuk kepada penggunaan imbuhan yang lebih kompleks dalam pembentukan kata terbitan.",
      ),
      node(
        "definisi-bidang",
        "Bidang Tatabahasa",
        "Imbuhan termasuk dalam bidang morfologi. Morfologi mengkaji pembentukan kata, pengimbuhan, kata terbitan dan perubahan pada kata dasar.",
      ),
      node(
        "definisi-kandungan",
        "Kandungan Utama",
        "Imbuhan pinjaman • imbuhan sisipan • perubahan bentuk meN- • perubahan bentuk peN- • peluluhan huruf • ejaan kata berimbuhan • pemilihan imbuhan mengikut konteks",
      ),
      node(
        "definisi-tujuan",
        "Tujuan",
        "Murid dapat mengenal pasti imbuhan dan kata dasar, menjelaskan makna terbitan, membentuk kata terbitan yang betul serta menggunakannya dalam ayat yang gramatis.",
      ),
      node(
        "definisi-nota",
        "Nota",
        "Imbuhan Lanjutan ialah tajuk pembelajaran yang menghimpunkan peraturan pengimbuhan yang lebih kompleks. Tajuk ini bukan kategori imbuhan formal yang setara dengan awalan, akhiran, apitan dan sisipan.",
      ),
    ]),
    branch("pinjaman", "Imbuhan Pinjaman", [
      node(
        "pinjaman-maksud",
        "Maksud",
        "Imbuhan pinjaman ialah unsur imbuhan yang berasal daripada bahasa lain dan digunakan dalam bahasa Melayu.",
      ),
      node(
        "pinjaman-sumber",
        "Sumber Umum",
        "Imbuhan pinjaman boleh berasal daripada bahasa Sanskrit, Arab, Yunani, Latin atau Inggeris. Murid tidak perlu menghafal sumber sejarah setiap bentuk kecuali dinyatakan dalam kurikulum.",
      ),
      node(
        "pinjaman-kegunaan",
        "Kegunaan",
        "Bentuk ini lazim digunakan dalam bahasa akademik, sains, teknologi, politik, ekonomi dan isu sosial.",
      ),
      node(
        "pinjaman-contoh",
        "Contoh Umum",
        "antirasuah • prasekolah • subtopik • multimedia • mahasiswa • profesionalisme",
      ),
      node(
        "pinjaman-ketepatan",
        "Nota Ketepatan",
        "Sesetengah bentuk yang diajarkan sebagai imbuhan pinjaman juga boleh berfungsi seperti morfem terikat atau bentuk gabungan. Gunakan pengelasan tatabahasa sekolah yang diterima.",
      ),
    ]),
    branch("awalan-pinjaman", "Awalan Pinjaman", [
      branch("awalan-pinjaman-anti", "anti-", [
        node(
          "awalan-pinjaman-anti-maksud",
          "Maksud",
          "Menunjukkan makna menentang, mencegah atau melawan.",
        ),
        node("awalan-pinjaman-anti-contoh", "Contoh", "antirasuah • antidadah • antioksidan"),
        node(
          "awalan-pinjaman-anti-nota",
          "Nota",
          "Antioksidan ialah istilah sains yang telah mantap dan tidak semata-mata membawa makna tentangan dalam penggunaan harian.",
        ),
      ]),
      branch("awalan-pinjaman-pro", "pro-", [
        node(
          "awalan-pinjaman-pro-maksud",
          "Maksud",
          "Menunjukkan sokongan atau kecenderungan kepada sesuatu.",
        ),
        node("awalan-pinjaman-pro-contoh", "Contoh", "prokerajaan • proaktif • prokemajuan"),
        node(
          "awalan-pinjaman-pro-nota",
          "Nota",
          "Gunakan hanya bentuk yang telah diterima dan sesuai dengan konteks; jangan memaksa gabungan yang janggal.",
        ),
      ]),
      branch("awalan-pinjaman-pra", "pra-", [
        node(
          "awalan-pinjaman-pra-maksud",
          "Maksud",
          "Menunjukkan masa sebelum atau peringkat yang mendahului.",
        ),
        node(
          "awalan-pinjaman-pra-contoh",
          "Contoh",
          "prasekolah • prasejarah • prabayar • prasyarat",
        ),
      ]),
      branch("awalan-pinjaman-sub", "sub-", [
        node(
          "awalan-pinjaman-sub-maksud",
          "Maksud",
          "Menunjukkan bahagian di bawah, lebih kecil atau pecahan sekunder.",
        ),
        node("awalan-pinjaman-sub-contoh", "Contoh Telus", "subtopik • subkategori • subseksyen"),
        node(
          "awalan-pinjaman-sub-nota",
          "Nota Ketepatan",
          'Jangan menganalisis "subjek" secara mekanikal sebagai sub- + jek dalam morfologi sekolah moden.',
        ),
      ]),
      branch("awalan-pinjaman-multi", "multi-", [
        node(
          "awalan-pinjaman-multi-maksud",
          "Maksud",
          "Menunjukkan bilangan yang banyak atau pelbagai.",
        ),
        node("awalan-pinjaman-multi-contoh", "Contoh", "multimedia • multibahasa • multinasional"),
      ]),
      branch("awalan-pinjaman-maha", "maha-", [
        node(
          "awalan-pinjaman-maha-maksud",
          "Maksud",
          "Menunjukkan makna besar, agung atau paling tinggi.",
        ),
        node("awalan-pinjaman-maha-contoh", "Contoh", "mahasiswa • mahaguru • Mahakuasa"),
        node(
          "awalan-pinjaman-maha-nota",
          "Ejaan dan huruf besar bergantung pada penggunaan sebagai kata umum, gelaran atau rujukan kepada Tuhan.",
        ),
      ]),
    ]),
    branch("akhiran-pinjaman", "Akhiran Pinjaman", [
      branch("akhiran-pinjaman-wan", "-wan", [
        node(
          "akhiran-pinjaman-wan-fungsi",
          "Fungsi",
          "Lazimnya membentuk kata nama bagi orang yang berkaitan dengan bidang atau kegiatan tertentu.",
        ),
        node("akhiran-pinjaman-wan-contoh", "Contoh", "ilmuwan • usahawan • sukarelawan"),
        node(
          "akhiran-pinjaman-wan-nota",
          "Nota",
          "Akhiran ini tidak boleh ditambahkan secara bebas pada setiap kata dasar.",
        ),
      ]),
      branch("akhiran-pinjaman-wati", "-wati", [
        node(
          "akhiran-pinjaman-wati-fungsi",
          "Fungsi",
          "Secara tradisional digunakan dalam sesetengah kata nama diri perempuan.",
        ),
        node("akhiran-pinjaman-wati-contoh", "Contoh", "seniwati • olahragawati"),
        node(
          "akhiran-pinjaman-wati-nota",
          "Nota",
          "Penggunaan sebenar dalam bahasa Melayu moden boleh berubah mengikut konteks.",
        ),
      ]),
      branch("akhiran-pinjaman-man", "-man", [
        node(
          "akhiran-pinjaman-man-fungsi",
          "Fungsi",
          "Hadir dalam bilangan kata pinjaman yang terhad.",
        ),
        node("akhiran-pinjaman-man-contoh", "Contoh Mantap", "seniman • budiman"),
        node(
          "akhiran-pinjaman-man-nota",
          "Nota",
          "Gunakan kata yang standard dan lazim sahaja; jangan mencipta bentuk terbitan baharu.",
        ),
      ]),
      branch("akhiran-pinjaman-isme", "-isme", [
        node(
          "akhiran-pinjaman-isme-fungsi",
          "Fungsi",
          "Membentuk kata nama bagi sistem, kepercayaan, gagasan atau gerakan.",
        ),
        node(
          "akhiran-pinjaman-isme-contoh",
          "Contoh",
          "nasionalisme • patriotisme • profesionalisme",
        ),
      ]),
      branch("akhiran-pinjaman-isasi", "-isasi", [
        node(
          "akhiran-pinjaman-isasi-fungsi",
          "Fungsi",
          "Membentuk kata nama yang merujuk kepada proses.",
        ),
        node("akhiran-pinjaman-isasi-contoh", "Contoh", "globalisasi • digitalisasi • modenisasi"),
      ]),
      branch("akhiran-pinjaman-ik", "-ik", [
        node(
          "akhiran-pinjaman-ik-fungsi",
          "Fungsi",
          "Boleh hadir dalam kata adjektif atau istilah berkaitan sesuatu bidang.",
        ),
        node("akhiran-pinjaman-ik-contoh", "Contoh", "saintifik • akademik • ekonomik"),
      ]),
      node(
        "akhiran-pinjaman-ketepatan",
        "Nota Ketepatan",
        "Gunakan hanya perkataan yang telah mantap. Jangan anggap setiap akhiran pinjaman produktif atau boleh digabungkan dengan sebarang kata dasar.",
      ),
    ]),
    branch("sisipan", "Imbuhan Sisipan", [
      node(
        "sisipan-maksud",
        "Maksud",
        "Imbuhan sisipan ialah imbuhan yang hadir di tengah kata dasar.",
      ),
      branch("sisipan-el", "Sisipan -el-", [
        node("sisipan-el-tapak", "Contoh 1", "tapak → telapak"),
        node("sisipan-el-tunjuk", "Contoh 2", "tunjuk → telunjuk"),
        node(
          "sisipan-el-nota",
          "Nota",
          "Kedua-duanya ialah bentuk yang telah mantap dalam bahasa Melayu.",
        ),
      ]),
      branch("sisipan-em", "Sisipan -em-", [
        node("sisipan-em-guruh", "Contoh 1", "guruh → gemuruh"),
        node("sisipan-em-gilang", "Contoh 2", "gilang → gemilang"),
      ]),
      branch("sisipan-er", "Sisipan -er-", [
        node("sisipan-er-gigi", "Contoh 1", "gigi → gerigi"),
        node("sisipan-er-suling", "Contoh 2", "suling → seruling"),
      ]),
      node(
        "sisipan-in",
        "Sisipan -in-",
        "Bentuk ini jarang dan hanya perlu dikenal pasti melalui contoh yang disahkan oleh sumber KSSM. Jangan mencipta contoh yang tidak pasti.",
      ),
      node(
        "sisipan-ciri",
        "Ciri Penting",
        "Sisipan tidak begitu produktif dalam bahasa Melayu moden. Banyak contoh ialah perkataan warisan atau bentuk yang telah mantap.",
      ),
      node(
        "sisipan-nota",
        "Nota",
        "Murid biasanya perlu mengenal pasti sisipan, menentukan kata dasar dan memahami makna terbitan. Sisipan -el-, -em- atau -er- tidak boleh dimasukkan secara bebas ke dalam sebarang kata dasar.",
      ),
    ]),
    branch("peluluhan", "Peluluhan Huruf", [
      node(
        "peluluhan-maksud",
        "Maksud",
        "Peluluhan berlaku apabila konsonan awal kata dasar gugur selepas menerima bentuk tertentu daripada imbuhan meN- atau peN-.",
      ),
      node(
        "peluluhan-huruf",
        "Huruf yang Lazim Terlibat",
        "Fokus umum peringkat sekolah ialah huruf k, p, s dan t.",
      ),
      branch("peluluhan-k", "Huruf k", [
        node("peluluhan-k-kaji", "Kekal", "kaji → mengkaji"),
        node("peluluhan-k-karang", "Luluh", "karang → mengarang"),
        node(
          "peluluhan-k-nota",
          "Nota",
          "Perbandingan ini menunjukkan bahawa huruf awal sahaja tidak menentukan peluluhan; bentuk standard kata mesti dirujuk.",
        ),
      ]),
      branch("peluluhan-p", "Huruf p", [
        node("peluluhan-p-pukul", "Contoh 1", "pukul → memukul"),
        node("peluluhan-p-pilih", "Contoh 2", "pilih → memilih"),
      ]),
      branch("peluluhan-s", "Huruf s", [
        node("peluluhan-s-sapu", "Contoh 1", "sapu → menyapu"),
        node("peluluhan-s-susun", "Contoh 2", "susun → menyusun"),
      ]),
      branch("peluluhan-t", "Huruf t", [
        node("peluluhan-t-tulis", "Contoh 1", "tulis → menulis"),
        node("peluluhan-t-tarik", "Contoh 2", "tarik → menarik"),
      ]),
      node(
        "peluluhan-pinjaman",
        "Kata Pinjaman dan Gugus Konsonan",
        "Sesetengah kata pinjaman atau kata yang bermula dengan gugus konsonan mengekalkan konsonan awal: memproses • mempraktikkan • menstrukturkan • mengkritik. Semak bentuk melalui ejaan standard.",
      ),
      node(
        "peluluhan-ketepatan",
        "Nota Ketepatan",
        "Peluluhan bukan peraturan yang bergantung pada huruf pertama semata-mata. Struktur bunyi, asal kata dan bentuk standard yang diterima turut menentukan hasilnya.",
      ),
    ]),
    branch("men", "Perubahan Bentuk meN-", [
      node(
        "men-bentuk",
        "Bentuk Utama",
        "Awalan meN- boleh hadir sebagai me-, mem-, men-, meng-, meny- atau menge-.",
      ),
      node(
        "men-me",
        "me-",
        "Antara contoh standard di hadapan konsonan tertentu ialah melawat, merasa dan meyakini.",
      ),
      node("men-mem", "mem-", "membaca • membawa • memfitnah • memproses"),
      node("men-men", "men-", "mendaki • mencari • menulis • menziarahi"),
      node("men-meng", "meng-", "mengajar • mengira • menghantar • mengkritik"),
      node("men-meny", "meny-", "menyapu • menyusun • menyertai"),
      branch("men-menge", "menge-", [
        node(
          "men-menge-fungsi",
          "Penggunaan",
          "Bentuk menge- sering digunakan dengan kata dasar satu suku kata tertentu.",
        ),
        node("men-menge-cat", "Contoh 1", "cat → mengecat"),
        node("men-menge-bom", "Contoh 2", "bom → mengebom"),
        node("men-menge-sah", "Contoh 3", "sah → mengesahkan"),
      ]),
      node(
        "men-nota",
        "Nota",
        "Jangan menganggap jadual huruf sebagai rumus yang tidak pernah berubah. Kata dasar dan ejaan terbitan standard ialah rujukan akhir.",
      ),
    ]),
    branch("pen", "Perubahan Bentuk peN-", [
      node(
        "pen-fungsi",
        "Fungsi Umum",
        "peN- lazimnya membentuk kata nama yang merujuk kepada orang, pelaku, alat, proses atau hasil, bergantung pada kata dan konteks.",
      ),
      node("pen-bentuk", "Bentuk Utama", "pe- • pem- • pen- • peng- • peny- • penge-"),
      node(
        "pen-pelaku",
        "Contoh Pelaku",
        "baca → pembaca • tulis → penulis • ajar → pengajar • sapu → penyapu",
      ),
      node(
        "pen-proses",
        "Contoh Proses atau Hasil",
        "proses → pemprosesan • bangun → pembangunan • hasil → penghasilan • susun → penyusunan",
      ),
      node(
        "pen-hubungan",
        "Hubungan dengan meN-",
        "memproses → pemproses • mengajar → pengajar • menulis → penulis",
      ),
      branch("pen-beza", "Bezakan Fungsi", [
        node("pen-beza-pemproses", "pemproses", "Orang atau alat yang memproses."),
        node("pen-beza-pemprosesan", "pemprosesan", "Proses memproses."),
        node("pen-beza-proses", "proses", "Kata dasar dengan fungsi dan maknanya sendiri."),
      ]),
      node(
        "pen-ketepatan",
        "Nota Ketepatan",
        "Bukan setiap kata kerja meN- menghasilkan satu kata nama peN- yang dapat diramal dengan makna yang sama. Gunakan bentuk yang telah diterima dalam penggunaan standard.",
      ),
    ]),
    branch("dua-k", "Dua Huruf k", [
      node(
        "dua-k-prinsip",
        "Prinsip",
        "Apabila kata dasar yang berakhir dengan huruf k menerima akhiran -kan, huruf k pada akhir kata dasar dan huruf k pada awal -kan dikekalkan dalam ejaan.",
      ),
      branch("dua-k-asas", "Contoh Asas", [
        node("dua-k-asas-dasar", "Kata Dasar", "gerak"),
        node("dua-k-asas-akhiran", "Akhiran", "-kan"),
        node("dua-k-asas-hasil", "Hasil", "gerakkan"),
        node("dua-k-asas-men", "Dengan meN-", "menggerakkan"),
      ]),
      node(
        "dua-k-lain",
        "Contoh Lain",
        "masuk + -kan → masukkan • duduk + -kan → dudukkan • rosak + -kan → rosakkan",
      ),
      branch("dua-k-kesalahan", "Kesalahan Lazim", [
        node("dua-k-kesalahan-1", "Salah 1", "menggerakan"),
        node("dua-k-kesalahan-2", "Betul 1", "menggerakkan"),
        node("dua-k-kesalahan-3", "Salah 2", "memasukan"),
        node("dua-k-kesalahan-4", "Betul 2", "memasukkan"),
      ]),
      node(
        "dua-k-ketepatan",
        "Nota Ketepatan",
        "Peraturan ini bukan hukum umum untuk setiap perkataan yang mengandungi huruf k. Peraturan ini khusus pada sempadan kata dasar berakhir k dengan akhiran -kan.",
      ),
    ]),
    branch("sempang", "Tanda Sempang", [
      node(
        "sempang-khas",
        "Dengan Kata Nama Khas",
        "Tanda sempang digunakan apabila bentuk terikat tertentu seperti anti- atau pro- digabungkan dengan kata nama khas: anti-Amerika • pro-Malaysia.",
      ),
      node(
        "sempang-am",
        "Dengan Kata Nama Am",
        "Gabungan yang mantap dengan kata nama am biasanya ditulis rapat: antidadah • antirasuah • prasekolah • multibahasa.",
      ),
      node(
        "sempang-besar",
        "Huruf Besar",
        "Kata nama khas mengekalkan huruf besarnya, contohnya pro-Asia.",
      ),
      branch("sempang-salah", "Elakkan Bentuk Salah", [
        node("sempang-salah-jarak", "Salah 1", "anti Amerika"),
        node("sempang-salah-rapat", "Salah 2", "antiamerika"),
        node("sempang-salah-betul", "Betul", "anti-Amerika"),
      ]),
      node(
        "sempang-nota",
        "Nota",
        "Ikuti peraturan ejaan baku bahasa Melayu. Jangan menggunakan tanda sempang secara automatik selepas setiap awalan pinjaman.",
      ),
    ]),
    branch("pemilihan", "Pemilihan Imbuhan", [
      node(
        "pemilihan-makna",
        "Berdasarkan Makna",
        "urus → mengurus → menguruskan → pengurus → pengurusan. Setiap bentuk membawa fungsi dan makna yang berbeza serta tidak boleh saling menggantikan.",
      ),
      node(
        "pemilihan-golongan",
        "Berdasarkan Golongan Kata",
        "urus ialah kata dasar; mengurus ialah kata kerja; pengurusan ialah kata nama proses; pengurus ialah kata nama orang.",
      ),
      branch("pemilihan-struktur", "Berdasarkan Struktur Ayat", [
        node(
          "pemilihan-struktur-kerja",
          "Kata Kerja",
          '"Pihak sekolah menguruskan program itu." Kata kerja menguruskan menerima objek "program itu".',
        ),
        node(
          "pemilihan-struktur-nama",
          "Kata Nama",
          '"Pengurusan program itu sangat teratur." Perkataan pengurusan berfungsi sebagai kata nama.',
        ),
      ]),
      branch("pemilihan-soalan", "Kekalkan Bentuk Soalan", [
        node("pemilihan-soalan-diberi", "Kata Diberi", "menguruskan"),
        node("pemilihan-soalan-guna", "Gunakan", "menguruskan"),
        node("pemilihan-soalan-jangan", "Jangan Tukar kepada", "pengurusan"),
      ]),
      node(
        "pemilihan-konteks",
        "Konteks",
        "Bentuk terbitan yang mungkin wujud secara tatabahasa masih boleh menjadi tidak sesuai dalam sesuatu ayat. Makna dan sintaksis mesti diperiksa bersama.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      branch("kesalahan-k", "Satu Huruf k Sahaja", [
        node("kesalahan-k-salah", "Salah", "menggerakan"),
        node("kesalahan-k-betul", "Betul", "menggerakkan"),
      ]),
      branch("kesalahan-ejaan", "Salah Ejaan Kata Terbitan", [
        node("kesalahan-ejaan-salah", "Salah", "didominassi"),
        node("kesalahan-ejaan-betul", "Betul", "didominasi"),
        node("kesalahan-ejaan-nota", "Nota", "Ejaan kata pinjaman standard mesti dikekalkan."),
      ]),
      branch("kesalahan-memper", "Salah Bentuk memper-...-kan", [
        node("kesalahan-memper-salah", "Salah", "memperuntukan"),
        node("kesalahan-memper-betul", "Bentuk Standard bagi Maksud Ini", "memperuntukkan"),
        node(
          "kesalahan-memper-nota",
          "Nota",
          "Bentuk yang tepat bergantung pada kata dasar dan maksud yang hendak disampaikan.",
        ),
      ]),
      branch("kesalahan-luluh", "Salah Peluluhan", [
        node("kesalahan-luluh-pukul-salah", "Salah 1", "mempukul"),
        node("kesalahan-luluh-pukul-betul", "Betul 1", "memukul"),
        node("kesalahan-luluh-tulis-salah", "Salah 2", "mentulis"),
        node("kesalahan-luluh-tulis-betul", "Betul 2", "menulis"),
      ]),
      branch("kesalahan-asli", "Tidak Meluluhkan Kata Asli", [
        node("kesalahan-asli-salah", "Salah", "mengkarang"),
        node("kesalahan-asli-betul", "Betul", "mengarang"),
        node(
          "kesalahan-asli-kaji",
          "Pengecualian Penting",
          "mengkaji ialah bentuk yang betul dan tidak boleh ditandai sebagai kesalahan.",
        ),
      ]),
      branch("kesalahan-pinjaman", "Meluluhkan Kata Pinjaman secara Salah", [
        node("kesalahan-pinjaman-salah", "Salah", "memroses"),
        node("kesalahan-pinjaman-betul", "Betul", "memproses"),
      ]),
      branch("kesalahan-tukar", "Menukar Imbuhan yang Diberikan", [
        node("kesalahan-tukar-diberi", "Kata Diberi", "menguruskan"),
        node("kesalahan-tukar-salah", "Jawapan Salah", "pengurusan"),
        node(
          "kesalahan-tukar-sebab",
          "Sebab",
          "Imbuhan dan golongan kata telah diubah dalam tugasan membina ayat.",
        ),
      ]),
      branch("kesalahan-sempang", "Salah Tanda Sempang", [
        node("kesalahan-sempang-salah-1", "Salah 1", "anti Malaysia"),
        node("kesalahan-sempang-salah-2", "Salah 2", "antimalaysia"),
        node("kesalahan-sempang-betul", "Betul", "anti-Malaysia"),
      ]),
      node(
        "kesalahan-konteks",
        "Menggunakan Imbuhan Tanpa Konteks",
        "Bentuk yang janggal tidak boleh diterima hanya kerana imbuhan telah ditambahkan. Sentiasa semak makna, golongan kata, struktur ayat dan ejaan standard.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("tip-uasa-dasar", "Cari Kata Dasar", "menggerakkan → gerak"),
      node("tip-uasa-imbuhan", "Kenal Pasti Imbuhan", "meng-...-kan"),
      node(
        "tip-uasa-golongan",
        "Tentukan Golongan Kata",
        "Semak sama ada kata terbitan berfungsi sebagai kata kerja, kata nama, kata adjektif atau golongan lain yang diterima.",
      ),
      node(
        "tip-uasa-luluh",
        "Semak Peluluhan",
        "Tentukan sama ada konsonan awal gugur, kekal atau berubah mengikut bentuk standard.",
      ),
      node(
        "tip-uasa-ejaan",
        "Semak Ejaan",
        "Beri perhatian kepada dua huruf k sebelum -kan, awalan di- yang dirapatkan dengan kata kerja, tanda sempang imbuhan pinjaman bersama kata nama khas dan ejaan baku kata pinjaman.",
      ),
      node(
        "tip-uasa-kekal",
        "Kekalkan Bentuk Kata",
        "Dalam tugasan membina ayat, gunakan bentuk kata terbitan yang diberikan dengan tepat.",
      ),
      node(
        "tip-uasa-ayat",
        "Bina Ayat Gramatis",
        "Ayat mesti menunjukkan makna perkataan dengan jelas dan menggunakan struktur yang gramatis.",
      ),
      node(
        "tip-uasa-istilah",
        "Guna Istilah UASA",
        "Gunakan Tip UASA dan jangan menjadikan SPM sebagai kerangka utama pelajaran Tingkatan 2.",
      ),
    ]),
    branch("ingat", "Ingat!", [
      node(
        "ingat-semakan",
        "Tiga Semakan",
        "Sebelum menggunakan kata terbitan, semak: 1. Imbuhan 2. Ejaan 3. Konteks",
      ),
      node(
        "ingat-luluh",
        "Peluluhan",
        "Huruf k, p, s dan t boleh gugur dalam kata dasar asli tertentu selepas menerima meN- atau peN-.",
      ),
      node(
        "ingat-pinjaman",
        "Kata Pinjaman",
        "Konsonan awal kata pinjaman atau gugus konsonan boleh kekal, contohnya proses → memproses.",
      ),
      node(
        "ingat-dua-k",
        "Dua Huruf k",
        "Kata dasar berakhir k + -kan = kk. Contoh: gerak + -kan = gerakkan.",
      ),
      node(
        "ingat-sempang",
        "Tanda Sempang",
        "Awalan pinjaman + kata nama khas = tanda sempang. Contoh: pro-Malaysia.",
      ),
      node(
        "ingat-bentuk",
        "Jangan Tukar Bentuk",
        "Jika kata yang diberikan ialah menguruskan, gunakan menguruskan dan jangan menggantikannya dengan pengurusan.",
      ),
    ]),
  ],
};
