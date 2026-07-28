import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch4-kesihatan-manusia.png";

export const scienceF2C4InteractiveBM: ScienceF2InteractiveContent = {
  chapter: 4,
  blogHighlight: { title: "Blog Sains — Virus Zika", body: "Zika disebarkan terutamanya oleh nyamuk Aedes. Menghapuskan air bertakung memutuskan kitar pembiakan vektor dan mengurangkan penularan sebelum seseorang jatuh sakit.", imagePath: chapterImage },
  keywords: ["Patogen", "Penyakit berjangkit", "Penyakit tidak berjangkit", "Vektor", "Antigen", "Antibodi", "Keimunan", "Vaksin"],
  sections: [
    {
      number: "4.1", title: "Penyakit Berjangkit dan Penyakit Tidak Berjangkit", intro: "Penyakit berbeza dari segi punca, penularan dan pencegahan. Penyakit berjangkit boleh merebak; penyakit tidak berjangkit tidak boleh.",
      comparison: { title: "Dua jenis penyakit yang sangat berbeza", columns: [
        { title: "Berjangkit", body: "Disebabkan patogen seperti bakteria, virus, kulat dan protozoa. Boleh tersebar secara langsung atau tidak langsung." },
        { title: "Tidak berjangkit", body: "Disebabkan faktor genetik, gaya hidup, pemakanan atau persekitaran. Contoh: diabetes, kanser dan hipertensi." },
      ]},
      accordions: [
        { title: "Penularan melalui udara", body: "Titisan membawa tuberkulosis, influenza dan cacar air. Tutup batuk, alirkan udara dan elakkan tempat sesak ketika wabak." },
        { title: "Air dan makanan", body: "Air atau makanan tercemar menyebarkan kolera dan tifoid. Gunakan air bersih, masak makanan sempurna dan jaga kebersihan." },
        { title: "Sentuhan", body: "Sentuhan kulit, bendalir badan atau objek tercemar memindahkan patogen. Basuh tangan dan jangan berkongsi barang peribadi." },
        { title: "Vektor", body: "Nyamuk, lalat dan haiwan lain membawa patogen antara perumah. Hapuskan tempat pembiakan dan kawal populasi vektor." },
      ],
      matcher: { title: "Padankan vektor dengan patogennya", instruction: "Pilih vektor, kemudian penyakit atau patogen yang dibawanya.", pairs: [
        { id: "aedes", label: "Nyamuk Aedes", match: "Virus denggi dan Zika" }, { id: "anopheles", label: "Nyamuk Anopheles", match: "Plasmodium penyebab malaria" }, { id: "fly", label: "Lalat rumah", match: "Bakteria kolera pada makanan tercemar" }, { id: "rat", label: "Pinjal tikus", match: "Bakteria penyebab hawar" },
      ]},
      sequence: { title: "Tiga peringkat pencegahan", instruction: "Pencegahan bertindak sebelum, semasa dan selepas jangkitan.", steps: [
        { title: "Primer", body: "Cegah penyakit sebelum berlaku melalui sanitasi, tabiat sihat, vaksinasi dan kawalan vektor." }, { title: "Sekunder", body: "Kesan penyakit awal melalui saringan, diagnosis, pengasingan dan rawatan segera." }, { title: "Tertier", body: "Kurangkan komplikasi dan pulihkan fungsi melalui penjagaan jangka panjang serta rehabilitasi." },
      ]},
      checks: [{ question: "Mengapakah denggi berjangkit tetapi diabetes tidak berjangkit?", hint: "Denggi disebabkan virus yang boleh dipindahkan; diabetes tidak merebak antara manusia." }, { question: "Bagaimanakah penghapusan air bertakung mencegah penyakit?", hint: "Menghapuskan tempat pembiakan Aedes dan memutuskan penularan melalui vektor." }],
    },
    {
      number: "4.2", title: "Pertahanan Badan", intro: "Badan menggunakan pertahanan berlapis: halangan menghalang kemasukan, gerak balas umum menyerang penceroboh dan keimunan khusus menyasarkan antigen tertentu.",
      sequence: { title: "Tiga barisan pertahanan", instruction: "Ikuti patogen ketika badan bertindak balas.", steps: [
        { title: "Barisan pertama", body: "Kulit, mukus, silia, air mata dan asid perut menghalang atau memusnahkan patogen sebelum memasuki tisu." }, { title: "Barisan kedua", body: "Keradangan, demam dan fagosit memberi gerak balas tidak khusus yang pantas." }, { title: "Barisan ketiga", body: "Limfosit mengenal antigen, menghasilkan antibodi khusus dan membentuk sel memori." },
      ]},
      tabs: [
        { title: "Aktif semula jadi", body: "Selepas jangkitan, badan menghasilkan antibodi dan sel memori sendiri. Perlindungan biasanya tahan lama." },
        { title: "Aktif buatan", body: "Vaksinasi mendedahkan badan kepada bahan antigen selamat supaya antibodi dan sel memori terbentuk." },
        { title: "Pasif semula jadi", body: "Antibodi ibu melalui plasenta atau susu ibu. Perlindungan segera tetapi sementara." },
        { title: "Pasif buatan", body: "Antiserum membekalkan antibodi sedia ada. Bertindak segera tetapi tidak menghasilkan sel memori." },
      ],
      comparison: { title: "Faktor melemahkan dan menguatkan keimunan", columns: [
        { title: "Melemahkan", body: "Merokok, penyalahgunaan alkohol, stres kronik, kurang tidur dan gizi tidak seimbang menjejaskan pertahanan badan." },
        { title: "Menguatkan", body: "Gizi seimbang, tidur cukup, senaman, kebersihan dan vaksinasi menyokong keimunan berkesan." },
      ]},
      checks: [{ question: "Apakah perbezaan antigen dengan antibodi?", hint: "Antigen mencetuskan gerak balas; antibodi mengikat khusus pada antigen itu." }, { question: "Mengapakah keimunan pasif bersifat sementara?", hint: "Antibodi sedia ada akan diuraikan dan tiada sel memori terbentuk." }],
    },
  ],
  reflectionItems: ["Saya boleh membandingkan penyakit berjangkit dan tidak berjangkit.", "Saya boleh menerangkan empat cara penularan penyakit.", "Saya boleh menghuraikan tiga barisan pertahanan badan.", "Saya boleh membandingkan keimunan aktif dan pasif."],
  miniQuiz: [
    { type: "true-false", question: "Betul atau salah: Antibiotik boleh menyembuhkan influenza.", answer: false, explanation: "Influenza disebabkan virus; antibiotik menyasarkan bakteria." },
    { type: "multiple-choice", question: "Gerak balas manakah memberi keimunan aktif buatan yang tahan lama?", options: ["Suntikan antiserum", "Vaksinasi", "Susu ibu", "Halangan kulit"], answerIndex: 1, explanation: "Vaksinasi merangsang limfosit dan sel memori badan sendiri." },
  ],
};
