# ==============================================================================
# PAQUETE MODULES - MÓDULOS DE DOMINIO
# ==============================================================================
"""
Este paquete contiene todos los módulos de dominio del backend.

Cada módulo representa una funcionalidad independiente y contiene:
    - router.py   → Endpoints de la API (rutas HTTP)
    - schemas.py  → Modelos Pydantic (validación de datos)
    - service.py  → Lógica de negocio
    - models.py   → Modelos de BD (cuando se agregue base de datos)

Módulos disponibles:
    ├── auth/       → Autenticación (login, registro)
    ├── game/       → Estado del juego (guardar, cargar)
    ├── market/     → Mercado (precios, avanzar día)
    └── chatbot/    → Chatbot IA (YACHAQ)

Principios de diseño:
    1. Cada módulo es independiente y autocontenido
    2. Los módulos no deben importar directamente de otros módulos
    3. La comunicación entre módulos se hace a través de 'shared'
    4. Esto permite escalar añadiendo nuevos módulos fácilmente
"""
