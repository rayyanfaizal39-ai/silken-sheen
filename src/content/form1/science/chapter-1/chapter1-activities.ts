import type { BilingualText, Chapter1LearningMode } from "./chapter1-canonical";

export type Chapter1Section = "science" | "laboratory" | "units" | "measurement" | "density" | "investigation" | "values";

export interface Chapter1LearningExperience {
  id: string;
  section: Chapter1Section;
  standards: `1.${number}.${number}`[];
  mode: Extract<Chapter1LearningMode, "ACTIVITY" | "EXPERIMENT" | "PRACTICE">;
  title: BilingualText;
  purpose: BilingualText;
  instructions: BilingualText[];
  studentOutput: BilingualText;
  practicalNotice?: BilingualText;
}

const teacherGuidedNotice: BilingualText = {
  en: "Teacher/lab-guided physical task. A digital check does not prove that this practical outcome has been completed.",
  bm: "Tugasan fizikal dengan bimbingan guru/makmal. Semakan digital tidak membuktikan bahawa hasil amali ini telah diselesaikan.",
};

export const chapter1LearningExperiences: Chapter1LearningExperience[] = [
  {
    id: "apparatus-draw-classify", section: "laboratory", standards: ["1.2.1", "1.2.3"], mode: "PRACTICE",
    title: { en: "Handle, draw and classify real apparatus", bm: "Kendalikan, lukis dan kelaskan radas sebenar" },
    purpose: { en: "Complete the manipulative and drawing outcome using real laboratory apparatus.", bm: "Lengkapkan hasil manipulatif dan lukisan menggunakan radas makmal sebenar." },
    instructions: [
      { en: "With your teacher, identify the real apparatus, state its function, then draw and label it in the practical book.", bm: "Bersama guru, kenal pasti radas sebenar, nyatakan fungsinya, kemudian lukis dan labelkannya dalam buku amali." },
      { en: "Classify the apparatus by use and present the tree map.", bm: "Kelaskan radas mengikut kegunaan dan bentangkan peta pokok." },
    ],
    studentOutput: { en: "Teacher-checked handling, labelled drawings and a classification tree.", bm: "Pengendalian yang disemak guru, lukisan berlabel dan peta pokok pengelasan." }, practicalNotice: teacherGuidedNotice,
  },
  {
    id: "measurement-stations", section: "measurement", standards: ["1.4.1", "1.4.2"], mode: "EXPERIMENT",
    title: { en: "Measure with real instruments", bm: "Ukur menggunakan alat sebenar" },
    purpose: { en: "Use suitable instruments correctly and compare their smallest scale divisions.", bm: "Gunakan alat yang sesuai dengan betul dan bandingkan nilai senggatan terkecilnya." },
    instructions: [
      { en: "At teacher-prepared stations, measure the required quantities and record the unit and smallest scale division.", bm: "Di stesen yang disediakan guru, ukur kuantiti yang ditetapkan dan rekod unit serta nilai senggatan terkecil." },
      { en: "Take three readings, calculate the average and compare standard and higher-accuracy instruments.", bm: "Ambil tiga bacaan, hitung purata dan bandingkan alat piawai dengan alat yang lebih jitu." },
    ],
    studentOutput: { en: "Real readings, averages, units and instrument comparison.", bm: "Bacaan sebenar, purata, unit dan perbandingan alat." }, practicalNotice: teacherGuidedNotice,
  },
  {
    id: "estimate-then-measure", section: "measurement", standards: ["1.4.4"], mode: "PRACTICE",
    title: { en: "Estimate, then verify physically", bm: "Anggar, kemudian sahkan secara fizikal" },
    purpose: { en: "Compare an estimate with an actual measurement.", bm: "Bandingkan anggaran dengan pengukuran sebenar." },
    instructions: [{ en: "Estimate a table length with a pencil of known length, then measure it with a ruler or measuring tape.", bm: "Anggar panjang meja menggunakan pensel yang diketahui panjangnya, kemudian ukur dengan pembaris atau pita pengukur." }],
    studentOutput: { en: "Estimated value, measured value and their difference.", bm: "Nilai anggaran, nilai ukuran dan perbezaannya." }, practicalNotice: teacherGuidedNotice,
  },
  {
    id: "density-cubes", section: "density", standards: ["1.5.1", "1.5.2", "1.5.3"], mode: "EXPERIMENT",
    title: { en: "Test equal-volume density cubes", bm: "Uji kubus ketumpatan sama isi padu" },
    purpose: { en: "Build the operational definition of density from real measurements and observations.", bm: "Bina definisi secara operasi bagi ketumpatan daripada ukuran dan pemerhatian sebenar." },
    instructions: [
      { en: "Measure the mass of equal-volume copper, iron, cork and wood cubes, calculate density and arrange them in ascending order.", bm: "Ukur jisim kubus kuprum, besi, gabus dan kayu yang sama isi padu, hitung ketumpatan dan susun secara menaik." },
      { en: "Test each cube in water and state the operational definition from what was done and observed.", bm: "Uji setiap kubus di dalam air dan nyatakan definisi secara operasi berdasarkan perkara yang dilakukan dan diperhatikan." },
    ],
    studentOutput: { en: "Measurements, calculations, observations and an operational definition.", bm: "Ukuran, pengiraan, pemerhatian dan definisi secara operasi." }, practicalNotice: teacherGuidedNotice,
  },
  {
    id: "water-displacement-density", section: "density", standards: ["1.5.4"], mode: "EXPERIMENT",
    title: { en: "Determine an irregular stone's density", bm: "Tentukan ketumpatan batu tidak sekata" },
    purpose: { en: "Use real mass and water-displacement measurements.", bm: "Gunakan ukuran jisim dan sesaran air yang sebenar." },
    instructions: [
      { en: "Measure mass, initial water volume and final water volume after fully submerging the stone.", bm: "Ukur jisim, isi padu awal air dan isi padu akhir air selepas batu ditenggelamkan sepenuhnya." },
      { en: "Calculate stone volume by displacement, then calculate density with units.", bm: "Hitung isi padu batu melalui sesaran, kemudian hitung ketumpatan berserta unit." },
    ],
    studentOutput: { en: "Real measurements and a density calculation with units.", bm: "Ukuran sebenar dan pengiraan ketumpatan berserta unit." }, practicalNotice: teacherGuidedNotice,
  },
  {
    id: "density-innovation", section: "density", standards: ["1.5.6"], mode: "ACTIVITY",
    title: { en: "Create using density differences", bm: "Cipta menggunakan perbezaan ketumpatan" },
    purpose: { en: "Produce an object, food or drink using the density concept.", bm: "Hasilkan objek, makanan atau minuman menggunakan konsep ketumpatan." },
    instructions: [{ en: "Predict the layer order, make the teacher-approved product, then explain the observed order using density.", bm: "Ramalkan urutan lapisan, hasilkan produk yang diluluskan guru, kemudian terangkan urutan yang diperhatikan menggunakan ketumpatan." }],
    studentOutput: { en: "A physical product, prediction and density-based explanation.", bm: "Produk fizikal, ramalan dan penerangan berdasarkan ketumpatan." }, practicalNotice: teacherGuidedNotice,
  },
  {
    id: "pendulum-investigation", section: "investigation", standards: ["1.6.2", "1.6.3"], mode: "EXPERIMENT",
    title: { en: "Conduct the pendulum investigation", bm: "Jalankan penyiasatan bandul" },
    purpose: { en: "Apply all nine steps to the textbook pendulum problem and produce a complete report.", bm: "Gunakan kesemua sembilan langkah bagi masalah bandul buku teks dan hasilkan laporan lengkap." },
    instructions: [
      { en: "Plan and conduct the teacher-supervised investigation on pendulum length and the time for one complete oscillation.", bm: "Rancang dan jalankan penyiasatan di bawah pengawasan guru tentang panjang bandul dan masa satu ayunan lengkap." },
      { en: "Take three readings, average them, graph and interpret the data, conclude and write the report.", bm: "Ambil tiga bacaan, hitung purata, graf dan tafsir data, buat kesimpulan serta tulis laporan." },
    ],
    studentOutput: { en: "A complete report based on physical observations and measurements.", bm: "Laporan lengkap berdasarkan pemerhatian dan ukuran fizikal." }, practicalNotice: teacherGuidedNotice,
  },
  {
    id: "values-reflection", section: "values", standards: ["1.7.3"], mode: "PRACTICE",
    title: { en: "Practise values during real investigation", bm: "Amalkan nilai semasa penyiasatan sebenar" },
    purpose: { en: "Demonstrate scientific attitudes and noble values through observable actions.", bm: "Tunjukkan sikap saintifik dan nilai murni melalui tindakan yang boleh diperhatikan." },
    instructions: [{ en: "During practical work, protect people and the environment, record every reading honestly, then identify the actions that demonstrated the values.", bm: "Semasa kerja amali, lindungi manusia dan alam sekitar, rekod setiap bacaan dengan jujur, kemudian kenal pasti tindakan yang menunjukkan nilai tersebut." }],
    studentOutput: { en: "Teacher-observed practice and a brief evidence-based reflection.", bm: "Amalan yang diperhatikan guru dan refleksi ringkas berasaskan bukti." }, practicalNotice: teacherGuidedNotice,
  },
];
