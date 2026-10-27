import type { MindNode } from "@/components/MindMap";

export const sejarahF2C3MindMap: MindNode = {
  id: "sejarah-f2-c3-root",
  label: "Sosiobudaya Kerajaan Alam Melayu",
  children: [
    {
      id: "sejarah-f2-c3-bahasa-tulisan",
      label: "📚 Bahasa dan Tulisan",
      children: [
        { id: "sejarah-f2-c3-bahasa-sanskrit", label: "Sanskrit: bahasa utama Funan; turut digunakan Champa, Angkor dan Kedah Tua" },
        { id: "sejarah-f2-c3-bahasa-melayu-kuno", label: "Bahasa Melayu: bahasa utama Srivijaya; Melayu Champa di Champa" },
        { id: "sejarah-f2-c3-tulisan-pallava", label: "Tulisan Palava: Champa, Srivijaya, Angkor dan Kedah Tua" },
        { id: "sejarah-f2-c3-tulisan-kawi", label: "Majapahit: bahasa Jawa Kuno, tulisan Kawi, kemudian Pegon" },
        { id: "sejarah-f2-c3-fungsi", label: "Fungsi: komunikasi dan rekod pemerintahan, perundangan, perdagangan, keagamaan" },
      ],
    },
    {
      id: "sejarah-f2-c3-persuratan",
      label: "🎭 Persuratan",
      children: [
        { id: "sejarah-f2-c3-persuratan-lisan", label: "Tradisi lisan: asal-usul, binatang, nasihat, seloka, teladan, adat" },
        { id: "sejarah-f2-c3-persuratan-epik", label: "Bukti awal: batu bersurat (Funan abad kedua; Kauthara 192 M)" },
        { id: "sejarah-f2-c3-persuratan-agama", label: "Saduran epik India: Ramayana, Mahabharata, Purana, Jataka" },
        { id: "sejarah-f2-c3-persuratan-istana", label: "Manuskrip: Nagarakertagama (Prapanca, 1365); Akayet Inra Patra" },
        { id: "sejarah-f2-c3-persuratan-nilai", label: "Pengaruh Islam: syair, gurindam, hikayat dan nazam" },
      ],
    },
    {
      id: "sejarah-f2-c3-seni-bina",
      label: "🎨 Seni Bina",
      children: [
        { id: "sejarah-f2-c3-seni-candi", label: "Candi: Go Cay Thi, Mi Son, Muara Takus, Candi Tikus, Lembah Bujang" },
        { id: "sejarah-f2-c3-seni-angkor", label: "Angkor Wat: Suryavarman II, abad ke-12, 208 hektar" },
        { id: "sejarah-f2-c3-seni-borobudur", label: "Borobudur: candi Buddha terbesar, abad kesembilan (Sailendra)" },
        { id: "sejarah-f2-c3-seni-bahan", label: "Perkapalan: kapal Funan (700 orang); Kun-lun-po di Palembang" },
        { id: "sejarah-f2-c3-seni-fungsi", label: "Pengairan: sistem pengairan Funan; baray Angkor (2 x 8 km)" },
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
            { id: "sejarah-f2-c3-sosial-raja", label: "Golongan diraja: raja dan kerabat, status tertinggi" },
            { id: "sejarah-f2-c3-sosial-bangsawan", label: "Bangsawan: pembesar, ilmuwan, golongan agama, pujangga" },
            { id: "sejarah-f2-c3-sosial-pembesar", label: "Peranan: mendukung pentadbiran, menjaga dan melindungi rakyat" },
          ],
        },
        {
          id: "sejarah-f2-c3-sosial-rakyat",
          label: "Golongan Diperintah",
          children: [
            { id: "sejarah-f2-c3-sosial-pedagang", label: "Rakyat merdeka: pekerja istana, askar, pedagang, nelayan" },
            { id: "sejarah-f2-c3-sosial-petani", label: "Rakyat merdeka: petani, penternak dan artisan" },
            { id: "sejarah-f2-c3-sosial-artisan", label: "Peranan: taat setia dan menjana ekonomi kerajaan" },
            { id: "sejarah-f2-c3-sosial-hamba", label: "Hamba: tawanan perang, hamba berhutang, rela menjadi hamba" },
          ],
        },
      ],
    },
  ],
};
