import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch3-nutrisi.png";

export const scienceF2C3InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 3,
  blogHighlight: { title: "Blog Sains — Makanan Angkasawan", body: "Makanan angkasa mesti berkhasiat, ringan, padat dan selamat selama berbulan-bulan tanpa penyejukan. Pengeringan beku menyingkirkan air sambil mengekalkan kebanyakan nilai nutrien.", imagePath: chapterImage },
  keywords: ["Karbohidrat", "Protein", "Lemak", "Vitamin", "Mineral", "Pelawas", "Gizi seimbang", "Pencernaan", "Enzim", "Vilus"],
  sections: [
    {
      number: "3.1", title: "Kelas Makanan", intro: "Badan yang sihat memerlukan tujuh kelas makanan dalam kadar yang sesuai.",
      cards: [
        { title: "Karbohidrat", body: "Sumber tenaga utama. Contoh: nasi, roti dan kentang." }, { title: "Protein", body: "Pertumbuhan dan pembaikan tisu. Contoh: ikan, telur dan kekacang." }, { title: "Lemak", body: "Simpanan tenaga pekat, penebat dan pelindung organ." }, { title: "Vitamin", body: "Mikronutrien organik yang diperlukan sedikit untuk kesihatan normal." }, { title: "Mineral", body: "Nutrien bukan organik seperti kalsium dan ferum." }, { title: "Pelawas", body: "Merangsang peristalsis dan mencegah sembelit." }, { title: "Air", body: "Pelarut, medium pengangkutan dan pengawal suhu." },
      ],
      comparison: { title: "Vitamin dan mineral — sedikit tetapi penting", columns: [{ title: "Contoh kekurangan", body: "Kekurangan vitamin C menyebabkan skurvi; vitamin D menyebabkan riket; ferum menyebabkan anemia." }, { title: "Peranan utama", body: "Kalsium menguatkan tulang dan gigi; ferum membentuk hemoglobin; iodin menyokong hormon tiroid." }]},
      accordions: [
        { title: "🧪 Bagaimana ujian makanan berfungsi?", body: "Ujian makmal digunakan untuk mengesan kehadiran kelas makanan tertentu dalam sampel. Setiap ujian menggunakan reagen khusus yang bertindak balas dengan nutrien tertentu sahaja dan menghasilkan perubahan warna atau mendakan yang boleh diperhatikan — inilah 'keputusan positif' yang menunjukkan nutrien itu wujud dalam sampel." },
        { title: "Ujian kanji dan gula", body: "Kanji: tambah larutan iodin terus pada sampel pada suhu bilik — warna bertukar kepada biru kehitaman jika positif. Gula penurun: tambah larutan Benedict, kemudian PANASKAN dalam mandi air — warna bertukar daripada biru kepada hijau/kuning/mendakan merah bata jika positif." },
        { title: "Ujian protein dan lemak", body: "Protein: tambah reagen Millon, kemudian panaskan dalam mandi air — mendakan/warna merah bata menunjukkan keputusan positif. Lemak: campurkan sampel dengan etanol, kemudian tuang ke dalam air — emulsi putih melekit/berkabus terbentuk jika positif." },
        { title: "⚠️ Langkah berjaga-jaga", body: "Etanol mudah terbakar, jadi pemanasan bagi ujian Benedict dan Millon dijalankan dalam mandi air, bukan nyalaan api terus." },
      ],
      matcher: { title: "Padankan ujian makanan", instruction: "Padankan nutrien dengan reagen dan keputusan positif.", pairs: [
        { id: "starch", label: "Kanji", match: "Larutan iodin → biru kehitaman" }, { id: "sugar", label: "Gula penurun", match: "Larutan Benedict + haba → mendakan merah bata" }, { id: "protein", label: "Protein", match: "Reagen Millon + haba → merah bata" }, { id: "fat", label: "Lemak", match: "Ujian emulsi etanol → putih susu" },
      ]},
      checks: [{ question: "Mengapakah pelawas penting walaupun tidak dicerna?", hint: "Menambah isi padu dan merangsang peristalsis." }, { question: "Kelas makanan manakah memberi tenaga paling tinggi setiap gram?", hint: "Lemak memberi 37 kJ (9 kcal) setiap gram." }],
    },
    {
      number: "3.2", title: "Kepentingan Gizi Seimbang", intro: "Gizi seimbang membekalkan semua tujuh kelas makanan dalam kadar yang betul mengikut keperluan seseorang.",
      sequence: { title: "Piramid Makanan Malaysia", instruction: "Bergerak dari makanan yang paling kerap dimakan ke makanan yang perlu dihadkan.", steps: [
        { title: "Dasar", body: "Bijirin penuh dan karbohidrat — sumber tenaga utama." }, { title: "Aras 2", body: "Buah-buahan dan sayur-sayuran — vitamin, mineral dan pelawas." }, { title: "Aras 3", body: "Ikan, ayam, daging, telur, kekacang dan tenusu — protein dan mineral." }, { title: "Puncak", body: "Lemak, minyak, gula dan garam — ambil sedikit sahaja." },
      ]},
      cards: [{ title: "Umur", body: "Kanak-kanak dan remaja memerlukan nutrien untuk pertumbuhan." }, { title: "Jantina", body: "Purata keperluan tenaga dan mineral berbeza mengikut fisiologi." }, { title: "Saiz badan", body: "Badan lebih besar biasanya menggunakan lebih tenaga." }, { title: "Aktiviti", body: "Aktiviti fizikal lebih tinggi memerlukan lebih tenaga." }, { title: "Iklim", body: "Cuaca sejuk boleh meningkatkan tenaga untuk mengekalkan suhu badan." }, { title: "Kesihatan", body: "Penyakit, kehamilan dan pemulihan mengubah keperluan nutrisi." }],
      comparison: { title: "Nilai tenaga setiap gram", columns: [{ title: "Lemak", body: "37 kJ/g (9 kcal/g) — lebih dua kali ketumpatan tenaga protein atau karbohidrat." }, { title: "Protein dan karbohidrat", body: "Setiap satu membekalkan kira-kira 17 kJ/g (4 kcal/g)." }]},
      checks: [{ question: "Apakah yang menjadikan sesuatu gizi seimbang?", hint: "Semua kelas makanan dalam kadar yang sesuai dengan keperluan individu." }, { question: "Mengapakah atlet memerlukan lebih tenaga?", hint: "Aktiviti otot meningkatkan respirasi dan penggunaan tenaga." }],
    },
    {
      number: "3.3", title: "Sistem Pencernaan Manusia", intro: "Pencernaan memecahkan molekul makanan besar dan tidak larut kepada molekul kecil dan larut yang boleh diserap.",
      sequence: { title: "Ikuti perjalanan makanan", instruction: "Bergerak mengikut urutan salur alimentari.", steps: [
        { title: "Mulut", body: "Gigi memecahkan makanan; air liur memulakan pencernaan kanji." }, { title: "Esofagus", body: "Peristalsis menolak bolus ke perut." }, { title: "Perut", body: "Pengocakan dan protease memulakan pencernaan protein dalam keadaan berasid." }, { title: "Usus kecil", body: "Hempedu mengemulsi lemak; enzim melengkapkan pencernaan; nutrien diserap." }, { title: "Usus besar", body: "Air dan garam mineral diserap." }, { title: "Rektum dan dubur", body: "Tinja disimpan kemudian disingkir melalui penyahtinjaan." },
      ]},
      tabs: [{ title: "Amilase", body: "Memecahkan kanji kepada maltosa di mulut dan usus kecil." }, { title: "Protease", body: "Memecahkan protein kepada asid amino di perut dan usus kecil." }, { title: "Lipase", body: "Memecahkan lemak kepada asid lemak dan gliserol di usus kecil." }],
      checks: [{ question: "Apakah peristalsis?", hint: "Pengecutan dan pengenduran berirama otot salur alimentari." }, { question: "Nyatakan peranan hempedu.", hint: "Meneutralkan asid dan mengemulsikan lemak kepada titisan kecil." }],
    },
    {
      number: "3.4", title: "Penyerapan, Pengangkutan dan Penyahtinjaan", intro: "Usus kecil disesuaikan untuk menyerap nutrien tercerna dengan cekap.",
      cards: [{ title: "Banyak vilus", body: "Menambahkan luas permukaan penyerapan." }, { title: "Dinding setebal satu sel", body: "Mewujudkan jarak resapan pendek." }, { title: "Kapilari darah", body: "Mengangkut glukosa dan asid amino dengan cepat." }, { title: "Lakteal", body: "Menyerap asid lemak dan gliserol ke sistem limfa." }],
      comparison: { title: "Destinasi nutrien", columns: [{ title: "Darah", body: "Glukosa dan asid amino memasuki kapilari dan bergerak dahulu ke hati." }, { title: "Limfa", body: "Asid lemak dan gliserol memasuki lakteal sebelum menyertai aliran darah." }]},
      checks: [{ question: "Bagaimanakah vilus meningkatkan kadar penyerapan?", hint: "Luas permukaan besar, dinding nipis dan rangkaian pengangkutan yang baik." }, { question: "Apakah penyahtinjaan?", hint: "Penyingkiran tinja melalui dubur; bukan sama dengan perkumuhan." }],
    },
  ],
  reflectionItems: ["Saya boleh menyatakan fungsi dan sumber tujuh kelas makanan.", "Saya boleh merancang gizi seimbang untuk keperluan berbeza.", "Saya boleh menjejaki makanan melalui sistem pencernaan.", "Saya boleh menerangkan penyerapan dan pengangkutan nutrien oleh vilus."],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Hempedu mengandungi enzim yang mencernakan lemak.", answer: false, explanation: "Hempedu bukan enzim; ia mengemulsikan lemak dan meneutralkan kimus berasid." },
    { type: "multiple-choice", question: "Struktur manakah menyerap asid lemak dan gliserol?", options: ["Platlet darah", "Lakteal", "Esofagus", "Rektum"], answerIndex: 1, explanation: "Lakteal di dalam setiap vilus menyerap hasil pencernaan lemak." },
  ],
};
