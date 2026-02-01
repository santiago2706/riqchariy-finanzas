# ==============================================================================
# ROUTER.PY - ENDPOINTS DEL MERCADO
# ==============================================================================
"""
Este archivo define los endpoints HTTP para el mercado virtual.

Endpoints:
    POST /api/mercado/actualizar    → Obtener precios actualizados
    POST /api/mercado/avanzar-dia  → Avanzar al siguiente día del juego

Uso:
    Este router se registra en main.py:
    app.include_router(market_router, prefix="/api/mercado", tags=["Mercado"])

Flujo de actualización:
    1. Frontend envía lista de productos actuales, región y día
    2. Backend calcula nuevos precios basados en simulación
    3. Backend puede generar un evento aleatorio
    4. Retorna productos con precios actualizados y evento (si hay)

Flujo de avanzar día:
    1. Frontend indica que el jugador terminó el día
    2. Backend actualiza el día y recalcula precios
    3. Retorna nuevo estado del mercado
"""

from fastapi import APIRouter, Depends
from typing import Optional

# TODO: Importar cuando estén listos
# from app.modules.market.schemas import (
#     UpdatePricesRequest,
#     AdvanceDayRequest,
#     MarketResponse,
# )
# from app.modules.market.service import MarketService


# ==============================================================================
# CREAR ROUTER
# ==============================================================================
router = APIRouter()


# ==============================================================================
# ENDPOINT: ACTUALIZAR PRECIOS
# ==============================================================================
@router.post("/actualizar")
async def update_prices(
    # request: UpdatePricesRequest  # TODO: Descomentar cuando schemas esté listo
):
    """
    Obtener precios actualizados del mercado.
    
    Request body:
        {
            "products": [
                {"id": "manzana", "name": "Manzana", "price": 2.5, ...},
                ...
            ],
            "region": "Lima",
            "currentDay": 15
        }
    
    Response exitoso (200):
        {
            "products": [
                {"id": "manzana", "name": "Manzana", "price": 2.75, ...},
                ...
            ],
            "event": {
                "id": "evt_01",
                "type": "oferta",
                "title": "Cosecha abundante",
                "description": "Las frutas están más baratas hoy",
                "affected_products": ["manzana", "naranja"]
            }
        }
    
    Notas:
        - Los precios pueden subir o bajar según simulación
        - Los eventos son opcionales (puede ser null)
        - La región afecta qué productos están disponibles
    """
    # TODO: Implementar lógica de actualización
    # 1. Recibir productos actuales
    # 2. Aplicar fluctuación de precios
    # 3. Generar evento aleatorio (probabilidad ~20%)
    # 4. Retornar productos actualizados
    
    return {
        "products": [],
        "event": None,
        "message": "Endpoint pendiente de implementación"
    }


# ==============================================================================
# ENDPOINT: AVANZAR DÍA
# ==============================================================================
@router.post("/avanzar-dia")
async def advance_day(
    # request: AdvanceDayRequest  # TODO: Descomentar cuando schemas esté listo
):
    """
    Avanzar al siguiente día del juego.
    
    Request body:
        {
            "current_day": 15,
            "user_id": "user123"
        }
    
    Response exitoso (200):
        {
            "success": true,
            "new_day": 16,
            "message": "¡Nuevo día! El mercado ha cambiado."
        }
    
    Notas:
        - Incrementa el contador de días
        - Puede activar eventos especiales por día
        - Actualiza precios del mercado
    """
    # TODO: Implementar lógica de avance de día
    # 1. Incrementar día
    # 2. Recalcular precios
    # 3. Verificar eventos especiales
    # 4. Retornar nuevo estado
    
    return {
        "success": False,
        "message": "Endpoint pendiente de implementación"
    }
