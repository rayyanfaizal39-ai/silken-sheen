import type { LocalizedText } from "@/features/quiz/visuals/mathQuestionVisual";

/** Shown only after answering. Question numbers match the preserved BM/DLP IDs. */
export const MATH_F3_C1_EXPLANATIONS: Record<number, LocalizedText> = {
  1: {
    bm: "Dalam a^n, a ialah asas, iaitu faktor yang didarab berulang kali.",
    dlp: "In a^n, a is the base: the factor that is multiplied repeatedly.",
  },
  2: {
    bm: "n ialah indeks atau kuasa. Bagi n integer positif, n menunjukkan bilangan faktor a yang didarab.",
    dlp: "n is the index or power. For a positive integer n, it gives the number of factors of a.",
  },
  3: {
    bm: "Terdapat enam faktor 5, maka 5 × 5 × 5 × 5 × 5 × 5 = 5^6.",
    dlp: "There are six factors of 5, so 5 × 5 × 5 × 5 × 5 × 5 = 5^6.",
  },
  4: {
    bm: "Asasnya ialah (-2) dan terdapat tiga faktor: (-2)^3. Kurungan mengekalkan tanda negatif sebagai sebahagian daripada asas.",
    dlp: "The base is (-2) and there are three factors: (-2)^3. The brackets keep the negative sign as part of the base.",
  },
  5: {
    bm: "4^3 = 4 × 4 × 4 = 64. Indeks bukan nombor untuk didarab dengan asas.",
    dlp: "4^3 = 4 × 4 × 4 = 64. The index is not a number to multiply the base by.",
  },
  6: {
    bm: "Apabila asas sama didarab, tambah indeks: a^m × a^n = a^(m+n).",
    dlp: "When multiplying powers with the same base, add the indices: a^m × a^n = a^(m+n).",
  },
  7: {
    bm: "Apabila asas sama dibahagi, tolak indeks: a^m ÷ a^n = a^(m-n), a ≠ 0.",
    dlp: "When dividing powers with the same non-zero base, subtract the indices: a^m ÷ a^n = a^(m-n).",
  },
  8: {
    bm: "Untuk kuasa bagi kuasa, darab indeks: (a^m)^n = a^(mn).",
    dlp: "For a power of a power, multiply the indices: (a^m)^n = a^(mn).",
  },
  9: {
    bm: "a^n ÷ a^n = 1 dan a^n ÷ a^n = a^(n-n) = a^0. Jadi a^0 = 1 bagi a ≠ 0.",
    dlp: "a^n ÷ a^n = 1 and also a^(n-n) = a^0. Therefore a^0 = 1 for a ≠ 0.",
  },
  10: {
    bm: "Indeks negatif memberikan salingan: a^(-n) = 1/(a^n), bukan -a^n.",
    dlp: "A negative index gives the reciprocal: a^(-n) = 1/(a^n), not -a^n.",
  },
  11: {
    bm: "7^2 × 7^3 = 7^(2+3) = 7^5. Asas 7 dikekalkan.",
    dlp: "7^2 × 7^3 = 7^(2+3) = 7^5. The base remains 7.",
  },
  12: { bm: "4^5 ÷ 4^2 = 4^(5-2) = 4^3.", dlp: "4^5 ÷ 4^2 = 4^(5-2) = 4^3." },
  13: {
    bm: "(3^4)^2 = 3^(4×2) = 3^8. Terdapat dua kumpulan yang setiap satunya mempunyai empat faktor 3.",
    dlp: "(3^4)^2 = 3^(4×2) = 3^8. There are two groups, each with four factors of 3.",
  },
  14: {
    bm: "Bagi a > 0, a^(1/n) ialah punca kuasa ke-n bagi a. Contohnya a^(1/2) ialah punca kuasa dua.",
    dlp: "For a > 0, a^(1/n) is the nth root of a. For example, a^(1/2) is the square root.",
  },
  15: {
    bm: "Panjang sisi x memenuhi x^3 = 8. Oleh sebab 2 × 2 × 2 = 8, punca kuasa tiga bagi 8 ialah 2.",
    dlp: "The edge length x satisfies x^3 = 8. Since 2 × 2 × 2 = 8, the cube root of 8 is 2.",
  },
  16: {
    bm: "Darab pekali: 2 × 4 = 8. Tambah indeks k: 2 + 3 = 5. Hasilnya 8k^5.",
    dlp: "Multiply the coefficients: 2 × 4 = 8. Add the indices of k: 2 + 3 = 5. The result is 8k^5.",
  },
  17: {
    bm: "Pembahagian dilakukan dari kiri ke kanan: m^(7-2-4) = m^1 = m.",
    dlp: "Divide from left to right: m^(7-2-4) = m^1 = m.",
  },
  18: { bm: "81 = 3 × 3 × 3 × 3 = 3^4.", dlp: "81 = 3 × 3 × 3 × 3 = 3^4." },
  19: { bm: "2^(-2) = 1/(2^2) = 1/4.", dlp: "2^(-2) = 1/(2^2) = 1/4." },
  20: {
    bm: "3^4 = 81, maka punca kuasa empat bagi 81 ialah 3.",
    dlp: "3^4 = 81, so the fourth root of 81 is 3.",
  },
  21: {
    bm: "Kumpulkan asas yang sama: m^(3+4)n^(2+5) = m^7n^7.",
    dlp: "Group equal bases: m^(3+4)n^(2+5) = m^7n^7.",
  },
  22: {
    bm: "25 ÷ 5 = 5, x^(2-1) = x dan y^(3-1) = y^2. Hasilnya 5xy^2.",
    dlp: "25 ÷ 5 = 5, x^(2-1) = x and y^(3-1) = y^2. The result is 5xy^2.",
  },
  23: {
    bm: "Darab setiap indeks dengan 4: p^(2×4)q^(3×4)r^(1×4) = p^8q^12r^4.",
    dlp: "Multiply every index by 4: p^(2×4)q^(3×4)r^(1×4) = p^8q^12r^4.",
  },
  24: {
    bm: "Kuasa dua dikenakan pada setiap faktor: 5^2m^(4×2)n^(3×2) = 25m^8n^6.",
    dlp: "Square every factor: 5^2m^(4×2)n^(3×2) = 25m^8n^6.",
  },
  25: {
    bm: "Asasnya sama, maka tambah indeks: 2 + 4 + 5 = 11. Hasilnya (0.2)^11.",
    dlp: "The bases are equal, so add the indices: 2 + 4 + 5 = 11. The result is (0.2)^11.",
  },
  26: {
    bm: "a^(-2) = 1/(a^2). Indeks negatif menukar kepada salingan, bukan menjadikan nilai negatif.",
    dlp: "a^(-2) = 1/(a^2). A negative index takes the reciprocal; it does not make the value negative.",
  },
  27: {
    bm: "Ambil salingan asas dan tukar tanda indeks: (2/5)^(-10) = (5/2)^10.",
    dlp: "Take the reciprocal of the base and change the sign of the index: (2/5)^(-10) = (5/2)^10.",
  },
  28: {
    bm: "2^3 ÷ 2^5 = 2^(3-5) = 2^(-2) = 1/4.",
    dlp: "2^3 ÷ 2^5 = 2^(3-5) = 2^(-2) = 1/4.",
  },
  29: {
    bm: "8^(1/3) ialah punca kuasa tiga bagi 8. Oleh sebab 2^3 = 8, nilainya ialah 2.",
    dlp: "8^(1/3) is the cube root of 8. Since 2^3 = 8, its value is 2.",
  },
  30: {
    bm: "81^(3/4) = (81^(1/4))^3 = 3^3 = 27.",
    dlp: "81^(3/4) = (81^(1/4))^3 = 3^3 = 27.",
  },
  31: {
    bm: "Asas m dan n berbeza. Indeksnya tidak boleh ditambah, jadi ungkapan kekal m^(1/2)n^(3/4).",
    dlp: "The bases m and n are different. Their indices cannot be added, so the expression remains m^(1/2)n^(3/4).",
  },
  32: { bm: "5^4 = 5 × 5 × 5 × 5 = 625.", dlp: "5^4 = 5 × 5 × 5 × 5 = 625." },
  33: {
    bm: "(-7)^3 = (-7) × (-7) × (-7) = -343. Bilangan faktor negatif yang ganjil menghasilkan nilai negatif.",
    dlp: "(-7)^3 = (-7) × (-7) × (-7) = -343. An odd number of negative factors gives a negative result.",
  },
  34: {
    bm: "(2/4)^2 = 4/16 = 1/4. Model menunjukkan 4 daripada 16 petak berlorek; 1/4 ialah bentuk termudah.",
    dlp: "(2/4)^2 = 4/16 = 1/4. The model has 4 shaded cells out of 16; 1/4 is the simplest form.",
  },
  35: {
    bm: "(-3)^3 × 2^2 = -108, x^(3+6) = x^9 dan y^(-4×2) = y^(-8). Hasilnya -108x^9y^(-8).",
    dlp: "(-3)^3 × 2^2 = -108, x^(3+6) = x^9 and y^(-4×2) = y^(-8). The result is -108x^9y^(-8).",
  },
  36: {
    bm: "9 = 3^2, maka 3^(x+2(x+5)-4) = 3^(3x+6) = 3^0. Jadi 3x + 6 = 0 dan x = -2.",
    dlp: "9 = 3^2, so 3^(x+2(x+5)-4) = 3^(3x+6) = 3^0. Thus 3x + 6 = 0 and x = -2.",
  },
  37: {
    bm: "h^3 × h^10 = h^(3+10) = h^13.",
    dlp: "h^3 × h^10 = h^(3+10) = h^13.",
  },
  38: {
    bm: "(4^2)^3 = 4^(2×3) = 4^6 dan (4^3)^2 = 4^(3×2) = 4^6. Kedua-duanya sama.",
    dlp: "(4^2)^3 = 4^(2×3) = 4^6 and (4^3)^2 = 4^(3×2) = 4^6. Both are equal.",
  },
  39: {
    bm: "-25 ÷ 5 = -5 dan h^(4-2-1) = h^1 = h. Hasilnya -5h.",
    dlp: "-25 ÷ 5 = -5 and h^(4-2-1) = h^1 = h. The result is -5h.",
  },
  40: {
    bm: "Hanya faktor m mempunyai indeks negatif: 2m^(-3) = 2/(m^3).",
    dlp: "Only the factor m has a negative index: 2m^(-3) = 2/(m^3).",
  },
  41: {
    bm: "25 = 5^2, maka 2m + n = 8. Persamaan kedua memberi m - n = 1. Selesaikan serentak untuk mendapat m = 3, n = 2.",
    dlp: "25 = 5^2, giving 2m + n = 8. The second equation gives m - n = 1. Solving simultaneously gives m = 3, n = 2.",
  },
  42: {
    bm: "Asas 2 memberi 4 + 2x = 4y. Asas 3 memberi 1 + 2x = 3y. Tolak persamaan untuk mendapat y = 3, kemudian x = 4.",
    dlp: "Using base 2 gives 4 + 2x = 4y. Using base 3 gives 1 + 2x = 3y. Subtracting the equations gives y = 3, then x = 4.",
  },
  43: {
    bm: "Punca kuasa tiga memberi c^(2/3)d^1e^(1/3). Tambah indeks bagi asas yang sama: c^(-1/3)d^3e^(-2/3). Indeks d ialah 1 + 2 = 3.",
    dlp: "The cube root gives c^(2/3)d^1e^(1/3). Add indices for equal bases: c^(-1/3)d^3e^(-2/3). The index of d is 1 + 2 = 3.",
  },
  44: {
    bm: "Pembilang ialah m^(1/2+1/2)n^(1/2+3/2) = mn^2. Bahagi dengan m^(-1)n^(3/2): m^(1-(-1))n^(2-3/2) = m^2n^(1/2).",
    dlp: "The numerator is m^(1/2+1/2)n^(1/2+3/2) = mn^2. Divide by m^(-1)n^(3/2): m^(1-(-1))n^(2-3/2) = m^2n^(1/2).",
  },
  45: {
    bm: "81^(3/4) = (81^3)^(1/4) = (81^(1/4))^3. Punca kuasa empat bagi 81 ialah 3, maka nilainya 27.",
    dlp: "81^(3/4) = (81^3)^(1/4) = (81^(1/4))^3. The fourth root of 81 is 3, so the value is 27.",
  },
  46: {
    bm: "Tukar 9 kepada 3^2 terlebih dahulu supaya hukum indeks boleh digunakan dengan asas sepunya 3.",
    dlp: "First write 9 as 3^2 so the index laws can be applied using the common base 3.",
  },
  47: {
    bm: "√(25x^3yz^2) = 5x^(3/2)y^(1/2)z untuk pemboleh ubah positif. Darab dengan 4x^2z untuk mendapat 20x^(7/2)y^(1/2)z^2.",
    dlp: "√(25x^3yz^2) = 5x^(3/2)y^(1/2)z for positive variables. Multiply by 4x^2z to get 20x^(7/2)y^(1/2)z^2.",
  },
  48: {
    bm: "Tambah indeks pada sebelah kanan: ? + 5 = 6. Maka ? = 1.",
    dlp: "Add the indices on the right: ? + 5 = 6. Therefore ? = 1.",
  },
  49: {
    bm: "Tolak indeks: 12 - ? = 2. Maka ? = 10.",
    dlp: "Subtract the indices: 12 - ? = 2. Therefore ? = 10.",
  },
  50: {
    bm: "Kuasa bagi kuasa memberi 3 × ? = 9. Maka ? = 3.",
    dlp: "The power of a power law gives 3 × ? = 9. Therefore ? = 3.",
  },
  51: {
    bm: "a^0 ÷ a^n = a^(0-n) = a^(-n). Oleh sebab a^0 = 1, ungkapan yang sama ialah 1/(a^n), bagi a ≠ 0.",
    dlp: "a^0 ÷ a^n = a^(0-n) = a^(-n). Since a^0 = 1, the same expression is 1/(a^n), for a ≠ 0.",
  },
  52: {
    bm: "(a^(1/n))^n = a^(n/n) = a. Ini ialah hubungan antara punca kuasa ke-n dan indeks pecahan 1/n.",
    dlp: "(a^(1/n))^n = a^(n/n) = a. This relates the nth root to the fractional index 1/n.",
  },
  53: {
    bm: "p + 5 = 9 memberi p = 4. (1/5)^q = 5^(-q), jadi q = 3. 1/(5^3) = 5^(-3), jadi r = -3.",
    dlp: "p + 5 = 9 gives p = 4. (1/5)^q = 5^(-q), so q = 3. 1/(5^3) = 5^(-3), so r = -3.",
  },
  54: {
    bm: "16 dan 4 ialah kuasa bagi 2. Nombor 3, 9 dan 27 ialah kuasa bagi 3. Maka asas 2 dan asas 3 boleh digunakan.",
    dlp: "16 and 4 are powers of 2. The numbers 3, 9 and 27 are powers of 3. Thus bases 2 and 3 can be used.",
  },
  55: {
    bm: "√(n^3) = n^(3/2) bagi n > 0. Penyebutnya ialah m^(-1)n^(3/2).",
    dlp: "√(n^3) = n^(3/2) for n > 0. The denominator is m^(-1)n^(3/2).",
  },
  56: {
    bm: "Hukum kuasa bagi kuasa ialah (a^m)^n = a^(mn): kedua-dua indeks didarab.",
    dlp: "The power of a power law is (a^m)^n = a^(mn): the two indices are multiplied.",
  },
  57: {
    bm: "Pembuktian hukum indeks sifar membahagi a^n dengan a^n. Jika a = 0 dan n positif, pembahagian 0 ÷ 0 tidak sah, jadi hukum ini memerlukan a ≠ 0.",
    dlp: "The zero index proof divides a^n by a^n. If a = 0 and n is positive, 0 ÷ 0 is invalid, so this law requires a ≠ 0.",
  },
  58: {
    bm: "Indeks 3 bermaksud tiga faktor (-2): (-2) × (-2) × (-2) = -8. Ia bukan (-2) didarab dengan 3.",
    dlp: "The index 3 means three factors of (-2): (-2) × (-2) × (-2) = -8. It does not mean multiplying (-2) by 3.",
  },
};
