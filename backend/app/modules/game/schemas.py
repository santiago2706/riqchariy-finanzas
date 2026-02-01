# ==============================================================================
# SCHEMAS.PY - MODELOS PYDANTIC PARA EL JUEGO
# ==============================================================================
"""
Este archivo define los modelos Pydantic para el juego educativo.

Modelos incluidos:
    - InventoryItem     : Un producto en el inventario
    - SaveGameRequest   : Datos para guardar partida
    - GameStateResponse : Respuesta con estado del juego
    - SaveConfirmation  : Confirmación de guardado

Uso:
    from app.modules.game.schemas import SaveGameRequest, GameStateResponse
    
    @router.post("/save")
    async def save_game(request: SaveGameRequest):
        ...
"""

from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field


# ==============================================================================
# MODELOS DE INVENTARIO
# ==============================================================================

class InventoryItem(BaseModel):
    """
    Representa un producto en el inventario del jugador.
    
    Cada item tiene:
        - product_id: Identificador único del producto
        - quantity: Cantidad de unidades
        - price: Precio al que se compró
    """
    product_id: str = Field(
        ...,
        description="ID único del producto",
        examples=["manzana", "arroz", "azucar"]
    )
    quantity: int = Field(
        ...,
        ge=0,
        description="Cantidad en inventario",
        examples=[10, 25, 50]
    )
    price: float = Field(
        ...,
        ge=0,
        description="Precio de compra por unidad",
        examples=[2.50, 5.00, 3.75]
    )


# ==============================================================================
# MODELOS DE GUARDADO
# ==============================================================================

class SaveGameRequest(BaseModel):
    """
    Datos requeridos para guardar el estado del juego.
    
    El frontend envía estos datos al endpoint POST /api/game/save
    """
    saldo: float = Field(
        ...,
        ge=0,
        description="Saldo de dinero disponible del jugador",
        examples=[500.00, 1250.50]
    )
    inventario: List[InventoryItem] = Field(
        default=[],
        description="Lista de productos en el inventario"
    )
    day: int = Field(
        ...,
        ge=1,
        description="Día actual del juego (1 = primer día)",
        examples=[1, 15, 30]
    )


# ==============================================================================
# MODELOS DE RESPUESTA
# ==============================================================================

class GameState(BaseModel):
    """
    Estado completo del juego.
    Se usa tanto para cargar como para guardar.
    """
    saldo: float = Field(..., description="Dinero disponible")
    inventario: List[InventoryItem] = Field(default=[], description="Productos")
    day: int = Field(..., description="Día del juego")


class GameStateResponse(BaseModel):
    """
    Respuesta del endpoint GET /api/game/load
    """
    status: int = Field(200, description="Código HTTP")
    data: Optional[GameState] = Field(
        None,
        description="Estado del juego, null si no hay guardado"
    )
    message: Optional[str] = Field(
        None,
        description="Mensaje informativo"
    )


class SaveConfirmation(BaseModel):
    """
    Respuesta del endpoint POST /api/game/save
    """
    status: int = Field(200, description="Código HTTP")
    message: str = Field(
        ...,
        description="Mensaje de confirmación",
        examples=["Juego guardado exitosamente"]
    )
    saved_at: Optional[datetime] = Field(
        None,
        description="Fecha y hora del guardado"
    )
