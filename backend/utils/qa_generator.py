from transformers import pipeline

# Load HuggingFace QnA pipeline (use caching)
qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2")

def generate_answer(question: str, context_chunks: list):
    context = " ".join(context_chunks)

    try:
        result = qa_pipeline(question=question, context=context)
        answer = result.get("answer", "")
        score = result.get("score", 0)

        if score < 0.3 or answer.lower() in ["", "no answer", "unknown"]:
            return "I'm sorry, I couldn't find a relevant answer in the document."

        return answer

    except Exception as e:
        print("Error in QnA generation:", str(e))
        return "Something went wrong while generating the answer."
