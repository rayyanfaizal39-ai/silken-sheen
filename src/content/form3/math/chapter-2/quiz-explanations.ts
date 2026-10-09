import type { LocalizedText } from "@/features/quiz/visuals/mathQuestionVisual";

/** Worked feedback appears only after the student chooses an option. */
export const MATH_F3_C2_QUIZ_EXPLANATIONS: Record<number, LocalizedText> = {
  1: {
    bm: "Angka bererti menunjukkan tahap kejituan suatu ukuran, bukan jenis, tanda atau unit nombor.",
    dlp: "Significant figures indicate the level of accuracy of a measurement, rather than its type, sign or unit.",
  },
  2: {
    bm: "Digit 2, 7, 6 dan 3 semuanya bukan sifar. Maka 2 763 mempunyai 4 angka bererti.",
    dlp: "The digits 2, 7, 6 and 3 are all non-zero. Therefore 2 763 has 4 significant figures.",
  },
  3: {
    bm: "Ketiga-tiga sifar terletak antara 6 dengan 7, jadi semuanya bererti. Jumlahnya 5 angka bererti.",
    dlp: "All three zeros lie between 6 and 7, so they count. There are 5 significant figures.",
  },
  4: {
    bm: "Sifar sebelum digit bukan sifar pertama tidak dikira. Hanya digit 7 bererti, jadi terdapat 1 angka bererti.",
    dlp: "Zeros before the first non-zero digit do not count. Only 7 is significant, giving 1 significant figure.",
  },
  5: {
    bm: "Sifar sebelum 5 tidak bererti. Digit 5, 0, 2, 0 dikira: sifar di tengah dan sifar akhir dalam perpuluhan ini bererti. Jumlahnya 4.",
    dlp: "The zeros before 5 do not count. The digits 5, 0, 2, 0 count, including the internal and trailing decimal zeros: 4 significant figures.",
  },
  6: {
    bm: "Kekalkan 6 dan 3. Digit berikutnya ialah 4, kurang daripada 5, maka baki digit diganti dengan sifar: 63 000.",
    dlp: "Keep 6 and 3. The next digit is 4, less than 5, so replace the remaining digits with zeros: 63 000.",
  },
  7: {
    bm: "Dua digit bererti pertama ialah 2 dan 4. Digit berikutnya ialah 7, maka 4 dibundarkan naik menjadi 5: 2 500.",
    dlp: "The first two significant digits are 2 and 4. The next digit is 7, so round 4 up to 5: 2 500.",
  },
  8: {
    bm: "Bentuk piawai ialah A × 10^n dengan 1 ≤ A < 10 dan n ialah integer. Julat A memastikan hanya satu digit bukan sifar sebelum titik perpuluhan.",
    dlp: "Standard form is A × 10^n with 1 ≤ A < 10 and integer n. This range leaves one non-zero digit before the decimal point.",
  },
  9: {
    bm: "280 = 2.8 × 100 = 2.8 × 10^2. Pekali 2.8 berada dalam julat 1 ≤ A < 10.",
    dlp: "280 = 2.8 × 100 = 2.8 × 10^2. The coefficient 2.8 is in the range 1 ≤ A < 10.",
  },
  10: {
    bm: "Anjak titik perpuluhan 3 tempat ke kiri: 2 805.3 = 2.8053 × 10^3.",
    dlp: "Move the decimal point 3 places left: 2 805.3 = 2.8053 × 10^3.",
  },
  11: {
    bm: "Darab dengan 10^5 bermaksud darab dengan 100 000. Anjak titik perpuluhan 5 tempat ke kanan: 417 000.",
    dlp: "Multiplying by 10^5 means multiplying by 100 000. Move the decimal point 5 places right: 417 000.",
  },
  12: {
    bm: "Anjak titik perpuluhan 2 tempat ke kanan untuk mendapatkan 3.025. Oleh itu 0.03025 = 3.025 × 10^(-2).",
    dlp: "Move the decimal point 2 places right to obtain 3.025. Thus 0.03025 = 3.025 × 10^(-2).",
  },
  13: {
    bm: "10^(-5) = 1/100 000. Anjak titik perpuluhan 5 tempat ke kiri: 8.063 × 10^(-5) = 0.00008063.",
    dlp: "10^(-5) = 1/100 000. Move the decimal point 5 places left: 8.063 × 10^(-5) = 0.00008063.",
  },
  14: {
    bm: "Bagi nombor ≥ 10, titik perpuluhan dianjak ke kiri untuk mendapatkan 1 ≤ A < 10. Maka n positif (sekurang-kurangnya 1).",
    dlp: "For a number ≥ 10, move the decimal point left to obtain 1 ≤ A < 10. Hence n is positive (at least 1).",
  },
  15: {
    bm: "Bagi 0 < nombor < 1, titik perpuluhan dianjak ke kanan untuk mendapatkan 1 ≤ A < 10. Maka n negatif.",
    dlp: "For 0 < number < 1, move the decimal point right to obtain 1 ≤ A < 10. Hence n is negative.",
  },
  16: {
    bm: "Sifar di antara dua digit bukan sifar sentiasa bererti. Ketiga-tiga sifar dalam 50 007 terletak antara 5 dan 7.",
    dlp: "Zeros between two non-zero digits are significant. All three zeros in 50 007 lie between 5 and 7.",
  },
  17: {
    bm: "Tiga digit bererti pertama ialah 8, 0, 2. Digit berikutnya ialah 5, maka 2 menjadi 3: 0.00803.",
    dlp: "The first three significant digits are 8, 0, 2. The next digit is 5, so round 2 up to 3: 0.00803.",
  },
  18: {
    bm: "Dalam A × 10^n, A ialah faktor yang didarab dengan kuasa 10. Bagi 9.5 × 10^9, A = 9.5.",
    dlp: "In A × 10^n, A is the factor multiplying the power of 10. For 9.5 × 10^9, A = 9.5.",
  },
  19: {
    bm: "Semua sifar terletak antara digit bukan sifar 5 dan 4. Digit 5, 0, 0, 0, 4, 2 memberi 6 angka bererti.",
    dlp: "All zeros lie between the non-zero digits 5 and 4. The digits 5, 0, 0, 0, 4, 2 give 6 significant figures.",
  },
  20: {
    bm: "35 = 3.5 × 10^1. Walaupun 35 × 10^0 dan 0.35 × 10^2 sama nilainya, pekalinya bukan dalam julat 1 ≤ A < 10.",
    dlp: "35 = 3.5 × 10^1. Although 35 × 10^0 and 0.35 × 10^2 have the same value, their coefficients are outside 1 ≤ A < 10.",
  },
  21: {
    bm: "Kuasa 10 sudah sama. Tambah pekali: (2.73 + 5.92) × 10^3 = 8.65 × 10^3.",
    dlp: "The powers already match. Add the coefficients: (2.73 + 5.92) × 10^3 = 8.65 × 10^3.",
  },
  22: {
    bm: "7.02 × 10^4 = 0.702 × 10^5. Maka (0.702 + 2.17) × 10^5 = 2.872 × 10^5.",
    dlp: "7.02 × 10^4 = 0.702 × 10^5. Hence (0.702 + 2.17) × 10^5 = 2.872 × 10^5.",
  },
  23: {
    bm: "3.24 × 10^5 = 0.324 × 10^6. Maka (9.45 - 0.324) × 10^6 = 9.126 × 10^6.",
    dlp: "3.24 × 10^5 = 0.324 × 10^6. Thus (9.45 - 0.324) × 10^6 = 9.126 × 10^6.",
  },
  24: {
    bm: "Darab pekali dan tambah indeks: 14.7 × 10^7. Laraskan pekali kepada julat piawai: 1.47 × 10^8.",
    dlp: "Multiply coefficients and add indices: 14.7 × 10^7. Adjust the coefficient to standard form: 1.47 × 10^8.",
  },
  25: {
    bm: "Bahagi pekali dan tolak indeks: (5.9 ÷ 2) × 10^(5-2) = 2.95 × 10^3.",
    dlp: "Divide coefficients and subtract indices: (5.9 ÷ 2) × 10^(5-2) = 2.95 × 10^3.",
  },
  26: {
    bm: "(3.58 + 9.24) × 10^(-3) = 12.82 × 10^(-3) = 1.282 × 10^(-2). Pekali akhir mesti kurang daripada 10.",
    dlp: "(3.58 + 9.24) × 10^(-3) = 12.82 × 10^(-3) = 1.282 × 10^(-2). The final coefficient must be less than 10.",
  },
  27: {
    bm: "4.6 × 10^(-6) = 0.46 × 10^(-5). Maka (2.3 - 0.46) × 10^(-5) = 1.84 × 10^(-5).",
    dlp: "4.6 × 10^(-6) = 0.46 × 10^(-5). Hence (2.3 - 0.46) × 10^(-5) = 1.84 × 10^(-5).",
  },
  28: {
    bm: "7.5 × 5 = 37.5 dan -3 + (-6) = -9. Jadi 37.5 × 10^(-9) = 3.75 × 10^(-8).",
    dlp: "7.5 × 5 = 37.5 and -3 + (-6) = -9. Therefore 37.5 × 10^(-9) = 3.75 × 10^(-8).",
  },
  29: {
    bm: "Dengan 1 TB = 10^12 bait, 3 050 × 10^12 = 3.05 × 10^15 bait.",
    dlp: "Using 1 TB = 10^12 bytes, 3 050 × 10^12 = 3.05 × 10^15 bytes.",
  },
  30: {
    bm: "Digit puluh ialah 7, maka digit ratus 2 dibundarkan naik menjadi 3: 38 300.",
    dlp: "The tens digit is 7, so round the hundreds digit 2 up to 3: 38 300.",
  },
  31: {
    bm: "Digit ratus ialah 2, kurang daripada 5. Kekalkan digit ribu 8 dan gantikan baki dengan sifar: 38 000.",
    dlp: "The hundreds digit is 2, less than 5. Keep the thousands digit 8 and replace the remaining digits with zeros: 38 000.",
  },
  32: {
    bm: "m = 3 200 dan n = 54 300. m + n = 57 500 = 5.75 × 10^4, iaitu 3 angka bererti.",
    dlp: "m = 3 200 and n = 54 300. m + n = 57 500 = 5.75 × 10^4, to 3 significant figures.",
  },
  33: {
    bm: "n - m = 54 300 - 3 200 = 51 100 = 5.11 × 10^4, iaitu 3 angka bererti.",
    dlp: "n - m = 54 300 - 3 200 = 51 100 = 5.11 × 10^4, to 3 significant figures.",
  },
  34: {
    bm: "Sudut tegak di Q, maka PR ialah hipotenus. PQ = √(350^2 - 210^2) = √(78 400) = 280 = 2.8 × 10^2 m.",
    dlp: "The right angle is at Q, so PR is the hypotenuse. PQ = √(350^2 - 210^2) = √(78 400) = 280 = 2.8 × 10^2 m.",
  },
  35: {
    bm: "PQ dan QR berserenjang. Luas = 1/2 × 280 × 210 = 29 400 = 2.94 × 10^4 m^2.",
    dlp: "PQ and QR are perpendicular. Area = 1/2 × 280 × 210 = 29 400 = 2.94 × 10^4 m^2.",
  },
  36: {
    bm: "Jumlah kos = luas × harga seunit luas = 29 400 × RM45 = RM1 323 000.",
    dlp: "Total cost = area × cost per unit area = 29 400 × RM45 = RM1 323 000.",
  },
  37: {
    bm: "Jumlah ketebalan = 800 × 0.0094 = 7.52 cm = 7.52 × 10^0 cm. Indeks sifar sah dalam bentuk piawai.",
    dlp: "Total thickness = 800 × 0.0094 = 7.52 cm = 7.52 × 10^0 cm. A zero index is valid in standard form.",
  },
  38: {
    bm: "(1.08 ÷ 2.4) × 10^(2-4) = 0.45 × 10^(-2) = 4.5 × 10^(-3) dalam bentuk piawai.",
    dlp: "(1.08 ÷ 2.4) × 10^(2-4) = 0.45 × 10^(-2) = 4.5 × 10^(-3) in standard form.",
  },
  39: {
    bm: "(9.6 ÷ 1.5) × 10^(-2-(-5)) = 6.4 × 10^3. Menolak indeks negatif bersamaan menambahnya.",
    dlp: "(9.6 ÷ 1.5) × 10^(-2-(-5)) = 6.4 × 10^3. Subtracting a negative index adds it.",
  },
  40: {
    bm: "Tiga digit bererti pertama ialah 3, 0, 5. Digit berikutnya ialah 7, maka 5 menjadi 6: 306.",
    dlp: "The first three significant digits are 3, 0, 5. The next digit is 7, so round 5 up to 6: 306.",
  },
  41: {
    bm: "Jejari j = 12 742 ÷ 2 = 6 371 km. Dengan π = 3.142, luas = 4 × 3.142 × 6 371^2 = 510 130 608.088 km^2 ≈ 5.101 × 10^8 km^2 (4 a.b.).",
    dlp: "Radius r = 12 742 ÷ 2 = 6 371 km. Using π = 3.142, area = 4 × 3.142 × 6 371^2 = 510 130 608.088 km^2 ≈ 5.101 × 10^8 km^2 (4 s.f.).",
  },
  42: {
    bm: "Beza jarak dari Matahari = 149 600 000 - 57 910 000 = 91 690 000 = 9.169 × 10^7 km.",
    dlp: "The difference in distances from the Sun is 149 600 000 - 57 910 000 = 91 690 000 = 9.169 × 10^7 km.",
  },
  43: {
    bm: "4 495 000 000 - 57 910 000 = 4 437 090 000 = 4.43709 × 10^9 km. Bundarkan kepada 4 a.b.: 4.437 × 10^9 km.",
    dlp: "4 495 000 000 - 57 910 000 = 4 437 090 000 = 4.43709 × 10^9 km. Round to 4 s.f.: 4.437 × 10^9 km.",
  },
  44: {
    bm: "2 TB = 2 000 GB. 2 000 ÷ 32 = 62.5, jadi perlu 63 pemacu. Sebanyak 62 pemacu hanya menyimpan 1 984 GB.",
    dlp: "2 TB = 2 000 GB. 2 000 ÷ 32 = 62.5, so 63 drives are needed. 62 drives hold only 1 984 GB.",
  },
  45: {
    bm: "Isi padu kuboid = 305 × 183 × 56 = 3 125 640 cm^3. Bahagi dengan 1 000: 3 125.64 liter ≈ 3.126 × 10^3 liter (4 a.b.).",
    dlp: "Cuboid volume = 305 × 183 × 56 = 3 125 640 cm^3. Divide by 1 000: 3 125.64 litres ≈ 3.126 × 10^3 litres (4 s.f.).",
  },
  46: {
    bm: "Kepadatan = bilangan penduduk ÷ keluasan = 32 000 000 ÷ 330 803 ≈ 96.734. Integer terhampir ialah 97 orang/km^2.",
    dlp: "Density = population ÷ area = 32 000 000 ÷ 330 803 ≈ 96.734. The nearest integer is 97 people/km^2.",
  },
  47: {
    bm: "30 cm = 0.30 m. Luas sekeping = 0.30 × 0.30 = 0.09 m^2. Jumlah = 6 185 × 0.09 = 556.65 m^2 ≈ 5.57 × 10^2 m^2 (3 a.b.).",
    dlp: "30 cm = 0.30 m. One tile has area 0.30 × 0.30 = 0.09 m^2. Total = 6 185 × 0.09 = 556.65 m^2 ≈ 5.57 × 10^2 m^2 (3 s.f.).",
  },
  48: {
    bm: "6 185 × RM1.75 = RM10 823.75. Dibundarkan kepada ringgit terhampir: RM10 824.",
    dlp: "6 185 × RM1.75 = RM10 823.75. Rounded to the nearest ringgit: RM10 824.",
  },
  49: {
    bm: "2.5 × 10^(-2) = 0.025. Maka (0.025 + 1.35) × 10^4 = 1.375 × 10^4 dalam bentuk piawai.",
    dlp: "2.5 × 10^(-2) = 0.025. Thus (0.025 + 1.35) × 10^4 = 1.375 × 10^4 in standard form.",
  },
  50: {
    bm: "3.4 × 10^(-6) = 0.0034 × 10^(-3). Maka (5.74 + 0.0034) × 10^(-3) = 5.7434 × 10^(-3).",
    dlp: "3.4 × 10^(-6) = 0.0034 × 10^(-3). Hence (5.74 + 0.0034) × 10^(-3) = 5.7434 × 10^(-3).",
  },
  51: {
    bm: "175 - 0.42 = 174.58 = 1.7458 × 10^2. Kepada 3 a.b., digit keempat ialah 5, maka jawapan ialah 1.75 × 10^2.",
    dlp: "175 - 0.42 = 174.58 = 1.7458 × 10^2. To 3 s.f., the fourth digit is 5, so the answer is 1.75 × 10^2.",
  },
  52: {
    bm: "0.037 - 0.000043 = 0.036957 = 3.6957 × 10^(-2). Kepada 3 a.b., hasilnya 3.70 × 10^(-2); sifar akhir menunjukkan kejituan.",
    dlp: "0.037 - 0.000043 = 0.036957 = 3.6957 × 10^(-2). To 3 s.f., this is 3.70 × 10^(-2); the trailing zero records the precision.",
  },
  53: {
    bm: "3 200^2 + 54 300^2 = 10 240 000 + 2 948 490 000 = 2 958 730 000 ≈ 2.96 × 10^9 (3 a.b.).",
    dlp: "3 200^2 + 54 300^2 = 10 240 000 + 2 948 490 000 = 2 958 730 000 ≈ 2.96 × 10^9 (3 s.f.).",
  },
  54: {
    bm: "m^(-2) = 1/(3 200^2) = 9.765625 × 10^(-8). n^(-3) ≈ 6.246 × 10^(-15). Jumlahnya ≈ 9.77 × 10^(-8) (3 a.b.).",
    dlp: "m^(-2) = 1/(3 200^2) = 9.765625 × 10^(-8). n^(-3) ≈ 6.246 × 10^(-15). Their sum is ≈ 9.77 × 10^(-8) (3 s.f.).",
  },
  55: {
    bm: "6 950 × 29 = 201 550 m^3 = 2.0155 × 10^5 m^3. Kepada 3 a.b., jumlahnya 2.02 × 10^5 m^3.",
    dlp: "6 950 × 29 = 201 550 m^3 = 2.0155 × 10^5 m^3. To 3 s.f., this is 2.02 × 10^5 m^3.",
  },
  56: {
    bm: "297 mm = 0.297 m dan 210 mm = 0.210 m. Jisim = 0.297 × 0.210 × 70 = 4.3659 g ≈ 4.37 × 10^0 g (3 a.b.).",
    dlp: "297 mm = 0.297 m and 210 mm = 0.210 m. Mass = 0.297 × 0.210 × 70 = 4.3659 g ≈ 4.37 × 10^0 g (3 s.f.).",
  },
  57: {
    bm: "Untuk penambahan, samakan kuasa 10 dahulu: 7.02 × 10^4 = 0.702 × 10^5. Kemudian (0.702 + 2.17) × 10^5 = 2.872 × 10^5. Indeks ditambah untuk pendaraban, bukan penambahan.",
    dlp: "For addition, first equalise powers: 7.02 × 10^4 = 0.702 × 10^5. Then (0.702 + 2.17) × 10^5 = 2.872 × 10^5. Indices are added for multiplication, not addition.",
  },
};
