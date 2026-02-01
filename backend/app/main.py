# ==============================================================================
# MAIN.PY - PUNTO DE ENTRADA DE LA APLICACIÓN FASTAPI
# ==============================================================================
"""
Este archivo es el punto de entrada principal del backend.

Responsabilidades:
    1. Crear la instancia de FastAPI
    2. Configurar CORS para permitir peticiones del frontend
    3. Registrar todos los routers de los módulos
    4. Configurar middleware global
    5. Definir eventos de inicio/cierre de la aplicación

Ejecución:
    uvicorn app.main:app --reload

Documentación automática:
    - Swagger UI: http://localhost:8000/docs
    - ReDoc: http://localhost:8000/redoc
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# TODO: Importar configuración cuando esté lista
# from app.core.config import settings

# TODO: Importar routers de los módulos cuando estén implementados
# from app.modules.auth.router import router as auth_router
# from app.modules.game.router import router as game_router
# from app.modules.market.router import router as market_router
# from app.modules.chatbot.router import router as chatbot_router


# ==============================================================================
# CREAR INSTANCIA DE FASTAPI
# ==============================================================================
app = FastAPI(
    title="Riqchariy Finanzas API",
    description="Backend API para la plataforma educativa de finanzas",
    version="0.1.0",
    docs_url="/docs",      # Swagger UI
    redoc_url="/redoc",    # ReDoc
)


# ==============================================================================
# CONFIGURAR CORS
# ==============================================================================
# CORS permite que el frontend (en otro puerto/dominio) haga peticiones al backend
# En producción, cambiar origins por la URL real del frontend

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",      # Vite dev server
        "http://127.0.0.1:5173",      # Alternativa localhost
        # TODO: Agregar URL de producción del frontend
    ],
    allow_credentials=True,           # Permitir cookies/auth headers
    allow_methods=["*"],              # Permitir todos los métodos HTTP
    allow_headers=["*"],              # Permitir todos los headers
)


# ==============================================================================
# REGISTRAR ROUTERS
# ==============================================================================
# Cada módulo tiene su propio router que se registra aquí con un prefijo
# Esto mantiene las rutas organizadas y el código modular

# TODO: Descomentar cuando los routers estén implementados
# app.include_router(auth_router, prefix="/auth", tags=["Autenticación"])
# app.include_router(game_router, prefix="/api/game", tags=["Juego"])
# app.include_router(market_router, prefix="/api/mercado", tags=["Mercado"])
# app.include_router(chatbot_router, prefix="/api", tags=["Chatbot"])


# ==============================================================================
# ENDPOINTS BASE
# ==============================================================================
@app.get("/", tags=["Health"])
async def root():
    """
    Endpoint raíz para verificar que el servidor está funcionando.
    Útil para health checks y monitoreo.
    """
    return {
        "status": "ok",
        "message": "Riqchariy Finanzas API está funcionando",
        "version": "0.1.0"
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint para monitoreo y balanceadores de carga.
    Devuelve el estado de los servicios críticos.
    """
    return {
        "status": "healthy",
        "services": {
            "api": "ok",
            # TODO: Agregar verificación de BD cuando esté configurada
            # "database": "ok",
        }
    }


# ==============================================================================
# EVENTOS DE CICLO DE VIDA
# ==============================================================================
@app.on_event("startup")
async def startup_event():
    """
    Se ejecuta cuando la aplicación inicia.
    
    Aquí puedes:
        - Inicializar conexiones a base de datos
        - Cargar configuraciones
        - Inicializar caches
        - Configurar logging
    """
    print("🚀 Iniciando Riqchariy Finanzas API...")
    # TODO: Agregar inicialización de BD y otros servicios


@app.on_event("shutdown")
async def shutdown_event():
    """
    Se ejecuta cuando la aplicación se cierra.
    
    Aquí puedes:
        - Cerrar conexiones a base de datos
        - Limpiar recursos
        - Guardar estados pendientes
    """
    print("👋 Cerrando Riqchariy Finanzas API...")
    # TODO: Agregar cleanup de recursos
