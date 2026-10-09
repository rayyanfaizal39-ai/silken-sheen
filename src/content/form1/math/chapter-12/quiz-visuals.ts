import type { LocalizedText, MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Data displays for the Form 1 Chapter 12 (Data Handling) objective quizzes.
 * Each object is shared by a BM question and its DLP pair, so both languages
 * read identical data. Only representations taught in the Chapter 12 notes
 * are used: frequency table, bar chart, pie chart, line graph, dot plot,
 * stem-and-leaf plot, histogram and frequency polygon.
 */
const FREQUENCY: LocalizedText = { bm: "Kekerapan", dlp: "Frequency" };
const STUDENTS: LocalizedText = { bm: "Bilangan murid", dlp: "Number of students" };
const MARKS: LocalizedText = { bm: "Markah", dlp: "Marks" };
const MONTH: LocalizedText = { bm: "Bulan", dlp: "Month" };
const YEAR: LocalizedText = { bm: "Tahun", dlp: "Year" };
const SECTOR_ANGLES: LocalizedText = { bm: "Sudut sektor", dlp: "Sector angles" };
const MAR: LocalizedText = { bm: "Mac", dlp: "Mar" };
const MAY: LocalizedText = { bm: "Mei", dlp: "May" };

export const MATH_F1_C12_QUIZ_VISUALS = {
  // ── Objective 1 ────────────────────────────────────────────────────────
  booksRead: {
    kind: "frequency-table",
    title: {
      bm: "Bilangan buku yang dibaca oleh murid dalam seminggu",
      dlp: "Number of books read by students in a week",
    },
    valueHeading: { bm: "Bilangan buku", dlp: "Number of books" },
    frequencyHeading: FREQUENCY,
    rows: [
      { value: "0", frequency: 3 },
      { value: "1", frequency: 5 },
      { value: "2", frequency: 9 },
      { value: "3", frequency: 4 },
      { value: "4", frequency: 2 },
    ],
  },
  goalsScored: {
    kind: "dot-plot",
    title: {
      bm: "Bilangan gol yang dijaringkan dalam setiap perlawanan",
      dlp: "Number of goals scored in each match",
    },
    xLabel: { bm: "Bilangan gol", dlp: "Number of goals" },
    min: 0,
    max: 5,
    values: [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4],
  },

  // ── Objective 2 ────────────────────────────────────────────────────────
  favouriteSubjects: {
    kind: "bar-chart",
    title: { bm: "Subjek kegemaran murid", dlp: "Students' favourite subjects" },
    yLabel: STUDENTS,
    bars: [
      { label: { bm: "Matematik", dlp: "Maths" }, value: 15 },
      { label: { bm: "Sains", dlp: "Science" }, value: 12 },
      { label: { bm: "BM", dlp: "Malay" }, value: 9 },
      { label: { bm: "Sejarah", dlp: "History" }, value: 6 },
    ],
  },
  roboticsClub: {
    kind: "bar-chart",
    title: {
      bm: "Bilangan murid kelab robotik mengikut kelas",
      dlp: "Number of robotics club members by class",
    },
    yLabel: STUDENTS,
    bars: [
      { label: "1A", value: 8 },
      { label: "1B", value: 12 },
      { label: "1C", value: 6 },
      { label: "1D", value: 10 },
      { label: "1E", value: 4 },
    ],
  },
  favouriteActivities: {
    kind: "pie-chart",
    title: { bm: "Aktiviti kegemaran 50 orang murid", dlp: "Favourite activities of 50 students" },
    sectors: [
      { label: { bm: "Sukan", dlp: "Sports" }, angle: 144, text: "40%" },
      { label: { bm: "Muzik", dlp: "Music" }, angle: 108, text: "30%" },
      { label: { bm: "Seni", dlp: "Arts" }, angle: 72, text: "20%" },
      { label: { bm: "Lain-lain", dlp: "Others" }, angle: 36, text: "10%" },
    ],
  },
  shopSales: {
    kind: "line-graph",
    title: { bm: "Jualan sebuah kedai (RM)", dlp: "Sales of a shop (RM)" },
    xLabel: MONTH,
    yLabel: { bm: "Jualan (RM)", dlp: "Sales (RM)" },
    xLabels: ["Jan", "Feb", MAR, "Apr", MAY],
    series: [{ values: [200, 240, 260, 300, 350] }],
  },
  testMarks: {
    kind: "frequency-table",
    title: { bm: "Markah ujian sekumpulan murid", dlp: "Test marks of a group of students" },
    valueHeading: MARKS,
    frequencyHeading: FREQUENCY,
    rows: [
      { value: "41–50", frequency: 5 },
      { value: "51–60", frequency: 8 },
      { value: "61–70", frequency: 12 },
      { value: "71–80", frequency: 10 },
      { value: "81–90", frequency: 5 },
    ],
  },
  quizMarksStems: {
    kind: "stem-leaf",
    title: { bm: "Markah kuiz murid", dlp: "Students' quiz marks" },
    values: [21, 27, 32, 35, 38, 39, 40, 46],
    key: { bm: "Kunci: 2 | 1 bermaksud 21", dlp: "Key: 2 | 1 means 21" },
  },
  scienceMarksStems: {
    kind: "stem-leaf",
    title: { bm: "Markah ujian sains", dlp: "Science test marks" },
    values: [23, 25, 27, 31, 34, 38, 42, 46],
    key: { bm: "Kunci: 2 | 3 bermaksud 23", dlp: "Key: 2 | 3 means 23" },
  },
  quizMarksDots: {
    kind: "dot-plot",
    title: { bm: "Markah kuiz murid", dlp: "Students' quiz marks" },
    xLabel: MARKS,
    min: 3,
    max: 10,
    values: [4, 7, 7, 7, 8, 8, 8, 8, 9, 9],
  },
  booksBorrowedDots: {
    kind: "dot-plot",
    title: {
      bm: "Bilangan buku yang dipinjam oleh murid",
      dlp: "Number of books borrowed by students",
    },
    xLabel: { bm: "Bilangan buku", dlp: "Number of books" },
    min: 3,
    max: 9,
    values: [4, 7, 7, 7, 8, 8, 8, 8],
  },
  fourSectors: {
    kind: "pie-chart",
    title: SECTOR_ANGLES,
    sectors: [
      { label: "A", angle: 90, text: "90°" },
      { label: "B", angle: 120, text: "120°" },
      { label: "C", angle: 80, text: "80°" },
      { label: "D", angle: 70, text: "x" },
    ],
  },
  scienceClubAttendance: {
    kind: "line-graph",
    title: {
      bm: "Kehadiran murid ke kelab sains",
      dlp: "Student attendance at the science club",
    },
    xLabel: MONTH,
    yLabel: STUDENTS,
    xLabels: ["Jan", "Feb", MAR, "Apr"],
    series: [{ values: [45, 42, 48, 50] }],
  },
  heights: {
    kind: "histogram",
    title: { bm: "Tinggi sekumpulan murid", dlp: "Heights of a group of students" },
    xLabel: { bm: "Tinggi (cm)", dlp: "Height (cm)" },
    yLabel: FREQUENCY,
    classes: [
      { label: "145–150", frequency: 5 },
      { label: "150–155", frequency: 8 },
      { label: "155–160", frequency: 12 },
      { label: "160–165", frequency: 6 },
    ],
  },
  travelTime: {
    kind: "frequency-table",
    title: {
      bm: "Masa perjalanan murid ke sekolah",
      dlp: "Students' travel time to school",
    },
    valueHeading: { bm: "Masa (minit)", dlp: "Time (minutes)" },
    frequencyHeading: FREQUENCY,
    rows: [
      { value: "1–10", frequency: 6 },
      { value: "11–20", frequency: 9 },
      { value: "21–30", frequency: 8 },
      { value: "31–40", frequency: 4 },
      { value: "41–50", frequency: 3 },
    ],
  },
  runnerAgesStems: {
    kind: "stem-leaf",
    title: { bm: "Umur peserta larian (tahun)", dlp: "Ages of fun-run participants (years)" },
    values: [15, 18, 23, 26, 29, 31, 34, 37, 42],
    key: { bm: "Kunci: 1 | 5 bermaksud 15 tahun", dlp: "Key: 1 | 5 means 15 years" },
  },
  libraryAttendance: {
    kind: "line-graph",
    title: { bm: "Kehadiran murid ke perpustakaan", dlp: "Student attendance at the library" },
    xLabel: { bm: "Hari", dlp: "Day" },
    yLabel: STUDENTS,
    xLabels: [
      { bm: "Isn", dlp: "Mon" },
      { bm: "Sel", dlp: "Tue" },
      { bm: "Rab", dlp: "Wed" },
      { bm: "Kha", dlp: "Thu" },
      { bm: "Jum", dlp: "Fri" },
    ],
    series: [{ values: [35, 38, 40, 37, 32] }],
  },
  massesSmallStems: {
    kind: "stem-leaf",
    title: { bm: "Jisim enam orang murid (kg)", dlp: "Masses of six students (kg)" },
    values: [50, 54, 57, 62, 62, 68],
    key: { bm: "Kunci: 5 | 0 bermaksud 50 kg", dlp: "Key: 5 | 0 means 50 kg" },
  },
  favouriteSports: {
    kind: "pie-chart",
    title: { bm: "Sukan kegemaran 50 orang murid", dlp: "Favourite sports of 50 students" },
    sectors: [
      { label: { bm: "Bola sepak", dlp: "Football" }, angle: 144, text: "144°" },
      { label: "Badminton", angle: 108, text: "108°" },
      { label: { bm: "Bola jaring", dlp: "Netball" }, angle: 72, text: "72°" },
      { label: { bm: "Lain-lain", dlp: "Others" }, angle: 36, text: "36°" },
    ],
  },
  pushUpsDots: {
    kind: "dot-plot",
    title: {
      bm: "Bilangan tekan tubi murid dalam seminit",
      dlp: "Number of push-ups students did in one minute",
    },
    xLabel: { bm: "Bilangan tekan tubi", dlp: "Number of push-ups" },
    min: 11,
    max: 21,
    values: [12, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 20],
  },


  // Extra visuals used by representation-first quiz questions.
  mathPreference40: {
    kind: "pie-chart",
    title: {
      bm: "Pilihan subjek 40 orang murid",
      dlp: "Subject preference of 40 students",
    },
    sectors: [
      { label: { bm: "Matematik", dlp: "Mathematics" }, angle: 144, text: "16" },
      { label: { bm: "Lain-lain", dlp: "Others" }, angle: 216, text: "24" },
    ],
  },
  midpointClasses: {
    kind: "frequency-table",
    title: { bm: "Jadual kekerapan markah", dlp: "Frequency table of marks" },
    valueHeading: { bm: "Selang kelas", dlp: "Class interval" },
    frequencyHeading: FREQUENCY,
    rows: [
      { value: "45–55", frequency: 4 },
      { value: "55–65", frequency: 9 },
      { value: "65–75", frequency: 5 },
    ],
  },
  quarterCategory: {
    kind: "pie-chart",
    title: { bm: "Perkadaran kategori X", dlp: "Proportion of category X" },
    sectors: [
      { label: "X", angle: 90, text: "25%" },
      { label: { bm: "Lain-lain", dlp: "Others" }, angle: 270, text: "75%" },
    ],
  },
  survey30: {
    kind: "pie-chart",
    title: { bm: "Tinjauan 30 orang murid", dlp: "Survey of 30 students" },
    sectors: [
      { label: "X", angle: 144, text: "12" },
      { label: { bm: "Lain-lain", dlp: "Others" }, angle: 216, text: "18" },
    ],
  },

  // ── Objective 3 ────────────────────────────────────────────────────────
  museumVisitors: {
    kind: "line-graph",
    title: { bm: "Pelawat sebuah muzium (ribu)", dlp: "Visitors to a museum (thousands)" },
    xLabel: YEAR,
    yLabel: { bm: "Pelawat (ribu)", dlp: "Visitors (thousands)" },
    xLabels: ["2021", "2022", "2023", "2024"],
    series: [{ values: [45, 52, 58, 65] }],
  },
  productSales: {
    kind: "bar-chart",
    title: {
      bm: "Jualan empat produk (RM ribu)",
      dlp: "Sales of four products (RM thousand)",
    },
    yLabel: { bm: "Jualan (RM ribu)", dlp: "Sales (RM thousand)" },
    bars: [
      { label: "A", value: 5 },
      { label: "B", value: 8 },
      { label: "C", value: 6 },
      { label: "D", value: 3 },
    ],
  },
  fiftyMarksHistogram: {
    kind: "histogram",
    title: { bm: "Markah 50 orang murid", dlp: "Marks of 50 students" },
    xLabel: MARKS,
    yLabel: FREQUENCY,
    classes: [
      { label: "41–50", frequency: 5 },
      { label: "51–60", frequency: 10 },
      { label: "61–70", frequency: 20 },
      { label: "71–80", frequency: 10 },
      { label: "81–90", frequency: 5 },
    ],
  },
  studentMasses: {
    kind: "stem-leaf",
    title: { bm: "Jisim 13 orang murid (kg)", dlp: "Masses of 13 students (kg)" },
    values: [38, 39, 40, 42, 45, 45, 47, 49, 51, 53, 54, 56, 74],
    key: { bm: "Kunci: 3 | 8 bermaksud 38 kg", dlp: "Key: 3 | 8 means 38 kg" },
  },
  hourlyTemperature: {
    kind: "line-graph",
    title: { bm: "Suhu setiap jam (°C)", dlp: "Hourly temperature (°C)" },
    xLabel: { bm: "Masa", dlp: "Time" },
    yLabel: { bm: "Suhu (°C)", dlp: "Temperature (°C)" },
    xLabels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
    series: [{ values: [28, 30, 33, 35, 34, 32] }],
  },
  puzzleTimesStems: {
    kind: "stem-leaf",
    title: {
      bm: "Masa menyiapkan teka-teki (minit)",
      dlp: "Time taken to finish a puzzle (minutes)",
    },
    values: [12, 15, 18, 20, 23, 26, 29, 31, 34, 37, 40, 43],
    key: { bm: "Kunci: 1 | 2 bermaksud 12 minit", dlp: "Key: 1 | 2 means 12 minutes" },
  },
  sleepHours: {
    kind: "dot-plot",
    title: {
      bm: "Bilangan jam tidur murid pada suatu malam",
      dlp: "Number of hours students slept one night",
    },
    xLabel: { bm: "Bilangan jam", dlp: "Number of hours" },
    min: 3,
    max: 10,
    values: [4, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9, 9, 9],
  },
  fiveSectors: {
    kind: "pie-chart",
    title: SECTOR_ANGLES,
    sectors: [
      { label: "A", angle: 72, text: "72°" },
      { label: "B", angle: 108, text: "108°" },
      { label: "C", angle: 54, text: "54°" },
      { label: "D", angle: 90, text: "90°" },
      { label: "E", angle: 36, text: "x" },
    ],
  },
  classMarksHistogram: {
    kind: "histogram",
    title: { bm: "Markah sekumpulan murid", dlp: "Marks of a group of students" },
    xLabel: MARKS,
    yLabel: FREQUENCY,
    classes: [
      { label: "50–60", frequency: 6 },
      { label: "60–70", frequency: 15 },
      { label: "70–80", frequency: 10 },
      { label: "80–90", frequency: 4 },
    ],
  },
  passRates: {
    kind: "line-graph",
    title: { bm: "Peratusan kelulusan sebuah sekolah", dlp: "Pass rate of a school" },
    xLabel: YEAR,
    yLabel: { bm: "Peratusan lulus (%)", dlp: "Pass rate (%)" },
    xLabels: ["2019", "2020", "2021", "2022", "2023"],
    series: [{ values: [78, 75, 80, 83, 85] }],
  },
  correctAnswersDots: {
    kind: "dot-plot",
    title: {
      bm: "Bilangan soalan dijawab dengan betul",
      dlp: "Number of questions answered correctly",
    },
    xLabel: { bm: "Bilangan soalan betul", dlp: "Correct answers" },
    min: 4,
    max: 13,
    values: [5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 12],
  },
  finalMarks: {
    kind: "frequency-table",
    title: { bm: "Markah ujian akhir murid", dlp: "Students' final test marks" },
    valueHeading: MARKS,
    frequencyHeading: FREQUENCY,
    rows: [
      { value: "60–70", frequency: 8 },
      { value: "70–80", frequency: 15 },
      { value: "80–90", frequency: 12 },
      { value: "90–100", frequency: 5 },
    ],
  },
  twoClassPolygons: {
    kind: "frequency-polygon",
    title: {
      bm: "Markah ujian Kelas X dan Kelas Y",
      dlp: "Test marks of Class X and Class Y",
    },
    xLabel: { bm: "Titik tengah markah", dlp: "Mark midpoint" },
    yLabel: FREQUENCY,
    xLabels: ["45", "55", "65", "75", "85"],
    series: [
      { name: { bm: "Kelas X", dlp: "Class X" }, values: [8, 10, 6, 3, 1] },
      { name: { bm: "Kelas Y", dlp: "Class Y" }, values: [1, 3, 6, 10, 8] },
    ],
  },
  yearlySales: {
    kind: "line-graph",
    title: {
      bm: "Jualan bulanan sebuah kedai (RM ribu)",
      dlp: "Monthly sales of a shop (RM thousand)",
    },
    xLabel: MONTH,
    yLabel: { bm: "Jualan (RM ribu)", dlp: "Sales (RM thousand)" },
    xLabels: [
      "Jan",
      "Feb",
      MAR,
      "Apr",
      MAY,
      "Jun",
      "Jul",
      { bm: "Ogo", dlp: "Aug" },
      "Sep",
      { bm: "Okt", dlp: "Oct" },
      "Nov",
      { bm: "Dis", dlp: "Dec" },
    ],
    series: [{ values: [20, 24, 28, 33, 37, 42, 39, 34, 30, 26, 22, 18] }],
    showValues: false,
  },
  diseaseCases: {
    kind: "line-graph",
    title: { bm: "Bilangan kes suatu penyakit", dlp: "Number of cases of a disease" },
    xLabel: YEAR,
    yLabel: { bm: "Bilangan kes", dlp: "Number of cases" },
    xLabels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    series: [{ values: [90, 84, 77, 70, 64, 57, 50, 44, 38, 31] }],
    showValues: false,
  },
  classHeights: {
    kind: "histogram",
    title: { bm: "Tinggi murid sebuah kelas", dlp: "Heights of students in a class" },
    xLabel: { bm: "Tinggi (cm)", dlp: "Height (cm)" },
    yLabel: FREQUENCY,
    classes: [
      { label: "140–145", frequency: 2 },
      { label: "145–150", frequency: 7 },
      { label: "150–155", frequency: 12 },
      { label: "155–160", frequency: 8 },
      { label: "160–165", frequency: 3 },
    ],
  },
  familySpending: {
    kind: "pie-chart",
    title: {
      bm: "Perbelanjaan bulanan keluarga (RM1 200)",
      dlp: "Monthly family spending (RM1 200)",
    },
    sectors: [
      { label: { bm: "Makanan", dlp: "Food" }, angle: 120, text: "120°" },
      { label: { bm: "Sewa rumah", dlp: "Rent" }, angle: 90, text: "90°" },
      { label: { bm: "Pengangkutan", dlp: "Transport" }, angle: 60, text: "60°" },
      { label: { bm: "Simpanan", dlp: "Savings" }, angle: 45, text: "45°" },
      { label: { bm: "Lain-lain", dlp: "Others" }, angle: 45, text: "45°" },
    ],
  },
} satisfies Record<string, MathQuestionVisual>;
