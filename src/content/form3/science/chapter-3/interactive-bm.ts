import type { ScienceF3InteractiveContent } from "../interactive-types";

export const scienceF3C3InteractiveBM: ScienceF3InteractiveContent = {
  chapter: 3,
  blogHighlight: {
    title: "Galeri Sains — Fantastic Voyage",
    body: "Dalam filem 1966 \"Fantastic Voyage,\" satu pasukan perubatan dikecilkan kepada saiz sel darah merah dan disuntik ke dalam aliran darah pesakit untuk membakar gumpalan darah di otak menggunakan laser — melalui jantung dan paru-paru sepanjang perjalanan, sama seperti darah sebenar.",
  },
  keywords: ["Arteri", "Vena", "Kapilari", "Antigen", "Antibodi", "Transpirasi", "Pelembakan (gutasi)", "Xilem", "Floem"],
  sections: [
    {
      number: "3.1",
      title: "Sistem Pengangkutan dalam Organisma",
      intro:
        "Organisma unisel yang ringkas seperti Amoeba tidak memerlukan sistem pengangkutan — oksigen dan nutrien meresap terus melalui membran sel. Tetapi organisma kompleks seperti manusia dan tumbuhan terlalu besar untuk resapan sahaja dapat mencapai setiap sel tepat pada masanya, jadi mereka berevolusi dengan sistem pengangkutan khusus.",
      comparison: {
        title: "Mengapa saiz menuntut sistem penghantaran",
        columns: [
          { title: "Organisma ringkas", body: "Tiada sistem pengangkutan khusus — bahan meresap terus melalui membran sel." },
          { title: "Organisma kompleks", body: "Sistem pengangkutan khusus (jantung dan salur, atau xilem dan floem), kerana resapan sahaja terlalu perlahan merentasi isi padu besarnya." },
        ],
      },
      checks: [
        { question: "Apakah yang berlaku kepada organisma sekiranya sistem pengangkutannya gagal berfungsi?", hint: "Bahan buangan toksik yang tidak dapat disingkirkan daripada sel akan terkumpul dan meracuni organisma — dan sel juga akan kekurangan oksigen serta nutrien yang diperlukan." },
      ],
    },
    {
      number: "3.2",
      title: "Sistem Peredaran Darah",
      intro: "Darah manusia dipam oleh jantung melalui arteri, kapilari dan vena dalam satu litar berterusan. Ketik setiap jenis salur.",
      flipCards: [
        { id: "arteri", icon: "🔴", label: "Arteri", fact: "Dinding tebal, berotot dan elastik; lumen kecil; tiada injap; membawa darah beroksigen bertekanan tinggi daripada jantung." },
        { id: "kapilari", icon: "🕸️", label: "Kapilari", fact: "Dinding setebal satu sel; lumen paling kecil; tiada injap; membolehkan gas dan nutrien meresap terus dengan sel badan." },
        { id: "vena", icon: "🔵", label: "Vena", fact: "Dinding nipis, kurang berotot; lumen besar; ada injap; membawa darah terdeoksigen kembali ke jantung di bawah tekanan rendah." },
      ],
      accordions: [
        { title: "Atrium kanan", body: "Menerima darah terdeoksigen daripada seluruh badan (kecuali paru-paru) melalui vena kava, kemudian memaksanya masuk ke ventrikel kanan." },
        { title: "Ventrikel kanan", body: "Mengepam darah terdeoksigen keluar melalui arteri pulmonari ke paru-paru." },
        { title: "Atrium kiri", body: "Menerima darah beroksigen daripada paru-paru melalui vena pulmonari, kemudian memaksanya masuk ke ventrikel kiri." },
        { title: "Ventrikel kiri", body: "Mempunyai dinding otot paling tebal — mengepam darah beroksigen keluar melalui aorta ke seluruh badan kecuali paru-paru." },
      ],
      toggles: [
        {
          title: "Bunyi 'lab-dab' degupan jantung anda sendiri",
          instruction: "Ketik untuk membandingkan sistol dan diastol.",
          options: [
            { id: "sistol", label: "Sistol ('Lab')", body: "Ventrikel berkontraksi, menutup injap trikuspid dan bikuspid — menghasilkan bunyi 'lab'. Bacaan tekanan darah yang mengalir KELUAR daripada jantung ialah tekanan sistolik." },
            { id: "diastol", label: "Diastol ('Dab')", body: "Ventrikel berelaksasi, menutup injap semilunar di aorta dan arteri pulmonari — menghasilkan bunyi 'dab'. Bacaan tekanan darah yang mengalir MASUK ke jantung ialah tekanan diastolik." },
          ],
        },
      ],
      cards: [
        { title: "Aktiviti fizikal", body: "Aktiviti yang lebih giat meningkatkan kadar denyutan nadi." },
        { title: "Jantina", body: "Wanita purata 78–82 dpm; lelaki purata 70–72 dpm." },
        { title: "Usia", body: "Kadar denyutan maksimum menurun apabila seseorang semakin berusia." },
        { title: "Kesihatan badan", body: "Kadar denyutan yang tidak normal boleh membahayakan." },
      ],
      checks: [
        { question: "Mengapakah tekanan sistolik sentiasa lebih tinggi daripada tekanan diastolik?", hint: "Tekanan sistolik diukur semasa kontraksi ventrikel, apabila darah dipaksa keluar secara aktif di bawah tekanan tinggi — diastolik pula diukur semasa relaksasi, apabila tekanan menurun secara semula jadi." },
      ],
    },
    {
      number: "3.3",
      title: "Darah Manusia",
      intro:
        "Darah ialah ampaian sel darah merah, sel darah putih, platelet dan plasma darah (kira-kira 90% air, membawa nutrien, hormon, enzim dan bahan buangan). Putarkan dalam sentrifug dan ia terpisah menjadi cecair kuning, iaitu plasma, terapung di atas sel darah merah.",
      bloodChecker: {
        title: "Semak keserasian jenis darah sendiri",
        instruction: "Pilih kumpulan darah penderma dan penerima untuk melihat sama ada pemindahan darah selamat.",
      },
      cards: [
        { title: "Mengapa keserasian penting", body: "Antibodi dalam plasma penerima akan menyerang sebarang antigen sepadan pada sel darah merah penderma, menyebabkan darah menggumpal — yang boleh membawa maut. Itulah sebabnya O ialah penderma universal (tiada antigen untuk diserang) dan AB ialah penerima universal (tiada antibodi untuk bertindak balas)." },
      ],
      checks: [
        { question: "Mengapakah seseorang yang berdarah jenis O tidak boleh menerima sebarang jenis darah lain?", hint: "Plasma jenis O mengandungi kedua-dua antibodi Anti-A dan Anti-B, yang akan menyerang antigen A atau B yang terdapat dalam mana-mana jenis darah lain." },
      ],
    },
    {
      number: "3.4",
      title: "Pengangkutan dalam Tumbuhan",
      intro: "Transpirasi ialah kehilangan wap air daripada permukaan tumbuhan — kebanyakannya melalui stoma daun — melalui penyejatan. Ini menarik air dan mineral terlarut ke atas daripada akar melalui xilem.",
      flipCards: [
        { id: "cahaya", icon: "☀️", label: "Keamatan cahaya", fact: "Lebih banyak cahaya bermakna lebih banyak stoma terbuka, jadi transpirasi lebih pantas." },
        { id: "kelembapan", icon: "💧", label: "Kelembapan udara", fact: "Kelembapan lebih tinggi bermakna kecerunan kepekatan lebih kecil, jadi transpirasi lebih perlahan." },
        { id: "pergerakan", icon: "💨", label: "Pergerakan udara", fact: "Pergerakan udara yang lebih banyak menyapu wap air, mempercepat transpirasi." },
        { id: "suhu", icon: "🌡️", label: "Suhu", fact: "Suhu lebih tinggi meningkatkan kadar penyejatan pada permukaan daun." },
      ],
      comparison: {
        title: "Dua tisu pengangkutan, dua tugas",
        columns: [
          { title: "Xilem", body: "Mengangkut air dan mineral terlarut, dalam satu arah: akar → batang → daun." },
          { title: "Floem", body: "Mengangkut sukrosa hasil fotosintesis, daripada daun ke semua bahagian tumbuhan lain." },
        ],
      },
      checks: [
        { question: "Mengapakah pewarna merah (eosin) digunakan untuk mengesan pergerakan air dalam eksperimen tumbuhan?", hint: "Pewarna itu bergerak bersama air melalui xilem, menjadikan laluan air yang biasanya tidak kelihatan menjadi jelas di bawah mikroskop selepas batang dihiris." },
      ],
    },
    {
      number: "3.5",
      title: "Sistem Peredaran Darah dalam Haiwan dan Sistem Pengangkutan dalam Tumbuhan",
      intro:
        "Kedua-dua peredaran darah haiwan dan pengangkutan tumbuhan membawa air, nutrien dan bahan terlarut, dan kedua-duanya wujud kerana organisma kompleks terlalu besar untuk bergantung kepada resapan sahaja.",
      comparison: {
        title: "Tujuan sama, reka bentuk berbeza",
        columns: [
          { title: "Haiwan", body: "Sistem tiub dengan pam (jantung) dan injap — 3 jenis salur (arteri, kapilari, vena) semuanya bersambung dalam satu gelung." },
          { title: "Tumbuhan", body: "Sistem salur tanpa pam atau injap — 2 salur berasingan yang tidak bersambung: xilem dan floem." },
        ],
      },
      checks: [
        { question: "Berikan satu persamaan dan satu perbezaan antara peredaran darah haiwan dan pengangkutan tumbuhan.", hint: "Persamaan: kedua-duanya mengangkut air dan bahan terlarut dalam organisma kompleks. Perbezaan: haiwan menggunakan satu gelung berpam yang bersambung; tumbuhan menggunakan dua salur berasingan tanpa pam." },
      ],
    },
  ],
  reflectionItems: [
    "Saya dapat menerangkan fungsi sistem pengangkutan dalam organisma kompleks dan ringkas.",
    "Saya dapat menerangkan struktur dan fungsi jantung serta salur darah.",
    "Saya dapat mengenal pasti kumpulan darah dan kesan penerimaan darah yang tidak serasi.",
    "Saya dapat menerangkan transpirasi dan faktor yang mempengaruhi kadarnya.",
    "Saya dapat membandingkan sistem peredaran darah haiwan dengan sistem pengangkutan tumbuhan.",
  ],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Seseorang berdarah jenis AB dikenali sebagai penderma universal.", answer: false, explanation: "AB ialah PENERIMA universal (boleh menerima sebarang jenis darah) — O ialah penderma universal." },
    { type: "multiple-choice", question: "Tisu tumbuhan manakah yang mengangkut sukrosa hasil fotosintesis?", options: ["Xilem", "Floem", "Kutikel", "Stoma"], answerIndex: 1, explanation: "Floem membawa sukrosa daripada daun (tempat ia dihasilkan) ke setiap bahagian lain tumbuhan." },
  ],
};
