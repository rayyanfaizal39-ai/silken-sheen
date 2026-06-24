import type { ScienceChapter2Notes } from "@/data/content";

export const scienceF2C4NotesDLP: ScienceChapter2Notes = {
  chapterSummary:
    "Chapter 4 explains the difference between infectious diseases (caused by pathogens spread through mediums and vectors, e.g. tuberculosis, flu, ringworm, tinea, leptospirosis, dengue fever, malaria fever, Zika fever) and non-infectious diseases (caused by genetic factors or lifestyle, e.g. cancer, hypertension, diabetes, asthma, cardiovascular diseases); the ways infectious diseases spread (air, water, contact, vectors) and the three stages of prevention (primary, secondary, tertiary); the body's three lines of defence (skin/mucous membrane, phagocytosis by white blood cells, antibody production by the immune system) and the role of antigens and antibodies; the importance of immunisation, how vaccines work, the Malaysian immunisation schedule, and the four types of immunity (natural passive, artificial passive, natural active, artificial active); and the causes that weaken the immune system together with practices that strengthen it.",
  quickRevision: [
    "A disease is an abnormal condition of body or mind that causes discomfort, difficulty to function or stress to an individual.",
    "Infectious diseases are caused by pathogens spread through mediums/vectors and CAN be transmitted between individuals (e.g. tuberculosis, flu, ringworm, tinea, leptospirosis, dengue fever, malaria fever, Zika fever).",
    "Non-infectious diseases are caused by genetic factors or lifestyle and CANNOT be transmitted between individuals (e.g. cancer, hypertension, diabetes, asthma, cardiovascular diseases).",
    "Pathogens are organisms that cause diseases: all viruses, and some bacteria, protozoa, fungi and worms.",
    "Four ways infectious diseases spread: air (droplet/dust), water (contaminated water/food), contact (skin contact, sexual contact, blood), and vectors (mosquito, fly, rat, cockroach).",
    "Three stages of disease prevention: primary (improve health, strengthen body defence, healthy lifestyle), secondary (early detection and treatment, isolate patients), tertiary (control vectors, protect hosts).",
    "Three lines of body defence: 1st — skin & mucous membrane (non-specific, prevents pathogen entry); 2nd — phagocytosis by white blood cells (non-specific); 3rd — antibody production by the immune system (specific).",
    "Antigen = a foreign substance that induces antibody production (e.g. pathogens, toxins, blood cells from other blood groups). Antibody = a protein produced by white blood cells in response to an antigen.",
    "A vaccine contains antigens from a part/whole of a weakened or dead pathogen; it stimulates the immune system to form immunity WITHOUT causing the actual disease.",
    "Four types of immunity: natural passive (antibody from mother via placenta/breast milk, short-lived), artificial passive (antiserum injection, fast but temporary), natural active (recovering from infection, long-lasting), artificial active (vaccination, long-lasting).",
    "Practices that weaken the immune system: exposure to polluted air, exposure to pesticides, stress, excessive sugar intake, smoking. Practices that strengthen it: enough sleep/rest, exercise, fresh air, not smoking, periodic health checks.",
  ],
  sections: [
    {
      title: "Chapter Introduction",
      subsections: [
        {
          content:
            "A disease is an abnormal condition of the body or mind that causes discomfort, difficulty to function, or stress to an individual. Diseases are classified into two main groups: infectious diseases and non-infectious diseases. This chapter explains the differences between them, how infectious diseases spread, the body's defence mechanisms, and the importance of immunisation in maintaining good health.\n\nScience Blog: The Zika virus is transmitted by Aedes aegypti and Aedes albopictus mosquitoes. It usually causes fever, rash, muscle pain, joint pain, headache and conjunctivitis. For infected pregnant women, the virus can cause serious birth defects in babies, where babies are born with underdeveloped heads and brain damage.",
        },
        {
          title: "Keywords",
          bulletPoints: [
            "Infectious disease",
            "Non-infectious disease",
            "Pathogen",
            "Vector",
            "Antigen",
            "Antibody",
            "Serum",
            "Active immunity",
            "Passive immunity",
            "Immunisation",
          ],
        },
      ],
    },
    {
      title: "4.1 Infectious and Non-infectious Diseases",
      subsections: [
        {
          title: "What is a Disease?",
          content:
            "A disease is an abnormal condition of body or mind that causes discomfort, difficulty to function or stress to an individual. Diseases can be classified into two: infectious diseases and non-infectious diseases.",
        },
        {
          title: "Differences Between Infectious and Non-infectious Diseases",
          table: {
            headers: ["Infectious Disease", "Non-infectious Disease"],
            rows: [
              [
                "Caused by infection of pathogens directly through mediums and vectors.",
                "Caused by genetic factor or lifestyle.",
              ],
              [
                "Example: tuberculosis, flu, ringworm, tinea, leptospirosis, dengue fever, malaria fever and Zika fever.",
                "Example: cancer, hypertension, diabetes, asthma and cardiovascular diseases.",
              ],
              [
                "A disease that CAN be transmitted from one individual to another.",
                "A disease that CANNOT be transmitted from one individual to another.",
              ],
            ],
          },
        },
        {
          title: "How are Infectious Diseases Spread?",
          content:
            "Infectious diseases are spread by pathogens, the organisms that cause diseases. All viruses, and some bacteria, protozoa, fungi and worms are pathogens. Infectious diseases are spread by pathogens transmitted from an infected person (host) to another person through vectors and mediums such as water, air and contact. The host is a victim who is weak and easily infected; after getting infected, the host will show certain symptoms of the disease.",
          bulletPoints: [
            "Not all microorganisms are harmful pathogens — some bacteria act on food residue in the large intestine to produce vitamin K and vitamin B12, which are absorbed by the body.",
          ],
        },
        {
          title: "Airborne Diseases",
          content:
            "Airborne diseases are transmitted in two ways: droplet transmission and dust transmission.",
          bulletPoints: [
            "Prevention: cover the mouth and nose when sneezing, coughing or yawning; do not spit everywhere; avoid being in a crowded place; ensure the living place gets enough light, as ultraviolet rays can kill certain microorganisms in the air.",
            "Examples of diseases spread through air: tuberculosis, flu, Severe Acute Respiratory Syndrome (SARS), Influenza A (H1N1) and chicken pox.",
          ],
        },
        {
          title: "Waterborne Diseases",
          content:
            "Infection through water usually happens in areas with inadequate water supply and poor sanitation. For example, when a toilet is built over a river, faecal pathogens enter and pollute the river; a person can be infected by drinking the contaminated water. Floods can also spread infectious diseases.",
          bulletPoints: [
            "Examples: cholera, typhoid and amoebic dysentery.",
            "Prevention: add chlorine into swimming pools and water supply systems; build toilets with good sanitation; boil drinking water properly; wash hands with soap after using the toilet.",
          ],
        },
        {
          title: "Infection Through Contact",
          content:
            "Ringworm and tinea are two examples of diseases transmitted through contact — both are caused by fungi. Accidentally touching infected skin or wearing the clothes of an infected person causes infection.",
          bulletPoints: [
            "Syphilis and gonorrhoea spread through sexual intercourse; their pathogens are present in body fluids such as semen and vaginal fluid.",
            "The HIV virus that causes AIDS can be transmitted through sexual intercourse, blood, and syringe-sharing among drug addicts/patients.",
          ],
        },
        {
          title: "Infection Through Vectors",
          content:
            "Some pathogens are transmitted from one host to a new host through animals — these animals are called vectors.",
          table: {
            headers: ["Vector", "Pathogen"],
            rows: [
              ["Cockroach", "Salmonella typhi"],
              ["Fly", "Salmonella typhi"],
              ["Aedes mosquito", "Dengue virus"],
              ["Aedes mosquito", "Zika virus"],
              ["Anopheles mosquito", "Plasmodium malariae"],
              ["Rat", "Leptospira sp. bacteria"],
            ],
          },
        },
        {
          title: "Disease, Symptoms, Pathogen, Vector and Way of Infection",
          table: {
            headers: ["Disease", "Symptoms", "Pathogen", "Vector", "Way of Infection"],
            rows: [
              ["Malaria", "Shivering, fever and sweating", "Plasmodium malariae", "Female Anopheles mosquito", "Mosquito bite"],
              ["Cholera", "Diarrhoea and vomiting", "Vibrio cholerae bacteria", "Fly", "Contaminated food and water"],
              ["Dengue", "Joint pain, fever, headache and watery eyes", "Virus", "Aedes mosquito", "Mosquito bite"],
              ["Zika", "Fever, rashes, joint pain and conjunctivitis", "Virus", "Aedes mosquito", "Mosquito bite"],
              ["Typhoid", "Fever, intestinal bleeding and red rashes", "Salmonella typhi bacteria", "Cockroach, fly, rat", "Contaminated food and water"],
              ["Leptospirosis", "Fever, headache and muscle pain", "Leptospira sp. bacteria", "Rat", "Contaminated soil, food and water"],
            ],
          },
        },
        {
          title: "How Do Vectors Spread Diseases?",
          bulletPoints: [
            "Mosquito: a mosquito with pathogens in its salivary glands sucks the blood of an uninfected person → the mosquito secretes saliva when sucking blood to prevent clotting → the infection spreads throughout the person's body → another mosquito that bites the infected person transmits the disease to a new victim.",
            "Fly: a fly that lands on dirt has pathogens on its legs and body → the fly transmits pathogens to food → the pathogens enter the body of the person who eats the contaminated food.",
          ],
        },
        {
          title: "The Mechanism to Prevent the Spread of Infectious Diseases",
          content: "Prevention of infectious diseases involves three stages.",
          table: {
            headers: ["Primary Stage", "Secondary Stage", "Tertiary Stage"],
            rows: [
              [
                "Improving health (personal/family hygiene, cleanliness of living places, sanitation); strengthening the body's defence system (vaccines/immunisation for babies, children, pregnant women, food premises operators, hajj pilgrims, travellers); frequent health check-ups; maintaining a healthy lifestyle (inhaling clean air, eating a balanced diet).",
                "Determining transmission of infections through active and passive case detection; giving early treatment to patients; separating patients from others.",
                "Controlling vector populations (destroying breeding/hiding places, fogging); enforcing laws (compounds for dirty food premises); protecting hosts (mosquito nets/coils, wearing thick clothes).",
              ],
            ],
          },
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "Infectious disease = caused by pathogens, CAN spread between people. Non-infectious disease = caused by genetics/lifestyle, CANNOT spread between people.",
            "Pathogens: all viruses + SOME bacteria, protozoa, fungi and worms (not ALL microorganisms are harmful).",
            "4 ways of spreading: air (droplet/dust), water (contaminated food/water), contact (skin/sexual/blood), vectors (mosquito, fly, rat, cockroach).",
            "Vector-pathogen pairs: Aedes mosquito → Dengue/Zika virus; Anopheles mosquito → Plasmodium malariae (malaria); Rat → Leptospira sp. (leptospirosis); Cockroach/fly → Salmonella typhi (typhoid).",
            "3 stages of prevention: Primary (improve health/defence before infection), Secondary (detect & treat early), Tertiary (control vectors, protect hosts).",
          ],
        },
        {
          title: "🎯 Exam Tips",
          bulletPoints: [
            "Classification questions often list diseases and ask you to sort into infectious vs non-infectious — check if the disease is caused by a pathogen (infectious) or by genetics/lifestyle (non-infectious).",
            "When asked for the vector AND pathogen of dengue/Zika, the vector is the SAME (Aedes mosquito) but the pathogen (virus) differs by disease.",
          ],
        },
        {
          title: "⚠️ Common Mistakes",
          bulletPoints: [
            "Assuming all microorganisms are harmful — some bacteria in the large intestine actually produce useful vitamin K and B12.",
            "Confusing the THREE stages of prevention — primary is BEFORE infection (build defence), secondary is DURING/early infection (detect & treat), tertiary is controlling vectors/protecting hosts (ongoing).",
          ],
        },
      ],
    },
    {
      title: "4.2 Body Defence",
      subsections: [
        {
          title: "Overview of Body Defence",
          content:
            "Pathogens enter the body through the respiratory system, digestive system, excretory system and skin. Our body has a strategy of three lines of defence to destroy pathogens before and after they enter the body.",
        },
        {
          title: "First Line of Defence (Non-specific)",
          content: "Prevents pathogens from entering the body.",
          bulletPoints: [
            "Skin: made of a tough layer, difficult for microorganisms to penetrate; microorganisms can only enter if there is a wound/injury; sweat and sebum secreted by the skin contain chemicals that kill microorganisms.",
            "Mucous membrane: lines the digestive tract and respiratory tract; microorganisms entering the respiratory tract are filtered by nasal hairs and trapped by mucous lining the nasal cavity; earwax, tears and vaginal secretions also act as antiseptics that kill microorganisms.",
          ],
        },
        {
          title: "Second Line of Defence (Non-specific)",
          content:
            "Pathogens that pass the first line of defence enter the bloodstream and face the second line of defence: phagocytosis. White blood cells engulf and digest pathogens using enzymes through phagocytosis.",
        },
        {
          title: "Third Line of Defence (Specific) — Body Immune System",
          content:
            "Pathogens that pass the second line of defence face the third line of defence: the immune system. Immunity is the ability of the body system to resist pathogens before it is infected. It involves the production of antibodies when pathogens enter the body.",
          bulletPoints: [
            "Antibody: a protein produced by white blood cells into the bloodstream in response to antigens.",
            "Antigen: a foreign substance that comes from outside the body and induces the production of antibodies. Examples: pathogens, toxin molecules, blood cells from other blood groups.",
            "Antibodies attach to pathogens (preventing pathogens from entering a host cell) and cause pathogens to clump together.",
          ],
        },
        {
          title: "Importance of Immunisation",
          content:
            "Immunisation is an effort to stimulate the body's defence against infections in babies, children and adults by injecting vaccines. Vaccines used by the Ministry of Health Malaysia have been evaluated according to international standards and are safe, including for babies and children.",
          bulletPoints: [
            "A vaccine contains antigens obtained from a part or the whole structure of a weakened or dead virus/bacterium.",
            "Antigens in the vaccine stimulate the body's immune system, forming immunity against certain infections WITHOUT causing the actual disease.",
            "A baby needs to be injected with several types of vaccines according to the Malaysian vaccination schedule.",
          ],
        },
        {
          title: "Vaccination Schedule in Malaysia (Selected Vaccines)",
          table: {
            headers: ["Vaccine", "Protects Against / Notes"],
            rows: [
              ["BCG (Bacillus Calmette–Guérin)", "Protection against Tuberculosis."],
              ["DTaP", "Combination of Diphtheria, Tetanus and Pertussis (whooping cough)."],
              ["Hib", "Haemophilus influenzae type B."],
              ["IPV (Inactivated Polio Vaccine)", "Protects against Polio."],
              ["MMR", "Combination of Measles, Mumps and Rubella."],
              ["MR", "Booster dose for Measles and Rubella."],
              ["DT", "Booster dose for Diphtheria and Tetanus."],
              ["HPV (Human Papillomavirus)", "Given only to girls aged 13; dose 2 given six months after dose 1."],
              ["JE (Japanese Encephalitis)", "Only given in Sarawak."],
              ["Hepatitis B", "Given starting at birth, in multiple doses."],
            ],
          },
        },
        {
          title: "Passive Immunity",
          content: "The body gains antibody from external sources.",
          table: {
            headers: ["Type", "Description", "Duration"],
            rows: [
              ["Natural", "Baby receives antibody from breast milk or from the mother's blood across the placenta.", "Temporary and short-lived — lasts only the first few months after birth."],
              ["Artificial", "An antiserum (a clear liquid containing antibodies) is injected into the patient's body; it fights pathogens WITHOUT interrupting the patient's own immune system.", "Fast-acting but temporary."],
            ],
          },
        },
        {
          title: "Active Immunity",
          content: "The body produces its own antibodies when stimulated by antigens.",
          table: {
            headers: ["Type", "Description", "Duration"],
            rows: [
              ["Natural", "Occurs when a person recovers from an infection (antibodies build up during the infection).", "Lasts long after the infection."],
              ["Artificial", "Occurs when a vaccine containing a dead/weakened pathogen is injected; the immune system responds by producing antibodies.", "Lasts long after vaccination."],
            ],
          },
        },
        {
          title: "Strong Immune System",
          content:
            "The immune system becomes weak when there is an imbalance in the body or too much toxin exposure.",
          bulletPoints: [
            "Causes that weaken the immune system: exposure to polluted air, exposure to pesticides, stress, excessive intake of sugar, smoking and exposure to cigarette smoke.",
            "Practices that strengthen the immune system: getting enough sleep and rest, exercising and inhaling fresh air, not smoking and avoiding cigarette smoke, doing periodic health examinations.",
            "An allergy is the response of the body's immune system to an allergen (a usually-harmless substance for most people). Examples of allergens: mites, animal hair, dust, pollen, spores, food (seafood, milk, eggs), animal stings, some medicines.",
          ],
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "3 lines of defence: 1st — skin & mucous membrane (prevent entry); 2nd — phagocytosis by white blood cells; 3rd — antibody production by the immune system.",
            "Antigen = foreign substance that TRIGGERS antibody production. Antibody = protein made by white blood cells that RESPONDS to antigen.",
            "A vaccine contains weakened/dead pathogen antigens — it stimulates immunity WITHOUT causing disease.",
            "4 types of immunity: Natural Passive (mother→baby, short), Artificial Passive (antiserum, fast & temporary), Natural Active (recovering from infection, long-lasting), Artificial Active (vaccination, long-lasting).",
            "Practices that strengthen immune system: enough sleep, exercise, fresh air, no smoking, regular health checks. Weakens it: polluted air, pesticides, stress, excess sugar, smoking.",
          ],
        },
        {
          title: "🎯 Exam Tips",
          bulletPoints: [
            "When given a graph of antibody concentration vs time/infection, identify NATURAL active immunity by TWO infection peaks (1st low, 2nd high above immunity level); identify ARTIFICIAL active immunity by TWO vaccine injections.",
            "Distinguish 'antiserum' (used in artificial PASSIVE immunity — contains ready-made antibodies) from 'vaccine' (used in artificial ACTIVE immunity — contains antigens that trigger the body to MAKE its own antibodies).",
          ],
        },
        {
          title: "⚠️ Common Mistakes",
          bulletPoints: [
            "Confusing antigen and antibody — antigen is the FOREIGN substance (trigger); antibody is the protein the body PRODUCES in response.",
            "Thinking passive immunity is always long-lasting — actually passive immunity (both natural and artificial) is TEMPORARY because the body did not produce the antibodies itself; only active immunity is long-lasting.",
            "Believing vaccines contain the LIVE, full-strength disease-causing pathogen — vaccines actually contain only weakened or dead antigens.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Chapter 4 Concept Map",
          content:
            "Human Health → Diseases (Infectious — spreads via Water/Air/Contact/Vector, prevented through Primary/Secondary/Tertiary stages; Non-infectious — caused by genetics/lifestyle, e.g. Cancer, Hypertension, Diabetes, Cardiovascular disease) → Body Defence (1st line: Skin & Mucous membrane; 2nd line: Phagocytosis; 3rd line: Antibody production, involving Antigen and Antibody) → Immunity (Passive: Natural & Artificial; Active: Natural & Artificial) → Importance of Immunisation (Vaccines, Vaccination schedule, Strong immune system practices).",
        },
        {
          title: "Self-Reflection (Learning Outcomes)",
          bulletPoints: [
            "4.1 Infectious and Non-infectious Diseases: Differentiate and communicate infectious and non-infectious diseases. Explain how infectious diseases are spread. Separate the cause and spread of infectious diseases. Generate ideas on the mechanism to prevent the spread of infectious diseases.",
            "4.2 Body Defence: Elaborate and communicate the function of the body defence system. Define antigens, antibodies and immunity. Justify the importance of immunisation. Differentiate passive immunity and active immunity. Justify good practices towards a strong immune system. Justify and communicate the importance of immunisation and health level of individuals to the family, society, economy and nation.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Infectious disease = caused by pathogens, transmitted via mediums/vectors, CAN spread between people (e.g. tuberculosis, flu, ringworm, tinea, leptospirosis, dengue, malaria, Zika).",
    "Non-infectious disease = caused by genetics/lifestyle, CANNOT spread between people (e.g. cancer, hypertension, diabetes, asthma, cardiovascular disease).",
    "Pathogens: all viruses + SOME bacteria, protozoa, fungi and worms.",
    "4 ways infectious diseases spread: air (droplet/dust), water (contaminated food/water), contact (skin/sexual/blood), vectors (mosquito, fly, rat, cockroach).",
    "Vector-pathogen pairs: Aedes mosquito → Dengue virus/Zika virus; Anopheles mosquito (female) → Plasmodium malariae (malaria); Rat → Leptospira sp. (leptospirosis); Cockroach/Fly → Salmonella typhi (typhoid/cholera-related).",
    "3 stages of prevention: Primary (improve health & defence before infection), Secondary (early detection & treatment, isolate patients), Tertiary (control vectors, protect hosts).",
    "3 lines of body defence: 1st — skin & mucous membrane (non-specific, prevents entry); 2nd — phagocytosis by white blood cells (non-specific); 3rd — antibody production by immune system (specific).",
    "Antigen = foreign substance that triggers antibody production (pathogens, toxins, foreign blood cells). Antibody = protein made by white blood cells in response to antigen.",
    "Vaccine = contains weakened/dead pathogen antigens; stimulates immunity WITHOUT causing disease. Antiserum = ready-made antibodies injected directly (used in artificial passive immunity).",
    "4 types of immunity: Natural Passive (mother→baby via placenta/breast milk, short-lived), Artificial Passive (antiserum injection, fast & temporary), Natural Active (recovering from infection, long-lasting), Artificial Active (vaccination, long-lasting).",
    "Key vaccines: BCG (Tuberculosis), DTaP (Diphtheria, Tetanus, Pertussis), MMR (Measles, Mumps, Rubella), IPV (Polio), HPV (girls aged 13 only), JE (Sarawak only).",
    "Practices that weaken immune system: polluted air, pesticides, stress, excess sugar, smoking. Practices that strengthen it: enough sleep/rest, exercise, fresh air, no smoking, periodic health checks.",
    "Allergy = immune response to an allergen (mites, animal hair, dust, pollen, certain foods, medicines) that is usually harmless to most people.",
  ],
  keyTerms: [
    "Infectious Disease",
    "Non-infectious Disease",
    "Pathogen",
    "Vector",
    "Host",
    "Antigen",
    "Antibody",
    "Phagocytosis",
    "Immunity",
    "Immunisation",
    "Vaccine",
    "Antiserum",
    "Passive Immunity",
    "Active Immunity",
    "Allergy",
  ],
};
