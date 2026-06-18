import type { MindNode } from "@/components/MindMap";

export const sejarahF2C3MindMap: MindNode = {
  id: "sejarah-f2-c3-root",
  label: "Sosiobudaya Kerajaan Alam Melayu",
  children: [
    {
      id: "sejarah-f2-c3-bahasa-tulisan",
      label: "📚 Bahasa dan Tulisan",
      children: [
        { id: "sejarah-f2-c3-bahasa-sanskrit", label: "Bahasa Sanskrit digunakan dalam prasasti awal" },
        { id: "sejarah-f2-c3-bahasa-melayu-kuno", label: "Bahasa Melayu Kuno berkembang dalam kerajaan maritim" },
        { id: "sejarah-f2-c3-tulisan-pallava", label: "Tulisan Pallava digunakan pada batu bersurat" },
        { id: "sejarah-f2-c3-tulisan-kawi", label: "Tulisan Kawi berkembang di Jawa dan Alam Melayu" },
        { id: "sejarah-f2-c3-fungsi", label: "Fungsi: pentadbiran, agama, perdagangan dan ilmu" },
      ],
    },
    {
      id: "sejarah-f2-c3-persuratan",
      label: "🎭 Persuratan",
      children: [
        { id: "sejarah-f2-c3-persuratan-lisan", label: "Tradisi lisan menyampaikan cerita dan nasihat" },
        { id: "sejarah-f2-c3-persuratan-epik", label: "Epik dan hikayat mengangkat tokoh serta kerajaan" },
        { id: "sejarah-f2-c3-persuratan-agama", label: "Karya agama dipengaruhi Hindu, Buddha dan Islam" },
        { id: "sejarah-f2-c3-persuratan-istana", label: "Istana menjadi pusat perkembangan persuratan" },
        { id: "sejarah-f2-c3-persuratan-nilai", label: "Nilai: kepahlawanan, kesetiaan dan kebijaksanaan" },
      ],
    },
    {
      id: "sejarah-f2-c3-seni-bina",
      label: "🎨 Seni Bina",
      children: [
        { id: "sejarah-f2-c3-seni-candi", label: "Candi menjadi pusat ibadat dan lambang kuasa" },
        { id: "sejarah-f2-c3-seni-angkor", label: "Angkor Wat menunjukkan kemajuan seni bina Angkor" },
        { id: "sejarah-f2-c3-seni-borobudur", label: "Borobudur menunjukkan pengaruh Buddha" },
        { id: "sejarah-f2-c3-seni-bahan", label: "Bahan binaan: batu, bata dan kayu" },
        { id: "sejarah-f2-c3-seni-fungsi", label: "Fungsi: agama, pentadbiran, pertahanan dan simbol kerajaan" },
      ],
    },
    {
      id: "sejarah-f2-c3-struktur-sosial",
      label: "👥 Struktur Sosial",
      children: [
        {
          id: "sejarah-f2-c3-sosial-atasan",
          label: "Golongan Pemerintah",
          children: [
            { id: "sejarah-f2-c3-sosial-raja", label: "Raja berada pada lapisan tertinggi" },
            { id: "sejarah-f2-c3-sosial-bangsawan", label: "Kerabat diraja dan bangsawan membantu pemerintahan" },
            { id: "sejarah-f2-c3-sosial-pembesar", label: "Pembesar mengurus wilayah dan pentadbiran" },
          ],
        },
        {
          id: "sejarah-f2-c3-sosial-rakyat",
          label: "Golongan Diperintah",
          children: [
            { id: "sejarah-f2-c3-sosial-pedagang", label: "Pedagang menjalankan kegiatan ekonomi" },
            { id: "sejarah-f2-c3-sosial-petani", label: "Petani menghasilkan sumber makanan" },
            { id: "sejarah-f2-c3-sosial-artisan", label: "Artisan menghasilkan barangan dan binaan" },
            { id: "sejarah-f2-c3-sosial-hamba", label: "Hamba berada pada lapisan paling bawah" },
          ],
        },
      ],
    },
  ],
};
