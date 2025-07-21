from fastapi import FastAPI
from routers import pdf_routes

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for more control
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_routes.router)

@app.get("/")
def read_root():
    return {"msg": "AI LegalDoc QnA Backend Running"}
