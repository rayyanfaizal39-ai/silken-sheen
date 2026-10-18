import type {Flashcard} from "@/data/content";
import {structuredFront,structuredBack,type StructuredFlashcard} from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId="concepts"|"operations"|"facts"|"practice";
const mathCard=(bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C6_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah persamaan linear?",
      "Persamaan yang kuasa tertinggi pemboleh ubahnya ialah 1.",
      "What is a linear equation?",
      "An equation in which the highest power of the variable is 1.",
    ),
    mathCard(
      "Bagaimanakah anda mengenal pasti persamaan linear?",
      "Periksa kuasa tertinggi setiap pemboleh ubah; jika semuanya berkuasa 1, persamaan itu linear.",
      "How do you identify a linear equation?",
      "Check the highest power of every variable; if all are raised to power 1, the equation is linear.",
    ),
    mathCard(
      "Berikan contoh persamaan tidak linear.",
      "10x² + 5x − 3 = 1, kerana x berkuasa 2.",
      "Give an example of a non-linear equation.",
      "10x² + 5x − 3 = 1, because x is raised to power 2.",
    ),
    mathCard(
      "Apakah ciri utama persamaan linear dalam satu pemboleh ubah?",
      "Ia hanya mengandungi satu jenis pemboleh ubah yang berkuasa 1.",
      "What is the main feature of a linear equation in one variable?",
      "It contains only one type of variable, raised to the power of 1.",
    ),
    mathCard(
      "Berikan contoh persamaan linear dalam satu pemboleh ubah.",
      "x + 7 = 11.",
      "Give an example of a linear equation in one variable.",
      "x + 7 = 11.",
    ),
    mathCard(
      "Apakah ciri utama persamaan linear dalam dua pemboleh ubah?",
      "Ia mengandungi dua pemboleh ubah berbeza yang setiap satunya berkuasa 1.",
      "What is the main feature of a linear equation in two variables?",
      "It contains two different variables, each raised to the power of 1.",
    ),
    mathCard(
      "Berikan contoh persamaan linear dalam dua pemboleh ubah.",
      "5x + 2y = 8.",
      "Give an example of a linear equation in two variables.",
      "5x + 2y = 8.",
    ),
    mathCard(
      "Apakah maksud 'menyelesaikan' suatu persamaan linear?",
      "Mencari nilai pemboleh ubah yang menjadikan kedua-dua belah persamaan sama nilai.",
      "What does it mean to 'solve' a linear equation?",
      "Finding the value of the variable that makes both sides of the equation equal in value.",
    ),
    mathCard(
      "Berapakah bilangan penyelesaian bagi persamaan linear dalam dua pemboleh ubah?",
      "Tidak terhingga banyaknya.",
      "How many solutions does a linear equation in two variables have?",
      "An infinite number of solutions.",
    ),
    mathCard(
      "Apakah persamaan linear serentak?",
      "Dua atau lebih persamaan linear yang melibatkan pemboleh ubah sama, diselesaikan bersama.",
      "What are simultaneous linear equations?",
      "Two or more linear equations involving the same variables, solved together.",
    ),
    mathCard(
      "Mengapakah persamaan itu dipanggil 'serentak'?",
      "Kerana penyelesaian (x, y) yang dicari mesti memuaskan kedua-dua persamaan pada masa yang sama.",
      "Why are these equations called 'simultaneous'?",
      "Because the solution (x, y) sought must satisfy both equations at the same time.",
    ),
    mathCard(
      "Apakah penyelesaian unik bagi persamaan serentak?",
      "Apabila dua garis lurus bersilang pada hanya satu titik.",
      "What is a unique solution for simultaneous equations?",
      "When the two straight lines intersect at exactly one point.",
    ),
    mathCard(
      "Bilakah persamaan serentak tiada penyelesaian?",
      "Apabila dua garis lurus selari dan tidak akan bersilang.",
      "When do simultaneous equations have no solution?",
      "When the two straight lines are parallel and never intersect.",
    ),
    mathCard(
      "Bilakah persamaan serentak mempunyai penyelesaian tak terhingga?",
      "Apabila kedua-dua persamaan mewakili garis lurus yang sama (bertindih).",
      "When do simultaneous equations have infinitely many solutions?",
      "When both equations represent the same straight line (overlapping).",
    ),
    mathCard(
      "Apakah maksud 'pemboleh ubah' dalam persamaan linear?",
      "Huruf atau simbol yang mewakili nilai yang tidak diketahui.",
      "What does 'variable' mean in a linear equation?",
      "A letter or symbol representing an unknown value.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah konsep kesamaan dalam menyelesaikan persamaan linear?",
      "Melakukan operasi yang sama pada kedua-dua belah persamaan supaya ia kekal seimbang.",
      "What is the equality concept in solving linear equations?",
      "Performing the same operation on both sides of the equation so it stays balanced.",
    ),
    mathCard(
      "Bagaimanakah konsep kesamaan menyelesaikan x + 7 = 11?",
      "Tolak 7 daripada kedua-dua belah: x + 7 − 7 = 11 − 7, maka x = 4.",
      "How does the equality concept solve x + 7 = 11?",
      "Subtract 7 from both sides: x + 7 − 7 = 11 − 7, giving x = 4.",
    ),
    mathCard(
      "Apakah kaedah cuba jaya?",
      "Kaedah menyelesaikan persamaan dengan mencuba beberapa nilai sehingga kedua-dua belah sama nilai.",
      "What is the trial and error method?",
      "A method of solving an equation by trying several values until both sides are equal in value.",
    ),
    mathCard(
      "Apakah kelemahan kaedah cuba jaya?",
      "Mengambil masa lebih lama jika penyelesaiannya nombor besar atau pecahan.",
      "What is a limitation of the trial and error method?",
      "It takes longer when the solution is a large number or a fraction.",
    ),
    mathCard(
      "Apakah kaedah pematahbalikan?",
      "Kaedah menyelesaikan persamaan dengan membalikkan turutan operasi dan menggunakan operasi songsangnya.",
      "What is the backtracking method?",
      "A method that solves an equation by reversing the order of operations and using their inverse operations.",
    ),
    mathCard(
      "Apakah operasi songsang bagi penambahan?",
      "Penolakan (−).",
      "What is the inverse operation of addition?",
      "Subtraction (−).",
    ),
    mathCard(
      "Apakah operasi songsang bagi pendaraban?",
      "Pembahagian (÷).",
      "What is the inverse operation of multiplication?",
      "Division (÷).",
    ),
    mathCard(
      "Dalam kaedah pematahbalikan, dalam susunan apakah operasi songsang digunakan?",
      "Dalam susunan terbalik, iaitu dari luar ke dalam.",
      "In the backtracking method, in what order are inverse operations applied?",
      "In reverse order, that is, from the outside in.",
    ),
    mathCard(
      "Apakah kaedah penggantian?",
      "Kaedah menyelesaikan persamaan serentak dengan mengungkapkan satu pemboleh ubah dan menggantikannya ke persamaan lain.",
      "What is the substitution method?",
      "A method of solving simultaneous equations by expressing one variable and substituting it into the other equation.",
    ),
    mathCard(
      "Apakah langkah pertama dalam kaedah penggantian?",
      "Ungkapkan satu pemboleh ubah dalam sebutan pemboleh ubah yang satu lagi.",
      "What is the first step in the substitution method?",
      "Express one variable in terms of the other variable.",
    ),
    mathCard(
      "Apakah kaedah penghapusan?",
      "Kaedah menyelesaikan persamaan serentak dengan menyamakan pekali satu pemboleh ubah, kemudian menambah atau menolak persamaan.",
      "What is the elimination method?",
      "A method of solving simultaneous equations by equalising the coefficient of one variable, then adding or subtracting the equations.",
    ),
    mathCard(
      "Selepas pekali disamakan dalam kaedah penghapusan, apakah langkah seterusnya?",
      "Tambah atau tolak kedua-dua persamaan untuk menghapuskan satu pemboleh ubah.",
      "After equalising coefficients in the elimination method, what is the next step?",
      "Add or subtract the two equations to eliminate one variable.",
    ),
    mathCard(
      "Apakah kaedah graf untuk persamaan serentak?",
      "Melukis kedua-dua garis lurus pada satah Cartesan dan mencari titik persilangannya.",
      "What is the graphical method for simultaneous equations?",
      "Drawing both straight lines on a Cartesian plane and finding their point of intersection.",
    ),
    mathCard(
      "Apakah yang mesti dilakukan selepas mendapat nilai satu pemboleh ubah dalam kaedah penggantian atau penghapusan?",
      "Gantikan nilai itu semula ke salah satu persamaan untuk mencari nilai pemboleh ubah satu lagi.",
      "What must be done after finding the value of one variable in the substitution or elimination method?",
      "Substitute that value back into one of the equations to find the value of the other variable.",
    ),
    mathCard(
      "Bagaimanakah anda menyemak jawapan persamaan linear?",
      "Gantikan nilai yang diperoleh ke dalam persamaan asal; jika kedua-dua belah sama, jawapan betul.",
      "How do you check the answer to a linear equation?",
      "Substitute the obtained value back into the original equation; if both sides are equal, the answer is correct.",
    ),
  ],
  facts: [
    mathCard(
      "Tulis persamaan bagi: 'Suatu nombor m dibahagi dengan 6 memberi 12'.",
      "m/6 = 12.",
      "Write the equation for: 'A number m divided by 6 gives 12'.",
      "m/6 = 12.",
    ),
    mathCard(
      "Tulis persamaan bagi: 'Rahim ada RM p, belanja RM q, baki RM10'.",
      "p − q = 10.",
      "Write the equation for: 'Rahim has RM p, spends RM q, and has RM10 left'.",
      "p − q = 10.",
    ),
    mathCard(
      "Tulis persamaan bagi: 'Beza umur Salim, p tahun, dengan adiknya, q tahun, ialah 10 tahun'.",
      "p − q = 10.",
      "Write the equation for: 'The difference between Salim's age, p years, and his sister's age, q years, is 10 years'.",
      "p − q = 10.",
    ),
    mathCard(
      "Selesaikan x + 7 = 11 menggunakan konsep kesamaan.",
      "x = 4.",
      "Solve x + 7 = 11 using the equality concept.",
      "x = 4.",
    ),
    mathCard(
      "Selesaikan 4x/5 + 7 = 23 menggunakan kaedah pematahbalikan.",
      "x = 20.",
      "Solve 4x/5 + 7 = 23 using the backtracking method.",
      "x = 20.",
    ),
    mathCard(
      "Diberi y = 7x + 6, apakah nilai y apabila x = 0?",
      "y = 6.",
      "Given y = 7x + 6, what is the value of y when x = 0?",
      "y = 6.",
    ),
    mathCard(
      "Diberi y = 7x + 6, apakah nilai y apabila x = 1?",
      "y = 13.",
      "Given y = 7x + 6, what is the value of y when x = 1?",
      "y = 13.",
    ),
    mathCard(
      "Selesaikan persamaan serentak x + y = 10 dan x − y = 2 menggunakan kaedah penghapusan.",
      "x = 6, y = 4.",
      "Solve the simultaneous equations x + y = 10 and x − y = 2 using the elimination method.",
      "x = 6, y = 4.",
    ),
    mathCard(
      "Selesaikan persamaan serentak x + y = 10 dan x − y = 2 menggunakan kaedah penggantian.",
      "x = 6, y = 4.",
      "Solve the simultaneous equations x + y = 10 and x − y = 2 using the substitution method.",
      "x = 6, y = 4.",
    ),
    mathCard(
      "Apakah ciri dua garis lurus bagi persamaan serentak yang mempunyai penyelesaian unik?",
      "Kedua-dua garis mempunyai kecerunan berbeza dan bersilang pada satu titik.",
      "What is the feature of two lines for simultaneous equations with a unique solution?",
      "The two lines have different gradients and intersect at one point.",
    ),
    mathCard(
      "Apakah ciri dua garis lurus bagi persamaan serentak yang tiada penyelesaian?",
      "Kedua-dua garis mempunyai kecerunan sama tetapi pintasan-y berbeza (selari).",
      "What is the feature of two lines for simultaneous equations with no solution?",
      "The two lines have the same gradient but different y-intercepts (parallel).",
    ),
    mathCard(
      "Apakah ciri dua persamaan serentak yang mempunyai penyelesaian tak terhingga?",
      "Kedua-dua persamaan, apabila dipermudahkan, adalah setara antara satu sama lain.",
      "What is the feature of two simultaneous equations with infinitely many solutions?",
      "Both equations, when simplified, are equivalent to each other.",
    ),
    mathCard(
      "Apakah langkah pertama menggunakan kalkulator saintifik untuk persamaan serentak?",
      "Tekan butang MODE atau MENU.",
      "What is the first step in using a scientific calculator for simultaneous equations?",
      "Press the MODE or MENU button.",
    ),
    mathCard(
      "Selepas memilih Mod Persamaan pada kalkulator saintifik, apakah yang anda pilih seterusnya?",
      "Persamaan Serentak, kemudian 2 Tidak Diketahui.",
      "After selecting Equation Mode on a scientific calculator, what do you select next?",
      "Simultaneous Equation, then 2 Unknowns.",
    ),
    mathCard(
      "Bagaimanakah anda mendapatkan nilai x dan y selepas memasukkan pekali pada kalkulator saintifik?",
      "Tekan butang '=' untuk memperoleh nilai x dan y.",
      "How do you obtain the values of x and y after entering the coefficients on a scientific calculator?",
      "Press the '=' button to obtain the values of x and y.",
    ),
  ],
  practice: [
    mathCard(
      "Adakah 5r + 1 = 0 suatu persamaan linear?",
      "Ya, kerana kuasa tertinggi r ialah 1.",
      "Is 5r + 1 = 0 a linear equation?",
      "Yes, because the highest power of r is 1.",
    ),
    mathCard(
      "Adakah 10x² + 5x − 3 = 1 suatu persamaan linear?",
      "Tidak, kerana x berkuasa 2.",
      "Is 10x² + 5x − 3 = 1 a linear equation?",
      "No, because x is raised to the power of 2.",
    ),
    mathCard(
      "Berapakah nilai x dalam x + 7 = 11?",
      "x = 4.",
      "What is the value of x in x + 7 = 11?",
      "x = 4.",
    ),
    mathCard(
      "Gunakan kaedah cuba jaya untuk x + 5 = 9. Apakah nilai x?",
      "x = 4, kerana 4 + 5 = 9.",
      "Use trial and error for x + 5 = 9. What is the value of x?",
      "x = 4, because 4 + 5 = 9.",
    ),
    mathCard(
      "Apakah operasi songsang bagi penolakan dalam kaedah pematahbalikan?",
      "Penambahan (+).",
      "What is the inverse operation of subtraction in the backtracking method?",
      "Addition (+).",
    ),
    mathCard(
      "Apakah operasi songsang bagi pembahagian dalam kaedah pematahbalikan?",
      "Pendaraban (×).",
      "What is the inverse operation of division in the backtracking method?",
      "Multiplication (×).",
    ),
    mathCard(
      "Tulis satu pasangan penyelesaian (x, y) bagi y = 7x + 6 selain (0, 6) dan (1, 13).",
      "(2, 20), kerana y = 7(2) + 6 = 20.",
      "Write one solution pair (x, y) for y = 7x + 6 other than (0, 6) and (1, 13).",
      "(2, 20), because y = 7(2) + 6 = 20.",
    ),
    mathCard(
      "Dalam persamaan serentak x + y = 10 dan x − y = 2, apakah ungkapan x jika x dikira daripada persamaan pertama?",
      "x = 10 − y.",
      "In the simultaneous equations x + y = 10 and x − y = 2, what is x expressed as from the first equation?",
      "x = 10 − y.",
    ),
    mathCard(
      "Apabila (10 − y) − y = 2 dipermudahkan, apakah persamaan satu pemboleh ubah yang terhasil?",
      "10 − 2y = 2, lalu y = 4.",
      "When (10 − y) − y = 2 is simplified, what one-variable equation results?",
      "10 − 2y = 2, giving y = 4.",
    ),
    mathCard(
      "Apabila persamaan x + y = 10 dan x − y = 2 ditambah, apakah persamaan yang terhasil?",
      "2x = 12, lalu x = 6.",
      "When the equations x + y = 10 and x − y = 2 are added, what equation results?",
      "2x = 12, giving x = 6.",
    ),
    mathCard(
      "Selepas mendapat x = 6 daripada x + y = 10, apakah nilai y?",
      "y = 4, kerana 6 + y = 10.",
      "After finding x = 6 from x + y = 10, what is the value of y?",
      "y = 4, because 6 + y = 10.",
    ),
    mathCard(
      "Jika graf bagi dua persamaan serentak bersilang pada satu titik, berapakah penyelesaiannya?",
      "Satu penyelesaian (penyelesaian unik).",
      "If the graphs of two simultaneous equations intersect at one point, how many solutions are there?",
      "One solution (a unique solution).",
    ),
    mathCard(
      "Jika graf bagi dua persamaan serentak adalah selari, berapakah penyelesaiannya?",
      "Tiada penyelesaian.",
      "If the graphs of two simultaneous equations are parallel, how many solutions are there?",
      "No solution.",
    ),
    mathCard(
      "Jika graf bagi dua persamaan serentak bertindih sepenuhnya, berapakah penyelesaiannya?",
      "Tidak terhingga banyaknya.",
      "If the graphs of two simultaneous equations completely overlap, how many solutions are there?",
      "An infinite number of solutions.",
    ),
    mathCard(
      "Tulis persamaan linear dalam dua pemboleh ubah menggunakan x dan y dengan pekali 5 dan 2.",
      "5x + 2y = 8 (contoh).",
      "Write a linear equation in two variables using x and y with coefficients 5 and 2.",
      "5x + 2y = 8 (example).",
    ),
  ],
};


const legacy=(["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C6_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c6-${lang}-${category}-${index+1}`})));
export const C6_CHALLENGES=[
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 3x + 7 = 28.",
      "parts": [
        "Isolate the x-term.",
        "Find x.",
        "Verify by substitution."
      ],
      "answer": [
        [
          "3x = 21."
        ],
        [
          "x = 7."
        ],
        [
          "3(7) + 7 = 28."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 3x + 7 = 28.",
      "parts": [
        "Asingkan sebutan x.",
        "Cari x.",
        "Semak dengan penggantian."
      ],
      "answer": [
        [
          "3x = 21."
        ],
        [
          "x = 7."
        ],
        [
          "3(7) + 7 = 28."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 5(x − 2) = 35.",
      "parts": [
        "Divide both sides by 5.",
        "Solve for x.",
        "Verify the result."
      ],
      "answer": [
        [
          "x − 2 = 7."
        ],
        [
          "x = 9."
        ],
        [
          "5(9 − 2) = 35."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 5(x − 2) = 35.",
      "parts": [
        "Bahagi kedua-dua belah dengan 5.",
        "Selesaikan x.",
        "Semak hasil."
      ],
      "answer": [
        [
          "x − 2 = 7."
        ],
        [
          "x = 9."
        ],
        [
          "5(9 − 2) = 35."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil claims 2x + 5 = 17 gives x = 11.",
      "parts": [
        "Identify the error.",
        "Solve correctly.",
        "Check your solution."
      ],
      "answer": [
        [
          "After subtracting 5, divide by 2."
        ],
        [
          "2x = 12; x = 6."
        ],
        [
          "2(6) + 5 = 17."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid mendakwa 2x + 5 = 17 memberi x = 11.",
      "parts": [
        "Kenal pasti kesilapan.",
        "Selesaikan dengan betul.",
        "Semak jawapan."
      ],
      "answer": [
        [
          "After subtracting 5, divide by 2."
        ],
        [
          "2x = 12; x = 6."
        ],
        [
          "2(6) + 5 = 17."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve (x + 4)/3 = 7.",
      "parts": [
        "Remove the denominator.",
        "Find x.",
        "Check the equation."
      ],
      "answer": [
        [
          "x + 4 = 21."
        ],
        [
          "x = 17."
        ],
        [
          "(17 + 4)/3 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan (x + 4)/3 = 7.",
      "parts": [
        "Hapuskan penyebut.",
        "Cari x.",
        "Semak persamaan."
      ],
      "answer": [
        [
          "x + 4 = 21."
        ],
        [
          "x = 17."
        ],
        [
          "(17 + 4)/3 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 4x − 6 = 2x + 12.",
      "parts": [
        "Collect variable terms.",
        "Find x.",
        "Substitute to check."
      ],
      "answer": [
        [
          "2x = 18."
        ],
        [
          "x = 9."
        ],
        [
          "4(9) − 6 = 2(9) + 12 = 30."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 4x − 6 = 2x + 12.",
      "parts": [
        "Kumpulkan sebutan pemboleh ubah.",
        "Cari x.",
        "Gantikan untuk menyemak."
      ],
      "answer": [
        [
          "2x = 18."
        ],
        [
          "x = 9."
        ],
        [
          "4(9) − 6 = 2(9) + 12 = 30."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 3(2y − 1) = 4y + 11.",
      "parts": [
        "Expand and rearrange.",
        "Find y.",
        "Verify the equation."
      ],
      "answer": [
        [
          "6y − 3 = 4y + 11; 2y = 14."
        ],
        [
          "y = 7."
        ],
        [
          "3(14 − 1) = 39; 28 + 11 = 39."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 3(2y − 1) = 4y + 11.",
      "parts": [
        "Kembangkan dan susun semula.",
        "Cari y.",
        "Sahkan persamaan."
      ],
      "answer": [
        [
          "6y − 3 = 4y + 11; 2y = 14."
        ],
        [
          "y = 7."
        ],
        [
          "3(14 − 1) = 39; 28 + 11 = 39."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 7 − 2p = 19.",
      "parts": [
        "Isolate −2p.",
        "Find p.",
        "Check its sign."
      ],
      "answer": [
        [
          "−2p = 12."
        ],
        [
          "p = −6."
        ],
        [
          "7 − 2(−6) = 19."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 7 − 2p = 19.",
      "parts": [
        "Asingkan −2p.",
        "Cari p.",
        "Semak tanda jawapan."
      ],
      "answer": [
        [
          "−2p = 12."
        ],
        [
          "p = −6."
        ],
        [
          "7 − 2(−6) = 19."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 0.5x + 3 = 11.",
      "parts": [
        "Isolate the x-term.",
        "Find x.",
        "Check."
      ],
      "answer": [
        [
          "0.5x = 8."
        ],
        [
          "x = 16."
        ],
        [
          "0.5(16) + 3 = 11."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 0.5x + 3 = 11.",
      "parts": [
        "Asingkan sebutan x.",
        "Cari x.",
        "Semak."
      ],
      "answer": [
        [
          "0.5x = 8."
        ],
        [
          "x = 16."
        ],
        [
          "0.5(16) + 3 = 11."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Three identical notebooks and a RM4 pen cost RM25.",
      "parts": [
        "Form an equation using n for one notebook's cost.",
        "Find n.",
        "Check the total."
      ],
      "answer": [
        [
          "3n + 4 = 25."
        ],
        [
          "n = 7."
        ],
        [
          "3(7) + 4 = RM25."
        ]
      ]
    },
    "bm": {
      "prompt": "Tiga buku nota sama dan pen RM4 berjumlah RM25.",
      "parts": [
        "Bina persamaan dengan n untuk harga sebuah buku.",
        "Cari n.",
        "Semak jumlah."
      ],
      "answer": [
        [
          "3n + 4 = 25."
        ],
        [
          "n = 7."
        ],
        [
          "3(7) + 4 = RM25."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A taxi fare is RM6 plus RM3 per kilometre. The total is RM36.",
      "parts": [
        "Form an equation for distance d.",
        "Solve for d.",
        "Verify the fare."
      ],
      "answer": [
        [
          "6 + 3d = 36."
        ],
        [
          "d = 10 km."
        ],
        [
          "6 + 3(10) = RM36."
        ]
      ]
    },
    "bm": {
      "prompt": "Tambang teksi RM6 ditambah RM3 setiap kilometer. Jumlah RM36.",
      "parts": [
        "Bina persamaan bagi jarak d.",
        "Cari d.",
        "Semak tambang."
      ],
      "answer": [
        [
          "6 + 3d = 36."
        ],
        [
          "d = 10 km."
        ],
        [
          "6 + 3(10) = RM36."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle has length (x + 5) cm and width x cm. Its perimeter is 50 cm.",
      "parts": [
        "Form the perimeter equation.",
        "Find x.",
        "Calculate the area."
      ],
      "answer": [
        [
          "2(x + 5) + 2x = 50."
        ],
        [
          "4x + 10 = 50; x = 10."
        ],
        [
          "10 × 15 = 150 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat panjang (x + 5) cm dan lebar x cm. Perimeter 50 cm.",
      "parts": [
        "Bina persamaan perimeter.",
        "Cari x.",
        "Hitung luas."
      ],
      "answer": [
        [
          "2(x + 5) + 2x = 50."
        ],
        [
          "4x + 10 = 50; x = 10."
        ],
        [
          "10 × 15 = 150 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Amir is 4 years older than his sister. Their ages total 30 years.",
      "parts": [
        "Form an equation for the sister's age s.",
        "Find both ages.",
        "Check the sum."
      ],
      "answer": [
        [
          "s + (s + 4) = 30."
        ],
        [
          "s = 13; Amir = 17."
        ],
        [
          "13 + 17 = 30."
        ]
      ]
    },
    "bm": {
      "prompt": "Amir 4 tahun lebih tua daripada adiknya. Jumlah umur mereka 30 tahun.",
      "parts": [
        "Bina persamaan menggunakan umur adik s.",
        "Cari kedua-dua umur.",
        "Semak jumlah."
      ],
      "answer": [
        [
          "s + (s + 4) = 30."
        ],
        [
          "s = 13; Amir = 17."
        ],
        [
          "13 + 17 = 30."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school buys 6 identical rulers and pays RM50, receiving RM8 change.",
      "parts": [
        "Form an equation for price r.",
        "Find r.",
        "Check the payment."
      ],
      "answer": [
        [
          "6r + 8 = 50."
        ],
        [
          "r = 7."
        ],
        [
          "6(7) + 8 = 50."
        ]
      ]
    },
    "bm": {
      "prompt": "Sekolah membeli 6 pembaris serupa, membayar RM50 dan mendapat baki RM8.",
      "parts": [
        "Bina persamaan bagi harga r.",
        "Cari r.",
        "Semak bayaran."
      ],
      "answer": [
        [
          "6r + 8 = 50."
        ],
        [
          "r = 7."
        ],
        [
          "6(7) + 8 = 50."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "The sum of three consecutive integers is 72.",
      "parts": [
        "Form an equation for the smallest integer n.",
        "Find the three integers.",
        "Check their total."
      ],
      "answer": [
        [
          "n + (n + 1) + (n + 2) = 72."
        ],
        [
          "3n + 3 = 72; n = 23; 23, 24, 25."
        ],
        [
          "23 + 24 + 25 = 72."
        ]
      ]
    },
    "bm": {
      "prompt": "Jumlah tiga integer berturutan ialah 72.",
      "parts": [
        "Bina persamaan bagi integer terkecil n.",
        "Cari tiga integer.",
        "Semak jumlah."
      ],
      "answer": [
        [
          "n + (n + 1) + (n + 2) = 72."
        ],
        [
          "3n + 3 = 72; n = 23; 23, 24, 25."
        ],
        [
          "23 + 24 + 25 = 72."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tank contains 12 L of water and is filled at 5 L/min until it contains 47 L.",
      "parts": [
        "Form an equation using time t.",
        "Find t.",
        "Check the final volume."
      ],
      "answer": [
        [
          "12 + 5t = 47."
        ],
        [
          "t = 7 min."
        ],
        [
          "12 + 5(7) = 47 L."
        ]
      ]
    },
    "bm": {
      "prompt": "Tangki mengandungi 12 L air dan diisi pada kadar 5 L/min sehingga 47 L.",
      "parts": [
        "Bina persamaan menggunakan masa t.",
        "Cari t.",
        "Semak isi padu akhir."
      ],
      "answer": [
        [
          "12 + 5t = 47."
        ],
        [
          "t = 7 min."
        ],
        [
          "12 + 5(7) = 47 L."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two cinema tickets and RM7 of snacks cost RM35.",
      "parts": [
        "Form an equation for one ticket price x.",
        "Find x.",
        "Find the total cost of three tickets."
      ],
      "answer": [
        [
          "2x + 7 = 35."
        ],
        [
          "x = 14."
        ],
        [
          "3 × 14 = RM42."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua tiket wayang dan makanan ringan RM7 berjumlah RM35.",
      "parts": [
        "Bina persamaan bagi harga satu tiket x.",
        "Cari x.",
        "Cari jumlah harga tiga tiket."
      ],
      "answer": [
        [
          "2x + 7 = 35."
        ],
        [
          "x = 14."
        ],
        [
          "3 × 14 = RM42."
        ]
      ]
    }
  }
];
export function buildMathF1C6Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacy.length!==60||C6_CHALLENGES.length!==16)throw new Error("Chapter 6 card count invariant failed");
 return legacy.map(({entry,id},index)=>{
  const mode=index<12?"concept":index<44?"practice":"challenge";
  const challenge=mode==="challenge"?C6_CHALLENGES[index-44]:null;
  const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
  return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 6",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??(index<30?"6.1":"6.2"),reviewMode:mode,structured};
 });
}
