# ==============================================================================
# ROUTER.PY - ENDPOINT DEL CHATBOT
# ==============================================================================
"""
Este archivo define el endpoint HTTP para el chatbot YACHAQ.

Endpoint:
    POST /api/chatbot → Enviar mensaje y recibir respuesta

Uso:
    Este router se registra en main.py:
    app.include_router(chatbot_router, prefix="/api", tags=["Chatbot"])

Flujo de conversación:
    1. Usuario escribe un mensaje
    2. Frontend envía el mensaje al backend
    3. Backend procesa con modelo de IA
    4. Backend retorna respuesta educativa
    5. Frontend muestra la respuesta

Integraciones posibles:
    - OpenAI GPT (ChatGPT)
    - Azure OpenAI
    - Modelo local (Llama, etc.)
    - Respuestas predefinidas (fallback)
"""

from fastapi import APIRouter, Depends

# TODO: Importar cuando estén listos
# from app.modules.chatbot.schemas import ChatRequest, ChatResponse
# from app.modules.chatbot.service import ChatbotService


# ==============================================================================
# CREAR ROUTER
# ==============================================================================
router = APIRouter()


# ==============================================================================
# ENDPOINT: CHAT
# ==============================================================================
@router.post("/chatbot")
async def chat(
    # request: ChatRequest  # TODO: Descomentar cuando schemas esté listo
):
    """
    Enviar un mensaje al chatbot YACHAQ y recibir respuesta.
    
    Request body:
        {
            "prompt": "¿Cómo puedo ahorrar dinero?"
        }
    
    Response exitoso (200):
        {
            "success": true,
            "message": "¡Excelente pregunta! Para ahorrar dinero puedes: 
                        1. Crear un presupuesto mensual
                        2. Separar un porcentaje de tus ingresos
                        3. Evitar gastos innecesarios
                        ¿Te gustaría saber más sobre alguno de estos puntos?"
        }
    
    Response error (500):
        {
            "success": false,
            "message": "Error al conectar con el asistente"
        }
    
    Notas:
        - El chatbot responde en español
        - Las respuestas están orientadas a educación financiera
        - Si la IA no está disponible, usa respuestas predefinidas
    """
    # TODO: Implementar lógica del chatbot
    # 1. Extraer prompt del request
    # 2. Enviar a servicio de IA
    # 3. Procesar respuesta
    # 4. Retornar al usuario
    
    return {
        "success": False,
        "message": "Endpoint pendiente de implementación. YACHAQ pronto estará disponible."
    }
