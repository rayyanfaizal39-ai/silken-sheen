import { AlertTriangle, BookOpen, Check, Sparkles, Star } from "lucide-react";
import type { ReactNode } from "react";

type SectionId = "asas-formula" | "teknik-menjawab" | "contoh-latihan";

function Shell({ title, children, accent, icon }: { title: string; children: ReactNode; accent: string; icon?: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-4">
        {icon && <span style={{ color: accent }}>{icon}</span>}
        <h3 className="font-display text-base font-bold text-white">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Card({ title, text, accent }: { title: string; text: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <p className="text-[10px] font-black uppercase tracking-wide" style={{ color: accent }}>
        {title}
      </p>
      <p className="mt-2 text-sm leading-7 text-white/75">{text}</p>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-sm text-white/75">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

const PERIBAHASA_BANK_DATA: Record<
  SectionId,
  {
    title: string;
    subtitle: string;
    sections: { title: string; text: string }[];
    checklist: string[];
    warning: string[];
  }
> = {
  "asas-formula": {
    title: "Asas & Formula",
    subtitle: "Seni Membina Karangan Cemerlang, analisis tugasan dan rangka karangan.",
    sections: [
      { title: "Penerangan Ringkas", text: "Peribahasa menjadikan karangan lebih matang, bernilai dan berkesan apabila digunakan secara tepat mengikut konteks." },
      { title: "Analisis Tugasan (TFT)", text: "Tentukan tema, fokus dan tugasan. Fahami maksud soalan sebelum memilih peribahasa yang sesuai." },
      { title: "Rangka Karangan", text: "Susun idea mengikut pendahuluan, isi dan penutup supaya penggunaan peribahasa tidak terpisah daripada huraian." },
      { title: "Formula I-H-C-P", text: "Isi, Huraian, Contoh, Peribahasa / Penegasan. Formula ini membantu peribahasa hadir dengan semula jadi." },
      { title: "Tips Guru", text: "Latih murid menghafal peribahasa mengikut tema dan memadankannya dengan isi yang hendak dihuraikan." },
      { title: "Kesalahan Lazim", text: "Ejaan salah, maksud tidak tepat, dan penggunaan peribahasa yang tidak berkaitan dengan isi." },
      { title: "Checklist", text: "Murid memahami maksud, tema, konteks, ejaan dan ayat lengkap sebelum menggunakan peribahasa." },
      { title: "Ringkasan", text: "Asas yang kukuh memudahkan murid menggunakan peribahasa secara tepat dan meyakinkan dalam karangan." },
    ],
    checklist: [
      "Tema dikenal pasti",
      "Maksud peribahasa difahami",
      "Ayat lengkap dibina",
      "Susunan kata tepat",
      "Contoh sesuai dengan isi",
    ],
    warning: [
      "Jangan gunakan peribahasa yang tidak sesuai dengan tema",
      "Jangan ubah susunan perkataan peribahasa",
      "Jangan masukkan terlalu banyak peribahasa dalam satu perenggan",
    ],
  },
  "teknik-menjawab": {
    title: "Teknik Menjawab",
    subtitle: "Langkah menjawab karangan yang memerlukan peribahasa dengan berkesan.",
    sections: [
      { title: "Penerangan Ringkas", text: "Peribahasa perlu diselitkan secara semula jadi dalam pendahuluan, isi dan penutup karangan." },
      { title: "Langkah Menjawab", text: "Baca soalan, kenal pasti tema, pilih isi, padankan peribahasa dan masukkan peribahasa selepas huraian atau contoh." },
      { title: "Penerapan Dalam Jawapan", text: "Gunakan peribahasa sebagai penegas kepada isi, bukan sebagai hiasan semata-mata." },
      { title: "Contoh", text: "Jelaslah bahawa kejayaan memerlukan usaha kerana belakang parang pun kalau diasah nescaya tajam." },
      { title: "Tips Guru", text: "Galakkan murid mengaitkan peribahasa dengan nilai murni, pengajaran dan kesan terhadap pembaca." },
      { title: "Kesalahan Lazim", text: "Terlalu banyak peribahasa, tidak sepadan dengan isi, dan ayat sebelum serta selepas tidak berkait." },
      { title: "Ringkasan", text: "Peribahasa yang baik ialah peribahasa yang menguatkan hujah dan menjadikan jawapan lebih matang." },
    ],
    checklist: [
      "Peribahasa menyokong isi",
      "Penggunaan semula jadi",
      "Ayat gramatis",
      "Ejaan tepat",
      "Tidak berlebihan",
    ],
    warning: [
      "Jangan guna peribahasa hanya kerana ingin menambah hiasan",
      "Jangan memasukkan peribahasa yang tidak difahami maksudnya",
      "Jangan mengulang frasa yang sama tanpa tujuan",
    ],
  },
  "contoh-latihan": {
    title: "Contoh & Latihan",
    subtitle: "Contoh penggunaan peribahasa dan latihan pengukuhan mengikut tema.",
    sections: [
      { title: "Tajuk", text: "Bank peribahasa mengikut tema untuk membantu murid mencari ungkapan yang sesuai dengan isi karangan." },
      { title: "Contoh Penggunaan", text: "Peribahasa seperti bagaikan aur dengan tebing dan seperti isi dengan kuku sesuai untuk tema perpaduan dan persahabatan." },
      { title: "Latihan", text: "Padankan peribahasa dengan maksud, bina ayat sendiri dan gunakan dalam perenggan ringkas." },
      { title: "Tips Guru", text: "Gunakan kad imbas, kuiz cepat dan latihan berpasangan supaya murid mudah mengingat peribahasa." },
      { title: "Kesalahan Lazim", text: "Memilih tema yang salah, membina ayat yang tidak menunjukkan maksud sebenar, dan menukar susunan kata." },
      { title: "Ringkasan", text: "Latihan yang konsisten membantu murid menguasai peribahasa dengan yakin dalam penulisan." },
    ],
    checklist: [
      "Maksud peribahasa diingati",
      "Tema dipadankan dengan betul",
      "Ayat gramatis dibina",
      "Contoh sesuai",
      "Latihan disemak semula",
    ],
    warning: [
      "Jangan pilih peribahasa secara rawak",
      "Jangan mengubah kata-kata tetap peribahasa",
      "Jangan abaikan latihan membina ayat",
    ],
  },
};

function HeaderBadge({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <span
      className="rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide"
      style={{ borderColor: `${accent}35`, color: accent, background: `${accent}12` }}
    >
      {children}
    </span>
  );
}

export function BMForm2PeribahasaBankContent({ sectionId, accent }: { sectionId: string; accent: string }) {
  const key = (sectionId in PERIBAHASA_BANK_DATA ? sectionId : "asas-formula") as SectionId;
  const data = PERIBAHASA_BANK_DATA[key];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-emerald-300/20 bg-[#101613] p-5 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(52,211,153,0.16),transparent_45%),radial-gradient(circle_at_8%_100%,rgba(129,140,248,0.1),transparent_42%)]" />
        <div className="relative">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.1] text-emerald-300">
              <Star className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Peribahasa Bank</p>
              <h1 className="mt-1 font-display text-2xl font-black text-white sm:text-4xl">{data.title}</h1>
              <p className="mt-2 text-sm leading-7 text-white/65 sm:text-base">{data.subtitle}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <HeaderBadge accent="#34D399">Form 2</HeaderBadge>
            <HeaderBadge accent="#60A5FA">Folder 01</HeaderBadge>
            <HeaderBadge accent="#A78BFA">Folder 02</HeaderBadge>
            <HeaderBadge accent="#F472B6">Folder 03</HeaderBadge>
          </div>
        </div>
      </section>

      <Shell title={data.sections[0].title} accent={accent} icon={<BookOpen className="h-4 w-4" />}>
        <Card title="Nota" text={data.sections[0].text} accent={accent} />
      </Shell>

      {key === "asas-formula" && (
        <div className="space-y-5">
          <Shell title="Analisis Tugasan (TFT)" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
            <Card title="Fokus" text="Tentukan tema, fokus dan tugasan supaya peribahasa yang dipilih benar-benar sesuai dengan soalan." accent={accent} />
          </Shell>
          <Shell title="Rangka Karangan" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
            <div className="grid gap-2 md:grid-cols-2">
              <Card title="Pendahuluan" text="Perkenalkan tajuk secara umum dan selitkan peribahasa jika sesuai." accent={accent} />
              <Card title="Isi" text="Sampaikan isi utama, huraian dan contoh sebelum memasukkan peribahasa yang tepat." accent={accent} />
              <Card title="Penutup" text="Rumusan akhir boleh disokong oleh peribahasa yang ringkas dan bermakna." accent={accent} />
              <Card title="Semakan" text="Pastikan penggunaan peribahasa tidak menjejaskan fokus karangan." accent={accent} />
            </div>
          </Shell>
          <Shell title="Formula I-H-C-P" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[72px_1fr] bg-white/[0.03] text-[10px] font-black uppercase tracking-wide text-white/40">
                <div className="px-3 py-2">Kod</div>
                <div className="px-3 py-2">Komponen</div>
              </div>
              {[
                ["I", "Isi", "Nyatakan isi utama yang ingin diperkukuh."],
                ["H", "Huraian", "Terangkan sebab atau penjelasan bagi isi tersebut."],
                ["C", "Contoh", "Berikan contoh yang sesuai dan mudah difahami."],
                ["P", "Peribahasa / Penegasan", "Masukkan peribahasa yang tepat sebagai penegas."],
              ].map((row, index) => (
                <div key={row[0]} className={`grid grid-cols-[72px_1fr] ${index !== 3 ? "border-t border-white/5" : ""}`}>
                  <div className="px-3 py-3">
                    <span className="inline-flex rounded-lg px-2 py-1 text-[10px] font-black" style={{ background: `${accent}25`, color: accent }}>
                      {row[0]}
                    </span>
                  </div>
                  <div className="px-3 py-3 text-sm leading-6 text-white/75">
                    <p className="font-semibold text-white">{row[1]}</p>
                    <p className="mt-1">{row[2]}</p>
                  </div>
                </div>
              ))}
            </div>
          </Shell>
        </div>
      )}

      {key === "teknik-menjawab" && (
        <div className="space-y-5">
          <Shell title="Langkah Demi Langkah" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-2">
              <Card title="1. Baca Soalan" text="Kenal pasti tema dan kehendak soalan terlebih dahulu." accent={accent} />
              <Card title="2. Pilih Isi" text="Cari isi yang boleh diperkukuh dengan peribahasa yang sesuai." accent={accent} />
              <Card title="3. Huraikan" text="Kembangkan isi dengan jelas sebelum menyelitkan peribahasa." accent={accent} />
              <Card title="4. Letak Peribahasa" text="Sisipkan peribahasa selepas huraian atau contoh supaya ayat lebih hidup." accent={accent} />
              <Card title="5. Semak" text="Pastikan tiada kesilapan ejaan dan susunan perkataan." accent={accent} />
            </div>
          </Shell>
          <Shell title="Contoh Penggunaan" accent={accent} icon={<BookOpen className="h-4 w-4" />}>
            <Card
              title="Contoh"
              text="Murid yang rajin mengulang kaji pelajaran akan mencapai kejayaan. Bak kata peribahasa, belakang parang pun kalau diasah nescaya tajam."
              accent={accent}
            />
          </Shell>
          <Shell title="Tips Guru" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
            <div className="grid gap-2 md:grid-cols-2">
              <Card title="Pembimbingan" text="Bimbing murid memilih peribahasa yang benar-benar menguatkan isi, bukan sekadar menyelitkan ungkapan." accent="#34D399" />
              <Card title="Latihan" text="Minta murid menulis semula perenggan dengan formula I-H-C-P supaya lebih teratur." accent="#34D399" />
            </div>
          </Shell>
          <Shell title="Kesalahan Lazim" accent={accent} icon={<AlertTriangle className="h-4 w-4" />}>
            <Checklist
              items={[
                "peribahasa diselitkan tanpa kaitan dengan isi",
                "peribahasa diulang terlalu kerap",
                "ayat sebelum dan selepas tidak berkait",
                "maksud peribahasa tidak difahami",
              ]}
            />
          </Shell>
          <Shell title="Ringkasan" accent={accent} icon={<BookOpen className="h-4 w-4" />}>
            <Card title="Rumusan" text="Peribahasa perlu digunakan secara natural, tepat dan berfungsi sebagai penegas kepada isi karangan." accent={accent} />
          </Shell>
        </div>
      )}

      {key === "contoh-latihan" && (
        <div className="space-y-5">
          <Shell title="Bank Peribahasa" accent={accent} icon={<Star className="h-4 w-4" />}>
            <div className="grid gap-2 md:grid-cols-2">
              <Card title="Pendidikan" text="Malu bertanya sesat jalan; Belakang parang pun kalau diasah nescaya tajam." accent={accent} />
              <Card title="Keluarga" text="Bagaimana acuan, begitulah kuihnya; Satu bantal satu mimpi." accent={accent} />
              <Card title="Perpaduan" text="Bulat air kerana pembetung, bulat manusia kerana muafakat; Bagaikan aur dengan tebing." accent={accent} />
              <Card title="Persahabatan" text="Seperti isi dengan kuku; Seperti belangkas." accent={accent} />
              <Card title="Kerajinan" text="Sediakan payung sebelum hujan; Di mana ada kemahuan, di situ ada jalan." accent={accent} />
              <Card title="Nilai Murni" text="Budi bahasa budaya kita; Bersatu teguh bercerai roboh." accent={accent} />
            </div>
          </Shell>
          <Shell title="Latihan Pengukuhan" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
            <div className="space-y-3">
              <Card title="Latihan 1" text="Padankan peribahasa dengan tema yang betul." accent="#38BDF8" />
              <Card title="Latihan 2" text="Bina satu ayat lengkap menggunakan setiap peribahasa yang diberi." accent="#38BDF8" />
              <Card title="Latihan 3" text="Tulis satu perenggan ringkas yang mengandungi sekurang-kurangnya satu peribahasa." accent="#38BDF8" />
            </div>
          </Shell>
          <Shell title="Tips Guru" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
            <Checklist
              items={[
                "hafal peribahasa mengikut tema",
                "gunakan kad imbas atau kuiz ringkas",
                "latih murid membina ayat sendiri",
                "ulang kaji maksud sebelum latihan penulisan",
              ]}
            />
          </Shell>
          <Shell title="Kesalahan Lazim" accent={accent} icon={<AlertTriangle className="h-4 w-4" />}>
            <Checklist
              items={[
                "memadankan tema secara salah",
                "menukar susunan kata peribahasa",
                "membina ayat yang tidak menggambarkan maksud sebenar",
                "menghafal tanpa memahami konteks",
              ]}
            />
          </Shell>
          <Shell title="Ringkasan" accent={accent} icon={<BookOpen className="h-4 w-4" />}>
            <Card title="Inti" text="Latihan yang berulang membantu murid menggunakan peribahasa dengan lebih yakin, tepat dan semula jadi dalam penulisan." accent={accent} />
          </Shell>
        </div>
      )}
    </div>
  );
}
