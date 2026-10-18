import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack, type StructuredFlashcard } from "@/features/flashcards/structuredFlashcard";
const mathCard = (bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C12_PAIRS = {
  concepts: [
    mathCard(
      "Apakah pengendalian data?",
      "Pengendalian data ialah proses mengumpul, mengorganisasikan, mewakili dan mentafsir data untuk menjawab soalan atau membuat keputusan.",
      "What is data handling?",
      "Data handling is the process of collecting, organising, representing and interpreting data to answer questions or make decisions.",
    ),
    mathCard(
      "Apakah 4 peringkat pengendalian data?",
      "① Mengumpul data → ② Mengorganisasikan data → ③ Mewakili data → ④ Mentafsir data.",
      "What are the 4 stages of data handling?",
      "① Collecting data → ② Organising data → ③ Representing data → ④ Interpreting data.",
    ),
    mathCard(
      "Apakah soalan statistik?",
      "Soalan yang memerlukan pengumpulan data dan melibatkan variasi — berbeza daripada soalan dengan satu jawapan tetap.",
      "What is a statistical question?",
      "A question that requires data collection and involves variability — different from a question with one fixed answer.",
    ),
    mathCard(
      "Apakah data kategori?",
      "Data yang menerangkan kualiti atau jenis/kategori — bukan nombor. Contoh: kumpulan darah, warna, hobi.",
      "What is categorical data?",
      "Data that describes qualities or types/categories — not numbers. Examples: blood group, colour, hobby.",
    ),
    mathCard(
      "Apakah data berangka?",
      "Data yang melibatkan nombor dan boleh diukur atau dikira. Terbahagi kepada data diskret dan data berterusan.",
      "What is numerical data?",
      "Data that involves numbers and can be measured or counted. Divided into discrete data and continuous data.",
    ),
    mathCard(
      "Apakah data diskret?",
      "Data berangka yang hanya boleh mengambil nilai nombor bulat tertentu. Diperoleh melalui pengiraan. Contoh: bilangan anak, bilangan buku.",
      "What is discrete data?",
      "Numerical data that can only take specific whole number values. Obtained by counting. Examples: number of children, number of books.",
    ),
    mathCard(
      "Apakah data berterusan?",
      "Data berangka yang boleh mengambil mana-mana nilai dalam julat termasuk perpuluhan. Diperoleh melalui pengukuran. Contoh: tinggi, jisim, suhu.",
      "What is continuous data?",
      "Numerical data that can take any value in a range including decimals. Obtained by measurement. Examples: height, mass, temperature.",
    ),
    mathCard(
      "Apakah perbezaan antara data diskret dan berterusan?",
      "Diskret: nilai nombor bulat sahaja (dikira). Berterusan: boleh ada perpuluhan (diukur). Soalan panduan: bolehkah nilai ini ada perpuluhan?",
      "What is the difference between discrete and continuous data?",
      "Discrete: whole number values only (counted). Continuous: can have decimals (measured). Guiding question: can this value have a decimal?",
    ),
    mathCard(
      "Apakah serakan data?",
      "Ukuran sejauh mana nilai-nilai dalam set data tersebar atau berbeza antara satu sama lain.",
      "What is data dispersion?",
      "A measure of how spread out or varied the values in a data set are from one another.",
    ),
    mathCard(
      "Apakah pencilan (outlier)?",
      "Nilai data yang jauh berbeza daripada nilai-nilai lain dalam set data. Dalam plot titik, ia kelihatan tersasing.",
      "What is an outlier?",
      "A data value that differs greatly from the other values in a data set. In a dot plot, it appears isolated from the cluster.",
    ),
    mathCard(
      "Apakah inferens?",
      "Kesimpulan logik yang dibuat berdasarkan data yang ada — melangkaui sekadar membaca nilai untuk membuat pernyataan yang lebih umum.",
      "What is an inference?",
      "A logical conclusion drawn from available data — going beyond simply reading values to make more general statements.",
    ),
    mathCard(
      "Apakah ramalan dalam statistik?",
      "Jangkaan tentang nilai atau kejadian masa hadapan berdasarkan corak atau trend dalam data sedia ada.",
      "What is a prediction in statistics?",
      "An expectation about a future value or event based on patterns or trends in existing data.",
    ),
    mathCard(
      "Apakah perwakilan data beretika?",
      "Memaparkan data secara jujur dan tepat tanpa mengelirukan pembaca — menggunakan skala konsisten dan paksi bermula dari sifar.",
      "What is ethical data representation?",
      "Presenting data honestly and accurately without misleading readers — using consistent scales and axes starting from zero.",
    ),
    mathCard(
      "Apakah yang dimaksudkan dengan trend dalam graf?",
      "Arah umum perubahan data — meningkat (trend positif), menurun (trend negatif), atau stabil (mendatar) dari kiri ke kanan.",
      "What does trend mean in a graph?",
      "The general direction of data change — increasing (positive trend), decreasing (negative trend), or stable (horizontal) from left to right.",
    ),
    mathCard(
      "Apakah mod kelas dalam histogram?",
      "Kelas yang mempunyai kekerapan tertinggi dalam histogram — palang yang paling tinggi.",
      "What is the modal class in a histogram?",
      "The class with the highest frequency in a histogram — the tallest bar.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah carta palang dan bilakah digunakannya?",
      "Carta menggunakan palang untuk membandingkan data kategori atau diskret. Ada ruang antara palang. Paksi-x: kategori, Paksi-y: kekerapan.",
      "What is a bar chart and when is it used?",
      "A chart using bars to compare categorical or discrete data. Has gaps between bars. x-axis: categories, y-axis: frequency.",
    ),
    mathCard(
      "Apakah carta pai dan bilakah digunakannya?",
      "Bulatan dibahagi kepada sektor untuk menunjukkan perkadaran setiap kategori daripada keseluruhan. Terbaik untuk 2–6 kategori.",
      "What is a pie chart and when is it used?",
      "A circle divided into sectors to show the proportion of each category from the whole. Best for 2–6 categories.",
    ),
    mathCard(
      "Apakah formula sudut sektor carta pai?",
      "Sudut sektor = (Kekerapan ÷ Jumlah Kekerapan) × 360°. Contoh: 12 daripada 40 → (12÷40) × 360° = 108°.",
      "What is the pie chart sector angle formula?",
      "Sector angle = (Frequency ÷ Total Frequency) × 360°. Example: 12 out of 40 → (12÷40) × 360° = 108°.",
    ),
    mathCard(
      "Apakah graf garis dan bilakah digunakannya?",
      "Graf menggunakan titik yang disambungkan dengan garis untuk menunjukkan perubahan data merentasi masa. Paksi-x: masa/urutan.",
      "What is a line graph and when is it used?",
      "A graph using connected points to show data changes over time. x-axis: time/sequence.",
    ),
    mathCard(
      "Apakah plot titik (dot plot)?",
      "Carta yang menggunakan titik di atas garis nombor untuk menunjukkan taburan data kecil. Setiap titik = satu nilai data.",
      "What is a dot plot?",
      "A chart using dots above a number line to show the distribution of small data sets. Each dot = one data value.",
    ),
    mathCard(
      "Apakah plot batang-dan-daun?",
      "Perwakilan data yang memisahkan nilai kepada batang (digit puluhan) dan daun (digit sa). Mengekalkan nilai asal data.",
      "What is a stem-and-leaf plot?",
      "A data representation that separates values into stem (tens digit) and leaf (units digit). Retains original data values.",
    ),
    mathCard(
      "Apakah histogram?",
      "Graf palang untuk data berterusan atau berkumpulan. TIADA ruang antara palang. Paksi-x: julat nilai berterusan.",
      "What is a histogram?",
      "A bar graph for continuous or grouped data. NO gaps between bars. x-axis: continuous value ranges.",
    ),
    mathCard(
      "Apakah poligon kekerapan?",
      "Graf garis yang dibina dengan menghubungkan titik tengah bahagian atas setiap palang histogram.",
      "What is a frequency polygon?",
      "A line graph constructed by connecting the midpoints of the tops of each histogram bar.",
    ),
    mathCard(
      "Bagaimanakah cara mengira titik tengah kelas?",
      "Titik tengah = (Had Bawah + Had Atas) ÷ 2. Contoh: Kelas 41–50 → titik tengah = (41+50) ÷ 2 = 45.5.",
      "How is a class midpoint calculated?",
      "Midpoint = (Lower Boundary + Upper Boundary) ÷ 2. Example: Class 41–50 → midpoint = (41+50) ÷ 2 = 45.5.",
    ),
    mathCard(
      "Apakah jadual kekerapan?",
      "Jadual yang mengorganisasikan data dengan menunjukkan setiap nilai/kelas bersama kekerapannya. Menggunakan lajur nilai, tanda turus dan kekerapan.",
      "What is a frequency table?",
      "A table that organises data by showing each value/class with its frequency. Uses columns for value, tally marks and frequency.",
    ),
    mathCard(
      "Bagaimanakah cara membina jadual kekerapan berkumpulan?",
      "① Tentukan julat data. ② Pilih lebar kelas yang sesuai. ③ Senaraikan kelas. ④ Kira kekerapan setiap kelas menggunakan tanda turus.",
      "How is a grouped frequency table constructed?",
      "① Determine data range. ② Choose appropriate class width. ③ List classes. ④ Count frequency of each class using tally marks.",
    ),
    mathCard(
      "Bagaimanakah cara membaca carta palang?",
      "① Lihat tajuk. ② Baca paksi-y untuk nilai kekerapan. ③ Baca paksi-x untuk kategori. ④ Bandingkan ketinggian palang.",
      "How is a bar chart read?",
      "① Look at the title. ② Read the y-axis for frequency values. ③ Read the x-axis for categories. ④ Compare bar heights.",
    ),
    mathCard(
      "Bagaimanakah cara membina plot batang-dan-daun?",
      "① Kenal pasti batang (puluhan). ② Tulis setiap batang. ③ Susun daun (digit sa) bagi setiap batang. ④ Tulis kunci. Contoh: 2|3 = 23.",
      "How is a stem-and-leaf plot constructed?",
      "① Identify stems (tens). ② Write each stem. ③ Arrange leaves (units) for each stem. ④ Write the key. Example: 2|3 = 23.",
    ),
    mathCard(
      "Apakah perbezaan antara carta palang dan histogram?",
      "Carta palang: ada ruang antara palang, untuk data kategori/diskret. Histogram: TIADA ruang, untuk data berkumpulan/berterusan.",
      "What is the difference between a bar chart and a histogram?",
      "Bar chart: has gaps between bars, for categorical/discrete data. Histogram: NO gaps, for grouped/continuous data.",
    ),
    mathCard(
      "Bagaimanakah cara mengira peratusan dalam carta pai?",
      "Peratusan = (Kekerapan ÷ Jumlah) × 100%. Contoh: 12 daripada 40 → (12÷40) × 100% = 30%.",
      "How is percentage calculated in a pie chart?",
      "Percentage = (Frequency ÷ Total) × 100%. Example: 12 out of 40 → (12÷40) × 100% = 30%.",
    ),
    mathCard(
      "Apakah 4 kaedah pengumpulan data?",
      "① Temu bual — soal jawab langsung. ② Pemerhatian — perhatikan dan catat. ③ Eksperimen — uji hipotesis. ④ Tinjauan — soal selidik kepada sampel.",
      "What are the 4 data collection methods?",
      "① Interviews — direct questioning. ② Observation — watch and record. ③ Experiments — test a hypothesis. ④ Surveys — questionnaires to a sample.",
    ),
    mathCard(
      "Bilakah tinjauan lebih baik daripada temu bual?",
      "Tinjauan lebih sesuai untuk sampel besar, lebih menjimatkan masa dan kos, boleh diedarkan secara bertulis atau dalam talian.",
      "When is a survey better than an interview?",
      "A survey is more suitable for large samples, more time- and cost-efficient, can be distributed in writing or online.",
    ),
  ],
  facts: [
    mathCard(
      "Histogram TIADA ruang antara palang — mengapa?",
      "Kerana data adalah berterusan/berkumpulan — nilai-nilai bersambungan tanpa jeda. Berbeza dengan carta palang (data berasingan/diskret).",
      "Histograms have NO gaps between bars — why?",
      "Because the data is continuous/grouped — values are connected without a break. Different from a bar chart (separate/discrete data).",
    ),
    mathCard(
      "Fakta: set data dengan julat lebih kecil adalah lebih...",
      "...konsisten dan lebih boleh dipercayai. Julat kecil bermaksud nilai-nilai rapat antara satu sama lain.",
      "Fact: a data set with a smaller range is more...",
      "...consistent and more reliable. A small range means values are close to each other.",
    ),
    mathCard(
      "Fakta: plot batang-dan-daun mengekalkan nilai...",
      "...asal data. Berbeza dengan histogram yang mengumpulkan data dalam kelas, plot batang-dan-daun mengekalkan setiap nilai tepat.",
      "Fact: a stem-and-leaf plot retains the...",
      "...original data values. Unlike histograms that group data into classes, stem-and-leaf plots retain each exact value.",
    ),
    mathCard(
      "Fakta: poligon kekerapan berguna untuk...",
      "...membandingkan dua atau lebih set data berkumpulan pada graf yang sama, kerana berbilang polygon boleh diplot serentak.",
      "Fact: a frequency polygon is useful for...",
      "...comparing two or more grouped data sets on the same graph, as multiple polygons can be plotted simultaneously.",
    ),
    mathCard(
      "Fakta: carta pai paling sesuai untuk...",
      "...data yang terdiri daripada 2 hingga 6 kategori, apabila kita ingin menunjukkan perkadaran setiap bahagian daripada keseluruhan.",
      "Fact: a pie chart is best suited for...",
      "...data consisting of 2 to 6 categories, when we want to show the proportion of each part from the whole.",
    ),
    mathCard(
      "Fakta: perwakilan data beretika bermaksud...",
      "...paksi bermula dari sifar, skala konsisten, semua paksi berlabel, nilai tepat, dan tidak memilih-milih data untuk menyokong hujah.",
      "Fact: ethical data representation means...",
      "...axes starting from zero, consistent scales, all axes labelled, accurate values, and not cherry-picking data to support an argument.",
    ),
    mathCard(
      "Fakta: julat dipengaruhi oleh...",
      "...pencilan (outlier) — nilai yang sangat luar biasa boleh membesarkan julat secara ketara, walaupun nilai-nilai lain rapat.",
      "Fact: range is affected by...",
      "...outliers — an unusually extreme value can significantly increase the range, even if other values are close together.",
    ),
    mathCard(
      "Fakta: data kategori TIDAK boleh...",
      "...ditambah, ditolak atau didarab secara bermakna. Kita hanya boleh mengira bilangan ahli dalam setiap kategori.",
      "Fact: categorical data CANNOT be...",
      "...added, subtracted or multiplied meaningfully. We can only count the number of members in each category.",
    ),
    mathCard(
      "Julat = ?",
      "Julat = Nilai Tertinggi − Nilai Terendah. Ia mengukur jumlah penyebaran data dari nilai paling kecil ke paling besar.",
      "Range = ?",
      "Range = Highest Value − Lowest Value. It measures the total spread of data from the smallest to the largest value.",
    ),
    mathCard(
      "Sudut sektor carta pai = ?",
      "(Kekerapan ÷ Jumlah Kekerapan) × 360°. Jumlah semua sudut mesti bersamaan 360°.",
      "Pie chart sector angle = ?",
      "(Frequency ÷ Total Frequency) × 360°. The sum of all angles must equal 360°.",
    ),
    mathCard(
      "Titik tengah kelas = ?",
      "(Had Bawah + Had Atas) ÷ 2. Digunakan untuk membina poligon kekerapan dan analisis data berkumpulan.",
      "Class midpoint = ?",
      "(Lower Boundary + Upper Boundary) ÷ 2. Used to construct frequency polygons and analyse grouped data.",
    ),
    mathCard(
      "Graf garis menunjukkan trend — apakah 3 arah yang mungkin?",
      "① Trend menaik (garis condong ke atas kanan). ② Trend menurun (garis condong ke bawah kanan). ③ Stabil (garis mendatar).",
      "Line graphs show trends — what are the 3 possible directions?",
      "① Upward trend (line slopes up to right). ② Downward trend (line slopes down to right). ③ Stable (horizontal line).",
    ),
    mathCard(
      "Apakah yang diperhatikan semasa mentafsir histogram?",
      "Bentuk taburan: loceng (normal), pencong kanan, pencong kiri, atau seragam. Kelas mod = palang tertinggi.",
      "What is observed when interpreting a histogram?",
      "Distribution shape: bell-shaped (normal), right-skewed, left-skewed, or uniform. Modal class = tallest bar.",
    ),
    mathCard(
      "Fakta: satu kelebihan pemerhatian berbanding temu bual ialah...",
      "...data lebih objektif kerana pengkaji tidak mengganggu tingkah laku subjek. Responden tidak boleh memberikan jawapan yang tidak jujur.",
      "Fact: one advantage of observation over interviews is...",
      "...data is more objective because the researcher does not disturb the subjects' behaviour. Respondents cannot give dishonest answers.",
    ),
  ],
  practice: [
    mathCard(
      "Data: 3, 7, 2, 9, 4, 8, 1. Cari julat.",
      "Tertinggi = 9, Terendah = 1. Julat = 9 − 1 = 8.",
      "Data: 3, 7, 2, 9, 4, 8, 1. Find the range.",
      "Highest = 9, Lowest = 1. Range = 9 − 1 = 8.",
    ),
    mathCard(
      "30 murid memilih warna kegemaran. Biru dipilih oleh 12 murid. Apakah sudut sektor biru dalam carta pai?",
      "(12÷30) × 360° = 0.4 × 360° = 144°.",
      "30 students choose their favourite colour. Blue is chosen by 12. What is the blue sector angle in the pie chart?",
      "(12÷30) × 360° = 0.4 × 360° = 144°.",
    ),
    mathCard(
      "Kelas 61–70 dalam jadual kekerapan. Apakah titik tengahnya?",
      "(61 + 70) ÷ 2 = 131 ÷ 2 = 65.5.",
      "Class 61–70 in a frequency table. What is its midpoint?",
      "(61 + 70) ÷ 2 = 131 ÷ 2 = 65.5.",
    ),
    mathCard(
      "Julat Kumpulan A = 15, Julat Kumpulan B = 28. Kumpulan manakah lebih konsisten?",
      "Kumpulan A lebih konsisten kerana julatnya lebih kecil (15 < 28). Julat lebih kecil = lebih konsisten.",
      "Range of Group A = 15, Range of Group B = 28. Which group is more consistent?",
      "Group A is more consistent because its range is smaller (15 < 28). Smaller range = more consistent.",
    ),
    mathCard(
      "50 murid dipilih dalam tinjauan. Matematik: 20, Sains: 15, BM: 10, Lain: 5. Apakah peratusan Matematik?",
      "(20÷50) × 100% = 40%.",
      "50 students are surveyed. Mathematics: 20, Science: 15, Malay: 10, Others: 5. What is the percentage for Mathematics?",
      "(20÷50) × 100% = 40%.",
    ),
    mathCard(
      "Plot batang-dan-daun: Batang 4, Daun 2, 5, 8. Apakah nilai-nilai ini?",
      "Batang 4 + Daun 2 = 42. Batang 4 + Daun 5 = 45. Batang 4 + Daun 8 = 48.",
      "Stem-and-leaf: Stem 4, Leaves 2, 5, 8. What are these values?",
      "Stem 4 + Leaf 2 = 42. Stem 4 + Leaf 5 = 45. Stem 4 + Leaf 8 = 48.",
    ),
    mathCard(
      "Markah 8 murid: 55, 60, 72, 48, 90, 65, 78, 83. Cari julat.",
      "Tertinggi = 90, Terendah = 48. Julat = 90 − 48 = 42 markah.",
      "Marks of 8 students: 55, 60, 72, 48, 90, 65, 78, 83. Find the range.",
      "Highest = 90, Lowest = 48. Range = 90 − 48 = 42 marks.",
    ),
    mathCard(
      "Apakah perwakilan yang paling sesuai untuk menunjukkan trend jualan bulanan selama setahun?",
      "Graf garis — kerana ia menunjukkan perubahan/trend data merentasi masa dengan jelas.",
      "What is the most suitable representation to show monthly sales trends over a year?",
      "Line graph — because it clearly shows data changes/trends over time.",
    ),
    mathCard(
      "Kekerapan kelas 51–60 = 8, jumlah = 40. Apakah peratusannya?",
      "(8÷40) × 100% = 20%.",
      "Frequency of class 51–60 = 8, total = 40. What is the percentage?",
      "(8÷40) × 100% = 20%.",
    ),
    mathCard(
      "Adakah 'bilangan buku dalam beg' data diskret atau berterusan?",
      "Diskret — kerana ia adalah bilangan (boleh dikira, nilai nombor bulat sahaja: 0, 1, 2, 3, ...). Tidak boleh ada 2.5 buku.",
      "Is 'number of books in a bag' discrete or continuous data?",
      "Discrete — because it is a count (whole numbers only: 0, 1, 2, 3, ...). Cannot have 2.5 books.",
    ),
    mathCard(
      "Adakah 'masa yang diambil untuk berlari 100m' data diskret atau berterusan?",
      "Berterusan — kerana ia adalah masa (ukuran). Boleh ada nilai perpuluhan seperti 12.47 saat.",
      "Is 'time taken to run 100m' discrete or continuous data?",
      "Continuous — because it is time (a measurement). Can have decimal values like 12.47 seconds.",
    ),
    mathCard(
      "Carta pai menunjukkan 4 kategori dengan sudut 90°, 120°, 80°, x°. Cari x.",
      "90 + 120 + 80 + x = 360. 290 + x = 360. x = 70°.",
      "A pie chart shows 4 categories with angles 90°, 120°, 80°, x°. Find x.",
      "90 + 120 + 80 + x = 360. 290 + x = 360. x = 70°.",
    ),
  ],
};

const legacyCards = (["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C12_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c12-${lang}-${category}-${index+1}`})));
export const C12_CHALLENGES=[
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "The scores are 3, 5, 7, 5, 10.",
      "parts": [
        "Find the sum.",
        "Find the mean.",
        "Find the mode."
      ],
      "answer": [
        [
          "3 + 5 + 7 + 5 + 10 = 30."
        ],
        [
          "30 ÷ 5 = 6."
        ],
        [
          "5."
        ]
      ]
    },
    "bm": {
      "prompt": "Skor ialah 3, 5, 7, 5, 10.",
      "parts": [
        "Cari jumlah.",
        "Cari min.",
        "Cari mod."
      ],
      "answer": [
        [
          "3 + 5 + 7 + 5 + 10 = 30."
        ],
        [
          "30 ÷ 5 = 6."
        ],
        [
          "5."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A list is 4, 9, 6, 8, 3.",
      "parts": [
        "Order the values.",
        "Find the median.",
        "Find the range."
      ],
      "answer": [
        [
          "3, 4, 6, 8, 9."
        ],
        [
          "6."
        ],
        [
          "9 − 3 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Senarai ialah 4, 9, 6, 8, 3.",
      "parts": [
        "Susun nilai.",
        "Cari median.",
        "Cari julat."
      ],
      "answer": [
        [
          "3, 4, 6, 8, 9."
        ],
        [
          "6."
        ],
        [
          "9 − 3 = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "The data are 2, 2, 4, 6, 6, 6.",
      "parts": [
        "Find the mode.",
        "Find the median.",
        "Find the mean."
      ],
      "answer": [
        [
          "6."
        ],
        [
          "(4 + 6)/2 = 5."
        ],
        [
          "26/6 = 4⅓."
        ]
      ]
    },
    "bm": {
      "prompt": "Data ialah 2, 2, 4, 6, 6, 6.",
      "parts": [
        "Cari mod.",
        "Cari median.",
        "Cari min."
      ],
      "answer": [
        [
          "6."
        ],
        [
          "(4 + 6)/2 = 5."
        ],
        [
          "26/6 = 4⅓."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A class recorded 8, 12, 9, 11, 10 points.",
      "parts": [
        "Find the mean.",
        "Find the median.",
        "Find the range."
      ],
      "answer": [
        [
          "50 ÷ 5 = 10."
        ],
        [
          "10."
        ],
        [
          "12 − 8 = 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelas merekodkan 8, 12, 9, 11, 10 mata.",
      "parts": [
        "Cari min.",
        "Cari median.",
        "Cari julat."
      ],
      "answer": [
        [
          "50 ÷ 5 = 10."
        ],
        [
          "10."
        ],
        [
          "12 − 8 = 4."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "The frequency table is value 1:2 pupils, value 2:3 pupils, value 3:5 pupils.",
      "parts": [
        "Find total frequency.",
        "Find weighted sum.",
        "Find the mean."
      ],
      "answer": [
        [
          "2 + 3 + 5 = 10."
        ],
        [
          "1(2) + 2(3) + 3(5) = 23."
        ],
        [
          "23/10 = 2.3."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadual kekerapan: nilai 1:2 murid, nilai 2:3 murid, nilai 3:5 murid.",
      "parts": [
        "Cari jumlah kekerapan.",
        "Cari jumlah berwajaran.",
        "Cari min."
      ],
      "answer": [
        [
          "2 + 3 + 5 = 10."
        ],
        [
          "1(2) + 2(3) + 3(5) = 23."
        ],
        [
          "23/10 = 2.3."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Out of 40 students, 15 choose red, 10 blue and 15 green.",
      "parts": [
        "Find the red sector angle.",
        "Find the blue sector angle.",
        "Check the green sector angle."
      ],
      "answer": [
        [
          "15/40 × 360 = 135°."
        ],
        [
          "10/40 × 360 = 90°."
        ],
        [
          "15/40 × 360 = 135°."
        ]
      ]
    },
    "bm": {
      "prompt": "Daripada 40 murid, 15 memilih merah, 10 biru dan 15 hijau.",
      "parts": [
        "Cari sudut sektor merah.",
        "Cari sudut sektor biru.",
        "Semak sudut sektor hijau."
      ],
      "answer": [
        [
          "15/40 × 360 = 135°."
        ],
        [
          "10/40 × 360 = 90°."
        ],
        [
          "15/40 × 360 = 135°."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A bar chart shows 12 books on Monday, 15 Tuesday, 9 Wednesday.",
      "parts": [
        "Find total books.",
        "Find the daily average.",
        "Find the difference between highest and lowest days."
      ],
      "answer": [
        [
          "12 + 15 + 9 = 36."
        ],
        [
          "36/3 = 12."
        ],
        [
          "15 − 9 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Carta palang menunjukkan 12 buku Isnin, 15 Selasa, 9 Rabu.",
      "parts": [
        "Cari jumlah buku.",
        "Cari purata harian.",
        "Cari beza hari tertinggi dan terendah."
      ],
      "answer": [
        [
          "12 + 15 + 9 = 36."
        ],
        [
          "36/3 = 12."
        ],
        [
          "15 − 9 = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "The heights are 140, 145, 150, 155, 160 cm.",
      "parts": [
        "Find the mean.",
        "Find the median.",
        "Find the range."
      ],
      "answer": [
        [
          "750/5 = 150 cm."
        ],
        [
          "150 cm."
        ],
        [
          "160 − 140 = 20 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Tinggi ialah 140, 145, 150, 155, 160 cm.",
      "parts": [
        "Cari min.",
        "Cari median.",
        "Cari julat."
      ],
      "answer": [
        [
          "750/5 = 150 cm."
        ],
        [
          "150 cm."
        ],
        [
          "160 − 140 = 20 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pie chart has sector angles 72°, 108° and x°.",
      "parts": [
        "Write the full-circle equation.",
        "Find x.",
        "Find the percentage represented by 108°."
      ],
      "answer": [
        [
          "72 + 108 + x = 360."
        ],
        [
          "x = 180°."
        ],
        [
          "108/360 × 100% = 30%."
        ]
      ]
    },
    "bm": {
      "prompt": "Carta pai mempunyai sudut sektor 72°, 108° dan x°.",
      "parts": [
        "Tulis persamaan bulatan penuh.",
        "Cari x.",
        "Cari peratus diwakili 108°."
      ],
      "answer": [
        [
          "72 + 108 + x = 360."
        ],
        [
          "x = 180°."
        ],
        [
          "108/360 × 100% = 30%."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "The data 4, 6, 8, x have a mean of 7.",
      "parts": [
        "Find the required total.",
        "Solve for x.",
        "Find the new range."
      ],
      "answer": [
        [
          "7 × 4 = 28."
        ],
        [
          "x = 28 − 18 = 10."
        ],
        [
          "10 − 4 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Data 4, 6, 8, x mempunyai min 7.",
      "parts": [
        "Cari jumlah diperlukan.",
        "Selesaikan x.",
        "Cari julat baharu."
      ],
      "answer": [
        [
          "7 × 4 = 28."
        ],
        [
          "x = 28 − 18 = 10."
        ],
        [
          "10 − 4 = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two data sets are A={4,6,8}, B={3,6,9}.",
      "parts": [
        "Find mean of A.",
        "Find mean of B.",
        "Which set has the larger range?"
      ],
      "answer": [
        [
          "(4 + 6 + 8)/3 = 6."
        ],
        [
          "(3 + 6 + 9)/3 = 6."
        ],
        [
          "B: range 6 versus A: range 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua set data ialah A={4,6,8}, B={3,6,9}.",
      "parts": [
        "Cari min A.",
        "Cari min B.",
        "Set manakah mempunyai julat lebih besar?"
      ],
      "answer": [
        [
          "(4 + 6 + 8)/3 = 6."
        ],
        [
          "(3 + 6 + 9)/3 = 6."
        ],
        [
          "B: range 6 versus A: range 4."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tally chart records mango: 7, apple: 11 and banana: 6.",
      "parts": [
        "Find the total fruits.",
        "Identify the mode category.",
        "Find the fraction that are apples."
      ],
      "answer": [
        [
          "7 + 11 + 6 = 24."
        ],
        [
          "Apple / epal."
        ],
        [
          "11/24."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadual gundal merekodkan mangga: 7, epal: 11 dan pisang: 6.",
      "parts": [
        "Cari jumlah buah.",
        "Kenal pasti kategori mod.",
        "Cari pecahan epal."
      ],
      "answer": [
        [
          "7 + 11 + 6 = 24."
        ],
        [
          "Apple / epal."
        ],
        [
          "11/24."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "The numbers are 9, 9, 9, 12, 15, 18.",
      "parts": [
        "Find mode.",
        "Find median.",
        "Find mean."
      ],
      "answer": [
        [
          "9."
        ],
        [
          "(9 + 12)/2 = 10.5."
        ],
        [
          "72/6 = 12."
        ]
      ]
    },
    "bm": {
      "prompt": "Nombor ialah 9, 9, 9, 12, 15, 18.",
      "parts": [
        "Cari mod.",
        "Cari median.",
        "Cari min."
      ],
      "answer": [
        [
          "9."
        ],
        [
          "(9 + 12)/2 = 10.5."
        ],
        [
          "72/6 = 12."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pie chart represents 80 students, and the Science sector is 90°.",
      "parts": [
        "Find Science fraction.",
        "Find number of Science students.",
        "Find percentage represented."
      ],
      "answer": [
        [
          "90/360 = 1/4."
        ],
        [
          "80 × 1/4 = 20."
        ],
        [
          "25%."
        ]
      ]
    },
    "bm": {
      "prompt": "Carta pai mewakili 80 murid dan sektor Sains 90°.",
      "parts": [
        "Cari pecahan Sains.",
        "Cari bilangan murid Sains.",
        "Cari peratus diwakili."
      ],
      "answer": [
        [
          "90/360 = 1/4."
        ],
        [
          "80 × 1/4 = 20."
        ],
        [
          "25%."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A frequency table shows 2 occurring 3 times, 4 occurring 2 times, 6 occurring 5 times.",
      "parts": [
        "Find total frequency.",
        "Find sum of all values.",
        "Find mean."
      ],
      "answer": [
        [
          "3 + 2 + 5 = 10."
        ],
        [
          "2(3) + 4(2) + 6(5) = 44."
        ],
        [
          "44/10 = 4.4."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadual kekerapan menunjukkan 2 sebanyak 3 kali, 4 sebanyak 2 kali dan 6 sebanyak 5 kali.",
      "parts": [
        "Cari jumlah kekerapan.",
        "Cari jumlah nilai.",
        "Cari min."
      ],
      "answer": [
        [
          "3 + 2 + 5 = 10."
        ],
        [
          "2(3) + 4(2) + 6(5) = 44."
        ],
        [
          "44/10 = 4.4."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A survey finds 18 students travel by bus, 12 walk, 10 cycle.",
      "parts": [
        "Find total surveyed.",
        "Find the percentage who walk.",
        "Find the central angle for cycling in a pie chart."
      ],
      "answer": [
        [
          "18 + 12 + 10 = 40."
        ],
        [
          "12/40 × 100 = 30%."
        ],
        [
          "10/40 × 360 = 90°."
        ]
      ]
    },
    "bm": {
      "prompt": "Tinjauan mendapati 18 murid naik bas, 12 berjalan kaki, 10 berbasikal.",
      "parts": [
        "Cari jumlah murid.",
        "Cari peratus berjalan kaki.",
        "Cari sudut sektor berbasikal dalam carta pai."
      ],
      "answer": [
        [
          "18 + 12 + 10 = 40."
        ],
        [
          "12/40 × 100 = 30%."
        ],
        [
          "10/40 × 360 = 90°."
        ]
      ]
    }
  }
];
export function buildMathF1C12Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacyCards.length!==58||C12_CHALLENGES.length!==16)throw new Error("Chapter 12 flashcard count invariant failed");
 return legacyCards.map(({entry,id},index)=>{
   const mode=index<12?"concept":index<42?"practice":"challenge";
   const challenge=mode==="challenge"?C12_CHALLENGES[index-42]:null;
   const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
   return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 12",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??"12.1",reviewMode:mode,structured};
 });
}
