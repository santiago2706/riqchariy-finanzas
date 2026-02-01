# ==============================================================================
# SCHEMAS.PY - MODELOS PYDANTIC PARA EL CHATBOT
# ==============================================================================
"""
Este archivo define los modelos Pydantic para el chatbot YACHAQ.

Modelos incluidos:
    - ChatRequest  : Mensaje del usuario
    - ChatResponse : Respuesta del chatbot

Uso:
    from app.modules.chatbot.schemas import ChatRequest, ChatResponse
    
    @router.post("/chatbot", response_model=ChatResponse)
    async def chat(request: ChatRequest):
        ...
"""

from typing import Optional
from pydantic import BaseModel, Field


# ==============================================================================
# MODELOS DE REQUEST
# ==============================================================================

class ChatRequest(BaseModel):
    """
    Mensaje enviado por el usuario al chatbot.
    
    El frontend envía este modelo al endpoint POST /api/chatbot
    """
    prompt: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="Mensaje o pregunta del usuario",
        examples=[
            "¿Cómo puedo ahorrar dinero?",
            "¿Qué productos me recomiendas comprar?",
            "Explícame qué es la inflación"
        ]
    )
    context: Optional[str] = Field(
        None,
        max_length=1000,
        description="Contexto adicional (estado del juego, etc.)"
    )


# ==============================================================================
# MODELOS DE RESPONSE
# ==============================================================================

class ChatResponse(BaseModel):
    """
    Respuesta del chatbot YACHAQ.
    """
    success: bool = Field(
        ...,
        description="Indica si se pudo generar la respuesta"
    )
    message: str = Field(
        ...,
        description="Respuesta del chatbot",
        examples=[
            "¡Excelente pregunta! Para ahorrar dinero puedes empezar por..."
        ]
    )
    suggested_actions: Optional[list] = Field(
        None,
        description="Acciones sugeridas para el usuario (opcional)"
    )
