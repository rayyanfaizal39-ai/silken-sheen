import json, os, re
from pathlib import Path

baseline=json.loads(Path(os.environ['TEMP'],'science-f1-pr65-baseline.json').read_text(encoding='utf-8'))
decisions={}
def change(c,n,problem,en,bm,classification='CORRECT'):
    decisions[f'{c}:{n}']={'classification':classification,'problem':problem,'dlp':en,'bm':bm}
def options(c,n,problem,en,bm,answer=None):
    a={'options':en.split('|')};b={'options':bm.split('|')}
    if answer is not None:a['answerIndex']=b['answerIndex']=answer
    change(c,n,problem,a,b)
def difficulty(c,ns,level):
    for n in ns:
        k=f'{c}:{n}'
        if k not in decisions:change(c,n,'Difficulty overstated for the reasoning required.',{}, {})
        for lang in ['bm','dlp']:decisions[k][lang]['difficulty']=level

# Related distractors replace unrelated organisms, organs or everyday objects.
options(3,1,'Distractors test unrelated life processes rather than internal regulation.',
'Adjustment of internal conditions to match every external change|Maintenance of a stable internal environment|Maintenance of an unchanging external environment|Prevention of all changes inside the body',
'Pelarasan keadaan dalaman mengikut setiap perubahan luar|Pengekalan persekitaran dalaman yang stabil|Pengekalan persekitaran luar yang tidak berubah|Pencegahan semua perubahan dalam badan')
options(3,3,'BM/DLP distractor mismatch; unrelated clothing and shoe cues.',
'Air temperature and humidity around the body|Body temperature and water content|Room temperature and body temperature|Air humidity and body water content',
'Suhu dan kelembapan udara di sekeliling badan|Suhu badan dan kandungan air|Suhu bilik dan suhu badan|Kelembapan udara dan kandungan air badan')
options(3,4,'Weak distractors; distinguish a regulated range from an absolutely fixed value.',
'Internal conditions always follow external conditions|Internal conditions are kept within a normal range|Internal conditions never vary during activity|Internal conditions change without corrective responses',
'Keadaan dalaman sentiasa mengikut keadaan luar|Keadaan dalaman dikekalkan dalam julat normal|Keadaan dalaman tidak pernah berubah semasa aktiviti|Keadaan dalaman berubah tanpa gerak balas pembetulan')
options(3,7,'Use competing blood-vessel responses rather than impossible hardening.',
'Blood vessels near the skin dilate, increasing heat loss|Blood vessels near the skin constrict, increasing heat loss|Blood vessels near the skin dilate, reducing heat loss|Blood vessels near the skin constrict, reducing heat loss',
'Salur darah berhampiran kulit mengembang, meningkatkan kehilangan haba|Salur darah berhampiran kulit mengecut, meningkatkan kehilangan haba|Salur darah berhampiran kulit mengembang, mengurangkan kehilangan haba|Salur darah berhampiran kulit mengecut, mengurangkan kehilangan haba',0)
options(3,8,'Replace unrelated excretion and plant distractors with heat-transfer alternatives.',
'Evaporation of sweat removes heat from the body|Evaporation of sweat supplies heat to the body|Sweat traps an insulating air layer above the skin|Sweat prevents heat from leaving the skin',
'Penyejatan peluh menyingkirkan haba daripada badan|Penyejatan peluh membekalkan haba kepada badan|Peluh memerangkap lapisan udara penebat di atas kulit|Peluh menghalang haba daripada meninggalkan kulit',0)
options(3,9,'Hair position and air trapping must be compared within one mechanism.',
'Hairs lie flat, reducing the trapped-air layer|Hairs stand erect, reducing the trapped-air layer|Hairs lie flat, increasing the trapped-air layer|Hairs stand erect, increasing the trapped-air layer',
'Bulu roma condong, mengurangkan lapisan udara terperangkap|Bulu roma menegak, mengurangkan lapisan udara terperangkap|Bulu roma condong, menambahkan lapisan udara terperangkap|Bulu roma menegak, menambahkan lapisan udara terperangkap',0)
options(3,10,'Replace impossible vessel responses with calibre/heat-loss combinations.',
'Blood vessels near the skin constrict, reducing heat loss|Blood vessels near the skin dilate, reducing heat loss|Blood vessels near the skin constrict, increasing heat loss|Blood vessels near the skin dilate, increasing heat loss',
'Salur darah berhampiran kulit mengecut, mengurangkan kehilangan haba|Salur darah berhampiran kulit mengembang, mengurangkan kehilangan haba|Salur darah berhampiran kulit mengecut, meningkatkan kehilangan haba|Salur darah berhampiran kulit mengembang, meningkatkan kehilangan haba',0)
options(3,13,'Keep alternatives about urine production and water retention.',
'More urine is produced and less water is retained|Less urine is produced and more water is retained|More urine is produced and more water is retained|Less urine is produced and less water is retained',
'Lebih banyak air kencing dihasilkan dan kurang air dikekalkan|Kurang air kencing dihasilkan dan lebih banyak air dikekalkan|Lebih banyak air kencing dihasilkan dan lebih banyak air dikekalkan|Kurang air kencing dihasilkan dan kurang air dikekalkan',0)
options(3,14,'Remove unrelated animal mechanisms from plant-process definition.',
'Loss of water vapour through stomata|Absorption of water through root hairs|Transport of water upwards through the stem|Use of water to produce food during photosynthesis',
'Kehilangan wap air melalui stoma|Penyerapan air melalui rerambut akar|Pengangkutan air ke atas melalui batang|Penggunaan air untuk menghasilkan makanan semasa fotosintesis',0)
options(3,15,'Replace animal organs with plausible plant-cell functions.',
'Control the opening and closing of stomata|Absorb water and mineral salts from soil|Transport water upwards through the stem|Support the leaf by forming a rigid cell wall',
'Mengawal pembukaan dan penutupan stoma|Menyerap air dan garam mineral dari tanah|Mengangkut air ke atas melalui batang|Menyokong daun dengan membentuk dinding sel yang tegar',0)
options(3,16,'Corrective mechanism distractors must remain within regulation.',
'Return internal conditions towards their normal level|Keep the changed internal condition at its new level|Increase the difference from the normal internal level|Make internal conditions follow the external environment',
'Mengembalikan keadaan dalaman ke arah aras normal|Mengekalkan keadaan dalaman yang berubah pada aras baharunya|Meningkatkan perbezaan daripada aras dalaman normal|Menjadikan keadaan dalaman mengikut persekitaran luar',0)
options(3,18,'Shivering produces heat; it is not a mechanism that reduces heat loss.',
'Shivering, constricted skin blood vessels and erect hairs|Shivering, dilated skin blood vessels and flat hairs|Sweating, constricted skin blood vessels and flat hairs|Sweating, dilated skin blood vessels and erect hairs',
'Menggigil, salur darah kulit mengecut dan bulu roma menegak|Menggigil, salur darah kulit mengembang dan bulu roma condong|Berpeluh, salur darah kulit mengecut dan bulu roma condong|Berpeluh, salur darah kulit mengembang dan bulu roma menegak',0)
decisions['3:18']['dlp']['explanation']='Shivering produces heat through muscle activity. Constricted skin blood vessels and the air trapped by erect hairs reduce heat loss.'
decisions['3:18']['bm']['explanation']='Menggigil menghasilkan haba melalui aktiviti otot. Salur darah kulit yang mengecut dan udara yang terperangkap oleh bulu roma menegak mengurangkan kehilangan haba.'
options(3,19,'Remove plant and impossible metabolism distractors.',
'Metabolic rate increases, producing more heat|Metabolic rate decreases, producing more heat|Metabolic rate increases, producing less heat|Metabolic rate decreases, producing less heat',
'Kadar metabolisme meningkat, menghasilkan lebih banyak haba|Kadar metabolisme menurun, menghasilkan lebih banyak haba|Kadar metabolisme meningkat, menghasilkan kurang haba|Kadar metabolisme menurun, menghasilkan kurang haba',0)
options(3,20,'Use urine/thirst alternatives within the human water-control system.',
'Less urine is produced and thirst encourages drinking|More urine is produced and thirst encourages drinking|Less urine is produced and thirst is reduced|More urine is produced and thirst is reduced',
'Kurang air kencing dihasilkan dan rasa dahaga mendorong minum|Lebih banyak air kencing dihasilkan dan rasa dahaga mendorong minum|Kurang air kencing dihasilkan dan rasa dahaga berkurang|Lebih banyak air kencing dihasilkan dan rasa dahaga berkurang',0)
options(3,21,'Use plausible temperature responses of the same animal.',
'Licking its fur allows fluid to evaporate and remove heat|Licking its fur traps more air and reduces heat loss|Erecting its fur allows more heat to leave the skin|Erecting its fur lowers its body temperature by insulation',
'Menjilat bulunya membolehkan bendalir tersejat dan menyingkirkan haba|Menjilat bulunya memerangkap lebih banyak udara dan mengurangkan kehilangan haba|Menegakkan bulunya membolehkan lebih banyak haba meninggalkan kulit|Menegakkan bulunya menurunkan suhu badan melalui penebatan',0)
options(3,23,'Use source term fluid/bendalir; remove mechanisms belonging to other animals.',
'Producing fluid and seeking humid places reduces water loss|Producing fluid and seeking dry places reduces water loss|Stopping fluid production in dry places reduces evaporation|Seeking exposed places prevents water from evaporating',
'Menghasilkan bendalir dan mencari tempat lembap mengurangkan kehilangan air|Menghasilkan bendalir dan mencari tempat kering mengurangkan kehilangan air|Menghentikan penghasilan bendalir di tempat kering mengurangkan penyejatan|Mencari tempat terdedah menghalang air daripada tersejat',0)
decisions['3:23']['dlp']['explanation']='Snails lose water by evaporation from their skin. They produce fluid and seek humid places to reduce water loss.'
decisions['3:23']['bm']['explanation']='Siput kehilangan air melalui penyejatan daripada kulit. Siput menghasilkan bendalir dan mencari tempat lembap untuk mengurangkan kehilangan air.'
options(3,24,'Keep alternatives about the bee surface and spiracle water-loss mechanism.',
'A waxy outer layer and closing spiracles between breaths reduce water loss|A waxy outer layer and keeping spiracles open continuously reduce water loss|A waxy outer layer increases evaporation while closed spiracles release water|A waxy outer layer absorbs water vapour while open spiracles prevent its loss',
'Lapisan luar berlilin dan penutupan spirakel antara pernafasan mengurangkan kehilangan air|Lapisan luar berlilin dan spirakel yang sentiasa terbuka mengurangkan kehilangan air|Lapisan luar berlilin meningkatkan penyejatan manakala spirakel tertutup membebaskan air|Lapisan luar berlilin menyerap wap air manakala spirakel terbuka menghalang kehilangannya',0)
options(3,25,'Remove xylem and direct-glucose distractors; compare gas exchange and water loss.',
'Gas exchange for photosynthesis can occur, but water vapour can also escape|Gas exchange for photosynthesis can occur, but water vapour cannot escape|Water vapour can escape, but carbon dioxide cannot enter|Water vapour cannot escape and carbon dioxide cannot enter',
'Pertukaran gas untuk fotosintesis boleh berlaku, tetapi wap air juga boleh keluar|Pertukaran gas untuk fotosintesis boleh berlaku, tetapi wap air tidak boleh keluar|Wap air boleh keluar, tetapi karbon dioksida tidak boleh masuk|Wap air tidak boleh keluar dan karbon dioksida tidak boleh masuk',0)
change(3,28,'Remove advanced ectotherm label and implausible distractors; one-step application is Medium.',
{'difficulty':'Medium','options':['Its activity and metabolic rate decrease as its body temperature falls','Its activity and metabolic rate increase as its body temperature falls','Its activity decreases while its metabolic rate increases','Its activity increases while its metabolic rate decreases'],'explanation':'In cold surroundings, a lizard moves more slowly and has a lower metabolic rate and body temperature.'},
{'difficulty':'Medium','options':['Aktiviti dan kadar metabolismenya menurun apabila suhu badannya menurun','Aktiviti dan kadar metabolismenya meningkat apabila suhu badannya menurun','Aktivitinya menurun manakala kadar metabolismenya meningkat','Aktivitinya meningkat manakala kadar metabolismenya menurun'],'explanation':'Dalam persekitaran sejuk, cicak bergerak lebih perlahan serta mempunyai kadar metabolisme dan suhu badan yang lebih rendah.'})
options(3,29,'Unrelated kidney/plant options replaced with consequences of failed heat loss.',
'Less heat is lost through the skin, so overheating becomes more likely|More heat is lost through the skin, so overheating becomes more likely|Less heat is lost through the skin, so body temperature falls|More heat is lost through the skin, so body temperature falls',
'Kurang haba hilang melalui kulit, maka badan lebih mudah menjadi terlalu panas|Lebih banyak haba hilang melalui kulit, maka badan lebih mudah menjadi terlalu panas|Kurang haba hilang melalui kulit, maka suhu badan menurun|Lebih banyak haba hilang melalui kulit, maka suhu badan menurun',0)
difficulty(3,[29],'Medium')
change(3,30,'Original animal-response match could be guessed from unrelated organs. Replace with a controlled plant investigation.',
{'question':'Two similar plants receive equal light. P is kept in hot, dry surroundings without water; Q is kept in cool, humid surroundings and watered. P closes more stomata. Can the difference be attributed only to temperature?', 'options':['No; water supply and humidity also differ, so these should be controlled','Yes; equal light controls all factors affecting stomata','Yes; water supply cannot affect stomatal opening','No; both plants must receive different light intensities'], 'answerIndex':0,'explanation':'Several conditions differ. To investigate temperature, keep water supply, humidity and light the same; closing stomata reduces water loss.'},
{'question':'Dua tumbuhan serupa menerima cahaya yang sama. P diletakkan dalam persekitaran panas dan kering tanpa air; Q diletakkan dalam persekitaran sejuk dan lembap serta disiram. Lebih banyak stoma P tertutup. Bolehkah perbezaan ini dikaitkan hanya dengan suhu?', 'options':['Tidak; bekalan air dan kelembapan juga berbeza, maka kedua-duanya perlu dimalarkan','Ya; cahaya yang sama mengawal semua faktor yang mempengaruhi stoma','Ya; bekalan air tidak boleh mempengaruhi pembukaan stoma','Tidak; kedua-dua tumbuhan mesti menerima keamatan cahaya yang berbeza'], 'answerIndex':0,'explanation':'Beberapa keadaan berbeza. Untuk menyiasat suhu, malarkan bekalan air, kelembapan dan cahaya; penutupan stoma mengurangkan kehilangan air.'},'REPLACE')

options(4,8,'Compare asexual mechanisms rather than unrelated sexual events.',
'A new individual grows from a small outgrowth on the parent|One parent cell divides into two daughter cells|A detached body fragment develops into a new individual|Spores are released and develop into new individuals',
'Individu baharu tumbuh daripada tunas kecil pada induk|Satu sel induk membahagi menjadi dua sel anak|Cebisan badan yang terputus berkembang menjadi individu baharu|Spora dibebaskan dan berkembang menjadi individu baharu',0)
options(4,11,'Remove unrelated contraception and asexual-reproduction distractors.',
'The reproductive system begins to mature and produce sex cells|The reproductive system stops producing sex cells|The reproductive system begins developing only after fertilisation|The reproductive system becomes mature only during pregnancy',
'Sistem pembiakan mula matang dan menghasilkan sel pembiakan|Sistem pembiakan berhenti menghasilkan sel pembiakan|Sistem pembiakan mula berkembang hanya selepas persenyawaan|Sistem pembiakan menjadi matang hanya semasa kehamilan',0)
options(4,15,'Replace milk/gamete/agent distractors with competing germination conditions.',
'Water, oxygen and a suitable temperature|Water, carbon dioxide and a suitable temperature|Light, oxygen and dry conditions|Soil, light and dry conditions',
'Air, oksigen dan suhu yang sesuai|Air, karbon dioksida dan suhu yang sesuai|Cahaya, oksigen dan keadaan kering|Tanah, cahaya dan keadaan kering',0)
options(4,16,'All alternatives now describe asexual mechanisms.',
'A new organism develops from a detached body fragment|One cell divides into two similar cells|A new organism grows as an outgrowth on its parent|A new plant grows from a vegetative part of its parent',
'Organisma baharu berkembang daripada cebisan badan yang terputus|Satu sel membahagi menjadi dua sel yang serupa|Organisma baharu tumbuh sebagai tunas pada induknya|Tumbuhan baharu tumbuh daripada bahagian vegetatif induknya',0)
change(4,17,'Original spore question had unrelated blood/fetus/semen options. Assess observation and mechanism.',
{'question':'A bread mould releases tiny structures that develop into new mould in suitable conditions. Which evidence identifies spore formation rather than budding?', 'options':['New individuals develop from released spores rather than an outgrowth attached to the parent','New individuals develop from an outgrowth that stays attached to the parent','A parent cell divides directly into two equal daughter cells','Two sex cells fuse before each new mould develops'],'answerIndex':0,'explanation':'Spore formation releases spores that can develop into new individuals in suitable conditions. Budding begins as an outgrowth on the parent.'},
{'question':'Kulat roti membebaskan struktur kecil yang berkembang menjadi kulat baharu dalam keadaan sesuai. Bukti manakah mengenal pasti pembentukan spora dan bukannya pertunasan?', 'options':['Individu baharu berkembang daripada spora yang dibebaskan, bukan tunas yang melekat pada induk','Individu baharu berkembang daripada tunas yang kekal melekat pada induk','Sel induk membahagi terus menjadi dua sel anak yang sama','Dua sel pembiakan bercantum sebelum setiap kulat baharu berkembang'],'answerIndex':0,'explanation':'Pembentukan spora membebaskan spora yang boleh berkembang menjadi individu baharu dalam keadaan sesuai. Pertunasan bermula sebagai tunas pada induk.'},'REWRITE')
options(4,18,'Compare plant reproduction pathways, not human puberty and pregnancy.',
'A potato tuber grows into a new plant|A seed develops into a seedling|Pollen moves from an anther to a stigma|Male and female gametes fuse in an ovule',
'Ubi kentang tumbuh menjadi tumbuhan baharu|Biji benih berkembang menjadi anak benih|Debunga berpindah dari anter ke stigma|Gamet jantan dan betina bercantum di dalam ovul',0)
options(4,23,'Keep human reproductive events as alternatives.',
'Fusion of the sperm nucleus and ovum nucleus|Attachment of the embryo to the uterine wall|Release of a mature ovum from an ovary|Division of a zygote into more cells',
'Percantuman nukleus sperma dan nukleus ovum|Penempelan embrio pada dinding uterus|Pembebasan ovum matang daripada ovari|Pembahagian zigot menjadi lebih banyak sel',0)
change(4,24,'Definition duplicates earlier recall; test the two distinct locations in a development sequence.',
{'question':'A fertilised ovum divides as it moves towards the uterus. Which sequence correctly matches the next stage and its location?', 'options':['Embryo → attachment to the uterine wall','Embryo → attachment inside the ovary','Ovum → attachment to the Fallopian tube','Sperm → attachment to the cervix'],'answerIndex':0,'explanation':'After fertilisation, the zygote divides to form an embryo. The embryo moves towards the uterus and implants in its wall.'},
{'question':'Ovum yang disenyawakan membahagi semasa bergerak ke arah uterus. Urutan manakah memadankan peringkat seterusnya dengan lokasinya dengan betul?', 'options':['Embrio → penempelan pada dinding uterus','Embrio → penempelan di dalam ovari','Ovum → penempelan pada tiub Falopio','Sperma → penempelan pada serviks'],'answerIndex':0,'explanation':'Selepas persenyawaan, zigot membahagi untuk membentuk embrio. Embrio bergerak ke arah uterus dan menempel pada dindingnya.'},'REWRITE')

decisions['3:23']['dlp']['question']='Which response helps a snail reduce water loss?'
decisions['3:23']['bm']['question']='Gerak balas manakah membantu siput mengurangkan kehilangan air?'
# A controlled temperature/watering comparison is sufficient; do not introduce
# an extra transpiration factor not taught in the inspected Chapter 3 pages.
for lang in ['bm','dlp']:
    for field in ['question','options','explanation']:
        val=decisions['3:30'][lang][field]
        def trim(s):
            return s.replace('hot, dry surroundings','hot surroundings').replace('cool, humid surroundings','cool surroundings').replace('water supply and humidity also differ, so these should be controlled','water supply also differs, so it should be controlled').replace('water supply, humidity and light','water supply and light').replace('panas dan kering','panas').replace('sejuk dan lembap','sejuk').replace('bekalan air dan kelembapan juga berbeza, maka kedua-duanya perlu dimalarkan','bekalan air juga berbeza, maka bekalan air perlu dimalarkan').replace('bekalan air, kelembapan dan cahaya','bekalan air dan cahaya')
        decisions['3:30'][lang][field]=[trim(s) for s in val] if isinstance(val,list) else trim(val)

options(5,5,'Replace unrelated visibility/light alternatives with physical quantities.',
'Having volume|Having a fixed shape|Having a fixed temperature|Having a high density',
'Mempunyai isi padu|Mempunyai bentuk tetap|Mempunyai suhu tetap|Mempunyai ketumpatan tinggi',0)
change(5,8,'Gas and vapour are overlapping answer categories; assess properties instead.',
{'question':'Which combination describes a solid?', 'options':['Fixed shape and fixed volume','Fixed shape and variable volume','Variable shape and fixed volume','Variable shape and variable volume'],'answerIndex':0},
{'question':'Gabungan manakah menerangkan pepejal?', 'options':['Bentuk tetap dan isi padu tetap','Bentuk tetap dan isi padu berubah','Bentuk berubah dan isi padu tetap','Bentuk berubah dan isi padu berubah'],'answerIndex':0})
change(5,10,'Light is not a state of matter; use a properties question.',
{'question':'Water is poured from a narrow bottle into a wide bowl without loss. Which change is expected?', 'options':['Shape changes but volume stays the same','Shape stays the same but volume changes','Both shape and volume stay the same','Both shape and volume increase'],'answerIndex':0},
{'question':'Air dituang dari botol sempit ke dalam mangkuk lebar tanpa kehilangan air. Perubahan manakah dijangka?', 'options':['Bentuk berubah tetapi isi padu kekal sama','Bentuk kekal sama tetapi isi padu berubah','Bentuk dan isi padu kedua-duanya kekal sama','Bentuk dan isi padu kedua-duanya bertambah'],'answerIndex':0})
change(5,13,'Ice duplicates solid as an option; compare rate orders using distinct alternatives.',
{'question':'Which order shows diffusion from fastest to slowest?', 'options':['Gas → liquid → solid','Liquid → gas → solid','Solid → liquid → gas','Gas → solid → liquid'],'answerIndex':0},
{'question':'Urutan manakah menunjukkan resapan daripada paling cepat kepada paling perlahan?', 'options':['Gas → cecair → pepejal','Cecair → gas → pepejal','Pepejal → cecair → gas','Gas → pepejal → cecair'],'answerIndex':0})
options(5,17,'Replace particle disappearance and spontaneous solidification distractors.',
'Particles are far apart and move freely throughout the container|Particles are close together and vibrate at fixed positions|Particles are close together and slide past one another|Particles are far apart but remain at fixed positions',
'Zarah berjauhan dan bergerak bebas ke seluruh bekas|Zarah rapat dan bergetar pada kedudukan tetap|Zarah rapat dan menggelongsor antara satu sama lain|Zarah berjauhan tetapi kekal pada kedudukan tetap',0)
change(5,25,'Use inspected textbook evaporation wording rather than adding a surface-only rule.',
{'explanation':'Evaporation changes liquid water into water vapour and can occur at any temperature.'},
{'explanation':'Penyejatan menukarkan air cecair kepada wap air dan boleh berlaku pada sebarang suhu.'})
change(5,26,'Duplicates diffusion recall; replace with an interpretation and control question.',
{'question':'Copper(II) sulfate spreads faster through water than through jelly at the same temperature. Which conclusion and test condition are justified?', 'options':['Diffusion is faster in the liquid; temperature must be controlled','Diffusion is faster in the solid; temperature must be controlled','Diffusion is faster in the liquid; use different temperatures for comparison','Diffusion is equally fast; the different spreading times can be ignored'],'answerIndex':0,'explanation':'The observations support faster diffusion in liquid than in solid. Keeping temperature the same allows the diffusion media to be compared.'},
{'question':'Kuprum(II) sulfat merebak lebih cepat dalam air berbanding agar-agar pada suhu yang sama. Kesimpulan dan syarat ujian manakah wajar?', 'options':['Resapan lebih cepat dalam cecair; suhu perlu dimalarkan','Resapan lebih cepat dalam pepejal; suhu perlu dimalarkan','Resapan lebih cepat dalam cecair; gunakan suhu berbeza untuk perbandingan','Resapan sama cepat; masa penyebaran yang berbeza boleh diabaikan'],'answerIndex':0,'explanation':'Pemerhatian menyokong resapan lebih cepat dalam cecair berbanding pepejal. Suhu yang sama membolehkan medium resapan dibandingkan.'},'REPLACE')
options(5,27,'Remove claims that ice has no mass or water is not matter.',
'Ice is less dense than water|Ice is denser than water|Ice and water have the same density|Ice floats because all solids float in liquids',
'Ais kurang tumpat daripada air|Ais lebih tumpat daripada air|Ais dan air mempunyai ketumpatan yang sama|Ais terapung kerana semua pepejal terapung dalam cecair',0)
difficulty(5,[27],'Medium')
change(5,28,'Replace nonsense options and distinguish a boiling plateau from continued warming.',
{'question':'A liquid is boiling while heat continues to be supplied. Its temperature stays constant. Which statement about the heat and particles is correct?', 'options':['Heat overcomes attraction between particles as liquid changes to gas','Heat makes each particle grow larger while the liquid stays unchanged','Heat is no longer absorbed until all liquid has disappeared','Heat continuously increases particle kinetic energy during the plateau'],'answerIndex':0,'explanation':'During boiling, heat is used to overcome attraction between particles. Temperature remains constant during the change of state.','difficulty':'Medium'},
{'question':'Cecair sedang mendidih sambil haba terus dibekalkan. Suhunya kekal malar. Pernyataan manakah tentang haba dan zarah adalah betul?', 'options':['Haba mengatasi daya tarikan antara zarah semasa cecair berubah menjadi gas','Haba membesarkan setiap zarah manakala cecair tidak berubah','Haba tidak lagi diserap sehingga semua cecair hilang','Haba terus meningkatkan tenaga kinetik zarah sepanjang suhu malar'],'answerIndex':0,'explanation':'Semasa pendidihan, haba digunakan untuk mengatasi daya tarikan antara zarah. Suhu kekal malar semasa perubahan keadaan.','difficulty':'Medium'},'REWRITE')
difficulty(5,[19],'Easy')
difficulty(5,[29],'Medium')

options(6,5,'Remove outside-atom and molecule-only distractors.',
'Both are in the nucleus|Both move around the nucleus|Protons are in the nucleus; neutrons move around it|Neutrons are in the nucleus; protons move around it',
'Kedua-duanya berada dalam nukleus|Kedua-duanya beredar mengelilingi nukleus|Proton berada dalam nukleus; neutron beredar mengelilinginya|Neutron berada dalam nukleus; proton beredar mengelilinginya',0)
change(6,6,'Use textbook electron location without adding shell detail; distinguish subatomic locations.',
{'question':'Which description correctly locates electrons in an atom?', 'options':['They move around the nucleus','They remain together with protons inside the nucleus','They occupy the centres of neutrons','They form the positive centre of the atom'],'answerIndex':0,'explanation':'Electrons move around the nucleus, while protons and neutrons are in the nucleus.'},
{'question':'Huraian manakah menunjukkan kedudukan elektron dalam atom dengan betul?', 'options':['Elektron beredar mengelilingi nukleus','Elektron kekal bersama proton di dalam nukleus','Elektron berada di pusat neutron','Elektron membentuk pusat atom yang positif'],'answerIndex':0,'explanation':'Elektron beredar mengelilingi nukleus, manakala proton dan neutron berada di dalam nukleus.'})
options(6,18,'Use competing material properties rather than impossible noble-gas conversion.',
'Can be drawn into wires|Can be hammered into sheets|Can conduct heat well|Has a shiny surface',
'Boleh ditarik menjadi dawai|Boleh diketuk menjadi kepingan|Boleh mengkonduksikan haba dengan baik|Mempunyai permukaan berkilat',0)
options(6,19,'Use ductility/conductivity/lustre as related property distractors.',
'Can be hammered into shape without breaking|Can be drawn into wires|Can conduct electricity well|Has a shiny surface',
'Boleh diketuk menjadi bentuk tanpa pecah|Boleh ditarik menjadi dawai|Boleh mengkonduksikan elektrik dengan baik|Mempunyai permukaan berkilat',0)
change(6,24,'Existing picture reveals the separation method; assess interpretation of its four separated spots instead.',
{'question':'A black ink sample produces four separate coloured spots in paper chromatography. Which conclusion is supported?', 'options':['The ink contains at least four dyes separated by this method','The ink is a pure substance because it began as one spot','Four new dyes were formed by a chemical reaction','The four spots show that the ink contains four elements'],'answerIndex':0,'explanation':'Separated coloured spots provide evidence of different dye components in the ink mixture. Chromatography is a physical separation method.'},
{'question':'Sampel dakwat hitam menghasilkan empat tompok berwarna yang terpisah dalam kromatografi kertas. Kesimpulan manakah disokong?', 'options':['Dakwat mengandungi sekurang-kurangnya empat pewarna yang diasingkan oleh kaedah ini','Dakwat ialah bahan tulen kerana bermula sebagai satu tompok','Empat pewarna baharu terbentuk melalui tindak balas kimia','Empat tompok menunjukkan dakwat mengandungi empat unsur'],'answerIndex':0,'explanation':'Tompok berwarna yang terpisah memberikan bukti komponen pewarna berbeza dalam campuran dakwat. Kromatografi ialah kaedah pengasingan fizikal.'},'REWRITE')
difficulty(6,[18,19,26],'Easy')
difficulty(6,[27,28,30],'Medium')

options(7,5,'Replace one-gas distractors with competing gas mixtures.',
'Nitrogen, oxygen, carbon dioxide and noble gases|Oxygen, hydrogen, carbon monoxide and noble gases|Nitrogen, hydrogen, carbon monoxide and sulfur dioxide|Oxygen, carbon dioxide, sulfur dioxide and chlorine',
'Nitrogen, oksigen, karbon dioksida dan gas nadir|Oksigen, hidrogen, karbon monoksida dan gas nadir|Nitrogen, hidrogen, karbon monoksida dan sulfur dioksida|Oksigen, karbon dioksida, sulfur dioksida dan klorin',0)
options(7,8,'Keep alternatives about plant processes.',
'It is used in photosynthesis to produce food|It is absorbed during respiration to release energy|It is released by roots during water absorption|It is converted directly into mineral salts by leaves',
'Digunakan dalam fotosintesis untuk menghasilkan makanan|Diserap semasa respirasi untuk membebaskan tenaga|Dibebaskan oleh akar semasa penyerapan air|Ditukarkan terus kepada garam mineral oleh daun',0)
change(7,11,'Align combustion definition with inspected p.204; all options describe heating in gases.',
{'options':['A heated substance reacts in oxygen and releases heat and light energy','A heated substance reacts in nitrogen and releases heat and light energy','A heated substance changes state without forming new substances','A heated substance absorbs oxygen without releasing heat or light'],'answerIndex':0,'explanation':'Combustion occurs when a substance is heated in the presence of oxygen and releases heat energy and light energy.'},
{'options':['Bahan yang dipanaskan bertindak balas dalam oksigen dan membebaskan tenaga haba dan cahaya','Bahan yang dipanaskan bertindak balas dalam nitrogen dan membebaskan tenaga haba dan cahaya','Bahan yang dipanaskan berubah keadaan tanpa menghasilkan bahan baharu','Bahan yang dipanaskan menyerap oksigen tanpa membebaskan haba atau cahaya'],'answerIndex':0,'explanation':'Pembakaran bermaksud tindak balas yang berlaku apabila suatu bahan dipanaskan dengan kehadiran oksigen dan membebaskan tenaga haba dan tenaga cahaya.'})
options(7,17,'Compare combinations of actual carbon-cycle processes.',
'Respiration, decomposition and combustion|Photosynthesis, decomposition and combustion|Respiration, photosynthesis and combustion|Respiration, decomposition and photosynthesis',
'Respirasi, pereputan dan pembakaran|Fotosintesis, pereputan dan pembakaran|Respirasi, fotosintesis dan pembakaran|Respirasi, pereputan dan fotosintesis',0)
options(7,19,'Compare the three extinction principles rather than adding fuel/smoke.',
'Lowering the temperature of burning material|Cutting off oxygen from burning material|Removing fuel from burning material|Separating unburnt material from the fire',
'Menurunkan suhu bahan yang terbakar|Memutuskan bekalan oksigen kepada bahan yang terbakar|Memutuskan bahan api daripada bahan yang terbakar|Mengasingkan bahan yang belum terbakar daripada api',0)
change(7,21,'Use source cooling principle for CO2 and replace drinking-water/fuel distractors.',
{'question':'The textbook lists spraying a layer of carbon dioxide as a cooling technique. Which combustion condition does cooling remove?', 'options':['Sufficient heat','The source of fuel','The presence of oxygen only','The flammability of the fuel'],'answerIndex':0,'explanation':'Cooling lowers the temperature of the burning material, removing sufficient heat needed for continued combustion.'},
{'question':'Buku teks menyenaraikan semburan lapisan karbon dioksida sebagai teknik mendinginkan. Syarat pembakaran manakah disingkirkan melalui penyejukan?', 'options':['Haba yang mencukupi','Sumber bahan api','Kehadiran oksigen sahaja','Kebolehbakaran bahan api'],'answerIndex':0,'explanation':'Penyejukan menurunkan suhu bahan yang terbakar, menyingkirkan haba mencukupi yang diperlukan untuk pembakaran berterusan.'},'REWRITE')
change(7,23,'Use source-backed health effects instead of additional blood-transport mechanism.',
{'question':'Which effect of carbon monoxide is described in the chapter?', 'options':['Headache and potentially death','Formation of holes in the ozone layer','Corrosion of limestone buildings','Reduced light reaching plant leaves'],'answerIndex':0,'explanation':'Carbon monoxide is an air pollutant that can cause headache and may be fatal. Other pollutants have different effects on the environment.'},
{'question':'Kesan karbon monoksida manakah diterangkan dalam bab ini?', 'options':['Sakit kepala dan kemungkinan membawa maut','Pembentukan lubang pada lapisan ozon','Pengakisan bangunan batu kapur','Pengurangan cahaya yang sampai ke daun tumbuhan'],'answerIndex':0,'explanation':'Karbon monoksida ialah bahan pencemar udara yang boleh menyebabkan sakit kepala dan membawa maut. Bahan pencemar lain mempunyai kesan berbeza terhadap alam sekitar.'})
change(7,26,'Replace weak jar-volume alternatives with experiment-design reasoning.',
{'question':'A student compares identical candles in sealed jars containing different volumes of the same air. Which plan best tests whether air volume affects burning duration?', 'options':['Keep candle size and starting conditions the same; change air volume and measure burning duration','Keep air volume the same; change candle size and measure burning duration','Change air volume and candle size together; measure burning duration','Change air volume; compare only the final amount of wax, not burning duration'],'answerIndex':0,'explanation':'Changing air volume while controlling candle size and starting conditions allows its effect on burning duration to be tested. The same air composition means larger air volumes contain more oxygen.'},
{'question':'Murid membandingkan lilin serupa dalam balang tertutup yang mengandungi isi padu udara yang sama komposisi tetapi berbeza isi padu. Pelan manakah paling baik menguji kesan isi padu udara terhadap tempoh nyalaan?', 'options':['Malarkan saiz lilin dan keadaan awal; ubah isi padu udara dan ukur tempoh nyalaan','Malarkan isi padu udara; ubah saiz lilin dan ukur tempoh nyalaan','Ubah isi padu udara dan saiz lilin serentak; ukur tempoh nyalaan','Ubah isi padu udara; bandingkan hanya baki lilin, bukan tempoh nyalaan'],'answerIndex':0,'explanation':'Mengubah isi padu udara sambil mengawal saiz lilin dan keadaan awal membolehkan kesannya terhadap tempoh nyalaan diuji. Bagi komposisi udara yang sama, isi padu udara lebih besar mengandungi lebih banyak oksigen.'},'REWRITE')
change(7,28,'Require two connected carbon/oxygen-cycle predictions rather than one-step recall.',
{'question':'A forest is cleared and the cut trees are burned. Which pair explains the combined immediate effect on atmospheric carbon dioxide?', 'options':['Less photosynthesis removes carbon dioxide; combustion releases carbon dioxide','Less photosynthesis releases carbon dioxide; combustion removes carbon dioxide','Less photosynthesis removes more carbon dioxide; combustion releases carbon dioxide','Less photosynthesis removes carbon dioxide; combustion converts it into oxygen'],'answerIndex':0,'explanation':'Fewer trees means less removal of carbon dioxide through photosynthesis, while burning releases additional carbon dioxide.'},
{'question':'Hutan ditebang dan pokok yang ditebang dibakar. Pasangan manakah menerangkan kesan serta-merta gabungan ini terhadap karbon dioksida atmosfera?', 'options':['Kurang fotosintesis menyingkirkan karbon dioksida; pembakaran membebaskan karbon dioksida','Kurang fotosintesis membebaskan karbon dioksida; pembakaran menyingkirkan karbon dioksida','Kurang fotosintesis menyingkirkan lebih banyak karbon dioksida; pembakaran membebaskan karbon dioksida','Kurang fotosintesis menyingkirkan karbon dioksida; pembakaran menukarkannya kepada oksigen'],'answerIndex':0,'explanation':'Pokok yang berkurang menyebabkan kurang penyingkiran karbon dioksida melalui fotosintesis, manakala pembakaran membebaskan karbon dioksida tambahan.'},'REWRITE')
change(7,30,'Remove out-of-level reaction chemistry and absurd distractors; infer effects from controlled evidence.',
{'question':'Similar limestone samples are kept for the same time in equal volumes of acidic rainwater and clean water. The acidic sample erodes more. Which conclusion is supported, and why is clean water included?', 'options':['Acidic rainwater increases erosion; clean water provides a comparison','All water erodes limestone equally; clean water provides a comparison','Acidic rainwater increases erosion; clean water supplies the acid','Acidic rainwater prevents erosion; clean water changes the rock type'],'answerIndex':0,'explanation':'The comparison supports the textbook effect that acid rain erodes limestone structures. The clean-water sample helps distinguish this effect from exposure to water alone.'},
{'question':'Sampel batu kapur serupa dibiarkan untuk masa yang sama dalam isi padu air hujan berasid dan air bersih yang sama. Sampel berasid lebih terhakis. Kesimpulan manakah disokong, dan mengapakah air bersih digunakan?', 'options':['Air hujan berasid meningkatkan pengakisan; air bersih menyediakan perbandingan','Semua air mengakis batu kapur secara sama; air bersih menyediakan perbandingan','Air hujan berasid meningkatkan pengakisan; air bersih membekalkan asid','Air hujan berasid menghalang pengakisan; air bersih mengubah jenis batuan'],'answerIndex':0,'explanation':'Perbandingan menyokong kesan dalam buku teks bahawa hujan asid mengakis struktur batu kapur. Sampel air bersih membantu membezakan kesan ini daripada pendedahan kepada air sahaja.'},'REWRITE')
difficulty(7,[27,29],'Medium')

change(4,15,'Replace unrelated germination distractors with interpreting controlled seed conditions.',
{'question':'Identical seeds are tested: P has water, oxygen and warmth; Q has no water but has oxygen and warmth; R has water and warmth but no oxygen. Only P germinates. Which conclusion is supported?', 'options':['Both water and oxygen are needed under these conditions','Water alone is sufficient under these conditions','Oxygen alone is sufficient under these conditions','The test shows that light is essential for germination'],'answerIndex':0,'difficulty':'Hard','explanation':'P differs from Q in water supply and from R in oxygen supply. The comparisons support the need for both water and oxygen at a suitable temperature; light was not tested.'},
{'question':'Biji benih serupa diuji: P mempunyai air, oksigen dan suhu sesuai; Q tiada air tetapi mempunyai oksigen dan suhu sesuai; R mempunyai air dan suhu sesuai tetapi tiada oksigen. Hanya P bercambah. Kesimpulan manakah disokong?', 'options':['Air dan oksigen kedua-duanya diperlukan dalam keadaan ini','Air sahaja mencukupi dalam keadaan ini','Oksigen sahaja mencukupi dalam keadaan ini','Ujian menunjukkan cahaya diperlukan untuk percambahan'],'answerIndex':0,'difficulty':'Hard','explanation':'P berbeza daripada Q dari segi bekalan air dan daripada R dari segi bekalan oksigen. Perbandingan menyokong keperluan air dan oksigen pada suhu sesuai; cahaya tidak diuji.'},'REWRITE')
decisions['7:28']['dlp']['options'][0]='Fewer trees remove less carbon dioxide; burning releases more carbon dioxide'
decisions['7:28']['bm']['options'][0]='Pokok yang berkurang menyingkirkan kurang karbon dioksida; pembakaran membebaskan lebih banyak karbon dioksida'

options(8,2,'Replace wind and slow-wave nonsense with alternative paths.',
'Along straight paths in the same medium|Along curved paths in the same medium|Only along a vertical path|Only along a horizontal path',
'Sepanjang laluan lurus dalam medium yang sama|Sepanjang laluan melengkung dalam medium yang sama|Hanya sepanjang laluan menegak|Hanya sepanjang laluan mengufuk',0)
options(8,4,'Compare light interactions rather than sound and boiling.',
'Light is blocked by an opaque object|All the light passes through an object|Light is separated into its spectrum by a prism|Light changes direction between air and water',
'Cahaya dihalang oleh objek legap|Semua cahaya menembusi objek|Cahaya dipisahkan kepada spektrumnya oleh prisma|Cahaya berubah arah antara udara dengan air',0)
options(8,9,'Use competing image properties rather than red-colour distractor.',
'Upright and virtual|Upright and real|Inverted and virtual|Inverted and real',
'Tegak dan maya|Tegak dan sahih|Songsang dan maya|Songsang dan sahih',0)
options(8,13,'Use relationships between reflection angles, not unrelated physics formulae.',
'i = r|i = 2r|r = 2i|i + r = 90°',
'i = r|i = 2r|r = 2i|i + r = 90°',0)
options(8,16,'Use image-orientation alternatives instead of mass/temperature distractors.',
'Left and right appear reversed while the image remains upright|Top and bottom appear reversed while left and right stay unchanged|The whole image rotates through a quarter turn|The image is upright with no change in left-right orientation',
'Kiri dan kanan kelihatan tertukar manakala imej kekal tegak|Atas dan bawah kelihatan tertukar manakala kiri dan kanan tidak berubah|Seluruh imej berputar sebanyak suku pusingan|Imej tegak tanpa perubahan orientasi kiri dan kanan',0)
change(8,18,'Replace non-scientific normal-line functions with angle-reading interpretation.',
{'question':'The incident ray makes 35° with the normal to a plane mirror. A student records 55° as the angle of incidence. What explains the error?', 'options':['The student measured from the mirror surface instead of the normal','The student correctly used the angle between the ray and the normal','The normal should be drawn parallel to the mirror surface','The angle of incidence should be twice the angle shown'],'answerIndex':0,'explanation':'The normal is perpendicular to the mirror. The angle of incidence is measured from the normal, so it is 35°, not the complementary 55° measured from the surface.'},
{'question':'Sinar tuju membentuk sudut 35° dengan normal kepada cermin satah. Murid merekodkan 55° sebagai sudut tuju. Apakah punca ralat ini?', 'options':['Murid mengukur dari permukaan cermin dan bukannya normal','Murid menggunakan sudut antara sinar dengan normal dengan betul','Normal sepatutnya dilukis selari dengan permukaan cermin','Sudut tuju sepatutnya dua kali sudut yang ditunjukkan'],'answerIndex':0,'explanation':'Normal berserenjang dengan cermin. Sudut tuju diukur dari normal, maka nilainya 35°, bukan sudut pelengkap 55° yang diukur dari permukaan.'},'REWRITE')
change(8,19,'Remove speed explanation not explicit in inspected Form 1 refraction source.',
{'explanation':'A ray entering a denser medium obliquely bends towards the normal.'},
{'explanation':'Sinar yang memasuki medium lebih tumpat secara serong terbias mendekati normal.'})
change(8,21,'Remove extra speed rule and keep the source normal-incidence concept.',
{'question':'A light ray enters glass from air. In which situation does its direction remain unchanged?','explanation':'When the incident ray travels along the normal, its direction remains unchanged at the boundary.'},
{'question':'Sinar cahaya memasuki kaca dari udara. Dalam keadaan manakah arah sinar tidak berubah?','explanation':'Apabila sinar tuju bergerak sepanjang normal, arah sinar tidak berubah pada sempadan.'})
change(8,22,'Black and white gave away invalid spectrum sequences; specify red-to-violet direction.',
{'question':'Which sequence lists the visible spectrum from red to violet?','options':['Red, orange, yellow, green, blue, indigo, violet','Red, yellow, orange, green, blue, indigo, violet','Red, orange, yellow, blue, green, indigo, violet','Red, orange, yellow, green, indigo, blue, violet']},
{'question':'Urutan manakah menyenaraikan spektrum cahaya daripada merah kepada ungu?','options':['Merah, jingga, kuning, hijau, biru, indigo, ungu','Merah, kuning, jingga, hijau, biru, indigo, ungu','Merah, jingga, kuning, biru, hijau, indigo, ungu','Merah, jingga, kuning, hijau, indigo, biru, ungu']})
change(8,25,'Use two-reflection reasoning rather than unrelated heat/dispersion distractors.',
{'question':'In a periscope, light enters at A, meets the upper plane mirror and then the lower plane mirror before reaching B. Which process makes the hidden object visible?', 'options':['Reflection at both mirrors redirects light towards the observer','Refraction at both mirrors redirects light towards the observer','Reflection at the upper mirror and absorption at the lower mirror','Absorption at the upper mirror and reflection at the lower mirror'],'answerIndex':0,'explanation':'The upper mirror reflects light downwards and the lower mirror reflects it towards the observer. Both reflections are needed.'},
{'question':'Dalam periskop, cahaya masuk di A, mengenai cermin satah atas kemudian cermin satah bawah sebelum sampai ke B. Proses manakah membolehkan objek terlindung dilihat?', 'options':['Pantulan pada kedua-dua cermin mengubah arah cahaya ke pemerhati','Pembiasan pada kedua-dua cermin mengubah arah cahaya ke pemerhati','Pantulan pada cermin atas dan penyerapan pada cermin bawah','Penyerapan pada cermin atas dan pantulan pada cermin bawah'],'answerIndex':0,'explanation':'Cermin atas memantulkan cahaya ke bawah dan cermin bawah memantulkannya ke arah pemerhati. Kedua-dua pantulan diperlukan.'},'REWRITE')
options(8,27,'Replace sound, rising floor and complete absorption distractors with optical alternatives.',
'Refraction at the water-air boundary changes the apparent position of the floor|Reflection at the water-air boundary raises the actual position of the floor|Dispersion separates the floor image into seven colours|Scattering changes the actual depth of the water',
'Pembiasan pada sempadan air-udara mengubah kedudukan ketara dasar|Pantulan pada sempadan air-udara menaikkan kedudukan sebenar dasar|Penyebaran memisahkan imej dasar kepada tujuh warna|Penyerakan mengubah kedalaman sebenar air',0)
change(8,29,'Replace recall-level Hard with comparing blue-sky and sunset observations without wavelength theory.',
{'question':'The sky appears blue at midday, but sunlight appears red-orange near sunset. Which comparison explains both observations?', 'options':['Blue light is scattered more; red-orange light is scattered less and remains in the direct sunset path','Blue light is scattered less; red-orange light is scattered more and remains in the direct sunset path','All colours scatter equally; the Sun changes the colours it produces','Air acts only as a prism at midday and only as a plane mirror at sunset'],'answerIndex':0,'explanation':'Blue light is scattered strongly by air particles. At sunset, much blue light is scattered out of the direct path, while less-scattered red and orange light reaches the observer.'},
{'question':'Langit kelihatan biru pada tengah hari, tetapi cahaya matahari kelihatan merah-jingga pada senja. Perbandingan manakah menerangkan kedua-dua pemerhatian?', 'options':['Cahaya biru lebih banyak diserak; cahaya merah-jingga kurang diserak dan kekal dalam lintasan terus ketika senja','Cahaya biru kurang diserak; cahaya merah-jingga lebih banyak diserak dan kekal dalam lintasan terus ketika senja','Semua warna diserak sama banyak; Matahari mengubah warna yang dihasilkannya','Udara bertindak hanya sebagai prisma pada tengah hari dan hanya sebagai cermin satah pada senja'],'answerIndex':0,'explanation':'Cahaya biru banyak diserak oleh zarah udara. Pada senja, banyak cahaya biru diserak keluar daripada lintasan terus, manakala cahaya merah dan jingga yang kurang diserak sampai kepada pemerhati.'},'REWRITE')
difficulty(8,[22,23,24,28],'Easy')
difficulty(8,[27,30],'Medium')

change(9,27,'Replace implausible future-earthquake claims with limits of fossil evidence.',
{'question':'Fossils of a type of organism are found in old rocks, but no living examples are known today. Which conclusion is supported without going beyond this evidence?', 'options':['The organism existed in the past and may now be extinct','The organism first appeared only after the rocks formed','The fossils prove that the organism still lives in the same place','The fossils determine the exact date of the next earthquake'],'answerIndex':0,'explanation':'Fossils record past life and can provide information about species that have disappeared. They do not establish that the organism still lives today.'},
{'question':'Fosil sejenis organisma dijumpai dalam batuan lama, tetapi tiada contoh hidup diketahui hari ini. Kesimpulan manakah disokong tanpa melampaui bukti ini?', 'options':['Organisma itu pernah wujud dan mungkin kini telah pupus','Organisma itu mula wujud hanya selepas batuan terbentuk','Fosil membuktikan organisma itu masih hidup di tempat yang sama','Fosil menentukan tarikh tepat gempa bumi seterusnya'],'answerIndex':0,'explanation':'Fosil merekodkan hidupan lampau dan boleh memberikan maklumat tentang spesies yang telah hilang. Fosil tidak membuktikan organisma itu masih hidup hari ini.'},'REWRITE')
change(9,28,'Elastic rebound/seismic-wave detail exceeds the inspected chapter; interpret plate motion and cause instead.',
{'question':'Arrows show two crustal plates moving towards each other. Which explanation links this motion to an internal Earth process?', 'options':['Heat-driven mantle convection can move the plates towards a collision','River transport deposits sediment and directly drives both plates','Surface weathering pulls the plates together by breaking rocks','Ocean waves move the entire crust towards the boundary'],'answerIndex':0,'explanation':'Mantle convection can move the Earth’s crust. Plates can converge or diverge, changing the Earth’s surface; this is an endogenic process.','difficulty':'Medium'},
{'question':'Anak panah menunjukkan dua plat kerak bergerak ke arah satu sama lain. Penjelasan manakah menghubungkan gerakan ini dengan proses dalaman Bumi?', 'options':['Arus perolakan mantel akibat haba boleh menggerakkan plat ke arah pertembungan','Angkutan sungai mengenapkan sedimen dan menggerakkan kedua-dua plat secara langsung','Luluhawa permukaan menarik plat bersama dengan memecahkan batuan','Ombak laut menggerakkan seluruh kerak ke arah sempadan'],'answerIndex':0,'explanation':'Arus perolakan mantel boleh menggerakkan kerak Bumi. Plat boleh bertembung atau mencapah, mengubah permukaan Bumi; ini ialah proses endogen.','difficulty':'Medium'},'REWRITE')
change(9,30,'Remove unexplained NTU units; keep evidence-based upstream/downstream reasoning.',
{'question':'After rain during a mining trial, downstream river water becomes much muddier while upstream water stays clear. Which recommendation best addresses the evidence before mining expands?'},
{'question':'Selepas hujan semasa percubaan perlombongan, air sungai hilir menjadi jauh lebih keruh manakala air hulu kekal jernih. Cadangan manakah paling baik menangani bukti ini sebelum perlombongan diperluas?'})
difficulty(9,[16,18,19,20,21,22,24,25],'Easy')
difficulty(9,[26,29],'Medium')

options(1,3,'Replace deliberately mismatched field/example pairs with related field alternatives.',
'Biology — helping solve daily-life problems|Physics — helping solve daily-life problems|Chemistry — helping solve daily-life problems|Geology — helping solve daily-life problems',
'Biologi — membantu menyelesaikan masalah kehidupan harian|Fizik — membantu menyelesaikan masalah kehidupan harian|Kimia — membantu menyelesaikan masalah kehidupan harian|Geologi — membantu menyelesaikan masalah kehidupan harian')
options(1,5,'Balance option lengths while retaining the independently tested correct answer.',
'P floats and Q sinks because P is less dense and Q is more dense than water|Both float because their masses, rather than their densities, are less than 20 g|Both sink because being solid, rather than relative density, determines sinking|P sinks and Q floats because a larger volume always means a greater density',
'P terapung dan Q tenggelam kerana P kurang tumpat dan Q lebih tumpat daripada air|Kedua-duanya terapung kerana jisimnya, bukan ketumpatannya, kurang daripada 20 g|Kedua-duanya tenggelam kerana keadaan pepejal, bukan ketumpatan relatif, menentukan tenggelam|P tenggelam dan Q terapung kerana isi padu lebih besar sentiasa bermaksud ketumpatan lebih besar')
options(1,14,'Replace brand-name distraction with plausible but invalid unit comparisons.',
'Compare the numbers directly because both laboratories measured mass|State the units and convert both masses to the same standard unit, such as kilogram|Write kilogram after both numbers without checking the original units|Divide the larger number by 1000 without finding its original unit',
'Bandingkan nombor terus kerana kedua-dua makmal mengukur jisim|Nyatakan unit dan tukarkan kedua-dua jisim kepada unit piawai yang sama, seperti kilogram|Tulis kilogram selepas kedua-dua nombor tanpa menyemak unit asal|Bahagi nombor lebih besar dengan 1000 tanpa mengetahui unit asalnya')
decisions['9:27']['dlp']['options'][3]='The fossils prove that the local environment has never changed'
decisions['9:27']['bm']['options'][3]='Fosil membuktikan persekitaran setempat tidak pernah berubah'

# Balance the stored Chapter 9 key as well as preserving the existing runtime shuffle.
# Use one fixed non-cyclic permutation for both languages, never a runtime mutation.
import random
rng=random.Random(91015)
positions=[i%4 for i in range(30)];rng.shuffle(positions)
for n,target in enumerate(positions,1):
    key=f'9:{n}'
    if key not in decisions:change(9,n,'All original Chapter 9 keys occupied A; rebalance stored positions.',{}, {})
    for lang in ['bm','dlp']:
        base=next(b for b in baseline if b['chapter']==9 and b['lang']==lang)['questions'][n-1]
        opts=decisions[key][lang].get('options',base['options']).copy()
        answer=opts.pop(decisions[key][lang].get('answerIndex',base['answerIndex']))
        opts.insert(target,answer)
        decisions[key][lang]['options']=opts
        decisions[key][lang]['answerIndex']=target

def apply():
    for key,d in decisions.items():
        c,n=map(int,key.split(':'))
        for lang in ['bm','dlp']:
            path=Path(f'src/content/form1/science/chapter-{c}/quizzes-{lang}.ts') if c>2 else Path('src/data/quizzes.ts')
            text=path.read_text(encoding='utf-8')
            pattern=r'  \{\s*id: "sci-f1-c'+str(c)+'-'+lang+'-q'+str(n)+r'",.*?\n  \},'
            match=re.search(pattern,text,re.S)
            assert match,key
            block=match.group()
            for field,value in d[lang].items():
                val=json.dumps(value,ensure_ascii=False)
                if field=='options':pat=r'options: \[.*?\],'
                elif field=='answerIndex':pat=r'answerIndex: \d+,'
                else:pat=field+r': "(?:[^"\\]|\\.)*",'
                block,count=re.subn(pat,lambda m:f'{field}: {val},',block,flags=re.S)
                assert count==1,(key,field)
            text=text[:match.start()]+block+text[match.end():]
            path.write_text(text,encoding='utf-8',newline='\n')
    Path(os.environ['TEMP'],'science-f1-pr65-decisions.json').write_text(json.dumps(decisions,ensure_ascii=False,indent=2),encoding='utf-8')

if __name__=='__main__':apply()
