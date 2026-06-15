import type { StructuredNotes } from "./types";

export const scienceF1C4NotesDLP: StructuredNotes = {
  quickRevision: [
    "Reproduction is the process of producing new individuals to ensure survival of a species.",
    "Sexual reproduction involves two parents and fusion of male and female gametes.",
    "Asexual reproduction involves one parent only and produces clones.",
    "The male reproductive system produces sperm, while the female reproductive system produces ova.",
    "The menstrual cycle includes menstruation, repair, fertile and premenstrual phases.",
    "Fertilisation forms a zygote, which develops into an embryo, fetus and baby.",
    "Flowering plants reproduce through pollination, fertilisation, fruit formation and seed formation.",
  ],
  sections: [
    {
      title: "4.1 Sexual and Asexual Reproduction",
      subsections: [
        {
          title: "Definition of Reproduction",
          content:
            "Reproduction is the process of producing new individuals by living organisms to ensure the survival of the species.",
        },
        {
          title: "Sexual Reproduction",
          bulletPoints: [
            "Involves two parents, male and female.",
            "Involves fusion of male and female gametes.",
            "Produces offspring with genetic variation.",
            "Occurs in humans, mammals, birds, fish, reptiles, amphibians and flowering plants.",
          ],
        },
        {
          title: "Fertilisation",
          table: {
            headers: ["Type", "Brief Explanation"],
            rows: [
              ["Internal fertilisation", "Fusion of gametes occurs inside the female parent's body."],
              ["External fertilisation", "Fusion of gametes occurs outside the female parent's body, usually in water."],
            ],
          },
        },
        {
          title: "Asexual Reproduction",
          bulletPoints: [
            "Involves one parent only.",
            "No fertilisation occurs.",
            "Produces genetically identical offspring called clones.",
          ],
        },
        {
          title: "Types of Asexual Reproduction",
          bulletPoints: [
            "Binary fission",
            "Budding",
            "Regeneration",
            "Spore formation",
            "Vegetative reproduction",
          ],
        },
      ],
    },
    {
      title: "4.2 Human Reproductive System",
      subsections: [
        {
          title: "Male Reproductive System",
          table: {
            headers: ["Part", "Brief Function"],
            rows: [
              ["Testis", "Produces sperm and male sex hormones."],
              ["Scrotum", "Protects the testes and helps control testis temperature."],
              ["Sperm duct", "Transports sperm from the testes."],
              ["Seminal vesicle", "Produces fluid that helps sperm move."],
              ["Prostate gland", "Produces fluid in semen."],
              ["Urethra", "Tube for urine and semen to leave the body."],
              ["Penis", "Transfers sperm into the female reproductive system."],
            ],
          },
        },
        {
          title: "Female Reproductive System",
          table: {
            headers: ["Part", "Brief Function"],
            rows: [
              ["Ovary", "Produces ova and female sex hormones."],
              ["Fallopian tube", "Site where fertilisation usually occurs."],
              ["Uterus", "Place where the embryo develops during pregnancy."],
              ["Cervix", "Lower part of the uterus that connects to the vagina."],
              ["Vagina", "Receives sperm and acts as the birth canal."],
            ],
          },
        },
        {
          title: "Puberty",
          table: {
            headers: ["Males", "Females"],
            rows: [
              ["Voice deepens", "Breast development"],
              ["Facial hair grows", "Hips widen"],
              ["Muscle development increases", "Menstruation begins"],
            ],
          },
        },
        {
          title: "Human Gametes",
          table: {
            headers: ["Sperm", "Ovum"],
            rows: [
              ["Smallest human cell", "Largest human cell"],
              ["Tadpole-shaped", "Spherical"],
              ["Mobile", "Immobile"],
            ],
          },
        },
      ],
    },
    {
      title: "4.3 Menstrual Cycle",
      subsections: [
        {
          title: "Menstruation Phase (Day 1-5)",
          bulletPoints: [
            "The uterine lining breaks down.",
            "Blood and uterine tissue are discharged through the vagina.",
          ],
        },
        {
          title: "Repair Phase (Day 6-11)",
          bulletPoints: [
            "The uterine wall starts to thicken again.",
            "New blood vessels form in the uterine lining.",
          ],
        },
        {
          title: "Fertile Phase (Day 12-17)",
          bulletPoints: [
            "Ovulation occurs.",
            "An ovum is released from the ovary.",
            "The chance of pregnancy is higher if fertilisation occurs.",
          ],
        },
        {
          title: "Premenstrual Phase (Day 18-28)",
          bulletPoints: [
            "The uterus prepares for implantation.",
            "If fertilisation does not occur, the menstrual cycle repeats.",
          ],
        },
        {
          title: "Personal Hygiene During Menstruation",
          bulletPoints: [
            "Change sanitary pads 3-4 times daily.",
            "Good hygiene helps prevent urinary tract infections.",
          ],
        },
      ],
    },
    {
      title: "4.4 Fertilisation and Pregnancy",
      subsections: [
        {
          title: "Fertilisation",
          content: "Fertilisation is the fusion of the sperm nucleus and ovum nucleus to form a zygote.",
        },
        {
          title: "Implantation",
          content: "Implantation occurs when the embryo attaches to the wall of the uterus.",
        },
        {
          title: "Development",
          content: "The development sequence is zygote -> embryo -> fetus -> baby.",
        },
        {
          title: "Supporting Structures During Pregnancy",
          table: {
            headers: ["Structure", "Brief Function"],
            rows: [
              ["Placenta", "Supplies nutrients and oxygen to the fetus and removes waste."],
              ["Umbilical cord", "Connects the fetus to the placenta."],
              ["Amnion", "Membrane that surrounds the fetus."],
              ["Amniotic fluid", "Protects the fetus from shock and helps maintain temperature."],
            ],
          },
        },
      ],
    },
    {
      title: "4.5 Importance of Prenatal Care",
      subsections: [
        {
          title: "Balanced Diet",
          bulletPoints: [
            "Protein helps tissue growth in the baby.",
            "Calcium and phosphorus help form bones and teeth.",
            "Iron helps form red blood cells.",
          ],
        },
        {
          title: "Things to Avoid",
          bulletPoints: [
            "Smoking can affect fetal development.",
            "Alcohol can harm the baby in the womb.",
            "Drugs can cause serious health problems for the mother and baby.",
          ],
        },
        {
          title: "Breast Milk",
          content: "Breast milk contains nutrients and antibodies that support baby growth and protection.",
        },
      ],
    },
    {
      title: "4.6 Sterility and Contraception",
      subsections: [
        {
          title: "Sterility",
          content: "Sterility is the inability to reproduce or have offspring.",
        },
        {
          title: "Causes of Sterility",
          bulletPoints: [
            "Low sperm count.",
            "Blocked reproductive ducts.",
            "Hormonal imbalance.",
          ],
        },
        {
          title: "Treatments for Sterility",
          bulletPoints: [
            "Hormone therapy.",
            "Surgery.",
            "In vitro fertilisation (IVF).",
          ],
        },
        {
          title: "Contraceptive Methods",
          table: {
            headers: ["Method", "Example"],
            rows: [
              ["Natural methods", "Avoiding sexual intercourse during the fertile period."],
              ["Condoms", "Prevent sperm from entering the vagina."],
              ["Hormonal methods", "Hormone pills or injections."],
              ["IUCD", "Device placed in the uterus to prevent pregnancy."],
              ["Vasectomy", "Surgery for males."],
              ["Ligation", "Surgery for females."],
            ],
          },
        },
      ],
    },
    {
      title: "4.7 Sexual Reproduction in Plants",
      subsections: [
        {
          title: "Flower Structure",
          table: {
            headers: ["Part", "Component / Function"],
            rows: [
              ["Stamen", "Consists of anther and filament; produces pollen."],
              ["Pistil", "Consists of stigma, style, ovary and ovule."],
              ["Petals", "Attract pollination agents."],
              ["Sepals", "Protect the flower bud."],
            ],
          },
        },
        {
          title: "Pollination",
          bulletPoints: [
            "Pollination is the transfer of pollen from the anther to the stigma.",
            "Self-pollination occurs in the same flower or same plant.",
            "Cross-pollination occurs between two plants of the same species.",
          ],
        },
        {
          title: "Pollination Agents",
          bulletPoints: ["Wind", "Animals or insects", "Humans"],
        },
        {
          title: "Plant Fertilisation",
          bulletPoints: [
            "A pollen tube forms.",
            "The male gamete moves through the pollen tube.",
            "The male gamete fuses with the female gamete.",
            "The ovary becomes a fruit.",
            "The ovule becomes a seed.",
          ],
        },
        {
          title: "Germination",
          content: "Germination is the process where a seed starts to grow into a young plant.",
          bulletPoints: ["Requires water.", "Requires oxygen.", "Requires a suitable temperature."],
        },
        {
          title: "Vegetative Propagation Examples",
          table: {
            headers: ["Type", "Example"],
            rows: [
              ["Rhizome", "Ginger"],
              ["Runner", "Strawberry"],
              ["Tuber", "Potato"],
              ["Bulb", "Onion"],
              ["Sucker", "Banana"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Reproduction ensures the survival of a species.",
    "Sexual reproduction involves gametes and produces genetic variation.",
    "Asexual reproduction does not involve fertilisation and produces clones.",
    "Sperm is the male gamete, while ovum is the female gamete.",
    "Ovulation usually occurs during the fertile phase.",
    "Fertilisation forms a zygote.",
    "The placenta helps exchange substances between the mother and fetus.",
    "Pollination is the transfer of pollen from anther to stigma.",
    "After plant fertilisation, the ovary becomes a fruit and the ovule becomes a seed.",
  ],
  keyTerms: [
    "Reproduction",
    "Gamete",
    "Fertilisation",
    "Zygote",
    "Embryo",
    "Fetus",
    "Puberty",
    "Menstrual Cycle",
    "Ovulation",
    "Placenta",
    "Sterility",
    "Pollination",
    "Germination",
  ],
  chapterSummary:
    "Chapter 4 explains sexual and asexual reproduction, the human reproductive system, menstrual cycle, fertilisation, pregnancy, prenatal care, sterility, contraception and reproduction in flowering plants.",
};
