import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toPlainStudentText } from "./plain-student-text.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [setAPath, setBPath] = process.argv.slice(2);
const outputPath = path.join(
  repositoryRoot,
  "outputs",
  "science-form3-ch6-quizzes",
  "science-f3-ch6-normalized.json",
);

if (!setAPath || !setBPath) {
  throw new Error(
    "Usage: node scripts/prepare-science-f3-ch6-quizzes.mjs <set-a.json> <set-b.json>",
  );
}

const readSet = (sourcePath, expectedSet) => {
  const rows = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  if (rows.length !== 25 || rows.some((row) => row.set_letter !== expectedSet)) {
    throw new Error(`Expected 25 Set ${expectedSet} questions in ${sourcePath}`);
  }
  return rows;
};

const clean = (value) =>
  toPlainStudentText(value)
    .replace(/^[A-D]\.\s*/, "")
    .replace(/\s*\/\s*$/, "")
    .trim();

const setAEnglishOptions = [
  [
    "Biomass | Nuclear energy",
    "Natural gas | Geothermal energy",
    "Coal | Wind energy",
    "Petroleum | Tidal energy",
  ],
  [
    "Hydroelectric power | Natural gas",
    "Coal | Natural gas",
    "Natural gas | Petroleum",
    "Coal | Biomass",
  ],
  [
    "Leave the bar magnet stationary inside the coil.",
    "Move the bar magnet very slowly into the coil.",
    "Move the bar magnet rapidly out of the coil.",
    "Move a weaker magnet relative to the coil.",
  ],
  [
    "Slip rings; reverse the current in the coil every half-turn.",
    "Commutator; produces direct current in the external circuit.",
    "Commutator; increases the generated output voltage.",
    "Slip rings; maintain electrical contact without changing current direction.",
  ],
  [
    "Chemical energy → heat energy → electrical energy",
    "Gravitational potential energy → kinetic energy → electrical energy",
    "Nuclear energy → light energy → electrical energy",
    "Gravitational potential energy → chemical energy → electrical energy",
  ],
  [
    "Chemical energy → heat energy → electrical energy",
    "Nuclear energy → heat energy → kinetic energy → electrical energy",
    "Nuclear energy → electrical energy → heat energy",
    "Light energy → nuclear energy → electrical energy",
  ],
  ["Y-gain control", "Time-base control", "X-position control", "Focus control"],
  [
    "A horizontal line above the centre zero line.",
    "A horizontal line below the centre zero line.",
    "A single light spot deflected downwards.",
    "A sinusoidal wave above the X-axis.",
  ],
  [
    "Direct current; time-base off.",
    "Alternating current; time-base off.",
    "Direct current; time-base on.",
    "Alternating current; time-base on.",
  ],
  [
    "Increase the magnitude of the generated alternating current.",
    "Carry direct current from the primary circuit to the secondary circuit.",
    "Reduce energy loss as heat caused by eddy currents.",
    "Prevent short circuits in the copper wire.",
  ],
  [
    "Step-up: Vs < Vp; step-down: Vs > Vp",
    "Step-up: Ns > Np; step-down: Ns < Np",
    "Step-up: used in phone chargers; step-down: used before transmission",
    "Step-up: d.c. only; step-down: a.c. only",
  ],
  ["10 V", "24 V", "12 V", "5 V"],
  ["Electric iron", "Mobile phone charger", "Bread toaster", "Electric kettle"],
  ["Step-up | Step-up", "Step-down | Step-up", "Step-up | Step-down", "Step-down | Step-down"],
  [
    "To increase the current in the transmission cables.",
    "To reduce energy loss as heat in the transmission cables.",
    "To prevent lightning strikes on the cables.",
    "To prevent electromagnetic fields near the pylons.",
  ],
  [
    "Single-phase is for heavy industry, while three-phase is for small homes.",
    "Single-phase supplies up to 415 V, while three-phase is limited to 240 V.",
    "Single-phase is for premises using more than 50 A, while three-phase is for low usage.",
    "Single-phase is suitable for homes using no more than 10 kW, while three-phase is suitable for commercial or industrial premises using more than 10 kW.",
  ],
  [
    "ELCB | Main fuse box",
    "Main fuse box | Electricity meter",
    "Electricity meter | MCB",
    "Earth wire | ELCB",
  ],
  [
    "Miniature circuit breaker (MCB)",
    "Earth leakage circuit breaker (ELCB)",
    "Cartridge fuse",
    "Lightning conductor",
  ],
  ["Brown", "Blue", "Yellow", "Green and yellow stripes"],
  ["3 A", "5 A", "13 A", "15 A"],
  [
    "The percentage of electrical input energy converted into useful output energy.",
    "The ability to reduce a monthly electricity bill to zero.",
    "The ratio of total power used by an appliance over 24 hours.",
    "The use of electricity supplied only by renewable sources.",
  ],
  [
    "Filament bulb",
    "Compact fluorescent lamp (CFL)",
    "Light-emitting diode lamp (LED)",
    "Halogen bulb",
  ],
  [
    "More stars mean that the appliance costs more to maintain.",
    "More stars mean higher energy efficiency and lower electricity use.",
    "The stars show the number of warranty years.",
    "The stars show the number of supply phases required.",
  ],
  ["RM9.00", "RM4.50", "RM18.00", "RM1.20"],
  [
    "Install photovoltaic solar panels on the roof.",
    "Use a five-star central air-conditioning system.",
    "Design large windows and a layout that maximise daylight and natural ventilation.",
    "Install motion sensors that switch off LED lights in empty rooms.",
  ],
];

const setBEnglishOptionOverrides = {
  1: [
    "Sultan Azlan Shah Power Station (coal)",
    "Bakun Hydroelectric Power Station (hydro)",
    "Tuanku Jaafar Power Station (natural gas)",
    "Gelugor Power Station (diesel)",
  ],
  5: [
    "Nuclear power station: nuclear energy → heat energy → kinetic energy → electrical energy",
    "Thermal power station: chemical energy → heat energy → kinetic energy → electrical energy",
    "Biomass power station: chemical energy → heat energy → kinetic energy → electrical energy",
    "Solar power station: light energy → heat energy → kinetic energy → electrical energy",
  ],
  6: [
    "Direct current has high voltage, whereas alternating current has low voltage.",
    "Direct current flows in one direction, whereas alternating current repeatedly reverses direction.",
    "Direct current is produced by electromagnetic induction, whereas alternating current is produced only by dry cells.",
    "Alternating current has no heating effect, whereas direct current has a strong heating effect.",
  ],
  10: ["60 V", "960 V", "120 V", "30 V"],
  11: ["720 turns", "360 turns", "450 turns", "900 turns"],
  14: [
    "Single-phase supplies more than 50 kW, whereas three-phase supplies less than 10 kW.",
    "Single-phase is for heavy industry, whereas three-phase is for low-cost homes.",
    "Single-phase provides more stable voltage for high-power factory machinery.",
    "Single-phase is suitable for homes using no more than 10 kW, whereas three-phase is suitable for commercial or industrial premises using more than 10 kW.",
  ],
  15: [
    "Main fuse box → electricity meter → main switch → ELCB → MCB",
    "Electricity meter → MCB → main fuse box → main switch → ELCB",
    "ELCB → main switch → electricity meter → MCB → main fuse box",
    "Main switch → ELCB → MCB → electricity meter → main fuse box",
  ],
  17: [
    "Live wire — brown",
    "Neutral wire — blue",
    "Earth wire — green and yellow stripes",
    "Earth wire — red",
  ],
  18: [
    "Current = 2.0 A; fuse = 3 A",
    "Current = 5.0 A; fuse = 10 A",
    "Current = 5.0 A; fuse = 5 A",
    "Current = 0.2 A; fuse = 1 A",
  ],
  20: [
    "The percentage of electrical input energy converted into useful output energy.",
    "The ratio of the monthly electricity cost to the appliance power rating.",
    "The total kinetic energy produced by a power-station turbine in one hour.",
    "The ability of a dry cell to maintain constant output voltage without internal resistance.",
  ],
  21: ["80%", "95%", "90%", "75%"],
  22: [
    "Filament bulb",
    "Compact fluorescent lamp (CFL)",
    "Light-emitting diode lamp (LED)",
    "Neon lamp",
  ],
  23: [
    "Energy = 300 kWh; cost = RM77.00",
    "Energy = 300 kWh; cost = RM150.00",
    "Energy = 150 kWh; cost = RM32.70",
    "Energy = 10 kWh; cost = RM2.18",
  ],
};

const setBEnglishExplanations = [
  "Water stored behind a high dam has gravitational potential energy. As it flows down, this becomes kinetic energy that turns a turbine and generator to produce electrical energy.",
  "A conductor moving across magnetic field lines experiences electromagnetic induction and an induced current flows in the circuit.",
  "Moving the magnet more slowly reduces the rate of change of magnetic flux, so it does not increase the galvanometer deflection.",
  "The split-ring commutator reverses the coil connection every half-turn so that current in the external circuit continues to flow in one direction.",
  "A photovoltaic solar power station converts light energy directly into electrical energy, so the sequence in option D is incorrect.",
  "Direct current flows in one direction, while alternating current repeatedly reverses its direction.",
  "With the time-base on, d.c. produces a horizontal line. Grounding the positive terminal gives a negative Y-input, so the line appears below the centre.",
  "With the time-base off, an a.c. input moves the spot rapidly up and down, producing a vertical line at the centre of the screen.",
  "Insulated laminations interrupt eddy-current paths in the soft iron core and reduce energy loss as heat.",
  "Using Vp/Vs = Np/Ns gives 240/Vs = 1200/300 = 4, so Vs = 60 V.",
  "Using Vp/Vs = Np/Ns gives 240/5 = Np/15, so Np = 720 turns. Therefore option A is correct.",
  "For the same transmitted power, increasing voltage reduces current. Since cable heating is proportional to I²R, less energy is lost as heat.",
  "The switchyard is positioned between the National Grid and the main intake substation to control and isolate the electricity supply safely.",
  "Single-phase wiring is suitable for lower domestic loads, while three-phase wiring is used for higher commercial and industrial loads.",
  "The correct sequence is main fuse box, electricity meter, main switch, ELCB and then MCB.",
  "An ELCB detects current leaking to earth and disconnects the circuit quickly to reduce the risk of electric shock.",
  "Modern wiring uses brown for live, blue for neutral, and green-and-yellow stripes for earth. Red is not the earth-wire colour.",
  "The operating current is I = P/V = 1200/240 = 5.0 A. From the listed ratings, a 10 A fuse is the next rating above the normal current.",
  "The earth wire provides a low-resistance route for leakage current. This allows the protective device to disconnect the supply instead of current passing through a person.",
  "Energy efficiency is the percentage of input energy converted into useful output energy.",
  "Efficiency = useful output energy/input energy × 100% = 720/800 × 100% = 90%.",
  "An LED produces the same brightness using less electrical energy than the other listed lamps.",
  "The air conditioner uses 2 × 5 × 30 = 300 kWh. The cost is 200 × RM0.218 + 100 × RM0.334 = RM77.00.",
  "Solar panels are an active green feature because they use technology to generate electricity. Daylighting, reflective surfaces and plant shading are passive features.",
  "The Energy Commission issues star-rating labels so consumers can compare the energy efficiency of electrical appliances.",
];

const patches = {
  A: {
    2: {
      explanation:
        "Stesen Jana Kuasa Sultan Azlan Shah menggunakan arang batu, manakala Stesen Jana Kuasa Tuanku Jaafar menggunakan gas asli. Sultan Azlan Shah Power Station uses coal, while Tuanku Jaafar Power Station uses natural gas.",
    },
    4: {
      question_malay: "Apakah fungsi komutator dalam sebuah penjana arus terus (a.t.) ringkas?",
      question_english:
        "What is the function of the commutator in a simple direct current (d.c.) generator?",
    },
    5: {
      option_a_malay: "Tenaga kimia → tenaga haba → tenaga elektrik",
      option_b_malay: "Tenaga keupayaan graviti → tenaga kinetik → tenaga elektrik",
      option_c_malay: "Tenaga nuklear → tenaga cahaya → tenaga elektrik",
      option_d_malay: "Tenaga keupayaan graviti → tenaga kimia → tenaga elektrik",
    },
    6: {
      option_a_malay: "Tenaga kimia → tenaga haba → tenaga elektrik",
      option_b_malay: "Tenaga nuklear → tenaga haba → tenaga kinetik → tenaga elektrik",
      option_c_malay: "Tenaga nuklear → tenaga elektrik → tenaga haba",
      option_d_malay: "Tenaga cahaya → tenaga nuklear → tenaga elektrik",
    },
    9: {
      question_malay:
        "Skrin O.S.K. memaparkan gelombang sinus lengkap. Apakah jenis bekalan input dan keadaan dasar-masa yang menghasilkan paparan ini?",
      question_english:
        "A C.R.O. screen displays a complete sinusoidal wave. Which input supply and time-base setting produce this display?",
    },
    11: {
      question_malay:
        "Antara perbandingan transformer injak naik dengan transformer injak turun berikut, yang manakah betul?",
      question_english:
        "Which comparison between a step-up transformer and a step-down transformer is correct?",
      option_a_malay: "Injak naik: Vs < Vp; injak turun: Vs > Vp",
      option_b_malay: "Injak naik: Ns > Np; injak turun: Ns < Np",
      option_c_malay:
        "Injak naik: digunakan dalam pengecas telefon; injak turun: digunakan sebelum penghantaran",
      option_d_malay: "Injak naik: a.t. sahaja; injak turun: a.u. sahaja",
    },
    14: {
      question_malay:
        "Voltan dinaikkan daripada 11 kV kepada 132 kV sebelum penghantaran dan diturunkan semula sebelum dibekalkan pada 240 V ke rumah. Apakah jenis transformer yang digunakan mengikut urutan?",
      question_english:
        "Voltage is raised from 11 kV to 132 kV before transmission and lowered again before a 240 V supply reaches homes. Which transformer types are used in order?",
    },
    17: {
      question_malay:
        "Apakah dua komponen pertama yang dilalui oleh bekalan elektrik rumah sebelum sampai ke suis utama?",
      question_english:
        "Which first two components does the domestic electricity supply pass through before reaching the main switch?",
    },
    20: {
      question_malay:
        "Sebuah penyaman udara berkuasa 960 W disambungkan kepada bekalan 240 V. Antara nilai fius berikut, yang manakah paling sesuai untuk palamnya?",
      question_english:
        "An air conditioner rated at 960 W is connected to a 240 V supply. Which fuse rating is most suitable for its plug?",
      explanation:
        "Arus operasi, I = P/V = 960/240 = 4 A. Fius 5 A ialah nilai terendah yang melebihi arus operasi biasa. The operating current is I = P/V = 960/240 = 4 A. A 5 A fuse is the lowest rating above the normal operating current.",
    },
  },
  B: {
    2: {
      question_malay:
        "Seutas dawai digerakkan dengan pantas merentasi medan magnet dan disambungkan kepada galvanometer sifar tengah. Apakah fenomena yang berlaku dan jenis arus yang dikesan?",
      question_english:
        "A wire connected to a centre-zero galvanometer is moved rapidly across a magnetic field. What phenomenon occurs and what type of current is detected?",
    },
    4: {
      question_malay:
        "Apakah fungsi utama komutator gegelang terbelah dalam penjana arus terus (a.t.)?",
      question_english:
        "What is the main function of the split-ring commutator in a direct current (d.c.) generator?",
    },
    8: {
      question_malay:
        "Skrin O.S.K. menunjukkan satu garis tegak pada paksi-Y tengah. Apakah tetapan dasar-masa dan jenis input yang menghasilkan corak ini?",
      question_english:
        "A C.R.O. screen shows a vertical line on the central Y-axis. Which time-base setting and input type produce this pattern?",
    },
    9: {
      question_malay:
        "Mengapakah teras besi lembut sebuah transformer dibina daripada lapisan-lapisan nipis yang bertebat?",
      question_english:
        "Why is the soft iron core of a transformer made from thin insulated laminations?",
    },
    11: {
      correct_answer: "A",
      explanation:
        "Menggunakan Vp/Vs = Np/Ns, 240/5 = Np/15. Oleh itu, Np = 720 lilitan dan pilihan A ialah jawapan yang betul. Using Vp/Vs = Np/Ns, 240/5 = Np/15. Therefore, Np = 720 turns and option A is correct.",
    },
    13: {
      question_malay:
        "Dalam sistem penghantaran elektrik, komponen manakah terletak selepas Rangkaian Grid Nasional dan sebelum pencawang masuk utama?",
      question_english:
        "In the electricity transmission system, which component is located after the National Grid and before the main intake substation?",
    },
    18: {
      question_malay:
        "Sebuah perkakas berlabel 240 V, 1.2 kW disambungkan kepada bekalan rumah. Hitung arus dan pilih fius paling sesuai daripada 1 A, 2 A, 3 A, 5 A, 10 A dan 13 A.",
      question_english:
        "An appliance rated at 240 V, 1.2 kW is connected to a domestic supply. Calculate the current and select the most suitable fuse from 1 A, 2 A, 3 A, 5 A, 10 A and 13 A.",
    },
    21: {
      question_malay:
        "Sebuah periuk nasi menggunakan 800 J tenaga elektrik dan menghasilkan 720 J tenaga haba berguna. Hitung peratus kecekapan tenaganya.",
    },
    23: {
      question_malay:
        "Sebuah rumah menggunakan penyaman udara 2 kW selama 5 jam sehari untuk 30 hari. Tarif bagi 200 kWj pertama ialah 21.8 sen/kWj dan 100 kWj berikutnya ialah 33.4 sen/kWj. Berapakah tenaga yang digunakan dan kosnya?",
      question_english:
        "A home uses a 2 kW air conditioner for 5 hours a day for 30 days. The tariff is 21.8 sen/kWh for the first 200 kWh and 33.4 sen/kWh for the next 100 kWh. How much energy is used and what is the cost?",
    },
    19: {
      explanation:
        "Dawai bumi menyediakan laluan berintangan rendah untuk arus bocor. Hal ini membolehkan alat perlindungan memutuskan bekalan dan mengelakkan arus melalui badan manusia. The earth wire provides a low-resistance route for leakage current, allowing the protective device to disconnect the supply instead of current passing through a person.",
    },
    22: {
      explanation:
        "Lampu LED menghasilkan kecerahan yang sama dengan menggunakan kurang tenaga elektrik berbanding lampu lain yang disenaraikan. An LED produces the same brightness using less electrical energy than the other listed lamps.",
    },
    25: {
      explanation:
        "Suruhanjaya Tenaga mengeluarkan label penarafan satu hingga lima bintang supaya pengguna dapat membandingkan kecekapan tenaga peralatan elektrik. The Energy Commission issues one-to-five-star labels so consumers can compare the energy efficiency of electrical appliances.",
    },
  },
};

function splitSetAText(value) {
  const parts = value.split(/\r?\n/).map(clean).filter(Boolean);
  return [parts[0], clean(parts[1]?.replace(/^\*|\*$/g, ""))];
}

function splitSetAExplanation(value) {
  const englishMarker = value.lastIndexOf("\n*");
  if (englishMarker === -1) return [clean(value), ""];
  return [
    clean(value.slice(0, englishMarker)),
    clean(value.slice(englishMarker + 1).replace(/^\*|\*$/g, "")),
  ];
}

function splitSetBQuestion(row) {
  const lines = row.question_text.split(/\r?\n/).map(clean).filter(Boolean);
  return [lines[0], lines[1]];
}

function splitSetBOption(value, questionNumber, optionIndex) {
  const override = setBEnglishOptionOverrides[questionNumber]?.[optionIndex];
  const parts = value.split(/\s+\/\s+/);
  return [clean(parts[0]), override ?? clean(parts.slice(1).join(" / "))];
}

function normalizeSetA(row) {
  const [questionMalay, questionEnglish] = splitSetAText(row.question_text);
  const [explanationMalay, explanationEnglish] = splitSetAExplanation(row.explanation);
  const normalized = {
    chapter_number: 6,
    set_letter: "A",
    chapter_title: "Bab 6: Elektrik dan Kemagnetan (Electricity and Magnetism) - Kuiz Set A",
    question_number: row.question_number,
    question_malay: questionMalay,
    question_english: questionEnglish,
    ...Object.fromEntries(
      ["a", "b", "c", "d"].flatMap((letter, index) => [
        [`option_${letter}_malay`, clean(row[`option_${letter}`])],
        [`option_${letter}_english`, setAEnglishOptions[row.question_number - 1][index]],
      ]),
    ),
    correct_answer: row.correct_answer,
    explanation: `${explanationMalay} ${explanationEnglish}`,
  };
  return { ...normalized, ...patches.A[row.question_number] };
}

function normalizeSetB(row) {
  const [questionMalay, questionEnglish] = splitSetBQuestion(row);
  const normalized = {
    chapter_number: 6,
    set_letter: "B",
    chapter_title: "Bab 6: Elektrik dan Kemagnetan (Electricity and Magnetism) - Kuiz Set B",
    question_number: row.question_number,
    question_malay: questionMalay,
    question_english: questionEnglish,
    ...Object.fromEntries(
      ["a", "b", "c", "d"].flatMap((letter, index) => {
        const [malay, english] = splitSetBOption(
          row[`option_${letter}`],
          row.question_number,
          index,
        );
        return [
          [`option_${letter}_malay`, malay],
          [`option_${letter}_english`, english],
        ];
      }),
    ),
    correct_answer: row.correct_answer,
    explanation: `${clean(row.explanation)} ${setBEnglishExplanations[row.question_number - 1]}`,
  };
  return { ...normalized, ...patches.B[row.question_number] };
}

const normalized = [
  ...readSet(setAPath, "A").map(normalizeSetA),
  ...readSet(setBPath, "B").map(normalizeSetB),
];

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
console.log(`Prepared ${normalized.length} Chapter 6 questions.`);
console.log(`Wrote ${path.relative(repositoryRoot, outputPath)}.`);
