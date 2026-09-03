import fs from "node:fs";

const csvPath = "outputs/science-form3-master-quizzes/sains-t3-kssm-quizzes-master-updated.csv";
const jsonPath = "outputs/science-form3-ch7-10-quizzes/science-f3-ch7-10-normalized.json";
const newRowsPath = "outputs/science-form3-master-quizzes/new-rows.json";
const llmCachePath = "outputs/science-form3-ch7-10-quizzes/science-f3-ch7-10-llm-cache.json";

const patches = {
  C1BQ24: {
    option_a_english: "Active smoker",
    option_b_english: "Passive smoker",
    option_c_english: "Heavy smoker",
    option_d_english: "Social smoker",
  },
  C2AQ1: {
    question_malay: "Apakah gerak balas utama badan seorang atlet apabila berlatih di kawasan tanah tinggi yang mempunyai kandungan oksigen lebih rendah?",
    question_english: "What is the body's main response when an athlete trains at high altitude, where less oxygen is available?",
    explanation: "Di kawasan tanah tinggi, kandungan oksigen lebih rendah. Limpa membebaskan sel darah merah yang disimpan dan badan meningkatkan penghasilan sel darah merah untuk membantu pengangkutan oksigen.",
  },
  C2AQ2: {
    explanation: "Urutan laluan udara semasa menarik nafas ialah lubang hidung → rongga hidung → farinks → larinks → trakea → bronkus → bronkiol → alveolus.",
  },
  C2AQ21: {
    question_malay: "Asap rokok disedut melalui kapas putih di dalam tiub-U. Kapas itu bertukar menjadi perang. Apakah yang ditunjukkan oleh perubahan ini?",
    question_english: "Cigarette smoke is drawn through white cotton wool in a U-tube. The cotton wool turns brown. What does this change show?",
    option_a_english: "Acidic nitrogen dioxide gas has dissolved.",
    option_b_english: "Carboxyhaemoglobin has formed in the lungs.",
    option_c_english: "Sticky cigarette tar has been deposited on the cotton wool.",
    option_d_english: "The alveoli have been damaged by the high temperature of the smoke.",
    explanation: "Tar ialah bahan perang dan melekit dalam asap rokok. Warna perang pada kapas menunjukkan bahawa tar daripada asap rokok telah mendap pada kapas.",
  },
  C2AQ23: {
    option_a_english: "Gill filament system",
    option_b_english: "Tracheal system",
    option_c_english: "Moist skin system",
    option_d_english: "Alveolar system",
  },
  C2AQ10: {
    explanation: "Udara sedutan mengandungi lebih banyak oksigen daripada udara hembusan. Oleh itu, lilin dalam udara sedutan menyala lebih lama sebelum terpadam.",
  },
  C2BQ1: {
    question_malay: "Atlet jarak jauh berlatih di kawasan tanah tinggi yang mempunyai kandungan oksigen lebih rendah. Apakah gerak balas jangka pendek limpa atlet itu?",
    question_english: "A long-distance athlete trains at high altitude, where less oxygen is available. What is the athlete's short-term spleen response?",
    explanation: "Kekurangan oksigen di altitud tinggi merangsang limpa membebaskan sel darah merah yang disimpan. Hal ini meningkatkan pengangkutan oksigen ke sel badan.",
  },
  C2BQ6: {
    question_malay: "Dua lilin dinyalakan secara berasingan di dalam balang berisi udara sedutan dan udara hembusan. Selepas lilin padam, aras air naik lebih sedikit dalam balang udara hembusan. Apakah kesimpulannya?",
    question_english: "Two candles are lit separately in jars containing inhaled air and exhaled air. After the candles go out, the water level rises less in the jar of exhaled air. What is the conclusion?",
    option_b_english: "Exhaled air has a lower percentage of oxygen than inhaled air.",
    option_c_english: "Inhaled air has a higher carbon dioxide content than exhaled air.",
    explanation: "A candle uses oxygen during combustion. The smaller rise in water level shows that exhaled air contains less oxygen than inhaled air.",
  },
  C2BQ7: {
    question_malay: "Udara sedutan dialirkan melalui air kapur dalam kelalang A, manakala udara hembusan dialirkan melalui air kapur dalam kelalang B. Pemerhatian manakah menunjukkan bahawa udara hembusan mengandungi lebih banyak karbon dioksida?",
    question_english: "Inhaled air is bubbled through limewater in flask A, while exhaled air is bubbled through limewater in flask B. Which observation shows that exhaled air contains more carbon dioxide?",
    option_a_english: "The limewater in flask A turns purple.",
    option_b_english: "The limewater in flask B remains clear throughout.",
    option_c_english: "The limewater in flask B turns cloudy more quickly.",
    option_d_english: "The limewater in flask A boils and becomes acidic.",
    explanation: "Carbon dioxide turns limewater cloudy. The limewater receiving exhaled air turns cloudy more quickly because exhaled air contains more carbon dioxide.",
  },
  C2BQ16: {
    question_malay: "Asap rokok disedut melalui kapas putih dengan menggunakan pam turas. Apakah pemerhatian dan kesimpulan yang betul?",
    question_english: "Cigarette smoke is drawn through white cotton wool using a filter pump. Which observation and conclusion are correct?",
    option_a_english: "The cotton wool turns red, showing that cigarette smoke contains acidic gas.",
    option_b_english: "The cotton wool turns brown or black, showing that cigarette smoke contains sticky tar.",
    option_c_english: "The cotton wool remains white, showing that limewater filters all cigarette smoke.",
    option_d_english: "The cotton wool becomes wet and dissolves, showing that cigarette smoke releases nitrogen dioxide vapour.",
    explanation: "The brown or black deposit on the cotton wool is sticky tar from cigarette smoke.",
  },
  C2BQ22: {
    explanation: "Respirasi sel berlaku sepanjang masa, manakala fotosintesis memerlukan cahaya dan berlaku apabila cahaya mencukupi.",
  },
  C3AQ3: {
    question_malay: "Jantung katak mempunyai dua atrium dan satu ventrikel. Bagaimanakah susunan tiga ruang ini mempengaruhi pengangkutan darah beroksigen?",
    question_english: "A frog's heart has two atria and one ventricle. How does this three-chambered arrangement affect the transport of oxygenated blood?",
    explanation: "Jantung katak mempunyai dua atrium dan satu ventrikel. Oleh sebab hanya terdapat satu ventrikel, darah beroksigen dan darah terdeoksigen bercampur secara separa sebelum dipam keluar.",
  },
  C3AQ8: {
    question_malay: "Ventrikel kiri mempunyai dinding berotot yang lebih tebal daripada ventrikel kanan. Mengapakah struktur ini diperlukan?",
    question_english: "The left ventricle has a thicker muscular wall than the right ventricle. Why is this structure needed?",
    option_c_malay: "Ventrikel kiri perlu mengecut dengan kuat untuk mengepam darah beroksigen ke seluruh badan melalui aorta.",
    option_c_english: "The left ventricle must contract strongly to pump oxygenated blood throughout the body through the aorta.",
    explanation: "Ventrikel kiri berdinding tebal supaya dapat menghasilkan tekanan yang tinggi untuk mengepam darah ke seluruh badan. Ventrikel kanan hanya mengepam darah ke peparu.",
  },
  C3AQ9: {
    question_malay: "Apakah fungsi injap trikuspid dan injap bikuspid di dalam jantung manusia?",
  },
  C3AQ12: {
    question_malay: "Bacaan tekanan darah seseorang ialah 120/75 mmHg. Apakah maksud tekanan sistolik 120 mmHg dan tekanan diastolik 75 mmHg?",
  },
  C3AQ13: {
    question_malay: "Kadar denyutan nadi dipengaruhi oleh beberapa faktor. Perbandingan manakah yang betul?",
  },
  C3AQ25: {
    question_malay: "Satu gelang kulit batang pokok bunga raya dibuang bersama tisu floemnya, tetapi xilem dibiarkan. Apakah pemerhatian selepas sebulan?",
    question_english: "A ring of bark and its phloem is removed from a hibiscus stem, while the xylem is left intact. What will be observed after one month?",
    option_b_malay: "Bahagian batang di atas gelang membengkak kerana sukrosa terkumpul, manakala bahagian bawah gelang mengecut.",
    option_b_english: "The stem above the ring swells because sucrose accumulates there, while the part below the ring shrinks.",
    option_c_english: "The stem below the ring swells because water accumulates there due to gravity.",
    option_d_english: "No physical change occurs in any part of the hibiscus stem.",
  },
  C3BQ3: {
    question_malay: "Darah seekor vertebrata mengalir mengikut urutan sinus venosus → atrium → ventrikel → arteri → kapilari insang → aorta dorsal → tisu badan → vena. Haiwan manakah mempunyai sistem peredaran ini?",
    question_english: "A vertebrate's blood flows through the sinus venosus → atrium → ventricle → artery → gill capillaries → dorsal aorta → body tissues → vein. Which animal has this circulatory system?",
    option_a_english: "Frog",
    option_b_english: "Fish",
    option_c_english: "Lizard",
    option_d_english: "Sparrow",
  },
  C3BQ10: {
    question_malay: "Darah mengalir dari ventrikel kanan melalui arteri pulmonari ke peparu, kemudian kembali melalui vena pulmonari ke atrium kiri. Apakah nama peredaran ini?",
    question_english: "Blood flows from the right ventricle through the pulmonary artery to the lungs, then returns through the pulmonary vein to the left atrium. What is this circulation called?",
  },
  C3BQ22: {
    question_malay: "Dalam berkas vaskular daun eudikot, satu tisu terletak di bahagian atas dan satu lagi di bahagian bawah. Padanan kedudukan dan fungsi manakah yang betul?",
    question_english: "In the vascular bundle of a eudicot leaf, one tissue lies on the upper side and another on the lower side. Which pairing of position and function is correct?",
    option_a_malay: "Atas: floem yang mengangkut sukrosa; bawah: xilem yang mengangkut air",
    option_a_english: "Upper: phloem that transports sucrose; lower: xylem that transports water",
    option_b_malay: "Atas: xilem yang mengangkut air; bawah: floem yang mengangkut sukrosa",
    option_b_english: "Upper: xylem that transports water; lower: phloem that transports sucrose",
    option_c_malay: "Atas: parenkima yang mengangkut air; bawah: kolenkima yang mengangkut sukrosa",
    option_c_english: "Upper: parenchyma that transports water; lower: collenchyma that transports sucrose",
    option_d_malay: "Atas: xilem yang menjalankan fotosintesis; bawah: floem yang menjalankan respirasi",
    option_d_english: "Upper: xylem that carries out photosynthesis; lower: phloem that carries out respiration",
    explanation: "Dalam berkas vaskular daun eudikot, xilem terletak di bahagian atas dan mengangkut air serta garam mineral. Floem terletak di bahagian bawah dan mengangkut sukrosa.",
  },
  C3BQ24: {
    question_malay: "Satu gelang kulit batang tumbuhan berkayu dibuang bersama floemnya. Selepas beberapa minggu, bahagian atas gelang membengkak manakala bahagian bawah mengecut. Apakah kesimpulannya?",
    question_english: "A ring of bark and phloem is removed from a woody plant stem. After several weeks, the part above the ring swells while the part below shrinks. What is the conclusion?",
  },
  C4AQ5: {
    question_malay: "Asid hidroklorik cair ditambahkan kepada kalsium karbonat. Gas yang terhasil dialirkan ke dalam air kapur. Apakah pemerhatian dan identiti gas itu?",
    question_english: "Dilute hydrochloric acid is added to calcium carbonate. The gas produced is bubbled through limewater. What is the observation and the identity of the gas?",
  },
  C4AQ7: {
    question_malay: "Kalsium karbonat dipanaskan dengan kuat lalu mengalami penguraian terma. Apakah pepejal yang tertinggal di dalam tabung didih?",
    question_english: "Calcium carbonate is heated strongly and undergoes thermal decomposition. Which solid remains in the boiling tube?",
  },
  C4AQ11: {
    question_malay: "Hablur kalium manganat(VII) dipanaskan di hujung tabung didih sebelum serbuk logam dipanaskan. Apakah fungsi hablur itu?",
    question_english: "Potassium manganate(VII) crystals are heated at one end of a boiling tube before a metal powder is heated. What is the function of the crystals?",
  },
  C4AQ14: {
    question_malay: "Karbon boleh menurunkan zink oksida kepada zink tetapi tidak boleh menurunkan aluminium oksida kepada aluminium. Di manakah kedudukan karbon dalam siri kereaktifan?",
    question_english: "Carbon can reduce zinc oxide to zinc but cannot reduce aluminium oxide to aluminium. Where is carbon placed in the reactivity series?",
  },
  C4AQ17: {
    question_malay: "Gas hidrogen yang terhasil daripada tindak balas zink dengan asid sulfurik cair dialirkan melalui kalsium klorida kontang. Apakah fungsi kalsium klorida kontang?",
    question_english: "Hydrogen gas produced by reacting zinc with dilute sulfuric acid is passed through anhydrous calcium chloride. What is the function of the anhydrous calcium chloride?",
  },
  C4AQ25: {
    explanation: "Perlombongan yang tidak dirancang boleh menyebabkan hakisan tanah, pencemaran air dan udara, serta kemusnahan habitat.",
  },
  C4BQ4: {
    question_malay: "Kalsium karbonat bertindak balas dengan asid hidroklorik cair. Apakah pemerhatian apabila gas yang terhasil dialirkan ke dalam air kapur?",
    question_english: "Calcium carbonate reacts with dilute hydrochloric acid. What is observed when the gas produced is bubbled through limewater?",
  },
  C4BQ8: {
    question_malay: "Semasa serbuk logam dipanaskan untuk mengkaji kereaktifannya, bahan kimia manakah digunakan untuk membekalkan oksigen?",
    question_english: "When metal powders are heated to study their reactivity, which chemical is used to supply oxygen?",
  },
  C4BQ10: {
    question_malay: "Apakah pemerhatian apabila plumbum dipanaskan dalam oksigen?",
    question_english: "What is observed when lead is heated in oxygen?",
  },
  C4BQ12: {
    question_malay: "Campuran serbuk karbon dan zink oksida dipanaskan dengan kuat. Apakah pemerhatian dan kesimpulan yang betul?",
    question_english: "A mixture of carbon powder and zinc oxide is heated strongly. Which observation and conclusion are correct?",
  },
  C4BQ14: {
    question_malay: "Karbon boleh menurunkan oksida zink, ferum dan plumbum, tetapi tidak boleh menurunkan aluminium oksida. Di manakah kedudukan karbon dalam siri kereaktifan?",
    question_english: "Carbon can reduce the oxides of zinc, iron and lead, but cannot reduce aluminium oxide. Where is carbon placed in the reactivity series?",
  },
  C4BQ15: {
    question_malay: "Gas hidrogen kering dialirkan ke atas ferum(III) oksida yang dipanaskan dengan kuat. Apakah pemerhatian yang berlaku?",
    question_english: "Dry hydrogen gas is passed over strongly heated iron(III) oxide. What is observed?",
  },
  C4BQ17: {
    question_malay: "Hidrogen boleh menurunkan ferum oksida tetapi tidak boleh menurunkan zink oksida. Di manakah kedudukan hidrogen dalam siri kereaktifan?",
    question_english: "Hydrogen can reduce iron oxide but cannot reduce zinc oxide. Where is hydrogen placed in the reactivity series?",
  },
  C5AQ6: {
    question_malay: "Dalam suatu tindak balas, haba diserap daripada persekitaran untuk menukarkan bahan tindak balas kepada hasil tindak balas. Apakah jenis tindak balas itu dan apakah yang berlaku kepada suhu persekitaran?",
    question_english: "In a reaction, heat is absorbed from the surroundings to convert reactants into products. What type of reaction is this, and what happens to the temperature of the surroundings?",
  },
  C5AQ12: {
    question_malay: "Bagaimanakah pek sejuk segera membantu mengurangkan bengkak pada bahagian badan yang cedera?",
  },
  C5AQ24: {
    question_malay: "Kalsium karbonat menghasilkan kalsium oksida dan karbon dioksida apabila dipanaskan dengan kuat. Bagaimanakah tindak balas ini dikelaskan?",
    question_english: "Calcium carbonate produces calcium oxide and carbon dioxide when heated strongly. How is this reaction classified?",
  },
  C5BQ2: {
    question_malay: "Tenaga hasil tindak balas lebih rendah daripada tenaga bahan tindak balas. Apakah jenis tindak balas tersebut?",
    question_english: "The products have less energy than the reactants. What type of reaction is this?",
  },
  C5BQ9: {
    question_malay: "Mengapakah kalsium karbonat perlu dipanaskan secara berterusan supaya terurai?",
    question_english: "Why must calcium carbonate be heated continuously for it to decompose?",
  },
  C5BQ10: {
    question_malay: "Apakah gas yang dibebaskan apabila natrium hidrogen karbonat bertindak balas dengan asid hidroklorik cair?",
    question_english: "Which gas is released when sodium hydrogen carbonate reacts with dilute hydrochloric acid?",
  },
  C5BQ11: {
    question_malay: "Proses dalam organisma hidup yang manakah merupakan tindak balas eksotermik?",
  },
  C7AQ4: {
    question_malay: "Seorang murid berjisim 45 kg menaiki tangga setinggi 4 m dalam masa 12 saat. Jika pecutan graviti ialah 10 m s⁻², berapakah kuasa yang dijana?",
    question_english: "A student of mass 45 kg climbs a 4 m staircase in 12 seconds. If gravitational acceleration is 10 m s⁻², what power is generated?",
    correct_answer: "A",
    explanation: "Kuasa = mgh ÷ t = (45 × 10 × 4) ÷ 12 = 150 W. Power = mgh ÷ t = (45 × 10 × 4) ÷ 12 = 150 W.",
  },
  C7AQ7: {
    question_malay: "Seorang murid menarik bongkah kayu secara mendatar di atas meja dan mengangkat pemberat secara menegak. Pernyataan manakah menerangkan daya yang dilawan dalam kedua-dua keadaan?",
    question_english: "A student pulls a wooden block horizontally across a table and lifts a weight vertically. Which statement explains the force opposed in each situation?",
    option_a_english: "Pulling the block opposes gravity, while lifting the weight opposes friction.",
    option_b_english: "Pulling the block opposes friction, while lifting the weight opposes gravity.",
    option_c_english: "No work is done in either situation because the force is perpendicular to the displacement.",
    option_d_english: "Lifting the weight stores elastic potential energy, while pulling the block stores gravitational potential energy.",
  },
  C7AQ10: {
    question_malay: "Satu spring dipendekkan daripada 15 cm kepada 11 cm oleh daya maksimum 40 N. Berapakah tenaga keupayaan kenyal yang disimpan?",
    question_english: "A spring is shortened from 15 cm to 11 cm by a maximum force of 40 N. How much elastic potential energy is stored?",
    option_a_english: "0.8 J", option_b_english: "1.6 J", option_c_english: "80 J", option_d_english: "160 J",
    explanation: "Pemampatan = 4 cm = 0.04 m. Tenaga keupayaan kenyal = ½Fx = ½ × 40 × 0.04 = 0.8 J. Compression = 4 cm = 0.04 m. Elastic potential energy = ½Fx = ½ × 40 × 0.04 = 0.8 J.",
  },
  C7AQ11: {
    question_malay: "Tenaga keupayaan kenyal spring boleh ditentukan daripada luas di bawah graf. Kuantiti manakah perlu ditunjukkan pada kedua-dua paksi graf itu?",
    question_english: "The elastic potential energy of a spring can be determined from the area under a graph. Which quantities should be shown on the two axes?",
    option_a_english: "Vertical axis: potential energy; horizontal axis: time",
    option_b_english: "Vertical axis: force; horizontal axis: extension or compression",
    option_c_english: "Vertical axis: acceleration; horizontal axis: spring mass",
    option_d_english: "Vertical axis: velocity; horizontal axis: displacement",
    correct_answer: "B",
    explanation: "Luas di bawah graf daya melawan pemanjangan atau pemampatan memberikan tenaga keupayaan kenyal. The area under a force against extension or compression graph gives the elastic potential energy.",
  },
  C7AQ12: {
    question_malay: "Sebuah kereta api berjisim 400 000 kg bergerak pada halaju 100 m s⁻¹. Berapakah tenaga kinetiknya?",
  },
  C7AQ14: {
    question_malay: "Sebuah elektron berjisim 9 × 10⁻³¹ kg bergerak pada halaju 2 × 10⁶ m s⁻¹. Berapakah tenaga kinetiknya?",
  },
  C7AQ16: {
    question_malay: "Sebuah bandul berayun tanpa kehilangan tenaga. Apakah keadaan tenaga bandul ketika melalui kedudukan paling rendah?",
    question_english: "A pendulum swings without losing energy. What is the energy state of the pendulum as it passes through its lowest position?",
    option_a_english: "Gravitational potential energy is maximum and kinetic energy is zero.",
    option_b_english: "Gravitational potential energy is minimum and kinetic energy is maximum.",
    option_c_english: "Elastic potential energy is maximum and kinetic energy is minimum.",
    option_d_english: "Both gravitational potential energy and kinetic energy are zero.",
    correct_answer: "B",
    explanation: "Pada kedudukan paling rendah, tenaga keupayaan graviti adalah minimum dan tenaga kinetik adalah maksimum. At the lowest position, gravitational potential energy is minimum and kinetic energy is maximum.",
  },
  C7AQ17: {
    question_malay: "Satu beban berayun pada spring menegak tanpa kehilangan tenaga. Apakah keadaan tenaga apabila spring berada pada mampatan maksimum?",
    question_english: "A load oscillates on a vertical spring without losing energy. What is the energy state when the spring is at maximum compression?",
    option_a_english: "Elastic potential energy is minimum and kinetic energy is maximum.",
    option_b_english: "Elastic potential energy is maximum and kinetic energy is zero.",
    option_c_english: "Kinetic energy and gravitational potential energy are both maximum.",
    option_d_english: "All the energy is stored as chemical energy.",
  },
  C7AQ18: {
    question_malay: "Sebuah bandul berayun tanpa kehilangan tenaga. Apakah yang berlaku kepada tenaga kinetik, tenaga keupayaan graviti dan jumlah tenaga bandul semasa ayunan?",
    question_english: "A pendulum swings without losing energy. What happens to its kinetic energy, gravitational potential energy and total energy during the swing?",
    option_a_malay: "Tenaga kinetik dan tenaga keupayaan graviti kedua-duanya sentiasa bertambah.",
    option_a_english: "Kinetic energy and gravitational potential energy both increase continuously.",
    option_b_malay: "Tenaga kinetik sentiasa sifar, tetapi tenaga keupayaan graviti berubah.",
    option_b_english: "Kinetic energy is always zero, while gravitational potential energy changes.",
    option_c_malay: "Tenaga kinetik dan tenaga keupayaan graviti saling berubah, tetapi jumlah tenaga kekal malar.",
    option_c_english: "Kinetic energy and gravitational potential energy change from one to the other, but the total energy remains constant.",
    option_d_malay: "Jumlah tenaga bertambah setiap kali bandul melalui kedudukan paling rendah.",
    option_d_english: "The total energy increases whenever the pendulum passes through its lowest position.",
    explanation: "Tenaga kinetik dan tenaga keupayaan graviti saling berubah, tetapi jumlah tenaga kekal malar. Kinetic and gravitational potential energy change from one to the other, but total energy remains constant.",
  },
  C7AQ20: {
    question_malay: "Spring sebuah pistol mainan dipendekkan daripada 300 mm kepada 50 mm oleh daya maksimum 5 N. Bebola plastik berjisim 0.05 kg diletakkan di hadapan spring. Jika semua tenaga keupayaan kenyal bertukar kepada tenaga kinetik, berapakah kelajuan bebola itu?",
    question_english: "A toy gun spring is shortened from 300 mm to 50 mm by a maximum force of 5 N. A 0.05 kg plastic ball is placed in front of the spring. If all elastic potential energy changes to kinetic energy, what is the ball's speed?",
    correct_answer: "C",
    explanation: "Pemampatan spring ialah 0.25 m. Tenaga keupayaan kenyal = ½ × 5 × 0.25 = 0.625 J. Oleh sebab ½mv² = 0.625 J, v = 5 m s⁻¹. The spring compression is 0.25 m, so ½Fx = 0.625 J. From ½mv² = 0.625 J, v = 5 m s⁻¹.",
  },
  C7AQ22: {
    question_malay: "Antara berikut, yang manakah merupakan manfaat menaiki tangga secara berkala?",
    question_english: "Which of the following is a benefit of climbing stairs regularly?",
  },
  C7BQ1: {
    question_malay: "Antara berikut, yang manakah BUKAN manfaat kesihatan menaiki tangga secara berkala?",
    question_english: "Which of the following is NOT a health benefit of climbing stairs regularly?",
    option_b_malay: "Meningkatkan kecergasan peparu dan peredaran darah.",
    option_b_english: "Improving lung fitness and blood circulation.",
    option_d_english: "Producing new red blood cells directly in the spleen to prevent anaemia.",
    explanation: "Menaiki tangga tidak menghasilkan sel darah merah baharu secara langsung di dalam limpa. Climbing stairs does not directly produce new red blood cells in the spleen.",
  },
  C7BQ7: {
    question_malay: "Dalam satu penyiasatan, bongkah kayu ditarik secara mendatar pada kelajuan tetap menggunakan neraca spring. Mengapakah kelajuan tetap digunakan?",
    question_english: "In an investigation, a wooden block is pulled horizontally at constant speed using a spring balance. Why is a constant speed used?",
    option_b_english: "To obtain a stable force reading while overcoming friction consistently.",
  },
  C7BQ11: {
    question_malay: "Spring di dalam alat pengokot dipendekkan daripada 15 cm kepada 9 cm oleh daya maksimum 30 N. Berapakah tenaga keupayaan kenyal yang disimpan?",
    question_english: "A spring in a stapler is shortened from 15 cm to 9 cm by a maximum force of 30 N. How much elastic potential energy is stored?",
    correct_answer: "A",
    explanation: "Pemampatan = 6 cm = 0.06 m. Tenaga keupayaan kenyal = ½Fx = ½ × 30 × 0.06 = 0.9 J. Compression = 6 cm = 0.06 m. Elastic potential energy = ½Fx = ½ × 30 × 0.06 = 0.9 J.",
  },
  C7BQ13: {
    question_malay: "Bagaimanakah tenaga keupayaan kenyal spring ditentukan daripada graf daya melawan pemanjangan?",
    question_english: "How is the elastic potential energy of a spring determined from a force against extension graph?",
    option_d_malay: "Kuasa dua nilai pintasan pada paksi pemanjangan.",
  },
  C7BQ16: {
    question_malay: "Di dalam tiub vakum, sebuah elektron berjisim 9 × 10⁻³¹ kg bergerak pada halaju 2 × 10⁶ m s⁻¹. Hitungkan tenaga kinetik elektron itu.",
    question_english: "In a vacuum tube, an electron of mass 9 × 10⁻³¹ kg moves at 2 × 10⁶ m s⁻¹. Calculate its kinetic energy.",
  },
  C7BQ18: {
    question_malay: "Sebuah bandul berada seketika di kedudukan tertinggi sebelum berayun semula. Apakah keadaan tenaganya pada ketika itu?",
    question_english: "A pendulum is momentarily at its highest position before swinging back. What is its energy state at that instant?",
  },
  C7BQ19: {
    question_malay: "Satu beban pada spring bergerak dari keadaan mampatan maksimum ke kedudukan keseimbangan. Bagaimanakah tenaga keupayaan kenyal dan tenaga kinetiknya berubah?",
    question_english: "A load on a spring moves from maximum compression to its equilibrium position. How do its elastic potential energy and kinetic energy change?",
    option_a_english: "Elastic potential energy increases; kinetic energy increases.",
    option_b_english: "Elastic potential energy decreases; kinetic energy decreases.",
    option_c_english: "Elastic potential energy increases; kinetic energy decreases.",
    option_d_english: "Elastic potential energy decreases; kinetic energy increases.",
    correct_answer: "D",
    explanation: "Dari mampatan maksimum ke kedudukan keseimbangan, tenaga keupayaan kenyal berkurang dan tenaga kinetik bertambah. From maximum compression to equilibrium, elastic potential energy decreases and kinetic energy increases.",
  },
  C7BQ21: {
    question_malay: "Semasa bandul bergerak dari kedudukan tertinggi ke kedudukan paling rendah tanpa kehilangan tenaga, apakah perubahan tenaga yang berlaku?",
    question_english: "As a pendulum moves from its highest position to its lowest position without losing energy, what energy change occurs?",
    option_a_malay: "Tenaga kinetik berkurang dan tenaga keupayaan graviti bertambah.",
    option_a_english: "Kinetic energy decreases and gravitational potential energy increases.",
    option_b_malay: "Tenaga kinetik bertambah dan tenaga keupayaan graviti berkurang, tetapi jumlah tenaga kekal malar.",
    option_b_english: "Kinetic energy increases and gravitational potential energy decreases, while total energy remains constant.",
    option_c_malay: "Kedua-dua bentuk tenaga berkurang sehingga jumlah tenaga menjadi sifar.",
    option_c_english: "Both forms of energy decrease until the total energy becomes zero.",
    option_d_malay: "Tenaga keupayaan graviti bertukar kepada tenaga kimia.",
    option_d_english: "Gravitational potential energy changes into chemical energy.",
    explanation: "Tenaga keupayaan graviti berkurang dan bertukar kepada tenaga kinetik, manakala jumlah tenaga kekal malar. Gravitational potential energy decreases and changes into kinetic energy, while total energy remains constant.",
  },
  C7BQ22: {
    question_malay: "Sebuah gerabak roller-coaster bergerak tanpa geseran dari puncak landasan ke titik paling rendah. Pernyataan manakah yang betul?",
    question_english: "A roller-coaster car moves without friction from the top of a track to its lowest point. Which statement is correct?",
    option_a_malay: "Tenaga kinetik paling tinggi di puncak dan paling rendah di titik terendah.",
    option_a_english: "Kinetic energy is highest at the top and lowest at the lowest point.",
    option_b_malay: "Tenaga keupayaan graviti dan tenaga kinetik kedua-duanya menjadi sifar di titik terendah.",
    option_b_english: "Gravitational potential energy and kinetic energy both become zero at the lowest point.",
    option_c_malay: "Jumlah tenaga mekanikal berkurang apabila gerabak bergerak menuruni landasan.",
    option_c_english: "Total mechanical energy decreases as the car moves down the track.",
    option_d_malay: "Tenaga keupayaan graviti berkurang, tenaga kinetik bertambah dan jumlah tenaga mekanikal kekal malar.",
    option_d_english: "Gravitational potential energy decreases, kinetic energy increases and total mechanical energy remains constant.",
    correct_answer: "D",
    explanation: "Tanpa geseran, tenaga keupayaan graviti bertukar kepada tenaga kinetik dan jumlah tenaga mekanikal kekal malar. Without friction, gravitational potential energy changes into kinetic energy and total mechanical energy remains constant.",
  },
  C7BQ23: {
    question_malay: "Spring pistol mainan dimampatkan sejauh 20 cm oleh daya maksimum 8 N. Sebutir bebola plastik berjisim 0.025 kg diletakkan di hadapannya. Jika semua tenaga keupayaan kenyal bertukar kepada tenaga kinetik, berapakah kelajuan bebola itu?",
    question_english: "A toy gun spring is compressed by 20 cm with a maximum force of 8 N. A 0.025 kg plastic ball is placed in front of it. If all elastic potential energy changes to kinetic energy, what is the ball's speed?",
    correct_answer: "A",
    explanation: "Tenaga keupayaan kenyal = ½ × 8 × 0.20 = 0.8 J. Oleh sebab ½mv² = 0.8 J, v = 8 m s⁻¹. Elastic potential energy = ½ × 8 × 0.20 = 0.8 J. From ½mv² = 0.8 J, v = 8 m s⁻¹.",
  },
  C8AQ6: {
    question_malay: "Uranium-238 mereput kepada torium-234 sambil membebaskan zarah alfa. Pernyataan manakah menerangkan zarah alfa dengan betul?",
    question_english: "Uranium-238 decays into thorium-234 and releases an alpha particle. Which statement correctly describes the alpha particle?",
    option_a_english: "It is a high-speed electron from an outer electron shell.",
    option_b_english: "It is a very high-frequency electromagnetic wave with no electric charge.",
    option_c_english: "It is a helium nucleus made of two protons and two neutrons, with a charge of +2.",
    option_d_english: "It is a neutral particle with the same mass as a hydrogen atom.",
  },
  C8AQ7: {
    option_a_english: "An alpha particle with a positive charge.",
    option_b_english: "A beta particle, which is a high-speed electron produced when a neutron changes into a proton.",
    option_c_english: "Gamma radiation, which causes no change in the number of protons or neutrons.",
    option_d_english: "An X-ray produced by the excitation of electrons in an atomic shell.",
  },
  C8AQ8: {
    option_a_english: "It has a positive charge and bends towards the negative plate in an electric field.",
    option_b_english: "It is gamma radiation, a high-frequency electromagnetic wave with no charge that does not change the number of protons or neutrons.",
    option_c_english: "It has very high ionising power and is completely stopped by paper.",
    option_d_english: "It is a stream of electrons that bends strongly towards the positive plate in an electric field.",
  },
  C8AQ9: {
    option_a_english: "2.0 Bq",
    option_b_english: "7.4 × 10¹⁰ Bq",
    option_c_english: "3.7 × 10¹⁰ Bq",
    option_d_english: "1.85 × 10¹⁰ Bq",
  },
  C8AQ10: {
    option_a_english: "Half of the time required for a radioactive substance to decay completely.",
    option_b_english: "The time taken for the number of undecayed nuclei to fall to half its original value.",
    option_c_english: "The time taken by an alpha particle to penetrate half the thickness of a lead barrier.",
    option_d_english: "The average number of atoms that decay in one hour at room temperature.",
  },
  C8AQ11: {
    option_a_english: "40 g",
    option_b_english: "10 g",
    option_c_english: "5 g",
    option_d_english: "2.5 g",
    correct_answer: "C",
    explanation: "20.8 jam bersamaan empat separuh hayat. Jisim yang tinggal ialah 80 ÷ 2⁴ = 5 g. 20.8 hours is four half-lives, so the remaining mass is 80 ÷ 2⁴ = 5 g.",
  },
  C8AQ12: {
    question_malay: "Keaktifan awal suatu bahan radioaktif ialah 800 Bq dan berkurang mengikut masa. Bagaimanakah separuh hayat ditentukan daripada graf keaktifan melawan masa?",
    question_english: "The initial activity of a radioactive substance is 800 Bq and decreases over time. How is its half-life determined from an activity-against-time graph?",
    option_a_english: "Find the time at which the activity reaches zero.",
    option_b_english: "Locate 400 Bq on the activity axis, move across to the curve, then read the corresponding time.",
    option_c_english: "Read the activity after one minute and divide it by two.",
    option_d_english: "Take half of the maximum time shown on the time axis.",
  },
  C8AQ15: {
    question_malay: "Atom klorin mempunyai 17 proton dan 17 elektron. Ion klorida mempunyai 17 proton dan 18 elektron. Bagaimanakah ion bercas -1 itu terbentuk?",
    question_english: "A chlorine atom has 17 protons and 17 electrons. A chloride ion has 17 protons and 18 electrons. How is the ion with a -1 charge formed?",
  },
  C8AQ18: {
    question_malay: "Tiga pengadang yang diuji ialah kertas nipis, aluminium setebal 3 mm dan plumbum setebal 10 cm. Padanan manakah menunjukkan pengadang yang sesuai bagi sinar alfa, beta dan gama?",
    question_english: "Three barriers are tested: thin paper, 3 mm aluminium and 10 cm lead. Which option correctly matches a suitable barrier to alpha, beta and gamma radiation?",
    option_a_english: "Alpha: thick lead; beta: paper; gamma: aluminium",
    option_b_english: "Alpha: aluminium; beta: lead; gamma: paper",
    option_c_english: "Alpha: paper; beta: 3 mm aluminium; gamma: 10 cm lead or thick concrete",
    option_d_english: "All three types are completely stopped by paper.",
  },
  C8AQ19: {
    question_malay: "Sinar alfa, beta dan gama melalui medan elektrik antara plat positif di bawah dan plat negatif di atas. Pernyataan manakah tentang pesongan sinaran itu yang betul?",
    question_english: "Alpha, beta and gamma radiation pass through an electric field between a positive plate below and a negative plate above. Which statement about their deflection is correct?",
    option_a_english: "Alpha radiation bends towards the positive plate because it is negatively charged.",
    option_b_english: "Beta radiation bends strongly towards the positive plate because it is negatively charged and has a very small mass.",
    option_c_english: "Gamma radiation bends towards the negative plate because of Earth's gravity.",
    option_d_english: "Alpha and beta radiation travel straight because both are neutral.",
  },
  C8AQ22: {
    question_malay: "Mengapakah tempoh kerja tahunan krew penerbangan di udara perlu dihadkan?",
    question_english: "Why must the annual flying hours of flight crews be limited?",
    option_b_malay: "Pada altitud tinggi, pendedahan kepada sinaran kosmik meningkat dan dos terkumpul boleh melebihi had selamat.",
    option_b_english: "At high altitude, exposure to cosmic radiation increases and the accumulated dose may exceed safe limits.",
  },
  C8BQ9: {
    question_malay: "Keaktifan suatu bahan radioaktif ialah 640 Bq pada jam ke-0, 450 Bq pada jam ke-5, 320 Bq pada jam ke-10, 225 Bq pada jam ke-15 dan 160 Bq pada jam ke-20. Berapakah separuh hayat bahan itu?",
    question_english: "A radioactive substance has activities of 640 Bq at 0 hours, 450 Bq at 5 hours, 320 Bq at 10 hours, 225 Bq at 15 hours and 160 Bq at 20 hours. What is its half-life?",
  },
  C8BQ1: {
    question_malay: "Seorang juruterbang berada di udara selama 600 jam setahun. Jika kadar dos sinaran kosmik pada altitud penerbangan ialah 0.003 mSv sejam, berapakah dos yang diterima semasa penerbangan dalam setahun?",
    question_english: "A pilot spends 600 hours in the air each year. If the cosmic-radiation dose rate at flight altitude is 0.003 mSv per hour, what dose is received during flights in one year?",
    option_a_english: "1.0 mSv per year",
    option_b_english: "1.8 mSv per year",
    option_c_english: "2.6 mSv per year",
    option_d_english: "3.8 mSv per year",
  },
  C8BQ2: {
    option_a_english: "A cathode-ray tube produced a green beam that penetrated black paper.",
    option_b_english: "A uranium compound emitted radiation that darkened a photographic plate kept in a dark drawer.",
    option_c_english: "A charged gold-leaf electroscope discharged rapidly when placed near a flame.",
    option_d_english: "Pitchblende produced positive particles that attracted electrons from neutral air.",
  },
  C8BQ11: {
    question_malay: "Atom klorin mempunyai 17 proton dan 17 elektron, manakala ion klorida mempunyai 17 proton dan 18 elektron. Mengapakah ion klorida bercas -1?",
    question_english: "A chlorine atom has 17 protons and 17 electrons, while a chloride ion has 17 protons and 18 electrons. Why does the chloride ion have a -1 charge?",
  },
  C8BQ16: {
    question_malay: "Dalam medan elektrik, sinar alfa terpesong sedikit ke arah plat negatif, sinar gama bergerak lurus dan sinar beta terpesong dengan lebih besar ke arah plat positif. Mengapakah pesongan sinar beta lebih besar daripada sinar alfa?",
    question_english: "In an electric field, alpha radiation bends slightly towards the negative plate, gamma travels straight and beta bends more towards the positive plate. Why does beta radiation bend more than alpha radiation?",
    option_a_malay: "Sinar beta ialah sinar gama yang tidak mempunyai jisim atau cas.",
    option_a_english: "Beta radiation is gamma radiation and has no mass or charge.",
    option_b_malay: "Zarah beta mempunyai jisim yang jauh lebih kecil daripada zarah alfa.",
    option_b_english: "Beta particles are much lighter than alpha particles.",
    option_c_malay: "Plat positif mempunyai tarikan elektrik yang lebih kuat daripada plat negatif.",
    option_c_english: "The positive plate has a stronger attraction than the negative plate.",
    option_d_malay: "Sinar beta mengalami rintangan udara yang lebih rendah dalam medan elektrik.",
    option_d_english: "Beta radiation experiences less air resistance in the electric field.",
    explanation: "Zarah beta jauh lebih ringan daripada zarah alfa, maka sinar beta dipesongkan dengan lebih besar. Beta particles are much lighter than alpha particles, so beta radiation is deflected more.",
  },
  C8BQ20: {
    question_malay: "Padanan dos sinaran dengan kesan kesihatan yang manakah salah?",
    question_english: "Which pairing of radiation dose and health effect is incorrect?",
    option_a_english: "Dose above 10 Sv: widespread cell death and death within weeks",
    option_b_english: "Dose from 1 Sv to 10 Sv: acute radiation sickness, vomiting, hair loss and leukaemia",
    option_c_english: "Dose from 0.1 Sv to 1 Sv: cancer risk increases over time",
    option_d_english: "Dose below 0.1 Sv: immediate death from heart failure",
  },
  C9AQ2: { question_malay: "Pada 6 September 2017, satu letusan kuat berlaku di permukaan Matahari pada jam 8.02 pagi. Apakah jenis dan kelas letusan itu?" },
  C9AQ6: { question_malay: "Pelakuran nuklear ialah sumber utama tenaga Matahari. Di bahagian manakah proses ini berlaku?" },
  C9AQ24: { question_malay: "Maklumat aktiviti suria digunakan untuk meramal cuaca angkasa. Hubungan manakah yang betul?" },
  C9BQ1: {
    question_malay: "Apakah tujuan utama satelit RazakSAT-2?",
    question_english: "What is the main purpose of the RazakSAT-2 satellite?",
  },
  C9BQ9: {
    question_malay: "Satu gelungan gas menyala yang sangat besar terbentuk di atas tompok Matahari dan boleh mencapai ketinggian beratus-ratus ribu kilometer. Apakah nama fenomena ini?",
    question_english: "A massive loop of glowing gas forms above a sunspot and can reach hundreds of thousands of kilometres in height. What is this phenomenon called?",
  },
  C9BQ17: {
    question_malay: "Angin suria menekan magnetosfera Bumi. Bagaimanakah bentuk magnetosfera berubah pada bahagian yang menghadap Matahari dan bahagian yang membelakangi Matahari?",
    question_english: "The solar wind presses against Earth's magnetosphere. How does its shape change on the side facing the Sun and the side facing away from the Sun?",
    option_a_malay: "Bahagian menghadap Matahari memanjang dan bahagian membelakangi Matahari termampat.",
    option_a_english: "The side facing the Sun stretches and the side facing away from the Sun is compressed.",
    option_b_malay: "Bahagian menghadap Matahari termampat dan bahagian membelakangi Matahari memanjang membentuk ekor magnet.",
    option_b_english: "The side facing the Sun is compressed and the side facing away from the Sun stretches to form a magnetotail.",
    option_c_malay: "Kedua-dua bahagian termampat secara sama rata menjadi sfera.",
    option_c_english: "Both sides are compressed equally into a sphere.",
    option_d_malay: "Kedua-dua bahagian memanjang menjadi elips.",
    option_d_english: "Both sides stretch into an ellipse.",
  },
  C9BQ24: {
    question_malay: "Apakah hubungan antara bilangan tompok Matahari dengan aktiviti suria?",
    option_b_malay: "Semakin banyak tompok Matahari, semakin kerap nyalaan suria dan lentingan jisim korona berlaku.",
  },
};

function rowId(row) {
  return `C${row.chapter_number}${row.set_letter}Q${row.question_number}`;
}

function cleanExplanation(value) {
  return String(value ?? "")
    .replace(/\s*\[(?:page\s*)?\d+(?:\s*,\s*\d+)*\]/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function parseCsvWithSpans(text) {
  const rows = [];
  let cells = [];
  let value = "";
  let quoted = false;
  let cellStart = 0;
  for (let index = 0; index <= text.length; index += 1) {
    const character = text[index] ?? "\n";
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"'; index += 1;
      } else if (character === '"') quoted = false;
      else value += character;
    } else if (character === '"' && value === "") quoted = true;
    else if (character === "," || character === "\n") {
      const end = character === "\n" && text[index - 1] === "\r" ? index - 1 : index;
      cells.push({ value: value.replace(/\r$/, ""), start: cellStart, end });
      value = "";
      cellStart = index + 1;
      if (character === "\n") { rows.push(cells); cells = []; }
    } else value += character;
  }
  return rows;
}

function encodeCsvCell(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function patchCsv() {
  let text = fs.readFileSync(csvPath, "utf8");
  const parsed = parseCsvWithSpans(text);
  const headers = parsed[0].map((cell) => cell.value.replace(/^\uFEFF/, ""));
  const edits = [];
  for (const cells of parsed.slice(1)) {
    if (cells.length !== headers.length) continue;
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index].value]));
    const patch = patches[rowId(row)] ?? {};
    const explanation = cleanExplanation(patch.explanation ?? row.explanation);
    const updates = { ...patch, explanation };
    for (const [field, newValue] of Object.entries(updates)) {
      const index = headers.indexOf(field);
      if (index < 0 || cells[index].value === String(newValue)) continue;
      edits.push({ start: cells[index].start, end: cells[index].end, value: encodeCsvCell(newValue) });
    }
  }
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    text = text.slice(0, edit.start) + edit.value + text.slice(edit.end);
  }
  fs.writeFileSync(csvPath, text);
  return edits.length;
}

function patchJson() {
  const rows = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  let edits = 0;
  for (const row of rows) {
    const patch = patches[rowId(row)] ?? {};
    const updates = { ...patch, explanation: cleanExplanation(patch.explanation ?? row.explanation) };
    for (const [field, value] of Object.entries(updates)) {
      if (row[field] !== value) { row[field] = value; edits += 1; }
    }
  }
  fs.writeFileSync(jsonPath, `${JSON.stringify(rows, null, 2)}\n`);
  return edits;
}

function patchSupplementalJsonArtifacts() {
  let edits = 0;
  const newRows = JSON.parse(fs.readFileSync(newRowsPath, "utf8"));
  for (const row of newRows) {
    const patch = patches[rowId(row)] ?? {};
    for (const [field, value] of Object.entries(patch)) {
      if (row[field] !== undefined && row[field] !== value) { row[field] = value; edits += 1; }
    }
    const explanation = cleanExplanation(row.explanation);
    if (row.explanation !== explanation) { row.explanation = explanation; edits += 1; }
  }
  fs.writeFileSync(newRowsPath, `${JSON.stringify(newRows, null, 2)}\n`);

  const cache = JSON.parse(fs.readFileSync(llmCachePath, "utf8"));
  for (const [groupKey, rows] of Object.entries(cache)) {
    const match = /^c(\d+)-([AB])-/i.exec(groupKey);
    if (!match || !Array.isArray(rows)) continue;
    for (const row of rows) {
      const patch = patches[`C${match[1]}${match[2].toUpperCase()}Q${row.question_number}`] ?? {};
      for (const language of ["malay", "english"]) {
        const questionField = `question_${language}`;
        if (patch[questionField] !== undefined && row[questionField] !== patch[questionField]) {
          row[questionField] = patch[questionField]; edits += 1;
        }
        const optionsField = `options_${language}`;
        if (Array.isArray(row[optionsField])) {
          for (const [index, letter] of ["a", "b", "c", "d"].entries()) {
            const field = `option_${letter}_${language}`;
            if (patch[field] !== undefined && row[optionsField][index] !== patch[field]) {
              row[optionsField][index] = patch[field]; edits += 1;
            }
          }
        }
      }
      if (patch.correct_answer && row.correct_answer !== patch.correct_answer) {
        row.correct_answer = patch.correct_answer; edits += 1;
      }
    }
  }
  fs.writeFileSync(llmCachePath, `${JSON.stringify(cache, null, 2)}\n`);
  return edits;
}

console.log(
  `Updated ${patchCsv()} CSV cells, ${patchJson()} normalized JSON fields, and ${patchSupplementalJsonArtifacts()} supplemental artifact fields.`,
);
