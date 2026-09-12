// Source: bab-3-sains-t3-notes (1).md. References are internal, never rendered.
// DLP is a faithful adaptation of the supplied BM source and its English terminology.
export type Chapter3Language = "bm" | "en";
export type Chapter3Lesson = { id: string; source: string; title: Record<Chapter3Language, string>; paragraphs: Record<Chapter3Language, string[]> };
const lesson = (id: string, source: string, bm: string, en: string, paragraphsBM: string[], paragraphsEN: string[]): Chapter3Lesson => ({ id, source, title: { bm, en }, paragraphs: { bm: paragraphsBM, en: paragraphsEN } });
export const chapter3Headings = {
  bm: ["Sistem Pengangkutan dalam Organisma", "Sistem Peredaran Darah", "Darah Manusia", "Pengangkutan dalam Tumbuhan", "Perbandingan Sistem Pengangkutan"],
  en: ["Transport System in Organisms", "Blood Circulatory System", "Human Blood", "Transport in Plants", "Comparison of Transport Systems"],
};
export const chapter3Lessons = [
  lesson("need", "3.1 [81–82]", "Keperluan Sistem Pengangkutan dalam Organisma", "Need for a Transport System in Organisms", [
    "Setiap sel memerlukan oksigen untuk respirasi sel dan nutrien untuk mendapatkan tenaga. Pada masa yang sama, bahan kumuh sel seperti karbon dioksida perlu disingkirkan ke persekitaran luar.",
    "Organisma ringkas (unisel): Amoeba sp., Euglena sp. dan Paramecium sp. Bahan keperluan sel seperti oksigen dan nutrien masuk terus ke dalam sel secara resapan ringkas melalui membran sel. Bahan kumuh juga disingkirkan ke luar melalui mekanisme yang sama.",
    "Organisma ringkas mempunyai Nisbah Jumlah Luas Permukaan kepada Isipadu (JSTI) yang besar. Ini membantu pertukaran bahan secara resapan berlaku dengan cekap.",
    "Organisma kompleks (multisel): manusia, haiwan vertebrata dan tumbuhan multisel. Isipadu badan yang besar menyebabkan luas permukaan luar tidak mencukupi untuk membekalkan bahan keperluan melalui resapan ringkas. Jarak dari persekitaran luar ke sel-sel di dalam badan terlalu jauh, maka sistem pengangkutan yang khusus diperlukan.",
  ], [
    "Every cell needs oxygen for cellular respiration and nutrients to obtain energy. At the same time, cellular waste such as carbon dioxide must be removed to the external environment.",
    "Simple organisms (unicellular): Amoeba sp., Euglena sp. and Paramecium sp. Oxygen and nutrients enter the cell directly by simple diffusion through the cell membrane. Waste leaves by the same mechanism.",
    "Simple organisms have a large total surface-area-to-volume ratio. This allows efficient exchange of substances by diffusion.",
    "Complex organisms (multicellular): humans, vertebrate animals and multicellular plants. Their large body volume means the external surface is insufficient to supply every cell by simple diffusion. Internal cells are too far from the external environment, so a specialised transport system is required.",
  ]),
  lesson("importance", "3.1 [82]", "Kepentingan Fungsi Sistem Pengangkutan dalam Organisma", "Importance of Transport Systems in Organisms", [
    "Membekalkan bahan keperluan sel: mengangkut oksigen dan nutrien yang digunakan untuk menghasilkan tenaga melalui respirasi sel.",
    "Menyingkirkan bahan kumuh toksik: membawa bahan kumuh dari sel-sel badan ke luar organisma untuk mengelakkan bahan tersebut meracuni badan dan membunuh organisma.",
    "Mengangkut bahan keperluan tumbuhan: garam mineral, air daripada tanah dan hasil fotosintesis (sukrosa) untuk menjalankan proses hidup tumbuhan.",
  ], [
    "Supplying cell requirements: transport oxygen and nutrients used to release energy through cellular respiration.",
    "Removing toxic waste: carry waste from body cells out of the organism so that it does not poison and kill the organism.",
    "Transporting plant requirements: mineral salts, water from the soil and products of photosynthesis (sucrose) needed for plant life processes.",
  ]),
  lesson("vertebrates", "3.2 [83–84]", "Sistem Peredaran Darah Haiwan Vertebrata", "Blood Circulatory System of Vertebrates", [
    "Ikan: dua ruang, satu atrium dan satu ventrikel. Darah melalui jantung sekali dalam satu kitaran lengkap. Darah terdeoksigen dipam dari ventrikel ke kapilari insang untuk menerima oksigen. Darah beroksigen mengalir terus ke kapilari badan sebelum kembali ke atrium sebagai darah terdeoksigen.",
    "Amfibia: tiga ruang, dua atrium dan satu ventrikel. Darah dari badan masuk ke atrium kanan; darah beroksigen dari peparu dan kulit masuk ke atrium kiri. Kedua-duanya masuk ke ventrikel yang sama dan sedikit percampuran berlaku sebelum darah dipam ke peparu/kulit dan badan. Darah melalui jantung dua kali: peredaran ganda dua tidak lengkap.",
    "Reptilia: dua atrium dan satu ventrikel dengan sekat separa. Darah terdeoksigen dari badan masuk ke atrium kanan, manakala darah beroksigen dari peparu masuk ke atrium kiri. Sekat separa mengurangkan percampuran darah dalam ventrikel berbanding amfibia. Peredaran ganda dua tidak lengkap. Buaya mempunyai jantung empat ruang yang lengkap.",
    "Burung dan mamalia: empat ruang, dua atrium dan dua ventrikel. Darah terdeoksigen mengalir dari badan ke atrium kanan, ventrikel kanan dan peparu. Darah beroksigen kembali ke atrium kiri, ventrikel kiri dan badan. Septum lengkap memisahkan bahagian kanan dan kiri, maka tiada percampuran darah. Darah melalui jantung dua kali: peredaran ganda dua lengkap.",
  ], [
    "Fish: two chambers, one atrium and one ventricle. Blood passes through the heart once in a complete circuit. The ventricle pumps deoxygenated blood to the gill capillaries to receive oxygen. Oxygenated blood flows directly to body capillaries before returning to the atrium as deoxygenated blood.",
    "Amphibians: three chambers, two atria and one ventricle. Blood from the body enters the right atrium; oxygenated blood from the lungs and skin enters the left atrium. Both enter the same ventricle, where some mixing occurs before blood is pumped to the lungs/skin and body. Blood passes through the heart twice: incomplete double circulation.",
    "Reptiles: two atria and a ventricle with a partial septum. Deoxygenated blood from the body enters the right atrium; oxygenated blood from the lungs enters the left atrium. The partial septum reduces mixing in the ventricle compared with amphibians. Circulation is incomplete and double. Crocodiles have a complete four-chambered heart.",
    "Birds and mammals: four chambers, two atria and two ventricles. Deoxygenated blood flows from the body to the right atrium, right ventricle and lungs. Oxygenated blood returns to the left atrium, left ventricle and body. A complete septum separates the right and left sides, preventing mixing. Blood passes through the heart twice: complete double circulation.",
  ]),
  lesson("heart", "3.2 [85–87]", "Struktur dan Fungsi Jantung Manusia", "Structure and Function of the Human Heart", [
    "Sistem peredaran darah manusia melibatkan darah yang dipam oleh jantung melalui arteri, kapilari dan vena. Jantung mempunyai dua atrium berdinding nipis di bahagian atas dan dua ventrikel berdinding berotot tebal di bahagian bawah.",
    "Atrium kanan: menerima darah terdeoksigen dari seluruh badan kecuali peparu. Vena kava superior membawa darah dari bahagian atas badan; vena kava inferior membawa darah dari bahagian bawah badan. Pengecutan atrium kanan menolak darah ke ventrikel kanan.",
    "Injap trikuspid: membenarkan darah mengalir satu hala dari atrium kanan ke ventrikel kanan dan menghalang aliran balik.",
    "Ventrikel kanan: berdinding berotot tebal; mengecut untuk mengepam darah terdeoksigen melalui arteri pulmonari ke peparu bagi pertukaran gas.",
    "Atrium kiri: berdinding nipis; menerima darah beroksigen dari peparu melalui vena pulmonari. Apabila mengecut, darah ditolak ke ventrikel kiri melalui injap bikuspid.",
    "Injap bikuspid: membenarkan pengaliran darah satu hala sahaja dari atrium kiri ke ventrikel kiri.",
    "Ventrikel kiri: mempunyai dinding berotot yang paling tebal. Mengepam darah beroksigen melalui aorta ke seluruh badan kecuali peparu. Dinding tebal menjana tekanan tinggi untuk menolak darah ke organ badan yang jauh.",
    "Injap sabit: terletak pada pangkal arteri pulmonari dan aorta. Memastikan darah mengalir keluar dari jantung dan tidak berpatah balik ke ventrikel semasa ventrikel mengendur.",
    "Septum: dinding otot tebal yang memisahkan bahagian kiri dan kanan jantung. Menghalang percampuran darah beroksigen dengan darah terdeoksigen.",
    "Tempoh darah membuat satu peredaran lengkap dari jantung ke badan, termasuk peparu, dan kembali ke jantung adalah kurang daripada 1 minit.",
  ], [
    "The human circulatory system involves blood pumped by the heart through arteries, capillaries and veins. The heart has two thin-walled atria above and two thick, muscular ventricles below.",
    "Right atrium: receives deoxygenated blood from the body except the lungs. The superior vena cava brings blood from the upper body; the inferior vena cava brings blood from the lower body. Contraction of the right atrium pushes blood into the right ventricle.",
    "Tricuspid valve: allows one-way blood flow from the right atrium to the right ventricle and prevents backflow.",
    "Right ventricle: has a thick muscular wall and contracts to pump deoxygenated blood through the pulmonary artery to the lungs for gas exchange.",
    "Left atrium: thin-walled; receives oxygenated blood from the lungs through the pulmonary vein. When it contracts, blood is pushed through the bicuspid valve into the left ventricle.",
    "Bicuspid valve: allows one-way blood flow from the left atrium to the left ventricle.",
    "Left ventricle: has the thickest muscular wall. It pumps oxygenated blood through the aorta to the whole body except the lungs. The thick wall generates high pressure to push blood to distant organs.",
    "Semilunar valves: located at the bases of the pulmonary artery and aorta. They allow blood to leave the heart and prevent backflow into the ventricles when the ventricles relax.",
    "Septum: a thick muscular wall separating the left and right sides of the heart. It prevents oxygenated and deoxygenated blood from mixing.",
    "Blood takes less than 1 minute to complete a circuit from the heart through the body, including the lungs, and back to the heart.",
  ]),
  lesson("vessels", "3.2 [88]", "Perbandingan Struktur dan Fungsi Salur Darah Utama", "Comparison of the Structure and Function of Blood Vessels", [
    "Arteri membawa darah keluar dari jantung. Dinding tebal, berotot dan banyak tisu elastik menahan tekanan tinggi. Lumen kecil; tiada injap sepanjang salur. Darah mengalir sangat cepat dan denyutan nadi dikesan. Arteri pulmonari membawa darah terdeoksigen ke peparu; arteri lain dalam peredaran sistemik membawa darah beroksigen.",
    "Vena membawa darah kembali ke jantung. Dinding nipis dengan sedikit otot dan tisu elastik; lumen besar. Injap sepanjang salur menghalang aliran balik. Aliran perlahan pada tekanan rendah dan tiada denyutan nadi. Vena pulmonari membawa darah beroksigen dari peparu; vena sistemik membawa darah terdeoksigen.",
    "Kapilari mempunyai dinding paling nipis, setebal satu sel, tanpa otot atau tisu elastik. Lumen paling kecil membolehkan sel darah merah mengalir sebaris. Tiada injap atau denyutan nadi. Aliran sangat perlahan pada tekanan yang menurun membolehkan pertukaran gas, makanan dan bahan kumuh antara darah dengan sel badan secara resapan ringkas.",
  ], [
    "Arteries carry blood away from the heart. Thick muscular walls with abundant elastic tissue withstand high pressure. The lumen is small and there are no valves along the vessel. Blood flows rapidly and a pulse is detected. The pulmonary artery carries deoxygenated blood to the lungs; systemic arteries carry oxygenated blood.",
    "Veins carry blood back to the heart. Their walls are thin with little muscle and elastic tissue; the lumen is large. Valves along the vessel prevent backflow. Flow is slow at low pressure, with no pulse. The pulmonary vein carries oxygenated blood from the lungs; systemic veins carry deoxygenated blood.",
    "Capillaries have the thinnest walls, one cell thick, without muscle or elastic tissue. Their very small lumen allows red blood cells to pass in single file. There are no valves or pulses. Very slow flow at decreasing pressure allows gases, food and waste to be exchanged between blood and body cells by simple diffusion.",
  ]),
  lesson("pressure", "3.2 [89,91]", "Pengukuran Tekanan Darah", "Measurement of Blood Pressure", [
    "Peredaran pulmonari membawa darah terdeoksigen ke peparu untuk membebaskan karbon dioksida dan menyerap oksigen. Peredaran sistemik membawa darah beroksigen ke tisu badan untuk respirasi sel dan mengembalikan darah terdeoksigen ke jantung.",
    "Tekanan darah diukur menggunakan sfigmomanometer dalam unit mm Hg (milimeter merkuri). Contoh bacaan: 120/75 mm Hg.",
    "Tekanan sistolik ialah bacaan semasa otot ventrikel mengecut untuk mengepam darah keluar. Nilai atas dalam contoh ialah 120 mm Hg.",
    "Tekanan diastolik ialah bacaan semasa otot ventrikel mengendur. Nilai bawah dalam contoh ialah 75 mm Hg.",
  ], [
    "Pulmonary circulation carries deoxygenated blood to the lungs to release carbon dioxide and absorb oxygen. Systemic circulation supplies oxygenated blood to body tissues for cellular respiration and returns deoxygenated blood to the heart.",
    "Blood pressure is measured with a sphygmomanometer in mm Hg (millimetres of mercury). An example reading is 120/75 mm Hg.",
    "Systolic pressure is the reading when ventricular muscles contract to pump blood out. The upper value in the example is 120 mm Hg.",
    "Diastolic pressure is the reading when ventricular muscles relax. The lower value in the example is 75 mm Hg.",
  ]),
  lesson("pulse", "3.2 [91–93]", "Kadar Denyutan Nadi", "Pulse Rate", [
    "Kadar denyutan nadi ialah bilangan denyutan nadi per minit. Denyutan terhasil apabila dinding arteri yang berotot mengembang dan mengecut semasa darah dipam melaluinya. Nadi dikesan apabila arteri dekat dengan permukaan kulit, seperti pergelangan tangan dan leher.",
    "Tujuan penyiasatan: mengkaji kesan keaktifan fizikal terhadap kadar denyutan nadi. Pemboleh ubah dimanipulasikan ialah jenis aktiviti: berehat, berjalan secara perlahan dan berlari. Pemboleh ubah bergerak balas ialah bilangan denyutan seminit. Tempoh masa aktiviti dilakukan dimalarkan.",
    "Pemerhatian: berehat menghasilkan kadar paling rendah; berjalan secara perlahan meningkatkannya secara sederhana; berlari menghasilkan kadar paling tinggi.",
    "Apabila keaktifan fizikal meningkat, sel otot memerlukan lebih banyak tenaga. Jantung mengecut lebih cepat untuk membekalkan oksigen dan nutrien serta menyingkirkan karbon dioksida dengan kadar lebih tinggi.",
    "Jantina: purata perempuan dewasa 78–82 denyutan seminit berbanding lelaki dewasa 70–72. Saiz jantung perempuan secara purata lebih kecil, maka jantung perlu mengecut lebih kerap untuk mengepam isipadu darah yang sama.",
    "Umur: kadar purata denyutan nadi maksimum menurun apabila umur meningkat. Umur 20 tahun: 200 bpm; 35–40 tahun: 185–180 bpm; 60–70 tahun: 160–150 bpm.",
    "Kesihatan badan: individu kurang sihat boleh mempunyai kadar nadi rehat lebih tinggi atau lebih rendah daripada normal. Atlet mempunyai kadar nadi rehat lebih rendah kerana otot jantung yang lebih kuat mengepam lebih banyak darah dalam satu pengecutan.",
  ], [
    "Pulse rate is the number of pulses per minute. Pulses arise as muscular arterial walls expand and contract when blood is pumped through them. A pulse is detected where arteries lie near the skin, such as the wrist and neck.",
    "Investigation aim: study the effect of physical activity on pulse rate. The manipulated variable is the activity: resting, slow walking and running. The responding variable is pulses per minute. The duration of activity is kept constant.",
    "Observation: resting gives the lowest rate; slow walking produces a moderate increase; running gives the highest rate.",
    "As physical activity increases, muscle cells need more energy. The heart contracts faster to supply more oxygen and nutrients and remove carbon dioxide at a higher rate.",
    "Gender: adult women average 78–82 pulses per minute compared with 70–72 for adult men. Women's hearts are smaller on average, so they contract more frequently to pump the same blood volume.",
    "Age: average maximum pulse rate decreases with age. At 20 years: 200 bpm; 35–40 years: 185–180 bpm; 60–70 years: 160–150 bpm.",
    "Health status: people in poor health may have resting pulse rates above or below normal. Athletes have lower resting rates because stronger heart muscles pump more blood per contraction.",
  ]),
  lesson("blood", "3.3 [96–97]", "Komponen dan Kandungan Darah Manusia", "Components and Constituents of Human Blood", [
    "Darah manusia ialah campuran. Kaedah emparan memutarkan darah dengan cepat untuk mengasingkan komponennya. Kira-kira 55% isipadu ialah plasma, cecair kuning di bahagian atas; kira-kira 45% ialah komponen sel yang mendap di bawah.",
    "Plasma darah mengandungi kira-kira 90% air dan 10% bahan terlarut. Bahan yang diangkut termasuk glukosa, asid amino, asid lemak, gliserol, oksigen, karbon dioksida, enzim, hormon, urea dan asid urik.",
    "Sel darah merah (eritrosit) berbentuk cakera dwicekung. Nisbah luas permukaan kepada isipadu yang besar memudahkan resapan oksigen. Sel matang tiada nukleus, menyediakan lebih ruang untuk hemoglobin. Pigmen merah kaya zat besi ini mengikat oksigen secara longgar menjadi oksihemoglobin di peparu dan membebaskannya di tisu badan.",
    "Sel darah putih (leukosit) mempunyai nukleus dan bentuk tidak tetap. Saiz lebih besar daripada sel darah merah tetapi bilangannya jauh lebih sedikit. Mempertahankan badan daripada penyakit dengan memusnahkan patogen melalui fagositosis atau menghasilkan antibodi.",
    "Platlet ialah serpihan sel halus tanpa nukleus. Terlibat dalam pembekuan darah untuk menutup luka dan mencegah pendarahan berlebihan.",
  ], [
    "Human blood is a mixture. Centrifugation spins blood rapidly to separate its components. Approximately 55% of the volume is plasma, the yellow liquid above; approximately 45% consists of cellular components that settle below.",
    "Blood plasma contains approximately 90% water and 10% dissolved substances. It transports glucose, amino acids, fatty acids, glycerol, oxygen, carbon dioxide, enzymes, hormones, urea and uric acid.",
    "Red blood cells (erythrocytes) are biconcave discs. Their large surface-area-to-volume ratio facilitates oxygen diffusion. Mature cells lack nuclei, leaving more space for haemoglobin. This iron-rich red pigment binds oxygen loosely as oxyhaemoglobin in the lungs and releases it in body tissues.",
    "White blood cells (leucocytes) have nuclei and irregular shapes. They are larger than red blood cells but much less numerous. They defend against disease by destroying pathogens through phagocytosis or producing antibodies.",
    "Platelets are small cell fragments without nuclei. They take part in blood clotting to seal wounds and prevent excessive bleeding.",
  ]),
  lesson("abo", "3.3 [98–99]", "Kumpulan Darah Manusia", "Human Blood Groups", [
    "Kumpulan A, B, AB dan O ditentukan oleh antigen pada permukaan sel darah merah dan antibodi dalam plasma darah.",
    "A: antigen A dan anti-B. B: antigen B dan anti-A. AB: antigen A serta B, tanpa anti-A atau anti-B. O: tanpa antigen A atau B, dengan anti-A serta anti-B.",
    "Jika darah tidak serasi, antibodi penerima menyerang antigen sepadan pada sel darah merah penderma. Contoh: darah A diberikan kepada penerima B; anti-A penerima menyerang antigen A penderma.",
    "Sel darah merah menggumpal (penggumpalan darah / aglutinasi), menyumbat salur darah dan menyekat aliran darah. Keadaan ini boleh menyebabkan kematian penerima.",
    "Padanan penerima: A menerima A/O; B menerima B/O; AB menerima A/B/AB/O; O menerima O sahaja. Dalam sistem ABO, O ialah penderma universal kerana tiada antigen A/B; AB ialah penerima universal kerana tiada anti-A/anti-B.",
  ], [
    "Blood groups A, B, AB and O are determined by antigens on red blood cell surfaces and antibodies in blood plasma.",
    "A: antigen A and anti-B. B: antigen B and anti-A. AB: antigens A and B, without anti-A or anti-B. O: no A or B antigens, with both anti-A and anti-B.",
    "With incompatible blood, recipient antibodies attack matching antigens on donor red blood cells. For example, if A blood is given to a B recipient, the recipient's anti-A attacks the donor's antigen A.",
    "Red blood cells clump (agglutination), blocking blood vessels and blood flow. This can cause the recipient's death.",
    "Recipient compatibility: A receives A/O; B receives B/O; AB receives A/B/AB/O; O receives O only. In the ABO system, O is the universal donor because it lacks A/B antigens; AB is the universal recipient because it lacks anti-A/anti-B.",
  ]),
  lesson("donation", "3.3 [99–101]", "Pendermaan Darah", "Blood Donation", [
    "Pendermaan darah menyediakan stok di Pusat Darah Negara untuk menyelamatkan nyawa pesakit semasa pembedahan, mangsa kemalangan serta pesakit leukemia, hemofilia dan anemia.",
    "Syarat menderma: individu sihat, jisim badan melebihi 45 kg dan berumur 18–60 tahun.",
    "Natrium sitrat di dalam beg darah menghalang darah derma daripada membeku semasa penyimpanan.",
  ], [
    "Blood donation provides stocks at the National Blood Centre to save patients during surgery, accident victims and people with leukaemia, haemophilia and anaemia.",
    "Donor requirements: healthy, weighing more than 45 kg and aged 18–60 years.",
    "Sodium citrate in blood bags prevents donated blood from clotting during storage.",
  ]),
  lesson("water", "3.4 [102–103]", "Transpirasi", "Transpiration", [
    "Transpirasi ialah proses kehilangan air dalam bentuk wap air dari permukaan daun (stoma) ke udara secara penyejatan.",
    "Air dari tanah diserap oleh sel rambut akar secara osmosis. Air bergerak merentasi korteks akar ke salur xilem, kemudian ke atas melalui xilem batang dan daun akibat tarikan transpirasi.",
    "Air dari sel mesofil menyejat ke ruang udara di dalam daun. Wap air meresap keluar ke atmosfera melalui liang stoma.",
  ], [
    "Transpiration is the loss of water as water vapour from leaf surfaces (stomata) to the air by evaporation.",
    "Root hair cells absorb water from the soil by osmosis. Water crosses the root cortex into xylem vessels and moves upwards through stem and leaf xylem due to transpiration pull.",
    "Water from mesophyll cells evaporates into air spaces inside the leaf. Water vapour diffuses through stomata into the atmosphere.",
  ]),
  lesson("stomata", "3.4 [103,109–110]", "Liang Stoma, Sel Pengawal dan Transpirasi", "Stomata, Guard Cells and Transpiration", [
    "Daun mempunyai epidermis atas dan epidermis bawah, masing-masing satu lapisan sel, yang diselaputi kutikel berlilin. Kebanyakan stoma berada pada epidermis bawah untuk mengurangkan kehilangan air.",
    "Setiap stoma dikawal oleh sepasang sel pengawal berbentuk melengkung seperti kacang. Sel pengawal mengandungi kloroplas untuk fotosintesis. Dinding dalam yang menghadap liang adalah tebal dan kurang elastik; dinding luar nipis dan sangat elastik.",
    "Pembukaan: cahaya membolehkan fotosintesis menghasilkan glukosa dalam sel pengawal. Kepekatan glukosa tinggi menjadikannya hipertonik. Air dari sel epidermis sekeliling masuk secara osmosis. Sel pengawal menjadi segah; dinding luar mengembang lebih banyak daripada dinding dalam. Sel membengkok dan stoma terbuka.",
    "Penutupan: pada waktu malam tanpa fotosintesis atau apabila terlalu panas, glukosa berkurangan atau sel pengawal kehilangan air. Air keluar ke sel epidermis secara osmosis. Sel pengawal menjadi flasid dan lurus, menyebabkan stoma tertutup.",
  ], [
    "Leaves have upper and lower epidermises, each one cell layer thick and covered by a waxy cuticle. Most stomata are on the lower epidermis to reduce water loss.",
    "Each stoma is controlled by a pair of curved, bean-shaped guard cells. Guard cells contain chloroplasts for photosynthesis. The inner wall facing the pore is thick and less elastic; the outer wall is thin and very elastic.",
    "Opening: light allows photosynthesis to produce glucose in guard cells. The high glucose concentration makes them hypertonic. Water enters from neighbouring epidermal cells by osmosis. Guard cells become turgid; the outer wall expands more than the inner wall. The cells curve and the stoma opens.",
    "Closing: at night without photosynthesis, or in excessive heat, glucose decreases or guard cells lose water. Water leaves for neighbouring epidermal cells by osmosis. Guard cells become flaccid and straight, closing the stoma.",
  ]),
  lesson("guttation", "3.4 [103]; user-approved terminology", "Pelembakan (Gutasi)", "Guttation", [
    "Pelembakan (gutasi) ialah kehilangan air dalam bentuk titisan cecair melalui hidatod, liang khas di pinggir daun.",
    "Biasanya berlaku pada malam atau awal pagi apabila kelembapan udara tinggi dan kadar transpirasi rendah. Tekanan akar menolak air ke atas dan keluar melalui hidatod.",
    "Transpirasi: wap air tanpa bahan terlarut keluar melalui stoma; terutama ketika siang yang panas, kering dan berangin. Pelembakan (gutasi): titisan air mengandungi garam mineral terlarut keluar melalui hidatod; biasanya pada malam atau awal pagi yang lembap dan sejuk.",
  ], [
    "Guttation is the loss of water as liquid droplets through hydathodes, specialised pores at leaf margins.",
    "It usually occurs at night or in the early morning when humidity is high and transpiration is low. Root pressure pushes water upwards and out through hydathodes.",
    "Transpiration: water vapour without dissolved substances exits through stomata, especially on hot, dry, windy days. Guttation: droplets containing dissolved mineral salts exit through hydathodes, usually on humid, cool nights or early mornings.",
  ]),
  lesson("factors", "3.4 [104–108]", "Kadar Transpirasi dan Faktor-Faktor yang Mempengaruhinya", "Transpiration Rate and Factors Affecting It", [
    "Kadar transpirasi disiasat menggunakan potometer jisim untuk mengukur pengurangan jisim air atau potometer gelembung untuk mengukur pergerakan gelembung udara dalam tiub kapilari berisi air.",
    "Keamatan cahaya: pemboleh ubah yang diubah ialah keamatan cahaya. Kadar meningkat apabila cahaya bertambah sehingga mencapai maksimum. Cahaya merangsang pembukaan stoma untuk fotosintesis; liang yang lebih luas membolehkan lebih banyak wap air terbebas.",
    "Kelembapan udara: pemboleh ubah yang diubah ialah kelembapan udara. Kadar menurun apabila kelembapan meningkat. Udara luar yang mengandungi lebih banyak wap air mengurangkan perbezaan kepekatan antara ruang udara daun dan udara luar, lalu mengurangkan resapan wap air. Udara kering mempercepat resapan keluar.",
    "Pergerakan udara: pemboleh ubah yang diubah ialah kelajuan angin. Kadar meningkat apabila pergerakan udara bertambah. Angin menyingkirkan wap air di sekeliling stoma, mengekalkan kecerunan kepekatan tinggi antara daun dan atmosfera.",
    "Suhu: pemboleh ubah yang diubah ialah suhu persekitaran. Kadar meningkat apabila suhu meningkat. Tenaga kinetik molekul air meningkat, mempercepat penyejatan dari sel mesofil ke ruang udara daun dan keluar melalui stoma.",
  ], [
    "Transpiration rate is investigated using a mass potometer to measure reduction in water mass or a bubble potometer to measure air-bubble movement in a water-filled capillary tube.",
    "Light intensity: the variable changed is light intensity. Rate increases with light up to a maximum. Light stimulates stomatal opening for photosynthesis; wider pores allow more water vapour to escape.",
    "Air humidity: the variable changed is humidity. Rate decreases as humidity rises. More water vapour outside reduces the concentration difference between leaf air spaces and the outside air, reducing vapour diffusion. Dry air accelerates outward diffusion.",
    "Air movement: the variable changed is wind speed. Rate increases as air movement increases. Wind removes vapour around stomata, maintaining a steep concentration gradient between the leaf and atmosphere.",
    "Temperature: the variable changed is the surrounding temperature. Rate increases with temperature. Water molecules gain kinetic energy, accelerating evaporation from mesophyll cells into leaf air spaces and escape through stomata.",
  ]),
  lesson("vascular", "3.4 [109]", "Berkas Vaskular dalam Tumbuhan: Struktur dan Fungsi", "Vascular Bundles in Plants: Structure and Function", [
    "Xilem terdiri daripada salur silinder panjang dan berongga, terbentuk daripada sel mati yang bersambungan hujung ke hujung tanpa sitoplasma. Dinding tebal diperkuat dengan lignin.",
    "Xilem mengangkut air dan garam mineral terlarut dari akar melalui batang ke daun. Penebalan lignin memberikan sokongan mekanikal supaya tumbuhan tegak.",
    "Floem terdiri daripada tiub tapis yang dibentuk oleh sel hidup bersambungan. Mengangkut bahan organik terlarut, terutamanya sukrosa hasil fotosintesis, dari daun ke akar, batang, buah dan pucuk. Pengangkutan makanan ini dipanggil translokasi.",
    "Daun: xilem di bahagian atas berkas vaskular, menghadap permukaan atas daun; floem di bahagian bawah.",
    "Batang: berkas vaskular tersusun dalam bulatan. Xilem di sebelah dalam dan floem di sebelah luar bulatan.",
    "Akar: xilem terletak di tengah silinder vaskular, berbentuk palang atau bintang. Floem berselang-seli di antara lengan xilem.",
  ], [
    "Xylem consists of long hollow cylindrical vessels formed from dead cells joined end to end, without cytoplasm. Thick walls are strengthened with lignin.",
    "Xylem transports water and dissolved mineral salts from roots through stems to leaves. Lignin thickening provides mechanical support to keep the plant upright.",
    "Phloem consists of sieve tubes formed from connected living cells. It transports dissolved organic substances, especially sucrose from photosynthesis, from leaves to roots, stems, fruits and shoots. This transport of food is called translocation.",
    "Leaf: xylem lies above in the vascular bundle, facing the upper leaf surface; phloem lies below.",
    "Stem: vascular bundles are arranged in a ring. Xylem is on the inside and phloem on the outside of the ring.",
    "Root: xylem lies centrally in the vascular cylinder, forming a cross or star. Phloem alternates between the xylem arms.",
  ]),
  lesson("eosin", "3.4 [111]", "Menyelidiki Laluan Air di dalam Tumbuhan", "Investigating the Water Pathway in Plants", [
    "Prosedur: letakkan pokok keembung segar dengan akar lengkap di dalam kelalang kon berisi larutan eosin merah. Selepas 30 minit, potong keratan rentas nipis daun, batang dan akar. Perhatikan keratan di bawah mikroskop cahaya.",
    "Pemerhatian: hanya tisu xilem dalam akar, batang dan daun berwarna merah.",
    "Kesimpulan: pewarna merah bergerak melalui xilem, membuktikan xilem mengangkut air dan garam mineral dari akar ke daun.",
  ], [
    "Procedure: place a fresh balsam plant with intact roots in a conical flask containing red eosin solution. After 30 minutes, cut thin cross sections of leaves, stems and roots. Observe them under a light microscope.",
    "Observation: only the xylem in roots, stems and leaves is stained red.",
    "Conclusion: the red dye moves through xylem, demonstrating that xylem transports water and mineral salts from roots to leaves.",
  ]),
  lesson("ringing", "3.4 [112]", "Menyelidiki Laluan Makanan di dalam Tumbuhan", "Investigating the Food Pathway in Plants", [
    "Eksperimen gelang: buang satu gelang kulit kayu yang mengandungi floem daripada batang pokok berkayu sihat. Xilem dibiarkan utuh supaya air masih sampai ke daun. Siram setiap hari dan letakkan di bawah cahaya matahari selama dua hingga tiga bulan.",
    "Pemerhatian: batang membengkak di atas gelang dan mengecil di bawah gelang.",
    "Fotosintesis masih berlaku kerana xilem membekalkan air. Sukrosa bergerak ke bawah melalui floem, tetapi laluan yang terputus menyebabkan makanan terkumpul di atas gelang lalu membengkak. Bahagian bawah kekurangan makanan dan mengecil.",
    "Kesimpulan: floem mengangkut makanan, seperti sukrosa, dari daun ke seluruh bahagian tumbuhan.",
  ], [
    "Ringing experiment: remove a ring of bark containing phloem from a healthy woody stem. Leave xylem intact so water still reaches the leaves. Water daily and keep the plant in sunlight for two to three months.",
    "Observation: the stem swells above the ring and becomes thinner below it.",
    "Photosynthesis continues because xylem supplies water. Sucrose moves down through phloem, but the broken pathway causes food to accumulate above the ring and produce swelling. The lower part lacks food and shrinks.",
    "Conclusion: phloem transports food, such as sucrose, from leaves to all parts of the plant.",
  ]),
  lesson("comparison", "3.5 [113]; disputed classification withheld", "Persamaan", "Similarities", [
    "Kedua-duanya sistem pengangkutan khusus dalam organisma kompleks (multisel). Kedua-duanya mengangkut nutrien, air dan bahan keperluan hidup ke seluruh sel. Kedua-duanya mempunyai salur atau tiub yang membawa bahan ke seluruh tisu.",
    "Medium pengangkutan: haiwan menggunakan darah yang mengandungi plasma, sel darah merah, sel darah putih dan platlet. Tumbuhan menggunakan sap xilem (air dan garam mineral) dan sap floem (larutan sukrosa).",
    "Struktur tiub: arteri, vena dan kapilari haiwan terbina daripada sel hidup. Berkas vaskular tumbuhan mengandungi xilem daripada sel mati berlignin dan tiub tapis floem daripada sel hidup.",
    "Organ pengepam: haiwan mempunyai jantung. Tumbuhan tiada organ pengepam; air bergerak melalui tarikan transpirasi, tindakan kapilari dan tekanan akar.",
    "Pengangkutan gas: darah haiwan mengangkut oksigen dan karbon dioksida. Sistem vaskular tumbuhan tidak mengangkut gas respirasi; gas meresap melalui stoma, lentisel dan permukaan sel.",
    "Arah aliran: darah beredar dalam kitaran; burung dan mamalia mempunyai peredaran ganda dua lengkap. Air xilem bergerak sehala ke atas, manakala makanan dalam floem boleh bergerak dua hala.",
  ], [
    "Both are specialised transport systems in complex multicellular organisms. Both carry nutrients, water and essential substances to cells. Both have vessels or tubes carrying substances throughout tissues.",
    "Transport medium: animals use blood containing plasma, red blood cells, white blood cells and platelets. Plants use xylem sap (water and mineral salts) and phloem sap (sucrose solution).",
    "Tube structure: animal arteries, veins and capillaries are made of living cells. Plant vascular bundles contain xylem made of dead lignified cells and phloem sieve tubes made of living cells.",
    "Pumping organ: animals have a heart. Plants have no pumping organ; water moves through transpiration pull, capillary action and root pressure.",
    "Gas transport: animal blood carries oxygen and carbon dioxide. Plant vascular tissue does not transport respiratory gases; gases diffuse through stomata, lenticels and cell surfaces.",
    "Flow direction: blood circulates in a circuit; birds and mammals have complete double circulation. Xylem water moves upwards in one direction, while food in phloem can move in both directions.",
  ]),
];
export const chapter3Lesson = (id: string) => {
  const item = chapter3Lessons.find(item => item.id === id);
  if (!item) throw new Error(`Missing Chapter 3 lesson: ${id}`);
  return item;
};
