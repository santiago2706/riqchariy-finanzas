# ==============================================================================
# PAQUETE SHARED - UTILIDADES COMPARTIDAS
# ==============================================================================
"""
Este paquete contiene utilidades compartidas entre todos los módulos.

Archivos incluidos:
    - dependencies.py  → Dependencias FastAPI reutilizables
    - exceptions.py    → Excepciones HTTP personalizadas

Uso:
    from app.shared.dependencies import get_current_user
    from app.shared.exceptions import NotFoundException

Propósito:
    Centralizar código que se usa en múltiples módulos para:
    1. Evitar duplicación de código
    2. Mantener consistencia en toda la API
    3. Facilitar cambios globales
"""
