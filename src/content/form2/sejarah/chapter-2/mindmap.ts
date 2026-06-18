import type { MindNode } from "@/components/MindMap";

export const sejarahF2C2MindMap: MindNode = {
  id: "sejarah-f2-c2-root",
  label: "Sistem Pemerintahan dan Ekonomi Kerajaan Alam Melayu",
  children: [
    {
      id: "sejarah-f2-c2-pemerintahan",
      label: "👑 Sistem Pemerintahan Beraja",
      children: [
        {
          id: "sejarah-f2-c2-funan",
          label: "Kerajaan Funan",
          children: [
            { id: "sejarah-f2-c2-funan-raja", label: "Raja menggunakan gelaran kurung bnam" },
            { id: "sejarah-f2-c2-funan-kuasa", label: "Raja berkuasa mutlak" },
            { id: "sejarah-f2-c2-funan-pembesar", label: "Dibantu golongan agama dan pembesar" },
          ],
        },
        {
          id: "sejarah-f2-c2-champa",
          label: "Kerajaan Champa",
          children: [
            { id: "sejarah-f2-c2-champa-raja", label: "Raja dianggap pemerintah suci" },
            { id: "sejarah-f2-c2-champa-pusat", label: "Pentadbiran berpusat di ibu kota" },
            { id: "sejarah-f2-c2-champa-wilayah", label: "Wilayah ditadbir oleh pembesar" },
          ],
        },
        {
          id: "sejarah-f2-c2-srivijaya",
          label: "Kerajaan Srivijaya",
          children: [
            { id: "sejarah-f2-c2-srivijaya-raja", label: "Raja sebagai ketua kerajaan maritim" },
            { id: "sejarah-f2-c2-srivijaya-datu", label: "Datu mentadbir kawasan jajahan" },
            { id: "sejarah-f2-c2-srivijaya-kesetiaan", label: "Kesetiaan rakyat diperkukuh melalui upacara persetiaan" },
          ],
        },
        {
          id: "sejarah-f2-c2-angkor",
          label: "Kerajaan Angkor",
          children: [
            { id: "sejarah-f2-c2-angkor-dewaraja", label: "Konsep dewaraja mengukuhkan kedudukan raja" },
            { id: "sejarah-f2-c2-angkor-pembesar", label: "Pembesar pusat dan wilayah membantu raja" },
            { id: "sejarah-f2-c2-angkor-undang", label: "Undang-undang mengawal pentadbiran" },
          ],
        },
        {
          id: "sejarah-f2-c2-majapahit",
          label: "Kerajaan Majapahit",
          children: [
            { id: "sejarah-f2-c2-majapahit-raja", label: "Raja dibantu pembesar utama" },
            { id: "sejarah-f2-c2-majapahit-patih", label: "Patih Gajah Mada memantapkan pemerintahan" },
            { id: "sejarah-f2-c2-majapahit-wilayah", label: "Wilayah naungan dikawal melalui pentadbiran tersusun" },
          ],
        },
        {
          id: "sejarah-f2-c2-kedah-gangga",
          label: "Kedah Tua & Gangga Nagara",
          children: [
            { id: "sejarah-f2-c2-kedah-raja", label: "Raja menjadi pusat pemerintahan" },
            { id: "sejarah-f2-c2-kedah-pelabuhan", label: "Pembesar mengurus pelabuhan dan perdagangan" },
            { id: "sejarah-f2-c2-gangga-pertahanan", label: "Pertahanan penting untuk melindungi kerajaan" },
          ],
        },
      ],
    },
    {
      id: "sejarah-f2-c2-ekonomi",
      label: "💰 Kegiatan Ekonomi",
      children: [
        {
          id: "sejarah-f2-c2-pertanian",
          label: "Pertanian",
          children: [
            { id: "sejarah-f2-c2-pertanian-padi", label: "Penanaman padi sebagai sumber makanan utama" },
            { id: "sejarah-f2-c2-pertanian-irigasi", label: "Sistem pengairan meningkatkan hasil" },
            { id: "sejarah-f2-c2-pertanian-angkor", label: "Angkor terkenal dengan baray" },
          ],
        },
        {
          id: "sejarah-f2-c2-perdagangan",
          label: "Perdagangan",
          children: [
            { id: "sejarah-f2-c2-perdagangan-pelabuhan", label: "Pelabuhan menjadi pusat tukaran barang" },
            { id: "sejarah-f2-c2-perdagangan-entrepot", label: "Srivijaya dan Kedah Tua berperanan sebagai entrepot" },
            { id: "sejarah-f2-c2-perdagangan-laluan", label: "Laluan Selat Melaka dan Laut China Selatan strategik" },
          ],
        },
        {
          id: "sejarah-f2-c2-hasil",
          label: "Hasil Hutan dan Laut",
          children: [
            { id: "sejarah-f2-c2-hasil-hutan", label: "Hasil hutan: gaharu, kapur barus, rotan dan damar" },
            { id: "sejarah-f2-c2-hasil-laut", label: "Hasil laut: ikan, mutiara dan kulit penyu" },
            { id: "sejarah-f2-c2-hasil-dagang", label: "Menjadi barangan dagangan bernilai" },
          ],
        },
        {
          id: "sejarah-f2-c2-lombong",
          label: "Perlombongan dan Pembuatan",
          children: [
            { id: "sejarah-f2-c2-lombong-logam", label: "Perlombongan emas, bijih besi dan timah" },
            { id: "sejarah-f2-c2-pembuatan-tembikar", label: "Pembuatan tembikar dan peralatan harian" },
            { id: "sejarah-f2-c2-pembuatan-kapal", label: "Kemahiran membuat kapal menyokong perdagangan maritim" },
          ],
        },
      ],
    },
  ],
};
