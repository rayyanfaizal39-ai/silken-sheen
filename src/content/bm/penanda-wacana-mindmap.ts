import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-penanda-wacana";

function node(id: string, label: string, summary: string): MindNode {
  return { id: `${PREFIX}-${id}`, label, summary };
}

type LessonBranch = {
  id: string;
  label: string;
  penerangan: string;
  senarai: string;
  contoh: string;
  situasi: string;
  kesalahan: string;
  senaraiLabel?: string;
};

function lesson({
  id,
  label,
  penerangan,
  senarai,
  contoh,
  situasi,
  kesalahan,
  senaraiLabel = "Senarai Penanda Wacana",
}: LessonBranch): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    children: [
      node(`${id}-penerangan`, "Penerangan", penerangan),
      node(`${id}-senarai`, senaraiLabel, senarai),
      node(`${id}-contoh`, "Contoh Ayat", contoh),
      node(`${id}-situasi`, "Situasi Penggunaan", situasi),
      node(`${id}-kesalahan`, "Kesalahan Lazim", kesalahan),
    ],
  };
}

export const bahasaMelayuPenandaWacanaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PENANDA WACANA",
  summary:
    "Perkataan atau rangkaian perkataan yang menghubungkan idea, ayat dan perenggan supaya penulisan menjadi tersusun, lancar dan mudah difahami.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Penanda Wacana?",
      penerangan:
        "Penanda wacana ialah perkataan atau rangkaian perkataan yang menunjukkan hubungan antara idea, ayat atau perenggan. Penanda wacana membantu pembaca mengikuti perkembangan fikiran penulis. Penanda wacana berbeza daripada kata hubung yang lazimnya menghubungkan kata, frasa atau klausa.",
      senarai:
        "Antara fungsi utama: memulakan idea • menambah idea • membandingkan atau mempertentangkan idea • menunjukkan sebab dan akibat • memberikan contoh • membuat kesimpulan.",
      contoh:
        "Murid perlu mengurus masa dengan baik. Selain itu, mereka hendaklah memberikan perhatian ketika guru mengajar.",
      situasi:
        "Digunakan dalam pelbagai penulisan seperti karangan, ulasan, laporan, rumusan dan penulisan umum untuk memperlihatkan hubungan yang jelas antara idea.",
      kesalahan:
        "Menganggap setiap kata hubung ialah penanda wacana, memulakan setiap ayat dengan penanda wacana atau menggunakan penanda tanpa memahami fungsinya.",
      senaraiLabel: "Fungsi Utama",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan Penanda Wacana",
      penerangan:
        "Penanda wacana menjadikan karangan lebih koheren, iaitu idea saling berkaitan dan mudah diikuti. Penggunaannya membantu menyusun isi, memperjelas hubungan makna dan mengelakkan penulisan kelihatan terputus-putus.",
      senarai:
        "Menghubungkan idea • menyusun perenggan • melancarkan penulisan • memperjelas maksud • memandu pembaca • menunjukkan perkembangan hujah.",
      contoh:
        "Aktiviti gotong-royong dapat membersihkan kawasan sekolah. Di samping itu, aktiviti ini dapat memupuk semangat bekerjasama dalam kalangan murid.",
      situasi:
        "Diperlukan apabila penulis bergerak daripada satu isi kepada isi seterusnya atau mahu menunjukkan hubungan khusus seperti tambahan, perbandingan, sebab, akibat dan contoh.",
      kesalahan:
        "Menggunakan terlalu banyak penanda sehingga ayat kedengaran tidak semula jadi atau tidak menggunakan penanda langsung sehingga hubungan idea menjadi kabur.",
      senaraiLabel: "Manfaat dalam Penulisan",
    }),
    lesson({
      id: "memulakan",
      label: "Penanda Wacana untuk Memulakan Idea",
      penerangan:
        "Penanda ini memperkenalkan tema, situasi atau isi yang hendak dibincangkan. Pilih penanda berdasarkan kedudukan idea dan konteks karangan.",
      senarai:
        "Pada masa kini • Dewasa ini • Sejak akhir-akhir ini • Antara perkara yang perlu diberikan perhatian ialah • Salah satu langkah yang boleh dilakukan ialah • Pertama.",
      contoh:
        "Pada masa kini, penggunaan teknologi dalam pembelajaran semakin meluas. • Salah satu langkah menjaga kebersihan sekolah ialah membuang sampah ke dalam tong.",
      situasi:
        "Digunakan pada permulaan pendahuluan atau ketika memperkenalkan isi pertama. Penanda masa seperti “Pada masa kini” hanya sesuai jika tajuk berkaitan keadaan semasa.",
      kesalahan:
        "Menggunakan “Selain itu” bagi isi pertama tanpa idea sebelumnya, memaksa ungkapan masa pada tajuk yang tidak berkaitan atau mengulang pembukaan sama dalam setiap perenggan.",
    }),
    lesson({
      id: "menambah",
      label: "Penanda Wacana untuk Menambah Idea",
      penerangan:
        "Penanda ini menambahkan isi atau maklumat yang menyokong idea sebelumnya. Idea baharu perlu mempunyai hubungan yang jelas dengan fokus perbincangan.",
      senarai: "Selain itu • Di samping itu • Tambahan pula • Seterusnya • Malahan • Bahkan.",
      contoh:
        "Membaca dapat menambahkan ilmu pengetahuan. Selain itu, amalan ini dapat memperluas kosa kata murid. • Aktiviti sukan menyihatkan badan. Tambahan pula, aktiviti ini memupuk disiplin.",
      situasi:
        "Digunakan ketika memperkenalkan isi kedua dan seterusnya atau menambah huraian yang menyokong idea terdahulu.",
      kesalahan:
        "Menggabungkan dua penanda seperti “Selain itu, tambahan pula”, menggunakannya untuk menunjukkan pertentangan atau mengulang penanda yang sama sepanjang karangan.",
    }),
    lesson({
      id: "membandingkan",
      label: "Penanda Wacana untuk Membandingkan Idea",
      penerangan:
        "Penanda ini menunjukkan persamaan, perbezaan atau pertentangan antara dua idea. Kedua-dua perkara yang dibandingkan mestilah jelas.",
      senarai:
        "Sebaliknya • Namun begitu • Walau bagaimanapun • Berbeza dengan • Jika dibandingkan dengan • Dalam pada itu • Demikian juga.",
      contoh:
        "Membaca bahan ilmiah menambahkan pengetahuan. Sebaliknya, membaca bahan yang tidak bermutu boleh membuang masa. • Berbeza dengan pembelajaran bersendirian, pembelajaran berkumpulan membolehkan murid bertukar-tukar pendapat.",
      situasi:
        "Digunakan apabila menghuraikan kebaikan dan keburukan, persamaan dan perbezaan, perubahan keadaan atau dua pandangan yang bertentangan.",
      kesalahan:
        "Menggunakan “Sebaliknya” apabila tiada pertentangan, membandingkan perkara yang tidak setara atau menulis satu bahagian perbandingan sahaja.",
    }),
    lesson({
      id: "sebab-akibat",
      label: "Penanda Wacana untuk Menunjukkan Sebab dan Akibat",
      penerangan:
        "Penanda sebab menerangkan punca sesuatu keadaan, manakala penanda akibat menunjukkan hasil atau kesannya. Murid perlu membezakan arah hubungan antara kedua-duanya.",
      senarai:
        "Sebab: Hal ini demikian kerana • Hal ini berlaku kerana • Hal ini disebabkan oleh. Akibat: Oleh itu • Dengan itu • Akibatnya • Kesannya • Justeru • Sehubungan dengan itu.",
      contoh:
        "Murid perlu bersarapan sebelum ke sekolah. Hal ini demikian kerana sarapan membekalkan tenaga untuk belajar. • Amir mengulang kaji secara teratur. Oleh itu, dia dapat menjawab soalan dengan yakin.",
      situasi:
        "Digunakan untuk menghuraikan mengapa sesuatu berlaku, menerangkan kesan tindakan atau menghubungkan isi dengan hasilnya.",
      kesalahan:
        "Menggunakan penanda akibat untuk memperkenalkan sebab, menulis “kerana” dan “oleh itu” secara bertindih dalam hubungan yang sama atau menyatakan akibat yang tidak logik.",
    }),
    lesson({
      id: "contoh",
      label: "Penanda Wacana untuk Memberi Contoh",
      penerangan:
        "Penanda ini memperkenalkan contoh khusus yang menyokong isi atau huraian. Contoh perlu relevan, jelas dan mudah difahami.",
      senarai: "Sebagai contoh • Contohnya • Misalnya • Antaranya • Sebagai bukti.",
      contoh:
        "Murid boleh menggunakan masa lapang dengan berfaedah. Sebagai contoh, mereka boleh membaca buku di pusat sumber. • Pelbagai aktiviti menyihatkan boleh dilakukan, misalnya berjoging dan berbasikal.",
      situasi:
        "Digunakan selepas ayat isi atau huraian apabila penulis mahu memberikan situasi, tindakan atau bukti yang lebih khusus.",
      kesalahan:
        "Menggunakan “sebagai contoh” dan “contohnya” serentak, memberikan contoh yang tidak menyokong isi atau menulis contoh terlalu umum.",
    }),
    lesson({
      id: "kesimpulan",
      label: "Penanda Wacana untuk Membuat Kesimpulan",
      penerangan:
        "Penanda ini memperkenalkan rumusan, penegasan atau mesej akhir. Kesimpulan perlu kembali kepada fokus karangan dan tidak membawa isi baharu.",
      senarai: "Kesimpulannya • Tegasnya • Jelaslah bahawa • Secara keseluruhannya • Akhir kata.",
      contoh:
        "Kesimpulannya, semua pihak perlu bekerjasama untuk menjaga kebersihan alam sekitar. • Tegasnya, amalan membaca memberikan pelbagai manfaat kepada murid.",
      situasi:
        "Digunakan pada perenggan penutup atau sebagai penegasan ringkas pada akhir perenggan isi apabila sesuai.",
      kesalahan:
        "Menggunakan penanda kesimpulan untuk menambah isi, mengulang semua isi satu demi satu atau memperkenalkan cadangan yang tidak berkaitan.",
    }),
    lesson({
      id: "kesalahan",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan berlaku apabila penanda wacana dipilih berdasarkan hafalan, bukan hubungan makna. Penanda yang salah boleh mengubah atau mengaburkan maksud ayat.",
      senarai:
        "Penanda berulang • dua penanda bertindih • salah konteks • terlalu banyak penanda • tiada hubungan antara idea • tanda koma diabaikan • penggunaan kosa kata yang tidak difahami.",
      contoh:
        "Salah: Selain itu, tambahan pula, murid perlu membaca. Betul: Selain itu, murid perlu membaca. • Salah: Ali rajin belajar. Sebaliknya, dia berjaya. Betul: Ali rajin belajar. Oleh itu, dia berjaya.",
      situasi:
        "Semak selepas menulis setiap perenggan dan ketika semakan akhir. Tanya sama ada hubungan yang dimaksudkan ialah tambahan, perbandingan, sebab, akibat, contoh atau kesimpulan.",
      kesalahan:
        "Menganggap penanda yang sukar sentiasa lebih baik, menukar penanda tanpa memeriksa maksud atau percaya bahawa penggunaan banyak penanda meningkatkan kualiti secara automatik.",
      senaraiLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan formula M-T-B-S-A-C-K: Mula, Tambah, Banding, Sebab, Akibat, Contoh dan Kesimpulan. Formula ini membantu memilih fungsi sebelum memilih perkataan.",
      senarai:
        "Mula → Pada masa kini • Tambah → Selain itu • Banding → Sebaliknya • Sebab → Hal ini demikian kerana • Akibat → Oleh itu • Contoh → Sebagai contoh • Kesimpulan → Kesimpulannya.",
      contoh:
        "Isi: Murid perlu membaca. Sebab: Hal ini demikian kerana membaca menambahkan ilmu. Contoh: Sebagai contoh, murid boleh membaca buku ilmiah. Akibat: Oleh itu, pengetahuan mereka akan bertambah.",
      situasi:
        "Gunakan ketika membina rangka, mengembangkan isi dan menyemak hubungan antara ayat. Hafal fungsi setiap kumpulan, bukan satu senarai panjang tanpa konteks.",
      kesalahan:
        "Memilih penanda hanya kerana huruf formula, menghafal ayat contoh bulat-bulat atau memaksa setiap ayat menggunakan penanda wacana.",
      senaraiLabel: "Formula M-T-B-S-A-C-K",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, penanda wacana membantu menyusun jawapan, tetapi ketepatan isi dan bahasa tetap penting. Penanda perlu dipilih berdasarkan hubungan sebenar antara idea.",
      senarai:
        "Sebelum menulis: tentukan fungsi • Semasa menulis: pilih penanda yang tepat dan pelbagai • Selepas menulis: semak konteks, pengulangan, tanda baca dan kelancaran.",
      contoh:
        "Salah satu langkah menjaga kesihatan ialah bersenam secara berkala. Hal ini demikian kerana senaman dapat menguatkan tubuh. Sebagai contoh, murid boleh berjoging pada waktu petang. Oleh itu, aktiviti fizikal perlu dijadikan amalan.",
      situasi:
        "Gunakan dalam pendahuluan, pengembangan isi dan penutup mengikut keperluan. Baca semula perenggan tanpa berhenti untuk memastikan aliran idea kedengaran semula jadi.",
      kesalahan:
        "Mengulang “selain itu” dalam setiap perenggan, menggunakan penanda aras tinggi tanpa memahami maksud, mengabaikan tanda koma atau menumpukan penanda sehingga isi tidak dihuraikan.",
      senaraiLabel: "Langkah UASA",
    }),
  ],
};
