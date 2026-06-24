import type { ScienceChapter2Notes } from "@/data/content";

export const scienceF2C3NotesDLP: ScienceChapter2Notes = {
  chapterSummary:
    "Chapter 3 explains the seven classes of food (carbohydrate, protein, fat, vitamin, mineral, fibre and water) together with their functions, sources and deficiency effects; food tests used to detect starch, sugar, protein and fat; the importance of a balanced diet based on the Malaysian Food Pyramid and the factors that influence a person's calorific requirement (state of health, climate, work, gender, body size, age); the calorific value of food and Body Mass Index (BMI); the human digestive system from mouth to anus, including physical versus chemical digestion and digestive enzymes; the process of absorption of digested food through villi, assimilation of the end products of digestion, and defecation; and healthy eating practices based on the National Health and Morbidity Survey (NHMS) 2016 statistics.",
  quickRevision: [
    "Food is divided into 7 main classes: carbohydrate, protein, fat, vitamin, mineral, fibre and water.",
    "Carbohydrate and protein supply 17 kJ/g (4 kcal/g); fat supplies 37 kJ/g (9 kcal/g) — fat supplies roughly TWICE the energy of carbohydrate/protein per gram.",
    "Food tests: iodine test (starch → blue-black), Benedict's test (reducing sugar → green/yellow/brick-red precipitate), Millon's test (protein → brick-red), alcohol-emulsion test (fat → cloudy/milky white emulsion).",
    "A balanced diet contains all food classes in the right quantities required by the body, guided by the Malaysian Food Pyramid.",
    "Factors affecting calorific requirement: state of health, climate, work, gender, body size, age.",
    "BMI = Mass (kg) ÷ [Height (m) × Height (m)] — used to evaluate/classify a person's body mass status.",
    "Digestive tract order: Mouth → Oesophagus → Stomach → Duodenum → Small intestine → Large intestine → Rectum → Anus.",
    "Key enzymes: amylase (starch→maltose), protease (protein→polypeptide→dipeptide), maltase (maltose→glucose), small intestine protease (dipeptide→amino acid), lipase (fat→fatty acid+glycerol).",
    "Villi in the small intestine wall increase surface area for absorption of digested food into the blood circulatory system.",
    "Assimilation is the process of distributing the end products of digestion for use by body cells; defecation is the process of eliminating faeces from the body through the anus.",
    "NHMS 2016: 17.5% diabetes, 30% high blood pressure, 47% high cholesterol, 17% obesity, 40% overweight — showing improper diet/lifestyle among Malaysians.",
  ],
  sections: [
    {
      title: "Chapter Introduction",
      subsections: [
        {
          content:
            "Every human requires energy to carry out daily activities, and this energy is obtained from the food eaten. The energy requirements of each individual differ depending on factors such as age, gender and type of work.\n\nScience Blog: Malaysia's first astronaut, Dato' Dr. Sheikh Muszaphar Shukor, was flown to the International Space Station (ISS) on 10th October 2007. MARDI (Malaysian Agricultural Research and Development Institute) researched food for astronauts in space — salt content in food decreases in space, so research was repeated until appetising, delicious and nutritious space food was produced. The food was sent to Russia for testing before approval, stored in air-tight plastic containers and frozen to avoid spoilage.",
        },
      ],
    },
    {
      title: "3.1 Classes of Food",
      subsections: [
        {
          content:
            "Food is divided into seven main classes: carbohydrate, protein, fat, vitamin, mineral, fibre and water. Each class has a specific function.",
        },
        {
          title: "Carbohydrate",
          content:
            "An organic compound containing carbon, hydrogen and oxygen. A staple for humans because it supplies a lot of energy.",
          bulletPoints: [
            "Examples: starch (stored in plants), glycogen (stored in animals), cellulose (forms the cell walls of plants).",
            "Sources: rice, banana, potato, honey, bread, sugar.",
          ],
        },
        {
          title: "Protein",
          content:
            "A food substance containing carbon, hydrogen, oxygen and nitrogen. Digested to its basic unit: amino acid.",
          bulletPoints: [
            "Required for growth, to repair damaged tissues, replace dead cells, and to synthesise enzymes, hormones and antibodies.",
            "Sources: chicken, seafood, egg, nuts, meat, milk.",
            "Deficiency disease: Kwashiorkor — caused by protein deficiency, generally occurs in children aged 1–3 years.",
          ],
        },
        {
          title: "Fat",
          content:
            "Contains carbon, hydrogen and oxygen; formed from glycerol and fatty acid. A high energy source/storage — each gram of fat supplies TWICE the total energy supplied by carbohydrate.",
          bulletPoints: [
            "Protects body organs (heart, kidneys); acts as a transporter for vitamins A, D, E and K.",
            "Excess fat is stored under the skin as a heat insulator to regulate body temperature.",
            "Sources: butter, coconut oil, palm oil, fruits, vegetables, milk, meat, groundnuts.",
            "Note: fat from animals contains higher cholesterol than fat from plants.",
          ],
        },
        {
          title: "Vitamin",
          content:
            "An organic compound that does NOT supply energy, but is needed in small quantities to maintain good health. Classified as water-soluble (Vitamin B and C) and fat-soluble (Vitamin A, D, E and K). Obtained from vegetables, fruits, milk and meat.",
        },
        {
          title: "Table 3.1: Vitamin, Source, Importance and Effects of Deficiency",
          table: {
            headers: ["Vitamin", "Source", "Importance", "Effects of Deficiency"],
            rows: [
              ["A", "Milk, egg yolk, fish oil", "Helps with night vision, maintains skin health", "Night blindness, skin diseases"],
              ["B", "Yeast, liver, eggs", "Maintains nervous system function, formation of red blood cells", "Beri-beri, Anaemia"],
              ["C", "Fruits, vegetables", "Fights diseases, maintains gum/mouth health", "Scurvy (bleeding gums)"],
              ["D", "Butter, eggs, fish oil, also produced through sun exposure", "Helps calcium absorption, strengthens tooth enamel, maintains skin health", "Rickets, toothache, skin diseases"],
              ["E", "Grains, green vegetables", "Maintains reproductive system function", "Sterility, foetus miscarriage"],
              ["K", "Milk, egg yolk, fish oil", "Speeds up blood-clotting", "Prolonged bleeding"],
            ],
          },
        },
        {
          title: "Fibre",
          content:
            "A substance that CANNOT be broken down by the digestive system; comprises cellulose found in plant cell walls. Important to stimulate peristalsis (constriction/relaxation of muscles along the digestive tract e.g. oesophagus, small intestine, large intestine) — eases food movement and prevents constipation.",
          bulletPoints: ["Sources: high-fibre bread, grains, fruits, vegetables."],
        },
        {
          title: "Mineral",
          content:
            "A non-organic substance required by the body; does not supply energy but is needed in small quantities to regulate body processes.",
        },
        {
          title: "Table 3.2: Mineral, Source, Importance and Effects of Deficiency",
          table: {
            headers: ["Mineral", "Source", "Importance", "Effects of Deficiency"],
            rows: [
              ["Calcium", "Milk, anchovies, prawns, green vegetables", "Helps blood-clotting, strengthens bones/teeth", "Rickets, Osteoporosis"],
              ["Sodium", "Salt, meat, eggs", "Maintains nervous system function", "Muscle cramps"],
              ["Iron", "Liver, meat", "Builds haemoglobin in blood", "Anaemia"],
              ["Iodine", "Seafood, fruits", "Helps thyroid gland function", "Goiter"],
              ["Phosphorus", "Cheese, meat, eggs, vegetables", "Strengthens bones/teeth, forms nucleic acid (DNA/RNA)", "Rickets, brittle teeth, cannot build DNA/RNA"],
              ["Potassium", "Plants and animals", "Helps muscle contraction, maintains nervous system function", "Paralysis, muscle cramps"],
            ],
          },
        },
        {
          title: "Water",
          content:
            "A compound very important to the body, contains hydrogen and oxygen. Acts as a chemical solvent and transportation medium for nutrients and oxygen into cells; transports waste (urea, salt) out of cells; regulates body temperature through evaporation of sweat.",
          bulletPoints: [
            "Recommendation: drink at least 2 litres of water a day.",
            "Sources: fruit juice, watermelon, plain water.",
          ],
        },
        {
          title: "Food Tests",
          content: "Laboratory tests used to identify the presence of specific food classes in a sample.",
          table: {
            headers: ["Test", "Food Class", "Method", "Positive Result"],
            rows: [
              ["Iodine test", "Starch", "Add iodine solution to the sample", "Colour changes to blue-black"],
              ["Benedict's test", "Glucose/reducing sugars", "Add Benedict's solution and heat in a water bath", "Colour changes from blue to green/yellow/brick-red precipitate (depending on sugar concentration)"],
              ["Millon's test", "Protein", "Add Millon's reagent and heat in a water bath", "Brick-red precipitate/colour"],
              ["Alcohol-emulsion test", "Fat", "Mix sample with ethanol, then add to water", "Cloudy/milky white emulsion forms"],
            ],
          },
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "7 classes of food: carbohydrate, protein, fat, vitamin, mineral, fibre, water.",
            "Fat supplies 2× the energy of carbohydrate/protein per gram.",
            "Kwashiorkor (protein deficiency) — children aged 1–3 years.",
            "Water-soluble vitamins: B, C. Fat-soluble vitamins: A, D, E, K.",
            "4 food tests: Iodine (starch→blue-black), Benedict's (sugar→green/yellow/brick-red), Millon's (protein→brick-red), Alcohol-emulsion (fat→cloudy white emulsion).",
          ],
        },
        {
          title: "🎯 Exam Tip",
          bulletPoints: [
            "Memorise Table 3.1 and 3.2 well — structured questions often give a deficiency symptom (e.g. night blindness) and ask for the related vitamin/mineral.",
            "Ethanol is flammable — safety precaution: keep away from fire; that is why heating in Benedict's/Millon's tests is done in a water bath, not a direct flame.",
          ],
        },
        {
          title: "⚠️ Common Student Mistake",
          bulletPoints: [
            "Thinking vitamins and minerals supply energy — actually BOTH do NOT supply energy, they are only needed in small quantities to regulate body processes.",
            "Confusing Benedict's test (for sugar) with Millon's test (for protein) — Benedict's requires heating and changes from blue to green/yellow/brick-red; Millon's directly produces a brick-red precipitate.",
          ],
        },
      ],
    },
    {
      title: "3.2 Importance of a Balanced Diet",
      subsections: [
        {
          title: "Concept of a Balanced Diet",
          content:
            "A balanced diet is a diet that contains all the food classes in the right quantities required by the body. The Ministry of Health Malaysia prepared the 'Healthy Plate' model as a guide.",
        },
        {
          title: "Malaysian Food Pyramid",
          content: "A guide for a healthy meal, from base (eat most) to tip (eat least).",
          table: {
            headers: ["Food Group", "Recommended Daily Servings"],
            rows: [
              ["Rice, noodles, bread, grains and potatoes", "4–8 servings daily (base/largest group)"],
              ["Vegetables", "3 servings daily"],
              ["Fruits", "2 servings daily"],
              ["Fish, chicken, meat and nuts", "1/2–2 servings of chicken/meat/eggs daily; 1 serving of fish daily; 1/2–1 serving of nuts daily"],
              ["Milk and dairy products", "1–3 servings daily"],
              ["Fat, oil, sugar and salt", "Eat sparingly (tip/smallest group)"],
            ],
          },
        },
        {
          title: "Factors that Influence Calorific Requirement",
          bulletPoints: [
            "State of health: sick/weak people require food suitable to their health condition.",
            "Climate: people in cold climates lose heat quickly and need more food to maintain body temperature, vs people in hot climates.",
            "Work: farmers, labourers, fishermen need more energy due to heavy work vs office workers.",
            "Gender: men are generally more muscular and do more heavy activity, so need bigger food portions than women.",
            "Body size: a person with a larger body frame needs bigger food portions for more energy than someone with a smaller frame.",
            "Age: children and teenagers need more carbohydrate for energy and protein for growth since they are growing and more active than adults.",
          ],
        },
        {
          title: "Calorific Value of Food",
          content:
            "The total amount of energy released when 1g of food is burned completely in the body, measured in calorie (cal) or joule (J).",
          formula: "1 calorie (cal) = 4.2 joule (J); 1 kilocalorie (kcal) = 4.2 kilojoule (kJ)",
          table: {
            headers: ["Food Class", "Energy Value (kJ/g)", "Energy Value (kcal/g)"],
            rows: [
              ["Fat", "37", "9"],
              ["Protein", "17", "4"],
              ["Carbohydrate", "17", "4"],
            ],
          },
        },
        {
          title: "Planning a Balanced Diet",
          content:
            "Factors considered when planning a balanced diet: body frame size, age, work, gender, health condition, climate.",
        },
        {
          title: "Body Mass Index (BMI)",
          content: "A formula that calculates body mass against height, used to evaluate/classify a person's body mass status.",
          formula: "BMI = Mass (kg) ÷ [Height (m) × Height (m)]",
        },
        {
          title: "Healthy Eating Practices",
          content:
            "The National Health and Morbidity Survey (NHMS) 2016 found percentages of Malaysians with: diabetes 17.5%, high blood pressure 30%, high cholesterol 47%, obesity 17%, overweight 40%. This shows improper diet/lifestyle among Malaysians. Only 6% of Malaysian adults eat enough fruits and vegetables, prompting the Ministry of Health's Eat Fruits and Vegetables Campaign.",
          bulletPoints: [
            "Healthy lifestyle practices: eat less sugar, salt, oil and fat; exercise; do not smoke — to reduce risk of diseases such as heart disease, high blood pressure, diabetes, skin cancer, lung cancer.",
            "Obesity is a problem affecting appearance and health regardless of age or background.",
          ],
        },
        {
          title: "Other Nutrition-Related Issues",
          bulletPoints: [
            "Besides obesity, other nutrition-related conditions such as malnutrition (general deficiency of nutrients) can also affect a person's health.",
          ],
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "Food pyramid: base = rice/noodles/bread/grains (4–8 servings), tip = fat/oil/sugar/salt (sparingly).",
            "6 factors affecting calorific requirement: health, climate, work, gender, body size, age.",
            "Energy values: Fat 37 kJ/g (9 kcal/g); Protein & Carbohydrate 17 kJ/g (4 kcal/g) each.",
            "1 cal = 4.2 J; 1 kcal = 4.2 kJ.",
            "BMI = Mass (kg) ÷ [Height (m)]².",
            "NHMS 2016: diabetes 17.5%, high blood pressure 30%, high cholesterol 47%, obesity 17%, overweight 40%.",
          ],
        },
        {
          title: "🎯 Exam Tip",
          bulletPoints: [
            "BMI calculation questions usually give mass (kg) and height (m) — make sure height is SQUARED (m × m) before dividing.",
            "Common KBAT question: 'A labourer working in a hot climate needs more of which food classes?' — link to heavy work (carbohydrate/protein for energy) and sweat loss (water).",
          ],
        },
        {
          title: "⚠️ Common Student Mistake",
          bulletPoints: [
            "Thinking fat supplies the SAME energy as carbohydrate/protein — actually fat (37 kJ/g) supplies roughly TWICE the energy of carbohydrate/protein (17 kJ/g each).",
            "Mixing up the unit conversion — remember 1 cal = 4.2 J (not the other way round).",
          ],
        },
      ],
    },
    {
      title: "3.3 Human Digestive System",
      subsections: [
        {
          title: "Physical (Mechanical) Digestion vs Chemical Digestion",
          table: {
            headers: ["Feature", "Physical (Mechanical) Digestion", "Chemical Digestion"],
            rows: [
              ["Where it happens", "Mouth only", "Mouth, stomach, duodenum and intestine"],
              ["How it happens", "Through physical action (chewing)", "Happens in the digestive tract"],
              ["Involves enzymes?", "Does NOT involve enzymes", "Involves enzymes"],
            ],
          },
        },
        {
          title: "Enzyme",
          content: "An enzyme is a substance in the body that speeds up chemical digestion. Enzymes are made of protein. Without enzymes, digestion happens at a very slow rate. (Side fact: some detergents contain enzymes that help remove stains such as blood and oil.)",
        },
        {
          title: "The Structure of the Human Digestive System",
          content:
            "Comprises the digestive tract (a long tube from mouth to anus) plus accessory organs: liver, gall bladder, pancreas.",
          bulletPoints: [
            "Digestive tract organs in order: Mouth → Oesophagus → Stomach → Duodenum → Small intestine → Large intestine → Rectum → Anus.",
          ],
        },
        {
          title: "The Flow of Food in the Digestive Tract",
          bulletPoints: [
            "Mouth: food chewed by teeth; food particles softened by saliva; salivary amylase in saliva breaks down starch into maltose.",
            "Oesophagus: food entering is called bolus; peristalsis at the oesophagus wall pushes food into the stomach.",
            "Stomach: walls secrete protease and hydrochloric acid; hydrochloric acid activates protease and kills bacteria in food; protease breaks down protein into polypeptides; food becomes semi-liquid called chyme.",
            "Duodenum (first part of small intestine): liver produces bile (stored in gall bladder); bile emulsifies fat into small droplets and neutralises acid in chyme; pancreas produces pancreatic juice containing enzymes amylase, protease and lipase; pancreatic amylase digests starch into maltose; protease digests polypeptides into dipeptides; lipase digests fat into fatty acids and glycerol.",
            "Small intestine: secretes enzymes maltase and protease; maltase digests maltose into glucose; protease digests dipeptides into amino acids.",
            "Large intestine: undigested food enters here; water reabsorption happens here.",
            "Rectum: undigested food (faeces) enters and is stored here.",
            "Anus: faeces excreted from the body through here.",
          ],
        },
        {
          title: "Table: Summary of Digestive Enzymes",
          table: {
            headers: ["Enzyme", "Secreted By", "Substrate → Product"],
            rows: [
              ["Amylase", "Salivary glands and pancreas", "Starch → Maltose"],
              ["Protease", "Stomach", "Protein → Polypeptide"],
              ["Protease", "Pancreas", "Polypeptide → Dipeptide"],
              ["Maltase", "Small intestine", "Maltose → Glucose"],
              ["Protease", "Small intestine", "Dipeptide → Amino acid"],
              ["Lipase", "Pancreas", "Fat → Fatty acid + Glycerol"],
            ],
          },
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "Digestive tract order: Mouth → Oesophagus → Stomach → Duodenum → Small intestine → Large intestine → Rectum → Anus.",
            "Physical digestion: mouth only, no enzymes. Chemical digestion: mouth/stomach/duodenum/intestine, involves enzymes.",
            "Bolus (at the oesophagus) → Chyme (at the stomach, semi-liquid).",
            "Bile (from the liver, stored in the gall bladder) emulsifies fat and neutralises acid in chyme — NOT an enzyme.",
            "Pancreatic enzymes: amylase, protease, lipase (3 types at once).",
          ],
        },
        {
          title: "🎯 Exam Tip",
          bulletPoints: [
            "Structured questions often ask for the full order of digestive organs — memorise the sequence without missing the duodenum (first part of the small intestine, NOT a separate organ).",
            "Be able to distinguish bile (not an enzyme, emulsifies fat) from lipase (an enzyme, digests fat into fatty acids + glycerol) — a common KBAT confusion point.",
          ],
        },
        {
          title: "⚠️ Common Student Mistake",
          bulletPoints: [
            "Thinking bile chemically digests fat — actually bile only EMULSIFIES fat (breaks it into small droplets) and neutralises acid; the actual digestion of fat is done by the enzyme lipase.",
            "Confusing stomach protease (protein→polypeptide), pancreatic protease (polypeptide→dipeptide) and small intestine protease (dipeptide→amino acid) — all three are proteases but act on different substrate stages.",
          ],
        },
      ],
    },
    {
      title: "3.4 Process of Absorption and Transportation of Digested Food and Defecation",
      subsections: [
        {
          title: "Villi",
          content:
            "The wall of the small intestine has millions of fine projections called villi (singular: villus), which increase surface area for absorption of digested food. Digested food (tiny molecules) is easily absorbed into the blood circulatory system through the small intestine walls, then carried to every part of the body.",
        },
        {
          title: "Structural Features for Efficient Absorption",
          bulletPoints: [
            "The small intestine surface has many folds, adding surface area and increasing absorption rate.",
            "The wall of the villus is very thin — one-cell thick — to increase the rate of absorption.",
            "Small-sized nutrients pass through the wall of the small intestine and are transported by the blood (via blood capillaries) to the cells; undigested food that is too large cannot pass through.",
            "The lacteal (within each villus) absorbs digested fat; it transfers fat into the lymphatic system and then into the blood circulatory system.",
            "The function of blood vessels in the small intestine is to transport nutrients to all parts of the body.",
          ],
        },
        {
          title: "Process of Transporting the Products of Digestion",
          content:
            "Assimilation is the process of distributing the end products of digestion for use by the cells of the body. The digestive system breaks down large/complex food particles into small/simple molecules so they can be absorbed into the villi; these are then transported by the blood circulatory system to body cells for: respiration, formation of new cells, regulation of body temperature.",
          bulletPoints: [
            "Glucose is used to produce energy.",
            "Amino acid is used to form components of cells.",
            "Fatty acid and glycerol combine to form fat, used as a heat insulator and to protect internal organs.",
          ],
        },
        {
          title: "Defecation",
          content:
            "Undigested food and unabsorbed material (fibres, waste secretions of the digestive tract, dead cells, water) moves into the large intestine. While passing through the large intestine, water and minerals are reabsorbed into the bloodstream — this makes the unabsorbed/undigested food become solid waste called faeces. Faeces are stored temporarily in the rectum before being eliminated through the anus. The process of eliminating faeces from the body is called defecation.",
        },
        {
          title: "Cooperation of Three Body Systems",
          content:
            "The digestive system, blood circulatory system, and respiratory system all work together to ensure digested food molecules reach body cells.",
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "Villi increase the surface area for absorption; the villus wall is one-cell thick.",
            "The lacteal (in a villus) absorbs fat into the lymphatic system, NOT directly into blood vessels.",
            "Assimilation = distribution of the end products of digestion for use by body cells.",
            "Glucose → energy; Amino acid → cell components; Fatty acid + glycerol → fat (heat insulator, protects organs).",
            "Defecation = the process of removing faeces through the anus; water and minerals are reabsorbed in the large intestine before faeces form.",
          ],
        },
        {
          title: "🎯 Exam Tip",
          bulletPoints: [
            "Common KBAT question: 'Why is a thin villus wall important for absorption?' — answer: it shortens the diffusion distance for nutrients, thereby increasing the RATE of absorption.",
            "Do not confuse 'absorption' (in the small intestine, for nutrients) with 'reabsorption' (in the large intestine, for water and minerals only).",
          ],
        },
        {
          title: "⚠️ Common Student Mistake",
          bulletPoints: [
            "Thinking fat is absorbed directly into blood vessels like glucose and amino acids — actually fat is absorbed via the LACTEAL into the lymphatic system before entering the blood circulatory system.",
            "Confusing assimilation with digestion — digestion breaks food into small molecules; assimilation is the DISTRIBUTION of those end products for use by cells.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Chapter 3 Concept Map",
          content:
            "Nutrition → Food (consists of: Carbohydrate, Protein, Fat, Fibre, Mineral, Water, Vitamin — each with Function and Source) → measured by Calorific value of food (tested via Iodine test, Benedict's test, Millon's test, Alcohol-emulsion test) → Importance of a balanced diet → Food pyramid → Balanced diet influenced by factors: Age, Body size, Climate, State of health, Gender, Type of work → Food digestion via Digestive system (food flow: Mouth → Oesophagus → Stomach → Duodenum → Small intestine → Large intestine → Rectum → Anus) where Carbohydrate is digested to become Glucose, Protein is digested to become Amino acid, Fat is digested to become Fatty acid + Glycerol.",
        },
        {
          title: "Learning Outcomes (Self-Reflection)",
          bulletPoints: [
            "3.1 Classes of Food: Elaborate and communicate on classes of food. Test the presence of starch, glucose, protein and fat in food.",
            "3.2 Importance of a Balanced Diet: Elaborate and communicate on a balanced diet. Estimate calories of food intake in a meal and plan a balanced diet. Conduct research and justify the importance of a balanced diet, exercise and a healthy lifestyle in maintaining a healthy body.",
            "3.3 Human Digestive System: Elaborate and communicate on digestion.",
            "3.4 Process of Absorption and Transportation of Digested Food and Defecation: Conduct an experiment to explain the absorption of the end products of digestion. Relate the function of digestive system, blood circulatory system and respiratory system. Elaborate and communicate on defecation.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "7 classes of food: carbohydrate, protein, fat, vitamin, mineral, fibre, water.",
    "Carbohydrate & protein = 17 kJ/g (4 kcal/g); Fat = 37 kJ/g (9 kcal/g) — fat ≈ 2× energy of carbohydrate/protein.",
    "1 cal = 4.2 J; 1 kcal = 4.2 kJ.",
    "Kwashiorkor (protein deficiency, children aged 1–3). Water-soluble vitamins: B, C; fat-soluble: A, D, E, K.",
    "4 food tests: Iodine (starch→blue-black), Benedict's (sugar→green/yellow/brick-red, needs heating), Millon's (protein→brick-red, needs heating), Alcohol-emulsion (fat→cloudy white emulsion).",
    "Food pyramid: base (rice/noodles/bread/grains, 4–8 servings) to tip (fat/oil/sugar/salt, sparingly).",
    "6 factors affecting calorific requirement: health, climate, work, gender, body size, age.",
    "BMI = Mass (kg) ÷ [Height (m)]².",
    "NHMS 2016: diabetes 17.5%, high blood pressure 30%, high cholesterol 47%, obesity 17%, overweight 40%; only 6% of Malaysian adults eat enough fruits/vegetables.",
    "Digestive tract order: Mouth → Oesophagus → Stomach → Duodenum → Small intestine → Large intestine → Rectum → Anus.",
    "Physical digestion (mouth, no enzymes) vs chemical digestion (mouth/stomach/duodenum/intestine, involves enzymes).",
    "Enzymes: Amylase (starch→maltose, salivary glands & pancreas); Stomach protease (protein→polypeptide); Pancreatic protease (polypeptide→dipeptide); Maltase (maltose→glucose); Small intestine protease (dipeptide→amino acid); Pancreatic lipase (fat→fatty acid+glycerol).",
    "Bile (from liver, stored in gall bladder) emulsifies fat and neutralises acid — NOT an enzyme.",
    "Villi increase surface area for absorption; wall is one-cell thick; lacteal absorbs fat into the lymphatic system.",
    "Assimilation = distribution of end products of digestion to body cells: glucose→energy, amino acid→cell components, fatty acid+glycerol→fat.",
    "Defecation: water & minerals reabsorbed in the large intestine; faeces stored in rectum, eliminated via anus.",
  ],
  keyTerms: [
    "Carbohydrate",
    "Protein",
    "Fat",
    "Vitamin",
    "Mineral",
    "Fibre",
    "Balanced Diet",
    "Food Pyramid",
    "Calorific Value",
    "BMI",
    "Oesophagus",
    "Bolus",
    "Chyme",
    "Duodenum",
    "Villus",
    "Absorption",
    "Assimilation",
    "Defecation",
    "Enzyme",
  ],
};
