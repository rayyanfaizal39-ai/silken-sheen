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
            { id: "sejarah-f2-c2-funan-kuasa", label: "Dibantu golongan agama dan golongan tentera" },
            { id: "sejarah-f2-c2-funan-pembesar", label: "Dibantu golongan agama dan pembesar" },
          ],
        },
        {
          id: "sejarah-f2-c2-champa",
          label: "Kerajaan Champa",
          children: [
            { id: "sejarah-f2-c2-champa-raja", label: "Raja dianggap pemerintah suci" },
            { id: "sejarah-f2-c2-champa-pusat", label: "Lima wilayah: Indrapura, Amaravati, Vijaya, Kauthara, Panduranga" },
            { id: "sejarah-f2-c2-champa-wilayah", label: "Wilayah ditadbir oleh pembesar" },
          ],
        },
        {
          id: "sejarah-f2-c2-srivijaya",
          label: "Kerajaan Srivijaya",
          children: [
            { id: "sejarah-f2-c2-srivijaya-raja", label: "Raja di Gunung, Maharaja di Pulau" },
            { id: "sejarah-f2-c2-srivijaya-datu", label: "Datu mentadbir kawasan jajahan" },
            { id: "sejarah-f2-c2-srivijaya-kesetiaan", label: "Wilayah Kedatuan dan Pradatuan ditadbir Datu" },
          ],
        },
        {
          id: "sejarah-f2-c2-angkor",
          label: "Kerajaan Angkor",
          children: [
            { id: "sejarah-f2-c2-angkor-dewaraja", label: "Konsep dewaraja mengukuhkan kedudukan raja" },
            { id: "sejarah-f2-c2-angkor-pembesar", label: "Pembesar pusat dan wilayah membantu raja" },
            { id: "sejarah-f2-c2-angkor-undang", label: "Wilayah → daerah → daerah kecil → kampung" },
          ],
        },
        {
          id: "sejarah-f2-c2-majapahit",
          label: "Kerajaan Majapahit",
          children: [
            { id: "sejarah-f2-c2-majapahit-raja", label: "Raja dibantu pembesar utama" },
            { id: "sejarah-f2-c2-majapahit-patih", label: "Wanita kerabat diraja menganggotai Sapta Prabu" },
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
            { id: "sejarah-f2-c2-perdagangan-entrepot", label: "Pelabuhan dilengkapi bekalan air, tempat tinggal dan tempat menyimpan barang" },
            { id: "sejarah-f2-c2-perdagangan-laluan", label: "Terletak di tengah laluan perdagangan timur dan barat" },
          ],
        },
        {
          id: "sejarah-f2-c2-hasil",
          label: "Hasil Hutan dan Laut",
          children: [
            { id: "sejarah-f2-c2-hasil-hutan", label: "Hasil hutan: gaharu, kapur barus, rotan dan damar" },
            { id: "sejarah-f2-c2-hasil-laut", label: "Hasil laut: gamat, mutiara dan rumpai laut" },
            { id: "sejarah-f2-c2-hasil-dagang", label: "Menjadi barangan dagangan bernilai" },
          ],
        },
        {
          id: "sejarah-f2-c2-lombong",
          label: "Perlombongan dan Pembuatan",
          children: [
            { id: "sejarah-f2-c2-lombong-logam", label: "Perlombongan emas, perak dan bijih besi secara mendulang" },
            { id: "sejarah-f2-c2-pembuatan-tembikar", label: "Champa: tembikar dan cuka kelapa" },
            { id: "sejarah-f2-c2-pembuatan-kapal", label: "Majapahit: garam, gula, minyak dan mi daripada beras" },
          ],
        },
      ],
    },
  ],
};
