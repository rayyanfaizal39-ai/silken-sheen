import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch5-air-larutan.png";

export const scienceF2C5InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "Blog Sains — Laut Mati",
    body: "Terletak kira-kira 430.5 meter di bawah paras laut, Laut Mati adalah titik paling rendah di Bumi. Kerana ia dikepung sepenuhnya oleh tanah, air yang mengalir daripada Sungai Jordan sejat dengan cepat dan meninggalkan garamnya — menjadikan air begitu tumpat sehingga orang boleh terapung di permukaannya tanpa berusaha.",
    imagePath: chapterImage,
  },
  keywords: [
    "Sebatian",
    "Tindakan kapilari",
    "Keterlarutan",
    "Ampaian",
    "Emulsi",
    "Larutan tepu",
    "Pelarut semesta",
    "Oksidasi",
    "Pengklorinan",
    "Kelestarian air",
  ],
  sections: [
    {
      number: "5.1",
      title: "Sifat Fizik Air",
      intro:
        "Air tulen tidak berwarna, tidak berbau dan tidak berasa, serta kekal sebagai cecair pada suhu bilik. Ia mendidih pada tepat 100°C, membeku pada 0°C, dan mempunyai ketumpatan 1 g cm⁻³ — nilai tetap ini sebenarnya digunakan untuk menguji sama ada air mengandungi bendasing, kerana bendasing mengubah nilai-nilai ini. Air juga mempunyai tegangan permukaan yang tinggi, disebabkan oleh daya lekitan (tarikan antara molekul air dengan molekul air yang lain) yang cukup kuat pada permukaan sehingga serangga ringan seperti labah-labah air boleh berehat di atasnya tanpa tenggelam. Daya lekitan yang sama, bersama daya lekatan (tarikan antara molekul air dengan permukaan berbeza — dinding sel xilem tumbuhan), menarik air dari akar ke daun. Kesan gabungan ini dipanggil tindakan kapilari.",
      cards: [
        {
          title: "Apa yang menyusun air",
          body: "Air ialah sebatian — dua atom hidrogen bergabung dengan satu atom oksigen, H₂O. Elektrolisis memisahkannya: gas oksigen terkumpul di anod, gas hidrogen di katod, dengan isi padu hidrogen yang dikumpul tepat dua kali ganda oksigen (nisbah H:O = 2:1).",
          detail: "Kayu uji berbara menyala semula dalam oksigen; kayu uji menyala berbunyi 'pop' dalam hidrogen.",
        },
        {
          title: "Peleburan & Pembekuan",
          body: "Peleburan menukar ais pepejal kepada air cecair dengan menyerap haba. Pembekuan menukar air cecair kepada ais pepejal dengan membebaskan haba.",
        },
        {
          title: "Penyejatan/Pendidihan & Kondensasi",
          body: "Penyejatan/pendidihan menukar air cecair kepada wap air dengan menyerap haba. Kondensasi menukar wap air kembali kepada cecair dengan membebaskan haba.",
        },
        {
          title: "Mengapa sup masin mendidih lebih lambat",
          body: "Bendasing terlarut mengubah takat lebur dan takat didih air — garam menurunkan takat lebur ais tetapi meningkatkan takat didih air. Itulah sebabnya periuk air biasa mendidih lebih cepat daripada periuk yang mengandungi garam atau stok sup terlarut.",
        },
      ],
      flipCards: [
        { id: "humidity", icon: "💨", label: "Kelembapan", fact: "Udara yang lebih kering (kelembapan rendah) boleh menampung lebih banyak molekul air yang terlepas, jadi penyejatan lebih cepat." },
        { id: "temperature", icon: "🌡️", label: "Suhu", fact: "Suhu lebih tinggi memberi lebih tenaga kepada molekul air permukaan untuk terlepas ke udara." },
        { id: "surface-area", icon: "📐", label: "Luas permukaan", fact: "Luas permukaan terdedah yang lebih besar membolehkan lebih banyak molekul air terlepas serentak." },
        { id: "air-movement", icon: "🌬️", label: "Pergerakan udara", fact: "Udara yang bergerak menyapu wap air daripada permukaan, membolehkan lebih banyak penyejatan berlaku." },
      ],
      checks: [
        { question: "Bagaimanakah Ikram boleh menguji sama ada sebotol air itu tulen?", hint: "Uji takat didih dan takat bekunya — air tulen mendidih pada tepat 100°C dan membeku pada tepat 0°C. Sebarang perubahan menunjukkan kehadiran bendasing terlarut." },
        { question: "Mengapakah kita berasa sejuk sejurus selepas berpeluh?", hint: "Peluh yang menyejat daripada kulit menyerap haba daripada badan untuk berbuat demikian — kehilangan haba itulah yang menyebabkan rasa sejuk." },
      ],
    },
    {
      number: "5.2",
      title: "Larutan dan Kadar Keterlarutan",
      intro:
        "Apabila gula larut dalam air, gula ialah zat terlarut (bahan yang larut), air ialah pelarut (cecair yang melarutkan), dan air gula ialah larutan yang terbentuk bersama. Tambah lebih banyak zat terlarut, dan larutan itu melalui tiga peringkat — cair, kemudian pekat, kemudian tepu, di mana ia tidak boleh melarutkan lebih lagi dan lebihan zat terlarut membentuk mendakan.",
      cards: [
        { title: "Cair", body: "Sedikit zat terlarut setakat ini — larutan masih boleh melarutkan lebih banyak lagi.", detail: "Paling tidak pekat" },
        { title: "Pekat", body: "Banyak zat terlarut telah larut — larutan masih boleh melarutkan sedikit lagi.", detail: "Lebih pekat" },
        { title: "Tepu", body: "Zat terlarut berlebihan ditambah — tiada lagi yang larut, dan lebihannya membentuk mendakan di dasar.", detail: "Tidak boleh larutkan lebih" },
        {
          title: "Air — pelarut semesta",
          body: "Air dipanggil pelarut semesta kerana ia melarutkan pelbagai pepejal, cecair dan gas — digunakan dari penyerapan baja oleh akar tumbuhan hingga penghasilan minuman ringan. Bagi bahan yang tidak larut dalam air, pelarut organik (berasaskan karbon) seperti alkohol (minyak wangi, antiseptik), kerosin (minyak lampu), aseton (penanggal varnis kuku) dan turpentin (pelarut cat) digunakan sebagai gantinya.",
        },
      ],
      tabs: [
        { title: "Larutan", body: "Zarah zat terlarut cukup kecil untuk tersebar sekata — campuran kelihatan jernih dan telus, cahaya boleh tembus, dan tiada baki tertinggal apabila ditapis. Contoh: kuprum sulfat yang larut dalam air." },
        { title: "Ampaian", body: "Zarah zat terlarut terlalu besar untuk larut — campuran kelihatan berkabus, menghalang cahaya, mengenap dengan masa, dan meninggalkan baki apabila ditapis. Contoh: serbuk kapur dalam air, atau air sungai berlumpur." },
        { title: "Koloid", body: "Zarah berada di pertengahan — tersebar sekata tetapi tidak jernih sepenuhnya mahupun mengenap. Contoh: susu dan mayonis (emulsi), buih pencukur (buih)." },
      ],
      flipCards: [
        { id: "sol-temp", icon: "🌡️", label: "Suhu", fact: "Zarah pelarut yang lebih panas bergerak lebih pantas, jadi zat terlarut larut lebih cepat." },
        { id: "sol-stir", icon: "🥄", label: "Kadar kacauan", fact: "Kacauan yang lebih cepat menyatukan zarah zat terlarut dan pelarut dengan lebih pantas." },
        { id: "sol-size", icon: "🔬", label: "Saiz zat terlarut", fact: "Zarah yang lebih kecil mendedahkan lebih banyak luas permukaan, jadi ia larut lebih cepat." },
      ],
      checks: [
        { question: "Mengapakah air panas lebih baik untuk melarutkan kopi berbanding air sejuk?", hint: "Suhu yang lebih tinggi memberi lebih tenaga kepada zarah untuk bergerak dan bercampur lebih pantas — meningkatkan kadar keterlarutan." },
        { question: "Susu kelihatan sekata tetapi bukan larutan sebenar. Apakah ia sebenarnya?", hint: "Koloid — sejenis emulsi. Ia tidak terpisah seperti ampaian, tetapi bukan larutan jernih juga." },
      ],
    },
    {
      number: "5.3",
      title: "Pembersihan dan Bekalan Air",
      intro:
        "Air meliputi dua pertiga permukaan Bumi, tetapi kebanyakannya mengandungi bendasing, mikroorganisma dan bahan terlarut yang menjadikannya tidak selamat terus daripada sumber. Pembersihan air membuang bau, rasa, warna, mikroorganisma dan bahan terlarut supaya ia boleh digunakan dengan selamat.",
      accordions: [
        { title: "🧻 Penurasan", body: "Mengasingkan zarah terampai seperti daun dan enapan daripada air." },
        { title: "🔥 Pendidihan", body: "Membunuh mikroorganisma melalui haba." },
        { title: "🧪 Pengklorinan", body: "Klorin ditambah untuk membunuh mikroorganisma dalam bekalan air." },
        { title: "♨️ Penyulingan", body: "Mengasingkan zarah terampai DAN bahan terlarut, sambil turut membunuh mikroorganisma — kaedah paling menyeluruh, menghasilkan air paling tulen." },
      ],
      sequence: {
        title: "🚰 Ikuti perjalanan air dari sungai ke paip",
        instruction: "Langkah demi langkah melalui sistem bekalan air untuk melihat apa yang berlaku di setiap peringkat.",
        steps: [
          { title: "Takungan", body: "Air mentah dikumpul daripada sungai atau air hujan di takungan sebelum dirawat." },
          { title: "Penurasan (kasar)", body: "Serpihan besar seperti dahan dan daun pokok ditapis keluar terlebih dahulu." },
          { title: "Oksidasi", body: "Kandungan oksigen dalam air ditingkatkan untuk menghilangkan bau dan rasa yang tidak menyenangkan." },
          { title: "Kogulasi", body: "Alum melekatkan zarah lumpur bersama; kapur terhidrat (kalsium hidroksida) mengurangkan kekeasidan air." },
          { title: "Pemendapan", body: "Zarah yang melekat bersama mengenap di dasar tangki." },
          { title: "Penurasan (halus)", body: "Penuras pasir yang lebih halus membuang baki zarah terampai." },
          { title: "Pengklorinan & Pemfluoridaan", body: "Klorin membunuh mikroorganisma; natrium fluorida ditambah untuk membantu mencegah kereputan gigi." },
          { title: "Ke rumah pengguna", body: "Air bersih dipam melalui tangki simpanan terus kepada pengguna." },
        ],
      },
      matcher: {
        title: "🌊 Padankan bahan pencemar dengan cara mengatasi",
        instruction: "Pilih bahan pencemar air, kemudian pilih cara ia diatasi.",
        pairs: [
          { id: "domestic", label: "🏠 Sisa domestik", match: "Naik taraf sistem pembetungan dan tingkatkan sanitasi luar bandar" },
          { id: "industrial", label: "🏭 Sisa perindustrian", match: "Kuatkuasakan undang-undang supaya sisa dirawat sebelum dilepaskan ke sungai" },
          { id: "agricultural", label: "🌾 Bahan kimia pertanian", match: "Didik petani menggunakan baja dan racun perosak terbiodegradasi" },
          { id: "oil", label: "🛢️ Tumpahan minyak", match: "Kandung tumpahan dengan pelan kontingensi negara dan tingkatkan pengawasan udara" },
        ],
      },
      checks: [
        { question: "Kaedah pembersihan yang manakah membuang bahan terlarut DAN membunuh mikroorganisma?", hint: "Penyulingan — ia satu-satunya kaedah yang melakukan kedua-duanya sekali gus." },
      ],
    },
  ],
  reflectionItems: [
    "Saya boleh menerangkan ciri-ciri fizikal air dan proses penyejatannya.",
    "Saya boleh menerangkan larutan, keterlarutan dan koloid dengan contoh.",
    "Saya boleh menunjukkan kaedah pembersihan air dan sistem bekalan air.",
    "Saya boleh mewajarkan kepentingan kelestarian air bagi kehidupan sihat.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "Betul atau salah: Susu ialah larutan sebenar kerana ia kelihatan sekata.",
      answer: false,
      explanation: "Susu ialah koloid (emulsi) — ia kelihatan sekata tetapi zarahnya tidak larut sepenuhnya mahupun mengenap seperti ampaian.",
    },
    {
      type: "multiple-choice",
      question: "Kaedah pembersihan air yang manakah membuang bahan terlarut selain zarah terampai?",
      options: ["Pendidihan", "Penurasan", "Penyulingan", "Pengklorinan"],
      answerIndex: 2,
      explanation: "Penyulingan menyejat dan mengkondensasikan semula air, meninggalkan bahan terlarut dan zarah terampai di belakang.",
    },
  ],
};
