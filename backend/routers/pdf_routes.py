from fastapi import APIRouter, UploadFile, File, Form
from utils.pdf_reader import extract_text_from_pdf
from utils.embedder import embed_and_store, load_index, search_chunks
from utils.qa_generator import generate_answer

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text_from_pdf(content)
    embed_and_store(text)
    return {"message": "PDF processed and stored."}

@router.post("/ask")
async def ask_question(question: str = Form(...)):
    top_chunks = search_chunks(question)
    answer = generate_answer(question, top_chunks)
    return {"answer": answer}
