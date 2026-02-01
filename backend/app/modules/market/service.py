# ==============================================================================
# SERVICE.PY - LÓGICA DE NEGOCIO DEL MERCADO
# ==============================================================================
"""
Este archivo contiene la lógica de negocio para el mercado virtual.

Funcionalidades:
    - Simular fluctuación de precios
    - Generar eventos aleatorios del mercado
    - Calcular precios por región
    - Gestionar el avance de días

Uso:
    from app.modules.market.service import MarketService
    
    market_service = MarketService()
    
    # Actualizar precios
    result = await market_service.update_prices(products, region, day)
    
    # Avanzar día
    result = await market_service.advance_day(current_day)

Mecánicas de simulación:
    - Precios fluctúan ±15% por día
    - Eventos ocurren con 20% de probabilidad
    - Regiones afectan disponibilidad de productos
"""

from typing import List, Dict, Any, Optional
import random


class MarketService:
    """
    Servicio para la simulación del mercado.
    
    Métodos disponibles:
        - update_prices(): Calcular nuevos precios
        - advance_day(): Avanzar al siguiente día
        - generate_event(): Crear evento aleatorio
        - get_products_by_region(): Productos por región
    
    Ejemplo:
        service = MarketService()
        result = await service.update_prices(products, "Lima", 15)
    """
    
    # Catálogo de eventos posibles
    MARKET_EVENTS = [
        {
            "id": "evt_cosecha",
            "type": "oferta",
            "title": "Gran Cosecha",
            "description": "¡La cosecha fue excelente! Las frutas están más baratas.",
            "affected_categories": ["frutas"],
            "price_modifier": 0.8  # -20%
        },
        {
            "id": "evt_sequia",
            "type": "escasez",
            "title": "Sequía en la Sierra",
            "description": "La sequía ha afectado los cultivos. Precios suben.",
            "affected_categories": ["granos", "verduras"],
            "price_modifier": 1.3  # +30%
        },
        {
            "id": "evt_fiesta",
            "type": "demanda",
            "title": "Fiestas Patrias",
            "description": "¡La demanda sube por las fiestas!",
            "affected_categories": ["carnes", "bebidas"],
            "price_modifier": 1.2  # +20%
        },
        {
            "id": "evt_importacion",
            "type": "oferta",
            "title": "Llegó Nuevo Stock",
            "description": "Nueva importación de productos. Precios estables.",
            "affected_categories": ["lacteos"],
            "price_modifier": 0.9  # -10%
        },
    ]
    
    def __init__(self):
        """
        Inicializar el servicio.
        
        Configuraciones:
            - MAX_PRICE_FLUCTUATION: Máxima variación de precio por día
            - EVENT_PROBABILITY: Probabilidad de generar evento
        """
        self.MAX_PRICE_FLUCTUATION = 0.15  # ±15%
        self.EVENT_PROBABILITY = 0.20  # 20%
    
    async def update_prices(
        self,
        products: List[Dict[str, Any]],
        region: str,
        current_day: int
    ) -> Dict[str, Any]:
        """
        Actualizar precios del mercado.
        
        Args:
            products: Lista de productos actuales
            region: Región del jugador
            current_day: Día actual del juego
            
        Returns:
            Productos con precios actualizados y evento (si hay)
            
        Notas:
            - Cada producto fluctúa independientemente
            - El día afecta la semilla aleatoria (precios consistentes)
            - Eventos pueden modificar grupos de productos
        """
        # Semilla basada en día para resultados reproducibles
        random.seed(current_day * 1000 + hash(region) % 1000)
        
        updated_products = []
        for product in products:
            # Calcular fluctuación aleatoria
            fluctuation = random.uniform(
                1 - self.MAX_PRICE_FLUCTUATION,
                1 + self.MAX_PRICE_FLUCTUATION
            )
            
            new_price = product.get("price", 0) * fluctuation
            new_price = round(max(0.10, new_price), 2)  # Mínimo S/0.10
            
            updated_product = {**product, "price": new_price}
            updated_products.append(updated_product)
        
        # Generar evento aleatorio
        event = await self.generate_event()
        
        # Aplicar evento a productos afectados
        if event:
            modifier = event.get("price_modifier", 1.0)
            affected = event.get("affected_categories", [])
            
            for product in updated_products:
                if product.get("category") in affected:
                    product["price"] = round(product["price"] * modifier, 2)
        
        return {
            "products": updated_products,
            "event": event
        }
    
    async def generate_event(self) -> Optional[Dict[str, Any]]:
        """
        Generar un evento aleatorio del mercado.
        
        Returns:
            Evento si se genera, None si no
            
        Notas:
            - Solo 20% de probabilidad de generar evento
            - Eventos son seleccionados al azar del catálogo
        """
        if random.random() > self.EVENT_PROBABILITY:
            return None
        
        event_template = random.choice(self.MARKET_EVENTS)
        
        # Clonar para no modificar el original
        return {
            "id": event_template["id"],
            "type": event_template["type"],
            "title": event_template["title"],
            "description": event_template["description"],
            "affected_products": [],  # Se puede expandir
            "price_modifier": event_template["price_modifier"]
        }
    
    async def advance_day(self, current_day: int) -> Dict[str, Any]:
        """
        Avanzar al siguiente día del juego.
        
        Args:
            current_day: Día actual
            
        Returns:
            Información del nuevo día
            
        Notas:
            - Simplemente incrementa el día
            - La actualización de precios se hace en update_prices
        """
        new_day = current_day + 1
        
        # Mensaje personalizado según el día
        if new_day % 7 == 0:
            message = "¡Una semana más! El mercado puede tener sorpresas."
        elif new_day % 30 == 0:
            message = "¡Un mes completo! Revisa tu progreso."
        else:
            message = "¡Nuevo día! El mercado ha cambiado."
        
        return {
            "success": True,
            "new_day": new_day,
            "message": message
        }
