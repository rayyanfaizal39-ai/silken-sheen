import fs from 'node:fs';
import ts from 'typescript';
const file='src/content/form1/science/chapter-8/chapter8-content.ts';
let text=fs.readFileSync(file,'utf8');
const data=JSON.parse(fs.readFileSync('tmp/pdfs/ch8p4/baseline.json','utf8'));
const enD={
 definition:'White light consists of seven different colours. Each component of colour travels at a different speed in a medium.',
 spectrumOrder:['Red','Orange','Yellow','Green','Blue','Indigo','Violet'],
 speedFact:'Red light has the highest speed. Therefore, red light is refracted the least. Violet light has the lowest speed and is refracted the most.',
 prismBehaviour:['When a beam of white light is directed towards a prism, the white light is split into different colour components. The different colours bend towards the normal at different angles when entering the prism.','Light leaving the glass prism bends away from the normal. The light is dispersed into seven colours in a particular order known as a spectrum.'],
 rainbowFormation:'When sunlight enters rain droplets in the sky, white light is refracted and dispersed into seven different colours known as a rainbow.',
 inquiry:'What will happen if a second prism is placed upside down behind the first prism?',
 labels:{prism:'Glass prism',white:'White light',normal:'Normal',screen:'White screen',spectrum:'Spectrum',sun:'Sunlight',droplet:'Water droplet',rainbow:'Formation of a rainbow',rayBox:'Ray box',basin:'Basin',water:'Water',mirror:'Plane mirror',torch:'Torchlight',card:'Black cardboard with a small hole',paper:'White paper',tape:'Cellophane tape',instructions:'Instructions',apparatus:'Materials and apparatus'},
 activity:{title:'Activity 8.7',aim:'To study the dispersion of light through a glass prism and the formation of a rainbow',apparatus:['Glass prism','White screen','Ray box','Plane mirror','Water','Torchlight','A piece of white paper','Basin','Cellophane tape','Round black cardboard'],parts:[{id:'I',title:'Dispersion of light by a glass prism',steps:['Carry out this activity in a dark room.','Direct a narrow beam of light from a ray box towards a glass prism. Adjust the glass prism until a sharp spectrum is formed on the white screen.','Identify the colours produced in the spectrum.','Observe the order of the colours on the white screen.','Record your observation.']},{id:'II',title:'Formation of a rainbow',steps:['Fill a basin halfway with water.','Place a plane mirror in the water, inclined against the side of the basin. Fix the mirror with cellophane tape.','Make a small hole in the middle of a round black cardboard. Then, attach the black cardboard to the front of the torchlight with cellophane tape.','Shine the torchlight towards the mirror.','Hold a piece of white paper beside the mirror. Adjust the position of the torchlight until you can see a rainbow.']}]},
 practice:{title:'Formative Practice 8.5',questions:['List in order the seven colours formed on the screen in the diagram.','State the colour component that is refracted the most and the least in the phenomenon above. Relate this phenomenon to the speed of each colour component.']}
};
const bmD={
 definition:'Cahaya putih terdiri daripada tujuh warna yang berlainan. Setiap juzuk warna ini akan bergerak dengan kelajuan yang berlainan dalam sesuatu medium.',
 spectrumOrder:['Merah','Jingga','Kuning','Hijau','Biru','Indigo','Ungu'],
 speedFact:'Cahaya merah mempunyai kelajuan yang paling tinggi. Oleh itu, cahaya merah paling kurang dibiaskan. Cahaya ungu pula mempunyai kelajuan yang paling rendah dan paling banyak dibiaskan.',
 prismBehaviour:['Apabila alur cahaya putih ditujukan ke arah prisma, sinar cahaya putih itu akan dipecahkan kepada komponen warna yang berbeza. Hal ini disebabkan oleh warna yang berbeza dalam cahaya putih itu membengkok ke arah mendekati garis normal pada sudut yang berlainan apabila memasuki prisma.','Cahaya yang keluar daripada prisma kaca menjauhi garis normal. Cahaya yang keluar dari prisma telah disebarkan kepada tujuh warna dalam tertib susunan tertentu yang dikenal sebagai spektrum.'],
 rainbowFormation:'Apabila sinar matahari mengenai titisan air hujan di langit, maka cahaya putih akan dibiaskan dan disebarkan kepada tujuh warna yang berlainan yang dikenal sebagai pelangi.',
 inquiry:'Apakah yang akan terjadi jika prisma kedua diletakkan terbalik di belakang prisma pertama?',
 labels:{prism:'Prisma kaca',white:'Cahaya putih',normal:'Garis normal',screen:'Skrin putih',spectrum:'Spektrum',sun:'Cahaya matahari',droplet:'Titisan air',rainbow:'Pembentukan pelangi',rayBox:'Kotak sinar',basin:'Besen',water:'Air',mirror:'Cermin',torch:'Lampu suluh',card:'Kadbod hitam dengan lubang kecil',paper:'Kertas putih',tape:'Pita selofan',instructions:'Arahan',apparatus:'Bahan dan radas'},
 activity:{title:'Aktiviti 8.7',aim:'Mengkaji penyebaran cahaya melalui prisma kaca dan pembentukan pelangi',apparatus:['Prisma kaca','Skrin putih','Kotak sinar','Cermin','Gelas kaca'],parts:[{id:'A',title:'Penyebaran cahaya oleh prisma kaca',steps:['Lakukan aktiviti ini dalam keadaan gelap.','Tujukan alur cahaya yang sempit dari kotak sinar ke arah prisma kaca. Putarkan prisma kaca secara perlahan-lahan sehingga suatu spektrum warna yang tajam terbentuk pada skrin putih.','Kenal pasti warna-warna yang terhasil dalam spektrum tersebut.','Perhatikan tertib susunan warna yang kelihatan pada skrin putih.','Rekodkan pemerhatian anda.']},{id:'B',title:'Pembentukan pelangi',steps:['Isi air ke dalam sebuah besen sehingga separuh penuh.','Masukkan sekeping cermin ke dalam air dengan keadaan condong pada sisi besen. Lekatkan cermin itu dengan pita selofan.','Buat satu lubang kecil di tengah-tengah kadbod hitam. Kemudian, lekatkan kadbod hitam itu pada bahagian hadapan lampu suluh dengan pita selofan.','Tujukan lampu suluh ke arah cermin itu.','Pegang sekeping kertas putih di tepi cermin. Laraskan kedudukan lampu suluh sehingga anda dapat melihat pelangi.']}]},
 practice:{title:'Praktis Formatif 8.5',questions:['Senaraikan mengikut urutan tujuh warna yang terbentuk pada skrin dalam rajah mengikut urutan.','Nyatakan komponen warna yang terbias paling banyak dan paling sedikit dalam fenomena di atas. Kaitkan fenomena ini dengan kelajuan setiap komponen warna tersebut.']}
};
const enS={
 definition:'Scattering of light occurs when light is reflected in all directions by clouds or particles in the air.',
 middayExplanation:'During midday, blue light is scattered the most in all directions by the tiny particles in the atmosphere. Therefore, the sky looks blue during midday.',
 sunsetExplanation:'During sunset, sunlight shines horizontally. Red and orange light are scattered less and reach your eyes, while blue light is scattered away from the original path. Therefore, the sky looks reddish during sunset.',
 labels:{midday:'During midday',sunset:'During sunset',sun:'Sun',earth:'Earth',observer:'Observer',particles:'Air particles and dust',blue:'Blue light is scattered by particles suspended in the air',red:'Light from the Sun appears reddish',atmosphere:'Atmosphere',side:'Side of the beaker',screen:'White screen',rayBox:'Ray box',water:'Water',milk:'Milk powder',beaker:'1000 ml glass beaker',instructions:'Instructions',apparatus:'Materials and apparatus',questions:'Questions'},
 activity:{title:'Activity 8.8',aim:'To study the scattering of light',apparatus:['Milk powder','1000 ml glass beaker','Ray box','White screen'],steps:['Carry out the activity in a dark room.','Set up the apparatus as shown in Figure 8.23.','Turn on the ray box.','Add a few tablespoons of milk powder into the water. Stir the water until you can clearly see the beam of light shining through the liquid.','Look at the beam of light from the side of the beaker. Then, look at the white screen as shown in Figure 8.23.','Add more milk powder and observe the colour change of the beam of white light from the side of the beaker and on the white screen.','Record your observations.'],questions:['What is the function of adding milk powder into the water?','What is the difference between the beam of light as seen from the side of the beaker and the beam of light on the screen? Explain your answer.']},
 practice:{title:'Formative Practice 8.6',questions:['Why does scattering of light occur?','Fill in the blanks with the correct words.'],comparisons:['Blue light is scattered ______ compared to red light.','Red light is scattered ______ compared to blue light.']}
};
const bmS={
 definition:'Penyerakan cahaya berlaku apabila sinar cahaya dihalang dan dipantulkan ke semua arah oleh awan atau zarah-zarah dalam udara.',
 middayExplanation:'Pada waktu tengah hari, cahaya biru diserak paling banyak ke semua arah oleh molekul-molekul udara yang halus dalam atmosfera. Oleh itu, langit kelihatan biru pada waktu tengah hari.',
 sunsetExplanation:'Pada waktu senja pula, cahaya matahari bersinar secara mengufuk. Cahaya yang paling kurang diserak seperti merah dan jingga akan melalui atmosfera tanpa gangguan. Cahaya lain seperti cahaya biru yang banyak diserak akan hilang daripada lintasan cahaya asal. Oleh itu, langit pada waktu senja kelihatan kemerahan.',
 labels:{midday:'Pada waktu tengah hari',sunset:'Pada waktu senja',sun:'Matahari',earth:'Bumi',observer:'Pemerhati',particles:'Zarah udara, habuk dan debu',blue:'Cahaya biru diserak oleh zarah-zarah yang terapung di udara',red:'Cahaya daripada matahari muncul kemerahan',atmosphere:'Atmosfera',side:'Sisi bekas',screen:'Skrin putih',rayBox:'Kotak sinar',water:'Air',milk:'Serbuk susu',beaker:'Bikar kaca 1000 ml',instructions:'Arahan',apparatus:'Bahan dan radas',questions:'Soalan'},
 activity:{title:'Aktiviti 8.8',aim:'Mengkaji penyerakan cahaya',apparatus:['Serbuk susu','Bikar kaca 1000 ml','Kotak sinar','Skrin putih'],steps:['Lakukan aktiviti dalam keadaan gelap.','Sediakan susunan radas seperti yang ditunjukkan dalam Rajah 8.23.','Hidupkan kotak sinar.','Tambahkan beberapa sudu serbuk susu ke dalam air. Kacau air sehingga anda dapat melihat alur cahaya yang bersinar melalui cecair dengan jelas.','Lihat alur cahaya dari sisi bekas. Kemudian, lihat pada skrin putih seperti yang ditunjukkan dalam Rajah 8.23.','Tambahkan lagi serbuk susu dan perhatikan warna alur cahaya putih berubah dari sisi bekas dan pada skrin putih.','Rekodkan pemerhatian anda.'],questions:['Apakah fungsi penambahan serbuk susu ke dalam air?','Apakah perbezaan antara alur cahaya yang dilihat dari sisi bekas dengan di belakang bekas? Apakah yang telah berlaku?']},
 practice:{title:'Praktis Formatif 8.6',questions:['Mengapakah penyerakan cahaya berlaku?','Isi tempat kosong dengan perkataan yang betul.'],comparisons:['Cahaya biru ______ diserak berbanding dengan cahaya merah.','Cahaya merah ______ diserak berbanding dengan cahaya biru.']}
};
// Change only the named property initializer spans; all locked data is untouched.
const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true);
const edits=[];
function visit(n){
 if(ts.isVariableDeclaration(n)&&['en','bm','supplementEn','supplementBm'].includes(n.name.getText(ast))&&n.initializer&&ts.isObjectLiteralExpression(n.initializer)){
  const name=n.name.getText(ast), bm=name.startsWith('bm');
  for(const p of n.initializer.properties){
   const key=p.name?.getText(ast);
   if(['en','bm'].includes(name)&&['dispersion','scattering'].includes(key)) edits.push([p.initializer.getStart(ast),p.initializer.end,JSON.stringify(key==='dispersion'?(bm?bmD:enD):(bm?bmS:enS),null,2)]);
   if(name.startsWith('supplement')&&['dispersionExperiments','scatteringExperiment'].includes(key)){let end=p.end; if(text[end]===',')end++;edits.push([p.getFullStart(),end,'']);}
  }
 }
 ts.forEachChild(n,visit);
}
visit(ast);
if(edits.length!==8)throw Error('Unexpected edits '+edits.length);
for(const [a,b,v] of edits.sort((a,b)=>b[0]-a[0]))text=text.slice(0,a)+v+text.slice(b);
text=text.replace(/  dispersion: \{[\s\S]*?  colorAdditionSubtraction:/,'  dispersion: DispersionLesson;\n  scattering: ScatteringLesson;\n  colorAdditionSubtraction:');
text=text.replace('  dispersionExperiments: { part: string; setup: string; result: string }[];','').replace('  scatteringExperiment: string[];','');
text=text.replace('Cahaya putih terserak kepada','Cahaya putih disebarkan kepada').replace('biru, nila, ungu','biru, indigo, ungu').replace('"Serakan cahaya"','"Penyebaran cahaya"').replace('pembiasan, serakan, penyerakan','pembiasan, penyebaran, penyerakan').replace('cara serakan memisahkan','cara penyebaran memisahkan');
const types=`
export interface DispersionLesson {
 definition: string; spectrumOrder: string[]; speedFact: string; prismBehaviour: string[]; rainbowFormation: string; inquiry: string;
 labels: Record<'prism'|'white'|'normal'|'screen'|'spectrum'|'sun'|'droplet'|'rainbow'|'rayBox'|'basin'|'water'|'mirror'|'torch'|'card'|'paper'|'tape'|'instructions'|'apparatus',string>;
 activity: {title:string;aim:string;apparatus:string[];parts:{id:string;title:string;steps:string[]}[]};
 practice:{title:string;questions:string[]};
}
export interface ScatteringLesson {
 definition:string;middayExplanation:string;sunsetExplanation:string;
 labels:Record<'midday'|'sunset'|'sun'|'earth'|'observer'|'particles'|'blue'|'red'|'atmosphere'|'side'|'screen'|'rayBox'|'water'|'milk'|'beaker'|'instructions'|'apparatus'|'questions',string>;
 activity:{title:string;aim:string;apparatus:string[];steps:string[];questions:string[]};
 practice:{title:string;questions:string[];comparisons:string[]};
}
`;
fs.writeFileSync(file,types+text);

