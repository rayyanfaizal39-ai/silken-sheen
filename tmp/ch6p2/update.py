import json
from pathlib import Path
p=Path('src/content/form1/science/chapter-6/chapter6-content.ts')
s=p.read_text(encoding='utf-8')
s=s.replace('export interface SeparationMethod {\n','''export type SeparationMethodId = "filtration" | "distillation" | "magnet" | "sedimentation" | "floatation" | "chromatography" | "sieving";

export interface SeparationMethod {
  id: SeparationMethodId;
  activity?: string;
  materials: string;
  apparatus: { id: string; label: string }[];
  steps: string[];
  observation: string;
  notes: string[];
''')
s=s.replace('    selectionFactors: string[];\n','''    selectionFactors: string[];
    physicalSeparation: string;
    labels: Record<string, string>;
    decision: string[];
    formativePractice: { mixture: string; method: SeparationMethodId }[];
    reasoning: { question: string; answer: string };
''')
ids=['filtration','distillation','magnet','sedimentation','floatation','chromatography','sieving']
labels={
'en':dict(overview='Methods to Separate Mixtures',choose='Choose a separation method',mixture='Mixture',componentA='Component A',componentB='Component B',physical='Mixed physically',separate='Separated physically',selection='The separation method depends on:',method='Separation method',property='Type of mixture / physical properties',example='Example',materials='Materials and apparatus',instruction='Instruction',observation='Observation',practice='Formative Practice 6.2',match='Match the following mixtures according to its suitable separation method.',answer='Answer',correct='Correct',retry='Try again',exploration='Science Exploration',schematic='Schematic / not to scale'),
'bm':dict(overview='Kaedah Pengasingan Campuran',choose='Pilih kaedah pemisahan',mixture='Campuran',componentA='Komponen A',componentB='Komponen B',physical='Bercampur secara fizikal',separate='Diasingkan secara fizikal',selection='Teknik pengasingan campuran bergantung pada:',method='Teknik pengasingan',property='Jenis campuran / sifat-sifat fizik',example='Contoh',materials='Bahan dan radas',instruction='Arahan',observation='Pemerhatian',practice='Praktis Formatif 6.2',match='Padankan jenis-jenis campuran di bawah ini dengan kaedah pengasingan yang sesuai.',answer='Jawapan',correct='Betul',retry='Cuba lagi',exploration='Eksplorasi Sains',schematic='Skema / bukan mengikut skala')}
# Activity facts from printed pp. 178–184; the IDs are presentation mappings only.
def method(i,name,used,example,materials,apparatus,steps,observation,notes=[]):
 d=dict(id=ids[i],name=name,usedFor=used,example=example,materials=materials,apparatus=[dict(id=k,label=v) for k,v in apparatus],steps=steps,observation=observation,notes=notes)
 if i<6:d['activity']=f'6.{i+4}'
 return d
ens=[
method(0,'Filtration','Separating an insoluble solid from a mixture of solid and liquid.','Filter paper separates coffee powder from a coffee drink.',
'Sand, distilled water, filter paper, filter funnel, two 50 ml beakers, spatula, glass rod, retort stand with clamp.',
[('mixture','Mixture of sand and water'),('paper','Filter paper'),('funnel','Filter funnel'),('residue','Residue'),('filtrate','Filtrate'),('rod','Glass rod'),('stand','Retort stand with clamp'),('beaker','50 ml beaker'),('spatula','Spatula')],
['Add two spatulas of sand to 30 ml of water in a beaker. Stir for two minutes.','Filter the mixture.','Record your observation.'],
'Insoluble sand remains as the residue; water passes through as the filtrate.'),
method(1,'Distillation','Separating a completely miscible liquid-liquid mixture with different boiling points.','Separating water and alcohol; producing perfume from rose petals.',
'Mixture of water and alcohol, porcelain chips, thermometer, tripod stand, Bunsen burner, wire gauze, Liebig condenser, retort stand with clamp, round-bottom flask, beaker.',
[('flask','Round-bottom flask'),('mixture','Water + alcohol'),('chips','Porcelain chips'),('thermometer','Thermometer'),('burner','Bunsen burner'),('gauze','Wire gauze'),('tripod','Tripod stand'),('condenser','Liebig condenser'),('in','Water in'),('out','Water out'),('beaker','Beaker'),('stand','Retort stand with clamp')],
['Half-fill the round-bottom flask with water and alcohol. Add porcelain chips. Flow water through the Liebig condenser.','Heat the mixture: the component with the lower boiling point vaporises and enters the condenser.','The vapour cools in the condenser. Collect the liquid in a beaker.'],
'Record the temperature of the liquid. Determine the boiling point of the liquid.'),
method(2,'Separation using magnet','Separating two solids: a magnetic substance and a non-magnetic substance.','Iron nails separated from sand.',
'Mixture of iron and sulphur powder, spatula, Petri dish, magnet bar, paper.',
[('iron','Iron powder'),('sulphur','Sulphur powder'),('dish','Petri dish'),('paper','Paper'),('magnet','Magnet bar'),('spatula','Spatula')],
['Put one spatula of iron powder and sulphur powder into a Petri dish.','Hold a magnet bar near the mixture.','Iron is attracted to the magnet; sulphur remains in the Petri dish.'],
'The substances are mixed physically.',
['Iron, nickel and cobalt are magnetic metals.','Gold, bronze and aluminium are non-magnetic metals.']),
method(3,'Sedimentation','Separating a liquid and an insoluble solid that has a higher density and settles at the base.','Sand deposited at the base of a beaker filled with water.',
'Silty solution, two 100 ml beakers, glass rod.',
[('mixture','Silty solution'),('water','Clear water'),('sediment','Sediment'),('rod','Glass rod'),('beaker','100 ml beaker')],
['Pour 50 ml of silty solution into a 100 ml beaker. Stir using a glass rod.','Observe the water and silt after a while.','Slowly pour the clear water into another beaker. Observe the sediment left inside the beaker.'],
'The insoluble solid settles at the base; clear water is above it.'),
method(4,'Floatation','Floatation method can be used to separate soluble and insoluble materials in water.','Oil floats on water and can be separated using a separating funnel.',
'Mixture of water and oil, beakers, separating funnel, 100 ml measuring cylinder, retort stand with clamp.',
[('oil','Oil'),('water','Water'),('funnel','Separating funnel'),('tap','Tap'),('beaker','Beaker'),('stand','Retort stand with clamp')],
['Pour 100 ml water and oil mixture into a beaker. Record your observation.','Pour the mixture into a separating funnel. Oil is above water.','Separate water and oil using different beakers. Water flows out through the tap.'],
'Oil has a lower density than water. Therefore, oil floats on the water surface.'),
method(5,'Chromatography','Separating small amounts of a mixture by separating the colours in ink.','Checking document fraud by separating ink colours; detecting harmful food colourings.',
'250 ml beaker, distilled water, filter paper, ruler, whiteboard marker pens, skewer.',
[('paper','Filter paper: 5 cm × 12 cm'),('baseline','Pencil line: 1.5 cm from the edge'),('dots','Ink dots'),('water','Distilled water'),('beaker','250 ml beaker'),('skewer','Skewer'),('ruler','Ruler'),('pens','Whiteboard marker pens')],
['Prepare the paper and pencil line. Draw three ink dots. Hang the paper using a skewer. The water must not touch the dots.','The water moves up the paper, separating components of the ink. Observe for 30 minutes.','Record your observation. What are the colours produced on the filter paper?'],
'Is the colour produced the same as the ink of the whiteboard marker pen?',
['Urine samples are tested to detect drug content in the body using chromatography.']),
method(6,'Sieving','Separating impurities from flour by sieving.','Impurities can be removed from flour by the sieving method.',
'Flour and impurities; sieve.',
[('flour','Flour'),('impurities','Impurities'),('sieve','Sieve')],
['Flour and impurities.','Sieve the flour.','Fine flour passes through; larger impurities remain.'],
'Impurities are separated from flour.')]
bms=[
method(0,'Penurasan','Mengasingkan bahan pepejal yang tidak larut daripada cecair di dalam suatu campuran antara cecair dan pepejal.','Kertas turas memisahkan serdak kopi daripada air kopi.',
'Pasir, air suling, kertas turas, corong turas, bikar 50 ml, spatula, rod kaca, kaki retort dan pengapit.',
[('mixture','Campuran pasir dan air'),('paper','Kertas turas'),('funnel','Corong turas'),('residue','Baki turasan'),('filtrate','Hasil turasan'),('rod','Rod kaca'),('stand','Kaki retort dan pengapit'),('beaker','Bikar 50 ml'),('spatula','Spatula')],
['Masukkan 30 ml air dan dua spatula pasir ke dalam sebuah bikar. Kacau selama dua minit.','Turas campuran tersebut.','Catatkan pemerhatian anda.'],
'Pasir yang tidak larut kekal sebagai baki turasan; air melalui kertas turas sebagai hasil turasan.'),
method(1,'Penyulingan','Mengasingkan campuran cecair dan cecair yang terlarut campur dan mempunyai takat didih berbeza.','Memisahkan air dan alkohol; menghasilkan minyak wangi daripada kelopak bunga ros.',
'Campuran air dan alkohol, serpihan porselin, termometer, bikar, tungku kaki tiga, penunu Bunsen, kasa dawai, kondenser Liebig, kaki retort dengan pengapit, kelalang dasar bulat.',
[('flask','Kelalang dasar bulat'),('mixture','Air + alkohol'),('chips','Serpihan porselin'),('thermometer','Termometer'),('burner','Penunu Bunsen'),('gauze','Kasa dawai'),('tripod','Tungku kaki tiga'),('condenser','Kondenser Liebig'),('in','Air masuk'),('out','Air keluar'),('beaker','Bikar'),('stand','Kaki retort dengan pengapit')],
['Isi kelalang dasar bulat sehingga separuh penuh dengan air dan alkohol. Tambahkan serpihan porselin. Alirkan air paip melalui kondenser Liebig.','Panaskan campuran: komponen dengan takat didih lebih rendah menjadi wap dan memasuki kondenser.','Wap menyejuk di dalam kondenser. Kumpulkan cecair menggunakan bikar.'],
'Rekodkan suhu cecair ketika cecair mula keluar dari kondenser. Tentukan takat didih cecair tersebut.'),
method(2,'Pemisahan menggunakan magnet','Mengasingkan dua bahan pepejal yang bersifat bahan magnet dan tidak bersifat bahan magnet.','Paku besi dipisahkan daripada pasir.',
'Campuran serbuk besi dan serbuk sulfur, spatula, piring Petri, magnet bar, kertas.',
[('iron','Serbuk besi'),('sulphur','Serbuk sulfur'),('dish','Piring Petri'),('paper','Kertas'),('magnet','Magnet bar'),('spatula','Spatula')],
['Letakkan satu spatula campuran serbuk besi dan serbuk sulfur ke dalam piring Petri.','Letakkan magnet bar dekat dengan campuran tersebut.','Serbuk besi tertarik pada magnet; serbuk sulfur tertinggal di dalam piring Petri.'],
'Bahan-bahan bercampur secara fizikal.',
['Besi, nikel dan kobalt ialah logam yang bersifat bahan magnet.','Emas, gangsa dan aluminium ialah logam yang tidak bersifat magnet.']),
method(3,'Pengenapan','Mengasingkan campuran cecair dan bahan pepejal yang tidak larut dalam cecair itu dan terenap di dasar.','Pasir tidak larut di dalam air dan mempunyai ketumpatan yang lebih tinggi daripada air.',
'Larutan berkelodak, dua bikar 100 ml, rod kaca.',
[('mixture','Larutan berkelodak'),('water','Air jernih'),('sediment','Kelodak'),('rod','Rod kaca'),('beaker','Bikar 100 ml')],
['Masukkan 50 ml air berkelodak ke dalam bikar 100 ml. Kacau menggunakan rod kaca.','Perhatikan air dan kelodak selepas seketika.','Tuangkan air jernih secara perlahan-lahan ke dalam bikar yang lain. Perhatikan baki yang tertinggal di dasar bikar.'],
'Bahan pepejal yang tidak larut terenap di dasar; air jernih berada di bahagian atas.'),
method(4,'Pengapungan','Kaedah pengapungan boleh digunakan untuk mengasingkan bahan yang tidak larut dan terapung di atas permukaan air.','Minyak terapung di atas air dan dapat diasingkan menggunakan corong pemisah.',
'Campuran air dan minyak, bikar dan corong pemisah.',
[('oil','Minyak'),('water','Air'),('funnel','Corong pemisah'),('tap','Pili'),('beaker','Bikar'),('stand','Kaki retort dan pengapit')],
['Tuang 100 ml campuran air dan minyak ke dalam sebuah bikar. Catatkan pemerhatian.','Masukkan campuran ke dalam corong pemisah. Minyak berada di atas air.','Asingkan air dan minyak menggunakan bikar yang berbeza. Air mengalir keluar melalui pili.'],
'Minyak mempunyai ketumpatan yang lebih rendah daripada air. Oleh itu, minyak terapung di atas permukaan air.'),
method(5,'Kromatografi','Mengasingkan jumlah campuran yang sedikit dengan mengasingkan pewarna-pewarna dalam dakwat pen.','Memeriksa pemalsuan dokumen dengan mengasingkan pewarna dakwat; memeriksa bahan pewarna makanan yang berbahaya.',
'Bikar 250 ml, air suling, kertas turas, pembaris, pen penanda papan putih; lidi ditunjukkan dalam Rajah 6.27.',
[('paper','Kertas turas: 5 cm × 12 cm'),('baseline','Garis pensel: 1.5 cm dari tepi kertas'),('dots','Titik-titik dakwat'),('water','Air suling'),('beaker','Bikar 250 ml'),('skewer','Lidi'),('ruler','Pembaris'),('pens','Pen penanda papan putih')],
['Sediakan kertas dan garis pensel. Buat tiga titik dakwat. Gantungkan kertas menggunakan lidi. Pastikan air suling tidak terkena pada titik-titik dakwat.','Air bergerak ke atas kertas, mengasingkan komponen dakwat. Perhatikan selama 30 minit.','Rekodkan pemerhatian anda. Apakah warna yang terhasil pada kertas turas?'],
'Adakah warna-warna yang terhasil sama pada setiap dakwat pen yang digunakan?',
['Sampel air kencing diuji untuk mengesan kandungan dadah dalam badan dengan menggunakan kaedah kromatografi.']),
method(6,'Penapisan','Mengasingkan bahan bendasing daripada tepung dengan mengayak tepung.','Bahan bendasing dapat diasingkan daripada tepung dengan mengayak tepung.',
'Tepung dan bahan bendasing; pengayak.',
[('flour','Tepung'),('impurities','Bahan bendasing'),('sieve','Pengayak')],
['Tepung dan bahan bendasing.','Ayak tepung.','Tepung halus melalui pengayak; bahan bendasing yang lebih besar tertinggal.'],
'Bahan bendasing diasingkan daripada tepung.')]
for lang,methods in [('en',ens),('bm',bms)]:
 bm=lang=='bm'
 data=dict(definition='Campuran terdiri daripada dua atau lebih unsur atau sebatian yang bercampur secara fizikal.' if bm else 'A mixture consists of two or more elements or compounds mixed physically.',examples=['Koktel (pepejal dan cecair)','Air batu campur (pepejal dan cecair)','Salad','Sandwic'] if bm else ['Cocktail (solid and liquid)','Air batu campur (solid and liquid)','Salad','Sandwich'],physicalSeparation='Disebabkan campuran terbentuk secara fizikal, campuran juga dapat diasingkan secara fizikal.' if bm else 'As the mixture is formed physically, it can be separated physically too.',labels=labels[lang],separationMethods=methods,
 selectionFactors=['Sifat-sifat fizik dan keadaan jirim bahan-bahan yang terkandung dalam campuran','Bahan yang hendak diperoleh daripada campuran tersebut'] if bm else ['Physical properties of the substances present in the mixture','Substance(s) to be obtained from the mixture'],
 decision=['Bahan-bahan dalam campuran','Sifat-sifat fizik dan keadaan jirim','Bahan yang hendak diperoleh','Pilih kaedah pemisahan'] if bm else ['Substances in the mixture','Physical properties and states of matter','Substance(s) to be obtained','Choose a separation method'],
 formativePractice=[dict(mixture=m,method=mid) for m,mid in zip(['Klip kertas besi dan serpihan kaca','Air dan etanol','Tiga jenis pewarna yang larut air','Tanah dan air','Minyak dan air','Serbuk kopi dan air'] if bm else ['Paper clips and glass fragments','Water and ethanol','Three types of water-soluble ink','Soil and water','Oil and water','Coffee powder and water'],['magnet','distillation','chromatography','sedimentation','floatation','filtration'])],
 reasoning=dict(question='Jika anda diberi suatu campuran yang mengandungi beras dan pasir, bolehkah anda mengasingkan kedua-duanya dengan menggunakan kaedah penurasan? Mengapa?' if bm else 'If you were given a mixture that contains rice and sand, can you separate them using filtration method? Why?',answer='Tidak. Beras dan pasir ialah pepejal. Penurasan mengasingkan bahan pepejal yang tidak larut daripada cecair.' if bm else 'No. Rice and sand are both solids. Filtration separates an insoluble solid from a liquid.'))
 start=s.index('  mixtures: {',s.index(f'const {lang}: Chapter6Content'))
 end=s.index('  compounds: {',start)
 s=s[:start]+'  mixtures: '+json.dumps(data,ensure_ascii=False,indent=2)+',\n'+s[end:]
p.write_text(s,encoding='utf-8')
