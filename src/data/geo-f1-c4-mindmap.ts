import type { MindNode } from "@/components/MindMap";

export const geoF1C4MindMap: MindNode = {
  id: "root",
  label: "Lakaran Peta Malaysia",
  children: [
    {
      id: "c1",
      label: "Semenanjung Malaysia (11 Negeri)",
      children: [
        {
          id: "c1-1",
          label: "Utara",
          children: [
            { id: "c1-1-1", label: "Perlis — Kangar (terkecil, paling utara)" },
            { id: "c1-1-2", label: "Kedah — Alor Setar (Jelapang Padi)" },
            { id: "c1-1-3", label: "Pulau Pinang — George Town" },
          ],
        },
        {
          id: "c1-2",
          label: "Tengah",
          children: [
            { id: "c1-2-1", label: "Perak — Ipoh (bijih timah)" },
            { id: "c1-2-2", label: "Selangor — Shah Alam (paling maju)" },
          ],
        },
        {
          id: "c1-3",
          label: "Selatan",
          children: [
            { id: "c1-3-1", label: "Negeri Sembilan — Seremban (adat perpatih)" },
            { id: "c1-3-2", label: "Melaka — Bandaraya Melaka (bersejarah)" },
            { id: "c1-3-3", label: "Johor — Johor Bahru (paling selatan)" },
          ],
        },
        {
          id: "c1-4",
          label: "Pantai Timur",
          children: [
            { id: "c1-4-1", label: "Pahang — Kuantan (terbesar Semenanjung)" },
            { id: "c1-4-2", label: "Terengganu — Kuala Terengganu" },
            { id: "c1-4-3", label: "Kelantan — Kota Bharu (sempadan Thailand)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Malaysia Timur (2 Negeri di Borneo)",
      children: [
        { id: "c2-1", label: "Sarawak — Kuching (terbesar di Malaysia)" },
        { id: "c2-2", label: "Sabah — Kota Kinabalu (Gunung Kinabalu)" },
      ],
    },
    {
      id: "c3",
      label: "3 Wilayah Persekutuan",
      children: [
        { id: "c3-1", label: "Kuala Lumpur — ibu negara & kewangan" },
        { id: "c3-2", label: "Putrajaya — pusat pentadbiran persekutuan" },
        { id: "c3-3", label: "Labuan — kewangan luar pesisir antarabangsa" },
      ],
    },
    {
      id: "c4",
      label: "Negara Jiran",
      children: [
        { id: "c4-1", label: "Thailand — utara Semenanjung" },
        { id: "c4-2", label: "Brunei — dalam Sarawak (Borneo)" },
        { id: "c4-3", label: "Indonesia — selatan Borneo" },
        { id: "c4-4", label: "Singapura — selatan Johor" },
      ],
    },
    {
      id: "c5",
      label: "Langkah Melakar Peta Malaysia",
      children: [
        { id: "c5-1", label: "1. Lukis bingkai peta" },
        { id: "c5-2", label: "2. Lakar bentuk Semenanjung & Borneo" },
        { id: "c5-3", label: "3. Lukis sempadan negeri & negara jiran" },
        { id: "c5-4", label: "4. Label nama negeri (huruf besar)" },
        { id: "c5-5", label: "5. Lengkapkan tajuk, arah Utara, petunjuk" },
      ],
    },
  ],
};
