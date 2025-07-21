🧠 AI Legal Document QnA

A learning-focused full-stack AI project built with React + FastAPI + HuggingFace,
allowing users to upload legal or medical PDF documents and ask natural language questions.

🎯 Built with the goal of exploring AI + Python + React through hands-on experience.

## 🎯 AI Legal Document QnA – Overview Video

[![Watch the video](https://img.youtube.com/vi/Vx78h5ZkY0s/hqdefault.jpg)](https://youtu.be/Vx78h5ZkY0s)

➡️ Watch here: https://youtu.be/Vx78h5ZkY0s

📂 Project Structure

ai-legaldoc-qna/
├── backend/ # FastAPI + HuggingFace + FAISS
│ ├── main.py
│ ├── routers/
│ ├── utils/
│ └── vector_store/
│
├── frontend/ # Vite + React + styled-components
│ ├── src/
│ ├── public/
│ └── vite.config.js
│
├── requirements.txt
└── ai-legal-doc-working.mp4

💡 Features

📄 Drag & Drop PDF Upload (Legal/Medical docs)

🔎 Ask questions in natural language

⚙️ Semantic search via HuggingFace Transformers

📁 Document embedding using FAISS vector store

💬 Chat UI with user/AI messages

📤 Export Chat as .txt

🧹 Clear Chat functionality

📜 PDF preview panel after upload

⚛️ Smooth scroll-to-bottom for new replies

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/a2rp/ai-legal-doc-qna
cd ai-legaldoc-qna

2. Setup Backend (Python)

cd backend
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

Default URL: http://127.0.0.1:8000

3. Setup Frontend (React)

cd frontend
npm install
npm run dev

Frontend served at: http://localhost:5173

🧠 How It Works

User uploads a legal or medical PDF file

PDF is read, chunked, and converted to embeddings (MiniLM)

Stored in FAISS vector DB

User asks question via chat

Question embedding is compared to PDF chunks

Most relevant chunk is passed to a QA model to generate an answer

📦 Tech Stack

🔹 Frontend

React 18 (Vite)

styled-components

Axios, React Dropzone

🔹 Backend

Python 3.10

FastAPI

HuggingFace Transformers

FAISS for similarity search

PyMuPDF for PDF reading

🛑 Not for Production

This is strictly a learning-by-doing project to explore:

AI QnA pipelines

React + Python full-stack integration

UX patterns like chat systems and file previews

Feel free to fork, explore, or build on top of it! ⭐

Made by Ashish Ranjan as part of a hands-on AI project series 🚀
