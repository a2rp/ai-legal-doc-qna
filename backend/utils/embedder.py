from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import os
import pickle
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
import re

model = SentenceTransformer("all-MiniLM-L6-v2")

# Path to store index and metadata
INDEX_PATH = "vector_store/index.faiss"
META_PATH = "vector_store/meta.pkl"

# Clean + chunk text
def clean_and_chunk(text, chunk_size=500):
    text = re.sub(r'\s+', ' ', text)
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks

# Embed + store in FAISS
def embed_and_store(text):
    chunks = clean_and_chunk(text)
    embeddings = model.encode(chunks)

    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(np.array(embeddings))

    os.makedirs("vector_store", exist_ok=True)
    faiss.write_index(index, INDEX_PATH)

    with open(META_PATH, "wb") as f:
        pickle.dump(chunks, f)

# Load index and metadata
def load_index():
    if not os.path.exists(INDEX_PATH):
        return None, []
    index = faiss.read_index(INDEX_PATH)
    with open(META_PATH, "rb") as f:
        chunks = pickle.load(f)
    return index, chunks

# Search similar chunks
def search_chunks(query, top_k=3):
    index, chunks = load_index()
    if not index:
        return []

    q_emb = model.encode([query])
    D, I = index.search(np.array(q_emb), top_k)
    return [chunks[i] for i in I[0]]
