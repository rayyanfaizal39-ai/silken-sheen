// ─── Hall of Fame cohort ────────────────────────────────────────────────────
// Until cross-user cloud sync is connected, the leaderboard blends this seeded
// cohort with the real local student so the feature is fully functional (top 100).

export interface CohortStudent {
  id: string;
  name: string;
  school: string;
  xp: number;
}

/** 99-student demo cohort representing KSSM students across Malaysia. */
export const COHORT: CohortStudent[] = [
  // ── Queen tier (1600+ XP) ──
  { id: "c1",  name: "Nur Aisyah binti Razak",       school: "SMK Seri Bintang",    xp: 4820 },
  { id: "c2",  name: "Muhammad Haikal bin Azman",     school: "SMK Taman Desa",      xp: 4310 },
  { id: "c3",  name: "Tan Wei Jie",                   school: "SMK Damansara Utama", xp: 3990 },
  { id: "c4",  name: "Priya Maheswari",               school: "SMK Subang Jaya",     xp: 3450 },
  { id: "c5",  name: "Arif Danial bin Roslan",        school: "SMK Bukit Jalil",     xp: 3080 },
  { id: "c6",  name: "Lee Xin Yi",                    school: "SMK Kepong",          xp: 2750 },
  { id: "c7",  name: "Siti Nurhaliza binti Kamal",    school: "SMK Gombak",          xp: 2510 },
  { id: "c8",  name: "Ravi Chandran",                 school: "SMK Klang Utama",     xp: 2290 },
  { id: "c9",  name: "Chong Mei Ling",                school: "SMK Cheras",          xp: 2080 },
  { id: "c10", name: "Aiman Hakimi bin Yusof",        school: "SMK Ampang",          xp: 1920 },
  { id: "c11", name: "Farah Nabila binti Idris",      school: "SMK Shah Alam",       xp: 1780 },
  { id: "c12", name: "Daniel Wong",                   school: "SMK Puchong",         xp: 1650 },

  // ── King tier (1100–1599 XP) ──
  { id: "c13", name: "Nurul Ain binti Hassan",        school: "SMK Petaling Jaya",   xp: 1580 },
  { id: "c14", name: "Azri bin Mahmud",               school: "SMK Setapak",         xp: 1490 },
  { id: "c15", name: "Chua Li Ying",                  school: "SMK Wangsa Maju",     xp: 1420 },
  { id: "c16", name: "Suraya binti Othman",           school: "SMK Batu Caves",      xp: 1350 },
  { id: "c17", name: "Luqmanul Hakim bin Saad",       school: "SMK Sri Utama",       xp: 1290 },
  { id: "c18", name: "Yeoh Pei Xin",                  school: "SMK Bukit Bintang",   xp: 1230 },
  { id: "c19", name: "Shathisivam s/o Muniandy",      school: "SMK Sentul",          xp: 1170 },
  { id: "c20", name: "Nurhazwani binti Zulkifli",     school: "SMK Keramat",         xp: 1120 },

  // ── Rook tier (750–1099 XP) ──
  { id: "c21", name: "Lim Jun Kai",                   school: "SMK Kinrara",         xp: 1060 },
  { id: "c22", name: "Fatin Syahirah binti Rosdi",    school: "SMK Sungai Besi",     xp: 1010 },
  { id: "c23", name: "Muhammad Hafizi bin Ariff",     school: "SMK Setiawangsa",     xp:  970 },
  { id: "c24", name: "Kavitha d/o Krishnan",          school: "SMK Desa Pandan",     xp:  930 },
  { id: "c25", name: "Tengku Afiq bin Tengku Azlan",  school: "SMK Bandar Tasik Selatan", xp: 890 },
  { id: "c26", name: "Ong Hui Shan",                  school: "SMK Kompleks Paya Jaras",  xp: 860 },
  { id: "c27", name: "Norhazirah binti Nordin",       school: "SMK Salak South",     xp:  820 },
  { id: "c28", name: "Harith Izzat bin Zainol",       school: "SMK Titiwangsa",      xp:  790 },
  { id: "c29", name: "Adelyn Toh Shu Min",            school: "SMK Taman Connaught", xp:  760 },

  // ── Bishop tier (450–749 XP) ──
  { id: "c30", name: "Mohamad Razif bin Ramli",       school: "SMK Lembah Keramat",  xp:  730 },
  { id: "c31", name: "Ngo Wei Keat",                  school: "SMK Pandan Jaya",     xp:  705 },
  { id: "c32", name: "Shalini d/o Rajasekaran",       school: "SMK Taman Sri Rampai",xp:  680 },
  { id: "c33", name: "Hafeeza binti Anuar",           school: "SMK Mutiara Damansara",xp: 655 },
  { id: "c34", name: "Khoo Boon Seng",                school: "SMK Rawang",          xp:  630 },
  { id: "c35", name: "Nur Syafiqah binti Zainal",     school: "SMK Bukit Rahman Putra", xp: 610 },
  { id: "c36", name: "Mohd Faris bin Salleh",         school: "SMK Bandar Sri Damansara", xp: 590 },
  { id: "c37", name: "Jessica Lim Ee Ling",           school: "SMK Puchong Perdana", xp:  570 },
  { id: "c38", name: "Nabilah binti Mohd Noor",       school: "SMK Kota Kemuning",   xp:  548 },
  { id: "c39", name: "Amirul Hakim bin Zulkefli",     school: "SMK Pandamaran",      xp:  525 },
  { id: "c40", name: "Tan Yee Ping",                  school: "SMK Alam Megah",      xp:  510 },
  { id: "c41", name: "Maziah binti Mohd Akhir",       school: "SMK Pinggiran Subang",xp:  495 },
  { id: "c42", name: "Dharshene s/o Balakrishnan",    school: "SMK Seafield",        xp:  475 },
  { id: "c43", name: "Nur Amirah binti Zainudin",     school: "SMK Puncak Jalil",    xp:  458 },

  // ── Knight tier (200–449 XP) ──
  { id: "c44", name: "Izzatul Islam bin Azman",       school: "SMK Bandar Tasik Puteri", xp: 435 },
  { id: "c45", name: "Melody Chia Shu Wen",           school: "SMK Damansara Damai", xp:  418 },
  { id: "c46", name: "Mohamad Luqman bin Yazid",      school: "SMK USJ 4",           xp:  400 },
  { id: "c47", name: "Thivya d/o Subramaniam",        school: "SMK USJ 13",          xp:  385 },
  { id: "c48", name: "Syazwan bin Shaharudin",        school: "SMK Puchong Utama",   xp:  368 },
  { id: "c49", name: "Vivian Khor Yu Ling",           school: "SMK Damansara Kim",   xp:  352 },
  { id: "c50", name: "Harish s/o Nagalingam",         school: "SMK Sungai Buloh",    xp:  338 },
  { id: "c51", name: "Nur Aimanina binti Rahmat",     school: "SMK Taman Mega",      xp:  322 },
  { id: "c52", name: "Izzuddin bin Mohd Ridzwan",     school: "SMK Setia Jaya",      xp:  307 },
  { id: "c53", name: "Siow Hui Lin",                  school: "SMK Bandar Kinrara",  xp:  294 },
  { id: "c54", name: "Nur Farhana binti Nazri",       school: "SMK Sri Manja",       xp:  280 },
  { id: "c55", name: "Adam Fikri bin Shahabudin",     school: "SMK Kepong Baru",     xp:  268 },
  { id: "c56", name: "Kathiravan s/o Raman",          school: "SMK Sri Andalas",     xp:  255 },
  { id: "c57", name: "Huey Lin Chow",                 school: "SMK Taman Len Seng",  xp:  242 },
  { id: "c58", name: "Siti Hajar binti Ramli",        school: "SMK Datok Keramat",   xp:  228 },
  { id: "c59", name: "Irfan Hakimi bin Mohd Yunus",   school: "SMK Taman Bukit Mewah",xp: 215 },
  { id: "c60", name: "Goh Jian Shen",                 school: "SMK Raja Abdullah",   xp:  202 },

  // ── Pawn tier (0–199 XP) ──
  { id: "c61", name: "Nurul Huda binti Mohd Razi",    school: "SMK Pandan Mewah",    xp:  192 },
  { id: "c62", name: "Shahril Azwan bin Idris",       school: "SMK Bandar Baru Klang",xp: 180 },
  { id: "c63", name: "Cindy Loh Hui Ying",            school: "SMK Kepong Baru",     xp:  168 },
  { id: "c64", name: "Izatul Syafiqah binti Johari",  school: "SMK Taman Permata",   xp:  157 },
  { id: "c65", name: "Muhamad Hamizan bin Halim",     school: "SMK Bandar Mahkota Cheras", xp: 145 },
  { id: "c66", name: "Praveena d/o Vijaian",          school: "SMK Sri Subang",      xp:  134 },
  { id: "c67", name: "Luqman Nul Hakim bin Razak",    school: "SMK Lembah Jaya",     xp:  122 },
  { id: "c68", name: "Chan Xin Yi",                   school: "SMK Bandar Baru Wangsa Maju", xp: 111 },
  { id: "c69", name: "Munirah binti Mazlan",          school: "SMK Sri Petaling",    xp:   99 },
  { id: "c70", name: "Vickneswaran s/o Raju",         school: "SMK Putera Jaya",     xp:   88 },
  { id: "c71", name: "Nursyakirah binti Rusli",       school: "SMK Taman Segar",     xp:   78 },
  { id: "c72", name: "Soo Jia Hao",                   school: "SMK Alam Damai",      xp:   68 },
  { id: "c73", name: "Nabilah Aisyah binti Alias",    school: "SMK Desa Aman",       xp:   58 },
  { id: "c74", name: "Hirwan bin Hamdan",              school: "SMK Taman Maluri",    xp:   49 },
  { id: "c75", name: "Ng Kai Xin",                    school: "SMK Pusat Bandar Puchong", xp: 42 },
  { id: "c76", name: "Faznisha binti Mustapa",        school: "SMK Bangsar",         xp:   36 },
  { id: "c77", name: "Rifhan Hanif bin Ramzan",       school: "SMK Seksyen 4 Kota Damansara", xp: 30 },
  { id: "c78", name: "Winnie Ooi Soo Yean",           school: "SMK Taman Cheras Maju",xp:  25 },
  { id: "c79", name: "Aina Nabila binti Zolkfli",     school: "SMK Pandan Indah",    xp:   20 },
  { id: "c80", name: "Kumar s/o Muthusamy",           school: "SMK Chong Hwa",       xp:   16 },
  { id: "c81", name: "Hana Fatihah binti Kamarudin",  school: "SMK La Salle",        xp:   12 },
  { id: "c82", name: "Syamil Irfan bin Ramli",        school: "SMK Methodist",       xp:    9 },
  { id: "c83", name: "Natasya Adilla binti Saifuddin",school: "SMK Convent",         xp:    7 },
  { id: "c84", name: "Lee Boon Keat",                 school: "SMK Victoria",        xp:    5 },
  { id: "c85", name: "Khairiyah binti Ismail",        school: "SMK Aminuddin Baki",  xp:    4 },
  { id: "c86", name: "Asyraf Haziq bin Mohd Zaki",    school: "SMK Seri Gombak",     xp:    3 },
  { id: "c87", name: "Rachel Tan Jia Yin",            school: "SMK Bandar Sri Permaisuri", xp: 2 },
  { id: "c88", name: "Nurulain binti Ramlan",         school: "SMK Taman Daya",      xp:    2 },
  { id: "c89", name: "Mukhriz bin Abdul Hamid",       school: "SMK Batu Muda",       xp:    1 },
  { id: "c90", name: "Shivani d/o Selvam",            school: "SMK Jalan Empat",     xp:    1 },
  { id: "c91", name: "Hafizuddin bin Nordin",         school: "SMK Bandar Baru Selayang", xp: 1 },
  { id: "c92", name: "Gloria Anak Suni",              school: "SMK Bandar Utama",    xp:    1 },
  { id: "c93", name: "Aizat Akram bin Johari",        school: "SMK Taman Wahyu",     xp:    1 },
  { id: "c94", name: "Norizan binti Razali",          school: "SMK Batu 11 Cheras",  xp:    0 },
  { id: "c95", name: "Bryan Loo Zhen Wei",            school: "SMK Damansara",       xp:    0 },
  { id: "c96", name: "Siti Zulaikha binti Jusoh",     school: "SMK Wangsa Melawati", xp:    0 },
  { id: "c97", name: "Varun s/o Gopinath",            school: "SMK Desa Setapak",    xp:    0 },
  { id: "c98", name: "Nadiyah binti Hashim",          school: "SMK Sri Aman",        xp:    0 },
  { id: "c99", name: "Azmi bin Saad",                 school: "SMK Kepong",          xp:    0 },
];
