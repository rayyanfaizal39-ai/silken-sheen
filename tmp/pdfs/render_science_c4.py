from pathlib import Path

import fitz


SOURCE = Path(r"C:\Users\pcgam\Downloads\science_chapter_4_study_notes.pdf")
OUTPUT = Path(r"C:\Users\pcgam\silken-sheen\tmp\pdfs")

document = fitz.open(SOURCE)

for page_number, page in enumerate(document, start=1):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(0.9, 0.9), alpha=False)
    page_path = OUTPUT / f"science-c4-page-{page_number}.png"
    pixmap.save(page_path)

page_width = document[0].rect.width
page_height = document[0].rect.height
for sheet_number, start in enumerate(range(0, len(document), 4), start=1):
    sheet_document = fitz.open()
    sheet = sheet_document.new_page(width=page_width * 2, height=page_height * 2)
    for index, source_page in enumerate(range(start, min(start + 4, len(document)))):
        x = (index % 2) * page_width
        y = (index // 2) * page_height
        target = fitz.Rect(x, y, x + page_width, y + page_height)
        sheet.show_pdf_page(target, document, source_page)
    pixmap = sheet.get_pixmap(matrix=fitz.Matrix(1.1, 1.1), alpha=False)
    pixmap.save(OUTPUT / f"science-c4-sheet-{sheet_number}.png")
