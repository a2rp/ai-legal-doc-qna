import fitz  # PyMuPDF
import io

def extract_text_from_pdf(file_bytes):
    doc = fitz.open(stream=io.BytesIO(file_bytes), filetype="pdf")
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text
