import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-pantun-alam-remaja";

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

function stanza(id: string, meaning: string, keywords: string): MindNode {
  return branch(`maksud-${id}`, `Rangkap ${id}`, [
    node(`maksud-${id}-huraian`, "Maksud", meaning),
    node(`maksud-${id}-kata-kunci`, "Kata Kunci", keywords),
  ]);
}

function supported(id: string, label: string, explanation: string, evidence: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-bukti`, "Bukti Idea", evidence),
  ]);
}

export const bahasaMelayuTingkatan2PantunAlamRemajaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PANTUN\nALAM REMAJA",
  summary:
    "Pantun menggambarkan kehidupan remaja dalam suasana kekeluargaan serta menonjolkan kasih sayang, perhatian dan hubungan erat antara anak dengan ibu bapa.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      stanza(
        "1",
        "Anak-anak berasa sangat gembira apabila melihat ibu pulang ke rumah.",
        "IBU PULANG → ANAK GEMBIRA",
      ),
      stanza(
        "2",
        "Rasa cemas, takut dan bimbang anak-anak hilang apabila ibu kembali.",
        "CEMAS HILANG → IBU KEMBALI",
      ),
      stanza(
        "3",
        "Kegembiraan anak-anak bertambah apabila ibu pulang dengan segera.",
        "IBU SEGERA PULANG → SEMAKIN GEMBIRA",
      ),
      stanza(
        "4",
        "Adik-beradik meraikan kepulangan ibu dengan bersorak, menari dan menyanyi bersama-sama.",
        "ADIK-BERADIK → RAI BERSAMA",
      ),
      stanza(
        "5",
        "Kepulangan ibu dan bapa merupakan saat yang paling menggembirakan anak-anak.",
        "IBU + BAPA PULANG → SAAT PALING GEMBIRA",
      ),
      stanza(
        "6",
        "Anak-anak berasa gembira apabila menerima pemberian daripada ibu bapa.",
        "PEMBERIAN IBU BAPA → ANAK GEMBIRA",
      ),
      stanza(
        "7",
        "Anak-anak meminta ibu bapa agar tidak memarahi mereka kerana mereka masih muda dan manja.",
        "MASIH MUDA + MANJA → MOHON DIFAHAMI",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "KEGEMBIRAAN MENYAMBUT KEPULANGAN IBU BAPA", [
        node(
          "tema-huraian",
          "Huraian",
          "Pantun menggambarkan kegembiraan anak-anak apabila ibu dan bapa kembali ke rumah serta kemesraan yang lahir dalam keluarga.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Pantun Alam Remaja ialah kegembiraan anak-anak sewaktu menyambut kepulangan ibu bapa ke rumah.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-kasih-sayang",
        "Kasih Sayang Ibu Bapa terhadap Anak-anak",
        "Ibu bapa menjaga kebahagiaan anak-anak dan pulang kepada keluarga.",
        "Kepulangan ibu dan bapa menjadi sumber kegembiraan anak-anak.",
      ),
      supported(
        "persoalan-kebimbangan",
        "Kebimbangan Anak ketika Ibu Tiada",
        "Ketiadaan ibu menyebabkan anak-anak berasa cemas dan tidak tenteram.",
        "Rangkap 2 menunjukkan kebimbangan itu hilang apabila ibu kembali.",
      ),
      supported(
        "persoalan-adik-beradik",
        "Keakraban Hubungan Adik-beradik",
        "Adik-beradik berkongsi kegembiraan dan meraikan kepulangan ibu bersama-sama.",
        "Rangkap 4 menggambarkan mereka bersorak, menari dan menyanyi bersama.",
      ),
      supported(
        "persoalan-pemberian",
        "Pemberian Membawa Kegembiraan",
        "Pemberian ibu bapa menggembirakan anak-anak dan mencerminkan sikap baik hati.",
        "Rangkap 6 mengaitkan pemberian ibu bapa dengan kegembiraan anak-anak.",
      ),
      supported(
        "persoalan-manja",
        "Sifat Anak-anak yang Muda dan Manja",
        "Anak-anak mengharapkan kesabaran dan pengertian daripada ibu bapa.",
        "Rangkap 7 memuatkan permintaan agar mereka tidak dimarahi kerana masih muda dan manja.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Puisi tradisional jenis pantun dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Tujuh Rangkap", "Pantun ini mengandungi tujuh rangkap."),
      node("bentuk-baris", "Empat Baris Serangkap", "Setiap rangkap mempunyai empat baris."),
      node(
        "bentuk-pembayang",
        "Pembayang dan Maksud",
        "Dua baris pertama ialah pembayang, manakala dua baris terakhir menyampaikan maksud.",
      ),
      node(
        "bentuk-kata",
        "Tiga hingga Lima Patah Kata",
        "Setiap baris mengandungi antara tiga hingga lima patah kata.",
      ),
      node(
        "bentuk-suku-kata",
        "Sembilan hingga Sepuluh Suku Kata",
        "Bilangan suku kata setiap baris adalah antara sembilan hingga sepuluh.",
      ),
      node(
        "bentuk-rima",
        "Rima abab; Rangkap 2 aaaa",
        "Kebanyakan rangkap berima akhir abab, tetapi Rangkap 2 berima akhir aaaa.",
      ),
      node("bentuk-terikat", "Bentuk Terikat", "Pantun mematuhi pola rangkap, baris dan rima."),
    ]),
    branch("ciri-pantun", "Ciri Pantun", [
      node(
        "ciri-pembayang",
        "Pembayang",
        "Dua baris awal membina imej dan bunyi sebelum maksud disampaikan.",
      ),
      node(
        "ciri-maksud",
        "Maksud",
        "Dua baris akhir menyampaikan idea tentang kegembiraan, keluarga dan sifat anak-anak.",
      ),
      node(
        "ciri-rima",
        "Rima Teratur",
        "Persamaan bunyi akhir menghasilkan irama yang merdu dan mudah diingati.",
      ),
      node("ciri-alam", "Unsur Alam", "Imej haiwan dan tumbuhan digunakan dalam pembayang pantun."),
      node(
        "ciri-padat",
        "Bahasa Padat",
        "Setiap rangkap menyampaikan satu gambaran atau perasaan secara ringkas.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      supported(
        "gaya-imej-alam",
        "Imej Alam",
        "Unsur alam menghidupkan pembayang dan membina gambaran yang konkrit.",
        "Contoh pendek: ‘kumbang jati’, ‘itik’, ‘ayam kinantan’ dan ‘bilang-bilang’.",
      ),
      supported(
        "gaya-peribahasa",
        "Peribahasa",
        "Ungkapan kiasan menegaskan perasaan sangat gembira.",
        "Contoh pendek: ‘besar hati’ dan ‘berbesar hati’.",
      ),
      supported(
        "gaya-inversi",
        "Inversi",
        "Susunan kata diterbalikkan untuk mengekalkan irama dan rima.",
        "Contoh pendek: ‘Sebarang tari kita tarikan’.",
      ),
      supported(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan bunyi vokal a menghasilkan kemerduan.",
        "Bunyi a berulang dalam frasa pendek ‘besarnya hati awak’.",
      ),
      supported(
        "gaya-aliterasi",
        "Aliterasi",
        "Pengulangan bunyi konsonan b dan p menguatkan irama.",
        "Contoh pendek: ‘Bonda pulang bapa pun sampai’.",
      ),
      supported(
        "gaya-kata-ganda",
        "Kata Ganda",
        "Penggandaan kata menegaskan kumpulan, tindakan berulang atau nama tumbuhan.",
        "Contoh pendek: ‘adik-beradik’, ‘bersorak-sorak’ dan ‘bilang-bilang’.",
      ),
      node(
        "gaya-had",
        "Had Petikan",
        "Gunakan contoh pendek yang disahkan; jangan menyalin keseluruhan rangkap atau mencipta baris pantun.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-kasih-sayang",
        "Kasih Sayang",
        "Ahli keluarga saling menyayangi dan menghargai kepulangan ibu bapa.",
        "Anak-anak amat gembira apabila ibu dan bapa pulang.",
      ),
      supported(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Ibu bapa bertanggungjawab menjaga kebajikan dan emosi anak-anak.",
        "Kepulangan ibu bapa menghilangkan kebimbangan serta menenteramkan anak-anak.",
      ),
      supported(
        "nilai-baik-hati",
        "Baik Hati",
        "Ibu bapa menggembirakan anak-anak dengan memberikan sesuatu kepada mereka.",
        "Rangkap 6 memperlihatkan kegembiraan anak-anak menerima pemberian.",
      ),
      supported(
        "nilai-hormat",
        "Hormat-menghormati",
        "Anak-anak menyampaikan permintaan kepada ibu bapa dengan sopan.",
        "Rangkap 7 menunjukkan anak-anak memohon agar ibu bapa tidak memarahi mereka.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-sayang",
        "Kita Hendaklah Menyayangi Ahli Keluarga",
        "Kasih sayang mengeratkan hubungan antara ibu bapa dengan anak-anak.",
      ),
      node(
        "pengajaran-tanggungjawab",
        "Ibu Bapa Hendaklah Bertanggungjawab",
        "Ibu bapa perlu memberikan perhatian dan kasih sayang kepada anak-anak.",
      ),
      node(
        "pengajaran-baik-hati",
        "Kita Hendaklah Bersikap Baik Hati",
        "Pemberian yang ikhlas dapat menggembirakan orang lain.",
      ),
      node(
        "pengajaran-erat",
        "Kita Hendaklah Mengekalkan Hubungan Keluarga yang Erat",
        "Ahli keluarga wajar berkongsi kegembiraan dan meluangkan masa bersama-sama.",
      ),
      node(
        "pengajaran-hormat",
        "Kita Hendaklah Menghormati Ibu Bapa",
        "Permintaan dan perasaan hendaklah disampaikan dengan sopan.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-utama",
        "CERIA DAN GEMBIRA — NADA UTAMA",
        "Kebanyakan rangkap menonjolkan kegembiraan anak-anak ketika menyambut kepulangan ibu bapa.",
      ),
      node(
        "nada-sampingan",
        "MANJA — KESAN SAMPINGAN",
        "Rangkap terakhir memperlihatkan suara anak-anak yang masih muda dan meminta pengertian ibu bapa.",
      ),
      node(
        "nada-beza",
        "Cara Membezakan",
        "Ceria ialah suasana keseluruhan pantun; manja ialah nuansa suara dalam Rangkap 7.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node("kata-1", "Rangkap 1", "IBU PULANG → GEMBIRA"),
      node("kata-2", "Rangkap 2", "CEMAS → TENANG"),
      node("kata-3", "Rangkap 3", "PULANG SEGERA → SUKA"),
      node("kata-4", "Rangkap 4", "ADIK-BERADIK → RAI BERSAMA"),
      node("kata-5", "Rangkap 5", "IBU + BAPA → PALING GEMBIRA"),
      node("kata-6", "Rangkap 6", "PEMBERIAN → BESAR HATI"),
      node("kata-7", "Rangkap 7", "MUDA + MANJA → MOHON DIFAHAMI"),
      node(
        "kata-aliran",
        "ALIRAN INGATAN",
        "PULANG → HILANG CEMAS → RAI BERSAMA → TERIMA PEMBERIAN → MOHON PENGERTIAN.",
      ),
      node("kata-teras", "MESEJ TERAS", "KELUARGA = TEMPAT KASIH SAYANG DAN SOKONGAN."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-maksud",
        "Maksud Rangkap",
        "KENAL PASTI PERASAAN / TINDAKAN + PARAFRASA DENGAN BAHASA SENDIRI.",
      ),
      node("jawab-tema", "Tema", "TEMA + DUA IDEA SOKONGAN DARIPADA RANGKAP."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + HURAIAN + RANGKAP SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + HURAIAN BERDASARKAN TINDAKAN."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ atau subjek yang sesuai, kemudian nyatakan tindakan.",
      ),
      node(
        "jawab-bentuk",
        "Bentuk",
        "CIRI + BUKTI. Contoh: empat baris kerana setiap rangkap mempunyai empat baris.",
      ),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + FUNGSI."),
      node("jawab-nada", "Nada", "NYATAKAN NADA + PERASAAN DOMINAN + BUKTI SUASANA."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-tema-remaja",
        "Tema = Remaja",
        "‘Remaja’ hanyalah subjek atau konteks. Tema perlu menyatakan idea utama yang lengkap.",
      ),
      node(
        "salah-tema",
        "Tema = Pantun tentang Keluarga",
        "Jawapan itu terlalu umum. Nyatakan kegembiraan anak-anak menyambut kepulangan ibu bapa.",
      ),
      node(
        "salah-rangkap",
        "Bilangan Rangkap Salah",
        "Pantun ini mempunyai tujuh rangkap, bukannya lima atau enam.",
      ),
      node(
        "salah-rima",
        "Semua Rima Dianggap abab",
        "Kebanyakan rangkap berima abab, tetapi Rangkap 2 berima aaaa.",
      ),
      node(
        "salah-pembayang",
        "Pembayang Disamakan dengan Maksud",
        "Dua baris awal ialah pembayang; dua baris akhir membawa maksud.",
      ),
      node(
        "salah-salin",
        "Menyalin Rangkap sebagai Maksud",
        "Parafrasa idea menggunakan ayat sendiri tanpa menyalin keseluruhan pantun.",
      ),
      node(
        "salah-nilai",
        "Nilai Disamakan dengan Pengajaran",
        "Nilai: kasih sayang. Pengajaran: Kita hendaklah menyayangi ahli keluarga.",
      ),
      node(
        "salah-persoalan",
        "Persoalan Tanpa Bukti",
        "Hubungkan persoalan dengan idea atau rangkap sokongan yang tepat.",
      ),
      node(
        "salah-nada",
        "Nada Manja Dianggap Nada Keseluruhan",
        "Nada utama ialah ceria dan gembira; manja hanya ketara dalam Rangkap 7.",
      ),
      node(
        "salah-gaya",
        "Gaya Bahasa Direka",
        "Jangan menambah metafora, personifikasi atau simile tanpa contoh yang sah.",
      ),
      node(
        "salah-petikan",
        "Petikan Terlalu Panjang",
        "Gunakan bukti pendek yang tepat dan elakkan menyalin keseluruhan rangkap.",
      ),
      node(
        "salah-hafal",
        "Hafal Tanpa Faham",
        "Kenal pasti SIAPA + PERASAAN + HUBUNGAN + MESEJ sebelum membina jawapan.",
      ),
    ]),
  ],
};
