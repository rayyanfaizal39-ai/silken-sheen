import { AlertTriangle, BookOpen, Check, ChevronLeft, Sparkles, Star } from "lucide-react";
import { useMemo } from "react";
import type { ReactNode } from "react";

type SectionId =
  | "fakta"
  | "pendapat"
  | "perbincangan"
  | "pengalaman"
  | "surat-rasmi"
  | "surat-tidak-rasmi"
  | "laporan"
  | "ucapan"
  | "syarahan"
  | "dialog";

type LessonCard = {
  title: string;
  text: string;
};

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

const DATA: Record<SectionId, { hero: string; subtitle: string; sections: LessonCard[]; checklist: string[]; warning: string[] }> = {
  fakta: {
    hero: "Karangan Fakta",
    subtitle: "Kepentingan Menjaga Alam Sekitar",
    sections: [
      { title: "Penerangan Ringkas", text: "Karangan fakta menghuraikan topik secara objektif, tersusun dan berfakta." },
      { title: "Langkah Menjawab", text: "Baca soalan, kenal pasti kata kunci, pilih isi yang berkaitan dan kembangkan dengan contoh." },
      { title: "Analisis Soalan", text: "Fokus pada kepentingan menjaga alam sekitar, jadi isi mesti berkaitan dengan manfaat dan tindakan." },
      { title: "Rangka", text: "Pendahuluan, 5 isi, penutup. Gunakan penanda wacana untuk melicinkan aliran idea." },
      { title: "Contoh Karangan", text: "Alam sekitar yang bersih menjamin kesihatan, kesejahteraan dan masa depan generasi akan datang." },
      { title: "Tips Guru", text: "Latih murid guna 5W1H dan pastikan setiap isi ada huraian serta contoh." },
      { title: "Kesalahan Lazim", text: "Isi terlalu umum, tiada contoh, dan penutup terlalu pendek." },
      { title: "Ringkasan", text: "Fokus pada fakta, contoh relevan dan ayat majmuk yang jelas." },
    ],
    checklist: ["Tema dikenal pasti", "Isi mengikut soalan", "Contoh relevan", "Penanda wacana digunakan", "Penutup kemas"],
    warning: ["Jangan bercakap terlalu umum", "Jangan ulang isi yang sama", "Jangan tinggalkan penutup"],
  },
  pendapat: {
    hero: "Karangan Pendapat",
    subtitle: "Cara-cara Menghargai Jasa Guru",
    sections: [
      { title: "Penerangan Ringkas", text: "Karangan pendapat memerlukan pendirian yang jelas tetapi tetap sopan dan beralasan." },
      { title: "Analisis", text: "Soalan meminta cara menghargai jasa guru, jadi isi perlu berupa tindakan yang boleh dilakukan murid." },
      { title: "Isi", text: "Memberi ucapan terima kasih, menjaga adab, membantu guru dan menghormati nasihat mereka." },
      { title: "Contoh", text: "Murid boleh menulis kad ucapan, menyertai sambutan Hari Guru dan berdisiplin semasa di dalam kelas." },
      { title: "Tips Guru", text: "Galakkan murid menyatakan pendapat dengan kata-kata yang lembut tetapi matang." },
      { title: "Kesalahan Lazim", text: "Hanya menyebut guru baik tanpa huraian dan contoh." },
      { title: "Ringkasan", text: "Pendapat perlu disokong contoh supaya jawapan lebih meyakinkan." },
    ],
    checklist: ["Pendirian jelas", "Isi sesuai", "Contoh diberi", "Bahasa sopan", "Penutup ada kesimpulan"],
    warning: ["Jangan terlalu emosional", "Jangan lari daripada tajuk", "Jangan lupa contoh"],
  },
  perbincangan: {
    hero: "Karangan Perbincangan",
    subtitle: "Kebaikan dan Keburukan Telefon Pintar dalam Kalangan Remaja",
    sections: [
      { title: "Pendahuluan", text: "Karangan perbincangan membincangkan dua sisi sesuatu isu secara seimbang sebelum membuat rumusan." },
      { title: "Kebaikan", text: "Telefon pintar memudahkan komunikasi, pembelajaran dan pencarian maklumat." },
      { title: "Keburukan", text: "Penggunaan berlebihan boleh menyebabkan ketagihan, pembaziran masa dan gangguan fokus." },
      { title: "Rumusan", text: "Telefon pintar bermanfaat jika digunakan secara berhemah dan terkawal." },
      { title: "Tips Guru", text: "Latih murid guna frasa perbandingan seperti 'walau bagaimanapun' dan 'di samping itu'." },
      { title: "Kesalahan Lazim", text: "Hanya menghuraikan satu pihak sahaja tanpa keseimbangan." },
      { title: "Ringkasan", text: "Seimbang, jelas dan akhirnya ada pendirian yang matang." },
    ],
    checklist: ["Ada dua sudut", "Ada rumusan", "Ada pendirian", "Bahasa neutral", "Contoh mencukupi"],
    warning: ["Jangan berat sebelah", "Jangan tiada rumusan", "Jangan campur aduk isi"],
  },
  pengalaman: {
    hero: "Karangan Pengalaman",
    subtitle: "Pengalaman Menyertai Ekspedisi Berbasikal",
    sections: [
      { title: "Penerangan Ringkas", text: "Karangan pengalaman ditulis secara naratif dalam orang pertama dan mengikut kronologi." },
      { title: "Langkah Menjawab", text: "Tentukan masa, tempat, peristiwa penting dan pengajaran yang diperoleh." },
      { title: "Contoh", text: "Saya menyertai ekspedisi berbasikal bersama rakan sekolah pada hujung minggu." },
      { title: "Tips Guru", text: "Pastikan murid menggunakan ayat yang bercerita dan teratur." },
      { title: "Kesalahan Lazim", text: "Cerita tidak tersusun dan terlalu banyak isi kecil yang tidak penting." },
      { title: "Ringkasan", text: "Pengalaman mesti hidup, tersusun dan berakhir dengan pengajaran." },
    ],
    checklist: ["Orang pertama", "Kronologi jelas", "Pengajaran", "Contoh tepat", "Penutup menarik"],
    warning: ["Jangan lompat masa", "Jangan guna orang ketiga", "Jangan terlalu ringkas"],
  },
  "surat-rasmi": {
    hero: "Surat Kiriman Rasmi",
    subtitle: "Surat Aduan Tentang Masalah Sampah di Kawasan Perumahan",
    sections: [
      { title: "Format", text: "Alamat pengirim, alamat penerima, tarikh, tajuk, perenggan isi dan penutup rasmi." },
      { title: "Langkah Menjawab", text: "Nyatakan masalah, huraikan kesan, berikan cadangan dan akhiri dengan harapan." },
      { title: "Isi Bernombor", text: "Gunakan isi 1, isi 2 dan isi 3 supaya aduan lebih tersusun." },
      { title: "Contoh", text: "Masalah sampah menyebabkan bau busuk, pembiakan lalat dan suasana perumahan yang tidak selesa." },
      { title: "Tips Guru", text: "Tekankan penggunaan bahasa formal dan fakta yang jelas." },
      { title: "Kesalahan Lazim", text: "Format salah, bahasa tidak rasmi dan tiada nombor isi." },
      { title: "Ringkasan", text: "Surat rasmi mestilah kemas, sopan dan tepat." },
    ],
    checklist: ["Format lengkap", "Isi bernombor", "Bahasa rasmi", "Cadangan jelas", "Penutup sopan"],
    warning: ["Jangan guna bahasa santai", "Jangan lupa alamat", "Jangan hilang tajuk"],
  },
  "surat-tidak-rasmi": {
    hero: "Surat Kiriman Tidak Rasmi",
    subtitle: "Surat Kepada Kawan Menceritakan Persediaan Peperiksaan",
    sections: [
      { title: "Format", text: "Alamat pengirim, tarikh, sapaan mesra, isi dan penutup yang sesuai." },
      { title: "Langkah Menjawab", text: "Kongsi keadaan diri, jelaskan persediaan peperiksaan dan ajak kawan memberi khabar balas." },
      { title: "Contoh", text: "Saya menyusun jadual belajar, membuat nota ringkas dan menjawab latihan setiap hari." },
      { title: "Tips Guru", text: "Gunakan nada mesra tetapi masih baku." },
      { title: "Kesalahan Lazim", text: "Tiada sapaan, tiada penutup atau terlalu formal." },
      { title: "Ringkasan", text: "Surat tidak rasmi mesra, tersusun dan mudah dibaca." },
    ],
    checklist: ["Sapaan sesuai", "Isi tiga perenggan", "Penutup ada", "Bahasa mesra", "Format betul"],
    warning: ["Jangan terlalu rasmi", "Jangan lupa alamat", "Jangan tiada penutup"],
  },
  laporan: {
    hero: "Karangan Laporan",
    subtitle: "Laporan Aktiviti Perkhemahan Pengakap",
    sections: [
      { title: "Tajuk", text: "Tajuk laporan perlu jelas dan sesuai dengan aktiviti yang dijalankan." },
      { title: "Penerangan Ringkas", text: "Laporan menulis fakta aktiviti dengan ringkas, tepat dan berurutan." },
      { title: "Langkah Menjawab", text: "Nyatakan masa, tempat, tujuan, aktiviti dan hasil program." },
      { title: "Format", text: "Tajuk, perenggan isi dan penutup, biasanya diakhiri dengan nama pelapor." },
      { title: "Contoh", text: "Perkhemahan pengakap berjaya memupuk kerjasama, disiplin dan kemahiran hidup." },
      { title: "Tips Guru", text: "Minta murid menulis fakta, bukan pendapat." },
      { title: "Kesalahan Lazim", text: "Guna bahasa bercerita secara emosional atau tiada fakta lengkap." },
      { title: "Ringkasan", text: "Laporan ialah catatan rasmi tentang aktiviti yang telah berlaku." },
    ],
    checklist: ["Tajuk tepat", "Fakta jelas", "Kronologi ada", "Bahasa rasmi", "Penutup lengkap"],
    warning: ["Jangan bercampur pendapat", "Jangan tiada tajuk", "Jangan tiada urutan"],
  },
  ucapan: {
    hero: "Karangan Ucapan",
    subtitle: "Ucapan Ketua Murid Sempena Hari Guru",
    sections: [
      { title: "Format", text: "Sapaan, kata alu-aluan, isi, penutup dan ucapan terima kasih." },
      { title: "Kata Alu-aluan", text: "Mulakan dengan hormat kepada tetamu, guru dan hadirin yang hadir." },
      { title: "Isi", text: "Sisipkan penghargaan terhadap jasa guru, peranan murid dan harapan majlis." },
      { title: "Penutup", text: "Akhiri dengan harapan yang positif dan ucapan terima kasih." },
      { title: "Contoh", text: "Guru ialah insan yang sabar mendidik murid tanpa jemu dan tanpa mengira masa." },
      { title: "Tips Guru", text: "Latih murid menyebut nada yang sesuai dan ayat yang tersusun." },
      { title: "Kesalahan Lazim", text: "Sapaan tidak lengkap dan isi terlalu pendek." },
      { title: "Ringkasan", text: "Ucapan perlu beradab, tersusun dan menyentuh hati." },
    ],
    checklist: ["Sapaan lengkap", "Isi utama ada", "Nada sesuai", "Penutup kemas", "Terima kasih disebut"],
    warning: ["Jangan terlalu santai", "Jangan lupa hadirin", "Jangan kurang isi"],
  },
  syarahan: {
    hero: "Syarahan / Ceramah",
    subtitle: "Cara-cara Menjadi Murid Cemerlang",
    sections: [
      { title: "Pengenalan", text: "Kenalkan tajuk dan nyatakan kepentingannya kepada murid." },
      { title: "Isi", text: "Disiplin, jadual belajar, bertanya guru dan menjaga kesihatan membantu kecemerlangan." },
      { title: "Penutup", text: "Rumusan dan harapan supaya murid menjadi lebih cemerlang." },
      { title: "Tips Guru", text: "Gunakan suara yang meyakinkan dan ayat yang jelas." },
      { title: "Kesalahan Lazim", text: "Tiada pengenalan, isi terlalu umum dan penutup lemah." },
      { title: "Ringkasan", text: "Syarahan mestilah jelas, tersusun dan meyakinkan." },
    ],
    checklist: ["Ada pengenalan", "Isi relevan", "Penutup ada", "Bahasa meyakinkan", "Pemerhatian jelas"],
    warning: ["Jangan terlalu ringkas", "Jangan hilang fokus", "Jangan tiada penegasan"],
  },
  dialog: {
    hero: "Artikel / Laporan / Dialog",
    subtitle: "Pelbagai format, satu asas penulisan yang kemas",
    sections: [
      { title: "Tajuk", text: "Pastikan tajuk menunjukkan format dan isi utama dengan tepat." },
      { title: "Penerangan Ringkas", text: "Jenis ini menekankan susunan maklumat yang jelas mengikut format yang dikehendaki." },
      { title: "Langkah Menjawab", text: "Kenal pasti format yang betul sebelum menulis isi." },
      { title: "Format", text: "Setiap format ada ciri tersendiri: artikel, laporan dan dialog berbeza susunannya." },
      { title: "Contoh", text: "Dialog antara murid dan guru mesti bersahaja tetapi masih gramatis." },
      { title: "Tips Guru", text: "Tekankan perbezaan format supaya murid tidak keliru." },
      { title: "Kesalahan Lazim", text: "Mencampur aduk format sehingga hilang ciri asal." },
      { title: "Ringkasan", text: "Kenal format, ikut struktur dan tulis dengan kemas." },
    ],
    checklist: ["Format tepat", "Isi kemas", "Contoh jelas", "Bahasa baku", "Ringkasan ada"],
    warning: ["Jangan campur format", "Jangan hilang ciri utama", "Jangan tiada penutup"],
  },
};

function HeaderBadge({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <span className="rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide" style={{ borderColor: `${accent}35`, color: accent, background: `${accent}12` }}>
      {children}
    </span>
  );
}

export function BMForm2ModelKaranganBankContent({ sectionId, accent }: { sectionId: string; accent: string }) {
  const key = (sectionId in DATA ? sectionId : "fakta") as SectionId;
  const data = DATA[key];
  const checklist = useMemo(() => data.checklist, [data]);

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-yellow-300/20 bg-[#15130d] p-5 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(251,191,36,0.16),transparent_45%),radial-gradient(circle_at_8%_100%,rgba(129,140,248,0.1),transparent_42%)]" />
        <div className="relative">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[0.1] text-amber-300">
              <Star className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">Model Karangan Bank</p>
              <h1 className="mt-1 font-display text-2xl font-black text-white sm:text-4xl">{data.hero}</h1>
              <p className="mt-2 text-sm leading-7 text-white/65 sm:text-base">{data.subtitle}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <HeaderBadge accent="#FBBF24">Form 2</HeaderBadge>
            <HeaderBadge accent="#34D399">Template</HeaderBadge>
            <HeaderBadge accent="#60A5FA">Contoh Cemerlang</HeaderBadge>
          </div>
        </div>
      </section>

      <Shell title="Penerangan Ringkas" accent={accent} icon={<BookOpen className="h-4 w-4" />}>
        <Card title="Nota" text="Setiap model membantu murid memahami struktur, pilihan isi dan teknik menulis bagi karangan Tingkatan 2." accent={accent} />
      </Shell>

      <Shell title="Langkah Menjawab" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
        <div className="grid gap-2 md:grid-cols-2">
          {data.sections.slice(0, 2).map((item) => (
            <Card key={item.title} title={item.title} text={item.text} accent={accent} />
          ))}
        </div>
      </Shell>

      <Shell title="Analisis / Isi / Contoh" accent={accent} icon={<Sparkles className="h-4 w-4" />}>
        <div className="grid gap-2 md:grid-cols-2">
          {data.sections.slice(2, 5).map((item) => (
            <Card key={item.title} title={item.title} text={item.text} accent={accent} />
          ))}
        </div>
      </Shell>

      <Shell title="Tips Guru" accent={accent} icon={<Check className="h-4 w-4" />}>
        <div className="grid gap-2 md:grid-cols-2">
          <Card title="Panduan" text={data.sections.find((s) => s.title === "Tips Guru")?.text ?? "Latih murid mengenal format dan membina ayat yang jelas."} accent="#34D399" />
          <Card title="Ringkas" text="Bimbing murid semak struktur, bahasa dan contoh sebelum menghantar jawapan." accent="#34D399" />
        </div>
      </Shell>

      <Shell title="Checklist Penulisan" accent={accent} icon={<Check className="h-4 w-4" />}>
        <Checklist items={checklist} />
      </Shell>

      <Shell title="Kesalahan Lazim" accent={accent} icon={<AlertTriangle className="h-4 w-4" />}>
        <div className="space-y-2.5">
          {data.warning.map((item) => (
            <div key={item} className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-3">
              <p className="text-sm leading-6 text-white/75">{item}</p>
            </div>
          ))}
        </div>
      </Shell>

      <Shell title="Ringkasan" accent={accent} icon={<BookOpen className="h-4 w-4" />}>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-7 text-white/75">
          {data.sections[data.sections.length - 1]?.text}
        </div>
      </Shell>
    </div>
  );
}
