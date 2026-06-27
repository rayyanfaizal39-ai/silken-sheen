from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader


ROOT = Path.cwd()
PDF_PATH = Path(
    r"C:\Users\rayya\OneDrive\Faizal\OneDrive\Desktop\tingkatan 3\T3 BT GEO - GEOGRAFI.pdf"
)
CONTENT_ROOT = ROOT / "src" / "content" / "form3" / "geography"
REGISTRY_PATH = ROOT / "src" / "content" / "registry.ts"


CHAPTERS = [
    {
        "num": 1,
        "title": "Jadual dan Graf",
        "pages": (2, 19),
        "subtopics": [
            "Ciri-ciri dan Kegunaan Jadual",
            "Ciri-ciri dan Kegunaan Graf",
            "Langkah-langkah Membina Jadual",
            "Langkah-langkah Membina Graf Bar Mudah, Graf Garisan Mudah dan Graf Gabungan",
            "Mentafsir Jadual, Graf Bar Mudah, Graf Garisan Mudah dan Graf Gabungan",
        ],
    },
    {
        "num": 2,
        "title": "Carta Pai",
        "pages": (20, 28),
        "subtopics": [
            "Ciri-ciri dan Kegunaan Carta Pai",
            "Langkah-langkah Membina Carta Pai",
            "Mentafsir Carta Pai",
        ],
    },
    {
        "num": 3,
        "title": "Pengaruh Persekitaran Fizikal terhadap Kepelbagaian Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar",
        "pages": (30, 51),
        "subtopics": [
            "Faktor-faktor Persekitaran Fizikal yang Mempengaruhi Kepelbagaian Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar",
            "Faktor-faktor yang Mempengaruhi Kepelbagaian Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar",
        ],
    },
    {
        "num": 4,
        "title": "Tumbuh-tumbuhan Semula Jadi di Malaysia",
        "pages": (52, 75),
        "subtopics": [
            "Jenis dan Taburan Tumbuh-tumbuhan Semula Jadi di Malaysia",
            "Faktor-faktor yang Mempengaruhi Tumbuh-tumbuhan Semula Jadi di Malaysia",
            "Kepentingan Tumbuh-tumbuhan Semula Jadi di Malaysia",
            "Kesan Kegiatan Manusia terhadap Tumbuh-tumbuhan Semula Jadi di Malaysia",
        ],
    },
    {
        "num": 5,
        "title": "Hidupan Liar di Malaysia",
        "pages": (76, 96),
        "subtopics": [
            "Hidupan Liar di Malaysia",
            "Kepentingan Hidupan Liar di Malaysia",
            "Kegiatan Manusia yang Mengancam Hidupan Liar di Malaysia",
            "Usaha Pemeliharaan dan Pemuliharaan Hidupan Liar di Malaysia",
        ],
    },
    {
        "num": 6,
        "title": "Sumber Semula Jadi di Malaysia",
        "pages": (98, 113),
        "subtopics": [
            "Sumber Semula Jadi di Malaysia",
            "Taburan Sumber Boleh Baharu dan Sumber Tidak Boleh Baharu di Malaysia",
            "Kepentingan Sumber Semula Jadi dalam Pembangunan Ekonomi di Malaysia",
        ],
    },
    {
        "num": 7,
        "title": "Kegiatan Ekonomi di Malaysia",
        "pages": (114, 132),
        "subtopics": [
            "Jenis Kegiatan Ekonomi di Malaysia",
            "Taburan Kegiatan Ekonomi Utama di Malaysia",
            "Faktor-faktor yang Mempengaruhi Kegiatan Ekonomi di Malaysia",
            "Kepentingan Kegiatan Ekonomi di Malaysia",
        ],
    },
    {
        "num": 8,
        "title": "Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
        "pages": (134, 147),
        "subtopics": [
            "Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
            "Kepentingan Tumbuh-tumbuhan Semula Jadi dan Hidupan Liar di Dunia",
        ],
    },
    {
        "num": 9,
        "title": "Sumber Semula Jadi Utama dan Kerjasama Ekonomi di Dunia",
        "pages": (148, 162),
        "subtopics": [
            "Taburan Sumber Semula Jadi Utama di Dunia",
            "Krisis Sumber Semula Jadi di Dunia",
            "Contoh Kerjasama Ekonomi Antarabangsa",
            "Kepentingan Kerjasama Ekonomi Antarabangsa",
        ],
    },
    {
        "num": 10,
        "title": "Sumber Hutan",
        "pages": (164, 177),
        "subtopics": [
            "Sumber Hutan",
            "Kepentingan Pengurusan Sumber Hutan di Malaysia",
            "Usaha Pemeliharaan dan Pemuliharaan Sumber Hutan di Malaysia",
            "Peranan Agensi dalam Pengurusan Hutan di Malaysia",
        ],
    },
    {
        "num": 11,
        "title": "Kitar Semula",
        "pages": (178, 188),
        "subtopics": [
            "Elemen Kitar Semula",
            "Kepentingan Amalan Kitar Semula",
            "Amalan Kitar Semula di Malaysia",
            "Amalan Kitar Semula di Negara-negara Lain",
        ],
    },
    {
        "num": 12,
        "title": "Panduan Kerja Lapangan",
        "pages": (190, 199),
        "subtopics": [
            "Memilih Isu atau Tajuk Kerja Lapangan",
            "Menentukan Objektif Kerja Lapangan",
            "Menentukan Kaedah Kerja Lapangan",
            "Merekod, Mengumpul dan Menganalisis Data atau Maklumat",
            "Merumus dan Membuat Pelaporan Tentang Kerja Lapangan",
        ],
    },
]


def compact_with_map(text: str) -> tuple[str, list[int]]:
    chars: list[str] = []
    index_map: list[int] = []
    for index, char in enumerate(text.lower()):
        if char.isalnum():
            chars.append(char)
            index_map.append(index)
    return "".join(chars), index_map


def compact_key(text: str) -> str:
    return "".join(char for char in text.lower() if char.isalnum())


def normalize_text(text: str) -> str:
    replacements = {
        "\u0000": "",
        "\ufffd": "",
        "\u00a0": " ",
        "\u2013": "-",
        "\u2014": "-",
        "\u2022": "-",
        "\uf0fc": "-",
        "\uf0a7": "-",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def page_text(reader: PdfReader, book_page: int) -> str:
    # Book page 2 is PDF index 11, so index = book page + 9.
    return reader.pages[book_page + 9].extract_text() or ""


def chapter_text(reader: PdfReader, start: int, end: int) -> str:
    return normalize_text("\n".join(page_text(reader, page) for page in range(start, end + 1)))


def find_positions(text: str, chapter_num: int, subtopics: list[str]) -> list[int]:
    compact, index_map = compact_with_map(text)
    positions: list[int] = []
    min_compact_index = 0
    for index, subtopic in enumerate(subtopics, start=1):
        numbered_key = compact_key(f"{subtopic}{chapter_num}{index}")
        fallback_key = compact_key(subtopic)
        key = numbered_key if numbered_key in compact else fallback_key
        candidates = [match.start() for match in re.finditer(re.escape(key), compact)]
        chosen = None
        for candidate in candidates:
            if candidate >= min_compact_index:
                chosen = candidate
                break
        if chosen is None:
            raise RuntimeError(f"Unable to find subtopic marker: {subtopic}")
        positions.append(index_map[chosen])
        min_compact_index = chosen + max(1, len(key) // 2)
    return positions


def split_subtopics(text: str, chapter_num: int, subtopics: list[str]) -> list[str]:
    positions = find_positions(text, chapter_num, subtopics)
    segments: list[str] = []
    for index, start in enumerate(positions):
        end = positions[index + 1] if index + 1 < len(positions) else len(text)
        segments.append(normalize_text(text[start:end]))
    return segments


def clean_line(line: str) -> str:
    line = normalize_text(line)
    line = re.sub(r"^Bab\s+\d+\s*$", "", line, flags=re.I)
    line = re.sub(r"^\d+\s*$", "", line)
    line = re.sub(r"^Portal Geografi$", "", line, flags=re.I)
    line = re.sub(r"^Kuiz KENDIRI$", "", line, flags=re.I)
    line = re.sub(r"^Latih Diri\s*[A-Z]?$", "", line, flags=re.I)
    return line.strip(" -")


def text_lines(text: str) -> list[str]:
    raw_lines = [clean_line(line) for line in text.splitlines()]
    lines = [line for line in raw_lines if len(line) >= 8]
    blocked = (
        "Layari laman",
        "http://",
        "https://",
        "Muat turun aplikasi",
        "Imbas QR Code",
        "Jawapan",
        "Apakah yang akan",
        "Sepintas lalu",
    )
    return [line for line in lines if not line.startswith(blocked)]


def sentence_chunks(text: str) -> list[str]:
    lines = text_lines(text)
    chunks: list[str] = []
    buffer = ""
    for line in lines:
        if len(line) <= 25 and not re.search(r"[.!?:]$", line):
            if buffer:
                chunks.append(buffer)
                buffer = ""
            chunks.append(line)
            continue
        buffer = f"{buffer} {line}".strip()
        if re.search(r"[.!?]$", line) or len(buffer) > 180:
            chunks.append(buffer)
            buffer = ""
    if buffer:
        chunks.append(buffer)
    cleaned: list[str] = []
    for chunk in chunks:
        chunk = re.sub(r"\s+", " ", chunk).strip()
        chunk = re.sub(r"^\d+\.\d+\s*", "", chunk)
        if not useful_chunk(chunk):
            continue
        if 24 <= len(chunk) <= 360 and chunk not in cleaned:
            cleaned.append(chunk)
    return cleaned


def useful_chunk(chunk: str) -> bool:
    noisy = (
        "……………………",
        "........................",
        "Nama murid",
        "Tandatangan",
        "Saya dengan ini mengaku",
        "Kuiz KENDIRI",
        "Layari laman",
        "http://",
        "https://",
    )
    if any(item.lower() in chunk.lower() for item in noisy):
        return False
    if re.match(r"^\d+\.\s", chunk):
        return False
    if chunk.count("...") >= 1:
        return False
    if len(chunk.split()) < 4:
        return False
    return True


def select_contains(chunks: list[str], needles: tuple[str, ...], limit: int) -> list[str]:
    selected = [chunk for chunk in chunks if any(needle.lower() in chunk.lower() for needle in needles)]
    return selected[:limit]


def first_items(items: list[str], limit: int) -> list[str]:
    return items[:limit] if len(items) > limit else items


def make_table_from_lines(lines: list[str]) -> dict | None:
    table_lines = [line for line in lines if re.search(r"Jadual|Graf|Carta|Peta|Rajah|PETUNJUK|Sumber", line, re.I)]
    if not table_lines:
        return None
    rows = [[line] for line in first_items(table_lines, 8)]
    return {"headers": ["Rujukan visual / data dalam buku teks"], "rows": rows}


def subtopic_sections(chapter_num: int, subtopic_index: int, title: str, segment: str) -> list[dict]:
    segment = re.sub(rf"^\s*{re.escape(title)}\s*{chapter_num}\.{subtopic_index}\s*", "", segment, flags=re.I)
    chunks = sentence_chunks(segment)
    lines = text_lines(segment)
    definitions = select_contains(chunks, ("ialah", "adalah", "merupakan", "merujuk", "bermaksud"), 8)
    processes = select_contains(chunks, ("langkah", "proses", "kaedah", "cara", "membina", "mentafsir", "mengumpul", "merekod", "menganalisis"), 10)
    examples = select_contains(chunks, ("contoh", "misalnya", "seperti", "antaranya", "termasuklah"), 10)
    visuals = select_contains(chunks, ("jadual", "graf", "carta", "peta", "rajah", "petunjuk", "sumber", "skala"), 10)
    facts = [chunk for chunk in chunks if chunk not in definitions and chunk not in processes]
    facts = first_items(facts, 16)
    intro = " ".join(first_items(chunks, 2)) or f"Subtopik ini menerangkan kandungan utama tentang {title} berdasarkan buku teks Geografi Tingkatan 3."
    table = make_table_from_lines(lines)

    subsections: list[dict] = [
        {
            "title": "Pengenalan",
            "content": intro,
        },
        {
            "title": "Konsep utama",
            "bulletPoints": first_items(
                [title]
                + definitions
                + select_contains(chunks, ("faktor", "kepentingan", "taburan", "kegunaan", "ciri", "usaha", "kesan"), 8),
                10,
            ),
        },
    ]
    if definitions:
        subsections.append({"title": "Definisi", "bulletPoints": definitions})
    subsections.append({"title": "Penerangan lengkap", "bulletPoints": facts})
    if processes:
        subsections.append({"title": "Proses / langkah penting", "bulletPoints": processes})
    if examples:
        subsections.append({"title": "Contoh daripada buku teks", "bulletPoints": examples})
    if visuals:
        visual_section: dict = {"title": "Rajah, peta, graf dan jadual", "bulletPoints": visuals}
        if table:
            visual_section["table"] = table
        subsections.append(visual_section)
    subsections.extend(
        [
            {
                "title": "Fakta penting",
                "bulletPoints": first_items(chunks, 12),
            },
            {
                "title": "Tip mengingat",
                "bulletPoints": [
                    f"Ingat kata kunci subtopik: {title}.",
                    "Susun jawapan mengikut urutan buku teks: maksud atau ciri, contoh, huraian, kemudian rumusan.",
                    "Untuk peta, graf, jadual atau rajah, nyatakan tajuk, petunjuk, pola utama dan contoh lokasi atau data yang ditunjukkan.",
                ],
            },
            {
                "title": "Fokus UASA",
                "bulletPoints": [
                    f"Kenal pasti maksud, ciri dan contoh yang berkaitan dengan {title}.",
                    "Latih diri menghuraikan fakta dalam ayat lengkap berdasarkan bukti daripada jadual, graf, carta pai, peta, rajah atau contoh buku teks.",
                    "Soalan beraras tinggi lazimnya meminta sebab, kesan, kepentingan, perbandingan atau cadangan berdasarkan isi dalam subtopik.",
                ],
            },
            {
                "title": "Rumusan",
                "content": (
                    f"Subtopik {chapter_num}.{subtopic_index} menekankan {title}. "
                    f"Fokus ulang kaji ialah memahami istilah utama, menghuraikan fakta penting dan mengaitkan contoh dalam buku teks dengan soalan UASA."
                ),
            },
        ]
    )
    return subsections


def make_notes(chapter: dict, full_text: str, segments: list[str]) -> dict:
    chapter_num = chapter["num"]
    subtopics = chapter["subtopics"]
    chunks = sentence_chunks(full_text)
    segment_chunks = [sentence_chunks(segment) for segment in segments]
    first_facts = [items[0] for items in segment_chunks if items]
    all_segment_chunks = [item for items in segment_chunks for item in items]
    all_definitions = []
    for items in segment_chunks:
        all_definitions.extend(select_contains(items, ("ialah", "adalah", "merupakan", "merujuk", "bermaksud"), 4))
    quick_revision = []
    for index, subtopic in enumerate(subtopics, start=1):
        quick_revision.append(f"{chapter_num}.{index} {subtopic}")
    quick_revision.extend(first_items(first_facts, 8))

    sections: list[dict] = [
        {
            "title": "Pengenalan Bab",
            "subsections": [
                {
                    "title": "Gambaran keseluruhan",
                    "content": " ".join(first_items(chunks, 3))
                    or f"Bab ini membincangkan {chapter['title']} berdasarkan buku teks Geografi Tingkatan 3.",
                },
                {
                    "title": "Checklist subtopik",
                    "bulletPoints": [f"✓ {chapter_num}.{index} {subtopic}" for index, subtopic in enumerate(subtopics, start=1)],
                },
            ],
        }
    ]
    for index, (subtopic, segment) in enumerate(zip(subtopics, segments), start=1):
        sections.append(
            {
                "title": f"{chapter_num}.{index} {subtopic}",
                "subsections": subtopic_sections(chapter_num, index, subtopic, segment),
            }
        )
    sections.append(
        {
            "title": "Imbas Kembali",
            "subsections": [
                {
                    "title": "Checklist akhir bab",
                    "bulletPoints": [f"✓ {chapter_num}.{index} {subtopic}" for index, subtopic in enumerate(subtopics, start=1)],
                },
                {
                    "title": "Cara ulang kaji pantas",
                    "bulletPoints": [
                        "Baca semula setiap definisi dan kata kunci utama.",
                        "Semak semula contoh, jadual, graf, carta, peta dan rajah yang terdapat dalam bab.",
                        "Latih menjawab dengan format fakta + huraian + contoh daripada buku teks.",
                    ],
                },
            ],
        }
    )

    return {
        "chapterSummary": (
            f"Bab {chapter_num} {chapter['title']} merangkumi {len(subtopics)} subtopik rasmi: "
            + "; ".join(f"{chapter_num}.{index} {subtopic}" for index, subtopic in enumerate(subtopics, start=1))
            + ". Nota ini disusun mengikut urutan buku teks dan mengekalkan fokus kepada fakta, konsep, proses, contoh, jadual, peta, rajah dan kemahiran UASA yang terdapat dalam bab."
        ),
        "quickRevision": quick_revision[:14],
        "keyTerms": first_items(
            [
                subtopic
                for subtopic in subtopics
            ]
            + all_definitions,
            14,
        ),
        "keyExamFacts": first_items(select_contains(all_segment_chunks, ("faktor", "kepentingan", "kesan", "usaha", "langkah", "ciri", "taburan", "jenis"), 18), 18),
        "sections": sections,
    }


def ts_value(value) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def write_notes(chapter: dict, notes: dict) -> Path:
    chapter_dir = CONTENT_ROOT / f"chapter-{chapter['num']}"
    chapter_dir.mkdir(parents=True, exist_ok=True)
    file_path = chapter_dir / "notes.ts"
    content = (
        'import type { StructuredNotes } from "@/content/types";\n\n'
        f"export const geographyF3C{chapter['num']}Notes: StructuredNotes = "
        f"{ts_value(notes)};\n"
    )
    file_path.write_text(content, encoding="utf-8")
    return file_path


def update_registry() -> None:
    text = REGISTRY_PATH.read_text(encoding="utf-8")
    text = re.sub(
        r'^import \{ geographyF3C\d+Notes \} from "@\/content\/form3\/geography\/chapter-\d+\/notes";\r?\n',
        "",
        text,
        flags=re.M,
    )
    text = re.sub(r"\r?\n  // Geography Form 3\r?\n[\s\S]*?(?=\r?\n  // Mathematics Form 1)", "", text)

    imports = "".join(
        f'import {{ geographyF3C{chapter["num"]}Notes }} from "@/content/form3/geography/chapter-{chapter["num"]}/notes";\n'
        for chapter in CHAPTERS
    )
    anchor = 'import { geographyF2C10Notes } from "@/content/form2/geography/chapter-10/notes";\n'
    text = text.replace(anchor, anchor + imports)

    entries = ["\n  // Geography Form 3"]
    for chapter in CHAPTERS:
        num = chapter["num"]
        title = chapter["title"]
        entries.append(
            f'''  {{
    id: "geography-f3-c{num}",
    subjectId: "geography",
    form: "Form 3",
    chapterKey: "Chapter {num}",
    title: {json.dumps(title, ensure_ascii=False)},
    notes: geographyF3C{num}Notes,
  }},'''
        )
    block = "\n".join(entries) + "\n"
    text = text.replace("\n  // Mathematics Form 1", block + "\n  // Mathematics Form 1")
    REGISTRY_PATH.write_text(text, encoding="utf-8")


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    reader = PdfReader(str(PDF_PATH))
    written: list[Path] = []
    checklists: list[str] = []
    for chapter in CHAPTERS:
        text = chapter_text(reader, *chapter["pages"])
        segments = split_subtopics(text, chapter["num"], chapter["subtopics"])
        notes = make_notes(chapter, text, segments)
        written.append(write_notes(chapter, notes))
        checklists.append(f"Bab {chapter['num']} - {chapter['title']}")
        for index, subtopic in enumerate(chapter["subtopics"], start=1):
            checklists.append(f"  ✓ {chapter['num']}.{index} {subtopic}")
    update_registry()
    print("Generated Geografi Tingkatan 3 notes:")
    for file_path in written:
        print(file_path)
    print("\nChecklist:")
    print("\n".join(checklists))


if __name__ == "__main__":
    main()
