import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Lightbulb,
  Sparkles,
} from "lucide-react";

type SectionId = "asas-formula" | "teknik-menjawab" | "contoh-latihan";

const OBJECTIVES: Record<SectionId, string[]> = {
  "asas-formula": [
    "Membezakan ayat biasa dengan ayat yang lebih matang",
    "Membina ayat yang mempunyai subjek dan predikat lengkap",
    "Menggunakan kosa kata yang lebih bervariasi",
    "Mengembangkan ayat menggunakan kata hubung",
    "Menyemak dan membaiki draf karangan sendiri",
  ],
  "teknik-menjawab": [
    "Mengenal pasti empat komponen I-H-C-P",
    "Membina satu perenggan isi lengkap",
    "Menghuraikan isi menggunakan soalan 5W1H",
    "Memberikan contoh yang relevan",
    "Menulis ayat penegasan",
  ],
  "contoh-latihan": [
    "Membaiki struktur ayat",
    "Menggantikan perkataan berulang",
    "Menggunakan penanda wacana",
    "Mengembangkan isi menggunakan I-H-C-P",
    "Membina ayat yang matang tanpa menjadi terlalu sukar",
  ],
};

const VOCABULARY = [
  ["penting", "mustahak / signifikan"],
  ["baik", "bermanfaat / berkesan"],
  ["masalah", "isu / kemelut"],
  ["menjaga", "memelihara / melindungi"],
  ["membuat", "melaksanakan / menjalankan"],
  ["menggunakan", "memanfaatkan"],
  ["membantu", "memberikan sokongan"],
  ["sangat cantik", "indah / menarik"],
  ["telefon pintar", "alat komunikasi moden"],
  ["membaca", "menelaah bahan bacaan"],
];

const DISCOURSE = [
  ["Memulakan Isi", "Antaranya; Selain itu; Di samping itu; Seterusnya"],
  [
    "Menghuraikan",
    "Hal ini dikatakan demikian kerana; Dalam konteks ini; Keadaan ini menyebabkan; Kesannya",
  ],
  ["Memberikan Contoh", "Contohnya; Sebagai contoh; Misalnya; Sebagai bukti"],
  ["Menegaskan", "Jelaslah bahawa; Oleh itu; Tegasnya; Sesungguhnya"],
  ["Menutup Karangan", "Kesimpulannya; Secara keseluruhannya; Sebagai penutup; Akhir kata"],
];

export function BMForm2TingkatkanKaranganContent({
  sectionId,
  accent,
}: {
  sectionId: string;
  accent: string;
}) {
  if (sectionId === "teknik-menjawab") return <TechniqueLesson accent={accent} />;
  if (sectionId === "contoh-latihan") return <PracticeLesson accent={accent} />;
  return <FoundationLesson accent={accent} />;
}

function FoundationLesson({ accent }: { accent: string }) {
  const checklist = [
    "Adakah ayat saya mempunyai subjek dan predikat?",
    "Adakah saya menggunakan bahasa baku?",
    "Adakah kosa kata saya bervariasi?",
    "Adakah huraian menjawab ‘mengapa’ atau ‘bagaimana’?",
    "Adakah kata hubung digunakan dengan tepat?",
    "Adakah ayat mudah difahami?",
  ];
  return (
    <LessonPage
      lesson="Pelajaran 1"
      title="Rahsia Karangan Cemerlang"
      accent={accent}
      description="Meningkatkan karangan bermaksud menambah kualiti ayat, keluasan kosa kata dan kematangan huraian supaya penulisan lebih gramatis, menarik dan sesuai dengan tahap Tingkatan 2."
      objectives={OBJECTIVES["asas-formula"]}
    >
      <InfoSection title="Cara Guna" icon={<BookOpen />} accent={accent}>
        <p>
          Gunakan nota dan perbandingan ini ketika menulis draf pertama, menyemak karangan, membaiki
          ayat yang terlalu pendek, memilih perkataan yang lebih sesuai dan mengembangkan huraian.
        </p>
      </InfoSection>

      <InfoSection title="Ciri-ciri Karangan Matang" icon={<Sparkles />} accent={accent}>
        <div className="grid gap-3 md:grid-cols-2">
          <FeatureCard number="01" title="Ayat Gramatis">
            <p>
              Ayat mempunyai subjek dan predikat lengkap serta tidak mengandungi kesalahan struktur.
            </p>
            <Compare
              bad="Menjaga kebersihan sekolah supaya selesa."
              good="Semua murid perlu menjaga kebersihan sekolah supaya suasana pembelajaran lebih selesa."
            />
          </FeatureCard>
          <FeatureCard number="02" title="Kosa Kata Luas">
            <p>
              Gunakan perkataan yang tepat dan bervariasi tanpa memilih istilah yang terlalu sukar.
            </p>
            <MiniPairs rows={VOCABULARY.slice(0, 5)} />
          </FeatureCard>
          <FeatureCard number="03" title="Huraian Logik">
            <p>Huraian perlu menjawab: Mengapa? Bagaimana? Apakah kesannya?</p>
            <Quote>
              Murid perlu bersukan kerana aktiviti fizikal dapat meningkatkan kecergasan badan dan
              membantu mengurangkan tekanan.
            </Quote>
          </FeatureCard>
          <FeatureCard number="04" title="Keindahan Bahasa">
            <p>
              Gunakan peribahasa, kata hikmat, ungkapan menarik, penanda wacana dan ayat majmuk
              secara sederhana serta relevan dengan tema.
            </p>
          </FeatureCard>
        </div>
      </InfoSection>

      <InfoSection title="Langkah Meningkatkan Ayat" icon={<ArrowRight />} accent={accent}>
        <NumberedSteps
          accent={accent}
          steps={[
            ["Kenal Pasti Ayat Mudah", "Kita mesti jaga kebersihan."],
            ["Lengkapkan Struktur", "Kita mesti menjaga kebersihan sekolah."],
            [
              "Tambah Keterangan",
              "Kita mesti menjaga kebersihan sekolah yang menjadi tempat kita menuntut ilmu.",
            ],
            [
              "Gunakan Kata Hubung",
              "Kita mesti menjaga kebersihan sekolah agar suasana pembelajaran menjadi lebih kondusif.",
            ],
            [
              "Semak Ketepatan",
              "Pastikan subjek jelas, predikat lengkap, ejaan betul, kata hubung sesuai dan ayat tidak terlalu panjang.",
            ],
          ]}
        />
      </InfoSection>

      <InfoSection title="Contoh Transformasi" icon={<Sparkles />} accent={accent}>
        <Compare
          bad="Murid perlu membaca buku."
          good="Murid perlu membudayakan amalan membaca kerana aktiviti tersebut dapat memperluas pengetahuan dan meningkatkan penguasaan bahasa."
        />
      </InfoSection>
      <TeacherTips
        items={[
          "Jangan hanya berpuas hati dengan ayat pendek. Gunakan ayat majmuk yang jelas dan gramatis.",
          "Gunakan satu atau dua perkataan menarik dalam setiap perenggan; jangan menggantikan semua perkataan dengan istilah sukar.",
          "Baca semula ayat dengan kuat untuk memastikan ayat mudah difahami.",
        ]}
      />
      <Warnings
        items={[
          "Bahasa pasar atau singkatan seperti nak, tak, tau, korang dan sebabkan. Gunakan hendak, tidak, tahu, kamu dan menyebabkan.",
          "Menggunakan perkataan sukar secara salah.",
          "Membina ayat terlalu panjang sehingga maksud menjadi kabur.",
          "Mengulang perkataan yang sama berkali-kali.",
        ]}
      />
      <Checklist items={checklist} />
      <Summary>
        Karangan yang matang menggabungkan ketepatan tatabahasa, huraian yang logik dan gaya bahasa
        yang menarik. Utamakan kejelasan sebelum menggunakan kosa kata yang lebih indah.
      </Summary>
    </LessonPage>
  );
}

function TechniqueLesson({ accent }: { accent: string }) {
  return (
    <LessonPage
      lesson="Pelajaran 2"
      title="Formula I-H-C-P untuk Isi Matang"
      accent={accent}
      description="Teknik I-H-C-P membantu murid mengembangkan satu isi menjadi perenggan yang tersusun, lengkap dan mudah difahami."
      objectives={OBJECTIVES["teknik-menjawab"]}
    >
      <InfoSection title="Cara Guna" icon={<BookOpen />} accent={accent}>
        <p>
          Gunakan formula ini bagi setiap perenggan isi dalam karangan Respons Terbuka. Satu
          perenggan sebaik-baiknya mengandungi satu isi utama, satu atau dua ayat huraian, satu
          contoh dan satu ayat penegasan.
        </p>
      </InfoSection>
      <InfoSection title="Formula I-H-C-P" icon={<Sparkles />} accent={accent}>
        <ResponsiveTable
          headers={["Kod", "Komponen", "Cara Menulis"]}
          rows={[
            ["I", "Isi Utama", "Nyatakan idea yang menjawab tugasan"],
            ["H", "Huraian", "Jelaskan mengapa atau bagaimana isi itu penting"],
            ["C", "Contoh", "Berikan situasi yang nyata dan relevan"],
            ["P", "Penegasan", "Tegaskan semula isi dengan ayat penutup perenggan"],
          ]}
          accent={accent}
        />
      </InfoSection>
      <InfoSection title="Langkah Demi Langkah" icon={<ArrowRight />} accent={accent}>
        <NumberedSteps
          accent={accent}
          steps={[
            ["I — Isi Utama", "Salah satu cara menjaga kesihatan ialah bersenam secara berkala."],
            [
              "H — Huraian",
              "Aktiviti senaman dapat meningkatkan kecergasan badan dan membantu mengurangkan risiko penyakit.",
            ],
            [
              "C — Contoh",
              "Contohnya, murid boleh berjoging, berbasikal atau bermain badminton pada waktu petang.",
            ],
            [
              "P — Penegasan",
              "Jelaslah bahawa senaman yang konsisten mampu melahirkan remaja yang sihat dan cergas.",
            ],
          ]}
        />
      </InfoSection>
      <InfoSection title="Contoh Perenggan Lengkap" icon={<BookOpen />} accent={accent}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-white/40">
          Tema: Kesihatan
        </p>
        <HighlightedParagraph
          parts={[
            ["I", "Salah satu cara menjaga kesihatan ialah bersenam secara berkala."],
            [
              "H",
              "Hal ini dikatakan demikian kerana aktiviti fizikal dapat meningkatkan kecergasan badan serta membantu mengurangkan tekanan.",
            ],
            [
              "C",
              "Contohnya, murid boleh berjoging, berbasikal atau bermain badminton pada waktu petang.",
            ],
            [
              "P",
              "Jelaslah bahawa senaman yang konsisten mampu melahirkan remaja yang sihat dan cergas.",
            ],
          ]}
        />
      </InfoSection>
      <InfoSection
        title="Teknik Meningkatkan Komponen Karangan"
        icon={<Sparkles />}
        accent={accent}
      >
        <ResponsiveTable
          headers={["Bahagian", "Teknik Meningkatkan Kualiti"]}
          rows={[
            [
              "Pendahuluan",
              "Mulakan dengan definisi, situasi semasa atau ayat umum yang berkaitan",
            ],
            ["Huraian", "Gunakan frasa seperti ‘Hal ini dikatakan demikian kerana…’"],
            ["Contoh", "Gunakan ‘Contohnya’, ‘Sebagai contoh’ atau ‘Sebagai bukti’"],
            ["Penegasan", "Gunakan ‘Jelaslah bahawa’ atau ‘Oleh itu’"],
            ["Penutup", "Berikan rumusan, cadangan dan harapan"],
          ]}
          accent={accent}
        />
      </InfoSection>
      <InfoSection title="Penanda Wacana yang Sesuai" icon={<BookOpen />} accent={accent}>
        <FunctionCards rows={DISCOURSE} />
      </InfoSection>
      <TeacherTips
        items={[
          "Penanda wacana membantu menghasilkan kesinambungan idea yang baik.",
          "Jangan gunakan penanda wacana yang sama pada setiap perenggan.",
          "Pastikan contoh benar-benar berkaitan dengan isi.",
          "Penegasan tidak perlu terlalu panjang; satu ayat yang jelas sudah mencukupi.",
        ]}
      />
      <Warnings
        items={[
          "Menulis isi tanpa huraian.",
          "Memberikan contoh yang tidak berkaitan.",
          "Mengulang ayat isi sebagai huraian.",
          "Menulis penutup hanya satu ayat tanpa rumusan atau cadangan.",
          "Memasukkan terlalu banyak idea dalam satu perenggan.",
        ]}
      />
      <Checklist
        items={[
          "Adakah perenggan mempunyai satu isi utama?",
          "Adakah isi telah dihuraikan?",
          "Adakah contoh berkaitan dengan isi?",
          "Adakah ayat penegasan ditulis?",
          "Adakah penanda wacana sesuai?",
          "Adakah perenggan mudah difahami?",
        ]}
      />
      <Summary>
        Gunakan formula I-H-C-P dalam setiap perenggan isi supaya idea lebih teratur, matang dan
        lengkap. Huraian dan contoh lebih penting daripada penggunaan perkataan yang terlalu sukar.
      </Summary>
    </LessonPage>
  );
}

function PracticeLesson({ accent }: { accent: string }) {
  return (
    <LessonPage
      lesson="Pelajaran 3"
      title="Latihan Transformasi Ayat dan Kosa Kata"
      accent={accent}
      description="Pelajaran ini melatih murid menukarkan ayat biasa kepada ayat yang lebih gramatis, jelas dan menarik mengikut tema yang sesuai dengan Tingkatan 2."
      objectives={OBJECTIVES["contoh-latihan"]}
    >
      <InfoSection title="Bahagian 1 — Transformasi Ayat" icon={<Sparkles />} accent={accent}>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Kesihatan",
              "Kita patut bersukan supaya badan sihat.",
              "Kita seyogianya melakukan aktiviti riadah secara konsisten bagi menjaga kesihatan fizikal dan mental.",
            ],
            [
              "Pendidikan",
              "Murid perlu membaca kerana membaca baik.",
              "Murid perlu membudayakan amalan membaca kerana aktiviti tersebut dapat memperluas ilmu pengetahuan dan meningkatkan penguasaan bahasa.",
            ],
            [
              "Alam Sekitar",
              "Kita jangan buang sampah.",
              "Masyarakat hendaklah membuang sampah di tempat yang disediakan agar kebersihan alam sekitar sentiasa terpelihara.",
            ],
            [
              "Perpaduan",
              "Kita mesti tolong jiran.",
              "Masyarakat perlu saling membantu jiran tanpa mengira kaum bagi mengukuhkan hubungan dan semangat perpaduan.",
            ],
          ].map(([theme, bad, good]) => (
            <FeatureCard key={theme} number="Tema" title={theme}>
              <Compare bad={bad} good={good} />
            </FeatureCard>
          ))}
        </div>
      </InfoSection>
      <InfoSection title="Bahagian 2 — Kosa Kata Menarik" icon={<BookOpen />} accent={accent}>
        <ResponsiveTable
          headers={["Perkataan biasa", "Pilihan lebih menarik"]}
          rows={VOCABULARY}
          accent={accent}
        />
        <p className="mt-3 text-xs leading-6 text-white/45">
          “Wahana komunikasi sofistikated” hanyalah contoh pengayaan pilihan. Untuk Tingkatan 2,
          utamakan frasa mudah seperti “alat komunikasi moden”.
        </p>
      </InfoSection>
      <InfoSection
        title="Bahagian 3 — Penanda Wacana Mengikut Fungsi"
        icon={<BookOpen />}
        accent={accent}
      >
        <FunctionCards rows={DISCOURSE} />
        <p className="mt-3 text-xs leading-6 text-white/45">
          “Secara tuntas” dan “Sebagai intiha” ialah kosa kata pengayaan pilihan, bukan ungkapan
          wajib.
        </p>
      </InfoSection>
      <InfoSection
        title="Bahagian 4 — Latihan Mengembangkan Isi"
        icon={<ArrowRight />}
        accent={accent}
      >
        <Prompt title="Tema: Alam Sekitar">
          <p>
            <strong>Isi utama:</strong> Mengurangkan penggunaan plastik.
          </p>
          <p className="mt-2">
            <strong>Arahan:</strong> Bina satu perenggan lengkap menggunakan teknik I-H-C-P.
          </p>
        </Prompt>
        <div className="mt-3">
          <RevealAnswer label="Lihat Jawapan Cadangan">
            <HighlightedParagraph
              parts={[
                [
                  "I",
                  "Antara langkah menjaga alam sekitar adalah dengan mengurangkan penggunaan beg plastik.",
                ],
                [
                  "H",
                  "Hal ini penting kerana plastik mengambil masa yang lama untuk terurai dan boleh mencemarkan ekosistem.",
                ],
                ["C", "Contohnya, kita boleh membawa beg guna semula ketika membeli-belah."],
                ["P", "Jelaslah bahawa amalan ini dapat membantu memelihara alam sekitar."],
              ]}
            />
          </RevealAnswer>
        </div>
      </InfoSection>
      <InfoSection
        title="Bahagian 5 — Frasa Menarik dan Peribahasa"
        icon={<Sparkles />}
        accent={accent}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [
              "Perpaduan dan Kerjasama",
              "Bagaikan aur dengan tebing",
              "Saling membantu antara satu sama lain.",
            ],
            [
              "Amalan Membaca",
              "Membaca jambatan ilmu",
              "Membaca menjadi jalan untuk memperoleh pengetahuan.",
            ],
            [
              "Persediaan",
              "Sediakan payung sebelum hujan",
              "Membuat persediaan sebelum menghadapi masalah.",
            ],
            [
              "Kerajinan",
              "Di mana ada kemahuan, di situ ada jalan",
              "Seseorang yang bersungguh-sungguh akan menemui cara untuk berjaya.",
            ],
          ].map(([theme, phrase, meaning]) => (
            <div key={phrase} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <p
                className="text-[10px] font-black uppercase tracking-wide"
                style={{ color: accent }}
              >
                {theme}
              </p>
              <p className="mt-2 font-bold text-white">{phrase}</p>
              <p className="mt-2 text-sm leading-6 text-white/65">Maksud: {meaning}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/55">
          Pastikan setiap ungkapan sepadan dengan tema karangan.
        </p>
      </InfoSection>
      <Exercises accent={accent} />
      <TeacherTips
        items={[
          "Hafal sekurang-kurangnya lima penanda wacana mengikut fungsi.",
          "Pilih kosa kata yang tepat, bukan sekadar sukar.",
          "Semak satu perenggan pada satu masa.",
          "Pastikan setiap ayat mempunyai hubungan dengan ayat sebelumnya.",
        ]}
      />
      <Warnings
        items={[
          "Menggunakan peribahasa yang tidak relevan.",
          "Menggunakan kosa kata yang tidak difahami.",
          "Menghasilkan ayat terlalu panjang.",
          "Menukar ayat mudah menjadi ayat yang kabur.",
          "Menggunakan perkataan menarik secara berlebihan.",
        ]}
      />
      <Checklist
        items={[
          "Saya menggunakan bahasa baku.",
          "Saya membina ayat gramatis.",
          "Saya menggunakan penanda wacana yang pelbagai.",
          "Saya menghuraikan isi menggunakan I-H-C-P.",
          "Saya memilih kosa kata yang tepat.",
          "Saya menggunakan peribahasa mengikut tema.",
          "Saya telah menyemak ejaan dan tanda baca.",
        ]}
      />
      <Summary>
        Latihan berterusan dalam membina ayat, mengembangkan isi dan mempelbagaikan kosa kata akan
        menjadikan penulisan lebih matang, jelas dan menarik.
      </Summary>
    </LessonPage>
  );
}

function Exercises({ accent }: { accent: string }) {
  const activities = [
    {
      title: "Latihan 1 — Baiki Ayat",
      prompt: "Tukarkan ayat biasa kepada ayat yang lebih matang.",
      items: [
        "Kita kena belajar rajin.",
        "Telefon pintar banyak guna.",
        "Kita mesti jaga sungai.",
        "Murid patut hormat guru.",
      ],
      answer: [
        "Murid perlu belajar dengan tekun agar dapat mencapai kejayaan.",
        "Telefon pintar mempunyai pelbagai manfaat apabila digunakan secara bijak.",
        "Masyarakat perlu memelihara kebersihan sungai supaya pencemaran dapat dielakkan.",
        "Murid hendaklah menghormati guru sebagai tanda menghargai jasa mereka.",
      ],
    },
    {
      title: "Latihan 2 — Pilih Kosa Kata",
      prompt: "Gantikan perkataan bergaris dengan kosa kata yang lebih sesuai.",
      items: [
        "Aktiviti kokurikulum sangat baik untuk murid.",
        "Pencemaran merupakan masalah yang perlu ditangani.",
        "Program ini sangat penting kepada warga sekolah.",
      ],
      answer: ["bermanfaat", "isu / kemelut", "mustahak / signifikan"],
    },
  ];
  return (
    <InfoSection title="Aktiviti Latihan" icon={<BookOpen />} accent={accent}>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
          >
            <h4 className="font-bold text-white">{activity.title}</h4>
            <p className="mt-2 text-sm text-white/60">{activity.prompt}</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-white/75">
              {activity.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <div className="mt-4">
              <RevealAnswer label="Lihat Cadangan Jawapan">
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-white/75">
                  {activity.answer.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </RevealAnswer>
            </div>
          </div>
        ))}
        <Prompt title="Latihan 3 — Kembangkan Isi">
          <p>
            <strong>Isi:</strong> Membaca dapat meningkatkan pengetahuan.
          </p>
          <p className="mt-2">Bina satu perenggan menggunakan formula I-H-C-P.</p>
        </Prompt>
        <Prompt title="Latihan 4 — Bina Pendahuluan">
          <p>
            Tulis satu pendahuluan ringkas bagi tajuk:{" "}
            <strong>Kepentingan Menjaga Kesihatan</strong>.
          </p>
        </Prompt>
        <Prompt title="Latihan 5 — Bina Penutup">
          <p>Tulis satu penutup yang mempunyai rumusan, cadangan dan harapan.</p>
          <p className="mt-2">
            <strong>Tema:</strong> Cara-cara Menjaga Kebersihan Sekolah
          </p>
        </Prompt>
      </div>
    </InfoSection>
  );
}

function LessonPage({
  lesson,
  title,
  description,
  objectives,
  accent,
  children,
}: {
  lesson: string;
  title: string;
  description: string;
  objectives: string[];
  accent: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <section
        className="relative overflow-hidden rounded-[1.75rem] border p-5 sm:p-8"
        style={{
          borderColor: `${accent}35`,
          background: `linear-gradient(145deg, ${accent}16, rgba(8,12,26,.92))`,
        }}
      >
        <div className="relative max-w-3xl">
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {lesson} · Tingkatkan Karangan
          </p>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">{description}</p>
        </div>
      </section>
      <InfoSection title="Penerangan Ringkas" icon={<BookOpen />} accent={accent}>
        <p>{description}</p>
      </InfoSection>
      <InfoSection title="Objektif Pembelajaran" icon={<Check />} accent={accent}>
        <div className="grid gap-2 sm:grid-cols-2">
          {objectives.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.025] p-3 text-sm leading-6 text-white/75"
            >
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </InfoSection>
      {children}
    </div>
  );
}

function InfoSection({
  title,
  icon,
  accent,
  children,
}: {
  title: string;
  icon: ReactNode;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-4">
        <span className="[&>svg]:h-4 [&>svg]:w-4" style={{ color: accent }}>
          {icon}
        </span>
        <h3 className="font-display text-base font-bold text-white">{title}</h3>
      </div>
      <div className="p-5 text-sm leading-7 text-white/72">{children}</div>
    </section>
  );
}
function FeatureCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <p className="text-[10px] font-black uppercase tracking-wider text-white/35">{number}</p>
      <h4 className="mt-1 font-bold text-white">{title}</h4>
      <div className="mt-3 space-y-3 text-sm leading-6 text-white/65">{children}</div>
    </div>
  );
}
function Compare({ bad, good }: { bad: string; good: string }) {
  return (
    <div className="grid gap-2">
      <div className="rounded-lg border border-rose-400/15 bg-rose-400/[.07] p-3">
        <p className="text-[10px] font-bold uppercase text-rose-300">Ayat Biasa / Salah</p>
        <p className="mt-1 text-white/70">{bad}</p>
      </div>
      <div className="rounded-lg border border-emerald-400/15 bg-emerald-400/[.07] p-3">
        <p className="text-[10px] font-bold uppercase text-emerald-300">Ayat Matang / Betul</p>
        <p className="mt-1 text-white/80">{good}</p>
      </div>
    </div>
  );
}
function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="rounded-xl border-l-2 border-sky-300 bg-sky-300/[.06] p-4 italic text-white/75">
      {children}
    </blockquote>
  );
}
function MiniPairs({ rows }: { rows: string[][] }) {
  return (
    <div className="divide-y divide-white/[.06] rounded-lg border border-white/[.07]">
      {rows.map((row) => (
        <div key={row[0]} className="grid grid-cols-2 gap-2 px-3 py-2">
          <span>{row[0]}</span>
          <span className="font-semibold text-white/80">{row[1]}</span>
        </div>
      ))}
    </div>
  );
}
function NumberedSteps({ steps, accent }: { steps: string[][]; accent: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {steps.map(([title, text], index) => (
        <div key={title} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black"
              style={{ background: `${accent}20`, color: accent }}
            >
              {index + 1}
            </span>
            <p className="font-bold text-white">{title}</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
        </div>
      ))}
    </div>
  );
}
function ResponsiveTable({
  headers,
  rows,
  accent,
}: {
  headers: string[];
  rows: string[][];
  accent: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="min-w-[560px] w-full border-collapse text-left">
        <thead className="bg-white/[0.04]">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-[10px] font-black uppercase tracking-wide text-white/45"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row[0]}-${i}`} className="border-t border-white/[0.06]">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 align-top text-sm leading-6 ${ci === 0 ? "font-bold" : "text-white/68"}`}
                  style={ci === 0 ? { color: accent } : undefined}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function FunctionCards({ rows }: { rows: string[][] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map(([title, text]) => (
        <div key={title} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
          <p className="font-bold text-white">{title}</p>
          <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
        </div>
      ))}
    </div>
  );
}
function HighlightedParagraph({ parts }: { parts: string[][] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-8 text-white/78">
      {parts.map(([code, text]) => (
        <span key={code} className="mr-1">
          <span className="mr-1 inline-flex rounded-md bg-indigo-400/15 px-2 py-0.5 text-[10px] font-black text-indigo-200">
            {code}
          </span>
          {text}{" "}
        </span>
      ))}
    </div>
  );
}
function TeacherTips({ items }: { items: string[] }) {
  return (
    <InfoSection title="Tips Guru" icon={<Lightbulb />} accent="#34D399">
      <div className="grid gap-2 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-emerald-400/15 bg-emerald-400/[.07] p-3 text-sm leading-6 text-white/72"
          >
            {item}
          </div>
        ))}
      </div>
    </InfoSection>
  );
}
function Warnings({ items }: { items: string[] }) {
  return (
    <InfoSection title="Kesalahan Lazim" icon={<AlertTriangle />} accent="#FBBF24">
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[.07] p-3 text-sm leading-6 text-white/72"
          >
            <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
            {item}
          </div>
        ))}
      </div>
    </InfoSection>
  );
}
function Checklist({ items }: { items: string[] }) {
  return (
    <InfoSection title="Checklist" icon={<Check />} accent="#34D399">
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item}
            className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-sm text-white/72"
          >
            <input type="checkbox" className="h-4 w-4 accent-emerald-500" />
            {item}
          </label>
        ))}
      </div>
    </InfoSection>
  );
}
function Summary({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-indigo-300/20 bg-indigo-300/[.08] p-5">
      <p className="text-[10px] font-black uppercase tracking-[.18em] text-indigo-200">Ringkasan</p>
      <p className="mt-2 text-sm leading-7 text-white/78">{children}</p>
    </section>
  );
}
function Prompt({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <h4 className="font-bold text-white">{title}</h4>
      <div className="mt-2 text-sm leading-6 text-white/68">{children}</div>
      <div
        className="mt-4 h-20 rounded-lg border border-dashed border-white/10 bg-black/15"
        aria-label="Ruang jawapan murid"
      />
    </div>
  );
}
function RevealAnswer({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-11 w-full items-center justify-between px-4 text-left text-xs font-bold text-white/75 hover:bg-white/[.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40"
      >
        {" "}
        <span className="flex items-center gap-2">
          {open ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {label}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-white/[.07] p-4">{children}</div>}
    </div>
  );
}
