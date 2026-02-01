# ==============================================================================
# ROUTER.PY - ENDPOINTS DEL JUEGO
# ==============================================================================
"""
Este archivo define los endpoints HTTP para el juego educativo.

Endpoints:
    POST /api/game/save  → Guardar estado del juego
    GET  /api/game/load  → Cargar estado del juego

Uso:
    Este router se registra en main.py:
    app.include_router(game_router, prefix="/api/game", tags=["Juego"])

Flujo de guardado:
    1. Frontend llama a save con { saldo, inventario, day }
    2. Backend asocia datos con el usuario autenticado
    3. Backend guarda en BD (o memoria temporal)
    4. Retorna confirmación

Flujo de carga:
    1. Frontend llama a load con ?region=Lima
    2. Backend busca último guardado del usuario
    3. Retorna { saldo, inventario, day }
"""

from fastapi import APIRouter, Depends, Query
from typing import Optional

# TODO: Importar cuando estén listos
# from app.modules.game.schemas import SaveGameRequest, GameStateResponse
# from app.modules.game.service import GameService
# from app.shared.dependencies import get_current_user


# ==============================================================================
# CREAR ROUTER
# ==============================================================================
router = APIRouter()


# ==============================================================================
# ENDPOINT: GUARDAR JUEGO
# ==============================================================================
@router.post("/save")
async def save_game(
    # request: SaveGameRequest,  # TODO: Descomentar cuando schemas esté listo
    # current_user = Depends(get_current_user)  # TODO: Requerir autenticación
):
    """
    Guardar el estado actual del juego.
    
    Request body:
        {
            "saldo": 500.00,
            "inventario": [
                {"product_id": "p1", "quantity": 10, "price": 2.5},
                {"product_id": "p2", "quantity": 5, "price": 5.0}
            ],
            "day": 15
        }
    
    Response exitoso (200):
        {
            "status": 200,
            "message": "Juego guardado exitosamente",
            "saved_at": "2024-01-15T10:30:00Z"
        }
    
    Response error (401):
        {
            "detail": "No autenticado"
        }
    
    Notas:
        - Requiere autenticación (token JWT)
        - Sobrescribe el guardado anterior del usuario
    """
    # TODO: Implementar lógica de guardado
    # 1. Obtener user_id del token
    # 2. Guardar/actualizar estado en BD
    # 3. Retornar confirmación
    
    return {
        "status": 200,
        "message": "Endpoint pendiente de implementación"
    }


# ==============================================================================
# ENDPOINT: CARGAR JUEGO
# ==============================================================================
@router.get("/load")
async def load_game(
    region: Optional[str] = Query(
        None,
        description="Región del jugador para cargar productos regionales"
    ),
    # current_user = Depends(get_current_user)  # TODO: Requerir autenticación
):
    """
    Cargar el estado guardado del juego.
    
    Query params:
        region: Región del jugador (ej: "Lima", "Cusco")
    
    Response exitoso (200):
        {
            "status": 200,
            "data": {
                "saldo": 500.00,
                "inventario": [...],
                "day": 15
            }
        }
    
    Response sin datos (200):
        {
            "status": 200,
            "data": null,
            "message": "No hay partida guardada"
        }
    
    Response error (401):
        {
            "detail": "No autenticado"
        }
    
    Notas:
        - Requiere autenticación (token JWT)
        - Si no hay guardado, retorna datos iniciales
    """
    # TODO: Implementar lógica de carga
    # 1. Obtener user_id del token
    # 2. Buscar último guardado en BD
    # 3. Si no existe, retornar estado inicial
    # 4. Retornar datos encontrados
    
    return {
        "status": 200,
        "data": None,
        "message": "Endpoint pendiente de implementación"
    }
