# ==============================================================================
# PAQUETE PRINCIPAL - RIQCHARIY FINANZAS BACKEND
# ==============================================================================
"""
Este archivo marca el directorio 'app' como un paquete Python.

Estructura del paquete:
    app/
    ├── main.py          → Entry point de FastAPI
    ├── core/            → Configuración central (config, security)
    ├── modules/         → Módulos de dominio (auth, game, market, chatbot)
    └── shared/          → Utilidades compartidas (dependencies, exceptions)

Uso:
    Para importar desde otros módulos:
    from app.core.config import settings
    from app.modules.auth.router import router as auth_router
"""

# Versión del backend (seguir semver: MAJOR.MINOR.PATCH)
__version__ = "0.1.0"

# Nombre del proyecto
__project__ = "Riqchariy Finanzas API"
