# ==============================================================================
# SCHEMAS.PY - MODELOS PYDANTIC PARA EL MERCADO
# ==============================================================================
"""
Este archivo define los modelos Pydantic para el mercado virtual.

Modelos incluidos:
    - Product            : Producto con precio
    - MarketEvent        : Evento del mercado
    - UpdatePricesRequest: Petición para actualizar precios
    - MarketResponse     : Respuesta con productos y eventos
    - AdvanceDayRequest  : Petición para avanzar día

Uso:
    from app.modules.market.schemas import UpdatePricesRequest, MarketResponse
    
    @router.post("/actualizar", response_model=MarketResponse)
    async def update_prices(request: UpdatePricesRequest):
        ...
"""

from typing import List, Optional
from pydantic import BaseModel, Field


# ==============================================================================
# MODELOS DE PRODUCTOS
# ==============================================================================

class Product(BaseModel):
    """
    Representa un producto en el mercado.
    
    Cada producto tiene:
        - id: Identificador único
        - name: Nombre para mostrar
        - price: Precio actual
        - base_price: Precio base (para calcular variación)
        - category: Categoría del producto
    """
    id: str = Field(
        ...,
        description="ID único del producto",
        examples=["manzana", "arroz", "azucar"]
    )
    name: str = Field(
        ...,
        description="Nombre visible del producto",
        examples=["Manzana Roja", "Arroz Integral"]
    )
    price: float = Field(
        ...,
        ge=0,
        description="Precio actual del producto",
        examples=[2.50, 5.00]
    )
    base_price: Optional[float] = Field(
        None,
        ge=0,
        description="Precio base para referencia"
    )
    category: Optional[str] = Field(
        None,
        description="Categoría del producto",
        examples=["frutas", "granos", "lacteos"]
    )
    image: Optional[str] = Field(
        None,
        description="URL o nombre de la imagen"
    )


# ==============================================================================
# MODELOS DE EVENTOS
# ==============================================================================

class MarketEvent(BaseModel):
    """
    Evento que afecta al mercado.
    
    Los eventos pueden:
        - Subir o bajar precios de ciertos productos
        - Afectar disponibilidad
        - Ser positivos o negativos para el jugador
    """
    id: str = Field(
        ...,
        description="ID único del evento",
        examples=["evt_cosecha", "evt_sequia"]
    )
    type: str = Field(
        ...,
        description="Tipo de evento",
        examples=["oferta", "escasez", "temporada", "emergencia"]
    )
    title: str = Field(
        ...,
        description="Título del evento para mostrar",
        examples=["¡Gran Cosecha!", "Escasez de Agua"]
    )
    description: str = Field(
        ...,
        description="Descripción del evento",
        examples=["Los precios de frutas bajan 20%"]
    )
    affected_products: List[str] = Field(
        default=[],
        description="IDs de productos afectados"
    )
    price_modifier: Optional[float] = Field(
        None,
        description="Multiplicador de precio (1.2 = +20%, 0.8 = -20%)"
    )


# ==============================================================================
# MODELOS DE REQUEST
# ==============================================================================

class UpdatePricesRequest(BaseModel):
    """
    Datos para actualizar precios del mercado.
    """
    products: List[Product] = Field(
        ...,
        description="Lista actual de productos"
    )
    region: str = Field(
        ...,
        description="Región del jugador",
        examples=["Lima", "Cusco", "Arequipa"]
    )
    currentDay: int = Field(
        ...,
        ge=1,
        alias="currentDay",
        description="Día actual del juego"
    )


class AdvanceDayRequest(BaseModel):
    """
    Datos para avanzar al siguiente día.
    """
    current_day: int = Field(
        ...,
        ge=1,
        description="Día actual antes de avanzar"
    )
    user_id: Optional[str] = Field(
        None,
        description="ID del usuario (opcional si usa auth)"
    )


# ==============================================================================
# MODELOS DE RESPONSE
# ==============================================================================

class MarketResponse(BaseModel):
    """
    Respuesta del endpoint de actualización de precios.
    """
    products: List[Product] = Field(
        ...,
        description="Productos con precios actualizados"
    )
    event: Optional[MarketEvent] = Field(
        None,
        description="Evento activo (si hay)"
    )


class AdvanceDayResponse(BaseModel):
    """
    Respuesta del endpoint de avanzar día.
    """
    success: bool = Field(..., description="Si el avance fue exitoso")
    new_day: int = Field(..., description="Nuevo día del juego")
    message: str = Field(..., description="Mensaje informativo")
