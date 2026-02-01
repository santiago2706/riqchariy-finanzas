# ==============================================================================
# MÓDULO CHATBOT - ASISTENTE IA (YACHAQ)
# ==============================================================================
"""
Módulo del chatbot educativo YACHAQ.

Este módulo maneja:
    - Recepción de mensajes del usuario
    - Procesamiento con modelo de IA
    - Generación de respuestas educativas

Estructura del módulo:
    chatbot/
    ├── __init__.py   → Este archivo
    ├── router.py     → Endpoint: /api/chatbot
    ├── schemas.py    → Modelos de petición/respuesta
    └── service.py    → Lógica de integración con IA

Endpoints expuestos:
    POST /api/chatbot → Enviar mensaje y recibir respuesta

YACHAQ (Quechua: "el que sabe"):
    Es el asistente virtual del juego que:
    - Responde preguntas sobre finanzas
    - Da consejos sobre el mercado virtual
    - Ayuda con la educación financiera

Futuras extensiones:
    - GET  /api/chatbot/history  → Historial de conversación
    - POST /api/chatbot/feedback → Retroalimentación del usuario
    - GET  /api/chatbot/topics   → Temas disponibles
"""
