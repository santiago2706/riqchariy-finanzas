from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import SessionLocal  # ✅ importación absoluta
from models import TemaFinanciero  # ✅ importación absoluta
from chatbot.context_manager import buscar_contexto  # ✅ importación absoluta
from chatbot.prompts import construir_prompt  # ✅ importación absoluta

router = APIRouter(prefix="/api/chatbot", tags=["Chatbot"])


# =====================================================
# 📥 MODELOS DE ENTRADA Y SALIDA
# =====================================================
class ChatRequest(BaseModel):
    user_prompt: str
    region: str
    pedagogical_focus: str | None = None


class ChatResponse(BaseModel):
    ai_response: str


# =====================================================
# 🤖 ENDPOINT PRINCIPAL DEL CHATBOT
# =====================================================
@router.post("/ask", response_model=ChatResponse)
def ask_chatbot(req: ChatRequest):
    db = SessionLocal()
    try:
        contexto = buscar_contexto(db, req.user_prompt)
        prompt_final = construir_prompt(
            req.user_prompt, contexto, req.region, req.pedagogical_focus
        )

        # 💬 Por ahora, una respuesta simulada
        respuesta = (
            f"Basado en tu pregunta: '{req.user_prompt}', "
            f"encontré este tema: {contexto or 'Sin coincidencias'}."
        )

        return ChatResponse(ai_response=respuesta)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")
    finally:
        db.close()
