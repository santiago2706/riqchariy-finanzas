# ==============================================================================
# SERVICE.PY - LÓGICA DE NEGOCIO DEL CHATBOT
# ==============================================================================
"""
Este archivo contiene la lógica para el chatbot YACHAQ.

Funcionalidades:
    - Procesar mensajes del usuario
    - Integrar con servicios de IA (OpenAI, Azure, etc.)
    - Proporcionar respuestas predefinidas como fallback

Uso:
    from app.modules.chatbot.service import ChatbotService
    
    chatbot = ChatbotService()
    response = await chatbot.get_response("¿Cómo ahorrar?")

Configuración de IA:
    Para usar OpenAI:
        1. Agregar OPENAI_API_KEY en .env
        2. Descomentar código de integración
        3. Instalar: pip install openai

    Para usar Azure OpenAI:
        1. Agregar AZURE_OPENAI_KEY y AZURE_OPENAI_ENDPOINT en .env
        2. Descomentar código de integración Azure
"""

from typing import Optional, Dict, Any
import random


class ChatbotService:
    """
    Servicio del chatbot YACHAQ.
    
    Métodos disponibles:
        - get_response(): Obtener respuesta para un mensaje
        - get_fallback_response(): Respuesta predefinida
    
    Ejemplo:
        service = ChatbotService()
        result = await service.get_response("¿Qué es el ahorro?")
    """
    
    # Respuestas predefinidas para cuando la IA no está disponible
    FALLBACK_RESPONSES = {
        "ahorro": [
            "El ahorro es guardar parte de tu dinero para usarlo después. "
            "¡Es como plantar una semilla que crecerá con el tiempo! 🌱",
            "Ahorrar significa gastar menos de lo que ganas. "
            "Intenta guardar aunque sea un poco cada día.",
        ],
        "presupuesto": [
            "Un presupuesto es un plan de cómo usar tu dinero. "
            "Anota cuánto ganas y cuánto gastas en cada cosa.",
            "Para hacer un buen presupuesto: "
            "1) Anota tus ingresos, "
            "2) Lista tus gastos necesarios, "
            "3) Decide cuánto ahorrar.",
        ],
        "mercado": [
            "En el mercado, los precios cambian según la oferta y demanda. "
            "¡Observa los patrones para comprar barato!",
            "Consejo: compra cuando los precios están bajos "
            "y vende cuando suban. ¡Así funcionan los negocios!",
        ],
        "default": [
            "¡Hola! Soy YACHAQ, tu asistente financiero. "
            "Puedo ayudarte con temas de ahorro, presupuesto y el mercado.",
            "¿Tienes alguna pregunta sobre finanzas? "
            "Estoy aquí para ayudarte a aprender.",
        ],
    }
    
    def __init__(self):
        """
        Inicializar el servicio.
        
        Aquí puedes:
            - Cargar configuración de IA
            - Inicializar cliente de OpenAI/Azure
            - Cargar modelos locales
        """
        # TODO: Inicializar cliente de IA cuando esté configurado
        # self.openai_client = None
        # if settings.OPENAI_API_KEY:
        #     from openai import AsyncOpenAI
        #     self.openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        pass
    
    async def get_response(
        self,
        prompt: str,
        context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Obtener respuesta del chatbot para un mensaje.
        
        Args:
            prompt: Mensaje del usuario
            context: Contexto adicional (opcional)
            
        Returns:
            Diccionario con success y message
            
        Flujo:
            1. Intentar usar IA si está disponible
            2. Si falla, usar respuestas predefinidas
        """
        # TODO: Implementar integración con IA
        # try:
        #     if self.openai_client:
        #         response = await self._call_openai(prompt, context)
        #         return {"success": True, "message": response}
        # except Exception as e:
        #     print(f"Error con IA: {e}")
        
        # Fallback: usar respuestas predefinidas
        fallback = await self.get_fallback_response(prompt)
        return {
            "success": True,
            "message": fallback
        }
    
    async def get_fallback_response(self, prompt: str) -> str:
        """
        Obtener respuesta predefinida basada en palabras clave.
        
        Args:
            prompt: Mensaje del usuario
            
        Returns:
            Respuesta predefinida relevante
        """
        prompt_lower = prompt.lower()
        
        # Buscar palabra clave en el mensaje
        if "ahorro" in prompt_lower or "ahorrar" in prompt_lower:
            responses = self.FALLBACK_RESPONSES["ahorro"]
        elif "presupuesto" in prompt_lower:
            responses = self.FALLBACK_RESPONSES["presupuesto"]
        elif "mercado" in prompt_lower or "precio" in prompt_lower:
            responses = self.FALLBACK_RESPONSES["mercado"]
        else:
            responses = self.FALLBACK_RESPONSES["default"]
        
        return random.choice(responses)
    
    # async def _call_openai(self, prompt: str, context: Optional[str]) -> str:
    #     """
    #     Llamar a la API de OpenAI (comentado hasta configurar).
    #     
    #     Args:
    #         prompt: Mensaje del usuario
    #         context: Contexto adicional
    #         
    #     Returns:
    #         Respuesta generada por GPT
    #     """
    #     system_prompt = """
    #     Eres YACHAQ, un asistente educativo amigable que enseña finanzas
    #     a niños y jóvenes en Perú. Respondes en español, de forma simple
    #     y con ejemplos del día a día. Usa emojis ocasionalmente.
    #     """
    #     
    #     messages = [
    #         {"role": "system", "content": system_prompt},
    #         {"role": "user", "content": prompt}
    #     ]
    #     
    #     if context:
    #         messages.insert(1, {"role": "system", "content": f"Contexto: {context}"})
    #     
    #     response = await self.openai_client.chat.completions.create(
    #         model="gpt-3.5-turbo",
    #         messages=messages,
    #         max_tokens=500,
    #         temperature=0.7
    #     )
    #     
    #     return response.choices[0].message.content
