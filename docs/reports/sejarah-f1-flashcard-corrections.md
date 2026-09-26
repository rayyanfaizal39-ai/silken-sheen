# Sejarah Form 1 — Disputed Flashcard Corrections

Status: **applied 2026-09-26** — every recommendation below is now in `src/data/content.ts` except C7 fc22, which was kept as is. The `c7-tb4` note was corrected in `src/data/sejarah-f1-subtopics.ts`. Chapter 2 fc22 and fc24 were replaced with the Australia-migration and Teori Milankovitch cards (textbook p. 31).
Source: `prompts/T1 BT SEJ - SEJARAH.pdf` (Buku Teks Sejarah Tingkatan 1). Page numbers are the printed page numbers.
Live data file: `src/data/content.ts` (the copy in `src/data/flashcards.ts` is not imported anywhere).

## 1. The seven disputed cards

### C7 fc3 — Tempoh kekuasaan Magadha

| | |
|---|---|
| Current front | Apakah tempoh kekuasaan Kerajaan Magadha? |
| Current back | Antara tahun 540 SM hingga 320 SM. |
| Textbook (p. 140) | "Magadha yang terletak di timur laut India muncul sebagai kuasa penting yang berjaya menguasai kerajaan lain di India, antara tahun 540 – 490 SM." |
| **Recommended back** | Antara tahun 540 SM hingga 490 SM, apabila Magadha muncul sebagai kuasa penting yang menguasai kerajaan lain di India. |

### C7 fc22 — Pengasas sistem peperiksaan awam

| | |
|---|---|
| Current front | Siapakah yang memulakan Sistem Peperiksaan Awam di China? |
| Current back | Maharaja Wu dari Dinasti Han. |
| Textbook (p. 150) | "Sistem peperiksaan yang awal mula diperkenalkan ketika pemerintahan Maharaja Wu dalam Dinasti Han pada tahun 29 SM dan kekal hingga tahun 1905 apabila dimansuhkan oleh Maharani Dowager Cixi." |
| **Recommendation** | **Keep the card as it is.** It matches the textbook. The conflicting sources are elsewhere: the notes subtopic `c7-tb4` in `src/data/sejarah-f1-subtopics.ts` says the system started in Dinasti Qin, which the textbook does not support. Separately, the textbook's own "29 SM" is internally inconsistent: p. 147 dates Han Wu Di's reign to 140 SM – 87 SM. The card correctly leaves the year out. |

### C7 fc26 — Peperiksaan Xiucai

| | |
|---|---|
| Current front | Apakah ciri Peperiksaan Xiucai? |
| Current back | Diadakan di peringkat daerah setiap dua tahun sekali. Calon yang lulus layak menjadi pegawai rendah kerajaan. |
| Textbook (p. 152) | "Tahap pertama (Xiucai): Dijalankan pada peringkat daerah. Terbuka kepada semua orang. Diadakan dua kali setiap tiga tahun. Tempoh peperiksaan ialah sehari." … "Calon yang lulus peperiksaan tahap pertama akan memperoleh butang keemasan yang akan dilekatkan pada topi mereka, diterima sebagai kakitangan kerajaan peringkat rendah dan menyertai Majlis Santapan Diraja." |
| **Recommended back** | Diadakan di peringkat daerah dua kali setiap tiga tahun dan terbuka kepada semua. Calon yang lulus memperoleh butang keemasan dan diterima sebagai kakitangan kerajaan peringkat rendah. |

### C7 fc27 — Peperiksaan Juren

| | |
|---|---|
| Current front | Apakah ciri Peperiksaan Juren? |
| Current back | Diadakan di ibu kota wilayah setiap tiga tahun sekali. Hanya calon yang telah lulus Xiucai sahaja yang layak menduduki peperiksaan ini. |
| Textbook (p. 152) | "Tahap kedua (Juren): Dijalankan di ibu kota daerah. Hanya terbuka kepada calon yang telah lulus tahap pertama. Diadakan tiga tahun sekali. Tempoh peperiksaan tiga hari." |
| **Recommended back** | Diadakan di ibu kota daerah tiga tahun sekali. Hanya calon yang telah lulus Xiucai layak menduduki peperiksaan ini. |

### C7 fc30 — Persamaan India dan China

| | |
|---|---|
| Current front | Apakah persamaan antara Tamadun India dan China dari segi sistem pemerintahan? |
| Current back | Kedua-duanya mempunyai sistem pemerintahan berpusat yang kuat, dan menggunakan pentadbir yang dilantik (bukan warisan semata-mata) untuk menguruskan wilayah. |
| Textbook | No India–China comparison of government or appointed administrators exists in Bab 7. The closest passage is the Kesimpulan (p. 154): "Kecemerlangan dalam Tamadun India ditonjolkan melalui aspek perluasan kuasa yang dijalankan sama ada melalui kekuatan tentera atau keagamaan." … "Sistem pendidikan telah melahirkan golongan pelajar dan pemimpin yang membentuk kecemerlangan Tamadun China." … "kedua-dua tamadun dikenali sebagai tamadun yang teragung di Asia khasnya dan dunia amnya." |
| **Recommended front** | Apakah aspek yang menonjolkan kecemerlangan Tamadun India dan Tamadun China? |
| **Recommended back** | Tamadun India cemerlang melalui perluasan kuasa secara ketenteraan dan keagamaan, manakala Tamadun China cemerlang melalui sistem pendidikan yang melahirkan pelajar dan pemimpin. |

### C7 fc36 — Warisan Tamadun India

| | |
|---|---|
| Current front | Apakah warisan Tamadun India kepada dunia moden? |
| Current back | Konsep Dharma menjadi asas kepada idea hak asasi manusia dan pemerintahan beretika, manakala penyebaran agama Buddha membentuk budaya Asia hingga kini. |
| Textbook | The textbook never links Dharma to human rights; that is an overclaim. The textbook's own lesson from the Asoka section (p. 145): "Kematian dan kemusnahan yang besar kesan daripada perluasan kuasa secara fizikal, menyebabkan pemerintah mengubah perluasan kuasa kepada penyebaran keagamaan. Jelaslah bahawa keamanan amat penting dalam menjamin keselamatan dan kesejahteraan negara. Oleh itu, kita hendaklah menanamkan sikap menghargai keamanan dan bekerjasama dalam pembinaan sesebuah tamadun." |
| **Recommended front** | Apakah pengajaran daripada peralihan Tamadun India daripada perluasan kuasa secara fizikal kepada keagamaan? |
| **Recommended back** | Keamanan amat penting untuk menjamin keselamatan dan kesejahteraan negara, maka kita perlu menghargai keamanan dan bekerjasama membina tamadun. |

### C1 fc45 — Langkah terakhir kaedah bertulis

| | |
|---|---|
| Current front | Apakah langkah terakhir dalam kaedah bertulis? |
| Current back | Menganalisis dan mentafsir maklumat yang diperolehi. |
| Textbook (p. 10) | Five steps: "Mengenal pasti sumber…", "Mendapat dan mengesahkan sumber bertulis tersebut.", "Mengumpul dan menyimpan sumber yang diperoleh.", "Menggunakan peralatan yang sesuai…", "Menganalisis." — "Keupayaan menganalisis dan memberikan perspektif baharu terhadap sesuatu peristiwa sejarah… Dapatan seseorang sejarawan perlu disebarkan bagi memperkukuh teori, pemahaman dan penghayatan terhadap sesuatu peristiwa." |
| **Recommended back** | Menganalisis maklumat dan memberikan perspektif baharu, kemudian menyebarkan dapatan kajian. |

## 2. More discrepancies found while checking the textbook

These were not in the original list. They are recorded here so they can be approved in the same pass.

| Card | Current | Textbook | Recommended |
|---|---|---|---|
| C7 fc25 | "…Jinshi (istana di hadapan Maharaja)." | Jinshi: "Dijalankan di ibu kota kerajaan." (p. 152) | "Xiucai (peringkat daerah), Juren (ibu kota daerah), dan Jinshi (ibu kota kerajaan)." |
| C7 fc28 | Jinshi "diadakan di istana di hadapan Maharaja sendiri" | "Dijalankan di ibu kota kerajaan. Diadakan tiga tahun sekali. Tempoh peperiksaan selama 13 hari." Passing gives "kedudukan dan pangkat tinggi dalam kerajaan dan … pelbagai keistimewaan … bukan sahaja untuk dirinya tetapi keluarga dan kampungnya." (p. 152) | "Peperiksaan tahap tertinggi yang diadakan di ibu kota kerajaan tiga tahun sekali selama 13 hari. Calon yang lulus mendapat kedudukan dan pangkat tinggi serta keistimewaan untuk diri, keluarga dan kampungnya." |
| C7 fc24 | "dikurung … selama tiga hari tiga malam … dikenakan hukuman mati" | "mereka yang didapati meniru akan dikenakan hukuman. Bagi mengelakkan penipuan, calon akan dikurung sebelum peperiksaan berlangsung." (p. 151). No "mati" and no "tiga hari tiga malam". | "Calon dikurung sebelum peperiksaan berlangsung, dan sesiapa yang didapati meniru akan dikenakan hukuman." |
| C7 fc20 | Pendidikan Menengah: "karangan, sastera, dan … falsafah Konfusius" | "Tumpuan kepada aspek menulis karangan dan sajak." (p. 149) | "Tumpuan kepada aspek menulis karangan dan sajak." |
| C7 fc21 | Pendidikan Tinggi: "… etika, undang-undang, serta kemahiran kepimpinan …" | "Menterjemahkan dan mengintepretasikan buku suci serta pelajaran berkaitan etika upacara, adat istiadat dan tanggungjawab rakyat kepada raja dan negara." (p. 149) | "Menterjemah dan mentafsir buku suci serta mempelajari etika upacara, adat istiadat dan tanggungjawab rakyat kepada raja dan negara." |
| Notes `c7-tb4` (`sejarah-f1-subtopics.ts`) | "bermula sejak Dinasti Qin … Juren (ibu kota daerah) … Jinshi (ibu kota empayar di hadapan maharaja)" | See fc22 and fc25 above | Remove "sejak Dinasti Qin" and "di hadapan maharaja". |

## 3. New cards (inserted 2026-09-26): textbook check

All 20 new C7 cards match the textbook (pp. 140–152). The new C1 cards line up as follows:

| Card | Textbook | Note |
|---|---|---|
| C1 fc56 (tiga tahap kaedah lisan) | p. 12: Persediaan (menentukan tokoh, skop, soalan); Rakaman temu bual; Memproses rakaman (senarai/menyalin, **menilai fakta dengan sumber bertulis**, menyimpan) | Matches. |
| C1 fc57 (kelemahan kaedah lisan) | The textbook does **not** state a weakness or "tokok tambah". It does require "Menilai fakta-fakta dengan sumber bertulis". | The fact is correct, but it comes from the app notes, not the textbook. Optional textbook-aligned back: "Maklumat bergantung pada ingatan dan pengalaman orang sumber, maka fakta perlu dinilai dengan sumber bertulis." |
| C1 fc58 (epigrafi) | Glosari p. 10: "Epigrafi: ilmu mempelajari tulisan yang terdapat pada tugu, bangunan dan prasasti." | The current back ("inskripsi pada batu bersurat") is narrower. Optional: "Ilmu mempelajari tulisan yang terdapat pada tugu, bangunan dan prasasti (batu bersurat)." |
| C1 fc59 (mengesahkan sumber) | p. 10: "Mendapat dan mengesahkan sumber bertulis tersebut." | Matches (the reason given is an explanation). |
| C1 fc60 (membangunkan negara dan bangsa) | p. 19: "Melalui sejarah kita dapat mengekalkan kegemilangan yang dicapai oleh negara. Kita juga akan lebih memahami budaya dahulu dan budaya kini untuk dijadikan perbandingan bagi membangunkan negara dan bangsa pada masa akan datang." | "mencontohi kejayaan generasi terdahulu" is paraphrased from the app notes. Optional: "Dengan mengekalkan kegemilangan yang dicapai oleh negara dan membandingkan budaya dahulu dengan budaya kini untuk membangunkan negara pada masa akan datang." |

## 4. Other content issue found (not changed)

Sejarah F1 Chapter 2 repeats two questions:
- `sej-f1-c2-fc14` and `sej-f1-c2-fc22` both ask "Apakah itu 'Pentas Sunda'?"
- `sej-f1-c2-fc16` and `sej-f1-c2-fc24` both ask "Apakah kesan kenaikan paras laut terhadap Pentas Sunda?"
