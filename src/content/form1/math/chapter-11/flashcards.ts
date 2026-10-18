import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack, type StructuredFlashcard } from "@/features/flashcards/structuredFlashcard";
const mathCard = (bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C11_PAIRS = {
  concepts: [
    mathCard(
      "Apakah set?",
      "Set ialah koleksi objek yang mempunyai ciri-ciri yang sama dan boleh ditakrifkan dengan jelas. Objek-objek di dalam set dipanggil unsur atau ahli.",
      "What is a set?",
      "A set is a collection of objects that share common characteristics and can be clearly defined. The objects inside a set are called elements or members.",
    ),
    mathCard(
      "Apakah unsur set?",
      "Unsur (atau ahli) ialah setiap objek yang berada di dalam sesebuah set. Unsur ditulis di dalam kurungan kurawal { } dan dipisahkan dengan koma.",
      "What is an element of a set?",
      "An element (or member) is every object that is inside a set. Elements are written inside curly braces { } and separated by commas.",
    ),
    mathCard(
      "Apakah set kosong?",
      "Set kosong ialah set yang tidak mengandungi sebarang unsur. Dilambangkan dengan ∅ atau {}.",
      "What is an empty set?",
      "An empty set is a set that contains no elements at all. It is represented by ∅ or {}.",
    ),
    mathCard(
      "Apakah set semesta?",
      "Set semesta (ξ) ialah set yang mengandungi semua unsur yang sedang dipertimbangkan dalam sesuatu perbincangan. Diwakili oleh segi empat tepat dalam gambar rajah Venn.",
      "What is a universal set?",
      "The universal set (ξ) is the set containing all elements under consideration in a particular discussion. It is represented by a rectangle in a Venn diagram.",
    ),
    mathCard(
      "Apakah pelengkap set A?",
      "Pelengkap A (ditulis A') ialah set semua unsur dalam set semesta (ξ) yang TIDAK berada dalam set A.",
      "What is the complement of set A?",
      "The complement of A (written A') is the set of all elements in the universal set (ξ) that are NOT in set A.",
    ),
    mathCard(
      "Apakah subset?",
      "Set B adalah subset set A (ditulis B ⊂ A) jika setiap unsur dalam B juga merupakan unsur dalam A.",
      "What is a subset?",
      "Set B is a subset of set A (written B ⊂ A) if every element in B is also an element in A.",
    ),
    mathCard(
      "Apakah gambar rajah Venn?",
      "Gambar rajah Venn ialah gambar rajah yang menggunakan bulatan untuk mewakili hubungan antara set secara visual. Segi empat tepat mewakili set semesta.",
      "What is a Venn diagram?",
      "A Venn diagram is a diagram that uses circles to visually represent relationships between sets. A rectangle represents the universal set.",
    ),
    mathCard(
      "Apakah kaedah perihalan untuk mewakili set?",
      "Kaedah perihalan menerangkan set menggunakan ayat. Contoh: 'A ialah set huruf vokal dalam perkataan MALAYSIA'.",
      "What is the description method for representing a set?",
      "The description method describes a set using a sentence. Example: 'A is the set of vowels in the word MALAYSIA'.",
    ),
    mathCard(
      "Apakah kaedah penyenaraian untuk mewakili set?",
      "Kaedah penyenaraian menyenaraikan semua unsur set di dalam kurungan kurawal { }, dipisahkan dengan koma. Contoh: A = {a, i}.",
      "What is the listing method for representing a set?",
      "The listing method lists all elements inside curly braces { }, separated by commas. Example: A = {a, i}.",
    ),
    mathCard(
      "Apakah tatatanda pembina set?",
      "Tatatanda pembina set menggunakan syarat matematik. Format: A = {x : syarat}. Dibaca 'set semua x di mana x memenuhi syarat'.",
      "What is set builder notation?",
      "Set builder notation uses a mathematical condition. Format: A = {x : condition}. Read as 'the set of all x where x satisfies the condition'.",
    ),
    mathCard(
      "Apakah maksud ':' dalam tatatanda pembina set?",
      "Titik bertindih ':' dalam tatatanda pembina set bermaksud 'di mana' atau 'dengan syarat bahawa'. Contoh: {x : x > 5} = 'set semua x di mana x lebih besar daripada 5'.",
      "What does ':' mean in set builder notation?",
      "The colon ':' in set builder notation means 'where' or 'such that'. Example: {x : x > 5} = 'the set of all x where x is greater than 5'.",
    ),
    mathCard(
      "Apakah set berasingan (disjoint)?",
      "Dua set adalah berasingan jika mereka tidak berkongsi sebarang unsur. Dalam gambar rajah Venn, bulatan mereka tidak bersentuhan.",
      "What are disjoint sets?",
      "Two sets are disjoint if they share no common elements. In a Venn diagram, their circles do not touch.",
    ),
    mathCard(
      "Apakah set sama?",
      "Dua set adalah sama (A = B) jika mereka mengandungi unsur yang sama persis. Susunan tidak penting.",
      "What are equal sets?",
      "Two sets are equal (A = B) if they contain exactly the same elements. Order does not matter.",
    ),
    mathCard(
      "Apa bezanya ∅, {0} dan {∅}?",
      "∅: set kosong, tiada unsur. {0}: set mengandungi satu unsur (nombor 0). {∅}: set mengandungi satu unsur (simbol set kosong).",
      "What is the difference between ∅, {0} and {∅}?",
      "∅: empty set, no elements. {0}: a set containing one element (the number 0). {∅}: a set containing one element (the empty set symbol).",
    ),
    mathCard(
      "Apakah simbol untuk 'adalah unsur bagi' dan 'bukan unsur bagi'?",
      "∈ bermaksud 'adalah unsur bagi'. ∉ bermaksud 'bukan unsur bagi'. Contoh: 3 ∈ {1,2,3} dan 4 ∉ {1,2,3}.",
      "What are the symbols for 'is an element of' and 'is not an element of'?",
      "∈ means 'is an element of'. ∉ means 'is not an element of'. Example: 3 ∈ {1,2,3} and 4 ∉ {1,2,3}.",
    ),
  ],
  operations: [
    mathCard(
      "Senaraikan semua unsur set A jika A = {x : x ialah nombor perdana, x < 15}.",
      "A = {2, 3, 5, 7, 11, 13}. (Nombor perdana kurang daripada 15.)",
      "List all elements of set A where A = {x : x is a prime number, x < 15}.",
      "A = {2, 3, 5, 7, 11, 13}. (Prime numbers less than 15.)",
    ),
    mathCard(
      "Cari n(A) jika A = {huruf dalam perkataan 'SEKOLAH'}.",
      "Huruf dalam SEKOLAH: S, E, K, O, L, A, H (tiada ulangan). n(A) = 7.",
      "Find n(A) if A = {letters in the word 'SCHOOL'}.",
      "Letters in SCHOOL: S, C, H, O, L (unique). n(A) = 5.",
    ),
    mathCard(
      "ξ = {1–10}, A = {2,4,6,8,10}. Cari A'.",
      "A' = unsur dalam ξ yang bukan dalam A = {1, 3, 5, 7, 9}.",
      "ξ = {1–10}, A = {2,4,6,8,10}. Find A'.",
      "A' = elements in ξ not in A = {1, 3, 5, 7, 9}.",
    ),
    mathCard(
      "Tentukan sama ada B ⊂ A: A = {1,2,3,4,5}, B = {1,3,5}.",
      "Semak: 1 ∈ A ✓, 3 ∈ A ✓, 5 ∈ A ✓. Semua unsur B ada dalam A → B ⊂ A. Ya.",
      "Determine whether B ⊂ A: A = {1,2,3,4,5}, B = {1,3,5}.",
      "Check: 1 ∈ A ✓, 3 ∈ A ✓, 5 ∈ A ✓. All elements of B are in A → B ⊂ A. Yes.",
    ),
    mathCard(
      "Adakah {2, 7} ⊂ {1, 2, 3, 7, 9}?",
      "Semak: 2 ∈ {1,2,3,7,9} ✓. 7 ∈ {1,2,3,7,9} ✓. Ya, {2,7} ⊂ {1,2,3,7,9}.",
      "Is {2, 7} ⊂ {1, 2, 3, 7, 9}?",
      "Check: 2 ∈ {1,2,3,7,9} ✓. 7 ∈ {1,2,3,7,9} ✓. Yes, {2,7} ⊂ {1,2,3,7,9}.",
    ),
    mathCard(
      "Adakah {a, b, c} = {c, a, b}?",
      "Ya, kedua-dua set mengandungi unsur yang sama (a, b, c). Susunan tidak penting dalam set.",
      "Is {a, b, c} = {c, a, b}?",
      "Yes, both sets contain the same elements (a, b, c). Order does not matter in a set.",
    ),
    mathCard(
      "Cari bilangan subset bagi A = {x, y, z}.",
      "n(A) = 3. Bilangan subset = 2³ = 8.",
      "Find the number of subsets of A = {x, y, z}.",
      "n(A) = 3. Number of subsets = 2³ = 8.",
    ),
    mathCard(
      "Senaraikan semua subset bagi {p, q}.",
      "Subset: ∅, {p}, {q}, {p, q}. Jumlah = 2² = 4 subset.",
      "List all subsets of {p, q}.",
      "Subsets: ∅, {p}, {q}, {p, q}. Total = 2² = 4 subsets.",
    ),
    mathCard(
      "ξ = {a,b,c,d,e,f}, B = {b,d,f}. Cari n(B').",
      "B' = {a,c,e}. n(B') = 3.",
      "ξ = {a,b,c,d,e,f}, B = {b,d,f}. Find n(B').",
      "B' = {a,c,e}. n(B') = 3.",
    ),
    mathCard(
      "Tukarkan ke kaedah penyenaraian: A = {x : x ialah nombor bulat, 3 ≤ x ≤ 8}.",
      "A = {3, 4, 5, 6, 7, 8}.",
      "Convert to listing method: A = {x : x is an integer, 3 ≤ x ≤ 8}.",
      "A = {3, 4, 5, 6, 7, 8}.",
    ),
    mathCard(
      "Tukarkan ke tatatanda pembina set: B = {2, 4, 6, 8, 10}.",
      "B = {x : x ialah nombor genap, 0 < x ≤ 10}.",
      "Convert to set builder notation: B = {2, 4, 6, 8, 10}.",
      "B = {x : x is an even number, 0 < x ≤ 10}.",
    ),
    mathCard(
      "Adakah {3, 5, 7} = {7, 5, 3, 5}?",
      "Buang ulangan: {7, 5, 3, 5} → {3, 5, 7}. Maka {3,5,7} = {3,5,7}. Ya, kedua-dua set sama.",
      "Is {3, 5, 7} = {7, 5, 3, 5}?",
      "Remove repeats: {7, 5, 3, 5} → {3, 5, 7}. So {3,5,7} = {3,5,7}. Yes, both sets are equal.",
    ),
    mathCard(
      "Jika n(A) = 5, berapakah bilangan subset A?",
      "Bilangan subset = 2⁵ = 32.",
      "If n(A) = 5, how many subsets does A have?",
      "Number of subsets = 2⁵ = 32.",
    ),
    mathCard(
      "ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. Nyatakan n(A) dan n(A').",
      "n(A) = 5. n(A') = n(ξ) − n(A) = 10 − 5 = 5.",
      "ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. State n(A) and n(A').",
      "n(A) = 5. n(A') = n(ξ) − n(A) = 10 − 5 = 5.",
    ),
    mathCard(
      "Adakah ∅ ⊂ {1, 2, 3}? Terangkan.",
      "Ya. Set kosong adalah subset SETIAP set, termasuk {1,2,3}. Ini adalah peraturan asas.",
      "Is ∅ ⊂ {1, 2, 3}? Explain.",
      "Yes. The empty set is a subset of EVERY set, including {1,2,3}. This is a fundamental rule.",
    ),
    mathCard(
      "Tentukan sama ada {6} ⊂ {1,2,3,4,5}.",
      "Semak: 6 ∉ {1,2,3,4,5}. Oleh kerana ada unsur dalam {6} yang tidak ada dalam set tersebut, {6} ⊄ {1,2,3,4,5}.",
      "Determine whether {6} ⊂ {1,2,3,4,5}.",
      "Check: 6 ∉ {1,2,3,4,5}. Since there is an element in {6} not in the set, {6} ⊄ {1,2,3,4,5}.",
    ),
    mathCard(
      "Cari semua subset bagi {1, 2, 3} yang mengandungi unsur 2.",
      "Subset yang mengandungi 2: {2}, {1,2}, {2,3}, {1,2,3}. Jumlah = 4 subset.",
      "Find all subsets of {1, 2, 3} that contain element 2.",
      "Subsets containing 2: {2}, {1,2}, {2,3}, {1,2,3}. Total = 4 subsets.",
    ),
  ],
  facts: [
    mathCard(
      "Nyatakan peraturan: set kosong dan subset.",
      "PERATURAN: Set kosong (∅) adalah subset SETIAP set. ∅ ⊂ A untuk setiap set A.",
      "State the rule: empty set and subsets.",
      "RULE: The empty set (∅) is a subset of EVERY set. ∅ ⊂ A for every set A.",
    ),
    mathCard(
      "Nyatakan peraturan: setiap set dan subset dirinya sendiri.",
      "PERATURAN: Setiap set adalah subset dirinya sendiri. A ⊂ A untuk setiap set A.",
      "State the rule: every set is a subset of itself.",
      "RULE: Every set is a subset of itself. A ⊂ A for every set A.",
    ),
    mathCard(
      "Apakah formula bilangan subset?",
      "Bilangan subset = 2ⁿ, di mana n ialah bilangan unsur dalam set.",
      "What is the formula for the number of subsets?",
      "Number of subsets = 2ⁿ, where n is the number of elements in the set.",
    ),
    mathCard(
      "Berapakah bilangan subset set kosong?",
      "Bilangan subset ∅ = 2⁰ = 1. Set kosong hanya mempunyai satu subset, iaitu dirinya sendiri (∅).",
      "How many subsets does the empty set have?",
      "Number of subsets of ∅ = 2⁰ = 1. The empty set has only one subset — itself (∅).",
    ),
    mathCard(
      "Apakah perbezaan antara unsur berulang dan set yang mengandunginya?",
      "Unsur berulang hanya dikira SEKALI dalam set. Contoh: huruf dalam 'LULUS' → {L, U, S}. n = 3, bukan 5.",
      "What is the key rule about repeated elements?",
      "Repeated elements are counted only ONCE in a set. Example: letters in 'LEVEL' → {L, E, V}. n = 3, not 5.",
    ),
    mathCard(
      "Apakah perbezaan antara susunan unsur dalam set?",
      "Susunan unsur tidak penting dalam set. {1,2,3} = {3,2,1} = {2,1,3}. Semua ini adalah set yang sama.",
      "What is the rule about the order of elements in a set?",
      "The order of elements does not matter in a set. {1,2,3} = {3,2,1} = {2,1,3}. All these are the same set.",
    ),
    mathCard(
      "Apakah yang dilambangkan oleh segi empat tepat dalam gambar rajah Venn?",
      "Segi empat tepat dalam gambar rajah Venn mewakili set semesta (ξ) — mengandungi semua unsur yang sedang dipertimbangkan.",
      "What does the rectangle represent in a Venn diagram?",
      "The rectangle in a Venn diagram represents the universal set (ξ) — it contains all elements under consideration.",
    ),
    mathCard(
      "Apakah yang dilambangkan oleh bulatan dalam gambar rajah Venn?",
      "Bulatan dalam gambar rajah Venn mewakili sesebuah set di dalam set semesta.",
      "What does the circle represent in a Venn diagram?",
      "A circle in a Venn diagram represents a set within the universal set.",
    ),
    mathCard(
      "Nyatakan hubungan antara n(A) dan n(A').",
      "n(A) + n(A') = n(ξ). Oleh itu n(A') = n(ξ) − n(A).",
      "State the relationship between n(A) and n(A').",
      "n(A) + n(A') = n(ξ). Therefore n(A') = n(ξ) − n(A).",
    ),
    mathCard(
      "Apakah bilangan subset wajar (proper subsets) bagi set dengan n unsur?",
      "Bilangan subset wajar = 2ⁿ − 1. (Tidak termasuk set itu sendiri.)",
      "What is the number of proper subsets for a set with n elements?",
      "Number of proper subsets = 2ⁿ − 1. (Excluding the set itself.)",
    ),
    mathCard(
      "Nyatakan tiga kaedah perwakilan set.",
      "1) Perihalan: guna ayat. 2) Penyenaraian: {unsur1, unsur2, ...}. 3) Tatatanda pembina set: {x : syarat}.",
      "State the three methods of representing a set.",
      "1) Description: use a sentence. 2) Listing: {element1, element2, ...}. 3) Set builder notation: {x : condition}.",
    ),
    mathCard(
      "Apakah n(∅)?",
      "n(∅) = 0. Set kosong tidak mengandungi sebarang unsur.",
      "What is n(∅)?",
      "n(∅) = 0. The empty set contains no elements.",
    ),
    mathCard(
      "Adakah {5} = 5?",
      "Tidak! {5} ialah set yang mengandungi unsur 5. 5 ialah nombor sahaja. Set dan unsurnya adalah berbeza.",
      "Is {5} = 5?",
      "No! {5} is a set containing the element 5. 5 is just a number. A set and its element are different things.",
    ),
    mathCard(
      "Apakah simbol set semesta?",
      "ξ (huruf Greek xi kecil). Set semesta diletakkan di sudut kiri atas segi empat tepat dalam gambar rajah Venn.",
      "What is the symbol for the universal set?",
      "ξ (lowercase Greek letter xi). The universal set is labelled at the top-left corner of the rectangle in a Venn diagram.",
    ),
  ],
  practice: [
    mathCard(
      "A = {huruf dalam 'MATEMATIK'}. Cari n(A).",
      "Huruf dalam MATEMATIK: M,A,T,E,M,A,T,I,K. Unik: {M,A,T,E,I,K}. n(A) = 6.",
      "A = {letters in 'MATHEMATICS'}. Find n(A).",
      "Letters: M,A,T,H,E,M,A,T,I,C,S. Unique: {M,A,T,H,E,I,C,S}. n(A) = 8.",
    ),
    mathCard(
      "ξ = {1,2,3,...,12}, P = {x : x ialah gandaan 3, x ≤ 12}. Cari P dan P'.",
      "P = {3,6,9,12}. P' = {1,2,4,5,7,8,10,11}.",
      "ξ = {1,2,...,12}, P = {x : x is a multiple of 3, x ≤ 12}. Find P and P'.",
      "P = {3,6,9,12}. P' = {1,2,4,5,7,8,10,11}.",
    ),
    mathCard(
      "Cari bilangan subset bagi {a, b, c, d, e}.",
      "n = 5. Bilangan subset = 2⁵ = 32.",
      "Find the number of subsets of {a, b, c, d, e}.",
      "n = 5. Number of subsets = 2⁵ = 32.",
    ),
    mathCard(
      "ξ = {bulatan, segi tiga, segi empat, pentagon, heksagon}. A = {bentuk dengan 4 sisi atau kurang}. Cari A dan A'.",
      "A = {segi tiga, segi empat}. A' = {bulatan, pentagon, heksagon}.",
      "ξ = {circle, triangle, square, pentagon, hexagon}. A = {shapes with 4 or fewer sides}. Find A and A'.",
      "A = {triangle, square}. A' = {circle, pentagon, hexagon}.",
    ),
    mathCard(
      "Adakah {2,4,6} = {6,2,4}? Adakah ia set kosong?",
      "Ya, {2,4,6} = {6,2,4} kerana mengandungi unsur yang sama. Tidak, ia bukan set kosong (n = 3).",
      "Is {2,4,6} = {6,2,4}? Is it an empty set?",
      "Yes, {2,4,6} = {6,2,4} because they contain the same elements. No, it is not empty (n = 3).",
    ),
    mathCard(
      "Nyatakan 4 subset bagi {m, n} (senaraikan semua).",
      "∅, {m}, {n}, {m, n}. Jumlah = 2² = 4 subset.",
      "State all 4 subsets of {m, n}.",
      "∅, {m}, {n}, {m, n}. Total = 2² = 4 subsets.",
    ),
    mathCard(
      "ξ = {1,2,3,...,20}. A = {x : x ialah nombor genap}. Cari n(A) dan n(A').",
      "A = {2,4,6,8,10,12,14,16,18,20}. n(A) = 10. n(A') = 20 − 10 = 10.",
      "ξ = {1,2,...,20}. A = {x : x is an even number}. Find n(A) and n(A').",
      "A = {2,4,6,8,10,12,14,16,18,20}. n(A) = 10. n(A') = 20 − 10 = 10.",
    ),
    mathCard(
      "Tentukan semua subset satu unsur bagi {a, b, c, d}.",
      "{a}, {b}, {c}, {d}. (4 subset satu unsur — sama dengan bilangan unsur.)",
      "Determine all single-element subsets of {a, b, c, d}.",
      "{a}, {b}, {c}, {d}. (4 single-element subsets — equals the number of elements.)",
    ),
    mathCard(
      "Set A mempunyai 64 subset. Berapakah n(A)?",
      "2ⁿ = 64. 2⁶ = 64. n(A) = 6.",
      "Set A has 64 subsets. What is n(A)?",
      "2ⁿ = 64. 2⁶ = 64. n(A) = 6.",
    ),
    mathCard(
      "Adakah {0} set kosong?",
      "Tidak. {0} mengandungi satu unsur iaitu nombor 0. n({0}) = 1. Set kosong ditulis ∅ atau {}.",
      "Is {0} an empty set?",
      "No. {0} contains one element — the number 0. n({0}) = 1. The empty set is written ∅ or {}.",
    ),
    mathCard(
      "ξ = {1,...,10}. A = {x : x adalah faktor 12 dan x ≤ 10}. Cari A, n(A) dan A'.",
      "Faktor 12: 1,2,3,4,6,12. Yang ≤ 10: A = {1,2,3,4,6}. n(A) = 5. A' = {5,7,8,9,10}.",
      "ξ = {1,...,10}. A = {x : x is a factor of 12 and x ≤ 10}. Find A, n(A) and A'.",
      "Factors of 12: 1,2,3,4,6,12. Those ≤ 10: A = {1,2,3,4,6}. n(A) = 5. A' = {5,7,8,9,10}.",
    ),
    mathCard(
      "Set M mempunyai 128 subset. Berapakah n(M)?",
      "2ⁿ = 128. 2⁷ = 128. n(M) = 7.",
      "Set M has 128 subsets. What is n(M)?",
      "2ⁿ = 128. 2⁷ = 128. n(M) = 7.",
    ),
    mathCard(
      "Adakah set {bulan yang mempunyai 30 hari} set kosong?",
      "Tidak. April, Jun, September dan November mempunyai 30 hari. n = 4.",
      "Is the set {months with 30 days} an empty set?",
      "No. April, June, September and November have 30 days. n = 4.",
    ),
  ],
};


const legacyCards = (["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C11_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c11-${lang}-${category}-${index+1}`})));
export const C11_CHALLENGES=[
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Set A = {2, 4, 6, 8}.",
      "parts": [
        "Find n(A).",
        "Is 5 ∈ A?",
        "List the members greater than 4."
      ],
      "answer": [
        [
          "n(A) = 4."
        ],
        [
          "No; 5 ∉ A."
        ],
        [
          "{6, 8}."
        ]
      ]
    },
    "bm": {
      "prompt": "Set A = {2, 4, 6, 8}.",
      "parts": [
        "Cari n(A).",
        "Adakah 5 ∈ A?",
        "Senaraikan ahli lebih besar daripada 4."
      ],
      "answer": [
        [
          "n(A) = 4."
        ],
        [
          "No; 5 ∉ A."
        ],
        [
          "{6, 8}."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "The universal set U = {1,2,3,4,5,6,7,8} and A = {2,4,6,8}.",
      "parts": [
        "Find A′.",
        "Find n(A′).",
        "Is A′ a subset of U?"
      ],
      "answer": [
        [
          "{1,3,5,7}."
        ],
        [
          "4."
        ],
        [
          "Yes."
        ]
      ]
    },
    "bm": {
      "prompt": "Set semesta U = {1,2,3,4,5,6,7,8} dan A = {2,4,6,8}.",
      "parts": [
        "Cari A′.",
        "Cari n(A′).",
        "Adakah A′ subset U?"
      ],
      "answer": [
        [
          "{1,3,5,7}."
        ],
        [
          "4."
        ],
        [
          "Yes."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A = {a,b,c} and B = {b,c,d}.",
      "parts": [
        "Find A ∩ B.",
        "Find A ∪ B.",
        "Find n(A ∪ B)."
      ],
      "answer": [
        [
          "{b,c}."
        ],
        [
          "{a,b,c,d}."
        ],
        [
          "4."
        ]
      ]
    },
    "bm": {
      "prompt": "A = {a,b,c} dan B = {b,c,d}.",
      "parts": [
        "Cari A ∩ B.",
        "Cari A ∪ B.",
        "Cari n(A ∪ B)."
      ],
      "answer": [
        [
          "{b,c}."
        ],
        [
          "{a,b,c,d}."
        ],
        [
          "4."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A = {2,3,5,7}, B = {1,3,5,9}.",
      "parts": [
        "Find A ∩ B.",
        "Find A \\ B.",
        "Find n(A ∪ B)."
      ],
      "answer": [
        [
          "{3,5}."
        ],
        [
          "{2,7}."
        ],
        [
          "6."
        ]
      ]
    },
    "bm": {
      "prompt": "A = {2,3,5,7}, B = {1,3,5,9}.",
      "parts": [
        "Cari A ∩ B.",
        "Cari A \\ B.",
        "Cari n(A ∪ B)."
      ],
      "answer": [
        [
          "{3,5}."
        ],
        [
          "{2,7}."
        ],
        [
          "6."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "There are 20 pupils; 12 like football, 10 like badminton, and 5 like both.",
      "parts": [
        "How many like at least one?",
        "How many like neither?",
        "How many like football only?"
      ],
      "answer": [
        [
          "12 + 10 − 5 = 17."
        ],
        [
          "20 − 17 = 3."
        ],
        [
          "12 − 5 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Ada 20 murid; 12 suka bola sepak, 10 suka badminton dan 5 suka kedua-duanya.",
      "parts": [
        "Berapa suka sekurang-kurangnya satu?",
        "Berapa tidak suka kedua-duanya?",
        "Berapa suka bola sepak sahaja?"
      ],
      "answer": [
        [
          "12 + 10 − 5 = 17."
        ],
        [
          "20 − 17 = 3."
        ],
        [
          "12 − 5 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A = {1,2,3}, B = {1,2,3,4,5}.",
      "parts": [
        "Is A ⊆ B?",
        "Find B \\ A.",
        "Is A = B?"
      ],
      "answer": [
        [
          "Yes."
        ],
        [
          "{4,5}."
        ],
        [
          "No."
        ]
      ]
    },
    "bm": {
      "prompt": "A = {1,2,3}, B = {1,2,3,4,5}.",
      "parts": [
        "Adakah A ⊆ B?",
        "Cari B \\ A.",
        "Adakah A = B?"
      ],
      "answer": [
        [
          "Yes."
        ],
        [
          "{4,5}."
        ],
        [
          "No."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A survey includes 30 students. 18 read comics, 16 read novels, and 7 read both.",
      "parts": [
        "Find how many read either.",
        "Find how many read neither.",
        "Find how many read novels only."
      ],
      "answer": [
        [
          "18 + 16 − 7 = 27."
        ],
        [
          "30 − 27 = 3."
        ],
        [
          "16 − 7 = 9."
        ]
      ]
    },
    "bm": {
      "prompt": "Kajian melibatkan 30 murid. 18 membaca komik, 16 membaca novel dan 7 membaca kedua-duanya.",
      "parts": [
        "Cari yang membaca sekurang-kurangnya satu.",
        "Cari yang tidak membaca kedua-duanya.",
        "Cari yang membaca novel sahaja."
      ],
      "answer": [
        [
          "18 + 16 − 7 = 27."
        ],
        [
          "30 − 27 = 3."
        ],
        [
          "16 − 7 = 9."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Let A be even numbers less than 10 and B be prime numbers less than 10, among positive integers.",
      "parts": [
        "List A.",
        "List B.",
        "Find A ∩ B."
      ],
      "answer": [
        [
          "{2,4,6,8}."
        ],
        [
          "{2,3,5,7}."
        ],
        [
          "{2}."
        ]
      ]
    },
    "bm": {
      "prompt": "A ialah nombor genap kurang daripada 10 dan B ialah nombor perdana kurang daripada 10, dalam integer positif.",
      "parts": [
        "Senaraikan A.",
        "Senaraikan B.",
        "Cari A ∩ B."
      ],
      "answer": [
        [
          "{2,4,6,8}."
        ],
        [
          "{2,3,5,7}."
        ],
        [
          "{2}."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A = {3,6,9,12} and B = {6,12,18}.",
      "parts": [
        "Find A ∩ B.",
        "Find A ∪ B.",
        "Find B \\ A."
      ],
      "answer": [
        [
          "{6,12}."
        ],
        [
          "{3,6,9,12,18}."
        ],
        [
          "{18}."
        ]
      ]
    },
    "bm": {
      "prompt": "A = {3,6,9,12} dan B = {6,12,18}.",
      "parts": [
        "Cari A ∩ B.",
        "Cari A ∪ B.",
        "Cari B \\ A."
      ],
      "answer": [
        [
          "{6,12}."
        ],
        [
          "{3,6,9,12,18}."
        ],
        [
          "{18}."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Set P = {x : x is a vowel in 'MATHEMATICS'}.",
      "parts": [
        "List P without repeats.",
        "Find n(P).",
        "Is E ∈ P?"
      ],
      "answer": [
        [
          "{A,E,I}."
        ],
        [
          "3."
        ],
        [
          "Yes."
        ]
      ]
    },
    "bm": {
      "prompt": "Set P = {x : x is a vowel in 'MATHEMATICS'}.",
      "parts": [
        "Senaraikan P tanpa pengulangan.",
        "Cari n(P).",
        "Adakah E ∈ P?"
      ],
      "answer": [
        [
          "{A,E,I}."
        ],
        [
          "3."
        ],
        [
          "Yes."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A bag contains red, blue and green marbles; set C is the set of colours present.",
      "parts": [
        "List C.",
        "How many elements are in C?",
        "Does repeating a red marble add a new element?"
      ],
      "answer": [
        [
          "{red, blue, green}."
        ],
        [
          "3."
        ],
        [
          "No; sets list distinct elements."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi manik merah, biru dan hijau; set C ialah set warna yang ada.",
      "parts": [
        "Senaraikan C.",
        "Berapa unsur dalam C?",
        "Adakah mengulangi manik merah menambah unsur baharu?"
      ],
      "answer": [
        [
          "{merah, biru, hijau}."
        ],
        [
          "3."
        ],
        [
          "Tidak; set menyenaraikan unsur berbeza."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Let U={1,2,3,4,5,6}, A={1,3,5}, B={2,3,4}.",
      "parts": [
        "Find A ∩ B.",
        "Find A′.",
        "Find A ∪ B."
      ],
      "answer": [
        [
          "{3}."
        ],
        [
          "{2,4,6}."
        ],
        [
          "{1,2,3,4,5}."
        ]
      ]
    },
    "bm": {
      "prompt": "Diberi U={1,2,3,4,5,6}, A={1,3,5}, B={2,3,4}.",
      "parts": [
        "Cari A ∩ B.",
        "Cari A′.",
        "Cari A ∪ B."
      ],
      "answer": [
        [
          "{3}."
        ],
        [
          "{2,4,6}."
        ],
        [
          "{1,2,3,4,5}."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "In a class of 40, 22 study Art, 20 study Music, and 8 study both.",
      "parts": [
        "How many study at least one?",
        "How many study neither?",
        "How many study only Music?"
      ],
      "answer": [
        [
          "22 + 20 − 8 = 34."
        ],
        [
          "40 − 34 = 6."
        ],
        [
          "20 − 8 = 12."
        ]
      ]
    },
    "bm": {
      "prompt": "Dalam kelas 40, 22 belajar Seni, 20 belajar Muzik dan 8 belajar kedua-duanya.",
      "parts": [
        "Berapa belajar sekurang-kurangnya satu?",
        "Berapa tidak belajar kedua-duanya?",
        "Berapa hanya belajar Muzik?"
      ],
      "answer": [
        [
          "22 + 20 − 8 = 34."
        ],
        [
          "40 − 34 = 6."
        ],
        [
          "20 − 8 = 12."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Let A={1,2}, B={2,3}, C={3,4}.",
      "parts": [
        "Find A ∩ B.",
        "Find (A ∪ B) ∩ C.",
        "Find A ∩ C."
      ],
      "answer": [
        [
          "{2}."
        ],
        [
          "{3}."
        ],
        [
          "∅."
        ]
      ]
    },
    "bm": {
      "prompt": "Diberi A={1,2}, B={2,3}, C={3,4}.",
      "parts": [
        "Cari A ∩ B.",
        "Cari (A ∪ B) ∩ C.",
        "Cari A ∩ C."
      ],
      "answer": [
        [
          "{2}."
        ],
        [
          "{3}."
        ],
        [
          "∅."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "An empty set Q has no elements.",
      "parts": [
        "Write Q using symbols.",
        "Find n(Q).",
        "Is Q a subset of {1,2}?"
      ],
      "answer": [
        [
          "Q = ∅."
        ],
        [
          "0."
        ],
        [
          "Yes; ∅ is a subset of every set."
        ]
      ]
    },
    "bm": {
      "prompt": "Set kosong Q tidak mempunyai unsur.",
      "parts": [
        "Tulis Q dengan simbol.",
        "Cari n(Q).",
        "Adakah Q subset {1,2}?"
      ],
      "answer": [
        [
          "Q = ∅."
        ],
        [
          "0."
        ],
        [
          "Yes; ∅ is a subset of every set."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Let A={2,4,6}, B={6,8,10}, U={2,4,6,8,10,12}.",
      "parts": [
        "Find A ∪ B.",
        "Find its complement relative to U.",
        "Find A ∩ B."
      ],
      "answer": [
        [
          "{2,4,6,8,10}."
        ],
        [
          "{12}."
        ],
        [
          "{6}."
        ]
      ]
    },
    "bm": {
      "prompt": "Diberi A={2,4,6}, B={6,8,10}, U={2,4,6,8,10,12}.",
      "parts": [
        "Cari A ∪ B.",
        "Cari pelengkapnya relatif kepada U.",
        "Cari A ∩ B."
      ],
      "answer": [
        [
          "{2,4,6,8,10}."
        ],
        [
          "{12}."
        ],
        [
          "{6}."
        ]
      ]
    }
  }
];
export function buildMathF1C11Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacyCards.length!==59||C11_CHALLENGES.length!==16)throw new Error("Chapter 11 flashcard count invariant failed");
 return legacyCards.map(({entry,id},index)=>{
   const mode=index<12?"concept":index<43?"practice":"challenge";
   const challenge=mode==="challenge"?C11_CHALLENGES[index-43]:null;
   const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
   return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 11",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??"11.1",reviewMode:mode,structured};
 });
}
