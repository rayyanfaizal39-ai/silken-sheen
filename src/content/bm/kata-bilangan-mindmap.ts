import type { MindNode } from "@/components/MindMap";

export const bahasaMelayuKataBilanganMindMap: MindNode = {
  id: "bm-kata-bilangan-root",
  label: "KATA BILANGAN",
  summary: "Perkataan yang digunakan untuk membilang atau menyatakan jumlah sesuatu kata nama.",
  children: [
    {
      id: "bm-kata-bilangan-definisi",
      label: "Definisi",
      children: [
        {
          id: "bm-kata-bilangan-definisi-maksud",
          label: "Maksud",
          summary:
            "Kata bilangan ialah perkataan yang digunakan untuk membilang atau menyatakan jumlah sesuatu kata nama.",
        },
        {
          id: "bm-kata-bilangan-definisi-skop",
          label: "Skop",
          summary:
            "Boleh merujuk kepada manusia, haiwan, benda, tempat, masa, kumpulan, bahagian daripada keseluruhan, urutan, kedudukan atau konsep yang dapat dinyatakan bilangannya.",
        },
        {
          id: "bm-kata-bilangan-definisi-fungsi",
          label: "Fungsi",
          summary:
            "Menunjukkan jumlah tepat, jumlah tidak tentu, himpunan, pembahagian, urutan atau pecahan.",
        },
        {
          id: "bm-kata-bilangan-definisi-contoh",
          label: "Contoh Ringkas",
          summary:
            "dua orang murid • beberapa buah buku • setiap peserta • pemain ketiga • separuh kek",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-tentu",
      label: "Kata Bilangan Tentu",
      children: [
        {
          id: "bm-kata-bilangan-tentu-maksud",
          label: "Maksud",
          summary: "Menunjukkan jumlah yang tepat dan pasti.",
        },
        {
          id: "bm-kata-bilangan-tentu-contoh",
          label: "Contoh",
          summary: "satu • dua • tiga • sepuluh • seratus • lima juta",
        },
        {
          id: "bm-kata-bilangan-tentu-ayat",
          label: "Contoh Ayat",
          summary: '"Banjir itu menjejaskan hampir lima juta penduduk."',
          children: [
            {
              id: "bm-kata-bilangan-tentu-ayat-nota",
              label: "Nota",
              summary:
                "hampir mengubah anggaran, manakala lima juta tetap merupakan jumlah angka yang khusus.",
            },
          ],
        },
        {
          id: "bm-kata-bilangan-tentu-struktur",
          label: "Struktur",
          summary: "Kata Bilangan Tentu + Penjodoh Bilangan + Kata Nama",
          children: [
            {
              id: "bm-kata-bilangan-tentu-struktur-dengan",
              label: "Dengan Penjodoh Bilangan",
              summary: "dua orang murid • tiga ekor kucing • lima buah rumah",
            },
            {
              id: "bm-kata-bilangan-tentu-struktur-tanpa",
              label: "Tanpa Penjodoh Bilangan",
              summary:
                "Tidak semua binaan angka memerlukan penjodoh bilangan: lima juta penduduk • dua kilogram gula • tiga hari",
            },
          ],
        },
      ],
    },
    {
      id: "bm-kata-bilangan-tak-tentu",
      label: "Kata Bilangan Tak Tentu",
      children: [
        {
          id: "bm-kata-bilangan-tak-tentu-maksud",
          label: "Maksud",
          summary: "Menunjukkan jumlah yang tidak tepat, tidak pasti atau tidak dinyatakan khusus.",
        },
        {
          id: "bm-kata-bilangan-tak-tentu-contoh",
          label: "Contoh",
          summary: "beberapa • semua • segala • ramai • para • banyak • sedikit",
        },
        {
          id: "bm-kata-bilangan-tak-tentu-beberapa",
          label: "beberapa",
          summary: '"Terdapat beberapa faktor yang perlu dipertimbangkan."',
        },
        {
          id: "bm-kata-bilangan-tak-tentu-semua",
          label: "semua",
          summary: '"Semua murid perlu menghadiri perhimpunan."',
        },
        {
          id: "bm-kata-bilangan-tak-tentu-ramai",
          label: "ramai",
          summary: '"Ramai peserta terpilih untuk menyertai program itu."',
        },
        {
          id: "bm-kata-bilangan-tak-tentu-para",
          label: "para",
          summary: "Digunakan sebelum kata nama yang merujuk kepada kumpulan manusia.",
          children: [
            {
              id: "bm-kata-bilangan-tak-tentu-para-contoh",
              label: "Contoh",
              summary: "para pelajar • para pengguna • para guru",
            },
            {
              id: "bm-kata-bilangan-tak-tentu-para-ayat",
              label: "Contoh Ayat",
              summary: '"Para pengguna harus mengamalkan gaya hidup yang lebih lestari."',
            },
            {
              id: "bm-kata-bilangan-tak-tentu-para-nota",
              label: "Nota Penggunaan",
              summary:
                "Elakkan penanda jamak berganda seperti para pelajar-pelajar atau semua para pelajar. Gunakan para pelajar atau semua pelajar.",
            },
          ],
        },
        {
          id: "bm-kata-bilangan-tak-tentu-segala",
          label: "segala",
          summary:
            "Merujuk secara luas kepada semua perkara mengikut konteks: segala usaha • segala masalah • segala persiapan",
        },
        {
          id: "bm-kata-bilangan-tak-tentu-perbandingan",
          label: "Nota Perbandingan",
          summary:
            "Setiap kata bilangan tak tentu mempunyai fungsi dan konteks tersendiri; bentuk-bentuk ini tidak boleh saling menggantikan secara bebas.",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-himpunan",
      label: "Kata Bilangan Himpunan",
      children: [
        {
          id: "bm-kata-bilangan-himpunan-maksud",
          label: "Maksud",
          summary: "Menunjukkan jumlah sesuatu kumpulan secara berhimpun atau kolektif.",
        },
        {
          id: "bm-kata-bilangan-himpunan-gandaan",
          label: "Bentuk Gandaan",
          summary: "berpuluh-puluh • beratus-ratus • beribu-ribu • berjuta-juta",
        },
        {
          id: "bm-kata-bilangan-himpunan-ayat",
          label: "Contoh Ayat",
          summary: '"Berpuluh-puluh peserta menghadiri program itu."',
        },
        {
          id: "bm-kata-bilangan-himpunan-berimbuhan",
          label: "Bentuk Berimbuhan",
          summary:
            "kedua-dua • ketiga-tiga • keempat-empat. Bentuk ini merangkumi semua anggota dalam jumlah yang dinyatakan sebagai satu kumpulan.",
          children: [
            {
              id: "bm-kata-bilangan-himpunan-berimbuhan-dua",
              label: "Contoh 1",
              summary: '"Kedua-dua murid itu berjaya."',
            },
            {
              id: "bm-kata-bilangan-himpunan-berimbuhan-tiga",
              label: "Contoh 2",
              summary: '"Ketiga-tiga pasukan layak ke peringkat akhir."',
            },
          ],
        },
        {
          id: "bm-kata-bilangan-himpunan-ejaan",
          label: "Ejaan",
          summary:
            "kedua-dua, ketiga-tiga dan berpuluh-puluh menggunakan tanda sempang kerana melibatkan penggandaan atau bentuk berpasangan yang mantap.",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-pisahan",
      label: "Kata Bilangan Pisahan",
      children: [
        {
          id: "bm-kata-bilangan-pisahan-maksud",
          label: "Maksud",
          summary:
            "Menunjukkan setiap bahagian atau setiap anggota secara berasingan dalam kumpulan.",
        },
        {
          id: "bm-kata-bilangan-pisahan-contoh",
          label: "Contoh",
          summary: "setiap • tiap-tiap • masing-masing",
        },
        {
          id: "bm-kata-bilangan-pisahan-setiap",
          label: "setiap",
          summary:
            "Diikuti kata nama bentuk tunggal dalam binaan baku: setiap murid • setiap bahan",
          children: [
            {
              id: "bm-kata-bilangan-pisahan-setiap-ayat",
              label: "Contoh Ayat",
              summary: '"Setiap bahan perlu diteliti dengan teliti."',
            },
            {
              id: "bm-kata-bilangan-pisahan-setiap-elak",
              label: "Elakkan",
              summary: "setiap murid-murid • setiap bahan-bahan",
            },
          ],
        },
        {
          id: "bm-kata-bilangan-pisahan-tiap",
          label: "tiap-tiap",
          summary: '"Tiap-tiap peserta menerima sijil."',
        },
        {
          id: "bm-kata-bilangan-pisahan-masing",
          label: "masing-masing",
          summary:
            "Lazimnya merujuk kembali kepada beberapa orang atau benda dan menegaskan pemilikan atau tindakan secara berasingan.",
          children: [
            {
              id: "bm-kata-bilangan-pisahan-masing-ayat",
              label: "Contoh Ayat",
              summary: '"Para peserta duduk di tempat masing-masing."',
            },
          ],
        },
        {
          id: "bm-kata-bilangan-pisahan-nota",
          label: "Nota Penggunaan",
          summary:
            "Bentuk pisahan tidak semuanya mempunyai fungsi yang sama pada setiap kedudukan dalam ayat.",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-tingkat",
      label: "Kata Bilangan Tingkat",
      children: [
        {
          id: "bm-kata-bilangan-tingkat-maksud",
          label: "Maksud",
          summary: "Menunjukkan urutan, kedudukan atau pangkat.",
        },
        {
          id: "bm-kata-bilangan-tingkat-bentuk",
          label: "Bentuk Perkataan",
          summary: "pertama • kedua • ketiga • keempat • ketujuh",
        },
        {
          id: "bm-kata-bilangan-tingkat-ayat",
          label: "Contoh Ayat",
          summary:
            '"Dia mendapat tempat ketiga dalam pertandingan itu." • "Tokoh tersebut pernah menjadi Perdana Menteri Malaysia yang keempat dan ketujuh."',
        },
        {
          id: "bm-kata-bilangan-tingkat-angka",
          label: "Dengan Angka",
          summary:
            "Apabila awalan ke- digabungkan dengan angka, gunakan tanda sempang: ke-2 • ke-4 • ke-21",
          children: [
            {
              id: "bm-kata-bilangan-tingkat-angka-betul",
              label: "Betul",
              summary: "ke-2 • ke-21",
            },
            {
              id: "bm-kata-bilangan-tingkat-angka-salah",
              label: "Salah",
              summary: "ke2 • ke 21",
            },
          ],
        },
        {
          id: "bm-kata-bilangan-tingkat-perkataan",
          label: "Dengan Perkataan",
          summary:
            "Apabila ditulis dengan perkataan, gunakan kedua, keempat atau kedua puluh satu tanpa tanda sempang yang tidak diperlukan.",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-pecahan",
      label: "Kata Bilangan Pecahan",
      children: [
        {
          id: "bm-kata-bilangan-pecahan-maksud",
          label: "Maksud",
          summary: "Menunjukkan sebahagian daripada keseluruhan.",
        },
        {
          id: "bm-kata-bilangan-pecahan-contoh",
          label: "Contoh",
          summary: "separuh • setengah • suku • dua pertiga • tiga perempat",
        },
        {
          id: "bm-kata-bilangan-pecahan-separuh-setengah",
          label: "separuh dan setengah",
          summary:
            "Kedua-duanya boleh membawa maksud satu perdua, tetapi penggunaan semula jadi bergantung pada kata nama dan konteks: separuh kek • setengah jam",
        },
        {
          id: "bm-kata-bilangan-pecahan-suku",
          label: "suku",
          summary: '"Dia menunggu selama suku jam."',
        },
        {
          id: "bm-kata-bilangan-pecahan-angka",
          label: "Pecahan Berangka",
          summary:
            "1/2 • 2/3 • 3/4. Dalam prosa biasa, gunakan bentuk kata yang sesuai seperti satu perdua atau setengah, dua pertiga dan tiga perempat mengikut konteks.",
        },
        {
          id: "bm-kata-bilangan-pecahan-ayat",
          label: "Contoh Ayat",
          summary: '"Selepas lebih separuh abad, negara itu mengalami banyak perubahan."',
        },
      ],
    },
    {
      id: "bm-kata-bilangan-ejaan",
      label: "Ejaan",
      children: [
        {
          id: "bm-kata-bilangan-ejaan-ke-angka",
          label: "ke- dengan Angka",
          summary: "Gunakan tanda sempang: ke-5 • ke-21 • ke-100",
        },
        {
          id: "bm-kata-bilangan-ejaan-angka-an",
          label: "Angka dengan -an",
          summary:
            "Gunakan tanda sempang untuk menghubungkan angka dengan akhiran -an: tahun 1980-an • generasi 90-an • usia 20-an",
        },
        {
          id: "bm-kata-bilangan-ejaan-gandaan",
          label: "Gandaan",
          summary: "Gunakan tanda sempang: berpuluh-puluh • kedua-dua • tiap-tiap",
        },
        {
          id: "bm-kata-bilangan-ejaan-nombor-perkataan",
          label: "Nombor dan Perkataan",
          summary:
            "Tidak semua gabungan angka dengan perkataan memerlukan tanda sempang. Gunakan tanda sempang hanya dalam bentuk baku tertentu.",
          children: [
            {
              id: "bm-kata-bilangan-ejaan-nombor-perkataan-betul",
              label: "Betul",
              summary: "ke-21 • 21-an • 1980-an • 5 orang murid • 3 buah buku",
            },
            {
              id: "bm-kata-bilangan-ejaan-nombor-perkataan-salah",
              label: "Salah",
              summary: "5-orang murid • 3-buah buku",
            },
          ],
        },
        {
          id: "bm-kata-bilangan-ejaan-konsisten",
          label: "Konsisten",
          summary:
            "Elakkan mencampurkan bentuk angka dan perkataan secara janggal dalam ayat pendek kecuali jika konteks memerlukannya.",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-penjodoh",
      label: "Hubungan dengan Penjodoh Bilangan",
      children: [
        {
          id: "bm-kata-bilangan-penjodoh-struktur",
          label: "Struktur Umum",
          summary:
            "Kata Bilangan + Penjodoh Bilangan + Kata Nama: seorang guru • dua ekor ayam • beberapa helai kertas",
        },
        {
          id: "bm-kata-bilangan-penjodoh-tanpa",
          label: "Tanpa Penjodoh Bilangan",
          summary:
            "Sesetengah binaan tidak memerlukan penjodoh bilangan: semua murid • lima juta penduduk • tiga hari • dua kilogram beras",
        },
        {
          id: "bm-kata-bilangan-penjodoh-bezakan",
          label: "Bezakan",
          children: [
            {
              id: "bm-kata-bilangan-penjodoh-bezakan-bilangan",
              label: "Kata Bilangan",
              summary: "dua • beberapa • setiap • separuh",
            },
            {
              id: "bm-kata-bilangan-penjodoh-bezakan-penjodoh",
              label: "Penjodoh Bilangan",
              summary: "orang • ekor • helai • buah",
            },
          ],
        },
        {
          id: "bm-kata-bilangan-penjodoh-nota",
          label: "Nota",
          summary:
            "Bahagian ini hanya menerangkan hubungan asas. Peraturan lengkap dipelajari dalam topik Penjodoh Bilangan.",
        },
        {
          id: "bm-kata-bilangan-penjodoh-topik",
          label: "Penjodoh Bilangan",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-kesalahan",
      label: "Kesalahan Lazim",
      children: [
        {
          id: "bm-kata-bilangan-kesalahan-jamak",
          label: "Penanda Jamak Berganda",
          summary:
            'Salah: "Semua pelajar-pelajar hadir." Betul: "Semua pelajar hadir." atau "Pelajar-pelajar hadir." Perkataan semua sudah menunjukkan jamak, maka penggandaan biasanya tidak diperlukan.',
        },
        {
          id: "bm-kata-bilangan-kesalahan-para",
          label: "para dengan Kata Ganda",
          summary:
            'Salah: "Para guru-guru berkumpul di dewan." Betul: "Para guru berkumpul di dewan."',
        },
        {
          id: "bm-kata-bilangan-kesalahan-setiap",
          label: "setiap dengan Kata Ganda",
          summary:
            'Salah: "Setiap murid-murid menerima buku." Betul: "Setiap murid menerima buku."',
        },
        {
          id: "bm-kata-bilangan-kesalahan-semua-para",
          label: "semua para",
          summary:
            'Elakkan: "Semua para peserta bersedia." Gunakan: "Semua peserta bersedia." atau "Para peserta bersedia."',
        },
        {
          id: "bm-kata-bilangan-kesalahan-tingkat",
          label: "Salah Bentuk Tingkat",
          summary:
            "Jika maksudnya jumlah, gunakan empat orang murid. Jika maksudnya urutan, gunakan murid keempat. empat = jumlah; keempat = urutan.",
        },
        {
          id: "bm-kata-bilangan-kesalahan-sempang",
          label: "Salah Tanda Sempang",
          summary: "Salah: ke21 • 21 an • tahun 1990an. Betul: ke-21 • 21-an • tahun 1990-an.",
        },
        {
          id: "bm-kata-bilangan-kesalahan-pecahan",
          label: "Salah Pilih Pecahan",
          summary:
            "Pastikan bentuk pecahan sepadan dengan ukuran atau bahagian yang dimaksudkan; penggunaan baku boleh berubah mengikut konteks.",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-tip-uasa",
      label: "Tip UASA",
      children: [
        {
          id: "bm-kata-bilangan-tip-uasa-fungsi",
          label: "Kenal Pasti Fungsi",
          summary:
            "Tentukan sama ada perkataan menunjukkan jumlah tepat, jumlah tidak tentu, himpunan, pisahan, urutan atau pecahan.",
        },
        {
          id: "bm-kata-bilangan-tip-uasa-jumlah-urutan",
          label: "Bezakan Jumlah dan Urutan",
          summary: "empat murid = jumlah • murid keempat = urutan",
        },
        {
          id: "bm-kata-bilangan-tip-uasa-jamak",
          label: "Semak Penanda Jamak",
          summary:
            "Cari gabungan berlebihan seperti semua murid-murid, para peserta-peserta atau setiap bahan-bahan.",
        },
        {
          id: "bm-kata-bilangan-tip-uasa-sempang",
          label: "Semak Tanda Sempang",
          summary: "Fokus pada ke-21 • 1980-an • kedua-dua • berpuluh-puluh",
        },
        {
          id: "bm-kata-bilangan-tip-uasa-ayat",
          label: "Bina Ayat Gramatis",
          summary: "Gunakan perkataan yang diberikan mengikut maksud dan golongannya yang sebenar.",
        },
        {
          id: "bm-kata-bilangan-tip-uasa-bentuk",
          label: "Jangan Ubah Bentuk",
          summary:
            "Jika soalan morfologi memberikan kata bilangan tertentu, gunakannya tepat seperti yang diarahkan kecuali tugasan meminta pembetulan atau pembentukan kata.",
        },
      ],
    },
    {
      id: "bm-kata-bilangan-ingat",
      label: "Ingat!",
      children: [
        {
          id: "bm-kata-bilangan-ingat-rumus",
          label: "Rumus Jenis",
          summary:
            "Tentu = jumlah tepat • Tak Tentu = jumlah tidak pasti • Himpunan = kumpulan keseluruhan • Pisahan = setiap satu • Tingkat = urutan • Pecahan = sebahagian",
        },
        {
          id: "bm-kata-bilangan-ingat-contoh",
          label: "Contoh Cepat",
          summary:
            "tiga = tentu • beberapa = tak tentu • kedua-dua = himpunan • setiap = pisahan • kelima = tingkat • separuh = pecahan",
        },
        {
          id: "bm-kata-bilangan-ingat-jamak",
          label: "Semakan Jamak",
          summary:
            "Gunakan satu penanda jamak yang jelas kecuali terdapat maksud khusus yang beralasan.",
          children: [
            {
              id: "bm-kata-bilangan-ingat-jamak-betul",
              label: "Betul",
              summary: "semua murid • murid-murid • para guru",
            },
            {
              id: "bm-kata-bilangan-ingat-jamak-elak",
              label: "Elakkan",
              summary: "semua murid-murid • para guru-guru",
            },
          ],
        },
      ],
    },
  ],
};
