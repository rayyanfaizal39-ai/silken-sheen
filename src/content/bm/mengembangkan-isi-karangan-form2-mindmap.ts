import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-mengembangkan-isi-karangan";

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

export const bahasaMelayuForm2MengembangkanIsiKaranganMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "MENGEMBANGKAN ISI KARANGAN",
  summary:
    "Kemahiran Tingkatan 2 untuk mengubah satu idea utama menjadi perenggan yang matang, tersusun dan disokong oleh huraian, contoh, kesan atau cadangan yang relevan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Pengembangan Isi?",
      penerangan:
        "Pengembangan isi ialah proses menjelaskan idea utama supaya pembaca memahami sebab, cara, contoh dan kesannya. Kemahiran ini melanjutkan asas perenggan Tingkatan 1 melalui susunan I-H-C-P: Isi, Huraian, Contoh dan Penegasan.",
      langkah:
        "1. Nyatakan satu isi yang menjawab soalan • 2. Jelaskan mengapa atau bagaimana • 3. Berikan contoh khusus • 4. Terangkan kesan jika sesuai • 5. Tegaskan semula isi • 6. Semak kesinambungan ayat.",
      contoh:
        "Isi sahaja: Amalan membaca menambahkan ilmu. Dikembangkan: Amalan membaca dapat menambahkan ilmu kerana murid memperoleh pelbagai maklumat baharu. Contohnya, pembacaan buku sains membantu murid memahami fenomena alam. Jelaslah bahawa membaca memperluas pengetahuan.",
      tip: "Satu perenggan perlu berpusat pada satu isi. Pilih unsur pengembangan yang benar-benar menjelaskan isi dan bukannya menambah idea yang berlainan.",
      kesalahan:
        "Isi dibiarkan sebagai satu ayat, huraian mengulang isi, terlalu banyak isi dalam satu perenggan atau ayat tambahan tidak berkaitan dengan fokus.",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan Mengembangkan Isi",
      penerangan:
        "Isi yang berkembang menunjukkan pemahaman murid, mengukuhkan hujah dan memudahkan pembaca mengikuti pemikiran penulis. Perenggan menjadi lebih matang kerana setiap kenyataan disokong secara logik.",
      langkah:
        "1. Pastikan isi jelas • 2. Berikan alasan • 3. Tunjukkan cara atau keadaan • 4. Sokong dengan contoh • 5. Hubungkan dengan kesan • 6. Nilai sama ada pembaca akan yakin.",
      contoh:
        "Lemah: Aktiviti gotong-royong baik untuk murid. Matang: Aktiviti gotong-royong memupuk kerjasama kerana murid perlu membahagikan tugas dan menyelesaikan kerja secara berkumpulan. Kesannya, hubungan sesama murid menjadi lebih erat.",
      tip: "Panjang perenggan bukan ukuran tunggal. Perenggan yang matang mempunyai hubungan sebab, contoh dan kesan yang jelas tanpa pengulangan.",
      kesalahan:
        "Memanjangkan ayat dengan kata berlebihan, memasukkan fakta yang tidak pasti, mengejar kosa kata sukar atau menyangka banyak ayat semestinya menghasilkan huraian yang baik.",
    }),
    lesson({
      id: "teknik-5w1h",
      label: "Teknik 5W1H",
      penerangan:
        "Teknik 5W1H menggunakan enam soalan panduan: Apa, Siapa, Bila, Di mana, Mengapa dan Bagaimana. Jawapan yang relevan membantu murid mencari butiran, alasan dan cara untuk mengembangkan isi.",
      langkah:
        "1. Tulis isi utama • 2. Tanya apa yang berlaku • 3. Kenal pasti siapa yang terlibat • 4. Tentukan bila dan di mana jika penting • 5. Jelaskan mengapa • 6. Huraikan bagaimana • 7. Pilih jawapan yang paling relevan.",
      contoh:
        "Isi: Sekolah mengadakan program membaca. Apa: program NILAM • Siapa: murid dan guru • Bila: waktu yang ditetapkan • Di mana: pusat sumber • Mengapa: memupuk minat • Bagaimana: membaca dan merekod bahan. Butiran ini boleh digabungkan menjadi huraian.",
      tip: "Tidak semua enam soalan mesti dimasukkan. Untuk karangan fakta, “mengapa” dan “bagaimana” biasanya paling penting; masa serta tempat digunakan apabila membantu kejelasan.",
      kesalahan:
        "Menjawab semua soalan secara paksa, menulis jawapan sebagai senarai dalam karangan, menambah butiran rekaan yang tidak munasabah atau membiarkan 5W1H mengubah fokus isi.",
    }),
    lesson({
      id: "huraian",
      label: "Memberi Huraian",
      penerangan:
        "Huraian menerangkan isi dengan menjawab mengapa idea itu penting atau bagaimana idea itu berlaku dan dilaksanakan. Huraian mesti mempunyai hubungan terus dengan ayat isi.",
      langkah:
        "1. Baca ayat isi • 2. Tanya “mengapa?” • 3. Tanya “bagaimana?” • 4. Pilih jawapan yang paling logik • 5. Sambungkan dengan penanda yang sesuai • 6. Pastikan huraian menambah maklumat baharu.",
      contoh:
        "Isi: Murid perlu mengurus masa dengan baik. Huraian: Hal ini dikatakan demikian kerana jadual yang teratur membolehkan murid menyeimbangkan waktu belajar, berehat dan melakukan aktiviti kokurikulum.",
      tip: "Gunakan frasa seperti “Hal ini dikatakan demikian kerana”, “Dalam konteks ini” atau “Cara ini” apabila sesuai. Pelbagaikan binaan supaya penulisan tidak kaku.",
      kesalahan:
        "Mengulang isi dengan perkataan seerti, memberi alasan yang terlalu umum, menggunakan penanda huraian tanpa hubungan logik atau menghasilkan ayat terlalu panjang dan kabur.",
    }),
    lesson({
      id: "contoh",
      label: "Memberi Contoh",
      penerangan:
        "Contoh memberikan gambaran nyata tentang isi dan huraian. Contoh yang baik bersifat khusus, munasabah serta membantu pembaca melihat bagaimana idea boleh diamalkan atau berlaku.",
      langkah:
        "1. Kenal pasti perkara yang perlu dibuktikan • 2. Pilih situasi dekat dengan tema • 3. Pastikan contoh menyokong isi • 4. Mulakan dengan penanda contoh • 5. Jelaskan dalam ayat lengkap • 6. Hubungkan semula dengan huraian.",
      contoh:
        "Huraian: Murid boleh memanfaatkan masa lapang untuk membaca. Contoh: Sebagai contoh, murid boleh meminjam novel, buku ilmiah atau majalah pendidikan dari pusat sumber sekolah untuk dibaca selepas menyiapkan tugasan.",
      tip: "Satu contoh yang jelas lebih berkesan daripada beberapa contoh yang hanya disenaraikan. Gunakan “Contohnya”, “Sebagai contoh” atau “Misalnya” secara bersesuaian.",
      kesalahan:
        "Contoh terlalu umum, contoh tidak berkaitan, senarai terlalu panjang, dakwaan sukar dibuktikan atau contoh hanya mengulang tindakan dalam ayat isi.",
    }),
    lesson({
      id: "kesan",
      label: "Menjelaskan Kesan",
      penerangan:
        "Ayat kesan menerangkan hasil atau akibat daripada isi yang dibincangkan. Kesan boleh melibatkan individu, keluarga, sekolah, masyarakat atau negara mengikut skop soalan.",
      langkah:
        "1. Kenal pasti tindakan atau keadaan • 2. Tanya “apakah hasilnya?” • 3. Pilih kesan paling langsung • 4. Nyatakan pihak yang menerima kesan • 5. Gunakan hubungan sebab-akibat yang jelas • 6. Elakkan kesan melampau.",
      contoh:
        "Tindakan: Murid membaca secara konsisten. Kesan: Kesannya, kosa kata murid semakin luas dan mereka dapat menyampaikan idea dengan lebih jelas dalam penulisan.",
      tip: "Gunakan penanda seperti “Kesannya”, “Natijahnya” atau “Oleh itu” dengan tepat. Kesan perlu lahir daripada huraian sebelumnya, bukan muncul secara tiba-tiba.",
      kesalahan:
        "Kesan tidak logik, terlalu besar berbanding tindakan, mengulang huraian, mencampurkan kesan positif dan negatif tanpa penjelasan atau menggunakan “kesannya” untuk menyatakan sebab.",
    }),
    lesson({
      id: "cadangan",
      label: "Memberi Cadangan",
      penerangan:
        "Cadangan ialah tindakan membina yang dikemukakan untuk menangani isu, memperbaik keadaan atau meneruskan amalan baik. Cadangan perlu menyatakan pihak, tindakan dan cara pelaksanaan apabila sesuai.",
      langkah:
        "1. Kenal pasti isu atau matlamat • 2. Tentukan pihak bertanggungjawab • 3. Cadangkan tindakan khusus • 4. Terangkan cara pelaksanaan • 5. Nyatakan tujuan atau kesan • 6. Semak kebolehlaksanaan.",
      contoh:
        "Pihak sekolah dicadangkan memperluas program membaca dengan menyediakan sudut bacaan di setiap kelas. Kemudahan ini membolehkan murid mendapatkan bahan bacaan dengan mudah pada waktu lapang.",
      tip: "Gunakan kata seperti “hendaklah”, “wajar”, “boleh” atau “perlu” mengikut ketegasan yang dikehendaki. Cadangan mesti sepadan dengan kemampuan pihak yang disebut.",
      kesalahan:
        "Cadangan terlalu umum seperti “semua pihak perlu bertindak”, tiada pihak pelaksana, tindakan mustahil dilakukan, cadangan tidak menjawab isu atau terlalu banyak cadangan tanpa huraian.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kelemahan pengembangan isi biasanya berpunca daripada isi berulang, hubungan idea yang longgar, contoh tidak tepat dan penegasan yang tidak merumuskan perenggan.",
      langkah:
        "1. Gariskan ayat isi • 2. Labelkan Huraian, Contoh dan Penegasan • 3. Potong pengulangan • 4. Semak hubungan sebab-akibat • 5. Ganti contoh yang lemah • 6. Baca semula keseluruhan perenggan.",
      contoh:
        "Berulang: Membaca penting kerana membaca amat penting kepada murid. Dibaiki: Membaca penting kerana amalan ini memperluas pengetahuan dan membantu murid memahami pelbagai isu.",
      tip: "Gunakan ujian kaitan: setiap ayat mesti dapat menjawab soalan tentang ayat isi. Jika tidak, ayat itu mungkin tersasar atau membawa isi baharu.",
      kesalahan:
        "Isi tanpa huraian, huraian berulang, contoh tidak relevan, kesan melampau, cadangan kabur, penanda wacana salah, ayat terlalu panjang dan beberapa isi bercampur dalam satu perenggan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan I-H-C-P: Isi, Huraian, Contoh dan Penegasan. Untuk memperkaya bahagian Huraian, gunakan 5W1H dan pilih unsur sebab, cara serta kesan yang sesuai.",
      langkah:
        "1. I—nyatakan idea utama • 2. H—jawab mengapa atau bagaimana • 3. C—beri situasi khusus • 4. P—tegaskan hasil atau kepentingan • 5. Semak satu isi bagi satu perenggan.",
      contoh:
        "I: bersukan meningkatkan kesihatan • H: menguatkan tubuh dan mengurangkan tekanan • C: berjoging atau bermain badminton • P: amalan bersukan melahirkan remaja yang sihat dan cergas.",
      tip: "Hafal fungsi komponen, bukan ayat contoh. Susunan boleh disesuaikan selagi isi jelas, huraian logik, contoh relevan dan perenggan mempunyai penutup yang baik.",
      kesalahan:
        "Menulis huruf I-H-C-P dalam karangan, memaksa setiap perenggan mempunyai ayat yang sama, menghafal contoh bulat-bulat atau mengutamakan formula sehingga bahasa menjadi kaku.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, pengembangan isi perlu menepati kata tugas dan fokus soalan. Perenggan yang matang menggabungkan isi relevan, huraian logik, contoh khusus, kesan atau penegasan serta bahasa baku.",
      langkah:
        "Sebelum menulis: tandakan kata tugas, pilih isi berlainan dan bina rangka I-H-C-P. • Semasa menulis: gunakan 5W1H untuk menghuraikan serta satu isi bagi setiap perenggan. • Selepas menulis: semak fokus, kaitan ayat, bahasa dan pengulangan.",
      contoh:
        "Soalan: Huraikan faedah membaca. I: menambahkan ilmu • H: memperoleh maklumat pelbagai bidang • C: membaca buku sejarah dan sains • Kesan: pemikiran lebih luas • Penegasan: membaca membentuk murid berpengetahuan.",
      tip: "Agihkan masa untuk memahami, merangka, menulis dan menyemak. Utamakan beberapa isi yang benar-benar berkembang berbanding banyak isi yang hanya disenaraikan.",
      kesalahan:
        "Terus menulis tanpa rangka, salah kata tugas, isi bertindih, contoh terlalu umum, huraian tidak menjawab mengapa atau bagaimana, tiada penegasan dan jawapan tidak disemak.",
    }),
  ],
};
